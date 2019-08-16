<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/gl/include/bd_1.php");



$sql = "SELECT * FROM user WHERE id='2' ORDER BY id";
$r = $db->query($sql);
$res = $r->fetchAll(PDO::FETCH_ASSOC);


//$mail = trim($_POST['mail']);
$id = trim($_POST['id']);

// находим e-mail, Имя, codepro
$sql = "SELECT * FROM user WHERE id = :id";
$r = $db->prepare($sql);
$r->bindValue(':id', $id, PDO::PARAM_STR);
$r->execute();
$res = $r->fetch(PDO::FETCH_ASSOC);


$count = $r->rowCount();

echo $res['json'];
