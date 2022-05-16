


class UI_infoBlockObj
{
	el = null;
	list = {};
	groupObjs = [];
	
	constructor({nameAttr})
	{
		this.el = document.createElement('div');			
		this.el.innerHTML = this.html();
		this.el = this.el.firstChild;
		
		this.el_parent = document.querySelector('[nameId="wrap_object"]');
		this.el_parent.append(this.el);	
		
		this.list.div = {};
		this.list.upd = {};
		this.list.listChilds = new UI_listObjChilds({el: this.el.querySelector('[nameId="list_obj_childs"]')});
		
		this.assignEvent();	
		this.setDivElement();
		this.setUpdElement();
	}
	
	assignEvent()
	{
		this.el.querySelector('[nameId="button_delete_obj"]').onmousedown = (e) => { detectDeleteObj({obj: clickO.last_obj}); e.stopPropagation(); };
		this.el.querySelector('[nameId="button_copy_obj"]').onmousedown = (e) => { copyObj(); e.stopPropagation(); };
		
		
		if(!infProject.elem) infProject.elem = {};		
		
		// input название объекта, трубы, точки и т.д.
		infProject.elem.rp_obj_name = this.el.querySelector('[nameId="rp_obj_name"]');		

		// вкладка со списком объектов в группе 
		infProject.elem.bl_rp_obj_group = this.el.querySelector('[nameId="bl_rp_obj_group"]');		
		
		// список объединения в группу
		infProject.elem.rp_add_group = this.el.querySelector('[nameId="rp_add_group"]');		
		
		this.el.querySelector('[nameId="butt_add_point_on_tube"]').onmousedown = () => { this.switchAddPointOnTube(); }	
		this.el.querySelector('[nameId="button_deactive_join_element"]').onmousedown = () => { switchAlignPoint_1({active: false}); }
		this.el.querySelector('[nameId="join_element"]').onmousedown = () => { alignPointToPoint_1(); }
		this.el.querySelector('[nameId="button_deactive_add_group"]').onmousedown = () => { switchSelectAddObjGroup({active: false}); } 
		this.el.querySelector('[nameId="button_add_group"]').onmousedown = () => { addObjToGroup(); } 
		
		this.el.querySelector('[nameId="button_active_align_wf_point1"]').onmousedown = () => { switchAlignPoint_1({active: true}); } 
		this.el.querySelector('[nameId="button_active_align_wf_point2"]').onmousedown = () => { switchAlignPoint_1({active: true, type: 'move'}); } 
		this.el.querySelector('[nameId="button_active_join_element"]').onmousedown = () => { switchAlignPoint_1({active: true}); }
		this.el.querySelector('[nameId="button_active_add_group"]').onmousedown = () => { switchSelectAddObjGroup({active: true}); }
		this.el.querySelector('[nameId="button_detach_obj_group"]').onmousedown = () => { detachObjGroup({obj: clickO.last_obj, active: true}); }		
	}

	setDivElement()
	{		
		this.list.div.tube = this.el.querySelector('[nameId="rp_bl_wf_tube"]');
		this.list.div.bobj = this.el.querySelector('[nameId="pr_list_button_for_obj"]');
		this.list.div.ptube1 = this.el.querySelector('[nameId="pr_list_button_for_tube_point1"]');
		this.list.div.ptube2 = this.el.querySelector('[nameId="pr_list_button_for_tube_point2"]');
		this.list.div.bjpoint = this.el.querySelector('[nameId="pr_list_button_center_point"]');
		
		this.list.div.listobj = this.el.querySelector('[nameId="bl_rp_obj_group"]');
		this.list.div.jgroup = this.el.querySelector('[nameId="rp_wrap_add_group"]');
		this.list.div.jpoint = this.el.querySelector('[nameId="rp_wrap_obj_align"]');
	}
	
	setUpdElement()
	{		
		this.list.upd.nameObj = this.el.querySelector('[nameId="rp_obj_name"]');
		this.list.upd.tubeDiameter = this.el.querySelector('[nameId="size_tube_diameter_2"]');
	}
	
	html()
	{
		let str = 
		`<div class="flex_column_1" nameId="wrap_object_1" style="display: none; overflow: auto;">
			<div class="right_panel_1_1_h">Объект</div>
							
			<div class="rp_obj">  
			
				${this.htmlObjName()}													

				<div nameId="bl_object_3d"> 
					 
					<div nameId="bl_rp_obj_group"> 							 
						 
						<div class="right_panel_1_1_list" nameId="list_obj_childs"> 
							 
						</div> 
					</div> 
					
					${this.htmlButtonObj()}
					
					${this.htmlButtonJoinPoint()} 

					${this.htmlButtonPointTube()}															 
					 
					${this.htmlTube()}
					 
				</div>	 
				
				${this.htmlJoinPoint()}
								
				${this.htmlJoinGroup()}				
			</div> 
		</div>`;
		
		return str;
	}
	

	htmlObjName()
	{
		let str =
		`<div class="rp_obj_name">
			<input type="text" nameId="rp_obj_name" value="Название">					
		</div>`;

		return str;	
	}
	
	htmlTube()
	{
		let str =
		`<div nameId="rp_bl_wf_tube">							 
			<div class="flex_1" style="display: '';"> 
				<div class="flex_1 align_items"> 
					<div class="rp_label_plane"> 
						диаметр (мм) 
					</div> 
				</div> 
				<div class="flex_1 align_items" style="width: auto;"> 
					<input type="text" nameId="size_tube_diameter_2" style="width: 90%; margin:5px 5px;" value=0> 
				</div> 
			</div>					 
							  

			<div style="margin: 10px 0;"> 
				<div nameId="butt_add_point_on_tube" class="button1 button_gradient_1">добавить точку 1</div> 
			</div>						 
		</div>`;		
		
		return str;
	}

	htmlButtonPointTube()
	{
		let str =
		`<div nameId="pr_list_button_for_tube_point1" style="margin: 10px 0; display: none;">								 
			<div nameId="button_active_align_wf_point1" class="button1 button_gradient_1">подключить точку</div>			 
		</div> 
		 
		<div nameId="pr_list_button_for_tube_point2" style="margin: 10px 0; display: none;">								 
			<div nameId="button_active_align_wf_point2" class="button1 button_gradient_1">подключить трубу</div>			 
		</div>`;			

		return str;	
	}
	
	htmlButtonObj()
	{
		let str =
		`<div nameId="pr_list_button_for_obj" style="display: none;"> 
			 
			<div class="flex_1"> 
				<div class="button1 button_gradient_1" nameId="button_active_add_group" style="width: 100%;"> 
					объединить в группу	 
				</div> 
				<div class="button1 button_gradient_1" nameId="button_detach_obj_group" style="width: 100%;"> 
					убрать из группы	 
				</div>															 
			</div> 
			 
			<div class="flex_1"> 
				<div class="button1 button_gradient_1" nameId="button_copy_obj" style="width: 100%;"> 
					копировать	 
				</div> 
				<div class="button1 button_gradient_1" nameId="button_delete_obj" style="width: 100%;"> 
					удалить	 
				</div>								 
			</div> 

			<div nameId="sp_block_drt"> 

			</div>		 
		</div>`;

		return str;	
	}
	
	htmlButtonJoinPoint()
	{
		let str =
		`<div nameId="pr_list_button_center_point" style="display: none;">  
			<div class="button1 button_gradient_1" nameId="button_active_join_element"> 
				подключить 
			</div>		 										 
		</div>`;
		
		return str;	
	}

	htmlJoinGroup()
	{
		let str =
		`<div nameId="rp_wrap_add_group" style="display: none;">
			<div class="button1 button_gradient_1" nameId="button_deactive_add_group" style="border-color: #ff0000">
				закрыть	
			</div>
			
			<div class="right_panel_1_1_list" nameId="rp_add_group"></div>
			
			<div class="button1 button_gradient_1" nameId="button_add_group">
				сгруппировать	
			</div>	
		</div>`;

		return str;	
	}
	
	htmlJoinPoint()
	{
		let str =
		`<div nameId="rp_wrap_obj_align" style="display: none;">
			<div class="button1 button_gradient_1" nameId="button_deactive_join_element" style="border-color: #ff0000">
				закрыть	
			</div>

			<div class="right_panel_1_1_list" nameId="rp_obj_align"></div>
			
			<div class="button1 button_gradient_1" nameId="join_element">
				подключить	
			</div>			
		</div>`;

		return str;	
	}
	
	
	// вкл/выкл возможность добавить точку на трубу при клике на нее
	switchAddPointOnTube({type} = {})
	{
		if(type == 'off')
		{
			infProject.settings.active.tube = null;
			infProject.tools.pivot.visible = true;			
		}
		else if(!infProject.settings.active.tube) 
		{ 
			infProject.settings.active.tube = 'add_point_wf';
			infProject.tools.pivot.visible = false;
		}
		else 
		{ 
			infProject.settings.active.tube = null;
			infProject.tools.pivot.visible = true;
		}

		let color = "#b3b3b3";
		if(infProject.settings.active.tube == 'add_point_wf') color = "#ff0000";	// вкл режим добавления точки на трубу
			
		this.el.querySelector('[nameId="butt_add_point_on_tube"]').style.borderColor = color;
		
		this.render()
	}
	
	setGroupObjs({arr} = {arr: []})
	{
		this.groupObjs = arr;
	}

	// сравниваем 2 массива (если кликнули, по новому объекту (с группой или без) и он равен, то не стераем список объектов)
	isEqualListChilds({arr = []})
	{
		let objs = this.groupObjs;
		if(objs.length == 0) return false;
		
		let count = 0;
		
		for (let i = 0; i < arr.length; i++)
		{
			for (let i2 = 0; i2 < objs.length; i2++)
			{
				if(arr[i] == objs[i2]) 
				{
					count++;
					break;
				}								
			}
		}


		return count == objs.length;
	}
	
	// вставляем текстовые значения в выбранные div 
	update({inf})
	{
		let list = this.list.upd;
		
		for (let key in inf) 
		{
			if(list[key]) 
			{
				let value = inf[key];
				if(list[key].nodeName == 'DIV') list[key].innerText = value;
				if(list[key].nodeName == 'INPUT') list[key].value = value;
				
				//console.log(value, key, list[key].nodeName);
			}
			
		}		
	}

	show({inf})
	{	
		this.showElems({inf: inf});
		
		this.el.style.display = '';
	}
	
	// показываем заданные div 
	showElems({inf})
	{
		let list = this.list.div;
		
		for (let i = 0; i < inf.length; i++)
		{
			if(list[inf[i]]) 
			{
				list[inf[i]].style.display = '';				
			}				
		}		
	}
	
	// скрываем все div и очищаем список с объектами
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
	
	render()
	{
		renderCamera();
	}	
}




