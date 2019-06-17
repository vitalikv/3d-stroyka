


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
		
		return array;
	},

	listColor : function()
	{	
		var array = {};
		
		array.door2D = 'rgb(166, 151, 99)';
		array.window2D = 'rgb(122, 160, 195)';
		array.active2D = 'rgb(255,0,0)';
		array.hover2D = 'rgb(55, 125, 61)';

		return array;
	},
	
	clickO : function()
	{
		var inf = { obj: null, last_obj: null, hover: null, rayhit : null, button : null, buttonAct : null };
		inf.down = null;
		inf.move = null;
		inf.up = null;
		inf.pos = { clickDown : new THREE.Vector3() };
		inf.click = { wall : [], point : [] };  
		inf.selectBox = { arr : [], drag : false, move : false, walls : [], walls_2 : [], point : [] };
		
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
	
	for ( var i = 0; i < obj_line.length; i++ )
	{ 
		scene.remove(obj_line[i].label[0]); 
		scene.remove(obj_line[i].label[1]);
		if(obj_line[i].userData.wall.outline) { scene.remove(obj_line[i].userData.wall.outline); }
		if(obj_line[i].userData.wall.zone) { scene.remove(obj_line[i].userData.wall.zone.label); }

		for(var i2 = obj_line[i].userData.wall.block.arr.length - 1; i2 > -1; i2--)
		{
			var block = obj_line[i].userData.wall.block.arr[i2];
			scene.remove(block);			
		}			
		
		for(var i2 = obj_line[i].children.length - 1; i2 > -1; i2--)
		{ 
			scene.remove(obj_line[i].children[i2]);
		}
		
		obj_line[i].label = [];
		obj_line[i].userData.wall.p = [];
		obj_line[i].userData.wall.outline = null;
		obj_line[i].userData.wall.zone = null;
		obj_line[i].userData.wall.block.arr = [];
		
		scene.remove(obj_line[i]); 
	}
	
	for ( var i = 0; i < obj_point.length; i++ )
	{ 
		if(obj_point[i].userData.point.pillar) { scene.remove( obj_point[i].userData.point.pillar ); }
		scene.remove(obj_point[i]); 
	}	
	
	for ( var i = 0; i < infProject.scene.array.window.length; i++ ){ scene.remove(infProject.scene.array.window[i]); }
	for ( var i = 0; i < infProject.scene.array.door.length; i++ ){ scene.remove(infProject.scene.array.door[i]); }	
	
	
	for ( var i = 0; i < room.length; i++ )
	{		
		scene.remove(room[i].label); 
		if(room[i].userData.room.outline) { scene.remove(room[i].userData.room.outline); }
		scene.remove(room[i]); 
		scene.remove( ceiling[i] );	
	}	
	
	disposeHierchy(scene, disposeNode);
	
	
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
	infProject.scene.array = resetPop.infProjectSceneArray();

}



// удалем из GPU объекты
function disposeHierchy(node, callback) 
{
	for (var i = node.children.length - 1; i >= 0; i--) 
	{
		if(node.children[i].userData.tag)
		{
			var tag = node.children[i].userData.tag;
			
			if(tag == 'point' || tag == 'wall' || tag == 'window' || tag == 'door' || tag == 'room' || tag == 'ceiling' || tag == 'obj')
			{
				var child = node.children[i];

				disposeHierchy(child, callback);
				callback(child);			
			}			
		}			
	}
}


function disposeNode(node) 
{
        if (node instanceof THREE.Mesh) 
		{
            if (node.geometry) { node.geometry.dispose(); }
			
            if (node.material) 
			{
                var materialArray;
                if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) 
				{
                    materialArray = node.material.materials;
                }
                else if(node.material instanceof Array) 
				{
                    materialArray = node.material;
                }
                
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
                else 
				{
                    if (node.material.map) node.material.map.dispose();
                    if (node.material.lightMap) node.material.lightMap.dispose();
                    if (node.material.bumpMap) node.material.bumpMap.dispose();
                    if (node.material.normalMap) node.material.normalMap.dispose();
                    if (node.material.specularMap) node.material.specularMap.dispose();
                    if (node.material.envMap) node.material.envMap.dispose();
                    node.material.dispose();
                }
            }
        }
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
			var f = wd.userData.door.form.v;
		
			var v7 = new THREE.Vector3().subVectors( v[f.maxX[0]], v[f.minX[0]] ).divideScalar ( 2 );		
			var v7 = wd.localToWorld( v[f.minX[0]].clone().add(v7) );
			var dir1 = new THREE.Vector3().subVectors( p[1].position, p[0].position ).normalize();
			var dir2 = new THREE.Vector3().subVectors( v7, p[0].position );
			qt1 = quaternionDirection(dir1);
			var x = localTransformPoint(dir2, qt1).z; 
			x = x / p[1].position.distanceTo( p[0].position );
			
			var y = wall.worldToLocal( wd.localToWorld(v[f.minY[0]].clone()) ).y;

			var arr = {};
			
			arr.id = wd.userData.id;	// id
			arr.lotid  = wd.userData.door.lotid;		// lotid  
			arr.width = Math.round((v[f.maxX[0]].x - v[f.minX[0]].x) * 100) / 100;	// width
			arr.height = Math.round((v[f.maxY[0]].y - v[f.minY[0]].y) * 100) / 100;	// height		
			arr.startPointDist = Math.round(x * 100) / 100;				// pos_start
			arr.over_floor = Math.round(y * 100) / 100;				// over_floor
			if(wd.userData.door.open_type) { arr.open_type = wd.userData.door.open_type; }	// open_type	
			if(wd.userData.tag == 'door') { arr.doState = 'false'; }							// doState	
			arr.options = '';
			
			if(wd.userData.tag == 'window') { windows[windows.length] = arr; }
			else if(wd.userData.tag == 'door') { doors[doors.length] = arr; }			
		}		
	}

	return { windows : windows, doors : doors };
}


function saveFile(cdm) 
{ 
	var json = JSON.stringify( getJsonGeometry() );
	
	$.ajax
	({
		url: 'saveJson.php',
		type: 'POST',
		data: {myarray: json},
		dataType: 'json',
		success: function(json)
		{ 			
			console.log(json); 
		},
		error: function(json){ console.log(json);  }
	});	
	
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




function getJsonGeometry()
{
	var json = 
	{
		floors : 
		[
			{ 
				points : [],
				walls : [],	
				furn : [],
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
	
	for ( var i = 0; i < obj_line.length; i++ )
	{	
		var wall = obj_line[i];
		
		var p = wall.userData.wall.p;
		
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
	
	
	
	for ( var i = 0; i < obj_line.length; i++ )
	{ 
		var p = obj_line[i].userData.wall.p;
		
		walls[i] = { }; 
		
		walls[i].id = obj_line[i].userData.id;
		walls[i].pointStart = p[0].userData.id;
		walls[i].pointEnd = p[1].userData.id;
		walls[i].width = obj_line[i].userData.wall.width; 
		walls[i].height = obj_line[i].userData.wall.height_1; 


		var x1 = p[1].position.z - p[0].position.z;
		var z1 = p[0].position.x - p[1].position.x;	
		var dir = new THREE.Vector3(z1, 0, -x1).normalize();						// перпендикуляр стены  (перевернуты x и y)
		dir.multiplyScalar( obj_line[i].userData.wall.offsetZ );
		walls[i].startShift = new THREE.Vector3(dir.z, 0, dir.x);
				
		var wd = saveWindows(obj_line[i]);		
		walls[i].windows = wd.windows;
		walls[i].doors = wd.doors;
		

		walls[i].colors = [];
		var mat = obj_line[i].userData.material;
		var arr = [{containerID : 'wall3d_'+obj_line[i].userData.id+'_p2', num : 1}, {containerID : 'wall3d_'+obj_line[i].userData.id+'_p1', num : 2}];				
		
		for ( var i2 = 0; i2 < arr.length; i2++ )
		{
			walls[i].colors[i2] = {  };		
			walls[i].colors[i2].containerID = arr[i2].containerID;
			walls[i].colors[i2].lot = { id : mat[arr[i2].num].lotid };

			var color = { r : Number(mat[arr[i2].num].color.r), g : Number(mat[arr[i2].num].color.g), b : Number(mat[arr[i2].num].color.b), a : 1 };
			
			walls[i].colors[i2].matMod = { colorsets : [{ color : color }] };

			walls[i].colors[i2].matMod.texScal = mat[arr[i2].num].scale;
			
			walls[i].colors[i2].matMod.mapingRotate = 0; 
			
			var map = obj_line[i].material[arr[i2].num].map;
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
		rooms[i].roomSType = detectNameRoom('textToId', room[i].userData.room.roomType);		
		
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
	

	
	json.floors[0].points = points;
	json.floors[0].walls = walls;
	json.floors[0].rooms = rooms;
	json.floors[0].furn = furn;
	
	return json;
}






function loadFile(file) 
{
	$.ajax
	({
		url: '/t/fileJson.json',
		type: 'POST',
		dataType: 'json',
		success: function(json)
		{ 
			json.code_server = 200;
			loadTotalLotid(json); 	// загрузка json
		},
	});	
}


function loadTotalLotid(arr)
{
	resetScene();	
		
	UI.setView('2D');	// переключаемся в 2D
	
	loadFilePL(arr);
}




function loadFilePL(arr) 
{                 		
	if(!arr) return;
	
	console.log(arr);
		
	var point = arr.floors[0].points;
	var walls = arr.floors[0].walls;
	var rooms = arr.floors[0].rooms;
	var obj_pop = [];
	

	//if(height_wall < 0.1) { height_wall = 3; }	
			
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
		
		
		wall[i].material = [];
		wall[i].material[0] = { lotid : 4954, color : {r : 93, g : 87, b : 83 }, scale : new THREE.Vector2(1,1) };
		wall[i].material[1] = { lotid : 4954, color : {r : 93, g : 87, b : 83 }, scale : new THREE.Vector2(1,1) };
		

		var arrO = [];
		
		if(walls[i].doors) for ( var i2 = 0; i2 < walls[i].doors.length; i2++ ) { arrO[arrO.length] = walls[i].doors[i2]; arrO[arrO.length - 1].type = 'door'; }
		if(walls[i].windows) for ( var i2 = 0; i2 < walls[i].windows.length; i2++ ) { arrO[arrO.length] = walls[i].windows[i2]; arrO[arrO.length - 1].type = 'window'; }
		
		wall[i].arrO = [];
		
		
		for ( var i2 = 0; i2 < arrO.length; i2++ )
		{					
			wall[i].arrO[i2] = {  }
			
			wall[i].arrO[i2].id = arrO[i2].id;
			wall[i].arrO[i2].lotid = arrO[i2].lotid;
			wall[i].arrO[i2].pos = new THREE.Vector3(Math.round(arrO[i2].startPointDist * 100) / 100, Math.round(arrO[i2].over_floor * 100) / 100, 0);
			wall[i].arrO[i2].size = new THREE.Vector2(Math.round(arrO[i2].width * 100) / 100, Math.round(arrO[i2].height * 100) / 100);
			if(arrO[i2].open_type) { wall[i].arrO[i2].open = arrO[i2].open_type; }
			wall[i].arrO[i2].type = arrO[i2].type;
			
			if(arrO[i2].options){ wall[i].arrO[i2].options = arrO[i2].options; }
		} 	
	}
	


	//-------------
	 
	// удаляем стены, которые пересекаются с друг другом (стена в стене)
	for ( var i = wall.length - 1; i >= 0; i-- )
	{
		for ( var i2 = 0; i2 < wall.length; i2++ )
		{
			if(wall[i] == wall[i2]) continue;			
			
			var count = 0;
			var pos1 = [];
			var pos2 = [];
			if(wall[i].points[0].id == wall[i2].points[0].id) { count++; pos1 = [wall[i].points[0].pos, wall[i].points[1].pos]; pos2 = [wall[i2].points[0].pos, wall[i2].points[1].pos]; }
			if(wall[i].points[0].id == wall[i2].points[1].id) { count++; pos1 = [wall[i].points[0].pos, wall[i].points[1].pos]; pos2 = [wall[i2].points[1].pos, wall[i2].points[0].pos]; }
			if(wall[i].points[1].id == wall[i2].points[0].id) { count++; pos1 = [wall[i].points[1].pos, wall[i].points[0].pos]; pos2 = [wall[i2].points[0].pos, wall[i2].points[1].pos]; }
			if(wall[i].points[1].id == wall[i2].points[1].id) { count++; pos1 = [wall[i].points[1].pos, wall[i].points[0].pos]; pos2 = [wall[i2].points[1].pos, wall[i2].points[0].pos]; }
			
			if(count == 2) { wall.splice(i, 1); }
			else if(count == 1)
			{
				var dir1 = new THREE.Vector3().subVectors( pos1[0], pos1[1] ).normalize();
				var dir2 = new THREE.Vector3().subVectors( pos2[0], pos2[1] ).normalize();
				
				if(!comparePos(dir1, dir2)) { continue; }
				
				var d1 = pos1[0].distanceTo( pos1[1] );
				var d2 = pos2[0].distanceTo( pos2[1] );
				
				if(d1 > d2) { wall.splice(i, 1); } 
			}
		}
	}
	
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
		var inf = { id : wall[i].id, offsetZ : -offsetZ, height : wall[i].height, material : wall[i].material, load : true };
		
		if(infProject.type == 2) { wall[i].width = 0.3; }
		
		var obj = createOneWall3( point1, point2, wall[i].width, inf ); 		
		
		obj.updateMatrixWorld();
		arrW[arrW.length] = obj;
	}	
	 
	
	for ( var i = 0; i < obj_point.length; i++ ) { upLineYY_2(obj_point[i], obj_point[i].p, obj_point[i].w, obj_point[i].start); }
	
	//upLabelPlan_1(obj_line);	// размеры стен
	// создаем и устанавливаем все стены (без окон/дверей)

	

	if(infProject.type == 1) { detectRoomZone(); }
	

	
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

			// если не смогли загрузить дверь, то загружаем проем
			var flag = true;
			
			for ( var i3 = 0; i3 < pool_pop.length; i3++ ) { if(pool_pop[i3].id == wall[i].arrO[i2].lotid) { if(!pool_pop[i3].empty) { flag = false; break; } } } 
			 
			if(flag) 
			{ 
				if(wall[i].arrO[i2].type == 'door') { wall[i].arrO[i2].lotid = 575; delete wall[i].arrO[i2].open; } 
				else if(wall[i].arrO[i2].type == 'window') { wall[i].arrO[i2].lotid = 8747; }
			}

			var inf = { status : 'load', id : wall[i].arrO[i2].id, lotid: wall[i].arrO[i2].lotid, pos : intP, wall : obj };	 		
			if(wall[i].arrO[i2].size) { inf.size = wall[i].arrO[i2].size; }
			if(wall[i].arrO[i2].open) { inf.open_type = wall[i].arrO[i2].open; } 
			if(wall[i].arrO[i2].options) { inf.options = wall[i].arrO[i2].options; }				
						 
			createEmptyFormWD(inf);
		}		
	}
	// устанавливаем окна/двери
	
			


	
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
	
	
	upLabelPlan_1(obj_line);
	calculationAreaFundament_2();
	
	centerCamera2D();
	cameraZoomTop( camera.zoom );
	
	emitAction('load-project-end');
	emitAction('stop-fake-loading');
	renderCamera();
	
	//getSkeleton_1(room); 
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
	
	
	
	for ( var i = 0; i < obj_point.length; i++ ) { upLineYY(obj_point[i]); }	
	if(obj_line.length > 0) detectRoomZone();
	if(obj_line.length > 0) upLabelPlan_1(obj_line);
	if(obj_line.length > 0) createWallZone(obj_line[0])
	
	//width_wall = 0.3;
	
	if(form == 'wall_kirpich' || form == 'wall_block') 
	{ 
		getFormWallR_1(); 	// получаем параметры стены из input 
		createFormWallR(); 
	}  
	if(form == 'wall_plaster') 
	{ 
		createWallPlaster();
	} 
	
	if(infProject.settings.camera.zoom != 1) { cameraZoomTop( infProject.settings.camera.zoom ); }
	
	centerCamera2D();
	renderCamera();
}


 


// конверитруем типы в текст комнат
function detectNameRoom(cdm, value)
{
	var list = roomTypes;		
	
	if(cdm == 'idToText')
	{
		if(isNumeric(value)) 		// если число
		{
			for ( var i = 0; i < list.length; i++ ) { if(value == list[i].id) { return list[i].caption; } }
		}
		else
		{
			for ( var i = 0; i < list.length; i++ ) { if(value == list[i].alias) { return list[i].caption; } }		
		}		
	}
	else if(cdm == 'textToId')
	{
		for ( var i = 0; i < list.length; i++ ) { if(value == list[i].caption) { return list[i].alias; } }
	}
	
	return 'null';
}





