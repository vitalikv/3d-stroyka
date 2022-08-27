



// 
class Api
{
	constructor()
	{
		
	}

	camMove()
	{  
		infProject.tools.gizmo.userData.propGizmo({type: 'clippingGizmo'});	
		infProject.tools.pivot.userData.propPivot({type: 'updateScale'});
		infProject.tools.gizmo.userData.propGizmo({type: 'updateScale'});
		scalePointObj();
		scaleTubeObj();
	}
	
	camZoom()
	{
		infProject.tools.pivot.userData.propPivot({type: 'updateScale'});
		infProject.tools.gizmo.userData.propGizmo({type: 'updateScale'});
		scalePointObj();
		scaleTubeObj();
	}
	
	camFit()
	{
		infProject.tools.pivot.userData.propPivot({type: 'updateScale'});
		infProject.tools.gizmo.userData.propGizmo({type: 'updateScale'});
	}	
}



function scalePointObj()
{
	var obj = clickO.last_obj; 	
	
	if(!obj) return;
	if(obj.userData.obj3D || obj.userData.centerPoint) {} 
	else { return }
	
	if(obj.userData.obj3D) obj.setScaleObjPoint();
	if(obj.userData.centerPoint) obj.parent.setScaleObjPoint();	
}


function scaleTubeObj()
{
	var obj = clickO.last_obj; 	
	
	if(!obj) return;
	if(obj.userData.tag === 'new_tube' || obj.userData.tag === 'new_point') {} 
	else { return }
	
	if(obj.userData.tag === 'new_tube') obj.setScaleTubePoints();
	if(obj.userData.tag === 'new_point') obj.setScaleTubePoint();	
}






