



// добавляем/обновляем/удаляем в список материалов новый объект, который добавляем в сцену UI
function updateListTubeUI_1(cdm)
{
	if(cdm.type == 'add')
	{
		var obj = cdm.o;
		
		var tag = obj.userData.tag; 
		
		var str_button = 
		'<div nameId="shCp_1" style="width: 40px; height: 20px;">\
			<div style="position: absolute; width: 15px; height: 10px; right: 20px;">\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>\
		</div>';

		
		if(tag == 'wf_line')
		{
			var str = 
			'<div>\
				<div class="right_panel_1_1_list_item">\
					<div class="flex_1 relative_1" uuid="'+obj.uuid+'">\
						<div class="right_panel_1_1_list_item_color" item="color"></div>\
						<div class="right_panel_1_1_list_item_text" item="name">труба</div>\
						<div class="right_panel_1_1_list_item_text" item="value"></div>\
						'+str_button+'\
					</div>\
				</div>\
			</div>';			
		}
		else if(tag == 'obj')
		{   
			var str = 
			'<div>\
				<div class="right_panel_1_1_list_item">\
					<div class="flex_1 relative_1" uuid="'+obj.uuid+'">\
						<div class="right_panel_1_1_list_item_text">'+obj.userData.obj3D.nameRus+'</div>\
						'+str_button+'\
					</div>\
				</div>\
			</div>';					
		}
		else
		{
			return;
		}
		
		
		var q = $(str).prependTo('[list_ui="wf"]')[0];
		q.uuid = obj.uuid;
		
		
		if(tag == 'wf_line') { $(q.querySelector('[item="color"]')).css('background-color', '#'+obj.userData.wf_line.color.clone().getHexString()); }	
		
		var n = infProject.list.obj_scene_ui.length;
		infProject.list.obj_scene_ui[n] = { el: q, o: obj };
	}
	
	if(cdm.type == 'delete')
	{
		for(var i = 0; i < infProject.list.obj_scene_ui.length; i++)
		{
			if(infProject.list.obj_scene_ui[i].o == cdm.o) 
			{
				infProject.list.obj_scene_ui[i].el.remove();
				deleteValueFromArrya({arr: infProject.list.obj_scene_ui, o: infProject.list.obj_scene_ui[i]});
				break;
			}
		}
	}
	
	if(cdm.type == 'update')
	{
		var q = null;
		var line = cdm.o;
		
		console.log('update', line.userData);
		
		for(var i = 0; i < infProject.list.obj_scene_ui.length; i++)
		{
			if(infProject.list.obj_scene_ui[i].o == cdm.o) 
			{
				q = infProject.list.obj_scene_ui[i].el;
				break;
			}
		}		

		if(q)
		{
			console.log(cdm, q.querySelector('[item="color"]'));
			//var el_2 = $(el[0].querySelector('[nameId="shCp_1"]'));
			
			$(q.querySelector('[item="color"]')).css('background-color', '#'+line.userData.wf_line.color.clone().getHexString());
			
			var v = line.geometry.vertices;
			var length = 0;				
			for(var i = 0; i < v.length - 1; i++){ length += v[i].distanceTo(v[i + 1]); }
			
			$(q.querySelector('[item="name"]')).text('труба '+line.userData.wf_line.diameter * 1000);
			$(q.querySelector('[item="value"]')).text(Math.round(length * 100)/100+'м');			
		}
	}
}


