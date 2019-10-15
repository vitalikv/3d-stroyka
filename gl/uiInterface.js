

createListInCatalogUI_1();

// создаем объекты и добавляем их в каталог UI
function createListInCatalogUI_1()
{
	var obj = [];
	
	var arr = [];
	
	arr[0] = {lotid: 1, name: 'насос'};
	arr[1] = {lotid: 2, name: 'котел'};
	arr[2] = {lotid: 3, name: 'радиатор'};
	arr[3] = {lotid: 4, name: 'расширительный бак'};
	arr[4] = {lotid: 5, name: 'коллектор'};
	
	addObjInCatalogUI_1({obj: arr});
}



// добавляем объекты в каталог UI
function addObjInCatalogUI_1(cdm)
{
	
	for(var i = 0; i < cdm.obj.length; i++)
	{
		var str = 
		'<div class="right_panel_1_1_list_item" add_lotid="'+cdm.obj[i].lotid+'">\
			<div class="right_panel_1_1_list_item_text">'
			+cdm.obj[i].name+
			'</div>\
		</div>';
		
		$('[list_ui="catalog"]').append(str);
	}
	
}


// добавляем/обновляем/удаляем в список материалов новый объект, который добавляем в сцену UI
function updateListTubeUI_1(cdm)
{
	if(cdm.type == 'add')
	{
		var obj = cdm.o;
		
		var tag = obj.userData.tag; 
		
		if(tag == 'wf_line')
		{
			var str = 
			'<div class="right_panel_1_1_list_item" uuid="'+obj.uuid+'">\
			<div class="right_panel_1_1_list_item_color"></div>\
			<div class="right_panel_1_1_list_item_text">труба</div>\
			<div class="right_panel_1_1_list_item_text"></div>\
			</div>';			
		}
		else if(tag == 'obj')
		{   
			var str = 
			'<div class="right_panel_1_1_list_item" uuid="'+obj.uuid+'">\
			<div class="right_panel_1_1_list_item_text">'+obj.userData.obj3D.nameRus+'</div>\
			</div>';			
		}
		else
		{
			return;
		}
		
		$('[list_ui="wf"]').prepend(str);
		
		var q = $('[list_ui="wf"]')[0].children[0];
		q.uuid = obj.uuid;
		
		
		if(tag == 'wf_line') { $(q.children[0]).css('background-color', '#'+obj.userData.wf_line.color.clone().getHexString()); }
		
		infProject.ui.list_wf[infProject.ui.list_wf.length] = q;	
	}
	
	if(cdm.type == 'delete')
	{
		for(var i = 0; i < infProject.ui.list_wf.length; i++)
		{
			if(infProject.ui.list_wf[i].uuid == cdm.uuid) { infProject.ui.list_wf[i].remove(); break; }
		}		
		
	}
	
	if(cdm.type == 'update')
	{
		var q = null;
		var line = cdm.o;
		
		console.log('update', line.userData);
		
		for(var i = 0; i < infProject.ui.list_wf.length; i++)
		{
			if(infProject.ui.list_wf[i].uuid == line.uuid) { q = infProject.ui.list_wf[i]; break; }
		}

		if(q)
		{
			//console.log(cdm, $('[list_ui="wf"]'), $(q.children[0]));
			
			$(q.children[0]).css('background-color', '#'+line.userData.wf_line.color.clone().getHexString());
			$(q.children[1]).text('труба '+line.userData.wf_line.diameter * 1000);
			
			var v = line.geometry.vertices;
			var length = 0;				
			for(var i = 0; i < v.length - 1; i++){ length += v[i].distanceTo(v[i + 1]); }
			
			$(q.children[1]).text('труба '+line.userData.wf_line.diameter * 1000);
			$(q.children[2]).text(Math.round(length * 100)/100+'м');			
		}
	}
}



// при выделении объекта меняем боковое меню
function clickObjUI(cdm)
{
	if(!cdm) { cdm = {}; }	
	if(!cdm.obj) return;
	
	var obj = cdm.obj;
	var inf = null;
	
	if(obj.userData.obj3D) { inf = obj.userData.obj3D; }
	else if(obj.userData.groupObj) { inf = obj.userData.groupObj; }
	else { return; }
	
	$('[nameId="rp_obj_name"]').val(inf.nameRus);
	
	
	showGroupObjUI({obj : obj});
	
}



// кликнули на группу объектов, показываем в меню дочерние объекты
function showGroupObjUI(cdm)
{
	if(!cdm) { cdm = {}; }	
	if(!cdm.obj) return;
	
	var obj = cdm.obj;			
	
	
	// удаляем старый списко (если он есть)
	for(var i = 0; i < infProject.ui.group_obj.length; i++)
	{
		infProject.ui.group_obj[i].el.remove();
	}	
	
	infProject.ui.group_obj = [];
	
	if(!obj.userData.groupObj) return;
	
	// добавляем новый список объектов из группы
	for(var i = 0; i < obj.children.length; i++)
	{
		var child = obj.children[i];
		
		var str = 
		'<div class="right_panel_1_1_list_item" uuid="'+child.uuid+'" group_item_obj="">\
		<div class="right_panel_1_1_list_item_text">'+child.userData.obj3D.nameRus+'</div>\
		</div>';

		$('[nameId="rp_obj_group"]').prepend(str);		
		var el = $($('[nameId="rp_obj_group"]')[0].children[0]);
		
		infProject.ui.group_obj[infProject.ui.group_obj.length] = { el: el, obj: child };

		el.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });  
	}

}


// кликнули на меню дочерних объектов группы
function clickItemObjNameUI(cdm)
{
	var item = cdm.el;
	
	var value = item.attr('uuid');
	var obj = null;
	
	// снимаем старые выдиления  
	for(var i = 0; i < infProject.ui.group_obj.length; i++)
	{
		if(infProject.ui.group_obj[i].el[0] == item[0]){ obj = infProject.ui.group_obj[i].obj; } 
		infProject.ui.group_obj[i].el.css('background-color', '#ffffff');
	}	
	
	// выделяем новый пункт на который кликнули 
	item.css('background-color', '#00ff00');
	
	
	

	var pos1 = obj.getWorldPosition(new THREE.Vector3());
	var q1 = obj.getWorldQuaternion(new THREE.Quaternion());

	scene.add(obj);
	
	obj.position.copy(pos1);
	obj.quaternion.copy(q1);	
	
	clickO.last_obj = obj;
	
	clickObject3D(obj, {element: true});   
}




