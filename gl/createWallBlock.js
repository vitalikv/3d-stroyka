





// создаем кирпичную стену
function createFormWallR()
{	
	var size = infProject.settings.wall.block.size;		// размер блока кирпича
	var seam = 0.01;									// толщина шва

	// создаем стену
	var point1 = createPoint( new THREE.Vector3(-3,0,0), 0 );
	var point2 = createPoint( new THREE.Vector3(3,0,0), 0 );
	var width = size.z - seam;
	var width = (size.z * 2 + seam) - seam;
	var height = 2;
	
	
	// создаем инструмент для резки кирпичей по бокам стены и сверху
	var geometry = createGeometryWall(1, 1, 1, 0);
	var material = new THREE.MeshLambertMaterial( { color : 0xffff00 } );
	
	var cutWall = [];
	
	for(var i = 0; i < 3; i++)
	{
		cutWall[i] = new THREE.Mesh( geometry.clone(), material );	
		cutWall[i].visible = false;
		scene.add(cutWall[i]);		
	}
	
	infProject.tools.cutWall = cutWall;
	// создаем инструмент для резки кирпичей по бокам стены и сверху
	
	
	var wall = createOneWall3( point1, point2, width, {height: height, texture : infProject.settings.wall.material} );

	// кирпич
	var geometry = createGeometryCube(size.x, size.y, size.z);
	var v = geometry.vertices;
	v[3].x = v[2].x = v[5].x = v[4].x = size.x;
	v[0].x = v[1].x = v[6].x = v[7].x = 0;
	geometry.verticesNeedUpdate = true; 
	geometry.elementsNeedUpdate = true;		
	
	var material = new THREE.MeshLambertMaterial( { color : 0xffffff } );

	// загружаем текстуру кирпича
	new THREE.TextureLoader().load(infProject.path+infProject.settings.wall.block.material.link, function ( image )  
	{
		material.color = new THREE.Color( 0xffffff );
		var texture = image;			
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
		
		texture.repeat.x = 1;
		texture.repeat.y = 1;			

		
		texture.needsUpdate = true;
		
		material.map = texture; 
		material.lightMap = lightMap_1;
		material.needsUpdate = true; 					
		
		renderCamera();
	});	
	
	wall.userData.wall.block.size = size;
	wall.userData.wall.block.seam = seam;
	wall.userData.wall.block.geometry = geometry;
	wall.userData.wall.block.material = material;
	
	resetSideBlockWall({start:true,wall:wall});
	cutSideBlockWall({wall:wall});
	
	renderCamera();
}



// обновляем стену. полностью удаляем все блоки и заново строим
function resetSideBlockWall(cdm)
{
	if(cdm.start){}
	else if(cdm.wall.userData.wall.block.arr.length > 0){}
	else { return; }

	
	var wall = cdm.wall;
	var p = wall.userData.wall.p;
	var dist = p[0].position.distanceTo(p[1].position);	
	
	for(var i = wall.userData.wall.block.arr.length - 1; i > -1; i--)
	{
		scene.remove(wall.userData.wall.block.arr[i]);
	}	
	
	wall.userData.wall.block.arr = [];
	var geometry = wall.userData.wall.block.geometry;
	var material = wall.userData.wall.block.material;
	var size = wall.userData.wall.block.size;
	var height = wall.userData.wall.height_1;
	var seam = wall.userData.wall.block.seam;
	
	
	
	var ps = p[0].position.clone();
	ps.add(new THREE.Vector3(0, 0, (size.z + seam)/2));
	
	
	var pos = [];
	pos[0] = [];
	pos[0][0] = [{p:ps.clone(), r:null}];		// 1 ряд по высоте и ширине
	pos[0][1] = [{p:ps.clone().add(new THREE.Vector3(-size.x/2, 0, 0)), r:null}];	// 2 ряд по высоте и 1 ряд по ширине
	
	
	if(1==2)
	{
		var pos = [];
		//pos[0][0] = [{p:ps.clone(), r:false}];		// 1 ряд по ширине / 1 ряд по высоте / 1 ряд ширине
		
		pos[0] = { pos : new THREE.Vector3() };	
		pos[1] = { pos : new THREE.Vector3(size.z/2, 0, -size.z - seam) };
		
		
		var pos2 = p[0].position.clone();
		
		
		while(height > pos2.y + (size.y+seam))
		{
			
			for(var x = 0; x < pos.length; x++)
			{
				
			}
		}
		
	}			
	
	if(1==1)
	{
		var pos = [];
		pos[0] = [];
		pos[0][0] = [{p:ps.clone(), r:null}];		// 1 ряд по ширине / 1 ряд по высоте / 1 ряд длине
		pos[0][1] = [{p:ps.clone().add(new THREE.Vector3(-size.x/2, 0, 0)), r:null}];	// 1 ряд по ширине / 2 ряд по высоте / 1 ряд длине

		pos[1] = [];
		pos[1][0] = [{p:ps.clone().add(new THREE.Vector3(-size.x/2, 0, -size.z - seam)), r:null}];		// 2 ряд по ширине / 1 ряд по высоте / 1 ряд длине
		pos[1][1] = [{p:ps.clone().add(new THREE.Vector3(0, 0, -size.z - seam)), r:null}];	// 2 ряд по ширине / 2 ряд по высоте / 1 ряд длине			
	}
	
	
	
	for(var z1 = 0; z1 < pos.length; z1++)
	{
		var numY = 0;
		var countY = pos[z1].length;
		var pos2 = pos[z1][0][0];
		
		
		var y1 = 0;
		while (height > pos2.p.y + (size.y+seam))
		{
			if(countY - 1 < numY) numY = 0;
			var numX = 0;
			var countX = pos[z1][numY].length;
			
			var dist2 = 0;
			
			var x1 = 0;
			while (dist > dist2) 
			{
				if(countX - 1 < numX) numX = 0;
				
				pos2 = { p : pos[z1][numY][numX].p.clone(), r : null };
				if(pos[z1][numY][numX].r) { pos2.r = pos[z1][numY][numX].r; }
				
				if(pos2.r){ pos2.p.x += (size.z + seam) * x1; }
				else { pos2.p.x += (size.x + seam) * x1; }
							
				pos2.p.y += (size.y + seam) * y1;			
				
				dist2 = p[0].position.distanceTo(new THREE.Vector3(pos2.p.x+size.x+seam, 0, 0));
				
				var block = new THREE.Mesh( geometry, material );
				
				block.position.copy(pos2.p);
				if(pos2.r) { block.rotation.y = Math.PI/2; }
				
				wall.userData.wall.block.arr[wall.userData.wall.block.arr.length] = block;
				scene.add(block);

				block.userData.tag = 'block_1';
				block.userData.setX = { num : x1, last : (dist > dist2) ? false : true };  
				block.userData.setY = { num : y1, last : (height > pos2.p.y + (size.y+seam)) ? false : true }; 

				numX++;
				x1++;
			}		
			
			numY++;
			y1++;
		}		
		
	}
	
}



// обрезаем кирпичей по краям и сверху стены
function cutSideBlockWall(cdm)
{
	var wall = cdm.wall;
	
	if(wall.userData.wall.block.arr.length == 0) return;
	
	var p = wall.userData.wall.p;
	
	var dist = p[0].position.distanceTo(p[1].position);
	
	// инструмент для резки кирпичей
	var cutWall = infProject.tools.cutWall;
	
	var resize = [{x1: 0, x2 : 1, y1 : -1, y2 : wall.userData.wall.height_1 + 1}];
	resize[1] = {x1: 0, x2 : 1, y1 : -1, y2 : wall.userData.wall.height_1 + 1};
	resize[2] = {x1: -1, x2 : dist + 1, y1 : 0, y2 : 1};
	
	for(var i = 0; i < cutWall.length; i++)
	{
		var v = cutWall[i].geometry.vertices;
		v[0].x = v[1].x = v[2].x = v[3].x = v[4].x = v[5].x = resize[i].x1;
		v[6].x = v[7].x = v[8].x = v[9].x = v[10].x = v[11].x = resize[i].x2;
		
		v[0].y = v[2].y = v[4].y = v[6].y = v[8].y = v[10].y = resize[i].y1;
		v[1].y = v[3].y = v[5].y = v[7].y = v[9].y = v[11].y = resize[i].y2;

		v[0].z = v[1].z = v[6].z = v[7].z = wall.userData.wall.width + 0.5;
		v[4].z = v[5].z = v[10].z = v[11].z = -wall.userData.wall.width - 0.5;
		
		cutWall[i].geometry.verticesNeedUpdate = true; 
		cutWall[i].geometry.elementsNeedUpdate = true;			
	}
	
	var dir = new THREE.Vector3().subVectors( p[1].position, p[0].position ).normalize();
	var dir1 = new THREE.Vector3().addScaledVector ( dir, -0.001 );
	var dir2 = new THREE.Vector3().addScaledVector ( dir, 0.001 );
	
	cutWall[0].position.copy(p[0].position);
	cutWall[0].position.add(dir1);
	cutWall[0].rotation.copy(wall.rotation);
	cutWall[0].position.y -= 0.1;
	cutWall[0].rotation.y += Math.PI;
	
	cutWall[1].position.copy(p[1].position);
	cutWall[1].position.add(dir2);
	cutWall[1].rotation.copy(wall.rotation);
	cutWall[1].position.y -= 0.1; 
	
	cutWall[2].position.copy(wall.position);	
	cutWall[2].rotation.copy(wall.rotation);
	cutWall[2].position.y = wall.userData.wall.height_1;
	cutWall[2].position.y += 0.001;	
	// инструмент для резки кирпичей
	
	
	// обрезаем кирпичи по бокам стены
	var arrB = wall.userData.wall.block.arr;
	
	for ( var i = 0; i < arrB.length; i++ )
	{
		if(arrB[i].geometry.vertices.length == 0) continue;		
		
		var wd2 = null;
		
		if(arrB[i].userData.setX.num == 0) { wd2 = infProject.tools.cutWall[0]; }
		else if(arrB[i].userData.setX.last) { wd2 = infProject.tools.cutWall[1]; }
		else { continue; }
		
		var wdBSP = new ThreeBSP( wd2 );    
		var wallBSP = new ThreeBSP( arrB[i] ); 			// копируем выбранную стену	
		var newBSP = wallBSP.subtract( wdBSP );				// вычитаем из стены объект нужной формы		
		
		arrB[i].geometry = newBSP.toMesh().geometry;
	} 

	// обрезаем края сверху
	for ( var i = 0; i < arrB.length; i++ )
	{
		if(arrB[i].geometry.vertices.length == 0) continue;		
		
		var wd2 = null;
		
		if(arrB[i].userData.setY.last) { wd2 = infProject.tools.cutWall[2]; }
		else { continue; }
		
		var wdBSP = new ThreeBSP( wd2 );    
		var wallBSP = new ThreeBSP( arrB[i] ); 			// копируем выбранную стену	
		var newBSP = wallBSP.subtract( wdBSP );				// вычитаем из стены объект нужной формы		
		
		arrB[i].geometry = newBSP.toMesh().geometry;
	}		
}





