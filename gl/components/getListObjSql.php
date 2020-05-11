<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/gl/include/bd_1.php");




//$sql = "SELECT id, name, size, json FROM list_obj";
$sql = "SELECT * FROM list_obj";
$r = $db->prepare($sql);
$r->execute();
$res = $r->fetchAll(PDO::FETCH_ASSOC);


$data = array();
$i = 0;

foreach ($res as $text) 
{
	$data[$i]['id'] = json_decode($text['id']);
	
	if($text['name'])
	{
		$data[$i]['name'] = json_decode($text['name']);	
	}

	if($text['type'])
	{
		$data[$i]['type'] = json_decode($text['type']);	
	}	

	if($text['size'])
	{
		$data[$i]['size'] = json_decode($text['size']);	
	}
	
	if($text['json'])
	{
		$data[$i]['json'] = json_decode($text['json']);	
	}

	if($text['properties'])
	{
		$data[$i]['properties'] = json_decode($text['properties']);	
	}

	if($text['preview'])
	{
		$data[$i]['preview'] = json_decode($text['preview']);	
	}	
	
	$i++;
}


header('Content-Type: application/json; charset=utf-8');
echo json_encode( $data );
//die();

