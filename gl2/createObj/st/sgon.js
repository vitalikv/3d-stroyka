








// стальной полусгон
function st_sgon_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var d2 = sizeRezba({size: cdm.r2, side: 'n'});	
	
	var m1 = cdm.m1;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.02 * d1.n*20;
	var x_2 = 0.02 * d2.n*20;
	
	var x_3 = 0.002;	// тольщина кольца
	var x_4 = 0.002;	// тольщина кольца
	var x_5 = x_2 * 1.3;
	
	var x_3L = -(x_4 + 0.001);
	var x_3R = m1 - x_2 - x_5 - x_4;
	
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	
	
	var geom = new THREE.Geometry();	
		
	// гайка
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: -(x_3L + x_3 + x_1/2 + x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_1/2, diameter_nr: w2, diameter_vn: d1.v, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(x_3L + x_3 + x_1/2/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_3, diameter_nr: w2, diameter_vn: d2.n + 0.001, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: -(x_3L + x_3/2), y: 0, z: 0 };
		crFormSleeve_1(inf);   		
	}	
	
		
	// труба правая часть
	{
		var inf = { g: geom, dlina: x_4, diameter_nr: d1.v, diameter_vn: d2.v - 0.001 };
		inf.pos = { x: x_4/2, y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: x_3R, diameter_nr: d2.n, diameter_vn: d2.v };
		inf.pos = { x: x_4 + x_3R/2, y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_5, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: x_4 + x_3R + x_5/2, y: 0, z: 0 };
		crFormSleeve_1(inf);	
		
		var inf = { g: geom, dlina: x_2, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: x_4 + x_3R + x_5 + x_2/2, y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);		
	}			
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(в)';
	var name2 = cdm.r2+'(н)';
	
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
	var name = 'Полусгон '+cdm.r2;
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






