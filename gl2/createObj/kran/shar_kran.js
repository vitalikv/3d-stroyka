


// шаровой кран (в-в)
function shar_kran_v_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});		
	
	var m1 = cdm.m1;
	var t1 = cdm.t1;	// длина бабочки
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	if(x_1 < 0.012) { x_1 = 0.012; }
	
	var x_1L = (m1/2 - x_1)/2;
	var x_2L = (m1/2 - x_1)/2;
	var x_1R = 0.002;
	var x_2R = m1/2 - x_1R - x_1;
	
	var h1 = 0.015 * d1.n*20;		// высота штекира на кором находится бабочка
	if(h1 < 0.015) { h1 = 0.015; }
	h1 += 0.015;
	
	var w1 = 0.005;					// толщина бабочки
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	
	
	var geom = new THREE.Geometry();	
	
	// гайка
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L+ x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 		
	}	

	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L+ x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
	}
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_2L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -(x_1L + x_2L/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -x_1L/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
		//var inf = { g: geom, dlina: m1, diameter_nr: d1.n, diameter_vn: d1.v };
		//inf.pos = { x: 0, y: 0, z: 0.04 };
		//crFormSleeve_1(inf);
		
	// вертикальная труба 
	{
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.015, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.01, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);		

		var inf = { g: geom, dlina: 0.01, diameter_nr: 0.013, diameter_vn: 0.011, d_n2: 0.021, d_v2: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: 0.006, diameter_nr: 0.021, diameter_vn: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01 - 0.006/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
	}			
		
	// труба правая часть
	{
		var inf = { g: geom, dlina: x_1R, diameter_nr: d1.n+0.015, diameter_vn: d1.v, d_n2: d1.n+0.01, d_v2: d1.v };
		inf.pos = { x: x_1R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_2R, diameter_nr: d1.n+0.015, diameter_vn: d1.v };
		inf.pos = { x: x_1R + x_2R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);	 	
	}

	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: (x_1R + x_2R+ x_1/2), y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
	}	
	
	// гайка
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: (x_1R + x_2R+ x_1/2), y: 0, z: 0 }; 
		crFormSleeve_1(inf);		
	}	
	
	
	// бабочка
	{
		var gShape = shar_kran_babochka_1({t1: t1, w1: w1, pos: { x: 0, y: (d1.v/2 + h1 - 0.01 - 0.006/2), z: -w1/2 }});
		geom.merge(gShape, gShape.matrix, 3);
	}	
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	mat[3] = infProject.material.red_1;
	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(в)';
	var name2 = cdm.r1+'(в)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	

	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Шаровой кран '+cdm.r1+'(в-в)';
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




// шаровой кран (н-н)
function shar_kran_n_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'n'});		
	
	var m1 = cdm.m1;
	var t1 = cdm.t1;	// длина бабочки
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	if(x_1 < 0.012) { x_1 = 0.012; }
	
	var x_2 = 0.01 * d1.n*20;
	
	var x_1L = (m1/2 - x_2 - x_1)/2;
	var x_2L = x_1L;
	var x_1R = 0.002;
	var x_2R = m1/2 - x_1R - x_2 - x_1;
	
	var h1 = 0.015 * d1.n*20;		// высота штекира на кором находится бабочка
	if(h1 < 0.015) { h1 = 0.015; }
	h1 += 0.015;
	
	var w1 = 0.005;					// толщина бабочки
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	
	
	var geom = new THREE.Geometry();	
	

	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L+ x_2+ x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
	}
	
	// гайка
	{		
		var inf = { g: geom, dlina: x_2, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L+ x_2/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 		
	}	
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_2L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -(x_1L + x_2L/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -x_1L/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}

		
	// вертикальная труба 
	{
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.015, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.01, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);		

		var inf = { g: geom, dlina: 0.01, diameter_nr: 0.013, diameter_vn: 0.011, d_n2: 0.021, d_v2: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: 0.006, diameter_nr: 0.021, diameter_vn: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01 - 0.006/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
	}			
		
	// труба правая часть
	{
		var inf = { g: geom, dlina: x_1R, diameter_nr: d1.n+0.015, diameter_vn: d1.v, d_n2: d1.n+0.01, d_v2: d1.v };
		inf.pos = { x: x_1R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_2R, diameter_nr: d1.n+0.015, diameter_vn: d1.v };
		inf.pos = { x: x_1R + x_2R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);	 	
	}
	
	// гайка
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: (x_1R + x_2R+ x_2/2), y: 0, z: 0 }; 
		crFormSleeve_1(inf);		
	}

	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: (x_1R + x_2R+ x_2+ x_1/2), y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
	}	
	
	
	// бабочка
	{
		var gShape = shar_kran_babochka_1({t1: t1, w1: w1, pos: { x: 0, y: (d1.v/2 + h1 - 0.01 - 0.006/2), z: -w1/2 }});		
		geom.merge(gShape, gShape.matrix, 3);
	}
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	mat[3] = infProject.material.red_1;

	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(н)';
	var name2 = cdm.r1+'(н)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	

	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Шаровой кран '+cdm.r1+'(н-н)';
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




// шаровой кран (в-н)
function shar_kran_v_n_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var d2 = sizeRezba({size: cdm.r1, side: 'n'});
	
	var m1 = cdm.m1;
	var t1 = cdm.t1;	// длина бабочки
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	if(x_1 < 0.012) { x_1 = 0.012; }
	
	var x_2 = 0.01 * d1.n*20;
	
	var x_1L = (m1/2 - x_1)/2;
	var x_2L = x_1L;
	var x_1R = 0.002;
	var x_2R = m1/2 - x_1R - x_2 - x_1;
	
	var h1 = 0.015 * d1.n*20;		// высота штекира на кором находится бабочка
	if(h1 < 0.015) { h1 = 0.015; }
	h1 += 0.015;
	
	var w1 = 0.005;					// толщина бабочки
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	
	
	var geom = new THREE.Geometry();	
	
	
	// гайка
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 		
	}	
	
	// резьба (в)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L + x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
	}	
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_2L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -(x_1L + x_2L/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -x_1L/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
		//var inf = { g: geom, dlina: m1, diameter_nr: d1.n, diameter_vn: d1.v };
		//inf.pos = { x: 0, y: 0, z: 0.04 };
		//crFormSleeve_1(inf);
		
	// вертикальная труба 
	{
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.015, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.01, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);		

		var inf = { g: geom, dlina: 0.01, diameter_nr: 0.013, diameter_vn: 0.011, d_n2: 0.021, d_v2: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: 0.006, diameter_nr: 0.021, diameter_vn: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01 - 0.006/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
	}			
		
	// труба правая часть
	{
		var inf = { g: geom, dlina: x_1R, diameter_nr: d1.n+0.015, diameter_vn: d1.v, d_n2: d1.n+0.01, d_v2: d1.v };
		inf.pos = { x: x_1R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_2R, diameter_nr: d1.n+0.015, diameter_vn: d1.v };
		inf.pos = { x: x_1R + x_2R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);	 	
	}
	
	// гайка
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: (x_1R + x_2R+ x_2/2), y: 0, z: 0 }; 
		crFormSleeve_1(inf);		
	}

	// резьба (н)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: (x_1R + x_2R+ x_2+ x_1/2), y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
	}	
	
	
	// бабочка
	{
		var gShape = shar_kran_babochka_1({t1: t1, w1: w1, pos: { x: 0, y: (d1.v/2 + h1 - 0.01 - 0.006/2), z: -w1/2 }});
		geom.merge(gShape, gShape.matrix, 3);
	}
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	mat[3] = infProject.material.red_1;
	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(в)';
	var name2 = cdm.r1+'(н)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	

	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Шаровой кран '+cdm.r1+'(в-н)';
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




// шаровой кран с полусгоном
function shar_kran_sgon_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var d2 = sizeRezba({size: cdm.r2, side: 'n'});
	
	var m1 = cdm.m1;
	var t1 = cdm.t1;	// длина бабочки
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	if(x_1 < 0.012) { x_1 = 0.012; }
	
	var x_2 = 0.01 * d1.n*20;
	
	var x_1L = (m1/2 - x_1)/2;
	var x_2L = x_1L;
	var x_1R = 0.002;
	var x_2R = m1/2 - x_1R - x_2 - x_1;
	
	var h1 = 0.015 * d1.n*20;		// высота штекира на кором находится бабочка
	if(h1 < 0.015) { h1 = 0.015; }
	h1 += 0.015;
	
	var w1 = 0.005;					// толщина бабочки
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	
	
	var geom = new THREE.Geometry();	
	
	
	// гайка
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 		
	}	
	
	// резьба (в)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: -(x_1L + x_2L + x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
	}	
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_2L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -(x_1L + x_2L/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1L, diameter_nr: d1.n+0.01, diameter_vn: d1.v };
		inf.pos = { x: -x_1L/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
		//var inf = { g: geom, dlina: m1, diameter_nr: d1.n, diameter_vn: d1.v };
		//inf.pos = { x: 0, y: 0, z: 0.04 };
		//crFormSleeve_1(inf);
		
	// вертикальная труба 
	{
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.015, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: h1/2, diameter_nr: 0.01, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: d1.v/2 + h1/2 + h1/2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);		

		var inf = { g: geom, dlina: 0.01, diameter_nr: 0.013, diameter_vn: 0.011, d_n2: 0.021, d_v2: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: 0.006, diameter_nr: 0.021, diameter_vn: 0.019, ind: [3, 3, 3, 3] };
		inf.pos = { x: 0, y: d1.v/2 + h1 - 0.01 - 0.006/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
	}			
		
	// труба правая часть
	{
		var inf = { g: geom, dlina: x_1R, diameter_nr: d1.n+0.015, diameter_vn: d1.v, d_n2: d1.n+0.01, d_v2: d1.v };
		inf.pos = { x: x_1R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_2R, diameter_nr: d1.n+0.015, diameter_vn: d1.v };
		inf.pos = { x: x_1R + x_2R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);	 	
	}
	

	// резьба (н)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: (x_1R + x_2R + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf);	
	}	
	
	// сгон 
	{
		var poM2 = shar_kran_obj_sgon_1({ geom: geom, r1: cdm.r2, r2: cdm.r1, m1: cdm.m2, offsetX: (x_1R + x_2R + x_1*0.1 ) });
	}
	
	// бабочка
	{
		var gShape = shar_kran_babochka_1({t1: t1, w1: w1, pos: { x: 0, y: (d1.v/2 + h1 - 0.01 - 0.006/2), z: -w1/2 }});
		geom.merge(gShape, gShape.matrix, 3);
	}
	
	//geom.computeBoundingBox();
	//console.log(cdm.r1+' BoundingBox', geom.boundingBox.max.x - geom.boundingBox.min.x);
	
	
	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	mat[3] = infProject.material.red_1;
	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(в)';
	var name2 = cdm.r1+'(н)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name2 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	

	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Шаровой кран с полусгоном '+cdm.r1;
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





// бабочка для шарового крана
function shar_kran_babochka_1(cdm)
{
	var t1 = cdm.t1;
	var w1 = cdm.w1;
	var pos = cdm.pos;
	
	var p = [];
	p[0] = new THREE.Vector2 ( 0, 0 );
	p[1] = new THREE.Vector2 ( 1, 0 );
	p[2] = new THREE.Vector2 ( 1, 0.6 );
	p[3] = new THREE.Vector2 ( 0.8, 0.6 );
	p[4] = new THREE.Vector2 ( 0, 0.3 );
	p[5] = new THREE.Vector2 ( -0.8, 0.6 );
	p[6] = new THREE.Vector2 ( -1, 0.6 );
	p[7] = new THREE.Vector2 ( -1, 0 );
	
	var n = t1/2;
	for ( var i = 0; i < p.length; i++ ) 
	{  
		p[i].x *= n;
		p[i].y *= n; 
	}		
	
	
	var shape = new THREE.Shape( p );
	var gShape = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: w1 } );	
	gShape.translate(pos.x, pos.y, pos.z);

	for(var i = 0; i < gShape.faces.length; i++){ gShape.faces[i].materialIndex = 0; }

	return gShape;
}




// сгон для шарового крана
function shar_kran_obj_sgon_1(cdm)
{
	var geom = cdm.geom;
	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var d2 = sizeRezba({size: cdm.r2, side: 'n'});	
	
	var m1 = cdm.m1;
	var offsetX = cdm.offsetX;
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	var x_2 = 0.02 * d2.n*20;
	
	var x_3 = 0.002;	// тольщина кольца
	var x_4 = 0.002;	// тольщина кольца
	var x_5 = x_2 * 1;
		
	var x_3R = m1 - x_2 - x_5/2 - x_4;
	
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки

	
	// гайка
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v + 0.001, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: x_1/2 + offsetX, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_3, diameter_nr: w2, diameter_vn: d2.n + 0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: (x_1 + x_3/2) + offsetX, y: 0, z: 0 }; 
		crFormSleeve_1(inf);   		
	}	
	
	var x_6 = (x_1 - x_3);
		
	// труба правая часть
	{
		var inf = { g: geom, dlina: x_4, diameter_nr: d1.v, diameter_vn: d2.v - 0.001 };
		inf.pos = { x: x_6 + x_4/2 + offsetX, y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: x_3R, diameter_nr: d2.n, diameter_vn: d2.v };
		inf.pos = { x: x_6 + x_4 + x_3R/2 + offsetX, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_5/2, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: x_6 + x_4 + x_3R + x_5/4 + offsetX, y: 0, z: 0 };
		crFormSleeve_1(inf);	
		
		var inf = { g: geom, dlina: x_2, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: x_6 + x_4 + x_3R + x_5/2 + x_2/2 + offsetX, y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);		
	}


	return poM1;
}












