




// стальной тройник
function st_collector_1(cdm)  
{	
	var d1 = sizeRezba({size: cdm.r1, side: cdm.side});		// левый разъем
	var d2 = sizeRezba({size: cdm.r2, side: cdm.side}); 	// верхний
	var d3 = sizeRezba({size: cdm.r3, side: cdm.side});		// правый
	
	var dc = d1;
	if(dc.n < d2.n) dc = d2;
	if(dc.n < d3.n) dc = d3;
	
	
	var m1 = cdm.m1;
	var m2 = cdm.m2;		
	 
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var w1 = 0.015;
	var w2 = 0.015;
	var w3 = 0.015;
	var w22 = d1.n / 10;
	var kf = 0.0001;
	
	var s1 = (m1/2 - w1);
	var s2 = (m2 - w2);
	var s3 = (m1/2 - w3);	

	if(cdm.side == 'v') 
	{ 
		var posOff_1 = s1 + w1 - w22/2;
		var posOff_2 = s2 + w2 - w22/2;
		var posOff_3 = s3 + w3 - w22/2;
		var txt = '(в)';
		var matRezba = [0, 1, 0, 0];
	}
	else 
	{ 
		var posOff_1 = s1 + w22/2;
		var posOff_2 = s2 + w22/2;
		var posOff_3 = s3 + w22/2;
		var txt = '(н)';
		var matRezba = [1, 0, 0, 0];		
	}	
	
	
	var geom = new THREE.Geometry();
	
		
	// труба горизонтальная (левая часть)	
	{		 
		var inf = { g: geom, dlina: w1, diameter_nr: d1.n, diameter_vn: d1.v, ind: matRezba };	// резьба
		inf.pos = { x: -(s1 + w1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);					
		
		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v + kf };	// гайка/кольцо
		inf.pos = { x: -posOff_1, y: 0, z: 0 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: s1, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d1.n, d_v2: d1.v };
		inf.pos = { x: -s1/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}	
			
	// труба горизонтальная (правая часть)
	{
		var inf = { g: geom, dlina: s3, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d3.n, d_v2: d3.v };
		inf.pos = { x: s3/2, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: 0 };
		crFormSleeve_1(inf);		
		
		var inf = { g: geom, dlina: w22, diameter_nr: d3.n + w22, diameter_vn: d3.v + kf };	// гайка/кольцо
		inf.pos = { x: posOff_3, y: 0, z: 0 };
		crFormSleeve_1(inf);		
		
		var inf = { g: geom, dlina: w3, diameter_nr: d3.n, diameter_vn: d3.v, ind: matRezba };	// резьба 
		inf.pos = { x: (s3 + w3/2), y: 0, z: 0 };
		var poM3 = crFormSleeve_1(inf);			
	}		


	var poM2 = crTubeVert({offsetX: -0.05});
	var poM2 = crTubeVert({offsetX: 0.05});

	// вертикальная труба
	function crTubeVert(cdm)
	{
		var offsetX = cdm.offsetX;

		var inf = { g: geom, dlina: s2, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d2.n, d_v2: d2.v };
		inf.pos = { x: offsetX, y: s2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: w22, diameter_nr: d2.n + w22, diameter_vn: d2.v + kf };	// гайка/кольцо
		inf.pos = { x: offsetX, y: posOff_2, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: w2, diameter_nr: d2.n, diameter_vn: d2.v, ind: matRezba };	// резьба 
		inf.pos = { x: offsetX, y: (s2 + w2/2), z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		var poM2 = crFormSleeve_1(inf);	
		
		return poM2;
	}	
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+txt;
	var name2 = cdm.r2+txt;
	var name3 = cdm.r3+txt;	
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name2 };
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, 0, 0), name: name3 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = (name1 == name2 && name1 == name3) ? 'Тройник '+name1 : 'Тройник '+name1+'x'+name2+'x'+name3;
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



 
 
 

