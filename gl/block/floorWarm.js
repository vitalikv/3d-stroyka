


var arr_wf = { line : [], point : [] };


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
	point.userData.wf_point.cross = { o : null, point : [] };
	scene.add( point );


	arr_wf.point[arr_wf.point.length] = point;
	
	return point;	
}


// кликнули на точку
function clickWFPoint(intersect)
{
	if(obj_selected)
	{
		if(obj_selected.userData.wf_point.type == 'tool') { return; }	// вкл режим создания линии
	}		
	
	var obj = intersect.object;	
	obj_selected = obj;	
	
	offset = new THREE.Vector3().subVectors( intersect.object.position, intersect.point );
	planeMath.position.set( 0, intersect.point.y, 0 );
	planeMath.rotation.set(-Math.PI/2, 0, 0);
}




// перетаскиваем точку/tool, обновляем форму линии
function moveWFPoint(event, obj)
{
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	
	if(obj.userData.wf_point.type == 'tool') 
	{ 
		obj.position.copy(intersects[0].point); 

		dragToolWFPoint({obj : obj_selected});
	}
	else
	{
		var pos = new THREE.Vector3().addVectors( intersects[0].point, offset );
		obj.position.copy(pos);
	}
	
	
	// обновляем geometry линии
	if(obj.userData.wf_point.line.o)
	{
		var line = obj.userData.wf_point.line.o;
		
		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;

		// обновляем geometry трубы
		if(line.userData.wf_line.tube)
		{
			newTubeWF({line : line});
		}
	}
}





// перетаскиваем точку (определяем с чем пересекается)
function dragToolWFPoint(cdm)
{	
	var obj = cdm.obj;
	obj.userData.wf_point.cross = { o : null, point : [] };
	
	var arrDp = [];
	var arr = [];
	
	lineAxis_1.visible = false;
	
	var z = 0.1 / camera.zoom;
	
	for(var i = 0; i < arr_wf.line.length; i++)
	{ 
		//arrDp[arrDp.length] = arr_wf.line[i].userData.wf_line.point[0];
		//arrDp[arrDp.length] = arr_wf.line[i].userData.wf_line.point[arr_wf.line[i].userData.wf_line.point.length - 1];
		
		var line = arr_wf.line[i];
		var v = line.geometry.vertices;
		
		if(v.length < 2) continue;
		
		var dist1 = v[0].distanceTo(obj.position);
		var dist2 = v[v.length - 1].distanceTo(obj.position);
		
		if(dist1 < dist2)
		{
			var pos = v[0];
			var dist = dist1;
			var cross = line.userData.wf_line.point[0];
		}
		else
		{
			var pos = v[v.length - 1];
			var dist = dist2;
			var cross = line.userData.wf_line.point[line.userData.wf_line.point.length - 1];
		}
		
		if(dist < z) 
		{ 
			//getNearLineWF({dist: dist, p1: pos, p2: obj.position});
			arr[arr.length] = {dist: dist, p1: pos, p2: obj.position, cross: cross};
			continue; 
		}
		
		
		// пускаем перпендикуляр от точки на прямую
		for(var i2 = 0; i2 < v.length - 1; i2++)
		{
			if(!calScal(v[i2], v[i2 + 1], obj.position)) continue;	// проверяем попадает ли перпендикуляр от точки на прямую
			
			var pos = spPoint(v[i2], v[i2 + 1], obj.position);  
			var pos = new THREE.Vector3(pos.x, pos.y, pos.z);	// получаем точку пересечения точки на прямую
			
			var dist = pos.distanceTo(obj.position);
			
			if(dist > z) continue;	// расстояние от точки пересечения до перетаскиваемой точки				
			
			var point_1 = line.userData.wf_line.point[i2];
			var point_2 = line.userData.wf_line.point[i2];
			arr[arr.length] = {dist: dist, p1: pos, p2: obj.position, cross: line, point: [point_1, point_2]};
		}
		
		//arrDp[arrDp.length] = arr_wf.line[i].userData.wf_line.point[i].position;
	}
		
		
	if(arr.length > 1) arr.sort(function (a, b) { return a.dist - b.dist; });

	if(arr.length > 0) 
	{  
		obj.userData.wf_point.cross = {o: arr[0].cross, point: arr[0].point};
		obj.position.copy(arr[0].p1);
		//getNearLineWF(arr[0]);
	}
	
	renderCamera();
}





  
// устанвливаем и показываем красные линии
function getNearLineWF(cdm)
{
	var d = cdm.p1.distanceTo( cdm.p2 );	
	
	var v = lineAxis_1.geometry.vertices;		
	v[3].x = v[2].x = v[5].x = v[4].x = d;		
	lineAxis_1.geometry.verticesNeedUpdate = true;

	var dir = new THREE.Vector3().subVectors( cdm.p1, cdm.p2 ).normalize();
	var angleDeg = Math.atan2(dir.x, dir.z);
	lineAxis_1.rotation.set(0, angleDeg + Math.PI / 2, 0);		
	lineAxis_1.position.copy( cdm.p1 );
	
	lineAxis_1.visible = true;	
}


// создаем(активирована точка tool) или обновляем линию, если перетаскиваем точку
function upLineWF(point)
{
	point.userData.wf_point.type = '';
	
	var line = point.userData.wf_point.line.o;
	
	// создаем новую линию
	if(!point.userData.wf_point.line.o)
	{
		var geometry = new THREE.Geometry();
		geometry.vertices.push(point.position);
		
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x777777 }) );
		line.userData.tag = 'wf_line';
		line.userData.wf_line = {};
		line.userData.wf_line.tube = null;
		line.userData.wf_line.point = [point];
		scene.add( line );
		
		arr_wf.line[arr_wf.line.length] = line;
		
		point.userData.wf_point.line.o = line;
	}
	
	
	var point_2 = createPointWF({ pos : point.position.clone(), type : 'tool', line : line }); 
			
	var geometry = new THREE.Geometry();
	geometry.vertices = line.geometry.vertices;	
	geometry.vertices.push(point_2.position);
	
	line.geometry = geometry;
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;	
	
	line.userData.wf_line.point.push(point_2);

	obj_selected = point_2;
}



function clickPointToolsWF(obj)
{
	var cross = obj.userData.wf_point.cross.o;
	
	if(!cross) return;
	
	var tag = cross.userData.tag;
	
	if(tag == 'wf_line') 
	{
		obj.userData.wf_point.type = '';
		obj_selected = null;
		
		var p = obj.userData.wf_point.cross.point;
		var arrP = cross.userData.wf_line.point;  console.log(cross.userData.wf_line.point.length);
		
		for(var i = 0; i < arrP.length; i++) { if(arrP[i] == p[0]) { arrP.splice(i+1, 0, obj); break; } }
		console.log(cross.userData.wf_line.point.length, cross);
		obj.userData.wf_point.line.o = cross;
		
		// обновляем geometry линии
		var line = cross;
		
		var geometry = new THREE.Geometry();
		
		for(var i = 0; i < arrP.length; i++)
		{
			geometry.vertices[i] = arrP[i].position;
		}
		
		line.geometry = geometry;	
		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;

		// обновляем geometry трубы
		if(line.userData.wf_line.tube)
		{
			newTubeWF({line : line});
		}	
		
	}
}


// нажали на правую кнопку мыши, когда создаем линию
function clickRightMouseLineWF(obj)
{
	if(obj.userData.wf_point.type != 'tool') return;
	
	arr_wf.point.pop();	// удаляем последнее значение в массиве
	
	var line = obj.userData.wf_point.line.o;
	
	if(line)
	{
		// если у линии 2 точки, то удаляем точки и линию
		if(line.userData.wf_line.point.length == 2)
		{		
			deleteValueFromArrya({arr : arr_wf.point, o : line.userData.wf_line.point[0]});
			deleteValueFromArrya({arr : arr_wf.point, o : line.userData.wf_line.point[1]});
			deleteValueFromArrya({arr : arr_wf.line, o : line});
			scene.remove(line.userData.wf_line.point[0]);
			scene.remove(line.userData.wf_line.point[1]);
			scene.remove(line);	
			line = null;			
		}
		else	// удаляем последнюю линию
		{
			line.userData.wf_line.point.pop();

			var geometry = new THREE.Geometry();
			line.geometry.vertices.pop();
			geometry.vertices = line.geometry.vertices;	
			
			line.geometry = geometry;
			line.geometry.verticesNeedUpdate = true; 
			line.geometry.elementsNeedUpdate = true;

			// создаем трубу
			newTubeWF({line : line, createLine : true});
		}
	}

	//console.log(arr_wf.point);
	//console.log(arr_wf.line);
	
 	scene.remove(obj);	// удаляем последнюю точку
}


// создаем или обновляем форму трубы
function newTubeWF(cdm)
{
	var line = cdm.line;
	
	var points = [];
		
	for(var i = 0; i < line.geometry.vertices.length; i++)
	{
		points[i] = line.geometry.vertices[i].clone();
	}
	
	var pipeSpline = new THREE.CatmullRomCurve3(points);
	pipeSpline.curveType = 'catmullrom';
	pipeSpline.tension = 0;
	var params = { extrusionSegments: 30, radiusSegments: 12, closed: false };
	
	var geometry = new THREE.TubeBufferGeometry( pipeSpline, params.extrusionSegments, 0.1, params.radiusSegments, params.closed );	
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();			

	if(cdm.createLine)
	{
		var tube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xff00ff, wireframe: true } ) );	
		line.userData.wf_line.tube = tube;
		scene.add( tube );
	}
	else
	{
		line.userData.wf_line.tube.geometry = geometry;
	}
	
}


// удаление значения из массива 
function deleteValueFromArrya(cdm)
{
	var arr = cdm.arr;
	var o = cdm.o;
	
	for(var i = arr.length - 1; i > -1; i--) { if(arr[i] == o) { arr.splice(i, 1); break; } }
}



