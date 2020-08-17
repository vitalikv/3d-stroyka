





// перемещение объекта после того как загрузили из каталога 
function moveObjFromCatalog( event )
{	
	var intersects = rayIntersect( event, planeMath, 'one' ); 
	
	if(intersects.length == 0) return;
	
	var obj = clickO.move;
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
	}		
	
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );	
	
	var pos2 = new THREE.Vector3().subVectors( pos, obj.position ); 


	if(obj.userData.obj3D.group)	// группа
	{
		var arr = obj.userData.obj3D.group.userData.groupObj.child;
		
		for(var i = 0; i < arr.length; i++)
		{
			arr[i].position.add( pos2 );
		}
	}
	else 	// объект
	{ 
		obj.position.add( pos2 );  
	}	
}




// сравниваем выделенные объекты с текущим (если объект уже есть в массиве arr, то true) 
function compareSelectedObjWithCurrent( cdm )
{
	var exist = false;
	var obj = cdm.obj;
	var arr = cdm.arr;
	
	for(var i = 0; i < arr.length; i++)
	{
		if(obj == arr[i]) { exist = true; break; }
	}
	
	return exist;
}


// кликнули на объект, распределяем что делать
function clickFirstObj3D(cdm)
{
	var obj = cdm.obj;	
	
	if(infProject.list.alignP.active) { showJoinPoint_2({obj: obj}); }		// вкл кнопка подключить/выронить	
	else if(infProject.list.mergeO.active && infProject.list.mergeO.o1.length) { selectObjForMergeToGroup({obj: obj}); }	
	else { clickObject3D( obj, {click_obj: true, menu_1: true, outline: true} ); }	 	
}




// активируем 3D объект или разъем, ставим pivot/gizmo
function clickObject3D( obj, cdm )
{
	if(!cdm) { cdm = {}; }		
	
	setPivotGizmo({obj: obj});	// ставим pivot/gizmo		
	
	if(cdm.outline) 
	{ 
		if(obj.userData.centerPoint) { outlineAddObj(obj.parent); }
		else { outlineAddObj(obj); } 
	}	
	if(cdm.menu_1) { clickObjUI({obj: obj}); }		// обновляем правое меню 										


	activeObjRightPanelUI_1({obj: obj});
	
	setClickLastObj({obj: obj});
}


// пролучить все объекты принадлежащие группе 
function getObjsFromGroup_1( cdm )
{
	var obj = cdm.obj;
	var arr = [ obj ];
	
	if(obj.userData.obj3D)
	{
		if(obj.userData.obj3D.group)
		{						
			var arr = obj.userData.obj3D.group.userData.groupObj.child;			
		}
	}
	
	return arr;	
}




// получаем все разъемы объекта
function getCenterPointFromObj_1( obj )
{
	var arr = [];
	
	if(obj.userData.obj3D)
	{
		for(var i = 0; i < obj.children.length; i++)
		{
			var child = obj.children[i];
			if(!child.userData.centerPoint) continue;
			
			arr[arr.length] = child;
		}
	}
	
	return arr; 
}	
	



function clickMouseUpObject(obj)
{
	if(clickO.actMove)
	{		
		
	}	
}


// удаление объекта
function deleteObjectPop(obj)
{ 
	if(obj.userData.tag != 'obj') return;
	
	clickO = resetPop.clickO(); 
	
	hidePivotGizmo(obj);
	
	deClickObj({obj: obj, moment: ''});
	
	var arr = [];
	
	if(obj.userData.obj3D.group && infProject.settings.active.group)
	{
		var group = obj.userData.obj3D.group;
		arr = group.userData.groupObj.child;
		
		deleteValueFromArrya({arr : infProject.scene.array.group, o : group});
	}
	else
	{
		arr[0] = obj;
		
		detachObjGroup({obj: obj});		// удаляем объект из группы (если есть группа)
	}
	

	for(var i = 0; i < arr.length; i++)
	{	
		updateListTubeUI_1({type: 'delete', o: arr[i]});
		deleteValueFromArrya({arr : infProject.scene.array.obj, o : arr[i]});				

		var arrO = getAllChildObect({obj: obj});
		for(var i2 = 0; i2 < arrO.length; i2++)
		{
			disposeNode(arrO[i2]);
		}
		
		scene.remove(arr[i]);
	}
	
	outlineRemoveObj();
}





// копируем объект или группу
function copyObj(cdm) 
{
	var obj = getObjFromPivotGizmo();
	
	if(!obj) return;	
	
	
	var arr = getObjsFromGroup_1({obj: obj});

	var flag = obj.userData.obj3D.group;	// группа или одиночный объект		
	
	var arr2 = [];
	
	for(var i = 0; i < arr.length; i++)
	{ 
		if(flag) 
		{
			var gr = arr[i].userData.obj3D.group;
			arr[i].userData.obj3D.group = null;			
		}
		
		var clone = arr2[arr2.length] = arr[i].clone();

		clone.userData.id = countId; countId++;

		infProject.scene.array.obj[infProject.scene.array.obj.length] = clone; 
		scene.add( clone );

		// клонируем материал
		clone.traverse( function ( child ) 
		{
			if ( child.isMesh ) 
			{ 
				if(child.userData.centerPoint)
				{
					child.material = infProject.material.pointObj.default;
				}
			}
		});

		updateListTubeUI_1({o: clone, type: 'add'});	// добавляем объект в UI список материалов 
		
		if(flag)
		{
			arr[i].userData.obj3D.group = gr;		// восстанавливаем группу
		}		
	}	
	 
	
	hidePivotGizmo(obj);
	
	if(flag)
	{
		addObjToGroup({arr: arr2});
	}
	else
	{
		clickObject3D( arr2[0], {click_obj: true, menu_1: true, outline: true} );
	}
}




function renameObject(cdm)
{
	var obj = cdm.obj;
	var name = cdm.name;
	
	if(!obj) return;
	
	name = name.trim();
	
	if(obj.userData.obj3D) 
	{ 
		obj.userData.obj3D.nameRus = name;
		
		console.log('obj3D.nameRus');
	}
	else if(obj.userData.centerPoint)
	{		
		obj.userData.centerPoint.nameRus = name;

		console.log('centerPoint.nameRus');
	}
	
	
	var arr1 = infProject.list.rp_ui.arr;
	var arr2 = [];
	
	for(var i = 0; i < arr1.length; i++)
	{
		arr2[arr2.length] = {o: arr1[i].o, el: arr1[i].el};
		
		for(var i2 = 0; i2 < arr1[i].p.length; i2++)
		{
			arr2[arr2.length] = {o: arr1[i].p[i2].o, el: arr1[i].p[i2].el};
		}
	}
	
	
	for(var i = 0; i < arr2.length; i++)
	{
		if(arr2[i].o == obj)
		{
			var nameItem = arr2[i].el[0].querySelector('[nameId="nameItem"]');
			nameItem.innerText = name;  
			break;
		}
	}
	
	
}




// кликнули на другой объект, деактивируем объект
function deClickObj(cdm)  
{	
	var obj = cdm.obj;
	

	if(clickO.rayhit)
	{  
		// если выбран тот же самый объект, который хотим скрыть, то не скрываем его
		if(cdm.moment == 'down' && camera == cameraTop)
		{ 
			if(clickO.rayhit.object == obj && !infProject.list.alignP.active) return;
			
			if(clickO.rayhit.object.userData.tag == 'pivot') return;
			if(clickO.rayhit.object.userData.tag == 'gizmo') return;
		}
		
		if(cdm.moment == 'up' && camera == camera3D)
		{
			if(clickO.rayhit.object == obj && !infProject.list.alignP.active) return;
			
			if(clickO.rayhit.object.userData.tag == 'pivot') return;
			if(clickO.rayhit.object.userData.tag == 'gizmo') return;
		}		
	}	


	if(cdm.moment == 'down' && camera == cameraTop && !checkClickTumbler_1())
	{ 
		deClickObj_1();
	}
	else if(cdm.moment == 'up' && camera == camera3D && !checkClickTumbler_1())
	{
		deClickObj_1(); 
	}
	else if(cdm.moment == '')
	{  
		deClickObj_1();
	}	
	
	
	
	function deClickObj_1()
	{ 
		hidePivotGizmo(obj);

		switchSelectAddObjGroup({active: false});
		switchAlignPoint_1({active: false});

		// скрываем разъемы
		{
			var arr = [];
			
			if(obj.userData.tag == 'joinPoint')
			{
				var obj3D = getParentObj({obj: obj});
				arr = getCenterPointFromObj_1( obj3D );
			}

			if(obj.userData.tag == 'obj')
			{
				arr = getCenterPointFromObj_1( obj );
			}			
			
			
			for ( var i = 0; i < arr.length; i++ )
			{ 
				arr[i].material = infProject.material.pointObj.default;
				arr[i].visible = false;
			}		
		}	
		
		activeObjRightPanelUI_1();		// скрываем UI
		
		outlineRemoveObj();		
		
		resetClickLastObj({});			
	}
		
	
	
	// проверяем куда кликнули
	function checkClickTumbler_1()
	{  
		if(clickO.rayhit)
		{  			
			if(infProject.list.alignP.active) 
			{
				if(clickO.rayhit.object.userData.tag == 'obj') { return checkWFPoint_2({obj: obj, obj3D: clickO.rayhit.object}); }
				if(clickO.rayhit.object.userData.tag == 'wf_tube') { return true; }
				if(clickO.rayhit.object.userData.tag == 'wf_point') { return true; }
				if(clickO.rayhit.object.userData.tag == 'joinPoint') { return checkObjPoint_1({obj: clickO.rayhit.object}); }
			}
			
			if(infProject.list.mergeO.active)
			{
				if(clickO.rayhit.object.userData.tag == 'obj') { return true; }
			}
		}

		return false;
	}
	
	
	// кликнули на другой разъем 
	function checkObjPoint_1(cdm)
	{
		var obj = cdm.obj;
		var arr = infProject.list.alignP.arr2;
		
		for(var i = 0; i < arr.length; i++)
		{ 
			if(arr[i].o == obj) return true;
		}

		return false;
	}
	
	
	// провереям что клинули на другой объект, а не на тот у которого активированна точка
	function checkWFPoint_2(cdm)
	{
		var obj = cdm.obj;
		var obj3D_1 = cdm.obj3D;
		
		if(obj.userData.tag != 'joinPoint') return true;		// точка была НЕ активированна (отбой) 
		
		var obj3D_2 = getParentObj({obj: obj});
		
		if(obj3D_1 == obj3D_2) return false;

		return true;	// клинули на другой объект
	}		
	

}





