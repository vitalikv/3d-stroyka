



// создаем точку для теплого пола
function createPointWF(cdm)
{
	var point = new THREE.Mesh( infProject.tools.point.geometry, new THREE.MeshLambertMaterial( { color : 0x333333, transparent: true, opacity: 0.6, depthTest: false } ) ); 
	point.position.copy( cdm.pos );		
	point.position.y = infProject.settings.tube.h;	
	
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
	
	return point;	
}


// кликнули на точку
function clickWFPoint(intersect)
{
	if(clickO.move)
	{
		if(clickO.move.userData.wf_point.type == 'tool') { return; }	// вкл режим создания линии
	}		
	
	var obj = intersect.object;	
	clickO.move = obj;	
	
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
		obj.position.y = infProject.settings.tube.h;
		dragToolWFPoint({obj : clickO.move}); 
	}
	else
	{
		var pos = new THREE.Vector3().addVectors( intersects[0].point, offset );
		obj.position.copy(pos);
		obj.position.y = infProject.settings.tube.h;
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





// перетаскиваем точку (определяем пересекается ли с первой/последней точки линий теплого пола)
function dragToolWFPoint(cdm)
{	
	var obj = cdm.obj;
	
	if(obj.userData.wf_point.line.o) return;
	
	obj.userData.wf_point.cross = { o : null, point : [] };
		
	var arr = [];	
	var z = 0.1 / camera.zoom;
	
	for(var i = 0; i < infProject.scene.array.tube.length; i++)
	{ 		
		var line = infProject.scene.array.tube[i];
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
			arr[arr.length] = {dist: dist, p1: pos, p2: obj.position, cross: cross};
			continue; 
		}
	}
		
		
	if(arr.length > 1) arr.sort(function (a, b) { return a.dist - b.dist; });

	if(arr.length > 0) 
	{  
		obj.userData.wf_point.cross = {o: arr[0].cross, point: arr[0].point};
		obj.position.copy(arr[0].p1);
	}
	
	renderCamera();
}






// подсвечиваем линию или точку, когда наводим рядом мышь 
function hoverCursorLineWF()
{	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	if(intersects.length == 0) return null;
	
	var posMouse = intersects[0].point;	
	posMouse.y = infProject.settings.tube.h;
	
	var arr = [];	
	var z = 0.1 / camera.zoom;
	
	for(var i = 0; i < infProject.scene.array.tube.length; i++)
	{ 		
		var line = infProject.scene.array.tube[i];
		var v = line.geometry.vertices;
		
		if(v.length < 2) continue;

		var flag = false;
		
		for(var i2 = 0; i2 < line.userData.wf_line.point.length; i2++)
		{
			var point = line.userData.wf_line.point[i2];
			
			var dist = point.position.distanceTo(posMouse);
			
			if(dist > z) continue;
			
			arr[arr.length] = {dist: dist, p1: point.position.clone(), p2: posMouse, cross: point};
			
			flag = true;
		}
		
		if(flag) continue;
		
		// пускаем перпендикуляр от точки на прямую
		for(var i2 = 0; i2 < v.length - 1; i2++)
		{
			if(!calScal(v[i2], v[i2 + 1], posMouse)) continue;	// проверяем попадает ли перпендикуляр от точки на прямую
			
			var pos = spPoint(v[i2], v[i2 + 1], posMouse);  
			var pos = new THREE.Vector3(pos.x, posMouse.y, pos.z);	// получаем точку пересечения точки на прямую
			
			var dist = pos.distanceTo(posMouse);
			
			if(dist > z) continue;	// расстояние от точки пересечения до перетаскиваемой точки				
			
			var point_1 = line.userData.wf_line.point[i2];
			var point_2 = line.userData.wf_line.point[i2];
			arr[arr.length] = {dist: dist, p1: pos, p2: posMouse, cross: line};
		}
	}
		
	var result = null;
	
	if(arr.length > 1) arr.sort(function (a, b) { return a.dist - b.dist; });
	
	if(arr.length > 0) 
	{  
		getNearLineWF(arr[0]);
		result = { object : arr[0].cross, point : posMouse };
	}
	
	renderCamera();
	
	return result;
}




  
// устанвливаем и показываем красные линии
function getNearLineWF(cdm)
{
	var d = cdm.dist;	
	
	var v = infProject.tools.axis[0].geometry.vertices;		
	v[3].x = v[2].x = v[5].x = v[4].x = d;		
	infProject.tools.axis[0].geometry.verticesNeedUpdate = true;

	var dir = new THREE.Vector3().subVectors( cdm.p1, cdm.p2 ).normalize();
	var angleDeg = Math.atan2(dir.x, dir.z);
	infProject.tools.axis[0].rotation.set(0, angleDeg + Math.PI / 2, 0);		
	infProject.tools.axis[0].position.copy( cdm.p1 );
	
	infProject.tools.axis[0].visible = true;	
}


// создаем/обновляем линию
function upLineWF(point)
{
	if(point.userData.wf_point.cross.o) { point.userData.wf_point.cross = { o : null, point : [] }; return; }
	
	point.userData.wf_point.type = '';
	
	var line = point.userData.wf_point.line.o;
	
	// создаем новую линию
	if(!point.userData.wf_point.line.o)
	{
		var geometry = new THREE.Geometry();
		geometry.vertices.push(point.position);
		
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x777777, linewidth: 1 }) );
		line.userData.tag = 'wf_line';
		line.userData.wf_line = {};
		line.userData.wf_line.tube = null;
		line.userData.wf_line.point = [point];
		line.userData.wf_line.color = line.material.color.clone();
		scene.add( line );
		
		
		infProject.scene.array.tube[infProject.scene.array.tube.length] = line;
		
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

	clickO.move = point_2;
}



// кликнули, когда к мышки привязан Point Tool
function clickPointToolsWF(obj)
{
	if(obj.userData.wf_point.line.o) return;
	
	var cross = obj.userData.wf_point.cross.o;
	
	if(!cross) return;
	
	var tag = cross.userData.tag;	
	
	if(tag == 'wf_line') 
	{		
		obj.userData.wf_point.type = '';
		clickO.move = null;	
		
		var p = obj.userData.wf_point.cross.point;
		var arrP = cross.userData.wf_line.point;  
		
		for(var i = 0; i < arrP.length; i++) { if(arrP[i] == p[0]) { arrP.splice(i+1, 0, obj); break; } }
		
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
	}
	if(tag == 'wf_point')
	{
		var line = cross.userData.wf_point.line.o;
		var p = line.userData.wf_line.point;
		
		var geometry = new THREE.Geometry();
		
		if(cross == p[0])	// добавляем все в обратном порядке, кроме нулевого элемента
		{		
			var arrP = [];
			
			for(var i = p.length - 1; i > -1; i--) 
			{ 
				geometry.vertices[geometry.vertices.length] = p[i].position; 
				arrP[arrP.length] = p[i];
			}  
			
			line.userData.wf_line.point = arrP;
		}
		else if(cross == p[p.length - 1])	// добавляем все, кроме последнего
		{
			geometry.vertices = line.geometry.vertices; 
		}

		geometry.vertices[geometry.vertices.length] = obj.position;
		
		line.geometry = geometry;	
		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;

		obj.userData.wf_point.line.o = line;	// задаем линию для выделенной точки
		line.userData.wf_line.point.push(obj); 	// назначаем линии выделенную точку
	}
	
	// обновляем geometry трубы
	if(line)
	{
		if(line.userData.wf_line.tube) newTubeWF({line : line});
	}	
	
	//obj.userData.wf_point.cross = { o : null, point : [] };
}


// нажали на правую кнопку мыши, когда создаем линию
function deletePointWF(obj)
{
	//arr_wf.point.pop();	// удаляем последнее значение в массиве
	
	var line = obj.userData.wf_point.line.o;
	
	if(line)
	{
		// если у линии 2 точки, то удаляем точки и линию
		if(line.userData.wf_line.point.length == 2)
		{		
			deleteValueFromArrya({arr : infProject.scene.array.tube, o : line});
			scene.remove(line.userData.wf_line.point[0]);
			scene.remove(line.userData.wf_line.point[1]);
			scene.remove(line);	
			line = null;			
		}
		else	// удаляем точку
		{
			deleteValueFromArrya({arr : line.userData.wf_line.point, o : obj});

			var geometry = new THREE.Geometry();
			
			for(var i = 0; i < line.userData.wf_line.point.length; i++)
			{
				geometry.vertices[i] = line.userData.wf_line.point[i].position;
			}
			
			line.geometry = geometry;
			line.geometry.verticesNeedUpdate = true; 
			line.geometry.elementsNeedUpdate = true;

			// создаем трубу
			//newTubeWF({line : line, createLine : true});
		}
	}

	
	//console.log(infProject.scene.array.tube.length);
	
 	scene.remove(obj);	// удаляем точку
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







