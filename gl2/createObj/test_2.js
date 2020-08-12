


// стальной Ниппель переходной Н-Н
function st_nippel(cdm)   
{	
	// 1дюйм == 0.025метра
	
	var diameter_1 = cdm.inch_1 * 0.025;	// нр
	var diameter_2 = cdm.inch_2 * 0.025;	// нр 
	var dlina = cdm.dlina;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
	var diameter_vn_1 = diameter_1 - 0.005 * cdm.inch_1;
	var diameter_vn_2 = diameter_2 - 0.005 * cdm.inch_2; 
	var x_1 = 0.015 * cdm.inch_1;
	var x_2 = 0.015 * cdm.inch_2;

	if(x_1 < 0.008) { x_1 = 0.008; }
	if(x_2 < 0.008) { x_2 = 0.008; }
	
	if(x_1 > 0.015) { x_1 = 0.015; }
	if(x_2 > 0.015) { x_2 = 0.015; }
	
	var x_3L = dlina/2 - x_1;
	var x_3R = dlina/2 - x_2;
	
	var x_4 = (cdm.inch_1 > cdm.inch_2) ? 0.0025 * cdm.inch_1 : 0.0025 * cdm.inch_2;
	var x_5 = (cdm.inch_1 > cdm.inch_2) ? 0.006 * cdm.inch_1 : 0.006 * cdm.inch_2;
	
	var d_nr = (diameter_1 > diameter_2) ? diameter_1 : diameter_2;
	var d_vn = (diameter_vn_1 < diameter_vn_2) ? diameter_vn_1 : diameter_vn_2; 
	
	
	var group = new THREE.Group();
	
	// нижняя труба 
	{
		var inf = {dlina: x_1, diameter_nr: diameter_1, diameter_vn: diameter_vn_1, rezba_nr: true };	  
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= x_3L + x_1/2;
		group.add( obj );
		
		var inf = {dlina: x_3L, diameter_nr: diameter_1, diameter_vn: diameter_vn_1 }; 
		var obj = createSleeveObj_2(inf);
		obj.position.x -= x_3L/2;
		group.add( obj );
		
		var inf = {dlina: x_3R, diameter_nr: diameter_2, diameter_vn: diameter_vn_2 };
		var obj = createSleeveObj_2(inf);
		obj.position.x += x_3R/2; 
		group.add( obj );		
 
		var inf = {dlina: x_2, diameter_nr: diameter_2, diameter_vn: diameter_vn_2, rezba_nr: true };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += x_3R + x_2/2;
		group.add( obj );		
	}
		
		
	// кольца
	{		
		var inf = {dlina: x_4, diameter_nr: d_nr + x_5, diameter_vn: d_vn, edge_nr: 6, edge_vn: 32 }; 
		var obj = createSleeveObj_2(inf);		
		//obj.position.x += dlina_1/2 - x_1;
		group.add( obj );				
	}

	
	var obj = getBoundObject_1({obj: group});
	
	scene.add( obj );
	obj.position.copy(offset);
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	obj.userData.obj3D.nameRus = 'Ниппель переходной Н-Н ('+cdm.inch_1+'х'+cdm.inch_2+')'; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}




// стальной тройник
function st_troinik_n_n_n(cdm)  
{	
	var diameter = cdm.inch * 0.025;  // 1дюйм == 0.025метра
	var dlina_1 = cdm.dlina_1;
	var dlina_2 = cdm.dlina_2;
	var color = cdm.color;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
	var diameter_vn = diameter - 0.005;	
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	var x_3 = dlina_2 - x_1;
	var x_4 = 0.0025 * cdm.inch;
	var x_5 = 0.006 * cdm.inch;
	
	var group = new THREE.Group();
	
	// нижняя труба
	{
		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, color: color, rezba_nr: true };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		group.add( obj );
		
		var inf = {dlina: x_2, diameter_nr: diameter, diameter_vn: diameter_vn, color: color };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );

		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, color: color, rezba_nr: true };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		var inf = {dlina: x_3, diameter_nr: diameter, diameter_vn: diameter_vn, color: color };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		var inf = {dlina: x_1, diameter_nr: diameter, diameter_vn: diameter_vn, color: color, rezba_nr: true };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );			
	}

	
	// кольца
	{
		var inf = {dlina: x_4, diameter_nr: diameter + x_5, diameter_vn: diameter, color: color };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += dlina_1/2 - x_1;
		group.add( obj );
		
		var inf = {dlina: x_4, diameter_nr: diameter + x_5, diameter_vn: diameter, color: color };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= dlina_1/2 - x_1;
		group.add( obj );	
		
		var inf = {dlina: x_4, diameter_nr: diameter + x_5, diameter_vn: diameter, color: color };
		var obj = createSleeveObj_2(inf);				
		obj.position.y += dlina_2 - x_1;
		obj.rotation.set(0, 0, Math.PI/2);
		group.add( obj );		
	}

	
	scene.add( group );
	group.position.copy(offset);
	
}



 


// стальной тройник
function st_troinik_v_v_v(cdm) 
{	
	var diameter = cdm.inch * 0.025;  // 1дюйм == 0.025метра
	var dlina_1 = cdm.dlina_1;
	var dlina_2 = cdm.dlina_2;
	var color = cdm.color;
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты
	var diameter_nr = diameter + 0.005;	
	var x_1 = 0.015;
	var x_2 = dlina_1 - x_1 * 2;
	var x_3 = dlina_2 - x_1;
	var x_4 = 0.0025 * cdm.inch;
	var x_5 = 0.0025 * cdm.inch;
	
	var group = new THREE.Group();
	
	// нижняя труба
	{
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter, color: color, rezba_vn: true };	
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= (x_2 + x_1)/2;
		group.add( obj );
		
		var inf = {dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter, color: color, rezba_vn: false };
		var obj = createSleeveObj_2(inf);		
		group.add( obj );

		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter, color: color, rezba_vn: true };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += (x_2 + x_1)/2;
		group.add( obj );		
	}
	
	
	// верхняя труба 
	{
		var inf = {dlina: x_3, diameter_nr: diameter_nr, diameter_vn: diameter, color: color, rezba_vn: false };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += x_3/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );
		
		var inf = {dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter, color: color, rezba_vn: true };	
		var obj = createSleeveObj_2(inf);		
		obj.position.y += (dlina_2 + x_3)/2;
		obj.rotation.set(0, 0, Math.PI/2);	
		group.add( obj );			
	}

	
	// кольца
	{
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, color: color };
		var obj = createSleeveObj_2(inf);		
		obj.position.x += dlina_1/2;
		group.add( obj );
		
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, color: color };
		var obj = createSleeveObj_2(inf);		
		obj.position.x -= dlina_1/2;
		group.add( obj );	
		
		var inf = {dlina: x_4, diameter_nr: diameter_nr + x_5, diameter_vn: diameter_nr, color: color };
		var obj = createSleeveObj_2(inf);				
		obj.position.y += dlina_2;
		obj.rotation.set(0, 0, Math.PI/2);
		group.add( obj );		
	}

	
	scene.add( group );
	group.position.copy(offset);
	
}



