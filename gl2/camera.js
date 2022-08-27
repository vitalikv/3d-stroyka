



// переключение камеры
class BtnCamera2D3D
{
	constructor(type)
	{
		this.btn2D = document.querySelector('[nameId="butt_camera_2D"]');
		this.btn3D = document.querySelector('[nameId="butt_camera_3D"]');
		this.initEvent();
		
		if(type) this.clickBtnCamera(type);
	}

	initEvent()
	{  
		this.btn2D.onmousedown = (e) => { this.clickBtnCamera('2D'); }
		this.btn3D.onmousedown = (e) => { this.clickBtnCamera('3D'); }		
	}
	
	clickBtnCamera(type)
	{
		deActiveSelected();
		changeRightMenuUI_1({current: true});
		clickO = resetPop.clickO();
		
		this.btn2D.style.display = 'none';
		this.btn3D.style.display = 'none';
		
		(type === '2D') ? this.btn3D.style.display = '' : this.btn2D.style.display = '';
		
		camOrbit.setActiveCam({cam: type});
	}
}





class CameraOrbit
{
	constructor(params)
	{
		this.params = params;
		this.camera = null;
		this.cam2D = this.initCam2D();
		this.cam3D = this.initCam3D();
		this.planeMath = this.initPlaneMath();
		this.activeCam = this.cam2D;		
		
		this.detectBrowser = this.detectBrowser();
		
		this.stopMove = false;
		
		this.mouse = {};
		this.mouse.button = '';
		this.mouse.down = false;
		this.mouse.move = false;		
		this.mouse.pos = {};
		this.mouse.pos.x = 0;
		this.mouse.pos.y = 0;
		
		if(params.setCam) this.setActiveCam({cam: params.setCam});
		this.initEvent();	
	}
	
	initEvent()
	{
		let mouseDown = this.mouseDown.bind(this);
		let mouseMove = this.mouseMove.bind(this);
		let mouseUp = this.mouseUp.bind(this);		
		let mouseWheel = this.mouseWheel.bind(this);
		let windowResize = this.windowResize.bind(this);
		
		this.params.container.addEventListener( 'mousedown', mouseDown, false );
		this.params.container.addEventListener( 'mousemove', mouseMove, false );
		this.params.container.addEventListener( 'mouseup', mouseUp, false );	
		
		this.params.container.addEventListener( 'touchstart', mouseDown, false );
		this.params.container.addEventListener( 'touchmove', mouseMove, false );
		this.params.container.addEventListener( 'touchend', mouseUp, false );
		
		this.params.container.addEventListener('wheel', mouseWheel, false);			

		window.addEventListener( 'resize', windowResize, false );
	}
	
	initCam2D()
	{
		let aspect = this.params.canvas.clientWidth / this.params.canvas.clientHeight;
		let d = 5;
		let camera2D = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
		camera2D.userData.isCam2D = true;
		camera2D.position.set(0, 10, 0);
		camera2D.lookAt(this.params.scene.position);
		camera2D.zoom = 1;
		camera2D.updateMatrixWorld();
		camera2D.updateProjectionMatrix();	

		return camera2D;
	}

	initCam3D()
	{
		let camera3D = new THREE.PerspectiveCamera( 65, this.params.canvas.clientWidth / this.params.canvas.clientHeight, 0.01, 1000 );  
		camera3D.rotation.order = 'YZX';		//'ZYX'
		camera3D.position.set(5, 7, 5);	
		camera3D.lookAt( new THREE.Vector3() );
		
		camera3D.userData.isCam3D = true;
		camera3D.userData.camera = {};	
		camera3D.userData.camera.d3 = { theta: 0, phi: 75 };
		camera3D.userData.camera.d3.targetO = targetO(this.params.scene);	
		camera3D.userData.camera.type = 'fly';
		camera3D.userData.camera.click = {};
		camera3D.userData.camera.click.pos = new THREE.Vector3();
		
		
		function targetO(scene)
		{
			let material = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 1, depthTest: false });
			let obj = new THREE.Mesh( new THREE.BoxGeometry(0.07, 0.07, 0.07), material );
			obj.renderOrder = 2;
			//obj.visible = false;			
			scene.add( obj );
			
			return obj;
		}			

		return camera3D;
	}
	
	initPlaneMath()
	{
		let geometry = new THREE.PlaneGeometry( 10000, 10000 );		
		let material = new THREE.MeshPhongMaterial( {color: 0xffff00, transparent: true, opacity: 0.5, side: THREE.DoubleSide } );
		material.visible = false; 
		let planeMath = new THREE.Mesh( geometry, material );
		planeMath.rotation.set(-Math.PI/2, 0, 0);	
		this.params.scene.add( planeMath );	
		
		return planeMath;
	}	
	
	setActiveCam({cam})
	{
		let camera = (cam == '2D') ? this.cam2D : this.cam3D;
		
		this.activeCam = camera;
		
		if(composer)
		{ 
			renderPass.camera = this.activeCam;
			outlinePass.renderCamera = this.activeCam;			
		}
		
		this.render();
	}

	mouseDown(event)
	{
		if(this.stopMove) return;
		this.mouse.down = true;
		this.mouse.move = false;
	
		switch ( event.button ) 
		{
			case 0: this.mouse.button = 'left'; break;
			case 1: this.mouse.button = 'right'; break;
			case 2: this.mouse.button = 'right'; break;
		}	
		
		if(event.changedTouches)
		{
			event.clientX = event.targetTouches[0].clientX;
			event.clientY = event.targetTouches[0].clientY;
			this.mouse.button = 'left';	
		}

		this.startCam2D({camera2D: this.cam2D, event: event, button: this.mouse.button});
		this.startCam3D({camera3D: this.cam3D, event: event, button: this.mouse.button});
	
		this.render();
	}

	mouseMove(event)
	{
		if(this.stopMove) return;
		if(!this.mouse.down) return;		
		
		if(event.changedTouches)
		{
			event.clientX = event.targetTouches[0].clientX;
			event.clientY = event.targetTouches[0].clientY;
		}

		if(this.mouse.down && !this.mouse.move)
		{
			this.mouse.move = true;
		}

		if (this.activeCam == this.cam2D) { this.moveCam2D( this.cam2D, event, this.mouse.button ); }
		else if (this.activeCam == this.cam3D) { this.moveCam3D( this.cam3D, event, this.mouse.button ); }	
	
		
		infProject.class.api.camMove();
		
		this.render();
	}

	mouseUp(event)
	{
		this.mouse.button = '';
		this.mouse.down = false;
		this.mouse.move = false;		
	}
	
	
	windowResize() 
	{
		const canvas = this.params.canvas;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		//if (!needResize) { return; }
		
		this.params.renderer.setSize(width, height, false);
		
		let aspect = width / height;
		let d = 5;
		
		this.cam2D.left = -d * aspect;
		this.cam2D.right = d * aspect;
		this.cam2D.top = d;
		this.cam2D.bottom = -d;
		this.cam2D.updateProjectionMatrix();

		 
		this.cam3D.aspect = aspect;
		this.cam3D.updateProjectionMatrix();	
		
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		
		this.render();

	}	


	startCam2D(params)
	{
		let camera2D = params.camera2D;
		let event = params.event;
		let button = params.button;
			
		if(this.activeCam != camera2D) return;

		let planeMath = this.planeMath;
		
		planeMath.position.set(camera2D.position.x, 0, camera2D.position.z);
		planeMath.rotation.set(-Math.PI/2,0,0);  
		planeMath.updateMatrixWorld();
		
		let intersects = this.rayIntersect( event, planeMath, 'one' );
		
		this.mouse.pos.x = intersects[0].point.x;
		this.mouse.pos.y = intersects[0].point.z;	 		
	}


	startCam3D(params)
	{
		let camera3D = params.camera3D;
		let event = params.event;
		let button = params.button;
		
		if(this.activeCam != camera3D) { return; }
		
		this.mouse.pos.x = event.clientX;
		this.mouse.pos.y = event.clientY;
		
		if(button == 'left')				
		{
			//var dir = camera.getWorldDirection();
			let dir = new THREE.Vector3().subVectors( camera3D.userData.camera.d3.targetO.position, camera3D.position ).normalize();
			
			// получаем угол наклона камеры к target (к точке куда она смотрит)
			let dergree = THREE.Math.radToDeg( dir.angleTo(new THREE.Vector3(dir.x, 0, dir.z)) ) * 2;	
			if(dir.y > 0) { dergree *= -1; } 			
			
			// получаем угол направления (на плоскости) камеры к target 
			dir.y = 0; 
			dir.normalize();    						
			
			camera3D.userData.camera.d3.theta = THREE.Math.radToDeg( Math.atan2(dir.x, dir.z) - Math.PI ) * 2;
			camera3D.userData.camera.d3.phi = dergree;
		}
		else if(button == 'right')		
		{
			let planeMath = this.planeMath;
			
			planeMath.position.copy( camera3D.userData.camera.d3.targetO.position );
			
			planeMath.rotation.copy( camera3D.rotation );		
			planeMath.updateMatrixWorld();

			let intersects = this.rayIntersect( event, planeMath, 'one' );
			if(!intersects[0]) return;
			camera3D.userData.camera.click.pos = intersects[0].point; 		
		}	
	}


	moveCam2D( camera2D, event, click ) 
	{
		if(this.activeCam != camera2D) return;
		if(click == '') return;
				
		
		let intersects = this.rayIntersect( event, this.planeMath, 'one' );
		
		camera2D.position.x += this.mouse.pos.x - intersects[0].point.x;
		camera2D.position.z += this.mouse.pos.y - intersects[0].point.z;	
	}


	moveCam3D( camera3D, event, click )
	{ 
		if(this.activeCam != camera3D) return;
		
		if(click == 'left') 
		{  
			let radious = camera3D.userData.camera.d3.targetO.position.distanceTo( camera3D.position );
			
			let theta = - ( ( event.clientX - this.mouse.pos.x ) * 0.5 ) + camera3D.userData.camera.d3.theta;
			let phi = ( ( event.clientY - this.mouse.pos.y ) * 0.5 ) + camera3D.userData.camera.d3.phi;
			phi = Math.min( 170, Math.max( -60, phi ) );

			camera3D.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
			camera3D.position.y = radious * Math.sin( phi * Math.PI / 360 );
			camera3D.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );

			camera3D.position.add( camera3D.userData.camera.d3.targetO.position );  
			camera3D.lookAt( camera3D.userData.camera.d3.targetO.position );			
			
			camera3D.userData.camera.d3.targetO.rotation.set( 0, camera3D.rotation.y, 0 );		
		}
		
		if(click == 'right')    
		{
			let intersects = this.rayIntersect( event, this.planeMath, 'one' );
			if(!intersects[0]) return;
			let offset = new THREE.Vector3().subVectors( camera3D.userData.camera.click.pos, intersects[0].point );
			camera3D.position.add( offset );
			camera3D.userData.camera.d3.targetO.position.add( offset );			
		}			 
		
	}
	

	rayIntersect( event, obj, t ) 
	{		
		let container = this.params.container; 

		let mouse = getMousePosition( event );
		
		function getMousePosition( event )
		{
			let x = ( ( event.clientX - container.offsetLeft ) / container.clientWidth ) * 2 - 1;
			let y = - ( ( event.clientY - container.offsetTop ) / container.clientHeight ) * 2 + 1;	
			
			return new THREE.Vector2(x, y);
		}
		
		let raycaster = new THREE.Raycaster()
		raycaster.setFromCamera( mouse, this.activeCam );
		
		let intersects = null;
		if(t == 'one'){ intersects = raycaster.intersectObject( obj ); } 
		else if(t == 'arr'){ intersects = raycaster.intersectObjects( obj, true ); }
		
		return intersects;
	}


	mouseWheel(event)
	{		
		let delta = -event.wheelDelta / 120;	
		
		if(this.activeCam == this.cam2D) { this.cameraZoom2D({cam2D: this.cam2D, delta: delta}); }
		else if(this.activeCam == this.cam3D) { this.cameraZoom3D({cam3D: this.cam3D, delta: delta}); }
		
		infProject.class.api.camZoom();
		
		this.render();
	}
	
	

	cameraZoom2D(params)
	{
		let camera2D = params.cam2D;
		let delta = params.delta;
		
		let zoom = camera2D.zoom - ( delta * 0.1 * ( camera2D.zoom / 2 ) );
		
		camera2D.zoom = zoom;
		camera2D.updateProjectionMatrix();	
	}


	cameraZoom3D(params)
	{
		let camera3D = params.cam3D;
		let delta = params.delta;
		
		let movement = ( delta < 0 ) ? 1 : -1;
		movement *= 1.2;
		
		let pos1 = camera3D.userData.camera.d3.targetO.position;
		let pos2 = camera3D.position.clone();
				
		
		let dir = camera3D.getWorldDirection(new THREE.Vector3());
		let offset = new THREE.Vector3().addScaledVector( dir, movement );
		
		pos1 = offsetTargetCam({posCenter: pos1, dir: dir, dist: 0.1});
		offset = stopTargetCam({posCenter: pos1, posCam: pos2, offset: offset});
		
		
		// устанавливаем расстояние насколько близко можно приблизиться камерой к target
		function offsetTargetCam(params)
		{
			let dir = params.dir;
			let dist = params.dist;
			let posCenter = params.posCenter;
			
			let dirInvers = new THREE.Vector3(-dir.x, -dir.y, -dir.z);		
			let offset = new THREE.Vector3().addScaledVector( dirInvers, dist );
			
			let newPos = new THREE.Vector3().addVectors( posCenter, offset );
			
			return newPos;
		}	
		
		
		// запрещаем перемещение камеры за пределы центра/target
		function stopTargetCam(params)
		{	
			let offset = params.offset;
			let posCam = params.posCam;
			let posCenter = params.posCenter;
			
			let newPos = new THREE.Vector3().addVectors( posCam, offset );
			let dir2 = new THREE.Vector3().subVectors( posCenter, newPos ).normalize();		
			
			let dot = dir.dot(dir2);

			if(dot < 0) 
			{
				offset = new THREE.Vector3().subVectors( posCenter, posCam )
			}
			
			return offset;
		}	

		camera3D.position.add( offset );			
	}


	// приближаемся к выбранному объекту
	fitCamera({obj, rot = true})
	{
		let camera = this.activeCam;

		let v = [];
		
		obj.updateMatrixWorld();
		obj.geometry.computeBoundingBox();	

		let bound = obj.geometry.boundingBox;
		
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.min.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.min.z).applyMatrix4( obj.matrixWorld );

		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.max.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.min.z).applyMatrix4( obj.matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.min.z).applyMatrix4( obj.matrixWorld );			


		if(camera.userData.isCam3D)
		{
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
			
			// визуализируем 
			if(1==2)
			{
				let g = createGeometryCube(0.01, 0.01, 0.01);
				let material = new THREE.MeshLambertMaterial( { color : 0x030202, transparent: true, opacity: 1, depthTest: false } );

				let cube = [];
				for(let i = 0; i < 6; i++)
				{
					cube[i] = new THREE.Mesh( g, material );
					scene.add( cube[i] );	
				}
				cube[0].position.set(bound.min.x, center.y, center.z); 
				cube[1].position.set(bound.max.x, center.y, center.z); 
				cube[2].position.set(center.x, bound.min.y, center.z); 
				cube[3].position.set(center.x, bound.max.y, center.z); 
				cube[4].position.set(center.x, center.y, bound.min.z); 
				cube[5].position.set(center.x, center.y, bound.max.z);		
			}
			
			let fitOffset = 5.1;
			let maxSize = Math.max( bound.max.x - bound.min.x, bound.max.y - bound.min.y, bound.max.z - bound.min.z );  
			//let fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );		
			//let fitWidthDistance = fitHeightDistance / camera.aspect;		
			//let distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );		
			
			
			if(rot)
			{
				camera.lookAt(center);		
				let dir = center.clone().sub( camera.position ).normalize().multiplyScalar( maxSize + 0.25 );	
				camera.position.copy(center).sub(dir);			
			}
			else
			{	
				//let maxSize = Math.max( bound.max.x - bound.min.x, bound.max.y - bound.min.y );
				let dir = obj.getWorldDirection().multiplyScalar( maxSize * 2 );	
				camera.position.copy(center).add(dir);
				camera.lookAt(center);			
			}		
			
			camera.userData.camera.d3.targetO.position.copy( center );
		}
		
		
		if(camera.userData.isCam2D)
		{
			bound = { min : { x : Infinity, z : Infinity }, max : { x : -Infinity, z : -Infinity } };
			
			for(let i = 0; i < v.length; i++)
			{
				if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
				if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
				if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
				if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
			}					

			let aspect = ( bound.max.x - bound.min.x )/( bound.max.z - bound.min.z );		
			
			if( aspect > 1.0 )	// определяем что больше ширина или высота 
			{
				let x = ( bound.max.x - bound.min.x < 0.1) ? 0.1 : bound.max.x - bound.min.x;
				camera.zoom = camera.right / (x/0.5);
			}
			else
			{
				let z = ( bound.max.z - bound.min.z < 0.1) ? 0.1 : bound.max.z - bound.min.z;
				camera.zoom = camera.top / (z/0.5);
			}
			
			

			// центр нужно считать, так как у трубы центр всегда в нулях
			let pos = new THREE.Vector3((bound.max.x - bound.min.x)/2 + bound.min.x, 0, (bound.max.z - bound.min.z)/2 + bound.min.z);		
			camera.position.x = pos.x;
			camera.position.z = pos.z;	
		}
		
		camera.updateProjectionMatrix();
		
		infProject.class.api.camMove();
		
		this.render();
	}
	
	
	
	detectBrowser()
	{
		let ua = navigator.userAgent;

		if ( ua.search( /MSIE/ ) > 0 ) return 'Explorer';
		if ( ua.search( /Firefox/ ) > 0 ) return 'Firefox';
		if ( ua.search( /Opera/ ) > 0 ) return 'Opera';
		if ( ua.search( /Chrome/ ) > 0 ) return 'Chrome';
		if ( ua.search( /Safari/ ) > 0 ) return 'Safari';
		if ( ua.search( /Konqueror/ ) > 0 ) return 'Konqueror';
		if ( ua.search( /Iceweasel/ ) > 0 ) return 'Debian';
		if ( ua.search( /SeaMonkey/ ) > 0 ) return 'SeaMonkey';

		// Браузеров очень много, все вписывать смысле нет, Gecko почти везде встречается
		if ( ua.search( /Gecko/ ) > 0 ) return 'Gecko';

		// а может это вообще поисковый робот
		return 'Search Bot';
	}	

	render() 
	{
		if (composer) { composer.render(); } 
		else { this.params.renderer.render( this.params.scene, this.activeCam ); }				
	}
	
}




