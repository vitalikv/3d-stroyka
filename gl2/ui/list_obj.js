


// список всех объектов в сцене
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
			if(obj.userData.tag == 'wf_tube') name = 'труба' + obj.userData.wf_tube.diameter * 1000;
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
		button.onmousedown = (e) => { fitCameraToObject({obj: obj}); e.stopPropagation(); };
	}	
	
	
}


