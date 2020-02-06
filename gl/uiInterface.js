



// добавляем объекты в каталог UI 
function addObjInCatalogUI_1(cdm)
{
	
	for(var i = 0; i < infProject.catalog.length; i++)
	{
		var o = infProject.catalog[i];
		
		if(o.stopUI) continue;
		
		var str = 
		'<div class="flex_1 right_panel_1_1_list_item" add_lotid="'+o.lotid+'">\
			<div class="right_panel_1_1_list_item_text">'
			+o.name+
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
			'<div class="flex_1 right_panel_1_1_list_item" uuid="'+obj.uuid+'">\
			<div class="right_panel_1_1_list_item_color"></div>\
			<div class="right_panel_1_1_list_item_text">труба</div>\
			<div class="right_panel_1_1_list_item_text"></div>\
			</div>';			
		}
		else if(tag == 'obj')
		{   
			var str = 
			'<div class="flex_1 right_panel_1_1_list_item" uuid="'+obj.uuid+'">\
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





// создаем текст для списка
function createTextUI_1(cdm)
{
	var obj = cdm.obj;
	var nameId = cdm.nameId;
	var uuid = cdm.uuid;
	var nameRus = cdm.nameRus;
	
	// добавляем в список 	
	if(nameId == "rp_plane_2")
	{
		var str = 
		'<div class="right_panel_1_1_list_item" uuid="'+uuid+'">\
			<div class="flex_1">\
				<div class="right_panel_1_1_list_item_text">'+nameRus+'</div>\
				<div class="right_panel_1_1_list_item_text">img</div>\
				<div class="right_panel_1_1_list_item_text">удал</div>\
			</div>\
		</div>';			
	}
	else
	{
		var str = 
		'<div class="flex_1 right_panel_1_1_list_item" uuid="'+uuid+'">\
		<div class="right_panel_1_1_list_item_text">'+nameRus+'</div>\
		</div>';		
	}
		

	var el = $(str).appendTo('[nameId="'+nameId+'"]');
				
	
	if(nameId == "rp_add_group")
	{
		var n = infProject.tools.merge_obj.el.length;	
		infProject.tools.merge_obj.el[n] = el;
	}	

	if(nameId == "rp_obj_align")
	{
		var n = infProject.tools.joint.el.length;	
		infProject.tools.joint.el[n] = el;
		infProject.tools.joint.p2[n] = obj;
		
		el.on('mousedown', function(){ clickItemCenterObjUI_2({el: $(this)}) });
	}

	if(nameId == "rp_plane_2")
	{
		var n = infProject.tools.plane.o1.length;	
		infProject.tools.plane.o1[n] = obj;
		infProject.tools.plane.el[n] = el;
		
		el.on('mousedown', function(e){ clickItemFloorUI({el: $(this)}); e.stopPropagation(); });
		
		var el_2 = $(el[0].children[0].children[1]);		 
		el_2.on('mousedown', function(e){ clickItemParamsPlaneUI({el: $(this), nameId: "substrate"}); e.stopPropagation(); });

		var el_2 = $(el[0].children[0].children[2]);		 
		el_2.on('mousedown', function(e){ clickItemParamsPlaneUI({el: $(this), nameId: "button_delete_plane"}); e.stopPropagation(); });		
	}	
}



function createTextUI_2(cdm)
{
	var nameId = "rp_plane_3";
	
	// добавляем в список 	
	var str = 
	'<div class="flex_1 right_panel_1_1_list_item" nameId="button_add_plane">\
	<div class="right_panel_1_1_list_item_text"> + </div>\
	</div>';	
	
	$('[nameId="'+nameId+'"]').append(str); 
	var el = $($('[nameId="'+nameId+'"]')[0].children[$('[nameId="'+nameId+'"]')[0].children.length - 1]);	
}




function clickItemParamsPlaneUI(cdm)
{
	console.log(5555, cdm.el);
	
	var nameId = cdm.nameId;
	
	$('[nameId="substrate"]').hide();
	$('[nameId="rp_height_plane"]').hide();
	$('[nameId="button_delete_plane"]').hide();
	
	
	$('[nameId="'+nameId+'"]').show();	
	
}




// кликнули объект, создаем/показываем список группы (дочерних объектов) (правом меню UI)
function clickObjUI(cdm)
{
	if(!cdm) { cdm = {}; }	
	if(!cdm.obj) return;
	
	var obj = cdm.obj;
	var inf = null;
	
	if(obj.userData.obj3D) { var obj = cdm.obj; }
	else if(obj.userData.centerPoint) { var obj = cdm.obj.parent; }
	else { return; }
	
	
	
				
	
	// очищаем список объектов UI
	clearItemSelectedObjUI();


	if(obj.userData.obj3D.group) 	// группа
	{
		var arrO = [];
		var arr = obj.userData.obj3D.group.userData.groupObj.child; 
		
		// добавляем новый список объектов из группы
		for(var i = 0; i < arr.length; i++)
		{	
			if(!arr[i].userData.obj3D) continue;			
			
			arrO[arrO.length] = arr[i];			
		} 
	}
	else	// у объекта нет группы
	{
		var arrO = [obj]; 
	}
	
	
	for(var i = 0; i < arrO.length; i++)
	{
		var str = 
		'<div class="flex_1 right_panel_1_1_list_item relative_1">\
		<div class="right_panel_1_1_list_item_text">'+arrO[i].userData.obj3D.nameRus+'</div>\
			<div nameId="shCp_1" style="width: 40px; height: 20px;">\
				<div style="position: absolute; width: 15px; height: 10px; right: 20px;">\
					<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
					</svg>\
				</div>\
			</div>\
		</div>';				
		
		var el = $(str).appendTo('[nameId="rp_obj_group"]');
		
		el.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });
		
		// создаем кнопку
		var el_2 = $(el[0].querySelector('[nameId="shCp_1"]'));
		el_2.on('mousedown', function(e){ showHideJP({switch: true}); e.stopPropagation(); });	
		
		
		var num = infProject.list.rp_ui.arr.length;
		infProject.list.rp_ui.arr[num] = { o: arrO[i], el: el, p: [] };
		
		{			
			var o = getCenterPointFromObj_1(arrO[i]);	// разъемы объекта	
			
			for(var i2 = 0; i2 < o.length; i2++)
			{				
				if(!o[i2].userData.centerPoint) continue;			

				var str = 
				'<div class="flex_1 right_panel_1_1_list_item">\
				<div class="right_panel_1_1_list_item_text"> &rarr; '+o[i2].userData.centerPoint.nameRus+'</div>\
				</div>';

				var el2 = $(str).appendTo('[nameId="rp_obj_group"]');				
				
				infProject.list.rp_ui.arr[num].p[infProject.list.rp_ui.arr[num].p.length] = { o: o[i2], el: el2 };
				
				el2.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });			
			}		
		}		
		
	}
	
	// выделяем в меню
	clickItemObjNameUI({obj: cdm.obj});		
}



// показываем список объектов которые будут объединены в новую группу
function showListSelectedObjGroupUI(cdm) 
{
	if(infProject.tools.merge_obj.o2.length == 0) return;	
	
	clearListUI_2({list: infProject.tools.merge_obj.el});	
	
	for(var i = 0; i < infProject.tools.merge_obj.o2.length; i++)
	{
		var child = infProject.tools.merge_obj.o2[i];		
		if(!child.userData.obj3D) continue;		
		createTextUI_1({obj: child, nameId: "rp_add_group", nameRus: child.userData.obj3D.nameRus, uuid: child.uuid});  		
	}	
}



// очищаем список UI
function clearListUI_2(cdm)
{
	var list = cdm.list;
	
	for(var i = 0; i < list.length; i++)
	{
		list[i].remove();
	}	
	

	if(infProject.tools.merge_obj.el == list) { infProject.tools.merge_obj.el = []; }
	if(infProject.tools.joint.el == list) { infProject.tools.joint.p2 = []; infProject.tools.joint.el = []; }
}


// кликнули на Checkbox группа (выбираем все объекты или снимаем выделения, кроме объекта, на котором стоит pivot)
function clickCheckboxgroup_1(cdm)
{
	infProject.settings.active.group = !infProject.settings.active.group;
	
	if(infProject.settings.active.group) { $('[nameId="box_input_checked_group"]').show(); }
	else { $('[nameId="box_input_checked_group"]').hide(); }

	clickItemObjNameUI({button: true});						 
}



// удаляем список объектов UI
function clearItemSelectedObjUI()
{
	var list = infProject.list.rp_ui.arr;
	
	for(var i = 0; i < list.length; i++)
	{
		list[i].el.remove();
		
		for(var i2 = 0; i2 < list[i].p.length; i2++)
		{
			list[i].p[i2].el.remove();
		}
	}		

	infProject.list.rp_ui = { arr: [] };		
}



// снимаем старые выдиления
function resetItemSelectedObjUI()
{
	var list = infProject.list.rp_ui.arr;
	
	for(var i = 0; i < list.length; i++)
	{
		list[i].el.css('background-color', '#ffffff');
		
		for(var i2 = 0; i2 < list[i].p.length; i2++)
		{
			list[i].p[i2].el.css('background-color', '#ffffff');
		}
	}
}	



// выбираем группу или объект
function clickItemObjNameUI(cdm)
{
	var item = null;
	var obj = null;
	var list = infProject.list.rp_ui.arr;
	
	// снимаем старые выдиления
	resetItemSelectedObjUI();	
	
	if(cdm.button)
	{
		var obj = getObjFromPivotGizmo();
		if(obj) cdm.obj = obj; console.log(77777, obj);
	}	
	
	if(cdm.el)		// кликнули на пункт в меню
	{
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].el[0] == cdm.el[0]){ obj = list[i].o; break; } 
			
			for(var i2 = 0; i2 < list[i].p.length; i2++)
			{
				if(list[i].p[i2].el[0] == cdm.el[0]){ obj = list[i].p[i2].o; break; }
			}			
		}		
		
		item = cdm.el;
	}
	else if(cdm.obj)	// кликнули на объект в сцене
	{ 
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].o == cdm.obj){ item = list[i].el; break; } 
			
			for(var i2 = 0; i2 < list[i].p.length; i2++)
			{
				if(list[i].p[i2].o == cdm.obj){ item = list[i].p[i2].el; break; }
			}			
		}
		
		obj = cdm.obj;
	}
	else if(cdm.item !== undefined)	// присылаем номер пункта, который хотим выделить 
	{
		item = list[cdm.item].el;
		obj = list[cdm.item].o;
	}
	else
	{
		return;
	}

	
	  
	// выделяем в меню все объекты группы 
	if(infProject.settings.active.group) 	
	{ 
		for(var i = 0; i < list.length; i++)
		{
			list[i].el.css('background-color', '#00ff00'); 
		}
	}

	item.css('background-color', 'rgb(7, 248, 248)');
	
	

	if(obj.userData.obj3D) 
	{ 
		$('[nameId="rp_obj_name"]').val(obj.userData.obj3D.nameRus);
	}
	else if(obj.userData.centerPoint)
	{		
		$('[nameId="rp_obj_name"]').val(obj.userData.centerPoint.nameRus);
	}
	
	clickObject3D(obj, {outline: true});
	showHideJP();
	
}






// выбираем центр для объекта к которому хотим присоединиться 
function clickItemCenterObjUI_2(cdm)
{
	var item = null;
	var obj = null;
	
	var joint = infProject.tools.joint;
	
	if(joint.el.length == 0) return;	// у объекта нет разъемов
	
	
	// снимаем старые выдиления в UI 
	for(var i = 0; i < joint.el.length; i++)
	{
		joint.el[i].css('background-color', '#ffffff');
	}
	
	
	if(cdm.el)	// кликнули на пункт в меню
	{
		for(var i = 0; i < joint.el.length; i++)
		{
			if(joint.el[i][0] == cdm.el[0]){ obj = joint.p2[i]; break; } 
		}

		item = cdm.el;
	}
	else if(cdm.obj)	// кликнули на объект в сцене
	{
		for(var i = 0; i < joint.el.length; i++)
		{
			if(joint.p2[i] == cdm.obj){ item = joint.el[i]; break; } 
		}

		obj = cdm.obj;
	}
	else if(cdm.item !== undefined)	// присылаем номер пункта, который хотим выделить 
	{
		item = joint.el[cdm.item];
		obj = joint.p2[cdm.item];
	}
	else
	{
		return;
	}
	
	
	// выделяем новый пункт на который кликнули UI
	item.css('background-color', '#00ff00');
	var value = item.attr('uuid');


	
	if(joint.active_2)	// снимаем старое выделение объекта в сцене 
	{
		joint.active_2.material = joint.material.default;
		joint.active_2 = null;		
	}
	
	//if(!joint.visible) { joint.p1 = [obj]; }
	
	obj.material = joint.material.active;
	obj.visible = true;
	joint.active_2 = obj;
}





// добавляем этаж в список правой панели UI
function addPlaneListUI(cdm)
{
	if(!cdm) return;				
	if(!cdm.plane) return;	
	
	var plane = cdm.plane;
	var n = infProject.scene.substrate.floor.length - 1;

	createTextUI_1({obj: plane, nameId: "rp_plane_2", nameRus: "этаж"+(n+1), uuid: plane.uuid});
	
	showHideSubstrate_1({visible: false});
	
	// снимаем старые выдиления в UI 
	for(var i = 0; i < infProject.tools.plane.el.length; i++)
	{
		infProject.tools.plane.el[i].css('background-color', '#ffffff');
	}	
	
	
	var el = $($('[nameId="rp_plane_2"]')[0].children[$('[nameId="rp_plane_2"]')[0].children.length-1]);
	el.css('background-color', '#00ff00');
	
	
	$('[nameId="input_transparency_substrate"]').val(100);
	$('[nameId="input_rotate_substrate"]').val( 0 );
	$('#upload-img').attr('src', '');
	$('[nameId="rp_height_plane"]').val( 0 );
	
	infProject.scene.substrate.active = plane;
	setStartPositionRulerSubstrate();
	showHideSubstrate_1({visible: true});
	
	renderCamera();
}


// выбираем этаж или диактивируем выбранный этаж
function clickItemFloorUI(cdm)
{
	if(!cdm) cdm = {};
	
	var item = null;
	var plane = null;	
	
	showHideSubstrate_1({visible: false});
	infProject.scene.substrate.active = null;
	
	$('[nameId="input_transparency_substrate"]').val(100);
	$('[nameId="input_rotate_substrate"]').val( 0 );
	$('#upload-img').attr('src', '');
	$('[nameId="rp_height_plane"]').val( 0 );
	
	// снимаем старые выдиления в UI 
	for(var i = 0; i < infProject.tools.plane.el.length; i++)
	{
		infProject.tools.plane.el[i].css('background-color', '#ffffff');
	}	
	
	if(cdm.el)		// кликнули на пункт в меню
	{
		for(var i = 0; i < infProject.tools.plane.el.length; i++)
		{
			if(infProject.tools.plane.el[i][0] == cdm.el[0]){ plane = infProject.tools.plane.o1[i]; break; } 
		}		
		
		item = cdm.el;
	}
	else
	{
		return;
	}
	
	
	var texture = plane.material.map;

	if(texture)
	{ 
		$('#upload-img').attr('src', texture.image.src);
	}	
	
	$('[nameId="input_transparency_substrate"]').val(plane.material.opacity*100);
	
	var rot = Math.abs(Math.round( THREE.Math.radToDeg(plane.rotation.y) ));
	$('[nameId="input_rotate_substrate"]').val( rot );

	$('[nameId="rp_height_plane"]').val( plane.position.y );
	
	// выделяем новый пункт на который кликнули 
	item.css('background-color', '#00ff00');
	var value = item.attr('uuid');	
	
	infProject.scene.substrate.active = plane;
	setStartPositionRulerSubstrate();
	showHideSubstrate_1({visible: true});
}


// удаляем этаж из списка UI
function removePlaneListUI_2(cdm)
{
	var plane = cdm.plane;
		
	
	for(var i = 0; i < infProject.tools.plane.o1.length; i++)
	{
		if(infProject.tools.plane.o1[i] == plane)
		{ 
			var el = infProject.tools.plane.el[i]; 
			
			deleteValueFromArrya({arr : infProject.tools.plane.el, o : el});
			deleteValueFromArrya({arr : infProject.tools.plane.o1, o : plane});
			el.remove();
			
			break; 
		} 
	}	
	
	infProject.scene.substrate.active = null;
}


