<? $vrs = '=1' ?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Строительный калькулятор 3D</title>
<meta charset="utf-8">
<link rel="icon" href="/img/favicon.ico">
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/style.css?<?=$vrs?>">
<script src="js/jquery.js"></script>
<script src="js/three.min.js?<?=$vrs?>"></script>
<script src="https://threejs.org/examples/js/loaders/OBJLoader.js"></script>
</head>
<body>

<div class="contener">

<script>console.log(window.location.hostname)</script>

<div class="menu-b">
<ul class="menu">
<li><a href="/">Главная</a></li>
<li><a href="/teoriy">Теория</a></li>
<li><a href="/proekt">Проектирование</a></li>
<li><a href="/montag">Монтаж</a></li>
<li><a href="/zapusk">Запуск</a></li>
</ul>
</div>

<div class="content">
Строительный калькулятор

<div id="scene-3d" style="width:90%; height:600px; margin:auto;">
</div>

</div>


<script>
var container = document.getElementById( 'scene-3d' );
console.log(container);
var w_w = container.clientWidth;
var w_h = container.clientHeight;
var aspect = w_w/w_h;
var d = 5;
var infProject = { settings : {}, scene : {}, cam: { mirror : [] } };

var canvas = document.createElement( 'canvas' );
var context = canvas.getContext( 'webgl2', { antialias: true } );
var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context, preserveDrawingBuffer: true, } );

//var renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, /*antialias : true*/});
renderer.localClippingEnabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( w_w, w_h );


container.appendChild( renderer.domElement );

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

//----------- Light 
var light_1 = new THREE.AmbientLight( 0xffffff, 0.7 );
scene.add( light_1 ); 
 

var light_2 = new THREE.DirectionalLight( 0xcccccc, 0.3 );
light_2.position.set(0,15,0);
light_2.lookAt(scene.position);
light_2.castShadow = true;
light_2.shadow.mapSize.width = 2048;
light_2.shadow.mapSize.height = 2048;
light_2.shadow.camera.left = - d;
light_2.shadow.camera.right = d;
light_2.shadow.camera.top = d;
light_2.shadow.camera.bottom = - d;
light_2.shadow.camera.near = 0;
light_2.shadow.camera.far = 3500;
scene.add( light_2 );

//----------- camera
var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
camera.position.set(5, 3, 5);
camera.lookAt(new THREE.Vector3(0,2,0));
camera.userData.tag = 'cameraTop';

var camera = new THREE.PerspectiveCamera( 65, w_w / w_h, 0.2, 1000 );  
camera.rotation.order = 'YZX';		//'ZYX'
camera.position.set(8, 6, 8);
camera.lookAt(new THREE.Vector3(0,2,0));
camera.userData.tag = 'camera3D';
//----------- camera



var theta = 0;
var radius = 10;
function animate() 
{
	requestAnimationFrame( animate );
	
	theta += 0.1;
	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );
	
	renderer.render(scene, camera);
}



createGrid();

function createGrid() 
{
	var geom_line = new THREE.Geometry();
	var count_grid1 = 10;
	var count_grid2 = (count_grid1 * 1) / 2;
	geom_line.vertices.push(new THREE.Vector3( - count_grid2, 0, 0 ) );
	geom_line.vertices.push(new THREE.Vector3( count_grid2, 0, 0 ) );
	linesMaterial = new THREE.LineBasicMaterial( { color: 0xd6d6d6, opacity: 1, linewidth: .1 } );

	for ( var i = 0; i <= count_grid1; i ++ ) 
	{
		var line = new THREE.Line( geom_line, linesMaterial );
		line.position.z = ( i * 1 ) - count_grid2;
		line.position.y = -0.01;
		scene.add( line );

		var line = new THREE.Line( geom_line, linesMaterial );
		line.position.x = ( i * 1 ) - count_grid2;
		line.position.y = -0.01;
		line.rotation.y = 90 * Math.PI / 180;
		scene.add( line );
	}	
}


new THREE.OBJLoader().load
(
	'js/house.obj', 
	
	function ( obj ) 
	{
		//obj.geometry.computeBoundingSphere();	
		//obj.position.set(0,0,0);
		//obj.rotation.set(Math.PI/2,Math.PI,-Math.PI/2);
		obj.position.y = 0.5;
		obj.scale.set(0.02, 0.02, 0.02);
		
		scene.add( obj );	
	}	
);


animate();

</script>


<div class="otstup3"></div>

<div class="footer">
<p>
<a href="/">Главная</a> | 
<a href="/o_nas">О Нас</a> |
<a href="/staty">Статьи</a> |
<a href="/contact">Контакты</a>
</p>
</div>

<div class="otstup4"></div>

</div>

</body>
</html>

