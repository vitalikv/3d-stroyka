<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/gl/include/bd_1.php");



$logo = trim('dbnz');
$json = $_POST['json'];  
$date = date("Y-m-d-G-i");


$sql = "INSERT INTO user (logo, json, date) VALUES ( :logo, :json, :date)";

$r = $db->prepare($sql);
$r->bindValue(':logo', $logo);
$r->bindValue(':json', $json);
$r->bindValue(':date', $date);
$r->execute();


$count = $r->rowCount();

if($count==1){ echo $db->lastInsertId(); }
else{ echo 'оишбка'; }



?>





