


class PointTube extends THREE.Mesh
{
	constructor(params = {})
	{
		super(infProject.geometry.wf_point, infProject.material.pointTube.default);

		this.create(params);
	}
	
	create({id, tube = null, visible, pos})
	{
		if(!id) { id = countId; countId++; }
		
		this.userData.id = id;	
		this.userData.tag = 'new_point';
		this.userData.nameRus = 'точка';
		this.userData.tube = tube;
		
		if(visible != undefined) this.visible = visible;
	
		this.setPos({pos});
		
		scene.add( this );
		this.render();		
	}

	setPos(params)
	{
		let pos = params.pos;		
		if(!pos) return;
		
		this.position.copy(pos);
	}
	
	offsetPos(params)
	{
		let offset = params.offset;		
		if(!offset) return;
		
		this.position.add(offset);
	}

	// название объекта
	getNameObj(params = {lang: 'ru'})
	{
		let lang = params.lang;
		
		let txt = '';
		
		if(lang == 'ru') txt = this.userData.nameRus;
		
		return txt;
	}

	// получаем все точки трубы
	getTubePoints()
	{
		let arr = [this];
		
		if(this.userData.tube) arr = this.userData.tube.getTubePoints();
		
		return arr;					
	}


	// кликнули на точку
	clickPointTube()
	{
		let tube = this.userData.tube;
		tube.showHideTubePoints({visible: true});
		
		let arrO = [tube, ...this.getTubePoints()];
		
		outlineAddObj(this, {arrO: arrO});	
		
		infProject.tools.pg.activeTool({obj: this, pos: this.position, arrO: arrO});

		this.ui_menu({type: 'show'});
	}


	// кликнули на трубу из UI меню
	clickPointTubeUI()
	{
		let tube = this.userData.tube;
		tube.showHideTubePoints({visible: true});
		
		let arrO = [tube, ...this.getTubePoints()];
		
		outlineAddObj(this, {arrO: arrO});	
		
		infProject.tools.pg.activeTool({obj: this, pos: this.position, arrO: arrO});

		//this.ui_menu({type: 'show'});
	}	
	
	
	// перемещение точки
	movePointTube(params)
	{
		let offset = params.offset;
		
		this.offsetPos({offset: offset});
		
		let tube = this.userData.tube;
		
		tube.tubeGeometry({});			
	}	


	// деактивируем трубу
	deClickPointTube({newObj} = {newObj: null})
	{
		outlineRemoveObj();
		let tube = this.userData.tube;
		tube.showHideTubePoints({visible: false});
		
		if(newObj)
		{
			
			let equal = infProject.ui.rpanel.InfObj.isEqualListChilds({ arr: ddGroup({obj: newObj}) }); console.log(equal, newObj);		
			if(!equal) infProject.ui.rpanel.InfObj.list.listChilds.clear(); 				
		}
		
		this.ui_menu({type: 'hide'});
		infProject.tools.pg.hide();	
	}


	// удаляем точку
	delete()
	{
		this.deClickPointTube();
		
		let tube = this.userData.tube;		
		let dist = tube.getDistPointOnTube();		
		this.deletePointFromTube(); 
		
		if(tube.getTubePoints().length >= 2) 
		{ 
			tube.tubeGeometry({});
			let pos = tube.convertDistToPos({dist: dist});  
			tube.clickTube({clickPos: pos});
		}
		else 
		{ 
			tube.delete(); 
		}

		this.render();
	}
	
	
	// удаляем точку из трубы
	deletePointFromTube()
	{
		let tube = this.userData.tube;
		deleteValueFromArrya({arr: tube.userData.point, o: this});
		this.userData.tube = null;

		disposeNode(this);
		scene.remove(this); 
	}



	ui_menu({type})
	{
		if(type == 'show') this.ui_showMenu();
		if(type == 'hide') this.ui_hideMenu();
	}
	
	ui_showMenu()
	{	
		let tube = this.userData.tube;
		let equal = infProject.ui.rpanel.InfObj.isEqualListChilds({arr: tube.userData.group});
		
		if(!equal)
		{
			infProject.ui.rpanel.InfObj.setGroupObjs({arr: tube.userData.group});						
			tube.ui_crListObj();			
		}		
	
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: this.userData.nameRus}});		
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'ptube1', 'ptube2']});		
		infProject.ui.rpanel.InfObj.list.listChilds.selectObjScene({obj: this});
	}
	
	ui_hideMenu()
	{
		infProject.ui.rpanel.InfObj.hide();
	}
	
	render()
	{
		renderCamera();
	}
}




