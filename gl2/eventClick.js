$(document).ready(function(){

$('[data-action="top_panel_1"]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
$('[ui_1=""]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
		
$('[data-action="top_panel_1"]').mousedown(function () { clickInterface(); });
$('[data-action="left_panel_1"]').mousedown(function () { clickInterface(); });


// переключаем разделы
$('[nameId="butt_main_menu"]').mousedown(function () { $('[nameId="background_main_menu"]').css({"display":"block"}); });
$('[nameId="reset_scene_1"]').mousedown(function () { resetScene(); $('[nameId="background_main_menu"]').css({"display":"none"}); });
$('[nameId="button_main_menu_reg_1"]').mousedown(function () { changeMainMenuUI({value: 'button_main_menu_reg_1'}); });
$('[nameId="button_load_1"]').mousedown(function () { changeMainMenuUI({value: 'button_load_1'}); });
$('[nameId="button_save_1"]').mousedown(function () { changeMainMenuUI({value: 'button_save_1'}); });
$('[nameId="button_help"]').mousedown(function () { changeMainMenuUI({value: 'button_help'}); });
$('[nameId="button_contact"]').mousedown(function () { changeMainMenuUI({value: 'button_contact'}); });
//$('[nameId="load_pr_1"]').mousedown(function () { loadFile(); $('[nameId="background_main_menu"]').css({"display":"none"}); });
//$('[nameId="save_pr_1"]').mousedown(function () { saveFile(); $('[nameId="background_main_menu"]').css({"display":"none"}); });


$('[nameId="butt_camera_2D"]').mousedown(function() { changeCamera(cameraTop); $(this).hide(); $('[nameId="butt_camera_3D"]').show(); });
$('[nameId="butt_camera_3D"]').mousedown(function() { changeCamera(camera3D); $(this).hide(); $('[nameId="butt_camera_2D"]').show(); });


getSlotMainMenuUI();	


// собираем в массив элементы из main_menu (UI)
function getSlotMainMenuUI()
{
	var q = $('[list_ui="window_main_menu_content"]');
	
	for ( var i = 0; i < q.length; i++ )
	{
		infProject.ui.main_menu[infProject.ui.main_menu.length] = q[i];
	}
}


// переключаем кнопки в главном меню (сохрание/загрузка)
// прячем все, кроме выбранного раздела
function changeMainMenuUI(cdm)
{
	var q = infProject.ui.main_menu;
	
	for ( var i = 0; i < q.length; i++ )
	{
		if(q[i].attributes.wwm_1.value == cdm.value) { $(q[i]).show(); continue; }  		
	
		$(q[i]).hide();		
	}	
}


$('[nameId="button_wrap_catalog"]').mousedown(function () { changeRightMenuUI_1({el: this}); });
$('[nameId="button_wrap_list_obj"]').mousedown(function () { changeRightMenuUI_1({el: this}); });
$('[nameId="button_wrap_object"]').mousedown(function () { changeRightMenuUI_1({el: this}); });
$('[nameId="button_wrap_plan"]').mousedown(function () { changeRightMenuUI_1({el: this}); });

$('[nameId="button_obj_tool_pivot"]').mousedown(function () { changeRightMenuUI_2({el: this}); });
$('[nameId="button_obj_properties"]').mousedown(function () { changeRightMenuUI_2({el: this}); });


 
let colorTube = document.querySelector('[nameId="color_tube_1_default"]');
colorTube.addEventListener('change', function() { changeColorTube({ value: this.value }); });



  
 

$('[nameId="showHideWall_1"]').on('mousedown', function(e) { showHideWallHeight_1(); });



$('[nameId="button_add_plane"]').mousedown(function (e) { createSubstrate(); e.stopPropagation(); }); 
$('[nameId="button_delete_plane"]').mousedown(function () { deleteSubstrate(); }); 




$('[nameId="button_active_join_element"]').mousedown(function () { switchAlignPoint_1({active: true}); }); 
$('[nameId="button_deactive_join_element"]').mousedown(function () { switchAlignPoint_1({active: false}); });

$('[nameId="button_active_add_group"]').mousedown(function () { switchSelectAddObjGroup({active: true}); });
$('[nameId="button_deactive_add_group"]').mousedown(function () { switchSelectAddObjGroup({active: false}); }); 
  
$('[nameId="button_add_group"]').mousedown(function () { addObjToGroup(); });  
$('[nameId="join_element"]').mousedown(function () { alignPointToPoint_1(); });

$('[nameId="button_active_align_wf_point"]').mousedown(function () { switchAlignPoint_1(); }); 
$('[nameId="button_deactive_align_wf_point"]').mousedown(function () { switchAlignPoint_1({active: false}); });
$('[nameId="button_done_align_wf_point"]').mousedown(function () { alignPointToPoint_1(); });

$('[nameId="button_active_join_wf_point"]').mousedown(function () { switchJoinWfPoint(); });
$('[nameId="button_deactive_join_wf_point"]').mousedown(function () { switchJoinWfPoint({active: false}); });
$('[nameId="button1 button_gradient_1"]').mousedown(function () {  }); 


//$('[nameId="butt_add_point_on_tube"]').mousedown(function () { switchAddPointOnTube(); });

var elem = document.querySelector('[nameId="butt_add_point_on_tube"]');
elem.addEventListener('mousedown', function() { switchAddPointOnTube(); });

var elem = document.querySelector('[nameId="copy_tube"]');
elem.addEventListener('mousedown', function() { console.log(99999); });


$('[nameId="box_input_group"]').mousedown(function () { clickCheckboxgroup_1(); });
 	
$('[nameId="select_pivot"]').mousedown(function () { switchPivotGizmo({mode:'pivot'}); });
$('[nameId="select_gizmo"]').mousedown(function () { switchPivotGizmo({mode:'gizmo'}); });

$('[nameId="obj_rotate_reset"]').mousedown(function () { resetRotateObj(); });	
$('[nameId="button_copy_obj"]').mousedown(function () { copyObj(); });
$('[nameId="button_detach_obj_group"]').mousedown(function () { detachObjGroup({obj: clickO.last_obj, active: true}); });
$('[nameId="button_delete_obj"]').mousedown(function () { deleteObjectPop(clickO.last_obj); });


$('[nameId="obj_rotate_X_90"]').mousedown(function () { setRotationGizmo({axis: 'x', angle: 90}); });
$('[nameId="obj_rotate_X_90m"]').mousedown(function () { setRotationGizmo({axis: 'x', angle: -90}); });
$('[nameId="obj_rotate_Y_90"]').mousedown(function () { setRotationGizmo({axis: 'y', angle: 90}); });
$('[nameId="obj_rotate_Y_90m"]').mousedown(function () { setRotationGizmo({axis: 'y', angle: -90}); });
$('[nameId="obj_rotate_Z_90"]').mousedown(function () { setRotationGizmo({axis: 'z', angle: 90}); });
$('[nameId="obj_rotate_Z_90m"]').mousedown(function () { setRotationGizmo({axis: 'z', angle: -90}); });

 

$('[data-action="wall"]').mousedown(function () { clickInterface({button:'point_1'}); });  
$('[data-action="create_wd_2"]').mousedown(function () { clickInterface({button:'create_wd_2'}); });
$('[data-action="create_wd_3"]').mousedown(function () { clickInterface({button:'create_wd_3'}); });
$('[data-action="grid_show_1"]').mousedown(function () { clickInterface({button:'grid_show_1'}); });
$('[data-action="grid_move_1"]').mousedown(function () { clickInterface({button:'grid_move_1'}); });
$('[data-action="grid_link_1"]').mousedown(function () { clickInterface({button:'grid_link_1'}); });
$('[add_lotid]').mousedown(function () { clickInterface({button: 'add_lotid', value: this.attributes.add_lotid.value}); });
$('[data-action="screenshot"]').mousedown(function () { saveAsImage(); return false; }); 				



$('[link_form]').mousedown(function () 
{ 
	createForm({form : 'shape'+$(this).attr("link_form")}); 
	$('[data-action="modal"]').css({"display":"none"}); 
}); 




$('[data-action="deleteObj"]').mousedown(function () { detectDeleteObj(); return false; });
$('[data-action="addPointCenterWall"]').mousedown(function () { addPointCenterWall(); return false; });


$('[nameId="save_list_obj"]').mousedown(function () { saveListTxt(); });



$('input').on('focus keyup change', function () 
{ 
	infProject.activeInput = $(this).data('action');
	if($(this).data('action') == undefined) { infProject.activeInput = $(this).data('input');  }
	if(infProject.activeInput == undefined) { infProject.activeInput = $(this).attr('nameId');  }
	console.log(infProject.activeInput);
	if(infProject.activeInput) { blockKeyCode({block: true}); }
});
$('input').blur(function () 
{ 
	infProject.activeInput = ''; 
	blockKeyCode({block: false});
});	


 


$('[data-action="modal_window"]').mousedown(function (e) { e.stopPropagation(); });		




$('[data-action="modal_1"]').mousedown(function () 
{	 
	$('[data-action="modal_1"]').css({"display":"none"}); 
});

			
$('[data-action="modal_window_close_1"]').mousedown(function () 
{  
	$('[data-action="modal_1"]').css({"display":"none"}); 
});



//----------------- правая панель

$('[nameId="button_show_panel_catalog"]').mousedown(function () { showHideCatalogMenuUI({show: true}); });
$('[nameId="button_catalog_close"]').mousedown(function () { showHideCatalogMenuUI({show: false}); });


// скрываем/показываем правое меню UI
function showHideCatalogMenuUI(cdm)
{
	var show = cdm.show;
	
	var block = $('[nameId="panel_catalog_1"]');
	var button = $('[nameId="button_show_panel_catalog"]');
	
	if(show) { block.show(); button.hide(); }
	else { block.hide(); button.show(); }
}

$('[nameId="rp_show_hide_planeHeight"]').mousedown(function () { showHidePlaneHeight(); });

//  substrate
$('#load_substrate_1').change(readURL);	
$('[nameId="assign_size_substrate"]').mousedown(function () { assignSizeSubstrate(); });


$('[nameId="input_rotate_substrate_45"]').mousedown(function () { setRotateSubstrate({angle: 45}); });
$('[nameId="input_rotate_substrate_90"]').mousedown(function () { setRotateSubstrate({angle: 90}); });


$('[nameId="input_transparency_substrate"]').on("input", function() { setTransparencySubstrate({value: $(this).val()}); }); 


// загрузка img  с компьютера
function readURL(e) 
{
	if (this.files[0]) 
	{		
		if (this.files[0].type == "image/png" || this.files[0].type == "image/jpeg")
		{
			var reader = new FileReader();
			reader.onload = function (e) 
			{
				$('#upload-img').attr('src', e.target.result);						
				
				setImgCompSubstrate({image: e.target.result});					
			}				

			reader.readAsDataURL(this.files[0]);  					
		}				
	}
}	 
//  substrate


$('[nameId="rp_plane_1"]').mousedown(function (e) { clickItemFloorUI(); });

//----------------- правая панель

});





// переключаем вкладки правой панели 
function changeRightMenuUI_1(cdm)
{
	$('[nameId="wrap_catalog"]').hide();
	$('[nameId="wrap_list_obj"]').hide();
	$('[nameId="wrap_object"]').hide();
	$('[nameId="wrap_plan"]').hide();
	
	clickItemFloorUI();		// диактивируем выбранный этаж
	
	var name = '';
	//var name_2 = infProject.ui.right_menu.active;
	
	if(cdm.el) { name = cdm.el.attributes.nameId.value; }
	else if(cdm.name) { name = cdm.name; }
	else if(cdm.current) { name = infProject.ui.right_menu.active; }
	
	
	if(name == "button_wrap_catalog") 
	{
		$('[nameId="wrap_catalog"]').show();
	}
	if(name == "button_wrap_list_obj") 
	{
		$('[nameId="wrap_list_obj"]').show();
	}
	if(name == "button_wrap_object") 
	{
		$('[nameId="wrap_object"]').show(); 
	}
	if(name == "button_wrap_plan") 
	{
		$('[nameId="wrap_plan"]').show();
		if(camera == cameraTop) 
		{ 
			deActiveSelected();
		}
	}

	infProject.ui.right_menu.active = name;
}




// переключаем вкладку для объекта перемещение/параметры 
function changeRightMenuUI_2(cdm)
{
	$('[nameId="rp_bl_obj_tool_pivot"]').hide();
	$('[nameId="rp_bl_obj_properties"]').hide();
	
	var name = '';
	
	if(cdm.el) { name = cdm.el.attributes.nameId.value; }
	else if(cdm.name) { name = cdm.name; }
	else if(cdm.current) { name = infProject.ui.right_menu.active; }
	
	
	if(name == "button_obj_tool_pivot") 
	{
		$('[nameId="rp_bl_obj_tool_pivot"]').show();
	}
	if(name == "button_obj_properties") 
	{
		$('[nameId="rp_bl_obj_properties"]').show();
	}
	
	switchAlignPoint_1({active: false});
	activeObjRightPanelUI_1({obj: clickO.last_obj});
}











