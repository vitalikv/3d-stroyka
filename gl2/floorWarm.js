



// создаем точку для теплого пола
function createPointWF(cdm)
{
	var point = new THREE.Mesh( infProject.geometry.wf_point, infProject.material.pointTube.default ); 
	point.position.copy( cdm.pos );		
	
	point.renderOrder = 1;
	
	if(!cdm.id) { var id = countId; countId++; }
	else { var id = cdm.id; }
	
	point.userData.id = id;	
	point.userData.tag = 'wf_point';
	point.userData.wf_point = {};
	point.userData.wf_point.line = { o : (!cdm.line) ? null : cdm.line }
	
	if(cdm.visible != undefined) point.visible = cdm.visible;
	
	scene.add( point );
	
	return point;	
}




// пускаем луч, определяем кликнули ли на точку активированно трубы
function clickRayhitPointWF()
{  
	var rayhit = null;
	
	var line = null;
	
	if(clickO.last_obj)
	{
		if(clickO.last_obj.userData.tag == 'wf_tube'){ line = clickO.last_obj.userData.wf_tube.line; }
		if(clickO.last_obj.userData.tag == 'wf_point'){ line = clickO.last_obj.userData.wf_point.line.o; }
	}
	
	var wp = [];
		
	if(line)
	{			
		for ( var i2 = 0; i2 < line.userData.wf_line.point.length; i2++ )
		{ 
			if(!line.userData.wf_line.point[i2].visible) continue;
			wp[wp.length] = line.userData.wf_line.point[i2]; 
		}			
	}
	
	var ray = rayIntersect( event, wp, 'arr' );  
	if(ray) { if(ray.length > 0) { rayhit = ray[0]; return rayhit; } }

	return null;
}





// кликнули на точку, распределяем что делать
function clickFirstWFPoint(cdm)
{
	var obj = cdm.obj;
	var rayhit = cdm.rayhit;
	
	if(infProject.list.alignP.active) { clickItemCenterObjUI_2({obj: obj}); }	// вкл кнопка подключить/выронить
	else { clickWFPoint_3D({ intersect: rayhit }); }
}



// кликнули на точку
function clickWFPoint_3D(cdm)
{
	var obj = cdm.intersect.object;	
	
	outlineAddObj(obj);
	
	setPivotGizmo({obj: obj});

	var line = obj.userData.wf_point.line.o;
	
	// показываем точки у труб
	showHideArrObj(line.userData.wf_line.point, true);	
	
	showWF_point_UI( obj );
	
	activeObjRightPanelUI_1({obj: obj});
	
	setClickLastObj({obj: obj});
}




// при клике добавляем на трубу точку
function addPointOnTube(cdm)
{
	var ray = cdm.ray;			  
	var tube = ray.object;

	var line = tube.userData.wf_tube.line;	
	
	
	var result = detectPosTubeWF({ray: ray});	// определяем в какое место трубы кликнули
	var p1 = result.p1;
	var pos = result.pos;	
	
	var arrP = line.userData.wf_line.point;  
	
	var newPoint = createPointWF({ pos: pos, line: line });
	
	for(var i = 0; i < arrP.length; i++) { if(arrP[i] == p1) { arrP.splice(i+1, 0, newPoint); break; } }
	
	
	// обновляем geometry линии
	var geometry = new THREE.Geometry();
	
	for(var i = 0; i < arrP.length; i++)
	{
		geometry.vertices[i] = arrP[i].position;
	}
	
	disposeNode(line);
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
	
	var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: color, linewidth: 2 }) );
	 
	line.userData.tag = 'wf_line';
	line.userData.wf_line = {};
	line.userData.wf_line.tube = null;
	line.userData.wf_line.point = point;
	line.userData.wf_line.diameter = cdm.diameter;
	scene.add( line );
	
	infProject.scene.array.tube[infProject.scene.array.tube.length] = line;
	
	for(var i = 0; i < point.length; i++)
	{
		point[i].userData.wf_point.line.o = line;
	}

	var tube = geometryTubeWF({line: line, createLine: true});
	
	updateListObjUI_1({o: tube, type: 'add'}); // обновляем список материалов

	return tube;
}






// создаем или обновляем форму трубы
function geometryTubeWF(cdm)
{
	var line = cdm.line;
	
	var diameter = line.userData.wf_line.diameter;
	
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
	
	var geometry = new THREE.TubeBufferGeometry( pipeSpline, params.extrusionSegments, diameter/2, params.radiusSegments, params.closed );	
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();			

	if(cdm.createLine)
	{
		var tube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({ color: line.material.color, side: THREE.DoubleSide, lightMap: lightMap_1 }));	
		line.userData.wf_line.tube = tube;
		tube.userData.tag = 'wf_tube';		
		tube.userData.wf_tube = {};
		tube.userData.wf_tube.line = line;
		scene.add( tube );
	}
	else
	{
		var tube = line.userData.wf_line.tube;
		
		tube.geometry.dispose();
		tube.geometry = geometry;
	}
	
	tube.userData.wf_tube.nameRus = 'труба '+ diameter*1000;
	tube.userData.wf_tube.length = Math.round(length * 100)/100;
	tube.userData.wf_tube.diameter = diameter;

	
	updateListObjUI_1({o: tube, type: 'update'});	// обновляем список материалов 
	
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
		var tube = line.userData.wf_line.tube;
		
		// если у трубы 2 точки, то удаляем трубу
		if(line.userData.wf_line.point.length == 2)
		{		
			deleteLineWF(tube);			
		}
		else	// удаляем точку
		{
			deClickTube({obj: tube, moment: ''});	// диактивируем трубу
			
			deleteValueFromArrya({arr : line.userData.wf_line.point, o : obj});

			var geometry = new THREE.Geometry();
			
			for(var i = 0; i < line.userData.wf_line.point.length; i++)
			{
				geometry.vertices[i] = line.userData.wf_line.point[i].position;
			}
			
			disposeNode(line);
			disposeNode(tube);
			
			line.geometry = geometry;
			line.geometry.verticesNeedUpdate = true; 
			line.geometry.elementsNeedUpdate = true;
			
			// обновляем трубу			
			geometryTubeWF({line : line});
			
			disposeNode(obj);
			scene.remove(obj);	// удаляем точку
		}
	}
}





// input меняем диаметр трубы
function inputWF_tubeDiametr(cdm)
{
	var tube = cdm.line;
	
	if(!tube) return;	
	if(tube.userData.tag != 'wf_tube') return;
	
	var line = tube.userData.wf_tube.line;
	
	var size = checkNumberInput({ value: cdm.size, unit: 0.001, limit: {min: 0.003, max: 0.063}, int: true });
	
	if(!size) 
	{
		showWF_line_UI({tube: tube});		
		return;
	}
	
	var size = size.num;
	
	infProject.settings.wf_tube.d = size;
	line.userData.wf_line.diameter = size;	
	
	geometryTubeWF({line : line});	
	
	showWF_line_UI({tube: tube});		
}



// меняем цвет трубы input
function changeColorTube(cdm) 
{  
	var tube = clickO.last_obj;
	
	if(!tube) return;	
	if(tube.userData.tag != 'wf_tube') return;		 
	
	var line = tube.userData.wf_tube.line;
	
	line.material.color = new THREE.Color(cdm.value);
	line.material.needsUpdate = true;	
	
	tube.material.color = new THREE.Color(cdm.value); 
	tube.material.needsUpdate = true;	
	
	updateListObjUI_1({o: tube, type: 'update'});
	
	renderCamera(); 
};







// кликнули на другой объект, деактивируем трубу
function deClickTube(cdm)  
{	
	if(clickO.rayhit)
	{  
		// если выбран тот же самый объект, который хотим скрыть, то не скрываем его
		if(cdm.moment == 'down' && camera == cameraTop)
		{
			if(clickO.rayhit.object == cdm.obj && !infProject.list.alignP.active) return;
			
			if(clickO.rayhit.object.userData.tag == 'pivot') return;
		}
		
		if(cdm.moment == 'up' && camera == camera3D)
		{
			if(clickO.rayhit.object == cdm.obj && !infProject.list.alignP.active) return;
			
			if(clickO.rayhit.object.userData.tag == 'pivot') return;
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
			if(infProject.list.alignP.active) 
			{ 
				if(clickO.rayhit.object.userData.tag == 'obj') { return true; }
				if(clickO.rayhit.object.userData.tag == 'wf_tube') { return checkWFPoint_2({obj: obj, tube: clickO.rayhit.object}); }
				if(clickO.rayhit.object.userData.tag == 'wf_point') { return checkWFPoint_1({obj: clickO.rayhit.object}); }
				if(clickO.rayhit.object.userData.tag == 'joinPoint') { return true; }
			}
		}

		return false;
	}
	
	
	// провереям что кликнули на другой разъем трубы
	function checkWFPoint_1(cdm)
	{
		var obj = cdm.obj;
		var arr = infProject.list.alignP.arr2;
		
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].o == obj) return true;
		}

		return false;
	}


	
	// провереям что клинули на другую трубу, а не на ту у которой активированна точка
	function checkWFPoint_2(cdm)
	{
		var obj = cdm.obj;
		var tube1 = cdm.tube;
		
		if(obj.userData.tag != 'wf_point') return true;		// точка была НЕ активированна (отбой) 
		
		var line = obj.userData.wf_point.line.o;
		var tube2 = line.userData.wf_line.tube;
		
		if(tube1 == tube2) return false;

		return true;	// клинули на другую трубу
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
		if(obj.userData.tag == 'wf_point' || obj.userData.tag == 'wf_tube')
		{
			var pivot = infProject.tools.pivot;
			
			pivot.visible = false;
			pivot.userData.pivot.obj = null; 		
		}
		
		
		switchAlignPoint_1({active: false});	// вкл/выкл возможность выделение объектов для присоединения точки трубы
		switchJoinWfPoint({active: false});
		
		switchAddPointOnTube({type: null});		// выкл возможность добавлять на трубу точку		
		
		activeObjRightPanelUI_1();		// скрываем UI
		
		resetClickLastObj({});		
	}
}





// масштаб точек трубы
function setScaleTubePoint(cdm) 
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
		
		if(obj.userData.wf_tube) { var line = obj.userData.wf_tube.line; }		
		else if(obj.userData.wf_point) { var line = obj.userData.wf_point.line.o; }
		else { return; }
		
		for ( var i2 = 0; i2 < line.userData.wf_line.point.length; i2++ )
		{ 
			arr[arr.length] = line.userData.wf_line.point[i2];						
		}	
	}
	
	if(arr.length == 0) return;		 
		
	
	if(camera == cameraTop)
	{		
		var scale = 3.5/camera.zoom;	
		
		if(scale > 1.4) { scale = 1.4; }
		else if(scale < 0.5) { scale = 0.5; }
		
		for ( var i = 0; i < arr.length; i++ )
		{ 
			arr[i].scale.set( scale,scale,scale );			
		}	
	}	
	else if(camera == camera3D)
	{
		for ( var i = 0; i < arr.length; i++ )
		{ 
			var scale = camera.position.distanceTo(arr[i].position)/2;	

			if(scale > 1.2) scale = 1.2;
			
			arr[i].scale.set( scale,scale,scale );			
		}							
	}
}		





