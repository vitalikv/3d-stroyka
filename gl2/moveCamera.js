
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


function stopCameraTop()
{
	//cameraTop.userData.cameraTop.click = '';
}

function stopCamera3D()
{
	//camera3D.userData.camera3D.click = '';
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






// приближаемся к выбранному объекту
function fitCameraToObject(cdm)
{
	var obj = cdm.obj; 
	
	if(!obj) return;

	var v = [];
	
	obj.updateMatrixWorld();
	obj.geometry.computeBoundingBox();	

	var bound = obj.geometry.boundingBox;
	
	v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.max.z).applyMatrix4( obj.matrixWorld );
	v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.max.z).applyMatrix4( obj.matrixWorld );
	v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.min.z).applyMatrix4( obj.matrixWorld );
	v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.min.z).applyMatrix4( obj.matrixWorld );

	v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.max.z).applyMatrix4( obj.matrixWorld );
	v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.max.z).applyMatrix4( obj.matrixWorld );
	v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.min.z).applyMatrix4( obj.matrixWorld );
	v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.min.z).applyMatrix4( obj.matrixWorld );			


	if(camOrbit.activeCam.userData.isCam3D)
	{
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
		
		
		if(cdm.rot)
		{
			camera.lookAt(center);		
			var dir = center.clone().sub( camera.position ).normalize().multiplyScalar( maxSize + 0.25 );	
			camera.position.copy(center).sub(dir);			
		}
		else
		{	
			//var maxSize = Math.max( bound.max.x - bound.min.x, bound.max.y - bound.min.y );
			var dir = obj.getWorldDirection().multiplyScalar( maxSize * 2 );	
			camera.position.copy(center).add(dir);
			camera.lookAt(center);			
		}		
		
		camera3D.userData.camera3D.targetPos.copy( center );
	}
	
	
	if(camOrbit.activeCam.userData.isCam2D)
	{
		var bound = { min : { x : 999999, z : 999999 }, max : { x : -999999, z : -999999 } };
		
		for(var i = 0; i < v.length; i++)
		{
			if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
			if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
			if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
			if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
		}					

		var aspect = ( bound.max.x - bound.min.x )/( bound.max.z - bound.min.z );		
		
		if( aspect > 1.0 )	// определяем что больше ширина или высота 
		{
			var x = ( bound.max.x - bound.min.x < 0.1) ? 0.1 : bound.max.x - bound.min.x;
			camera.zoom = camera.right / (x/0.5);
		}
		else
		{
			var z = ( bound.max.z - bound.min.z < 0.1) ? 0.1 : bound.max.z - bound.min.z;
			camera.zoom = camera.top / (z/0.5);
		}
		
		

		// центр нужно считать, так как у трубы центр всегда в нулях
		var pos = new THREE.Vector3((bound.max.x - bound.min.x)/2 + bound.min.x, 0, (bound.max.z - bound.min.z)/2 + bound.min.z);		
		camera.position.x = pos.x;
		camera.position.z = pos.z;	
	}
	
	camera.updateProjectionMatrix();
	
	infProject.tools.pivot.userData.propPivot({type: 'updateScale'});
	infProject.tools.gizmo.userData.propGizmo({type: 'updateScale'});
	scaleToolsMoveCamera();
	
	renderCamera();
}


// масштаб pivot/gizmo и разъемов труб/объектов
function scaleToolsMoveCamera()
{
	setScaleTubePoint(); 
	setScaleJoinPoint();	
}

// масштаб соединительных точек у объектов
function setScaleJoinPoint(cdm)  
{ 
	if(!cdm) { cdm = {}; }	
	
	var arr = [];
	
	if(cdm.arr) 
	{ 
		arr = cdm.arr; 
	}
	else 
	{
		var obj = clickO.last_obj; 	
		if(!obj) return;
		
		if(obj.userData.obj3D) arr = obj.getObjPoint();
		if(obj.userData.centerPoint) arr = obj.getPointObjOnObj();
	}
	
	if(arr.length == 0) return;	
 
	
	if(camera == cameraTop)
	{		
		var scale = 3.5/camera.zoom;	
		
		if(scale > 1.4) { scale = 1.4; }
		else if(scale < 0.1) { scale = 0.1; }	
		
		for ( var i = 0; i < arr.length; i++ )
		{ 
			arr[i].scale.set( scale,scale,scale );			
		}	
	}	
	else if(camera == camera3D)
	{
		for ( var i = 0; i < arr.length; i++ )
		{ 
			var scale = camera.position.distanceTo(arr[i].getWorldPosition(new THREE.Vector3()))/2;	

			if(scale > 1.2) scale = 1.2;
			
			arr[i].scale.set( scale,scale,scale );			
		}							
	}
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
