
var type_browser = detectBrowser();


function updateKeyDown() 
{
	//if(docReady) if(infProject.activeInput) return;
	if(infProject.settings.blockKeyCode) return; 
	
	var flag = false;
	
	var keys = clickO.keys;  
	if(keys.length == 0) return;
	
	if (camOrbit.activeCam.userData.isCam2D)
	{
		if ( keys[ 87 ] || keys[ 38 ] ) 
		{
			camera.position.z -= 0.1;
			flag = true;
		}
		else if ( keys[ 83 ] || keys[ 40 ] ) 
		{
			camera.position.z += 0.1;
			flag = true;
		}
		if ( keys[ 65 ] || keys[ 37 ] ) 
		{
			camera.position.x -= 0.1;
			flag = true;
		}
		else if ( keys[ 68 ] || keys[ 39 ] ) 
		{
			camera.position.x += 0.1;
			flag = true;
		}
	}
	else if (camOrbit.activeCam.userData.isCam3D) 
	{
		if ( keys[ 87 ] || keys[ 38 ] ) 
		{
			var x = Math.sin( camera.rotation.y );
			var z = Math.cos( camera.rotation.y );
			var dir = new THREE.Vector3( -x, 0, -z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			flag = true;
		}
		else if ( keys[ 83 ] || keys[ 40 ] ) 
		{
			var x = Math.sin( camera.rotation.y );
			var z = Math.cos( camera.rotation.y );
			var dir = new THREE.Vector3( x, 0, z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			flag = true;
		}
		if ( keys[ 65 ] || keys[ 37 ] ) 
		{
			var x = Math.sin( camera.rotation.y - 1.5707963267948966 );
			var z = Math.cos( camera.rotation.y - 1.5707963267948966 );
			var dir = new THREE.Vector3( x, 0, z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			flag = true;
		}
		else if ( keys[ 68 ] || keys[ 39 ] ) 
		{
			var x = Math.sin( camera.rotation.y + 1.5707963267948966 );
			var z = Math.cos( camera.rotation.y + 1.5707963267948966 );
			var dir = new THREE.Vector3( x, 0, z );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			flag = true;
		}
		if ( keys[ 88 ] ) 
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
			dir = new THREE.Vector3().addScaledVector( dir, -0.1 );
			flag = true;
		}
		else if ( keys[ 67 ] ) 
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
			dir = new THREE.Vector3().addScaledVector( dir, 0.1 );
			flag = true;
		}
		
		if(flag)
		{
			camera.position.add( dir );
			camera3D.userData.camera3D.targetPos.add( dir );			
		}
	}

	if(flag) { camOrbit.render(); }
}


// стартовое положение 3D камеры
function startPosCamera3D(cdm)
{
	camera3D.position.x = 0;
	camera3D.position.y = cdm.radious * Math.sin( cdm.phi * Math.PI / 360 );
	camera3D.position.z = cdm.radious * Math.cos( cdm.theta * Math.PI / 360 ) * Math.cos( cdm.phi * Math.PI / 360 );
			
	camera3D.lookAt(new THREE.Vector3( 0, 0, 0 ));	
}


// кликаем левой кнопокой мыши (собираем инфу для перемещения камеры в 2D режиме)
function clickSetCamera2D( event, click )
{
	if( camera != cameraTop) return;
	
	var inf = cameraTop.userData.cameraTop;
	
	planeMath.position.set(camera.position.x,0,camera.position.z);
	planeMath.rotation.set(-Math.PI/2,0,0);  
	planeMath.updateMatrixWorld();
	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	inf.click = 'click';
	inf.mouse.x = intersects[0].point.x;
	inf.mouse.z = intersects[0].point.z;	 			
}


// 1. кликаем левой кнопокой мыши (собираем инфу для вращения камеры в 3D режиме)
// 2. кликаем правой кнопокой мыши (собираем инфу для перемещения камеры в 3D режиме и устанавливаем мат.плоскость)
function clickSetCamera3D( event, click )
{
	if ( camera != camera3D ) { return; }
	
	var inf = camera3D.userData.camera3D;

	if(click == 'left')				
	{
		//var dir = camera.getWorldDirection();
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





function moveCameraTop( event ) 
{
	var inf = cameraTop.userData.cameraTop;
	
	if(inf.click == '') return;	
	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	camera.position.x += inf.mouse.x - intersects[0].point.x;
	camera.position.z += inf.mouse.z - intersects[0].point.z;	
}




function cameraMove3D( event )
{
	var inf = camera3D.userData.camera3D;
	
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
		
	infProject.tools.gizmo.userData.propGizmo({type: 'clippingGizmo'});
}






// cameraZoom
function onDocumentMouseWheel( event )
{
	
	var delta = -event.wheelDelta / 120;

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
	
	infProject.tools.pivot.userData.propPivot({type: 'updateScale'});
	infProject.tools.gizmo.userData.propGizmo({type: 'updateScale'});
	
	renderCamera();
}



function cameraZoomTop( delta )
{
	if(camera == cameraTop)
	{
		camera.zoom = delta;
		camera.updateProjectionMatrix();		
	}
	
	scaleToolsMoveCamera();
}



// зумирование на конкретный объект/точку в простаранстве 
function zoomCameraTop_2(cdm)
{
	var event = cdm.event;
	var zoomOld = cdm.zoomOld;
	
	planeMath.position.set(camera.position.x,0,camera.position.z);
	planeMath.rotation.set(-Math.PI/2,0,0);  
	planeMath.updateMatrixWorld();
		
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	if(intersects.length == 0) return;
	
	var pos = intersects[0].point;

	var xNew = pos.x + (((camera.position.x - pos.x) * camera.zoom) /zoomOld);
	var yNew = pos.z + (((camera.position.z - pos.z) * camera.zoom) /zoomOld);

	camera.position.x += camera.position.x - xNew;
	camera.position.z += camera.position.z - yNew;	
	
	camera.updateProjectionMatrix();
}




function cameraZoom3D( delta, z )
{
	if ( camera != camera3D ) return;

	var vect = ( delta < 0 ) ? z : -z;

	var inf = camera3D.userData.camera3D;
	var pos2 = camera.position.clone();

	var dir = new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize();
	dir = new THREE.Vector3().addScaledVector( dir, vect );
	var pos3 = new THREE.Vector3().addVectors( camera.position, dir );	


	var qt = quaternionDirection( new THREE.Vector3().subVectors( inf.targetPos, camera.position ).normalize() );
	var v1 = localTransformPoint( new THREE.Vector3().subVectors( inf.targetPos, pos3 ), qt );


	var offset = new THREE.Vector3().subVectors( pos3, pos2 );
	var pos2 = new THREE.Vector3().addVectors( inf.targetPos, offset );

	var centerCam_2 = inf.targetPos.clone();
	
	if ( delta < 0 ) { if ( pos2.y >= 0 ) { centerCam_2.copy( pos2 ); } }
	
	if ( v1.z >= 0.5) 
	{ 
		inf.targetPos.copy(centerCam_2);
		camera.position.copy( pos3 ); 	
	}

	scaleToolsMoveCamera();
}



function zoomCamera3D_2(cdm)
{
	if( camera != camera3D ) return;
	
	var event = cdm.event;
	var delta = cdm.delta;
	
	var rayhit = clickRayHit(event);	
	
	if(!rayhit)
	{
		var arr = [];
		var subs = infProject.scene.substrate.floor;	

		for(var i = 0; i < subs.length; i++)
		{
			arr[arr.length] = subs[i].plane;
		}
		
		var rayhit = rayIntersect( event, arr, 'arr' );				
		var rayhit = (rayhit.length > 0) ? rayhit[0] : null;							
	}
	
	if(!rayhit)
	{
		var rayhit = rayIntersect( event, planeMath, 'one' );	
		
		if(rayhit.length == 0) 
		{
			var dir = camera.getWorldDirection(new THREE.Vector3());
			dir = new THREE.Vector3().addScaledVector(dir, 10);
			planeMath.position.copy(camera.position);  
			planeMath.position.add(dir);  
			planeMath.rotation.copy( camera.rotation ); 
			planeMath.updateMatrixWorld();

			var rayhit = rayIntersect( event, planeMath, 'one' );
		}
		
		var rayhit = rayhit[0];				
	}

	var pos = rayhit.point;	
	var inf = camera3D.userData.camera3D;
	inf.targetPos.copy( pos );
	
	var vect = ( delta < 0 ) ? 1 : -1;
	

	
	var dir = new THREE.Vector3().subVectors( pos, camera.position ).normalize();
	var dir2 = new THREE.Vector3().addScaledVector( dir, vect );
	var pos3 = new THREE.Vector3().addVectors( camera.position, dir2 );
	
	var dist = pos.distanceTo(pos3);
	
	if(dist < 5)
	{	
		//if(dist < 0.1) dist = 0.1;
		dist = dist/5;
		if(dist < 0.05) dist = 0.05;
		
		vect *= dist; 
		
		var dir2 = new THREE.Vector3().addScaledVector( dir, vect );
		var pos3 = new THREE.Vector3().addVectors( camera.position, dir2 );			
	}	
	
	camera.position.copy( pos3 );
	

	// находим пересечения цетра камеры с плоскостью
	planeMath.position.copy(inf.targetPos);   
	planeMath.rotation.copy( camera.rotation ); 
	planeMath.updateMatrixWorld();		
	
	var raycaster = new THREE.Raycaster();
	raycaster.set(camera.position, camera.getWorldDirection(new THREE.Vector3()) );
	var intersects = raycaster.intersectObject( planeMath );	
	
	if(intersects[0])
	{		
		inf.targetPos.copy( intersects[0].point );	
	}
	
	camera.updateProjectionMatrix();
	
	scaleToolsMoveCamera();	
}






// масштаб pivot/gizmo и разъемов труб/объектов
function scaleToolsMoveCamera()
{

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
