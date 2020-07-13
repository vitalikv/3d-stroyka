








// пускаем луч, определяем кликнули ли на разъем активированного объекта
function clickRayJoinPoint()
{  
	var rayhit = null;
	
	var obj = null;
	
	if(clickO.last_obj)
	{
		if(clickO.last_obj.userData.tag == 'obj'){ obj = clickO.last_obj; }
		if(clickO.last_obj.userData.tag == 'joinPoint'){ obj = getParentObj({obj: clickO.last_obj}); }
	}
	
	var arr = [];
		
	if(obj)
	{			
		arr = getCenterPointFromObj_1( obj );			
	}
	 
	var ray = rayIntersect( event, arr, 'arr' );  
	if(ray) { if(ray.length > 0) { rayhit = ray[0]; return rayhit; } }

	return null;
}



// кликнули на разъем, распределяем что делать
function clickFirstCenterPoint(cdm)
{
	var obj = cdm.obj;
	var rayhit = cdm.rayhit;
		
	if(infProject.list.alignP.p2) { clickItemCenterObjUI_2({obj: obj}); }
	else { clickObject3D(obj, {menu_1: true}); }
}




function showHideJP(cdm) 
{
	if(!cdm) { cdm = {} }			

	var obj = null;
	
	if(infProject.settings.active.pg == 'pivot'){ var obj = infProject.tools.pivot.userData.pivot.obj; }	
	if(infProject.settings.active.pg == 'gizmo'){ var obj = infProject.tools.gizmo.userData.gizmo.obj; } 
	if(obj.userData.tag == 'joinPoint') { var o2 = obj; obj = getParentObj({obj: obj}); }
	
	if(!obj) return;	
	
	
	var arr = getCenterPointFromObj_1( obj );
	
	for(var i = 0; i < arr.length; i++)
	{				
		arr[i].visible = true;	
	}	
	
	setScaleJoinPoint({arr: arr}); 
	
	if(o2) { activeJoinPoint({obj: o2}); }
}





 
// активируем точку-соединитель 
function activeJoinPoint(cdm)
{
	var obj = null;
	if(cdm.obj) { obj = cdm.obj; }
	
	if(!obj) return;	
	 
	obj.material = infProject.material.pointObj.active; 
}






// масштаб соединительных точек у объектов
function setScaleJoinPoint(cdm) 
{ 
	if(!cdm) { cdm = {}; }	
	
	var arr = null;
	
	if(cdm.arr) { arr = cdm.arr; }
	else 
	{
		var obj = clickO.last_obj; 	
		if(!obj) return;
		
		if(obj.userData.obj3D) { arr = getCenterPointFromObj_1(obj); }		
		else if(obj.userData.centerPoint) { arr = getCenterPointFromObj_1(obj.parent); }		
	}
	
	if(!arr) return;	
	
	
	if(camera == cameraTop)
	{		
		var scale = 3.5/camera.zoom;	
		
		if(scale > 1.4) { scale = 1.4; }
		else if(scale < 0.1) { scale = 0.1; }	
		
		for ( var i = 0; i < arr.length; i++ )
		{ 
			arr[i].scale.set( scale,scale,scale );			
		}	
	}	
	else if(camera == camera3D)
	{
		for ( var i = 0; i < arr.length; i++ )
		{ 
			var scale = camera.position.distanceTo(arr[i].getWorldPosition(new THREE.Vector3()))/2;	

			if(scale > 1.2) scale = 1.2;
			
			arr[i].scale.set( scale,scale,scale );			
		}							
	}
}







