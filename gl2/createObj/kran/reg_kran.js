




// шаровой кран с полусгоном
function reg_kran_primoy_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var d2 = sizeRezba({size: cdm.r2, side: 'n'});
	
	var m1 = cdm.m1;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	if(x_1 < 0.012) { x_1 = 0.012; }
	
		
	var x_1L = 0.002;
	var x_1R = 0.002;	
	var x_2 = m1 - (x_1L * 2 + x_1R * 2 + x_1 * 2);

	
	var h1 = d1.n/2 + 0.008;		// высота штекира на кором находится бабочка
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки	
	
	var geom = new THREE.Geometry();	
	
	
	if(cdm.termoreg)
	{
		var name = 'Клапан с терморегулятором ';
		var w1 = 0.01;
	}
	else
	{
		var name = 'Кран регулировочный ';
		var w1 = 0.02;
	}
	
	// гайка
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2+w2*0.1, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(x_2/2 + x_1L * 2 + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 		
	}	
	
	// резьба (в)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: -(x_2/2 + x_1L * 2 + x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
	}	
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_1L, diameter_nr: d1.v+0.003, diameter_vn: d1.v, d_n2: d1.v+0.001, d_v2: d1.v };
		inf.pos = { x: -(x_2/2 + x_1L + x_1L/2), y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1L, diameter_nr: d1.v+0.001, diameter_vn: d1.v };
		inf.pos = { x: -(x_2/2 + x_1L/2), y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
		//var inf = { g: geom, dlina: m1, diameter_nr: d1.n, diameter_vn: d1.v };
		//inf.pos = { x: 0, y: 0, z: -0.01 };
		//crFormSleeve_1(inf);
		
		
	// труба центральная часть
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.v+0.001, diameter_vn: d1.v };
		inf.pos = { x: 0, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
		
	// труба правая часть
	{
		var inf = { g: geom, dlina: x_1R, diameter_nr: d1.v+0.001, diameter_vn: d1.v, d_n2: d2.n, d_v2: d1.v };
		inf.pos = { x: (x_2/2 + x_1R/2), y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1R, diameter_nr: d2.n, diameter_vn: d1.v };
		inf.pos = { x: (x_2/2 + x_1R + x_1R/2), y: 0, z: 0 };
		crFormSleeve_1(inf);	 	
	}
	

	// резьба (н)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: (x_2/2 + x_1R * 2 + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf);	
	}	
	
	// сгон 
	{
		var poM2 = shar_kran_obj_sgon_1({ geom: geom, r1: cdm.r2, r2: cdm.r1, m1: cdm.m2, offsetX: ((x_2/2 + x_1R + x_1R/2) + x_1*0.1 ) });
	}
	
	// вертикальная труба 
	{
		var inf = { g: geom, dlina: h1, diameter_nr: 0.015, diameter_vn: 0.000 };
		inf.pos = { x: 0, y: h1/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);	
		
		
		if(cdm.termoreg)	// терморегулятор
		{
			var inf = { g: geom, dlina: 0.006, diameter_nr: 0.02, diameter_vn: 0.000, edge_nr: 16, ind: [2, 2, 2, 2] };
			inf.pos = { x: 0, y: h1 + 0.006/2, z: 0 };
			inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
			crFormSleeve_1(inf);

			var inf = { g: geom, dlina: w1, diameter_nr: 0.035, diameter_vn: 0.000, edge_nr: 16, ind: [3, 3, 3, 3] };
			inf.pos = { x: 0, y: h1 + 0.006 + w1/2, z: 0 };
			inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
			crFormSleeve_1(inf);
			
			var inf = { g: geom, dlina: 0.035, diameter_nr: 0.032, diameter_vn: 0.000, d_n2: 0.024, d_v2: 0, edge_nr: 16, ind: [3, 3, 3, 3] };
			inf.pos = { x: 0, y: h1 + 0.006 + w1 + 0.035/2, z: 0 };
			inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
			crFormSleeve_1(inf);			
		}
		else
		{
			var inf = { g: geom, dlina: 0.002, diameter_nr: 0.017, diameter_vn: 0.000 };
			inf.pos = { x: 0, y: h1 + 0.002/2, z: 0 };
			inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
			crFormSleeve_1(inf);
			
			var inf = { g: geom, dlina: w1, diameter_nr: 0.024, diameter_vn: 0.000, edge_nr: 16, ind: [3, 3, 3, 3] };
			inf.pos = { x: 0, y: h1 + 0.002 + w1/2, z: 0 };
			inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
			crFormSleeve_1(inf);			
		}
		
	}	
	
	//geom.computeBoundingBox();
	//console.log(cdm.r1+' BoundingBox', geom.boundingBox.max.x - geom.boundingBox.min.x);
	
	
	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	mat[3] = infProject.material.white_1_edge;
	
	
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
	var name = name + cdm.r1; 
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















