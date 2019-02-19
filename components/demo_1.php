<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/include/bd.php");

$date = date("Y-m-d-G-i");

$sql = "INSERT INTO demo (download, date) VALUES ( :download, :date )";

$r = $db->prepare($sql);
$r->bindValue(':download', '1');
$r->bindValue(':date', $date);
$r->execute();

echo '/demo_1/Engineering plan (Demo).zip';

?>


