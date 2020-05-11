


async function infoListObj()
{
	var arr = [];
	
	if(1==2)
	{
		arr[arr.length] =
		{	
			lotid : 1,
			url : infProject.path+'import/nasos_z.fbx', 
			name : 'насос',
			planeMath : 0.5,
		}
		
		arr[arr.length] =
		{
			lotid : 2,
			url : infProject.path+'import/kotel_1.fbx', 
			name : 'котел',
			planeMath : 1.5,
		}
		
		arr[arr.length] =
		{
			lotid : 3,
			url : infProject.path+'import/budres_900.fbx', 
			name : 'радиатор',
			groupIU: 'catalog_group_item_radiator_st_1',
			planeMath : 0.8,
		}
		
		arr[arr.length] =
		{
			lotid : 4,
			url : infProject.path+'import/bak_1.fbx', 
			name : 'расширительный бак',
			planeMath : 0.5,
		}	
		
		arr[arr.length] =
		{
			lotid : 5,
			url : infProject.path+'import/kollector_1.fbx', 
			name : 'коллектор',
			planeMath : 0.5,
		}
		
		arr[arr.length] =
		{
			lotid : 6,
			url : infProject.path+'import/rad_al_secziy_500_.fbx', 
			name : 'радиатор алюминиевый 500',
			groupIU: 'catalog_group_item_radiator_al_1',
			planeMath : 0.5,
			
			//inf.joinPoint[0] = {name: 'size_1_L_', size: '1', joinObj: null};
			//inf.joinPoint[1] = {name: 'size_2_L_', size: '1', joinObj: null};
			//inf.joinPoint[2] = {name: 'size_1_R_', size: '1', joinObj: null};
			//inf.joinPoint[3] = {name: 'size_2_R_', size: '1', joinObj: null};		
		}
		
		arr[arr.length] =
		{
			lotid : 7,
			url : infProject.path+'export/soedin_al_rad_1.fbx', 
			name : 'соединение алюминиевого радиатора',
			groupIU: 'catalog_group_item_radiator_al_1',
			planeMath : 0.5,
		}
		
		arr[arr.length] =
		{
			lotid : 8,
			url : infProject.path+'import/sh_kran/kran_sgon_3s4.fbx',
			name : 'шаровой кран 3/4 (со сгоном)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}
		
		arr[arr.length] =
		{
			lotid : 9,
			url : infProject.path+'import/rad1_zagl_1_.fbx', 
			name : 'заглушка радиаторная 1',
			groupIU: 'catalog_group_item_radiator_al_1',
			planeMath : 0.5,		
		}
		
		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/rad1_zagl_3s4.fbx', 
			name :'заглушка радиаторная 3/4',
			groupIU: 'catalog_group_item_radiator_al_1',
			planeMath : 0.5,		
		}	
		
		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/rad1_zagl_1s2.fbx', 
			name :'заглушка радиаторная 1/2',
			groupIU: 'catalog_group_item_radiator_al_1',
			planeMath : 0.5,		
		}

		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/rad1_zagl_vozd.fbx', 
			name :'радиаторный воздухоотводчик',
			groupIU: 'catalog_group_item_radiator_al_1',
			planeMath : 0.5,		
		}
		
		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/nasos_1.fbx', 
			name :'насос',
			planeMath : 0.5,		
		}	
		
		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/termo_kran_1s2.fbx', 
			name :'регулеровачный кран 1/2',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_regul_1',
		}	

		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/termo_regul_1s2.fbx', 
			name :'терморегулятор',
			planeMath : 0.5,		
		}
		
		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/mp_tronik_32х20х32.fbx', 
			name :'тройник 32х20х32 (мп)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',
		}

		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/mp_tronik_26х16х20.fbx', 
			name :'тройник 26х16х20 (мп)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',
		}	
		
		arr[arr.length] =
		{
			lotid : 10,
			url : infProject.path+'import/mp_ugol_nar_16x1s2.fbx', 
			name :'угол 16х1/2(нр) (мп)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_ugol_press_1',
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_sgon_1s2.fbx',
			name : 'шаровой кран 1/2 (со сгоном)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}
		
		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_sgon_1.fbx',
			name : 'шаровой кран 1 (со сгоном)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_nr_nr_1s2.fbx',
			name : 'шаровой кран 1/2 (нр-нр)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}	

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_nr_nr_3s4.fbx',
			name : 'шаровой кран 3/4 (нр-нр)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}	

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_nr_nr_1.fbx',
			name : 'шаровой кран 1 (нр-нр)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_nr_vn_1s2.fbx',
			name : 'шаровой кран 1/2 (нр-вн)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}	

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_nr_vn_3s4.fbx',
			name : 'шаровой кран 3/4 (нр-вн)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}	

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_nr_vn_1.fbx',
			name : 'шаровой кран 1 (нр-вн)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_vn_vn_1s2.fbx',
			name : 'шаровой кран 1/2 (вн-вн)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}	

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_vn_vn_3s4.fbx',
			name : 'шаровой кран 3/4 (вн-вн)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}	

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/sh_kran/kran_vn_vn_1.fbx',
			name : 'шаровой кран 1 (вн-вн)',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_kran_sharov_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/mp/troynik/20x1s2-vn-x20.fbx',
			name : 'тройник 20х1/2(вн)х20',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/mp/troynik/26x1s2-vn-x26.fbx',
			name : 'тройник 26х1/2(вн)х26',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/mp/troynik/32x1s2-vn-x32.fbx',
			name : 'тройник 32х1/2(вн)х32',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/mp/troynik/32x1-vn-x32.fbx',
			name : 'тройник 32х1(вн)х32',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/mp/troynik/32x26x26.fbx',
			name : 'тройник 32х26х26',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',		
		}

		arr[arr.length] =
		{
			lotid : 0,
			url : infProject.path+'import/mp/troynik/32x26x32.fbx',
			name : 'тройник 32х26х32',
			planeMath : 0.5,
			groupIU: 'catalog_group_item_mp_troinik_press_1',		
		}	
		
	}
	
	var url = infProject.path+'components/getListObjSql.php';
	
	var arr = [];
	
	var response = await fetch(url, { method: 'GET' });
	var json = await response.json();
	
	for(var i = 0; i < json.length; i++)
	{			
		arr[i] = { lotid: json[i].id, name: json[i].name, model: json[i].json };
	}
	

	arr[arr.length] =
	{	
		lotid : 'tube',
		name : 'труба',
		planeMath : 0.1,
	}	
	
	infProject.catalog = arr;
	return arr;
}



function getInfoObj(cdm)
{
	var lotid = cdm.lotid;
	
	
	for(var i = 0; i < infProject.catalog.length; i++)
	{
		if(lotid == infProject.catalog[i].lotid)
		{  
			return infProject.catalog[i];
		}
	}
	
	return null;
}



function loadObjServer(cdm)
{ 
	// cdm - информация, которая пришла из вне
	// inf - статическая инфа из базы
	//console.log(cdm);
	
	if(!cdm.lotid) return;
	
	var lotid = cdm.lotid;
	
	var inf = getInfoObj({lotid: lotid});

	if(!inf) return;	// объект не существует в API
	
	var obj = getObjFromBase({lotid: lotid});
	
	if(obj)
	{ 
		inf.obj = obj.clone();
		//console.log('---------');
		if(obj) { addObjInScene(inf, cdm); }
	}
	else
	{
	console.log('---------', inf);
		var loader = new THREE.ObjectLoader();
		loader.parse( inf.model, function ( object ) 						
		{ 
			//object.scale.set(0.1, 0.1, 0.1);
			
			var obj = object;
			
			addObjInBase({lotid: lotid, obj: obj});
			
			if(cdm.loadFromFile)	// загрузка из сохраненного файла 
			{
				loadObjFromBase({lotid: lotid, furn: cdm.furn});
			}
			else					// добавляем объект в сцену 
			{
				inf.obj = obj;
				
				addObjInScene(inf, cdm);							
			}
		});
	
	}
	
	
}





// ищем был ли до этого объект добавлен в сцену (если был, то береме сохраненную копию)
function getObjFromBase(cdm)
{
	var lotid = cdm.lotid;								// объекты в сцене 
	var arrObj = infProject.scene.array.base;		// объекты в памяти	
	
	for(var i = 0; i < arrObj.length; i++)
	{
		if(arrObj[i].lotid == lotid)
		{
			return arrObj[i].obj;
		}

	}
	
	return null;
}



// добавляем новый объект в базу объектов (добавляются только уникальные объекты, кторых нет в базе)
function addObjInBase(cdm)
{
	var lotid = cdm.lotid;								// объекты в сцене
	var obj = cdm.obj;
	var base = infProject.scene.array.base;			// объекты в памяти	
	
	for(var i = 0; i < base.length; i++)
	{
		if(base[i].lotid == lotid)
		{  
			return null;
		}
	}

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
	
	base[base.length] = {lotid: lotid, obj: obj.clone()}; 
}




// добавляем объект в сцену
function addObjInScene(inf, cdm)
{
	var obj = inf.obj;
	
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





