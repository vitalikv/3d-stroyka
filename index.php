<? $vrs = '=1' ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="shortcut icon" href="/img/favicon.ico" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" media="screen" type="text/css" title="Style" href="/css/reset.css">
<link rel="stylesheet" media="screen" type="text/css" title="Style" href="/css/style.css">

<script src="gl/js/jquery.js"></script>
<script src="gl/js/three.min.js?<?=$vrs?>"></script>
<script src="https://threejs.org/examples/js/loaders/OBJLoader.js"></script>
<script src="https://threejs.org/examples/js/loaders/MTLLoader.js"></script>

<title>Строительный калькулятор 3D</title>


</head>
<body>

<script>
$(document).ready(function(){
	

changesize_1();


$(window).resize(function(){ changesize_1(); });


function changesize_1()
{ 
	var w_win = $(document).width();
	var w_bl_1 = w_win * 0.6;
	if(w_bl_1 < (210 * 4 + 5))
	{
		var rs = (w_bl_1 - 4) / 4;
		$('[click_img]').css("width", rs);
		$('[bl2_img]').css("width", (rs * 4 + 4));
	}
	else
	{
		$('[click_img]').css("width", 210);
		$('[bl2_img]').css("width", (210 * 4 + 4));
	}
}


	
<? // фото ?>
$(document).on('click', '[click_img]', function () { 
var img = $(this).attr('src');
img = /(.+)-m\./.exec(img);
$('[fon]').html('<img src="'+img[1]+'.png" class="img_big_2">');
$(".img_big_2").bind("load",function(){ 
$('[fon]').css({"display":"block"}); 
var h_html = $(this).height();
var h_okno = $(window).height();
var h_resul = (h_okno-h_html)/2;
$(this).css("margin-top", h_resul);
});
});		
<? // фото ?>




<? // закрытие fon ?>
$(document).on('click', '.img_big_2', function () { return false; });
$(document).on('click', '[fon]', function () { $('[fon]').css({"display":"none"}); $('[fon]').html(''); $('body').css("overflow", "auto"); });
<? // закрытие fon ?>	
	
});
</script>


<div class="fon" fon=""></div> <? // фон под big img ?>


<div class="wrap">

	<div class="content">
		<div class="line_0"></div>

		<? include($_SERVER['DOCUMENT_ROOT']."/include/menu_1.php");  ?>
		
		<div class="block_line_1">		
			<div class="offset_top_50"></div>
			<div class="t1">Строительные онлайн калькуляторы в 3D</div>
			<div class="offset_top_30"></div>
			
			<div>
				<div id="scene-3d" class="youtube_1">
										
				</div>
				
				<div class="block_right_1">
					<div class="inb_1">
						<div class="inb_1_1">
							<div class="ind_text_1">О сайте:</div>
							<div class="offset_top_30"></div>
							<div class="ind_text_2">
								Здесь собранные различные строительные программы-калькуляторы, которые позволяют упростить построение и расчеты. Калькулятор сделан таким образом, что для начала вам нужно построить объект, а затем вы получите необходимые расчеты. <br><br>
								Например -> фундамент: <br>
								1. создаете фундамент вашей формы и конфигурации <br>
								2. появляется смета с результатом 							 
							</div>
						</div>
					</div>
				</div>
				
				<div class="clear"></div>
			</div>		
		</div>
		
		
		<div class="offset_top_50"></div>
		<div class="block_line_2">
			<div class="block_line_1">
				<div class="offset_top_50"></div>
				<div class="block_float_2">	
					<div class="ind_text_2">
					3D калькулятор - это по сути упрощенная программа по проектированию, заточенная под конкретную задачу. Нет ничего лишнего и всё максимально упрощено. Это сделано для того чтобы не тратить часы на обучение работе в программе, а сразу приступить к построению и расчетам.
					</div>
					<div class="offset_top_30"></div>
					<div class="ind_text_1"><div class="padding_left_30">Особенности:</div></div>
					
					<div class="ind_list_1">
						<div class="ind_item_1">2D и 3D визуализация</div>
						<div class="ind_item_1">Быстрое редактирование</div>
						<div class="ind_item_1">Удобный и понятный интерфейс</div>
						<div class="ind_item_1">Сохранение изображений</div>
						<div class="ind_item_1">Моментальный расчет сметы</div>
					</div>					
				</div>
				
				<div class="block_right_2">
					<div class="block_img_1" bl2_img="">
						<img src="/img/ind/1-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/2-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/3-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/4-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/5-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/6-m.png" class="img_ind_1" click_img="">		
						
						<img src="/img/ind/7-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/8-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/9-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/10-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/11-m.png" class="img_ind_1" click_img="">
						<img src="/img/ind/12-m.png" class="img_ind_1" click_img="">
						<div class="clear"></div>						
					</div>
					<div class="clear"></div>
				</div>
				
				<div class="clear"></div>
				<div class="offset_top_50"></div>
			</div>
		</div>		
		<div class="offset_top_50"></div>
		
		
		
		<div class="block_line_1">
			<div style="text-align: center; font-size: 24px; color:#222;">Калькуляторы:</div>
			<div class="offset_top_30"></div>
			
			<div class="modal_body_content_grid">
				<a class="ind_bl_1" href="calculator/monolit_fundament1">
					<div class="block_form_1_image_wrap"><img src="/img/ind/bl_1.png"></div>					
					<div class="ind_text_3">
						монолитный фундамент
					</div>
				</a>
				<a class="ind_bl_1" href="/calculator/lentochnii_fundament">
					<div class="block_form_1_image_wrap"><img src="/img/ind/bl_1.png"></div>
					<div class="ind_text_3">
						ленточный фундамент
					</div>
				</a>			
				<a class="ind_bl_1" href="calculator/svaynyy_fundament">
					<div class="block_form_1_image_wrap"><img src="/img/ind/bl_1.png"></div>
					<div class="ind_text_3">
						свайный фундамент
					</div>
				</a>			
				<div class="ind_bl_1" review="4">
					<div class="block_form_1_image_wrap"><img src="/img/ind/bl_1.png"></div>
					<div class="ind_text_3">
						Вывод списка всех задействованных деталей в чертеже
					</div>				
				</div>
				<div class="ind_bl_1" review="5">
					<div class="block_form_1_image_wrap"><img src="/img/ind/bl_1.png"></div>
					<div class="ind_text_3">
						Реалистичная картинка
					</div>				
				</div>			
			</div>
			
		</div>
		<div class="offset_top_50"></div>
		
		<div class="block_line_1">
			<div class="ind_text_1">Системные требования:</div>
			<div class="offset_top_30"></div>
			Операционная система: от Windows 7 и выше<br>
			Процессор: от 2 ядер Intel® или AMD®<br>
			Память: от 2GB<br>
			Видеокарта: GeForce или ATI Radeon<br><br>
			
			Программа запускается даже на ноутбуках 10 летний давности, но работает с тормозами.<br> 
			Оптимальный вариант: ПК или ноутбук средний мощности 5 летний давности.  
		</div>

			
		<div class="offset_top_50"></div>
		
	</div>

</div>


<footer>
<? include($_SERVER['DOCUMENT_ROOT']."/include/footer_1.php");  ?>
</footer>





<script src="thr/scene-3d.js"></script>



</body>
</html>



