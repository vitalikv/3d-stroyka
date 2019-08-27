
<style type="text/css">
.background_main_menu 
{
	display: block;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
}

.window_main_menu 
{
	position: relative;
	margin: auto;
	width: 95%;
	height: 95%;	
	
	background: white;
	border-radius: 8px;
	box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);
	display: -webkit-box;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	flex-direction: column;
}

.window_main_menu_content_1
{	
	position: relative;
	margin: 30px auto 0 0;
}


.window_main_menu_content_1_row
{
	display: -webkit-box;
	display: flex;
}

.window_main_menu_content_1_column
{
	display: -webkit-box;
	display: flex;
	flex-direction: column;
	-webkit-flex-direction: column;
}


.window_main_menu_content_1_item
{
	margin: 5px 20px;
	padding: 10px 0;
	width: 250px;	
	
	font-family: arial,sans-serif;
	font-size: 18px;
	color: #666;
	text-decoration: none;
	text-align:  center;	
	
	border: 1px solid #b3b3b3; 
	border-radius: 3px;
	background-color:#f1f1f1;
	cursor: pointer;
}
 
</style>


<script>
$(document).ready(function(){
	$('[nameId="background_main_menu"]').mousedown(function () 
	{	 
		$('[nameId="background_main_menu"]').css({"display":"none"}); 
	});

				
	$('[nameId="button_close_main_menu"]').mousedown(function () 
	{  
		$('[nameId="background_main_menu"]').css({"display":"none"}); 
	});
	
	$('[nameId="window_main_menu"]').mousedown(function () { return false; });
});	
</script>


<div class="background_main_menu" nameId="background_main_menu" ui_1="">
	<div class="modal_wrap">
		<div class="window_main_menu" nameId="window_main_menu">
			<div class="modal_window_close" nameId="button_close_main_menu">
				+
			</div>
			<div class="modal_header">
				<div class="modal_title">
					<div class="modal_name">
						<div modal_title='form'>
							Меню 
						</div>
					</div>
				</div>					
			</div>
			<div class='modal_body'>
				<div class='modal_body_content'>
					<div class="window_main_menu_content_1">					
						<div class="window_main_menu_content_1_row">
							<div class="window_main_menu_content_1_column">
								<a href="/" class="window_main_menu_content_1_item">Главная страница</a>
								<div class="window_main_menu_content_1_item" nameId="reset_scene_1">Пустой проект</div>
								<div class="window_main_menu_content_1_item" nameId="load_pr_1">Загрузить</div>
								<div class="window_main_menu_content_1_item" nameId="save_pr_1">Сохранить</div>													
							</div>
							<div class="window_main_menu_content_1_column">
								<a href="/" class="window_main_menu_content_1_item">Главная страница</a>
								<div class="window_main_menu_content_1_item" nameId="reset_scene_1">Пустой проект</div>
								<div class="window_main_menu_content_1_item" nameId="load_pr_1">Загрузить</div>
								<div class="window_main_menu_content_1_item" nameId="save_pr_1">Сохранить</div>													
							</div>							
						</div>
						<div class="window_main_menu_content_1_row">
						
						</div>						
					</div>
					
					<div class="window_main_menu_content_1">
					
					</div>
				</div>			
			</div>
			<div class='modal_footer'>
			</div>
		</div>			
	</div>	
</div>



