


// создаем копию стены (для ThreeBSP), но без перемещаемого окна/двери (запускается один раз в момент, когда начали перемещать окно/дверь)
// 1. обновляем стену до простой стены без окон/дверей
// 2. добавляем откосы
// 3. вырезаем отверстия для окон/дверей , кроме перемещаемого окна/двери
function clickMoveWD_BSP( wd )  
{
	console.log('clone wall (без перемещаемого WD)');
	
	var wall = wd.userData.door.wall; 
	
	var p1 = wall.userData.wall.p[0].position;
	var p2 = wall.userData.wall.p[1].position;	
	var d = p1.distanceTo( p2 );		
	
	wall.geometry = createGeometryWall(d, wall.userData.wall.height_1, wall.userData.wall.width, wall.userData.wall.offsetZ);	// обновляем стену до простой стены
	
	// добавляем откосы
	var v = wall.geometry.vertices;
	
	for ( var i = 0; i < v.length; i++ ) { v[i] = wall.userData.wall.v[i].clone(); }
	
	//wall.updateMatrixWorld();

	upUvs_1( wall ); 
	
	// вырезаем отверстия для окон/дверей
	var arrO = wall.userData.wall.arrO;
	
	for ( var n = 0; n < arrO.length; n++ )
	{
		if(arrO[n] == wd) continue;
		
		var objClone = createCloneWD_BSP( arrO[n] ); 

		var wdBSP = new ThreeBSP( objClone );    
		var wallBSP = new ThreeBSP( wall ); 			// копируем выбранную стену	
		var newBSP = wallBSP.subtract( wdBSP );		// вычитаем из стены объект нужной формы		
		wall.geometry = newBSP.toMesh().geometry;	
	}
	
	if(arrO.length > 1)
	{
		wall.geometry.computeFaceNormals();

		for ( var i = 0; i < wall.geometry.faces.length; i++ )
		{
			wall.geometry.faces[i].normal.normalize();
			if(wall.geometry.faces[i].normal.z == 1) { wall.geometry.faces[i].materialIndex = 1; }
			else if(wall.geometry.faces[i].normal.z == -1) { wall.geometry.faces[i].materialIndex = 2; }
		}		
	}
	
		 
	
	return wall;
}




// создаем форму окна/двери (для boolean), чуть шире стены
function createCloneWD_BSP( wd )
{
	//console.log('clone WD (но чушь шире оригинала) (для boolean)');
	
	objClone.geometry = wd.geometry.clone(); 
	objClone.position.copy( wd.position );
	objClone.rotation.copy( wd.rotation );
	
	//var width = wd.userData.door.width / 2 + 0.3;
	var minZ = wd.userData.door.form.v.minZ;
	var maxZ = wd.userData.door.form.v.maxZ;
	
	var v = objClone.geometry.vertices;
	
	for ( var i = 0; i < minZ.length; i++ ) { v[minZ[i]].z -= 0.2; }
	for ( var i = 0; i < maxZ.length; i++ ) { v[maxZ[i]].z += 0.2; }

	return objClone;	
}



// вырезаем отверстие под окно/дверь 
function MeshBSP( wd, objsBSP )
{  
	var wall = wd.userData.door.wall;
	
	var wallClone = objsBSP.wall;
	var wdClone = objsBSP.wd;
	
	wdClone.position.copy( wd.position );

	var wdBSP = new ThreeBSP( wdClone );    
	var wallBSP = new ThreeBSP( wallClone ); 			// копируем выбранную стену	
	var newBSP = wallBSP.subtract( wdBSP );				// вычитаем из стены объект нужной формы		
	wall.geometry = newBSP.toMesh().geometry;	
	
	wall.geometry.computeFaceNormals();

	for ( var i = 0; i < wall.geometry.faces.length; i++ )
	{
		wall.geometry.faces[i].normal.normalize();
		if(wall.geometry.faces[i].normal.z == 1) { wall.geometry.faces[i].materialIndex = 1; }
		else if(wall.geometry.faces[i].normal.z == -1) { wall.geometry.faces[i].materialIndex = 2; }
		else if(wall.geometry.faces[i].normal.y == 1) { wall.geometry.faces[i].materialIndex = 3; }
		else if(wall.geometry.faces[i].normal.y == -1) { wall.geometry.faces[i].materialIndex = 3; }
	}

	//wall.updateMatrixWorld();
	
	//upUvs_1( wall );	 	
}

 
 
 
 // создаем копии стен (для ThreeBSP) без окон/дверей (запускается один раз, когда начали перемещать точку)
function clickMovePoint_BSP( arrW ) 
{
	console.log('click_BSP_1');
	
	for ( var i = 0; i < arrW.length; i++ )
	{
		var wall = arrW[i]; 
		
		if(wall.userData.wall.arrO.length == 0) continue;
		
		var p1 = wall.userData.wall.p[0].position;
		var p2 = wall.userData.wall.p[1].position;	
		var d = p1.distanceTo( p2 );		
		
		wall.geometry = createGeometryWall(d, wall.userData.wall.height_1, wall.userData.wall.width, wall.userData.wall.offsetZ);	// обновляем стену до простой стены		
		 
		// добавляем откосы
		var v = wall.geometry.vertices;
		for ( var i2 = 0; i2 < v.length; i2++ ) { v[i2] = wall.userData.wall.v[i2].clone(); }	
		wall.geometry.verticesNeedUpdate = true;
		wall.geometry.elementsNeedUpdate = true;	
		wall.geometry.computeBoundingSphere();
	}
}
 
 
// сняли клик, после перемещения точки (вставляем wd)
function clickPointUP_BSP( arrW )   
{
	console.log('click_BSP_2');
	
	for ( var i = 0; i < arrW.length; i++ )
	{
		var wall = arrW[i];
		
		for ( var i2 = 0; i2 < wall.userData.wall.arrO.length; i2++ )
		{
			var wd = wall.userData.wall.arrO[i2];
			
			var wdClone = createCloneWD_BSP( wd );
			
			objsBSP = { wall : wall, wd : wdClone };		
			
			MeshBSP( wd, objsBSP );			
		}
		
		upUvs_1( wall ); 
	}
} 



// вырезаем отверстие под окно/дверь 
function cutMeshBlockBSP( wd, wall )
{  
	if(wall.userData.wall.block.arr.length == 0) return;
	
	var arrB = wall.userData.wall.block.arr;
	var wd2 = createCloneWD_BSP( wd );
	
	wd2.updateMatrixWorld();
	wd2.geometry.computeBoundingBox();
	var bound = wd2.geometry.boundingBox;
	
	for ( var i = 0; i < arrB.length; i++ )
	{
		if(arrB[i].geometry.vertices.length == 0) continue;		
		
		var ps = wd2.worldToLocal( arrB[i].position.clone() );
		
		// если за пределом wd, то не вырезаем
		if(ps.x < bound.min.x) { continue; }
		if(ps.x > bound.max.x) { continue; }
		if(ps.y < bound.min.y) { continue; }
		if(ps.y > bound.max.y) { continue; }
		if(ps.z < bound.min.z) { continue; }
		if(ps.z > bound.max.z) { continue; }	
						
		
		var wdBSP = new ThreeBSP( wd2 );    
		var wallBSP = new ThreeBSP( arrB[i] ); 			// копируем выбранную стену	
		var newBSP = wallBSP.subtract( wdBSP );				// вычитаем из стены объект нужной формы		
		
		arrB[i].geometry = newBSP.toMesh().geometry;
	}	 	
}


 
 