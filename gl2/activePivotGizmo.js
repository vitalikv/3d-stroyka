

function groupPivotGizmo()
{
	let group = {};
	group.type = 'pivot';
	group.pos = new THREE.Vector3();
	group.qt = new THREE.Quaternion();

	//group.propGizmo = propGizmo;
}


// ставим pivot/gizmo
function setPivotGizmo(params)
{
	let obj = params.obj;	
	if(!obj) return;		
	
	let type = 'pivot';
	let pos = new THREE.Vector3();
	let qt = new THREE.Quaternion();
	
	
	if(obj.userData.tag == 'obj')		// группа или объект
	{ 
		obj.updateMatrixWorld();
		pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );	
	}		
	else if(obj.userData.tag == 'joinPoint')		// разъем
	{ 
		pos = obj.getWorldPosition(new THREE.Vector3());  
		activeJoinPoint({obj: obj});
	}
	else if(obj.userData.tag == 'wf_point')		// точка трубы
	{ 
		pos = obj.position; 
	}
	else if(obj.userData.tag == 'wf_tube')		// труба
	{ 
		obj.updateMatrixWorld();			
		pos = obj.localToWorld( obj.userData.wf_tube.posPivotGizmo.clone() );					
	}
	else if(obj.userData.tag == 'wtGrid')		// сетка теплого пола
	{ 
		pos = obj.position;  
	}	
	else			
	{
		return;		
	}	 
	
	
	
	if(camera == cameraTop)	qt = new THREE.Quaternion();

	if(camera == camera3D)				
	{
		if(obj.userData.tag == 'wf_point' || obj.userData.tag == 'wf_tube') qt = new THREE.Quaternion();		// точка трубы или труба
		else if(obj.userData.tag == 'joinPoint') { qt = obj.getWorldQuaternion(new THREE.Quaternion()); }		// разъем		
		else { qt = obj.quaternion.clone(); }			// группа или объект	
	}

	
	if(obj.userData.tag == 'wf_point') { type = 'pivot'; }			// точка трубы	
	else { type = infProject.settings.active.pg; }					
	
		
	
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
	

	setPivotGizmo({obj: obj}); 

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









