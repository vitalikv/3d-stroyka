







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
				infProject.tools.pg.applyPosUI(); 
			}
			else if(infProject.activeInput == 'object_rotate_X' || infProject.activeInput == 'object_rotate_Y' || infProject.activeInput == 'object_rotate_Z')
			{
				infProject.tools.pg.applyRotUI(); 
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
	initScene();
	initCams();
	initLights();
	outlineInit();
	initSceneParams();
	
	animate();
	renderCamera();	
	
	new selectBoxDiv({container: mainDiv_1});
	infProject.ui.rpanel.InfObj = new UI_infoBlockObj({nameAttr: '[nameId="rp_wrap_obj_info"]'});
	

	infProject.tools.pg = new ToolPG({type: 'pivot', nameAttr: '[nameId="mainDiv_1"]'});
	
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
























