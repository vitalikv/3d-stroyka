

class CameraView
{
	camera = cameraView;
	
	
	constructor()
	{
		this.btnClose = null;
		
		this.initEvent();		
	}
	
	initEvent()
	{
		this.btnClose = document.querySelector('[nameId="butt_close_cameraView"]');
		this.btnClose.onmousedown = (e) => { this.disable(); }		
	}
	
	// включаем CameraView
	enable(params)
	{
		this.btnClose.style.display = '';
		infProject.elem.butt_camera_2D.style.display = 'none';
		infProject.elem.butt_camera_3D.style.display = 'none';		
		
		deActiveSelected();
		this.deleteObjCameraView();

		activeCameraView(params);
		
		this.initMouse();
	}
	
	initMouse()
	{
		let mouseDown = false;
		let click = 'left';

		mainDiv_1.onmousedown = (event) => 
		{
			mouseDown = true;
			
			switch ( event.button ) 
			{
				case 0: click = 'left'; break;
				case 1: click = 'right'; /*middle*/ break;
				case 2: click = 'right'; break;
			}		
			
			setMouseStop(true);
			
			this.startMoveCamera(event, click);
		}		
		
		mainDiv_1.onmousemove = (event) => 
		{
			if(!mouseDown) return;
			
			this.moveCamera(event, click);

			this.render();
		}

		mainDiv_1.onmouseup = () => 
		{
			mouseDown = false;
			
			setMouseStop(false);
			
			stopCameraTop();
			stopCamera3D();	
			
			this.render();
		}			

		mainDiv_1.onwheel = (event) => 
		{		
			let delta = event.wheelDelta / 120;
			
			this.zoomCamera( -delta, 1 );
			
			this.render();
		}		
	}

	
	startMoveCamera(event, click)
	{
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

		inf.mouse.x = event.clientX;
		inf.mouse.y = event.clientY;			
	}

	moveCamera(event, click)
	{  
		var inf = cameraView.userData.cameraView;
		
		if(click == 'left') 
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
		else if(click == 'right')    
		{		
			var intersects = rayIntersect( event, planeMath, 'one' );
			var offset = new THREE.Vector3().subVectors( inf.intersectPos, intersects[0].point );
			camera.position.add( offset );
			inf.targetPos.add( offset );
		}		
	}


	zoomCamera( delta, z )
	{		
		var inf = cameraView.userData.cameraView;

		var vect = delta * -0.08;

		var dir = new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize();
		dir = new THREE.Vector3().addScaledVector( dir, vect );

		var pos = new THREE.Vector3().addVectors( camera.position, dir );	

		var qt = quaternionDirection( new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize() );
		var v1 = localTransformPoint( new THREE.Vector3().subVectors( inf.targetPos, pos ), qt );
		
		if ( v1.z >= 0.03) camera.position.copy( pos );
	}

	
	// включаем CameraView
	disable()
	{
		mainDiv_1.onmousedown = null;	
		mainDiv_1.onmousemove = null;
		mainDiv_1.onmouseup = null;
		mainDiv_1.onwheel = null;
		
		this.btnClose.style.display = 'none';
		
		this.deleteObjCameraView();
		
		changeCamera(cameraView.userData.cameraView.lastCam);		
	}
	
	
	// удаляем объекты из preview
	deleteObjCameraView()
	{
		var arr = cameraView.userData.cameraView.arrO;
		
		detectDeleteObj({obj: arr[0]});
		
		cameraView.userData.cameraView.arrO = [];
		
		addDeleteElemSettingSborka_UI_1();

		this.render();
	}

	render()
	{
		renderCamera();
	}
}    


// включаем CameraView
async function activeCameraView(cdm)
{  
	if(camera != cameraView) cameraView.userData.cameraView.lastCam = camera;
	
	cameraView.position.y = 2000;
	camera = cameraView;
	renderPass.camera = cameraView;
	outlinePass.renderCamera = cameraView;
	

	
	
	renderCamera();
console.log(infProject.scene.array.obj.length, renderer.info.memory.geometries, renderer.info.memory.textures);
	
	if(cdm.sborka)
	{
		//await sleepPause(2000);
		
		var inf = await actionFnSborka_1(cdm);	
		if(!inf) return;
		
		infProject.tools.pivot.userData.propPivot({type: 'moveObjs', arrO: inf.arr1, offset: new THREE.Vector3(0, 2000, 0)});		

		var obj = inf.arr1[0];
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











