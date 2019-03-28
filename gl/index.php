<? 

$url = $_SERVER['REQUEST_URI'];

$path = "/gl/";

$title = 'калькулятор площади пола онлайн';
$interface['wall_1'] = 1;
$interface['estimate'] = 1;
$interface['width_1'] = 1;
$interface['height_1'] = 1;
$interface['form_1'] = 1;
$interface['right_panel_1'] = 1;
$interface['bottom_panel_1'] = 1;
$interface['wd_1'] = 1;
	
if($url == '/calculator/area_apartment')	
{ 
	$title = 'Калькулятор площади квартиры онлайн 3D'; 
	$interface['wd_1'] = 0;
}
if($url == '/calculator/monolit_fundament')	
{ 
	$title = 'Калькулятор монолитного фундамента 3D'; 
	$nameId = 'монолитный фундамент'; 
	$interface['width_1'] = 0; 
	$interface['wd_1'] = 0;
}
if($url == '/calculator/monolit_fundament1')	
{ 
	$title = 'Калькулятор монолитного фундамента 3D'; 
	$nameId = 'монолитный фундамент'; 
	$interface['width_1'] = 0; 
	$interface['wd_1'] = 0;
}
if($url == '/calculator/lentochnii_fundament')	
{ 
	$title = 'Калькулятор ленточного фундамента 3D'; 
	$nameId = 'ленточный фундамент'; 
	$interface['wd_1'] = 0;
}
if($url == '/calculator/svaynyy_fundament')	
{ 
	$title = 'Свайный фундамент калькулятор 3D'; 
	$nameId = 'свайный фундамент';
	$interface['wd_1'] = 0;	
}
if($url == '/calculator/obyem_pomeshcheniya')	
{ 
	$title = 'Калькулятор объема и площади помещения 3D'; 
	$nameId = 'объем и площадь помещения'; 
	$interface['wd_1'] = 1;
}
if($url == '/calculator/ploshchad_uchastka')	
{ 
	$title = 'Расчет площади участка 3D'; 
	$nameId = 'площадь участка'; 
	$interface['estimate'] = 0; 
	$interface['width_1'] = 0;
	$interface['height_1'] = 0;
	$interface['wd_1'] = 0;
}
if($url == '/calculator/shtukaturka_na_stene')	
{ 
	$title = 'Расчет штукатурки на стене 3D'; 
	$nameId = 'штукатурка на стене'; 
	$interface['width_1'] = 0;
	$interface['height_1'] = 0;
	$interface['form_1'] = 0;
	$interface['wall_1'] = 0;
	$interface['right_panel_1'] = 0;
	$interface['bottom_panel_1'] = 0;
}
if($url == '/calculator/raschet_kirpicha')	
{ 
	$title = 'Расчет кирпича для стены 3D'; 
	$nameId = 'расчет кирпича'; 
	$interface['width_1'] = 0;
	$interface['height_1'] = 0;
	$interface['form_1'] = 0;
	$interface['wall_1'] = 0;
	$interface['right_panel_1'] = 0;
	$interface['bottom_panel_1'] = 0;
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


<?php $vrs = '=2' ?>

	
<script>
	var vr = "<?=$vrs ?>";
	
	var infProject = { title : '<?=$title?>', nameId : '<?=$nameId?>', scene : { tool : {} } };
	infProject.settings = {};
	infProject.path = '<?=$path?>';
	
	infProject.load = { img : [] }
	infProject.activeInput = '';
	infProject.activeDiv = null;
	
	infProject.settings.project = 'shape3';
	infProject.settings.height = 2.5;
	infProject.settings.floor = { o: false, posY: 0.1, height : 0.1, changeY: false, areaPoint: 'center', material : null }
	infProject.settings.wall = { width : 0.3, label : '', dist : 'center', material : null } 
	infProject.settings.calc = { fundament: '' }
	infProject.settings.land = { o: false }
	infProject.settings.unit = { wall: 1, floor: 1 }
	infProject.settings.camera = { type: '2d', zoom: 1, limitZoom : 1 }
	infProject.settings.grid = { value: 30, offset : 0.5 }
	infProject.settings.interface = { button: {} }
	infProject.settings.interface.button = { cam2d: '2d' }
	
	if(infProject.nameId == 'монолитный фундамент') 
	{ 
		infProject.settings.calc.fundament = 'monolit';
		infProject.settings.wall.label = 'outside';
		infProject.settings.wall.width = 0.03;
		infProject.settings.height = 0.2;
		infProject.settings.floor.o = true;
		infProject.settings.floor.posY = infProject.settings.height;
		infProject.settings.floor.height = infProject.settings.height;
		infProject.settings.floor.changeY = true;
	}
	else if(infProject.nameId == 'ленточный фундамент')
	{ 
		infProject.settings.wall.label = 'outside';
		infProject.settings.calc.fundament = 'lent';
		infProject.settings.height = 0.2;
	}
	else if(infProject.nameId == 'свайный фундамент') 
	{ 
		infProject.settings.wall.label = 'outside';
		infProject.settings.calc.fundament = 'svai';
		infProject.settings.height = 0.2;
	}
	else if(infProject.nameId == 'площадь участка') 
	{ 
		infProject.load.img = ['img/load/grass.jpg']; 
		infProject.settings.floor.material = [{ img:infProject.load.img[0], repeat:{x:0.2, y:0.2} }];
		infProject.settings.land.o = true; 
		infProject.settings.height = 0.2;
		infProject.settings.floor.o = true;
		infProject.settings.floor.posY = infProject.settings.height;
		infProject.settings.floor.height = infProject.settings.height;
		infProject.settings.floor.changeY = true;
		infProject.settings.wall.label = 'outside';
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
		infProject.load.img = ['img/load/kirpich.jpg'];
		infProject.settings.wall.label = 'inside';
		infProject.settings.wall.dist = 'inside';
		infProject.settings.wall.material = [{index:1, img:infProject.load.img[0], repeat:{x:0.6, y:0.6}}, {index:2, img:infProject.load.img[0], repeat:{x:0.6, y:0.6}}];
		infProject.settings.floor.o = true;
		infProject.settings.floor.areaPoint = 'inside';
	}	
	else if(infProject.nameId == 'штукатурка на стене') 
	{ 
		infProject.load.img = ['img/load/beton.jpg'];
		infProject.settings.project = 'wall_stucco';
		infProject.settings.camera.type = 'front';
		infProject.settings.interface.button.cam2d = 'front';
		infProject.settings.wall.material = [{index:1, img:infProject.load.img[0], repeat:{x:0.6, y:0.6}}, {index:2, img:infProject.load.img[0], repeat:{x:0.6, y:0.6}}];
	}
	else if(infProject.nameId == 'расчет кирпича') 
	{ 
		infProject.load.img = ['img/load/beton.jpg'];
		infProject.settings.project = 'wall_kirpich';
		infProject.settings.camera.type = 'front';
		infProject.settings.interface.button.cam2d = 'front';
		infProject.settings.wall.material = [{index:1, img:infProject.load.img[0], repeat:{x:0.6, y:0.6}}, {index:2, img:infProject.load.img[0], repeat:{x:0.6, y:0.6}}];
	}	

	
	console.log('version '+ vr);
    console.log('infProject ', infProject, <?=$interface['estimate']?>);
	
</script>

    <script src="<?=$path?>js/three.min.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/jquery.js"></script>
    <script src="<?=$path?>js/ThreeCSG.js"></script>       
    
	<script src="<?=$path?>meshBSP.js"></script> 	
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
	<script src="<?=$path?>dragWindowDoorUI.js?<?=$vrs?>"></script>
	<script src="<?=$path?>clickActiveObj.js?<?=$vrs?>"></script>
	<script src="<?=$path?>activeHover2D.js?<?=$vrs?>"></script>
    
    <script src="<?=$path?>undoRedo.js?<?=$vrs?>"></script>
    <script src="<?=$path?>saveLoad.js?<?=$vrs?>"></script>
		
	
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>
    	
	<script src="<?=$path?>eventKey.js?<?=$vrs?>"></script>
	


	
	
	
	<div class="top_panel_1" data-action ='top_panel_1'>
		<a href="/" class="go-home"><p>На главную</p></a>
		<div class="title_1"><h1><?=$title?></h1></div>
		<div class="menu-link">
			<div class="menu-link_1">Список калькуляторов</div>
			<div class="menu-link_2">
				<a href="/" class="button12">Список калькуляторов</a>
				<a href="/" class="button12">Список калькуляторов</a>
			</div>			
		</div>				
	</div>
	
	<div class="top_panel_2">				
		<div class="toolbar" data-action ='top_panel_1'>
			<? if($interface['wall_1'] == 1){ ?>
			<div data-action ='wall' class="button1"><img src="<?=$path?>/img/paint.png"></div>
			<? } ?>
			<? if($interface['wd_1'] == 1){ ?>
			<div data-action ='wd_1' class="button1"><p>Проём</p></div>
			<? } ?>			
			<div class="button1-wrap">
				<div data-action ='2D' class="button1"><p>2D</p></div>
				<div data-action ='3D' class="button1"><p>3D</p></div>
			</div>
			<? if($interface['estimate'] == 1){ ?>
			<div data-action ='estimate' class="button1"><p>СМЕТА</p></div>
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

		<?if($interface['form_1'] == 1){?>
		<div class="side_panel-button">			
			<div class="button2" data-action ='form_1'><img src="<?=$path?>/img/f4.png"></div>
		</div> 
		<?}?>
		
		<?if($interface['width_1'] == 1){?>
		<div class="input-height">
			<div class="text_1">ширина (см)</div>
			<input type="text" data-action ='input-width' data-input='' value = 30>
		</div> 
		<?}?>
		
		<?if($interface['height_1'] == 1){?>
		<div class="input-height">
			<div class="text_1">высота (см)</div>
			<input type="text" data-action ='input-height' data-input='' value = 20>
		</div>
		<?}?>		
	</div>
	
	<?if($interface['right_panel_1'] == 1){?>
	<div class="right_panel_1" data-action ='right_panel_1'>			
		<a href="/calculator/monolit_fundament" class="link_page_1">монолитный<br>фундамент</a>
		<a href="/calculator/lentochnii_fundament" class="link_page_1">ленточный<br>фундамент</a>
		<a href="/calculator/svaynyy_fundament" class="link_page_1">свайный<br>фундамент</a>
	</div>	
	<?}?>
	
	<?if($interface['bottom_panel_1'] == 1){?>
	<div class="bottom_panel_1" data-action ='top_panel_1'>			
		<div class="toolbar" data-action ='top_panel_1'>	
			<div class="button1-wrap">
				<div data-action ='addPointCenterWall' class="button1"><p>Добавить точку</p></div>
			</div>
			<div class="button1-wrap">
				<div data-action ='deleteObj' class="button1"><img src="<?=$path?>/img/waste.png"></div>
			</div>
		</div>
	</div>		
	<?}?>
	<div class="bottom_panel_1" data-action ='top_panel_1'>	
	
		<div class="toolbar" data-action ='top_panel_1' nameId='wd_wall_1' style="display: none;">
			<div class="toolbar-header">стена</div>
			<div class="toolbar-menu">
				<div class="input-size">
					<div class="text_1">длина (м)</div>
					<input type="text" data-action ='size-wall-length' data-input='' value = 0>
				</div>
				
				<div class="input-size">
					<div class="text_1">высота (м)</div>
					<input type="text" data-action ='size-wall-height' data-input='' value = 0>
				</div>	
				
				<div class="input-size">
					<div class="text_1">толщина (м)</div>
					<input type="text" data-action ='size-wall-width' data-input='' value = 0>
				</div>				
				<div class="button1-wrap">
					<div data-action ='deleteObj' class="button1"><img src="<?=$path?>/img/waste.png"></div>
				</div>			
			</div>
		</div>
		
		
		<div class="toolbar" data-action ='top_panel_1' nameId='wd_menu_1' style="display: none;">
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
		$('[data-action="top_panel_1"]').mousedown(function () { return clickInterface(); });
		$('[data-action="left_panel_1"]').mousedown(function () { return clickInterface(); });
		
		$('[data-action="2D"]').on('mousedown', function(e) { return clickInterface({button:'2D'}); }); 	
		$('[data-action="3D"]').mousedown(function () { return clickInterface({button:'3D'}); }); 	
		$('[data-action="wall"]').mousedown(function () { return clickInterface({button:'point_1'}); }); 
		$('[data-action="wd_1"]').mousedown(function () { return clickInterface({button:'wd_1'}); });
		$('[data-action="screenshot"]').mousedown(function () { saveAsImage(); return false; }); 				
		
		$('[link_form]').mousedown(function () 
		{ 
			createForm({form : 'shape'+$(this).attr("link_form")}); 
			$('[data-action="modal"]').css({"display":"none"}); 
		}); 
		
		$('[data-input]').mousedown(function () { editText($(this)); });  
		
		$('[data-action="deleteObj"]').mousedown(function () { detectDeleteObj(); return false; });
		$('[data-action="addPointCenterWall"]').mousedown(function () { addPointCenterWall(); return false; });
		
		$('input').on('focus', function () {  });
		$('input').on('focus keyup change', function () 
		{ 
			infProject.activeInput = $(this).data('action');
			if($(this).data('action') == undefined) { infProject.activeInput = $(this).data('input');  }
		});
		$('input').blur(function () { infProject.activeInput = ''; });	

		
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
  
  
	function editText(input) 
	{
		input.focus();
		infProject.activeDiv = input;
		infProject.activeInput = input.data('action');  
		
		if(input.data('action') == undefined) { infProject.activeInput = input.data('input'); }
		console.log(infProject.activeInput);
		//let length = input[0].value.toString().length;
		//input[0].setSelectionRange(0, length);
		input.select();
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