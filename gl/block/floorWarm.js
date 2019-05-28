


var arr_wf = { point: [] };


// создаем точку для теплого пола
function createPointWF(cdm)
{
	var point = new THREE.Mesh( p_tool.geometry, new THREE.MeshLambertMaterial( { color : 0x333333, transparent: true, opacity: 0.6, depthTest: false } ) ); 
	point.position.copy( cdm.pos );		

	point.renderOrder = 1;
	
	if(!cdm.id) { var id = countId; countId++; }
	else { var id = cdm.id; }
	
	point.userData.id = id;	
	point.userData.tag = 'wf_point';
	point.userData.wf_point = {};
	point.userData.wf_point.color = point.material.color.clone();
	point.userData.wf_point.type = (cdm.type) ? cdm.type : '';
	point.userData.wf_point.line = { o : null, p : [] }
	scene.add( point );

	arr_wf.point[arr_wf.point.length] = point;
	
	if(cdm.createLine)
	{
		var geometry = new THREE.Geometry();
		geometry.vertices.push(point.position.clone(), point.position.clone());
		
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x777777 }) );
		scene.add( line );

		point.userData.wf_point.line = line;
	}
	
	return point;	
}




// перетаскиваем точку
function moveWFPoint(event, obj)
{
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	obj.position.copy(intersects[0].point);
	
	//upLineWF(point);
}




function upLineWF(point)
{
	if(!point.userData.wf_point.line.o)
	{
		if(point.userData.wf_point.line.p.length == 1)
		{
			var geometry = new THREE.Geometry();
			geometry.vertices.push(point.position.clone(), point.position.clone());
			
			var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x777777 }) );
			scene.add( line );			
		}
	}
}




// удаление значения из массива 
function deleteValueFromArrya(obj)
{
	for(var i = arr_wf.point.length - 1; i > -1; i--) { if(arr_wf.point[i] == obj) { arr_wf.point.splice(i, 1); break; } }
}



