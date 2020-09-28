



// добавляем/обновляем/удаляем в список материалов новый объект, который добавляем в сцену UI
function updateListObjUI_1(cdm)
{
	if(cdm.type == 'add')
	{
		var obj = cdm.o;
		
		var tag = obj.userData.tag; 

		var container = document.body.querySelector('[list_ui="wf"]');
		
		var str_button = 
		'<div nameId="sh_select_obj3D" style="margin-right: 5px; width: 10px; height: 20px;">\
			<div>\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<circle cx="50%" cy="50%" r="40" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>\
		</div>';		

		
		if(tag == 'wf_line')
		{
			var html = 
			'<div>\
				<div class="right_panel_1_1_list_item">\
					<div class="flex_1 relative_1">\
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
				clickObject3D( obj, { menu_1: true, outline: true} );			
				fitCameraToObject({obj: obj});
				e.stopPropagation();
			};	
		}(obj));						
		
		
		infProject.list.obj_scene_ui[infProject.list.obj_scene_ui.length] = { el: elem, o: obj };
		
		upTubeListObjUI({line: obj});
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
		
		upTubeListObjUI({line: cdm.o});
		upObjListObjUI({obj: cdm.o});
	}	
}


// переименовываем название во вкладке "список"
function upObjListObjUI(cdm)
{
	var obj = cdm.obj;
	if(obj.userData.tag != 'obj'){ return; }
	
	var list = infProject.list.obj_scene_ui;
	
	for(var i = 0; i < list.length; i++)
	{		
		if(list[i].o == obj)
		{
			var nameItem = list[i].el.querySelector('[nameId="nameItem"]');
			nameItem.innerText = obj.userData.obj3D.nameRus;
			break;
		}				
	}			

}	


// обновляем название/длину/цвет у трубы в списке материалов
function upTubeListObjUI(cdm)
{
	var line = cdm.line;	
	if(line.userData.tag != 'wf_line'){ return; }
	
	var q = null;	
	
	for(var i = 0; i < infProject.list.obj_scene_ui.length; i++)
	{
		if(infProject.list.obj_scene_ui[i].o == line) 
		{
			q = infProject.list.obj_scene_ui[i].el;
			break;
		}
	}		

	if(q)
	{
		q.querySelector('[item="color"]').style.backgroundColor = '#'+line.userData.wf_line.color.clone().getHexString();
		
		var v = line.geometry.vertices;
		var length = 0;				
		for(var i = 0; i < v.length - 1; i++){ length += v[i].distanceTo(v[i + 1]); }
		
		q.querySelector('[item="name"]').innerText = 'труба '+line.userData.wf_line.diameter * 1000;
		q.querySelector('[item="value"]').innerText = Math.round(length * 100)/100+'м';		
	}
}	






// сохраняем список материалов в txt
function saveListTxt() 
{ 
	var txt = '';
	var n = 1;
	var list = infProject.list.obj_scene_ui;
	
	for(var i = list.length - 1; i >= 0; i--)
	{
		var o = list[i].o;
		
		if(o.userData.obj3D)
		{
			txt += n+'. '+o.userData.obj3D.nameRus+'\n';
			n++;
		}
		else if(o.userData.wf_line)
		{
			var tube = o.userData.wf_line.tube;
			txt += n+'. '+tube.userData.wf_tube.nameRus+' ('+tube.userData.wf_tube.length+'м)\n';
			n++;
		}				
	}

	{	
		var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(txt);	
		
		var link = document.createElement('a');
		document.body.appendChild(link);
		link.href = csvData;
		link.target = '_blank';
		link.download = 'список.txt';
		link.click();			
	}		
}

	
	

