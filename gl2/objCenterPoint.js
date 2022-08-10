








// пускаем луч, определяем кликнули ли на разъем активированного объекта
function clickRayJoinPoint({event, obj})
{ 
	if(!obj) return;
	
	if(obj.userData.tag == 'obj' || obj.userData.tag == 'joinPoint'){  }
	else { return null; }
	
	let rayhit = null;
		
	let arr = getCenterPointFromObj_1( obj );
	 
	let ray = rayIntersect( event, arr, 'arr' );  
	if(ray) { if(ray.length > 0) { rayhit = ray[0]; } }

	return rayhit;
}




// показываем/скрываем разъемы объекта
function showHideJP({obj} = {obj: null}) 
{		
	if(!obj) obj = infProject.tools.pg.obj;	
	if(!obj) return;
	
	let arr = getCenterPointFromObj_1( obj );
	
	arr.forEach((o) => { o.visible = true; o.material = infProject.material.pointObj.default; } );	
	
	setScaleJoinPoint({arr: arr}); 
	
	if(obj.userData.tag == 'joinPoint') { activeJoinPoint({obj}); }
}





 
// активируем точку-соединитель 
function activeJoinPoint({obj})
{
	if(!obj) return;		 
	obj.material = infProject.material.pointObj.active; 
}






// масштаб соединительных точек у объектов
function setScaleJoinPoint(cdm)  
{ 
	if(!cdm) { cdm = {}; }	
	
	var arr = [];
	
	if(cdm.arr) 
	{ 
		arr = cdm.arr; 
	}
	else 
	{
		var obj = clickO.last_obj; 	
		if(!obj) return;
		
		if(obj.userData.obj3D || obj.userData.centerPoint) 
		{ 
			arr = getCenterPointFromObj_1(obj); 
		}				
	}
	
	if(arr.length == 0) return;	
 
	
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







