








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
















