






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


// если объект составной или параметрический, то собираем его
async function getInfPoperties(cdm)
{
	var inf = cdm.inf;
	
	if(inf.obj){ }
	else if(inf.params)		// обращаемся к BD list_obj_2
	{ 
		if(inf.params.fc)
		{
			inf.obj = window[inf.params.fc.name](inf.params.cdm);
			
			infProject.scene.array.base[infProject.scene.array.base.length] = inf;
			
			return inf;			
		}
	}

	return null;
}



// cdm - информация, которая пришла из вне
// inf - статическая инфа из базы
async function loadObjServer(cdm)
{ 	
	if(!cdm.lotid) return;
	
	var lotid = cdm.lotid;	
	
	var inf = await getObjFromBase({lotid: lotid});
	if(!inf) return;		// объект не существует в API/каталоге
	
	
	var inf_2 = await getInfPoperties({inf: inf});	// если объект составной или параметрический, то собираем его
	if(inf_2) { inf = inf_2; }
	console.log(inf);
	
	var type = '';
	
	if(inf.obj)		// объект есть в кэше
	{ 
		console.log('---------', 55555);
		type = 'obj';
	}
	else if(inf.model)		// объекта нет в кэше, сохраняем/добавляем в кэш
	{	
		var obj = new THREE.ObjectLoader().parse( inf.model );			
		addObjInBase(inf, obj);	
		type = 'obj';
	}	
	
	if(type == 'obj') { addObjInScene(inf, cdm); }
	else if(inf.type == 'tube') 
	{ 
		createTubeWF_1({type: inf.properties.type, posY: infProject.tools.heightPl.position.y});
	}
}



// добавляем новый объект в базу/кэш (добавляются только уникальные объекты, которых нет в базе)
function addObjInBase(inf, obj)
{
	obj.geometry.computeBoundingBox();	
	
	// накладываем на материал объекта lightMap
	obj.traverse(function(child) 
	{
		if(child.isMesh) 
		{ 	
			// устанавливаем lightMap
			if(child.material)
			{
				if(Array.isArray(child.material))
				{
					for(var i = 0; i < child.material.length; i++)
					{
						child.material[i].lightMap = lightMap_1;
					}
				}
				else
				{
					child.material.lightMap = lightMap_1;
				}					
			}

			// устанавливаем общий материал для centerPoint
			if(child.userData.centerPoint)
			{
				
				if (child.material) 
				{
					var materialArray = [];
					
					if(child.material instanceof Array) { materialArray = child.material; }
					else { materialArray = [child.material]; }
					
					if(materialArray) 
					{
						materialArray.forEach(function (mtrl, idx) 
						{
							if (mtrl.map) mtrl.map.dispose();
							if (mtrl.lightMap) mtrl.lightMap.dispose();
							if (mtrl.bumpMap) mtrl.bumpMap.dispose();
							if (mtrl.normalMap) mtrl.normalMap.dispose();
							if (mtrl.specularMap) mtrl.specularMap.dispose();
							if (mtrl.envMap) mtrl.envMap.dispose();
							mtrl.dispose();
						});
					}
				}
	
				child.material = infProject.material.pointObj.default;
				child.scale.set(1,1,1);
				child.visible = false;
			}			
		}
	});	

	//var inf_2 = JSON.parse( JSON.stringify( inf ) );
	inf.obj = obj;	
	
	infProject.scene.array.base[infProject.scene.array.base.length] = inf;
}




// добавляем объект в сцену
function addObjInScene(inf, cdm)
{
	var obj = inf.obj.clone();
	
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
	
	
	if(cdm.id){ obj.userData.id = cdm.id; }
	else { obj.userData.id = countId; countId++; }
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = cdm.lotid;
	obj.userData.obj3D.nameRus = inf.name;  
	//obj.material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.5 } );
	obj.material.visible = false;
	//obj.rotation.y += 1;
	
	
	if(cdm.nameRus) { renameObject({obj: obj, name: cdm.nameRus}); }
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;

	scene.add( obj );
	 
	updateListTubeUI_1({o: obj, type: 'add'});	// добавляем объект в UI список материалов 
	
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
	
	
	
	if(1 == 1)
	{
		var id = 0;
		
		obj.traverse( function ( child ) 
		{
			if ( child.isMesh ) 
			{ 
				if(new RegExp( '_est_' ,'i').test( child.name ))
				{
					//child.visible = true;
				}
			}
		});
		
		if(cdm.centerPoint)
		{
			if(cdm.centerPoint.length > 0)
			{
				// получаем разъемы объекта
				var o = getCenterPointFromObj_1(obj);

				// есть разъемы
				for(var i2 = 0; i2 < o.length; i2++)
				{				
					if(!o[i2].userData.centerPoint) continue;			
				
					for(var i3 = 0; i3 < cdm.centerPoint.length; i3++)
					{
						if(o[i2].userData.id != cdm.centerPoint[i3].id) continue;
						
						o[i2].userData.centerPoint.nameRus = cdm.centerPoint[i3].nameRus;
						
						break;
					}
				}
			}			
		}
	}

		
	
}





