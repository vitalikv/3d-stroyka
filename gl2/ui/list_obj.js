



class UI_estimateListObj
{
	el = null;
		
	constructor({container})
	{
		this.container = container;
		this.activeItem = null;
		this.arr = [];
	}
	
	crItem({obj})
	{
		let html = this.htmlItem({obj});

		let elem = document.createElement('div');
		elem.innerHTML = html;
		elem = elem.firstChild;

		this.container.append(elem);		
	}


	// 
	htmlItem({obj})
	{
		let name = strName({obj});
		let h_htmlTube = htmlTube({obj});
		let h_viewObj = viewObj();
		
		let html = 
		'<div class="right_panel_1_1_list_item">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				<div class="right_panel_1_1_list_item_text">'+name+'</div>\
				'+h_htmlTube+'\
				'+h_viewObj+'\
			</div>\
		</div>';

		
		function strName({obj})
		{
			let name = '';
			
			if(obj.userData.tag == 'obj') name = obj.userData.obj3D.nameRus;
			if(obj.userData.tag == 'wf_tube') name = 'труба';
			if(obj.userData.tag == 'new_tube') name = 'труба';
			
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
				'<div class="right_panel_1_1_list_item_color">\
					<input type="color" value="'+colorTube+'" style="width: 25px; height: 10px; margin: auto; border: none; cursor: pointer;">\
				</div>\
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
}