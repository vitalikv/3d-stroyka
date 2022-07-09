



// перемещение объекта после того как загрузили из каталога 
function moveObjFromCatalog( event )
{	
	let intersects = rayIntersect( event, planeMath, 'one' ); 	
	if(intersects.length == 0) return;
	
	let obj = clickO.move;		
	
	if(clickO.arrO.length == 0) clickO.arrO = [obj];
	if(!clickO.actMove) clickO.actMove = true;	
	
	
	let pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );		
	let offset = new THREE.Vector3().subVectors( pos, obj.position ); 

	let arrO = clickO.arrO; 

	infProject.tools.pivot.userData.propPivot({type: 'moveObjs', obj: obj, arrO: arrO, offset: offset});
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
function clickFirstObj3D({obj})
{	
	if(infProject.list.mergeO.active && infProject.list.mergeO.o1.length) { selectObjForMergeToGroup({obj: obj}); }	
	else { clickObject3D( obj, {menu_1: true, outline: true} ); }	 	
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

	
	if(cdm.menu_1) // обновляем правое меню 
	{ 
		activeObjRightPanelUI_1({obj: obj}); 
	}												
	showHideJP();
	
	setClickLastObj({obj: obj});
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
	else
	{
		return;
	}
	
	
	upItemObjNameUI({obj: obj});	// переименовываем название во вкладке "объект"	

	infProject.ui.rpanel.EstList.updateItem({obj});	// переименовываем название во вкладке "список"
	
	// переименовываем название во вкладке "объект"
	function upItemObjNameUI(cdm)
	{
		var obj = cdm.obj;
		
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
				var nameItem = arr2[i].el.querySelector('[nameId="nameItem"]');
				nameItem.innerText = obj.userData.obj3D.nameRus;  
				break;
			}
		}		
	}	
}




// кликнули на другой объект, деактивируем объект
function deClickObj({obj, moment})  
{	
	if(moment == 'down' && camera == cameraTop && !checkClickTumbler_1()) deClickObj_1();
	else if(moment == 'up' && camera == camera3D && !checkClickTumbler_1()) deClickObj_1();
	else if(moment == '') deClickObj_1();	
	
	
	
	function deClickObj_1()
	{ 
		

  
		// скрываем разъемы
		if(obj.userData.tag == 'obj' || obj.userData.tag == 'joinPoint')
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
		
		infProject.tools.pg.hide();
		activeObjRightPanelUI_1();		// скрываем UI
		
		outlineRemoveObj();					
	}

	
	// проверяем куда кликнули
	function checkClickTumbler_1()
	{  
		if(clickO.rayhit)
		{  			
			if(infProject.list.mergeO.active)
			{
				if(clickO.rayhit.object.userData.tag == 'obj') { return true; }
				if(clickO.rayhit.object.userData.tag == 'wf_tube') { return true; }
			}
		}							

		return false;
	}
}





