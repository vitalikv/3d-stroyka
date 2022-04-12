



class ToolPG 
{
	pivot = infProject.tools.pivot;
	gizmo = infProject.tools.gizmo;
	type = 'pivot';
	obj = null;
	arrO = [];
	pos = new THREE.Vector3();
	qt = new THREE.Quaternion();	
	ui = {};
	
	
	

	constructor(params = {type: 'pivot'}) 
	{
		this.type = params.type;
		this.initButton();
		this.getPosRotUI();		
	}
	
	// кнопки переключения Pivot/Gizmo
	initButton()
	{
		document.querySelector('[nameId="select_pivot"]').onmousedown = (e) => { this.toggleTool({type:'pivot'}); e.stopPropagation(); };
		document.querySelector('[nameId="select_gizmo"]').onmousedown = (e) => { this.toggleTool({type:'gizmo'}); e.stopPropagation(); };		
	}
	
	getPosRotUI()
	{
		this.ui.pos = {};
		this.ui.pos.x = document.querySelector('[nameId="object_pos_X"]');
		this.ui.pos.y = document.querySelector('[nameId="object_pos_Y"]');
		this.ui.pos.z = document.querySelector('[nameId="object_pos_Z"]');
		
		this.ui.rot = {};
		this.ui.rot.x = document.querySelector('[nameId="object_rotate_X"]');
		this.ui.rot.y = document.querySelector('[nameId="object_rotate_Y"]');
		this.ui.rot.z = document.querySelector('[nameId="object_rotate_Z"]');		
	}

	setPos(params) 
	{
		let obj = params.obj;
		let pos = new THREE.Vector3();
		
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

		this.pos = pos;
	}
	
	setRot(params) 
	{
		let obj = params.obj;
		let qt = new THREE.Quaternion();
		
		if(camera == cameraTop)	
		{		
			if(!obj.geometry.boundingBox) obj.geometry.computeBoundingBox();
			let bound = obj.geometry.boundingBox;
			
			obj.updateMatrixWorld();
			let v1 = new THREE.Vector3(bound.min.x, 0, 0).applyMatrix4( obj.matrixWorld );
			let v2 = new THREE.Vector3(bound.max.x, 0, 0).applyMatrix4( obj.matrixWorld );
			
			let dir = v2.clone().sub(v1).normalize();
			let rotY = Math.atan2(dir.x, dir.z);
			
			qt = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY - Math.PI/2);
		}
		
		if(camera == camera3D) qt = obj.getWorldQuaternion(new THREE.Quaternion());	

		this.qt = qt;
	}

	// показываем Pivot/Gizmo
	activeTool(params)
	{
		let obj = params.obj;
		
		this.hide();
		
		this.obj = obj;
		this.arrO = arrObjFromGroup({obj: obj});  
		this.setPos({obj: obj});
		this.setRot({obj: obj});
			
		let type = this.type;	
		if(obj.userData.tag == 'wf_point') { type = 'pivot'; }			// точка трубы
		
		if(type == 'pivot') this.pivot.userData.propPivot({type: 'setPivot', obj: obj, arrO: this.arrO, pos: this.pos, qt: this.qt});		
		if(type == 'gizmo') this.gizmo.userData.propGizmo({type: 'setGizmo', obj: obj, arrO: this.arrO, pos: this.pos, qt: this.qt});

		renderCamera();		
	}
	
	// переключаем Pivot/Gizmo
	toggleTool(params)
	{
		let type = params.type;
		
		let obj = this.obj;
		let arrO = this.arrO;
		
		if(!obj) return;

		if(obj.userData.tag == 'obj'){}
		else if(obj.userData.tag == 'joinPoint'){}
		else if(obj.userData.tag == 'wtGrid'){}
		else if(obj.userData.tag == 'wf_tube'){}
		else { return; }	
		
		
		this.hide();
				
		this.type = type;	
		this.obj = obj;
		this.arrO = arrO;
		
		
		if(this.type == 'pivot') this.pivot.userData.propPivot({type: 'setPivot', obj: obj, arrO: this.arrO, pos: this.pos, qt: this.qt});		
		if(this.type == 'gizmo') this.gizmo.userData.propGizmo({type: 'setGizmo', obj: obj, arrO: this.arrO, pos: this.pos, qt: this.qt});
		
		renderCamera();
	}
	
	
	// скрываем Pivot/Gizmo
	hide()
	{
		this.obj = null;
		this.arrO = [];
		this.pivot.userData.propPivot({type: 'hide'});
		this.gizmo.userData.propGizmo({type: 'hide'});

		renderCamera();		
	}
}


// ставим pivot/gizmo
function setPivotGizmo(params)
{
	infProject.tools.pg.activeTool({obj: params.obj});
	return;
	
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
		
	
	if(camera == cameraTop)	
	{		
		if(!obj.geometry.boundingBox) obj.geometry.computeBoundingBox();
		let bound = obj.geometry.boundingBox;
		
		obj.updateMatrixWorld();
		let v1 = new THREE.Vector3(bound.min.x, 0, 0).applyMatrix4( obj.matrixWorld );
		let v2 = new THREE.Vector3(bound.max.x, 0, 0).applyMatrix4( obj.matrixWorld );
		
		let dir = v2.clone().sub(v1).normalize();
		let rotY = Math.atan2(dir.x, dir.z);
		
		qt = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY - Math.PI/2);
	}
	
	if(camera == camera3D) qt = obj.getWorldQuaternion(new THREE.Quaternion());				

	
	if(obj.userData.tag == 'wf_point') { type = 'pivot'; }			// точка трубы	
	else { type = infProject.settings.active.pg; }						
		
	
	if(type == 'pivot') infProject.tools.pivot.userData.propPivot({type: 'setPivot', obj: obj, pos: pos, qt: qt});	// показываем pivot		
	if(type == 'gizmo') infProject.tools.gizmo.userData.propGizmo({type: 'setGizmo', obj: obj, pos: pos, qt: qt});	// показываем gizmo				
}










function getPosRotPivotGizmo()
{
	let pos = new THREE.Vector3();
	let qt = new THREE.Quaternion();
	let arrO = [];
	
	let pivot = infProject.tools.pivot;
	let gizmo = infProject.tools.gizmo;	
	
	
	if(pivot.visible)
	{ 
		pos = pivot.position.clone(); 
		qt = pivot.quaternion.clone();
		arrO = pivot.userData.pivot.arrO;		
	}
	
	if(gizmo.visible)
	{ 
		pos = gizmo.position.clone(); 
		qt = gizmo.quaternion.clone();
		arrO = gizmo.userData.gizmo.arrO;		
	}
	
	pivot.position.copy(pos);
	pivot.quaternion.copy(qt);
	pivot.userData.pivot.arrO = arrO;

	gizmo.position.copy(pos);
	gizmo.quaternion.copy(qt);
	gizmo.userData.gizmo.arrO = arrO;	
}







