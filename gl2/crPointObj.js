

// класс разъем для объекта
class PointObj extends THREE.Mesh
{
	constructor({geometry, material})
	{
		super(geometry, material);
	}
	
	initObj({id, name})
	{
		console.log(99999)
		this.userData.tag = 'joinPoint';
		this.userData.id = id;  
		this.userData.centerPoint = { join: null };						 
		this.userData.centerPoint.nameRus = name;	

		this.visible = false;
		this.renderOrder = 1;			
	}
	
	// нужно при клонировании основного объекта иначе создаются без геометрии и материала
	clone() 
	{
		let obj = new this.constructor(this).copy( this, false );
		
		return obj;
	}

	// кликнули на PointObj
	clickPointObj() 
	{
		let arrO = ddGetGroup({obj: this.parent, tubePoint: true});
		
		outlinePass.selectedObjects = arrO; 
		this.activeColorPoint();
		this.parent.setScaleObjPoint();
		
		let pos = this.getWorldPosition(new THREE.Vector3());	
												
		infProject.tools.pg.activeTool({obj: this, pos, arrO});
		
		this.ui_menu({type: 'show'});		
	}
	

	
	// получаем все точки/разъемы родительского объекта
	getPointObjOnObj()
	{
		return this.parent.getObjPoint();
	}


	// подсвечиваем точку красным
	activeColorPoint() 
	{		
		let arr = this.getPointObjOnObj();
		
		arr.forEach((o) => { o.visible = true; o.material = infProject.material.pointObj.default; } );

		this.material = infProject.material.pointObj.active;
	}
	

	

	// деактивируем obj, кликнули на другой объект или в пустоту 
	deClickPointObj({obj, moment})  
	{	
		let deActive = () =>
		{ 
			this.parent.showHideObjPoint({visible: false});	
			
			infProject.tools.pg.hide();
			activeObjRightPanelUI_1();		// скрываем UI
			
			outlineRemoveObj();					
		}	
	
		if(moment === 'down' && camOrbit.activeCam.userData.isCam2D) deActive();
		else if(moment === 'up' && camOrbit.activeCam.userData.isCam3D) deActive();
		else if(moment === '') deActive();	
	}


	ui_menu({type})
	{
		if(type === 'show') activeObjRightPanelUI_1({obj: this});
		if(type === 'hide') activeObjRightPanelUI_1();
	}
	
	
	render()
	{
		renderCamera();
	}	
}




