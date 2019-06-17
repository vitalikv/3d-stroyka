

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
		if(obj.userData.tag == 'free_dw') { scene.remove(obj); clickO = resetPop.clickO(); }
		
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
			
			clickO = resetPop.clickO();
		}
		else if (obj.userData.tag == 'wf_point' ) 
		{
			if(obj.userData.wf_point.type == 'tool') { deletePointWF(obj); }			
		}			
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
	
	clickRayHit( detectRayHit( event, 'click' ) ); 

	if ( camera == cameraTop ) { hideMenuObjUI_2D( clickO.last_obj ); showMenuObjUI_2D( clickO.obj ); }
	else if ( camera == camera3D ) { hideMenuObjUI_3D( clickO.last_obj ); }
	else if ( camera == cameraWall ) { hideMenuObjUI_Wall(clickO.last_obj); showMenuObjUI_Wall(clickO.obj); }
	
	renderCamera();
}





function detectRayHit( event, cdm )
{
	var result = hoverCursorLineWF(event);
	
	if(result) { return result; }
	
	var intersects = rayIntersect( event, scene.children, 'arr' );

	var um = [];
	for ( var i = 0; i < intersects.length; i++ )
	{
		if ( intersects[ i ].object.userData.tag ) { um[ um.length ] = { numRay: i, tag: intersects[ i ].object.userData.tag }; }
	}

	var num = -1;

	if ( cdm == 'click' )
	{
		var cdm = { intersects: um, tag: [ 'toggle_gp', 'pivot', 'gizmo', 'move_control', 'controll_wd' ] };		
		if ( camera == cameraTop ) { cdm.tag[ cdm.tag.length ] = 'window'; cdm.tag[ cdm.tag.length ] = 'door'; }
		num = clickFirstHit_1( cdm );
		
		// если кликнули на контроллер для приметивов
		// преверяем если ближи к нам был POP приметив, то мы его активируем, иначе, выбранным объектом будет контроллер
		if ( num != -1 )
		{
			if(intersects[ num ].object.userData.tag == 'toggle_gp' && camera == camera3D)
			{
				var num2 = -1;
				for ( var i = 0; i < intersects.length; i++ ) { if(intersects[ i ].object.userData.tag == 'obj') { num2 = i; break; } }
				
				if(num2 != -1)
				{
					if(num2 < num) { num = num2; }
				}
			}
		}

		var cdm = { intersects: um, tag: [ 'window', 'door', 'toggle_gp', 'move_control', 'gizmo', 'obj', 'wf_point', 'point', 'wall', 'room', 'ceiling', 'group_pop' ] };
		if ( num == -1 ) { num = clickFirstHit_2( cdm ); }
	}
	else
	{
		var cdm = { intersects: um, tag: [ 'controll_wd', 'window', 'door', 'toggle_gp', 'move_control', 'gizmo', 'wf_point', 'point', 'wall' ] };
		num = clickFirstHit_1( cdm );  
	}

	return ( num == -1 ) ? null : intersects[ num ];
}


// определяем порядок по важности выбранного объекта (выбирается, тот который стоит в начале списка cdm.tag)
function clickFirstHit_1( cdm )
{
	for ( var i = 0; i < cdm.tag.length; i++ )
	{
		for ( var i2 = 0; i2 < cdm.intersects.length; i2++ )
		{
			if ( cdm.tag[ i ] == cdm.intersects[ i2 ].tag ) { return cdm.intersects[ i2 ].numRay; }
		}
	}

	return -1;
}


// если кликнули на объект и он есть в списке, то его выбираем 
function clickFirstHit_2( cdm )
{
	for ( var i = 0; i < cdm.intersects.length; i++ )
	{
		for ( var i2 = 0; i2 < cdm.tag.length; i2++ )
		{
			if ( cdm.intersects[ i ].tag == cdm.tag[ i2 ] ) { return cdm.intersects[ i ].numRay; }
		}
	}

	return -1;
}





function clickRayHit( rayhit )
{ 
	if ( !rayhit ) return;

	var object = rayhit.object;
	
	consoleInfo( object );
	
	var tag = object.userData.tag;
	
	clickO.obj = object;
	clickO.rayhit = rayhit;	

	if(camera == cameraTop)
	{  
		if(clickToolWD(clickO.move)) { console.log(clickO.last_obj); }
		else if( tag == 'wall' ) { clickWall_2D( rayhit ); }
		else if( tag == 'point' ) { clickPoint( rayhit ); }
		else if( tag == 'wf_point' ) { clickWFPoint( rayhit ); }
		else if( tag == 'window' ) { clickWD( rayhit ); }
		else if( tag == 'door' ) { clickWD( rayhit ); }
		else if( tag == 'controll_wd' ) { clickToggleChangeWin( rayhit ); }
	}
	else if(camera == camera3D)
	{
		if( tag == 'wall' ) { clickO.obj = object; }
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
		
		if ( tag == 'wall' ) { moveWall( event, obj ); }
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
			else { clickO.move = null; }			
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
	
	renderCamera();
}





function hideMenuObjUI_2D( o )
{
	if(o)
	{ 
		objDeActiveColor_2D(); 
		
		switch ( o.userData.tag ) 
		{  
			case 'wall': hideMenuUI(o);  break;
			case 'point': hideMenuUI(o);  break;
			case 'door': hideSizeWD(o); break;
			case 'window': hideSizeWD(o); break;			
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

