



<noindex>
<div class="flex_1 top_panel_2">	
	
	<div class="toolbar" data-action ='top_panel_1'>
		
		<? if(1 == 2){ ?>
		<div class="button1-wrap-2" nameId='top_menu_b1'>		
			
			<div class="button1-wrap-1">
				<div data-action ='create_tube_1' class="button1 button_gradient_1">Труба</div>
			</div>
			<!--<div class="button1-wrap-1">
				<div data-action ='create_tube_box_1' class="button1 button_gradient_1">Контур</div>
			</div>-->			
					
		</div>
		
		<div class="button1-wrap-2" nameId='top_menu_b2'>

			<div class="button1-wrap-1">
				<div data-action ='wall' class="button1 button_gradient_1">Стена</div>
			</div>

			<div class="button1-wrap-1">
				<div data-action ='create_wd_2' class="button1 button_gradient_1">Дверь</div>
			</div>

			<div class="button1-wrap-1">
				<div data-action ='create_wd_3' class="button1 button_gradient_1">Окно</div>
			</div>
		
		</div>		
		
		<div class="button1 button_gradient_1" nameId='showHideWall_1'> 
			Спрятать стены
		</div>		
		<? } ?>
		

		<div class="button1-wrap-1">
			<div data-action ='screenshot' class="button1 button_gradient_1"><img src="<?=$path?>/img/screenshot.png"></div>
		</div>				
	</div> 
	
	<div class="tp_right_1">
	
		<select nameId="camera_button" class="select-css">
			<option class="select-css-1" value ="2D">камера 2D</option>
			<option value ="3D">камера 3D</option>
		</select>	
		
	</div>
	
	
</div>
</noindex>

