



// создаем точку для теплого пола
function createPointWF(cdm)
{
	var point = new THREE.Mesh( infProject.geometry.wf_point, new THREE.MeshLambertMaterial({color : 0x333333, transparent: true, opacity: 0.6, depthTest: false}) ); 
	point.position.copy( cdm.pos );		
	//point.position.y = infProject.settings.wf_tube.pos.y;	
	
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


// кликнули на точку 2D
function clickWFPoint(intersect)
{
	if(clickO.move)
	{
		if(clickO.move.userData.wf_point.type == 'tool') { return; }	// вкл режим создания линии
	}		
	
	var obj = intersect.object;	
	clickO.move = obj;	
	clickO.actMove = false;
	
	outlineAddObj(obj);
	
	clickO.offset = new THREE.Vector3().subVectors( intersect.object.position, intersect.point );
	planeMath.position.set( 0, intersect.point.y, 0 );
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	
	
	var line = obj.userData.wf_point.line.o;
	
	// показываем точки у труб
	var wf = [];
	for ( var i2 = 0; i2 < line.userData.wf_line.point.length; i2++ )
	{ 
		wf[wf.length] = line.userData.wf_line.point[i2]; 
	}
	
	showHideArrObj(wf, true);
	
	activeObjRightPanelUI_1({obj: obj});
	
	setClickLastObj({obj: obj});
}


function clickWFPoint_3D(cdm)
{
	var intersect = cdm.intersect;
	
	if(clickO.move)
	{
		if(clickO.move.userData.wf_point.type == 'tool') { return; }	// вкл режим создания линии
	}		
	
	var obj = intersect.object;	
	
	outlineAddObj(obj);
	
	var pos = obj.getWorldPosition(new THREE.Vector3());
	var qt = new THREE.Quaternion();
	
	var pivot = infProject.tools.pivot;	
	pivot.visible = true;	
	pivot.userData.pivot.obj = obj;
	pivot.position.copy(pos);
	pivot.quaternion.copy(qt);
	
	if(camera == cameraTop)
	{
		pivot.children[1].visible = false;
		pivot.children[7].visible = false;
	}
	else
	{
		pivot.children[1].visible = true;
		pivot.children[7].visible = true;
	}

	setScalePivotGizmo();

	var line = obj.userData.wf_point.line.o;
	
	// показываем точки у труб
	var wf = [];
	for ( var i2 = 0; i2 < line.userData.wf_line.point.length; i2++ )
	{ 
		wf[wf.length] = line.userData.wf_line.point[i2]; 
	}
	
	showHideArrObj(wf, true);	
	
	activeObjRightPanelUI_1({obj: obj});
	
	setClickLastObj({obj: obj});
}



// кликнули на трубу
function clickTubeWF(cdm)
{
	if(infProject.settings.active.tube == 'add_point_wf')
	{
		addPointOnTube(cdm);
	}
	
	var ray = cdm.ray;		
	  
	var tube = ray.object;

	var line = tube.userData.wf_tube.line;
	
	// показываем точки у труб
	var wf = [];
	for ( var i2 = 0; i2 < line.userData.wf_line.point.length; i2++ )
	{ 
		wf[wf.length] = line.userData.wf_line.point[i2]; 
	}
	
	showHideArrObj(wf, true);

	setClickLastObj({obj: tube});
	
	setScaleTubePoint();

	showWF_line_UI(tube);
	
	outlineAddObj(tube);
}



// при клике добавляем на трубу точку
function addPointOnTube(cdm)
{
	var ray = cdm.ray;			  
	var tube = ray.object;

	var line = tube.userData.wf_tube.line;	
	
	var arr = [];
	
	for ( var i = 0; i < line.userData.wf_line.point.length - 1; i++ )
	{ 
		var p1 = line.userData.wf_line.point[i];
		var p2 = line.userData.wf_line.point[i + 1];
		
		var pos = mathProjectPointOnLine({line: {point_1: p1.position, point_2: p2.position}, point: ray.point});
		
		var dist = ray.point.distanceTo(pos);	
		
		if(checkPointBoundBoxLine(p1.position, p2.position, pos))
		{
			arr[arr.length] = {dist: dist, pos: pos, p1: p1, tube: tube};
		}
	}
	
	arr.sort(function (a, b) { return a.dist - b.dist; });	// сортируем по увеличению дистанции 

	var p1 = arr[0].p1;
	var pos = arr[0].pos;	
	
	var arrP = line.userData.wf_line.point;  
	
	var newPoint = createPointWF({ pos: pos, line: line });
	
	for(var i = 0; i < arrP.length; i++) { if(arrP[i] == p1) { arrP.splice(i+1, 0, newPoint); break; } }
	
	
	// обновляем geometry линии
	var geometry = new THREE.Geometry();
	
	for(var i = 0; i < arrP.length; i++)
	{
		geometry.vertices[i] = arrP[i].position;
	}
	
	line.geometry = geometry;	
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;
	
	console.log(newPoint.userData.id, line.userData.wf_line.point.length);
	geometryTubeWF({line: line});	
}



// попадает ли точка в граница отрезка 3D BoundBox
function checkPointBoundBoxLine(pointA, pointB, pointToCheck) 
{
	if(pointToCheck.x < Math.min(pointA.x, pointB.x) || pointToCheck.x > Math.max(pointA.x, pointB.x)) { return false; }

	if(pointToCheck.y < Math.min(pointA.y, pointB.y) || pointToCheck.y > Math.max(pointA.y, pointB.y)) { return false; }

	if(pointToCheck.z < Math.min(pointA.z, pointB.z) || pointToCheck.z > Math.max(pointA.z, pointB.z)) { return false; } 

	return true;
}




// перетаскиваем точку/tool, обновляем форму линии
function moveWFPoint(event, obj)
{
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	if(intersects.length == 0) return;	
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
		
		var line = obj.userData.wf_point.line.o;
		
		if(line) 
		{ 
			//line.material.color = new THREE.Color(infProject.listColor.active2D);
			
			if(line.userData.wf_line.tube)
			{
				line.userData.wf_line.tube.visible = false;
			}			 
		}
	}
	
	var pos = new THREE.Vector3().addVectors( intersects[0].point, clickO.offset );
	obj.position.copy(pos);	
	obj.position.y = infProject.settings.wf_tube.pos.y;
	
	dragToolWFPoint({obj : clickO.move});	// проверяем соединения с другими теплыми полами
	
	if(!obj.userData.wf_point.cross.o) { posLinkGrid({point: obj}); } 	// привязка к сетке
	
	// обновляем geometry линии
	if(obj.userData.wf_point.line.o)
	{
		var line = obj.userData.wf_point.line.o;
		
		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;

		// обновляем geometry трубы
		if(line.userData.wf_line.tube)
		{
			//geometryTubeWF({line : line});
		}
	}
	
	showWF_point_UI(obj);
}



// привязка мышки к сетки
function posLinkGrid(cdm)
{
	if(!infProject.scene.grid.show) return;
	if(!infProject.scene.grid.link) return;
	
	var point = cdm.point;
	
	var grid = infProject.scene.grid.obj;
	
	var size = grid.userData.size;
	var count = grid.userData.count;
	
	
	var arr = [];
	
	for(var i = 0; i <= count; i++)
	{
		var value = ( i * size ) - (count * size) / 2;
		
		var posX = value + grid.position.x;
		var posZ = value + grid.position.z;
		
		arr[i] = {};
		arr[i].x = Math.abs(posX - point.position.x);
		arr[i].z = Math.abs(posZ - point.position.z);
		arr[i].posX = posX;
		arr[i].posZ = posZ;
	}
	
	var min = { x: arr[0].x, z: arr[0].z, posX: arr[0].posX, posZ: arr[0].posZ };
	
	for(var i = 1; i < arr.length; i++)
	{
		if(min.x > arr[i].x) { min.x = arr[i].x; min.posX = arr[i].posX; }
		if(min.z > arr[i].z) { min.z = arr[i].z; min.posZ = arr[i].posZ; }
	}
	
			
	
	//if(min.x > 0.04) { min.posX = spPoint(new THREE.Vector3(-10, 0, min.posZ), new THREE.Vector3(10, 0, min.posZ), point.position).x; }
	//if(min.z > 0.04) { min.posZ = spPoint(new THREE.Vector3(min.posX, 0, 10), new THREE.Vector3(min.posX, 0, -10), point.position).z; }
	
	
	point.position.x = min.posX;
	point.position.z = min.posZ;
}



// перетаскиваем точку (определяем пересекается ли с первой/последней точки линий теплого пола)
function dragToolWFPoint(cdm)
{	
	var obj = cdm.obj;
	
	//if(obj.userData.wf_point.line.o) return;
	
	var line_1 = (obj.userData.wf_point.line.o) ? obj.userData.wf_point.line.o : null;
	
	var posMouse = obj.position;	
	posMouse.y = infProject.settings.wf_tube.pos.y;	
	obj.userData.wf_point.cross = { o : null, point : [] };
	
	if(line_1 && line_1.material.color != new THREE.Color(0xff0000)) line_1.material.color = new THREE.Color(0xff0000);
		
	var arr = [];	
	var z = 0.1 / camera.zoom;
	
	for(var i = 0; i < infProject.scene.array.tube.length; i++)
	{ 		
		var line = infProject.scene.array.tube[i];
		
		if(line_1 == line) continue;	// пропускаем свою трубу
		
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
		
		if(!obj.userData.wf_point.line.o)
		{
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
				arr[arr.length] = {dist: dist, p1: pos, p2: posMouse, cross: line, point: [point_1, point_2]};
			}			
		}		
	}
		
		
	if(arr.length > 1) arr.sort(function (a, b) { return a.dist - b.dist; });

	if(arr.length > 0) 
	{  
		obj.userData.wf_point.cross = {o: arr[0].cross, point: arr[0].point};
		obj.position.copy(arr[0].p1);  
	}
	
	//renderCamera();
}






// подсвечиваем линию или точку, когда наводим рядом мышь 
function hoverCursorLineWF()
{	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	if(intersects.length == 0) return null;
	
	var posMouse = intersects[0].point;	
	posMouse.y = infProject.settings.wf_tube.pos.y;
	
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
		//getNearLineWF(arr[0]);
		result = { object : arr[0].cross, point : posMouse, distance: camera.position.distanceTo(arr[0].p1) };
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



// создаем линию
function createLineWF(cdm)
{
	var point = cdm.point;
	
	var geometry = new THREE.Geometry();
	
	for(var i = 0; i < point.length; i++)
	{
		geometry.vertices.push(point[i].position);
	}		
	
	var color = (cdm.color) ? cdm.color : new THREE.Color(infProject.listColor.lineTube2D);
	
	
	var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 2 }) );
	//line.material.color = color;
	 
	line.userData.tag = 'wf_line';
	line.userData.wf_line = {};
	line.userData.wf_line.tube = null;
	line.userData.wf_line.point = point;
	line.userData.wf_line.color = color;
	line.userData.wf_line.diameter = cdm.diameter;
	scene.add( line );
	
	infProject.scene.array.tube[infProject.scene.array.tube.length] = line;
	
	for(var i = 0; i < point.length; i++)
	{
		point[i].userData.wf_point.line.o = line;
	}			
	
	updateListTubeUI_1({o: line, type: 'add'}); // обновляем список материалов

	return line;
}



// создаем или продолжаем прокладывать линию
function upLineWF(point)
{
	if(point.userData.wf_point.cross.o) { point.userData.wf_point.cross = { o : null, point : [] }; return; }
	
	point.userData.wf_point.type = '';
	
	var line = point.userData.wf_point.line.o;
	
	// создаем новую линию
	if(!line)
	{
		line = createLineWF({point: [point], diameter: infProject.settings.wf_tube.d});
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



// сняли клик, когда перетаскивали точку
function clickWFPointUp(point)
{
	if(point.userData.wf_point.cross.o) { clickPointToolsWF(point); clickO.move = null; return; }
	
	if(clickO.actMove)
	{		
		var line = point.userData.wf_point.line.o;
		
		if(line) 
		{ 
			//line.material.color = new THREE.Color(infProject.listColor.active2D);
			
			if(line.userData.wf_line.tube)
			{
				geometryTubeWF({line : line});
				line.userData.wf_line.tube.visible = true;
			}			 
		}
	}
	
	clickO.move = null;
}



// добавляем точку/создаем линию/объединяем линии
function clickPointToolsWF(obj)
{
	//if(obj.userData.wf_point.line.o) return;
	
	var cross = obj.userData.wf_point.cross.o;
	
	if(!cross) return;
	
	var tag = cross.userData.tag;	
	
	if(tag == 'wf_line' && !obj.userData.wf_point.line.o) 
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
		
		obj.userData.wf_point.cross = { o : null, point : [] };	

		hideMenuUI(obj);
		
		clickO = resetPop.clickO();
	}
	if(tag == 'wf_point')
	{		
		var line = cross.userData.wf_point.line.o;
		var p = line.userData.wf_line.point;
		
		var geometry = new THREE.Geometry();
		
		if(cross == p[0])	// добавляем все в обратном порядке
		{		
			var arrP = [];
			
			for(var i = p.length - 1; i > -1; i--) 
			{ 
				geometry.vertices[geometry.vertices.length] = p[i].position; 
				arrP[arrP.length] = p[i];
			}  
			
			line.userData.wf_line.point = arrP;
		}
		else if(cross == p[p.length - 1])	// добавляем все
		{
			geometry.vertices = line.geometry.vertices; 
		}

		var line_1 = obj.userData.wf_point.line.o;
		
		if(line_1)	// у точки есть линия (последнюю точку не добавляем)
		{	
			var p = line_1.userData.wf_line.point;
			
			if(obj == p[0])
			{ 
				for(var i = 0; i < line_1.userData.wf_line.point.length; i++)
				{ 
					var point = line_1.userData.wf_line.point[i];
					
					if(obj == point) continue;
					
					geometry.vertices[geometry.vertices.length] = point.position;
					point.userData.wf_point.line.o = line;							// задаем линию для выделенной точки
					line.userData.wf_line.point.push(point); 						// назначаем линии выделенную точку					
				}				
			}
			
			if(obj == p[p.length - 1])
			{
				for(var i = line_1.userData.wf_line.point.length - 1; i > -1; i--)
				{
					var point = line_1.userData.wf_line.point[i];
					
					if(obj == point) continue;
					
					geometry.vertices[geometry.vertices.length] = point.position;
					point.userData.wf_point.line.o = line;							// задаем линию для выделенной точки
					line.userData.wf_line.point.push(point); 						// назначаем линии выделенную точку					
				}					
			}
			
			updateListTubeUI_1({type: 'delete', o: line_1});
			
			deleteValueFromArrya({arr : infProject.scene.array.tube, o : line_1});
			scene.remove(line_1);
			scene.remove(obj);	
			
			hideMenuUI(obj);
			clickO = resetPop.clickO();
		}
		else	// у точки нет линии, это tool
		{
			geometry.vertices[geometry.vertices.length] = obj.position;
			
			obj.userData.wf_point.line.o = line;	// задаем линию для выделенной точки
			line.userData.wf_line.point.push(obj); 	// назначаем линии выделенную точку	
			
			if(line.userData.wf_line.tube) { scene.remove(line.userData.wf_line.tube); }
		}		
		
		line.geometry = geometry;	
		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;

	}
	
	// обновляем geometry трубы
	if(line)
	{
		if(line.userData.wf_line.tube) { geometryTubeWF({line : line}); }
	}	
	
	//obj.userData.wf_point.cross = { o : null, point : [] };
}



// создаем или обновляем форму трубы
function geometryTubeWF(cdm)
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
	
	var length = 0;
	var v = line.geometry.vertices;	
	for(var i = 0; i < v.length - 1; i++) { length += v[i].distanceTo(v[i + 1]); }		
	
	var params = { extrusionSegments: Math.round(length * 30), radiusSegments: 12, closed: false };
	
	var geometry = new THREE.TubeBufferGeometry( pipeSpline, params.extrusionSegments, line.userData.wf_line.diameter/2, params.radiusSegments, params.closed );	
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();			

	if(cdm.createLine)
	{
		var tube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({ color: line.userData.wf_line.color.getHex(), side: THREE.DoubleSide, lightMap: lightMap_1 }));	
		line.userData.wf_line.tube = tube;
		tube.userData.tag = 'wf_tube';
		tube.userData.wf_tube = {}
		tube.userData.wf_tube.color = line.userData.wf_line.color.clone();
		tube.userData.wf_tube.line = line;
		scene.add( tube );
	}
	else
	{
		line.userData.wf_line.tube.geometry.dispose();
		line.userData.wf_line.tube.geometry = geometry;
	}
	
	updateListTubeUI_1({o: line, type: 'update'});	// обновляем список материалов 
	
	renderCamera();
	
	return tube;
}



// удаляем точку
function deletePointWF(obj)
{
	//arr_wf.point.pop();	// удаляем последнее значение в массиве
	
	hideMenuUI(obj);
	
	var line = obj.userData.wf_point.line.o;
	
	if(line)
	{
		// если у линии 2 точки, то удаляем точки и линию
		if(line.userData.wf_line.point.length == 2)
		{		
			updateListTubeUI_1({type: 'delete', o: line});
			deleteValueFromArrya({arr : infProject.scene.array.tube, o : line});
			
			disposeNode(line.userData.wf_line.point[0]);
			disposeNode(line.userData.wf_line.point[1]);
			
			scene.remove(line.userData.wf_line.point[0]);
			scene.remove(line.userData.wf_line.point[1]);
			
			if(line.userData.wf_line.tube) 
			{ 
				disposeNode(line.userData.wf_line.tube);
				scene.remove(line.userData.wf_line.tube); 
			}

			disposeNode(line);
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

			line.material.color = line.userData.wf_line.color.clone();
			
			if(line.userData.wf_line.tube) 
			{ 
				disposeNode(line.userData.wf_line.tube);
				scene.remove(line.userData.wf_line.tube); 
			}
			
			// создаем трубу
			geometryTubeWF({line : line, createLine : true});
		}
	}
	
	clickO = resetPop.clickO();
	
	hidePivotGizmo(obj);
	disposeNode(obj);
 	scene.remove(obj);	// удаляем точку
	
	if(line)
	{  
		clickTubeWF({ray: {object: line.userData.wf_line.tube}});
	}
}




// удаляем линию
function deleteLineWF(tube)
{
	hideMenuUI(tube);
	
	var line = tube.userData.wf_tube.line;
	
	updateListTubeUI_1({type: 'delete', o: line});
	deleteValueFromArrya({arr : infProject.scene.array.tube, o : line});	
	
	for ( var i = line.userData.wf_line.point.length - 1; i > -1; i-- )
	{
		disposeNode(line.userData.wf_line.point[i]);
		scene.remove(line.userData.wf_line.point[i]);		
	}
	
	if(line.userData.wf_line.tube) 
	{ 
		disposeNode(line.userData.wf_line.tube);
		scene.remove(line.userData.wf_line.tube); 
	}
	
	disposeNode(line);
	scene.remove(line);
	
	clickO = resetPop.clickO();
}





// input меняем диаметр трубы
function inputWF_tubeDiametr(cdm)
{
	var line = cdm.line;
	
	if(!line) return;	
	if(line.userData.tag != 'wf_tube') return;
	
	line = line.userData.wf_tube.line;
	
	var size = checkNumberInput({ value: cdm.size, unit: 0.001, limit: {min: 0.003, max: 0.05}, int: true });
	
	if(!size) 
	{
		var size = line.userData.wf_line.diameter; // перводим в мм
		$('[nameId="size_tube_diameter_2"]').val(size);
		
		return;
	}
	
	var size = size.num;
	
	infProject.settings.wf_tube.d = size;
	line.userData.wf_line.diameter = size;
	$('[nameId="size_tube_diameter_2"]').val(size * 1000);
	if(line.userData.wf_line.tube) geometryTubeWF({line : line});
}



// меняем цвет трубы input
$('[color_tube_1_change]').on('mousedown', function(e) 
{  
	var tube = clickO.last_obj;
	
	if(!tube) return;	
	if(tube.userData.tag != 'wf_tube') return;
	
	
	var color = $(this).attr('color_tube_1_change');
	
	$('[nameId="color_tube_1_default"]').css('background-color', '#'+color);
	$('[nameId="bb_menu_tube_menu_2"]').hide();
	
	
	var color = Number('0x'+color); 
	
	var line = tube.userData.wf_tube.line;
	
	line.material.color = new THREE.Color(color);
	line.userData.wf_line.color = line.material.color.clone();
	
	tube.material.color = new THREE.Color(color); 
	tube.userData.wf_tube.color = tube.material.color.clone();

	
	updateListTubeUI_1({o: line, type: 'update'});
	
	renderCamera();
	
	return false; 
});



// нажали кнопку выровнить, подтягиваем точку трубы к выбранному разъему
function joinTubePointTopoint()
{
	var joint = infProject.tools.joint;	
	
	var o1 = infProject.list.rp_wf_point.tubeP;   
	var o2 = infProject.list.rp_wf_point.joinO;

	if(!o1) return;
	if(!o2) return;

	o2.updateMatrixWorld();		
	var pos1 = o2.getWorldPosition(new THREE.Vector3());
	
	o1.position.copy(pos1);
	
	infProject.tools.pivot.position.copy(o1.position);
	setScalePivotGizmo();
	
	var line = o1.userData.wf_point.line.o;
	
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;
	
	if(line.userData.wf_line.tube)
	{
		geometryTubeWF({line : line});
		line.userData.wf_line.tube.visible = true;
	}			 

	renderCamera();
}



// кликнули на другой объект, деактивируем трубу
function deClickTube(cdm)  
{	
	if(clickO.rayhit)
	{
		// если выбран тот же самый объект, который хотим скрыть, то не скрываем его
		if(cdm.moment == 'down' && camera == cameraTop)
		{
			if(clickO.rayhit.object == cdm.obj) return;
		}
		
		if(cdm.moment == 'up' && camera == camera3D)
		{
			if(clickO.rayhit.object == cdm.obj) return;
		}		
	}
	
	var obj = cdm.obj;
	
	if(cdm.moment == 'down' && camera == cameraTop && !checkClickTube_1())
	{
		deClickTube_1(cdm); 
	}
	else if(cdm.moment == 'up' && camera == camera3D && !checkClickTube_1())
	{
		deClickTube_1(cdm); 
	}
	else if(cdm.moment == '')
	{ 
		deClickTube_1(cdm);
	}
	
	
	// если была вкл кнопка выровнить, то проверяем куда кликнули
	function checkClickTube_1()
	{
		if(clickO.rayhit)
		{
			if(infProject.list.rp_wf_point.align) 
			{
				if(clickO.rayhit.object.userData.tag == 'obj') { return true; }
				if(clickO.rayhit.object.userData.tag == 'wf_tube') { return true; }
				if(clickO.rayhit.object.userData.tag == 'joinPoint') { return true; }
			}
		}

		return false;
	}
	
	// деактивируем трубу иди точку
	function deClickTube_1(cdm)
	{
		outlineRemoveObj();
		
		var obj = cdm.obj;
		
		if(obj.userData.wf_tube) { var line = obj.userData.wf_tube.line; }		
		else if(obj.userData.wf_point) { var line = obj.userData.wf_point.line.o; }		
		
		// скрываем точки у трубы
		{
			var wf = [];
			for ( var i2 = 0; i2 < line.userData.wf_line.point.length; i2++ )
			{ 
				wf[wf.length] = line.userData.wf_line.point[i2]; 
			}		
			showHideArrObj(wf, false);
		}
		
		// скрываем pivot
		if(obj.userData.tag == 'wf_point' && camera == camera3D)
		{
			var pivot = infProject.tools.pivot;
			
			pivot.visible = false;
			pivot.userData.pivot.obj = null; 
			outlineRemoveObj();		
		}
		
		
		switchAlignWfPoint({active: false});	// вкл/выкл возможность выделение объектов для присоединения точки трубы
		
		switchAddPointOnTube({type: null});		// выкл возможность добавлять на трубу точку		
		
		activeObjRightPanelUI_1();		// скрываем UI
		
		resetClickLastObj({});		
	}
}



// масштаб точек трубы
function setScaleTubePoint()
{
	if(camera != camera3D) return;
	
	var obj = clickO.last_obj; 
	
	if(!obj) return;

	
	if(obj.userData.wf_tube) { var line = obj.userData.wf_tube.line; }		
	else if(obj.userData.wf_point) { var line = obj.userData.wf_point.line.o; }
	else { return; }
	
	
	var min = 9999999;
	var point = null;
	
	for ( var i2 = 0; i2 < line.userData.wf_line.point.length; i2++ )
	{ 
		var dist = camera.position.distanceTo(line.userData.wf_line.point[i2].position);
		
		if(min > dist)
		{
			min = dist;							
			point = line.userData.wf_line.point[i2];
		}						
	}					

	if(point)
	{
		var value = min/150;; 
		var v = infProject.geometry.wf_point.vertices;
		v[0].x = v[1].x = v[6].x = v[7].x = -value;
		v[2].x = v[3].x = v[4].x = v[5].x = value;
		v[0].y = v[3].y = v[7].y = v[4].y = -value;
		v[1].y = v[2].y = v[5].y = v[6].y = value;						
		v[0].z = v[1].z = v[2].z = v[3].z = value;	
		v[4].z = v[5].z = v[6].z = v[7].z = -value;
		infProject.geometry.wf_point.verticesNeedUpdate = true;
		infProject.geometry.wf_point.elementsNeedUpdate = true;	
		
	}
}		





