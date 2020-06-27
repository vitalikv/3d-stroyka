


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
		if(infProject.settings.active.tube != 'add_point_wf') { infProject.settings.active.tube = 'add_point_wf'; }
		else { infProject.settings.active.tube = null; }
	}
	

   
	var color = (infProject.settings.active.tube == 'add_point_wf') ? "#ff0000" : "#b3b3b3";	
	$('[nameId="butt_add_point_on_tube"]').css({"border-color": color});		
}


