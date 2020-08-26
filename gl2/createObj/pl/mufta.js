


// полипропиленовая муфта
function pl_mufta_1(cdm)   
{	
	var size1 = sizeTubePP({size: cdm.inch_1});
	var size2 = sizeTubePP({size: cdm.inch_2});	
	
	var diameter_nr_1 = size1.n;
	var diameter_vn_1 = size1.v;	
	var diameter_nr_2 = size2.n;	 	
	var diameter_vn_2 = size2.v;
	
	var dlina = cdm.dlina;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.015 * diameter_nr_1*20;
	var x_2 = 0.015 * diameter_nr_2*20;

	if(x_1 < 0.012) { x_1 = 0.012; }
	if(x_2 < 0.012) { x_2 = 0.012; }

	
	var x_3L = dlina/2 - x_1;
	var x_3R = dlina/2 - x_2;
	
	var x_4 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1/7 : diameter_nr_2/7;
	var x_5 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1/4 : diameter_nr_2/4;
	
	var d_nr = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1 : diameter_nr_2;
	var d_vn = (diameter_vn_1 < diameter_vn_2) ? diameter_vn_1 : diameter_vn_2; 
	
	var name1 = cdm.inch_1;
	var name2 = cdm.inch_2;
	
	var group = new THREE.Group();
	
	var arrP = [];	
	
	var white_1 = { nr: infProject.material.white_1, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	
	
	// нижняя труба 
	{
		var inf = {dlina: x_1, diameter_nr: diameter_nr_1, diameter_vn: diameter_vn_1, material: white_1 };	  
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= x_3L + x_1/2;
		obj.rotation.y += THREE.Math.degToRad(180);
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name1 };
		
		group.add( obj );
		
		var inf = {dlina: x_3L, diameter_nr: diameter_nr_1, diameter_vn: diameter_vn_1, material: white_1 }; 
		var obj = createSleeveObj_2(inf);
		obj.position.x -= x_3L/2;
		group.add( obj );
		
		var inf = {dlina: x_3R, diameter_nr: diameter_nr_2, diameter_vn: diameter_vn_2, material: white_1 };
		var obj = createSleeveObj_2(inf);
		obj.position.x += x_3R/2; 
		group.add( obj );		
 
		var inf = {dlina: x_2, diameter_nr: diameter_nr_2, diameter_vn: diameter_vn_2, material: white_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_3R + x_2/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name2 };
		
		group.add( obj );		
	}
		
		
	// кольца
	{		
		var inf = {dlina: x_4, diameter_nr: d_nr, diameter_vn: d_vn, material: white_1 }; 
		var obj = createSleeveObj_2(inf);		
		group.add( obj );		
	}	
	
	var obj = getBoundObject_1({obj: group});
	
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		cr_CenterPoint({obj: obj, pos: arrP[i].pos, q: arrP[i].q, name: arrP[i].name, id: i});
	}
	
	
	scene.add( obj );
	obj.position.copy(offset);
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = (cdm.inch_1 != cdm.inch_2) ? 'Муфта '+name1+'х'+name2 : 'Муфта '+name1;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}



// полипропиленовый соединитель (нр)
function pl_perehod_rezba_n_1(cdm)   
{	
	var size1 = sizeTubePP({size: cdm.inch});
	var size2 = sizeRezba({size: cdm.rezba, side: 'n'});	
	
	var diameter_nr_1 = size1.n;
	var diameter_vn_1 = size1.v;	
	var diameter_nr_2 = size2.n;	 	
	var diameter_vn_2 = size2.v;
	
	var dlina = cdm.dlina;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.015 * diameter_nr_1*20;
	var x_2 = 0.015 * diameter_nr_2*20;

	if(x_1 < 0.012) { x_1 = 0.012; }
	if(x_2 < 0.012) { x_2 = 0.012; }

	
	var x_3L = dlina/2 - x_1;
	var x_3R = dlina/2 - x_2;
	
	var x_4 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1/7 : diameter_nr_2/7;
	var x_5 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1/4 : diameter_nr_2/4;
	
	var d_vn_1 = diameter_nr_2;
	var d_nr_1 = d_vn_1 + (diameter_nr_1 - diameter_vn_1) + 0.004;
	if(d_nr_1 < diameter_nr_1 + 0.004) 
	{
		d_nr_1 = diameter_nr_1 + 0.004;
	}		
	
	var d_nr_2 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1 : diameter_nr_2;
	var d_vn_2 = (diameter_vn_1 < diameter_vn_2) ? diameter_vn_1 : diameter_vn_2;		
	
	var name1 = cdm.inch;	
	var name2 = cdm.rezba+'(н)'; 
	
	var group = new THREE.Group();
	
	var arrP = [];	
	
	var white_1 = { nr: infProject.material.white_1, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	var rezba_nr = { nr: infProject.material.rezba_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };
	
	// нижняя труба 
	{
		var inf = {dlina: x_1, diameter_nr: diameter_nr_1, diameter_vn: diameter_vn_1, material: white_1 };	  
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= x_3L + x_1/2;
		obj.rotation.y += THREE.Math.degToRad(180);		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name1 };		
		group.add( obj );
		
		var inf = {dlina: x_3L, diameter_nr: diameter_nr_1, diameter_vn: diameter_vn_1, material: white_1 }; 
		var obj = createSleeveObj_2(inf);
		obj.position.x -= x_3L/2;
		group.add( obj );
		
		var inf = {dlina: x_3R, diameter_nr: d_nr_1, diameter_vn: d_vn_1, material: white_1 };
		var obj = createSleeveObj_2(inf);
		obj.position.x += x_3R/2; 
		group.add( obj );		
 
		var inf = {dlina: x_2, diameter_nr: d_nr_1, diameter_vn: d_vn_1, material: white_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_3R + x_2/2;		
		group.add( obj );


		var inf = {dlina: x_2, diameter_nr: diameter_nr_2, diameter_vn: diameter_vn_2, material: rezba_nr };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_3R + x_2/2 + x_2;		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name2 };		
		group.add( obj );		
	}
		
		
	// кольца
	{		
		var inf = {dlina: x_4, diameter_nr: d_nr_2, diameter_vn: d_vn_2, material: white_1 }; 
		var obj = createSleeveObj_2(inf);		
		group.add( obj );		
	}	
	
	var obj = getBoundObject_1({obj: group});
	
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		cr_CenterPoint({obj: obj, pos: arrP[i].pos, q: arrP[i].q, name: arrP[i].name, id: i});
	}
	
	
	scene.add( obj );
	obj.position.copy(offset);
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Соединитель '+name1+'х'+name2;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}





// полипропиленовый соединитель (нр)
function pl_perehod_rezba_v_1(cdm)   
{	
	var size1 = sizeTubePP({size: cdm.inch});
	var size2 = sizeRezba({size: cdm.rezba, side: 'v'});	
	
	var diameter_nr_1 = size1.n;
	var diameter_vn_1 = size1.v;	
	var diameter_nr_2 = size2.n;	 	
	var diameter_vn_2 = size2.v;
	
	var dlina = cdm.dlina;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var x_1 = 0.015 * diameter_nr_1*20;
	var x_2 = 0.015 * diameter_nr_2*20;

	if(x_1 < 0.012) { x_1 = 0.012; }
	if(x_2 < 0.012) { x_2 = 0.012; }

	
	var x_3L = dlina/2 - x_1;
	var x_3R = dlina/2 - x_2;
	
	var x_4 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1/7 : diameter_nr_2/7;
	var x_5 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1/4 : diameter_nr_2/4;
	
	var d_vn_1 = diameter_nr_2;
	var d_nr_1 = d_vn_1 + (diameter_nr_1 - diameter_vn_1) + 0.004;
	if(d_nr_1 < diameter_nr_1 + 0.004) 
	{
		d_nr_1 = diameter_nr_1 + 0.004;
	}		
	
	var d_nr_2 = (diameter_nr_1 > diameter_nr_2) ? diameter_nr_1 : diameter_nr_2;
	var d_vn_2 = (diameter_vn_1 < diameter_vn_2) ? diameter_vn_1 : diameter_vn_2;		
	
	var name1 = cdm.inch;	
	var name2 = cdm.rezba+'(в)'; 
	
	var group = new THREE.Group();
	
	var arrP = [];	
	
	var white_1 = { nr: infProject.material.white_1, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	var rezba_vn = { nr: infProject.material.metal_1, vn: infProject.material.rezba_1, cap: infProject.material.metal_1 };
	
	// нижняя труба 
	{
		var inf = {dlina: x_1, diameter_nr: diameter_nr_1, diameter_vn: diameter_vn_1, material: white_1 };	  
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= x_3L + x_1/2;
		obj.rotation.y += THREE.Math.degToRad(180);		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name1 };		
		group.add( obj );
		
		var inf = {dlina: x_3L, diameter_nr: diameter_nr_1, diameter_vn: diameter_vn_1, material: white_1 }; 
		var obj = createSleeveObj_2(inf);
		obj.position.x -= x_3L/2;
		group.add( obj );
		
		var inf = {dlina: x_3R, diameter_nr: d_nr_1, diameter_vn: d_vn_1, material: white_1 };
		var obj = createSleeveObj_2(inf);
		obj.position.x += x_3R/2; 
		group.add( obj );		
 
		var inf = {dlina: x_2, diameter_nr: d_nr_1, diameter_vn: d_vn_1, material: white_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_3R + x_2/2;		
		group.add( obj );


		var inf = {dlina: x_2, diameter_nr: diameter_nr_2, diameter_vn: diameter_vn_2, material: rezba_vn };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_3R + x_2/2 + 0.0005;		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name2 };		
		group.add( obj );		
	}
		
		
	// кольца
	{		
		var inf = {dlina: x_4, diameter_nr: d_nr_2, diameter_vn: d_vn_2, material: white_1 }; 
		var obj = createSleeveObj_2(inf);		
		group.add( obj );		
	}	
	
	var obj = getBoundObject_1({obj: group});
	
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		cr_CenterPoint({obj: obj, pos: arrP[i].pos, q: arrP[i].q, name: arrP[i].name, id: i});
	}
	
	
	scene.add( obj );
	obj.position.copy(offset);
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Соединитель '+name1+'х'+name2;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}



