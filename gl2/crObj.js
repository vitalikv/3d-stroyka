


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
		let obj = new this.constructor(this).copy( this, false );
		
		obj.initObj({lotid: obj.userData.obj3D.lotid, nameRus: obj.userData.obj3D.nameRus});

		return obj;
	}

	// кликнули на obj
	clickObj() 
	{
		let arrO = ddGetGroup({obj: this, tubePoint: true});
		
		outlinePass.selectedObjects = arrO; 
		this.showHideObjPoint({visible: true});
		this.setScaleObjPoint();
		
		this.updateMatrixWorld();
		let pos = this.localToWorld( this.geometry.boundingSphere.center.clone() );	
												
		infProject.tools.pg.activeTool({obj: this, pos, arrO});
		
		this.ui_menu({type: 'show'});		
	}


	// получаем все разъемы объекта
	getObjPoint()
	{
		let arr = [];
		
		for(let i = 0; i < this.children.length; i++)
		{
			let child = this.children[i];
			if(!child.userData.centerPoint) continue;
			
			arr.push(child);
		}
		
		return arr; 
	}


	// показываем/скрываем разъемы объекта/назначаем цвет по default
	showHideObjPoint({visible}) 
	{		
		let arr = this.getObjPoint();
		
		arr.forEach((o) => { o.visible = visible; o.material = infProject.material.pointObj.default; } );	
	}	


	// масштаб разъемов 
	setScaleObjPoint()  
	{
		let arr = this.getObjPoint();
		
		if(camera == cameraTop)
		{		
			let scale = 3.5/camera.zoom;	
			
			if(scale > 1.4) { scale = 1.4; }
			else if(scale < 0.1) { scale = 0.1; }				
			
			arr.forEach((o) => { o.scale.set( scale, scale, scale ); } );	
		}	
		
		if(camera == camera3D)
		{
			for ( let i = 0; i < arr.length; i++ )
			{ 
				let scale = camera.position.distanceTo( arr[i].getWorldPosition(new THREE.Vector3()) ) / 2;	
				if(scale > 1.2) scale = 1.2;
				
				arr[i].scale.set( scale, scale, scale );			
			}							
		} 	
	}


	// деактивируем obj, кликнули на другой объект или в пустоту 
	deClickObj({obj, moment})  
	{	
		let deActive = () =>
		{ 
			this.showHideObjPoint({visible: false})	
			
			infProject.tools.pg.hide();
			activeObjRightPanelUI_1();		// скрываем UI
			
			outlineRemoveObj();					
		}	
	
		if(moment == 'down' && camera == cameraTop) deActive();
		else if(moment == 'up' && camera == camera3D) deActive();
		else if(moment == '') deActive();	
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





function renameObject(cdm)
{
	var obj = cdm.obj;
	var name = cdm.name;
	
	if(!obj) return;
	
	name = name.trim();
	
	if(obj.userData.obj3D) 
	{ 
		obj.userData.obj3D.nameRus = name;
		
		console.log('obj3D.nameRus');
	}
	else if(obj.userData.centerPoint)
	{		
		obj.userData.centerPoint.nameRus = name;

		console.log('centerPoint.nameRus');
	}
	else
	{
		return;
	}
	
	
	upItemObjNameUI({obj: obj});	// переименовываем название во вкладке "объект"	

	infProject.ui.rpanel.EstList.updateItem({obj});	// переименовываем название во вкладке "список"
	
	// переименовываем название во вкладке "объект"
	function upItemObjNameUI(cdm)
	{
		var obj = cdm.obj;
		
		var arr1 = infProject.list.rp_ui.arr;
		var arr2 = [];
		
		for(var i = 0; i < arr1.length; i++)
		{
			arr2[arr2.length] = {o: arr1[i].o, el: arr1[i].el};
			
			for(var i2 = 0; i2 < arr1[i].p.length; i2++)
			{
				arr2[arr2.length] = {o: arr1[i].p[i2].o, el: arr1[i].p[i2].el};
			}
		}
		
		
		for(var i = 0; i < arr2.length; i++)
		{
			if(arr2[i].o == obj)
			{
				var nameItem = arr2[i].el.querySelector('[nameId="nameItem"]');
				nameItem.innerText = obj.userData.obj3D.nameRus;  
				break;
			}
		}		
	}	
}





