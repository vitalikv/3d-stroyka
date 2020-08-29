





// стальной тройник
function st_krestovina_1(cdm) 
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	
	var m1 = cdm.m1; 	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = m1 - x_1 * 2;
	var w22 = d1.n / 10;
	var kf = 0.0001;		

	var geom = new THREE.Geometry();
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0,1,0,0] };
		inf.pos = { x: -(x_2 + x_1)/2, y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);					
		
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		crFormSleeve_1(inf);						

		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0,1,0,0] };
		inf.pos = { x: (x_2 + x_1)/2, y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);							
	}		

	// труба 90 градусов
	{	
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0,1,0,0] };
		inf.pos = { x: 0, y: -(x_2 + x_1)/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		var poM3 = crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
		
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0,1,0,0] }; 
		inf.pos = { x: 0, y: (x_2 + x_1)/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		var poM4 = crFormSleeve_1(inf);		
	}

	// кольцо
	{
		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v + kf };	
		inf.pos = { x: -(x_2/2 + x_1 - w22/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v + kf };	
		inf.pos = { x: (x_2/2 + x_1 - w22/2), y: 0, z: 0 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v + kf };	
		inf.pos = { x: 0, y: -(x_2/2 + x_1 - w22/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v + kf };	
		inf.pos = { x: 0, y: (x_2/2 + x_1 - w22/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
	}


	
	
	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	
	var name = cdm.r1;
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name };
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, Math.PI, -Math.PI/2), name: name };
	arrP[arrP.length] = { pos: poM4.pos, rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name };
	
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
	var name = 'Крестовина '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
	
}





