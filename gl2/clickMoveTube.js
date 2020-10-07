


// создаем трубу из каталога 
function createTubeWF_1(cdm)
{
	var p = [];
	
	if(cdm.type == 'horizontal')
	{
		p[p.length] = createPointWF({pos: new THREE.Vector3(-0.5,0,0)});
		p[p.length] = createPointWF({pos: new THREE.Vector3(0.5,0,0)});		
	}
	else if(cdm.type == 'vertical')
	{
		p[p.length] = createPointWF({pos: new THREE.Vector3(0,-0.5,0)});
		p[p.length] = createPointWF({pos: new THREE.Vector3(0,0.5,0)});		
	}
	else
	{
		return;
	}
	
	var r1 = (cdm.r1) ? cdm.r1 : 0.05;
	var tube = createLineWF({point: p, diameter: r1}); 	 		
	
	planeMath.position.y = infProject.tools.heightPl.position.y;  
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	planeMath.updateMatrixWorld(); 	

	clickO.move = tube;	
	
	return tube;
}


// кликнули на трубу, распределяем что делать
function clickFirstTubeWF(cdm)
{
	var obj = cdm.obj;
	var rayhit = cdm.rayhit;	
	
	if(infProject.list.alignP.active) { showJoinPoint_2({obj: obj}); }	// вкл кнопка подключить/выронить
	else { clickTubeWF({ray: rayhit}); }	
}


// кликнули на трубу
function clickTubeWF(cdm)
{
	if(infProject.settings.active.tube == 'add_point_wf')
	{
		addPointOnTube(cdm);	// добавляем точку на трубу
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

	showWF_line_UI({tube: tube});
	
	activeObjRightPanelUI_1({obj: tube});
	
	outlineAddObj(tube);
	
	
	// режим "добавить точку на трубу" выкл	
	if(!infProject.settings.active.tube)
	{
		var result = detectPosTubeWF({ray: ray});	// определяем в какое место трубы кликнули
		var p1 = result.p1;
		var pos = result.pos;		
		
		setPivotGizmo({obj: tube, pos: pos});			
	}
}


// определяем в какое место трубы кликнули
function detectPosTubeWF(cdm)
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

	return {p1: p1, pos: pos};
}



// перемещение по 2D плоскости 
function moveFullTube(cdm)
{	
	var intersects = rayIntersect( event, planeMath, 'one' ); 
	
	if(intersects.length == 0) return;
	
	if(cdm.obj) { var tube = cdm.obj; }
	else { var tube = clickO.move; }
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
	}	
	
	var line = tube.userData.wf_tube.line;
	var point = line.userData.wf_line.point;

	
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );
	var posCenter = new THREE.Vector3().subVectors( point[1].position, point[0].position ).divideScalar( 2 ).add(point[0].position);
	var pos2 = new THREE.Vector3().subVectors( pos, posCenter );

	
	for(var i = 0; i < point.length; i++)
	{
		point[i].position.add( pos2 );
	}

	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;	
		
		
	geometryTubeWF({line : line});	
}




// перемещаем всю трубу
function moveFullTube_2(cdm)
{	
	var tube = cdm.tube;
	var offset = cdm.offset;
	
	var line = tube.userData.wf_tube.line;
	var point = line.userData.wf_line.point;	
	
	for(var i = 0; i < point.length; i++)
	{
		point[i].position.add( offset );
	}

	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;		
	geometryTubeWF({line : line});	
}


function clickMouseUpTube(obj) 
{
	if(!clickO.actMove) return;
	
	if(1==2)
	{
		var tube = obj;		
		var line = tube.userData.wf_tube.line;
			
		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;			
			
		geometryTubeWF({line : line});
		
		tube.position.set( 0,0,0 );
		line.position.set( 0,0,0 );				
	}	
}



// копировать трубу
function copyTubeWF(cdm)
{
	var tube = cdm.tube;
	
	if(!tube) return;	
	if(tube.userData.tag != 'wf_tube') return;

	var line = tube.userData.wf_tube.line;
	
	var point = line.userData.wf_line.point;
	
	var p = [];
	for(var i = 0; i < point.length; i++)
	{
		p[i] = createPointWF({pos: point[i].position});
	}	
	
	var tube = createLineWF({point: p, diameter: line.userData.wf_line.diameter, color: line.material.color});
}



// удалить трубу
function deleteLineWF(tube)
{
	hideMenuUI(tube);
	
	var line = tube.userData.wf_tube.line;
	
	updateListObjUI_1({type: 'delete', o: tube});
	deleteValueFromArrya({arr : infProject.scene.array.tube, o : line});

	deClickTube({obj: tube, moment: ''});
	
	for ( var i = line.userData.wf_line.point.length - 1; i > -1; i-- )
	{
		disposeNode(line.userData.wf_line.point[i]);
		scene.remove(line.userData.wf_line.point[i]);		
	}
	
	disposeNode(tube);
	scene.remove(tube); 
	
	disposeNode(line);
	scene.remove(line);
}




