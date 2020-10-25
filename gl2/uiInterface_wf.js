


// при выделении точки, обновляем меню длины трубы UI
function showWF_point_UI(point)
{
	var tube = point.userData.wf_point.tube;
	
	infProject.elem.rp_obj_name.value = 'точка';
	
	var elem = document.querySelector('[nameId="rp_bl_wf_point"]');
	elem.querySelector('[nameId="size_tube_dist_4"]').value = tube.userData.wf_tube.length;	
	
	
	// если точка является началом или концом трубы, то показываем кнопку
	{
		var show = false;
		
		if(tube.userData.wf_tube.point[0] == point){ show = true; }
		if(tube.userData.wf_tube.point[tube.userData.wf_tube.point.length - 1] == point){ show = true; }
		
		var elem_1 = document.querySelector('[nameId="button_active_join_wf_point"]');
		var elem_2 = document.querySelector('[nameId="button_active_align_wf_point"]');
		
		if(show)
		{
			//elem_1.style.display = "block";
			elem_2.style.display = "block";
		}
		else
		{
			//elem_1.style.display = "none";
			elem_2.style.display = "none";
		}
	}
}


// при выделении трубы, обновляем меню длины трубы UI
function showWF_line_UI(cdm)  
{	
	var tube = cdm.tube;
	
	infProject.elem.rp_obj_name.value = tube.userData.wf_tube.nameRus;
	
	var elem = document.querySelector('[nameId="rp_bl_wf_tube"]');
	
	elem.querySelector('[nameId="color_tube_1_default"]').value = '#'+tube.material.color.clone().getHexString();	
	elem.querySelector('[nameId="size_tube_diameter_2"]').value = tube.userData.wf_tube.diameter * 1000;
	elem.querySelector('[nameId="size_tube_dist_4"]').value = tube.userData.wf_tube.length;	
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
		if(infProject.settings.active.tube != 'add_point_wf') 
		{ 
			infProject.settings.active.tube = 'add_point_wf';
			infProject.tools.pivot.visible = false;
		}
		else 
		{ 
			infProject.settings.active.tube = null;
			infProject.tools.pivot.visible = true;
		}
	}
	

	if(infProject.settings.active.tube == 'add_point_wf')	// вкл режим добавления точки на трубу
	{
		var color = "#ff0000";		
	}
	else
	{
		var color = "#b3b3b3";		
	}
		
	document.querySelector('[nameId="butt_add_point_on_tube"]').style.borderColor = color;
	
	renderCamera();
}


