







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
	var dlina = 1;  
	var diameter_nr = 0.2;
	var diameter_vn = 0.1;
	
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
		var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];	

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
		
		scene.add( obj );
		
		var ooob = obj;
	}
	

	// фтулка внутринняя 
	if(1==1)
	{		
		var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];	

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
		
		var obj = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ map: texture, lightMap: lightMap_1 }) );
		obj.position.copy(p[p.length - 1]); 
		group.add( obj );		
	}	
	
	
	scene.add( group );

	group.position.set(0, 1, 2);
	
	if(1==2)
	{
		var obj2 = createSleeveObj_1({dlina: 0.5, diameter_nr: diameter_nr, diameter_vn: diameter_vn});
		obj2.position.copy(group.position);
		obj2.position.y += obj2.userData.cdm.dlina/2;
		obj2.rotation.set(0, 0, Math.PI/2);		
	}
	else
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



function createSleeveObj_1(cdm) 
{	
	var dlina = cdm.dlina;  
	var diameter_nr = cdm.diameter_nr;
	var diameter_vn = cdm.diameter_vn;
	
	var group = new THREE.Group();
	group.userData.cdm = cdm;
	
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
		var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];	

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
		var p = [new THREE.Vector3(-dlina/2,0,0), new THREE.Vector3(dlina/2,0,0)];	

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
		
		var obj = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ map: texture, lightMap: lightMap_1 }) );
		obj.position.copy(p[p.length - 1]); 
		group.add( obj );		
	}	
	
	
	scene.add( group );

	return group;	
}






