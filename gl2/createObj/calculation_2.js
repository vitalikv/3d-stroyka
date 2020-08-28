



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


	inf.n = (d + t*1.4);	// нр. (диаметр)
	inf.v = d;				// вн. (диаметр)


	inf.n = Math.round(inf.n * 10) / 10000;
	inf.v = Math.round(inf.v * 10) / 10000;
	
	return inf;
}



// размер металлопластиковой трубы
function sizeTubeMP(cdm)
{
	var size = cdm.size;
	var side = cdm.side;
	
	// d диаметр трубы
	// t толщина стенки

	var inf = {n: 0, v: 0};
	var d = 0;
	var t = 0.5;
	
	if (size == "16") { d = 16; }
	else if (size == "20") { d = 20; }
	else if (size == "26") { d = 26; }
	else if (size == "32") { d = 32; }
	else if (size == "40") { d = 40; }		


	inf.n = (d + t*1.4);	// нр. (диаметр)
	inf.v = d;				// вн. (диаметр)


	inf.n = Math.round(inf.n * 10) / 10000;
	inf.v = Math.round(inf.v * 10) / 10000;
	
	return inf;
}





// втулка
function createSleeveObj_2(cdm) 
{	
	var dlina = cdm.dlina;  
	var d_n1 = (cdm.diameter_nr) ? cdm.diameter_nr : false;
	var d_v1 = (cdm.diameter_vn) ? cdm.diameter_vn : false;
	var d_n2 = (cdm.d_n2) ? cdm.d_n2 : false;
	var d_v2 = (cdm.d_v2) ? cdm.d_v2 : false;	
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
	
	var mat_default = new THREE.MeshPhongMaterial({ color: 0x0000ff, lightMap: lightMap_1, side: THREE.DoubleSide });
		
	
	var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];
	
	// фтулка наружная
	{
		var infO = {r1: d_n1/2, length: dlina, edge: edge_nr, geom: {rotateZ: -Math.PI/2, BufferG: true} };
		if(d_n2) { infO.r2 = d_n2/2; }
		var geom1 = crCild_2( infO );
	}	

	// фтулка внутринняя 
	{		
		var infO = {r1: d_v1/2, length: dlina, edge: edge_vn, geom: {rotateZ: -Math.PI/2, BufferG: true} };
		if(d_v2) { infO.r2 = d_v2/2; }
		var geom2 = crCild_2( infO );
	}
	
	// круг с отверстием (начало)
	{
		var infO = {radius_nr: d_n1/2, radius_vn: d_v1/2, edge_nr: edge_nr, edge_vn: edge_vn, geom: {rotateZ: Math.PI/2, rotateX: Math.PI/2, BufferG: true}};
		if(d_n2) { infO.radius_nr = d_n2/2; infO.radius_vn = d_v2/2; }
		var geom3 = crCircle_2(infO);
		geom3.translate(p[0].x, p[0].y, p[0].z);				
	}

	// круг с отверстием (конец)
	{
		var infO = {radius_nr: d_n1/2, radius_vn: d_v1/2, edge_nr: edge_nr, edge_vn: edge_vn, geom: {rotateZ: -Math.PI/2, rotateX: -Math.PI/2, BufferG: true}};		
		var geom4 = crCircle_2(infO);
		geom4.translate(p[1].x, p[1].y, p[1].z);		
	}
	

	var m1 = (material_nr) ? material_nr : mat_default;
	var m2 = (material_vn) ? material_vn : mat_default;
	var m3 = (material_cap) ? material_cap : mat_default;
	
	var geometry = new THREE.Geometry();
	geometry.merge(geom1, geom1.matrix);
	geometry.merge(geom2, geom2.matrix, 1);
	geometry.merge(geom3, geom3.matrix, 2);
	geometry.merge(geom4, geom4.matrix, 2);

	var obj = new THREE.Mesh(geometry, [m1, m2, m3]);	 
	
	return obj;	
}




// втулка
function crFormSleeve_1(cdm) 
{
	var geometry = cdm.g;
	var pos = (cdm.pos) ? cdm.pos : { x: 0, y: 0, z: 0 };
	var rot = (cdm.rot) ? cdm.rot : { x: 0, y: 0, z: 0 };
	if(cdm.pos1) { var pos1 = cdm.pos1; }
		
	var dlina = cdm.dlina;  
	var d_n1 = (cdm.diameter_nr) ? cdm.diameter_nr : false;
	var d_v1 = (cdm.diameter_vn) ? cdm.diameter_vn : false;
	var d_n2 = (cdm.d_n2) ? cdm.d_n2 : false;
	var d_v2 = (cdm.d_v2) ? cdm.d_v2 : false;	
	var edge_nr = (cdm.edge_nr) ? cdm.edge_nr : 32;
	var edge_vn = (cdm.edge_vn) ? cdm.edge_vn : 32;
	var rezba_nr = cdm.rezba_nr;
	var rezba_vn = cdm.rezba_vn;
	
	var ind = [0, 0, 0, 0];	
	if(cdm.ind) ind = cdm.ind; 	

	var arrG = [];
	
	// фтулка наружная
	{
		var infO = {r1: d_n1/2, length: dlina, edge: edge_nr, geom: {rotateZ: -Math.PI/2} };
		if(d_n2) { infO.r2 = d_n2/2; }
		arrG[0] = crCild_2( infO );
		
		if(pos1) arrG[0].translate(pos1.x, pos1.y, pos1.z);
	}	

	// фтулка внутринняя 
	{		
		var infO = {r1: d_v1/2, length: dlina, edge: edge_vn, geom: {rotateZ: -Math.PI/2} };
		if(d_v2) { infO.r2 = d_v2/2; }
		arrG[1] = crCild_2( infO );

		if(pos1) arrG[1].translate(pos1.x, pos1.y, pos1.z);
	}
	
	// круг с отверстием (начало)
	{
		var infO = {radius_nr: d_n1/2, radius_vn: d_v1/2, edge_nr: edge_nr, edge_vn: edge_vn};
		if(d_n2) { infO.radius_nr = d_n2/2; infO.radius_vn = d_v2/2; }
		arrG[2] = crCircle_2(infO);
		
		arrG[2].rotateZ(Math.PI/2);
		arrG[2].rotateY(Math.PI/2);
		arrG[2].translate(-dlina/2, 0, 0);

		if(pos1) arrG[2].translate(pos1.x, pos1.y, pos1.z);
	}

	// круг с отверстием (конец)
	{
		var infO = {radius_nr: d_n1/2, radius_vn: d_v1/2, edge_nr: edge_nr, edge_vn: edge_vn};		
		arrG[3] = crCircle_2(infO);
		
		arrG[3].rotateZ(Math.PI/2);
		arrG[3].rotateY(Math.PI/2);
		arrG[3].translate(dlina/2, 0, 0);

		if(pos1) arrG[3].translate(pos1.x, pos1.y, pos1.z);
	}
	
	
	for ( var i = 0; i < arrG.length; i++ )
	{
		arrG[i].rotateX(rot.x); 
		arrG[i].rotateY(rot.y); 
		arrG[i].rotateZ(rot.z);		
		arrG[i].translate(pos.x, pos.y, pos.z);	
	}
	
	
	arrG[0].computeBoundingSphere();
	var posC = arrG[0].boundingSphere.center.clone()	
		
	
	geometry.merge(arrG[0], arrG[0].matrix, ind[0]);
	geometry.merge(arrG[1], arrG[1].matrix, ind[1]);
	geometry.merge(arrG[2], arrG[2].matrix, ind[2]);
	geometry.merge(arrG[3], arrG[3].matrix, ind[3]);

	return { pos: posC };
}




// цилиндр
function crCild_2(cdm)
{
	var r1 = cdm.r1;
	var r2 = (cdm.r2) ? cdm.r2 : r1;
	var length = cdm.length;
	var edge = cdm.edge;
	var geom = (cdm.geom) ? cdm.geom : {};
	var BufferG = (geom.BufferG) ? true : false;	
	
	//----------
	
	var geometry = new THREE.CylinderGeometry( r1, r2, length, edge, 1, true );
	
	if(geom.rotateX) { geometry.rotateX(geom.rotateX); }
	if(geom.rotateY) { geometry.rotateY(geom.rotateY); }
	if(geom.rotateZ) { geometry.rotateZ(geom.rotateZ); }
	
	upUvs_5(geometry);
	
	if(BufferG && 1==2)
	{
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);			
	}

	return geometry;
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
		
		var geometry = new THREE.ShapeGeometry( arcShape );
		
		if(geom.rotateX) { geometry.rotateX(geom.rotateX); }
		if(geom.rotateY) { geometry.rotateY(geom.rotateY); }
		if(geom.rotateZ) { geometry.rotateZ(geom.rotateZ); }		
	}
		
	return geometry;
}



// сфера или полусфера
function crSphere_1(cdm)
{
	var radius = cdm.radius;
	var cutRad = cdm.cutRad;
	var material = cdm.material;	
	
	//----------
	
	var geometry = new THREE.SphereGeometry( radius, 32, 32, 0, cutRad );
	
	if(cdm.rotateX) { geometry.rotateX(cdm.rotateX); }
	if(cdm.rotateY) { geometry.rotateY(cdm.rotateY); }
	if(cdm.rotateZ) { geometry.rotateZ(cdm.rotateZ); }	

	
	var obj = new THREE.Mesh( geometry, material );

	return obj;	
}




// сфера или полусфера
function crSphere_2(cdm)
{
	var geometry = cdm.g;
	var pos = (cdm.pos) ? cdm.pos : { x: 0, y: 0, z: 0 };
	var rot = (cdm.rot) ? cdm.rot : { x: 0, y: 0, z: 0 };
	
	var radius = cdm.radius;
	var cutRad = cdm.cutRad;
	var ind = (cdm.ind !== undefined) ? cdm.ind : 0; 
	
	var g1 = new THREE.SphereGeometry( radius, 32, 32, 0, cutRad );
	
	if(cdm.rotateX) { g1.rotateX(cdm.rotateX); }
	if(cdm.rotateY) { g1.rotateY(cdm.rotateY); }
	if(cdm.rotateZ) { g1.rotateZ(cdm.rotateZ); }	

	geometry.merge(g1, g1.matrix, ind);	
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
	
	if(cdm.q) { cube.quaternion.copy(cdm.q); }
	if(cdm.rot) { cube.rotation.set(cdm.rot.x, cdm.rot.y, cdm.rot.z);  }
	
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




function upUvs_5( geometry )
{	
    geometry.faceVertexUvs[0] = [];
	var faces = geometry.faces;
	
    for (var i = 0; i < faces.length; i++) 
	{		
		var components = ['x', 'y', 'z'].sort(function(a, b) {			
			return Math.abs(faces[i].normal[a]) - Math.abs(faces[i].normal[b]);
		});	


        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];				

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(v1[components[0]], v1[components[1]]),
            new THREE.Vector2(v2[components[0]], v2[components[1]]),
            new THREE.Vector2(v3[components[0]], v3[components[1]])
        ]);
    }

    geometry.uvsNeedUpdate = true;
	geometry.elementsNeedUpdate = true; 
}



