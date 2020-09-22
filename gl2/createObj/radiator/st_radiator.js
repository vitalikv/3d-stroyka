



function st_radiator_1(cdm)
{	
	var size = cdm.size;
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var sizeY = size.y;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3(0, 1, 0);
	
	// доп. расчеты 
	var x_1 = 0.015;			// длина резьбы
	var s1 = 0.02;				// толщина окантовки радиатора
	var s2 = 0.02;				// толщина окантовки ребра (грани)
	var s3 = 0.01;				// глубина ребра
	
	var x2 = (size.y/2 - s1 - d1.n/2) * 2;
	size.y += size.y - x2;  
	
	var w1 = 0.07;				// ширина ребра
	var w2 = w1 - s2*2;  		// ширина внутреннего ребра
	var h1 = size.y - s1*2;		// высота ребра
	var h2 = h1 - s2*2;
	
	
	
	var pr1 = (size.x - s1*2);	// длина проема радиатора
	
	var count = Math.round( pr1 / w1 );		// кол-во ребер
	if(count < 1) count = 1;	
	
	
	var sizeX = pr1 - (count * w1);		// на сколько больше/меньше заполненные ребры, чем проем радиатора
	w1 += sizeX/count;						// на сколько больше/меньше уменьшить одно ребро, чтоб все ребры влезли 

	
	var geom = new THREE.Geometry();
	
	// форма куба без 2-х боковых стенок
	{
		var g1 = new THREE.PlaneGeometry( size.x, size.z );
		g1.rotateX(Math.PI/2);
		g1.translate(0, -size.y/2, 0);
		
		var g2 = new THREE.PlaneGeometry( size.x, size.z );
		g2.rotateX(Math.PI/2);
		g2.translate(0, size.y/2, 0);
		
		var g3 = new THREE.PlaneGeometry( size.y, size.z );	
		g3.rotateZ(Math.PI/2);
		g3.rotateY(Math.PI/2);
		g3.translate(-size.x/2, 0, 0);
		
		var g4 = new THREE.PlaneGeometry( size.y, size.z );	
		g4.rotateZ(Math.PI/2);
		g4.rotateY(Math.PI/2);
		g4.translate(size.x/2, 0, 0);			
	}
	
	// оконтовка фронтальной стороны
	{
		var g5 = new THREE.PlaneGeometry( size.x, s1 );
		g5.translate(0, -size.y/2 + s1/2, size.z/2);
		
		var g6 = new THREE.PlaneGeometry( size.x, s1 );
		g6.translate(0, size.y/2 - s1/2, size.z/2);		

		var g7 = new THREE.PlaneGeometry( size.y, s1 );
		g7.rotateZ(Math.PI/2);
		g7.translate(-size.x/2 + s1/2, 0, size.z/2);

		var g8 = new THREE.PlaneGeometry( size.y, s1 );
		g8.rotateZ(Math.PI/2);
		g8.translate(size.x/2 - s1/2, 0, size.z/2);		
	}

	// оконтовка задней стороны
	{
		var g9 = new THREE.PlaneGeometry( size.x, s1 );
		g9.translate(0, -size.y/2 + s1/2, -size.z/2);
		
		var g10 = new THREE.PlaneGeometry( size.x, s1 );
		g10.translate(0, size.y/2 - s1/2, -size.z/2);		

		var g11 = new THREE.PlaneGeometry( size.y, s1 );
		g11.rotateZ(Math.PI/2);
		g11.translate(-size.x/2 + s1/2, 0, -size.z/2);

		var g12 = new THREE.PlaneGeometry( size.y, s1 );
		g12.rotateZ(Math.PI/2);
		g12.translate(size.x/2 - s1/2, 0, -size.z/2);		
	}
	
	
	// грань фронтальной стороны
	{
		var edge1 = [];
		
		// оконтовка
		edge1[0] = new THREE.PlaneGeometry( w1, s2 );
		edge1[0].translate(0, -h1/2+s2/2, size.z/2);
		
		edge1[1] = new THREE.PlaneGeometry( w1, s2 );
		edge1[1].translate(0, h1/2-s2/2, size.z/2);		

		edge1[2] = new THREE.PlaneGeometry( h1, s2 );
		edge1[2].rotateZ(Math.PI/2);
		edge1[2].translate(-w1/2+s2/2, 0, size.z/2);

		edge1[3] = new THREE.PlaneGeometry( h1, s2 );
		edge1[3].rotateZ(Math.PI/2);
		edge1[3].translate(w1/2-s2/2, 0, size.z/2);

		// внутренние стенки
		edge1[4] = new THREE.PlaneGeometry( w2, s3 );
		edge1[4].rotateX(Math.PI/2);
		edge1[4].translate(0, -h1/2+s2, size.z/2 - s3/2);
		
		edge1[5] = new THREE.PlaneGeometry( w2, s3 );
		edge1[5].rotateX(Math.PI/2);
		edge1[5].translate(0, h1/2-s2, size.z/2 - s3/2);		

		edge1[6] = new THREE.PlaneGeometry( h2, s3 );
		edge1[6].rotateZ(Math.PI/2);
		edge1[6].rotateY(Math.PI/2);
		edge1[6].translate(-w1/2+s2, 0, size.z/2 - s3/2);

		edge1[7] = new THREE.PlaneGeometry( h2, s3 );
		edge1[7].rotateZ(Math.PI/2);
		edge1[7].rotateY(Math.PI/2);
		edge1[7].translate(w1/2-s2, 0, size.z/2 - s3/2);

		// внутренние ребро
		edge1[8] = new THREE.PlaneGeometry( w2, h2 );
		edge1[8].translate(0, 0, size.z/2 - s3);		
	}
	
	// грань задней стороны
	{
		var edge2 = [];
		
		// оконтовка
		edge2[0] = new THREE.PlaneGeometry( w1, s2 );
		edge2[0].translate(0, -h1/2+s2/2, -size.z/2);
		
		edge2[1] = new THREE.PlaneGeometry( w1, s2 );
		edge2[1].translate(0, h1/2-s2/2, -size.z/2);		

		edge2[2] = new THREE.PlaneGeometry( h1, s2 );
		edge2[2].rotateZ(Math.PI/2);
		edge2[2].translate(-w1/2+s2/2, 0, -size.z/2);

		edge2[3] = new THREE.PlaneGeometry( h1, s2 );
		edge2[3].rotateZ(Math.PI/2);
		edge2[3].translate(w1/2-s2/2, 0, -size.z/2);

		// внутренние стенки
		edge2[4] = new THREE.PlaneGeometry( w2, s3 );
		edge2[4].rotateX(Math.PI/2);
		edge2[4].translate(0, -h1/2+s2, -size.z/2 + s3/2);
		
		edge2[5] = new THREE.PlaneGeometry( w2, s3 );
		edge2[5].rotateX(Math.PI/2);
		edge2[5].translate(0, h1/2-s2, -size.z/2 + s3/2);		

		edge2[6] = new THREE.PlaneGeometry( h2, s3 );
		edge2[6].rotateZ(Math.PI/2);
		edge2[6].rotateY(Math.PI/2);
		edge2[6].translate(-w1/2+s2, 0, -size.z/2 + s3/2);

		edge2[7] = new THREE.PlaneGeometry( h2, s3 );
		edge2[7].rotateZ(Math.PI/2);
		edge2[7].rotateY(Math.PI/2);
		edge2[7].translate(w1/2-s2, 0, -size.z/2 + s3/2);

		// внутренние ребро
		edge2[8] = new THREE.PlaneGeometry( w2, h2 );
		edge2[8].translate(0, 0, -size.z/2 + s3);		
	}	
	

	
	geom.merge(g1, g1.matrix, 1);
	geom.merge(g2, g2.matrix, 1);
	geom.merge(g3, g3.matrix, 1);
	geom.merge(g4, g4.matrix, 1);
	
	geom.merge(g5, g5.matrix, 1);
	geom.merge(g6, g6.matrix, 1);
	geom.merge(g7, g7.matrix, 1);
	geom.merge(g8, g8.matrix, 1);
	geom.merge(g9, g9.matrix, 1);
	geom.merge(g10, g10.matrix, 1);
	geom.merge(g11, g11.matrix, 1);
	geom.merge(g12, g12.matrix, 1);


	// устанавливаем 1 ребро с фронтальной стороны в начало 
	for ( var i = 0; i < edge1.length; i++ )
	{
		edge1[i].translate(-size.x/2 + s1 + w1/2, 0, 0);
		
		if(i > 3 && 8 > i) geom.merge(edge1[i], edge1[i].matrix, 2);
		else geom.merge(edge1[i], edge1[i].matrix, 1);	
	}
	
	// копируем и заполняем ребрами фронтальную часть
	for ( var i = 0; i < count - 1; i++ )
	{
		for ( var i2 = 0; i2 < edge1.length; i2++ )
		{
			var gClone = edge1[i2].clone();
			gClone.translate(w1 * (i+1), 0, 0);
			
			if(i2 > 3 && 8 > i2) geom.merge(gClone, gClone.matrix, 2);
			else geom.merge(gClone, gClone.matrix, 1);	
		}		
	}
	

	// устанавливаем 1 ребро с задней стороны в начало 
	for ( var i = 0; i < edge2.length; i++ )
	{
		edge2[i].translate(-size.x/2 + s1 + w1/2, 0, 0);
		
		if(i > 3 && 8 > i) geom.merge(edge2[i], edge2[i].matrix, 2);
		else geom.merge(edge2[i], edge2[i].matrix, 1);	
	}
	
	// копируем и заполняем ребрами заднюю часть
	for ( var i = 0; i < count - 1; i++ )
	{
		for ( var i2 = 0; i2 < edge2.length; i2++ )
		{
			var gClone = edge2[i2].clone();
			gClone.translate(w1 * (i+1), 0, 0);
			
			if(i2 > 3 && 8 > i2) geom.merge(gClone, gClone.matrix, 2);
			else geom.merge(gClone, gClone.matrix, 1);	
		}		
	}


	// трубы (разъемы)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 3, 0, 0] };
		inf.pos = { x: -(size.x/2 + x_1/2), y: size.y/2 - s1 - d1.n/2, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
		
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 3, 0, 0] };
		inf.pos = { x: (size.x/2 + x_1/2), y: size.y/2 - s1 - d1.n/2, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
		
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 3, 0, 0] };
		inf.pos = { x: (size.x/2 + x_1/2), y: -size.y/2 + s1 + d1.n/2, z: 0 };
		var poM3 = crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 3, 0, 0] };
		inf.pos = { x: -(size.x/2 + x_1/2), y: -size.y/2 + s1 + d1.n/2, z: 0 };
		var poM4 = crFormSleeve_1(inf);					
	}

	//geom.computeBoundingBox();
	//console.log(4444, geom.boundingBox.max.z - geom.boundingBox.min.z);
	//console.log('dist', poM2.pos.y - poM3.pos.y );
	
	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.white_1; 
	mat[2] = infProject.material.white_2;
	mat[3] = infProject.material.rezba_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(в)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name1 };
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, 0, 0), name: name1 };
	arrP[arrP.length] = { pos: poM4.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}		

	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Ст.радиатор '+'h'+(sizeY*1000)+' ('+size.x+'м)';
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	if(cdm.demo)
	{
		scene.add( obj );
		obj.position.copy(offset);		
		infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;		
	}


	return obj;
}











