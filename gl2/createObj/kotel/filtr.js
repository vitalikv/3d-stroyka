


// фильтр косой
function filtr_kosoy_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});		
	
	var m1 = cdm.m1;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	if(x_1 < 0.012) { x_1 = 0.012; }
	
	var s1 = m1 - x_1 * 2;	
	var s2 = m1/2 * 1.30;		// длина трубы 45
	var s3 = 0.005 * d1.n*20;				// толщина крышки для трубы 45
	var s4 = 0.009 * d1.n*20;				// толщина гайки для крышки трубы 45
	
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	
	
	var geom = new THREE.Geometry();	
	
	// гайка
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(s1/2 + x_1/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 		
	}	

	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: -(s1/2 + x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
	}
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: s1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: 0, z: 0 };
		crFormSleeve_1(inf);	
	}
	
		//var inf = { g: geom, dlina: m1, diameter_nr: d1.n, diameter_vn: d1.v };
		//inf.pos = { x: 0, y: 0, z: 0.04 };
		//crFormSleeve_1(inf);		

	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: (s1/2 + x_1/2), y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
	}	
	
	// гайка
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v+0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: (s1/2 + x_1/2), y: 0, z: 0 }; 
		crFormSleeve_1(inf);		
	}	
		
	// труба 45 градусов
	{
		var inf = { g: geom, dlina: s2, diameter_nr: d1.n + 0.003, diameter_vn: d1.v };
		inf.pos1 = { x: -s2/2, y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		inf.pos = { x: s1 - d1.n, y: 0, z: 0 };
		crFormSleeve_1(inf);

		// крышка для трубы 45
		var inf = { g: geom, dlina: s3, diameter_nr: d1.n + d1.n * 0.2, diameter_vn: 0 };
		inf.pos1 = { x: -(s2 + s3/2), y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		inf.pos = { x: s1 - d1.n, y: 0, z: 0 };
		crFormSleeve_1(inf);

		// гайка для крышки
		var inf = { g: geom, dlina: s4, diameter_nr: d1.n, diameter_vn: 0, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos1 = { x: -(s2 + s3 + s4/2), y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		inf.pos = { x: s1 - d1.n, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	
	
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
	var name = 'Фильтр косой '+cdm.r1+'(в-в)';
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














