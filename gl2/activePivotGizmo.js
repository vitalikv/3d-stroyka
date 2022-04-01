




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
		var pos = obj.userData.wf_tube.posPivotGizmo; 
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
	//else if(obj.userData.tag == 'wf_tube') { type = 'pivot'; }		// труба
	else { type = infProject.settings.active.pg; }					// объекты
	
		
	
	if(type == 'pivot') infProject.tools.pivot.userData.propPivot({type: 'setPivot', obj: obj, pos: pos, qt: qt});	// показываем pivot		
	if(type == 'gizmo') infProject.tools.gizmo.userData.propGizmo({type: 'setGizmo', obj: obj, pos: pos, qt: qt});	// показываем gizmo				

}



// скрываем Pivot/Gizmo
function hidePivotGizmo(obj)
{
	if(!obj) return;
	if(!obj.userData.tag) return;	
	
	infProject.tools.pivot.userData.propPivot({type: 'hide'});
	infProject.tools.gizmo.userData.propGizmo({type: 'hide'});

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
	else if(obj.userData.tag == 'wf_tube'){}
	else { return; }	
	
	
	infProject.tools.pivot.userData.propPivot({type: 'hide'});
	infProject.tools.gizmo.userData.propGizmo({type: 'hide'});	
	
	
	infProject.settings.active.pg = cdm.mode;	
	if(cdm.group !== undefined) { infProject.settings.active.group = cdm.group; }
	

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









