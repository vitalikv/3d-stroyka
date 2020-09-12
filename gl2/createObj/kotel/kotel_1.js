








// котел
function cr_kotel_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'n'});
	var size = cdm.size;	
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	
	// доп. расчеты 	
	var x_1 = 0.02 * d1.n*20;
	
	
	var geom = new THREE.Geometry();		

	
	// прямоугольник
	{
		var g1 = new THREE.BoxGeometry( size.x, size.y, size.z ); 
		for(var i = 0; i < g1.faces.length; i++){ g1.faces[i].materialIndex = 0; }
		//g3.rotateX(Math.PI/2);	
		//g3.translate(0, -h2/2, 0);
		geom.merge(g1, g1.matrix, 2);
	}		

	// удлинитель
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -size.x * 0.2, y: -(size.y/2 + x_1/2), z: -size.z * 0.3 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		var poM1 = crFormSleeve_1(inf); 

		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: size.x * 0.2, y: -(size.y/2 + x_1/2), z: -size.z * 0.3 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		var poM2 = crFormSleeve_1(inf);  		
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


	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = new THREE.MeshPhongMaterial({ color: 0x997e1d, lightMap: lightMap_1, side: THREE.DoubleSide });
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	
	var name = cdm.r1+'(в)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, -Math.PI/2), name: name };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, Math.PI, -Math.PI/2), name: name };
	
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}			

	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Котел ';
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






