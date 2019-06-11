<? 

$url = $_SERVER['REQUEST_URI'];

$path = "/gl/";

$title = 'калькулятор площади пола онлайн';
$interface['wall_1'] = 1;
$interface['estimate'] = 1;
$interface['click_wall_2D'] = 0;
$interface['wd_1'] = 0;
$interface['form_1'] = 0;
$interface['wall_plaster_width_1'] = 0;
$interface['monolit_fundament'] = 0;
$interface['lentochnii_fundament'] = 0;
$interface['svaynyy_fundament'] = 0;
$interface['ploshchad_uchastka'] = 0;
$interface['obyem_pomeshcheniya'] = 0;
$interface['raschet_kirpicha'] = 0;
$interface['raschet_blokov'] = 0;

	

if($url == '/calculator/monolit_fundament' || $url == '/calculator/monolit_fundament1')	
{ 
	$title = 'Калькулятор монолитного фундамента 3D'; 
	$nameId = 'монолитный фундамент'; 
	$interface['monolit_fundament'] = 1; 
	$interface['wall_1'] = 1;
	$interface['click_wall_2D'] = 1;
	$interface['form_1'] = 1;
}
if($url == '/calculator/lentochnii_fundament')	
{ 
	$title = 'Калькулятор ленточного фундамента 3D'; 
	$nameId = 'ленточный фундамент'; 
	$interface['lentochnii_fundament'] = 1;
	$interface['wall_1'] = 1;
	$interface['click_wall_2D'] = 1;
	$interface['form_1'] = 1;
}
if($url == '/calculator/svaynyy_fundament')	
{ 
	$title = 'Свайный фундамент калькулятор 3D'; 
	$nameId = 'свайный фундамент';
	$interface['svaynyy_fundament'] = 1;
	$interface['wall_1'] = 1;
	$interface['click_wall_2D'] = 1;
	$interface['form_1'] = 1;
}
if($url == '/calculator/obyem_pomeshcheniya')	
{ 
	$title = 'Калькулятор объема и площади помещения 3D'; 
	$nameId = 'объем и площадь помещения'; 
	$interface['wall_1'] = 1;
	$interface['obyem_pomeshcheniya'] = 1;
	$interface['click_wall_2D'] = 1;
	$interface['form_1'] = 1;
}
if($url == '/calculator/ploshchad_uchastka')	
{ 
	$title = 'Расчет площади участка 3D'; 
	$nameId = 'площадь участка'; 
	$interface['estimate'] = 0;	
	$interface['click_wall_2D'] = 1;
}
if($url == '/calculator/shtukaturka_na_stene')	
{ 
	$title = 'Расчет штукатурки на стене 3D'; 
	$nameId = 'штукатурка на стене'; 
	$interface['wall_1'] = 0;
	$interface['wall_plaster_width_1'] = 1;
	$interface['wd_1'] = 1;
}
if($url == '/calculator/raschet_kirpicha')	
{ 
	$title = 'Расчет кирпича для стены 3D'; 
	$nameId = 'расчет кирпича'; 
	$interface['wall_1'] = 0;
	$interface['wd_1'] = 1;
	$interface['raschet_kirpicha'] = 1;
}
if($url == '/calculator/raschet_blokov')	
{ 
	$title = 'Расчет блоков для стены 3D'; 
	$nameId = 'расчет блоков'; 
	$interface['wall_1'] = 0;
	$interface['wd_1'] = 1;
	$interface['raschet_blokov'] = 1;
}
if($url == '/calculator/warm_floor')	
{ 
	$title = 'Расчет теплого пола 3D'; 
	$nameId = 'теплый пол'; 
	$interface['wall_1'] = 0;
}



$infProject = array('url' => $url, 'title' => $title, 'nameId' => $nameId, 'path' => $path, 'load' => [ img => [] ]);
$infProject['scene'] = [ 'tool' => [] ];

$infProject['activeInput'] = '';
$infProject['activeDiv'] = null;

$infProject['settings']['project'] = 'shape3';
$infProject['settings']['height'] = 2.5;
$infProject['settings']['floor'] = [ 'o' => false, 'posY' => 0.1, 'height' => 0.1, 'changeY' => false, 'areaPoint' => 'center', 'material' => null ];
$infProject['settings']['wall'] = [ 'width' => 0.3, 'label' => '', 'dist' => 'center', 'material' => null, 'block' => null ]; 
$infProject['settings']['calc'] = [ 'fundament' => '' ];
$infProject['settings']['land'] = [ 'o' => false ];
$infProject['settings']['unit'] = [ 'wall' => 1, 'floor' => 1 ];
$infProject['settings']['camera'] = [ 'type' => '2d', 'zoom' => 1, 'limitZoom' => 1 ];
$infProject['settings']['grid'] = [ 'value' => 30, 'offset' => 0.5 ];
$infProject['settings']['interface']['button'] = [ 'cam2d' => '2d' ];


if($url == '/calculator/monolit_fundament') 
{ 
	$infProject['settings']['calc']['fundament'] = 'monolit';
	$infProject['settings']['wall']['label'] = 'outside';
	$infProject['settings']['wall']['width'] = 0.03;
	$infProject['settings']['height'] = 0.2;
	$infProject['settings']['floor']['o'] = true;
	$infProject['settings']['floor']['posY'] = 2.5 - 0.01;
	$infProject['settings']['floor']['height'] = 2.5 - 0.01;
	$infProject['settings']['floor']['changeY'] = true;
}
else if($url == '/calculator/lentochnii_fundament')
{ 
	$infProject['settings']['wall']['label'] = 'outside';
	$infProject['settings']['calc']['fundament'] = 'lent';
	$infProject['settings']['height'] = 0.2;
}
else if($url == '/calculator/svaynyy_fundament') 
{ 
	$infProject['settings']['wall']['label'] = 'outside';
	$infProject['settings']['calc']['fundament'] = 'svai';
	$infProject['settings']['height'] = 0.2;
}
else if($url == '/calculator/ploshchad_uchastka') 
{ 
	$infProject['load']['img'] = ['img/load/grass.jpg']; 
	$infProject['settings']['floor']['material'][0] = ['img' => $infProject['load']['img'][0], 'repeat' => ['x' => 0.2, 'y' => 0.2]];
	$infProject['settings']['land']['o'] = true; 
	$infProject['settings']['height'] = 0.2;
	$infProject['settings']['floor']['o'] = true;
	$infProject['settings']['floor']['posY'] = $infProject['settings']['height'] - 0.01;
	$infProject['settings']['floor']['height'] = $infProject['settings']['height'] - 0.01;
	$infProject['settings']['floor']['changeY'] = true;
	$infProject['settings']['wall']['label'] = 'outside';
	$infProject['settings']['wall']['width'] = 0.1;
	$infProject['settings']['wall']['color'][0] = ['index' => 3, 'o' => 0x222222];
	$infProject['settings']['unit']['floor'] = 0.01; 
	$infProject['settings']['camera']['zoom'] = 0.25;
	$infProject['settings']['camera']['limitZoom'] = 5; 
	$infProject['settings']['project'] = 'land';
	$infProject['settings']['grid'] = ['value' => 100, 'offset' => 1];
	$infProject['settings']['interface']['estimate'] = 0;		
}
else if($url == '/calculator/obyem_pomeshcheniya') 
{ 
	$infProject['load']['img'] = ['img/load/kirpich.jpg'];
	$infProject['settings']['project'] = 'plan_area';
	$infProject['settings']['wall']['label'] = 'inside';
	$infProject['settings']['wall']['dist'] = 'inside';
	$infProject['settings']['wall']['material'][0] = ['index' => 1, 'img' => $infProject['load']['img'][0], 'repeat' => ['x' => 0.6, 'y' => 0.6]];
	$infProject['settings']['wall']['material'][1] = ['index' => 2, 'img' => $infProject['load']['img'][0], 'repeat' => ['x' => 0.6, 'y' => 0.6]];
	$infProject['settings']['floor']['o'] = true;
	$infProject['settings']['floor']['areaPoint'] = 'inside';
}	
else if($url == '/calculator/shtukaturka_na_stene') 
{ 
	$infProject['load']['img'] = ['img/load/kirpich.jpg', 'img/load/beton.jpg'];
	$infProject['settings']['project'] = 'wall_plaster';
	$infProject['settings']['camera']['type'] = 'front';
	$infProject['settings']['interface']['button']['cam2d'] = 'front';
	$infProject['settings']['wall']['material'][0] = ['index' => 1, 'img' => $infProject['load']['img'][0], 'repeat' => ['x' => 0.6, 'y' => 0.6]];
	$infProject['settings']['wall']['material'][1] = ['index' => 2, 'img' => $infProject['load']['img'][0], 'repeat' => ['x' => 0.6, 'y' => 0.6]];
	$infProject['settings']['wall']['length'] = 6;
	$infProject['settings']['wall']['width'] = 0.3;
	$infProject['settings']['wall']['height'] = 2.5;
	$infProject['settings']['wall']['plaster'] = ['width' => 0.03];
}
else if($url == '/calculator/raschet_kirpicha') 
{ 
	$infProject['load']['img'] = ['img/load/beton.jpg', 'img/load/one_kirpich.jpg'];
	$infProject['settings']['project'] = 'wall_kirpich';
	$infProject['settings']['camera']['type'] = 'front';
	$infProject['settings']['interface']['button']['cam2d'] = 'front';
	$infProject['settings']['wall']['material'][0] = ['index' => 1, 'img' => $infProject['load']['img'][0], 'repeat' => ['x' => 0.6, 'y' => 0.6]]; 
	$infProject['settings']['wall']['material'][1] = ['index' => 2, 'img' => $infProject['load']['img'][0], 'repeat' => ['x' => 0.6, 'y' => 0.6]];
	
	$infProject['settings']['wall']['block']['size'] = ['x' => 0.25, 'y' => 0.065, 'z' => 0.120];		// размер блока кирпича
	$infProject['settings']['wall']['block']['seam'] = 0.01;
	$infProject['settings']['wall']['block']['layer'] = '0.5';
	$infProject['settings']['wall']['block']['material'] = ['o' => null, 'link' => 'img/load/one_kirpich.jpg'];
}	
else if($url == '/calculator/raschet_blokov') 
{ 
	$infProject['load']['img'] = ['img/load/block_1.jpg', 'img/load/block_1.jpg'];
	$infProject['settings']['project'] = 'wall_block';
	$infProject['settings']['camera']['type'] = 'front';
	$infProject['settings']['interface']['button']['cam2d'] = 'front';
	
	$infProject['settings']['wall']['block']['size'] = ['x' => 0.6, 'y' => 0.2, 'z' => 0.3];		// размер блока кирпича
	$infProject['settings']['wall']['block']['seam'] = 0.005;
	$infProject['settings']['wall']['block']['layer'] = '0.5';
	$infProject['settings']['wall']['block']['material'] = ['o' => null, 'link' => 'img/load/block_1.jpg'];
}
else if($url == '/calculator/warm_floor')
{
	$infProject['settings']['project'] = '';
}



$jsonPhp = json_encode($infProject);
?>


<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?=$title?></title>

	<link rel="stylesheet" href="<?=$path?>css/style.css"> 
</head>

<body>


<?php $vrs = '=2' ?>

	
<script>
	var vr = "<?=$vrs ?>";
	
	var infProject = JSON.parse('<?=$jsonPhp?>');
	
	console.log(infProject);
	
	


	
	console.log('version '+ vr);
    console.log('infProject ', infProject, <?=$interface['estimate']?>);
	
</script>

    <script src="<?=$path?>js/three.min.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/jquery.js"></script>
    <script src="<?=$path?>js/ThreeCSG.js"></script>       
    
	<script src="<?=$path?>meshBSP.js"></script> 	
    <script src="<?=$path?>calculationArea.js?<?=$vrs?>"></script>
    
	<script src="<?=$path?>block/createWallBlock.js?<?=$vrs?>"></script>
	<script src="<?=$path?>block/createWallPlaster.js?<?=$vrs?>"></script>
	
	<?if($url == '/calculator/warm_floor'){?> <script src="<?=$path?>block/floorWarm.js?<?=$vrs?>"></script> <?}?>
	
    <script src="<?=$path?>crossWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>addPoint.js?<?=$vrs?>"></script>
    <script src="<?=$path?>addWindowDoor.js?<?=$vrs?>"></script>
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
	<script src="<?=$path?>changeTexture.js?<?=$vrs?>"></script>

    <script src="<?=$path?>inputWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>label.js?<?=$vrs?>"></script>
  	<script src="<?=$path?>loadPopObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>dragWindowDoorUI.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickActiveObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>activeHover2D.js?<?=$vrs?>"></script>
    
    <script src="<?=$path?>undoRedo.js?<?=$vrs?>"></script>
    <script src="<?=$path?>saveLoad.js?<?=$vrs?>"></script>
		
	
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>
    	
	<script src="<?=$path?>eventKey.js?<?=$vrs?>"></script>
	


	
	<? include("include/top_1.php");  ?>	
	 
	<? include("include/left_panel_1.php");  ?>
	
	<? include("include/bottom_panel_1.php");  ?>
	
	<? include("include/modal_window_1.php");  ?>
	
	<!--<div class="help">
		<div class="button3" data-action ='top_panel_1'>
			<div class="button3-wrap">видеоинструкция</div>
		</div>
	</div>-->
	
	<!--hidden='true'-->
	
	<?if(2 == 1){?>
	<div class="right_panel_1" data-action ='right_panel_1'>			
		<a href="/calculator/monolit_fundament" class="link_page_1">монолитный<br>фундамент</a>
		<a href="/calculator/lentochnii_fundament" class="link_page_1">ленточный<br>фундамент</a>
		<a href="/calculator/svaynyy_fundament" class="link_page_1">свайный<br>фундамент</a>
	</div>	
	<?}?>
	

	
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