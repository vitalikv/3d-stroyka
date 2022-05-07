


class UI_listObjChilds
{
	el = null;
		
	constructor({el})
	{
		this.el = el;					
	}
	
	crListUI({name, lengthTube})
	{
		let html = this.html({name: name, lengthTube: lengthTube});	

		let elem = document.createElement('div');
		elem.innerHTML = html;
		elem = elem.firstChild;

		this.el.append(elem);		
	}
	
	html({name, lengthTube})
	{
		let str = 
		'<div class="right_panel_1_1_list_item">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				'+this.htmlTr()+'\
				<div class="right_panel_1_1_list_item_text" nameid="nameItem">'+name+'</div>\
				<div class="right_panel_1_1_list_item_color">\
					<input type="color" style="width: 25px; height: 10px; margin: auto; border: none; cursor: pointer;">\
				</div>\
				<div class="right_panel_1_1_list_item_text" item="value">'+lengthTube+'м</div>\
				'+this.htmlViewObj()+'\
			</div>\
			<div nameId="groupItem" style="display: none;">\
			</div>\
		</div>';

		return str;
	}


	htmlViewObj()
	{
		// кнопка центрирование на объекте
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

	htmlTr()
	{
		// треугольник
		let str = 
		'<div nameId="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
			<div>\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>\
		</div>';	
		
		return str;
	}
	
	
	clearItem()
	{
		
	}
	
	clear()
	{
		this.el.innerHTML = '';
	}
	
	
	hide()
	{
		let list = this.list.div;
		console.log(list);

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




