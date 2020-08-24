





// стальной тройник
function st_krestovina_1(cdm) 
{	
	var size = sizeRezba({size: cdm.inch, side: 'v'}); 
	var diameter_nr = size.n;
	var diameter_vn = size.v;
	
	var length_1 = cdm.dlina;
	var d = size.n;	
	  
	var dlina_1 = cdm.dlina;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	
	var x_4 = diameter_nr / 10;
	var x_5 = diameter_nr / 10;
	
	var name = cdm.inch+'(в)';
	
	var group = new THREE.Group();	
	var arrP = [];
	
	var rezba_vn = { nr: infProject.material.metal_1, vn: infProject.material.rezba_1, cap: infProject.material.metal_1 };
	var metal_1 = { nr: infProject.material.metal_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };

	
	// труба горизонтальная
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
	
	// труба 90 градусов
	{	
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };
		var obj = createSleeveObj_2(inf);		
		obj.position.y -= (x_2 + x_1)/2;
		obj.rotation.set(Math.PI, 0, Math.PI/2);
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		group.add( obj );

		
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: metal_1 };
		var obj = createSleeveObj_2(inf);			
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn }; 
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (x_2 + x_1)/2;
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
		obj.position.y += dlina_1/2;
		obj.rotation.set(0, 0, Math.PI/2);
		group.add( obj );

		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);				
		obj.position.y -= dlina_1/2;
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
	var name = 'Крестовина '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
	
}






