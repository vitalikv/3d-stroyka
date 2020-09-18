

// добавляем при старте в список планов +
function startPlanElemPlus(cdm)
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


// добавляем этаж в список правой панели UI
function addPlaneListUI(cdm)
{
	if(!cdm) return;				
	if(!cdm.plane) return;	
	
	var plane = cdm.plane;
	var n = infProject.scene.substrate.floor.length - 1;
	
	{
		var str = 
		'<div class="right_panel_1_1_list_item" uuid="'+plane.uuid+'">\
			<div class="flex_1">\
				<div class="right_panel_1_1_list_item_text" nameId="rp_floor_txt_name">'+plane.userData.substrate.nameRus+'</div>\
				<div class="image_wrap" nameId="butt_img_substrate_1" style="position: absolute; width: 35px; height: 20px; right: 30px;">\
					<img src="'+infProject.path+'img/f4.png">\
				</div>\
			</div>\
		</div>';		
		
		var el = $(str).appendTo('[nameId="rp_plane_2"]');
		
		var n = infProject.tools.plane.o1.length;	
		infProject.tools.plane.o1[n] = plane;
		infProject.tools.plane.el[n] = el;
		
		el.on('mousedown', function(e){ clickItemFloorUI({el: $(this), type: "general"}); e.stopPropagation(); });
		
		//var el_2 = $(el[0].children[0].children[1]);
		var el_2 = $(el[0].querySelector('[nameId="butt_img_substrate_1"]'));
		el_2.on('mousedown', function(e){ clickItemFloorUI({el: el, type: "img"}); e.stopPropagation(); });		
	}	
	
	
	clickItemFloorUI({el: el, type: "general"});
	
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
	
	$('[nameId="block_substrate_wrap"]').hide();
	$('[nameId="block_substrate_1"]').hide();
	$('[nameId="block_substrate_2"]').hide();
	
	$('[nameId="input_transparency_substrate"]').val(100);
	$('[nameId="input_rotate_substrate"]').val( 0 );
	$('#upload-img').attr('src', infProject.path+'img/f0.png');
	$('[nameId="rp_height_plane"]').val( 0 );
	$('[nameId="rp_floor_name"]').val('Название');	
	
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

	$('[nameId="rp_height_plane"]').val( Math.round(plane.position.y*100)/100 );  
	
	// выделяем новый пункт на который кликнули 
	item.css('background-color', '#00ff00');
	var value = item.attr('uuid');	
	
	$('[nameId="rp_floor_name"]').val(plane.userData.substrate.nameRus);
	
	infProject.scene.substrate.active = plane;
	setStartPositionRulerSubstrate();
	
	
	if(cdm.type == "general") { $('[nameId="block_substrate_1"]').show(); showHideSubstrate_1({point: true, ruler: false}); }
	if(cdm.type == "img") { $('[nameId="block_substrate_2"]').show(); showHideSubstrate_1({point: true, ruler: true}); }
	$('[nameId="block_substrate_wrap"]').show();
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






