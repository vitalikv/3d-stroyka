




// ставим pivot/gizmo
function setPivotGizmo(cdm)
{
	var obj = cdm.obj;	
	if(!obj) return;		
	
	
	// Position
	if(obj.userData.tag == 'obj')		// группа или объект
	{ 
		obj.updateMatrixWorld();
		var pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );	
	}		
	else if(obj.userData.tag == 'joinPoint')		// разъем
	{ 
		var pos = obj.getWorldPosition(new THREE.Vector3());  
		activeJoinPoint({obj: obj});
	}
	else if(obj.userData.tag == 'wf_point')		// точка трубы
	{ 
		var pos = obj.position; 
	}
	else if(obj.userData.tag == 'wf_tube')		// труба
	{ 
		var pos = cdm.pos; 
	}
	else if(obj.userData.tag == 'wtGrid')		// сетка теплого пола
	{ 
		var pos = obj.position;  
	}	
	else			
	{
		return;		
	}	 
	
	
	// Quaternion
	if(camera == cameraTop)		// глобальный gizmo
	{ 
		var qt = new THREE.Quaternion(); 
	} 	
	else						// локальный gizmo
	{
		if(obj.userData.tag == 'wf_point' || obj.userData.tag == 'wf_tube')		// точка трубы или труба
		{
			var qt = new THREE.Quaternion();
		}
		else		// объекты
		{
			if(obj.userData.tag == 'joinPoint') { var qt = obj.getWorldQuaternion(new THREE.Quaternion()); }		// разъем
			else { var qt = obj.quaternion.clone(); }			// группа или объект					
		}		
	}
	
	
	
	var type = 'pivot';
	if(obj.userData.tag == 'wf_point') { type = 'pivot'; }			// точка трубы
	else if(obj.userData.tag == 'wf_tube') { type = 'pivot'; }		// труба
	else { type = infProject.settings.active.pg; }					// объекты
	
	
	
	// показываем pivot
	if(type == 'pivot')
	{
		infProject.tools.pivot.userData.propPivot({type: 'setPivot', obj: obj, pos: pos, qt: qt});
	}
	
	// показываем gizmo
	if(type == 'gizmo')
	{
		var gizmo = infProject.tools.gizmo;
					
		gizmo.position.copy( pos );
		
		gizmo.visible = true;
		gizmo.userData.gizmo.obj = obj;
		gizmo.userData.gizmo.arrO = arrObjFromGroup({obj: obj});
		
		if(camera == cameraTop)
		{
			gizmo.children[1].visible = false;
			gizmo.children[2].visible = false;
		}
		else
		{
			gizmo.children[1].visible = true;
			gizmo.children[2].visible = true;			
		}

		gizmo.quaternion.copy( qt );
		
		clippingGizmo360(obj); 		
	}	
	
	
	
	upMenuRotateObjPop(obj);
	
	setScalePivotGizmo();
}



// скрываем Pivot/Gizmo
function hidePivotGizmo(obj)
{
	if(!obj) return;
	if(!obj.userData.tag) return;	
	
	infProject.tools.pivot.userData.propPivot({type: 'hide'});
	var gizmo = infProject.tools.gizmo;	
	
	gizmo.visible = false;
	gizmo.userData.gizmo.obj = null;
	gizmo.userData.gizmo.arrO = [];

	renderCamera();
}



// переключаем Pivot/Gizmo/joint
function switchPivotGizmo(cdm)
{
	var obj = getObjFromPivotGizmo();
	
	if(!obj) return;

	if(obj.userData.tag == 'obj'){}
	else if(obj.userData.tag == 'joinPoint'){}
	else if(obj.userData.tag == 'wtGrid'){}
	else { return; }	
	
	infProject.settings.active.pg = cdm.mode;	
	if(cdm.group !== undefined) { infProject.settings.active.group = cdm.group; }
	
	infProject.tools.pivot.visible = false;
	infProject.tools.gizmo.visible = false;
	
	if(infProject.settings.active.pg == 'pivot'){ infProject.tools.pivot.visible = true; }	
	if(infProject.settings.active.pg == 'gizmo'){ infProject.tools.gizmo.visible = true; }		

	infProject.tools.pivot.userData.pivot.obj = null;
	infProject.tools.gizmo.userData.gizmo.obj = null;
	
	infProject.tools.pivot.userData.pivot.arrO = [];
	infProject.tools.gizmo.userData.gizmo.arrO = [];

	clickObject3D( obj ); 

	renderCamera();
}


// получаем активный объект
function getObjFromPivotGizmo(cdm)
{
	var obj = null;
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;	
	
	if(infProject.settings.active.pg == 'pivot'){ obj = pivot.userData.pivot.obj; }	
	if(infProject.settings.active.pg == 'gizmo'){ obj = gizmo.userData.gizmo.obj; }
	
	return obj;	
}






// масштаб Pivot/Gizmo
function setScalePivotGizmo()
{
	//infProject.tools.pivot.userData.propPivot({type: 'updateScale'});
	var gizmo = infProject.tools.gizmo;
	
	if(!gizmo.visible) return;	
	
	if(camera == cameraTop)
	{		
		var scale = 1/camera.zoom;	
	}
	else
	{				
		var scale = camera.position.distanceTo(gizmo.position)/6;	 		
	}

	gizmo.scale.set( scale,scale,scale );
}


