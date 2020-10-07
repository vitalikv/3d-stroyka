



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

		
		if(tag == 'wf_tube')
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
		
		
		var num = infProject.list.obj_scene_ui.length;
		infProject.list.obj_scene_ui[num] = { el: elem, o: obj, parent: null };
		
		upTubeListObjUI({tube: obj});
		
		crtGroupItemListObjUI_1({obj: obj, num: num});
	}
	
	if(cdm.type == 'delete')
	{
		for(var i = 0; i < infProject.list.obj_scene_ui.length; i++)
		{
			if(infProject.list.obj_scene_ui[i].o == cdm.o) 
			{
				var parent = infProject.list.obj_scene_ui[i].parent;
				
				infProject.list.obj_scene_ui[i].el.remove();
				deleteValueFromArrya({arr: infProject.list.obj_scene_ui, o: infProject.list.obj_scene_ui[i]});
				
				delGroupItemListObjUI_1({parent: parent});
				break;
			}
		}
	}
	
	if(cdm.type == 'update')
	{
		
		upTubeListObjUI({tube: cdm.o});
		upObjListObjUI({obj: cdm.o});
	}	
}




// создаем группу для повторяющих деталей в "списке"
function crtGroupItemListObjUI_1(cdm)
{
	var obj = cdm.obj;
	var num = cdm.num;
	
	for(var i = 0; i < infProject.list.obj_scene_ui.length; i++)
	{
		var o2 = infProject.list.obj_scene_ui[i].o;
		
		if(o2 == obj) continue;
		
		var equally = false;

		if(obj.userData.tag == 'obj')
		{
			if(o2.userData.tag == 'obj')
			{
				if(o2.userData.obj3D.lotid == obj.userData.obj3D.lotid){ equally = true; }
			}				
		}
		else if(obj.userData.tag == 'wf_tube')
		{
			if(o2.userData.tag == 'wf_tube')			
			{ 
				if(o2.userData.wf_tube.diameter == obj.userData.wf_tube.diameter){ equally = true; }
			}
		}				
			
		if(equally)
		{
			if(!infProject.list.obj_scene_ui[i].parent)
			{
				if(o2.userData.tag == 'wf_tube'){ crtGroupItemListObjUI_2({num: i, name: 'трубы '+obj.userData.wf_tube.diameter*1000}); }
				else { crtGroupItemListObjUI_2({num: i, name: obj.userData.obj3D.nameRus}); }					
			}

			// добавляем в грппу объект и указываем, что у него есть parent
			{
				var parent = infProject.list.obj_scene_ui[i].parent;
								
				var item = infProject.list.obj_scene_ui[cdm.num].el;
				var container_2 = parent.querySelector('[nameId="groupItem"]');
				container_2.append(item);	

				infProject.list.obj_scene_ui[num].parent = parent;

				getCountObjInGroup({parent: parent});
			}
			
			break;
		}
	}

	
	// если в проекте 2 и более одинаковых объектов, то создаем группу и добавляем в нее первый объект
	function crtGroupItemListObjUI_2(cdm)
	{
		
		var groupItem = '';
		
		var str_button = 
		'<div nameId="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
			<div>\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>\
		</div>';			
		
		var html = 
		'<div class="right_panel_1_1_list_item" style="top:0px; left:0px;">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				'+str_button+'\
				<div class="right_panel_1_1_list_item_text" nameId="nameGroup">'+cdm.name+'</div>\
				<div class="right_panel_1_1_list_item_text" nameId="countItem" style="margin-right: 10px;">[1]</div>\
			</div>\
			<div nameId="groupItem" style="display: none;">\
				'+groupItem+'\
			</div>\
		</div>';	

		var div = document.createElement('div');
		div.innerHTML = html;
		var elem = div.firstChild;
		
		// назначаем кнопки треугольник событие
		{
			var el_2 = elem.querySelector('[nameId="shCp_1"]');
			var container_2 = elem.querySelector('[nameid="groupItem"]');

			(function(container_2) 
			{
				el_2.onmousedown = function(e){ clickShowHideGroupObj_UI_1({elem_2: container_2}); e.stopPropagation(); };	
			}(container_2));											
		}		

		// вставляем в группу item
		var item = infProject.list.obj_scene_ui[cdm.num].el;
		var container_2 = elem.querySelector('[nameId="groupItem"]');
		container_2.append(item);
		
		// добавляем группу в "список"
		var container = document.body.querySelector('[list_ui="wf"]');
		container.append(elem);	

		// назначаем группы для item
		infProject.list.obj_scene_ui[cdm.num].parent = elem;
	}	
}



// удаляем группу, если в ней, будет только 1 или 0 объектов
function delGroupItemListObjUI_1(cdm)
{
	var parent = cdm.parent;
	var list = infProject.list.obj_scene_ui;
	
	if(!parent) return;
	
	var arr = [];
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].parent == parent) { arr[arr.length] = list[i]; }
	}

	if(arr.length == 0)
	{
		parent.remove();
	}
	if(arr.length == 1)
	{
		var container = document.body.querySelector('[list_ui="wf"]');
		container.append(arr[0].el);
		parent.remove();
		arr[0].parent = null;
	}
	
	getCountObjInGroup({parent: parent});
}


// обновляем текст, который указывает кол-во объектов в группе
function getCountObjInGroup(cdm)
{
	var parent = cdm.parent;
	
	if(!parent) return;
	
	var count = 0;
	var list = infProject.list.obj_scene_ui;
	
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].parent == parent)
		{
			count++;
		}
	}
	
	parent.querySelector('[nameId="countItem"]').innerText = '['+count+']';
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
	var tube = cdm.tube;	
	if(tube.userData.tag != 'wf_tube'){ return; }
	
	var q = null;	
	
	var list = infProject.list.obj_scene_ui;
	
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].o == tube) 
		{
			q = infProject.list.obj_scene_ui[i].el;
			break;
		}
	}		

	if(q)
	{
		q.querySelector('[item="color"]').style.backgroundColor = '#'+tube.material.color.clone().getHexString();
		
		q.querySelector('[item="name"]').innerText = 'труба '+tube.userData.wf_tube.diameter * 1000;
		q.querySelector('[item="value"]').innerText = tube.userData.wf_tube.length+'м';		
	}
}	



// кликнули на треугольник в меню список (показываем/скрываем)
function clickShowHideGroupObj_UI_1(cdm)
{
	var display = cdm.elem_2.style.display;
	
	var display = (display == 'none') ? 'block' : 'none';
	
	cdm.elem_2.style.display = display;
	
	var parentEl = cdm.elem_2.parentElement;	

	if(display == 'block') 
	{ 
		parentEl.style.backgroundColor = '#ebebeb';		
	}
	else 
	{ 
		parentEl.style.backgroundColor = '#ffffff';
	}	
}



// сохраняем список материалов в txt
function saveListTxt() 
{ 
	var list = infProject.list.obj_scene_ui;	
	var arr = [];
	
	for(var i = 0; i < list.length; i++)
	{
		var o = list[i].o;
		
		if(o.userData.obj3D)
		{
			checkObjExistList({obj: o, arr: arr});
		}
		else if(o.userData.wf_tube)
		{
			arr[arr.length] = {obj: o, count: 1};
		}				
	}
	
	
	// проверяем есть ли такой же объект в списке, если есть-> то увеличеваем кол-во на +1, если нету-> то добавляем в список
	function checkObjExistList(cdm)
	{
		var obj = cdm.obj;
		var arr = cdm.arr;
		var exist = false;
		
		for(var i = 0; i < arr.length; i++)
		{
			if(!arr[i].obj.userData.obj3D) continue;
			
			if(arr[i].obj.userData.obj3D.lotid == obj.userData.obj3D.lotid)
			{
				arr[i].count += 1;
				exist = true;
				break;
			}
		}
		
		if(!exist)
		{
			arr[arr.length] = { obj: obj, count: 1 };			
		}
	}
	
	
	var txt = '';
	var n = 1;
	
	for(var i = 0; i < arr.length; i++)
	{
		var o = arr[i].obj;
		var count = (arr[i].count < 2) ? '' : ' ['+arr[i].count+']';
		
		if(o.userData.obj3D)
		{
			txt += n+'. '+o.userData.obj3D.nameRus+count+'\n';
			n++;
		}
		else if(o.userData.wf_tube)
		{
			txt += n+'. '+o.userData.wf_tube.nameRus+' ('+o.userData.wf_tube.length+'м)\n';
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

	
	

