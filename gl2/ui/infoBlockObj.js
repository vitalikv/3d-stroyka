


class UI_infoBlockObj
{
	el = null;
	
	
	constructor({nameAttr})
	{
		this.el = document.createElement('div');			
		this.el.innerHTML = this.html();
		this.el = this.el.firstChild;
		
		this.el_parent = document.querySelector('[nameId="wrap_object"]');
		this.el_parent.append(this.el);	
		
		this.assignEvent();		
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
		
		// вкладка со списком объединения в группу
		infProject.elem.rp_wrap_add_group = this.el.querySelector('[nameId="rp_wrap_add_group"]');
		
		// список объединения в группу
		infProject.elem.rp_add_group = this.el.querySelector('[nameId="rp_add_group"]');		
		
		this.el.querySelector('[nameId="butt_add_point_on_tube"]').onmousedown = () => { switchAddPointOnTube(); }	
		this.el.querySelector('[nameId="button_deactive_join_element"]').onmousedown = () => { switchAlignPoint_1({active: false}); }
		this.el.querySelector('[nameId="join_element"]').onmousedown = () => { alignPointToPoint_1(); }
		this.el.querySelector('[nameId="button_deactive_add_group"]').onmousedown = () => { switchSelectAddObjGroup({active: false}); } 
		this.el.querySelector('[nameId="button_add_group"]').onmousedown = () => { addObjToGroup(); } 
	}
	
	html()
	{
		let str = 
		`<div class="flex_column_1" nameId="wrap_object_1" style="display: none; overflow: auto;">
			<div class="right_panel_1_1_h">Объект</div>
							
			<div class="rp_obj">  
			
				<div class="rp_obj_name">
					<input type="text" nameId="rp_obj_name" value="Название">					
				</div>													

				<div nameId="bl_object_3d"> 
					 
					<div nameId="bl_rp_obj_group"> 							 
						 
						<div class="right_panel_1_1_list" nameId="rp_obj_group"> 
							 
						</div> 

						<div nameId="pr_list_button_for_obj" style="display: none;"> 
							 
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
						</div>								 
					 
					</div> 
					 
					<div nameId="pr_list_button_center_point" style="display: none;">  
						<div class="button1 button_gradient_1" nameId="button_active_join_element"> 
							подключить 
						</div>		 										 
					</div>	 

					<div nameId="pr_list_button_for_tube_point1" style="margin: 10px 0; display: none;">								 
						<div nameId="button_active_align_wf_point1" class="button1 button_gradient_1">подключить точку</div>			 
					</div> 
					 
					<div nameId="pr_list_button_for_tube_point2" style="margin: 10px 0; display: none;">								 
						<div nameId="button_active_align_wf_point2" class="button1 button_gradient_1">подключить трубу</div>			 
					</div>															 
					 
					${this.htmlTube()}
					 
				</div>	 
				
				
				<div nameId="rp_wrap_obj_align" style="display: none;">
				
					<div class="button1 button_gradient_1" nameId="button_deactive_join_element" style="border-color: #ff0000">
						закрыть	
					</div>
				
					<div class="right_panel_1_1_list" nameId="rp_obj_align">
						
					</div>	
					<div class="button1 button_gradient_1" nameId="join_element">
						подключить	
					</div>
					
				</div>
				
				
				<div nameId="rp_wrap_add_group" style="display: none;">
					<div class="button1 button_gradient_1" nameId="button_deactive_add_group" style="border-color: #ff0000">
						закрыть	
					</div>							
					<div class="right_panel_1_1_list" nameId="rp_add_group">
						
					</div>
					<div class="button1 button_gradient_1" nameId="button_add_group">
						сгруппировать	
					</div>	
				</div>
				
			</div> 
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

	show()
	{
		console.log(this.el);
		this.el.style.display = '';
	}
	
	hide()
	{
		this.el.style.display = 'none';
	}	
}




