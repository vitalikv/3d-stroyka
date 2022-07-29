

    


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

















