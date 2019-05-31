


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
	point.userData.wf_point.line = { o : (!cdm.line) ? null : cdm.line }
	scene.add( point );


	arr_wf.point[arr_wf.point.length] = point;
	
	return point;	
}




// перетаскиваем точку, оновляем форму линии
function moveWFPoint(event, obj)
{
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	obj.position.copy(intersects[0].point);
	
	if(obj.userData.wf_point.line.o)
	{
		var line = obj.userData.wf_point.line.o;
		
		line.geometry.vertices[line.geometry.vertices.length - 1] = obj.position;
		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;			
	}
}



// обновляем или создаем линию
function upLineWF(point)
{
	point.userData.wf_point.type = '';
	
	var line = point.userData.wf_point.line.o;
	
	if(!point.userData.wf_point.line.o)
	{
		var geometry = new THREE.Geometry();
		geometry.vertices.push(point.position.clone());
		
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x777777 }) );
		line.userData.wf_line = {};
		line.userData.wf_line.point = [point];
		scene.add( line );
		
		point.userData.wf_point.line.o = line;
	}
	
	
	var point_2 = createPointWF({ pos : point.position.clone(), type : 'tool', line : line }); 
			
	var geometry = new THREE.Geometry();
	geometry.vertices = line.geometry.vertices;	
	geometry.vertices.push(point_2.position.clone());
	
	line.geometry = geometry;
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;	
	
	line.userData.wf_line.point.push(point_2);

	obj_selected = point_2;
}



// нажали на правую кнопку мыши, когда создаем линию
function clickRightMouseLineWF(obj)
{
	if(obj.userData.wf_point.type != 'tool') return;
	
	arr_wf.point.pop();	// удаляем последнее значение в массиве
	
	var line = obj.userData.wf_point.line.o;
	line.userData.wf_line.point.pop();
	
	scene.remove(obj);

	var geometry = new THREE.Geometry();
	line.geometry.vertices.pop();
	geometry.vertices = line.geometry.vertices;	
	
	line.geometry = geometry;
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true; 	
}


// удаление значения из массива 
function deleteValueFromArrya(obj)
{
	for(var i = arr_wf.point.length - 1; i > -1; i--) { if(arr_wf.point[i] == obj) { arr_wf.point.splice(i, 1); break; } }
}



