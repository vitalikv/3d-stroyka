


var w_w = window.innerWidth;
var w_h = window.innerHeight;
var aspect = w_w/w_h;
var d = 5;

var canvas = document.createElement( 'canvas' );
var context = canvas.getContext( 'webgl2', { antialias: false } );
var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context, preserveDrawingBuffer: true, } );


//renderer.gammaInput = true;
//renderer.gammaOutput = true;
renderer.localClippingEnabled = true;
//renderer.autoClear = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( w_w, w_h );
//renderer.setClearColor (0xffffff, 1);
//renderer.setClearColor (0x9c9c9c, 1);
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

//----------- cameraTop
var cameraTop = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
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
var camera3D = new THREE.PerspectiveCamera( 65, w_w / w_h, 0.05, 1000 );  
camera3D.rotation.order = 'YZX';		//'ZYX'
camera3D.userData.camera3D = {};
camera3D.userData.camera3D.click = '';
camera3D.userData.camera3D.mouse = new THREE.Vector2();
camera3D.userData.camera3D.targetPos = new THREE.Vector3(0, 0, 0);
camera3D.userData.camera3D.intersectPos = new THREE.Vector3();
camera3D.userData.camera3D.theta = 0;
camera3D.userData.camera3D.phi = 0; 

//----------- camera3D



var cameraView = new THREE.PerspectiveCamera( 65, w_w / w_h, 0.01, 1000 );  
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


//----------- Light 
scene.add( new THREE.AmbientLight( 0xffffff, 0.5 ) ); 

var lights = [];
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


var light = new THREE.DirectionalLight( 0xffffff, 0.3 );
light.position.set( 10, 10, 10 );
scene.add( light );
//----------- Light



var cube = new THREE.Mesh( createGeometryCube(0.07, 0.07, 0.07), new THREE.MeshLambertMaterial( { color : 0x030202, transparent: true, opacity: 1, depthTest: false } ) );
//scene.add( cube );



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
	
	//renderer.autoClear = true;
	//renderer.clear();
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





//----------- start


var resolutionD_w = window.screen.availWidth;
var resolutionD_h = window.screen.availHeight;

var kof_rd = 1;

var countId = 2;
var camera = cameraTop;
var height_wall = infProject.settings.height;
var width_wall = infProject.settings.wall.width;
var obj_point = [];
var obj_line = [];
var room = [];
var ceiling = [];
var arrWallFront = [];
var lightMap_1 = new THREE.TextureLoader().load(infProject.path+'/img/lightMap_1.png');

infProject.texture = [];
infProject.texture[0] = { texture: new THREE.TextureLoader().load(infProject.path+'/img/obj/rezba_1.png'), url: '/img/obj/rezba_1.png' };

var clickO = resetPop.clickO();
infProject.project = null;
infProject.scene.array = resetPop.infProjectSceneArray();
infProject.scene.substrate = { ruler: [], floor: [], active: null };
infProject.scene.substrate.ruler = createToolRulerSubstrate();  
infProject.scene.block = { key : { scroll : false } };		// блокировка действий/клавишь
infProject.scene.block.click = {wall: false, point: false, door: false, window: false, room: false, tube: false, controll_wd: false, obj: false};
infProject.scene.block.hover = {wall: false, point: false, door: false, window: false, room: false, tube: false, controll_wd: false, obj: false};
infProject.geometry = {};

infProject.material = {};
infProject.material.pointTube = {};
infProject.material.pointTube.default = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent: true, opacity: 1, depthTest: false, lightMap: lightMap_1});
infProject.material.pointTube.active = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 1, depthTest: false, lightMap: lightMap_1});
infProject.material.pointObj = {};
infProject.material.pointObj.default = new THREE.MeshLambertMaterial({ color: 0x00ff00, transparent: true, opacity: 1, depthTest: false, lightMap: lightMap_1 });
infProject.material.pointObj.active = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 1, depthTest: false, lightMap: lightMap_1});

infProject.material.box_1 = new THREE.MeshStandardMaterial({ color: 0xcccccc, transparent: true, opacity: 0.7, depthTest: false, visible: false }); 

infProject.material.black_1 = new THREE.MeshPhongMaterial({ color: 0x222222, lightMap: lightMap_1, side: THREE.DoubleSide });

infProject.material.black_1_edge = infProject.material.black_1.clone();
infProject.material.black_1_edge.flatShading = true;

infProject.material.white_1 = new THREE.MeshPhongMaterial({ color: 0xf0f0f0, lightMap: lightMap_1, side: THREE.DoubleSide });

infProject.material.white_1_edge = infProject.material.white_1.clone();
infProject.material.white_1_edge.flatShading = true;

infProject.material.white_2 = new THREE.MeshPhongMaterial({ color: 0xd1d1d1, lightMap: lightMap_1, side: THREE.DoubleSide });

infProject.material.metal_1 = new THREE.MeshPhongMaterial({ color: 0xc1c6c9, lightMap: lightMap_1, side: THREE.DoubleSide });
infProject.material.metal_1.shininess = 100;
infProject.material.metal_1.specular.set(0xa3a3a3);

infProject.material.metal_1_edge = infProject.material.metal_1.clone();
infProject.material.metal_1_edge.flatShading = true;

infProject.material.bronz_1 = new THREE.MeshPhongMaterial({ color: 0xb87c23, lightMap: lightMap_1, side: THREE.DoubleSide });
infProject.material.bronz_1.shininess = 100;
infProject.material.bronz_1.specular.set(0xa3a3a3);

infProject.material.bronz_1_edge = infProject.material.bronz_1.clone();
infProject.material.bronz_1_edge.flatShading = true;

infProject.material.rezba_1 = new THREE.MeshPhongMaterial({ color: 0xc1c6c9, map: infProject.texture[0].texture, lightMap: lightMap_1, side: THREE.DoubleSide });
infProject.material.rezba_1.map.repeat.x = 900; 
infProject.material.rezba_1.map.rotation = THREE.Math.degToRad( 2 );
infProject.material.rezba_1.map.wrapS = THREE.RepeatWrapping; 
infProject.material.rezba_1.map.wrapT = THREE.RepeatWrapping;
infProject.material.rezba_1.shininess = 100;
infProject.material.rezba_1.specular.set(0xa3a3a3);

infProject.material.rezba_2 = new THREE.MeshPhongMaterial({ color: 0xb87c23, map: infProject.texture[0].texture, lightMap: lightMap_1, side: THREE.DoubleSide });
infProject.material.rezba_2.map.repeat.x = 900; 
infProject.material.rezba_2.map.rotation = THREE.Math.degToRad( 2 );
infProject.material.rezba_2.map.wrapS = THREE.RepeatWrapping; 
infProject.material.rezba_2.map.wrapT = THREE.RepeatWrapping;
infProject.material.rezba_2.shininess = 100;
infProject.material.rezba_2.specular.set(0xa3a3a3);

infProject.material.red_1 = new THREE.MeshPhongMaterial({ color: 0xbf2502, lightMap: lightMap_1, side: THREE.DoubleSide });
infProject.material.red_1_edge = infProject.material.red_1.clone();
infProject.material.red_1_edge.flatShading = true;

infProject.material.blue_1 = new THREE.MeshPhongMaterial({ color: 0x3e65f0, lightMap: lightMap_1, side: THREE.DoubleSide });

infProject.material.manometr_1 = null;
 

infProject.geometry.circle = createCircleSpline();
infProject.geometry.labelWall = createGeometryPlan(0.25 * 2, 0.125 * 2);
infProject.geometry.labelFloor = createGeometryPlan(1.0 * kof_rd, 0.25 * kof_rd);
infProject.geometry.wf_point = new THREE.SphereGeometry( 0.015, 16, 16 );
infProject.geometry.centerPoint = new THREE.BufferGeometry().fromGeometry(createGeometryWD(0.03, 0.03, 0.03));

infProject.tools = {};
infProject.tools.pivot = null;
infProject.tools.gizmo = null;
infProject.tools.cutWall = [];
infProject.tools.point = createToolPoint();
infProject.tools.axis = createLineAxis();

//infProject.tools.wf = { plane: createPlaneWF(), cube: createControlBoxPop3D() };  // scaleBox   
infProject.tools.plane = {o1: [], el: []};
infProject.tools.heightPl = createPlaneHeight();		// плоскость высоты
infProject.tools.helpVertex = [];
   
infProject.listColor = resetPop.listColor();
infProject.list = {};	// список разных параметров/объектов
infProject.list.rp_ui = { arr: [] };
infProject.list.group_catalog_ui = { arr: [] };
infProject.list.obj_scene_ui = [];
infProject.list.alignP =  { active: false, type: '', p1: null, p2: null, arr2: [] };	// режим соединения деталей/труб
infProject.list.mergeO = {active: false, o1: [], o2: [], el: []};	// режим группировки объектов
infProject.list.sborka = {};
infProject.list.sborka.radiator = [{}, {}, {}];
infProject.list.sborka.radiator[0].niz = paramSborkaRad_Odnotrub_Niz_Mp();
infProject.list.sborka.radiator[0].verh = paramSborkaRad_Odnotrub_Verh_Mp();
infProject.list.sborka.radiator[0].bok = paramSborkaRad_Odnotrub_Bok_Mp();
infProject.list.sborka.radiator[1].niz = paramSborkaRad_Odnotrub_Niz_Bay_Mp();
infProject.list.sborka.radiator[1].verh = paramSborkaRad_Odnotrub_Verh_Bay_Mp();
infProject.list.sborka.radiator[1].bok = paramSborkaRad_Odnotrub_Bok_Bay_Mp();
infProject.list.sborka.radiator[2].niz = paramSborkaRad_Dvuhtrub_Niz_Mp();
infProject.list.sborka.radiator[2].verh = paramSborkaRad_Dvuhtrub_Verh_Mp();
infProject.list.sborka.radiator[2].bok = paramSborkaRad_Dvuhtrub_Bok_Mp();

infProject.list.sborka.zr_nasos = [];
infProject.list.sborka.zr_nasos[0] = paramSborka_Zr_Nasos_1();


infProject.settings.active = {};
infProject.settings.active.pg = 'pivot';		// 'pivot' 'gizmo'
infProject.settings.active.tube = null;
infProject.settings.active.group = true;
infProject.settings.blockKeyCode = false; 	// блокировка клавиатуры
infProject.settings.BD = {};
infProject.settings.BD.table = {};
infProject.settings.BD.table.list_obj = 'list_obj_3';
infProject.start = true; 

infProject.ui = {}
infProject.ui.right_menu = {active: ''};
infProject.ui.div = {};
infProject.ui.div.msDiv_1 = document.querySelector('[nameId="msDiv_1"]');
infProject.ui.cat_item_active = null;

console.log(canvas, infProject.ui.div.msDiv_1);
 

console.log(infProject);



// cutoff боковые отсечки для линеек
// format_1 линейки для отображения длины/высоты стены в режиме cameraWall
// format_2 линейки для окон/мебели
// format_3 нижние размеры между мебелью в режиме cameraWall 
// cube контроллеры для изменения ширины/длины wd
var arrSize = { cutoff : createRulerCutoff(), format_1 : {}, format_2 : {}, format_3 : {line : [], label : []}, cube : createControllWD() };
var labelGeometry_1 = createGeometryPlan2(0.25 * kof_rd, 0.125 * kof_rd); 
arrSize.format_1 = { line : createRulerWin({count : 6, color : 0xcccccc, material : 'standart'}), label : createLabelCameraWall({ count : 2, text : 0, size : 50, ratio : {x:256*2, y:256}, border : 'white', geometry : labelGeometry_1 }) };
arrSize.format_2 = { line : createRulerWin({count : 6, color : 0x000000}), label : createLabelCameraWall({ count : 6, text : 0, size : 50, ratio : {x:256*2, y:256}, border : 'border line', geometry : labelGeometry_1 }) };
arrSize.numberTexture = { line : createRulerWin({count : 6, color : 0x000000, material : 'standart'}), label : createLabelCameraWall({ count : 6, text : [1,2,3,4,5,6], materialTop : 'no', size : 85, ratio : {x:256, y:256}, geometry : createGeometryPlan(0.25, 0.25) }) };



var planeMath = createPlaneMath();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3();
  
  
 
 
if(infProject.settings.calc.fundament == 'svai') 
{
	
}




// outline render
if(1==1)
{
	var composer = new THREE.EffectComposer( renderer );
	var renderPass = new THREE.RenderPass( scene, cameraTop );
	var outlinePass = new THREE.OutlinePass( new THREE.Vector2( w_w, w_h ), scene, cameraTop );
	composer.setSize( w_w, w_h );
	composer.addPass( renderPass );
	composer.addPass( outlinePass );


	outlinePass.visibleEdgeColor.set( '#25db00' );
	outlinePass.hiddenEdgeColor.set( '#25db00' );
	outlinePass.edgeStrength = Number( 5 );		// сила/прочность
	outlinePass.edgeThickness = Number( 0.01 );	// толщина

	outlinePass.selectedObjects = [];


	function outlineAddObj( obj, cdm )
	{	
		if(!cdm) cdm = {};
		
		var arr = [obj];
		if(cdm.arrO) { var arr = cdm.arrO; }
		else if(infProject.settings.active.group) { var arr = getObjsFromGroup_1({obj: obj}); }		
		
		outlinePass.selectedObjects = arr;  
	}

	function outlineRemoveObj()
	{
		outlinePass.selectedObjects = [];
	}	
}




 
//----------- start


 






// не корректно раюотает (не используется)
function recomputeUVs( geometry ) {

	var uvs = [];
  
  geometry.computeBoundingBox();
  
  var min = geometry.boundingBox.min;
  var max = geometry.boundingBox.max;
  
  console.log( min, max );
  
  var position = geometry.getAttribute( 'position' );
  
  var a = new THREE.Vector3();
  var b = new THREE.Vector3();
  var c = new THREE.Vector3();
  
  var plane = new THREE.Plane();
  
  for ( var i = 0; i < position.count; i += 3 ) {
  
  	a.fromBufferAttribute( position, i );
    b.fromBufferAttribute( position, i + 1 );
    c.fromBufferAttribute( position, i + 2 );
    
    plane.setFromCoplanarPoints( a, b, c );
    var normal = plane.normal;
    
    var u, v;
    
   var xRange = max.x - min.x;
   var yRange = max.y - min.y;
   var zRange = max.z - min.z;
    
   if ( normal.x === 1 ||  normal.x === - 1 ) {
   
   		uvs.push( ( a.y - min.y )  / yRange );
      uvs.push( ( a.z - min.z )  / zRange  );
      
      uvs.push( ( b.y - min.y )  / yRange );
      uvs.push( ( b.z - min.z )  / zRange );
      
      uvs.push( ( c.y - min.y )  / yRange );
      uvs.push( ( c.z - min.z )  / zRange  );
   
   }
   
    if ( normal.y === 1 ||  normal.y === - 1 ) {

   		uvs.push( ( a.x - min.x )  / xRange );
      uvs.push( ( a.z - min.z )  / zRange );
      
      uvs.push( ( b.x - min.x )  / xRange );
      uvs.push( ( b.z - min.z )  / zRange  );
      
      uvs.push( ( c.x - min.x )  / xRange );
      uvs.push( ( c.z - min.z )  / zRange  );

    }

    if ( normal.z === 1 ||  normal.z === - 1 ) {

   		uvs.push( ( a.x - min.x )  / xRange  );
      uvs.push( ( a.y - min.y )  / yRange );
      
   		uvs.push( ( b.x - min.x )  / xRange );
      uvs.push( ( b.y - min.y )  / yRange );
      
   		uvs.push( ( c.x - min.x )  / xRange );
      uvs.push( ( c.y - min.y )  / yRange );

   }

  }
  
  geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );


}


function createPlaneMath()
{
	var geometry = new THREE.PlaneGeometry( 10000, 10000 );
	//var geometry = new THREE.PlaneGeometry( 10, 10 );
	var material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.5, side: THREE.DoubleSide } );
	material.visible = false; 
	var planeMath = new THREE.Mesh( geometry, material );
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	planeMath.userData.tag = 'planeMath';	
	scene.add( planeMath );	
	
	return planeMath;
}



function createGeometryPlan(x, y)
{
	var geometry = new THREE.Geometry();
	var vertices = [
				new THREE.Vector3(-x,0,-y),
				new THREE.Vector3(-x,0,y),
				new THREE.Vector3(x,0,y),
				new THREE.Vector3(x,0,-y),
			];

	var faces = [
				new THREE.Face3(0,1,2),
				new THREE.Face3(2,3,0),
			];
	var uvs1 = [
				new THREE.Vector2(0,1),
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
			];
	var uvs2 = [
				new THREE.Vector2(1,0),
				new THREE.Vector2(1,1),
				new THREE.Vector2(0,1),
			];			
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.faceVertexUvs[0] = [uvs1, uvs2];
	geometry.computeFaceNormals();
	
	geometry.uvsNeedUpdate = true;
	
	return geometry;
}



function createGeometryPlan2(x, y)
{
	var geometry = new THREE.Geometry();
	var vertices = [
				new THREE.Vector3(-x,-y,0),
				new THREE.Vector3(-x,y,0),
				new THREE.Vector3(x,y,0),
				new THREE.Vector3(x,-y,0),
			];

	var faces = [
				new THREE.Face3(0,3,2),
				new THREE.Face3(2,1,0),
			];
	var uvs1 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(1,1),
			];
	var uvs2 = [
				new THREE.Vector2(1,1),
				new THREE.Vector2(0,1),
				new THREE.Vector2(0,0),
			];			
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.faceVertexUvs[0] = [uvs1, uvs2];
	geometry.computeFaceNormals();
	
	geometry.uvsNeedUpdate = true;
	
	return geometry;
}



function createGeometryCube(x, y, z, cdm)
{
	var geometry = new THREE.Geometry();
	x /= 2;
	z /= 2;
	var vertices = [
				new THREE.Vector3(-x,0,z),
				new THREE.Vector3(-x,y,z),
				new THREE.Vector3(x,y,z),
				new THREE.Vector3(x,0,z),
				new THREE.Vector3(x,0,-z),
				new THREE.Vector3(x,y,-z),
				new THREE.Vector3(-x,y,-z),
				new THREE.Vector3(-x,0,-z),
			];	
			
	var faces = [
				new THREE.Face3(0,3,2),
				new THREE.Face3(2,1,0),
				new THREE.Face3(4,7,6),
				new THREE.Face3(6,5,4),				
				new THREE.Face3(0,1,6),
				new THREE.Face3(6,7,0),					
				new THREE.Face3(1,2,5),
				new THREE.Face3(5,6,1),				
				new THREE.Face3(2,3,4),
				new THREE.Face3(4,5,2),				
				new THREE.Face3(3,0,7),
				new THREE.Face3(7,4,3),
			];
	
	var uvs3 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(1,1),
			];
	var uvs4 = [
				new THREE.Vector2(1,1),
				new THREE.Vector2(0,1),
				new THREE.Vector2(0,0),
			];	

	var uvs1 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(0.95,1),
			];
	var uvs2 = [
				new THREE.Vector2(0.95,1),
				new THREE.Vector2(1-0.95,1),
				new THREE.Vector2(0,0),
			];				


			
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.faceVertexUvs[0] = [uvs3, uvs4, uvs3, uvs4, uvs3, uvs4, uvs1, uvs2, uvs3, uvs4, uvs3, uvs4];
	geometry.computeFaceNormals();	
	geometry.uvsNeedUpdate = true;	

	if(cdm)
	{
		if(cdm.material)
		{
			geometry.faces[0].materialIndex = 1;
			geometry.faces[1].materialIndex = 1;	
			geometry.faces[2].materialIndex = 2;
			geometry.faces[3].materialIndex = 2;	
			geometry.faces[6].materialIndex = 3;
			geometry.faces[7].materialIndex = 3;				
		}
	}
	
	return geometry;
}



function createGeometryWD(x, y, z) 
{
	var geometry = new THREE.Geometry();
	x /= 2;
	y /= 2;
	z /= 2;
	var vertices = [
				new THREE.Vector3(-x,-y,z),
				new THREE.Vector3(-x,y,z),
				new THREE.Vector3(x,y,z),
				new THREE.Vector3(x,-y,z),
				new THREE.Vector3(x,-y,-z),
				new THREE.Vector3(x,y,-z),
				new THREE.Vector3(-x,y,-z),
				new THREE.Vector3(-x,-y,-z),
			];	
			
	var faces = [
				new THREE.Face3(0,3,2),
				new THREE.Face3(2,1,0),
				new THREE.Face3(4,7,6),
				new THREE.Face3(6,5,4),				
				new THREE.Face3(0,1,6),
				new THREE.Face3(6,7,0),					
				new THREE.Face3(1,2,5),
				new THREE.Face3(5,6,1),				
				new THREE.Face3(2,3,4),
				new THREE.Face3(4,5,2),				
				new THREE.Face3(3,0,7),
				new THREE.Face3(7,4,3),
			];
	
	var uvs3 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(1,1),
			];
	var uvs4 = [
				new THREE.Vector2(1,1),
				new THREE.Vector2(0,1),
				new THREE.Vector2(0,0),
			];	

	var uvs1 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(0.95,1),
			];
	var uvs2 = [
				new THREE.Vector2(0.95,1),
				new THREE.Vector2(1-0.95,1),
				new THREE.Vector2(0,0),
			];				


			
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.faceVertexUvs[0] = [uvs3, uvs4, uvs3, uvs4, uvs3, uvs4, uvs1, uvs2, uvs3, uvs4, uvs3, uvs4];
	geometry.computeFaceNormals();	
	geometry.uvsNeedUpdate = true;		
	
	return geometry;
}



function createGeometryWall(x, y, z, pr_offsetZ)
{
	var geometry = new THREE.Geometry();
	
	var h1 = 0;
	
	if(1==1)
	{
		var z1 = z / 2 + pr_offsetZ / 2;
		var z2 = -z / 2 + pr_offsetZ / 2;  		
	}
	else
	{
		var z1 = z / 2 + pr_offsetZ;
		var z2 = -z / 2 + pr_offsetZ;  		
	}
		
	var vertices = [
				new THREE.Vector3(0,h1,z1),
				new THREE.Vector3(0,y,z1),
				new THREE.Vector3(0,h1,0),
				new THREE.Vector3(0,y,0),
				new THREE.Vector3(0,h1,z2),
				new THREE.Vector3(0,y,z2),								
								
				new THREE.Vector3(x,h1,z1),
				new THREE.Vector3(x,y,z1),
				new THREE.Vector3(x,h1,0),
				new THREE.Vector3(x,y,0),
				new THREE.Vector3(x,h1,z2),
				new THREE.Vector3(x,y,z2),						
			];	
			
	var faces = [
				new THREE.Face3(0,6,7),
				new THREE.Face3(7,1,0),
				new THREE.Face3(4,5,11),
				new THREE.Face3(11,10,4),				
				new THREE.Face3(1,7,9),
				new THREE.Face3(9,3,1),					
				new THREE.Face3(9,11,5),
				new THREE.Face3(5,3,9),				
				new THREE.Face3(6,8,9),
				new THREE.Face3(9,7,6),				
				new THREE.Face3(8,10,11),
				new THREE.Face3(11,9,8),
				
				new THREE.Face3(0,1,3),
				new THREE.Face3(3,2,0),	

				new THREE.Face3(2,3,5),
				new THREE.Face3(5,4,2),	

				new THREE.Face3(0,2,8),
				new THREE.Face3(8,6,0),

				new THREE.Face3(2,4,10),
				new THREE.Face3(10,8,2),					
			];
	
	var uvs1 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(1,1),
			];
	var uvs2 = [
				new THREE.Vector2(1,1),
				new THREE.Vector2(0,1),
				new THREE.Vector2(0,0),
			];					


			
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.faceVertexUvs[0] = [uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2];
	geometry.computeFaceNormals();	
	geometry.uvsNeedUpdate = true;	
	
	geometry.faces[0].materialIndex = 1;
	geometry.faces[1].materialIndex = 1;	
	geometry.faces[2].materialIndex = 2;
	geometry.faces[3].materialIndex = 2;	
	geometry.faces[4].materialIndex = 3;
	geometry.faces[5].materialIndex = 3;
	geometry.faces[6].materialIndex = 3;
	geometry.faces[7].materialIndex = 3;
	
	return geometry;
}



function createLineAxis() 
{
	var axis = [];
	
	var geometry = createGeometryCube(0.5, 0.02, 0.02);		
	var v = geometry.vertices;	
	v[3].x = v[2].x = v[5].x = v[4].x = 500;
	v[0].x = v[1].x = v[6].x = v[7].x = -500;	
	
	var material = new THREE.MeshLambertMaterial( { color : 0xff0000, transparent: true, depthTest: false, lightMap : lightMap_1 } );
	
	for(var i = 0; i < 2; i++)
	{
		axis[i] = new THREE.Mesh( geometry, material );
		axis[i].renderOrder = 2;
		axis[i].visible = false;
		scene.add( axis[i] );				
	}		
	
	return axis;
}


// vertex для Gizmo
function createGeometryCircle( vertices )
{
	var geometry = new THREE.Geometry();

	var faces = [];

	var n = 0;
	for ( var i = 0; i < vertices.length - 4; i += 4 )
	{
		faces[ n ] = new THREE.Face3( i + 0, i + 4, i + 6 ); n++;
		faces[ n ] = new THREE.Face3( i + 6, i + 2, i + 0 ); n++;

		faces[ n ] = new THREE.Face3( i + 2, i + 6, i + 7 ); n++;
		faces[ n ] = new THREE.Face3( i + 7, i + 3, i + 2 ); n++;

		faces[ n ] = new THREE.Face3( i + 3, i + 7, i + 5 ); n++;
		faces[ n ] = new THREE.Face3( i + 5, i + 1, i + 3 ); n++;

		faces[ n ] = new THREE.Face3( i + 0, i + 1, i + 5 ); n++;
		faces[ n ] = new THREE.Face3( i + 5, i + 4, i + 0 ); n++;
	}


	faces[ n ] = new THREE.Face3( i + 0, 0, 2 ); n++;
	faces[ n ] = new THREE.Face3( 2, i + 2, i + 0 ); n++;

	faces[ n ] = new THREE.Face3( i + 2, 2, 3 ); n++;
	faces[ n ] = new THREE.Face3( 3, i + 3, i + 2 ); n++;

	faces[ n ] = new THREE.Face3( i + 3, 3, 1 ); n++;
	faces[ n ] = new THREE.Face3( 1, i + 1, i + 3 ); n++;

	faces[ n ] = new THREE.Face3( i + 0, i + 1, 1 ); n++;
	faces[ n ] = new THREE.Face3( 1, 0, i + 0 ); n++;



	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.computeFaceNormals();
	geometry.uvsNeedUpdate = true;

	return geometry;
}




function createCircleSpline()
{
	var count = 48;
	var circle = [];
	var g = (Math.PI * 2) / count;
	
	for ( var i = 0; i < count; i++ )
	{
		var angle = g * i;
		circle[i] = new THREE.Vector3();
		circle[i].x = Math.sin(angle);
		circle[i].z = Math.cos(angle);
		//circle[i].y = 0;
	}

	return circle;
}


function createToolPoint()
{	
	var n = 0;
	var v = [];
	var circle = infProject.geometry.circle;
	
	for ( var i = 0; i < circle.length; i++ )
	{
		v[n] = new THREE.Vector3().addScaledVector( circle[i].clone().normalize(), 0.1 );
		v[n].y = 0;		
		n++;		
		
		v[n] = new THREE.Vector3();
		v[n].y = 0;
		n++;
		
		v[n] = v[n - 2].clone();
		v[n].y = height_wall + 0.01;
		n++;	
		
		v[n] = new THREE.Vector3();
		v[n].y = height_wall + 0.01;
		n++;		
	}	

	
	var obj = new THREE.Mesh( createGeometryCircle(v), new THREE.MeshLambertMaterial( { color : 0x333333, wireframe:false } ) ); 
	obj.userData.tag = 'tool_point';
	obj.renderOrder = 1;
	obj.position.set(0,0,0);
	obj.visible = false;	
	scene.add( obj );
	
	return obj;
}






function createPoint( pos, id )
{
	var point = obj_point[obj_point.length] = new THREE.Mesh( infProject.tools.point.geometry, new THREE.MeshLambertMaterial( { color : 0x333333, transparent: true, opacity: 0.6, depthTest: false, lightMap : lightMap_1 } ) ); 
	point.position.copy( pos );		

	point.renderOrder = 1;
	
	point.w = [];
	point.p = [];
	point.start = [];		
	point.zone = [];
	point.zoneP = [];
	
	
	if(id == 0) { id = countId; countId++; }	
	point.userData.id = id;	
	point.userData.tag = 'point';
	point.userData.point = {};
	point.userData.point.color = point.material.color.clone();
	point.userData.point.cross = null;
	point.userData.point.type = null;
	point.userData.point.last = { pos : pos.clone(), cdm : '', cross : null };
	
	point.visible = (camera == cameraTop) ? true : false;
	
	scene.add( point );	
	
	return point;
}


  




function createOneWall3( point1, point2, width, cdm ) 
{
	var offsetZ = (cdm.offsetZ) ? cdm.offsetZ : 0;  
	var height = (cdm.height) ? cdm.height : height_wall; 
	
	var p1 = point1.position;
	var p2 = point2.position;	
	var d = p1.distanceTo( p2 );
	
	var color = [0x7d7d7d, 0x696969]; 
	
	
	if(infProject.settings.project == 'warm_floor' && infProject.settings.wall.color) 
	{  
		if(infProject.settings.wall.color.front) color[0] = infProject.settings.wall.color.front; 
		if(infProject.settings.wall.color.top) color[1] = infProject.settings.wall.color.top; 
	}	
	
	var material = new THREE.MeshLambertMaterial({ color : color[0], lightMap : lightMap_1 });
	
	var materials = [ material.clone(), material.clone(), material.clone(), new THREE.MeshLambertMaterial( { color: color[1], lightMap : lightMap_1 } ) ];

	if(cdm.color)
	{
		for( var i = 0; i < cdm.color.length; i++ )
		{
			for( var i2 = 0; i2 < materials.length; i2++ )
			{
				if(cdm.color[i].index == i2) { materials[i2].color = new THREE.Color( cdm.color[i].o ); break; }
			}
		}
	}

	
	var geometry = createGeometryWall(d, height, width, offsetZ);	
	var wall = obj_line[obj_line.length] = new THREE.Mesh( geometry, materials ); 
 	
	
	wall.label = [];
	wall.label[0] = createLabelCameraWall({ count : 1, text : 0, size : 85, ratio : {x:256*2, y:256}, geometry : infProject.geometry.labelWall, opacity : 0.5 })[0];	
	wall.label[0].visible = false;
	
	wall.label[1] = createLabelCameraWall({ count : 1, text : 0, size : 85, ratio : {x:256*2, y:256}, geometry : infProject.geometry.labelWall, opacity : 0.5 })[0]; 
	wall.label[1].visible = false;
	
	if(infProject.settings.wall.label == 'outside' || infProject.settings.wall.label == 'inside') 
	{
		wall.label[0].visible = true;
	}
	else if(infProject.settings.wall.label == 'double') 
	{
		wall.label[0].visible = true;
		wall.label[1].visible = true;
	}
	
	
	wall.position.copy( p1 );
	
	// --------------
	if(!cdm.id) { cdm.id = countId; countId++; }
	
	wall.userData.tag = 'wall';
	wall.userData.id = cdm.id;
	
	wall.userData.wall = {};				
	wall.userData.wall.p = [];
	wall.userData.wall.p[0] = point1;
	wall.userData.wall.p[1] = point2;	
	wall.userData.wall.width = Math.round(width * 100) / 100;
	wall.userData.wall.height_0 = -0.1;
	wall.userData.wall.height_1 = Math.round(height * 100) / 100;		
	wall.userData.wall.offsetZ = Math.round(offsetZ * 100) / 100;
	wall.userData.wall.outline = null;
	wall.userData.wall.zone = null; 
	wall.userData.wall.arrO = [];
	wall.userData.wall.last = { pos : new THREE.Vector3(), rot : new THREE.Vector3() }; 
	wall.userData.wall.area = { top : 0 }; 
	//wall.userData.wall.active = { click: true, hover: true };
	
	wall.userData.wall.brick = { arr : [] };
	wall.userData.wall.room = { side : 0, side2 : [null,null,null] };
	
	var v = wall.geometry.vertices;
	wall.userData.wall.v = [];
	
	for ( var i = 0; i < v.length; i++ ) { wall.userData.wall.v[i] = v[i].clone(); }
	
	wall.userData.material = [];
	wall.userData.material[0] = { color : wall.material[0].color, scale : new THREE.Vector2(1,1), };	// top
	wall.userData.material[1] = { color : wall.material[1].color, scale : new THREE.Vector2(1,1), };	// left
	wall.userData.material[2] = { color : wall.material[2].color, scale : new THREE.Vector2(1,1), };	// right
	wall.userData.material[3] = { color : wall.material[3].color, scale : new THREE.Vector2(1,1), };
	// --------------

	
	upUvs_1( wall );
	
	if(cdm.texture)
	{ 
		var m = cdm.texture;
		
		for ( var i = 0; i < m.length; i++ )
		{
			setTexture({obj:wall, material:m[i]});
		}	
	}
	
	//console.log(wall);
	
	var dir = new THREE.Vector3().subVectors( p1, p2 ).normalize();
	var angleDeg = Math.atan2(dir.x, dir.z);
	wall.rotation.set(0, angleDeg + Math.PI / 2, 0);
	
	
	var n = point1.w.length;		
	point1.w[n] = wall;
	point1.p[n] = point2;
	point1.start[n] = 0;	

	
	var n = point2.w.length;		
	point2.w[n] = wall;
	point2.p[n] = point1;
	point2.start[n] = 1;
		

	
	scene.add( wall );
		
	return wall;
}


 

function rayIntersect( event, obj, t, recursive ) 
{
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	
	var intersects = null;
	if(t == 'one'){ intersects = raycaster.intersectObject( obj ); } 
	else if(t == 'arr'){ intersects = raycaster.intersectObjects( obj, recursive ); }
	
	return intersects;
}




// устанавливаем текстуру
function setTexture(cdm)
{
	//if(!cdm.img) return;
	
	var img = infProject.path+cdm.material.img;
	var material = (cdm.material.index) ? cdm.obj.material[cdm.material.index] : cdm.obj.material;
	
	new THREE.TextureLoader().load(img, function ( image )  
	{
		material.color = new THREE.Color( 0xffffff );
		var texture = image;			
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
		
		if(cdm.repeat)
		{
			texture.repeat.x = cdm.repeat.x;
			texture.repeat.y = cdm.repeat.y;			
		}
		else
		{
			texture.repeat.x = 1;
			texture.repeat.y = 1;			
		}
		
		texture.needsUpdate = true;
		
		material.map = texture; 
		material.lightMap = lightMap_1;
		material.needsUpdate = true; 					
		
		renderCamera();
	});			
}






// нажали на кнопку интерфейса, загружаем объект	
function clickButton( event )
{
	if(!clickO.button) return;	
	
	if(camera == cameraView) 
	{
		clickO.button = null;		
		return;
	}
	
	if(camera == cameraTop)
	{
		planeMath.position.set(0, 0, 0);
		planeMath.rotation.set(-Math.PI/2, 0, 0);
	}
	
	planeMath.updateMatrixWorld();

	var intersects = rayIntersect( event, planeMath, 'one' );
	
	if(intersects.length == 0) return;	
	
	if(camera == cameraTop || camera == camera3D)
	{ 		
		if(clickO.button == 'add_lotid')
		{
			loadObjServer({lotid: clickO.options, cursor: true});
		}
		else if(clickO.button == 'add_group_obj')
		{
			addSborkaToScene_1({addScene: true, inf: clickO.options});
		}		
	}
	
	clickO.buttonAct = clickO.button;
	clickO.button = null;
	
}	
	

function clickInterface(cdm)
{
	if(clickO.move)
	{
		deActiveSelected();
		mouseDownRight();
	}

	console.log(cdm);
	if(cdm)
	{		
		deActiveSelected();	
				
		if(cdm.button == 'add_lotid')
		{
			clickO.button = cdm.button; 
			clickO.options = cdm.value;					
		}
		else if(cdm.button == 'add_group_obj')
		{
			clickO.button = cdm.button; 
			clickO.options = cdm.value;					
		}		
	}

}	



// декативируем старое выделение (объект и меню)
function deActiveSelected()
{
	clickO.obj = null;
	clickO.rayhit = null;
	
	hideMenuObjUI_2D();	

	clickO = resetPop.clickO();

	renderCamera();	
}




function upUvs_1( obj )
{ return;
	obj.updateMatrixWorld();
	var geometry = obj.geometry;
	
    geometry.faceVertexUvs[0] = [];
	var faces = geometry.faces;
	var n = 1;
	
	
    for (var i = 0; i < faces.length; i++) 
	{		
		var components = ['x', 'y', 'z'].sort(function(a, b) {
			return Math.abs(faces[i].normal[a]) > Math.abs(faces[i].normal[b]);
		});	


        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];				

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(v1[components[0]], v1[components[1]]),
            new THREE.Vector2(v2[components[0]], v2[components[1]]),
            new THREE.Vector2(v3[components[0]], v3[components[1]])
        ]);
    }

    geometry.uvsNeedUpdate = true;
	geometry.elementsNeedUpdate = true;	
}





//----------- Math			
function localTransformPoint(dir1, qt)
{	
	return dir1.clone().applyQuaternion( qt.clone().inverse() );
}


function worldTransformPoint(dir1, dir_local)
{	
	var qt = quaternionDirection(dir1);			
	return dir_local.applyQuaternion( qt );
}


function quaternionDirection(dir1)
{
	var mx = new THREE.Matrix4().lookAt( dir1, new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0) );
	return new THREE.Quaternion().setFromRotationMatrix(mx);	
}
//----------- Math
 

 
 

// screenshot
function saveAsImage(cdm) 
{ 
	if(!cdm) { cdm = {}; }
	
	try 
	{	
		if(cdm.preview) { renderer.setSize( 300, 300 * (w_h/w_w) ); }
		renderer.antialias = true;
		renderer.render( scene, camera );
		
		var strMime = "image/png"; 
		var imgData = renderer.domElement.toDataURL(strMime);	

		if(cdm.preview) { renderer.setSize( w_w, w_h ); }
		renderer.antialias = false;
		renderer.render( scene, camera );
 
		if(cdm.preview) { return imgData; }
		else { openFileImage(imgData.replace(strMime, "image/octet-stream"), "screenshot.png"); }		
	} 
	catch (e) 
	{
		console.log(e);
		return;
	}
}





// открыть или сохранить screenshot
var openFileImage = function (strData, filename) 
{
	var link = document.createElement('a');
	
	if(typeof link.download === 'string') 
	{		
		document.body.appendChild(link); //Firefox requires the link to be in the body
		link.download = filename;
		link.href = strData;
		link.click();
		document.body.removeChild(link); //remove the link when done
	} 
	else 
	{
		location.replace(uri);
	}
}   



	
	
 
function setUnits()
{
	 
}



// находим стены/точки/объекты по id
function findObjFromId( cdm, id )
{
	var point = infProject.scene.array.point;
	var wall = infProject.scene.array.wall;
	var window = infProject.scene.array.window;
	var door = infProject.scene.array.door;	
	var room = infProject.scene.array.room;
	var obj = infProject.scene.array.obj; 
	var tube = infProject.scene.array.tube; 
	
	if(cdm == 'wall')
	{
		for ( var i = 0; i < wall.length; i++ ){ if(wall[i].userData.id == id){ return wall[i]; } }			
	}
	else if(cdm == 'point')
	{
		for ( var i = 0; i < point.length; i++ ){ if(point[i].userData.id == id){ return point[i]; } }
	}
	else if(cdm == 'wd')
	{
		for ( var i = 0; i < window.length; i++ ){ if(window[i].userData.id == id){ return window[i]; } }
		for ( var i = 0; i < door.length; i++ ){ if(door[i].userData.id == id){ return door[i]; } }
	}
	else if(cdm == 'window')
	{
		for ( var i = 0; i < window.length; i++ ){ if(window[i].userData.id == id){ return window[i]; } }
	}
	else if(cdm == 'door')
	{
		for ( var i = 0; i < door.length; i++ ){ if(door[i].userData.id == id){ return door[i]; } }
	}
	else if(cdm == 'room')
	{
		for ( var i = 0; i < room.length; i++ ){ if(room[i].userData.id == id){ return room[i]; } }
	}
	else if(cdm == 'obj')
	{
		for ( var i = 0; i < obj.length; i++ ){ if(obj[i].userData.id == id){ return obj[i]; } }
	}
	else if(cdm == 'tube')
	{
		for ( var i = 0; i < tube.length; i++ ){ if(tube[i].userData.id == id){ return tube[i]; } }
	}
	
	return null;
}



animate();
renderCamera();

var mainDiv_1 = document.querySelector('[nameId="mainDiv_1"]');

document.body.addEventListener('contextmenu', function(event) { event.preventDefault() });
mainDiv_1.addEventListener( 'mousedown', onDocumentMouseDown, false );
mainDiv_1.addEventListener( 'mousemove', onDocumentMouseMove, false );
mainDiv_1.addEventListener( 'mouseup', onDocumentMouseUp, false );


mainDiv_1.addEventListener( 'touchstart', onDocumentMouseDown, false );
mainDiv_1.addEventListener( 'touchmove', onDocumentMouseMove, false );
mainDiv_1.addEventListener( 'touchend', onDocumentMouseUp, false );

mainDiv_1.addEventListener("mouseout", function () { infProject.ui.div.msDiv_1.style.display = "none"; });	// вышли из canvas или навели на другой элемент

mainDiv_1.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
mainDiv_1.addEventListener('mousewheel', onDocumentMouseWheel, false);	


document.body.addEventListener("keydown", function (e) 
{ 
	if(clickO.keys[e.keyCode]) return;
	
	
	
	if(infProject.activeInput) 
	{ 
		if(e.keyCode == 13)
		{ 
			console.log(infProject.activeInput);
			 
			if(infProject.activeInput == 'input-width') { changeWidthWall( $('[data-action="input-width"]').val() ); }
			if(infProject.activeInput == 'wall_1') { inputChangeWall_1({}); }	 		
			if(infProject.activeInput == 'wd_1') { inputWidthHeightWD(clickO.last_obj); }
			if(infProject.activeInput == 'size_wall_width_1') 
			{ 
				var width = $('[nameid="size_wall_width_1"]').val();
				
				inputWidthOneWall({wall:clickO.last_obj, width:{value: width}, offset:'wallRedBlueArrow'}); 
			}
			if(infProject.activeInput == 'size_tube_diameter_2')
			{
				var size = $('[nameid="size_tube_diameter_2"]').val();
				
				inputWF_tubeDiametr({line: clickO.last_obj, size: size});
			}
			else if(infProject.activeInput == 'dp_inf_1_proj')
			{
				inputLoadProject();
			}
			else if(infProject.activeInput == 'input_rotate_substrate')
			{
				setRotateSubstrate({angle: document.querySelector('[nameId="input_rotate_substrate"]').value, set: true});
			}
			else if(infProject.activeInput == 'input_size_substrate')
			{
				assignSizeSubstrate();
			}
			else if(infProject.activeInput == 'rp_height_plane')
			{
				setPlanePositionY({ value: document.querySelector('[nameId="rp_height_plane"]').value });
			}
			else if(infProject.activeInput == 'rp_floor_name')
			{
				renameFloor({ obj: infProject.scene.substrate.active }); 
			}			
			else if(infProject.activeInput == 'rp_obj_name')
			{
				renameObject({ obj: clickO.last_obj, name: infProject.elem.rp_obj_name.value });
			}
			else if(infProject.activeInput == 'rp_planeHeight_posY')
			{
				setPlaneHeightPositionY({ value: document.querySelector('[nameId="rp_planeHeight_posY"]').value }); 
			}
			else if(infProject.activeInput == 'object_pos_X' || infProject.activeInput == 'object_pos_Y' || infProject.activeInput == 'object_pos_Z')
			{
				infProject.tools.pivot.userData.propPivot({type: 'inputPosPivot'});
			}
			else if(infProject.activeInput == 'object_rotate_X' || infProject.activeInput == 'object_rotate_Y' || infProject.activeInput == 'object_rotate_Z')
			{
				inputChangeRot(); 
			}			
		}		
		 
		return; 
	}

	if(infProject.settings.blockKeyCode) return;
	
	if(e.keyCode == 90) { fitCameraToObject({obj: clickO.last_obj, rot: true}); }	// z
		
	if(e.keyCode == 46) { detectDeleteObj({obj: clickO.last_obj}); }
	
	if (window.location.hostname == '3d-stroyka')
	{
		if(e.keyCode == 13 && 1==1)
		{
			//console.log(renderer.info.memory.geometries, renderer.info.memory.textures);
			getInfoFcObj();
		}		
		
		if(clickO.keys[18] && e.keyCode == 83) {  }		// alt + s
		if(clickO.keys[18] && e.keyCode == 72) { getConsoleRendererInfo(); }		// alt + h
		if(clickO.keys[18] && e.keyCode == 77) { inputLoadProject(); }				// alt + m
		if(clickO.keys[18] && e.keyCode == 84) { saveFile({json: true}); }			// alt + t
		if(clickO.keys[18] && e.keyCode == 86) { console.log(infProject); }
		if(clickO.keys[18] && e.keyCode == 86) { console.log(clickO); }  		// alt + v		
	}
} );

document.body.addEventListener("keydown", function (e) { clickO.keys[e.keyCode] = true; });
document.body.addEventListener("keyup", function (e) { clickO.keys[e.keyCode] = false; });



// загрзука проекта из базы через input
function inputLoadProject()
{
	var visible = $('[nameid="dp_inf_1"]').is(":visible");
	
	$('[nameid="dp_inf_1"]').toggle();
	
	if(visible)
	{
		var num = Number($('[nameid="dp_inf_1_proj"]').val());
		
		loadFile({id: num});
		
		console.log(num);
	}
}



// проверяем правильность ввода числа (вводим число в своих единицах, отдаем в метрах)
function checkNumberInput(cdm)
{
	var value = cdm.value;
	
	if((/,/i).test( value )) { value = value.replace(",", "."); }
	
	if(!isNumeric(value)) return null; 
	
	value = Number(value);
	
	if(cdm.abs)
	{
		value = Math.abs(value);
	}
	
	if(cdm.int)
	{ 
		value = Math.round(value);  
	}	
	
	if(cdm.unit)
	{
		if(cdm.unit == 0.01) { value /= 100; } // см
		else if(cdm.unit == 0.001) { value /= 1000; } // мм
	}		

	if(cdm.limit)
	{
		if(cdm.limit.max < value) { value = cdm.limit.max; }
		if(cdm.limit.min > value) { value = cdm.limit.min; }
	}

	return {num: value};	
}


// блокировка клавиатуры
function blockKeyCode(cdm) 
{	 
	if(!cdm) { cdm = {}; } 
	 
	if(cdm.block !== undefined) 
	{ 
		infProject.settings.blockKeyCode = cdm.block; 
	}	 
} 


// проверяем существует ли функция
function isCheckExsistFunction(functionToCheck)  
{
    var getType = {};
	
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]' || functionToCheck && getType.toString.call(functionToCheck) === '[object AsyncFunction]';
}


// пауза в миллесекундах
async function sleepPause(milliseconds) 
{
	const date = Date.now();
	let currentDate = null;
	do 
	{
		currentDate = Date.now();
	} 
	while (currentDate - date < milliseconds);
}



var docReady = false;

document.addEventListener("DOMContentLoaded", init);

function init()
{
	crPivot({container: mainDiv_1});
	crGizmo({container: mainDiv_1});
	
	startPosCamera3D({radious: 15, theta: 90, phi: 35});		// стартовое положение 3D камеры
	addObjInCatalogUI_1();										// каталог UI
	 
	//changeRightMenuUI_1({name: 'button_wrap_plan'});			// назначаем первоначальную вкладку , которая будет включена
	changeRightMenuUI_1({name: 'button_wrap_object'});
	//changeRightMenuUI_1({name: 'button_wrap_catalog'});
	startPlanElemPlus({});										// добавляем в список +, для добавления этажа

	setPlaneHeightPositionY({ value: 0.4 });

	crEventButtonWarmTube({container: mainDiv_1});
	crEventButtonWarmTubeGrid({container: mainDiv_1});	
	
	
	docReady = true; 

	loadFile({json: true}); 	
}
























