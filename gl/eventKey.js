
 


document.body.addEventListener('contextmenu', function(event) { event.preventDefault() });
document.body.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.body.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.body.addEventListener( 'mouseup', onDocumentMouseUp, false );


document.body.addEventListener( 'touchstart', onDocumentMouseDown, false );
document.body.addEventListener( 'touchmove', onDocumentMouseMove, false );
document.body.addEventListener( 'touchend', onDocumentMouseUp, false );


document.body.addEventListener("keydown", function (e) { keys[e.keyCode] = true; });
document.body.addEventListener("keyup", function (e) { keys[e.keyCode] = false; });

document.addEventListener('DOMMouseScroll', mousewheel, false);
document.addEventListener('mousewheel', mousewheel, false);	



document.body.addEventListener("keydown", function (e) 
{ 
	upKeyWall( e.keyCode );  
    if (e.keyCode == 90 && e.ctrlKey) { setInfoEvent1( 'undo' ); renderCamera(); }
	if (e.keyCode == 89 && e.ctrlKey) { setInfoEvent1( 'redo' ); renderCamera(); }
	if (e.keyCode == 72 && e.ctrlKey) { showHash(); }
	
	if(infProject.activeInput) 
	{ 
		if(e.keyCode == 13)
		{
			if(infProject.activeInput == 'input-height') { changeHeightWall(); }
			if(infProject.activeInput == 'input-width') { changeWidthWall( $('[data-action="input-width"]').val() ); }
			if(infProject.activeInput == 'wall_1') { inputChangeWall_1({}); }	 		
			if(infProject.activeInput == 'wd_1') { inputWidthHeightWD(clickO.last_obj); }		
		}		
		 
		return; 
	}


	if(e.keyCode == 46) { detectDeleteObj(); }
	
	if(e.keyCode == 76) { loadFile(''); }
	if(e.keyCode == 79) { getSkeleton_1(room); }
	
	if (window.location.hostname == 'plan1' || window.location.hostname == 'plan3' || window.location.hostname == 'webgl-editor')
	{
		
		// включить/выключить изменение масштаба для примитива
		if(e.keyCode == 11179) 
		{  
			var obj = param_pivot.obj;
			
			if ( obj )
			{
				if ( obj.userData.tag == 'obj' ) 
				{
					if(!obj.userData.obj3D.boxPop) return; 
					
					if(gizmo.visible)
					{
						gizmo.visible = false;
						hideObjectControls();									
						showBoxPop(obj);					
					}
					else
					{
						showPivotGizmo(obj); 
						addSelectedObject(obj);
						hideBoxPop();
					}
				}			
			}
		} 
		
		//if(e.keyCode == 79) { getDesignFile('https://files.planoplan.com/upload/projects/files/ugol/201803/4b24bf0f.u3d?1525780430', 93); }   
		//if(e.keyCode == 80) { resetStyleRoom(0); }
		
		if(e.keyCode == 79) { getSkeleton_1(room); }
		
		if(e.keyCode == 80) { getConsoleRendererInfo() } 
	}
	
} );




// renderer.info
function getConsoleRendererInfo()
{	
	console.log(renderer.info.programs);
	console.log(renderer.info.render);
	console.log(renderer.info.memory, scene);	
}


// отправить render
function getRender(renderMode)
{
	if(camera != camera3D) return;
	
	var pos = "(" + camera.position.x + "," + camera.position.y + "," + -camera.position.z + ")"; 
	var rot = "(" + THREE.Math.radToDeg( -camera.rotation.x ) + "," + THREE.Math.radToDeg( -camera.rotation.y + Math.PI * 2 ) + ", 0)"; 
 	
	  	
	if(renderMode == 'render') 
	{ 
		var data = '{"data":"camFov='+camera3D.fov+';camPos='+pos+';camRot='+rot+';floorIndex='+levelFloor+';res=1920x1080;shId=0;action=uploadRender;addLightToDarkRooms;orientation=horizontal"}';
		var camInfo = "{}";
		var act = 'uploadRender';
		var goodsId = 2;
	}
	if(renderMode == 'vr-panorama') 
	{ 
		var task = '{"data":"camFov='+camera3D.fov+';camPos='+pos+';camRot=(0.0000,+0.0000,+0.0000);floorIndex='+levelFloor+';action=uploadPanorama;sphereView;addLightToDarkRooms"}';
		var act = 'uploadPanorama'; 
		var goodsId = 7;
	}
	
	if(window.location.hostname == 'planoplan.com')
	{
		var id = new URL(window.parent.location.href).searchParams.get('id');
		//var url = 'https://planoplan.com/projects/payProduct',
		var url = window.location.protocol + '//' + window.location.hostname + '/projects/payProduct';
	}
	else if(window.location.hostname == 'ugol.planoplan.com')
	{
		var id = param_ugol.hash;
		var url = param_ugol.link_render;
	}
	
	
	var floorId = levelFloor;
	
	console.log({ task: task, data: data, camInfo : camInfo, act : act, goodsId : goodsId, id : id, floorId : floorId });
	
	$.ajax
	({		 
		url: url,
		type: 'POST',
		data: { task: task, data: data, camInfo : camInfo, act : act, goodsId : goodsId, id : id, floorId : floorId }, 
		dataType: 'json',
		success: function(json){ console.log(json); UI.showAlert('Фотореалистичный снимок поставлен в очередь'); },
		error: function(json) { loader.hide(); console.log('error Render', json); }
	});	
}





// вводим длину стены (панель изменения длины стены)
function upKeyWall( cdm )
{	
	if(cdm == 13)	// enter 
	{  
		var u = infProject.activeInput;
		if(u == 'wall_width_1') { /*getInfoEvent20(clickO.obj, 'down');*/ inputWidthWall(); renderCamera(); /*getInfoEvent20(clickO.obj, 'up');*/  } 
		else if(1 == 6) { inputGlobalWidthWall(); } 
	}
}




function showHash()
{
	//param_ugol.file;  
	//param_ugol.hash;
	console.log(param_ugol.hash);
}









