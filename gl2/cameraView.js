

    


// включаем CameraView
async function activeCameraView(cdm)
{  
	deActiveSelected();
	deleteObjCameraView();
	
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
	
	if(cdm.sborka)
	{
		if(cdm.typeV == 1) { var inf = crSborkaRad_Odnotrub_Verh_Mp(cdm); }
		else if(cdm.typeV == 2) { var inf = crSborkaRad_Odnotrub_Verh_Bay_Mp(cdm); }
		else if(cdm.typeV == 3) { var inf = crSborkaRad_Odnotrub_Bok_Mp(cdm); }
		else if(cdm.typeV == 4) { var inf = crSborkaRad_Odnotrub_Niz_Mp(cdm); }
		else if(cdm.typeV == 5) { var inf = crSborkaRad_Odnotrub_Bok_Bay_Mp(cdm); }
		else if(cdm.typeV == 6) { var inf = crSborkaRad_Odnotrub_Niz_Bay_Mp(cdm); }
		
		for(var i = 0; i < inf.arr2.length; i++) { inf.arr2[i].position.y += 2000; }			

		var obj = inf.arr1[0];
		
		showHideSettingsRadiator_1(cdm);
	}
	else
	{
		var obj = await loadObjServer({lotid: cdm.lotid, notArray: true});
		
		obj.position.y += 2000;		
	}
	
	cameraView.userData.cameraView.arrO = [obj];
	fitCameraToObject({obj: obj});	
	 
console.log(infProject.scene.array.obj.length, renderer.info.memory.geometries, renderer.info.memory.textures);	
	
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

	var vect = delta * -0.08;

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
	deleteObjCameraView();
	
	var cam = cameraView.userData.cameraView.lastCam;
	changeCamera(cam);		
}

// удаляем объект из сцены
function deleteObjCameraView()
{
	var arr = cameraView.userData.cameraView.arrO;
	
	if(1==1)
	{
		detectDeleteObj({obj: arr[0]});		
	}
	else
	{
		for(var i = 0; i < arr.length; i++)
		{
			
			if(arr[i].userData.wf_tube)
			{
				var tube = arr[i];
				var line = tube.userData.wf_tube.line;
				
				for ( var i2 = tube.userData.wf_tube.point.length - 1; i2 > -1; i2-- )
				{
					disposeNode(tube.userData.wf_tube.point[i2]);
					scene.remove(tube.userData.wf_tube.point[i2]);		
				}
				
				disposeNode(tube);
				scene.remove(tube); 
				
				disposeNode(line);
				scene.remove(line); 			
			}
			else if(arr[i].userData.obj3D)
			{		
console.log(arr[i].userData.obj3D.nameRus);		
				var arrO = getAllChildObect({obj: arr[i]});
				for(var i2 = 0; i2 < arrO.length; i2++)
				{
					disposeNode(arrO[i2]);
				}
				
				scene.remove(arr[i]);
arr[i] = undefined;				
			}		
		}
		
		
		
		console.log(22, infProject.scene.array.obj);
	}
	
	cameraView.userData.cameraView.arrO = [];
	
	showHideSettingsRadiator_1();

	renderCamera();
}

