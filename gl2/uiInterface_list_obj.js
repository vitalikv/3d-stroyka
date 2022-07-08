



// добавляем/обновляем/удаляем в список материалов новый объект, который добавляем в сцену UI
function updateListObjUI_1(cdm)
{
	if(cdm.type == 'add')
	{
		var obj = cdm.o;
		
		var tag = obj.userData.tag; 

		var container = document.body.querySelector('[list_ui="wf"]');
		
		var str_button = 
		'<div nameId="sh_select_obj3D" style="margin-right: 5px; margin-left: auto; width: 10px; height: 20px;">\
			<div>\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<circle cx="50%" cy="50%" r="40" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>\
		</div>';		

		
		if(tag == 'wf_tube')
		{
			var html = 
			'<div>\
				<div class="right_panel_1_1_list_item">\
					<div class="flex_1 relative_1">\
						<div class="right_panel_1_1_list_item_text" nameId="nameItem">труба</div>\
						<div class="right_panel_1_1_list_item_color" nameId="colorTube"></div>\
						<div class="right_panel_1_1_list_item_text" nameId="lengthTube"></div>\
						'+str_button+'\
					</div>\
				</div>\
			</div>';			
		}
		else if(tag == 'obj')
		{   
			var html = 
			'<div>\
				<div class="right_panel_1_1_list_item">\
					<div class="flex_1 relative_1">\
						<div class="right_panel_1_1_list_item_text" nameId="nameItem">'+obj.userData.obj3D.nameRus+'</div>\
						'+str_button+'\
					</div>\
				</div>\
			</div>';					
		}
		else
		{
			return;
		}		

		var div = document.createElement('div');
		div.innerHTML = html;
		var elem = div.firstChild;	
		
		container.append(elem);
		
		// назначаем событие при клике на кружок UI
		var elem_2 = elem.querySelector('[nameId="sh_select_obj3D"]');
		(function(obj) 
		{
			elem_2.onmousedown = function(e)
			{ 
				hideMenuObjUI_2D();
				if(obj.userData.tag == 'obj') { clickObject3D( obj, { menu_1: true, outline: true} ); }	
				if(obj.userData.tag == 'wf_tube') { clickTubeWF({obj: obj}); }	
				fitCameraToObject({obj: obj});
				e.stopPropagation();
			};	
		}(obj));						
		
		
		var num = infProject.list.obj_scene_ui.length;
		infProject.list.obj_scene_ui[num] = { el: elem, o: obj, parent: null };
		
		upTubeListObjUI({obj});
		
		crtGroupItemListObjUI_1({list: infProject.list.obj_scene_ui, item: infProject.list.obj_scene_ui[num]});
	}
	
	if(cdm.type == 'delete')
	{
		for(let i = 0; i < infProject.list.obj_scene_ui.length; i++)
		{
			if(infProject.list.obj_scene_ui[i].o == cdm.o) 
			{
				let parent = infProject.list.obj_scene_ui[i].parent;
				
				infProject.list.obj_scene_ui[i].el.remove();
				deleteValueFromArrya({arr: infProject.list.obj_scene_ui, o: infProject.list.obj_scene_ui[i]});
				
				delGroupItemListObjUI_1({list: infProject.list.obj_scene_ui, parent});
				break;
			}
		}
	}
	
	if(cdm.type == 'update')
	{		
		upTubeListObjUI({obj: cdm.o});
		upObjListObjUI({obj: cdm.o});
	}	
}





	


	









	
	

