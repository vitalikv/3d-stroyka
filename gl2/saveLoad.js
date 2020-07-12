


function loadUrl(href) 
{
	var url = new URL(href); 
	var url = url.searchParams.get('file');  
	if(url) { loadFile(url); }
}



var resetPop =
{
	camera3D : 
	{
		userData : function()
		{
			var camera = { type : 'fly', height : camera3D.position.y, startProject : true, rot360 : { start : false, angle : 0, qEnd : null } };
			camera.click = { pos : new THREE.Vector3() };
			
			return camera;			
		}
	},

	fileInfo : function()
	{
		return { last : {cam : { obj : camera, type : '', pos : new THREE.Vector3(), rot : new THREE.Vector3() }} };
	},
	
	infProjectSceneArray : function()
	{
		var array = { point : obj_point, wall : obj_line, window : [], door : [], room : room, ceiling : ceiling, obj : [], tube : [] };
		array.fundament = [];
		array.lineGrid = { limit : false };
		array.base = (infProject.start)? infProject.scene.array.base : [];	// массив клонируемых объектов
		array.group = [];
		
		return array;
	},

	listColor : function()
	{	
		var array = {};
		
		array.door2D = 'rgb(166, 151, 99)';
		array.window2D = 'rgb(122, 160, 195)';
		array.active2D = 'rgb(255, 55, 0)';
		array.hover2D = 'rgb(69, 165, 58)';
		array.lineTube2D = 0x0252f2;

		return array;
	},
	
	clickO : function()
	{
		var inf = { obj: null, last_obj: null, hover: null, rayhit : null, button : null, buttonAct : null };
		inf.down = null;
		inf.move = null;
		inf.up = null;
		inf.offset = new THREE.Vector3();
		inf.actMove = false;
		inf.pos = { clickDown : new THREE.Vector3() };
		inf.click = { wall : [], point : [] };  
		inf.selectBox = { arr : [], drag : false, move : false, walls : [], walls_2 : [], point : [] };
		inf.keys = [];
		inf.options = null;
		
		return inf;
	},
	
	active : function()
	{
		return { create : true, delete : true, click2D : true, click3D : true, move : true, replace : true, unlock : true };
	},	
}



function resetScene() 
{	
	hideMenuUI(clickO.last_obj);
	
	console.log(renderer.info.memory);
	
	var wall = infProject.scene.array.wall;
	var point = infProject.scene.array.point;
	var window = infProject.scene.array.window;
	var door = infProject.scene.array.door;
	var tube = infProject.scene.array.tube;
	var obj = infProject.scene.array.obj;
	var group = infProject.scene.array.group;
	var substrate = infProject.scene.substrate.floor;
	
	for ( var i = 0; i < wall.length; i++ )
	{ 
		scene.remove(wall[i].label[0]); 
		scene.remove(wall[i].label[1]);
		if(wall[i].userData.wall.outline) { scene.remove(wall[i].userData.wall.outline); }
		if(wall[i].userData.wall.zone) { disposeNode(wall[i].userData.wall.zone.label); scene.remove(wall[i].userData.wall.zone.label); }

		for(var i2 = wall[i].userData.wall.brick.arr.length - 1; i2 > -1; i2--)
		{
			var block = wall[i].userData.wall.brick.arr[i2];
			scene.remove(block);			
		}			
		
		wall[i].label = [];
		wall[i].userData.wall.p = [];
		wall[i].userData.wall.outline = null;
		wall[i].userData.wall.zone = null;
		wall[i].userData.wall.brick.arr = [];
		
		scene.remove(wall[i]);

		disposeNode(wall[i]);
		disposeNode(wall[i].label[0]);
		disposeNode(wall[i].label[1]);		
	}
	
	for ( var i = 0; i < point.length; i++ )
	{ 
		if(point[i].userData.point.pillar) { scene.remove( point[i].userData.point.pillar ); }
		disposeNode(point[i]);
		scene.remove(point[i]); 
	}	
	
	for ( var i = 0; i < window.length; i++ )
	{ 
		disposeNode(window[i]); 
		scene.remove(window[i]); 
	}
	
	for ( var i = 0; i < door.length; i++ )
	{ 
		disposeNode(door[i]); 
		scene.remove(door[i]); 
	}	
	
	
	for ( var i = 0; i < room.length; i++ )
	{		
		disposeNode(room[i]);
		disposeNode(room[i].label);
		disposeNode(ceiling[i]);
		
		scene.remove(room[i].label); 
		if(room[i].userData.room.outline) { scene.remove(room[i].userData.room.outline); }
		scene.remove(room[i]); 
		scene.remove(ceiling[i]);	
	}

	for ( var i = 0; i < tube.length; i++ )
	{
		for ( var i2 = tube[i].userData.wf_line.point.length - 1; i2 > -1; i2-- )
		{
			disposeNode(tube[i].userData.wf_line.point[i2]);
			scene.remove(tube[i].userData.wf_line.point[i2]);		
		}
		
		if(tube[i].userData.wf_line.tube) 
		{ 
			disposeNode(tube[i].userData.wf_line.tube);
			scene.remove(tube[i].userData.wf_line.tube); 
		}
	
		disposeNode(tube[i]);
		scene.remove(tube[i]);		
	}
	
	for ( var i = 0; i < obj.length; i++ )
	{ 		
		scene.remove(obj[i]);
		
		disposeNode(obj[i]);
	}	
	
	
	for ( var i = 0; i < substrate.length; i++ )
	{ 
		removePlaneListUI_2({plane: substrate[i].plane}); 	// удаляем список подложек UI
		
		disposeNode(substrate[i].plane);
		scene.remove(substrate[i].plane);

		for ( var i2 = 0; i2 < substrate[i].point.length; i2++ )
		{
			disposeNode(substrate[i].point[i2]);
			scene.remove(substrate[i].point[i2]);			
		}
	}

	
	// удаляем список материалов UI
	for(var i = 0; i < infProject.list.obj_scene_ui.length; i++)
	{
		infProject.list.obj_scene_ui[i].el.remove();
	}
	
	infProject.list.obj_scene_ui = [];
		 
	
	// удаляем список объектов UI
	clearItemSelectedObjUI();			
	
	
	obj_point = [];
	obj_line = [];
	room = [];
	ceiling = [];
	arrWallFront = [];
	

	countId = 2;
	
	// прячем размеры и линейки
	var line = arrSize.format_1.line;
	var label = arrSize.format_1.label;
	var cube = arrSize.cube;
	var cutoff = arrSize.cutoff;
	for ( var i = 0; i < line.length; i++ ) { line[i].visible = false; }
	for ( var i = 0; i < label.length; i++ ) { label[i].visible = false; }
	for ( var i = 0; i < cube.length; i++ ) { cube[i].visible = false; }
	for ( var i = 0; i < cutoff.length; i++ ) { cutoff[i].visible = false; }
	
	var line = arrSize.format_2.line;
	var label = arrSize.format_2.label;
	for ( var i = 0; i < line.length; i++ ) { line[i].visible = false; }
	for ( var i = 0; i < label.length; i++ ) { label[i].visible = false; }
	
	
	camera3D.userData.camera = { type : 'fly', height : camera3D.position.y, startProject : true };
	camera3D.userData.camera.click = { pos : new THREE.Vector3() }; 
	
	clickO = resetPop.clickO();
	infProject.project = null;
	infProject.scene.array = resetPop.infProjectSceneArray();
	infProject.scene.substrate.floor = [];
	infProject.scene.substrate.active = null;
	

	
	console.log(renderer.info.memory);
}



function getConsoleRendererInfo()
{	
	console.log(renderer.info.programs);
	console.log(renderer.info.render);
	console.log(renderer.info.memory);	
}



// получаем массив дочерних объектов
function getAllChildObect(cdm)
{
	var arr = [];
	
	var obj = cdm.obj;
	
	obj.traverse(function(child) 
	{
		if(child.isMesh) 
		{ 
			arr[arr.length] = child;				
		}
	});

	
	return arr;
}


// очищаем объект из памяти
function disposeNode(node) 
{
	if (node instanceof THREE.Mesh) 
	{
		if (node.geometry) { node.geometry.dispose(); }
		
		if (node.material) 
		{
			var materialArray = [];
			
			if(node.material instanceof Array) { materialArray = node.material; }
			else { materialArray = [node.material]; }
			
			if(materialArray) 
			{
				materialArray.forEach(function (mtrl, idx) 
				{
					if (mtrl.map) mtrl.map.dispose();
					if (mtrl.lightMap) mtrl.lightMap.dispose();
					if (mtrl.bumpMap) mtrl.bumpMap.dispose();
					if (mtrl.normalMap) mtrl.normalMap.dispose();
					if (mtrl.specularMap) mtrl.specularMap.dispose();
					if (mtrl.envMap) mtrl.envMap.dispose();
					mtrl.dispose();
				});
			}
		}
	}
}





function getJsonGeometry()
{
	var json = 
	{
		floors : 
		[
			{ 
				points : [],
				walls : [],	
				rooms : [],
				height : height_wall,
				version : '1'
			}			
		]
	};	
	
	var points = [];
	var walls = [];
	var rooms = [];
	var furn = [];
	var group = [];
	var pipe = [];
	var subs = [];
	
	var wall = infProject.scene.array.wall;
	//var point = infProject.scene.array.point;
	
	for ( var i = 0; i < wall.length; i++ )
	{			
		var p = wall[i].userData.wall.p;
		
		for ( var i2 = 0; i2 < p.length; i2++ )  
		{
			var flag = true;
			for ( var i3 = 0; i3 < points.length; i3++ ) { if(p[i2].userData.id == points[i3].id){ flag = false; break; } }
			
			if(flag) 
			{  
				var m = points.length;
				points[m] = {};
				points[m].id = p[i2].userData.id;
				points[m].pos = new THREE.Vector3(p[i2].position.x, p[i2].position.y, -p[i2].position.z); 
			}
		}
	}	
	
	
	
	for ( var i = 0; i < wall.length; i++ )
	{ 
		var p = wall[i].userData.wall.p;
		
		walls[i] = { }; 
		
		walls[i].id = wall[i].userData.id;
		walls[i].pointStart = p[0].userData.id;
		walls[i].pointEnd = p[1].userData.id;
		walls[i].width = wall[i].userData.wall.width; 
		walls[i].height = wall[i].userData.wall.height_1; 


		var x1 = p[1].position.z - p[0].position.z;
		var z1 = p[0].position.x - p[1].position.x;	
		var dir = new THREE.Vector3(z1, 0, -x1).normalize();						// перпендикуляр стены  (перевернуты x и y)
		dir.multiplyScalar( wall[i].userData.wall.offsetZ );
		walls[i].startShift = new THREE.Vector3(dir.z, 0, dir.x);
				
		var wd = saveWindows(wall[i]);		
		walls[i].windows = wd.windows;
		walls[i].doors = wd.doors;
		

		walls[i].colors = [];
		var mat = wall[i].userData.material;
		var arr = [{containerID : 'wall3d_'+wall[i].userData.id+'_p2', num : 1}, {containerID : 'wall3d_'+wall[i].userData.id+'_p1', num : 2}];				
		
		for ( var i2 = 0; i2 < arr.length; i2++ )
		{
			walls[i].colors[i2] = {  };		
			walls[i].colors[i2].containerID = arr[i2].containerID;
			walls[i].colors[i2].lot = { id : mat[arr[i2].num].lotid };

			var color = { r : Number(mat[arr[i2].num].color.r), g : Number(mat[arr[i2].num].color.g), b : Number(mat[arr[i2].num].color.b), a : 1 };
			
			walls[i].colors[i2].matMod = { colorsets : [{ color : color }] };

			walls[i].colors[i2].matMod.texScal = mat[arr[i2].num].scale;
			
			walls[i].colors[i2].matMod.mapingRotate = 0; 
			
			var map = wall[i].material[arr[i2].num].map;
			if(map) 
			{
				walls[i].colors[i2].matMod.texOffset = map.offset;
				walls[i].colors[i2].matMod.mapingRotate = THREE.Math.radToDeg( map.rotation ); 				 
			}
		}		
	}	


	for ( var i = 0; i < room.length; i++ )
	{
		rooms[i] = { pointid : [] };
		
		rooms[i].id = room[i].userData.id;  
		rooms[i].name = 'Room';	
		
		rooms[i].pointid = [];
		var s = 0; for ( var i2 = room[i].p.length - 1; i2 >= 1; i2-- ) { rooms[i].pointid[s] = room[i].p[i2].userData.id; s++; }  
		
		
		rooms[i].colors = [];
		var arr = [{containerID : 'floor', obj : room[i]}, {containerID : 'ceil', obj : ceiling[i]}];				
		
		for ( var i2 = 0; i2 < arr.length; i2++ )
		{
			rooms[i].colors[i2] = {  };		
			rooms[i].colors[i2].containerID = arr[i2].containerID;
			rooms[i].colors[i2].lot = { id : arr[i2].obj.userData.material.lotid };

			var color = { r : Number(arr[i2].obj.material.color.r), g : Number(arr[i2].obj.material.color.g), b : Number(arr[i2].obj.material.color.b), a : 1 };
			
			rooms[i].colors[i2].matMod = { colorsets : [{ color : color }] };

			rooms[i].colors[i2].matMod.texScal = arr[i2].obj.userData.material.scale;

			rooms[i].colors[i2].matMod.mapingRotate = 0; 
			
			var map = arr[i2].obj.material.map;
			if(map) 
			{
				rooms[i].colors[i2].matMod.texOffset = map.offset;
				rooms[i].colors[i2].matMod.mapingRotate = THREE.Math.radToDeg( map.rotation ); 
			}			
		}	
	}
	

	
	for ( var i = 0; i < infProject.scene.array.obj.length; i++ )
	{
		var obj = infProject.scene.array.obj[i];
		
		var gr = null;
		
		if(obj.userData.obj3D.group)	// если объект приналежит группе
		{
			gr = { name: 'group', id: obj.userData.obj3D.group.userData.id }; 
		}
		
		var pos = new THREE.Vector3(obj.position.x, obj.position.y, -obj.position.z);
		var rot = new THREE.Vector3( THREE.Math.radToDeg(obj.rotation.x), THREE.Math.radToDeg(obj.rotation.y), THREE.Math.radToDeg(obj.rotation.z) );
		
			
		var m = furn.length;
		furn[m] = {};
		furn[m].id = Number(obj.userData.id);
		furn[m].lotid = Number(obj.userData.obj3D.lotid);
		furn[m].pos = pos;
		furn[m].rot = rot;
		furn[m].nameRus = obj.userData.obj3D.nameRus;
		furn[m].centerPoint = [];
		if(gr) { furn[m].group = gr; }
		
		// получаем разъемы объекта
		var o = getCenterPointFromObj_1(obj);

		// есть разъемы
		for(var i2 = 0; i2 < o.length; i2++)
		{				
			if(!o[i2].userData.centerPoint) continue;			
		
			var num = furn[m].centerPoint.length;
			
			furn[m].centerPoint[num] = {};
			furn[m].centerPoint[num].id = o[i2].userData.id;
			furn[m].centerPoint[num].nameRus = o[i2].userData.centerPoint.nameRus;
		}			
	}
	
	
	for ( var i = 0; i < infProject.scene.array.group.length; i++ )
	{
		var arrO = [];
		var child = infProject.scene.array.group[i].userData.groupObj.child;
		
		for ( var i2 = 0; i2 < child.length; i2++ )
		{			
			if(!child[i2].userData.tag) continue;
			if(child[i2].userData.tag != 'obj') continue;
			
			arrO[arrO.length] = { id: Number(child[i2].userData.id) };
		}
		
		var m = group.length;
		group[m] = {};
		group[m].obj = arrO;
	}
	
	
	for ( var i = 0; i < infProject.scene.array.tube.length; i++ )
	{
		var tube = infProject.scene.array.tube[i].userData.wf_line;
		
		var m = pipe.length;
		pipe[m] = {};
		pipe[m].id = infProject.scene.array.tube[i].userData.id;
		pipe[m].diameter = tube.diameter;
		pipe[m].color = tube.color;
		
		pipe[m].point = [];
		
		for ( var i2 = 0; i2 < tube.point.length; i2++ )
		{
			pipe[m].point[i2] = {};
			pipe[m].point[i2].id = tube.point[i2].userData.id;
			pipe[m].point[i2].pos = tube.point[i2].position.clone();
		}
	}


	for ( var i = 0; i < infProject.scene.substrate.floor.length; i++ )
	{
		var plane = infProject.scene.substrate.floor[i].plane;
		
		subs[i] = {};
		subs[i].pos = plane.position;
		subs[i].q = {x: plane.quaternion.x, y: plane.quaternion.y, z: plane.quaternion.z, w: plane.quaternion.w};
		
		plane.geometry.computeBoundingBox();		
		subs[i].scale = {x: 1, z: 1};
		subs[i].scale.x = (Math.abs(plane.geometry.boundingBox.max.x) + Math.abs(plane.geometry.boundingBox.min.x));
		subs[i].scale.z = (Math.abs(plane.geometry.boundingBox.max.z) + Math.abs(plane.geometry.boundingBox.min.z));		
		
		subs[i].opacity = plane.material.opacity;
		
		subs[i].nameRus = plane.userData.substrate.nameRus;
		
		if(plane.userData.substrate.img)
		{ 
			subs[i].img = plane.material.map.image.src;
		}
	}

	
	json.floors[0].points = points;
	json.floors[0].walls = walls;
	json.floors[0].rooms = rooms;
	json.furn = furn;
	json.group = group;
	json.pipe = pipe;
	json.subs = subs;
	
	
	return json;
}





// сохраняем окна/двери
function saveWindows(wall)
{
	var windows = [], doors = [];
	
	var arrO = wall.userData.wall.arrO;

	var o = [[], []];

	for ( var i2 = 0; i2 < arrO.length; i2++ ) 
	{
		if(arrO[i2].userData.tag == 'window') { o[0][o[0].length] = arrO[i2]; }
		else if(arrO[i2].userData.tag == 'door') { o[1][o[1].length] = arrO[i2]; }		
	}

	var p = wall.userData.wall.p;

	for ( var i = 0; i < o.length; i++ )
	{
		for ( var i2 = 0; i2 < o[i].length; i2++ )
		{ 
			var wd = o[i][i2];
			var v = wd.geometry.vertices;
		
			wd.updateMatrixWorld();
			wd.geometry.computeBoundingBox();
			wd.geometry.computeBoundingSphere();
			var dX = wd.geometry.boundingBox.max.x - wd.geometry.boundingBox.min.x;
			var dY = wd.geometry.boundingBox.max.y - wd.geometry.boundingBox.min.y;
			var center = wd.geometry.boundingSphere.center;
		
		
			var v7 = wd.localToWorld( center.clone() );			
			var qt1 = quaternionDirection( new THREE.Vector3().subVectors( p[1].position, p[0].position ).normalize() );
			var x = localTransformPoint(new THREE.Vector3().subVectors( v7, p[0].position ), qt1).z; 
			
			x = x / p[1].position.distanceTo( p[0].position );		// процентное соотношение от начала стены
			
			var y = wall.worldToLocal( wd.localToWorld(new THREE.Vector3(0, wd.geometry.boundingBox.min.y, 0)) ).y;
			
			
			var arr = {};
			
			arr.id = wd.userData.id;						// id
			arr.lotid  = wd.userData.door.lotid;					// lotid  
			arr.width = dX;									// width
			arr.height = dY;								// height		
			arr.startPointDist = x;							// pos_start
			arr.over_floor = y;								// over_floor		
			//arr.options = '';
			
			if(wd.userData.tag == 'window') { windows[windows.length] = arr; }
			else if(wd.userData.tag == 'door') { doors[doors.length] = arr; }			
		}		
	}

	return { windows : windows, doors : doors };
}


function saveFile(cdm) 
{ 
	
	var json = JSON.stringify( getJsonGeometry() );
	
	if(cdm.json)
	{
		// сохраняем в папку
		$.ajax
		({
			url: infProject.path+'saveJson.php',
			type: 'POST',
			data: {myarray: json},
			dataType: 'json',
			success: function(json)
			{ 			
				console.log(json); 
			},
			error: function(json){ console.log(json);  }
		});			
	}
	
	
	if(cdm.id)
	{
		// сохраняем в бд
		$.ajax
		({
			url: infProject.path+'components/saveSql.php',
			type: 'POST',
			data: {json: json, id: cdm.id, user_id: infProject.user.id, preview: null},
			dataType: 'json',
			success: function(json)
			{ 			
				console.log(json);
				
				if(cdm.upUI) { getListProject({id: infProject.user.id}); }		// обновляем меню сохрание проектов
			},
			error: function(json){ console.log(json); }
		});			
	}
	
	
	if(1==2)
	{
		var csv = JSON.stringify( txt );	
		var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);	
		
		var link = document.createElement('a');
		document.body.appendChild(link);
		link.href = csvData;
		link.target = '_blank';
		link.download = 'filename.json';
		link.click();			
	}
}





function loadFile(cdm) 
{
	if(cdm.id == 0) { resetScene(); return; }	 
	
	
	if(cdm.json)	// загрузка json из папки
	{
		$.ajax
		({
			url: infProject.path+'t/fileJson.json',
			type: 'POST',
			dataType: 'json',
			success: function(json)
			{ 
				resetScene();
				loadFilePL(json); 	// загрузка json
			},
		});			
	}
	else	// загрузка json из бд
	{
		$.ajax
		({
			url: infProject.path+'components/loadSql.php',
			type: 'POST',
			data: {id: cdm.id},
			dataType: 'json',
			success: function(json)
			{ 
				resetScene();
				loadFilePL(json); 	// загрузка json
			},
		});		
		
	}
	
}






async function loadFilePL(arr) 
{    
	
	if(!arr) return;
	
	//console.log(arr);
	
	infProject.project = { file: arr, load: { furn: [] } };
		
	var point = arr.floors[0].points;
	var walls = arr.floors[0].walls;
	var rooms = arr.floors[0].rooms;
	var furn = (arr.furn) ? arr.furn : [];
	var pipe = (arr.pipe) ? arr.pipe : [];
	var subs = (arr.subs) ? arr.subs : [];
			
	var wall = [];
	
	for ( var i = 0; i < walls.length; i++ )
	{
		wall[i] = { };
		
		
		wall[i].id = walls[i].id;		
		wall[i].width = walls[i].width;
		wall[i].offsetV = new THREE.Vector3(walls[i].startShift.z, 0, walls[i].startShift.x);   		
		wall[i].height = walls[i].height;			
		
		wall[i].points = [];
		wall[i].points[0] = { id : walls[i].pointStart, pos : new THREE.Vector3() };
		wall[i].points[1] = { id : walls[i].pointEnd, pos : new THREE.Vector3() };
								
		for ( var i2 = 0; i2 < point.length; i2++ ) 			 
		{  	
			if(wall[i].points[0].id == point[i2].id) { wall[i].points[0].pos = new THREE.Vector3(point[i2].pos.x, 0, -point[i2].pos.z); }
			if(wall[i].points[1].id == point[i2].id) { wall[i].points[1].pos = new THREE.Vector3(point[i2].pos.x, 0, -point[i2].pos.z); }
		}
		

		var arrO = [];
		
		if(walls[i].doors) for ( var i2 = 0; i2 < walls[i].doors.length; i2++ ) { arrO[arrO.length] = walls[i].doors[i2]; arrO[arrO.length - 1].type = 'door'; }
		if(walls[i].windows) for ( var i2 = 0; i2 < walls[i].windows.length; i2++ ) { arrO[arrO.length] = walls[i].windows[i2]; arrO[arrO.length - 1].type = 'window'; }
		
		wall[i].arrO = [];
		
		
		for ( var i2 = 0; i2 < arrO.length; i2++ )
		{					
			wall[i].arrO[i2] = {  }
			
			wall[i].arrO[i2].id = arrO[i2].id;
			wall[i].arrO[i2].pos = new THREE.Vector3(arrO[i2].startPointDist, arrO[i2].over_floor, 0);
			wall[i].arrO[i2].size = new THREE.Vector2(arrO[i2].width, arrO[i2].height);
			wall[i].arrO[i2].type = arrO[i2].type;
		} 	
	}
	


	//-------------
	 

	// создаем и устанавливаем все стены (без окон/дверей)
	var arrW = [];
	
	for ( var i = 0; i < wall.length; i++ )
	{ 
		var point1 = findObjFromId( 'point', wall[i].points[0].id );
		var point2 = findObjFromId( 'point', wall[i].points[1].id );	
		
		if(point1 == null) { point1 = createPoint( wall[i].points[0].pos, wall[i].points[0].id ); }
		if(point2 == null) { point2 = createPoint( wall[i].points[1].pos, wall[i].points[1].id ); }
	

		var dir = new THREE.Vector3().subVectors( point2.position, point1.position ).normalize();
		var offsetZ = localTransformPoint(wall[i].offsetV, quaternionDirection(dir)).z;
		var inf = { id : wall[i].id, offsetZ : -offsetZ, height : wall[i].height, load : true };
		
		var obj = createOneWall3( point1, point2, wall[i].width, inf ); 		
		
		obj.updateMatrixWorld();
		arrW[arrW.length] = obj;
	}	
	 
	
	for ( var i = 0; i < obj_point.length; i++ ) { upLineYY_2(obj_point[i], obj_point[i].p, obj_point[i].w, obj_point[i].start); }
	
	upLabelPlan_1(infProject.scene.array.wall);	// размеры стен

	detectRoomZone();
	

	
	// устанавливаем окна/двери
	for ( var i = 0; i < wall.length; i++ )
	{ 
		var obj = arrW[i];
		
		var point1 = obj.userData.wall.p[0];
		var point2 = obj.userData.wall.p[1];		
		
		for ( var i2 = 0; i2 < wall[i].arrO.length; i2++ )
		{			
			wall[i].arrO[i2].pos.x = point1.position.distanceTo( point2.position ) * wall[i].arrO[i2].pos.x;
			
			var intP = obj.localToWorld( wall[i].arrO[i2].pos.clone() );  						

			var inf = { status : 'load', id : wall[i].arrO[i2].id, pos : intP, wall : obj, type : wall[i].arrO[i2].type };	 		
			if(wall[i].arrO[i2].size) { inf.size = wall[i].arrO[i2].size; }				
						
			createEmptyFormWD_1(inf);
		}		
	}
	// устанавливаем окна/двери
	
			

	
	for ( var i = 0; i < pipe.length; i++ )
	{
		var p = [];
		for ( var i2 = 0; i2 < pipe[i].point.length; i2++ )
		{
			p[p.length] = createPointWF({id: pipe[i].point[i2].id, pos: pipe[i].point[i2].pos});
		}
		
		var line = createLineWF({point: p, diameter: pipe[i].diameter, color: new THREE.Color(pipe[i].color)}); 
		
		geometryTubeWF({line : line, createLine : true});	
	}


	for ( var i = 0; i < subs.length; i++ )
	{
		createSubstrate(subs[i]);
	}
	

	await loadObjInBase({furn: furn});


	var group = infProject.project.file.group;	
	for ( var i2 = 0; i2 < group.length; i2++ )
	{										
		var arrId = []; 
		for ( var i3 = 0; i3 < group[i2].obj.length; i3++ )
		{
			arrId[arrId.length] = group[i2].obj[i3].id;
		}
		group[i2].obj = { id: arrId };
		
		createGroupObj_1(group[i2]);
	}
	
	readyProject();
	
	cameraZoomTop( camera.zoom );
	

	renderCamera();
	
	//getSkeleton_1(room); 
}


// сохранение объектов в базу (создаем уникальную копию)
async function loadObjInBase(cdm)
{
	var furn = cdm.furn;
	var lotid = [];
	
	for ( var i = 0; i < furn.length; i++ )
	{
		lotid[lotid.length] = Number(furn[i].lotid);

		//createSpotObj(inf, furn[i]);
	}
	
	lotid = [...new Set(lotid)];  
	
	var strId = '';
	
	for ( var i = 0; i < lotid.length; i++ )
	{
		strId += '&id['+i+']='+lotid[i];
	}

	var url = infProject.path+'components_2/getListObjSql.php';		
	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'select_list=id, name, size'+strId ,
		headers: 
		{
			'Content-Type': 'application/x-www-form-urlencoded'
		},		
		
	});
	var json = await response.json();

	
	for ( var i = 0; i < json.length; i++ )
	{		
		for ( var i2 = 0; i2 < furn.length; i2++ )
		{
			if(furn[i2].lotid == json[i].id) 
			{ 
		
				furn[i2].pos.z *= -1;
				
				if(furn[i2].rot)			
				{
					furn[i2].rot = new THREE.Vector3( THREE.Math.degToRad(furn[i2].rot.x), THREE.Math.degToRad(furn[i2].rot.y), THREE.Math.degToRad(furn[i2].rot.z) );
				}
			
				await loadObjServer(furn[i2]);

				infProject.project.load.furn[infProject.project.load.furn.length] = furn[i2].lotid;				
			}
		}
	}
}




function readyProject(cdm)
{
	
	// восстанавливаем countId
	for ( var i = 0; i < scene.children.length; i++ ) 
	{ 
		if(scene.children[i].userData.id) 
		{ 
			var index = parseInt(scene.children[i].userData.id);
			if(index > countId) { countId = index; }
		} 
	}	
	countId++; 
	// восстанавливаем countId	
	
	console.log('READY', countId);
	
	changeCamera(cameraTop);
	centerCamera2D();	
}


function loadStartForm(cdm) 
{
	var form = cdm.form;
	
	var arrP = [];
	resetScene();
	console.log(form);
	
	if(form == 'plan_area') { var arrP = [new THREE.Vector3(-3,0,-2), new THREE.Vector3(-3,0,2), new THREE.Vector3(0,0,2), new THREE.Vector3(0,0,0), new THREE.Vector3(3,0,0), new THREE.Vector3(3,0,-2)]; }	
	else if(form == 'shape1') { var arrP = [new THREE.Vector3(-3,0,-3), new THREE.Vector3(-3,0,3), new THREE.Vector3(3,0,3), new THREE.Vector3(3,0,-3)]; }
	else if(form == 'shape2') { var arrP = [new THREE.Vector3(0,0,-2), new THREE.Vector3(-3,0,2), new THREE.Vector3(3,0,2)]; }
	else if(form == 'shape3') { var arrP = [new THREE.Vector3(-3,0,-2), new THREE.Vector3(-3,0,2), new THREE.Vector3(0,0,2), new THREE.Vector3(0,0,0), new THREE.Vector3(3,0,0), new THREE.Vector3(3,0,-2)]; }
	else if(form == 'shape4') { var arrP = [new THREE.Vector3(-3,0,0), new THREE.Vector3(-3,0,3), new THREE.Vector3(3,0,3), new THREE.Vector3(3,0,-3), new THREE.Vector3(0,0,-3), new THREE.Vector3(0,0,0)]; }	
	else if(form == 'shape5') { var arrP = [new THREE.Vector3(-4,0,-1.5), new THREE.Vector3(-4,0,3), new THREE.Vector3(0,0,3), new THREE.Vector3(4,0,3), new THREE.Vector3(4,0,-1.5), new THREE.Vector3(2,0,-1.5), new THREE.Vector3(1,0,-3), new THREE.Vector3(-1,0,-3), new THREE.Vector3(-2,0,-1.5)]; }
	else if(form == 'shape6') { var arrP = [new THREE.Vector3(-3,0,-3), new THREE.Vector3(-3,0,0), new THREE.Vector3(0,0,3), new THREE.Vector3(3,0,3), new THREE.Vector3(3,0,-3)]; }
	else if(form == 'shape7') { var arrP = [new THREE.Vector3(-3,0,-2), new THREE.Vector3(-3,0,2), new THREE.Vector3(0,0,2), new THREE.Vector3(3,0,2), new THREE.Vector3(3,0,-2), new THREE.Vector3(0,0,-2)]; }		
	else if(form == 'shape8') { var arrP = [new THREE.Vector3(-3,0,-2), new THREE.Vector3(-3,0,2), new THREE.Vector3(-1,0,2), new THREE.Vector3(1,0,2), new THREE.Vector3(3,0,2), new THREE.Vector3(3,0,-2), new THREE.Vector3(1,0,-2), new THREE.Vector3(-1,0,-2)]; }	
	else if(form == 'shape9') { var arrP = [new THREE.Vector3(-3,0,-2), new THREE.Vector3(-3,0,0), new THREE.Vector3(-3,0,2), new THREE.Vector3(-1,0,2), new THREE.Vector3(1,0,2), new THREE.Vector3(3,0,2), new THREE.Vector3(3,0,0), new THREE.Vector3(3,0,-2), new THREE.Vector3(1,0,-2), new THREE.Vector3(-1,0,-2)]; }
	else if(form == 'shape10') { var arrP = [new THREE.Vector3(-3,0,-2), new THREE.Vector3(-3,0,0), new THREE.Vector3(-3,0,2), new THREE.Vector3(0,0,2), new THREE.Vector3(0,0,0), new THREE.Vector3(3,0,0), new THREE.Vector3(3,0,-2), new THREE.Vector3(0,0,-2)]; }
	else if(form == 'shape11') { var arrP = [new THREE.Vector3(-2,0,-1), new THREE.Vector3(-2,0,1), new THREE.Vector3(0,0,2), new THREE.Vector3(2,0,1), new THREE.Vector3(2,0,-1), new THREE.Vector3(0,0,-2)]; }
	else if(form == 'shape12') { var arrP = [new THREE.Vector3(-1,0,-2), new THREE.Vector3(-1,0,-1), new THREE.Vector3(-3,0,-1), new THREE.Vector3(-3,0,1), new THREE.Vector3(-1,0,1), new THREE.Vector3(-1,0,2), new THREE.Vector3(1,0,2), new THREE.Vector3(1,0,1), new THREE.Vector3(3,0,1), new THREE.Vector3(3,0,-1), new THREE.Vector3(1,0,-1), new THREE.Vector3(1,0,-2)]; }
	else if(form == 'shape13') { var arrP = [new THREE.Vector3(-1,0,-2), new THREE.Vector3(-1,0,-1), new THREE.Vector3(-3,0,-1), new THREE.Vector3(-3,0,1), new THREE.Vector3(-1,0,1), new THREE.Vector3(-1,0,2), new THREE.Vector3(1,0,2), new THREE.Vector3(1,0,1), new THREE.Vector3(3,0,1), new THREE.Vector3(3,0,-1), new THREE.Vector3(1,0,-1), new THREE.Vector3(1,0,-2)]; }
	else if(form == 'shape14') { var arrP = [new THREE.Vector3(-2,0,-1), new THREE.Vector3(-2,0,0), new THREE.Vector3(-2,0,1), new THREE.Vector3(0,0,1.5), new THREE.Vector3(2,0,1), new THREE.Vector3(2,0,0), new THREE.Vector3(2,0,-1), new THREE.Vector3(0,0,-1.5)]; }	
	else if(form == 'shape15') { var arrP = [new THREE.Vector3(-2,0,-1), new THREE.Vector3(-2,0,1), new THREE.Vector3(0,0,2), new THREE.Vector3(2,0,1), new THREE.Vector3(2,0,-1), new THREE.Vector3(0,0,-2)]; }
	
	if(form == 'land') 
	{ 
		var arrP = [];
		arrP[0] = new THREE.Vector3(-15.3,0,-6.7);
		arrP[1] = new THREE.Vector3(-15.3,0,8.95);
		arrP[2] = new THREE.Vector3(-0.73,0,10.79);
		arrP[3] = new THREE.Vector3(19.51,0,9.63);
		arrP[4] = new THREE.Vector3(19.51,0,-7.35);
		arrP[5] = new THREE.Vector3(0,0,-7.95);
	}
	
	
	for ( var i = 0; i < arrP.length; i++ ) { createPoint( arrP[i], 0 ); }
	
	
	var inf = {};
	
	if(form == 'plan_area' || form == 'wall_kirpich')
	{
		inf = { texture : infProject.settings.wall.material };
	}
	
	if(infProject.settings.wall.color)
	{
		inf.color = infProject.settings.wall.color;
	}	
	
	if(form == 'shape1' || form == 'shape2' || form == 'shape3' || form == 'shape4' || form == 'shape5' || form == 'shape6' || form == 'shape7' || form == 'shape8' || form == 'shape9' || form == 'shape10' || form == 'shape11' || form == 'shape12' || form == 'shape13' || form == 'shape14' || form == 'shape15' || form == 'land' || form == 'plan_area')
	{
		for ( var i = 0; i < obj_point.length; i++ )
		{
			var i2 = (i == obj_point.length - 1) ? 0 : i + 1;		
			createOneWall3( obj_point[i], obj_point[i2], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		}		
	}
	
	if(form == 'shape7')
	{
		createOneWall3( obj_point[2], obj_point[5], width_wall, JSON.parse( JSON.stringify( inf ) ) );
	}	
	else if(form == 'shape8')
	{
		createOneWall3( obj_point[3], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[2], obj_point[7], width_wall, JSON.parse( JSON.stringify( inf ) ) );
	}	
	else if(form == 'shape9')
	{
		createPoint( new THREE.Vector3(-1,0,0), 0 );
		createPoint( new THREE.Vector3(1,0,0), 0 );
		createOneWall3( obj_point[1], obj_point[10], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[3], obj_point[10], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[10], obj_point[9], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[4], obj_point[11], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[11], obj_point[8], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[10], obj_point[11], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[11], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
	}
	else if(form == 'shape10')
	{
		createOneWall3( obj_point[1], obj_point[4], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[4], obj_point[7], width_wall, JSON.parse( JSON.stringify( inf ) ) );
	}	
	else if(form == 'shape13')
	{
		createOneWall3( obj_point[4], obj_point[7], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[4], obj_point[1], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[7], obj_point[10], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[1], obj_point[10], width_wall, JSON.parse( JSON.stringify( inf ) ) );
	}	
	else if(form == 'shape14')
	{
		createPoint( new THREE.Vector3(0,0,0), 0 );
		createOneWall3( obj_point[1], obj_point[8], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[3], obj_point[8], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[5], obj_point[8], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[7], obj_point[8], width_wall, JSON.parse( JSON.stringify( inf ) ) );
	}	
	else if(form == 'shape15')
	{
		createPoint( new THREE.Vector3(0,0,0), 0 );
		createOneWall3( obj_point[0], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[1], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[2], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[3], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[4], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		createOneWall3( obj_point[5], obj_point[6], width_wall, JSON.parse( JSON.stringify( inf ) ) );
	}	
	
	
	if(form == 'level_2')
	{
		var arrP1 = [new THREE.Vector3(-3,0,-3), new THREE.Vector3(-3,0,0), new THREE.Vector3(0,0,3), new THREE.Vector3(3,0,3), new THREE.Vector3(3,0,-3),];
		
		var h2 = height_wall + 0.1;
		var arrP2 = [new THREE.Vector3(0,h2,0), new THREE.Vector3(0,h2,3), new THREE.Vector3(3,h2,6), new THREE.Vector3(6,h2,6), new THREE.Vector3(6,h2,0)]; 

		var arrPo1 = [];
		var arrPo2 = [];
		for ( var i = 0; i < arrP1.length; i++ ) { arrPo1[arrPo1.length] = createPoint( arrP1[i], 0 ); }
		for ( var i = 0; i < arrP2.length; i++ ) { arrPo2[arrPo2.length] = createPoint( arrP2[i], 0 ); }
		
		for ( var i = 0; i < arrPo1.length; i++ )
		{
			var i2 = (i == arrPo1.length - 1) ? 0 : i + 1;		
			createOneWall3( arrPo1[i], arrPo1[i2], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		}	

		for ( var i = 0; i < arrPo2.length; i++ )
		{
			var i2 = (i == arrPo2.length - 1) ? 0 : i + 1;		
			createOneWall3( arrPo2[i], arrPo2[i2], width_wall, JSON.parse( JSON.stringify( inf ) ) );
		}			
	}
	
	if(1==2)
	{
		var roofB = new THREE.Mesh( new THREE.PlaneGeometry( 10, 10 ), new THREE.MeshLambertMaterial( {color: 0xff0000, transparent: true, opacity: 1, side: THREE.DoubleSide } ) );
		roofB.rotation.set(-Math.PI/4, 0, 0);
		roofB.position.set(0, 6, 0);
		//roofB.userData.tag = 'planeMath';	
		scene.add( roofB );
		
		var roofB = new THREE.Mesh( new THREE.PlaneGeometry( 10, 10 ), new THREE.MeshLambertMaterial( {color: 0xff0000, transparent: true, opacity: 1, side: THREE.DoubleSide } ) );
		roofB.rotation.set(Math.PI/4, 0, 0);
		roofB.position.set(0, 6, 0);	
		scene.add( roofB );			
	}
	
	
	var wall = infProject.scene.array.wall;
	var point = infProject.scene.array.point;
	
	for ( var i = 0; i < point.length; i++ ) { upLineYY(point[i]); }	
	if(wall.length > 0) detectRoomZone();
	if(wall.length > 0) upLabelPlan_1(wall);
	if(wall.length > 0) createWallZone(wall[0])
	
	//width_wall = 0.3;
	  
	
	if(infProject.settings.camera.zoom != 1) { cameraZoomTop( infProject.settings.camera.zoom ); }
	
	centerCamera2D();
	renderCamera();
}




