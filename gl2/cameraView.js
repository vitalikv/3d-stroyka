

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

		if(camera != cameraView) cameraView.userData.cameraView.lastCam = camera;
		
		cameraView.position.y = 2000;
		camera = cameraView;
		renderPass.camera = cameraView;
		outlinePass.renderCamera = cameraView;
		this.render();
		
		this.activeCamera(params);
		
		this.initMouse();
	}

	// включаем CameraView
	async activeCamera(cdm)
	{  
		let obj = null;
		
		if(cdm.sborka)
		{
			//await sleepPause(2000);
			
			let inf = await actionFnSborka_1(cdm);	
			if(!inf) return;
			
			inf.arr1.forEach((o) => o.position.y += 2000 )
			
			obj = inf.arr1[0];
		}
		else
		{
			obj = await loadObjServer({lotid: cdm.lotid, notArray: true});
			
			obj.position.y += 2000;		
		}
		
		cameraView.userData.cameraView.arrO = [obj];
		this.fitCamToObj({obj});			 
		
		this.render();
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
		let inf = cameraView.userData.cameraView;	
		
		if(click == 'left')			
		{
			let dir = new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize();
			
			// получаем угол наклона камеры к target (к точке куда она смотрит)
			let dergree = THREE.Math.radToDeg( dir.angleTo(new THREE.Vector3(dir.x, 0, dir.z)) ) * 2;	
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

			let intersects = rayIntersect( event, planeMath, 'one' );	
			inf.intersectPos = intersects[0].point;  
		}		

		inf.mouse.x = event.clientX;
		inf.mouse.y = event.clientY;			
	}

	moveCamera(event, click)
	{  
		let inf = cameraView.userData.cameraView;
		
		if(click == 'left') 
		{  
			let radious = inf.targetPos.distanceTo( camera.position );
			let theta = - ( ( event.clientX - inf.mouse.x ) * 0.5 ) + inf.theta;
			let phi = ( ( event.clientY - inf.mouse.y ) * 0.5 ) + inf.phi;
			phi = Math.min( 170, Math.max( -160, phi ) );

			camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
			camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
			camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );

			camera.position.add( inf.targetPos );  
			camera.lookAt( inf.targetPos );					
		}
		else if(click == 'right')    
		{		
			let intersects = rayIntersect( event, planeMath, 'one' );
			let offset = new THREE.Vector3().subVectors( inf.intersectPos, intersects[0].point );
			camera.position.add( offset );
			inf.targetPos.add( offset );
		}		
	}

	// камера обхватывает весь объект
	fitCamToObj({obj})
	{
		let v = [];
		
		obj.updateMatrixWorld();
		if(!obj.geometry.boundingBox) obj.geometry.computeBoundingBox();	

		let bound = JSON.parse(JSON.stringify(obj.geometry.boundingBox));
		
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.min.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.min.z).applyMatrix4( obj.matrixWorld );

		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.min.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.min.z).applyMatrix4( obj.matrixWorld );			


		bound = { min : { x : Infinity, y : Infinity, z : Infinity }, max : { x : -Infinity, y : -Infinity, z : -Infinity } };
		
		for(let i = 0; i < v.length; i++)
		{
			if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
			if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
			if(v[i].y < bound.min.y) { bound.min.y = v[i].y; }
			if(v[i].y > bound.max.y) { bound.max.y = v[i].y; }			
			if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
			if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
		}				
		
		let center = new THREE.Vector3((bound.max.x - bound.min.x)/2 + bound.min.x, (bound.max.y - bound.min.y)/2 + bound.min.y, (bound.max.z - bound.min.z)/2 + bound.min.z);

		let maxSize = Math.max( bound.max.x - bound.min.x, bound.max.y - bound.min.y, bound.max.z - bound.min.z );  	
		
		let dir = obj.getWorldDirection().multiplyScalar( maxSize * 2 );	
		camera.position.copy(center).add(dir);
		camera.lookAt(center);			
		
		cameraView.userData.cameraView.targetPos.copy( center );
		
		camera.updateProjectionMatrix();
	}


	zoomCamera( delta, z )
	{		
		let inf = cameraView.userData.cameraView;

		let vect = delta * -0.08;

		let dir = new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize();
		dir = new THREE.Vector3().addScaledVector( dir, vect );

		let pos = new THREE.Vector3().addVectors( camera.position, dir );	

		let qt = quaternionDirection( new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize() );
		let v1 = localTransformPoint( new THREE.Vector3().subVectors( inf.targetPos, pos ), qt );
		
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
		let arr = cameraView.userData.cameraView.arrO;
		cameraView.userData.cameraView.arrO = [];
		
		detectDeleteObj({obj: arr[0]});
		
		addDeleteElemSettingSborka_UI_1();

		this.render();
	}

	render()
	{
		renderCamera();
	}
}    














