

// создаем форму окна/двери/балкона 
function createEmptyFormWD_1(cdm)
{
	var material = new THREE.MeshLambertMaterial({ color: colWin, transparent: true, opacity: 1.0, depthTest: false });
	
	if(camera == cameraTop)
	{ 
		material.depthTest = false;
		material.transparent = true;		
		material.opacity = 1.0; 		 	
	}
	else if(1 == 2)
	{ 		
		material.depthTest = true;
		material.transparent = true;
		material.opacity = 0;					
	}	
	
	var spline = [];
	spline[0] = new THREE.Vector2( -0.5, -0.5 );	
	spline[1] = new THREE.Vector2( 0.5, -0.5 );
	spline[2] = new THREE.Vector2( 0.5, 0.5 );
	spline[3] = new THREE.Vector2( -0.5, 0.5 );
	
	var shape = new THREE.Shape( spline );
	var obj = new THREE.Mesh( new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: 0.2 } ), material );	
	
	var v = obj.geometry.vertices;
	
	var minX = [], maxX = [], minY = [], maxY = [], minZ = [], maxZ = [];
	
	for ( var i = 0; i < v.length; i++ )
	{
		v[i].z = Math.round(v[i].z * 100) / 100;
		if(v[i].z == 0) { minZ[minZ.length] = i; v[i].z = -0.1; }
		if(v[i].z == 0.2) { maxZ[maxZ.length] = i; v[i].z = 0.1; } 
	}
	
	obj.geometry.computeBoundingBox();	

	for ( var i = 0; i < v.length; i++ )
	{
		if(obj.geometry.boundingBox.min.x + 0.05 > v[i].x) { minX[minX.length] = i; }
		if(obj.geometry.boundingBox.max.x - 0.05 < v[i].x) { maxX[maxX.length] = i; }
		if(obj.geometry.boundingBox.min.y + 0.05 > v[i].y) { minY[minY.length] = i; }
		if(obj.geometry.boundingBox.max.y - 0.05 < v[i].y) { maxY[maxY.length] = i; }
	}
	
	
	var arr = { minX : minX, maxX : maxX, minY : minY, maxY : maxY, minZ : minZ, maxZ : maxZ };
	
	var form = { type : '' , v : arr };	
	
	obj.userData.tag = 'free_dw';
	obj.userData.door = {};
	obj.userData.door.type = 'DoorEmpty';
	obj.userData.door.size = new THREE.Vector3( 1, 1, 0.2 );
	obj.userData.door.form = form;
	obj.userData.door.bound = {}; 
	obj.userData.door.floorCenterY = 1.5;  // центр wd над полом
	obj.userData.door.width = 0.2;
	obj.userData.door.h1 = 0;
	obj.userData.door.color = obj.material.color; 
	obj.userData.door.wall = null;
	obj.userData.door.controll = {};
	obj.userData.door.ruler = {};
	obj.userData.door.last = { pos : new THREE.Vector3(), rot : new THREE.Vector3(), x : 0, y : 0 };
	obj.userData.door.topMenu = true;
	
	clickO.move = obj; 
	clickO.last_obj = obj;
	
	scene.add( obj );  
}


// кликнули на стену или окно/дверь, когда к мышки привязана вставляемая дверь 
function clickToolWD(obj)
{ 
	  
	if(obj)
	{    
		// кликнули на стену, когда добавляем окно
		if(obj.userData.tag == 'free_dw') 
		{ 
			clickO.obj = obj;
			if(!obj.userData.door.wall) { return true; }
			
			clickO.last_obj = null;
			addWD({ obj : obj, wall : obj.userData.door.wall, pos : obj.position });  
			return true; 
		}
	}

	return false;
}



// добавляем на выбранную стену окно/дверь
// obj 		готовая дверь/окно
// wall		стену на которую кликнули
function addWD( cdm )
{	
	var obj = cdm.obj;
	var wall = cdm.wall;
	var pos = cdm.pos;
	
	pos.y -= 0.001;		// делаем чуть ниже уровня пола
	obj.position.copy( pos );
	obj.rotation.copy( wall.rotation ); 
	obj.material.transparent = false;
	clickO.obj = obj;
	
	if(camera == cameraTop)
	{ 
		obj.material.depthTest = false;
		obj.material.transparent = true;
		obj.material.opacity = 1.0; 		 	
	}
	else
	{ 		
		obj.material.depthTest = true;
		obj.material.transparent = true;
		obj.material.opacity = 0;					
	}	
	
	changeWidthWD(obj, wall);		// выставляем ширину окна/двери равную ширине стены
	
	// обновляем(пересчитываем) размеры двери/окна/двери (если измениалась ширина)
	obj.geometry.computeBoundingBox(); 	
	obj.geometry.computeBoundingSphere();
	
	obj.userData.tag = 'door';
	obj.userData.door.wall = wall;
	
	if(!obj.userData.id) { obj.userData.id = countId; countId++; }  
	
	if(obj.userData.tag == 'window') { arr_window[arr_window.length] = obj; }
	else { arr_door[arr_door.length] = obj; }

	
	//--------
	
	obj.updateMatrixWorld();
	
	
	// создаем клон двери/окна, чтобы вырезать в стене нужную форму
	if(1==1)
	{  
		objsBSP = { wall : wall, wd : createCloneWD_BSP( obj ) };				
		MeshBSP( obj, objsBSP ); 
		cutMeshBlockBSP( obj );
	}	


	wall.userData.wall.arrO[wall.userData.wall.arrO.length] = obj;
	
	obj.geometry.computeBoundingBox();
	obj.geometry.computeBoundingSphere();

 	
	clickO.obj = null;
	clickO.last_obj = null;
	clickO.move = null;
	
	renderCamera();
}




 
 
 
 