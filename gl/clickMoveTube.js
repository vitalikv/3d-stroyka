




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

	showWF_line_UI(tube);
	
	outlineAddObj(tube);
	
	
	var pos = tube.position.clone();
	var qt = new THREE.Quaternion();
	
	var pivot = infProject.tools.pivot;	
	pivot.visible = true;	
	pivot.userData.pivot.obj = tube;
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







function moveFullTube_2(cdm)
{	
	var intersects = rayIntersect( event, planeMath, 'one' ); 
	
	if(intersects.length == 0) return;
	
	var tube = cdm.obj;
	var pos2 = cdm.offset;
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
	}	
	
	var line = tube.userData.wf_tube.line;
	var point = line.userData.wf_line.point;

	//tube.position.add( pos2 );
	//line.position.add( pos2 );	

	
	for(var i = 0; i < point.length; i++)
	{
		point[i].position.add( pos2 );
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

	console.log(777777);
	console.log(renderer.info.programs);
	console.log(renderer.info.render);
	console.log(renderer.info.memory);	
}





