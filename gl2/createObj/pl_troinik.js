



// полипропиленвый тройник
function pl_troinik_1(cdm)  
{	
	var rezba = sizeTubePP({size: cdm.inch});
			
	var diameter = rezba.n; 
	var diameter_vn = rezba.v;
	var dlina_1 = cdm.dlina_1;
	var dlina_2 = cdm.dlina_2;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
		
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	var x_3 = dlina_2 - x_1;
	var x_4 = diameter / 10;
	var x_5 = diameter/5;
	
	var name = cdm.inch;
	
	var group = new THREE.Group();
	
	var arrP = [];
	
	var material = { nr: infProject.material.white_1, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	
	// нижняя труба
	{
		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		obj.rotation.y += THREE.Math.degToRad(180);
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );
		
		var inf = {dlina: x_2, diameter_nr: diameter, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );

		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		var inf = {dlina: x_3, diameter_nr: diameter, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, material: material }; 
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, Math.PI, Math.PI/2);

		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
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
	var name = 'Тройник '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;	
}



 


// полипропиленвый тройник с одной (вн) резьбой по центру
function pl_troinik_rezba_v_1(cdm)  
{	
	var size1 = sizeTubePP({size: cdm.inch});
	var size2 = sizeRezba({size: cdm.rezba, side: 'v'});
			
	var diameter_nr = size1.n; 
	var diameter_vn = size1.v;
	var diameter_nr_2 = size2.n; 
	var diameter_vn_2 = size2.v;	
	var dlina_1 = cdm.dlina_1;
	var dlina_2 = cdm.dlina_2;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
		
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	var x_3 = dlina_2 - x_1;
	var x_4 = diameter_nr / 10;
	var x_5 = diameter_nr / 5;
	
	var d_vn = diameter_nr_2;
	var d_nr = d_vn + (diameter_nr - diameter_vn) + 0.004;
	if(d_nr < diameter_nr + 0.004) 
	{
		d_nr = diameter_nr + 0.004;
	}	
	
	var name = cdm.inch;
	var name2 = cdm.rezba+'(в)';
	
	var group = new THREE.Group();
	
	var arrP = [];
	
	var material = { nr: infProject.material.white_1, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	var rezba_vn = { nr: infProject.material.metal_1, vn: infProject.material.rezba_1, cap: infProject.material.metal_1 };
	var white_edge = { nr: infProject.material.white_1_edge, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	
	
	// нижняя труба
	{
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		obj.rotation.y += THREE.Math.degToRad(180);
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );
		
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );

		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		var inf = {dlina: x_3, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		
		var inf = {dlina: x_1, diameter_nr: d_nr, diameter_vn: d_vn, edge_nr: 12, material: white_edge }; 
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, Math.PI, Math.PI/2);		
		group.add( obj );	


		var inf = {dlina: x_1, diameter_nr: diameter_nr_2, diameter_vn: diameter_vn_2, material: rezba_vn }; 
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2 + 0.0005;
		obj.rotation.set(0, Math.PI, Math.PI/2);

		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name2 };
		
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
	var name = 'Тройник '+name+'x'+name2+'x'+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;	
}



// полипропиленвый тройник с одной (нр) резьбой по центру
function pl_troinik_rezba_n_1(cdm)  
{	
	var size1 = sizeTubePP({size: cdm.inch});
	var size2 = sizeRezba({size: cdm.rezba, side: 'n'});
			
	var diameter_nr = size1.n; 
	var diameter_vn = size1.v;
	var diameter_nr_2 = size2.n; 
	var diameter_vn_2 = size2.v;	
	var dlina_1 = cdm.dlina_1;
	var dlina_2 = cdm.dlina_2;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
		
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	var x_3 = dlina_2 - x_1;
	var x_4 = diameter_nr / 10;
	var x_5 = diameter_nr / 5;
	
	
	var d_vn = diameter_nr_2;
	var d_nr = d_vn + (diameter_nr - diameter_vn) + 0.004;
	if(d_nr < diameter_nr + 0.004) 
	{
		d_nr = diameter_nr + 0.004;
	}
	
	var name = cdm.inch;
	var name2 = cdm.rezba+'(н)';
	
	var group = new THREE.Group();
	
	var arrP = [];
	
	var material = { nr: infProject.material.white_1, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	var rezba_nr = { nr: infProject.material.rezba_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };
	var white_edge = { nr: infProject.material.white_1_edge, vn: infProject.material.white_1, cap: infProject.material.white_1 };
	
	// нижняя труба
	{
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		obj.rotation.y += THREE.Math.degToRad(180);
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );
		
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );

		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		var inf = {dlina: x_3, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: material };
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		
		var inf = {dlina: x_1, diameter_nr: d_nr, diameter_vn: d_vn, edge_nr: 12, material: white_edge }; 
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, Math.PI, Math.PI/2);		
		group.add( obj );	

		
		var inf = {dlina: x_1, diameter_nr: diameter_nr_2, diameter_vn: diameter_vn_2, material: rezba_nr }; 
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2 + x_1;
		obj.rotation.set(0, Math.PI, Math.PI/2);			

		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name2 };
		
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
	var name = 'Тройник '+name+'x'+name2+'x'+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;	
}



