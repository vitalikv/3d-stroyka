


var canvas, context, renderer, scene;


function initScene()
{
	canvas = document.createElement( 'canvas' );
	context = canvas.getContext( 'webgl2', { antialias: false } );
	renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context, preserveDrawingBuffer: true, } );

	renderer.localClippingEnabled = true;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.append( renderer.domElement );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );	
}

var camera, cameraTop, camera3D, cameraView;

function initCams()
{
	var d = 5;
	var aspect = window.innerWidth / window.innerHeight;
	//----------- cameraTop
	cameraTop = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
	cameraTop.position.set(0, 30, 0);
	cameraTop.lookAt(scene.position);
	cameraTop.zoom = infProject.settings.camera.zoom;
	cameraTop.updateMatrixWorld();
	cameraTop.updateProjectionMatrix();
	cameraTop.userData.cameraTop = {};
	cameraTop.userData.cameraTop.click = '';
	cameraTop.userData.cameraTop.mouse = new THREE.Vector2();
	//----------- cameraTop

	 
	//----------- camera3D
	camera3D = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.05, 1000 );  
	camera3D.rotation.order = 'YZX';		//'ZYX'
	camera3D.userData.camera3D = {};
	camera3D.userData.camera3D.click = '';
	camera3D.userData.camera3D.mouse = new THREE.Vector2();
	camera3D.userData.camera3D.targetPos = new THREE.Vector3(0, 0, 0);
	camera3D.userData.camera3D.intersectPos = new THREE.Vector3();
	camera3D.userData.camera3D.theta = 0;
	camera3D.userData.camera3D.phi = 0; 

	//----------- camera3D



	cameraView = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.01, 1000 );  
	cameraView.rotation.order = 'YZX';		//'ZYX'
	cameraView.position.set(0, 1, 1);
	cameraView.lookAt(new THREE.Vector3());
	cameraView.userData.cameraView = {};
	cameraView.userData.cameraView.click = '';
	cameraView.userData.cameraView.mouse = new THREE.Vector2();
	cameraView.userData.cameraView.targetPos = new THREE.Vector3(0, 0, 0);
	cameraView.userData.cameraView.intersectPos = new THREE.Vector3();
	cameraView.userData.cameraView.theta = 0;
	cameraView.userData.cameraView.phi = 0; 
	cameraView.userData.cameraView.lastCam = null;
	cameraView.userData.cameraView.arrO = [];
	
	
	camera = cameraTop;
}



function initLights()
{
	var lights = [];
	var light;	
	
	scene.add( new THREE.AmbientLight( 0xffffff, 0.5 ) ); 
	
	lights[ 0 ] = new THREE.PointLight( 0x222222, 0.7, 0 );
	lights[ 1 ] = new THREE.PointLight( 0x222222, 0.5, 0 );
	lights[ 2 ] = new THREE.PointLight( 0x222222, 0.8, 0 );
	lights[ 3 ] = new THREE.PointLight( 0x222222, 0.2, 0 );

	lights[ 0 ].position.set( -1000, 200, 1000 );
	lights[ 1 ].position.set( -1000, 200, -1000 );
	lights[ 2 ].position.set( 1000, 200, -1000 );
	lights[ 3 ].position.set( 1000, 200, 1000 );

	scene.add( lights[ 0 ] );
	scene.add( lights[ 1 ] );
	scene.add( lights[ 2 ] );
	scene.add( lights[ 3 ] );


	light = new THREE.DirectionalLight( 0xffffff, 0.3 );
	light.position.set( 10, 10, 10 );
	scene.add( light );	
}




//----------- render
function animate() 
{
	requestAnimationFrame( animate );	

	cameraZoomTopLoop();	
	
	updateKeyDown();
	
	detectMouseObj();
}





function renderCamera()
{
	camera.updateMatrixWorld();			
	composer.render();
}


//----------- render


//----------- onWindowResize
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() 
{ 
	var aspect = window.innerWidth / window.innerHeight;
	var d = 5;
	
	cameraTop.left = -d * aspect;
	cameraTop.right = d * aspect;
	cameraTop.top = d;
	cameraTop.bottom = -d;
	cameraTop.updateProjectionMatrix();

	 
	camera3D.aspect = aspect;
	camera3D.updateProjectionMatrix();
	
	cameraView.aspect = aspect;
	cameraView.updateProjectionMatrix();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	renderCamera();
}
//----------- onWindowResize



var composer, renderPass, outlinePass;

// outline render
function outlineInit()
{
	composer = new THREE.EffectComposer( renderer );
	renderPass = new THREE.RenderPass( scene, cameraTop );
	outlinePass = new THREE.OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, cameraTop );
	composer.setSize( window.innerWidth, window.innerHeight );
	composer.addPass( renderPass );
	composer.addPass( outlinePass );


	outlinePass.visibleEdgeColor.set( '#25db00' );
	outlinePass.hiddenEdgeColor.set( '#25db00' );
	outlinePass.edgeStrength = Number( 5 );		// сила/прочность
	outlinePass.edgeThickness = Number( 0.01 );	// толщина

	outlinePass.selectedObjects = [];
}


function outlineAddObj( obj, cdm )
{	
	if(!cdm) cdm = {};
	
	var arr = [obj];
	if(cdm.arrO) { var arr = cdm.arrO; }
	else if(infProject.settings.active.group) { var arr = ddGetGroup({obj, tubePoint: true}); }		
	
	outlinePass.selectedObjects = arr;  
}

function outlineRemoveObj()
{
	outlinePass.selectedObjects = [];
}	


