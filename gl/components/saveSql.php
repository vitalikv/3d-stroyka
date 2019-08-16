<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/gl/include/bd_1.php");


$id = trim($_POST['id']);
$logo = trim('dbnz');
$json = $_POST['json'];  
$date = date("Y-m-d-G-i");

if(!$id)
{
	$sql = "INSERT INTO user (logo, json, date) VALUES ( :logo, :json, :date)";

	$r = $db->prepare($sql);
	$r->bindValue(':logo', $logo);
	$r->bindValue(':json', $json);
	$r->bindValue(':date', $date);
	$r->execute();


	$count = $r->rowCount();

	if($count==1){ echo $db->lastInsertId(); }
	else{ echo 'оишбка'; }
}
else
{
	$sql = "UPDATE user SET json = :json WHERE id = :id";
	$r = $db->prepare($sql);
	$r->bindValue(':id', $id);
	$r->bindValue(':json', $json);
	$r->execute();

	echo $id;
}

?>





