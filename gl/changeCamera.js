

    


// переключение камеры
function changeCamera(cam)
{  
	camera = cam;
	
	if(camera == cameraTop)
	{					
		changeDepthColor();
		objDeActiveColor_2D();		
		showHideSizePlane('show');
		cameraZoomTop( camera.zoom );
		infProject.scene.grid.obj.visible = true;
	}
	else if(camera == camera3D)
	{	
		activeHover2D_2();
		objDeActiveColor_2D();  
		cameraZoomTop( cameraTop.zoom );
		 
		lineAxis_1.visible = false;
		lineAxis_2.visible = false;
		infProject.scene.grid.obj.visible = true;
		changeDepthColor();
	}
	else if(camera == cameraWall)
	{  
		if(infProject.scene.array.wall.length > 0)
		{  
			arrWallFront.wall = [];
			arrWallFront.wall = [{ obj : infProject.scene.array.wall[0], index : 1 }];
			detectDirectionWall_1(infProject.scene.array.wall[0], 1, detectRoomWallSide(wall, 1));			

			
			var wall = infProject.scene.array.wall[0]; 
			var index = 1;
			
			var x1 = wall.userData.wall.p[1].position.z - wall.userData.wall.p[0].position.z;
			var z1 = wall.userData.wall.p[0].position.x - wall.userData.wall.p[1].position.x;	
			var dir = new THREE.Vector3(x1, 0, z1).normalize();						// перпендикуляр стены			
			var c = (index == 1) ? -100 : 100;	
			var pc = new THREE.Vector3().subVectors( arrWallFront.bounds.max.x, arrWallFront.bounds.min.x ).divideScalar( 2 ).add( arrWallFront.bounds.min.x );
			
			cameraWall.position.copy( pc );
			cameraWall.position.add(new THREE.Vector3().addScaledVector( dir, c )); 
			cameraWall.position.y = (arrWallFront.bounds.max.y.y - arrWallFront.bounds.min.y.y)/2 + arrWallFront.bounds.min.y.y;
			
			
			var rotY = Math.atan2(dir.x, dir.z);
			rotY = (index == 1) ? rotY + Math.PI : rotY;
			cameraWall.rotation.set(0, rotY, 0); 

			detectZoomScreenWall();		// выставляем cameraWall, так чтобы обхватывала всю стену
			showRuleCameraWall();		// показываем линейки/размеры высоты/ширины стены 
		}
		else
		{
			cameraWall.position.set(0, 1, 15);
			cameraWall.rotation.set(0, 0, 0);
			cameraWall.zoom = 1.5;
		}
		

		cameraZoomWall();
		infProject.scene.grid.obj.visible = false;
		changeDepthColor();
	}

	clickO = resetPop.clickO();
	
	renderCamera();
}


// показываем стены, которые были спрятаны
function showAllWallRender()
{		
	for ( var i = 0; i < wallVisible.length; i++ ) 
	{ 
		var wall = wallVisible[i].wall;
		if(wall.visible) { continue; }
		wall.visible = true;
		for ( var i2 = 0; i2 < wall.userData.wall.arrO.length; i2++ ) 
		{ 
			wall.userData.wall.arrO[i2].visible = true; 
			if(wall.userData.wall.arrO[i2].userData.door.popObj) wall.userData.wall.arrO[i2].userData.door.popObj.visible = true; 
		}			
	}
}



// меняем уровень отрисовки объектов 
function changeDepthColor()
{
	if(camera == cameraTop)
	{
		var depthTest = false;
		var w2 = 1;
		var visible = true;
		var pillar = false;
		var visible_2 = true;
	}
	else if(camera == camera3D || camera == cameraWall)
	{
		var depthTest = true;
		var w2 = 0.0;
		var visible = false;
		var pillar = true;
		var visible_2 = false;
	}
	else { return; } 
	
	
	
	for ( var i = 0; i < obj_line.length; i++ )
	{
		if(obj_line[i].children[0]) obj_line[i].children[0].visible = visible_2;
	}
	
	if(abo.point.click2D) 
	{		
		for ( var i = 0; i < obj_point.length; i++ )
		{ 
			obj_point[i].visible = visible; 
			if(obj_point[i].userData.point.pillar) 
			{
				obj_point[i].userData.point.pillar.position.copy(obj_point[i].position);
				obj_point[i].userData.point.pillar.visible = pillar;
			}
		}		
	}
	else 
	{ 
		for ( var i = 0; i < obj_point.length; i++ )
		{ 
			obj_point[i].visible = false; 
		} 
	}
	
	for ( var i = 0; i < arr_window.length; i++ )
	{ 
		arr_window[ i ].material.depthTest = depthTest; 
		arr_window[ i ].material.transparent = depthTest; 
		arr_window[ i ].material.opacity = w2; 		 	
	}

	for ( var i = 0; i < arr_door.length; i++ )
	{ 		
		arr_door[ i ].material.depthTest = depthTest;
		arr_door[ i ].material.transparent = depthTest; 
		arr_door[ i ].material.opacity = w2;					
		
		//if(arr_door[ i ].userData.door.leaf_2D) { arr_door[ i ].userData.door.leaf_2D.visible = visible; } 
		
		if(visible == false) 
		{
			if(arr_door[i].userData.door.leaf_2D) 
			{ 
				arr_door[i].remove(arr_door[i].userData.door.leaf_2D);
			} 			
		}
		else
		{
			if(arr_door[i].userData.door.type != 'DoorEmpty')
			{
				createDoorLeaf(arr_door[i], arr_door[i].userData.door.open_type);
			}
		}		
	}
}


// скрываем ПОП объекты
function showHideArrObj(arr, visible)
{	
	if(arr.length == 0) return;
	
	for ( var i = 0; i < arr.length; i++ ) { arr[i].visible = visible; }				
}


// скрываем размеры стен и площадей помещений
function showHideSizePlane(cdm)
{
	var flag = (cdm == 'hide') ? false : true;

	//for ( var i = 0; i < obj_line.length; i++ ){ obj_line[i].label[0].visible = flag;  }
	//for ( var i = 0; i < room.length; i++ ){ room[i].label.visible = flag; }		
}


// собираем инфу, какие стены будем скрывать в 3D режиме
// опрееляем стена относится ко скольки зонам (0, 1, 2) 
// если 1 зона, то стена внешняя
function getInfoRenderWall()
{
	wallVisible = [];
	for ( var i = 0; i < obj_line.length; i++ )
	{	
		var room = detectCommonZone_1( obj_line[i] );
		if(room.length == 1) 
		{ 	
			var side = 0;
			for ( var i2 = 0; i2 < room[0].w.length; i2++ ) { if(room[0].w[i2] == obj_line[i]) { side = room[0].s[i2]; break; } }
			//var pos = new THREE.Vector3().subVectors( obj_line[i].p[1].position, obj_line[i].p[0].position ).divideScalar( 2 ).add(obj_line[i].p[0].position);

			if(side == 0) { var n1 = 0; var n2 = 1; }
			else { var n1 = 1; var n2 = 0; }
			
			var x1 = obj_line[i].userData.wall.p[n2].position.z - obj_line[i].userData.wall.p[n1].position.z;
			var z1 = obj_line[i].userData.wall.p[n1].position.x - obj_line[i].userData.wall.p[n2].position.x;	
			var dir = new THREE.Vector3(x1, 0, z1).normalize();						// перпендикуляр стены	
			
			wallVisible[wallVisible.length] = { wall : obj_line[i], normal : dir };  
		}
	}	
}



// скрываем все объекты, которые не прилегают к выбранной стене
function showHideObjCameraWall(wall)
{
	for ( var i = 0; i < arr_obj.length; i++ ) 
	{ 
		var crossPoint = null;
		
		if(rayFurniture_2( arr_obj[i], wall )) {  }
		else { arr_obj[i].visible = false; } 
		
	}  	
}

 

// пускаем луч и определяем к какой комнате принадлежит объект
function rayFurniture_2( obj, wall ) 
{
	if(!wall) return false;
	
	obj.updateMatrixWorld();
	obj.geometry.computeBoundingBox();
	obj.geometry.computeBoundingSphere();
	
	
	var dir = obj.getWorldDirection();
	
	var cdm = null;
	var degreeRad = [0, Math.PI/2, -Math.PI/2, Math.PI];
	var col = [0xff0000, 0x1E90FF, 0x008000, 0x000000];	

	var min = obj.geometry.boundingBox.min.clone();
	var max = obj.geometry.boundingBox.max.clone();
	var c = obj.geometry.boundingSphere.center.clone();	
	var arrPos = [];
	arrPos[0] = obj.localToWorld( new THREE.Vector3(c.x, c.y, max.z - 0.05) );
	arrPos[1] = obj.localToWorld( new THREE.Vector3(min.x + 0.05, c.y, c.z) );
	arrPos[2] = obj.localToWorld( new THREE.Vector3(max.x - 0.05, c.y, c.z) ); 
	arrPos[3] = obj.localToWorld( new THREE.Vector3(c.x, c.y, min.z + 0.05) );
	
	
	for ( var i = 0; i < degreeRad.length; i++ )
	{
		var dir2 = new THREE.Vector2(dir.x, dir.z).rotateAround(new THREE.Vector2(0, 0), degreeRad[i]);	
		dir2 = new THREE.Vector3(dir2.x, 0, dir2.y).normalize();	 
		
		var ray = new THREE.Raycaster();
		ray.set( arrPos[i], dir2 );  
		
		//scene.add(new THREE.ArrowHelper( ray.ray.direction, ray.ray.origin, 1, col[i] ));	 //помошник визуализации напрпавлений стрелок
		
		for ( var i2 = 0; i2 < arrWallFront.length; i2++ )
		{
			var intersect = ray.intersectObject( arrWallFront[i2].obj );	
			
			if (intersect.length == 0) continue;

			var d = arrPos[i].distanceTo( intersect[0].point );
			
			if(d < 0.15) { return true; }			
		}
	}
	
	return false;
}





// выставляем zoom cameraWall, так чтобы обхватывала всю стену
function detectZoomScreenWall()  
{ 	
	cameraWall.zoom = 2;
	camera.updateMatrixWorld();
	camera.updateProjectionMatrix();
	
	var posX = { min : arrWallFront.bounds.min.x.clone(), max : arrWallFront.bounds.max.x.clone() };
	var posY = { min : arrWallFront.bounds.min.y.clone(), max : arrWallFront.bounds.max.y.clone() };
	
	posX.min.project(camera);
	posY.min.project(camera);	
	
	
	
	var x = 0.6/posX.min.x;
	var y = 0.6/posY.min.y;
	
	camera.zoom = (posX.min.x < posY.min.y) ? Math.abs(x) * 2 : Math.abs(y) * 2;    
	
	camera.updateMatrixWorld();
	camera.updateProjectionMatrix();

	zoom_binding = camera.zoom;
}






// показываем линейки длины/высоты стены в режиме cameraWall
function showRuleCameraWall()
{
	var wall = arrWallFront.wall[0].obj;
	var index = arrWallFront.wall[0].index;
	var rt = (index == 1) ? 0 : Math.PI;
	
	var d = [arrWallFront.bounds.max.x.distanceTo(arrWallFront.bounds.min.x), (arrWallFront.bounds.max.y.y - arrWallFront.bounds.min.y.y - 0.1)];

	var dir = [];
	dir[0] = new THREE.Vector3().subVectors( arrWallFront.bounds.max.x, arrWallFront.bounds.min.x ).normalize();
	dir[1] = new THREE.Vector3().subVectors( arrWallFront.bounds.max.y, arrWallFront.bounds.min.y ).normalize(); 
	console.log('---------333');
	
	var pos = [];
	pos[0] = new THREE.Vector3(arrWallFront.bounds.min.x.x, arrWallFront.bounds.min.y.y - 0.5, arrWallFront.bounds.min.x.z);
	
	if(index == 1)
	{
		pos[1] = new THREE.Vector3(arrWallFront.bounds.min.x.x, arrWallFront.bounds.min.y.y + 0.1, arrWallFront.bounds.min.x.z);	
		pos[1].add( dir[0].clone().multiplyScalar( -0.8 ) );		
	}
	else
	{
		pos[1] = new THREE.Vector3(arrWallFront.bounds.max.x.x, arrWallFront.bounds.min.y.y + 0.1, arrWallFront.bounds.max.x.z);	
		pos[1].add( dir[0].clone().multiplyScalar( 0.8 ) );			
	}
	
	
	var pos2 = [];
	pos2[0] = new THREE.Vector3().subVectors( arrWallFront.bounds.max.x, arrWallFront.bounds.min.x ).divideScalar( 2 ).add( arrWallFront.bounds.min.x );	
	pos2[0].y = pos[0].y;
	pos2[1] = pos[1].clone();
	pos2[1].y = (( arrWallFront.bounds.max.y.y - arrWallFront.bounds.min.y.y ) / 2 + arrWallFront.bounds.min.y.y) + 0.1;
		
	
	var line = arrSize.format_1.line;
	var label = arrSize.format_1.label;
	for ( var i = 0; i < 2; i++ ) 
	{
		var v = line[i].geometry.vertices; 	
		v[3].x = v[2].x = v[5].x = v[4].x = d[i];
		line[i].geometry.verticesNeedUpdate = true;		
		
		line[i].position.copy( pos[i] );

		var rotation = new THREE.Euler().setFromQuaternion( quaternionDirection(dir[i]) );  // из кватерниона в rotation
		line[i].rotation.set(rotation.x, rotation.y - Math.PI / 2, 0);		
		
		line[i].visible = true;
		
		
		label[i].position.copy( pos2[i] );		
		label[i].rotation.set( 0, wall.rotation.y + rt, 0 );    
		label[i].visible = true;		
		upLabelCameraWall({label : label[i], text : Math.round(d[i] * 100) * 10, color : 'rgba(82,82,82,1)', border : 'white'}); 			
	}
	
	// устанавливаем боковые черточки для линеек 
	if(index == 1)
	{
		pos[2] = new THREE.Vector3(arrWallFront.bounds.min.x.x, pos[0].y, arrWallFront.bounds.min.x.z);
		pos[3] = new THREE.Vector3(arrWallFront.bounds.max.x.x, pos[0].y, arrWallFront.bounds.max.x.z);
	}
	else
	{
		pos[2] = new THREE.Vector3(arrWallFront.bounds.max.x.x, pos[0].y, arrWallFront.bounds.max.x.z);
		pos[3] = new THREE.Vector3(arrWallFront.bounds.min.x.x, pos[0].y, arrWallFront.bounds.min.x.z);
	}	
	
	
	pos[4] = pos[1].clone();
	pos[5] = pos[1].clone();
	pos[5].y = arrWallFront.bounds.max.y.y;
	
	var rot = [];
	rot[2] = line[1].rotation.clone();
	rot[3] = rot[2];
	rot[4] = line[0].rotation.clone();
	rot[5] = rot[4];
	
	// боковые черточки
	for ( var i = 2; i < 6; i++ )
	{
		var v = line[i].geometry.vertices; 	
		v[0].x = v[1].x = v[6].x = v[7].x = -0.05;
		v[3].x = v[2].x = v[5].x = v[4].x = 0.05;
		line[i].geometry.verticesNeedUpdate = true;
		line[i].position.copy( pos[i] );
		line[i].rotation.copy( rot[i] );
		line[i].visible = true;
	}
}


