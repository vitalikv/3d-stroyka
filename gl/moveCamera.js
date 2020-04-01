
var type_browser = detectBrowser();
var newCameraPosition = null;


function updateKeyDown() 
{
	//if(docReady) if(infProject.activeInput) return;
	
	var flag = false;
	
	var keys = clickO.keys;  
	if(keys.length == 0) return;
	
	if ( camera == cameraTop )
	{
		if ( keys[ 87 ] || keys[ 38 ] ) 
		{
			camera.position.z -= 0.1;
			newCameraPosition = null;
			flag = true;
		}
		else if ( keys[ 83 ] || keys[ 40 ] ) 
		{
			camera.position.z += 0.1;
			newCameraPosition = null;
			flag = true;
		}
		if ( keys[ 65 ] || keys[ 37 ] ) 
		{
			camera.position.x -= 0.1;
			newCameraPosition = null;
			flag = true;
		}
		else if ( keys[ 68 ] || keys[ 39 ] ) 
		{
			camera.position.x += 0.1;
			newCameraPosition = null;
			flag = true;
		}
	}
	else if ( camera == camera3D ) 
	{
		if ( keys[ 87 ] || keys[ 38 ] ) 
		{
			var x = Math.sin( camera.rotation.y );
			var z = Math.cos( camera.rotation.y );
			var dir = new THREE.Vector3( -x, 0, -z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			camera.position.add( dir );
			infProject.camera.d3.targetPos.add( dir );
			newCameraPosition = null;
			flag = true;
		}
		else if ( keys[ 83 ] || keys[ 40 ] ) 
		{
			var x = Math.sin( camera.rotation.y );
			var z = Math.cos( camera.rotation.y );
			var dir = new THREE.Vector3( x, 0, z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			dir.addScalar( 0.0001 );
			camera.position.add( dir );
			infProject.camera.d3.targetPos.add( dir );
			newCameraPosition = null;
			flag = true;
		}
		if ( keys[ 65 ] || keys[ 37 ] ) 
		{
			var x = Math.sin( camera.rotation.y - 1.5707963267948966 );
			var z = Math.cos( camera.rotation.y - 1.5707963267948966 );
			var dir = new THREE.Vector3( x, 0, z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			dir.addScalar( 0.0001 );
			camera.position.add( dir );
			infProject.camera.d3.targetPos.add( dir );
			newCameraPosition = null;
			flag = true;
		}
		else if ( keys[ 68 ] || keys[ 39 ] ) 
		{
			var x = Math.sin( camera.rotation.y + 1.5707963267948966 );
			var z = Math.cos( camera.rotation.y + 1.5707963267948966 );
			var dir = new THREE.Vector3( x, 0, z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			dir.addScalar( 0.0001 );
			camera.position.add( dir );
			infProject.camera.d3.targetPos.add( dir );
			newCameraPosition = null;
			flag = true;
		}
		if ( keys[ 88 ] ) 
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
			dir = new THREE.Vector3().addScaledVector( dir, -0.1 );
			dir.addScalar( 0.0001 );
			camera.position.add( dir );
			infProject.camera.d3.targetPos.add( dir );
			newCameraPosition = null;
			flag = true;
		}
		else if ( keys[ 67 ] ) 
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			dir.addScalar( 0.0001 );
			camera.position.add( dir );
			infProject.camera.d3.targetPos.add( dir );
			newCameraPosition = null;
			flag = true;
		}
	}
	else if ( camera == cameraWall )
	{
		if ( keys[ 87 ] || keys[ 38 ] ) 
		{
			camera.position.y += 0.1;
			newCameraPosition = null;
			flag = true;
		}
		else if ( keys[ 83 ] || keys[ 40 ] ) 
		{
			camera.position.y -= 0.1;
			newCameraPosition = null;
			flag = true;
		}
		if ( keys[ 65 ] || keys[ 37 ] ) 
		{
			camera.position.x -= 0.1;
			newCameraPosition = null;
			flag = true;
		}
		else if ( keys[ 68 ] || keys[ 39 ] ) 
		{
			camera.position.x += 0.1;
			newCameraPosition = null;
			flag = true;
		}
	}

	if(flag) { renderCamera(); }
}


// стартовое положение 3D камеры
function startPosCamera3D(cdm)
{
	camera3D.position.x = 0;
	camera3D.position.y = cdm.radious * Math.sin( cdm.phi * Math.PI / 360 );
	camera3D.position.z = cdm.radious * Math.cos( cdm.theta * Math.PI / 360 ) * Math.cos( cdm.phi * Math.PI / 360 );
			
	camera3D.lookAt(new THREE.Vector3( 0, 0, 0 ));	
}


function cameraMove3D( event )
{
	if ( camera3D.userData.camera.type == 'fly' )
	{
		if ( isMouseDown2 ) 
		{  
			newCameraPosition = null;
			var radious = infProject.camera.d3.targetPos.distanceTo( camera.position );
			var theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 ) + infProject.camera.d3.theta;
			var phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 ) + infProject.camera.d3.phi;
			var phi = Math.min( 180, Math.max( -10, phi ) );

			camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
			camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
			camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );

			camera.position.add( infProject.camera.d3.targetPos );  
			camera.lookAt( infProject.camera.d3.targetPos );
			
			var gizmo = infProject.tools.gizmo;
			
			if(gizmo.visible) clippingGizmo360(gizmo.userData.gizmo.obj);
			
		}
		if ( isMouseDown3 )    
		{
			newCameraPosition = null;
			
			var intersects = rayIntersect( event, planeMath, 'one' );
			var offset = new THREE.Vector3().subVectors( camera3D.userData.camera.click.pos, intersects[0].point );
			camera.position.add( offset );
			infProject.camera.d3.targetPos.add( offset );
		}
	}
	else if ( camera3D.userData.camera.type == 'first' )
	{
		if ( isMouseDown2 )
		{
			newCameraPosition = null;
			var y = ( ( event.clientX - onMouseDownPosition.x ) * 0.006 );
			var x = ( ( event.clientY - onMouseDownPosition.y ) * 0.006 );

			camera.rotation.x -= x;
			camera.rotation.y -= y;
			onMouseDownPosition.x = event.clientX;
			onMouseDownPosition.y = event.clientY;

			var dir = camera.getWorldDirection();			
			//dir.y = 0;
			dir.normalize();
			dir.x *= camera3D.userData.camera.dist;
			dir.z *= camera3D.userData.camera.dist;
			dir.add( camera.position );
			dir.y = 0;
			
			infProject.camera.d3.targetPos.copy( dir ); 		
		}
	} 		
	
}



// кликаем левой кнопокой мыши (собираем инфу для перемещения камеры в 2D режиме)
function clickSetCamera2D( event, click )
{
	if ( camera == cameraTop || camera == cameraWall) { }
	else { return; }

	isMouseDown1 = true;
	isMouseRight1 = true;
	onMouseDownPosition.x = event.clientX;
	onMouseDownPosition.y = event.clientY;
	newCameraPosition = null;
	

	if(camera == cameraTop) 
	{
		planeMath.position.set(camera.position.x,0,camera.position.z);
		planeMath.rotation.set(-Math.PI/2,0,0);  
		planeMath.updateMatrixWorld();
		
		var intersects = rayIntersect( event, planeMath, 'one' );
		
		onMouseDownPosition.x = intersects[0].point.x;
		onMouseDownPosition.z = intersects[0].point.z;	 		
	}
	if(camera == cameraWall) 
	{
		var dir = camera.getWorldDirection();
		dir = new THREE.Vector3().addScaledVector(dir, 10);
		planeMath.position.copy(camera.position);  
		planeMath.position.add(dir);  
		planeMath.rotation.copy( camera.rotation ); 
		planeMath.updateMatrixWorld();

		var intersects = rayIntersect( event, planeMath, 'one' );	
		onMouseDownPosition.x = intersects[0].point.x;
		onMouseDownPosition.y = intersects[0].point.y;
		onMouseDownPosition.z = intersects[0].point.z;		 		
	}	
}


// 1. кликаем левой кнопокой мыши (собираем инфу для вращения камеры в 3D режиме)
// 2. кликаем правой кнопокой мыши (собираем инфу для перемещения камеры в 3D режиме и устанавливаем мат.плоскость)
function clickSetCamera3D( event, click )
{
	if ( camera != camera3D ) { return; }

	onMouseDownPosition.x = event.clientX;
	onMouseDownPosition.y = event.clientY;

	if ( click == 'left' )				// 1
	{
		//var dir = camera.getWorldDirection();
		var dir = new THREE.Vector3().subVectors( infProject.camera.d3.targetPos, camera.position ).normalize();
		
		// получаем угол наклона камеры к target (к точке куда она смотрит)
		var dergree = THREE.Math.radToDeg( dir.angleTo(new THREE.Vector3(dir.x, 0, dir.z)) ) * 2;	
		if(dir.y > 0) { dergree *= -1; } 			
		
		// получаем угол направления (на плоскости) камеры к target 
		dir.y = 0; 
		dir.normalize();    		
		
		isMouseDown2 = true;
		infProject.camera.d3.theta = THREE.Math.radToDeg( Math.atan2(dir.x, dir.z) - Math.PI ) * 2;
		infProject.camera.d3.phi = dergree;
	}
	else if ( click == 'right' )		// 2
	{
		isMouseDown3 = true;
		planeMath.position.copy( infProject.camera.d3.targetPos );
		planeMath.rotation.copy( camera.rotation );
		planeMath.updateMatrixWorld();

		var intersects = rayIntersect( event, planeMath, 'one' );	
		camera3D.userData.camera.click.pos = intersects[0].point;  
	}
}





function moveCameraTop( event ) 
{
	if(isMouseRight1 || isMouseDown1) {}
	else { return; }


	newCameraPosition = null;	
	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	camera.position.x += onMouseDownPosition.x - intersects[0].point.x;
	camera.position.z += onMouseDownPosition.z - intersects[0].point.z;	
}


// перемещение cameraWall
function moveCameraWall2D( event )
{
	if ( !isMouseRight1 ) { return; }

	var intersects = rayIntersect( event, planeMath, 'one' );
	
	camera.position.x += onMouseDownPosition.x - intersects[0].point.x;
	camera.position.y += onMouseDownPosition.y - intersects[0].point.y;	
	camera.position.z += onMouseDownPosition.z - intersects[0].point.z;
	
	newCameraPosition = null;	
}


// cameraZoom
function onDocumentMouseWheel( event )
{
	
	var delta = event.wheelDelta ? event.wheelDelta / 120 : event.detail ? event.detail / 3 : 0;

	if ( type_browser == 'Chrome' || type_browser == 'Opera' ) { delta = -delta; }

	if(camera == cameraTop) 
	{ 
		var zoomOld = camera.zoom;
		cameraZoomTop( camera.zoom - ( delta * 0.5 * ( camera.zoom / 2 ) ) );		
		zoomCameraTop_2({event: event, zoomOld: zoomOld});
	}
	else if(camera == camera3D) 
	{ 
		//cameraZoom3D( delta, 1 ); 
		zoomCamera3D_2({event: event, delta: delta});
	}	
	
	renderCamera();
}


// зумирование на конкретный объект/точку в простаранстве 
function zoomCameraTop_2(cdm)
{
	var event = cdm.event;
	var zoomOld = cdm.zoomOld;
	
	var intersects = rayIntersect( event, cubeZoom, 'one' );
	
	if(intersects.length == 0) return;
	
	var pos = intersects[0].point;

	var xNew = pos.x + (((camera.position.x - pos.x) * camera.zoom) /zoomOld);
	var yNew = pos.z + (((camera.position.z - pos.z) * camera.zoom) /zoomOld);

	camera.position.x += camera.position.x - xNew;
	camera.position.z += camera.position.z - yNew;	
	
	camera.updateProjectionMatrix();
}



function zoomCamera3D_2(cdm)
{
	if( camera != camera3D ) return;
	
	var event = cdm.event;
	var delta = cdm.delta;
	
	var rayhit = clickRayHit(event);	
	
	if(!rayhit)
	{
		var rayhit = rayIntersect( event, cubeZoom, 'one' );	
		if(rayhit.length == 0) return;
		var rayhit = rayhit[0];
		var pos = rayhit.point;
	}
	else
	{
		console.log(555);
		var pos = rayhit.point;
	}	
	
	
	infProject.camera.d3.targetPos.copy( pos );
	
	var vect = ( delta < 0 ) ? 1 : -1;

	var dir = new THREE.Vector3().subVectors( pos, camera.position ).normalize();
	dir = new THREE.Vector3().addScaledVector( dir, vect );
	dir.addScalar( 0.001 );
	var pos3 = new THREE.Vector3().addVectors( camera.position, dir );
	
	camera.position.copy( pos3 );
	
	
	if(vect == -1) return;
	
	var raycaster = new THREE.Raycaster();
	raycaster.set(camera.position, camera.getWorldDirection(new THREE.Vector3()) );
	//raycaster.layers.set( 1 );
		
	//raycaster.layers.set( 1 );
	//scene.add(new THREE.ArrowHelper( camera.getWorldDirection(new THREE.Vector3()), camera.position, 10, 0xff0000 ));
	
	//var intersects = raycaster.intersectObjects( scene.children );
	var intersects = raycaster.intersectObject( cubeZoom );
	//console.log(intersects);
	//infProject.camera.d3.targetPos.copy( pos2 );
	//infProject.camera.d3.targetPos.y = pos.y;
	if(intersects[0])
	{
		console.log(intersects[0].object);
		//infProject.camera.d3.targetPos.copy( intersects[0].point );	
	}
	
	camera.updateProjectionMatrix();
}




var zoomLoop = '';
function cameraZoomTopLoop() 
{
	var flag = false;
	
	if ( camera == cameraTop )
	{
		if ( zoomLoop == 'zoomOut' ) { cameraZoomTop( camera.zoom - ( 0.05 * ( camera.zoom / 2 ) ) ); flag = true; }
		if ( zoomLoop == 'zoomIn' ) { cameraZoomTop( camera.zoom - ( -0.05 * ( camera.zoom / 2 ) ) ); flag = true; }
	}
	else if ( camera == camera3D )
	{
		if ( zoomLoop == 'zoomOut' ) { cameraZoom3D( 0.3, 0.3 ); flag = true; }
		if ( zoomLoop == 'zoomIn' ) { cameraZoom3D( -0.3, 0.3 ); flag = true; }
	}
	else if ( camera == cameraWall )
	{
		if ( zoomLoop == 'zoomOut' ) { camera.zoom = camera.zoom - ( 0.4 * 0.1 * ( camera.zoom / 2 ) ); flag = true; }
		if ( zoomLoop == 'zoomIn' ) { camera.zoom = camera.zoom - ( -0.4 * 0.1 * ( camera.zoom / 2 ) ); flag = true; }
		camera.updateProjectionMatrix();
	}
	
	if(flag) { renderCamera(); }
}






function cameraZoomTop( delta )
{
	if(camera == cameraTop)
	{
		camera.zoom = delta;
		camera.updateProjectionMatrix();		
	}


	infProject.tools.axis[0].scale.set(1,1/delta,1/delta); 
	infProject.tools.axis[1].scale.set(1,1/delta,1/delta); 

	var k = 0.085 / delta;

	var n = 0;
	var circle = infProject.geometry.circle;
	var v = infProject.tools.point.geometry.vertices;
	
	for ( var i = 0; i < circle.length; i++ )
	{
		v[ n ] = new THREE.Vector3().addScaledVector( circle[ i ].clone().normalize(), 0.1 / delta );
		v[ n ].y = 0;
		n++;

		v[ n ] = new THREE.Vector3();
		v[ n ].y = 0;
		n++;

		v[ n ] = v[ n - 2 ].clone();
		v[ n ].y = height_wall + 0.01;
		n++;

		v[ n ] = new THREE.Vector3();
		v[ n ].y = height_wall + 0.01;
		n++;
	}
	
	infProject.tools.point.geometry.verticesNeedUpdate = true;
	infProject.tools.point.geometry.elementsNeedUpdate = true;
	
	
	var value = 0.05 / camera.zoom; 
	var v = infProject.geometry.wf_point.vertices;
	v[0].x = v[1].x = v[6].x = v[7].x = -value;
	v[2].x = v[3].x = v[4].x = v[5].x = value;
	v[0].z = v[1].z = v[2].z = v[3].z = value;	
	v[4].z = v[5].z = v[6].z = v[7].z = -value;
	infProject.geometry.wf_point.verticesNeedUpdate = true;
	infProject.geometry.wf_point.elementsNeedUpdate = true;

	// zoom label
	var k = 1 / delta;
	if(k <= infProject.settings.camera.limitZoom) 
	{
		k *= kof_rd;

		var n1 = 0.25 * k *2;
		var n2 = 0.125 * k *2;		
		var v1 = infProject.geometry.labelWall.vertices;
		v1[ 0 ].x = v1[ 1 ].x = -n1;
		v1[ 2 ].x = v1[ 3 ].x = n1;
		v1[ 1 ].z = v1[ 2 ].z = n2;
		v1[ 0 ].z = v1[ 3 ].z = -n2;
		infProject.geometry.labelWall.verticesNeedUpdate = true;
		infProject.geometry.labelWall.elementsNeedUpdate = true;
		upLabelPlan_1( obj_line, true );


		var n1 = 1 * k;
		var n2 = 0.25 * k;
		var v = infProject.geometry.labelFloor.vertices;
		v[ 0 ].x = v[ 1 ].x = -n1;
		v[ 2 ].x = v[ 3 ].x = n1;
		v[ 1 ].z = v[ 2 ].z = n2;
		v[ 0 ].z = v[ 3 ].z = -n2;
		infProject.geometry.labelFloor.verticesNeedUpdate = true;
		infProject.geometry.labelFloor.elementsNeedUpdate = true;
	}
	
	setScaleJoinPoint();
	setScalePivotGizmo();
}



function cameraZoom3D( delta, z )
{
	if ( camera != camera3D ) return;

	var vect = ( delta < 0 ) ? z : -z;

	var pos2 = camera.position.clone();

	var dir = new THREE.Vector3().subVectors( infProject.camera.d3.targetPos, camera.position ).normalize();
	dir = new THREE.Vector3().addScaledVector( dir, vect );
	dir.addScalar( 0.001 );
	var pos3 = new THREE.Vector3().addVectors( camera.position, dir );	


	var qt = quaternionDirection( new THREE.Vector3().subVectors( infProject.camera.d3.targetPos, camera.position ).normalize() );
	var v1 = localTransformPoint( new THREE.Vector3().subVectors( infProject.camera.d3.targetPos, pos3 ), qt );


	var offset = new THREE.Vector3().subVectors( pos3, pos2 );
	var pos2 = new THREE.Vector3().addVectors( infProject.camera.d3.targetPos, offset );

	var centerCam_2 = infProject.camera.d3.targetPos.clone();
	
	if ( delta < 0 ) { if ( pos2.y >= 0 ) { centerCam_2.copy( pos2 ); } }
	
	if ( v1.z >= 0.5) 
	{ 
		infProject.camera.d3.targetPos.copy(centerCam_2);
		camera.position.copy( pos3 ); 	
	}

	setScaleTubePoint();
	setScaleJoinPoint();
	setScalePivotGizmo();
}




// центрируем камеру cameraTop
function centerCamera2D()
{
	if ( camera != cameraTop ) return;

	var pos = new THREE.Vector3();

	if ( obj_point.length > 0 )
	{
		for ( var i = 0; i < obj_point.length; i++ ) { pos.add( obj_point[ i ].position ); }
		pos.divideScalar( obj_point.length );
	}

	newCameraPosition = {position2D: new THREE.Vector3(pos.x, cameraTop.position.y, pos.z)};
}


function centerCamera3D()
{
	if ( camera != camera3D ) return;

	var pos = new THREE.Vector3();

	if ( obj_point.length > 0 )
	{
		for ( var i = 0; i < obj_point.length; i++ ) { pos.add( obj_point[ i ].position ); }
		pos.divideScalar( obj_point.length );
	}

	newCameraPosition = { position3D: new THREE.Vector3( pos.x, 0, pos.z )};

}


function moveCameraToNewPosition()
{

	if ( !newCameraPosition ) return;

	if (camera === cameraTop && newCameraPosition.position2D) 
	{ 
		var pos = camera.position.clone();
		
		camera.position.lerp(newCameraPosition.position2D, 0.1);
		
		if(camera3D.userData.camera.startProject)
		{
			var pos2 = new THREE.Vector3( camera.position.x - pos.x, 0, camera.position.z - pos.z );
			infProject.camera.d3.targetPos.add( pos2 );
			camera3D.position.add( pos2 );			
		}
		
		if(comparePos(camera.position, newCameraPosition.position2D)) { newCameraPosition = null; if(camera3D.userData.camera.startProject) { camera3D.userData.camera.startProject = false; }; };		
	}
	
	else if ( camera === camera3D && newCameraPosition.position3D )
	{
		infProject.camera.d3.targetPos.lerp( newCameraPosition.position3D, 0.1 );

		var oldDistance = infProject.camera.d3.targetPos.distanceTo( camera.position );

		camera.position.x = oldDistance * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
		camera.position.y = oldDistance * Math.sin( phi * Math.PI / 360 );
		camera.position.z = oldDistance * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );

		camera.position.add( infProject.camera.d3.targetPos );
		camera.lookAt( infProject.camera.d3.targetPos );
		
		if(comparePos(infProject.camera.d3.targetPos, newCameraPosition.position3D)) { newCameraPosition = null; };		
	}

	else if ( camera === camera3D && newCameraPosition.positionFirst || camera === camera3D && newCameraPosition.positionFly )
	{
		var pos = (newCameraPosition.positionFirst) ? newCameraPosition.positionFirst : newCameraPosition.positionFly;
		
		camera.position.lerp( pos, 0.1 );
		
		camera.lookAt( infProject.camera.d3.targetPos ); 
		
		if(comparePos(camera.position, pos)) { newCameraPosition = null; };		
	}
	else
	{
		newCameraPosition = null;
	}
	
	renderCamera();
}


// приближаемся к выбранному объекту
function fitCameraToObject()
{
	var obj = clickO.last_obj; 
	
	if(!obj) return;


	if(camera == camera3D)
	{
		var v = [];
		
		obj.updateMatrixWorld();
		obj.geometry.computeBoundingBox();	
		
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.min.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.min.z) );	

		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.min.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.min.z) );			

		
		var bound = { min : { x : 999999, y : 999999, z : 999999 }, max : { x : -999999, y : -999999, z : -999999 } };
		
		for(var i = 0; i < v.length; i++)
		{
			if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
			if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
			if(v[i].y < bound.min.y) { bound.min.y = v[i].y; }
			if(v[i].y > bound.max.y) { bound.max.y = v[i].y; }			
			if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
			if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
		}		
		
		
		var center = new THREE.Vector3((bound.max.x - bound.min.x)/2 + bound.min.x, (bound.max.y - bound.min.y)/2 + bound.min.y, (bound.max.z - bound.min.z)/2 + bound.min.z);
		
		// визуализируем 
		if(1==2)
		{
			var g = createGeometryCube(0.01, 0.01, 0.01);
			var material = new THREE.MeshLambertMaterial( { color : 0x030202, transparent: true, opacity: 1, depthTest: false } );

			var cube = [];
			for(var i = 0; i < 6; i++)
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
		
		var fitOffset = 5.1;
		var maxSize = Math.max( bound.max.x - bound.min.x, bound.max.y - bound.min.y, bound.max.z - bound.min.z );  
		//var fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );		
		//var fitWidthDistance = fitHeightDistance / camera.aspect;		
		//var distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );		
		
		camera.lookAt(center);		
		var dir = center.clone().sub( camera.position ).normalize().multiplyScalar( maxSize + 0.5 );	
		camera.position.copy(center).sub(dir);	
		infProject.camera.d3.targetPos.copy( center );
		
		camera.updateProjectionMatrix();
		
		if(1==2)
		{
			var fitOffset = 1.1;
			var box = new THREE.Box3().setFromObject(obj.clone());
			var size = box.getSize( new THREE.Vector3() );
			var center = box.getCenter( new THREE.Vector3() );

			var helper = new THREE.Box3Helper( box, 0xffff00 );
			scene.add( helper );		

			console.log('box', box);

			var maxSize = Math.max( size.x, size.y, size.z );  console.log('maxSize', maxSize);
			var fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );		
			var fitWidthDistance = fitHeightDistance / camera.aspect;		console.log('fitWidthDistance', fitHeightDistance);
			var distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );		
			
			var direction = obj.position.clone().sub( camera.position ).normalize().multiplyScalar( distance );	

			camera.position.copy(center);
			camera.position.sub(direction);

			camera.updateProjectionMatrix();
			camera.lookAt(center);		
			infProject.camera.d3.targetPos.copy( center );		
		}
	}
	
	
	if(camera == cameraTop)
	{
		var v = [];
		
		obj.updateMatrixWorld();
		obj.geometry.computeBoundingBox();	
		
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.min.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.min.y, obj.geometry.boundingBox.min.z) );	

		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.max.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.min.z) );
		v[v.length] = obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, obj.geometry.boundingBox.max.y, obj.geometry.boundingBox.min.z) );			

		
		var bound = { min : { x : 999999, z : 999999 }, max : { x : -999999, z : -999999 } };
		
		for(var i = 0; i < v.length; i++)
		{
			if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
			if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
			if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
			if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
		}			


		var aspect = window.innerWidth/window.innerHeight;		
		
		if( aspect > 1.0 )	// определяем что больше ширина или высота окна canvas
		{
			// if view is wider than it is tall, zoom to fit height
			// если окно по ширине больше
			camera.zoom = camera.right / (( bound.max.x - bound.min.x )/0.5);
		}
		else
		{
			// if view is taller than it is wide, zoom to fit width
			// если окно больше по высоте
			camera.zoom = camera.top / (( bound.max.z - bound.min.z )/0.5);
		}
		
		camera.updateProjectionMatrix();

		// центр нужно считать, так как у трубы центр всегда в нулях
		var pos = new THREE.Vector3((bound.max.x - bound.min.x)/2 + bound.min.x, 0, (bound.max.z - bound.min.z)/2 + bound.min.z);		
		camera.position.x = pos.x;
		camera.position.z = pos.z;	
	}
	
	setScaleTubePoint();
	setScaleJoinPoint();
	setScalePivotGizmo();	
	
	renderCamera();
}


function detectBrowser()
{
	var ua = navigator.userAgent;

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


console.log( detectBrowser() );
