


// при выделении точки, обновляем меню длины трубы UI
function showWF_point_UI(point)
{
	var line = point.userData.wf_point.line.o;
	
	var length = 0;
	
	if(line)
	{
		var v = line.geometry.vertices;
		
		for(var i = 0; i < v.length - 1; i++)
		{
			length += v[i].distanceTo(v[i + 1]);
		}		
	}

	$('[nameId="size_tube_dist_4"]').val(Math.round(length * 100)/100);
	
	
	// если точка является началом или концом трубы, то показываем кнопку
	{
		var show = false;
		
		var line = point.userData.wf_point.line.o;
		
		if(line.userData.wf_line.point[0] == point){ show = true; }
		if(line.userData.wf_line.point[line.userData.wf_line.point.length - 1] == point){ show = true; }
		
		var elem_1 = document.querySelector('[nameId="button_active_join_wf_point"]');
		var elem_2 = document.querySelector('[nameId="button_active_align_wf_point"]');
		
		if(show)
		{
			elem_1.style.display = "block";
			elem_2.style.display = "block";
		}
		else
		{
			elem_1.style.display = "none";
			elem_2.style.display = "none";
		}
	}
}


// при выделении трубы, обновляем меню длины трубы UI
function showWF_line_UI(tube)  
{	
	var line = tube.userData.wf_tube.line;
	
	var v = line.geometry.vertices;
	var length = 0;
	
	for(var i = 0; i < v.length - 1; i++)
	{
		length += v[i].distanceTo(v[i + 1]);
	}
	
	$('[nameId="size_tube_diameter_2"]').val(line.userData.wf_line.diameter * 1000);
	$('[nameId="size_tube_dist_4"]').val(Math.round(length * 100)/100);
	
	$('[nameId="color_tube_1_default"]').css('background-color', '#'+line.userData.wf_line.color.clone().getHexString()); 

	 
	activeObjRightPanelUI_1({obj: tube});
}



// вкл/выкл возможность выделение объектов для присоединения точки трубы
function switchAlignWfPoint(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.list.rp_wf_point.align = cdm.active;
	}	
	else
	{
		infProject.list.rp_wf_point.align = !infProject.list.rp_wf_point.align;
	}
	
	// очищаем список и убираем выделения с разъемов
	clearListWfPointUI();
	
	if(infProject.list.rp_wf_point.align)	// вкл
	{				 
		infProject.list.rp_wf_point.tubeP = clickO.last_obj;
		
		$('[nameId="pr_list_button_for_tube_point"]').hide();
		$('[nameId="rp_wrap_align_wf_point"]').show();		
	}		
	else	// выкл
	{		
		infProject.list.rp_wf_point.tubeP = null;
		
		$('[nameId="rp_wrap_align_wf_point"]').hide();
		$('[nameId="pr_list_button_for_tube_point"]').show();			
	}	

		
}



// вкл/выкл возможность выделение объектов для соединения труб
function switchJoinWfPoint(cdm)
{
	if(!cdm) cdm = {};
	
	var elemBlock = document.querySelector('[nameId="pr_list_button_for_tube_point"]');
	var elemList = document.querySelector('[nameId="rp_wrap_join_wf_point"]');	
	
	var active = false;
	
	if(cdm.active !== undefined) 
	{
		active = cdm.active;
	}	
	else
	{
		if(elemList.style.display == "none"){ active = true; }
		else { active = false; }
	}
	
	// очищаем список и убираем выделения с разъемов
	//clearListWfPointUI();		
	
	if(active)	// вкл
	{	
		elemBlock.style.display = 'none';
		elemList.style.display = 'block';
	}		
	else	// выкл
	{		
		elemList.style.display = 'none';
		elemBlock.style.display = 'block';	 	
	}	
		
}



// очищаем список и убираем выделения с разъемов, когда была нажата кнопка выровнить у точки трубы
function clearListWfPointUI(cdm)
{
	// очищаем список и убираем выделения с разъемов
	var arr = infProject.list.rp_wf_point.arr;
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].el.remove();
		arr[i].o.visible = false;
		arr[i].o.material.color = arr[i].o.userData.centerPoint.color.clone();
	}
	
	infProject.list.rp_wf_point.arr = [];
	infProject.list.rp_wf_point.joinO = null;
}


// кликнули на объект в сцене, когда была нажата кнопка выровнить у точки трубы
function showJoinPoint_3(cdm)
{
	if(!cdm.obj) return;
	var obj = cdm.obj;
	
	
	// очищаем список и убираем выделения с разъемов
	clearListWfPointUI();
	
	
	// получаем разъемы, если есть
	var arr = getCenterPointFromObj_1( obj );	
	var nameId = "rp_list_align_wf_point";	
	
	// добваляем разъемы выделенного объекта в список UI
	for(var i = 0; i < arr.length; i++)
	{						
		// добавляем в список 	
		{
			var str = 
			'<div class="flex_1 right_panel_1_1_list_item" uuid="'+arr[i].uuid+'">\
			<div class="right_panel_1_1_list_item_text">'+arr[i].userData.centerPoint.nameRus+'</div>\
			</div>';		
		}			

		var el = $(str).appendTo('[nameId="'+nameId+'"]');					
		
		var n = infProject.list.rp_wf_point.arr.length;
		infProject.list.rp_wf_point.arr[n] = {};
		infProject.list.rp_wf_point.arr[n].el = el;
		infProject.list.rp_wf_point.arr[n].o = arr[i]; 
		
		arr[i].visible = true;
		el.on('mousedown', function(){ clickItemCenterObjUI_3({el: $(this)}) });		
	}	
	
	if(arr.length > 0) 
	{
		clickItemCenterObjUI_3({item: 0}); 
	}	
}




// выбираем центр для объекта к которому хотим присоединиться трубой 
function clickItemCenterObjUI_3(cdm)
{
	var item = null;
	var obj = null;
	
	var arr = infProject.list.rp_wf_point.arr;
	
	if(arr.length == 0) return;	// у объекта нет разъемов
	
	
	// снимаем старые выдиления в UI 
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].el.css('background-color', '#ffffff');
	}
	
	
	if(cdm.el)	// кликнули на пункт в меню
	{
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].el[0] == cdm.el[0]){ obj = arr[i].o; break; } 
		}

		item = cdm.el;
	}
	else if(cdm.obj)	// кликнули на объект в сцене
	{
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].o == cdm.obj){ item = arr[i].el; break; } 
		}

		obj = cdm.obj;
	}
	else if(cdm.item !== undefined)	// присылаем номер пункта, который хотим выделить 
	{
		item = arr[cdm.item].el;
		obj = arr[cdm.item].o;
	}
	else
	{
		return;
	}
	
	
	// выделяем новый пункт на который кликнули UI
	item.css('background-color', '#00ff00');
	var value = item.attr('uuid');


	
	// снимаем старое выделение объекта в сцене 
	var arr = infProject.list.rp_wf_point.arr;
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].o.material.color = arr[i].o.userData.centerPoint.color.clone();
	}
	
	obj.material.color = new THREE.Color(infProject.listColor.active2D);
	
	infProject.list.rp_wf_point.joinO = obj;
}





// вкл/выкл возможность добавить точку на трубу при клике на нее
function switchAddPointOnTube(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.type !== undefined) 
	{
		infProject.settings.active.tube = cdm.type;  
	}	
	else
	{
		if(infProject.settings.active.tube != 'add_point_wf') { infProject.settings.active.tube = 'add_point_wf'; }
		else { infProject.settings.active.tube = null; }
	}
	

   
	var color = (infProject.settings.active.tube == 'add_point_wf') ? "#ff0000" : "#b3b3b3";	
	$('[nameId="butt_add_point_on_tube"]').css({"border-color": color});		
}


