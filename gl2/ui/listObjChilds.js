


class UI_listObjChilds
{
	el = null;
		
	constructor({el})
	{
		this.el = el;
		this.activeItem = null;
		this.arr = [];
	}
	
	crListUI({arr})
	{
		this.arr = arr;
		
		for (let i = 0; i < arr.length; i++)
		{			
			let html = this.html(arr[i]);	

			let elem = document.createElement('div');
			elem.innerHTML = html;
			elem = elem.firstChild;

			this.el.append(elem);
			
			this.arrAddElem({id: i, elem: elem});
			
			this.initEvents({id: i, elem: elem});
		}
		
		this.selectItem({elem: this.arr[0].elem});
		console.log(222, arr);
	}
	
	html({obj = null, name, colorTube = null, lengthTube = null, childs = []})
	{
		let str = 
		'<div class="right_panel_1_1_list_item" nameId="obj" uuid="'+obj.uuid+'">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				'+this.htmlTr({childs: childs})+'\
				<div class="right_panel_1_1_list_item_text">'+name+'</div>\
				'+this.htmlTube({colorTube, lengthTube})+'\
				'+this.htmlViewObj()+'\
			</div>\
			'+this.htmСhilds({childs})+'\
		</div>';

		return str;
	}


	// треугольник, кликнув на него показываем/скрываем разъемы этого объекта
	htmlTr({childs})
	{		
		let str = '';
		
		if(childs.length > 0)
		{
			str = 
			'<div nameId="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
				<div>\
					<svg height="100%" width="100%" viewBox="0 0 100 100">\
						<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
					</svg>\
				</div>\
			</div>';				
		}
		
		return str;
	}
	
	
	// цвет трубы
	htmlTube({colorTube, lengthTube})
	{		
		let str = '';
		
		if(lengthTube)
		{
			str = 
			'<div class="right_panel_1_1_list_item_color">\
				<input type="color" value="'+colorTube+'" style="width: 25px; height: 10px; margin: auto; border: none; cursor: pointer;">\
			</div>\
			<div class="right_panel_1_1_list_item_text" nameId="lengthTube">'+lengthTube+'м</div>';			
		}
		
		return str;
	}	


	// кнопка центрирование на объекте
	htmlViewObj()
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


	// разъемы объекта
	htmСhilds({childs})
	{	
		if(childs.length == 0) return '';

		let items = '';
		
		for (let i = 0; i < childs.length; i++)
		{
			items += 
			'<div class="flex_1 right_panel_1_1_list_item relative_1" nameId="item" uuid="'+childs[i].obj.uuid+'">\
				<div class="right_panel_1_1_list_item_text">'+childs[i].name+'</div>\
			</div>';			
		}
					
		let str = '<div nameId="groupItem" style="display: none;">'+items+'</div>';			
		
		return str;
	}
	
	
	arrAddElem({id, elem})
	{
		this.arr[id].elem = elem;
		
		let lengthTube = elem.querySelector('[nameId="lengthTube"]');
		if(lengthTube) this.arr[id].elemLengthTube = lengthTube;
				
		
		let arrEl = elem.querySelectorAll('[nameId="item"]');
		
		for (let i = 0; i < arrEl.length; i++)
		{
			this.arr[id].childs[i].elem = arrEl[i];
		}
	}
	
	initEvents({elem, id})
	{
		this.clickItem({elem: elem, id: id});
		this.visibleChilds({elem: elem});
		this.clickInputColor({elem: elem});
	}
	
	
	// создаем событие -> кликнули на пункт объекта/разъема
	clickItem({elem, id})
	{
		let item = this.arr[id];
		
		let arr = [{elem: item.elem, callF: item.f}];
		
		if(item.childs)
		{
			for (let i = 0; i < item.childs.length; i++)
			{
				arr.push({elem: item.childs[i].elem, callF: item.childs[i].f});
			};					
		}
	
		for (let i = 0; i < arr.length; i++)
		{
			arr[i].elem.onmousedown = (e) => 
			{
				this.selectItem({elem: arr[i].elem, callF: arr[i].callF});
				e.stopPropagation(); 
			}
		};		
	}
	
	// создаем событие -> показываем/скрываем список разъемов объекта
	visibleChilds({elem})
	{
		let button = elem.querySelector('[nameId="shCp_1"]');
		if(!button) return;
		
		let div = elem.querySelector('[nameId="groupItem"]');

		button.onmousedown = (e) => 
		{ 
			div.style.display = (div.style.display == 'none') ? '' : 'none';
			
			let color = '#ffffff';
			
			if(elem == this.activeItem) color = infProject.listColor.activeItem_1;
			else if(div.style.display == 'none') color = '#ffffff';
			else if(div.style.display == '') color = '#ebebeb';
			
			elem.style.backgroundColor = color;
			
			e.stopPropagation(); 
		};		
	}

	// создаем событие -> кликнули на замену цвета трубы
	clickInputColor({elem})
	{
		let input = elem.querySelector('input[type="color"]');
		if(!input) return;
		
		input.onmousedown = (e) => e.stopPropagation();
		input.onchange = (e) => { e.stopPropagation(); };
	}
	
	
	selectItem({elem, callF = null})
	{
		if(callF) callF();
		
		this.setResetColorItems();
		this.activeItem = elem;
		elem.style.backgroundColor = infProject.listColor.activeItem_1;
	}
	
	// сбросить выделение со всех пунктов
	setResetColorItems()
	{
		let objEl = this.el.querySelectorAll('[nameId="obj"]');
	
		for (let i = 0; i < objEl.length; i++)
		{
			let color = '#ffffff';
			let div = objEl[i].querySelector('[nameId="groupItem"]');
			
			if(div) color = (div.style.display == 'none') ? '#ffffff' : '#ebebeb';
			
			objEl[i].style.backgroundColor = color;
		};

		let childEl = this.el.querySelectorAll('[nameId="item"]');
	
		for (let i = 0; i < childEl.length; i++)
		{			
			childEl[i].style.backgroundColor = '#ffffff';
		};		
	}
	
	clearItem()
	{
		
	}
	
	clear()
	{
		this.activeItem = null;
		this.arr = [];
		this.el.innerHTML = '';
	}
	
	
	hide()
	{
		let list = this.list.div;

		for (let key in list) 
		{
			if(list[key]) 
			{
				list[key].style.display = 'none';
			}			
		}
		
		this.el.style.display = 'none';
	}	
}




