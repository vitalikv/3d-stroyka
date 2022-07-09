



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
	point.userData.wf_point.nameRus = 'точка';
	point.userData.wf_point.tube = null;
	
	if(cdm.visible != undefined) point.visible = cdm.visible;
	
	scene.add( point );
	
	return point;	
}




// пускаем луч, определяем кликнули ли на точку, если активирована труба или точка
function clickRayhitPointWF(params)
{  
	let event = params.event;
	let obj = params.obj;
	
	if(!obj) return;
	
	let arrP = null;
	let rayhit = null;
	
	
	if(obj.userData.tag == 'wf_tube'){ arrP = obj.userData.wf_tube.point; }	
	if(obj.userData.tag == 'wf_point'){ arrP = obj.userData.wf_point.tube.userData.wf_tube.point; }

	if(obj.userData.tag == 'new_tube'){ arrP = obj.getTubePoints(); }
	if(obj.userData.tag == 'new_point'){ arrP = obj.getTubePoints(); }
		
	if(arrP)
	{			
		let ray = rayIntersect( event, arrP, 'arr' );  
		if(ray) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}	

	return rayhit;
}





// кликнули на точку, распределяем что делать
function clickFirstWFPoint(cdm)
{
	var obj = cdm.obj;
	var rayhit = cdm.rayhit;
	
	clickWFPoint_3D({ray: rayhit, menu_1: true});
}



// кликнули на точку
function clickWFPoint_3D(cdm)
{
	var obj = null;

	if(cdm.ray) { obj = cdm.ray.object; }
	if(cdm.obj) { obj = cdm.obj; } 

	if(!obj) return;
	
	outlineAddObj(obj);
	
	setPivotGizmo({obj: obj});
	
	// показываем точки у труб
	showHideTubePoint({tube: obj.userData.wf_point.tube, visible: true});	
	
	activeObjRightPanelUI_1({obj: obj});
	showWF_point_UI({point: obj, butt: true});

	
	setClickLastObj({obj: obj});
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
	var pointObj = cdm.pointObj;
	
	var point = [];
	
	if(pointObj)
	{
		point = pointObj;
	}
	else
	{		
		for ( var i = 0; i < p.length; i++ )
		{
			p[i].visible = cdm.pVisible;  
			point[point.length] = createPointWF(p[i]);  
		}			
	}
	
	var color = (cdm.color) ? cdm.color : new THREE.Color(infProject.listColor.lineTube2D);	
	var diameter = (cdm.diameter) ? cdm.diameter : 0.05;
	
	var inf = tubeGeometry({point: point, diameter: diameter});
	
	var tube = new THREE.Mesh( inf.geometry, new THREE.MeshLambertMaterial({ color: color, wireframe: false, side: THREE.DoubleSide, lightMap: lightMap_1, depthTest: true, transparent: true }));	
	tube.userData.tag = 'wf_tube';		
	tube.userData.wf_tube = {};
	tube.userData.wf_tube.point = point;
	tube.userData.wf_tube.nameRus = 'труба '+ diameter*1000;
	tube.userData.wf_tube.length = Math.round(inf.length * 100)/100;
	tube.userData.wf_tube.diameter = diameter;	
	scene.add( tube );
	
	if(cdm.id){ tube.userData.id = cdm.id; }
	else { tube.userData.id = countId; countId++; }	
	
	for(var i = 0; i < point.length; i++) { point[i].userData.wf_point.tube = tube; }		
		
	
	return tube;
}






// обновляем форму трубы
function updateTubeWF(cdm)
{
	var tube = cdm.tube;
	tube.position.set(0, 0, 0);
	tube.rotation.set(0, 0, 0);
	
	var point = (cdm.point) ? cdm.point : tube.userData.wf_tube.point;	
	var diameter = (cdm.diameter) ? cdm.diameter : tube.userData.wf_tube.diameter;
	
	var inf = tubeGeometry({point: point, diameter: diameter});
	
	tube.geometry.dispose();
	tube.geometry = inf.geometry;

	
	if(cdm.color)
	{
		
	}	
	
	tube.userData.wf_tube.point = point;
	tube.userData.wf_tube.nameRus = 'труба '+ diameter*1000;
	tube.userData.wf_tube.length = Math.round(inf.length * 100)/100;
	tube.userData.wf_tube.diameter = diameter;
	
	for(var i = 0; i < point.length; i++) { point[i].userData.wf_point.tube = tube; }

	infProject.ui.rpanel.EstList.updateItem({obj: tube});	// обновляем длину трубы во вкладке "список"
	
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
	
	var inf = { extrusionSegments: Math.round(length * 50), radiusSegments: 12, closed: false };
	
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
function changeColorTube({obj, value}) 
{  			
	obj.material.color = new THREE.Color(value); 
	obj.material.needsUpdate = true;	
	
	infProject.ui.rpanel.EstList.updateItem({obj});	// обновляем цвет трубы во вкладке "список"
	
	renderCamera(); 
};







// кликнули на другой объект, деактивируем трубу
function deClickTube({obj, moment})  
{	
	if(moment == 'down' && camera == cameraTop && !checkClickTube_1()) deClickTube_1({obj});
	else if(moment == 'up' && camera == camera3D && !checkClickTube_1()) deClickTube_1({obj});
	else if(moment == '') deClickTube_1({obj});
	
	
	// если была вкл кнопка выровнить, то проверяем куда кликнули
	function checkClickTube_1()
	{ 
		if(clickO.rayhit)
		{  			
			if(infProject.list.mergeO.active)
			{
				if(clickO.rayhit.object.userData.tag == 'obj') { return true; }
				if(clickO.rayhit.object.userData.tag == 'wf_tube') { return true; }
			}			
		}

		return false;
	}	
	
	
	// деактивируем трубу иди точку
	function deClickTube_1({obj})
	{
		outlineRemoveObj();
		
		if(obj.userData.wf_tube) { var tube = obj; }		
		else if(obj.userData.wf_point) { var tube = obj.userData.wf_point.tube; }		

		
		infProject.tools.pg.hide();		// скрываем pivot	
		showHideTubePoint({tube: tube, visible: false});	// скрываем точки у трубы

		//infProject.ui.rpanel.InfObj.switchAddPointOnTube({type: 'off'});		// выкл возможность добавлять на трубу точку		
		
		activeObjRightPanelUI_1();		// скрываем UI	
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





