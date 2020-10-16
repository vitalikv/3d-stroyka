

    


// переключение камеры
function changeCamera(cam)
{  
	deActiveSelected();
	
	camera = cam;
	renderPass.camera = cam;
	outlinePass.renderCamera = cam;

	infProject.elem.butt_camera_2D.style.display = 'none';
	infProject.elem.butt_camera_3D.style.display = 'none';
	infProject.elem.butt_close_cameraView.style.display = 'none';
	
	changeDepthColor();
	
	if(camera == cameraTop)
	{						
		cameraZoomTop( camera.zoom );
		
		changeRightMenuUI_1({current: true});
		infProject.elem.butt_camera_3D.style.display = '';
	}
	else if(camera == camera3D)
	{	
		blockActiveObj({visible_1: true, visible_2: true});
		
		cameraZoomTop( cameraTop.zoom );
		
		changeRightMenuUI_1({current: true});		
		infProject.elem.butt_camera_2D.style.display = '';
	}
	
	infProject.tools.axis[0].visible = false;
	infProject.tools.axis[1].visible = false;	

	clickO = resetPop.clickO();
	
	renderCamera();
}






// меняем уровень отрисовки объектов 
function changeDepthColor()
{
	if(camera == cameraTop)
	{
		var depthTest = false;
		var w2 = 1;
		var visible = true;
		var visible_2 = true;
	}
	else if(camera == camera3D)
	{
		var depthTest = true;
		var w2 = 0.0;
		var visible = false;
		var visible_2 = false;
	}
	else { return; } 
	
	var point = infProject.scene.array.point;
	var wall = infProject.scene.array.wall;
	var window = infProject.scene.array.window;
	var door = infProject.scene.array.door;	
	var line = infProject.scene.array.tube;
	
	for ( var i = 0; i < wall.length; i++ )
	{
		if(wall[i].children[0]) wall[i].children[0].visible = visible_2;	// скрываем штукатурку 
				
		for ( var i2 = 0; i2 < wall[i].label.length; i2++ )
		{
			wall[i].label[i2].visible = visible;
		}
	}
	
	for ( var i = 0; i < point.length; i++ )
	{ 
		point[i].visible = visible; 
	}		
	
	var wf = [];
	
	for ( var i = 0; i < line.length; i++ )
	{
		var tube = line[i].userData.wf_line.tube;
		
		for ( var i2 = 0; i2 < tube.userData.wf_tube.point.length; i2++ )
		{
			wf[wf.length] = tube.userData.wf_tube.point[i2];
		}		
	}
	
	showHideArrObj(wf, false);
	showHideArrObj(window, visible_2);
	showHideArrObj(door, visible_2);
	
}


// скрываем/показываем объекты
function showHideArrObj(arr, visible)
{	
	if(arr.length == 0) return;
	
	for ( var i = 0; i < arr.length; i++ ) { arr[i].visible = visible; }				
}




// блокируем/разблокируем объекты
function blockActiveObj(cdm)
{
	var visible_1 = cdm.visible_1;
	var visible_2 = cdm.visible_2;
	
	//infProject.scene.block.click.tube = visible_2;
	//infProject.scene.block.hover.tube = visible_2;
	
	infProject.scene.block.click.wall = visible_1;
	infProject.scene.block.hover.wall = visible_1;

	infProject.scene.block.click.point = visible_1;
	infProject.scene.block.hover.point = visible_1;

	infProject.scene.block.click.window = visible_1;
	infProject.scene.block.hover.window = visible_1;

	infProject.scene.block.click.door = visible_1;
	infProject.scene.block.hover.door = visible_1;

	infProject.scene.block.click.room = visible_1;
	infProject.scene.block.hover.room = visible_1;

	infProject.scene.block.click.controll_wd = visible_1;
	infProject.scene.block.hover.controll_wd = visible_1;	
}



// прячем/показываем объекты в режиме план/монтаж + блокировка действий 
function showHideWallHeight_1(cdm)
{ 
	if(!cdm) cdm = {};
	
	
	if(cdm.active)
	{
		var txtButton = (infProject.settings.interface.button.showHideWall_1.active == 'Спрятать стены')?'Показать стены':'Спрятать стены';
	}
	else
	{
		var txtButton = infProject.settings.interface.button.showHideWall_1.active;	
		infProject.settings.interface.button.showHideWall_1.active = (txtButton == 'Спрятать стены')?'Показать стены':'Спрятать стены';
		
		$('[nameId="showHideWall_1"]').text(infProject.settings.interface.button.showHideWall_1.active);
	}
	
	
	if(txtButton == 'Спрятать стены') { changeAllHeightWall_1({height: 0.3}); }
	else { changeAllHeightWall_1({height: infProject.settings.height}); }
}


