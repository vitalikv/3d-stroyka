$(document).ready(function()
{
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

});




//----------------- блокируем действия ->

var elemStop = document.querySelectorAll('[ui_1=""]');

elemStop.forEach(function(el) 
{
	el.addEventListener('mousedown', function(e) { e.stopPropagation(); });
	el.addEventListener('mousemove', function(e) { e.stopPropagation(); });
	el.addEventListener('mouseup', function(e) { e.stopPropagation(); });
});

var elemStop = document.querySelectorAll('[data-action="top_panel_1"]');

elemStop.forEach(function(el) 
{
	el.addEventListener('mousedown', function(e) { e.stopPropagation(); });
	el.addEventListener('mousemove', function(e) { e.stopPropagation(); });
	el.addEventListener('mouseup', function(e) { e.stopPropagation(); });
});

//----------------- блокируем действия <-





//----------------- верхняя панель ->

infProject.elem.screenshot = document.querySelector('[nameId="screenshot"]');
infProject.elem.butt_camera_2D = document.querySelector('[nameId="butt_camera_2D"]');
infProject.elem.butt_camera_3D = document.querySelector('[nameId="butt_camera_3D"]');
infProject.elem.butt_close_cameraView = document.querySelector('[nameId="butt_close_cameraView"]');

infProject.elem.screenshot.onmousedown = function(e){ saveAsImage(); e.stopPropagation(); };
infProject.elem.butt_camera_2D.onmousedown = function(e){ changeCamera(cameraTop); }
infProject.elem.butt_camera_3D.onmousedown = function(e){ changeCamera(camera3D); }
infProject.elem.butt_close_cameraView.onmousedown = function(e){ deActiveCameraView(); }


//----------------- верхняя панель <-






//----------------- substrate ->


document.querySelector('#load_substrate_1').addEventListener( 'change', readURL, false );
document.querySelector('[nameId="assign_size_substrate"]').onmousedown = function(){ assignSizeSubstrate(); }

document.querySelector('[nameId="input_rotate_substrate_45"]').onmousedown = function () { setRotateSubstrate({angle: 45}); }
document.querySelector('[nameId="input_rotate_substrate_90"]').onmousedown = function () { setRotateSubstrate({angle: 90}); }

document.querySelector('[nameId="input_transparency_substrate"]').oninput = function () { setTransparencySubstrate({value: this.value}); }

document.querySelector('[nameId="button_delete_plane"]').onmousedown = function () { deleteSubstrate(); }



 
//----------------- substrate <-




//----------------- правая панель ->








infProject.elem.dv_right_panel_1 = document.querySelector('[nameId="dv_right_panel_1"]');
infProject.elem.button_catalog_close = document.querySelector('[nameId="button_catalog_close"]');
infProject.elem.button_show_panel_catalog = document.querySelector('[nameId="button_show_panel_catalog"]');
infProject.elem.resize_el = document.querySelector('[nameId="right_panel_resize_1"]');



// кнопки вкладок
infProject.elem.button_wrap_catalog = document.querySelector('[nameId="button_wrap_catalog"]');
infProject.elem.button_wrap_list_obj = document.querySelector('[nameId="button_wrap_list_obj"]');
infProject.elem.button_wrap_object = document.querySelector('[nameId="button_wrap_object"]');
infProject.elem.button_wrap_plan = document.querySelector('[nameId="button_wrap_plan"]');

// вкладки
infProject.elem.wrap_catalog = document.querySelector('[nameId="wrap_catalog"]');
infProject.elem.wrap_list_obj = document.querySelector('[nameId="wrap_list_obj"]');
infProject.elem.wrap_object = document.querySelector('[nameId="wrap_object"]');
infProject.elem.wrap_plan = document.querySelector('[nameId="wrap_plan"]');








infProject.elem.button_wrap_catalog.onmousedown = function(e){ changeRightMenuUI_1({el: this}); };
infProject.elem.button_wrap_list_obj.onmousedown = function(e){ changeRightMenuUI_1({el: this}); };
infProject.elem.button_wrap_object.onmousedown = function(e){ changeRightMenuUI_1({el: this}); };
infProject.elem.button_wrap_plan.onmousedown = function(e){ changeRightMenuUI_1({el: this}); };



infProject.elem.button_show_panel_catalog.onmousedown = function(e){ showHideCatalogMenuUI({show: true}); e.stopPropagation(); };
infProject.elem.button_catalog_close.onmousedown = function(e){ showHideCatalogMenuUI({show: false}); e.stopPropagation(); };




// скрываем/показываем правое меню UI
function showHideCatalogMenuUI(cdm)
{
	var show = cdm.show;
	
	if(show) { infProject.elem.dv_right_panel_1.style.display = ''; infProject.elem.button_show_panel_catalog.style.display = 'none'; }
	else { infProject.elem.dv_right_panel_1.style.display = 'none'; infProject.elem.button_show_panel_catalog.style.display = 'block'; }
}

// меняем размер ширины правой панели
infProject.elem.resize_el.addEventListener("mousedown", function(e)
{
    infProject.elem.resize_el.m_pos = e.x;
	document.addEventListener("mousemove", resizeRightPanel, false);
	e.stopPropagation();
}, false);

document.addEventListener("mouseup", function(e)
{
	document.removeEventListener("mousemove", resizeRightPanel, false);
	e.stopPropagation();
}, false);


function resizeRightPanel(e)
{
    var parent = infProject.elem.dv_right_panel_1;
	var dx = infProject.elem.resize_el.m_pos - e.x;
	
	infProject.elem.resize_el.m_pos = e.x;

	var width = (parseInt(getComputedStyle(parent, '').width) + dx);
	if(width < 240) width = 240;
	if(width > 1000) width = 1000;

    parent.style.width = width + "px";
}


// переключаем вкладки правой панели 
function changeRightMenuUI_1(cdm)
{
	infProject.elem.wrap_catalog.style.display = 'none';
	infProject.elem.wrap_list_obj.style.display = 'none';
	infProject.elem.wrap_object.style.display = 'none';
	infProject.elem.wrap_plan.style.display = 'none';
	
	clickItemFloorUI();		// диактивируем выбранный этаж
	
	var name = '';
	//var name_2 = infProject.ui.right_menu.active;
	
	if(cdm.el) { name = cdm.el.attributes.nameId.value; }
	else if(cdm.name) { name = cdm.name; }
	else if(cdm.current) { name = infProject.ui.right_menu.active; }
	
	
	if(name == "button_wrap_catalog") 
	{
		infProject.elem.wrap_catalog.style.display = '';
	}
	if(name == "button_wrap_list_obj") 
	{
		infProject.elem.wrap_list_obj.style.display = '';
	}
	if(name == "button_wrap_object") 
	{
		infProject.elem.wrap_object.style.display = ''; 
	}
	if(name == "button_wrap_plan") 
	{
		infProject.elem.wrap_plan.style.display = '';
		if(camera == cameraTop) 
		{ 
			deActiveSelected();
		}
	}

	infProject.ui.right_menu.active = name;
}


document.querySelector('[nameId="rp_plane_1"]').onmousedown = function(e){ clickItemFloorUI(); };







// раздел каталог, нижняя кнопка показывает/скрывает сетку
document.querySelector('[nameId="rp_show_hide_planeHeight"]').onmousedown = function(){ showHidePlaneHeight(); }


//----------------- правая панель <-











