


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
	
	if(infProject.list.rp_wf_point.align)
	{		
		$('[nameId="rp_wrap_align_wf_point"]').show(); 
		infProject.list.rp_wf_point.tubeP = clickO.last_obj;
	}		
	else
	{		
		$('[nameId="rp_wrap_align_wf_point"]').hide();
		infProject.list.rp_wf_point.tubeP = null;
	}	
   
	var color = (infProject.list.rp_wf_point.align) ? "#ff0000" : "#b3b3b3";	
	$('[nameId="button_active_align_wf_point"]').css({"border-color": color});

		
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
		arr[i].o.material.color = arr[i].o.userData.centerPoint.color;
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
		arr[i].o.material.color = arr[i].o.userData.centerPoint.color;
	}
	
	obj.material.color = new THREE.Color(infProject.listColor.active2D);
	
	infProject.list.rp_wf_point.joinO = obj;
}



