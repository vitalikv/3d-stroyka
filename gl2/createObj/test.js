







function createTestObj(cdm) 
{	
	var dlina = 0.1;  
	var diameter_nr = 0.1;
	var diameter_vn = 0.05;
	
	var group = new THREE.Group();
	
	function createCircle_1(cdm)
	{
		var count = 48;
		var circle = [];
		var g = (Math.PI / 2) / count;
		
		for ( var i = 0; i < count; i++ )
		{
			var angle = g * i;
			circle[i] = new THREE.Vector3();
			circle[i].x = Math.sin(angle) * cdm.size;
			circle[i].y = -Math.cos(angle) * cdm.size + cdm.size;
			circle[i].z = 0;
		}

		return circle;
	}
	
	// фтулка наружная
	if(1==1)
	{
		var p = createCircle_1({size: dlina});
		var p1 = p[0].clone();
		p1.x -= 0.01;
		p.unshift(p1);
		p[p.length] = p[p.length - 1].clone();
		p[p.length - 1].y += 0.01;
		//var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(dlina/2,1,0)];	

		var pipeSpline = new THREE.CatmullRomCurve3(p);
		pipeSpline.curveType = 'catmullrom';
		pipeSpline.tension = 0;		
		
		var geometry = new THREE.TubeGeometry( pipeSpline, p.length, diameter_nr/2, 32, false );	
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		
		var material = new THREE.MeshPhongMaterial({color: 0xffff00, lightMap: lightMap_1});		

		var obj = new THREE.Mesh( geometry, material );
		upUvs_4( obj );
		
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);
		
		group.add( obj );
	}
	

	// фтулка внутринняя 
	if(1==1)
	{
		var p = createCircle_1({size: dlina});
		var p1 = p[0].clone();
		p1.x -= 0.01;
		p.unshift(p1);		
		p[p.length] = p[p.length - 1].clone();
		p[p.length - 1].y += 0.01;		
		//var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(dlina/2,1,0)];	

		var pipeSpline = new THREE.CatmullRomCurve3(p);
		pipeSpline.curveType = 'catmullrom';
		pipeSpline.tension = 0;		
		
		var geometry = new THREE.TubeGeometry( pipeSpline, p.length, diameter_vn/2, 32, false );	
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		var material = new THREE.MeshPhongMaterial({color: 0xff00ff,side: THREE.BackSide, lightMap: lightMap_1});		

		var obj = new THREE.Mesh( geometry, material );	
		upUvs_4( obj );
				
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);
		
		group.add( obj );
	}	
	
	//-----------------
	
	
	function createCircle_2(cdm)
	{
		var count = 48;
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
	
	
	// круг с отверстием (начало)
	if(1==1)
	{
		var circle_1 = createCircle_2({size: diameter_nr/2});
		var circle_2 = createCircle_2({size: diameter_vn/2});
		
		var arcShape = new THREE.Shape( circle_1 );
		var holePath = new THREE.Shape( circle_2 );
		arcShape.holes.push( holePath );	
		
		var texture = new THREE.TextureLoader().load(infProject.path+'/img/UV_Grid_Sm.jpg');
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

		var geometry = new THREE.ShapeBufferGeometry( arcShape );
		geometry.rotateY(-Math.PI/2);
		
		var obj = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ map: texture, lightMap: lightMap_1 }) );
		obj.position.copy(p[0]);
		group.add( obj );		
	}
	
	
	// круг с отверстием (конец)
	if(1==1)
	{
		var circle_1 = createCircle_2({size: diameter_nr/2});
		var circle_2 = createCircle_2({size: diameter_vn/2});
		
		var arcShape = new THREE.Shape( circle_1 );
		var holePath = new THREE.Shape( circle_2 );
		arcShape.holes.push( holePath );	
		
		var texture = new THREE.TextureLoader().load(infProject.path+'/img/UV_Grid_Sm.jpg');
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

		var geometry = new THREE.ShapeBufferGeometry( arcShape );
		geometry.rotateY(Math.PI/2);
		geometry.rotateZ(Math.PI/2);
		
		var obj = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ map: texture, lightMap: lightMap_1 }) );
		obj.position.copy(p[p.length - 1]); 
		group.add( obj );		
	}	
	
	
	scene.add( group );

	group.position.set(0, 1, -2);
	
	var obj2 = createTestObj_2({dlina: 0.05, diameter_nr: diameter_vn + 0.02, diameter_vn: diameter_vn + 0.0001});
	obj2.position.copy(group.position);
	//obj2.position.x -= obj2.children[0].userData.cdm.dlina/2;
	obj2.position.x -= obj2.userData.cdm.dlina/2;
	
	var obj2 = createTestObj_2({dlina: 0.05, diameter_nr: diameter_vn + 0.02, diameter_vn: diameter_vn + 0.0001});
	obj2.position.copy(group.position);
	obj2.position.add(p[p.length - 1]);
	obj2.position.y += obj2.userData.cdm.dlina/2;
	obj2.rotation.z = Math.PI/2;
	
	console.log(777777, obj2.position);
}





function createTestObj_2(cdm) 
{	
	var dlina = cdm.dlina;  
	var diameter_nr = cdm.diameter_nr;
	var diameter_vn = cdm.diameter_vn;
				
	var group = new THREE.Group();
	group.userData.cdm = cdm;
	
	// фтулка наружная
	if(1==1)
	{

		var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];	

		var pipeSpline = new THREE.CatmullRomCurve3(p);
		pipeSpline.curveType = 'catmullrom';
		pipeSpline.tension = 0;		
		
		var geometry = new THREE.TubeGeometry( pipeSpline, 1, diameter_nr/2, 32, false );	
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		
		var texture = new THREE.TextureLoader().load(infProject.path+'/img/obj/rezba_1.png');
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.x = 200;
		texture.repeat.y = 1;
		texture.rotation = THREE.Math.degToRad( 2 );
		var material = new THREE.MeshPhongMaterial({color: 0xcccccc, map: texture, lightMap: lightMap_1});		

		var obj = new THREE.Mesh( geometry, material );	
		upUvs_4( obj );
		
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);
		
		group.add( obj );
	}
	

	// фтулка внутринняя 
	if(1==1)
	{

		var geometry = new THREE.CylinderGeometry( diameter_vn/2, diameter_vn/2, dlina, 32, 1, true );
		geometry.rotateZ(-Math.PI/2);		
		
		if(1==2)
		{
			var texture = new THREE.TextureLoader().load(infProject.path+'/img/obj/rezba_1.png');
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.x = 200;
			texture.repeat.y = 1;
			texture.rotation = THREE.Math.degToRad( 2 );		
			var material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.BackSide, map: texture, lightMap: lightMap_1});			
		}
		else
		{	
			var material = new THREE.MeshPhongMaterial({color: 0xcccccc, side: THREE.BackSide, lightMap: lightMap_1});			
		}
		
		var obj = new THREE.Mesh( geometry, material );
		upUvs_4( obj );
		
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);	
		
		group.add( obj );		
	}	
	
	//-----------------
	
	
	function createCircle_2(cdm)
	{
		var count = 48;
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
	
	
	// круг с отверстием (начало)
	if(1==1)
	{
		var circle_1 = createCircle_2({size: diameter_nr/2});
		var circle_2 = createCircle_2({size: diameter_vn/2});
		
		var arcShape = new THREE.Shape( circle_1 );
		var holePath = new THREE.Shape( circle_2 );
		arcShape.holes.push( holePath );	

		var geometry = new THREE.ShapeBufferGeometry( arcShape );
		geometry.rotateY(-Math.PI/2);
		
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ color: 0xcccccc, lightMap: lightMap_1 }) );
		mesh.position.set( -dlina/2, 0, 0 );
		group.add( mesh );		
	}
	
	
	// круг с отверстием (конец)
	if(1==1)
	{
		var circle_1 = createCircle_2({size: diameter_nr/2});
		var circle_2 = createCircle_2({size: diameter_vn/2});
		
		var arcShape = new THREE.Shape( circle_1 );
		var holePath = new THREE.Shape( circle_2 );
		arcShape.holes.push( holePath );	

		var geometry = new THREE.ShapeBufferGeometry( arcShape );
		geometry.rotateY(Math.PI/2);
		
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ color: 0xcccccc, lightMap: lightMap_1 }) );
		mesh.position.set( dlina/2, 0, 0 ); 
		group.add( mesh );		
	}	
	
	if(1==2)
	{
		var obj = getBoundObject_1({obj: group});
	}
	else
	{
		var obj = group;
	}
	
	scene.add( obj );
	
	return obj;
}




function createTestObj_3(cdm) 
{	
	var group1 = createSleeveObj_1({dlina: 1, diameter_nr: 0.2, diameter_vn: 0.1, capStart: true, capEnd: true, hole: true});		
	group1.position.set(0, 1, 2);
	scene.add( group1 );

	
	var group2 = createSleeveObj_1({dlina: 0.5, diameter_nr: 0.2, diameter_vn: 0.1, capStart: true, capEnd: true, hole: true});		
	group2.position.set(0, 1, 2);
	//group2.position.y += 0.25;
	group2.rotation.set(0, 0, Math.PI/2);	
	scene.add( group2 );
	
	
	
	
	var infO = {radius: 0.2/2, length: 1, geom: {hole: false, rotateZ: -Math.PI/2, BufferG: false} };
	infO.material = { color: 0xcccccc };
	var obj1 = crCild_1( infO );	
	scene.add( obj1 );
	
	var infO = {radius: 0.2/2, length: 0.5, geom: {hole: false, BufferG: false} };
	infO.material = { color: 0xcccccc };
	var obj2 = crCild_1( infO );
	obj2.position.y += 0.25;
	scene.add( obj2 );	

	
	if(1==2)
	{
		var obj1 = group.children[0];
		var obj2 = group.children[0];
		scene.add( obj1 );
		scene.add( obj2 );
		
		obj1.position.set(0, 1, 2);
		obj2.position.set(0, 1, 2);
		obj2.position.y += 0.25;		
		obj2.rotation.set(0, 0, Math.PI/2);		
	}
	
	if(1==2)
	{
		var newBSP = new ThreeBSP( obj1 ).subtract( new ThreeBSP( obj2 ) );				
		
		obj1.geometry.dispose();	
		obj1.geometry = newBSP.toGeometry();		

		obj1.geometry.verticesNeedUpdate = true;
		obj1.geometry.elementsNeedUpdate = true;	
		//obj1.geometry.computeVertexNormals();  
		obj1.geometry.computeBoundingSphere();
		obj1.material.shading = THREE.SmoothShading;
		obj1.material.needsUpdate = true;
		
		obj2.material.wireframe = true;
		//obj2.position.z += 1;
	}
	
	if(1==1)
	{				
		var newBSP = new ThreeBSP( obj1 ).intersect( new ThreeBSP( obj2 ) );
		
		var intersectObj = newBSP.toMesh(obj1.material);
		intersectObj.position.set(0, 1, 2);
		//scene.add( intersectObj );
		//obj3.position.y += 1;
		
		
		var obj1 = group1.children[0];
		var obj2 = group2.children[0];
		scene.add( obj1 );
		scene.add( obj2 );
		
		obj1.position.set(0, 1, 2);
		obj2.position.set(0, 1, 2);
		obj2.position.y += 0.25;		
		obj2.rotation.set(0, 0, Math.PI/2);			
		//obj2.material.wireframe = true;
		//obj2.position.z += 1;
		
		var newBSP = new ThreeBSP( obj1 ).subtract_2( new ThreeBSP( intersectObj ) );				
		
		obj1.geometry.dispose();	
		obj1.geometry = newBSP.toGeometry();		

		obj1.geometry.verticesNeedUpdate = true;
		obj1.geometry.elementsNeedUpdate = true;	
		//obj1.geometry.computeVertexNormals();  
		obj1.geometry.computeBoundingSphere();
		obj1.material.shading = THREE.SmoothShading;
		obj1.material.needsUpdate = true;
		
		var newBSP = new ThreeBSP( obj2 ).subtract_2( new ThreeBSP( intersectObj ) );				
		
		obj2.geometry.dispose();	
		obj2.geometry = newBSP.toGeometry();		

		obj2.geometry.verticesNeedUpdate = true;
		obj2.geometry.elementsNeedUpdate = true;	
		//obj1.geometry.computeVertexNormals();  
		obj2.geometry.computeBoundingSphere();
		obj2.material.shading = THREE.SmoothShading;
		obj2.material.needsUpdate = true;		

		intersectObj.position.y += 0.5;
		obj2.position.y += 1;
	}	
		
	if(1==2)
	{
		
		var geometry = new THREE.CylinderGeometry( diameter_vn/2, diameter_vn/2, dlina, 32, 1, false );
		geometry.rotateZ(-Math.PI/2);		
		
		var material = new THREE.MeshPhongMaterial({color: 0x0000ff, side: THREE.DoubleSide, lightMap: lightMap_1});
		
		var obj = new THREE.Mesh( geometry, material );
		
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);
		
		obj.userData.tag = 'obj';
		obj.position.set(-0.2, 1, 2);	
		obj.rotation.set(0, 0, Math.PI/2);	
		
		scene.add( obj );	

		ooob.position.set(0, 1, 2);
		//wdClone.position.copy( wd.position );
		//var obj_2 = obj.clone();
		obj.geometry = new THREE.Geometry().fromBufferGeometry(obj.geometry);
		//obj_2.position.copy( obj.position );
		
		//var group_2 = group.children[0].clone();
		ooob.geometry = new THREE.Geometry().fromBufferGeometry(ooob.geometry);		
		
		obj.updateMatrixWorld();
		ooob.updateMatrixWorld();
		
		var wdBSP = new ThreeBSP( obj );     
		var wallBSP = new ThreeBSP( ooob ); 			// копируем выбранную стену	
		var newBSP = wallBSP.subtract( wdBSP );				// вычитаем из стены объект нужной формы
		
		//wallClone.geometry.dispose();
		ooob.geometry.dispose();	
		ooob.geometry = newBSP.toGeometry();		
		ooob.geometry.computeFaceNormals();
		
		ooob.geometry.verticesNeedUpdate = true;
		ooob.geometry.elementsNeedUpdate = true;	
		ooob.geometry.computeBoundingSphere();		

		//group.children[0].material.wireframe = true; 
		
		obj.position.z -= 3;
		
		console.log(5555, ooob.geometry);
	}
	
	
	
	
}


// втулка
function createSleeveObj_1(cdm) 
{	
	var dlina = cdm.dlina;  
	var diameter_nr = (cdm.diameter_nr) ? cdm.diameter_nr : false;
	var diameter_vn = (cdm.diameter_vn) ? cdm.diameter_vn : false;
	var capStart = (cdm.capStart) ? cdm.capStart : false;
	var capEnd = (cdm.capEnd) ? cdm.capEnd : false;
	
	var group = new THREE.Group();
	
	var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];
	
	// фтулка наружная
	if(diameter_nr)
	{
		var infO = {radius: diameter_nr/2, length: dlina, geom: {hole: cdm.hole, rotateZ: -Math.PI/2, BufferG: false} };
		infO.material = { color: 0xff8080 };
		var obj = crCild_1( infO );
		
		group.add( obj );
	}
	

	// фтулка внутринняя 
	if(diameter_vn)
	{		
		var infO = {radius: diameter_vn/2, length: dlina, geom: {hole: cdm.hole, rotateZ: -Math.PI/2, BufferG: false} };
		infO.material = { side: THREE.BackSide, map: {url: '/img/obj/rezba_1.png', repeat: {x:200, y: 1}, rotation: 2 } };
		var obj = crCild_1( infO );
		
		group.add( obj );
	}	
	
	
	// круг с отверстием (начало)
	if(capStart)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, geom: {rotateY: -Math.PI/2}};
		infO.material = { map: {url: '/img/UV_Grid_Sm.jpg' }};
		var obj = crCircle_1(infO);
		
		obj.position.copy(p[0]);
		group.add( obj );				
	}
	
	
	// круг с отверстием (конец)
	if(capEnd)
	{
		var infO = {radius_nr: diameter_nr/2, radius_vn: diameter_vn/2, geom: {rotateY: Math.PI/2}};
		infO.material = { map: {url: '/img/UV_Grid_Sm.jpg' }};
		var obj = crCircle_1(infO);
		
		obj.position.copy(p[p.length - 1]);
		group.add( obj );		
	}	
	
	
	return group;	
}



// цилиндр
function crCild_1(cdm)
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
	
	var infM = {color: 0xffffff, lightMap: lightMap_1};

	if(material.color){ infM.color = material.color; }
	if(material.side){ infM.side = material.side; }
	
	if(material.map)
	{
		var texture = new THREE.TextureLoader().load(infProject.path + material.map.url);
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		
		if(material.map.repeat)
		{
			if(material.map.repeat.x) texture.repeat.x = material.map.repeat.x;	
			if(material.map.repeat.y) texture.repeat.y = material.map.repeat.y;			
		}
		
		if(material.map.rotation) texture.rotation = THREE.Math.degToRad( material.map.rotation );
			
		infM.map = texture;			
	}
	
	var material = new THREE.MeshPhongMaterial(infM);
	
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
function crCircle_1(cdm)
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


	// material
	{
		var infM = {color: 0xffffff, lightMap: lightMap_1};

		if(material.color){ infM.color = material.color; }
		if(material.side){ infM.side = material.side; }
		
		if(material.map)
		{
			var texture = new THREE.TextureLoader().load(infProject.path + material.map.url);
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			
			if(material.map.repeat)
			{
				if(material.map.repeat.x) texture.repeat.x = material.map.repeat.x;	
				if(material.map.repeat.y) texture.repeat.y = material.map.repeat.y;			
			}
			
			if(material.map.rotation) texture.rotation = THREE.Math.degToRad( material.map.rotation );
				
			infM.map = texture;			
		}
		
		var material = new THREE.MeshPhongMaterial(infM);			
	}
	
	var obj = new THREE.Mesh( geometry, material );
		
	return obj;
}






