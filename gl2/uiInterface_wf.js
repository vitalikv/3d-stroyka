


// при выделении точки, обновляем меню длины трубы UI
function showWF_point_UI(cdm)
{
	var point = cdm.point;
	var tube = point.userData.wf_point.tube;
	
	infProject.elem.rp_obj_name.value = point.userData.wf_point.nameRus;	
	
	upInfoTubeUI({tube: tube, size: true});
	
	// если точка является началом или концом трубы, то показываем кнопку
	if(cdm.butt)
	{
		var show = false;
		
		if(tube.userData.wf_tube.point[0] == point){ show = true; }
		if(tube.userData.wf_tube.point[tube.userData.wf_tube.point.length - 1] == point){ show = true; }
		
		var elem_1 = document.querySelector('[nameId="pr_list_button_for_tube_point1"]');
		var elem_2 = document.querySelector('[nameId="pr_list_button_for_tube_point2"]');
		
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
function showWF_line_UI(cdm)  
{	
	var tube = cdm.tube;
	
	infProject.elem.rp_obj_name.value = tube.userData.wf_tube.nameRus;
	
	var elem = document.querySelector('[nameId="rp_bl_wf_tube"]');
		
	elem.querySelector('[nameId="size_tube_diameter_2"]').value = tube.userData.wf_tube.diameter * 1000;
	

	upInfoTubeUI({tube: tube, size: true, color: true});
}


// обновляем значение трубы во вкладке объект UI
function upInfoTubeUI(cdm)
{
	var tube = cdm.tube;
	
	var el = null;
	var arr = infProject.list.rp_ui.arr;
	
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i].o == tube) { el = arr[i].el; break; }			
	}
	
	if(el)
	{ 
		if(cdm.size)
		{
			el.querySelector('[item="value"]').innerText = tube.userData.wf_tube.length+'м';
		}
		
		if(cdm.color)
		{
			el.querySelector('input[type="color"]').value = '#'+tube.material.color.clone().getHexString();
		}		
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


