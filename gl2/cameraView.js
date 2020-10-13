

    


// включаем CameraView
function activeCameraView()
{  
	deActiveSelected();
	
	camera = cameraView;
	renderPass.camera = cameraView;
	outlinePass.renderCamera = cameraView;
	
	
	var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );	

	clickO.viewObj = cube;
	
	//clickO = resetPop.clickO();
	
	renderCamera();
}


// первый клик в режиме CameraView
function clickSetCameraView( event, click )
{
	if ( camera != cameraView ) { return; }
	
	var inf = cameraView.userData.cameraView;	
	
	if(click == 'left')			
	{
		var dir = new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize();
		
		// получаем угол наклона камеры к target (к точке куда она смотрит)
		var dergree = THREE.Math.radToDeg( dir.angleTo(new THREE.Vector3(dir.x, 0, dir.z)) ) * 2;	
		if(dir.y > 0) { dergree *= -1; } 			
		
		// получаем угол направления (на плоскости) камеры к target 
		dir.y = 0; 
		dir.normalize();    		
		
		inf.theta = THREE.Math.radToDeg( Math.atan2(dir.x, dir.z) - Math.PI ) * 2;
		inf.phi = dergree;
	}
	else if(click == 'right')		
	{
		planeMath.position.copy( inf.targetPos );
		planeMath.rotation.copy( camera.rotation );
		planeMath.updateMatrixWorld();

		var intersects = rayIntersect( event, planeMath, 'one' );	
		inf.intersectPos = intersects[0].point;  
	}
	
	inf.click = click;
	inf.mouse.x = event.clientX;
	inf.mouse.y = event.clientY;	
}



function moveCameraView(event)
{  
	if(camera != cameraView) return;
	

	var inf = cameraView.userData.cameraView;
	
	if(inf.click == '') return;
		
	
	if(inf.click == 'left') 
	{  
		var radious = inf.targetPos.distanceTo( camera.position );
		var theta = - ( ( event.clientX - inf.mouse.x ) * 0.5 ) + inf.theta;
		var phi = ( ( event.clientY - inf.mouse.y ) * 0.5 ) + inf.phi;
		var phi = Math.min( 180, Math.max( -80, phi ) );

		camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
		camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
		camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );

		camera.position.add( inf.targetPos );  
		camera.lookAt( inf.targetPos );					
	}
	else if(inf.click == 'right')    
	{		
		var intersects = rayIntersect( event, planeMath, 'one' );
		var offset = new THREE.Vector3().subVectors( inf.intersectPos, intersects[0].point );
		camera.position.add( offset );
		inf.targetPos.add( offset );
	}
	
}



function stopCameraView()
{
	cameraView.userData.cameraView.click = '';
	//clickO = resetPop.clickO();
}



function zoomCameraView( delta, z )
{
	if ( camera != cameraView ) return;
	
	var inf = cameraView.userData.cameraView;

	var vect = delta * -0.1;

	var dir = new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize();
	dir = new THREE.Vector3().addScaledVector( dir, vect );

	var pos = new THREE.Vector3().addVectors( camera.position, dir );	

	var qt = quaternionDirection( new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize() );
	var v1 = localTransformPoint( new THREE.Vector3().subVectors( inf.targetPos, pos ), qt );

	
	if ( v1.z >= 0.1) 
	{ 
		camera.position.copy( pos ); 	
	}
}




