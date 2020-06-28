



// создаем инструмент 
function createJoinP()
{
	var joint = {};
	joint.arr1 = [];
	joint.arr2 = [];
	joint.el = [];
	joint.active = false;
	joint.active_1 = null;
	joint.active_2 = null;
	joint.material = {};
	joint.material.active = new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true, opacity: 1.0, depthTest: false, lightMap: lightMap_1 });
	joint.visible = false;
	

	return joint;	
}



function clickRayJoinPoint()
{
	var rayhit = null;
	var arr = infProject.tools.joint.arr1;
	
	if(arr.length > 0)
	{
		var ray = rayIntersect( event, arr, 'arr' ); 
		if(ray.length > 0) 
		{ 
			rayhit = ray[0];
			infProject.tools.joint.active_1 = rayhit.object;
			return rayhit; 
		}


		var arr2 = infProject.tools.joint.arr2;
		
		if(arr2)
		{
			var ray = rayIntersect( event, arr2, 'arr' ); 
			if(ray.length > 0) 
			{ 
				rayhit = ray[0];
				infProject.tools.joint.active_2 = rayhit.object;
				return rayhit; 
			}						
		}				
	}
	
	
	return null;
}



// кликнули на разъем, распределяем что делать
function clickFirstCenterPoint(cdm)
{
	var obj = cdm.obj;
	var rayhit = cdm.rayhit;
	
	if(infProject.list.rp_wf_point.align.active) { clickItemCenterObjUI_3({obj: obj}); }	
	else if(infProject.tools.joint.active_2) { clickItemCenterObjUI_2({obj: obj}); }
	else { clickObject3D(obj, {menu_1: true}); }
}




function showHideJP(cdm)
{
	if(!cdm) { cdm = {} }
	
	if(cdm.switch) { infProject.settings.active.joinP = !infProject.settings.active.joinP; }
	
	var active = infProject.settings.active.joinP;			

	if(infProject.settings.active.pg == 'pivot'){ var obj = infProject.tools.pivot.userData.pivot.obj; }	
	if(infProject.settings.active.pg == 'gizmo'){ var obj = infProject.tools.gizmo.userData.gizmo.obj; } 
	if(obj.userData.tag == 'joinPoint') { var o2 = obj; obj = obj.parent; }

	
	if(!active) 
	{
		hideJoinPoint();
		if(cdm.switch) { clickItemObjNameUI({obj: obj}); }
	}
	else 
	{		
		showJoinPoint({obj: obj, o2: o2});			
	}
}



// показываем точки-соединители
function showJoinPoint(cdm)
{
	if(!cdm.obj) return;
	var obj = cdm.obj;	
	
	if(infProject.settings.active.group) { hideJoinPoint(); }
	else { hideJoinPoint({clear: 2}); }
	
	var joint = infProject.tools.joint;	
	var arr = getCenterPointFromObj_1( obj );
	
	for(var i = 0; i < arr.length; i++)
	{		
		//if(arr[i].userData.centerPoint.join) continue; 	// точка уже соеденина с другой точкой
		
		arr[i].visible = true;
		arr[i].material.color = arr[i].userData.centerPoint.color.clone();	
	}	
	
	setScaleJoinPoint({arr: arr});
		
	joint.arr1 = arr;
	joint.visible = true; 
	$('[nameId="show_join_point_checked"]').show(); 
	
	if(cdm.o2) { activeJoinPoint({obj: cdm.o2}); }
}






// скрываем у объекта точки-соединители 
function hideJoinPoint(cdm)
{
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;	
	
	var active = null;  
	if(cdm.visible == 'full') {}
	else if(joint.active_1) { active = joint.active_1; }
	
	var arr = joint.arr1; 
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = false;
		arr[i].material.color = arr[i].userData.centerPoint.color.clone();					
	}
	
	var arr = joint.arr2;
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = false;
		arr[i].material.color = arr[i].userData.centerPoint.color.clone();					
	}
	
	joint.arr1 = [];
	joint.arr2 = [];
	joint.active_1 = null;
	joint.active_2 = null;	
	joint.visible = false;
	$('[nameId="show_join_point_checked"]').hide();
	
	//if(active) { activeJoinPoint({obj: active}); }
}



 
// активируем точку-соединитель 
function activeJoinPoint(cdm)
{
	var obj = null;
	if(cdm.obj) { obj = cdm.obj; }
	
	if(!obj) return;
	
	var joint = infProject.tools.joint;
	
	if(joint.active_1)	// снимаем старое выделение 
	{
		if(!joint.visible) { joint.active_1.visible = false; }
		joint.active_1.material.color = joint.active_1.userData.centerPoint.color.clone();
		joint.active_1 = null;		
	}
	
	if(!joint.visible) { joint.arr1 = [obj]; }
	 
	obj.material.color = joint.material.active.color.clone();
	obj.visible = true;
	joint.active_1 = obj;
}








// масштаб соединительных точек у объектов
function setScaleJoinPoint(cdm) 
{ 
	if(!cdm) { cdm = {}; }
	
	var active = infProject.settings.active.joinP;	
	if(!active) return;
	
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
		var scale = 1/camera.zoom+0.5;	
		
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







