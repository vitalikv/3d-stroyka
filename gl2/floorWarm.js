



// создаем точку трубы
function createPointWF(cdm)
{
	var point = new THREE.Mesh( infProject.geometry.wf_point, infProject.material.pointTube.default ); 
	point.position.set( cdm.pos.x, cdm.pos.y, cdm.pos.z );		
	
	point.renderOrder = 1;
	
	if(!cdm.id) { var id = countId; countId++; }
	else { var id = cdm.id; }
	
	point.userData.id = id;	
	point.userData.tag = 'wf_point';
	point.userData.wf_point = {};
	point.userData.wf_point.line = { o : (!cdm.line) ? null : cdm.line }
	point.userData.wf_point.tube = null;
	
	if(cdm.visible != undefined) point.visible = cdm.visible;
	
	scene.add( point );
	
	return point;	
}




// пускаем луч, определяем кликнули ли на точку, если активирована труба или точка
function clickRayhitPointWF(cdm)
{  
	var event = cdm.event;
	var rayhit = null;	
	var tube = null;
	
	if(clickO.last_obj)
	{
		if(clickO.last_obj.userData.tag == 'wf_tube'){ tube = clickO.last_obj; }
		if(clickO.last_obj.userData.tag == 'wf_point'){ tube = clickO.last_obj.userData.wf_point.tube; }
	}
		
	if(tube)
	{			
		var ray = rayIntersect( event, tube.userData.wf_tube.point, 'arr' );  
		if(ray) { if(ray.length > 0) { rayhit = ray[0]; return rayhit; } }		
	}	

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
	
	// показываем точки у труб
	showHideTubePoint({tube: obj.userData.wf_point.tube, visible: true});	
	
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
	
	var arrP = tube.userData.wf_tube.point;  
	
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
	
	updateTubeWF({tube: tube});	
}



// попадает ли точка в граница отрезка 3D BoundBox
function checkPointBoundBoxLine(pointA, pointB, pointToCheck) 
{
	if(pointToCheck.x < Math.min(pointA.x, pointB.x) || pointToCheck.x > Math.max(pointA.x, pointB.x)) { return false; }

	if(pointToCheck.y < Math.min(pointA.y, pointB.y) || pointToCheck.y > Math.max(pointA.y, pointB.y)) { return false; }

	if(pointToCheck.z < Math.min(pointA.z, pointB.z) || pointToCheck.z > Math.max(pointA.z, pointB.z)) { return false; } 

	return true;
}






// создаем трубу
function crTubeWF(cdm)
{
	var p = cdm.point;
	
	var point = [];
	for ( var i = 0; i < p.length; i++ )
	{
		p[i].visible = cdm.pVisible;
		point[point.length] = createPointWF(p[i]); 
	}	
	
	var color = (cdm.color) ? cdm.color : new THREE.Color(infProject.listColor.lineTube2D);	
	var diameter = (cdm.diameter) ? cdm.diameter : 0.05;
	
	var inf = tubeGeometry({point: point, diameter: diameter});
	
	var tube = new THREE.Mesh( inf.geometry, new THREE.MeshLambertMaterial({ color: color, side: THREE.DoubleSide, lightMap: lightMap_1 }));	
	tube.userData.tag = 'wf_tube';		
	tube.userData.wf_tube = {};
	tube.userData.wf_tube.line = null;
	tube.userData.wf_tube.point = point;
	tube.userData.wf_tube.nameRus = 'труба '+ diameter*1000;
	tube.userData.wf_tube.length = Math.round(inf.length * 100)/100;
	tube.userData.wf_tube.diameter = diameter;	
	scene.add( tube );
	
	if(cdm.id){ tube.userData.id = cdm.id; }
	else { tube.userData.id = countId; countId++; }	
	
	for(var i = 0; i < point.length; i++) { point[i].userData.wf_point.tube = tube; }		
	
	// line
	{
		var geometry = new THREE.Geometry();
		
		for(var i = 0; i < point.length; i++)
		{
			geometry.vertices.push(point[i].position);
		}		
		
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: tube.material.color, linewidth: 2 }) );
		scene.add( line );
		
		tube.userData.wf_tube.line = line;
		
		for(var i = 0; i < point.length; i++)
		{
			point[i].userData.wf_point.line.o = line;
		}		
	}	
	
	return tube;
}






// обновляем форму трубы
function updateTubeWF(cdm)
{
	var tube = cdm.tube;
	
	var point = (cdm.point) ? cdm.point : tube.userData.wf_tube.point;	
	var diameter = (cdm.diameter) ? cdm.diameter : tube.userData.wf_tube.diameter;
	
	var inf = tubeGeometry({point: point, diameter: diameter});
	
	tube.geometry.dispose();
	tube.geometry = inf.geometry;
	
	var line = tube.userData.wf_tube.line;
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;		

	if(cdm.color)
	{
		
	}	
	
	tube.userData.wf_tube.point = point;
	tube.userData.wf_tube.nameRus = 'труба '+ diameter*1000;
	tube.userData.wf_tube.length = Math.round(inf.length * 100)/100;
	tube.userData.wf_tube.diameter = diameter;
	
	for(var i = 0; i < point.length; i++) { point[i].userData.wf_point.tube = tube; }

	updateListObjUI_1({o: tube, type: 'update'});			// обновляем список материалов 
	
	renderCamera();
	
	return tube;
}


// создаем Geometry трубы
function tubeGeometry(params)
{
	var point = params.point;
	var diameter = params.diameter;
	var arrPos = [];
	
	for(var i = 0; i < point.length; i++)
	{
		arrPos[i] = point[i].position.clone();
	}
	
	var pipeSpline = new THREE.CatmullRomCurve3(arrPos);
	pipeSpline.curveType = 'catmullrom';
	pipeSpline.tension = 0;
	
	var length = 0;
	for(var i = 0; i < arrPos.length - 1; i++) { length += arrPos[i].distanceTo(arrPos[i + 1]); }		
	
	var inf = { extrusionSegments: Math.round(length * 30), radiusSegments: 12, closed: false };
	
	var geometry = new THREE.TubeBufferGeometry( pipeSpline, inf.extrusionSegments, diameter/2, inf.radiusSegments, inf.closed );	
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	return {geometry: geometry, length: length};
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
	
	updateTubeWF({tube: tube, diameter: size});	
	
	showWF_line_UI({tube: tube});		
}



// меняем цвет трубы input
function changeColorTube(cdm) 
{  
	var tube = cdm.obj;
	
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
		
		if(tube1 == obj.userData.wf_point.tube) return false;

		return true;	// клинули на другую трубу
	}		
	
	
	
	// деактивируем трубу иди точку
	function deClickTube_1(cdm)
	{
		outlineRemoveObj();
		
		var obj = cdm.obj;
		
		if(obj.userData.wf_tube) { var tube = obj; }		
		else if(obj.userData.wf_point) { var tube = obj.userData.wf_point.tube; }		
		
		// скрываем точки у трубы
		showHideTubePoint({tube: tube, visible: false});
		
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
		
		if(obj.userData.wf_tube) { var tube = obj; }		
		else if(obj.userData.wf_point) { var tube = obj.userData.wf_point.tube; }
		else { return; }
		
		arr = tube.userData.wf_tube.point;	
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





