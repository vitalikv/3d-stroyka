


// кликнули на obj, wd (показываем нужное меню и заполняем input)
function activeObjRightPanelUI_1(cdm) 
{	
	$('[nameId="wrap_object_1"]').hide();	
	
	$('[nameId="bl_object_3d"]').hide();
	$('[nameId="rp_bl_wf_tube"]').hide();
	$('[nameId="rp_bl_wf_point"]').hide();
	
	if(!cdm) { cdm = {}; }  
	
	var obj = cdm.obj;
	
	if(!obj) return;
	
	if(obj.userData.tag == 'wf_point')
	{
		showWF_point_UI( obj );
		$('[nameId="rp_obj_name"]').val('точка');
		$('[nameId="rp_bl_wf_point"]').show();
	}	
	else if(obj.userData.tag == 'wf_tube')
	{	
		$('[nameId="rp_obj_name"]').val('труба');
		$('[nameId="rp_bl_wf_tube"]').show();
	}			
	else if(obj.userData.tag == 'obj')
	{		    
		$('[nameId="bl_object_3d"]').show();
	}
	
	$('[nameId="wrap_object_1"]').show(); 	
	
}





// создаем текст для списка
function createTextUI_1(cdm)
{
	var obj = cdm.obj;
	var nameId = cdm.nameId;
	var uuid = cdm.uuid;
	var nameRus = cdm.nameRus;
	
	// добавляем в список 	
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
	
}






// кликнули объект в сцене, создаем/показываем список группы (дочерних объектов) (правом меню UI)
function clickObjUI(cdm)
{
	if(!cdm) { cdm = {}; }	
	if(!cdm.obj) return;
	
	var obj = cdm.obj;
	var inf = null;
	
	if(obj.userData.obj3D) { var obj = cdm.obj; }
	else if(obj.userData.centerPoint) { var obj = cdm.obj.parent; }
	else { return; }


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
	
	
	var flag = true;	// если другая группа или объект, тогда очищаем список и создаем новый
	
	if(infProject.list.rp_ui.arr.length == arrO.length)
	{
		var arrO_2 = infProject.list.rp_ui.arr;
		var num = 0;
		
		for(var i = 0; i < arrO.length; i++)
		{
			for(var i2 = 0; i2 < arrO_2.length; i2++)
			{
				if(arrO[i] == arrO_2[i2].o) { num++; break; }
			}			
		}
		
		if(arrO.length == num) { flag = false; }
	}
	
	
	if(flag)
	{
		// очищаем список объектов UI
		clearItemSelectedObjUI();	
		
		
		for(var i = 0; i < arrO.length; i++)
		{
			var num = infProject.list.rp_ui.arr.length;
			infProject.list.rp_ui.arr[num] = { o: arrO[i], el: el, p: [], p_vis: false };
			
			// получаем разъемы объекта
			var o = getCenterPointFromObj_1(arrO[i]);

			var str_button = '';
			
			if(o.length > 0)
			{
				str_button = 
				'<div nameId="shCp_1" style="width: 40px; height: 20px;">\
					<div style="position: absolute; width: 15px; height: 10px; right: 20px;">\
						<svg height="100%" width="100%" viewBox="0 0 100 100">\
							<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
						</svg>\
					</div>\
				</div>';			
			}
			
			var str = 
			'<div class="flex_1 right_panel_1_1_list_item relative_1">\
			<div class="right_panel_1_1_list_item_text" nameId="nameItem">'+arrO[i].userData.obj3D.nameRus+'</div>\
				'+str_button+'\
			</div>';

			var str = 
			'<div class="right_panel_1_1_list_item" style="top:0px; left:0px;">\
				<div class="flex_1 relative_1" style="margin: auto;">\
					<div class="right_panel_1_1_list_item_text" nameid="nameItem">'+arrO[i].userData.obj3D.nameRus+'</div>\
					'+str_button+'\
				</div>\
				<div nameId="groupItem" style="display: none;">\
				</div>\
			</div>';			
			
			var el = $(str).appendTo('[nameId="rp_obj_group"]');		
			el.on('mousedown', function(e){ clickItemObjNameUI({el: $(this)}); e.stopPropagation(); });
			
			
			// назначаем кнопки треугольник событие
			var el_2 = $(el[0].querySelector('[nameId="shCp_1"]'));
			var container = el[0].querySelector('[nameid="groupItem"]');
			(function(num) 
			{
				el_2.on('mousedown', function(e){ clickRtekUI_1({elem_2: container}); e.stopPropagation(); });	
			}(num));	
					
			infProject.list.rp_ui.arr[num].el = el;
			
			
			
			// есть разъемы
			for(var i2 = 0; i2 < o.length; i2++)
			{				
				if(!o[i2].userData.centerPoint) continue;			
				
				var str = 
				'<div class="flex_1 right_panel_1_1_list_item relative_1">\
				<div class="right_panel_1_1_list_item_text" nameId="nameItem">'+o[i2].userData.centerPoint.nameRus+'</div>\
				</div>';				

				var el2 = $(str).appendTo(container);				
				
				infProject.list.rp_ui.arr[num].p[infProject.list.rp_ui.arr[num].p.length] = { o: o[i2], el: el2 };
				
				el2.on('mousedown', function(e){ clickItemObjNameUI({el: $(this)}); e.stopPropagation(); });			
			}				
			
		}
		
	}
	
	// выделяем в меню
	clickItemObjNameUI({obj: cdm.obj});		
}


// кликнули на треугольник в меню объекты (показываем/скрываем разъемы этого объекта)
function clickRtekUI_1(cdm)
{
	console.log(cdm, cdm.elem_2.style.display);
	
	var display = cdm.elem_2.style.display;
	
	var display = (display == 'none') ? 'block' : 'none';
	
	cdm.elem_2.style.display = display;
	
	var parentEl = cdm.elem_2.parentElement;	

	if(display == 'block') { parentEl.style.backgroundColor = '#ebebeb'; }
	else { parentEl.style.backgroundColor = '#ffffff'; }	
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






// выбираем группу или объект
function clickItemObjNameUI(cdm)
{
	var item = null;
	var obj = null;
	var list = infProject.list.rp_ui.arr;
	
	// снимаем старые выдиления
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
	
	if(cdm.button)
	{
		var obj = getObjFromPivotGizmo();
		if(obj) cdm.obj = obj; 
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
		
		var parent = obj.parent;
		
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].o == parent){ list[i].el.css('background-color', '#00ff00'); break; } 					
		}		
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
		joint.active_2.material.color = joint.active_2.userData.centerPoint.color.clone();
		joint.active_2 = null;		
	}
	
	//if(!joint.visible) { joint.p1 = [obj]; }
	
	obj.material.color = joint.material.active.color.clone();
	obj.visible = true;
	joint.active_2 = obj;
	
	setClickLastObj({obj: infProject.tools.joint.active_1});
}






