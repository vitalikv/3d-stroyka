<?
$pass_bd = '';

if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
{
	//"https";
	if($_SERVER['HTTP_HOST'] == 'xn------6cdcklga3agac0adveeerahel6btn3c.xn--p1ai') { $pass_bd = ''; }
}
else
{
    //"http";
}

try
{
	$db = new PDO('mysql:host=localhost;dbname=editor_otop', 'root', $pass_bd);
	$db->exec("set names utf8");
}
catch(PDOException $e)
{
    echo 'Ошибка 1';
}








