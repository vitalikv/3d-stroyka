



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

	infProject.tools.pivot.userData.propPivot({type: 'moveObjs', obj, arrO, offset});
}










// получаем все разъемы объекта
function getCenterPointFromObj_1( obj )
{
	let arr = [];
	
	if(obj.userData.centerPoint) obj = obj.parent;
	
	if(obj.userData.obj3D)
	{
		for(let i = 0; i < obj.children.length; i++)
		{
			let child = obj.children[i];
			if(!child.userData.centerPoint) continue;
			
			arr.push(child);
		}
	}
	
	return arr; 
}	
	












