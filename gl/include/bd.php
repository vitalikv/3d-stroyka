<? 
require_once ($_SERVER['DOCUMENT_ROOT']."/gl/include/bd_1.php");




$url = $_SERVER['REQUEST_URI'];

$path = "/gl/";

$title = '';
$h1 = '';
$description = '';
$interface['wall_1'] = 0;
$interface['wall_2'] = ['top'=>[], 'left'=>[], 'right'=>[], 'bottom'=>[]];
$interface['click_wall_2D'] = 0;
$interface['wd_1'] = 0;

$interface['wall_b1'] = 0;

$interface['wall_1'] = 1;
$interface['wd_1'] = 1;		
$interface['tube_b1'] = 1;
$interface['box_wf_b1'] = 1;
$interface['wall_2']['bottom'] = ['width_1' => 1];
$interface['wall_2']['top'] = ['showHideWall_1' => 1];
$interface['obj_b1'] = 1;

$interface['admin'] = 0;
	


if($url == '/calculator/warm_floor')	
{ 
	$title = 'Программа теплый пол 3D калькулькулятор';
	$h1 = 'Расчет теплого пола 3D';
	$description = 'Программа теплый пол позволяет быстро спроектировать и подсчитать количество труб. Она рассчитана на людей, которые хотят самостоятельно сделать теплый пол на даче, в загородном доме или в квартире. В программе есть 3D режим который наглядно покажет, то что вы спроектировали.';
	$nameId = 'теплый пол';
}

	
{ 
	$title = 'Test';
	$h1 = '----';
	$description = '';
	$nameId = '';
}



$infProject = array('url' => $url, 'title' => $title, 'nameId' => $nameId, 'path' => $path, 'load' => [ img => [] ]);

$infProject['activeInput'] = '';
$infProject['activeDiv'] = null;

$infProject['user'] = [];
$infProject['user']['id'] = null;
$infProject['user']['mail'] = null;
$infProject['user']['pass'] = null;

$infProject['settings']['project'] = '';
$infProject['settings']['height'] = 2.5;
$infProject['settings']['floor'] = [ 'o' => false, 'posY' => 0.1, 'height' => 0.1, 'changeY' => false, 'areaPoint' => 'center', 'material' => null, 'label'=> true ];
$infProject['settings']['wall'] = [ 'width' => 0.3, 'label' => '', 'dist' => 'center', 'material' => null, 'block' => null ];
$infProject['settings']['wf_tube'] = [];
$infProject['settings']['calc'] = [ 'fundament' => '' ];
$infProject['settings']['land'] = [ 'o' => false ];
$infProject['settings']['unit'] = [ 'wall' => 1, 'floor' => 1 ];
$infProject['settings']['camera'] = [ 'type' => '2d', 'zoom' => 1, 'limitZoom' => 1 ];
$infProject['settings']['interface']['button'] = [ 'cam2d' => '2d' ];

$infProject['scene'] = [ 'tool' => [] ];
$infProject['scene']['load'] = '';




if($url == '/calculator/radiator' || $url == '/gl/')
{
	//$infProject['scene']['load'] = 'shape3';	
	$infProject['settings']['project'] = 'warm_floor';
	$infProject['settings']['floor']['o'] = true;
	$infProject['settings']['floor']['areaPoint'] = 'inside';
	$infProject['settings']['floor']['label'] = false;
	$infProject['settings']['floor']['color'] = 0xf7f2d5;
	$infProject['settings']['wf_tube'] = [ 'd'=> 0.02 ];
	$infProject['settings']['wf_tube']['pos'] = [ 'y' => 0.2 ];
	$infProject['settings']['wall']['label'] = 'double';
	$infProject['settings']['wall']['color']['top'] = 0xded3b8;
	$infProject['settings']['wall']['color']['front'] = 0xada186;
	$infProject['settings']['interface']['button']['showHideWall_1'] = ['active' => 'Спрятать стены'];
}



$jsonPhp = json_encode($infProject);


//getFindValue_1([['wall_2'],['bottom'],['width_1']]);

function getFindValue_1($array)
{
	$arr = [];
	
	for ($i = 0; $i<count($array); $i++) 
	{
		$arr[$array[$i][0]] = [];
		//if(!isset($infProject[$arr[$i]])) { $arr = []; break; }
		
	}
	
	echo '<pre>'; 
	print_r($arr); 
	echo '</pre>';
	
	//var_dump($arr);
}




?>