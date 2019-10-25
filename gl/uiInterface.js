

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
	
	
	if(obj.userData.obj3D.group) { inf = obj.userData.obj3D.group.userData.groupObj; }
	else if(obj.userData.obj3D) { inf = obj.userData.obj3D; }
	else { return; }
	
	$('[nameId="rp_obj_name"]').val(inf.nameRus);
	
	
	showGroupObjUI({obj: obj, active: 'first'}); 
	showCenterObjUI({obj: obj, active: 'first'});
}


// кликнули объект, показываем центры объекта (правом меню UI)
function showCenterObjUI(cdm)
{
	if(!cdm) { cdm = {}; }	
	if(!cdm.obj) return;
	
	var obj = cdm.obj;		

	clearCenterObjUI();	// очищаем список дочерних объектов группы (если он есть)
	

	var arr = getArrayJointPoint(cdm);
	
	if(arr.length == 0) return; 	// у объекта нет разъемов
	
	for(var i = 0; i < arr.length; i++)
	{		
		//arr[i].visible = true;
		//arr[i].material = infProject.tools.joint.material.default;	
		
		var child = arr[i];
		
		if(!child.userData.centerPoint) continue;
		
		var str = 
		'<div class="right_panel_1_1_list_item" uuid="'+child.uuid+'">\
		<div class="right_panel_1_1_list_item_text">'+child.userData.centerPoint.nameRus+'</div>\
		</div>';

		$('[nameId="rp_obj_center"]').append(str);		
		var el = $($('[nameId="rp_obj_center"]')[0].children[$('[nameId="rp_obj_center"]')[0].children.length - 1]);
		
		infProject.ui.center_obj.o[infProject.ui.center_obj.o.length] = { el: el, obj: child };

		el.on('mousedown', function(){ clickItemCenterObjUI({el: $(this)}) });		
	}
	
	// выделяем первый элемент  
	if(cdm.active == 'first') 
	{ 
		var el = $($('[nameId="rp_obj_center"]')[0].children[0]);
		el.css('background-color', '#00ff00');
	}
}

 

// очищаем список дочерних объектов группы UI
function clearCenterObjUI(cdm)
{
	for(var i = 0; i < infProject.ui.center_obj.o.length; i++)
	{
		infProject.ui.center_obj.o[i].el.remove();
	}	
	
	infProject.ui.center_obj.o = [];	
}



// выбираем центр объекта
function clickItemCenterObjUI(cdm)
{
	var item = null;
	var obj = null;
	
	if(infProject.ui.center_obj.o.length == 0) return;	// у объекта нет разъемов
	
	
	// снимаем старые выдиления в UI 
	for(var i = 0; i < infProject.ui.center_obj.o.length; i++)
	{
		infProject.ui.center_obj.o[i].el.css('background-color', '#ffffff');
	}
	
	
	if(cdm.el)	// кликнули на пункт в меню
	{
		for(var i = 0; i < infProject.ui.center_obj.o.length; i++)
		{
			if(infProject.ui.center_obj.o[i].el[0] == cdm.el[0]){ obj = infProject.ui.center_obj.o[i].obj; break; } 
		}

		item = cdm.el;
	}
	else if(cdm.obj)	// кликнули на объект в сцене
	{
		for(var i = 0; i < infProject.ui.center_obj.o.length; i++)
		{
			if(infProject.ui.center_obj.o[i].obj == cdm.obj){ item = infProject.ui.center_obj.o[i].el; break; } 
		}

		obj = cdm.obj;
	}
	else if(cdm.item !== undefined)	// присылаем номер пункта, который хотим выделить 
	{
		item = infProject.ui.center_obj.o[cdm.item].el;
		obj = infProject.ui.center_obj.o[cdm.item].obj;
	}
	else
	{
		return;
	}
	
	
	// выделяем новый пункт на который кликнули UI
	item.css('background-color', '#00ff00');
	var value = item.attr('uuid');	 
	
	// выделяем объект в сцене
	clickObject3D(obj);		 
}



// кликнули объект, показываем список дочерних объектов (правом меню UI)
function showGroupObjUI(cdm)
{
	if(!cdm) { cdm = {}; }	
	if(!cdm.obj) return;
	
	var obj = cdm.obj;			
	
		
	clearChildGroupUI();	// очищаем список дочерних объектов группы (если он есть)
	
	if(obj.userData.obj3D.group) 	// группа
	{
		var group = obj.userData.obj3D.group;
		var arr = group.userData.groupObj.child; 

		// добавляем в список группу	
		var str = 
		'<div class="right_panel_1_1_list_item" uuid="group_item" group_item_obj="">\
		<div class="right_panel_1_1_list_item_text">'+group.userData.groupObj.nameRus+'</div>\
		</div>';	
		
		$('[nameId="rp_obj_group"]').append(str); 
		var el = $($('[nameId="rp_obj_group"]')[0].children[0]);	
		infProject.ui.group_obj.o[infProject.ui.group_obj.o.length] = { el: el, obj: obj };
		el.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });

		
		// добавляем новый список объектов из группы
		for(var i = 0; i < arr.length; i++)
		{
			var child = arr[i];
			
			if(!child.userData.obj3D) continue;
			
			var str = 
			'<div class="right_panel_1_1_list_item" uuid="'+child.uuid+'" group_item_obj="">\
			<div class="right_panel_1_1_list_item_text">'+child.userData.obj3D.nameRus+'</div>\
			</div>';

			$('[nameId="rp_obj_group"]').append(str);		
			var el = $($('[nameId="rp_obj_group"]')[0].children[$('[nameId="rp_obj_group"]')[0].children.length - 1]);
			
			infProject.ui.group_obj.o[infProject.ui.group_obj.o.length] = { el: el, obj: child };

			el.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });  
		} 
	}
	else	// у объекта нет группы
	{
		var str = 
		'<div class="right_panel_1_1_list_item" uuid="'+obj.uuid+'" group_item_obj="">\
		<div class="right_panel_1_1_list_item_text">объект без группы</div>\
		</div>';	
		
		$('[nameId="rp_obj_group"]').append(str); 
		var el = $($('[nameId="rp_obj_group"]')[0].children[0]);	
		infProject.ui.group_obj.o[infProject.ui.group_obj.o.length] = { el: el, obj: obj };
		el.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });		
	}
	
	
	// выделяем первый элемент  
	if(cdm.active == 'first') 
	{
		var el = $($('[nameId="rp_obj_group"]')[0].children[0]);
		el.css('background-color', '#00ff00');
	}	
}


// очищаем список дочерних объектов группы UI
function clearChildGroupUI(cdm)
{
	for(var i = 0; i < infProject.ui.group_obj.o.length; i++)
	{
		infProject.ui.group_obj.o[i].el.remove();
	}	
	
	infProject.ui.group_obj.o = [];	
}



// выбираем группу или объект
function clickItemObjNameUI(cdm)
{
	var item = null;
	var obj = null;
	
	
	
	// снимаем старые выдиления  
	for(var i = 0; i < infProject.ui.group_obj.o.length; i++)
	{
		infProject.ui.group_obj.o[i].el.css('background-color', '#ffffff');
	}	
	
	
	if(cdm.el)		// кликнули на пункт в меню
	{
		for(var i = 0; i < infProject.ui.group_obj.o.length; i++)
		{
			if(infProject.ui.group_obj.o[i].el[0] == cdm.el[0]){ obj = infProject.ui.group_obj.o[i].obj; break; } 
		}		
		
		item = cdm.el;
	}
	else if(cdm.item !== undefined)	// присылаем номер пункта, который хотим выделить 
	{
		item = infProject.ui.group_obj.o[cdm.item].el;
		obj = infProject.ui.group_obj.o[cdm.item].obj;
	}
	else
	{
		return;
	}
	
	
	
	// выделяем новый пункт на который кликнули 
	item.css('background-color', '#00ff00');
	var value = item.attr('uuid');	
	
	
	if(value == 'group_item')
	{   
		obj = infProject.ui.group_obj.o[0].obj;
		clickObject3D(obj, {group: true, outline: true}); 
		showCenterObjUI({obj: obj, group: true, active: 'first'});
		
		$('[nameId="rp_obj_name"]').val(obj.userData.obj3D.group.userData.groupObj.nameRus);
	}
	else
	{
		clickObject3D(obj, {group: false, outline: true}); 
		showCenterObjUI({obj: obj, group: false, active: 'first'});
		
		$('[nameId="rp_obj_name"]').val(obj.userData.obj3D.nameRus);
	}	
}




