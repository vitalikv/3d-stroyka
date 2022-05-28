


// создаем трубу из каталога 
function createTubeWF_1(cdm)
{
	let visible = false;
	
	if(cdm.type == 'vertical') visible = (camera == cameraTop) ? true : false;
	
	
	let diameter = (cdm.diameter) ? cdm.diameter : 0.05;
	//let tube = crTubeWF({point: cdm.point, diameter: diameter, pVisible: visible}); 	 		
	let tube = new TubeN({path: cdm.point, diameter: diameter});
	
	return tube;
}


// добавляем новую трубу в сцену
function addTubeInScene(tube, cdm)
{
	if(tube.userData.tag == 'wf_tube')
	{
		if(!cdm.notArray)
		{		
			updateListObjUI_1({o: tube, type: 'add'}); 	// добавляем в список материалов			
		}
		
		if(cdm.cursor)
		{
			planeMath.position.y = infProject.tools.heightPl.position.y;  
			planeMath.rotation.set(-Math.PI/2, 0, 0);
			planeMath.updateMatrixWorld();

			clickO.move = tube;
		}
		
		infProject.scene.array.tube[infProject.scene.array.tube.length] = tube;			
	}
	if(tube.userData.tag == 'new_tube')
	{
		planeMath.position.y = infProject.tools.heightPl.position.y;  
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld();
		
		setMouseStop(true);
		
		mainDiv_1.onmousemove = (event) => 
		{
			let intersects = rayIntersect(event, planeMath, 'one');
			if (intersects.length == 0) return;		
			
			tube.setPosTube({pos: intersects[0].point});			
			
			renderCamera();
		};

		mainDiv_1.onmousedown = () => 
		{
			mainDiv_1.onmousemove = null;
			mainDiv_1.onmousedown = null;
		
			let intersects = rayIntersect(event, planeMath, 'one');
			if (intersects.length > 0) tube.clickTube({clickPos: intersects[0].point});						
			
			setMouseStop(false);
			
			renderCamera();
		};			

	}
	
	renderCamera();
	
	return tube;
}



// кликнули на трубу, распределяем что делать
function clickFirstTubeWF({obj, rayhit})
{	
	if(infProject.list.mergeO.active && infProject.list.mergeO.o1.length) { selectObjForMergeToGroup({obj: obj}); }
	else { clickTubeWF({ray: rayhit, menu_1: true}); }	
}


// кликнули на трубу
function clickTubeWF(cdm)
{
	var tube = null;

	if(cdm.ray) { tube = cdm.ray.object; }
	if(cdm.obj) { tube = cdm.obj; }  
	
	if(!tube) return;

	// показываем точки 
	showHideTubePoint({tube: tube, visible: true});

	setClickLastObj({obj: tube});
	
	setScaleTubePoint();
	
	
	activeObjRightPanelUI_1({obj: tube});
	showWF_line_UI({tube: tube});
	
	outlineAddObj(tube);
	
	
	if(cdm.ray)
	{
		var result = detectPosTubeWF({ray: cdm.ray});	// определяем в какое место трубы кликнули
		var p1 = result.p1;
		var pos = result.pos;							
	}
	else if(cdm.toolPos)
	{
		var pos = cdm.toolPos;
	}
	else
	{
		var p = tube.userData.wf_tube.point;
		var n = (p.length % 2);	// четное/нечетное, 2=false 3=true
		
		if(n)
		{
			var n = (p.length - 1)/2;				
			var pos = p[n].position;
		}
		else
		{
			var n = (p.length - p.length/2) - 1;				
			var pos1 = p[n].position;
			var pos2 = p[n+1].position;
			var pos = new THREE.Vector3().subVectors( pos2, pos1 ).divideScalar( 2 ).add(pos1);
		}			
	}
	
	tube.updateMatrixWorld();						
	tube.userData.wf_tube.posPivotGizmo = tube.worldToLocal( pos.clone() );
	
	infProject.tools.pg.activeTool({obj: tube});

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
	
	//tube.position.add( offset );

	updateTubeWF({tube: tube});
}


function clickMouseUpTube(obj) 
{
	if(!clickO.actMove) return;
	
	
}










