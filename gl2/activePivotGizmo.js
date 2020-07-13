





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


