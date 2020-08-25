



// стальной тройник
function st_troinik_n_n_n(cdm)  
{	
	var rezba = sizeRezba({size: cdm.inch, side: 'n'});
			
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
	
	var name = cdm.inch+'(н)';
	
	var group = new THREE.Group();
	
	var arrP = [];
	
	var rezba_nr = { nr: infProject.material.rezba_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };
	var metal_1 = { nr: infProject.material.metal_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };	
	
	// нижняя труба
	{
		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, material: rezba_nr };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		obj.rotation.y += THREE.Math.degToRad(180);
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );
		
		var inf = {dlina: x_2, diameter_nr: diameter, diameter_vn: diameter_vn, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );

		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, material: rezba_nr };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		var inf = {dlina: x_3, diameter_nr: diameter, diameter_vn: diameter_vn, material: metal_1 };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, material: rezba_nr };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, Math.PI, Math.PI/2);

		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );			
	}

	
	// кольца
	{
		var inf = {dlina: x_4, diameter_nr: diameter + x_5, diameter_vn: diameter, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += dlina_1/2 - x_1;
		group.add( obj );
		
		var inf = {dlina: x_4, diameter_nr: diameter + x_5, diameter_vn: diameter, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= dlina_1/2 - x_1;
		group.add( obj );	
		
		var inf = {dlina: x_4, diameter_nr: diameter + x_5, diameter_vn: diameter, material: metal_1 };
		var obj = createSleeveObj_2(inf);				
		obj.position.y += dlina_2 - x_1;
		obj.rotation.set(0, 0, Math.PI/2);
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



 


// стальной тройник
function st_troinik_v_v_v_1(cdm) 
{	
	var size1 = sizeRezba({size: cdm.inch_1, side: 'v'});
	var diameter_nr = size1.n;
	var diameter_vn = size1.v;
	  
	var dlina_1 = cdm.dlina_1;
	var dlina_2 = cdm.dlina_2;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	var x_3 = dlina_2 - x_1;
	var x_4 = diameter_nr / 10;
	var x_5 = diameter_nr / 10;
	
	var name = cdm.inch+'(в)';
	
	var group = new THREE.Group();	
	var arrP = [];
	
	var rezba_vn = { nr: infProject.material.metal_1, vn: infProject.material.rezba_1, cap: infProject.material.metal_1 };
	var metal_1 = { nr: infProject.material.metal_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };

	
	// нижняя труба
	{
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		obj.rotation.y += THREE.Math.degToRad(180);		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };		
		group.add( obj );
		
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );

		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };		
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		var inf = {dlina: x_3, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: metal_1 };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, Math.PI, Math.PI/2);
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };		
		group.add( obj );			
	}

	
	// кольца
	{
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += dlina_1/2;
		group.add( obj );
		
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= dlina_1/2;
		group.add( obj );	
		
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);				
		obj.position.y += dlina_2;
		obj.rotation.set(0, 0, Math.PI/2);
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





// стальной тройник
function st_troinik_v_v_v_2(cdm) 
{	
	var d = [];
	d[0] = sizeRezba({size: cdm.r1.a, side: 'v'});	// левый разъем
	d[1] = sizeRezba({size: cdm.r2.a, side: 'v'});	// верхний	
	d[2] = sizeRezba({size: cdm.r3.a, side: 'v'});	// правый 
	
	var dc = d[0];
	if(dc.n < d[1].n) dc = d[1];
	if(dc.n < d[2].n) dc = d[2];
	
	var l = [];
	l[0] = cdm.m1;
	l[1] = cdm.m2;			
	  
	var dlina_1 = l[0];
	var dlina_2 = l[1];
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	var x_3 = dlina_2 - x_1;
	var x_4 = d[0].n / 10;
	var x_5 = d[0].n / 10;
	
	var name_1 = cdm.r1.a+'(в)';
	var name_2 = cdm.r2.a+'(в)';
	var name_3 = cdm.r3.a+'(в)';
	
	var group = new THREE.Group();	
	var arrP = [];
	
	var rezba_nr = { nr: infProject.material.rezba_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };
	var rezba_vn = { nr: infProject.material.metal_1, vn: infProject.material.rezba_1, cap: infProject.material.metal_1 };
	var metal_1 = { nr: infProject.material.metal_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };

	
	// горизонтальная труба
	{
		// левая часть
		var inf = {dlina: x_1, diameter_nr: d[0].n, diameter_vn: d[0].v, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		obj.rotation.y += THREE.Math.degToRad(180);		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name_1 };		
		group.add( obj );
		
		var inf = {dlina: 0.001, diameter_nr: dc.n, diameter_vn: d[0].v, material: metal_1 }; 
		var obj = createSleeveObj_2(inf);
		obj.position.x -= x_2/2;
		group.add( obj );		
		
		// центральная часть
		var inf = {dlina: x_2, diameter_nr: dc.n, diameter_vn: dc.v, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );
		
		var inf = {dlina: 0.001, diameter_nr: dc.n, diameter_vn: d[2].v, material: metal_1 }; 
		var obj = createSleeveObj_2(inf);
		obj.position.x += x_2/2;
		group.add( obj );		

		// правая часть
		var inf = {dlina: x_1, diameter_nr: d[2].n, diameter_vn: d[2].v, material: rezba_vn };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name_3 };		
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		// нижнаяя часть
		//var inf = {dlina: x_3, diameter_nr: dc.n, diameter_vn: dc.v, material: metal_1 };	
		var inf = {dlina: x_3, diameter_nr: d[1].n, diameter_vn: d[1].v, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		// верхняя часть
		var inf = {dlina: x_1, diameter_nr: d[1].n, diameter_vn: d[1].v, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, Math.PI, Math.PI/2);
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name_2 };		
		group.add( obj );			
	}

	
	// кольца
	{
		// левое кольцо
		var inf = {dlina: x_4, diameter_nr: d[0].n + x_5, diameter_vn: d[0].n, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= dlina_1/2;
		group.add( obj );		

		
		// центральное кольцо
		var inf = {dlina: x_4, diameter_nr: d[1].n + x_5, diameter_vn: d[1].n, material: metal_1 };
		var obj = createSleeveObj_2(inf);				
		obj.position.y += dlina_2;
		obj.rotation.set(0, 0, Math.PI/2);
		group.add( obj );		
	
		
		// правое кольцо
		var inf = {dlina: x_4, diameter_nr: d[2].n + x_5, diameter_vn: d[2].n, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += dlina_1/2;
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
	var name = 'Тройник '+name_1+'x'+name_2+'x'+name_3;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
	
}





