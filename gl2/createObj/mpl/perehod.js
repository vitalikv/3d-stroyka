

// металлопластиковый соединитель
function mpl_perehod_1(cdm)   
{	
	var d1 = sizeTubeMP({size: cdm.r1});	// левый разъем
	var d3 = sizeTubeMP({size: cdm.r3});	// правый
	
	var dc = d1;
	if(dc.n < d3.n) dc = d3;
	
	var m1 = cdm.m1;		
	 
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var w1 = 0.030 * d1.n * 30;
	var w3 = 0.030 * d3.n * 30;
	
	if(w1 < 0.025) { w1 = 0.025; }
	if(w3 < 0.025) { w3 = 0.025; }
	
	var s1 = (m1/2 - w1)/2;
	var s3 = (m1/2 - w3)/2;
	var w12 = 0.0025;
	
	var h1 = 0.005;
	var h2 = 0.0025;
	
	var tb1 = {};
	var tb3 = {};
	
	tb1.n = d1.n/2;
	tb1.v = d1.n/2 - (0.005 * d1.n * 30);

	tb3.n = d3.n/2;
	tb3.v = d3.n/2 - (0.005 * d3.n * 30);	
	
	
	var geom = new THREE.Geometry();
	
		
	// соединитель
	{
		var inf = { g: geom, dlina: w1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [2, 2, 2, 2] };
		inf.pos = { x: -(s1*2 + w1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	

		var inf = { g: geom, dlina: w1, diameter_nr: tb1.n, diameter_vn: tb1.v };
		inf.pos = { x: -(s1*2 + w1/2), y: 0, z: 0 };
		crFormSleeve_1(inf);
	}
	
	// красные заглушки
	{
		var inf = { g: geom, dlina: w12, diameter_nr: d1.n + h1, diameter_vn: tb1.n, ind: [1, 1, 1, 1] };
		inf.pos = { x: -(s1*2 + w12 + w12/2), y: 0, z: 0 };
		crFormSleeve_1(inf);					

		var inf = { g: geom, dlina: w12, diameter_nr: d1.n + h2, diameter_vn: tb1.n, ind: [1, 1, 1, 1] };
		inf.pos = { x: -(s1*2 + w12/2), y: 0, z: 0 };
		crFormSleeve_1(inf);						
	}
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: s1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -(s1 + s1/2), y: 0, z: 0 };
		crFormSleeve_1(inf);					

		var inf = { g: geom, dlina: s1, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d1.n, d_v2: d1.v };
		inf.pos = { x: -s1/2, y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: s3, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d3.n, d_v2: d3.v };
		inf.pos = { x: s3/2, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: 0 };
		crFormSleeve_1(inf);						

		var inf = { g: geom, dlina: s3, diameter_nr: d3.n, diameter_vn: d3.v };
		inf.pos = { x: (s3 + s3/2), y: 0, z: 0 };
		crFormSleeve_1(inf);							
	}
	
	
	// красные заглушки
	{
		var inf = { g: geom, dlina: w12, diameter_nr: d3.n + h2, diameter_vn: tb3.n, ind: [1, 1, 1, 1] };
		inf.pos = { x: (s3*2 + w12/2), y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: w12, diameter_nr: d3.n + h1, diameter_vn: tb3.n, ind: [1, 1, 1, 1] };
		inf.pos = { x: (s3*2 + w12 + w12/2), y: 0, z: 0 };
		crFormSleeve_1(inf);											
	}

	// соединитель
	{
		var inf = { g: geom, dlina: w3, diameter_nr: d3.n, diameter_vn: d3.v, ind: [2, 2, 2, 2] };
		inf.pos = { x: (s3*2 + w3/2), y: 0, z: 0 };
		var poM3 = crFormSleeve_1(inf);	

		var inf = { g: geom, dlina: w3, diameter_nr: tb3.n, diameter_vn: tb3.v };
		inf.pos = { x: (s3*2 + w3/2), y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}	

	

	var mat = [];
	mat[0] = infProject.material.bronz_1;
	mat[1] = infProject.material.red_1;
	mat[2] = infProject.material.metal_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	var name2 = cdm.r3;	
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
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
	var name = (name1==name2) ? 'Соединитель '+name1 :  'Соединитель '+name1+'x'+name2;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}





// металлопластиковый соединитель
function mpl_perehod_rezba_1(cdm)   
{	
	var d1 = sizeTubeMP({size: cdm.r1});	// правый
	
	var m1 = cdm.m1;		
	 
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	if(cdm.side == 'v') 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'v'});
		var txt = '(в)';
		var matRezba = [0, 3, 0, 0];
	}
	else 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'n'});
		var txt = '(н)';
		var matRezba = [3, 0, 0, 0];
	}	
	
	var w1 = 0.030 * d1.n * 30;
	if(w1 < 0.020) { w1 = 0.020; }  var dfg = w1;
	
	var w2 = 0.015;	
	var w12 = 0.0025;
	
	var s1 = (m1/2 - w1);
	var s2 = (m1/2 - w2);
	var s3 = s2 - w12;
	
	if(s1 < 0.001) { s1 = 0.001; w1 = (m1/2 - s1); }
	
	var tb1 = {};
	tb1.n = d1.n/2;
	tb1.v = d1.n/2 - (0.005 * d1.n * 30);
	
	var tb2 = {};
	tb2.n = d2.n/2;
	tb2.v = d2.n/2 - (0.005 * d2.n * 30);	
	
	
	var geom = new THREE.Geometry();
	
		
	// соединитель
	{
		var inf = { g: geom, dlina: w1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [4, 4, 4, 4] };
		inf.pos = { x: -(s1 + w1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	

		var inf = { g: geom, dlina: w1, diameter_nr: tb1.n, diameter_vn: tb1.v };
		inf.pos = { x: -(s1 + w1/2), y: 0, z: 0 };
		crFormSleeve_1(inf);			
	}	
	
	// красные заглушки
	{
		var inf = { g: geom, dlina: w12, diameter_nr: d1.n + 0.005, diameter_vn: tb1.n, ind: [1, 1, 1, 1] };
		inf.pos = { x: -(s1 + w12 + w12/2), y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: w12, diameter_nr: d1.n + 0.0025, diameter_vn: tb1.n, ind: [1, 1, 1, 1] };
		inf.pos = { x: -(s1 + w12/2), y: 0, z: 0 };
		crFormSleeve_1(inf);													
	}		
	
	
	// труба горизонтальная
	{		
		var inf = { g: geom, dlina: s1, diameter_nr: d1.n, diameter_vn: d1.v, d_n2: d1.n, d_v2: d1.v };
		inf.pos = { x: -s1/2, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: 0 };
		crFormSleeve_1(inf);													
	}

	
	// гайка
	{
		var inf = { g: geom, dlina: w12, diameter_nr: d2.n + 0.0025, diameter_vn: tb2.n, ind: [2, 0, 0, 0] };
		inf.pos = { x: (0 + w12/2), y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: s3, diameter_nr: d2.n + 0.01, diameter_vn: tb2.n, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: (0 + w12 + s3/2), y: 0, z: 0 };
		crFormSleeve_1(inf);											
	}
	
	// резьба
	{
		var inf = { g: geom, dlina: w2, diameter_nr: d2.n, diameter_vn: d2.v, ind: matRezba };
		inf.pos = { x: (s2 + w2/2), y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
	}	
	

	var mat = [];
	mat[0] = infProject.material.bronz_1;
	mat[1] = infProject.material.red_1;
	mat[2] = infProject.material.bronz_1_edge;
	mat[3] = infProject.material.rezba_2;	 	
	mat[4] = infProject.material.metal_1;
	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	var name2 = cdm.r2+txt;	
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
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
	var name = 'Соединитель '+name1+'x'+name2;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}




