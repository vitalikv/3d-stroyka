


// полипропиленвый угол 90
function pl_ugol_90_1(cdm)
{
	var d1 = sizeTubePP({size: cdm.r1});	
	
	var m1 = cdm.m1;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = m1 - x_1;

	
	var geom = new THREE.Geometry();
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: x_2/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: x_2 + x_1/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}	
	

	// вертикальная труба 
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: x_2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: x_2 + x_1/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);		
	}

	// сфера в виде угла
	{		
		crSphere_2({g: geom, radius: d1.n/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2});	// нр			
		crSphere_2({g: geom, radius: d1.v/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2});	// вн			
	}	
	
	
	var mat = [];
	mat[0] = infProject.material.white_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	
	var arrP = [];
	arrP[arrP.length] = { pos: new THREE.Vector3(0, x_2 + x_1/2, 0), rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name1 };
	arrP[arrP.length] = { pos: new THREE.Vector3(x_2 + x_1/2, 0, 0), rot: new THREE.Vector3(0, 0, 0), name: name1 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}
	
	scene.add( obj );
	obj.position.copy(offset);	
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Угол '+name1;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}



// полипропиленвый угол 45
function pl_ugol_45_1(cdm)
{
	var size = sizeTubePP({size: cdm.inch});
	
	var length_1 = cdm.dlina;
	//var length_2 = 0.1;
	var diameter_nr = size.n;
	var diameter_vn = size.v;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
		
	var x_1 = 0.015;
	var x_2 = length_1 - x_1;
	//var x_3 = length_2 - x_1;
	var x_4 = diameter_nr / 10;
	var x_5 = diameter_nr / 10;
	
	var name = cdm.inch;	
	
	var group = new THREE.Group();
	
	var arrP = [];
	
	var white_1 = { nr: infProject.material.white_1, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	
	
	// труба под 45 градусов
	{
		// 1-ый кусок 
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: white_1 };	
		var obj = createSleeveObj_2(inf);		
		 		
		if(1==1)
		{
			obj.position.x -= x_2/2;
			obj.position.applyAxisAngle(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4); 							
			obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4);			
		}

		group.add( obj );		
		
		
		// резьба
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: white_1 };	
		var obj = createSleeveObj_2(inf);		
		
		if(1==1)
		{
			obj.position.x -= x_2 + x_1/2;
			obj.position.applyAxisAngle(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4); 							
			obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4);
			//obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), Math.PI);
			obj.rotateOnAxis(new THREE.Vector3( 0, 1, 0 ), -Math.PI); 
		}
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );		
	}		

	// труба горизонтальная
	{	
		// 1-ый кусок 
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: white_1 };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_2/2;
		group.add( obj );			
		
		// резьба
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: white_1 };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_2 + x_1/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );
	}		
	
	// сфера в виде угла
	{
		// нр
		var obj = crSphere_1({radius: diameter_nr/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4, material: infProject.material.white_1});	
		group.add( obj );

		// вн
		var obj = crSphere_1({radius: diameter_vn/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4, material: infProject.material.white_1});			
		group.add( obj );
	}
	
	


	var obj = getBoundObject_1({obj: group});

	for ( var i = 0; i < arrP.length; i++ )
	{
		cr_CenterPoint({obj: obj, pos: arrP[i].pos, q: arrP[i].q, name: arrP[i].name, id: i});
	}
	
	scene.add( obj );
	obj.position.copy(offset);	
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Отвод_45 '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}


// полипропиленвый угол с одной резьбой по центру
function pl_ugol_90_rezba_1(cdm)
{
	var d1 = sizeTubePP({size: cdm.r1});	
	
	var m1 = cdm.m1;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = m1 - x_1;
	
	if(cdm.side == 'v') 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'v'});
		var txt = '(в)';
		var matRezba = [2, 3, 2, 2];
		var posX = x_2 + x_1/2 + 0.0005;
	}
	else 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'n'});
		var txt = '(н)';
		var matRezba = [3, 2, 2, 2];
		var posX = x_2 + x_1 + x_1/2;
	}	
	
	var d_vn = d2.n;
	var d_nr = d_vn + (d1.n - d1.v) + 0.004;
	if(d_nr < d1.n + 0.004) 
	{
		d_nr = d1.n + 0.004;
	}	

	
	var geom = new THREE.Geometry();
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: x_2/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1, diameter_nr: d_nr, diameter_vn: d_vn, edge_nr: 12, ind: [1, 0, 0, 0] };
		inf.pos = { x: x_2 + x_1/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1, diameter_nr: d2.n, diameter_vn: d2.v, ind: matRezba };
		inf.pos = { x: posX, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}	
	

	// вертикальная труба 
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: x_2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: x_2 + x_1/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);
	}

	// сфера в виде угла
	{		
		crSphere_2({g: geom, radius: d1.n/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2});	// нр			
		crSphere_2({g: geom, radius: d1.v/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2});	// вн			
	}	
	
	
	var mat = [];
	mat[0] = infProject.material.white_1;
	mat[1] = infProject.material.white_1_edge;
	mat[2] = infProject.material.metal_1;
	mat[3] = infProject.material.rezba_1;	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	var name2 = cdm.r2+txt;
	
	var arrP = [];
	arrP[arrP.length] = { pos: new THREE.Vector3(0, x_2 + x_1/2, 0), rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name1 };
	arrP[arrP.length] = { pos: new THREE.Vector3(posX, 0, 0), rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}
	
	scene.add( obj );
	obj.position.copy(offset);	
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Угол '+name1+'x'+name2;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}







