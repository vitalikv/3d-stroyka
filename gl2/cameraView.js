

class CameraView
{	
	constructor()
	{
		this.camView = null;
		this.btnClose = null;
		
		this.obj = null;
		
		this.initCamView();
		this.initEvent();		
	}
	
	initEvent()
	{
		this.btnClose = document.querySelector('[nameId="butt_close_cameraView"]');
		this.btnClose.onmousedown = (e) => { this.disable(); }

		let windowResize = this.windowResize.bind(this);
		window.addEventListener('resize', windowResize, false);
	}
	
	initCamView()
	{
		let camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.01, 1000 );  
		camera.rotation.order = 'YZX';		//'ZYX'
		camera.position.y = 2000;
		camera.lookAt(new THREE.Vector3());
		
		camera.userData.mouse = new THREE.Vector2();
		camera.userData.targetPos = new THREE.Vector3();
		camera.userData.intersectPos = new THREE.Vector3();
		camera.userData.theta = 0;
		camera.userData.phi = 0; 

		this.camView = camera;
	}
	
	windowResize() 
	{
		//const width = mainDiv_1.clientWidth;
		//const height = mainDiv_1.clientHeight;
		const width = window.innerWidth;
		const height = window.innerHeight;
		
		let aspect = width / height;
		
		this.camView.aspect = aspect;
		this.camView.updateProjectionMatrix();

		this.render();
	}
	
	// включаем Camera
	enable(params)
	{
		this.btnClose.style.display = '';
		infProject.class.btnCamera2D3D.btn2D.style.display = 'none';
		infProject.class.btnCamera2D3D.btn3D.style.display = 'none';		
		
		deActiveSelected();
		this.deleteObjCameraView();
		
		//camera = this.camView;
		renderPass.camera = this.camView;
		outlinePass.renderCamera = this.camView;
		this.render();
		
		this.activeCamera(params);
		
		this.initMouse();
	}

	// включаем Camera
	async activeCamera(cdm)
	{  
		let obj = null;
		
		if(cdm.sborka)
		{
			//await sleepPause(2000);
			
			let inf = await actionFnSborka_1(cdm);	
			if(!inf) return;
			
			inf.arr1.forEach((o) => o.position.y += 2000 )
			
			addDeleteElemSettingSborka_UI_1(cdm);
			
			obj = inf.arr1[0];
		}
		else
		{
			obj = await loadObjServer({lotid: cdm.lotid, notArray: true});
			
			obj.position.y += 2000;		
		}
		
		this.obj = obj;
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
			
			camOrbit.stopMove = true;
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
			
			camOrbit.stopMove = false;
			setMouseStop(false);	
			
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
		if(click == 'left')			
		{
			let dir = new THREE.Vector3().subVectors( this.camView.userData.targetPos, this.camView.position ).normalize();
			
			// получаем угол наклона камеры к target (к точке куда она смотрит)
			let dergree = THREE.Math.radToDeg( dir.angleTo(new THREE.Vector3(dir.x, 0, dir.z)) ) * 2;	
			if(dir.y > 0) { dergree *= -1; } 			
			
			// получаем угол направления (на плоскости) камеры к target 
			dir.y = 0; 
			dir.normalize();    		
			
			this.camView.userData.theta = THREE.Math.radToDeg( Math.atan2(dir.x, dir.z) - Math.PI ) * 2;
			this.camView.userData.phi = dergree;
		}
		else if(click == 'right')		
		{
			planeMath.position.copy( this.camView.userData.targetPos );
			planeMath.rotation.copy( this.camView.rotation );
			planeMath.updateMatrixWorld();

			let intersects = rayIntersect( event, planeMath, 'one' );	
			this.camView.userData.intersectPos = intersects[0].point;  
		}		

		this.camView.userData.mouse.x = event.clientX;
		this.camView.userData.mouse.y = event.clientY;			
	}

	moveCamera(event, click)
	{  
		if(click == 'left') 
		{  
			let radious = this.camView.userData.targetPos.distanceTo( this.camView.position );
			let theta = - ( ( event.clientX - this.camView.userData.mouse.x ) * 0.5 ) + this.camView.userData.theta;
			let phi = ( ( event.clientY - this.camView.userData.mouse.y ) * 0.5 ) + this.camView.userData.phi;
			phi = Math.min( 170, Math.max( -160, phi ) );

			this.camView.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
			this.camView.position.y = radious * Math.sin( phi * Math.PI / 360 );
			this.camView.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );

			this.camView.position.add( this.camView.userData.targetPos );  
			this.camView.lookAt( this.camView.userData.targetPos );					
		}
		else if(click == 'right')    
		{		
			let intersects = rayIntersect( event, planeMath, 'one' );
			let offset = new THREE.Vector3().subVectors( this.camView.userData.intersectPos, intersects[0].point );
			this.camView.position.add( offset );
			this.camView.userData.targetPos.add( offset );
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
		this.camView.position.copy(center).add(dir);
		this.camView.lookAt(center);			
		
		this.camView.userData.targetPos.copy( center );
		
		this.camView.updateProjectionMatrix();
	}


	zoomCamera( delta, z )
	{		
		let vect = delta * -0.08;

		let dir = new THREE.Vector3().subVectors( this.camView.userData.targetPos, this.camView.position ).normalize();
		dir = new THREE.Vector3().addScaledVector( dir, vect );

		let pos = new THREE.Vector3().addVectors( this.camView.position, dir );	

		let qt = quaternionDirection( new THREE.Vector3().subVectors( this.camView.userData.targetPos, this.camView.position ).normalize() );
		let v1 = localTransformPoint( new THREE.Vector3().subVectors( this.camView.userData.targetPos, pos ), qt );
		
		if ( v1.z >= 0.03) this.camView.position.copy( pos );
	}

	
	// выключаем Camera
	disable()
	{
		mainDiv_1.onmousedown = null;	
		mainDiv_1.onmousemove = null;
		mainDiv_1.onmouseup = null;
		mainDiv_1.onwheel = null;
		
		this.btnClose.style.display = 'none';
		
		this.deleteObjCameraView();

		(camOrbit.activeCam.userData.isCam2D) ? infProject.class.btnCamera2D3D.clickBtnCamera('2D') : infProject.class.btnCamera2D3D.clickBtnCamera('3D');		
	}
	
	
	// удаляем объекты из preview
	deleteObjCameraView()
	{
		let obj = this.obj;
		this.obj = null;
		
		detectDeleteObj({obj});
		
		addDeleteElemSettingSborka_UI_1();

		this.render();
	}

	render()
	{
		renderCamera();
	}
}    














