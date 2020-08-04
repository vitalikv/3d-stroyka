




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


// втулка
function createSleeveObj_2(cdm) 
{	
	var dlina = cdm.dlina;  
	var diameter_nr = (cdm.diameter_nr) ? cdm.diameter_nr : false;
	var diameter_vn = (cdm.diameter_vn) ? cdm.diameter_vn : false;
	var color = cdm.color;
	var rezba_nr = cdm.rezba_nr;
	var rezba_vn = cdm.rezba_vn;
	
	var group = new THREE.Group();
	
	var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];
	
	// фтулка наружная
	if(diameter_nr)
	{
		var infO = {radius: diameter_nr/2, length: dlina, geom: {hole: true, rotateZ: -Math.PI/2, BufferG: true} };
		infO.material = infProject.material.metal_1;
		if(rezba_nr) infO.material = infProject.material.rezba_1;

		var obj = crCild_2( infO );
		
		group.add( obj );
	}
	

	// фтулка внутринняя 
	if(diameter_vn)
	{		
		var infO = {radius: diameter_vn/2, length: dlina, geom: {hole: true, rotateZ: -Math.PI/2, BufferG: true} };
		infO.material = infProject.material.metal_1;
		if(rezba_vn) infO.material = infProject.material.rezba_1;
		var obj = crCild_2( infO );
		
		group.add( obj );
	}	
	
	
	// круг с отверстием (начало)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, geom: {rotateY: -Math.PI/2}};
		infO.material = infProject.material.metal_1;
		var obj = crCircle_2(infO);
		
		obj.position.copy(p[0]);
		group.add( obj );				
	}
	
	
	// круг с отверстием (конец)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, geom: {rotateY: Math.PI/2}};
		infO.material = infProject.material.metal_1;
		var obj = crCircle_2(infO);
		
		obj.position.copy(p[p.length - 1]);
		group.add( obj );		
	}	
	
	
	return group;	
}



// цилиндр
function crCild_2(cdm)
{
	var radius = cdm.radius;
	var length = cdm.length;
	var geom = (cdm.geom) ? cdm.geom : {};
	var BufferG = (geom.BufferG) ? true : false;
	var material = (cdm.material) ? cdm.material : {};	
	
	//----------
	console.log(geom);
	var geometry = new THREE.CylinderGeometry( radius, radius, length, 32, 1, geom.hole );
	
	if(geom.rotateX) { geometry.rotateX(geom.rotateX); }
	if(geom.rotateY) { geometry.rotateY(geom.rotateY); }
	if(geom.rotateZ) { geometry.rotateZ(geom.rotateZ); }
	

	
	var obj = new THREE.Mesh( geometry, cdm.material );
	upUvs_4( obj );
	
	if(BufferG)
	{
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);			
	}

	return obj;
}


// круг с отверстием или без отверстия
function crCircle_2(cdm)
{
	var radius_nr = cdm.radius_nr;
	var radius_vn = (cdm.radius_vn) ? cdm.radius_vn : {};	// отверстие
	var geom = (cdm.geom) ? cdm.geom : {};
	var material = (cdm.material) ? cdm.material : {};
	
	function createCircle_2(cdm)
	{
		var count = 32;
		var circle = [];
		var g = (Math.PI * 2) / count;
		
		for ( var i = 0; i < count; i++ )
		{
			var angle = g * i;
			circle[i] = new THREE.Vector2();
			circle[i].x = Math.sin(angle) * cdm.size;
			circle[i].y = Math.cos(angle) * cdm.size;
		}

		return circle;
	}
	
	
	// geometry
	{
		var arcShape = new THREE.Shape( createCircle_2({size: radius_nr}) );
		
		// отверстие
		if(radius_vn)
		{
			var holePath = new THREE.Shape( createCircle_2({size: radius_vn}) );
			arcShape.holes.push( holePath );				
		}
		
		var geometry = new THREE.ShapeBufferGeometry( arcShape );
		
		if(geom.rotateX) { geometry.rotateX(geom.rotateX); }
		if(geom.rotateY) { geometry.rotateY(geom.rotateY); }
		if(geom.rotateZ) { geometry.rotateZ(geom.rotateZ); }		
	}
	
	var obj = new THREE.Mesh( geometry, cdm.material );
		
	return obj;
}






