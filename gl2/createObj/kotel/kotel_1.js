








// котел
function cr_kotel_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'n'});
	var size = cdm.size;	
	
	var type = (cdm.type) ? cdm.type : 'bottom';
	
	// доп. расчеты 	
	var x_1 = 0.02 * d1.n*20;
	
	console.log(cdm);
	var geom = new THREE.Geometry();		

	
	// прямоугольник
	{
		var g1 = new THREE.BoxGeometry( size.x, size.y, size.z ); 
		for(var i = 0; i < g1.faces.length; i++){ g1.faces[i].materialIndex = 0; }
		//g3.rotateX(Math.PI/2);	
		//g3.translate(0, -h2/2, 0);
		geom.merge(g1, g1.matrix, 2);
	}		

	// снизу
	if(type == 'bottom')
	{
		// удлинитель
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: -size.x * 0.2, y: -(size.y/2 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: size.x * 0.2, y: -(size.y/2 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			crFormSleeve_1(inf);  		
		}
		
		// резьба
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: -size.x * 0.2, y: -(size.y/2 + x_1 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			var poM1 = crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: size.x * 0.2, y: -(size.y/2 + x_1 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			var poM2 = crFormSleeve_1(inf);  		
		}	

		var arrRot = [new THREE.Vector3(0, Math.PI, -Math.PI/2), new THREE.Vector3(0, Math.PI, -Math.PI/2)];
		var name2 = '(разъемы снизу)';
	}
	
	// сзади
	if(type == 'back')
	{
		var rot1 = { x: 0, y: Math.PI/2, z: 0 };
		var y = -size.y/2 + 0.05;
		var z = -(size.z/2 + x_1/2);
		// удлинитель
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: -size.x * 0.2, y: y, z: z };
			inf.rot = rot1;
			crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: size.x * 0.2, y: y, z: z };
			inf.rot = rot1;
			crFormSleeve_1(inf);  		
		}
		
		// резьба
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: -size.x * 0.2, y: y, z: z - x_1 };
			inf.rot = rot1;
			var poM1 = crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: size.x * 0.2, y: y, z: z - x_1 };
			inf.rot = rot1;
			var poM2 = crFormSleeve_1(inf);  		
		}

		var arrRot = [new THREE.Vector3(0, Math.PI/2, 0), new THREE.Vector3(0, Math.PI/2, 0)];
		var name2 = '(разъемы сзади)';
	}


	// снизу-сверху
	if(type == 'top-bottom')
	{
		// удлинитель
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: 0, y: (size.y/2 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: 0, y: -(size.y/2 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			crFormSleeve_1(inf);  		
		}
		
		// резьба
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: 0, y: (size.y/2 + x_1 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			var poM1 = crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: 0, y: -(size.y/2 + x_1 + x_1/2), z: -size.z * 0.3 };
			inf.rot = { x: 0, y: 0, z: Math.PI/2 };
			var poM2 = crFormSleeve_1(inf);  		
		}

		var arrRot = [new THREE.Vector3(0, Math.PI, Math.PI/2), new THREE.Vector3(0, Math.PI, -Math.PI/2)];
		var name2 = '(разъемы снизу-сверху)';
	}	


	// сзади
	if(type == 'left-right')
	{
		var rot1 = { x: 0, y: 0, z: 0 };
		var x = size.x/2 + x_1/2;
		var y = -size.y/2 + 0.05;
		var z = -size.z * 0.3;
		
		// удлинитель
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: -x, y: y, z: z };
			inf.rot = rot1;
			crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
			inf.pos = { x: x, y: y, z: z };
			inf.rot = rot1;
			crFormSleeve_1(inf);  		
		}
		
		// резьба
		{		
			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: -x - x_1, y: y, z: z };
			inf.rot = rot1;
			var poM1 = crFormSleeve_1(inf); 

			var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
			inf.pos = { x: x + x_1, y: y, z: z };
			inf.rot = rot1;
			var poM2 = crFormSleeve_1(inf);  		
		}

		var arrRot = [new THREE.Vector3(0, Math.PI, 0), new THREE.Vector3(0, 0, 0)];
		var name2 = '(разъемы слева-справа)';
	}
	
	
	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.white_2;
	//mat[2] = new THREE.MeshPhongMaterial({ color: 0x997e1d, lightMap: lightMap_1, side: THREE.DoubleSide });
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	
	var name1 = cdm.r1+'(в)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: arrRot[0], name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: arrRot[1], name: name1 };
	
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}			

	
	cdm.name = 'Котел ' + name2;
	
	assignObjParams(obj, cdm);

	return obj;
}






