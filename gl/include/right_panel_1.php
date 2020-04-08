

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


.block_rp_1
{
	width: 200px;
	height: 40px;
}

.block_rp_text
{
	margin-left: 5px;
	font-family: arial,sans-serif;
	font-size: 14px;
	color: #666;
	text-decoration: none;

	outline: none;
}



<!--   ------------>


	.substrate
	{
		z-index: 100;
		
		position:fixed; 
		left:0; 
		top:70px;
		width: 200px; 
		height: auto; 
		background-color:#ffffff;
		border:1px solid #e6e4e4;		
	}
	

	.input_load_substrate
	{
		opacity: 0;
		visibility: hidden;
		position: absolute;		
	}	

	.prew_substrate 
	{
		width: 200px; 
		min-height: 100px;
		max-height: 150px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;		
	}
	
	.prew_substrate img
	{
		display: block;	
		width: 200px;
		min-height: 100px;
		max-height: 150px;		
		margin: auto; 
		-o-object-fit: contain;
		object-fit: contain;			
	}

	.substrate input
	{
		display: block;
		margin: 10px auto;
		width: 90%;
			
		font-size: 18px;
		text-align: center;
		color: #666;
		
		text-decoration: none;
		line-height: 2em;
		padding: 0;
		
		border: 1px solid #ccc;
		border-radius: 3px;
		background-color:#fff;	
	}
	
	.substrate .flex_1 input
	{
		width: 100px;
	}	
	
	.substrate .block_1
	{
		margin: 10px auto;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
	
	.pr_plane_text_1
	{
		width: 100%;
		padding-top: 10px;
		border-top: 1px solid #b3b3b3;
		font-family: arial,sans-serif;
		font-size: 15px;
		text-align: center;
		color: #666;	
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


//  substrate
$('#load_substrate_1').change(readURL);	
$('[nameId="assign_size_substrate"]').mousedown(function () { assignSizeSubstrate(); });


$('[nameId="input_rotate_substrate_45"]').mousedown(function () { setRotateSubstrate({angle: 45}); });
$('[nameId="input_rotate_substrate_90"]').mousedown(function () { setRotateSubstrate({angle: 90}); });


$('[nameId="input_transparency_substrate"]').on("input", function() { setTransparencySubstrate({value: $(this).val()}); }); 


// загрузка img  с компьютера
function readURL(e) 
{
	if (this.files[0]) 
	{		
		if (this.files[0].type == "image/png" || this.files[0].type == "image/jpeg")
		{
			var reader = new FileReader();
			reader.onload = function (e) 
			{
				$('#upload-img').attr('src', e.target.result);						
				
				setImgCompSubstrate({image: e.target.result});					
			}				

			reader.readAsDataURL(this.files[0]);  					
		}				
	}
}	 
//  substrate


$('[nameId="rp_plane_1"]').mousedown(function (e) { clickItemFloorUI(); });
	
});	 
</script>






<div class="right_panel_1" data-action ='right_panel_1' ui_1="" style="z-index: 1;">

	<?if($interface['grid_tube_1'] == 1){?>
	<div class="flex_column_1 right_panel_1_1" nameId="panel_catalog_1">
		<div class="flex_1 bottom_line_1">
			<div class="flex_1 relative_1 right_panel_1_item">
				<div class="right_panel_1_item_block" nameId="button_wrap_plan">
					<div class="right_panel_1_item_block_text">
						план
					</div>	
				</div>			
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
	
	
		<div class="flex_column_1" nameId="wrap_plan" style="display: none;">
			<div class="right_panel_1_1_h">План</div>
			
				<div class="right_panel_1_1_list rp_height_150px" nameId="rp_plane_1">
					<div nameId="rp_plane_2">
					</div>
					<div nameId="rp_plane_3">
					</div>					
				</div>
				
				<div nameId="block_substrate_wrap" style="display: none;">  


					<div nameId="block_substrate_1" style="display: none;">
					
						<div class="rp_obj_name" style="margin:20px auto;">
							<input type="text" nameId="rp_floor_name" value="Название">	 				
						</div>
							

						<div class="flex_1">
							<div class="flex_1 align_items">
								<div class="rp_label_plane">
									высота
								</div>
							</div>
							<div class="flex_1 align_items" style="width: auto;">
								<input type="text" nameId="rp_height_plane" style="width: 90%; margin:5px 5px;" value=0>
							</div>
						</div>				
						
						<div style="margin-top: 20px;">				
							<div class="button1 button_gradient_1" nameId="button_delete_plane">
								удалить этаж	
							</div>					
						</div>					
					
					
					</div>
					
					<div nameId="block_substrate_2" style="display: none;">

						<div class="substrate" nameId="substrate" style="display: block;">

							<input name="file" type="file" accept="image/x-png,image/jpeg" id="load_substrate_1" class="input_load_substrate">
							<label for="load_substrate_1" class="button1 button_gradient_1" nameId="load_img_1">		
								загрузить план
							</label>

							<div class="prew_substrate" style="margin: auto;">
								<img src="#" id="upload-img" alt=""/>
							</div>
							
							<div>
								<div class="pr_plane_text_1">
									прозрачность
								</div>	
								<input type="range" nameId="input_transparency_substrate" min="1" max="100" value="100">
							</div>	
							
							<div class="block_1" style="display: none;">
								<div class="pr_plane_text_1">
									вращение
								</div>
								
								<div class="flex_1">
									<input type="text" nameId="input_rotate_substrate" value=0>
									<div class="button1 button_gradient_1" nameId="input_rotate_substrate_45">
										45
									</div>

									<div class="button1 button_gradient_1" nameId="input_rotate_substrate_90">
										90
									</div>	
								</div>
							</div>	
							
							<div class="flex_1">
								<div class="flex_1 align_items">
									<div class="rp_label_plane">
										реальная длина
									</div>
								</div>
								<div class="flex_1 align_items" style="width: auto;">
									<input type="text" nameId="input_size_substrate" style="width: 90%; margin:5px 5px;" value=0>
								</div>
							</div>
							
							<div class="button1 button_gradient_1" nameId="assign_size_substrate">
								применить
							</div>			
											
						</div>			

					</div>
					
				
				</div>
				

		</div>
		
		
		<div nameId="wrap_object">
			<div class="flex_column_1" nameId="wrap_object_1" style="display: none; overflow: auto;">
				<div class="right_panel_1_1_h">Объект</div>
				
				
				<div class="rp_obj">  
				
					<div class="rp_obj_name">
						<input type="text" nameId="rp_obj_name" value="Название">					
					</div>
							

					<div class="flex_1 bottom_line_1">
						<div class="flex_1 relative_1">			
							<div class="right_panel_1_item_2_block" nameId="button_obj_tool_pivot">
								<div class="right_panel_1_item_block_text">
									перемещение
								</div>	
							</div>
							<div class="right_panel_1_item_2_block" nameId="button_obj_properties">
								<div class="right_panel_1_item_block_text">
									параметры
								</div>	
							</div>							
						</div>
					</div>



					<div nameId="rp_bl_obj_tool_pivot">
					
						<div class="flex_1 w_1">
							
							<div class="button1 button_gradient_1" nameId="select_pivot">
								<img src="<?=$path?>/img/move_1.png">	
							</div>	
							<div class="button1 button_gradient_1" nameId="select_gizmo">
								<img src="<?=$path?>/img/rotate_1.png">	
							</div>	
							
							
							
							<select name="fruit">
							<option value ="none">Глобально</option>
							<option value ="guava">Локально</option>
							</select>
							
						</div>

						<div class="flex_1 input_rotate">
							<input type="text" nameId="object_rotate_X" value="0">
							<input type="text" nameId="object_rotate_Y" value="0">
							<input type="text" nameId="object_rotate_Z" value="0">
						</div>
						
						<div class="flex_1 input_rotate">
							<input type="text" nameId="object_pos_X" value="0">
							<input type="text" nameId="object_pos_Y" value="0">
							<input type="text" nameId="object_pos_Z" value="0">
						</div>					
					
						<div class="button1 button_gradient_1" nameId="obj_rotate_reset">
							reset	
						</div>					
					
					</div>
					
					
					<div nameId="rp_bl_obj_properties">	
					
						<div nameId="rp_bl_wf_point" style="display: none;">
							
							<div class="flex_1">
								<div class="flex_1 align_items">
									<div class="rp_label_plane">
										длина (м)
									</div>
								</div>
								<div class="flex_1 align_items" style="width: auto;">
									<input type="text" nameId="size_tube_dist_4" style="width: 90%; margin:5px 5px;" value=0>
								</div>
							</div>											
					
							<div style="margin: 10px 0;">
								<div nameId="button_active_align_wf_point" class="button1 button_gradient_1">выровнить</div>
								
								<div nameId="rp_wrap_align_wf_point" style="display: none;">
									<div class="right_panel_1_1_list" nameId="rp_list_align_wf_point">
										
									</div>	
									<div class="button1 button_gradient_1" nameId="button_done_align_wf_point">
										выровнить	
									</div>
								</div>							
							</div>
							
							<div style="margin: 10px 0;">
								<div data-action ='deleteObj' class="button1 button_gradient_1">удалить</div>
							</div>
						</div>
						
						
						<div nameId="rp_bl_wf_tube" style="display: none;">
							
							<div class="flex_1">
								<div class="flex_1 align_items">
									<div class="rp_label_plane">
										диаметр (мм)
									</div>
								</div>
								<div class="flex_1 align_items" style="width: auto;">
									<input type="text" nameId="size_tube_diameter_2" style="width: 90%; margin:5px 5px;" value=0>
								</div>
							</div>

							<div class="flex_1">
								<div class="flex_1 align_items">
									<div class="rp_label_plane">
										длина (м)
									</div>
								</div>
								<div class="flex_1 align_items" style="width: auto;">
									<input type="text" nameId="size_tube_dist_4" style="width: 90%; margin:5px 5px;" value=0>
								</div>
							</div>						
							
							<div class="flex_1">
								<div class="flex_1 align_items">
									<div class="rp_label_plane">
										цвет
									</div>
								</div>
								<div class="flex_1 align_items" style="width: auto;">
									<input type="text" nameId="color_tube_1_default" style="width: 90%; margin:5px 5px; background-color:#cfcfcf; cursor: pointer;" value=''>
								</div>
							</div>					 

							<div class="toolbar-menu" nameId='bb_menu_tube_menu_2' style="display: none;">
								<div class="color_tube_1_change" color_tube_1_change='e5e5e5' style="background-color:#e5e5e5;"></div>
								<div class="color_tube_1_change" color_tube_1_change='0252f2' style="background-color:#0252f2;"></div>
								<div class="color_tube_1_change" color_tube_1_change='f2b202' style="background-color:#f2b202;"></div> 
								<div class="color_tube_1_change" color_tube_1_change='9602f2' style="background-color:#9602f2;"></div>
								<div class="color_tube_1_change" color_tube_1_change='f202e2' style="background-color:#f202e2;"></div>
								<div class="color_tube_1_change" color_tube_1_change='828282' style="background-color:#828282;"></div>
								<div class="color_tube_1_change" color_tube_1_change='141414' style="background-color:#141414;"></div>
							</div>
			
							<div style="margin: 10px 0;">
								<div nameId="butt_add_point_on_tube" class="button1 button_gradient_1">добавить точку</div>
							</div>
							
							<div style="margin: 10px 0;">
								<div data-action ='deleteObj' class="button1 button_gradient_1">удалить</div>
							</div>
						</div>					
						
						<div nameId="bl_object_3d" style="display: none;">
							
							
							<div nameId="rp_wrap_obj_align" style="display: none;">
							
								<div class="button1 button_gradient_1" nameId="button_deactive_join_element" style="border-color: #ff0000">
									закрыть	
								</div>
							
								<div class="right_panel_1_1_list" nameId="rp_obj_align">
									
								</div>	
								<div class="button1 button_gradient_1" nameId="join_element">
									выровнить	
								</div>
								
							</div>
							
							
							<div nameId="rp_wrap_add_group" style="display: none;">
								<div class="button1 button_gradient_1" nameId="button_deactive_add_group" style="border-color: #ff0000">
									закрыть	
								</div>							
								<div class="right_panel_1_1_list" nameId="rp_add_group">
									
								</div>
								<div class="button1 button_gradient_1" nameId="button_add_group">
									объединить	
								</div>	
							</div>
							
							
							<div nameId="bl_rp_obj_group"> 
							
								<div class="flex_1">
									<div class="flex_1 align_items block_rp_1">
										<div class="checkbox_1" nameId="box_input_group">
											<div class="checkbox_1_checked" nameId="box_input_checked_group"></div>						
										</div>
										<div class="block_rp_text">Группа</div>						
									</div>
									
									<div class="flex_1 align_items block_rp_1">
										<div class="checkbox_1" nameId="show_hide_join_point">
											<div class="checkbox_1_checked" nameId="show_join_point_checked" style="display: block;"></div>						
										</div>
										<div class="block_rp_text">Показать точки</div>						
									</div>						
								</div>
								
								<div class="right_panel_1_1_list" nameId="rp_obj_group">
									
								</div>									
							
							</div>
							
														
							
							<div nameId="pr_list_button_for_obj"> 
								<div class="button1 button_gradient_1" nameId="button_active_join_element">
									выровнить	
								</div>
								
								<div class="button1 button_gradient_1" nameId="button_active_add_group">
									объединить	
								</div>
								
								<div class="button1 button_gradient_1" nameId="button_copy_obj">
									копировать	
								</div>
								
								<div class="button1 button_gradient_1" nameId="button_detach_obj_group">
									отделить	
								</div>							

								<div class="button1 button_gradient_1" nameId="button_delete_obj">
									удалить	
								</div>
								
								<div class="button1 button_gradient_1" nameId="button_save_obj" style="margin-top: 40px;">
									сохранить	
								</div>								
							</div>
							
						</div>	

					</div>
					
				</div> 
			</div>	
		</div>

		
		<div class="flex_column_1 relative_1 height100" nameId="wrap_list_obj" style="display: none;">
			<div class="right_panel_1_1_h">Список материалов</div>
			
			<div class="right_panel_2_1_list" list_ui="wf">
				
				<?if(1 == 2){?>
				<div class="flex_1 right_panel_1_1_list_item">
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
		
		
		<div class="flex_column_1 relative_1 height100" nameId="wrap_catalog" style="display: none;">
			<div class="right_panel_1_1_h">Каталог</div>
			
			<div class="right_panel_2_1_list" list_ui="catalog">
				
			</div>
		</div>
		
	</div>
	
	
	<div class="button_show_panel_catalog" nameId="button_show_panel_catalog" style="display: none;">
		<div class="button_show_panel_catalog_1">		
		</div>	
	</div>
	<?}?>

	
</div>
