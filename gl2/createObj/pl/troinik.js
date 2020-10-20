



// полипропиленвый тройник
function pl_troinik_1(cdm)  
{	
	var d1 = sizeTubePP({size: cdm.r1});	
	
	var m1 = cdm.m1;
	var m2 = m1/2;
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = m1 - x_1 * 2;
	var x_3 = m2 - x_1;

	
	var geom = new THREE.Geometry();
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: m1, diameter_nr: d1.n, diameter_vn: d1.v };
		crFormSleeve_1(inf);													
	}	
	

	// вертикальная труба 
	{
		var inf = { g: geom, dlina: m2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: m2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);					
	}	
	
	
	var mat = [];
	mat[0] = infProject.material.white_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	
	var arrP = [];
	arrP[arrP.length] = { pos: new THREE.Vector3(-(x_2 + x_1)/2, 0, 0), rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: new THREE.Vector3(0, x_3 + x_1/2, 0), rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name1 };
	arrP[arrP.length] = { pos: new THREE.Vector3((x_2 + x_1)/2, 0, 0), rot: new THREE.Vector3(0, 0, 0), name: name1 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}
	
	
	cdm.name = 'Тройник '+name1;
	
	assignObjParams(obj, cdm);

	return obj;	
}






// полипропиленвый тройник с одной резьбой по центру
function pl_troinik_rezba_1(cdm)  
{	
	var d1 = sizeTubePP({size: cdm.r1});	
	
	var m1 = cdm.m1;
	var m2 = m1/2;
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = m1 - x_1 * 2;
	var x_3 = m2 - x_1;
	
	if(cdm.side == 'v') 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'v'});
		var txt = '(в)';
		var matRezba = [2, 3, 2, 2];
		var posY = x_3 + x_1/2 + 0.0005;
	}
	else 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'n'});
		var txt = '(н)';
		var matRezba = [3, 2, 2, 2];
		var posY = x_3 + x_1 + x_1/2;
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
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -(x_2 + x_1)/2, y: 0, z: 0 };
		crFormSleeve_1(inf);					

		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		crFormSleeve_1(inf);						

		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: (x_2 + x_1)/2, y: 0, z: 0 };
		crFormSleeve_1(inf);							
	}	
	

	// вертикальная труба 
	{
		var inf = { g: geom, dlina: x_3, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: x_3/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);			
		
		var inf = { g: geom, dlina: x_1, diameter_nr: d_nr, diameter_vn: d_vn, edge_nr: 12, ind: [1, 0, 0, 0] };
		inf.pos = { x: 0, y: x_3 + x_1/2, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1, diameter_nr: d2.n, diameter_vn: d2.v, ind: matRezba };
		inf.pos = { x: 0, y: posY, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		crFormSleeve_1(inf);		
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
	arrP[arrP.length] = { pos: new THREE.Vector3(-(x_2 + x_1)/2, 0, 0), rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: new THREE.Vector3(0, posY, 0), rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name2 };
	arrP[arrP.length] = { pos: new THREE.Vector3((x_2 + x_1)/2, 0, 0), rot: new THREE.Vector3(0, 0, 0), name: name1 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}
	
	
	cdm.name = 'Тройник '+name1+'x'+name2+'x'+name1;
	
	assignObjParams(obj, cdm);

	return obj;	
}





// полипропиленвый переходной тройник
function pl_troinik_2(cdm)  
{	
	var d1 = sizeTubePP({size: cdm.r1});	// левый разъем
	var d2 = sizeTubePP({size: cdm.r2}); 	// верхний
	var d3 = sizeTubePP({size: cdm.r3});	// правый
	
	var dc = d1;
	if(dc.n < d2.n) dc = d2;
	if(dc.n < d3.n) dc = d3;
	
	var m1 = cdm.m1;
	var m2 = cdm.m2;		
	 
	
	// доп. расчеты		
	var x_1 = 0.020;
	var x_2 = m1 - x_1 * 2;
	var x_3 = (m2 + dc.n/2) - x_1;	
	
	
	var geom = new THREE.Geometry();
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -(x_2 + x_1)/2, y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);					

		var inf = { g: geom, dlina: x_2/2, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d1.n, d_v2: d1.v };
		inf.pos = { x: -x_2/2/2, y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: x_2/2, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d3.n, d_v2: d3.v };
		inf.pos = { x: x_2/2/2, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: 0 };
		crFormSleeve_1(inf);						

		var inf = { g: geom, dlina: x_1, diameter_nr: d3.n, diameter_vn: d3.v };
		inf.pos = { x: (x_2 + x_1)/2, y: 0, z: 0 };
		var poM3 = crFormSleeve_1(inf);							
	}

	
	// вертикальная труба 
	{
		var inf = { g: geom, dlina: x_3, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d2.n, d_v2: d2.v };
		inf.pos = { x: 0, y: x_3/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);			
		
		var inf = { g: geom, dlina: x_1, diameter_nr: d2.n, diameter_vn: d2.v };
		inf.pos = { x: 0, y: x_1/2 + x_3, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		var poM2 = crFormSleeve_1(inf);			
	}
	

	var mat = [];
	mat[0] = infProject.material.white_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	var name2 = cdm.r2;
	var name3 = cdm.r3;	
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name2 };
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, 0, 0), name: name3 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	
	
	
	cdm.name = 'Тройник '+name1+'x'+name2+'x'+name3;
	
	assignObjParams(obj, cdm);

	return obj;
}





