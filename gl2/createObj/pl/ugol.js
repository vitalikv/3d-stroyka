


// полипропиленвый угол 90
function pl_ugol_90_1(cdm)
{
	var d1 = sizeTubePP({size: cdm.r1});	
	
	var m1 = cdm.m1;
	
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
	
	
	cdm.name = 'Угол '+name1;
	
	assignObjParams(obj, cdm);

	return obj;
}





// полипропиленвый угол 45
function pl_ugol_45_1(cdm)
{
	var d1 = sizeTubePP({size: cdm.r1});	
	
	var m1 = cdm.m1;
	
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
		var poM1 = crFormSleeve_1(inf);		
	}	
	

	// труба 45
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos1 = { x: -x_2/2, y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		crFormSleeve_1(inf);			

		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos1 = { x: -(x_2 + x_1/2), y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		var poM2 = crFormSleeve_1(inf);	 
	}

	// сфера в виде угла
	{		
		crSphere_2({g: geom, radius: d1.n/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4});	// нр			
		crSphere_2({g: geom, radius: d1.v/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4});	// вн			
	}	
	
	
	var mat = [];
	mat[0] = infProject.material.white_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, Math.PI, THREE.Math.degToRad( 45 )), name: name1 };
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, 0, 0), name: name1 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}
	
	
	cdm.name = 'Отвод_45 '+name1;
	
	assignObjParams(obj, cdm);

	return obj;	 
}






// полипропиленвый угол с одной резьбой по центру
function pl_ugol_90_rezba_1(cdm)
{
	var d1 = sizeTubePP({size: cdm.r1});	
	
	var m1 = cdm.m1;
	
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
	
	
	cdm.name = 'Угол '+name1+'x'+name2;
	
	assignObjParams(obj, cdm);

	return obj;
}





