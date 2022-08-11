






// ищем был ли до этого объект добавлен в сцену (если был, то береме сохраненную копию, усли нет, то ищем в базе)
async function getObjFromBase(cdm)
{
	var lotid = cdm.lotid;								// объекты в сцене 
	var base = infProject.scene.array.base;		// объекты в памяти	
	
	for(var i = 0; i < base.length; i++)
	{
		if(base[i].id == lotid)
		{
			return base[i];		// объект есть в кэше
		}
	}

	var url = infProject.path+'components_2/getObjSql.php';
	var table = infProject.settings.BD.table.list_obj;	
		
	var response = await fetch(url, 
	{
		method: 'POST',
		//body: 'id='+lotid,
		body: 'table='+table+'&id='+lotid,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },				
	});
	var json = await response.json();
	
	if(!json.error)
	{
		var inf = json;
		
		return inf;
	}	
	
	return null;
}




// cdm - информация, которая пришла из вне
// inf - статическая инфа из базы
async function loadObjServer(cdm)
{ 	
	if(!cdm.lotid) return;
	
	var lotid = cdm.lotid;	
	
	var inf = await getObjFromBase({lotid});
	if(!inf) return;		// объект не существует в API/каталоге
	
	
	if(inf.obj)		// объект есть в кэше
	{ 
		return addObjInScene(inf, cdm); 
	}		
	
	if(inf.params && inf.params.fc)		// обращаемся к BD list_obj_3
	{ 
		var obj = window[inf.params.fc.name](inf.params.cdm);
		
		console.log(inf.params.fc.name);
		
		if(obj.userData.tag == 'new_tube')	// если труба, то в кэш сохраняем только параметры
		{				
			checkAddInf({inf});
			
			// если значение есть в кэше, то НЕ сохраняем
			function checkAddInf({inf})
			{
				let base = infProject.scene.array.base;		// объекты в памяти	
				
				for(let i = 0; i < base.length; i++)
				{
					if(base[i].id == inf.id) return;		// объект есть в кэше
				}

				infProject.scene.array.base.push(inf);
			}
			
			return addTubeInScene(obj, cdm);
		}		
		else 	// если объект, то в кэш сохраняем параметры и сам объект
		{ 
		
			
			console.log(obj);
			obj.userData.fc = {};
			obj.userData.fc.name = inf.params.fc.name;
			obj.userData.fc.params = inf.params.cdm;			
			inf.obj = obj;
			infProject.scene.array.base.push(inf);
			
			return addObjInScene(inf, cdm);
		}			
	}
	
}




// добавляем объект в сцену
function addObjInScene(inf, cdm)
{
	var obj = inf.obj.clone();
	
	obj.initObj({id: cdm.id, lotid: cdm.lotid, nameRus: inf.name});
	
	if(cdm.pos)
	{ 
		obj.position.copy(cdm.pos); 
	}
	else
	{ 
		obj.position.y = infProject.tools.heightPl.position.y;
		planeMath.position.y = infProject.tools.heightPl.position.y; 
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld(); 
	}
	
	if(cdm.q){ obj.quaternion.set(cdm.q.x, cdm.q.y, cdm.q.z, cdm.q.w); }					
	
	
	
	if(cdm.cursor) 
	{ 
		clickO.move = obj; 
		
		// устанавливаем высоту над полом
		clickO.offset.x = -((obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x)/2 + obj.geometry.boundingBox.min.x);
		clickO.offset.y = -((obj.geometry.boundingBox.max.y - obj.geometry.boundingBox.min.y)/2 + obj.geometry.boundingBox.min.y);
		clickO.offset.z = -((obj.geometry.boundingBox.max.z - obj.geometry.boundingBox.min.z)/2 + obj.geometry.boundingBox.min.z);

		obj.position.y -= clickO.offset.y + obj.geometry.boundingBox.min.y;
		planeMath.position.y -= clickO.offset.y + obj.geometry.boundingBox.min.y; 
		planeMath.updateMatrixWorld();
	}	


		
	renderCamera();
	
	return obj;
}



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



