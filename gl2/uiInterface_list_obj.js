



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
						<div class="right_panel_1_1_list_item_color" item="color"></div>\
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
				if(obj.userData.tag == 'obj') { clickObject3D( obj, { menu_1: true, outline: true} ); }	
				if(obj.userData.tag == 'wf_tube') { clickTubeWF({obj: obj}); }	
				fitCameraToObject({obj: obj});
				e.stopPropagation();
			};	
		}(obj));						
		
		
		var num = infProject.list.obj_scene_ui.length;
		infProject.list.obj_scene_ui[num] = { el: elem, o: obj, parent: null };
		
		upTubeListObjUI({tube: obj});
		
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
		
		upTubeListObjUI({tube: cdm.o});
		upObjListObjUI({obj: cdm.o});
	}	
}




// создаем группу для повторяющих деталей в "списке"
function crtGroupItemListObjUI_1({list, item})
{
	let item2 = checkSimilarItemListObjUI_1({list, item});	
	
	if(item2)
	{		
		if(!item2.parent) crGroupItem({item: item2});

		// добавляем в грппу объект и указываем, что у него есть parent
		{
			let parent = item2.parent;
							
			let container_2 = parent.querySelector('[nameId="groupItem"]');
			container_2.append(item.el);	

			item.parent = parent;

			getCountObjInGroup({list, parent});
		}
	}

	// проверяем повторяется ли деталь в списке
	function checkSimilarItemListObjUI_1({list = null, item})
	{
		let inf = null;
		
		let obj1 = item.o || item.obj;	
		let name1 = item.el.querySelector('[nameId="nameItem"]').innerText;
		
		for(let i = 0; i < list.length; i++)
		{
			let obj2 = list[i].o || list[i].obj;

			if(!obj2) continue;	
			if(obj1 == obj2) continue;				

			let name2 = list[i].el.querySelector('[nameId="nameItem"]').innerText;
			
			if(name1 == name2){ inf = list[i]; }				
				
			if(inf) break;
		}


		return inf;
	}

	
	// если в проекте 2 и более одинаковых объектов, то создаем группу и добавляем в нее первый объект
	function crGroupItem({item})
	{
		let name = item.el.querySelector('[nameId="nameItem"]').innerText;
		
		let groupItem = '';
		
		let str_button = 
		'<div nameId="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
			<svg height="100%" width="100%" viewBox="0 0 100 100">\
				<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
			</svg>\
		</div>';			
		
		let html = 
		'<div class="right_panel_1_1_list_item" style="top:0px; left:0px;">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				'+str_button+'\
				<div class="right_panel_1_1_list_item_text" nameId="nameGroup">'+name+'</div>\
				<div class="right_panel_1_1_list_item_text" nameId="countItem" style="margin-right: 10px; margin-left: auto;">[1]</div>\
			</div>\
			<div nameId="groupItem" style="display: none;">\
				'+groupItem+'\
			</div>\
		</div>';	

		let div = document.createElement('div');
		div.innerHTML = html;
		let elem = div.firstChild;
		
		// назначаем кнопки треугольник событие
		{
			let el_2 = elem.querySelector('[nameId="shCp_1"]');
			let container_2 = elem.querySelector('[nameid="groupItem"]');

			(function(container_2) 
			{
				el_2.onmousedown = function(e){ clickShowHideGroupObj_UI_1({elem_2: container_2}); e.stopPropagation(); };	
			}(container_2));											
		}		

		// вставляем item в группу
		let el = item.el;
		let container_2 = elem.querySelector('[nameId="groupItem"]');
		container_2.append(el);
		
		// добавляем группу в "список"
		let container = document.body.querySelector('[list_ui="wf"]');
		container.append(elem);	

		// назначаем группы для item
		item.parent = elem;
	}	
}





// удаляем группу, если в ней, будет только 1 или 0 объектов
function delGroupItemListObjUI_1({list, parent})
{
	if(!parent) return;
	
	let arr = [];
	for(let i = 0; i < list.length; i++)
	{
		if(list[i].parent == parent) { arr[arr.length] = list[i]; }
	}

	if(arr.length == 0)
	{
		parent.remove();
	}
	if(arr.length == 1)
	{
		let container = document.body.querySelector('[list_ui="wf"]');
		container.append(arr[0].el);
		parent.remove();
		arr[0].parent = null;
	}
	
	getCountObjInGroup({list, parent});
}


// обновляем текст, который указывает кол-во объектов в группе
function getCountObjInGroup({list, parent})
{
	if(!parent) return;
	
	let count = 0;
	
	for(let i = 0; i < list.length; i++)
	{
		if(list[i].parent == parent) count++;
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
		
		q.querySelector('[nameId="nameItem"]').innerText = 'труба '+tube.userData.wf_tube.diameter * 1000;
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





	
	

