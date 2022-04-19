


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
		var array = { obj : [], tube : [] };
		array.lineGrid = { limit : false };
		array.base = (infProject.start)? infProject.scene.array.base : [];	// массив клонируемых объектов
		array.group = [];
		array.wtgrid = [];
		array.house = [];
		
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
		array.activeItem_1 = 'rgb(167, 207, 242)';

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
		inf.arrO = [];
		
		return inf;
	},
	
	active : function()
	{
		return { create : true, delete : true, click2D : true, click3D : true, move : true, replace : true, unlock : true };
	},	
}



function resetScene() 
{	
	console.log(renderer.info.memory);
	
	var tube = infProject.scene.array.tube;
	var obj = infProject.scene.array.obj;
	var group = infProject.scene.array.group;
	var substrate = infProject.scene.substrate.floor;
	var house = infProject.scene.array.house;
	
	hideMenuObjUI_2D();		// снимаем выделение с выбранного объекта 
	

	for ( var i = 0; i < tube.length; i++ )
	{		
		for ( var i2 = tube[i].userData.wf_tube.point.length - 1; i2 > -1; i2-- )
		{
			disposeNode(tube[i].userData.wf_tube.point[i2]);
			scene.remove(tube[i].userData.wf_tube.point[i2]);		
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
	
	if(house.length > 0)
	{
		for ( var i = 0; i < house.length; i++ )
		{
			disposeNode(house[i]);
			scene.remove(house[i]);		
		}

		// удаляем список этажей UI
		var arrEl = document.querySelector('[nameId="rp_plane_2"]').children;		
		for(var i = arrEl.length - 1; i > -1; i--){ arrEl[i].remove(); }		
	}

	
	// удаляем список материалов UI
	var container = document.body.querySelector('[list_ui="wf"]');
	container.innerHTML = '';	
	//for(var i = 0; i < infProject.list.obj_scene_ui.length; i++){ //infProject.list.obj_scene_ui[i].el.remove(); }	
	infProject.list.obj_scene_ui = [];
		 
	
	// удаляем список объектов UI
	clearItemSelectedObjUI();			


	countId = 2;
	
	
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
function disposeNode(obj) 
{	
	var arr = [obj];
	
	obj.traverse(function(child) 
	{
		if(child.isMesh  || child.isLine) arr[arr.length] = child;
	});
	
	for ( var i = 0; i < arr.length; i++ )
	{
		clearM(arr[i]);
	}
	
	
	function clearM(node)
	{
		if (node.geometry) { node.geometry.dispose(); }
		
		if (node.material) 
		{
			var materialArray = [];
			
			if(node.material instanceof Array) { materialArray = node.material; }
			else { materialArray = [node.material]; }
			
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
		
		renderer.renderLists.dispose();		
	}
}





function getJsonGeometry()
{
	var json = {};	

	var furn = [];
	var group = [];
	var pipe = [];
	var subs = [];
	var house = [];
	

	
	for ( var i = 0; i < infProject.scene.array.obj.length; i++ )
	{
		var obj = infProject.scene.array.obj[i];
		
		var gr = null;
		
		if(obj.userData.obj3D.group)	// если объект приналежит группе
		{
			gr = { name: 'group', id: obj.userData.obj3D.group.userData.id }; 
		}		
			
		var m = furn.length;
		furn[m] = {};
		furn[m].id = Number(obj.userData.id);
		furn[m].lotid = Number(obj.userData.obj3D.lotid);
		furn[m].pos = obj.position;
		furn[m].q = {x: obj.quaternion.x, y: obj.quaternion.y, z: obj.quaternion.z, w: obj.quaternion.w};
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
			//if(child[i2].userData.tag != 'obj') continue;
			
			arrO[arrO.length] = { id: Number(child[i2].userData.id) };
		}
		
		var m = group.length;
		group[m] = {};
		group[m].obj = arrO;
	}
	
	
	for ( var i = 0; i < infProject.scene.array.tube.length; i++ )
	{
		var tube = infProject.scene.array.tube[i];
		
		var m = pipe.length;
		pipe[m] = {};
		pipe[m].id = tube.userData.id;
		pipe[m].diameter = tube.userData.wf_tube.diameter;
		pipe[m].color = tube.material.color;
		
		pipe[m].point = [];
		
		for ( var i2 = 0; i2 < tube.userData.wf_tube.point.length; i2++ )
		{
			pipe[m].point[i2] = {};
			pipe[m].point[i2].id = tube.userData.wf_tube.point[i2].userData.id;
			pipe[m].point[i2].pos = tube.userData.wf_tube.point[i2].position;
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
		
		// если есть права админа, то можно сохранить img в БД
		var saveImg = false;
		if(infProject.user.status) { if(infProject.user.status == 'admin'){ saveImg = true; } }
		
		if(plane.userData.substrate.img && saveImg)
		{ 
			subs[i].img = plane.material.map.image.src;
		}
	}

	for ( var i = 0; i < infProject.scene.array.house.length; i++ )
	{
		var o = infProject.scene.array.house[i];
		house[i] = {};
		house[i].id = o.userData.house.lotId;
		house[i].pos = o.position;
		house[i].rot = o.rotation;
	}
	
	json.furn = furn;
	json.group = group;
	json.pipe = pipe;
	json.subs = subs;
	json.house = house;
	
	
	return json;
}





async function saveFile(cdm) 
{ 
	var lengthTube = infProject.user.sum.tube;
	var countObj = infProject.user.sum.obj;
	
	var success = true;
	var err = {obj: null, tube: null};
	
	var limit = { obj: 200, tube: 150 };
	if(infProject.user.status){ if(infProject.user.status == 'admin'){ limit = { obj: 2000, tube: 1500 }; } }
	
	if(countObj > limit.obj) { err.obj = 'лимит на кол-во объектов: '+limit.obj+'шт'; success = false; }
	if(lengthTube > limit.tube) { err.tube = 'лимит на общую длину труб: '+limit.tube+'м'; success = false; }
	
	if(!success)
	{
		var html = `<div style="color: #ff0000; margin-bottom: 10px;">Проект НЕ сохранен</div>`;
		
		if(err.tube){ html += `<div style="color: #ff0000;">${err.tube}</div>`; }
		if(err.obj){ html += `<div style="color: #ff0000;">${err.obj}</div>`; }		
		
		var el_err_inf = document.querySelector('[nameId="wm_save_inf_project_err"]');
		el_err_inf.innerHTML = html;
		
		return false;
	}
	
	var json = JSON.stringify( getJsonGeometry() );
	
	if(cdm.json)
	{
		// сохраняем в папку
		var url = infProject.path+'saveJson.php';			
		
		var response = await fetch(url, 
		{
			method: 'POST',
			body: 'myarray='+encodeURIComponent(json),
			headers: 
			{	
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
			},				
		});
		var json = await response.json();

		console.log(json);
		
		return true;
	}
	
	
	if(cdm.id)
	{
		// сохраняем в бд
		var url = infProject.path+'components/saveSql.php';			
		 
		var response = await fetch(url, 
		{
			method: 'POST',
			body: 'id='+cdm.id+'&user_id='+infProject.user.id+'&preview='+encodeURIComponent(saveAsImage({preview: true}))+'&json='+encodeURIComponent(json),
			headers: 
			{	
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
			},				
		});
		var json = await response.json();
		
		console.log(json);
		
		if(cdm.upUI) { getListProject({id: infProject.user.id}); }		// обновляем меню сохрание проектов		
		
		return true;
	}
	
}





async function loadFile(cdm) 
{
	if(cdm.id == 0) { resetScene(); return; }	 
	
	
	if(cdm.json)	// загрузка json из папки
	{
		
		var url = infProject.path+'t/fileJson.json';					
		var response = await fetch(url);
		var json = await response.json();		

		resetScene();
		loadFilePL(json); 	// загрузка json		
	}
	else	// загрузка json из бд
	{
		var url = infProject.path+'components/loadSql.php';			
		
		var response = await fetch(url, 
		{
			method: 'POST',
			body: 'id='+cdm.id,
			headers: 
			{	
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
			},				
		});
		var json = await response.json();
		
		resetScene();
		loadFilePL(json); 	// загрузка json		
		
	}
	
}






async function loadFilePL(arr) 
{    
	
	if(!arr) return;
	
	//console.log(arr);
	
	infProject.project = { file: arr, load: { furn: [] } };
		
	var furn = (arr.furn) ? arr.furn : [];
	var pipe = (arr.pipe) ? arr.pipe : [];
	var subs = (arr.subs) ? arr.subs : [];
	var house = (arr.house) ? arr.house : [];
			

	//-------------
	 
	
	for ( var i = 0; i < pipe.length; i++ )
	{
		var tube = crTubeWF({id: pipe[i].id, point: pipe[i].point, diameter: pipe[i].diameter, color: new THREE.Color(pipe[i].color), pVisible: false});
		addTubeInScene(tube, {});
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
	
	for ( var i2 = 0; i2 < house.length; i2++ )
	{
		let inf = {};
		inf.id = house[i].id;
		if(house[i].pos) inf.pos = new THREE.Vector3(house[i].pos.x, house[i].pos.y, house[i].pos.z);
		if(house[i].rot) inf.rot = new THREE.Vector3(house[i].rot.x, house[i].rot.y, house[i].rot.z);
		
		await loadHouse(inf);
	}
	
	readyProject();
	
	cameraZoomTop( camera.zoom );
	

	renderCamera();
	
	//getSkeleton_1(room); 
}


// загружаем объекты в сцену и сохраняем в кэш (создаем уникальную копию)
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
	var table = infProject.settings.BD.table.list_obj;
	
	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'table='+table+'&select_list=id, name'+strId ,
		headers: 
		{
			'Content-Type': 'application/x-www-form-urlencoded'
		},		
		
	});
	var json = await response.json();

	document.querySelector('[nameId="menu_loader_slider_UI"]').style.display = 'block';
	
	for ( var i = 0; i < json.length; i++ )
	{		
		for ( var i2 = 0; i2 < furn.length; i2++ )
		{
			if(furn[i2].lotid == json[i].id) 
			{ 				
				await loadObjServer(furn[i2]);

				infProject.project.load.furn[infProject.project.load.furn.length] = furn[i2].lotid;	

				var rat = (Math.round((infProject.project.load.furn.length/infProject.project.file.furn.length)*100)) + '%';
				
				document.querySelector('[nameId="txt_loader_slider_UI"]').innerText = rat;
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
	
	document.querySelector('[nameId="menu_loader_slider_UI"]').style.display = 'none';
	
	if( isCheckExsistFunction(window['cr_obj_cat']) ) { cr_obj_cat(); } 
	
	changeCamera(cameraTop);	
}




