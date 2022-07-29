


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
			infProject.ui.rpanel.EstList.crItem({obj: tube});	// добавляем в список материалов
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
	clickTubeWF({ray: rayhit, menu_1: true});	
}


// кликнули на трубу
function clickTubeWF(cdm)
{
	var tube = null;

	if(cdm.ray) { tube = cdm.ray.object; }
	if(cdm.obj) { tube = cdm.obj; }  
	
	if(!tube) return;
	
	
	activeObjRightPanelUI_1({obj: tube});
	
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



















