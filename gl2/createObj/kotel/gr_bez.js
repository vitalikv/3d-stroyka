








// группа безопасности
function gr_bez_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var size = cdm.size;
	
	//var m1 = cdm.m1;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var d2 = sizeRezba({size: '3/8', side: 'v'});
	var d3 = sizeRezba({size: '1/2', side: 'n'});
	var d4 = sizeRezba({size: '1/2', side: 'v'});
	
	var x_1 = 0.02 * d1.n*20;
	var w2 = d1.n+ 0.236 * d1.n;	// толщина гайки
	var w3 = d2.n+ 0.236 * d2.n;	// толщина гайки
	var w4 = d4.n+ 0.236 * d4.n;	// толщина гайки
	var h1 = 0.01;
	
	
	
	
	var xL1 = -size.x*0.35;
	var xR1 = size.x*0.35;
	
	
	var geom = new THREE.Geometry();	
	

	// манометр
	{
		var mtr = { };
		mtr.posY = 0.001;
		mtr.h1 = 0.01;		// высота резьбы
		mtr.h2 = 0.005;		// высота гайки
		mtr.d1 = 0.015;		// диаметр гайки
		mtr.d2 = 0.066;		// диаметр манометра
		mtr.s1 = 0.028;		// толщина манометра


		// циферблат манометра
		var inf = { g: geom, dlina: 0.001, diameter_nr: mtr.d2 - mtr.d2 * 0.1, diameter_vn: 0, ind: [5, 5, 5, 5] };
		inf.pos = { x: xL1, y: (size.y/2 + mtr.posY + mtr.h1 + mtr.h2 + mtr.d2/2), z: mtr.s1/2 - 0.004 };
		inf.rot = { x: 0, y: -Math.PI/2, z: 0 };
		crFormSleeve_1(inf);
		
		// зднаяя крышка манометра, прячет циферблат
		var inf = { g: geom, dlina: 0.001, diameter_nr: mtr.d2 - mtr.d2 * 0.1, diameter_vn: 0, ind: [3, 3, 3, 3] };
		inf.pos = { x: xL1, y: (size.y/2 + mtr.posY + mtr.h1 + mtr.h2 + mtr.d2/2), z: -mtr.s1/2 };
		inf.rot = { x: 0, y: -Math.PI/2, z: 0 };
		crFormSleeve_1(inf);		
		
		// манометр черный пластиковый кожух
		var inf = { g: geom, dlina: mtr.s1, diameter_nr: mtr.d2, diameter_vn: mtr.d2 - mtr.d2 * 0.1, ind: [3, 3, 3, 3] };
		inf.pos = { x: xL1, y: (size.y/2 + mtr.posY + mtr.h1 + mtr.h2 + mtr.d2/2), z: 0 };
		inf.rot = { x: 0, y: Math.PI/2, z: 0 };
		crFormSleeve_1(inf); 		
		
		// нижняя гайка
 		var inf = { g: geom, dlina: mtr.h2, diameter_nr: mtr.d1, diameter_vn: mtr.d1 - mtr.d1*0.3, edge_nr: 6, edge_vn: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: xL1, y: (size.y/2 + mtr.posY + mtr.h1 + mtr.h2/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 			
		
		// резьба
		var inf = { g: geom, dlina: mtr.h1, diameter_nr: d2.v, diameter_vn: d2.v - d2.v * 0.2, ind: [1, 0, 0, 0] };
		inf.pos = { x: xL1, y: (size.y/2 + mtr.posY + mtr.h1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 		
	}
	
	
	// воздухоотводчик
	{
		var vzd = { };
		vzd.h1 = 0.01;		// высота резьбы
		vzd.h2 = 0.005;		// высота гайки
		vzd.h3 = 0.055;		// высота бочка
		vzd.d1 = 0.046;		// диаметри бочка сверху	
		vzd.d2 = 0.038;		// диаметри бочка снизу
		vzd.d3 = 0.050;		// диаметри крышки для бочка	
		vzd.h4 = 0.005;		// высота крышки для бочка
		vzd.h5 = 0.005;		// высота черного колпочка
		vzd.d4 = 0.008;		// диаметр черного колпочка
		
		// крышка над бочком
 		var inf = { g: geom, dlina: vzd.h5, diameter_nr: vzd.d4, diameter_vn: 0, edge_nr: 16, ind: [3, 3, 3, 3] };
		inf.pos = { x: -vzd.d3/2 + vzd.d3 * 0.2, y: (size.y/2 + h1 + vzd.h1/4 + vzd.h2 + vzd.h3 + vzd.h4 + vzd.h5/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);
		
		// крышка над бочком
 		var inf = { g: geom, dlina: vzd.h4, diameter_nr: vzd.d3, diameter_vn: 0, edge_nr: 16, ind: [2, 0, 0, 0] };
		inf.pos = { x: 0, y: (size.y/2 + h1 + vzd.h1/4 + vzd.h2 + vzd.h3 + vzd.h4/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);
		
		// бочок
 		var inf = { g: geom, dlina: vzd.h3, diameter_nr: vzd.d1, diameter_vn: 0, d_n2: vzd.d2, d_v2: 0 };
		inf.pos = { x: 0, y: (size.y/2 + h1 + vzd.h1/4 + vzd.h2 + vzd.h3/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
		
		// нижняя гайка
 		var inf = { g: geom, dlina: vzd.h2, diameter_nr: w3, diameter_vn: d2.v, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: 0, y: (size.y/2 + h1 + vzd.h1/4 + vzd.h2/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 		
		
		// резьба
		var inf = { g: geom, dlina: vzd.h1, diameter_nr: d2.v, diameter_vn: d2.v - d2.v * 0.2, ind: [1, 0, 0, 0] };
		inf.pos = { x: 0, y: (size.y/2 + h1 - vzd.h1/4), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 		
	}
	
	
	// пердохранительный клапан
	{	
		var prd = {};
		prd.posY = 0.003;
		prd.h1 = 0.01;
		prd.h2 = 0.03;
		prd.h3 = 0.012;
		prd.h4 = 0.012;
		prd.h5 = 0.022;
		prd.d1 = sizeRezba({size: '1/2', side: 'v'});


		// красный колпачек
 		var inf = { g: geom, dlina: prd.h5, diameter_nr: d4.v * 1.3, diameter_vn: 0, d_n2: d4.v, d_v2: 0, edge_nr: 16, ind: [6, 6, 6, 6] };
		inf.pos = { x: xR1, y: (size.y/2 + prd.posY + prd.h1 + prd.h1 + prd.h1 + prd.h2 + prd.h5/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);

		// горизонтальная труба 2часть
 		var inf = { g: geom, dlina: prd.h4, diameter_nr: prd.d1.n, diameter_vn: prd.d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: xR1 + prd.h3 + prd.h4/2, y: (size.y/2 + prd.posY + prd.h1 + prd.h1 + prd.h1 + prd.h2/2), z: 0 };
		crFormSleeve_1(inf);
		
		// горизонтальная труба 1часть
 		var inf = { g: geom, dlina: prd.h3, diameter_nr: prd.d1.n, diameter_vn: prd.d1.v, d_n2: d4.v, d_v2: d4.v * 0.9 };
		inf.pos = { x: xR1 + prd.h3/2, y: (size.y/2 + prd.posY + prd.h1 + prd.h1 + prd.h1 + prd.h2/2), z: 0 };
		crFormSleeve_1(inf);
		
		// основная вертикальная труба
 		var inf = { g: geom, dlina: prd.h2, diameter_nr: d4.v, diameter_vn: 0 };
		inf.pos = { x: xR1, y: (size.y/2 + prd.posY + prd.h1 + prd.h1 + prd.h1 + prd.h2/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 
		
 		var inf = { g: geom, dlina: prd.h1, diameter_nr: d4.n, diameter_vn: 0, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: xR1, y: (size.y/2 + prd.posY + prd.h1 + prd.h1 + prd.h1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 
		
 		var inf = { g: geom, dlina: prd.h1, diameter_nr: d4.v, diameter_vn: 0 };
		inf.pos = { x: xR1, y: (size.y/2 + prd.posY + prd.h1 + prd.h1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf); 
		
		// гайка
 		var inf = { g: geom, dlina: prd.h1, diameter_nr: w4, diameter_vn: d4.v, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: xR1, y: (size.y/2 + prd.posY + prd.h1/2), z: 0 };
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
		geom.merge(g1, g1.matrix, 0);
	}		
	
	// гайка снизу
	{		
		var inf = { g: geom, dlina: x_1, diameter_nr: w2, diameter_vn: d1.v, edge_nr: 6, ind: [2, 1, 0, 0] };
		inf.pos = { x: 0, y: -(size.y/2 + x_1/2), z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		var poM1 = crFormSleeve_1(inf);   		
	}	


	if(!infProject.material.manometr_1)
	{
		var texture_1 =  new THREE.TextureLoader().load(infProject.path+'/img/obj/manometr.png'); 
		texture_1.wrapS = THREE.RepeatWrapping; 
		texture_1.wrapT = THREE.RepeatWrapping;	 
		texture_1.repeat.x = 15;
		texture_1.repeat.y = 15;
		texture_1.rotation = THREE.Math.degToRad( -90 );
		texture_1.offset.x = 0.5;
		texture_1.offset.y = 0.5;
		
		var manometr = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture_1, lightMap: lightMap_1, side: THREE.DoubleSide });
		console.log(55555555);
		infProject.material.manometr_1 = manometr;
	}


	var mat = [];
	mat[0] = infProject.material.bronz_1;
	mat[1] = infProject.material.rezba_2;
	mat[2] = infProject.material.bronz_1_edge;
	mat[3] = infProject.material.black_1_edge;
	mat[4] = infProject.material.metal_1;
	mat[5] = infProject.material.manometr_1;
	mat[6] = infProject.material.red_1_edge;
	
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






