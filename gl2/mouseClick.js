



var long_click = false;
var lastClickTime = 0;
var catchTime = 0.30;
var vk_click = '';


var lastMouseTime = new Date().getTime();
var moveMouse = null;

var onfM = {};
onfM.stop = false;

function setMouseStop(value) 
{
	onfM.stop = value;
}

function mouseDownRight()
{
	
	clickO.buttonAct = null;
	clickO.button = null; 
	
	var obj = clickO.move;
	
	if(obj)
	{		
		if(obj.userData.tag == 'obj')
		{
			deleteObjectPop(obj); 
		}		

		clickO = resetPop.clickO();
	}

	if(infProject.settings.active.tube) 
	{ 
		switchAddPointOnTube();		// выкл возможность добавлять на трубу точку	 
	}
	
	clickO.move = null;	
}



function onDocumentMouseDown( event ) 
{
	if(onfM.stop) return;

	if (window.location.hostname == '3d-stroyka'){}
	else if (window.location.hostname == 'xn------6cdcklga3agac0adveeerahel6btn3c.xn--p1ai'){}
	else if (window.location.hostname == 'room-3d.ru'){}
	else if (window.location.hostname == 'room-3d'){}
	else { return; }
 
	long_click = false;
	lastClickTime = new Date().getTime();
	
	
	if(event.changedTouches)
	{
		event.clientX = event.changedTouches[0].clientX;
		event.clientY = event.changedTouches[0].clientY;
		vk_click = 'left';
	}	

	switch ( event.button ) 
	{
		case 0: vk_click = 'left'; break;
		case 1: vk_click = 'right'; /*middle*/ break;
		case 2: vk_click = 'right'; break;
	}


	infProject.tools.axis[0].visible = false;
	infProject.tools.axis[1].visible = false;
	
	if(camera == cameraView){ clickSetCameraView( event, vk_click ); return; }

	clickSetCamera2D( event, vk_click );
	clickSetCamera3D( event, vk_click );


	if ( vk_click == 'right' ) { mouseDownRight( event ); return; } 


	if(clickO.move)
	{
		if(clickO.move.userData.tag == 'point') 
		{			
			if(clickO.move.userData.point.type) { clickCreateWall( clickO.move ); return; }  
		}
	}
	 
	clickO.obj = null; 	
	clickO.actMove = false;	
	clickO.rayhit = clickRayHit(event); 

	
	clickMouseActive({type: 'down'});
	
	renderCamera();
}





function clickRayHit(event)
{ 
	var rayhit = null;	
	
	
	// вкл подложка
	if(infProject.scene.substrate.active) 
	{  
		var plane = infProject.scene.substrate.active;
		
		var rayhit = rayIntersect( event, infProject.scene.substrate.ruler, 'arr' );
		var rayhit = (rayhit.length > 0) ? rayhit[0] : null;

		if(!rayhit)
		{
			var rayhit = rayIntersect( event, plane.userData.substrate.p, 'arr' );
			var rayhit = (rayhit.length > 0) ? rayhit[0] : null;					
		}				
		
		if(!rayhit)
		{
			var rayhit = rayIntersect( event, [plane], 'arr' );				
			var rayhit = (rayhit.length > 0) ? rayhit[0] : null;					
		}
		 
		if(rayhit) return rayhit;			
	}	
		
	
	if(infProject.tools.pivot.visible)
	{
		var ray = rayIntersect( event, infProject.tools.pivot.children, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; return rayhit; }		
	}
	
	if(infProject.tools.gizmo.visible)
	{
		var arr = [];
		for ( var i = 0; i < 3; i++ ){ arr[i] = infProject.tools.gizmo.children[i]; }
		
		var ray = rayIntersect( event, arr, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; return rayhit; }		
	}

	// scaleBox
	if(1==2)
	{
		if(infProject.tools.wf.cube)
		{
			if(infProject.tools.wf.cube[0].visible)
			{
				var ray = rayIntersect( event, infProject.tools.wf.cube, 'arr' );  
				if(ray.length > 0) { rayhit = ray[0]; return rayhit; }		
			}		
		}
		
		if(infProject.tools.wf.plane)
		{
			var ray = rayIntersect( event, infProject.tools.wf.plane, 'one' );  
			if(ray.length > 0) { rayhit = ray[0]; }		
		}			
	}

	// точки у трубы, при вкл кнопке присоединить 
	// разъем у объекта, при вкл кнопке присоединить
	if(infProject.list.alignP.arr2.length > 0 && !rayhit)
	{
		var arr2 = [];
		var arr = infProject.list.alignP.arr2;	
		for ( var i = 0; i < arr.length; i++ )
		{
			arr2[arr2.length] = arr[i].o;
		}
		
		var ray = rayIntersect( event, arr2, 'arr' );  
		if(ray) { if(ray.length > 0) { rayhit = ray[0]; return rayhit; } }	
	}	
	
	
	// точки у трубы
	if(!infProject.scene.block.click.tube && !rayhit)
	{  
		var rayhit = clickRayhitPointWF({event: event});
		if(rayhit) { return rayhit; }		
	}
	
	
	// разъем у объекта
	if(!rayhit)
	{
		var rayhit = clickRayJoinPoint();
		if(rayhit) { return rayhit; }
	}
	
	
	
	// труба
	if(!infProject.scene.block.click.tube)
	{	
		if(!rayhit)
		{
			var ray = rayIntersect( event, infProject.scene.array.tube, 'arr' );
			if(ray.length > 0) { rayhit = ray[0]; }					
		}
	}

	if(!rayhit)
	{
		var actO = null;
		var arrO = infProject.scene.array.wtgrid;
		
		for (var i = 0; i < arrO.length; i++)
		{
			if(arrO[i].userData.wtGrid.active) { actO = arrO[i]; break; }
		}
		
		if(actO)
		{
			var ray = rayIntersect( event, actO.userData.wtGrid.arrP, 'arr' );
			if(ray.length > 0) { rayhit = ray[0]; }								
		}
		
		if(!rayhit)
		{
			var ray = rayIntersect( event, arrO, 'arr' );
			if(ray.length > 0) { rayhit = ray[0]; }								
		}
	}
		
	
	if(!infProject.scene.block.click.obj)
	{
		var ray = rayIntersect( event, infProject.scene.array.obj, 'arr', true );
		
		if(ray.length > 0)
		{   	
			rayhit = null;
			
			for (var i = 0; i < ray.length; i++)
			{
				//if(ray[i].object.userData.obj3D) continue;
				
				// если у объекта ОДИН материал и он невидемый, то пропускаем
				if(!Array.isArray(ray[i].object.material)) 
				{
					if(!ray[i].object.material.visible) continue;
				}							
				
				rayhit = ray[i]; 
				break;
			}
			
			var object = null; 
			
			if(rayhit) { object = getParentObj({obj: rayhit.object}); }
			
			if(!object) { rayhit = null; }
			else { rayhit.object = object; }
		}	
	}
	
	// проверяем если объект находится за подложкой, то отменяем выделение
	if(rayhit)
	{
		var floor = infProject.scene.substrate.floor;
		var fs = floor.map(o => o.plane);
		var fs = fs.filter(o => o.material.opacity > 0.65);
		
		var ray = rayIntersect( event, fs, 'arr' );
		
		if(ray.length > 0)
		{
			if(ray[0].distance < rayhit.distance) { rayhit = null; }
		}
	}
	
	return rayhit;
}




// находим родитель у дочернего объекта
function getParentObj(cdm)
{
	var obj = cdm.obj;	
	var next = true;

	
	while(next) 
	{
		if(obj.userData)
		{
			if(obj.userData.tag)
			{
				if(obj.userData.tag == 'obj')
				{
					next = false;
					return obj;					
				}
				else
				{
					if(obj.parent)
					{
						obj = obj.parent;
					}
					else
					{
						next = false;
						return null;
					}
				}
			}
			else if(obj.parent)
			{ 
				obj = obj.parent;
			}
			else
			{
				next = false;
				return null;
			}
			
		}
		else if(obj.parent)
		{ 
			obj = obj.parent;
		}
		else
		{
			next = false;
			return null;
		}
	}
}




function clickMouseActive(cdm)
{
	hideMenuObjUI_2D(cdm);
	
	if(!clickO.rayhit) return;

	var obj = clickO.obj = clickO.rayhit.object;
	
	var tag = obj.userData.tag;
	var rayhit = clickO.rayhit;
	 
	if(cdm.type == 'down')
	{  
		if(clickToolWD(clickO.move)) {  }
		else if( tag == 'substrate' && camera == cameraTop ) { clickSubstrate2D({intersect: rayhit}); }
		else if( tag == 'substrate_point' && camera == cameraTop ) { clickPointSubstrate2D({intersect: rayhit}); }
		else if( tag == 'substrate_tool' && camera == cameraTop ) { clickToolRulerSubstrate2D({intersect: rayhit}); }
		else if( tag == 'pivot' ) { obj.parent.userData.propPivot({type: 'addEvent', rayhit: rayhit}); }
		else if( tag == 'gizmo' ) { obj.parent.userData.propGizmo({type: 'addEvent', rayhit: rayhit}); }  		
		else if( tag == 'wall' && camera == cameraTop ) { clickWall_2D( rayhit ); }
		else if( tag == 'point' && camera == cameraTop ) { clickPoint( rayhit ); }
		else if( tag == 'wf_point' && camera == cameraTop) { clickFirstWFPoint({obj: obj, rayhit: rayhit}); }
		else if( tag == 'wf_tube' && camera == cameraTop ) { clickFirstTubeWF({obj: obj, rayhit: rayhit}) }
		else if( tag == 'window' && camera == cameraTop ) { clickWD( rayhit ); }
		else if( tag == 'door' && camera == cameraTop ) { clickWD( rayhit ); }
		else if( tag == 'controll_wd' && camera == cameraTop ) { clickToggleChangeWin( rayhit ); }		
		else if( tag == 'joinPoint' && camera == cameraTop) { clickFirstCenterPoint({obj: obj, rayhit: rayhit}); }
		else if( tag == 'obj' && camera == cameraTop ) { clickFirstObj3D({obj: obj}); }
		else if( tag == 'boxWF' && camera == cameraTop ) { clickBoxWF_2D( obj, rayhit ); }
		else if( tag == 'scaleBox_control' && camera == cameraTop ) { clickToggleGp( rayhit ); }
		else if( tag == 'scaleBox_control' && camera == camera3D ) { clickToggleGp( rayhit ); }
		else if( tag == 'wtGrid' && camera == cameraTop ) { obj.userData.propObj({type: 'clickObj', obj: obj}); }
		else if( tag == 'wtPointGrid' && camera == cameraTop ) { obj.userData.propObj({type: 'clickObj', obj: obj, pos: rayhit.point}); }
		else if( tag == 'wtPointGrid' && camera == camera3D ) { console.log(444); }
	}
	else if(cdm.type == 'up')
	{		
		if( tag == 'wall' && camera == camera3D ) {  }
		else if( tag == 'wf_point' && camera == camera3D) { clickFirstWFPoint({obj: obj, rayhit: rayhit}); }	
		else if( tag == 'joinPoint' && camera == camera3D) { clickFirstCenterPoint({obj: obj, rayhit: rayhit}); }
		else if( tag == 'obj' && camera == camera3D ) { clickFirstObj3D({obj: obj}); }
		else if( tag == 'wf_tube' && camera == camera3D ) { clickFirstTubeWF({obj: obj, rayhit: rayhit}) }
		else if( tag == 'boxWF' && camera == camera3D ) { clickBoxWF_2D( obj, rayhit ); }
		else if( tag == 'wtGrid' && camera == camera3D ) { obj.userData.propObj({type: 'clickObj', obj: obj}); }
	}		
}


function onDocumentMouseMove( event ) 
{ 
	if(onfM.stop) return;
	
	if(event.changedTouches)
	{
		event.clientX = event.changedTouches[0].clientX;
		event.clientY = event.changedTouches[0].clientY;
	}
	
	{
		lastMouseTime = new Date().getTime();
		moveMouse = event;	
		//detectMouseObj();		
	}

	clickButton( event );
		

	if ( !long_click ) { long_click = ( lastClickTime - new Date().getTime() < catchTime ) ? true : false; }

	var obj = clickO.move;
	
	if ( obj ) 
	{
		var tag = obj.userData.tag;
		
		if ( tag == 'substrate' ) { moveSubstrate2D( event ); }
		else if ( tag == 'substrate_point' ) { movePointSubstrate2D( event ); }
		else if ( tag == 'substrate_tool' ) { moveToolRulerSubstrate2D(event); }		
		else if ( tag == 'pivot' ) { movePivot( event ); }
		else if ( tag == 'gizmo' ) { moveGizmo( event ); }
		else if ( tag == 'wall' ) { moveWall( event, obj ); }
		else if ( tag == 'window' ) { moveWD( event, obj ); }
		else if ( tag == 'door' ) { moveWD( event, obj ); }
		else if ( tag == 'controll_wd' ) { moveToggleChangeWin( event, obj ); }
		else if ( tag == 'point' ) { movePoint( event, obj ); }
		else if ( tag == 'move_control' ) { moveObjectControls( event ); }
		else if ( tag == 'scaleBox_control' ) { moveToggleGp( event ); }
		else if ( tag == 'room' ) { cameraMove3D( event ); }		
		else if ( tag == 'free_dw' ) { dragWD_2( event, obj ); }
		else if ( tag == 'boxWF' && camera == cameraTop ) { moveBoxWF_2D( event ); }
		else if ( tag == 'obj' ) { moveObjFromCatalog( event ); }
		else if ( tag == 'wf_tube' ) { moveFullTube( event ); }
	}
	else 
	{
		if ( camera == camera3D ) { cameraMove3D( event ); }
		else if ( camera == cameraTop ) { moveCameraTop( event ); }
		else if( camera == cameraView ) { moveCameraView( event ); }
	}
	

	renderCamera();
}


function onDocumentMouseUp( event )  
{
	if(onfM.stop) return;
	
	if(!long_click) 
	{ 
		clickMouseActive({type: 'up'}); 
	}
	
	
	var obj = clickO.move;	
	
	if(obj)  
	{
		var tag = obj.userData.tag;
		
		if(tag == 'point') 
		{  		
			var point = clickO.move;
			if(!clickO.move.userData.point.type) { clickCreateWall(clickO.move); }			
			clickPointMouseUp(point);
		}
		else if(tag == 'wall') { clickWallMouseUp(obj); }
		else if(tag == 'window' || obj.userData.tag == 'door') { clickWDMouseUp(obj); }	
		else if(tag == 'controll_wd') { clickMouseUpToggleWD(obj); } 
		else if(tag == 'obj') { clickMouseUpObject(obj); }
		else if(tag == 'boxWF') { clickMouseUpBoxWF(obj); }
		else if(tag == 'scaleBox_control') { setClickLastObj({obj: infProject.tools.wf.plane}); }
		//else if(tag == 'pivot') { clickPivotUp(); }
		else if(tag == 'gizmo') { clickGizmoUp(); }
		else if(tag == 'wf_tube') { clickMouseUpTube(obj); }
		
		if(tag == 'free_dw') {  }
		else if (tag == 'point') 
		{
			if(obj.userData.point.type) {  } 
			else { clickO.move = null; }
		}		
		else { clickO.move = null; }		
	}
	
	
	param_win.click = false;
	
	infProject.tools.axis[0].visible = false;
	infProject.tools.axis[1].visible = false;	
	
	clickO.offset = new THREE.Vector3();
	
	stopCameraTop();
	stopCamera3D();
	stopCameraView();
	
	renderCamera();
}



function setClickLastObj(cdm)
{
	//console.log(2, 'setClick', { tag: cdm.obj.userData.tag, id: cdm.obj.userData.id } );
	console.trace();
	clickO.last_obj = cdm.obj;
	
	consoleInfo( clickO.last_obj );
}


function resetClickLastObj(cdm)
{
	//var o = (clickO.last_obj) ? { tag: clickO.last_obj.userData.tag, id: clickO.last_obj.userData.id } : null;	
	//console.log(1, 'resetClick', o);
	//console.trace();	
	
	clickO.last_obj = null;
}


function hideMenuObjUI_2D(cdm)
{
	var obj = clickO.last_obj;
	if(!cdm) { cdm = {type: ''}; }
	
	var flag = true;
	
	if(obj)
	{ 
		var tag = obj.userData.tag;
		
		if(cdm.type == 'down')
		{
			if(tag == 'wall' && camera == cameraTop) {  }
			else if(tag == 'point' && camera == cameraTop) {  }
			else if(tag == 'window' && camera == cameraTop) { hideSizeWD(obj);  }
			else if(tag == 'door' && camera == cameraTop) { hideSizeWD(obj); }
			else if(tag == 'boxWF' && camera == cameraTop) { hideControlWF(); }			
			else { flag = false; }
		}
		else if(cdm.type == 'up')
		{								
			flag = false;
		}
		else
		{
			if(tag == 'wall') {  }
			else if(tag == 'point') {  }
			else if(tag == 'window') { hideSizeWD(obj); }
			else if(tag == 'door') { hideSizeWD(obj); }
			else if(tag == 'boxWF') { hideControlWF(); }			
			else { flag = false; }
		}
		
		if(tag == 'wf_tube') { deClickTube({obj: obj, moment: cdm.type}); flag = false; }
		else if(tag == 'wf_point') { deClickTube({obj: obj, moment: cdm.type}); flag = false; }
		else if(tag == 'obj') { deClickObj({obj: obj, moment: cdm.type}); flag = false; }
		else if(tag == 'joinPoint') { deClickObj({obj: obj, moment: cdm.type}); flag = false; }
		else if(tag == 'wtGrid') { obj.userData.propObj({type: 'deActiveObj', obj: obj, moment: cdm.type, camera: camera, rayhit: clickO.rayhit}); }
	}
	
	if(flag) 
	{
		resetClickLastObj({});
	}
}




// когда курсор останавливается, показываем название объекта, на который указывает мышь
function detectMouseObj()
{
	
	if(!moveMouse) return;

	var elem1 = infProject.ui.div.msDiv_1;
	
	if( new Date().getTime() - lastMouseTime < 300.00 ) 
	{
		if(elem1.style.display != "none") { elem1.style.display = "none"; }
		return;
	}


	if(1==1)
	{	
		var rayhit = null;
		var arr = [];
		
		var floor = infProject.scene.substrate.floor;
		var tube = infProject.scene.array.tube;
		var obj = infProject.scene.array.obj;
		
		for ( var i = 0; i < floor.length; i++ )
		{
			arr[arr.length] = floor[i].plane;
		}
		
		for ( var i = 0; i < tube.length; i++ )
		{
			arr[arr.length] = tube[i];
		}	

		for ( var i = 0; i < obj.length; i++ )
		{
			arr[arr.length] = obj[i];
		}	

		var event = moveMouse;
		var ray = rayIntersect( event, arr, 'arr' ); 
		if(ray.length > 0) { rayhit = ray[0]; }					
		
		var txt = null;
		
		if(rayhit)
		{
			var obj = rayhit.object;
			
			if(obj.userData.tag == 'obj') { txt = obj.userData.obj3D.nameRus; }
			else if(obj.userData.tag == 'wf_tube') { txt = obj.userData.wf_tube.nameRus+' ('+obj.userData.wf_tube.length+'м)'; }
		}
		
		if(txt)
		{
			elem1.innerText = txt;
			
			elem1.style.top = (event.clientY - elem1.clientHeight - 20) + 'px';
			elem1.style.left = (event.clientX - elem1.clientWidth/2) + 'px';

			if(elem1.style.display != "block") { elem1.style.display = "block"; }			
		}
		else
		{
			elem1.innerText = '';
			elem1.style.display = "none";
		}
	}
		
	moveMouse = null;
	
}



// по клику получаем инфу об объекте
function consoleInfo( obj )
{
	
	if(!obj) return;
	if(!obj.userData.tag) return;
	
	var tag = obj.userData.tag;
	console.log(obj.userData.tag);

	if ( tag == 'obj' ) 
	{
		console.log( "tag: obj | id: " + obj.userData.id + " | lotid : " + obj.userData.obj3D.lotid  + " | userData : ", obj.userData, obj );
	}	
	else if ( tag == 'wf_tube' ) 
	{
		console.log( "tag: " + tag + " | id : " + obj.userData.id + " | userData : ", obj.userData, obj );
	}	
	else 
	{
		console.log( "pr_id : " + obj.userData.id + " | lotid : " + obj.lotid + " | caption : " + obj.caption, obj );
	}	
}

