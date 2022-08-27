

function initSelectBox({container})
{
	let helper = new SelectBoxDiv({container});
	let selectionBox = new SelectBoxObj({deep: 20});

	let isMove = false;
	
	container.addEventListener('mousedown', function ( event ) 
	{
		isMove = false;

		let x = ( event.clientX / window.innerWidth ) * 2 - 1;
		let y = -( event.clientY / window.innerHeight ) * 2 + 1;	
		selectionBox.startPoint.set(x, y, 0);			
	});
	

	container.addEventListener('mousemove', function ( event ) 
	{
		if(helper.isDown) isMove = true;		
	});

	container.addEventListener('mouseup', function ( event ) 
	{
		if(isMove)
		{
			outlinePass.selectedObjects = [];
			
			let x = ( event.clientX / window.innerWidth ) * 2 - 1;
			let y = -( event.clientY / window.innerHeight ) * 2 + 1;	
			selectionBox.endPoint.set(x, y, 0);

			outlinePass.selectedObjects = selectionBox.select();

			camOrbit.render();
		}
	});


	document.addEventListener("keydown", function (e) 
	{ 
		if(e.keyCode == 46 && 1==2) 
		{ 
			let arr = outlinePass.selectedObjects;
			
			for ( let i = 0; i < arr.length; i ++ ) 
			{
				//arr[i].parent.remove(arr[i]);
				//disposeNode(arr[i]);				
			}
			
			outlinePass.selectedObjects = [];
			camOrbit.render();
		}
	});	
}





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

		document.addEventListener('keydown', (e) => { if(e.code == 'ShiftLeft' || e.keyCode == 16) { this.isKeyDown = true;} })
		document.addEventListener('keyup', (e) => { if(e.code == 'ShiftLeft' || e.keyCode == 16) { this.isKeyDown = false; this.onPointerUp(); } })				
	}


	onPointerDown(event) 
	{
		if(!this.isKeyDown) return;
		
		this.isDown = true;
		this.onSelectStart(event);
		setMouseStop(true);
	}	
	
	
	onPointerMove(event) 
	{
		if(!this.isDown) return;
		
		this.onSelectMove(event);
	}
	
	
	onPointerUp(event) 
	{
		if(!this.isDown) return;
		
		this.isDown = false;
		this.onSelectOver(event);
		setMouseStop(false);
	}
	
	onSelectStart( event ) 
	{
		this.element.style.display = '';

		this.element.style.left = event.clientX + 'px';
		this.element.style.top = event.clientY + 'px';
		this.element.style.width = '0px';
		this.element.style.height = '0px';

		this.startPoint.x = event.clientX;
		this.startPoint.y = event.clientY;
	}

	onSelectMove( event ) 
	{
		this.pointBottomRight.x = Math.max( this.startPoint.x, event.clientX );
		this.pointBottomRight.y = Math.max( this.startPoint.y, event.clientY );
		this.pointTopLeft.x = Math.min( this.startPoint.x, event.clientX );
		this.pointTopLeft.y = Math.min( this.startPoint.y, event.clientY );

		this.element.style.left = this.pointTopLeft.x + 'px';
		this.element.style.top = this.pointTopLeft.y + 'px';
		this.element.style.width = ( this.pointBottomRight.x - this.pointTopLeft.x ) + 'px';
		this.element.style.height = ( this.pointBottomRight.y - this.pointTopLeft.y ) + 'px';
	}

	onSelectOver(event) 
	{
		this.element.style.display = 'none';
	}	
}





class SelectBoxObj
{
	constructor({deep = 3.1}) 
	{
		this.camera = null;
		this.startPoint = new THREE.Vector3();
		this.endPoint = new THREE.Vector3();
		this.collection = [];
		this.instances = {};
		this.deep = deep;
		
		this.planes = [new THREE.Plane(), new THREE.Plane(), new THREE.Plane(), new THREE.Plane(), new THREE.Plane(), new THREE.Plane()];
	}
	
	
	select( startPoint, endPoint ) 
	{
		this.camera = camera;
		this.startPoint = startPoint || this.startPoint;
		this.endPoint = endPoint || this.endPoint;
		this.collection = [];

		this.updateFrustum( this.startPoint, this.endPoint );
		
		let arr = [...infProject.scene.array.tube, ...infProject.scene.array.obj];
		for(let i = 0; i < arr.length; i++)
		{
			this.searchChildInFrustum(arr[i]);
		}		
		
		return this.collection;
	}

	// ставим плоскости образующие квадрат, область в которой будут искаться объекты
	updateFrustum( startPoint, endPoint ) 
	{
		startPoint = startPoint || this.startPoint;
		endPoint = endPoint || this.endPoint;


		if(startPoint.x === endPoint.x) endPoint.x += Number.EPSILON;
		if(startPoint.y === endPoint.y) endPoint.y += Number.EPSILON;
		

		this.camera.updateProjectionMatrix();
		this.camera.updateMatrixWorld();

		if(this.camera.isPerspectiveCamera) 
		{
			let p1 = new THREE.Vector3( Math.min( startPoint.x, endPoint.x ), Math.max( startPoint.y, endPoint.y ), startPoint.z );
			let p2 = new THREE.Vector3( Math.max( startPoint.x, endPoint.x ), Math.min( startPoint.y, endPoint.y ), endPoint.z );
			

			let _vecNear = new THREE.Vector3().setFromMatrixPosition( this.camera.matrixWorld );
			
			let _vecTopLeft = new THREE.Vector3().copy( p1 );
			let _vecTopRight = new THREE.Vector3().set( p2.x, p1.y, 0 );
			let _vecDownRight = new THREE.Vector3().copy( p2 );
			let _vecDownLeft = new THREE.Vector3().set( p1.x, p2.y, 0 );

			_vecTopLeft.unproject( this.camera );
			_vecTopRight.unproject( this.camera );
			_vecDownRight.unproject( this.camera );
			_vecDownLeft.unproject( this.camera );


			let dir = this.camera.getWorldDirection(new THREE.Vector3());
			let dist = dir.multiplyScalar( this.deep );

			let _vectemp1 = _vecTopRight.clone().add( dist );
			let _vectemp2 = _vecDownRight.clone().add( dist );
			let _vectemp3 = _vecDownLeft.clone().add( dist );			
  

			if(1==1)
			{
				let planes = this.planes;
				
				planes[ 0 ].setFromCoplanarPoints( _vecNear, _vecTopLeft, _vecTopRight );
				planes[ 1 ].setFromCoplanarPoints( _vecNear, _vecTopRight, _vecDownRight );
				planes[ 2 ].setFromCoplanarPoints( _vecDownRight, _vecDownLeft, _vecNear );
				planes[ 3 ].setFromCoplanarPoints( _vecDownLeft, _vecTopLeft, _vecNear );
				planes[ 4 ].setFromCoplanarPoints( _vecTopRight, _vecDownRight, _vecDownLeft );
				planes[ 5 ].setFromCoplanarPoints( _vectemp3, _vectemp2, _vectemp1 );
				//planes[ 5 ].normal.multiplyScalar( - 1 );	

				// помощник, визуализируем плоскости
				if(1==2)
				{
					for(let i = 0; i < planes.length; i++)
					{
						let helper = new THREE.PlaneHelper( planes[i], 15, 0xff0000 );
						scene.add(helper);					
					}									
				}
			}
		} 
		else if(this.camera.isOrthographicCamera) 
		{

			let left = Math.min( startPoint.x, endPoint.x );
			let top = Math.max( startPoint.y, endPoint.y );
			let right = Math.max( startPoint.x, endPoint.x );
			let down = Math.min( startPoint.y, endPoint.y );			
			
			let _vecTopLeft = new THREE.Vector3( left, top, - 1 );
			let _vecTopRight = new THREE.Vector3( right, top, - 1 );
			let _vecDownRight = new THREE.Vector3( right, down, - 1 );
			let _vecDownLeft = new THREE.Vector3( left, down, - 1 );

			let _vecFarTopLeft = new THREE.Vector3( left, top, 1 );
			let _vecFarTopRight = new THREE.Vector3( right, top, 1 );
			let _vecFarDownRight = new THREE.Vector3( right, down, 1 );
			let _vecFarDownLeft = new THREE.Vector3( left, down, 1 );

			_vecTopLeft.unproject( this.camera );
			_vecTopRight.unproject( this.camera );
			_vecDownRight.unproject( this.camera );
			_vecDownLeft.unproject( this.camera );

			_vecFarTopLeft.unproject( this.camera );
			_vecFarTopRight.unproject( this.camera );
			_vecFarDownRight.unproject( this.camera );
			_vecFarDownLeft.unproject( this.camera );

			
			if(1==1)
			{
				let planes = this.planes;

				planes[ 0 ].setFromCoplanarPoints( _vecTopLeft, _vecFarTopLeft, _vecFarTopRight );
				planes[ 1 ].setFromCoplanarPoints( _vecTopRight, _vecFarTopRight, _vecFarDownRight );
				planes[ 2 ].setFromCoplanarPoints( _vecFarDownRight, _vecFarDownLeft, _vecDownLeft );
				planes[ 3 ].setFromCoplanarPoints( _vecFarDownLeft, _vecFarTopLeft, _vecTopLeft );
				planes[ 4 ].setFromCoplanarPoints( _vecTopRight, _vecDownRight, _vecDownLeft );
				planes[ 5 ].setFromCoplanarPoints( _vecFarDownRight, _vecFarTopRight, _vecFarTopLeft );
				planes[ 5 ].normal.multiplyScalar( - 1 );
				
				
				// помощник, визуализируем плоскости
				if(1==2)
				{
					for(let i = 0; i < planes.length; i++)
					{
						let helper = new THREE.PlaneHelper( planes[i], 15, 0xff0000 );
						scene.add(helper);					
					}									
				}				
			}

		}

	}	
	
	
	// поиск объектов в выбранной области 
	searchChildInFrustum(object) 
	{
		if(object.isMesh || object.isLine || object.isPoints) 
		{
			if(object.geometry.boundingSphere === null) object.geometry.computeBoundingSphere();

			let point = new THREE.Vector3().copy(object.geometry.boundingSphere.center);
			point.applyMatrix4(object.matrixWorld);

			let planes = this.planes;
			
			function containsPoint(point) 
			{
				for ( let i = 0; i < planes.length; i ++ ) 
				{
					if(planes[i].distanceToPoint(point) < 0) return false;
				}

				return true;
			}
			
			if(containsPoint(point)) this.collection.push(object);
		}
		
		// дочерние объекты
		if(1==2 && object.children.length > 0) 
		{
			for ( let x = 0; x < object.children.length; x++ ) 
			{
				this.searchChildInFrustum(object.children[x]);
			}
		}
	}	
}