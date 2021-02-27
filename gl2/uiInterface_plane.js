

// добавляем при старте в список планов +
function startPlanElemPlus(cdm)
{
	var nameId = "rp_plane_3";
	
	// добавляем в список 	
	var html = 
	'<div class="flex_1 right_panel_1_1_list_item" nameId="button_add_plane">\
	<div class="right_panel_1_1_list_item_text"> + </div>\
	</div>';	
	
	
	var div = document.createElement('div');
	div.innerHTML = html;
	var elem = div.firstChild;	
	
	var container = document.querySelector('[nameId="rp_plane_3"]');
	container.append(elem);	

	elem.onmousedown = function(e){ createSubstrate(); e.stopPropagation(); };
}


// добавляем этаж в список правой панели UI
function addPlaneListUI(cdm)
{
	if(!cdm) return;				
	if(!cdm.plane) return;	
	
	var plane = cdm.plane;
	var n = infProject.scene.substrate.floor.length - 1;
	
	var html = 
	'<div class="right_panel_1_1_list_item" uuid="'+plane.uuid+'">\
		<div class="flex_1">\
			<div class="right_panel_1_1_list_item_text" nameId="rp_floor_txt_name">'+plane.userData.substrate.nameRus+'</div>\
			<div class="image_wrap" nameId="butt_img_substrate_1" style="position: absolute; width: 35px; height: 20px; right: 30px;">\
				<img src="'+infProject.path+'img/f4.png">\
			</div>\
		</div>\
	</div>';

	var div = document.createElement('div');
	div.innerHTML = html;
	var elem = div.firstChild;		
	
	var container = document.querySelector('[nameId="rp_plane_2"]');
	container.append(elem);
	
	var n = infProject.tools.plane.o1.length;	
	infProject.tools.plane.o1[n] = plane;
	infProject.tools.plane.el[n] = elem;
	

	elem.onmousedown = function(e){ clickItemFloorUI({el: elem, type: "general"}); e.stopPropagation(); };

	var el_2 = elem.querySelector('[nameId="butt_img_substrate_1"]');		
	el_2.onmousedown = function(e){ clickItemFloorUI({el: elem, type: "img"}); e.stopPropagation(); };
	
	clickItemFloorUI({el: elem, type: "general"});
	
	renderCamera();
}


// выбираем этаж или диактивируем выбранный этаж
function clickItemFloorUI(cdm)
{
	if(!cdm) cdm = {};
	
	var item = null;
	var plane = null;	
	
	showHideSubstrate_1({point: false, ruler: false});
	infProject.scene.substrate.active = null;

	var el_wrap = document.querySelector('[nameId="block_substrate_wrap"]');
	var el_b1 = document.querySelector('[nameId="block_substrate_1"]');
	var el_b2 = document.querySelector('[nameId="block_substrate_2"]');
	var slider = document.querySelector('[nameId="input_transparency_substrate"]');
	var input_rotate = document.querySelector('[nameId="input_rotate_substrate"]');
	var input_height = document.querySelector('[nameId="rp_height_plane"]');
	var input_floor_name = document.querySelector('[nameId="rp_floor_name"]');
	var src_floor = document.querySelector('[nameId="rp_floor_img"]');
	
	el_wrap.style.display = 'none';
	el_b1.style.display = 'none';
	el_b2.style.display = 'none';


	// сбрасываем нстройки по default 
	slider.value = 100;
	input_rotate.value = 0;
	input_height.value = 0;
	input_floor_name.value = 'Название';
	src_floor.setAttribute('src', infProject.path+'img/f0.png');
	
	// снимаем старые выдиления в UI 
	for(var i = 0; i < infProject.tools.plane.el.length; i++)
	{
		infProject.tools.plane.el[i].style.backgroundColor = '#ffffff';
	}	
	
	if(cdm.el)		// кликнули на пункт в меню
	{
		for(var i = 0; i < infProject.tools.plane.el.length; i++)
		{
			if(infProject.tools.plane.el[i] == cdm.el){ plane = infProject.tools.plane.o1[i]; break; } 
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
		src_floor.setAttribute('src', texture.image.src);
	}	
	
	slider.value = plane.material.opacity * 100;	
	input_rotate.value = Math.abs(Math.round( THREE.Math.radToDeg(plane.rotation.y) ));
	input_height.value = Math.round(plane.position.y*100)/100;
	input_floor_name.value = plane.userData.substrate.nameRus;
	
	// выделяем новый пункт на который кликнули 
	item.style.backgroundColor = infProject.listColor.activeItem_1;
		
	
	infProject.scene.substrate.active = plane;
	setStartPositionRulerSubstrate();
	
	
	if(cdm.type == "general") { el_b1.style.display = ''; showHideSubstrate_1({point: true, ruler: false}); }
	if(cdm.type == "img") { el_b2.style.display = ''; showHideSubstrate_1({point: true, ruler: true}); }
	
	el_wrap.style.display = '';
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
	
	clickItemFloorUI();
}






