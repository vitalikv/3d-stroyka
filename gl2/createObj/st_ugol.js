




// угол стальной 90
function st_ugol_90_1(cdm)
{
	var rezba = sizeRezba({size: cdm.inch, side: 'v'});
	
	var length_1 = cdm.dlina;
	//var length_2 = 0.1;
	var diameter_nr = rezba.n;
	var diameter_vn = rezba.v;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
		
	var x_1 = 0.015;
	var x_2 = length_1 - x_1;
	//var x_3 = length_2 - x_1;
	var x_4 = diameter_nr / 10;
	var x_5 = diameter_nr / 10;
	
	var name = cdm.inch+'(в)';	
	
	var group = new THREE.Group();
	
	var arrP = [];
	
	var rezba_vn = { nr: infProject.material.metal_1, vn: infProject.material.rezba_1, cap: infProject.material.metal_1 };
	var metal_1 = { nr: infProject.material.metal_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };	
	
	// труба 90 градусов
	{
		// 1-ый кусок 
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: metal_1 };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_2/2;
		obj.rotation.set(0, 0, Math.PI/2);
		group.add( obj );		
		
		
		// резьба
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_2 + x_1/2;
		obj.rotation.set(0, Math.PI, Math.PI/2);
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );		
	}		

	// труба горизонтальная
	{	
		// 1-ый кусок 
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: metal_1 };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_2/2;
		group.add( obj );			
		
		// резьба
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_2 + x_1/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );
	}		
	
	// сфера в виде угла
	{
		// нр
		var obj = crSphere_1({radius: diameter_nr/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2, material: infProject.material.metal_1});	
		group.add( obj );

		// вн
		var obj = crSphere_1({radius: diameter_vn/2, cutRad: THREE.Math.degToRad( 90 ), rotateX: Math.PI/2, material: infProject.material.metal_1});			
		group.add( obj );
	}
	
	
	// кольца
	{
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_2 + x_1;
		obj.rotation.set(0, Math.PI, Math.PI/2);
		group.add( obj );			
		
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);				
		obj.position.x += x_2 + x_1;
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
	var name = 'Угол '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}




// угол стальной 45
function st_ugol_45_1(cdm)
{
	var rezba = sizeRezba({size: cdm.inch, side: 'v'});
	
	var length_1 = cdm.dlina;
	//var length_2 = 0.1;
	var diameter_nr = rezba.n;
	var diameter_vn = rezba.v;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
		
	var x_1 = 0.015;
	var x_2 = length_1 - x_1;
	//var x_3 = length_2 - x_1;
	var x_4 = diameter_nr / 10;
	var x_5 = diameter_nr / 10;
	
	var name = cdm.inch+'(в)';	
	
	var group = new THREE.Group();
	
	var arrP = [];
	
	var rezba_vn = { nr: infProject.material.metal_1, vn: infProject.material.rezba_1, cap: infProject.material.metal_1 };
	var metal_1 = { nr: infProject.material.metal_1, vn: infProject.material.metal_1, cap: infProject.material.metal_1 };	
	
	// труба под 45 градусов
	{
		// 1-ый кусок 
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: metal_1 };	
		var obj = createSleeveObj_2(inf);		
		 		
		if(1==1)
		{
			obj.position.x -= x_2/2;
			obj.position.applyAxisAngle(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4); 							
			obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4);			
		}

		group.add( obj );		
		
		
		// резьба
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		
		if(1==1)
		{
			obj.position.x -= x_2 + x_1/2;
			obj.position.applyAxisAngle(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4); 							
			obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4);
			//obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), Math.PI);
			obj.rotateOnAxis(new THREE.Vector3( 0, 1, 0 ), -Math.PI); 
		}
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );		
	}		

	// труба горизонтальная
	{	
		// 1-ый кусок 
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: metal_1 };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_2/2;
		group.add( obj );			
		
		// резьба
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn, material: rezba_vn };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_2 + x_1/2;
		
		arrP[arrP.length] = { pos: obj.position.clone(), q: obj.quaternion.clone(), name: name };
		
		group.add( obj );
	}		
	
	// сфера в виде угла
	{
		// нр
		var obj = crSphere_1({radius: diameter_nr/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4, material: infProject.material.metal_1});	
		group.add( obj );

		// вн
		var obj = crSphere_1({radius: diameter_vn/2, cutRad: THREE.Math.degToRad( 45 ), rotateX: Math.PI/2, rotateZ: Math.PI/4, material: infProject.material.metal_1});			
		group.add( obj );
	}
	
	// кольца
	{
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);
		
		if(1==1)
		{
			obj.position.x -= x_2 + x_1;
			obj.position.applyAxisAngle(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4); 							
			obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI/4);
			//obj.rotateOnWorldAxis(new THREE.Vector3( 0, 0, 1 ), Math.PI);
			obj.rotateOnAxis(new THREE.Vector3( 0, 1, 0 ), -Math.PI); 
		}
		
		group.add( obj );			
		
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, material: metal_1 };
		var obj = createSleeveObj_2(inf);				
		obj.position.x += x_2 + x_1;
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
	var name = 'Угол_45 '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}






 


