


class UI_infoBlockObj
{
	el = null;
	el_2 = null;
	el_2L = null;
	el_2B = null;
	el_3 = null;
	
	constructor({nameAttr})
	{
		this.el = document.createElement('div');			
		this.el.innerHTML = this.htmlBlock_1();
		this.el = this.el.firstChild;
		
		let el_parent = document.querySelector(nameAttr);
		el_parent.append(this.el);


		this.el_2 = document.createElement('div');			
		this.el_2.innerHTML = this.htmlBlock_2();
		this.el_2 = this.el_2.firstChild;		
		this.el.append(this.el_2);
		
		
		this.el_2L = document.createElement('div');			
		this.el_2L.innerHTML = this.htmlBlock_2_list();
		this.el_2L = this.el_2L.firstChild;		
		this.el_2.append(this.el_2L);

		this.el_2B = document.createElement('div');			
		this.el_2B.innerHTML = this.htmlBlock_2_button();
		this.el_2B = this.el_2B.firstChild;		
		this.el_2.append(this.el_2B);


		this.el_3 = document.createElement('div');			
		this.el_3.innerHTML = this.htmlBlock_3();
		//this.el_3 = this.el_3.firstChild;		
		this.el.append(this.el_3);		
		
		this.assignEvent();		
	}
	
	assignEvent()
	{
		this.el.querySelector('[nameId="button_delete_obj"]').onmousedown = function(e){ detectDeleteObj({obj: clickO.last_obj}); e.stopPropagation(); };
		this.el.querySelector('[nameId="button_copy_obj"]').onmousedown = function(e){ copyObj(); e.stopPropagation(); };
		
		// вкладка со списком объектов в группе 
		if(!infProject.elem) infProject.elem = {};
		infProject.elem.bl_rp_obj_group = this.el.querySelector('[nameId="bl_rp_obj_group"]');

		let elem = this.el.querySelector('[nameId="butt_add_point_on_tube"]');
		console.log(elem, 66);
		elem.addEventListener('mousedown', function() { switchAddPointOnTube(); })		
	}
	
	htmlBlock_1()
	{
		return `<div nameId="bl_object_3d" style="display: none;"></div>`;						
	}

	htmlBlock_2()
	{
		let str = `<div nameId="bl_rp_obj_group"></div>`;				
		
		return str;
	}
	
	htmlBlock_2_list()
	{
		let str = `<div class="right_panel_1_1_list" nameId="rp_obj_group"></div>`;				
		
		return str;
	}

	htmlBlock_2_button()
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
	
	
	htmlBlock_3()
	{
		let str = 
		`<div nameId="pr_list_button_center_point" style="display: none;"> 
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
		
		<div nameId="rp_bl_wf_tube">							
			<div class="flex_1" style="display: none;">
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
				<div nameId="butt_add_point_on_tube" class="button1 button_gradient_1">добавить точку</div>
			</div>						
		</div>`;				
		
		return str;
	}
}




