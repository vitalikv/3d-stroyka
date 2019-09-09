<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/gl/include/bd_1.php");




$url = trim($_SERVER['REQUEST_URI']);
$url = explode("/", $url);
$url = $url[count($url)-1];

$token = addslashes($url);
//if(!preg_match("/^[0-9]+$/i", $id)) { exit; }


// находим e-mail, Имя, codepro
$sql = "SELECT * FROM user WHERE token = :token LIMIT 1";
$r = $db->prepare($sql);
$r->bindValue(':token', $token, PDO::PARAM_STR);
$r->execute();
$res = $r->fetch(PDO::FETCH_ASSOC);


if($res['id'])
{
	echo $res['mail'].' '.$token;
	
	$sql = "UPDATE user SET active = :active, token = :token WHERE id = :id";
	$r = $db->prepare($sql);
	$r->bindValue(':id', $res['id']);
	$r->bindValue(':token', NULL);
	$r->bindValue(':active', true);
	$r->execute();	
}

