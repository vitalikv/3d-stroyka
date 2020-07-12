

var isMouseDown1 = false;
var isMouseRight1 = false;
var isMouseDown2 = false;
var isMouseDown3 = false;
var onMouseDownPosition = new THREE.Vector2();
var long_click = false;
var lastClickTime = 0;
var catchTime = 0.30;
var vk_click = '';





function mouseDownRight()
{
	
	clickO.buttonAct = null;
	clickO.button = null; 
	
	var obj = clickO.move;
	
	if(obj)
	{
		if(obj.userData.tag == 'free_dw') { scene.remove(obj); }
		
		if(obj.userData.tag == 'point') 
		{ 	
			if(obj.w.length == 0){ deleteOnePoint(obj); }  
			else 
			{ 
				if(obj.userData.point.type == 'continue_create_wall')
				{
					var point = obj.p[0]; 
					deleteWall_2(obj.w[0]); 
					//upLabelPlan_1([point.w[0]]);					
				}
				
				if(point.userData.point.last.cdm == 'new_point_1') { deletePoint( point ).wall.userData.id = point.userData.point.last.cross.walls.old; }
			}
		}
		else if (obj.userData.tag == 'wf_point' ) 
		{  
			if(obj.userData.wf_point.type == 'tool') { deletePointWF(obj); return; }			
		}
		else if(obj.userData.tag == 'obj')
		{
			deleteObjectPop(obj); 
		}		

		clickO = resetPop.clickO();
	}

	if(infProject.settings.active.tube) 
	{ 
		switchAddPointOnTube({type: null});		// выкл возможность добавлять на трубу точку	 
	}
	
	clickO.move = null;	
}



function onDocumentMouseDown( event ) 
{
	//event.preventDefault();

	if (window.location.hostname == '3d-stroyka' || window.location.hostname == 'xn------6cdcklga3agac0adveeerahel6btn3c.xn--p1ai' || window.location.hostname == 'test'){} 
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

	clickSetCamera2D( event, vk_click );
	clickSetCamera3D( event, vk_click );


	if ( vk_click == 'right' ) { mouseDownRight( event ); return; } 


	if(clickO.move)
	{
		if(clickO.move.userData.tag == 'point') 
		{			
			if(clickO.move.userData.point.type) { clickCreateWall( clickO.move ); return; }  
		}
		if(clickO.move.userData.tag == 'wf_point')
		{
			if(clickO.move.userData.wf_point.type == 'tool') { clickPointToolsWF( clickO.move ); return; }
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
		var rayhit = clickRayhitPointWF();
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
		var arrT = [];		
		var tube = infProject.scene.array.tube;	
		
		for ( var i = 0; i < tube.length; i++ )
		{
			arrT[arrT.length] = tube[i].userData.wf_line.tube;
		}	
		
		if(!rayhit)
		{
			var ray = rayIntersect( event, arrT, 'arr' );
			if(ray.length > 0) { rayhit = ray[0]; }					
		}
	}

	if(!infProject.scene.block.click.controll_wd && !rayhit)
	{
		var ray = rayIntersect( event, arrSize.cube, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; }	
	}
	
	if(!infProject.scene.block.click.door && !rayhit)
	{
		var ray = rayIntersect( event, infProject.scene.array.door, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; }		
	}
	
	if(!infProject.scene.block.click.window && !rayhit)
	{
		var ray = rayIntersect( event, infProject.scene.array.window, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; }		
	}
	
	if(!infProject.scene.block.click.point && !rayhit)
	{
		var ray = rayIntersect( event, infProject.scene.array.point, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; }		
	}

	if(!infProject.scene.block.click.wall && !rayhit)
	{
		var ray = rayIntersect( event, infProject.scene.array.wall, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; }		
	}

	
	if(!infProject.scene.block.click.obj)
	{
		var ray = rayIntersect( event, infProject.scene.array.obj, 'arr', true );
		
		if(ray.length > 0)
		{   	
			rayhit = null;
			
			for (var i = 0; i < ray.length; i++)
			{
				if(ray[i].object.userData.obj3D) continue;
				
				rayhit = ray[i]; console.log(i, rayhit );
				break;
			}
			
			var object = null; 
			
			if(rayhit) { object = getParentObj({obj: rayhit.object}); }
			
			if(!object) { rayhit = null; }
			else { rayhit.object = object; }
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
		else if( tag == 'pivot' ) { clickPivot( rayhit ); }
		else if( tag == 'gizmo' ) { clickGizmo( rayhit ); }  		
		else if( tag == 'wall' && camera == cameraTop ) { clickWall_2D( rayhit ); }
		else if( tag == 'point' && camera == cameraTop ) { clickPoint( rayhit ); }
		else if( tag == 'wf_point' && camera == cameraTop) { clickFirstWFPoint({obj: obj, rayhit: rayhit}); }
		else if( tag == 'wf_tube' && camera == cameraTop && infProject.list.alignP.active) { showJoinPoint_2({obj: obj}); }
		else if( tag == 'wf_tube' && camera == cameraTop ) { clickTubeWF({ray: rayhit}); }
		else if( tag == 'window' && camera == cameraTop ) { clickWD( rayhit ); }
		else if( tag == 'door' && camera == cameraTop ) { clickWD( rayhit ); }
		else if( tag == 'controll_wd' && camera == cameraTop ) { clickToggleChangeWin( rayhit ); }		
		else if( tag == 'joinPoint' && camera == cameraTop) { clickFirstCenterPoint({obj: obj, rayhit: rayhit}); }
		else if( tag == 'obj' && camera == cameraTop ) { clickFirstObj3D({obj: obj}); }
		else if( tag == 'boxWF' && camera == cameraTop ) { clickBoxWF_2D( obj, rayhit ); }
		else if( tag == 'scaleBox_control' && camera == cameraTop ) { clickToggleGp( rayhit ); }
		else if( tag == 'scaleBox_control' && camera == camera3D ) { clickToggleGp( rayhit ); }
	}
	else if(cdm.type == 'up')
	{		
		if( tag == 'wall' && camera == camera3D ) {  }
		else if( tag == 'wf_point' && camera == camera3D) { clickFirstWFPoint({obj: obj, rayhit: rayhit}); }	
		else if( tag == 'joinPoint' && camera == camera3D) { clickFirstCenterPoint({obj: obj, rayhit: rayhit}); }
		else if( tag == 'obj' && camera == camera3D ) { clickFirstObj3D({obj: obj}); }
		else if( tag == 'wf_tube' && camera == camera3D && infProject.list.alignP.active) { showJoinPoint_2({obj: obj}); }
		else if( tag == 'wf_tube' && camera == camera3D ) { clickTubeWF({ray: rayhit}); }
		else if( tag == 'boxWF' && camera == camera3D ) { clickBoxWF_2D( obj, rayhit ); }		
	}	
	
	if(camera == cameraTop)
	{
		//objActiveColor_2D(obj);			
	}		
}


function onDocumentMouseMove( event ) 
{ 
	if(event.changedTouches)
	{
		event.clientX = event.changedTouches[0].clientX;
		event.clientY = event.changedTouches[0].clientY;
		isMouseDown2 = true;
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
		else if ( camera == cameraWall ) { moveCameraWall2D( event ); }
	}
	

	//activeHover2D( event );

	renderCamera();
}


function onDocumentMouseUp( event )  
{

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
		else if(tag == 'pivot') { clickPivotUp(); }
		else if(tag == 'gizmo') { clickGizmoUp(); }
		else if(tag == 'wf_tube') { clickMouseUpTube(obj); }
		
		if(tag == 'free_dw') {  }
		else if (tag == 'point') 
		{
			if(obj.userData.point.type) {  } 
			else { clickO.move = null; }
		}
		else if (tag == 'wf_point') 
		{ 
			if(obj.userData.wf_point.type == 'tool') 
			{ 
				upLineWF(obj);
			}			
		}		
		else { clickO.move = null; }		
	}
	
	
	param_win.click = false;
	isMouseDown1 = false;
	isMouseRight1 = false;
	isMouseDown2 = false;
	isMouseDown3 = false;
	
	infProject.tools.axis[0].visible = false;
	infProject.tools.axis[1].visible = false;	
	
	clickO.offset = new THREE.Vector3();
	
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
		objDeActiveColor_2D(); 

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
	}
	
	if(flag) 
	{
		hideMenuUI(obj);
		resetClickLastObj({});
	}
}





function hideMenuUI(obj) 
{
	if(!obj) return;  console.log('hideMenuUI', obj);
	if(!obj.userData) return;
	if(!obj.userData.tag) return;
	
	var tag = obj.userData.tag;
	
	if(tag == 'wall') { $('[nameId="wall_menu_1"]').hide(); }
	else if(tag == 'point') { $('[nameId="point_menu_1"]').hide(); }
	else if(tag == 'window') { $('[nameId="wd_menu_1"]').hide(); }
	else if(tag == 'door') { $('[nameId="wd_menu_1"]').hide(); }	
	else if(tag == 'boxWF') { hideBoxWF_UI(); } 
}




// по клику получаем инфу об объекте
function consoleInfo( obj )
{
	
	if(!obj) return;
	if(!obj.userData.tag) return;
	
	var tag = obj.userData.tag;
	console.log(obj.userData.tag);
	if ( tag == 'room' ) 
	{
		var txt = '';
		//for ( var i = 0; i < obj.w.length; i++ ) { txt += '| ' + obj.w[i].userData.id; }
		for ( var i = 0; i < obj.p.length - 1; i++ ) { txt += '| ' + obj.p[i].userData.id; }
		
		console.log( "room id : " + obj.userData.id + " | point : " + txt, " | userData : ", obj.userData, obj );
	}
	else if( tag == 'wall' )
	{ 
		console.log(obj);
		console.log( "wall id : " + obj.userData.id + " index : " + clickO.index + " | point : " + obj.userData.wall.p[0].userData.id + " | " + obj.userData.wall.p[1].userData.id + " | userData : ", obj.userData ); 
	}
	else if( tag == 'point' )
	{ 
		console.log( "point id : " + obj.userData.id + " | userData : ", obj.userData, obj ); 
	}
	else if( tag == 'window' || tag == 'door' )
	{ 
		var txt = {};		
		console.log( tag + " id : " + obj.userData.id + " | lotid : " + obj.userData.door.lotid + " | " + " type : " + obj.userData.door.type, txt, " | userData : ", obj.userData, obj ); 
	}
	else if ( tag == 'controll_wd' ) 
	{
		console.log( "controll_wd number : " + obj.userData.controll_wd.id, obj );
	}
	else if ( tag == 'obj' ) 
	{
		console.log( "obj : " + obj.userData.id + " | lotid : " + obj.lotid  + " | userData : ", obj.userData, obj );
	}	
	else if ( tag == 'wf_tube' ) 
	{
		console.log( tag + " id : " + obj.userData.id + " | userData : ", obj.userData, obj );
	}	
	else 
	{
		console.log( "pr_id : " + obj.userData.id + " | lotid : " + obj.lotid + " | caption : " + obj.caption, obj );
	}	
}

