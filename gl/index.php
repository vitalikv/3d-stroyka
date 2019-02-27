<? 

$url = $_SERVER['REQUEST_URI'];

$path = "/gl/";

$title = 'калькулятор площади пола онлайн';
$interface['estimate'] = 1;
$interface['width_1'] = 1;
$interface['height_1'] = 1;
	
if($url == '/calculator/area_apartment')	{ $title = 'Калькулятор площади квартиры онлайн 3D'; }

if($url == '/calculator/monolit_fundament')	{ $title = 'Калькулятор монолитного фундамента 3D'; $nameId = 'монолитный фундамент'; $interface['width_1'] = 0; }
if($url == '/calculator/monolit_fundament1')	{ $title = 'Калькулятор монолитного фундамента 3D'; $nameId = 'монолитный фундамент'; $interface['width_1'] = 0; }
if($url == '/calculator/lentochnii_fundament')	{ $title = 'Калькулятор ленточного фундамента 3D'; $nameId = 'ленточный фундамент'; }
if($url == '/calculator/svaynyy_fundament')	{ $title = 'Свайный фундамент калькулятор 3D'; $nameId = 'свайный фундамент'; }
if($url == '/calculator/obyem_pomeshcheniya')	
{ 
	$title = 'Калькулятор объема и площади помещения 3D'; 
	$nameId = 'объем и площадь помещения'; 
}
if($url == '/calculator/ploshchad_uchastka')	
{ 
	$title = 'Расчет площади участка 3D'; 
	$nameId = 'площадь участка'; 
	$interface['estimate'] = 0; 
	$interface['width_1'] = 0;
	$interface['height_1'] = 0;
}
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


<?php $vrs = '=1' ?>

	
<script>
	var vr = "<?=$vrs ?>";
	
	var infProject = { title : '<?=$title?>', nameId : '<?=$nameId?>', scene : { tool : {} } };
	infProject.settings = {};
	infProject.path = '<?=$path?>';
	
	infProject.settings.project = 'shape3';
	infProject.settings.height = 2.5;
	infProject.settings.floor = { o: false, posY: 0.1, height : 0.1, changeY: false, areaPoint: 'center' }
	infProject.settings.wall = { width : 0.3, label : 'outside', dist : 'center' } 
	infProject.settings.calc = { fundament: '' }
	infProject.settings.land = { o: false }
	infProject.settings.unit = { wall: 1, floor: 1 }
	infProject.settings.camera = { type: '2d', zoom: 1, limitZoom : 1 }
	infProject.settings.grid = { value: 30, offset : 0.5 }
	infProject.settings.interface = { estimate:1 }
	
	if(infProject.nameId == 'монолитный фундамент') 
	{ 
		infProject.settings.calc.fundament = 'monolit';
		infProject.settings.wall.width = 0.03;
		infProject.settings.height = 0.2;
		infProject.settings.floor.o = true;
		infProject.settings.floor.posY = infProject.settings.height;
		infProject.settings.floor.height = infProject.settings.height;
		infProject.settings.floor.changeY = true;
	}
	else if(infProject.nameId == 'ленточный фундамент')
	{ 
		infProject.settings.calc.fundament = 'lent';
		infProject.settings.height = 0.2;
	}
	else if(infProject.nameId == 'свайный фундамент') 
	{ 
		infProject.settings.calc.fundament = 'svai';
		infProject.settings.height = 0.2;
	}
	else if(infProject.nameId == 'площадь участка') 
	{ 
		infProject.settings.land.o = true; 
		infProject.settings.height = 0.2;
		infProject.settings.floor.o = true;
		infProject.settings.floor.posY = infProject.settings.height;
		infProject.settings.floor.height = infProject.settings.height;
		infProject.settings.floor.changeY = true;		
		infProject.settings.wall.width = 0.1;
		infProject.settings.unit.floor = 0.01; 
		infProject.settings.camera.zoom = 0.25;
		infProject.settings.camera.limitZoom = 5; 
		infProject.settings.project = 'land';
		infProject.settings.grid = { value: 100, offset : 1 }
		infProject.settings.interface.estimate = 0;		
	}
	else if(infProject.nameId == 'объем и площадь помещения') 
	{ 
		infProject.settings.wall.label = 'inside';
		infProject.settings.wall.dist = 'inside';
		infProject.settings.floor.o = true;
		infProject.settings.floor.areaPoint = 'inside';
	}	
	
	console.log('version '+ vr);
    console.log('infProject ', infProject, <?=$interface['estimate']?>);
	
</script>

    <script src="<?=$path?>js/three.min.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/jquery.js"></script>
    <script src="<?=$path?>js/ThreeCSG.js"></script>       
    
    <script src="<?=$path?>calculationArea.js?<?=$vrs?>"></script>
    
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
	
	<script src="<?=$path?>clickActiveObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>activeHover2D.js?<?=$vrs?>"></script>
    
    <script src="<?=$path?>undoRedo.js?<?=$vrs?>"></script>
    <script src="<?=$path?>saveLoad.js?<?=$vrs?>"></script>
		
	
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>
    	
	<script src="<?=$path?>eventKey.js?<?=$vrs?>"></script>
	

	<script src="<?=$path?>js/ui.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/postmessage.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/overlay.js?<?=$vrs?>"></script>
	
	
	
	<div class="top_panel_1" data-action ='top_panel_1'>
		<a href="/" class="go-home"><p>На главную</p></a>
		<div class="title_1"><h1><?=$title?></h1></div>
	</div>
	
	<div class="top_panel_2">				
		<div class="toolbar" data-action ='top_panel_1'>	
			<div data-action ='wall' class="button1"><img src="<?=$path?>/img/paint.png"></div>
			<div class="button1-wrap">
				<div data-action ='2D' class="button1">2D</div>
				<div data-action ='3D' class="button1">3D</div>
			</div>
			<? if($interface['estimate'] == 1){ ?>
			<div data-action ='estimate' class="button4">СМЕТА</div>
			<? } ?>
			<div class="button1-wrap">
				<div data-action ='screenshot' class="button1"><img src="<?=$path?>/img/screenshot.png"></div>
			</div>
		</div> 
	</div>	 
	
	
	<!--<div class="help">
		<div class="button3" data-action ='top_panel_1'>
			<div class="button3-wrap">видеоинструкция</div>
		</div>
	</div>-->
	
	<!--hidden='true'-->
	<div class="left_panel_1" data-action ='left_panel_1'  >

		<div class="side_panel-button">			
			<div class="button2" data-action ='form_1'><img src="<?=$path?>/img/f4.png"></div>
		</div> 
		<?if($interface['width_1'] == 1){?>
		<div class="input-height">
			<div class="text_1">ширина (см)</div>
			<input type="text" data-action ='input-width' value = 30>
		</div> 
		<?}?>
		
		<?if($interface['height_1'] == 1){?>
		<div class="input-height">
			<div class="text_1">высота (см)</div>
			<input type="text" data-action ='input-height' value = 20>
		</div>
		<?}?>		
	</div>
	
	
	<div class="right_panel_1" data-action ='right_panel_1'>			
		<a href="/calculator/monolit_fundament" class="link_page_1">монолитный<br>фундамент</a>
		<a href="/calculator/lentochnii_fundament" class="link_page_1">ленточный<br>фундамент</a>
		<a href="/calculator/svaynyy_fundament" class="link_page_1">свайный<br>фундамент</a>
	</div>	
	
	
	
	<div class="modal" data-action ='modal'>
		<div class="modal_wrap">
			<div class="modal_window" data-action ='modal_window'>
				<div class="modal_window_close" data-action ='modal_window_close'>
					+
				</div>
				<div class="modal_header">
					<div class="modal_title">
						<div class="modal_name">
							<div modal_title='form' style="display: block;">Выберете форму</div>
							<div modal_title='estimate' style="display: none;">Смета</div>
						</div>
					</div>					
				</div>
				<div class='modal_body'>
					<div class='modal_body_content' modal_body='estimate' style="display: none;">

					</div>
				
					<div class='modal_body_content' modal_body='form' style="display: block;">
						<div class='modal_body_content_grid'>
						<?
							for ($i=0; $i<15; $i++) 
							{
								echo '
								<div class="block_form_1" link_form = "'.$i.'">
									<div class="block_form_1_image_wrap">
										<img src="'.$path.'/img/f'.$i.'.png">
									</div>
									<div class="block_form_1_desc">';
										if($i == 0) { echo 'пустой план'; }
										else { echo 'форма '.($i+1); }
									echo '	
									</div>
								</div>';
							}
						?>
						</div>
					</div>
				</div>
				<div class='modal_footer'>
				</div>
			</div>			
		</div>	
	</div>
	
	<script>
		$('[data-action="top_panel_1"]').mousedown(function () { clickInterface(); return false; });
		$('[data-action="left_panel_1"]').mousedown(function () { clickInterface(); return false; });
		
		$('[data-action="2D"]').on('mousedown', function(e) { clickInterface(); UI.setView('2D'); return false; }); 	
		$('[data-action="3D"]').mousedown(function () { clickInterface(); UI.setView('3D'); return false; }); 	
		$('[data-action="wall"]').mousedown(function () { clickInterface(); clickO.button = 'create_wall'; return false; }); 		
		$('[data-action="screenshot"]').mousedown(function () { saveAsImage(); return false; }); 				
		
		$('[link_form]').mousedown(function () 
		{ 
			createForm({form : 'shape'+$(this).attr("link_form")}); 
			$('[data-action="modal"]').css({"display":"none"}); 
		}); 
		
		$('[data-action="input-width"]').mousedown(function () { $(this).focus(); UI.activeInput = $(this).data('action'); editText($(this)); });  
		$('[data-action="input-height"]').mousedown(function () { $(this).focus(); UI.activeInput = $(this).data('action'); editText($(this)); });

		$('input').on('focus', function () {  });
		$('input').on('focus keyup change', function () { UI.activeInput = $(this).data('action'); });
		$('input').blur(function () { UI.activeInput = ''; });	

		
		$('[data-action="estimate"]').mousedown(function () 
		{ 
			createEstimateJson();
			$('.modal').css({"display":"block"});
			$('[modal_body="estimate"]').css({"display":"block"}); 
			$('[modal_body="form"]').css({"display":"none"});
			$('[modal_title="estimate"]').css({"display":"block"});
			$('[modal_title="form"]').css({"display":"none"});			
		}); 
		
		$('[data-action="form_1"]').mousedown(function () 
		{ 
			clickInterface();
			$('.modal').css({"display":"block"});
			$('[modal_body="estimate"]').css({"display":"none"});
			$('[modal_body="form"]').css({"display":"block"});
			$('[modal_title="estimate"]').css({"display":"none"});
			$('[modal_title="form"]').css({"display":"block"});
		});
		
		$('[data-action="modal_window"]').mousedown(function () { return false; });		
		
		$('[data-action="modal"]').mousedown(function () { clickInterface(); $('[data-action="modal"]').css({"display":"none"}); });			
		$('[data-action="modal_window_close"]').mousedown(function () { $('[data-action="modal"]').css({"display":"none"}); });
  
  
  function editText(input) {
    console.log(input[0])
    let length = input[0].value.toString().length
    input[0].setSelectionRange(0, length);
  }	
	</script> 

</body>

<? if($_SERVER['SERVER_NAME']=='remstok.ru') {?>
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