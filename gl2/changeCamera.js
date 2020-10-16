

    


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
	
	
	var tube = infProject.scene.array.tube;
	
	for ( var i = 0; i < tube.length; i++ )
	{
		showHideTubePoint({tube: tube[i], visible: false});
	}	
	
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


