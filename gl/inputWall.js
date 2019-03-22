



// кликнули на стену (в таблице показываем длину стены)
function showLengthWallUI( wall )
{
	UI.showToolbar('wall-2d-toolbar');
		
	var v = wall.userData.wall.v; 		
	var d1 = Math.abs( v[6].x - v[0].x );		
	var d2 = Math.abs( v[10].x - v[4].x );	
	
	UI('wall_length_1').val(Math.round(d1 * 100) * 10);
	UI('wall_length_2').val(Math.round(d2 * 100) * 10);			

	toggleButtonMenuWidthWall(wall);
}




// после изменения на панели длины стены, нажали enter и миняем длину стены
function inputLengthWall_1(cdm)
{
	var wall = infProject.scene.array.wall[0];
	//if(!clickO.obj){ return; } 
	//if(clickO.obj.userData.tag != 'wall'){ return; } 	
	//var wall = clickO.obj; 

	getInfoEvent21( wall, 'down' );		// redo
	 
	cdm.wall = wall;
	cdm.type = 'wallRedBlue';
	cdm.side = 'wall_length_1';
	console.log(cdm);
	inputLengthWall_2(cdm);	// меняем только длину стены 
	
	getInfoEvent21( wall, 'up' );		// redo
}


// миняем длину стены 
function inputLengthWall_2(cdm)
{
	var wall = cdm.wall;
	var value = cdm.value;
	
	var wallR = detectChangeArrWall_2(wall);
	clickMovePoint_BSP(wallR);

	var p1 = wall.userData.wall.p[1];
	var p0 = wall.userData.wall.p[0];

	var walls = [...new Set([...p0.w, ...p1.w])];	// получаем основную и соседние стены
 	
	
	var ns = 0;
	var flag = true;
	while ( flag )
	{	 
		var v = wall.userData.wall.v;

		var d = 0;
		
		if(cdm.side == 'wall_length_1'){ d = Math.abs( v[6].x - v[0].x );  } 
		else if(cdm.side == 'wall_length_2'){ d = Math.abs( v[10].x - v[4].x );  }
		d = Math.round(d * 1000);
		
		var sub = (value - d) / 1000;
		if(cdm.type == 'wallRedBlue') { sub /= 2; }	
		
		var dir = new THREE.Vector3().subVectors(p1.position, p0.position).normalize();
		var dir = new THREE.Vector3().addScaledVector( dir, sub );	

		if(cdm.type == 'wallBlueDot')
		{ 
			var offset = new THREE.Vector3().addVectors( p1.position, dir ); 
			p1.position.copy( offset ); 
		}
		else if(cdm.type == 'wallRedDot')
		{ 
			var offset = new THREE.Vector3().subVectors( p0.position, dir ); 
			p0.position.copy( offset ); 
			wall.position.copy( offset );
		}
		else if(cdm.type == 'wallRedBlue')
		{ 			
			var offset = new THREE.Vector3().subVectors( p0.position, dir ); 
			p0.position.copy( offset );
			wall.position.copy( offset );
			
			p1.position.copy( new THREE.Vector3().addVectors( p1.position, dir ) );				
		}

		
		for ( var i = 0; i < walls.length; i++ )
		{
			updateWall(walls[i]);
		}			 		 
		
		upLineYY(p0);
		upLineYY(p1);
		upLabelPlan_1( [wall] );
		if(cdm.side == 'wall_length_1'){ d = Math.abs( v[6].x - v[0].x ); }
		else if(cdm.side == 'wall_length_2'){ d = Math.abs( v[10].x - v[4].x ); }
		d = Math.round(d * 1000);

		if(value - d == 0){ flag = false; }
		
		if(ns > 5){ flag = false; }
		ns++;
	} 	
	 
	upLabelPlan_1( wallR );		
	updateShapeFloor( compileArrPickZone(wall) );  				 			
	
	showLengthWallUI(wall);
	console.log(777777);
	clickPointUP_BSP(wallR);
}




// изменение длины стены
function updateWall(wall, cdm) 
{
	//wall.updateMatrixWorld(); перенес на момент клика
	var v = wall.geometry.vertices;
	var p = wall.userData.wall.p;
	
	
	var f1 = false;	// точку p0 не двигали
	var f2 = false;	// точку p1 не двигали
	
	f1 = !comparePos(p[0].userData.point.last.pos, p[0].position); 	// true - точку p0 двигали
	f2 = !comparePos(p[1].userData.point.last.pos, p[1].position); 	// true - точку p1 двигали	
	
	// перемещаются сразу 2 точки
	if(f1 && f2)
	{
		var offset_1 = new THREE.Vector3().subVectors(p[0].position, p[0].userData.point.last.pos);
		var offset_2 = new THREE.Vector3().subVectors(p[1].position, p[1].userData.point.last.pos);
		
		var equal = comparePos(offset_1, offset_2);
		
		// стену просто переместили, без изменении длины
		if(equal)
		{
			var offset = new THREE.Vector3().subVectors(p[0].position, wall.position);
			
			wall.position.copy(p[0].position);
						
			for ( var i = 0; i < wall.userData.wall.arrO.length; i++ )
			{
				wall.userData.wall.arrO[i].position.add(offset);
			}
			
			return;
		}
	}	
	
	
	var dist = p[0].position.distanceTo(p[1].position);
	
	v[0].x = v[1].x = v[2].x = v[3].x = v[4].x = v[5].x = 0;
	v[6].x = v[7].x = v[8].x = v[9].x = v[10].x = v[11].x = dist;
 
	wall.geometry.verticesNeedUpdate = true; 
	wall.geometry.elementsNeedUpdate = true;
	wall.geometry.computeBoundingBox();	
	wall.geometry.computeBoundingSphere();	
	wall.geometry.computeFaceNormals();	

	var dir = new THREE.Vector3().subVectors(p[0].position, p[1].position).normalize();
	var angleDeg = Math.atan2(dir.x, dir.z);
	wall.rotation.set(0, angleDeg + Math.PI / 2, 0);

	wall.position.copy( p[0].position );

	var wallMesh = wall.children[0];
	var v = wallMesh.geometry.vertices;
	v[0].x = v[1].x = v[6].x = v[7].x = 0;
	v[2].x = v[3].x = v[4].x = v[5].x = dist;
	wallMesh.geometry.verticesNeedUpdate = true; 
	wallMesh.geometry.elementsNeedUpdate = true;
	
	wallMesh.geometry.computeBoundingSphere();


	// ------- 
	// устанавливаем wd	
	if(cdm)
	{
		if(cdm.point)	// точка которая двигалась
		{
			if(cdm.point == p[0]) { f1 = true; }
			if(cdm.point == p[1]) { f2 = true; }
		}
	}
	
	
	if(f2){ var dir = new THREE.Vector3().subVectors( p[0].position, p[1].position ).normalize(); }
	else { var dir = new THREE.Vector3().subVectors( p[1].position, p[0].position ).normalize(); }
	
	for ( var i = 0; i < wall.userData.wall.arrO.length; i++ )
	{
		var wd = wall.userData.wall.arrO[i];	

		if(f2)
		{
			var startPos = new THREE.Vector3(p[0].position.x, 0, p[0].position.z);
			var p1 = p[0].position;			
		}
		else
		{
			var startPos = new THREE.Vector3(p[1].position.x, 0, p[1].position.z);
			var p1 = p[1].position;
		}
		
		var dist = startPos.distanceTo(new THREE.Vector3(wd.position.x, 0, wd.position.z));
		
		
		var pos = new THREE.Vector3().addScaledVector( dir, -dist );
		pos = new THREE.Vector3().addVectors( p1, pos );
		
		wd.position.x = pos.x;
		wd.position.z = pos.z;
		wd.rotation.copy( wall.rotation );
	}			
}





// изменение ширины стены
function inputWidthWall() 
{
	if(!clickO.obj){ return; } 
	if(clickO.obj.userData.tag != 'wall'){ return; } 

	var wall = clickO.obj;
	var wallR = detectChangeArrWall_2(wall);
	
	clickMovePoint_BSP(wallR);
			
	var v = wall.geometry.vertices;
	
	var type = UI('wall-resize').val();
	var width = Number(UI('wall_width_1').val()) / 1000;
	var z = [0,0];
	
	if(type == 'wallRedBlueArrow')
	{ 	
		width = (width < 0.01) ? 0.01 : width;
		width /= 2;		
		z = [width, -width];		
		var value = Math.round(width * 2 * 1000);
	}
	else if(type == 'wallBlueArrow')
	{ 
		width = (Math.abs(Math.abs(v[4].z) + Math.abs(width)) < 0.01) ? 0.01 - Math.abs(v[4].z) : width;   		
		z = [width, v[4].z];
		var value = width * 1000;
	}
	else if(type == 'wallRedArrow')
	{		 
		width = (Math.abs(Math.abs(v[0].z) + Math.abs(width)) < 0.01) ? 0.01 - Math.abs(v[0].z) : width;    		
		z = [v[0].z, -width];
		var value = width * 1000;
	}

	v[0].z = v[1].z = v[6].z = v[7].z = z[0];
	v[4].z = v[5].z = v[10].z = v[11].z = z[1];	

	wall.geometry.verticesNeedUpdate = true; 
	wall.geometry.elementsNeedUpdate = true;
	
	wall.geometry.computeBoundingSphere();
	wall.geometry.computeBoundingBox();
	wall.geometry.computeFaceNormals();	
	
	var width = Math.abs(v[0].z) + Math.abs(v[4].z);	
	wall.userData.wall.width = Math.round(width * 100) / 100;
	wall.userData.wall.offsetZ = v[0].z + v[4].z;	

	UI('wall_width_1').val(value);
	
	//upLineYY(wall.userData.wall.p[0]);
	//upLineYY(wall.userData.wall.p[1]);
	var p0 = wall.userData.wall.p[0];
	var p1 = wall.userData.wall.p[1];
	upLineYY_2(p0, p0.p, p0.w, p0.start);	
    upLineYY_2(p1, p1.p, p1.w, p1.start);	
	
	// меняем ширину wd
	for ( var i = 0; i < wall.userData.wall.arrO.length; i++ )
	{ 
		var wd = wall.userData.wall.arrO[i];	
		var v = wd.geometry.vertices;
		var f = wd.userData.door.form.v;
		
		for ( var i2 = 0; i2 < f.minZ.length; i2++ ) { v[f.minZ[i2]].z = wall.geometry.vertices[4].z; }
		for ( var i2 = 0; i2 < f.maxZ.length; i2++ ) { v[f.maxZ[i2]].z = wall.geometry.vertices[0].z; }	

		wd.geometry.verticesNeedUpdate = true; 
		wd.geometry.elementsNeedUpdate = true;
		wd.geometry.computeBoundingSphere();
		wd.geometry.computeBoundingBox();
		wd.geometry.computeFaceNormals();		
	}
	
	// правильно устанавливаем Pop после изменение ширины стены
	for ( var i = 0; i < wall.userData.wall.arrO.length; i++ )
	{ 
		if(wall.userData.wall.arrO[i].userData.door.type == 'DoorPattern')
		{
			changeWidthParamWD(wall.userData.wall.arrO[i]);
		}
		else if(wall.userData.wall.arrO[i].userData.door.type == 'WindowSimply')
		{
			wall.userData.wall.arrO[i].userData.door.popObj.position.copy(wall.userData.wall.arrO[i].geometry.boundingSphere.center.clone()); 
		}
		else if(wall.userData.wall.arrO[i].userData.door.type == 'DoorSimply')
		{
			setPosDoorLeaf_1(wall.userData.wall.arrO[i], wall.userData.wall.arrO[i].userData.door.open_type);
			setPosDoorLeaf_2(wall.userData.wall.arrO[i]);			
		}
	}	
	
	upLabelPlan_1( wallR );	 				
	getYardageSpace( compileArrPickZone(wall) );
	
	clickPointUP_BSP(wallR);

	if(camera == camera3D) {}
}



// переключаем в меню стены кнокпи ширины 
function toggleButtonMenuWidthWall(wall)
{		
	wall.geometry.verticesNeedUpdate = true;
	var v = wall.userData.wall.v; 			
	
	var k = UI('wall-resize').val();
	
	if(k == 'wallRedBlueArrow') { var width = Math.round((Math.abs(v[0].z) + Math.abs(v[4].z)) * 1000); }
	else if(k == 'wallBlueArrow') { var width = Math.round(Math.abs(v[0].z) * 1000); }
	else if(k == 'wallRedArrow') { var width = Math.round(Math.abs(v[4].z) * 1000); }

	if(Math.abs(width) < 0.001){ width = 0; }   
	
	UI('wall_width_1').val(width);	
}



// изменение ширины стены (undo|redo)
function inputWidthWall_2(wall, z) 
{

	var wallR = detectChangeArrWall_2(wall);
	
	clickMovePoint_BSP(wallR);
			
	var v = wall.geometry.vertices;		

	v[0].z = v[1].z = v[6].z = v[7].z = z[0];
	v[4].z = v[5].z = v[10].z = v[11].z = z[1];	

	wall.geometry.verticesNeedUpdate = true; 
	wall.geometry.elementsNeedUpdate = true;
	
	wall.geometry.computeBoundingSphere();
	wall.geometry.computeBoundingBox();
	wall.geometry.computeFaceNormals();	
	
	var width = Math.abs(v[0].z) + Math.abs(v[4].z);	
	wall.userData.wall.width = Math.round(width * 100) / 100;
	wall.userData.wall.offsetZ = v[0].z + v[4].z;	
	
	//upLineYY(wall.userData.wall.p[0]);
	//upLineYY(wall.userData.wall.p[1]);
	var p0 = wall.userData.wall.p[0];
	var p1 = wall.userData.wall.p[1];
	upLineYY_2(p0, p0.p, p0.w, p0.start);	
    upLineYY_2(p1, p1.p, p1.w, p1.start);	
	
	// меняем ширину wd
	for ( var i = 0; i < wall.userData.wall.arrO.length; i++ )
	{ 
		var wd = wall.userData.wall.arrO[i];	
		var v = wd.geometry.vertices;
		var f = wd.userData.door.form.v;
		
		for ( var i2 = 0; i2 < f.minZ.length; i2++ ) { v[f.minZ[i2]].z = wall.geometry.vertices[4].z; }
		for ( var i2 = 0; i2 < f.maxZ.length; i2++ ) { v[f.maxZ[i2]].z = wall.geometry.vertices[0].z; }	

		wd.geometry.verticesNeedUpdate = true; 
		wd.geometry.elementsNeedUpdate = true;
		wd.geometry.computeBoundingSphere();
		wd.geometry.computeBoundingBox();
		wd.geometry.computeFaceNormals();		
	}
	
	// правильно устанавливаем Pop после изменение ширины стены
	for ( var i = 0; i < wall.userData.wall.arrO.length; i++ )
	{ 
		if(wall.userData.wall.arrO[i].userData.door.type == 'DoorPattern')
		{
			changeWidthParamWD(wall.userData.wall.arrO[i]);
		}
		else if(wall.userData.wall.arrO[i].userData.door.type == 'WindowSimply')
		{
			wall.userData.wall.arrO[i].userData.door.popObj.position.copy(wall.userData.wall.arrO[i].geometry.boundingSphere.center.clone()); 
		}
		else if(wall.userData.wall.arrO[i].userData.door.type == 'DoorSimply')
		{
			setPosDoorLeaf_1(wall.userData.wall.arrO[i], wall.userData.wall.arrO[i].userData.door.open_type);
			setPosDoorLeaf_2(wall.userData.wall.arrO[i]);			
		}
	}	
	
	upLabelPlan_1( wallR );	 				
	getYardageSpace( compileArrPickZone(wall) );
	
	clickPointUP_BSP(wallR);
}




// меняем глобальную переменную ширины стены
function inputGlobalWidthWall()
{
	var width = $('[input_wl="6"]').val();
	
	width = (width < 0.01) ? 0.01 : width;
	
	$('[input_wl="6"]').val(width);
	
	width_wall = width;
}



