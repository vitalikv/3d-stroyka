<?php
require_once ("../../include/bd_1.php");




if($_GET['select_list']) { $select_list = $_GET['select_list']; }
if($_POST['select_list']) { $select_list = $_POST['select_list']; }

if($_GET['table']) { $table = $_GET['table']; }
if($_POST['table']) { $table = $_POST['table']; }

if(!isset($select_list)) { $select_list = '*'; }




$sql = "SELECT {$select_list} FROM {$table}";
$r = $db->prepare($sql);
$r->execute();
$data = $r->fetchAll(PDO::FETCH_ASSOC);





for ($i=0; $i<count($data); $i++)
{
	if($data[$i]['date_up'])
	{
		// сколько прошло дней (86400 - секунд в сутках). intval() - преобразует дробное число к целому
		$data[$i]['date_up'] = intval((time() - $data[$i]['date_up']) / 86400);		
		//$data[$i]['date_up'] = date('m/d/Y H:i:s', $data[$i]['date_up']);		
	}	
}



header('Content-Type: application/json; charset=utf-8');
echo json_encode( $data );
