
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

.window_main_menu_content_1_column:nth-child(2) 
{
	display: block;
	flex: 1 1 100%;
	background: orange;
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


.window_main_menu_content_1_h1
{
	display: flex; /* Флексы */
	align-items: center; /* Выравнивание текста по вертикали */
	justify-content: center; /* Выравнивание текста по горизонтали */
	height: 50px;
	background-color:#f1f1f1;

	font-family: arial,sans-serif;
	font-size: 24px;
	color: #666;	
}

.window_main_menu_content_1_wrap_1
{
	display: -webkit-box;
	display: flex;	
}


.window_main_menu_content_block_1
{
	display: flex; /* Флексы */
	align-items: center; /* Выравнивание текста по вертикали */
	justify-content: center; /* Выравнивание текста по горизонтали */
	
	margin: 35px auto;
	padding: 10px 0;
	width: 350px;	
	height: 250px;
	
	font-family: arial,sans-serif;
	font-size: 18px;
	color: #666;
	text-decoration: none;
	text-align:  center;	
	
	border: 1px solid #b3b3b3; 
	border-radius: 10px;
	background-color:#f1f1f1;
	cursor: pointer;
}


.window_main_menu_form_reg_block_1
{
	margin: 35px auto;
	max-width: 450px;
	
	border: 1px solid #b3b3b3; 
	border-radius: 10px;
	background-color:#f1f1f1;	
}


.window_main_menu_form_reg_top_1
{
	position: relative;
	display: -webkit-box;
	display: flex;
	margin: 10px;
	margin-bottom: 50px;
	border-bottom: 1px solid #ccc;	
}

.window_main_menu_form_reg_top_1_block
{
	height: 30px;
	width: auto;	
	border: 1px solid #ccc;
	border-bottom: none;
	background-color:#fff;
	cursor: pointer;
}


.window_main_menu_form_reg_top_1_block_text
{
	margin:0.5em 15px;
	
	font-family: arial,sans-serif;
	font-size: 14px;
	color: #666;
	text-align:center;
}


.window_main_menu_form_reg_block_1_1
{
	display: -webkit-box;
	display: flex;
	padding: 10px 10px;
}

.window_main_menu_form_reg_block_1_label
{
	display: flex; /* Флексы */
	align-items: center; /* Выравнивание текста по вертикали */
	justify-content: center; /* Выравнивание текста по горизонтали */
	width: 100px;
	
	font-family: arial,sans-serif;
	font-size: 18px;
	color: #666;	
}

.input_form_reg
{
	display: block;
	width:80%;
	margin: auto;
	
	border-radius: 3px;	
	font-family: arial,sans-serif;
	font-size: 17px;
	color: #666;
	
	line-height: 2em;
	padding: 0 10px;
}


.window_main_menu_form_reg_info_1
{
	margin: 30px auto 0 auto;
	padding: 20px;
	
	font:15px Arial, Helvetica, sans-serif;
	text-align:center;
	
	background-color:#ffffff;
	border:solid 1px #b3b3b3; 
	-webkit-border-radius:3px;
	-moz-border-radius:3px; 
	border-radius: 3px;	
}


.window_main_menu_button_reg_1
{
	width: auto;
	height: 20px; 
	margin: 10px;
	margin-top: 50px;
	text-decoration:none; 
	text-align:center; 
	padding:11px 11px; 
	border:solid 1px #b3b3b3; 
	-webkit-border-radius:3px;
	-moz-border-radius:3px; 
	border-radius: 3px; 
	font:18px Arial, Helvetica, sans-serif; 
	font-weight:bold; 
	color:#737373; 
	background-color:#ffffff; 
	background-image: -moz-linear-gradient(top, #ffffff 0%, #e3e3e3 100%); 
	background-image: -webkit-linear-gradient(top, #ffffff 0%, #e3e3e3 100%); 
	background-image: -o-linear-gradient(top, #ffffff 0%, #e3e3e3 100%); 
	background-image: -ms-linear-gradient(top, #ffffff 0% ,#e3e3e3 100%); 
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e3e3e3', endColorstr='#e3e3e3',GradientType=0 ); 
	background-image: linear-gradient(top, #ffffff 0% ,#e3e3e3 100%);   
	-webkit-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff; 
	-moz-box-shadow: 0px 0px 2px #bababa,  inset 0px 0px 1px #ffffff;  
	box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
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
	
	

	$('[nameId="button_check_reg_1"]').mousedown(function () { changeMainMenuRegistMenuUI({el: this}); });
	$('[nameId="button_check_reg_2"]').mousedown(function () { changeMainMenuRegistMenuUI({el: this}); });	
	
	
	// переключаем в главном меню в форме регистрация кнопки: вход/регистрация
	function changeMainMenuRegistMenuUI(cdm)
	{
		if(cdm.el.attributes.nameId.value == "button_check_reg_1") 
		{
			$('[nameId="act_reg_1"]').text('Войти');
			$('[nameId="act_reg_1"]').attr("b_type", "reg_1"); 
		}
		if(cdm.el.attributes.nameId.value == "button_check_reg_2") 
		{
			$('[nameId="act_reg_1"]').text('Зарегистрироваться');
			$('[nameId="act_reg_1"]').attr("b_type", "reg_2");
		}	
	}


	



 
$('[nameId="input_reg_mail"]').blur(function()
{
	var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
	var mail = $('[nameId="input_reg_mail"]');
	$('[nameId="info_reg_1_1"]').attr('success_1', false);
	
	var flag = false;
	
	if(mail.val() != '')
	{
		if(pattern.test(mail.val()))
		{
			$('[nameId="info_reg_1_1"]').attr('success_1', true);
			$('[nameId="info_reg_1_1"]').hide();
			flag = true;
		}
		else
		{
			$('[nameId="info_reg_1_1"]').show();
			$('[nameId="info_reg_1_1"]').text('Не верно указанна почта');			
		}
	}
	else
	{
		
		$('[nameId="info_reg_1_1"]').show();
		$('[nameId="info_reg_1_1"]').text('Укажите e-mail');
	}
	
	
	if(flag)
	{ console.log(333);
		$('[nameId="info_reg_1"]').hide();
	}
	else
	{
		$('[nameId="info_reg_1"]').show();
	}
});


	
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
								<div class="window_main_menu_content_1_item" nameId="button_main_menu_reg_1">Учетная запись</div>
								<a href="/" class="window_main_menu_content_1_item">Главная страница</a>
								<div class="window_main_menu_content_1_item" nameId="reset_scene_1">Пустой проект</div>
								<div class="window_main_menu_content_1_item" nameId="button_load_1">Загрузить</div>
								<div class="window_main_menu_content_1_item" nameId="button_save_1">Сохранить</div>
								<div class="window_main_menu_content_1_item" nameId="button_help">Видеоинструкция</div> 
							</div>
							<div class="window_main_menu_content_1_column">
								
								<div wwm_1="button_load_1" list_ui="window_main_menu_content" style="display: none;"> 
									<div class="window_main_menu_content_1_h1">
										Загрузить
									</div>
									<div class="window_main_menu_content_1_wrap_1">
										<div class="window_main_menu_content_block_1">
											Пустой проект
										</div>
										<div class="window_main_menu_content_block_1">
											Пустой проект
										</div>										
									</div>
								</div>
								
								<div wwm_1="button_save_1" list_ui="window_main_menu_content" style="display: none;">
									<div class="window_main_menu_content_1_h1">
										Сохранить
									</div>
									<div class="window_main_menu_content_1_wrap_1">
										<div class="window_main_menu_content_block_1" nameId="save_pr_1">
											Новый проект
										</div>
										<div class="window_main_menu_content_block_1" nameId="save_pr_1">
											Новый проект
										</div>										
									</div>
								</div>
								
								<div wwm_1="button_main_menu_reg_1" list_ui="window_main_menu_content" style="display: block;">
									<div class="window_main_menu_content_1_h1">
										Войдите или зарегистрируйтесь
									</div>
									<div class="window_main_menu_form_reg">
										<div class="window_main_menu_form_reg_block_1">
										
										
		<div class="window_main_menu_form_reg_top_1">
			<div class="window_main_menu_form_reg_top_1_block" nameId="button_check_reg_1">
				<div class="window_main_menu_form_reg_top_1_block_text">
					вход
				</div>	
			</div>
			<div class="window_main_menu_form_reg_top_1_block" nameId="button_check_reg_2">
				<div class="window_main_menu_form_reg_top_1_block_text">
					регистрация
				</div>	
			</div>			
		</div>										
											<div class="window_main_menu_form_reg_block_1_1">
												<div class="window_main_menu_form_reg_block_1_label">
													почта
												</div>											
												<input class="input_form_reg" type="text" nameId="input_reg_mail" value="">
											</div>
											<div class="window_main_menu_form_reg_block_1_1">
												<div class="window_main_menu_form_reg_block_1_label">
													пароль
												</div>											
												<input class="input_form_reg" type="text" nameId="input_reg_pass" value="">
											</div>
											
											<div class="window_main_menu_form_reg_block_1_1">
												<div nameId="info_reg_1" class="window_main_menu_form_reg_info_1" style="display: none;">
													<div nameId="info_reg_1_1" style="display: none;" success_1="false">
														Почта указана
													</div>
													<div nameId="info_reg_1_2" style="display: none;" success_1="false">
														Пароль указана
													</div>													
												</div>
											</div>
											
											<div class="window_main_menu_button_reg_1" b_type="reg_1" nameId="act_reg_1">
												Войти
											</div>
										</div>
																				
									</div>
								</div>								
								
								<div wwm_1="button_help" list_ui="window_main_menu_content" style="display: none;">
									<div style="margin: 30px; font-family: arial,sans-serif; font-size: 20px; color: #666;">
										Приветствуем.<br> 
										Здесь вы сможете нарисовать и подсчитать количество труб для водяных полов в онлайн режиме. 
										Эта программа создана, чтобы простой человек без специальных знаний мог быстро спроектировать теплый пол для загородного или частного дома.
									</div>
									<div style="margin: 70px 30px 30px 30px; font-family: arial,sans-serif; font-size: 20px; color: #666;">
										Посмотрите короткое видео, как пользоваться программой:

										<a href="https://www.youtube.com/watch?v=rqCZYTKqfIE" class="button_youtube_1" target="_blank">
											<img src="<?=$path?>/img/wf_logo.jpg">
										</a>					
									</div>		
								</div>								
								
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



