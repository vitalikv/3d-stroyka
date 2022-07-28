
var countId = 2;
var lightMap_1 = new THREE.TextureLoader().load(infProject.path+'/img/lightMap_1.png');
var clickO = resetPop.clickO();

var planeMath = null;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3();

function initSceneParams()
{
	planeMath = createPlaneMath();
	
	infProject.texture = [];
	infProject.texture[0] = { texture: new THREE.TextureLoader().load(infProject.path+'/img/obj/rezba_1.png'), url: '/img/obj/rezba_1.png' };


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
	infProject.geometry.labelFloor = createGeometryPlan(1.0, 0.25);
	infProject.geometry.wf_point = new THREE.SphereGeometry( 0.015, 16, 16 );
	infProject.geometry.centerPoint = new THREE.BufferGeometry().fromGeometry(createGeometryWD(0.03, 0.03, 0.03));

	infProject.tools = {};
	infProject.tools.pg = null;
	infProject.tools.pivot = null;
	infProject.tools.gizmo = null;



	//infProject.tools.wf = { plane: createPlaneWF(), cube: createControlBoxPop3D() };  // scaleBox   
	infProject.tools.plane = {o1: [], el: []};
	infProject.tools.heightPl = createPlaneHeight();		// плоскость высоты
	infProject.tools.helpVertex = [];
	   
	infProject.listColor = resetPop.listColor();
	infProject.list = {};	// список разных параметров/объектов
	infProject.list.rp_ui = { arr: [] };
	infProject.list.group_catalog_ui = { arr: [] };
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
	
	infProject.ui.rpanel = {};
	infProject.ui.rpanel.InfObj = null;
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





  