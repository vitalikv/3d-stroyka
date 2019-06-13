

<div class="top_panel_1" data-action ='top_panel_1' style="display: none;">
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
		<? if($interface['tube_1'] == 1){ ?>
		<div data-action ='create_tube_1' class="button1"><img src="<?=$path?>/img/paint.png"></div>
		<? } ?>
		<? if($interface['wd_1'] == 1){ ?>
		<div data-action ='create_wd_1' class="button1"><p>Проём</p></div>
		<? } ?>	

		<? if($interface['wd_2'] == 1){ ?>
		<div data-action ='create_wd_2' class="button1"><p>Дверь</p></div>
		<? } ?>	
		<? if($interface['wd_3'] == 1){ ?>
		<div data-action ='create_wd_3' class="button1"><p>Окно</p></div>
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
