

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
			if(obj.userData.wf_point.type == 'tool') { deletePointWF(obj); }			
		}

		clickO = resetPop.clickO();
	}	
	
	clickO.move = null;	
}



function onDocumentMouseDown( event ) 
{
	//event.preventDefault();

	if (window.location.hostname == '3d-stroyka' || window.location.hostname == '3d-stroyka.ru'){} 
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

	// вкл режим перемещения grid
	if(infProject.scene.grid.active) { clickDownGrid(event); return; }


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
	clickO.rayhit = null;	
	clickO.actMove = false;
	
	clickRayHit(event); 

	if ( camera == cameraTop ) { hideMenuObjUI_2D( clickO.last_obj ); showMenuObjUI_2D( clickO.obj ); }
	else if ( camera == camera3D ) { hideMenuObjUI_3D( clickO.last_obj ); }
	else if ( camera == cameraWall ) { hideMenuObjUI_Wall(clickO.last_obj); showMenuObjUI_Wall(clickO.obj); }
	
	renderCamera();
}





function clickRayHit(event)
{ 
	var rayhit = null;	
	
	if(infProject.tools.pivot.visible)
	{
		var ray = rayIntersect( event, infProject.tools.pivot.children, 'arr' );
		if(ray.length > 0) { rayhit = ray[0]; }		
	}
	
	if(!infProject.scene.block.click.tube)
	{
		var ray = hoverCursorLineWF(event);	
		if(ray) { rayhit = ray; }		
	}

	if(!infProject.scene.block.click.controll_wd)
	{
		var ray = rayIntersect( event, arrSize.cube, 'arr' );
		if(!rayhit) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}
	
	if(!infProject.scene.block.click.door)
	{
		var ray = rayIntersect( event, infProject.scene.array.door, 'arr' );
		if(!rayhit) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}
	
	if(!infProject.scene.block.click.window)
	{
		var ray = rayIntersect( event, infProject.scene.array.window, 'arr' );
		if(!rayhit) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}
	
	if(!infProject.scene.block.click.point)
	{
		var ray = rayIntersect( event, infProject.scene.array.point, 'arr' );
		if(!rayhit) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}

	if(!infProject.scene.block.click.wall)
	{
		var ray = rayIntersect( event, infProject.scene.array.wall, 'arr' );
		if(!rayhit) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}

	
	if(!infProject.scene.block.click.obj)
	{
		var ray = rayIntersect( event, infProject.scene.array.obj, 'arr' );
		if(!rayhit) { if(ray.length > 0) { rayhit = ray[0]; } }			
	}
	
	
	
	
	
	if ( !rayhit ) return;

	var object = rayhit.object;
	
	consoleInfo( object );
	
	var tag = object.userData.tag;
	
	clickO.obj = object;
	clickO.rayhit = rayhit;	

	if(camera == cameraTop)
	{  
		if(clickToolWD(clickO.move)) { console.log(clickO.last_obj); }
		else if( tag == 'pivot' ) { clickPivot( rayhit ); }
		else if( tag == 'wall' ) { clickWall_2D( rayhit ); }
		else if( tag == 'point' ) { clickPoint( rayhit ); }
		else if( tag == 'wf_point' ) { clickWFPoint( rayhit ); }
		else if( tag == 'window' ) { clickWD( rayhit ); }
		else if( tag == 'door' ) { clickWD( rayhit ); }
		else if( tag == 'controll_wd' ) { clickToggleChangeWin( rayhit ); }
		else if( tag == 'obj' ) { clickObject( rayhit ); }
	}
	else if(camera == camera3D)
	{
		if( tag == 'pivot' ) { clickPivot( rayhit ); }
		else if( tag == 'wall' ) { clickO.obj = object; }
		else if( tag == 'obj' ) { clickObject( rayhit ); }
	}	
	else if(camera == cameraWall)
	{
		if(clickToolWD(clickO.move)) { console.log(clickO.last_obj); }
		else if( tag == 'wall' ) { clickWall_3D( rayhit ); }
		else if( tag == 'window' ) { clickWD( rayhit ); }
		else if( tag == 'door' ) { clickWD( rayhit ); }
		else if( tag == 'controll_wd' ) { clickToggleChangeWin( rayhit ); }
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
	
	if(infProject.scene.grid.active)	// вкл режим перемещения grid
	{
		if(moveGrid(event)) renderCamera();
		
		return;
	}	

	if ( !long_click ) { long_click = ( lastClickTime - new Date().getTime() < catchTime ) ? true : false; }

	var obj = clickO.move;
	
	if ( obj ) 
	{
		var tag = obj.userData.tag;
		
		if( tag == 'pivot' ) { movePivot( event ); }
		else if ( tag == 'wall' ) { moveWall( event, obj ); }
		else if ( tag == 'window' ) { moveWD( event, obj ); }
		else if ( tag == 'door' ) { moveWD( event, obj ); }
		else if ( tag == 'controll_wd' ) { moveToggleChangeWin( event, obj ); }
		else if ( tag == 'point' ) { movePoint( event, obj ); }
		else if ( tag == 'wf_point' ) { moveWFPoint( event, obj ); }
		else if ( tag == 'move_control' ) { moveObjectControls( event ); }
		else if ( tag == 'room' ) { cameraMove3D( event ); }
		else if ( tag == 'toggle_gp' ) { moveToggleGp( event ); }
		else if ( tag == 'free_dw' ) { dragWD_2( event, obj ); }
	}
	else 
	{
		if ( camera == camera3D ) { cameraMove3D( event ); }
		else if ( camera == cameraTop ) { moveCameraTop( event ); }
		else if ( camera == cameraWall ) { moveCameraWall2D( event ); }
	}
	

	activeHover2D( event );

	renderCamera();
}


function onDocumentMouseUp( event )  
{

	if ( !long_click && camera == camera3D ) { showMenuObjUI_3D( clickO.obj ); }
	
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
			else 
			{ 
				clickWFPointUp(obj); 
			}			
		}		
		else { clickO.move = null; }		
	}

	if(infProject.scene.grid.active) { clickUpGrid(); }		// вкл режим перемещения grid
	
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





function hideMenuObjUI_2D( o )
{
	if(o)
	{ 
		objDeActiveColor_2D(); 
		deActiveObj(o);
		
		switch ( o.userData.tag ) 
		{  
			case 'wall': hideMenuUI(o);  break;
			case 'point': hideMenuUI(o);  break;
			case 'door': hideSizeWD(o); break;
			case 'window': hideSizeWD(o); break;
			case 'wf_line': hideMenuUI(o); break;
			case 'wf_point': hideMenuUI(o); break;
		}
	}
}



function showMenuObjUI_2D( o )
{
	var rayhit = clickO.rayhit;
	
	if(o)
	{
		objActiveColor_2D(o);
		
		switch ( o.userData.tag ) 
		{
			case 'wall': showLengthWallUI( o ); break;
			case 'point': $('[nameId="point_menu_1"]').show(); break;
			case 'door': showRulerWD( o ); break;
			case 'window': showRulerWD( o ); break;
			case 'wf_line': showWF_line_UI( o ); break;
			case 'wf_point': showWF_point_UI( o ); break;
		}	
	}
	
		
	clickO.last_obj = o;
}





function showMenuObjUI_3D( o, stop )
{
	var rayhit = clickO.rayhit;

	if ( o )
	{
		switch ( o.userData.tag ) 
		{
			case 'wall': clickWall_3D( rayhit ); break;
		}
	}
	
	clickO.last_obj = o;
	clickO.obj = null;
}


function hideMenuObjUI_3D( o )
{
	if ( o )
	{  
		deActiveObj(o);
		
		switch ( o.userData.tag ) 
		{

		}
	}
}





// скрываем меню (cameraWall)
function hideMenuObjUI_Wall(o)
{  
	if(!o) return;
	if(clickO.last_obj == clickO.obj) return;
	
	
	if(clickO.obj)
	{
		if(clickO.obj.userData.tag == 'controll_wd')
		{ 			
			if(clickO.obj.userData.controll_wd.obj == clickO.last_obj) { return; } 
		} 
	}	
	
	if(o.userData.tag)
	{
		var tag = o.userData.tag;
		
		if(tag == 'wall') { hideMenuUI(o); }
		else if(tag == 'window') { hideSizeWD(o); hideMenuUI(o); }
		else if(tag == 'door') { hideSizeWD(o); hideMenuUI(o); }	
	}
	
	clickO.last_obj = null;
}



// показываем меню (cameraWall)
function showMenuObjUI_Wall(o, stop) 
{
	if(!o) { return; }		
	
	if(o.userData.tag)
	{
		var tag = o.userData.tag;
		
		if(tag == 'wall') { showLengthWallUI( o ); }
		else if(tag == 'controll_wd') { o = o.userData.controll_wd.obj; }
		else if(tag == 'window') { showRulerWD( o ); showTableWD( o ); }
		else if(tag == 'door') { showRulerWD( o ); showTableWD( o ); }			
	}
	

	clickO.last_obj = o;		
	clickO.obj = null;
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
	else if(tag == 'wf_line') { $('[nameId="tube_menu_1"]').hide(); }
	else if(tag == 'wf_point') { $('[nameId="wf_point_menu_1"]').hide(); }
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
		if(obj.userData.parent) { obj = obj.userData.parent; }
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
	else if ( tag == 'wf_line' ) 
	{
		console.log( tag + " id : " + obj.userData.id + " | userData : ", obj.userData, obj );
	}	
	else 
	{
		console.log( "pr_id : " + obj.userData.id + " | lotid : " + obj.lotid + " | caption : " + obj.caption, obj );
	}	
}

