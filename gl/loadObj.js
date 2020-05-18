






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

	
	var url = infProject.path+'components_2/getObjSql.php?id='+lotid;  
	
	var response = await fetch(url, { method: 'GET' });	
	var json = await response.json();
	
	if(!json.error)
	{
		var inf = json;
		inf.planeMath = 0.0;
		
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
	
	var inf = await getObjFromBase({lotid: lotid});
	if(!inf) return;		// объект не существует в API/каталоге
	
	if(inf.obj)		// объект есть в кэше
	{ 
		console.log('---------');
	}
	else if(inf.model)		// объекта нет в кэше, сохраняем/добавляем в кэш
	{	
		var obj = new THREE.ObjectLoader().parse( inf.model );			
		addObjInBase(inf, obj);		
	}	
	
	addObjInScene(inf, cdm);
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
	
	if(cdm.pos){ obj.position.copy(cdm.pos); }
	else if(inf.planeMath)
	{ 
		obj.position.y = inf.planeMath;
		planeMath.position.y = inf.planeMath; 
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld(); 
	}
	else
	{ 
		obj.position.y = 1;
		planeMath.position.y = 1; 
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld(); 
	}
	
	if(cdm.rot){ obj.rotation.set(cdm.rot.x, cdm.rot.y, cdm.rot.z); }					
	
	
	if(cdm.id){ obj.userData.id = cdm.id; }
	else { obj.userData.id = countId; countId++; }
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = cdm.lotid;
	obj.userData.obj3D.nameRus = inf.name;  
	//obj.material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.5 } );
	//obj.material.visible = false;
	//obj.rotation.y += 1;
	
	
	if(cdm.nameRus) { renameObject({obj: obj, name: cdm.nameRus}); }
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;

	scene.add( obj );
	 
	updateListTubeUI_1({o: obj, type: 'add'});	// добавляем объект в UI список материалов 
	
	if(cdm.cursor) { clickO.move = obj; } 
	
	renderCamera();
	
	
	
	if(1 == 1)
	{
		var id = 0;
		
		obj.traverse( function ( child ) 
		{
			if ( child.isMesh ) 
			{ 
				//console.log(child.name);
				
				if(child.userData.centerPoint)
				{
					child.userData.centerPoint.color = child.material.color.clone();
				}
					
				if(new RegExp( '_est_' ,'i').test( child.name ) && 1==2)
				{
					//console.log(8888888, child.name, child.rotation.x, child.rotation.y, child.rotation.z);
					
					child.visible = false;						
					
					var material = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 1, depthTest: false, lightMap: lightMap_1 });
					
					var cube = new THREE.Mesh( createGeometryWD(0.03, 0.03, 0.03), material );
					cube.position.copy(child.position);
					cube.quaternion.copy(child.quaternion);
					cube.visible = false;
					cube.renderOrder = 1;
					//cube.rotation.y += 1;
					//var axesHelper = new THREE.AxesHelper( 0.2 );
					//child.add( axesHelper );							
					
					cube.userData.tag = 'joinPoint';
					cube.userData.id = id;  id++;
					cube.userData.centerPoint = { join: null };						 
					cube.userData.centerPoint.nameRus = child.name;
					cube.userData.centerPoint.color = cube.material.color.clone();
					
					obj.add( cube );				
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





