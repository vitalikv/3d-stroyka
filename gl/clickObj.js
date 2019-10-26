

// кликнули на 3D объект в 2D режиме, подготавляем к перемещению
function clickObject2D( obj, intersect )
{	
	var obj = clickO.move = intersect.object;  
	
	clickO.offset = new THREE.Vector3().subVectors( obj.position, intersect.point );	
	
	planeMath.position.copy( intersect.point );
	planeMath.rotation.set( Math.PI/2, 0, 0 );
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
	
	if(cdm.group !== undefined) { infProject.settings.active.group = cdm.group; } 
	
	
	// кликнули по объекту в сцене
	if(cdm.click_obj)
	{
		// один разъем уже выделин 
		if(infProject.tools.joint.active_1)
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
		else if(infProject.ui.group_obj.active)
		{
			
		}
		else if(infProject.ui.center_obj.active)
		{
			var arr = getArrayJointPoint({obj: obj, group: true});
			
			if(arr.length > 0) { obj = arr[0]; }
		}
	}
	
	
	// Position
	if(obj.userData.tag == 'joinPoint')		// разъем
	{
		var pos = obj.getWorldPosition(new THREE.Vector3());
		activeJoinPoint({obj: obj});
	}	
	else if(obj.userData.obj3D.group && infProject.settings.active.group)		// группа
	{
		var pos = obj.userData.obj3D.group.userData.groupObj.centerObj.getWorldPosition(new THREE.Vector3());  
	}
	else			// объект
	{
		obj.updateMatrixWorld();
		var pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );		
	}	 
	
	
	// Quaternion
	if(1==2)	// глобальный gizmo
	{
		var qt = new THREE.Quaternion();
	}
	else		// локальный gizmo, относительно centerObj
	{					
		if(obj.userData.tag == 'joinPoint')		// разъем
		{
			var qt = obj.getWorldQuaternion(new THREE.Quaternion()); 
		}	
		else if(obj.userData.obj3D.group && infProject.settings.active.group)		// группа
		{
			var qt = obj.userData.obj3D.group.userData.groupObj.centerObj.getWorldQuaternion(new THREE.Quaternion());  
		}
		else			// объект
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
		
		clippingGizmo360(obj); 		
	}	
	
	
	if(infProject.ui.group_obj.active)		// показаны группы
	{
		if(cdm.outline) { outlineAddObj(obj); }	
		if(cdm.menu_1) { clickObjUI({obj: obj}); }		// обновляем правое меню 					
	}
	else if(infProject.ui.center_obj.active)	// показаны центры
	{
		if(obj.userData.tag == 'joinPoint')
		{
			if(cdm.outline) { outlineAddObj(obj.parent); }	
			if(cdm.menu_1) { clickObjUI({obj: obj.parent}); }		// обновляем правое меню 			
		}
		else
		{
			if(cdm.outline) { outlineAddObj(obj); }	
			if(cdm.menu_1) { clickObjUI({obj: obj}); }		// обновляем правое меню 								
		}
	}	
	
	setScalePivotGizmo();
}


// пролучить все объекты принадлежащие группе (минус центральный куб)
function getObjsFromGroup_1( obj )
{
	var arr = [ obj ];
	
	if(obj.userData.obj3D)
	{
		if(obj.userData.obj3D.group)
		{
			var objs = obj.userData.obj3D.group.userData.groupObj.child;
			var arr = [];
			
			for(var i = 0; i < objs.length; i++)
			{
				if(!objs[i].userData.obj3D) continue;
				
				arr[arr.length] = objs[i];
			}
		}
	}
	
	return arr;	
}

// пролучить все объекты принадлежащие группе 
function getObjsFromGroup( obj ) 
{	
	var arr = [ obj ];
	
	if(obj.userData.obj3D)
	{
		if(obj.userData.obj3D.group)
		{
			var objs = infProject.scene.array.obj;
			var arr = [];
			
			for(var i = 0; i < objs.length; i++)
			{
				if(!objs[i].userData.obj3D.group) continue;
				if(obj.userData.obj3D.group != objs[i].userData.obj3D.group) continue;
				
				arr[arr.length] = objs[i];
			}
		}
	}
	
	return arr;  
}
	
	

// удаление объекта
function deleteObjectPop(obj)
{ 
	clickO = resetPop.clickO(); 
	
	hidePivotGizmo(obj);
	
	var arr = [];
	
	if(obj.userData.obj3D.group)
	{
		var group = obj.userData.obj3D.group;
		arr = group.userData.groupObj.child;
		 
		for(var i = 0; i < arr.length; i++){ deleteValueFromArrya({arr : infProject.scene.array.obj, o : arr[i]}); }		
		deleteValueFromArrya({arr : infProject.scene.array.group, o : group});

		clearChildGroupUI();	// очищаем список дочерних объектов группы UI 
	}
	else
	{
		arr[0] = obj;
	}
	
	updateListTubeUI_1({uuid: obj.uuid, type: 'delete'});
	
	
	for(var i = 0; i < arr.length; i++)
	{	
		disposeNode(arr[i]);
		scene.remove(arr[i]); 
	}
	
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
	}	
	
	
	
	pivot.visible = false;
	gizmo.visible = false;
	hideJoinPoint({visible: 'full'});
	
	pivot.userData.pivot.obj = null;
	gizmo.userData.gizmo.obj = null;
	
	//clickO.obj = null;  
	clickO.last_obj = null;
	
	$('[nameId="wrap_object_1"]').hide();
	
	
	outlineRemoveObj();
}



// при выделении объекта, показываем меню 
function showObjUI()
{	
	$('[nameId="wrap_object_1"]').show();
}



// переключаем Pivot/Gizmo/joint
function switchPivotGizmo(cdm)
{
	var obj = getObjFromPivotGizmo();
	
	if(!obj) return;	
	
	infProject.settings.active.pg = cdm.mode;	
	if(cdm.group !== undefined) { infProject.settings.active.group = cdm.group; }

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








