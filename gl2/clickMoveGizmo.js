

 

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
		circle[i].x = Math.sin(angle)*0.5;
		circle[i].z = Math.cos(angle)*0.5;
		//circle[i].y = 0;
	}	

	
	var pipeSpline = new THREE.CatmullRomCurve3(circle);
	pipeSpline.curveType = 'catmullrom';
	pipeSpline.tension = 0;
	
	var geometry_1 = new THREE.TubeBufferGeometry( pipeSpline, circle.length, 0.03, 12, true );	
	var geometry_2 = new THREE.TubeBufferGeometry( pipeSpline, circle.length, 0.01, 12, true );
	
	
	var gizmo = new THREE.Object3D();
	gizmo.userData.gizmo = {};
	gizmo.userData.gizmo.obj = null;
	gizmo.userData.gizmo.arrO = [];
	gizmo.userData.gizmo.active = { axis: '', startPos: new THREE.Vector3(), rotY: 0 };

	
	var param = [];
	param[0] = {axis: 'x', rot: new THREE.Vector3(0, 0, 0), color: 'rgb(17, 255, 0)'};
	param[1] = {axis: 'y', rot: new THREE.Vector3(0, 0, Math.PI/2), color: 'rgb(247, 72, 72)'};
	param[2] = {axis: 'z', rot: new THREE.Vector3(Math.PI/2, 0, 0), color: 'rgb(72, 116, 247)'};	
	
	for ( var i = 0; i < param.length; i++ )
	{
		var material = new THREE.MeshBasicMaterial({ color: param[i].color, depthTest: false, transparent: true, opacity: 1.0 });
		material.visible = false;
		//var material = new THREE.MeshBasicMaterial({ color: param[i].color });
		var obj = new THREE.Mesh( geometry_1, material );
		obj.userData.tag = 'gizmo'; 
		obj.userData.axis = param[i].axis;		
		obj.rotation.set( param[i].rot.x, param[i].rot.y, param[i].rot.z );	
		
	
		var obj2 = new THREE.Mesh( geometry_2, new THREE.MeshPhongMaterial({ color: param[i].color, depthTest: false, transparent: true, clippingPlanes : [ new THREE.Plane() ], lightMap: lightMap_1 }) );
		obj2.renderOrder = 3;
		//obj2.visible = false;
		obj2.material.clippingPlanes[0].copy(new THREE.Plane());
		obj.add( obj2 );
		
		
		gizmo.add( obj );
	}
	
	scene.add( gizmo );

	
	gizmo.visible = false;
	
	// Sphere
	var geometry = new THREE.SphereGeometry( 0.98*0.5, 32, 32 );
	var material = new THREE.MeshPhongMaterial( {color: 0x000000, depthTest: false, transparent: true, opacity: 0.1} );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.renderOrder = 3;
	gizmo.add( sphere );
	
	return gizmo;
}







// кликнули на gizmo
function clickGizmo( intersect )
{	
	
	
	var gizmo = infProject.tools.gizmo;
	
	clickO.move = intersect.object; 	// gizmo

	var obj = gizmo.userData.gizmo.obj;			
	var axis = intersect.object.userData.axis;
	gizmo.userData.gizmo.active.axis = axis;
	

	if(obj.userData.tag == 'joinPoint')		// разъем
	{
		gizmo.userData.gizmo.active.startPos = obj.getWorldPosition(new THREE.Vector3());   
	}
	else								//  группа или объект
	{
		gizmo.userData.gizmo.active.startPos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );		
	}	
	
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
	
	if(camera == cameraTop)
	{
		planeMath.rotation.set(Math.PI/2, 0, 0);
	}
	else
	{
		setPlaneQ(obj, dr, rotY, false);
	}
	
	
	function setPlaneQ(obj, dr, rotY, global)
	{
		if(global)	// глобальный gizmo
		{
			planeMath.quaternion.copy( new THREE.Quaternion().setFromAxisAngle( dr, rotY ) );
		}
		else		// локальный gizmo
		{
			var quaternion = new THREE.Quaternion().setFromAxisAngle( dr, rotY );							// создаем Quaternion повернутый на выбранную ось	
			var q2 = obj.getWorldQuaternion(new THREE.Quaternion()).clone().multiply( quaternion );			// умножаем на предведущий Quaternion			
			planeMath.quaternion.copy( q2 );																		
		}
	}

	
	planeMath.updateMatrixWorld();
	var dir = planeMath.worldToLocal( intersect.point.clone() );	
	gizmo.userData.gizmo.active.rotY = Math.atan2(dir.x, dir.y);

	setClickLastObj({obj: infProject.tools.gizmo.userData.gizmo.obj});
}




function moveGizmo( event )
{	
	var intersects = rayIntersect( event, planeMath, 'one' );	 	 
	if(intersects.length == 0) return;
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
	}	
	
	
	var gizmo = infProject.tools.gizmo;
	
	var obj = gizmo.userData.gizmo.obj;  
	var axis = gizmo.userData.gizmo.active.axis;
	
	if(axis == 'x'){ var dr = new THREE.Vector3( 0, 1, 0 ); }
	else if(axis == 'y'){ var dr = new THREE.Vector3( 1, 0, 0 ); }
	else if(axis == 'z'){ var dr = new THREE.Vector3( 0, 0, 1 ); }
	
	
	
	var dir = planeMath.worldToLocal( intersects[ 0 ].point.clone() );	
	var rotY = Math.atan2(dir.x, dir.y);
	

	
	var arr = gizmo.userData.gizmo.arrO;	
	
	if(camera == cameraTop) 
	{ 
		rotateO({obj: arr, dr: dr, rotY: rotY, centerO: obj, type: 'global'});		 
	}
	else 
	{ 
		rotateO({obj: arr, dr: dr, rotY: rotY, centerO: obj, type: 'local'});
	}		
	
	// вращение объекта или объектов 
	function rotateO(cdm)
	{
		var centerO = cdm.centerO;
		var arr = cdm.obj;
		var dr = cdm.dr;
		var rotY = cdm.rotY;		
		
		
		// локальный dir , глобальный -> dr new THREE.Vector3( 0, 1, 0 )
		if(cdm.type == 'local')
		{
			centerO.updateMatrixWorld();		
			var v1 = centerO.localToWorld( dr.clone() );
			var v2 = centerO.getWorldPosition(new THREE.Vector3());
			
			var dir = new THREE.Vector3().subVectors(v1, v2).normalize();	
		}
		else
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
		}
		
		
		rotateOffsetArrObj_1({arr: arr, pos: gizmo.userData.gizmo.active.startPos, dir: dir, rotRad: rotY - gizmo.userData.gizmo.active.rotY});
	}
	
			
	if(camera == camera3D)
	{
		if(obj.userData.tag == 'joinPoint')		// разъем
		{
			gizmo.quaternion.copy( obj.getWorldQuaternion(new THREE.Quaternion()) );
		}
		else
		{
			gizmo.quaternion.copy( obj.quaternion );
		}		
	}	
	
	gizmo.userData.gizmo.active.rotY = rotY; 
	
	upMenuRotateObjPop(obj);
}



function clickGizmoUp()
{
	if(!clickO.actMove) return;
	
	var obj = infProject.tools.gizmo.userData.gizmo.obj;
	
	if(!obj) return;		
	
	setClickLastObj({obj: infProject.tools.gizmo.userData.gizmo.obj});
}


// обновляем в меню rotate
function upMenuRotateObjPop(obj) 
{	
	let rot = obj.rotation;
	
	if(obj.userData.tag == 'joinPoint')		// разъем
	{
		obj.parent.updateMatrixWorld();
		rot = new THREE.Euler().setFromQuaternion( obj.getWorldQuaternion(new THREE.Quaternion()) );
	}

	document.querySelector('[nameId="object_rotate_X"]').value = Math.round(THREE.Math.radToDeg(rot.x));
	document.querySelector('[nameId="object_rotate_Y"]').value = Math.round(THREE.Math.radToDeg(rot.y));
	document.querySelector('[nameId="object_rotate_Z"]').value = Math.round(THREE.Math.radToDeg(rot.z));	
}




// вращаем объект по кнопки на заданный угол
function setRotationGizmo(cdm)
{	
	var obj = getObjFromPivotGizmo();		
	if(!obj) return;
	
	if(obj.userData.tag == 'obj'){}
	else if(obj.userData.tag == 'joinPoint'){}
	else if(obj.userData.tag == 'wtGrid'){}
	else { return; }	
	
	var axis = cdm.axis;
	var rotY = THREE.Math.degToRad( cdm.angle );
	
	
	if(obj.userData.tag == 'obj')		// группа или объект
	{ 
		obj.updateMatrixWorld();
		var startPos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );	
	}	
	else if(obj.userData.tag == 'joinPoint')		// разъем
	{
		var startPos = obj.getWorldPosition(new THREE.Vector3());   
	}
	else								//  
	{
		var startPos = obj.position.clone();		
	}		
	

	var arr = arrObjFromGroup({obj: obj});

	
	
	if(camera == cameraTop) 
	{ 
		var type = 'global';		 
	}
	else 
	{ 
		var type = 'local';
	}		
	
	// вращение объекта или объектов 
	{
		// локальный dir , глобальный -> dr new THREE.Vector3( 0, 1, 0 )
		if(type == 'local')
		{	
			var centerO = obj;
			
			if(axis == 'x'){ var dr = new THREE.Vector3( 1, 0, 0 ); }
			if(axis == 'y'){ var dr = new THREE.Vector3( 0, 1, 0 ); }
			if(axis == 'z'){ var dr = new THREE.Vector3( 0, 0, 1 ); }	
			
			centerO.updateMatrixWorld();		
			var v1 = centerO.localToWorld( dr.clone() );
			var v2 = centerO.getWorldPosition(new THREE.Vector3());
			
			var dir = new THREE.Vector3().subVectors(v1, v2).normalize();	
		}
		else
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
		}
		
		rotateOffsetArrObj_1({arr: arr, pos: startPos, dir: dir, rotRad: rotY});
	}		
	
	
	if(camera == camera3D)
	{
		var tools = null;
		if(infProject.settings.active.pg == 'pivot'){ tools = infProject.tools.pivot; }	
		if(infProject.settings.active.pg == 'gizmo'){ tools = infProject.tools.gizmo; }			
		
		if(obj.userData.tag == 'joinPoint')		// разъем
		{
			var objParent = getParentObj({obj: obj});
			objParent.updateMatrixWorld();
			tools.quaternion.copy( obj.getWorldQuaternion(new THREE.Quaternion()) );
		}
		else
		{
			tools.rotation.copy( obj.rotation );
		}	 		
	}
	
	upMenuRotateObjPop(obj);
	renderCamera();
}




// сбрасываем rotation 
function resetRotateObj(cdm)
{
	var obj = getObjFromPivotGizmo();
	
	if(!obj) return;
	
	if(obj.userData.tag == 'obj'){}
	else if(obj.userData.tag == 'joinPoint'){}
	else if(obj.userData.tag == 'wtGrid'){}
	else { return; }
		
	
	if(obj.userData.tag == 'joinPoint')		// разъем
	{
		obj.parent.updateMatrixWorld();
		var pos = obj.getWorldPosition(new THREE.Vector3());
		var diff_2 = obj.parent.quaternion.clone().inverse();
	}
	else								//  группа или объект
	{
		var pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );
		var diff_2 = obj.quaternion.clone().inverse();
	}	
	
	rotateOffsetArrObj_2({obj: obj, pos: pos, diff_2: diff_2});

	
	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }	
		
	
	if(obj.userData.tag == 'joinPoint')		// разъем
	{		
		tools.position.copy( obj.getWorldPosition(new THREE.Vector3()) );
		tools.quaternion.copy( obj.getWorldQuaternion(new THREE.Quaternion()) );
	}
	else
	{
		tools.position.copy( obj.localToWorld( obj.geometry.boundingSphere.center.clone() ) ); 
		tools.rotation.copy( obj.rotation );
	}
	
	upMenuRotateObjPop( obj );
	infProject.tools.gizmo.userData.propGizmo({type: 'clippingGizmo'});

	renderCamera();
}





// меняем положение объекта через input
function inputChangeRot()
{
	let obj = infProject.tools.gizmo.userData.gizmo.obj;  
	if(!obj) return;

	if(obj.userData.tag == 'obj'){}
	else if(obj.userData.tag == 'joinPoint'){}
	else if(obj.userData.tag == 'wtGrid'){}
	else { return; }
	
	let x = document.querySelector('[nameId="object_rotate_X"]').value;
	let y = document.querySelector('[nameId="object_rotate_Y"]').value;
	let z = document.querySelector('[nameId="object_rotate_Z"]').value;

	x = checkNumberInput({ value: x, unit: 1 });
	y = checkNumberInput({ value: y, unit: 1 });
	z = checkNumberInput({ value: z, unit: 1 });

	let stop = false;
	
	if(!x) stop = true;
	if(!y) stop = true;
	if(!z) stop = true;
	
	// не числовое значение
	if(stop)
	{		
		upMenuRotateObjPop(obj);
		return;
	}	
		
	
	x = THREE.Math.degToRad(x.num);
	y = THREE.Math.degToRad(y.num);
	z = THREE.Math.degToRad(z.num);
		
	let rot = new THREE.Euler().set(x, y, z);

	// ----------------
		
	
	obj.updateMatrixWorld();
	var q1 = new THREE.Quaternion().setFromEuler(rot);	
	
	if(obj.userData.tag == 'joinPoint')		// разъем
	{
		obj.parent.updateMatrixWorld();
		var pos = obj.getWorldPosition(new THREE.Vector3());
		var diff_2 = new THREE.Quaternion().multiplyQuaternions(q1, obj.parent.quaternion.clone().inverse());
	}
	else								//  группа или объект
	{
		var pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );
		var diff_2 = new THREE.Quaternion().multiplyQuaternions(q1, obj.quaternion.clone().inverse());
	}	

	
	rotateOffsetArrObj_2({obj: obj, pos: pos, diff_2: diff_2});
			


	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }		
	
	
	if(camera == camera3D)
	{
		if(obj.userData.tag == 'joinPoint')		// разъем
		{		
			tools.position.copy( obj.getWorldPosition(new THREE.Vector3()) );
			tools.quaternion.copy( obj.getWorldQuaternion(new THREE.Quaternion()) );
		}
		else
		{
			tools.position.copy( obj.localToWorld( obj.geometry.boundingSphere.center.clone() ) ); 
			tools.rotation.copy( obj.rotation );
		}		
	}
	
	upMenuRotateObjPop( obj );
	infProject.tools.gizmo.userData.propGizmo({type: 'clippingGizmo'});	


	renderCamera();
}


// вращаем массив объектов на заданное значение (способ №1)
function rotateOffsetArrObj_1(cdm)
{
	let arr = cdm.arr;
	let pos = cdm.pos;
	let dir = cdm.dir;
	let rotRad = cdm.rotRad;
	
	
	for(let i = 0; i < arr.length; i++)
	{
		arr[i].position.sub(pos);
		arr[i].position.applyAxisAngle(dir, rotRad); // rotate the POSITION
		arr[i].position.add(pos);				
		
		arr[i].rotateOnWorldAxis(dir, rotRad);	
		
		arr[i].updateMatrixWorld();
	}	
	
}

// вращаем массив объектов на заданное значение (способ №2)
function rotateOffsetArrObj_2(cdm)
{
	let obj = cdm.obj;
	let pos = cdm.pos;
	let diff_2 = cdm.diff_2;
	
	let arr_2 = arrObjFromGroup({obj: obj});
	
	for(let i = 0; i < arr_2.length; i++)
	{
		if(arr_2[i].userData.wf_tube) 
		{
			let point = arr_2[i].userData.wf_tube.point;
			
			for(let i2 = 0; i2 < point.length; i2++)
			{
				// поворачиваем объекты в нужном направлении
				//point[i2].quaternion.premultiply(diff_2);		// diff разницу умнажаем, чтобы получить то же угол	
				//point[i2].updateMatrixWorld();

				// вращаем position объектов, относительно точки-соединителя
				point[i2].position.sub(pos);
				point[i2].position.applyQuaternion(diff_2); 	
				point[i2].position.add(pos);

				// обновляем MatrixWorld
				//point[i2].updateMatrixWorld();							
			}
			
			updateTubeWF({tube: arr_2[i]});			
		}
		else
		{
			// поворачиваем объекты в нужном направлении
			arr_2[i].quaternion.premultiply(diff_2);		// diff разницу умнажаем, чтобы получить то же угол	
			arr_2[i].updateMatrixWorld();

			// вращаем position объектов, относительно точки-соединителя
			arr_2[i].position.sub(pos);
			arr_2[i].position.applyQuaternion(diff_2); 	
			arr_2[i].position.add(pos);

			// обновляем MatrixWorld
			arr_2[i].updateMatrixWorld();			
		}
	}
			
		
}




