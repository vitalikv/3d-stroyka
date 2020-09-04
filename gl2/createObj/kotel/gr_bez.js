








// группа безопасности
function gr_bez_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var size = cdm.size;
	
	//var m1 = cdm.m1;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var d2 = sizeRezba({size: '1/4', side: 'v'});
	var d3 = sizeRezba({size: '1/2', side: 'n'});
	var d4 = sizeRezba({size: '1/2', side: 'v'});
	
	var x_1 = 0.02 * d1.n*20;
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	var w3 = d2.n+ 0.236 * d2.n;	// толщина гайки
	var w4 = d4.n+ 0.236 * d4.n;	// толщина гайки
	var h1 = 0.01;
	
	var hL1 = 0.02;
	var hC1 = 0.02;
	var hR1 = 0.02;
	
	var xL1 = -size.x*0.35;
	var xR1 = size.x*0.35;
	
	
	var geom = new THREE.Geometry();	
	

	// гайки
	{	
		var inf = { g: geom, dlina: hL1, diameter_nr: d2.v, diameter_vn: 0 };
		inf.pos = { x: xL1, y: (size.y/2 + h1 + hL1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 
		
		var inf = { g: geom, dlina: hC1, diameter_nr: d2.v, diameter_vn: 0 };
		inf.pos = { x: 0, y: (size.y/2 + h1 + hC1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 

 		var inf = { g: geom, dlina: hR1, diameter_nr: w4, diameter_vn: d4.v, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: xR1, y: (size.y/2 + h1/4 + hR1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 		
	}	
	
	// гайки
	{	
		var inf = { g: geom, dlina: h1, diameter_nr: w3, diameter_vn: d2.v, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: xL1, y: (size.y/2 + h1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 
		
		var inf = { g: geom, dlina: h1, diameter_nr: w3, diameter_vn: d2.v, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: 0, y: (size.y/2 + h1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 

 		var inf = { g: geom, dlina: h1, diameter_nr: d3.n, diameter_vn: d3.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: xR1, y: (size.y/2 + h1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 		
	}	
	
	// прямоугольник
	{
		var g1 = new THREE.BoxGeometry( size.x, size.y, size.z ); 
		for(var i = 0; i < g1.faces.length; i++){ g1.faces[i].materialIndex = 0; }
		//g3.rotateX(Math.PI/2);	
		//g3.translate(0, -h2/2, 0);
	}		
	
	// гайка снизу
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: 0, y: -(size.y/2 + x_1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		var poM1 = crFormSleeve_1(inf);   		
	}	
	

	geom.merge(g1, g1.matrix, 0);	
			
	

	var mat = [];
	mat[0] = infProject.material.bronz_1;
	mat[1] = infProject.material.rezba_2;
	mat[2] = infProject.material.bronz_1_edge;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	
	var name = cdm.r1+'(в)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, -Math.PI/2), name: name };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}			

	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Группа безопасности ';
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






