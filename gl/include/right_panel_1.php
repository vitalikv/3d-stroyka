

<style type="text/css">

.button_catalog_close
{
	position: absolute;
	width: 30px;	
	height: 30px;
	top: 10px;
	right: 10px;
		
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	transform: rotate(-45deg);
	
	font-family: arial,sans-serif;
	font-size: 50px;
	text-align: center;
	text-decoration: none;
	line-height: 0.6em;
	color: #666;
	cursor: pointer;	
}


.button_show_panel_catalog
{
	position: fixed;
	right: 0;
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	list-style: none;
	margin-left: 0;
	padding-left: 0;		
	

	width: 30px;	
	height: 180px;	
	border: 1px solid #b3b3b3; 
	border-radius: 3px;
	background-color:#f1f1f1;		
   
	-webkit-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff; 
	-moz-box-shadow: 0px 0px 2px #bababa,  inset 0px 0px 1px #ffffff;  
	box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff; 	
	
	cursor: pointer;
}

.button_show_panel_catalog_1
{
	margin: auto;
	margin-top: 70px;
	width: 0;
	height: 0;
	border: 0 solid transparent;
	border-top-width: 20px;
	border-bottom-width: 20px;
	border-right: 10px solid #696464;
}


</style>


<script>
$(document).ready(function(){


$('[nameId="button_show_panel_catalog"]').mousedown(function () { showHideCatalogMenuUI({show: true}); });
$('[nameId="button_catalog_close"]').mousedown(function () { showHideCatalogMenuUI({show: false}); });


// скрываем/показываем правое меню UI
function showHideCatalogMenuUI(cdm)
{
	var show = cdm.show;
	
	var block = $('[nameId="panel_catalog_1"]');
	var button = $('[nameId="button_show_panel_catalog"]');
	
	if(show) { block.show(); button.hide(); }
	else { block.hide(); button.show(); }
}




	
});	 
</script>






<div class="right_panel_1" data-action ='right_panel_1' ui_1="" style="z-index: 1;">

	<?if($interface['grid_tube_1'] == 1){?>
	<div class="flex_column_1 right_panel_1_1" nameId="panel_catalog_1">
		<div class="flex_1 bottom_line_1">
			<div class="flex_1 relative_1 right_panel_1_item">
				<div class="right_panel_1_item_block" nameId="button_wrap_object">
					<div class="right_panel_1_item_block_text">
						объект
					</div>	
				</div>			
				<div class="right_panel_1_item_block" nameId="button_wrap_catalog">
					<div class="right_panel_1_item_block_text">
						каталог
					</div>	
				</div>
				<div class="right_panel_1_item_block" nameId="button_wrap_list_obj">
					<div class="right_panel_1_item_block_text">
						список
					</div>	
				</div>			
			</div>
			<div class="button_catalog_close" nameId="button_catalog_close">
				+
			</div>
		</div>
	

		<div nameId="wrap_object">
			<div class="flex_column_1" nameId="wrap_object_1" style="display: block;">
				<div class="right_panel_1_1_h">Объект</div>
				
				
				<div class="rp_obj">  
				
					<div class="rp_obj_name">
						<input type="text" nameId="rp_obj_name" data-input="rp_obj_name" value="Название">					
					</div>
					
					<div class="bottom_line_1">
						<div class="flex_1 relative_1">		
							<div class="right_panel_1_item_block" nameId="button_wrap_obj_child">
								<div class="right_panel_1_item_block_text">
									Группа
								</div>	
							</div>	
							<div class="right_panel_1_item_block" nameId="button_wrap_obj_center">
								<div class="right_panel_1_item_block_text">
									Центр
								</div>	
							</div>								
						</div>
					</div>
					
					<div nameId="wrap_obj_center">
						<div class="right_panel_1_1_h">Центр</div>
						<div class="right_panel_1_1_list" nameId="rp_obj_center">
							
						</div>
					</div>
					
					<div nameId="wrap_obj_child" style="display: none;">
						<div class="right_panel_1_1_h">Группа</div>
						<div class="right_panel_1_1_list" nameId="rp_obj_group">
							
						</div>
					</div>	


					<div class="flex_1">		
						<div class="button1 button_gradient_1" data-action ='select_pivot'>
							перемещение	
						</div>	
						<div class="button1 button_gradient_1" data-action ='select_gizmo'>
							вращение	
						</div>								
					</div>
					
					
				</div> 
			</div>	
		</div>

		
		<div class="flex_column_1" nameId="wrap_list_obj" style="display: none;">
			<div class="right_panel_1_1_h">Список материалов</div>
			
			<div class="right_panel_1_1_list" list_ui="wf">
				
				<?if(1 == 2){?>
				<div class="right_panel_1_1_list_item">
					<div class="right_panel_1_1_list_item_color"></div>
					<div class="right_panel_1_1_list_item_text">
						труба 20
					</div>	
					<div class="right_panel_1_1_list_item_text">
						3.2м
					</div>				
				</div>
				<?}?>
				
			</div>
		</div>
		
		
		<div class="flex_column_1" nameId="wrap_catalog" style="display: none;">
			<div class="right_panel_1_1_h">Каталог</div>
			
			<div class="right_panel_1_1_list" list_ui="catalog">
				
			</div>
		</div>
		
	</div>
	
	
	<div class="button_show_panel_catalog" nameId="button_show_panel_catalog" style="display: none;">
		<div class="button_show_panel_catalog_1">		
		</div>	
	</div>
	<?}?>

	
</div>
