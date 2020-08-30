




// угол стальной 90
function st_ugol_90_1(cdm)
{
	var d1 = sizeRezba({size: cdm.r1, side: cdm.side});
	
	var m1 = cdm.m1;	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты	
	var w1 = 0.015;
	var w22 = d1.n / 10;
	var s1 = m1 - w1;

	if(cdm.side == 'v') 
	{ 
		var posOff = s1 + w1 + w22/2;
		var txt = '(в)';
		var matRezba = [0, 1, 0, 0];
	}
	else 
	{ 
		var posOff = s1 + w22/2;
		var txt = '(н)';
		var matRezba = [1, 0, 0, 0];		
	}
	
	
	var geom = new THREE.Geometry();
	

	// резьба
	{
		var inf = { g: geom, dlina: w1, diameter_nr: d1.n, diameter_vn: d1.v, ind: matRezba };
		inf.pos = { x: 0, y: (s1 + w1/2), z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		var poM1 = crFormSleeve_1(inf);
	}		

	// гайка/кольцо
	{		
		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v };
		inf.pos = { x: 0, y: posOff, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		crFormSleeve_1(inf);											
	}
	
	// вертикальная труба 
	{
		var inf = { g: geom, dlina: s1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: s1/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);		
	}

	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: s1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: s1/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}	

	
	// гайка/кольцо
	{		
		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v };
		inf.pos = { x: posOff, y: 0, z: 0 };
		crFormSleeve_1(inf);											
	}
	
	// резьба
	{
		var inf = { g: geom, dlina: w1, diameter_nr: d1.n, diameter_vn: d1.v, ind: matRezba };
		inf.pos = { x: (s1 + w1/2), y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
	}		
	

	// сфера в виде угла
	{		
		crSphere_2({g: geom, radius: d1.n/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2});	// нр			
		crSphere_2({g: geom, radius: d1.v/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2});	// вн			
	}	
	
	
	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;	 	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+txt;
	var name2 = cdm.r1+txt;
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name1 };
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
	var name = 'Угол '+name1;
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




// угол стальной 45
function st_ugol_45_1(cdm)
{
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	
	var m1 = cdm.m1;	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = m1 - x_1;
	var w22 = d1.n / 10;
	
	var geom = new THREE.Geometry();
	
	
	// гайка/кольцо
	{		
		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v };
		inf.pos1 = { x: -(x_2 + x_1 + w22/2), y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		crFormSleeve_1(inf);											
	}
	
	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0,1,0,0] };
		inf.pos1 = { x: -(x_2 + x_1/2), y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		var poM1 = crFormSleeve_1(inf);	 
	}
	
	// труба 45 
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos1 = { x: -x_2/2, y: 0, z: 0 }; 
		inf.rot = { x: 0, y: 0, z: -Math.PI/4 };
		crFormSleeve_1(inf);		
	}	
		
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: x_2/2, y: 0, z: 0 };
		crFormSleeve_1(inf);
	}

	// резьба
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0,1,0,0] };
		inf.pos = { x: x_2 + x_1/2, y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);		
	}

	// гайка/кольцо
	{		
		var inf = { g: geom, dlina: w22, diameter_nr: d1.n + w22, diameter_vn: d1.v };
		inf.pos = { x: (x_2 + x_1 + w22/2), y: 0, z: 0 }; ;
		crFormSleeve_1(inf);											
	}	


	// сфера в виде угла
	{		
		crSphere_2({g: geom, radius: d1.n/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4});	// нр			
		crSphere_2({g: geom, radius: d1.v/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4});	// вн			
	}	
	
	
	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(в)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, THREE.Math.degToRad( 45 )), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name1 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Угол_45 '+name1;
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





