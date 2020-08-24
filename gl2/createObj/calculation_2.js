



// радиус окружности из дюймов в м (резьба)
function sizeRezba(cdm)
{
	var size = cdm.size;
	var side = cdm.side;
	
	// d диаметр трубы
	// t толщина стенки

	var inf = {n: 0, v: 0};
	var d = 0;
	var t = 0;
	
	if (size == "1/4") { d = 13.5; t = 2.2; }
	else if (size == "3/8") { d = 17.0; t = 2.2; }
	else if (size == "1/2") { d = 21.3; t = 2.7; }
	else if (size == "3/4") { d = 26.8; t = 2.8; }
	else if (size == "1") { d = 33.5; t = 3.2; }
	else if (size == "1 1/4") { d = 42.3; t = 3.2; }
	else if (size == "1 1/2") { d = 48.0; t = 3.5; }
	else if (size == "2") { d = 60.0; t = 3.5; }
	else if (size == "2 1/2") { d = 75.5; t = 4; }
	else if (size == "3") { d = 88.5; t = 4; }
	else if (size == "3 1/2") { d = 101.3; t = 4; }
	else if (size == "4") { d = 114.0; t = 4.5; }
	else if (size == "5") { d = 140.0; t = 4.5; }
	else if (size == "6") { d = 165.0; t = 4.5; }


	if (side == "n")	
	{
		inf.n = (d - t);		// нр. резьба (диаметр)
		inf.v = (d - t*2);		// вн. стенка (диаметр)
	}
	else
	{
		inf.n = d;			// нр. стенка (диаметр)
		inf.v = (d - t);	// вн. резьба (диаметр)
	}

	inf.n = Math.round(inf.n * 10) / 10000;
	inf.v = Math.round(inf.v * 10) / 10000;
	
	return inf;
}




// размер полипропиленовой трубы
function sizeTubePP(cdm)
{
	var size = cdm.size;
	var side = cdm.side;
	
	// d диаметр трубы
	// t толщина стенки

	var inf = {n: 0, v: 0};
	var d = 0;
	var t = 0;
	
	if (size == "20") { d = 20; t = 4.2; }
	else if (size == "25") { d = 25; t = 5.4; }
	else if (size == "32") { d = 32; t = 6.7; }
	else if (size == "40") { d = 40; t = 8.3; }
	else if (size == "50") { d = 50; t = 10.5; }
	else if (size == "63") { d = 63; t = 12.5; }
	else if (size == "75") { d = 75; t = 15.0; }
	else if (size == "90") { d = 90; t = 18.3; }
	else if (size == "110") { d = 110; t = 20.8; }		


	inf.n = (d + t*1.4);		// нр. резьба (диаметр)
	inf.v = d;		// вн. стенка (диаметр)


	inf.n = Math.round(inf.n * 10) / 10000;
	inf.v = Math.round(inf.v * 10) / 10000;
	
	return inf;
}




// втулка
function createSleeveObj_2(cdm) 
{	
	var dlina = cdm.dlina;  
	var diameter_nr = (cdm.diameter_nr) ? cdm.diameter_nr : false;
	var diameter_vn = (cdm.diameter_vn) ? cdm.diameter_vn : false;
	var edge_nr = (cdm.edge_nr) ? cdm.edge_nr : 32;
	var edge_vn = (cdm.edge_vn) ? cdm.edge_vn : 32;
	var rezba_nr = cdm.rezba_nr;
	var rezba_vn = cdm.rezba_vn;
 		
	
	if(cdm.material)
	{
		var material_nr = (cdm.material.nr) ? cdm.material.nr : null;
		var material_vn = (cdm.material.vn) ? cdm.material.vn : null;
		var material_cap = (cdm.material.cap) ? cdm.material.cap : null;		
	}
	
	var group = new THREE.Group();
	
	var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];
	
	// фтулка наружная
	if(diameter_nr)
	{
		var infO = {radius: diameter_nr/2, length: dlina, edge: edge_nr, geom: {rotateZ: -Math.PI/2, BufferG: true} };
		
		if(material_nr)
		{
			infO.material = material_nr;
		}
		else 
		{
			infO.material = new THREE.MeshPhongMaterial({ color: 0x0000ff, lightMap: lightMap_1, side: THREE.DoubleSide });
		}
		
		var obj = crCild_2( infO );
		
		group.add( obj );
	}
	

	// фтулка внутринняя 
	if(diameter_vn)
	{		
		var infO = {radius: diameter_vn/2, length: dlina, edge: edge_vn, geom: {rotateZ: -Math.PI/2, BufferG: true} };
		
		if(material_vn)
		{
			infO.material = material_vn;
		}		
		else 
		{
			infO.material = new THREE.MeshPhongMaterial({ color: 0x0000ff, lightMap: lightMap_1, side: THREE.DoubleSide });
		}
		
		var obj = crCild_2( infO );
		
		group.add( obj );
	}	
	
	
	// круг с отверстием (начало)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, edge_nr: edge_nr, edge_vn: edge_vn, geom: {rotateZ: Math.PI/2, rotateX: Math.PI/2, BufferG: true}};
		
		if(material_cap)
		{
			infO.material = material_cap;
		}
		else 
		{
			infO.material = new THREE.MeshPhongMaterial({ color: 0x0000ff, lightMap: lightMap_1, side: THREE.DoubleSide });
		}
		
		var obj = crCircle_2(infO);
		
		obj.position.copy(p[0]);
		group.add( obj );				
	}
	
	
	// круг с отверстием (конец)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, edge_nr: edge_nr, edge_vn: edge_vn, geom: {rotateZ: -Math.PI/2, rotateX: -Math.PI/2, BufferG: true}};

		if(material_cap)
		{
			infO.material = material_cap;
		}
		else 
		{
			infO.material = new THREE.MeshPhongMaterial({ color: 0x0000ff, lightMap: lightMap_1, side: THREE.DoubleSide });
		}
		
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
	var edge = cdm.edge;
	var geom = (cdm.geom) ? cdm.geom : {};
	var BufferG = (geom.BufferG) ? true : false;
	var material = cdm.material;	
	
	//----------
	
	var geometry = new THREE.CylinderGeometry( radius, radius, length, edge, 1, true );
	
	if(geom.rotateX) { geometry.rotateX(geom.rotateX); }
	if(geom.rotateY) { geometry.rotateY(geom.rotateY); }
	if(geom.rotateZ) { geometry.rotateZ(geom.rotateZ); }
	

	
	var obj = new THREE.Mesh( geometry, material );
	upUvs_4( obj );
	
	if(BufferG)
	{
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);			
	}

	return obj;
}


// кольцо
function crRing_2(cdm)
{
	var radius_nr = cdm.radius_nr;
	var radius_vn = (cdm.radius_vn) ? cdm.radius_vn : 0;	// отверстие
	var edge = cdm.edge;
	var geom = (cdm.geom) ? cdm.geom : {};
	var BufferG = (geom.BufferG) ? true : false;
	var material = cdm.material;
	
	 
	var geometry = new THREE.RingGeometry( radius_vn, radius_nr, edge, 1 );

	if(geom.rotateX) { geometry.rotateX(geom.rotateX); }
	if(geom.rotateY) { geometry.rotateY(geom.rotateY); }
	if(geom.rotateZ) { geometry.rotateZ(geom.rotateZ); }		
 
	
	var obj = new THREE.Mesh( geometry, material );	
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
	var edge_nr = cdm.edge_nr;
	var edge_vn = cdm.edge_vn;	
	var geom = (cdm.geom) ? cdm.geom : {};
	var material = (cdm.material) ? cdm.material : {};
	
	function createCircle_2(cdm)
	{
		var count = cdm.count;
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
		var arcShape = new THREE.Shape( createCircle_2({size: radius_nr, count: edge_nr}) );
		
		// отверстие
		if(radius_vn)
		{
			var holePath = new THREE.Shape( createCircle_2({size: radius_vn, count: edge_vn}) );
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



// сфера или полусфера
function crSphere_1(cdm)
{
	var radius = cdm.radius;
	var cutRad = cdm.cutRad;
	var material = cdm.material;	
	
	//----------
	
	var geometry = new THREE.SphereBufferGeometry( radius, 32, 32, 0, cutRad );
	
	if(cdm.rotateX) { geometry.rotateX(cdm.rotateX); }
	if(cdm.rotateY) { geometry.rotateY(cdm.rotateY); }
	if(cdm.rotateZ) { geometry.rotateZ(cdm.rotateZ); }	

	
	var obj = new THREE.Mesh( geometry, material );

	return obj;	
}



// создаем разъем для объектов
function cr_CenterPoint(cdm)
{
	var obj = cdm.obj;
	var name = cdm.name;
	var id = cdm.id;
	
	var geometry = infProject.geometry.centerPoint;
	var material = infProject.material.pointObj.default;
	
	var cube = new THREE.Mesh( geometry, material );
	cube.position.copy(cdm.pos);
	cube.quaternion.copy(cdm.q);
	cube.visible = false;
	cube.renderOrder = 1;
	//cube.rotation.y += 1;
	//var axesHelper = new THREE.AxesHelper( 0.2 );
	//axesHelper.position.copy(cube.position);
	//scene.add( axesHelper );							
	
	cube.userData.tag = 'joinPoint';
	cube.userData.id = id;  
	cube.userData.centerPoint = { join: null };						 
	cube.userData.centerPoint.nameRus = name;
	
	obj.add( cube );	
}
