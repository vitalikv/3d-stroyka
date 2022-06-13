



class SelectBoxDiv
{
	constructor({container}) 
	{
		this.element = document.createElement('div');
		this.element.style.cssText = `border: 1px solid #55aaff; background-color: rgba(75, 160, 255, 0.3); position: fixed;`;
		//this.element.style.pointerEvents = 'none';
		this.element.style.display = 'none';
		
		this.container = container;
		this.container.append( this.element );
		
		this.startPoint = {x: 0, y: 0};
		this.pointTopLeft = {x: 0, y: 0};
		this.pointBottomRight = {x: 0, y: 0};

		this.isDown = false;
		this.isKeyDown = false;
		
		this.initEvent();
	}
	
	
	initEvent() 
	{ 
		this.container.addEventListener( 'pointerdown', this.onPointerDown.bind(this) );
		this.container.addEventListener( 'pointermove', this.onPointerMove.bind(this) );
		this.container.addEventListener( 'pointerup', this.onPointerUp.bind(this) );

		document.addEventListener('keydown', (e) => { if(e.code == 'ShiftLeft') { this.isKeyDown = true;} })
		document.addEventListener('keyup', (e) => { if(e.code == 'ShiftLeft') { this.isKeyDown = false; this.onPointerUp(); } })				
	}


	onPointerDown( event ) 
	{
		if(!this.isKeyDown) return;
		
		this.isDown = true;
		this.onSelectStart( event );
		setMouseStop(true);
	}	
	
	
	onPointerMove( event ) 
	{
		if(!this.isDown) return;
		
		this.onSelectMove( event );
	}
	
	
	onPointerUp() 
	{
		if(!this.isDown) return;
		
		this.isDown = false;
		this.onSelectOver(event);
		setMouseStop(false);
	}
	
	onSelectStart( event ) {

		this.element.style.display = '';

		this.element.style.left = event.clientX + 'px';
		this.element.style.top = event.clientY + 'px';
		this.element.style.width = '0px';
		this.element.style.height = '0px';

		this.startPoint.x = event.clientX;
		this.startPoint.y = event.clientY;

	}

	onSelectMove( event ) {

		this.pointBottomRight.x = Math.max( this.startPoint.x, event.clientX );
		this.pointBottomRight.y = Math.max( this.startPoint.y, event.clientY );
		this.pointTopLeft.x = Math.min( this.startPoint.x, event.clientX );
		this.pointTopLeft.y = Math.min( this.startPoint.y, event.clientY );

		this.element.style.left = this.pointTopLeft.x + 'px';
		this.element.style.top = this.pointTopLeft.y + 'px';
		this.element.style.width = ( this.pointBottomRight.x - this.pointTopLeft.x ) + 'px';
		this.element.style.height = ( this.pointBottomRight.y - this.pointTopLeft.y ) + 'px';
	}

	onSelectOver(event) {

		this.element.style.display = 'none';
		selectBoxFinish(event);
	}	
}


function selectBoxFinish(event)
{
	console.log(3333);
	
	let p1 = infProject.selectBoxDiv.startPoint;
	
	infProject.selectBoxObj.startPoint.set( ( p1.x / window.innerWidth ) * 2 - 1, -( p1.y / window.innerHeight ) * 2 + 1, 0 );	
	
	infProject.selectBoxObj.endPoint.set( ( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0 );

	const allSelected = infProject.selectBoxObj.select();	
}



class SelectBoxObj
{
	constructor({camera, scene, deep = 3.1}) 
	{
		this.camera = camera;
		this.scene = scene;
		this.startPoint = new THREE.Vector3();
		this.endPoint = new THREE.Vector3();
		this.collection = [];
		this.instances = {};
		this.deep = deep;
	}
	
	
	select( startPoint, endPoint ) 
	{
		this.startPoint = startPoint || this.startPoint;
		this.endPoint = endPoint || this.endPoint;
		this.collection = [];

		this.updateFrustum( this.startPoint, this.endPoint );
		//this.searchChildInFrustum( _frustum, this.scene );

		return this.collection;
	}


	updateFrustum( startPoint, endPoint ) 
	{
		startPoint = startPoint || this.startPoint;
		endPoint = endPoint || this.endPoint;


		if(startPoint.x === endPoint.x) endPoint.x += Number.EPSILON;
		if(startPoint.y === endPoint.y) endPoint.y += Number.EPSILON;
		

		this.camera.updateProjectionMatrix();
		this.camera.updateMatrixWorld();

		if ( this.camera.isPerspectiveCamera ) 
		{
			let _tmpPoint = new THREE.Vector3();
			
			const _vecNear = new THREE.Vector3();
			const _vecTopLeft = new THREE.Vector3();
			const _vecTopRight = new THREE.Vector3();
			const _vecDownRight = new THREE.Vector3();
			const _vecDownLeft = new THREE.Vector3();

			const _vecFarTopLeft = new THREE.Vector3();
			const _vecFarTopRight = new THREE.Vector3();
			const _vecFarDownRight = new THREE.Vector3();
			const _vecFarDownLeft = new THREE.Vector3();

			const _vectemp1 = new THREE.Vector3();
			const _vectemp2 = new THREE.Vector3();
			const _vectemp3 = new THREE.Vector3();			
			


			_tmpPoint.copy( startPoint );
			_tmpPoint.x = Math.min( startPoint.x, endPoint.x );
			_tmpPoint.y = Math.max( startPoint.y, endPoint.y );
			endPoint.x = Math.max( startPoint.x, endPoint.x );
			endPoint.y = Math.min( startPoint.y, endPoint.y );
			
			//_tmpPoint.set( Math.min( startPoint.x, endPoint.x ), Math.max( startPoint.y, endPoint.y ), startPoint.z );
			//endPoint.set( Math.max( startPoint.x, endPoint.x ), Math.min( startPoint.y, endPoint.y ), endPoint.z );
			

			_vecNear.setFromMatrixPosition( this.camera.matrixWorld );
			_vecTopLeft.copy( _tmpPoint );
			_vecTopRight.set( endPoint.x, _tmpPoint.y, 0 );
			_vecDownRight.copy( endPoint );
			_vecDownLeft.set( _tmpPoint.x, endPoint.y, 0 );

			_vecTopLeft.unproject( this.camera );
			_vecTopRight.unproject( this.camera );
			_vecDownRight.unproject( this.camera );
			_vecDownLeft.unproject( this.camera );

let dir = this.camera.getWorldDirection(new THREE.Vector3());
let dist = dir.multiplyScalar( this.deep );



			_vectemp1.copy( _vecTopRight ).add( dist );
			_vectemp2.copy( _vecDownRight ).add( dist );
			_vectemp3.copy( _vecDownLeft ).add( dist );
			


			if(1==2) 
			{
				let arrP = [_vecTopLeft, _vecTopRight, _vecDownRight, _vecDownLeft];
				
				for(let i = 0; i < arrP.length; i++)
				{
					let geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
					let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
					let cube = new THREE.Mesh(geometry, material);
					cube.position.copy(arrP[i]);
					this.scene.add(cube);					
				}
				
				console.log(333, arrP);
			}
  
			console.log(333, this.deep);

			if(1==1)
			{
				const planes = [new THREE.Plane(), new THREE.Plane(), new THREE.Plane(), new THREE.Plane(), new THREE.Plane(), new THREE.Plane()];

				planes[ 0 ].setFromCoplanarPoints( _vecNear, _vecTopLeft, _vecTopRight );
				planes[ 1 ].setFromCoplanarPoints( _vecNear, _vecTopRight, _vecDownRight );
				planes[ 2 ].setFromCoplanarPoints( _vecDownRight, _vecDownLeft, _vecNear );
				planes[ 3 ].setFromCoplanarPoints( _vecDownLeft, _vecTopLeft, _vecNear );
				planes[ 4 ].setFromCoplanarPoints( _vecTopRight, _vecDownRight, _vecDownLeft );
				planes[ 5 ].setFromCoplanarPoints( _vectemp3, _vectemp2, _vectemp1 );
				//planes[ 5 ].normal.multiplyScalar( - 1 );	

				for(let i = 0; i < planes.length; i++)
				{
					let helper = new THREE.PlaneHelper( planes[i], 15, 0xff0000 );
					this.scene.add(helper);					
				}				
			}
		} 
		else if ( this.camera.isOrthographicCamera && 1==2) 
		{

			const left = Math.min( startPoint.x, endPoint.x );
			const top = Math.max( startPoint.y, endPoint.y );
			const right = Math.max( startPoint.x, endPoint.x );
			const down = Math.min( startPoint.y, endPoint.y );

			_vecTopLeft.set( left, top, - 1 );
			_vecTopRight.set( right, top, - 1 );
			_vecDownRight.set( right, down, - 1 );
			_vecDownLeft.set( left, down, - 1 );

			_vecFarTopLeft.set( left, top, 1 );
			_vecFarTopRight.set( right, top, 1 );
			_vecFarDownRight.set( right, down, 1 );
			_vecFarDownLeft.set( left, down, 1 );

			_vecTopLeft.unproject( this.camera );
			_vecTopRight.unproject( this.camera );
			_vecDownRight.unproject( this.camera );
			_vecDownLeft.unproject( this.camera );

			_vecFarTopLeft.unproject( this.camera );
			_vecFarTopRight.unproject( this.camera );
			_vecFarDownRight.unproject( this.camera );
			_vecFarDownLeft.unproject( this.camera );

			const planes = _frustum.planes;

			planes[ 0 ].setFromCoplanarPoints( _vecTopLeft, _vecFarTopLeft, _vecFarTopRight );
			planes[ 1 ].setFromCoplanarPoints( _vecTopRight, _vecFarTopRight, _vecFarDownRight );
			planes[ 2 ].setFromCoplanarPoints( _vecFarDownRight, _vecFarDownLeft, _vecDownLeft );
			planes[ 3 ].setFromCoplanarPoints( _vecFarDownLeft, _vecFarTopLeft, _vecTopLeft );
			planes[ 4 ].setFromCoplanarPoints( _vecTopRight, _vecDownRight, _vecDownLeft );
			planes[ 5 ].setFromCoplanarPoints( _vecFarDownRight, _vecFarTopRight, _vecFarTopLeft );
			planes[ 5 ].normal.multiplyScalar( - 1 );

		}

	}	
}