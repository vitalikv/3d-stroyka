<? require_once("include/bd.php");  ?>
<?php $vrs = '=9' ?>

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
	<script src="<?=$path?>js/OBJLoader.js"></script>
	<script src="<?=$path?>js/MTLLoader.js"></script>   
	
	<script src="<?=$path?>js/dp/EffectComposer.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/CopyShader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/RenderPass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/ShaderPass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/OutlinePass.js?<?=$vrs?>"></script>
	
	<script src="<?=$path?>js/loader/inflate.min.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/loader/FBXLoader.js?<?=$vrs?>"></script>
	
	
	<? if($_SERVER['SERVER_NAME']=='3d-stroyka' && $interface['admin']) 
	{ 
		require_once("admin/catalog/admin_catalog.php");
		require_once("admin/obj/menu_fbx.php");
	} ?>
	
	<div class="frame">
			
		<div class="flex_1 top_panel_1 button_gradient_1" data-action ='top_panel_1'>
			<div class="go_home align_items" nameId="butt_main_menu">
				<div class="go_home_txt">
					Меню
				</div>
			</div>
			<div class="title_1"><h1><?=$h1?></h1></div>
			<!--<div class="top_menu_right_1">
				<div class="top_menu_right_1_text" nameId="save_pr_1">Сохранить</div>
			</div>-->				
		</div>	
		
		<div class="flex_1 height100">
			
			<div style="flex-grow:1; position: relative;">
				<? require_once("include/top_1.php"); ?>
				<? //require_once("include/modal_window_2.php"); ?>				
	
				<noindex>		
				
				<? require_once("include/bottom_panel_1.php"); ?>	
				<? require_once("include/modal_window_3.php"); ?>
					
				
				<div class="help">
					<a href="https://www.youtube.com/watch?v=rqCZYTKqfIE" class="button_youtube button_gradient_1" data-action ='top_panel_1' target="_blank">
						<img src="<?=$path?>/img/button_youtube.png">
						<div style="padding-left:10px;">видеоинструкция</div>
					</a>	
				</div>
				</noindex>
			</div>
			
			<? require_once("include/right_panel_1.php"); ?>
			
		</div>
	
	</div>
	
	
	
	<script src="<?=$path?>meshBSP.js"></script> 	
    <script src="<?=$path?>calculationArea.js?<?=$vrs?>"></script>
	
	<script src="<?=$path?>scaleBox.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickMoveGizmo.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickMovePivot.js?<?=$vrs?>"></script>
    <script src="<?=$path?>crossWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>addPoint.js?<?=$vrs?>"></script>
    <script src="<?=$path?>addWD.js?<?=$vrs?>"></script>
    <script src="<?=$path?>mouseClick.js?<?=$vrs?>"></script>
	<script src="<?=$path?>changeCamera.js?<?=$vrs?>"></script>
    <script src="<?=$path?>moveCamera.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickChangeWD.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickMovePoint.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickMoveWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>clickMoveWD.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickMoveTube.js?<?=$vrs?>"></script>
	<script src="<?=$path?>alignPoint.js?<?=$vrs?>"></script>
    <script src="<?=$path?>deleteObj.js?<?=$vrs?>"></script>
    <script src="<?=$path?>floor.js?<?=$vrs?>"></script>
    <script src="<?=$path?>detectZone.js?<?=$vrs?>"></script>
	<script src="<?=$path?>loadObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>objCenterPoint.js?<?=$vrs?>"></script>
	<script src="<?=$path?>mergeObjToGroup.js?<?=$vrs?>"></script>
	<script src="<?=$path?>groupObj.js?<?=$vrs?>"></script>
	
	<script src="<?=$path?>planeHeight.js?<?=$vrs?>"></script>
	<script src="<?=$path?>substrate.js?<?=$vrs?>"></script>
    <script src="<?=$path?>inputWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>label.js?<?=$vrs?>"></script>  	
	<script src="<?=$path?>clickActiveObj.js?<?=$vrs?>"></script>    
    <script src="<?=$path?>saveLoad.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_obj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_wf.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_plane.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_list_obj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>uiInterface_catalog.js?<?=$vrs?>"></script>
	<script src="<?=$path?>eventClick.js?<?=$vrs?>"></script>
	 
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>    		
	
	<script src="<?=$path?>floorWarm.js?<?=$vrs?>"></script> 
	
	<? if($_SERVER['SERVER_NAME']=='3d-stroyka' && $interface['admin']) 
	{?> 
	<script src="<?=$path?>admin/catalog/admin_catalog.js?<?=$vrs?>"></script> 
	<script src="<?=$path?>admin/obj/adminLoadObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>admin/obj/adminClickObj.js?<?=$vrs?>"></script>
	<?}?>

</body>

<? if($_SERVER['SERVER_NAME']=='xn------6cdcklga3agac0adveeerahel6btn3c.xn--p1ai' && 1==2) {?>
	<script>console.log('Start Metrika', window.location.hostname)</script>
	<!-- Yandex.Metrika counter --><script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter15088201 = new Ya.Metrika({id:15088201, enableAll: true, webvisor:true}); } catch(e) {} }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="//mc.yandex.ru/watch/15088201" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter -->
<?}else{?>
	<script>
	console.log('Stop Metrika', window.location.hostname);
	console.log("<?echo $url?>");
	console.log("<?echo $title?>");
	</script> 
<?}?>

</html>