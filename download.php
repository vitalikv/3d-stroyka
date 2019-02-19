

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="shortcut icon" href="/img/favicon.ico" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" media="screen" type="text/css" title="Style" href="/css/reset.css">
<link rel="stylesheet" media="screen" type="text/css" title="Style" href="/css/style.css">
<script src="/js/jquery-3.1.0.min.js"></script>

<title>Скачать программу</title>


</head>
<body>



<script>
$(document).ready(function(){			


<?// скачать ?>
$('.down_button').click(function(){  
var mail = $('[order_mail]').text().trim();

if(empty(mail)){return;}

$.ajax({
type: "POST",					
url: '/components/download_1.php',
data: {"mail":mail},
success: function(data){  
console.log(data);
if(data.trim() != '') { location = data.trim(); }
}
});

});
<?// скачать ?>

	
	
<?// проверка, пустое поле или нет (если пустое == true) ?>		
function empty(mixed_var) { return ( mixed_var === "" || mixed_var === 0   || mixed_var === "0" || mixed_var === null  || mixed_var === false || mixed_var === "undefined" ); }



		
		
});
</script>


<div class="fon" fon=""></div>



<div class="wrap">

	<div class="content">
		<div class="line_0"></div>

		<? include($_SERVER['DOCUMENT_ROOT']."/include/menu_1.php");  ?>
		
		<div class="block_line_1">
			<div class="offset_top_50"></div>
			<div class="t1">Скачать программу</div>
			<div class="offset_top_30"></div>
			
			<div class="down">
				<div class="down_t">Чтобы скачать программу введите ваш e-mail</div>
				<div class="input_1"><div order_mail="" class="input_1_1" contenteditable="true" spellcheck="false"></div></div>
				<div class="down_button">Скачать</div>
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



