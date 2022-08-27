






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
		let obj = inf.obj.clone();
		
		addObjInScene(obj, inf, cdm);
		
		if(cdm.cursor) crEventObjMoveFromCatalog({obj});
		
		return obj;
	}		
	
	if(inf.params && inf.params.fc)		// обращаемся к BD list_obj_3
	{ 
		let obj = window[inf.params.fc.name](inf.params.cdm);
		
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
			
			if(cdm.cursor) crEventTubeMove(obj);	// создаем событие перемещение трубы из каталога
			
			return obj;
		}		
		else 	// если объект, то в кэш сохраняем параметры и сам объект
		{ 
			obj.userData.fc = {};
			obj.userData.fc.name = inf.params.fc.name;
			obj.userData.fc.params = inf.params.cdm;			
			inf.obj = obj;
			infProject.scene.array.base.push(inf);
			
			obj = inf.obj.clone({cash: true});
			
			addObjInScene(obj, inf, cdm);
			
			if(cdm.cursor) crEventObjMoveFromCatalog({obj});
			
			return obj;
		}			
	}
	
}




// добавляем объект в сцену
function addObjInScene(obj, inf, cdm)
{		
	obj.initObj({id: cdm.id, lotid: cdm.lotid, nameRus: inf.name});
	
	if(cdm.pos) obj.position.copy(cdm.pos);
	
	if(cdm.q) obj.quaternion.set(cdm.q.x, cdm.q.y, cdm.q.z, cdm.q.w);						
		
	camOrbit.render();
}


// назначаем событие при загрузки объекта из каталога
function crEventObjMoveFromCatalog({obj})
{	
	planeMath.position.y = infProject.tools.heightPl.position.y;  
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	planeMath.updateMatrixWorld();
	
	
	setMouseStop(true);
	
	let arrO = ddGetGroup({obj, tubePoint: true});
	
	setStartPos({arrO});
	
	// устанавливаем высоту над полом
	function setStartPos({arrO})
	{		
		if(!obj.geometry.boundingBox) obj.geometry.computeBoundingBox();
		let offsetY = obj.geometry.boundingBox.min.y;

		let posCenter = new THREE.Vector3();
		posCenter.x = -((obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x)/2 + obj.geometry.boundingBox.min.x);
		posCenter.y = 0;
		posCenter.z = -((obj.geometry.boundingBox.max.z - obj.geometry.boundingBox.min.z)/2 + obj.geometry.boundingBox.min.z);
		
		for(let i = 0; i < arrO.length; i++)
		{
			arrO[i].position.y += planeMath.position.y - offsetY;
			arrO[i].position.add(posCenter);
		}		
	}
	
	let pos = new THREE.Vector3(0, planeMath.position.y, 0);
	
	
	mainDiv_1.onmousemove = (event) => 
	{
		let intersects = rayIntersect(event, planeMath, 'one');
		if (intersects.length == 0) return;			
		
		pos = intersects[0].point.clone().sub(pos);		
		
		for(let i = 0; i < arrO.length; i++)
		{
			arrO[i].position.add(pos);		
		}		
		
		pos = intersects[0].point.clone();
		
		camOrbit.render();
	};

	mainDiv_1.onmousedown = () => 
	{
		mainDiv_1.onmousemove = null;
		mainDiv_1.onmousedown = null;
	
		//let intersects = rayIntersect(event, planeMath, 'one');
		//if (intersects.length > 0 && intersects[0].object.userData.tag && intersects[0].object.userData.tag === 'obj') 
		//{
		//	obj.clickObj({clickPos: obj.position});
		//}

		obj.clickObj({clickPos: obj.position});
		
		setMouseStop(false);
		
		camOrbit.render();
	};			

}




