

    


// включаем CameraView
function activeCameraView(cdm)
{  
	deActiveSelected();

	var obj = clickO.viewObj;
	
	if(obj)
	{
		if(obj.userData.tag == 'obj') 
		{
			deleteObjectPop(obj);
		}				
	}
	
	if(camera != cameraView)
	{
		cameraView.userData.cameraView.lastCam = camera;
	}
	
	camera = cameraView;
	renderPass.camera = cameraView;
	outlinePass.renderCamera = cameraView;
	
	infProject.elem.butt_close_cameraView.style.display = '';
	infProject.elem.butt_camera_2D.style.display = 'none';
	infProject.elem.butt_camera_3D.style.display = 'none';	
	
console.log(infProject.scene.array.obj.length, renderer.info.memory.geometries, renderer.info.memory.textures);

	loadObjServer({lotid: cdm.lotid, pos: new THREE.Vector3(1, 2000, 1), notArray: true, viewObj: true});
	 
console.log(infProject.scene.array.obj.length, renderer.info.memory.geometries, renderer.info.memory.textures);	
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
		var phi = Math.min( 170, Math.max( -160, phi ) );

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

	
	if ( v1.z >= 0.03) 
	{ 
		camera.position.copy( pos ); 	
	}
}



// включаем CameraView
function deActiveCameraView()
{  
	var cam = cameraView.userData.cameraView.lastCam;
	
	var obj = clickO.viewObj;
	
	if(obj)
	{
		if(obj.userData.tag == 'obj') 
		{
			deleteObjectPop(obj);
		}				
	}
	
	changeCamera(cam);		
}




