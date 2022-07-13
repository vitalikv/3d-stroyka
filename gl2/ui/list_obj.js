


// список всех объектов в сцене (вкладка "список")
class UI_estimateListObj
{
	el = null;
		
	constructor({container})
	{
		this.container = container;
		this.arr = [];
	}
	
	// создаем пункт
	crItem({obj})
	{
		let html = this.htmlItem({obj});

		let elem = document.createElement('div');
		elem.innerHTML = html;
		elem = elem.firstChild;

		this.container.append(elem);
		this.initEvents({elem, obj});
		
		this.addItemArr({el: elem, obj});
		this.groupItem({item: this.arr[this.arr.length - 1]});
	}

	removeItem({obj})
	{
		this.deleteItemArr({obj});
	}

	// собираем Item html 
	htmlItem({obj})
	{
		let name = strName({obj});
		let h_htmlTube = htmlTube({obj});
		let h_viewObj = viewObj();
		
		let html = 
		'<div class="right_panel_1_1_list_item">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				<div nameId="nameItem" class="right_panel_1_1_list_item_text">'+name+'</div>\
				'+h_htmlTube+'\
				'+h_viewObj+'\
			</div>\
		</div>';

		
		function strName({obj})
		{
			let name = '';
			
			if(obj.userData.tag == 'obj') name = obj.userData.obj3D.nameRus;
			if(obj.userData.tag == 'wf_tube') name = 'труба ' + obj.userData.wf_tube.diameter * 1000;
			if(obj.userData.tag == 'new_tube') name = obj.userData.nameRus;
			
			return name;
		}
		
		// труба
		function htmlTube({obj})
		{		
			let str = '';
			let colorTube = null;
			let lengthTube = null;
			
			if(obj.userData.tag == 'wf_tube')
			{
				lengthTube = obj.userData.wf_tube.length;
				colorTube = '#' + obj.material.color.clone().getHexString();				
			}
			
			if(obj.userData.tag == 'new_tube')
			{				
				lengthTube = obj.userData.lengthTube;
				colorTube = '#' + obj.material.color.clone().getHexString();					
			}				

			
			if(lengthTube)
			{
				str = 
				'<div class="right_panel_1_1_list_item_color" nameId="colorTube" style="background-color: '+colorTube+';"></div>\
				<div class="right_panel_1_1_list_item_text" nameId="lengthTube">'+lengthTube+'м</div>';			
			}
			
			return str;
		}
	
		// кнопка центрирования
		function viewObj()
		{
			let str = 
			'<div nameId="sh_select_obj3D" style="margin-right: 5px; margin-left: auto; width: 10px; height: 20px;">\
				<div>\
					<svg height="100%" width="100%" viewBox="0 0 100 100">\
						<circle cx="50%" cy="50%" r="40" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
					</svg>\
				</div>\
			</div>';		
			
			return str;
		}
				
	
		return html;
	}	


	addItemArr({el, obj})
	{
		this.arr.push({el, obj, parent: null});
	}


	// создаем группу из повторяющихся объектов 
	groupItem({item})
	{
		crtGroupItemListObjUI_1({list: this.arr, item});
	}
	
	
	// удаляем Item
	delItem({obj})
	{
		let arr = this.arr;
		
		for(let i = 0; i < arr.length; i++)
		{
			if(arr[i].obj !== obj) continue;
			
			let parent = arr[i].parent;
			
			arr[i].el.remove();
			deleteValueFromArrya({arr: arr, o: arr[i]});
			
			delGroupItemListObjUI_1({list: arr, parent});
			break;
		}		
	}
	
	
	// создаем событие -> центрирование камеры на объект
	initEvents({elem, obj})
	{
		let button = elem.querySelector('[nameId="sh_select_obj3D"]');
		button.onmousedown = (e) => 
		{ 
			hideMenuObjUI_2D();
			if(obj.userData.tag == 'obj') { clickObject3D( obj, { menu_1: true, outline: true} ); }	
			if(obj.userData.tag == 'wf_tube') { clickTubeWF({obj: obj}); }			
			fitCameraToObject({obj: obj}); 
			e.stopPropagation(); 
		}
	}	
	
	// обновляем название/длину/цвет у трубы/объекта
	updateItem({obj})
	{
		updateItemListUI({obj, list: this.arr});
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
			if(obj1 == list[i].obj) continue;				

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
				el_2.onmousedown = function(e){ clickShowHideGroupObj_UI_1({el: container_2}); e.stopPropagation(); };	
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


	// кликнули на треугольник в меню список (показываем/скрываем)
	function clickShowHideGroupObj_UI_1({el})
	{	
		el.style.display = (el.style.display == 'none') ? 'block' : 'none';	

		el.parentElement.style.backgroundColor = (el.style.display == 'block') ? '#ebebeb' : '#ffffff';	
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






// обновляем название/длину/цвет у трубы/объекта в списке материалов
function updateItemListUI({obj, list})
{	
	let el = null;	
	
	for(let i = 0; i < list.length; i++)
	{		
		if(obj == list[i].obj) 
		{
			el = list[i].el;
			break;
		}
	}		

	if(el)
	{
		if(obj.userData.tag == 'obj')
		{
			el.querySelector('[nameId="nameItem"]').innerText = obj.userData.obj3D.nameRus;			
		}		
		if(obj.userData.tag == 'wf_tube')
		{
			el.querySelector('[nameId="nameItem"]').innerText = 'труба ' + obj.userData.wf_tube.diameter * 1000;
			el.querySelector('[nameId="colorTube"]').style.backgroundColor = '#' + obj.material.color.clone().getHexString();					
			el.querySelector('[nameId="lengthTube"]').innerText = obj.userData.wf_tube.length + 'м';				
		}
		if(obj.userData.tag == 'new_tube')
		{
			el.querySelector('[nameId="nameItem"]').innerText = obj.userData.nameRus;
			el.querySelector('[nameId="colorTube"]').style.backgroundColor = '#' + obj.material.color.clone().getHexString();					
			el.querySelector('[nameId="lengthTube"]').innerText = obj.userData.lengthTube + 'м';				
		}			
	}
}





