


// создаем трубу из каталога 
function createTubeWF_1(cdm)
{
	var visible = false;
	
	if(cdm.type == 'horizontal')
	{
		
	}
	else if(cdm.type == 'vertical')
	{
		visible = (camera == cameraTop) ? true : false;
	}
	
	
	var diameter = (cdm.diameter) ? cdm.diameter : 0.05;
	var tube = crTubeWF({point: cdm.point, diameter: diameter, pVisible: visible}); 	 		
	 
	
	return tube;
}


// добавляем новую трубу в сцену
function addTubeInScene(tube, cdm)
{

	if(!cdm.notArray)
	{
		infProject.scene.array.tube[infProject.scene.array.tube.length] = tube;	
		updateListObjUI_1({o: tube, type: 'add'}); 	// добавляем в список материалов			
	}
	
	if(cdm.cursor)
	{
		planeMath.position.y = infProject.tools.heightPl.position.y;  
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld();

		clickO.move = tube;
	}
	
	
	renderCamera();
	
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

	// показываем точки 
	showHideTubePoint({tube: tube, visible: true});

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

// прячем/показываем точки у трубы
function showHideTubePoint(cdm)
{
	var tube = cdm.tube;
	var visible = cdm.visible;
	
	showHideArrObj(tube.userData.wf_tube.point, visible);	
}

// определяем в какое место трубы кликнули
function detectPosTubeWF(cdm)
{
	var ray = cdm.ray;			  
	var tube = ray.object;
	
	var arr = [];
	
	for ( var i = 0; i < tube.userData.wf_tube.point.length - 1; i++ )
	{ 
		var p1 = tube.userData.wf_tube.point[i];
		var p2 = tube.userData.wf_tube.point[i + 1];
		
		var pos = mathProjectPointOnLine({p: [p1.position, p2.position], rayHit: ray.point});
		
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



// перемещение трубы, когда достали ее из каталога 
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
		
	var point = tube.userData.wf_tube.point;
	
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );
	var posCenter = new THREE.Vector3().subVectors( point[1].position, point[0].position ).divideScalar( 2 ).add(point[0].position);
	var pos2 = new THREE.Vector3().subVectors( pos, posCenter );

	moveFullTube_2({tube: tube, offset: pos2});
}




// перемещаем всю трубу
function moveFullTube_2(cdm)
{	
	var tube = cdm.tube;
	var offset = cdm.offset;
		
	var point = tube.userData.wf_tube.point;	
	
	for(var i = 0; i < point.length; i++)
	{
		point[i].position.add( offset );
	}

	updateTubeWF({tube: tube});
}


function clickMouseUpTube(obj) 
{
	if(!clickO.actMove) return;
	
	if(1==2)
	{
		var tube = obj;		
		updateTubeWF({tube: tube});
		
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
	
	var point = tube.userData.wf_tube.point;
	
	var p = [];
	for(var i = 0; i < point.length; i++)
	{
		p[i] = {pos: point[i].position.clone(), visible: false};
	}	
	
	var tube = crTubeWF({point: p, diameter: tube.userData.wf_tube.diameter, color: tube.material.color.clone(), pVisible: false});
	
	addTubeInScene(tube, {});
}



// удалить трубу
function deleteLineWF(tube)
{
	hideMenuUI(tube);
	
	var line = tube.userData.wf_tube.line;
	
	updateListObjUI_1({type: 'delete', o: tube});
	deleteValueFromArrya({arr: infProject.scene.array.tube, o: tube});

	deClickTube({obj: tube, moment: ''});
	
	for ( var i = tube.userData.wf_tube.point.length - 1; i > -1; i-- )
	{
		disposeNode(tube.userData.wf_tube.point[i]);
		scene.remove(tube.userData.wf_tube.point[i]);		
	}
	
	disposeNode(tube);
	scene.remove(tube); 
	
	disposeNode(line);
	scene.remove(line);
}




