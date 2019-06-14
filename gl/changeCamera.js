

    


// переключение камеры
function changeCamera(cam)
{  
	deActiveSelected();
	
	camera = cam;

	
	if(camera == cameraTop)
	{					
		changeDepthColor();			
		cameraZoomTop( camera.zoom );
		infProject.scene.grid.obj.visible = true;
	}
	else if(camera == camera3D)
	{	
		activeHover2D_2(); 
		cameraZoomTop( cameraTop.zoom );
		changeDepthColor();
		infProject.scene.grid.obj.visible = true;		 
	}
	else if(camera == cameraWall)
	{  
		if(infProject.scene.array.wall.length > 0)
		{  
			showRuleCameraWall();		// показываем линейки/размеры высоты/ширины стены 

			
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
	
	infProject.tools.axis[0].visible = false;
	infProject.tools.axis[1].visible = false;	

	clickO = resetPop.clickO();
	
	renderCamera();
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
	
	var point = infProject.scene.array.point;
	var wall = infProject.scene.array.wall;
	var window = infProject.scene.array.window;
	var door = infProject.scene.array.door;	
	
	
	for ( var i = 0; i < wall.length; i++ )
	{
		if(wall[i].children[0]) wall[i].children[0].visible = visible_2;	// скрываем штукатурку
	}
	
	for ( var i = 0; i < point.length; i++ )
	{ 
		point[i].visible = visible; 
		if(point[i].userData.point.pillar) 
		{
			point[i].userData.point.pillar.position.copy(point[i].position);
			point[i].userData.point.pillar.visible = pillar;
		}
	}		
	
	showHideArrObj(arr_wf.point, visible_2);
	showHideArrObj(window, visible_2);
	showHideArrObj(door, visible_2);
	
}


// скрываем/показываем объекты
function showHideArrObj(arr, visible)
{	
	if(arr.length == 0) return;
	
	for ( var i = 0; i < arr.length; i++ ) { arr[i].visible = visible; }				
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
}






