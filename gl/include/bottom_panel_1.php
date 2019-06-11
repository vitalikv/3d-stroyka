


<div class="bottom_panel_1" data-action ='top_panel_1'>	

	<?if($interface['click_wall_2D'] == 1){?>
		<div class="toolbar" nameId='wall_menu_1' style="display: none;">
			<div class="toolbar-header">стена</div>
			<div class="toolbar-menu">					
				<div class="button1-wrap">
					<div data-action ='addPointCenterWall' class="button1"><p>Добавить точку</p></div>
				</div>					
				<div class="button1-wrap">
					<div data-action ='deleteObj' class="button1"><img src="<?=$path?>/img/waste.png"></div>
				</div>			
			</div>
		</div>
		
		
		<div class="toolbar" nameId='point_menu_1' style="display: none;">
			<div class="toolbar-header">точка</div>
			<div class="toolbar-menu">
				<div class="button1-wrap">
					<div data-action ='deleteObj' class="button1"><img src="<?=$path?>/img/waste.png"></div>
				</div>			
			</div>
		</div>	
	<?}?>
	
	<?if(2 == 1){?>
	<div class="toolbar" nameId='wall_menu_1' style="display: none;">
		<div class="toolbar-header">стена</div>
		<div class="toolbar-menu">				
			<div class="input-size">
				<div class="text_1">длина (м)</div>
				<input type="text" nameId='size-wall-length' data-input='wall_1' value = 0>
			</div>
			
			<div class="input-size">
				<div class="text_1">высота (м)</div>
				<input type="text" nameId='size-wall-height' data-input='wall_1' value = 0>
			</div>					 
			
			<div class="input-size" style="display: none;">
				<div class="text_1">толщина (м)</div>
				<input type="text" nameId='size-wall-width' data-input='wall_1' value = 0>
			</div>		
		</div>
	</div>		
	<?}?>
	
	<? if($interface['wd_1'] == 1){ ?>
	<div class="toolbar" nameId='wd_menu_1' style="display: none;">
		<div class="toolbar-header">проём</div>
		<div class="toolbar-menu">
			<div class="input-size">
				<div class="text_1">длина (м)</div>
				<input type="text" nameId='size-wd-length' data-input='wd_1' value = 0>
			</div>
			
			<div class="input-size">
				<div class="text_1">высота (м)</div>
				<input type="text" nameId='size-wd-height' data-input='wd_1' value = 0>
			</div>	
							
			<div class="button1-wrap">
				<div data-action ='deleteObj' class="button1"><img src="<?=$path?>/img/waste.png"></div>
			</div>			
		</div>
	</div>	
	<?}?>
</div>	
