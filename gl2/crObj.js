


class ObjNew extends THREE.Mesh
{
	constructor({geometry, material})
	{
		super(geometry, material);
	}
	
	initObj({id, lotid = null, nameRus = null})
	{
		if(!id) { id = countId; countId++; }
		
		this.userData.id = id;
		this.userData.tag = 'obj';
		this.userData.obj3D = {};
		this.userData.obj3D.lotid = (lotid === null) ? 0 : lotid;
		this.userData.obj3D.nameRus = (nameRus === null) ? '' : nameRus;
		this.userData.group = null;
		
		this.material.visible = true;
		
		scene.add( this );
		infProject.scene.array.obj.push( this );
		this.render();


		this.uiEstimateListObj({type: 'add'});
	}

	clone() 
	{
		return new this.constructor(this).copy( this, false );
	}

	// кликнули на obj
	clickObj() 
	{
		let arrO = ddGetGroup({obj: this, tubePoint: true});
		
		outlinePass.selectedObjects = arrO; 
		showHideJP({obj: this});
		
		this.updateMatrixWorld();
		let pos = this.localToWorld( this.geometry.boundingSphere.center.clone() );	
												
		infProject.tools.pg.activeTool({obj: this, pos, arrO});
		
		this.ui_menu({type: 'show'});		
	}	
	
	// список сметы/материалов
	uiEstimateListObj({type})
	{ 
		if(type == 'add') infProject.ui.rpanel.EstList.crItem({obj: this}); 
		if(type == 'del') infProject.ui.rpanel.EstList.delItem({obj: this});
		if(type == 'update') infProject.ui.rpanel.EstList.updateItem({obj: this}); 
	}
	
	
	ui_menu({type})
	{
		if(type == 'show') activeObjRightPanelUI_1({obj: this});
		if(type == 'hide') activeObjRightPanelUI_1();
	}	
	
	
	render()
	{
		renderCamera();
	}	
}




