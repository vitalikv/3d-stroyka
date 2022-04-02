<? require_once("include/bd.php");  ?>
<?php $vrs = '='.time() ?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?=$title?></title>
	<meta name="description" content="<?=$description?>" />
	<link rel="stylesheet" href="<?=$path?>css/style.css?<?=$vrs?>"> 
</head>

<body>
	<script>
		var vr = "<?=$vrs ?>";
		
		var infProject = JSON.parse('<?=$jsonPhp?>');

		console.log('version '+ vr);		
	</script>
	
			
	
    <script src="<?=$path?>js/three.min.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/jquery.js"></script>
    <script src="<?=$path?>js/ThreeCSG.js"></script>       
  
	
	<script src="<?=$path?>js/dp/EffectComposer.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/CopyShader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/RenderPass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/ShaderPass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/OutlinePass.js?<?=$vrs?>"></script>
	

	
	<? if($_SERVER['SERVER_NAME']=='3d-stroyka' && $interface['rtc']) {?> 
	<script src="<?=$path?>js/OBJLoader.js"></script>
	<script src="<?=$path?>js/MTLLoader.js"></script> 	
	<script src="<?=$path?>js/loader/inflate.min.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/loader/FBXLoader.js?<?=$vrs?>"></script>
	<?}?>	
	
	
	<? if($_SERVER['SERVER_NAME']=='3d-stroyka' && $interface['rtc']) 
	{ 
		require_once("admin/catalog/admin_catalog.php");
		require_once("admin/obj/menu_fbx.php");
	} ?>
	
	<div class="frame" nameId="frameG">
			
		<div class="flex_1 top_panel_1 button_gradient_1" data-action ='top_panel_1'>
			<div class="go_home align_items" nameId="butt_main_menu">
				<div class="go_home_txt">
					Меню
				</div>
			</div>
			<div class="title_1"><h1><?=$h1?></h1></div>			
		</div>	
		
		<noindex>
		
		<div class="flex_1 height100">
			
			<div nameId="msDiv_1" style="display: none; position: absolute; left: 50%; top: 50%; border:solid 1px #b3b3b3; background: #fff; padding: 5px 10px; font-family: arial,sans-serif; font-size: 15px; color: #666;">
				
			</div>
			
			<div nameId="mainDiv_1" style="flex-grow:1; position: relative;">
				<? require_once("include/top_1.php"); ?>			
				
						
				
				<? require_once("include/modal_window_3.php"); ?>
				
				<? if($_SERVER['SERVER_NAME']=='3d-stroyka' && $interface['rtc']) 
				{ 
					//require_once("include/modal_window_2.php");
					require_once("include/bottom_panel_1.php");
					
				} ?>					
				
			
				<div class="help">
					<a href="https://youtu.be/kFdMB4p7gbU" class="button1 button_gradient_1" data-action ='top_panel_1' target="_blank">
						<img src="<?=$path?>/img/button_youtube.png">
						<div style="padding-left:10px;">видеоинструкция</div>
					</a>	
				</div>
				
				
				
				
					<div nameId="block_pos" class="block_pos" ui_1="">
						<div style="display: flex;">
							<div style="display: flex; align-items: center;">
								<div class="button1 button_gradient_1" nameId="select_pivot">
									<img src="<?=$path?>/img/move_1.png">
								</div>	
								
								<div class="flex_1 input_rotate">
									<input type="text" nameId="object_pos_X" value="0">
									<input type="text" nameId="object_pos_Y" value="0">
									<input type="text" nameId="object_pos_Z" value="0">
								</div>	
							</div>
							
							<div style="display: flex; align-items: center; margin-left: 40px;">
								<div class="button1 button_gradient_1" nameId="select_gizmo">
									<img src="<?=$path?>/img/rotate_1.png">	
								</div>	

								<div class="flex_1 input_rotate">
									<div class="flex_1" style="position: relative; margin: 0 5px;">
										<div class="button1 button_gradient_1" nameId="obj_rotate_X_90m" style="position: absolute; left: 0; width: 10px;">-</div>
										<input type="text" nameId="object_rotate_X" value="0">
										<div class="button1 button_gradient_1" nameId="obj_rotate_X_90" style="position: absolute; right: 0; width: 10px;">+</div>
									</div>
									
									<div class="flex_1" style="position: relative; margin: 0 5px;">
										<div class="button1 button_gradient_1" nameId="obj_rotate_Y_90m" style="position: absolute; left: 0; width: 10px;">-</div>
										<input type="text" nameId="object_rotate_Y" value="0">
										<div class="button1 button_gradient_1" nameId="obj_rotate_Y_90" style="position: absolute; right: 0; width: 10px;">+</div>
									</div>

									<div class="flex_1" style="position: relative; margin: 0 5px;">
										<div class="button1 button_gradient_1" nameId="obj_rotate_Z_90m" style="position: absolute; left: 0; width: 10px;">-</div>
										<input type="text" nameId="object_rotate_Z" value="0">
										<div class="button1 button_gradient_1" nameId="obj_rotate_Z_90" style="position: absolute; right: 0; width: 10px;">+</div>
									</div>									
									
								</div>	

								<div class="flex_1">
									<div style="width: 20px; height: 2px; background: rgb(247, 72, 72);"></div>
									<div style="width: 20px; height: 2px; background: rgb(17, 255, 0);"></div>
									<div style="width: 20px; height: 2px; background: rgb(72, 116, 247);"></div>
								</div>
													
							
								<div class="button1 button_gradient_1" nameId="obj_rotate_reset">
									сбросить	
								</div>											
							</div>
							
						</div>
					</div>					
				
				
				
				
				
			</div>

			<div nameId="wrap_sborka_1" style="display: none; width: 280px; position: absolute; background: #f1f1f1; border: 1px solid #ccc;">
				<div nameId="list_sborka_1" style="position: relative;"></div>												
			</div>			
					
			
			
			<? require_once("include/right_panel_1.php"); ?>
			
		</div>
		
		</noindex>
		
	</div>
	
	
	
	<script src="<?=$path?>meshBSP.js"></script> 	
    <script src="<?=$path?>calculationArea.js?<?=$vrs?>"></script>
	
	<script src="<?=$path?>scaleBox.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickMoveGizmo.js?<?=$vrs?>"></script>
	<script src="<?=$path?>toolPivot.js?<?=$vrs?>"></script>
	<script src="<?=$path?>toolGizmo.js?<?=$vrs?>"></script>
	<script src="<?=$path?>activePivotGizmo.js?<?=$vrs?>"></script>
    <script src="<?=$path?>crossWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>addPoint.js?<?=$vrs?>"></script>
    <script src="<?=$path?>addWD.js?<?=$vrs?>"></script>
    <script src="<?=$path?>mouseClick.js?<?=$vrs?>"></script>
	<script src="<?=$path?>changeCamera.js?<?=$vrs?>"></script>
	<script src="<?=$path?>cameraView.js?<?=$vrs?>"></script>
    <script src="<?=$path?>moveCamera.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickChangeWD.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickMovePoint.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickMoveWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickMoveWD.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickMoveTube.js?<?=$vrs?>"></script>
	<script src="<?=$path?>alignPoint.js?<?=$vrs?>"></script>
    <script src="<?=$path?>deleteObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>copyObj.js?<?=$vrs?>"></script>
    <script src="<?=$path?>floor.js?<?=$vrs?>"></script>
    <script src="<?=$path?>detectZone.js?<?=$vrs?>"></script>
	<script src="<?=$path?>loadObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>objCenterPoint.js?<?=$vrs?>"></script>
	<script src="<?=$path?>mergeObjToGroup.js?<?=$vrs?>"></script>
	<script src="<?=$path?>groupObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/radiator/st_radiator.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/radiator/al_radiator.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/sgon.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/nippel.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/zaglushka.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/troinik.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/ugol.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/mufta.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/krestovina.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/st/collector.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/pl/troinik.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/pl/ugol.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/pl/mufta.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/pl/krestovina.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/mpl/troinik.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/mpl/perehod.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/mpl/ugol.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/kran/shar_kran.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/kran/reg_kran.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/kotel/zr_nasos.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/kotel/rash_bak.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/kotel/gr_bez.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/kotel/filtr.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/kotel/kotel_1.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/helpT.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/calculation_1.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/calculation_2.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/test.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/start.js?<?=$vrs?>"></script>
	
	<script src="<?=$path?>createObj/sborka/sbr_1.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/sborka/radiator/rad_1.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/sborka/radiator/niz_mp.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/sborka/radiator/verh_mp.js?<?=$vrs?>"></script>
	<script src="<?=$path?>createObj/sborka/radiator/bok_mp.js?<?=$vrs?>"></script>

	<script src="<?=$path?>house.js?<?=$vrs?>"></script>	
	
	<script src="<?=$path?>planeHeight.js?<?=$vrs?>"></script>
	<script src="<?=$path?>substrate.js?<?=$vrs?>"></script>
    <script src="<?=$path?>inputWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>label.js?<?=$vrs?>"></script>  	    
    <script src="<?=$path?>saveLoad.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_obj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_wf.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_plane.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_list_obj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_catalog.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_user_1.js?<?=$vrs?>"></script>
	<script src="<?=$path?>eventClick.js?<?=$vrs?>"></script>
	 
       		
	<script src="<?=$path?>warmTube.js?<?=$vrs?>"></script>
	<script src="<?=$path?>warmTubeGrid.js?<?=$vrs?>"></script>
	<script src="<?=$path?>floorWarm.js?<?=$vrs?>"></script>
	<script src="<?=$path?>ui/select_list_1.js?<?=$vrs?>"></script> 	
	<script src="<?=$path?>ui/slider_2mov.js?<?=$vrs?>"></script> 
	
	
	<script src="<?=$path?>script.js?<?=$vrs?>"></script> 
	
	<? if($_SERVER['SERVER_NAME']=='3d-stroyka' && $interface['rtc']) {?> 
	<script src="<?=$path?>admin/catalog/admin_catalog.js?<?=$vrs?>"></script> 
	<script src="<?=$path?>admin/obj/adminLoadObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>admin/obj/adminLoadHouse.js?<?=$vrs?>"></script>
	<script src="<?=$path?>admin/obj/adminClickObj.js?<?=$vrs?>"></script>
	<?}?>

</body>

<? if($_SERVER['SERVER_NAME']=='xn------6cdcklga3agac0adveeerahel6btn3c.xn--p1ai' && 1==2) {?>
	<script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter15088201 = new Ya.Metrika({id:15088201, enableAll: true, webvisor:true}); } catch(e) {} }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="//mc.yandex.ru/watch/15088201" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<?}else{?>
	<script>
	console.log('test', window.location.hostname);
	</script> 
<?}?>

</html>