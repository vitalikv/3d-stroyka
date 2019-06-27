

<div class="top_panel_1" data-action ='top_panel_1' style=" z-index: 1;">
	<a href="/" class="go-home"><p>На главную</p></a>
	<div class="title_1"><h1><?=$title?></h1></div>
	<div class="menu-link" style="display: none;">
		<div class="menu-link_1">Список калькуляторов</div>
		<div class="menu-link_2">
			<a href="/" class="button12">Список калькуляторов</a>
			<a href="/" class="button12">Список калькуляторов</a>
		</div>			
	</div>				
</div>

<div class="top_panel_2" style="z-index: 1;">

	<? if($interface['mode_1'] == 1){ ?>
	<div class="tp_left_1">
		<div inf_type = 'mode_1' class="button1">Монтаж</div>
	</div>
	<? } ?>	
	
	<div class="tp_right_1">		
		<div infcam = '3D' class="button1">3D</div>			
	</div>	
	
	<div class="toolbar" data-action ='top_panel_1'>
		
		<div class="button1-wrap-2" nameId='top_menu_b1' inf-visible='false' style="display: none;">		
			<? if($interface['tube_1'] == 1){ ?>
			<div class="button1-wrap-1">
				<div data-action ='create_tube_1' class="button1"><p>Труба</p></div>
			</div>
			<? } ?>		
		</div>
		
		<div class="button1-wrap-2" nameId='top_menu_b2' inf-visible='true'>
			<? if($interface['wall_1'] == 1){ ?>
			<div class="button1-wrap-1">
				<!--<div data-action ='wall' class="button1"><img src="/img/paint.png"></div>-->
				<div data-action ='wall' class="button1"><p>Стена</p></div>
			</div>
			<? } ?>

			<? if($interface['wd_1'] == 1){ ?>
			<div class="button1-wrap-1">
				<div data-action ='create_wd_1' class="button1"><p>Проём</p></div>
			</div>
			<? } ?>	

			<? if($interface['wd_2'] == 1){ ?>
			<div class="button1-wrap-1">
				<div data-action ='create_wd_2' class="button1"><p>Дверь</p></div>
			</div>
			<? } ?>	
			<? if($interface['wd_3'] == 1){ ?>
			<div class="button1-wrap-1">
				<div data-action ='create_wd_3' class="button1"><p>Окно</p></div>
			</div>
			<? } ?>			
		</div>	
	
		<? if($interface['wall_2']['top']['showHideWall_1'] == 1){ ?>
		<div class="button1-wrap-1" nameId='showHideWall_1' style="display: none;"> 
			<div nameId='showHideWall_1_b' class="button1">Спрятать стены</div>
		</div>		
		<? } ?>
		
		<? if($interface['estimate'] == 1){ ?>
		<div class="button1-wrap-1">
			<div data-action ='estimate' class="button1"><p>СМЕТА</p></div>
		</div>
		<? } ?>
		<div class="button1-wrap-1">
			<div data-action ='screenshot' class="button1"><img src="<?=$path?>/img/screenshot.png"></div>
		</div>
			
		
	</div> 
</div>


