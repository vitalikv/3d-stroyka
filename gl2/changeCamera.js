

    


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
		cameraZoomTop( cameraTop.zoom );
		
		changeRightMenuUI_1({current: true});		
		infProject.elem.butt_camera_2D.style.display = '';
	}
	

	clickO = resetPop.clickO();
	
	renderCamera();
}





// скрываем/показываем объекты
function showHideArrObj(arr, visible)
{	
	if(arr.length == 0) return;
	
	for ( var i = 0; i < arr.length; i++ ) { arr[i].visible = visible; }				
}











