


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
	
	updateKeyDown();
	
	detectMouseObj();
}





function renderCamera()
{
	//camera.updateMatrixWorld();			
	//composer.render();
	camOrbit.render();
}


//----------- render




var composer, renderPass, outlinePass;

// outline render
function outlineInit({camera})
{
	composer = new THREE.EffectComposer( renderer );
	renderPass = new THREE.RenderPass( scene, camera );
	outlinePass = new THREE.OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
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
	else { var arr = ddGetGroup({obj, tubePoint: true}); }		
	
	outlinePass.selectedObjects = arr;  
}

function outlineRemoveObj()
{
	outlinePass.selectedObjects = [];
}	


