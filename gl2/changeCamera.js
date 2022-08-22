

infProject.elem.butt_camera_2D = document.querySelector('[nameId="butt_camera_2D"]');
infProject.elem.butt_camera_3D = document.querySelector('[nameId="butt_camera_3D"]');    
infProject.elem.butt_camera_2D.onmousedown = function(e){ changeCamera(cameraTop); }
infProject.elem.butt_camera_3D.onmousedown = function(e){ changeCamera(camera3D); }



// переключение камеры
function changeCamera(cam)
{  
	deActiveSelected();
	
	camera = cam;
	renderPass.camera = cam;
	outlinePass.renderCamera = cam;

	infProject.elem.butt_camera_2D.style.display = 'none';
	infProject.elem.butt_camera_3D.style.display = 'none';
	
	
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

















