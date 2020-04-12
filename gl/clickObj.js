

// кликнули на 3D объект в 2D режиме, подготавляем к перемещению
function clickObject2D( obj, intersect )
{	
	var obj = clickO.move = intersect.object;  
	
	clickO.offset = new THREE.Vector3().subVectors( obj.position, intersect.point );	
	
	planeMath.position.copy( intersect.point );
	planeMath.rotation.set( Math.PI/2, 0, 0 );
	
	if(camera == cameraTop && obj.userData.tag == 'boxWF')
	{
		showToggleGp(); 
		showBoxWF_UI();
	}

	setClickLastObj({obj: obj});
}



// перемещение по 2D плоскости 
function moveObjectPop( event )
{	
	var intersects = rayIntersect( event, planeMath, 'one' ); 
	
	if(intersects.length == 0) return;
	
	var obj = clickO.move;
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
		
		if(obj.userData.tag == 'boxWF') { hideControlWF(); }
	}	
	
	
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );	
	
	var pos2 = new THREE.Vector3().subVectors( pos, obj.position );
	obj.position.add( pos2 );	
}




function clickMouseUpObject(obj)
{
	if(clickO.actMove)
	{		
		if(obj.userData.tag == 'boxWF') { showToggleGp(); }
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


// активируем 3D объект или разъем, ставим pivot/gizmo
function clickObject3D( obj, cdm )
{
	if(!cdm) { cdm = {}; }
	
	
	// кликнули по объекту в сцене
	if(cdm.click_obj)
	{   
		if(infProject.tools.merge_obj.active && infProject.tools.merge_obj.o1.length)	// вкл режим выбрать объекты для объединения в группу
		{ 
			var arr_1 = getObjsFromGroup_1({obj: obj});
			
			for(var i = 0; i < arr_1.length; i++)
			{
				if(!compareSelectedObjWithCurrent({obj: arr_1[i], arr: infProject.tools.merge_obj.o2}))
				{
					if(!compareSelectedObjWithCurrent({obj: arr_1[i], arr: infProject.tools.merge_obj.o1}))
					{
						infProject.tools.merge_obj.o2[infProject.tools.merge_obj.o2.length] = arr_1[i];
					}						
				}					
			}
			
			
			var arr = [];
			
			for(var i = 0; i < infProject.tools.merge_obj.o1.length; i++)
			{
				arr[arr.length] = infProject.tools.merge_obj.o1[i];
			}
			
			for(var i = 0; i < infProject.tools.merge_obj.o2.length; i++)
			{
				arr[arr.length] = infProject.tools.merge_obj.o2[i];
			}				
			
			showListSelectedObjGroupUI();
			
			outlineAddObj(obj, {arrO: arr});
			
			return;
		}
		
		if(infProject.tools.joint.active)		// вкл режим соединение объектов и один разъем уже выделин  
		{			
			if(!compareSelectedObjWithCurrent({obj: obj, arr: outlinePass.selectedObjects}))	// кликаем на другой объект, чтобы показать его разъемы	   
			{
				showJoinPoint_2({obj: obj});  
				return;			
			}
			else		// кликаем на этот же объект (ничего не делаем)
			{
				return;
			}
		}
	}
	
	
	// Position
	if(obj.userData.tag == 'joinPoint')		// разъем
	{ 
		var pos = obj.getWorldPosition(new THREE.Vector3());
		activeJoinPoint({obj: obj});
	}	
	else			// группа или объект
	{
		obj.updateMatrixWorld();
		var pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );		
	}	 
	
	
	// Quaternion
	if(1==2)	// глобальный gizmo
	{
		var qt = new THREE.Quaternion();
	}
	else		// локальный gizmo
	{					
		if(obj.userData.tag == 'joinPoint')		// разъем
		{
			var qt = obj.getWorldQuaternion(new THREE.Quaternion()); 
		}	
		else			// группа или объект
		{
			var qt = obj.quaternion.clone();		
		}	 		
	}		
	
	
	
	if(infProject.settings.active.pg == 'pivot')
	{
		var pivot = infProject.tools.pivot;	
		pivot.visible = true;	
		pivot.userData.pivot.obj = obj;
		pivot.position.copy(pos);
		pivot.quaternion.copy(qt);
		
		if(camera == cameraTop)
		{
			pivot.children[1].visible = false;
			pivot.children[7].visible = false;
		}
		else
		{
			pivot.children[1].visible = true;
			pivot.children[7].visible = true;
		}
		
		upMenuPosObjPop(obj);
	}
	
	if(infProject.settings.active.pg == 'gizmo')
	{
		var gizmo = infProject.tools.gizmo;
					
		gizmo.position.copy( pos );
		
		gizmo.visible = true;
		gizmo.userData.gizmo.obj = obj;
		
		if(camera == cameraTop)
		{
			gizmo.children[1].visible = false;
			gizmo.children[2].visible = false;
			
			//gizmo.rotation.set(0,0,0);
		}
		else
		{
			gizmo.children[1].visible = true;
			gizmo.children[2].visible = true;			
		}

		gizmo.quaternion.copy( qt );
				
		upMenuRotateObjPop(obj);
		
		clippingGizmo360(obj); 		
	}	
	
	
	if(cdm.outline) 
	{ 
		if(obj.userData.centerPoint) { outlineAddObj(obj.parent); }
		else { outlineAddObj(obj); } 
	}	
	if(cdm.menu_1) { clickObjUI({obj: obj}); }		// обновляем правое меню 										


	if(obj.userData.tag == 'obj') { activeObjRightPanelUI_1({obj: obj}); }
	
	setScalePivotGizmo();
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
	

// удаление объекта
function deleteObjectPop(obj)
{ 
	if(obj.userData.tag != 'obj') return;
	
	clickO = resetPop.clickO(); 
	
	hidePivotGizmo(obj);
	
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
	

	
	
	console.log(renderer.info.memory);
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
	console.log(renderer.info.memory);
	outlineRemoveObj();
}



// скрываем Pivot/Gizmo
function hidePivotGizmo(obj)
{
	if(!obj) return;
	if(!obj.userData.tag) return;	
	//if(obj.userData.tag != 'obj') return;
	
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;
	var joint = infProject.tools.joint;
				
	
	if(clickO.rayhit)
	{
		if(pivot.userData.pivot.obj == clickO.rayhit.object) return;		
		if(clickO.rayhit.object.userData.tag == 'pivot') return;
		
		if(gizmo.userData.gizmo.obj == clickO.rayhit.object) return;		
		if(clickO.rayhit.object.userData.tag == 'gizmo') return;
  
		//if(joint.obj_1 == clickO.rayhit.object) { return; }		
		if(clickO.rayhit.object.userData.tag == 'joinPoint') { return; }
		 
		if(1==1)
		{
			if(joint.active_1 && clickO.rayhit.object.userData.tag == 'obj')
			{
				return;			
			}			
		}
		
		if(infProject.tools.merge_obj.active && clickO.rayhit.object.userData.tag == 'obj')
		{  
			return;
		}
	}	
	
	
	
	pivot.visible = false;
	gizmo.visible = false;
	
	 
	
	pivot.userData.pivot.obj = null;
	gizmo.userData.gizmo.obj = null;
	
	switchSelectAddObjGroup({active: false});
	switchJoinObj({active: false});
	hideJoinPoint({visible: 'full'});
	
	//clickO.obj = null;  
	resetClickLastObj({});
	

	activeObjRightPanelUI_1();
	
	outlineRemoveObj();
}



// переключаем Pivot/Gizmo/joint
function switchPivotGizmo(cdm)
{
	var obj = getObjFromPivotGizmo();
	
	if(!obj) return;		
	
	infProject.settings.active.pg = cdm.mode;	
	if(cdm.group !== undefined) { infProject.settings.active.group = cdm.group; }
	
	infProject.tools.pivot.visible = false;
	infProject.tools.gizmo.visible = false;
	
	if(infProject.settings.active.pg == 'pivot'){ infProject.tools.pivot.visible = true; }	
	if(infProject.settings.active.pg == 'gizmo'){ infProject.tools.gizmo.visible = true; }		

	infProject.tools.pivot.userData.pivot.obj = null;
	infProject.tools.gizmo.userData.gizmo.obj = null;

	clickObject3D( obj ); 
}


// получаем активный объект
function getObjFromPivotGizmo(cdm)
{
	var obj = null;
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;	
	
	if(infProject.settings.active.pg == 'pivot'){ obj = pivot.userData.pivot.obj; }	
	if(infProject.settings.active.pg == 'gizmo'){ obj = gizmo.userData.gizmo.obj; }
	
	return obj;	
}




// вкл/выкл возможность выделение объектов для объединения в группу (merge)
function switchSelectAddObjGroup(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.tools.merge_obj.active = cdm.active;
	}
	else
	{
		infProject.tools.merge_obj.active = !infProject.tools.merge_obj.active;
	}		
	
	
	var obj = getObjFromPivotGizmo();
	
	if(obj) { outlineAddObj(obj); }
	else { outlineRemoveObj(); }
	
	
	if(infProject.tools.merge_obj.active)	// вкл
	{
		$('[nameId="rp_wrap_add_group"]').show();
		infProject.tools.merge_obj.o1 = [];	

		if(obj)
		{
			infProject.tools.merge_obj.o1 = getObjsFromGroup_1({obj: obj});
		}
		
		$('[nameId="bl_rp_obj_group"]').hide();
		$('[nameId="pr_list_button_for_obj"]').hide();		
	}
	else		// выкл
	{
		clearListUI_2({list: infProject.tools.merge_obj.el});
		$('[nameId="rp_wrap_add_group"]').hide();
		
		$('[nameId="bl_rp_obj_group"]').show();
		$('[nameId="pr_list_button_for_obj"]').show();		
		
		infProject.tools.merge_obj.o1 = [];
		infProject.tools.merge_obj.o2 = [];
	}	
}



// вкл/выкл возможность выделение объектов для присоединения 
function switchJoinObj(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.tools.joint.active = cdm.active;
	}	
	else
	{
		infProject.tools.joint.active = !infProject.tools.joint.active;
	}
	
	hideJoinPoint_2();
	
	if(infProject.tools.joint.active)	// вкл
	{		
		$('[nameId="rp_wrap_obj_align"]').show();
		$('[nameId="bl_rp_obj_group"]').hide();
		$('[nameId="pr_list_button_for_obj"]').hide();
	}		
	else		// выкл
	{				
		$('[nameId="rp_wrap_obj_align"]').hide();
		clearListUI_2({list: infProject.tools.joint.el});
		
		$('[nameId="bl_rp_obj_group"]').show();
		$('[nameId="pr_list_button_for_obj"]').show();
	}	

		
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



// сбрасываем rotation 
function objRotateReset(cdm)
{
	var obj = getObjFromPivotGizmo();
	
	if(!obj) return;


	var obj_1 = obj;		
	var diff_2 = obj_1.quaternion.clone().inverse();					// разница между Quaternions
	
	
	if(obj_1.userData.obj3D.group && infProject.settings.active.group)		// объект имеет группу и выдилен как группа	
	{
		var arr_2 = obj_1.userData.obj3D.group.userData.groupObj.child;
	}
	else	// объект без группы или объект с группой, но выдилен как отдельный объект
	{
		var arr_2 = [obj_1];
	}
	
	
	// поворачиваем объекты в нужном направлении 
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].quaternion.premultiply(diff_2);		// diff разницу умнажаем, чтобы получить то же угол	
		arr_2[i].updateMatrixWorld();		
	}
	
	
	if(obj.userData.tag == 'joinPoint')		// разъем
	{
		var pos = obj.getWorldPosition(new THREE.Vector3());   
	}
	else								//  группа или объект
	{
		var pos = obj.position.clone();		
	}		
	

	// вращаем position объектов, относительно точки-соединителя
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].position.sub(pos);
		arr_2[i].position.applyQuaternion(diff_2); 	
		arr_2[i].position.add(pos);
	}
	

	
	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }	
	

	if(obj.userData.tag == 'joinPoint')		// разъем
	{
		tools.quaternion.copy( obj.getWorldQuaternion(new THREE.Quaternion()) );
	}
	else
	{
		tools.rotation.copy( obj.rotation );
	}
	
	upMenuRotateObjPop(obj);
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
}



