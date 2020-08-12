



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
	
	var group = new THREE.Group();
	
	var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];
	
	// фтулка наружная
	if(diameter_nr)
	{
		var infO = {radius: diameter_nr/2, length: dlina, edge: edge_nr, geom: {rotateZ: -Math.PI/2, BufferG: true} };
		
		if(rezba_nr) 
		{
			infO.material = infProject.material.rezba_1;
		}
		else
		{
			infO.material = (edge_nr < 20) ? infProject.material.metal_1_edge : infProject.material.metal_1;
		}
		
		var obj = crCild_2( infO );
		
		group.add( obj );
	}
	

	// фтулка внутринняя 
	if(diameter_vn)
	{		
		var infO = {radius: diameter_vn/2, length: dlina, edge: edge_vn, geom: {rotateZ: -Math.PI/2, BufferG: true} };
		
		if(rezba_vn) 
		{
			infO.material = infProject.material.rezba_1;
		}
		else
		{
			infO.material = (edge_nr < 20) ? infProject.material.metal_1_edge : infProject.material.metal_1;
		}
		
		var obj = crCild_2( infO );
		
		group.add( obj );
	}	
	
	
	// круг с отверстием (начало)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, edge_nr: edge_nr, edge_vn: edge_vn, geom: {rotateZ: Math.PI/2, rotateX: Math.PI/2, BufferG: true}};
		infO.material = infProject.material.metal_1;
		var obj = crCircle_2(infO);
		
		obj.position.copy(p[0]);
		group.add( obj );				
	}
	
	
	// круг с отверстием (конец)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, edge_nr: edge_nr, edge_vn: edge_vn, geom: {rotateZ: -Math.PI/2, rotateX: -Math.PI/2, BufferG: true}};
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





