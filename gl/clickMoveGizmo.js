

 

// создаем Gizmo360
function createGizmo360()
{
	var count = 68; 
	var circle = [];
	var g = (Math.PI * 2) / count;
	
	for ( var i = 0; i < count; i++ )
	{
		var angle = g * i;
		circle[i] = new THREE.Vector3();
		circle[i].x = Math.sin(angle);
		circle[i].z = Math.cos(angle);
		//circle[i].y = 0;
	}	
	
	
	var kf = 0.03;
	var n = 0;
	var v = [];
	for ( var i = 0; i < circle.length; i++ )
	{
		var dir = circle[i].clone().normalize();
		var v1 = new THREE.Vector3().addScaledVector( dir, 0.06 );
		v[n] = new THREE.Vector3().addVectors( circle[i], v1 );
		v[n].y -= kf / 2;		
		n++;		
		
		var v1 = new THREE.Vector3().addScaledVector( dir, -0.06 );
		v[n] = new THREE.Vector3().addVectors( circle[i], v1 );
		v[n].y -= kf / 2;
		n++;
		
		v[n] = v[n - 2].clone();
		v[n].y += kf;
		n++;	
		
		v[n] = v[n - 2].clone();
		v[n].y += kf;
		n++;		
	}	
	
	var n = 0;
	var v2 = [];
	for ( var i = 0; i < circle.length; i++ )
	{
		var dir = circle[i].clone().normalize();
		var v1 = new THREE.Vector3().addScaledVector( dir, 0.001 );
		v2[n] = new THREE.Vector3().addVectors( circle[i], v1 );
		v2[n].y -= kf / 2;		
		n++;		
		
		var v1 = new THREE.Vector3().addScaledVector( dir, -0.001 );
		v2[n] = new THREE.Vector3().addVectors( circle[i], v1 );
		v2[n].y -= kf / 2;
		n++;
		
		v2[n] = v2[n - 2].clone();
		v2[n].y += kf;
		n++;	
		
		v2[n] = v2[n - 2].clone();
		v2[n].y += kf;
		n++;		
	}	
	
	
	var gizmo = new THREE.Object3D();
	gizmo.userData.gizmo = {};
	gizmo.userData.gizmo.obj = null;
	gizmo.userData.gizmo.active = { axis: '', startPos: new THREE.Vector3(), rotY: 0 };
	
	var arr = [];
	arr[0] = ['x', new THREE.Vector3(0, 0, 0), 'rgb(48, 154, 186)'];
	arr[1] = ['y', new THREE.Vector3(0, 0, Math.PI/2), 'rgb(168, 69, 69)'];
	arr[2] = ['z', new THREE.Vector3(Math.PI/2, 0, 0), 'rgb(34, 99, 34)'];
	
	for ( var i = 0; i < 3; i++ )
	{
		var material = new THREE.MeshBasicMaterial({ color: arr[i][2], depthTest: false, transparent: true, opacity: 0.0 });
		//var material = new THREE.MeshBasicMaterial({ color: arr[i][2] });
		var obj = new THREE.Mesh( createGeometryCircle(v), material );
		obj.userData.tag = 'gizmo'; 
		obj.userData.axis = arr[i][0];		
		//obj.visible = false;
		obj.rotation.set( arr[i][1].x, arr[i][1].y, arr[i][1].z );	
		
	
		var obj2 = new THREE.Mesh( createGeometryCircle(v2), new THREE.MeshLambertMaterial({ color: arr[i][2], depthTest: false, clippingPlanes : [ new THREE.Plane() ], lightMap : lightMap_1 }) );
		obj2.renderOrder = 3;
		//obj2.visible = false;
		obj2.material.clippingPlanes[0].copy(new THREE.Plane());
		obj.add( obj2 );
		
		
		gizmo.add( obj );
	}
	
	scene.add( gizmo );

	
	gizmo.visible = false;
	
	// Sphere
	var geometry = new THREE.SphereGeometry( 0.98, 32, 32 );
	var material = new THREE.MeshLambertMaterial( {color: 0x000000, depthTest: false, transparent: true, opacity: 0.1} );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.renderOrder = 3;
	gizmo.add( sphere );
	
	return gizmo;
}


//var helpers = null;


// прячем текстуру если она находится за плоскостью 
function clippingGizmo360( objPop )
{
	var plane = new THREE.Plane();	
	
	var group = new THREE.Group();
	group.position.copy(objPop.position);
	group.lookAt(camera.position);
	group.rotateOnAxis(new THREE.Vector3(0,1,0), -Math.PI / 2);
	group.updateMatrixWorld();
	
	
	//var dir = new THREE.Vector3().subVectors( camera.position, objPop.position ).normalize();
	//var qt = quaternionDirection(dir.clone());
	//var mx = new THREE.Matrix4().compose(objPop.position, qt, new THREE.Vector3(1,1,1));
	//plane.applyMatrix4(mx);	
	plane.applyMatrix4(group.matrixWorld);	
	
	infProject.tools.gizmo.children[0].children[0].material.clippingPlanes[0].copy(plane);
	infProject.tools.gizmo.children[1].children[0].material.clippingPlanes[0].copy(plane);
	infProject.tools.gizmo.children[2].children[0].material.clippingPlanes[0].copy(plane);	
	
	//showHelperNormal(objPop)

}


var param_obj = {};


// кликнули на gizmo
function clickGizmo( intersect )
{	
	
	
	var gizmo = infProject.tools.gizmo;
	
	clickO.move = intersect.object; 	// gizmo

	var obj = gizmo.userData.gizmo.obj;			// objPop
	var axis = intersect.object.userData.axis;
	gizmo.userData.gizmo.active.axis = axis;
	
	obj.updateMatrixWorld();
	gizmo.userData.gizmo.active.startPos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );
	
	
	if(axis == 'y')
	{
		var dr = new THREE.Vector3( 0, 1, 0 );
		var rotY = -Math.PI/2;
	}	
	else if(axis == 'z')
	{	
		var dr = new THREE.Vector3( 0, 1, 0 );
		var rotY = Math.PI;
	}
	else if(axis == 'x')
	{
		var dr = new THREE.Vector3( 1, 0, 0 );
		var rotY = Math.PI/2;
	}

	
	planeMath.position.copy( gizmo.position );		
	//planeMath.rotation.copy( gizmo.rotation );
	

	var quaternion = new THREE.Quaternion().setFromAxisAngle( dr, rotY );								// создаем Quaternion повернутый на выбранную ось	
	var q2 = new THREE.Quaternion().setFromEuler( obj.rotation ).multiply( quaternion );		// конвертируем rotation в Quaternion и умножаем на предведущий Quaternion			
	planeMath.quaternion.copy( q2 );								

	
	planeMath.updateMatrixWorld();
	var dir = planeMath.worldToLocal( intersect.point.clone() );	
	gizmo.userData.gizmo.active.rotY = Math.atan2(dir.x, dir.y);	
}




function moveGizmo( event )
{	
	var intersects = rayIntersect( event, planeMath, 'one' );	 	 
	if(intersects.length == 0) return;
	
	
	var gizmo = infProject.tools.gizmo;
	
	var obj = gizmo.userData.gizmo.obj;  
	var axis = gizmo.userData.gizmo.active.axis;
	
	if(axis == 'x'){ var dr = new THREE.Vector3( 0, 1, 0 ); }
	else if(axis == 'y'){ var dr = new THREE.Vector3( 1, 0, 0 ); }
	else if(axis == 'z'){ var dr = new THREE.Vector3( 0, 0, 1 ); }
	
	
	
	var dir = planeMath.worldToLocal( intersects[ 0 ].point.clone() );	
	var rotY = Math.atan2(dir.x, dir.y);
	
	var quaternion = new THREE.Quaternion().setFromAxisAngle( dr, rotY - gizmo.userData.gizmo.active.rotY );
	obj.quaternion.multiply ( quaternion );			
	

	obj.updateMatrixWorld();
	var newPosCenter = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );		
	obj.position.add( new THREE.Vector3().subVectors( gizmo.userData.gizmo.active.startPos, newPosCenter ) );		
	
	gizmo.userData.gizmo.active.rotY = rotY; 
	
	gizmo.rotation.copy( obj.rotation ); 
}




// обновляем в меню rotate
function upMenuRotateObjPop(obj)
{	
	//var rot = new THREE.Euler().setFromQuaternion(obj.getWorldQuaternion(new THREE.Quaternion()));
	//console.log(rot);
	
	UI( 'object_rotate_X' ).val( Math.round( THREE.Math.radToDeg(obj.rotation.x) ) );
	UI( 'object_rotate_Y' ).val( Math.round( THREE.Math.radToDeg(obj.rotation.y) ) );
	UI( 'object_rotate_Z' ).val( Math.round( THREE.Math.radToDeg(obj.rotation.z) ) );	
}


