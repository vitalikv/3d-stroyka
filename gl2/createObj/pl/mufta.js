

// полипропиленовая муфта
function pl_mufta_1(cdm)   
{	
	var d1 = sizeTubePP({size: cdm.r1});
	var d2 = sizeTubePP({size: cdm.r2});	
	
	var m1 = cdm.m1;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.015 * d1.n*20;
	var x_2 = 0.015 * d2.n*20;

	if(x_1 < 0.012) { x_1 = 0.012; }
	if(x_2 < 0.012) { x_2 = 0.012; }

	
	var x_3L = m1/2 - x_1;
	var x_3R = m1/2 - x_2;
	
	var x_4 = (d1.n > d2.n) ? d1.n/7 : d2.n/7;
	
	var d_nr = (d1.n > d2.n) ? d1.n : d2.n;
	var d_vn = (d1.v < d2.v) ? d1.v : d2.v; 
	
	
	var geom = new THREE.Geometry();	
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -(x_3L + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_3L, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -x_3L/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
	// центр
	{
		var inf = { g: geom, dlina: x_4, diameter_nr: d_nr, diameter_vn: d_vn };
		crFormSleeve_1(inf);		
	}	

	// труба правая часть
	{
		var inf = { g: geom, dlina: x_3R, diameter_nr: d2.n, diameter_vn: d2.v };
		inf.pos = { x: x_3R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_2, diameter_nr: d2.n, diameter_vn: d2.v };
		inf.pos = { x: x_3R + x_2/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}


	var mat = [];
	mat[0] = infProject.material.white_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	var name2 = cdm.r2;
	
	var arrP = [];
	arrP[arrP.length] = { pos: new THREE.Vector3(-(x_3L + x_1/2), 0, 0), rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: new THREE.Vector3(x_3R + x_2/2, 0, 0), rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
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
	var name = (cdm.r1 != cdm.r2) ? 'Муфта '+name1+'х'+name2 : 'Муфта '+name1;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}






// полипропиленовый соединитель с резьбой 
function pl_perehod_rezba_1(cdm)   
{	
	var d1 = sizeTubePP({size: cdm.r1});

	if(cdm.side == 'v') 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'v'});
	}
	else 
	{ 
		var d2 = sizeRezba({size: cdm.r2, side: 'n'});
	}	
	
	var m1 = cdm.m1;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	// доп. расчеты 
	var x_1 = 0.015 * d1.n*20;
	var x_2 = 0.015 * d2.n*20;

	if(x_1 < 0.012) { x_1 = 0.012; }
	if(x_2 < 0.012) { x_2 = 0.012; }

	
	var x_3L = m1/2 - x_1;
	var x_3R = m1/2 - x_2; 
	
	if(cdm.side == 'v') 
	{ 
		var txt = '(в)';
		var matRezba = [2, 3, 2, 2];
		var posX = x_3R + x_2/2 + 0.0005;
	}
	else 
	{ 
		var txt = '(н)';
		var matRezba = [3, 2, 2, 2];
		var posX = x_3R + x_2 + x_2/2;
	}	
	
	var d_vn = d2.n;
	var d_nr = d_vn + (d1.n - d1.v) + 0.004;
	if(d_nr < d1.n + 0.004) 
	{
		d_nr = d1.n + 0.004;
	}
	
	var x_4 = (d1.n > d2.n) ? d1.n/7 : d2.n/7;
	
	
	var geom = new THREE.Geometry();	
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -(x_3L + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_3L, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -x_3L/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
	// центр
	{
		var inf = { g: geom, dlina: x_4, diameter_nr: d_nr, diameter_vn: d_vn };
		crFormSleeve_1(inf);		
	}	

	// труба правая часть
	{
		var inf = { g: geom, dlina: x_3R, diameter_nr: d_nr, diameter_vn: d_vn };
		inf.pos = { x: x_3R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_2, diameter_nr: d_nr, diameter_vn: d_vn, edge_nr: 12, ind: [1, 0, 0, 0] };
		inf.pos = { x: x_3R + x_2/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_2, diameter_nr: d2.n, diameter_vn: d2.v, ind: matRezba };
		inf.pos = { x: posX, y: 0, z: 0 };
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
	arrP[arrP.length] = { pos: new THREE.Vector3(-(x_3L + x_1/2), 0, 0), rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
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
	var name = 'Соединитель '+name1+'х'+name2;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}


