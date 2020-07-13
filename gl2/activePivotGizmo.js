




// ставим pivot/gizmo
function setPivotGizmo(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;		
	
	
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
	if(camera == cameraTop)	// глобальный gizmo
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
	
	
	upMenuPosObjPop(obj);
	upMenuRotateObjPop(obj);
	
	setScalePivotGizmo();
}






// масштаб Pivot/Gizmo
function setScalePivotGizmo()
{
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;
	
	var pVis = false;
	var gVis = false;

	
	if(pivot.visible) { pVis = true; }
	if(gizmo.visible) { gVis = true; }	
	if(!pVis && !gVis) { return; }
	
	var obj = null;
	
	if(pVis) obj = pivot.userData.pivot.obj;
	if(gVis) obj = gizmo.userData.gizmo.obj;
	if(!obj) return;
	
	if(camera == cameraTop)
	{		
		var scale = 1/camera.zoom;	
		
		if(pVis) pivot.scale.set( scale,scale,scale );
		if(gVis) gizmo.scale.set( scale,scale,scale );
	}
	else
	{
		if(obj.userData.tag == 'joinPoint')		// разъем
		{
			var dist = camera.position.distanceTo(obj.getWorldPosition(new THREE.Vector3())); 
		}
		else if(obj.userData.tag == 'wf_tube')		// труба
		{
			var dist = camera.position.distanceTo(pivot.position); 
		}			
		else			// группа или объект
		{
			var dist = camera.position.distanceTo(obj.position); 
		}			
		
		var scale = dist/6;	
		
		if(pVis) pivot.scale.set( scale,scale,scale );
		if(gVis) gizmo.scale.set( scale,scale,scale );		
	}
}


