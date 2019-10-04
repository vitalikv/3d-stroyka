

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




// кликнули на 3D объект, ставим pivot/gizmo
function clickObject3D( obj, intersect )
{
	var type = '';
	if(obj.parent.userData.tag)
	{
		obj = obj.parent;
	}		
	
	obj.updateMatrixWorld();
	var pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );	
	
	
	if(infProject.settings.active.pg == 'pivot')
	{
		var pivot = infProject.tools.pivot;	
		pivot.visible = true;	
		pivot.userData.pivot.obj = obj;
		pivot.position.copy(pos);

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
			
			gizmo.rotation.set(0,0,0);
		}
		else
		{
			gizmo.children[1].visible = true;
			gizmo.children[2].visible = true;
			
			gizmo.rotation.copy( obj.rotation );
		}		
		
		clippingGizmo360(obj); 		
	}
	
	if(infProject.settings.active.pg == 'joint') 
	{ 
		var joint = infProject.tools.joint;
		joint.visible = true;			
		joint.position.copy(pos);
		joint.rotation.copy( obj.rotation );
		
		showJoinPoint({obj: obj}); 
		
		if(!joint.userData.joint.obj) { joint.userData.joint.obj = obj; }
		else if (joint.userData.joint.obj == obj) {}
		else { joint.userData.joint.obj_2 = obj; }
	}
	
	setScalePivotGizmo();
}



// удаление объекта
function deleteObjectPop(obj)
{ 
	clickO = resetPop.clickO();
	
	hidePivotGizmo(obj);
	
	deleteValueFromArrya({arr : infProject.scene.array.obj, o : obj});
	
	updateListTubeUI_1({uuid: obj.uuid, type: 'delete'});
	
	disposeNode(obj);
	scene.remove(obj);	
}



// скрываем Pivot/Gizmo
function hidePivotGizmo(obj)
{
	if(!obj) return;
	if(!obj.userData.tag) return;
	if(obj.userData.tag != 'obj') return;
	
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;
	var joint = infProject.tools.joint;
	
	if(clickO.rayhit)
	{
		if(pivot.userData.pivot.obj == clickO.rayhit.object) return;		
		if(clickO.rayhit.object.userData.tag == 'pivot') return;
		
		if(gizmo.userData.gizmo.obj == clickO.rayhit.object) return;		
		if(clickO.rayhit.object.userData.tag == 'gizmo') return;

		if(joint.userData.joint.obj == clickO.rayhit.object) { $('[nameId="obj_b_menu_1"]').hide(); return; }		
		if(clickO.rayhit.object.userData.tag == 'joinPoint') { $('[nameId="obj_b_menu_1"]').hide(); return; }
		
		if(joint.visible && joint.userData.joint.obj && clickO.rayhit.object.userData.tag == 'obj')
		{
			var o = joint.userData.joint.obj;
			
			if(o.userData.joinPoint.active)
			{
				$('[nameId="obj_b_menu_1"]').hide(); return;
			}
			
		}
	}	
	
	pivot.visible = false;
	gizmo.visible = false;
	joint.visible = false;
	hideJoinPoint();
	
	pivot.userData.pivot.obj = null;
	gizmo.userData.gizmo.obj = null;
	joint.userData.joint.obj = null;
	joint.userData.joint.obj_2 = null;
	
	//clickO.obj = null;  
	clickO.last_obj = null;
	
	$('[nameId="obj_b_menu_1"]').hide();
	showHideJoinObjUI({visible: false});
}



// при выделении объекта, показываем меню 
function showObjUI()
{
	var joint = infProject.tools.joint;
	
	if(joint.visible && joint.userData.joint.obj && joint.userData.joint.obj_2)
	{
		showHideJoinObjUI({visible: true});
	}
	else
	{
		$('[nameId="obj_b_menu_1"]').show();
		
		showHideJoinObjUI({visible: false});		
	}
	
}



// переключаем Pivot/Gizmo/joint
function switchPivotGizmo(cdm)
{
	var obj = null;
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;	
	var joint = infProject.tools.joint;
	
	if(infProject.settings.active.pg == 'pivot'){ obj = pivot.userData.pivot.obj; pivot.visible = false; }	
	if(infProject.settings.active.pg == 'gizmo'){ obj = gizmo.userData.gizmo.obj; gizmo.visible = false; }
	if(infProject.settings.active.pg == 'joint'){ obj = joint.userData.joint.obj; joint.visible = false; hideJoinPoint(); }
	
	if(!obj) return;
	
	infProject.settings.active.pg = cdm.mode;

	pivot.userData.pivot.obj = null;
	gizmo.userData.gizmo.obj = null;
	joint.userData.joint.obj = null;
	joint.userData.joint.obj_2 = null;	

	clickObject3D( obj, null );
}







