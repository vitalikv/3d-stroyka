<? $vrs = '=1' ?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Строительный калькулятор 3D</title>
<meta charset="utf-8">
<link rel="icon" href="/img/favicon.ico">
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/style.css?<?=$vrs?>">
<script src="js/jquery.js"></script>
<script src="js/three.min.js?<?=$vrs?>"></script>
<script src="https://threejs.org/examples/js/loaders/OBJLoader.js"></script>
<script src="https://threejs.org/examples/js/loaders/MTLLoader.js"></script>
</head>
<body>

<div class="wrap">
<div class="content">
<script>console.log(window.location.hostname)</script>

<header>
<div class="title">Строительные онлайн калькуляторы в 3D</div>
</header>

<div class="menu-b">
<ul class="menu">
<li><a href="/">Главная</a></li>
<li><a href="/teoriy">Теория</a></li>
<li><a href="/proekt">Проектирование</a></li>
<li><a href="/montag">Монтаж</a></li>
<li><a href="/zapusk">Запуск</a></li>
</ul>
</div>

<div class="b1">
<div id="scene-3d" style="width:90%; height:600px; margin:0 auto;"></div>
</div>

<script src="thr/scene-3d.js"></script>


</div>
</div>

<footer>
	<div class="block_line_1">
		<div class="footer_menu">
			<a href="/">Конструктор</a>
			<!--<a href="/review">Возможности</a>-->
			<a href="/documentation">Инструкция</a>
			<a href="/buy">Купить</a>
			<a href="/contact">Задать вопрос</a>
		</div>
		<div class="clear"></div>
	</div>
</footer>

</body>
</html>

