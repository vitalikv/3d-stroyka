<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/gl/include/bd_1.php");


$id = trim($_POST['id']);
$name = trim($_POST['name']);
$size = $_POST['size']; 
$json = $_POST['json']; 
//$date = date("Y-m-d-G-i");


	

if($id == 0)
{
	$sql = "INSERT INTO list_obj (name, size, json) VALUES (:name, :size, :json)";

	$r = $db->prepare($sql);
	$r->bindValue(':name', $name);
	$r->bindValue(':size', $size);
	$r->bindValue(':json', $json);
	$r->execute();


	$count = $r->rowCount();

	if($count==1)
	{ 
		$inf['success'] = true;
		$inf['id'] = $db->lastInsertId(); 	
	}
}
else
{
	$sql = "UPDATE list_obj SET json = :json, size = :size, name = :name WHERE id = :id";
	$r = $db->prepare($sql);
	$r->bindValue(':id', $id);
	$r->bindValue(':name', $name);
	$r->bindValue(':size', $size);
	$r->bindValue(':json', $json);
	$r->execute();
}

echo json_encode( $inf );

?>





