




function st_radiator_2222()
{
	var loader = new THREE.FBXLoader();
	
	loader.load( '/gl2/t/st_radiator.FBX', function ( obj ) 						
	{ 					
		obj.userData.tag = 'obj';
		obj.userData.obj3D = {};
		obj.userData.obj3D.lotid = 0;
		obj.userData.obj3D.nameRus = 'неизвестный объект';
		obj.userData.obj3D.typeGroup = '';
		obj.userData.obj3D.helper = null;
		
		obj.userData.obj3D.ur = {};
		obj.userData.obj3D.ur.pos = new THREE.Vector3();
		obj.userData.obj3D.ur.q = new THREE.Quaternion();			
		
		obj.position.set(0, 1, 0);
		//obj.rotation.set(0, 0, 0);
		scene.add( obj ); 

		//infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
		
	});			
}



function st_radiator_1(cdm)
{
	var obj = cdm.obj;
	
	var o = null;
	var o1 = null;
	var o2 = null;
	
	obj.traverse( function ( child ) 
	{
		child.updateMatrixWorld();
		
		if ( child.isMesh ) 
		{ 
			//if( child.material ){ child.material.side = THREE.DoubleSide; }
			
			if(child.name == 'Box003') { o = child;  }
			if(child.name == 'rib_1_') { o1 = child;  }
		}
	});	

	// создаем грань для противоположной сторны радиатора
	{
		o2 = o1.clone();
		o2.rotation.y = Math.PI;
		obj.add( o2 );		
		
		o2.updateMatrixWorld();					
	}
	
	
	var positions = o.geometry.attributes.position.array;
	
	
	// получаем номера точек min/max
	var boundArr = getNumberVertexMinMax({obj: o});
	
	
	// подсчитываем offset x,y,z чтобы получить радиатор нужного размера 
	if(1==1)
	{
		var x = positions[51] - positions[0];
		var y = positions[55] - positions[1];
		var z = positions[2] - positions[5];

		var offsetX = cdm.size.x - x;
		var offsetY = cdm.size.y - y;
		var offsetZ = cdm.size.z - z;
	}		
			
	// изменение размера объекта
	offsetSizeVertexObj({obj: o, offsetX: offsetX, offsetY: offsetY, offsetZ: offsetZ, boundArr: boundArr});

	
	// показываем размеры 
	if(1==2)
	{
		var x = positions[51] - positions[0];
		var y = positions[55] - positions[1];
		var z = positions[2] - positions[5];
		
		console.log('size', x, y, z);				
	}
			

	// внешнее отображение vertex
	if(1==2)
	{
		createHelperVertex({obj: o});
		//createHelperVertex({obj: o1});
		//createHelperVertex({obj: o2});
	}
	
	

	
	// получаем ширину ребра радиатора и длину проема радиатора, а затем заполняем ребрами и подгоняем длину ребер
	if(1==1)
	{
		
		// определяем сколько нужно кол-во ребер
		{
			var positions = o.geometry.attributes.position.array;
			var x = positions[114] - positions[96];
			
			var positions_1 = o1.geometry.attributes.position.array;			
			var x1 = positions_1[39] - positions_1[0];
			
			var count = Math.floor(x/x1);
			
			if(count < 1) count = 1;
		}
		
		// определяем высоту ребер
		{
			var positions = o.geometry.attributes.position.array;
			var positions_1 = o1.geometry.attributes.position.array;			
			
			var offsetY = positions[376] - positions_1[124]; 
		}			

		// меняем размер ребра, чтобы при установке всех ребер в конце не было дырки
		{		
			var sizeX = x - (count * x1);	// на сколько больше/меньше заполненные ребры, чем проем радиатора
			sizeX = sizeX/count;			// на сколько больше/меньше уменьшить одно ребро, чтоб все ребры влезли 
			
			// получаем номера точек min/max
			var boundArr = getNumberVertexMinMax({obj: o1});

			// изменение размера объекта
			offsetSizeVertexObj({obj: o1, offsetX: sizeX, offsetY: offsetY, boundArr: boundArr});	

			var x1 = positions_1[39] - positions_1[0];	// опеределяем ширину ребра, чтобы на это значение сдвинуть следующее ребро
		}

		
		
		// смещаем 1-ое ребро радиатора к началу
		{
			var positions_1 = o1.geometry.attributes.position.array;
			
			var p1 = new THREE.Vector3(positions[96], positions[97], positions[98]).applyMatrix4( o.matrixWorld );		
			var p2 = new THREE.Vector3(positions_1[0], positions_1[1], positions_1[2]).applyMatrix4( o1.matrixWorld );			
			
			var offset = p1.sub(p2);
			o1.position.add(offset);
		}
		
		// смещаем 2-ое ребро радиатора к началу
		if(1==1)
		{
			var positions_1 = o2.geometry.attributes.position.array;
			
			var p1 = new THREE.Vector3(positions[312], positions[313], positions[314]).applyMatrix4( o.matrixWorld );		
			var p2 = new THREE.Vector3(positions_1[39], positions_1[40], positions_1[41]).applyMatrix4( o2.matrixWorld );			
			
			var offset = p1.sub(p2); 
			o2.position.add(offset);
		}
		
		
		
		// добавляем ребры на 1-ую сторону
		for (var i = 0; i < count - 1; i++)
		{
			var o1 = o1.clone();
			obj.add( o1 );
			o1.position.x += x1;				
		}
		
		// добавляем ребры на 2-ую сторону
		for (var i = 0; i < count - 1; i++)
		{
			var o2 = o2.clone();
			obj.add( o2 );
			o2.position.x += x1;				
		}		
		
	}
	
	getBoundObject_2({obj: obj});	// обновляем геомтерию box
}	





function createCone_2(cdm) 
{	
	var dlina = 3;  
	var diameter_nr = 0.2;
	var diameter_vn = 0.1;
				
	
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
		obj.userData.tag = 'obj';
		obj.position.set(0, 1, 1);	

		upUvs_4( obj );
		
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);
		
		scene.add( obj );
			
		infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
	}
	

	// фтулка внутринняя 
	if(1==1)
	{

		var geometry = new THREE.CylinderGeometry( diameter_vn/2, diameter_vn/2, dlina, 32, 1, true );
		geometry.rotateZ(-Math.PI/2);		
		
		var texture = new THREE.TextureLoader().load(infProject.path+'/img/obj/rezba_1.png');
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.x = 200;
		texture.repeat.y = 1;
		texture.rotation = THREE.Math.degToRad( 2 );		
		var material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, map: texture, lightMap: lightMap_1});
		
		var obj = new THREE.Mesh( geometry, material );
		upUvs_4( obj );
		
		obj.geometry.dispose();
		obj.geometry = new THREE.BufferGeometry().fromGeometry(obj.geometry);
		
		obj.userData.tag = 'obj';
		obj.position.set(0, 1, 1);	
		
		scene.add( obj );		
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
		
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ map: texture, lightMap: lightMap_1 }) );
		mesh.position.set( -dlina/2, 1, 1 );
		scene.add( mesh );		
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
		
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ map: texture, lightMap: lightMap_1 }) );
		mesh.position.set( dlina/2, 1, 1 ); 
		scene.add( mesh );		
	}	
	
	
	return obj;
}
















