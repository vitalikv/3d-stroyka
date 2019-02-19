

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="shortcut icon" href="/img/favicon.ico" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" media="screen" type="text/css" title="Style" href="/css/reset.css">
<link rel="stylesheet" media="screen" type="text/css" title="Style" href="/css/style.css">
<script src="/js/jquery-3.1.0.min.js"></script>

<title>Демо версия</title>


</head>
<body>



<script>
$(document).ready(function(){			


<?// скачать ?>
$('.down_button').click(function(){  

$.ajax({
type: "POST",					
url: '/components/demo_1.php',
success: function(data){  
location = data.trim();
}
});

});
<?// скачать ?>
		
		
});
</script>


<div class="fon" fon=""></div>



<div class="wrap">

	<div class="content">
		<div class="line_0"></div>

		<? include($_SERVER['DOCUMENT_ROOT']."/include/menu_1.php");  ?>
		
		<div class="block_line_1">
			<div class="offset_top_50"></div>
			<div class="t1">Демо версия</div>
			<div class="offset_top_30"></div>
			
			<div class="demo">
				<div class="demo_t">
				У демо версии есть ряд ограничений:<br>
				1. Нет возможности сохранить <br>
				2. Нельзя устанавливать название деталей<br>
				3. Нельзя вывести список материалов<br>
				В остальном, все идентично базовой версии. 
				</div>
				<div class="down_button">Скачать</div>
				
				<div class="demo_t">
				Установка:<br>
				Программа сжата в zip файл (для уменьшения объема скачивания). <br>
				1. Кликните правой кнопкой мыши на скаченный файл и в появившемся списке выберете "Извлечь все" или "Извлечь файлы". <br>
				2. Зайдите в извлеченную папку и запустите setup. Начнется установка. 
				</div>
			</div>
		</div>
		<div class="offset_top_50"></div>
	</div>

</div>




<footer>
<? include($_SERVER['DOCUMENT_ROOT']."/include/footer_1.php");  ?>
</footer>




</body>
</html>



