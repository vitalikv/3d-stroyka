<? include("include/bd.php");  ?>
<?php $vrs = '=3' ?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?=$title?></title>

	<link rel="stylesheet" href="<?=$path?>css/style.css?<?=$vrs?>"> 
	<link rel="stylesheet" href="<?=$path?>css/toggle.css?<?=$vrs?>">
</head>

<body>
	<script>
		var vr = "<?=$vrs ?>";
		
		var infProject = JSON.parse('<?=$jsonPhp?>');

		console.log('version '+ vr);		
	</script>
	
	<? include("include/top_1.php");  ?>		 
	<? include("include/left_panel_1.php");  ?>	
	<? include("include/bottom_panel_1.php");  ?>	
	<? include("include/modal_window_1.php");  ?>
	
	
	<div class="help" style=" z-index: 1;">
		<a href="https://www.youtube.com/watch?v=rqCZYTKqfIE" class="button_youtube" data-action ='top_panel_1' target="_blank">
			<img src="<?=$path?>/img/button_youtube.png">
			<div style="padding-left:10px;">видеоинструкция</div>
		</a>
	</div>		
	
	<?if(2 == 1){?>
	<!--hidden='true'-->
		
	<div class="right_panel_1" data-action ='right_panel_1'>			
		<a href="/calculator/monolit_fundament" class="link_page_1">монолитный<br>фундамент</a>
		<a href="/calculator/lentochnii_fundament" class="link_page_1">ленточный<br>фундамент</a>
		<a href="/calculator/svaynyy_fundament" class="link_page_1">свайный<br>фундамент</a>
	</div>	
	<?}?>	
	
    <script src="<?=$path?>js/three.min.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/jquery.js"></script>
    <script src="<?=$path?>js/ThreeCSG.js"></script>       
    
	<script src="<?=$path?>meshBSP.js"></script> 	
    <script src="<?=$path?>calculationArea.js?<?=$vrs?>"></script>
    
	<script src="<?=$path?>block/createWallBlock.js?<?=$vrs?>"></script>
	<script src="<?=$path?>block/createWallPlaster.js?<?=$vrs?>"></script>
	<script src="<?=$path?>block/createGrid.js?<?=$vrs?>"></script>
	
	
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
    <script src="<?=$path?>deleteObj.js?<?=$vrs?>"></script>
    <script src="<?=$path?>floor.js?<?=$vrs?>"></script>
    <script src="<?=$path?>detectZone.js?<?=$vrs?>"></script>

    <script src="<?=$path?>inputWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>label.js?<?=$vrs?>"></script>  	
	<script src="<?=$path?>clickActiveObj.js?<?=$vrs?>"></script>    
    <script src="<?=$path?>saveLoad.js?<?=$vrs?>"></script>
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>    		
	
	<?if($url == '/calculator/warm_floor'){?> <script src="<?=$path?>block/floorWarm.js?<?=$vrs?>"></script> <?}?>

	
	<script src="<?=$path?>eventClick.js?<?=$vrs?>"></script>	

</body>

<? if($_SERVER['SERVER_NAME']=='remstok2.ru') {?>
	<script>console.log('Start Metrika', window.location.hostname)</script>
	<!-- Yandex.Metrika counter --><script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter11007949 = new Ya.Metrika({id:11007949, webvisor:true, clickmap:true, trackLinks:true, accurateTrackBounce:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="//mc.yandex.ru/watch/11007949" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter -->
<?}else{?>
	<script>
	console.log('Stop Metrika', window.location.hostname);
	console.log("<?echo $url?>");
	console.log("<?echo $title?>");
	</script> 
<?}?>

</html>