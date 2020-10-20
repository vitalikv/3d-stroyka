


// кликнули на obj, wd (показываем нужное меню и заполняем input или скрываем меню)
function activeObjRightPanelUI_1(cdm) 
{	
	$('[nameId="wrap_object_1"]').hide();	
	
	$('[nameId="bl_object_3d"]').hide();
	$('[nameId="rp_bl_wf_tube"]').hide();
	$('[nameId="rp_bl_wf_point"]').hide();
	$('[nameId="block_gizmo"]').hide();
	
	if(!cdm) { cdm = {}; }  
	
	var obj = cdm.obj;
	
	if(!obj) return;
	
	if(obj.userData.tag == 'wf_point')
	{
		$('[nameId="rp_bl_wf_point"]').show();
	}	
	else if(obj.userData.tag == 'wf_tube')
	{	 
		$('[nameId="rp_bl_wf_tube"]').show();		
	}			
	else if(obj.userData.tag == 'obj')
	{		     
		$('[nameId="bl_object_3d"]').show();
		$('[nameId="pr_list_button_center_point"]').hide();
		$('[nameId="pr_list_button_for_obj"]').show();
		$('[nameId="block_gizmo"]').show();
		
		if( isCheckExsistFunction(window['getInfObjFromBD']) ) { getInfObjFromBD({obj: obj}); }; 		
	}
	else if(obj.userData.tag == 'joinPoint')
	{ 
		$('[nameId="bl_object_3d"]').show();
		$('[nameId="pr_list_button_for_obj"]').hide();
		$('[nameId="pr_list_button_center_point"]').show();
		$('[nameId="block_gizmo"]').show();
	}
	else
	{
		return;
	}
	
	$('[nameId="wrap_object_1"]').show(); 	
	
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
		
		let container = document.body.querySelector('[nameId="rp_obj_group"]');
		
		for(var i = 0; i < arrO.length; i++)
		{
			var num = infProject.list.rp_ui.arr.length;
			infProject.list.rp_ui.arr[num] = { o: arrO[i], el: null, p: [], p_vis: false };
			
			// получаем разъемы объекта
			var o = getCenterPointFromObj_1(arrO[i]);

			var str_button = '';
			
			if(o.length > 0)
			{
				str_button = 
				'<div nameId="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
					<div>\
						<svg height="100%" width="100%" viewBox="0 0 100 100">\
							<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
						</svg>\
					</div>\
				</div>';			
			}
			
			var button_2 = 
			'<div nameId="sh_select_obj3D" style="margin-right: 5px; width: 10px; height: 20px;">\
				<div>\
					<svg height="100%" width="100%" viewBox="0 0 100 100">\
						<circle cx="50%" cy="50%" r="40" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
					</svg>\
				</div>\
			</div>';			

			var html = 
			'<div class="right_panel_1_1_list_item">\
				<div class="flex_1 relative_1" style="margin: auto;">\
					'+str_button+'\
					<div class="right_panel_1_1_list_item_text" nameid="nameItem">'+arrO[i].userData.obj3D.nameRus+'</div>\
					'+button_2+'\
				</div>\
				<div nameId="groupItem" style="display: none;">\
				</div>\
			</div>';			
			
					
			var div = document.createElement('div');
			div.innerHTML = html;
			let elem = div.firstChild;
			
			infProject.list.rp_ui.arr[num].el = elem;
			
			container.append(elem);
			(function() 
			{  
				elem.onmousedown = function(e){ clickItemObjNameUI({el: this, clickItem: true}); e.stopPropagation(); };	
			}());
			
			
			
			// назначаем кнопки треугольник событие
			{
				let id = arrO[i].userData.id; 
				let el_2 = elem.querySelector('[nameId="shCp_1"]');
				var container_2 = elem.querySelector('[nameid="groupItem"]');

				(function(container_2, id) 
				{
					el_2.onmousedown = function(e){ clickRtekUI_1({elem_2: container_2, id: id}); e.stopPropagation(); };	
				}(container_2, id));											
			}
			
			// назначаем событие при клике на кружок UI
			var elem_2 = elem.querySelector('[nameId="sh_select_obj3D"]');
			var obj = arrO[i];
			(function(obj) 
			{
				elem_2.onmousedown = function(e)
				{ 			
					fitCameraToObject({obj: obj, rot: true});
					e.stopPropagation();
				};	
			}(obj));				
			
			
			// разъемы
			for(var i2 = 0; i2 < o.length; i2++)
			{				
				if(!o[i2].userData.centerPoint) continue;			
				
				var html = 
				'<div class="flex_1 right_panel_1_1_list_item relative_1">\
				<div class="right_panel_1_1_list_item_text" nameId="nameItem">'+o[i2].userData.centerPoint.nameRus+'</div>\
				</div>';				

				var div = document.createElement('div');
				div.innerHTML = html;
				let el_3 = div.firstChild;

				infProject.list.rp_ui.arr[num].p[infProject.list.rp_ui.arr[num].p.length] = { o: o[i2], el: el_3 };
				
				container_2.append(el_3);
				el_3.onmousedown = function(e){ clickItemObjNameUI({el: this, clickItem: true}); e.stopPropagation(); };
			}				
			
		}
		
	}
	
	// выделяем в меню
	clickItemObjNameUI({obj: cdm.obj});		
}


// кликнули на треугольник в меню объекты (показываем/скрываем разъемы этого объекта)
function clickRtekUI_1(cdm)
{
	var display = cdm.elem_2.style.display;
	
	var display = (display == 'none') ? 'block' : 'none';
	
	cdm.elem_2.style.display = display;
	
	var parentEl = cdm.elem_2.parentElement;	

	if(display == 'block') 
	{ 
		var flag = false;
		if(clickO.last_obj)
		{
			if(clickO.last_obj.userData.id == cdm.id) { flag = true; }
		}
		
		if(flag) 
		{
			parentEl.style.backgroundColor = infProject.listColor.activeItem_1;
		}
		else
		{
			parentEl.style.backgroundColor = '#ebebeb';
		}		
	}
	else 
	{ 
		var flag = false;
		if(clickO.last_obj)
		{
			if(clickO.last_obj.userData.id == cdm.id) { flag = true; }
		}
		
		if(flag) 
		{
			parentEl.style.backgroundColor = infProject.listColor.activeItem_1;
		}
		else
		{
			parentEl.style.backgroundColor = '#ffffff';
		}
	}	
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
	
	console.log(cdm);
	
	// снимаем старые выдиления
	{		
		for(var i = 0; i < list.length; i++)
		{
			list[i].el.style.backgroundColor = '#ffffff';
			
			for(var i2 = 0; i2 < list[i].p.length; i2++)
			{
				list[i].p[i2].el.style.backgroundColor = '#ffffff';
				list[i].p[i2].o.material = infProject.material.pointObj.default;
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
			if(list[i].el == cdm.el){ obj = list[i].o; break; } 
			
			for(var i2 = 0; i2 < list[i].p.length; i2++)
			{
				if(list[i].p[i2].el == cdm.el){ obj = list[i].p[i2].o; break; }
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


	// кликнули не в сцену на объект, а на пункт в меню (скрываем разъемы старого объекта)
	if(cdm.clickItem)
	{
		deClickObj({obj: clickO.last_obj, moment: ''});
	}
	
	  
	// делаем цвет всех объектов группы по default и сварачиваем открытые вложения 
	if(infProject.settings.active.group) 	
	{ 
		for(var i = 0; i < list.length; i++)
		{
			list[i].el.style.backgroundColor = '#ffffff';
			
			var el_1 = list[i].el.querySelector('[nameId="groupItem"]');
			
			if(el_1)
			{
				el_1.style.display = 'none';
			}
		}
	}

	// меняем цвет у выделеной вкладки
	item.style.backgroundColor = infProject.listColor.activeItem_1;
	

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
			if(list[i].o == parent)
			{ 
				list[i].el.style.backgroundColor = '#ebebeb';
				
				var el_1 = list[i].el.querySelector('[nameId="groupItem"]');
				
				if(el_1)
				{
					el_1.style.display = 'block';
				}
				
				break; 
			} 					
		}		
	}
	
	if(!cdm.obj) 
	{
		clickObject3D(obj, {outline: true});		
	} 

	showHideJP();
	renderCamera();
}




// переименовываем название во вкладке "объект"
function upItemObjNameUI(cdm)
{
	var obj = cdm.obj;
	
	var arr1 = infProject.list.rp_ui.arr;
	var arr2 = [];
	
	for(var i = 0; i < arr1.length; i++)
	{
		arr2[arr2.length] = {o: arr1[i].o, el: arr1[i].el};
		
		for(var i2 = 0; i2 < arr1[i].p.length; i2++)
		{
			arr2[arr2.length] = {o: arr1[i].p[i2].o, el: arr1[i].p[i2].el};
		}
	}
	
	
	for(var i = 0; i < arr2.length; i++)
	{
		if(arr2[i].o == obj)
		{
			var nameItem = arr2[i].el.querySelector('[nameId="nameItem"]');
			nameItem.innerText = obj.userData.obj3D.nameRus;  
			break;
		}
	}		
}




