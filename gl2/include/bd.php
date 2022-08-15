<? 
require_once ("bd_1.php");




$url = $_SERVER['REQUEST_URI'];

$path = "/gl2/";

$title = '';
$h1 = '';
$description = '';


$interface['rtc'] = 0;
	


if($url == '/redactor/view')	
{ 
	$title = 'Test';
	$h1 = '----';
	$description = '';
	$nameId = '';
}

if($url == '/redactor/heating')	
{ 
	$title = 'Программа отопления 3D онлайн';
	$h1 = 'Конструктор отопления';
	$description = 'Программа отопления позволяет спроектировать систему отопления в 3D. Она рассчитана на людей, которые хотят самостоятельно сделать отопление на даче, в загородном доме или в квартире.';
	$nameId = '';	
}



$infProject = array('url' => $url, 'title' => $title, 'nameId' => $nameId, 'path' => $path, 'load' => [ img => [] ]);

$infProject['activeInput'] = '';
$infProject['activeDiv'] = null;

$infProject['user'] = [];
$infProject['user']['id'] = null;
$infProject['user']['mail'] = null;
$infProject['user']['pass'] = null;
$infProject['user']['status'] = null;
$infProject['user']['sum'] = [ 'obj' => 0, 'tube' => 0 ];

$infProject['settings']['project'] = '';
$infProject['settings']['land'] = [ 'o' => false ];
$infProject['settings']['unit'] = [ 'wall' => 1, 'floor' => 1 ];
$infProject['settings']['camera'] = [ 'type' => '2d', 'zoom' => 1, 'limitZoom' => 1 ];
$infProject['settings']['interface']['button'] = [ 'cam2d' => '2d' ];

$infProject['scene'] = [ 'tool' => [] ];
$infProject['scene']['load'] = '';
$infProject['elem']['test'] = '';
$infProject['sleshUrl']['http'] = 'http://';
$infProject['sleshUrl']['https'] = 'https://';





$jsonPhp = json_encode($infProject);



?>