<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/include/bd.php");




$mail = trim($_POST['mail']);

// находим e-mail, Имя, codepro
$sql = "SELECT id_order, download FROM application WHERE mail = :mail AND buy = '1'";
$r = $db->prepare($sql);
$r->bindValue(':mail', $mail, PDO::PARAM_STR);
$r->execute();
$res = $r->fetch(PDO::FETCH_ASSOC);


$count = $r->rowCount();

if($count==0){ exit; }

$sum = (int)$res['download'];
$sum += 1;

$sql = "UPDATE application SET download = :download WHERE id_order = :id_order";
$r = $db->prepare($sql);
$r->bindValue(':id_order', $res['id_order']);
$r->bindValue(':download', $sum);
$r->execute();


echo '/download_1/Engineering plan.zip';



?>





