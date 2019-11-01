


function infoListObj()
{
	var arr = [];
	
	
	arr[0] =
	{	
		lotid : 1,
		url : infProject.path+'import/nasos_z.fbx', 
		name : 'насос',
		planeMath : 0.5,
	}
	
	arr[1] =
	{
		lotid : 2,
		url : infProject.path+'import/kotel_1.fbx', 
		name : 'котел',
		planeMath : 1.5,
	}
	
	arr[2] =
	{
		lotid : 3,
		url : infProject.path+'import/budres_900.fbx', 
		name : 'радиатор',
		planeMath : 0.8,
	}
	
	arr[3] =
	{
		lotid : 4,
		url : infProject.path+'import/bak_1.fbx', 
		name : 'расширительный бак',
		planeMath : 0.5,
	}	
	
	arr[4] =
	{
		lotid : 5,
		url : infProject.path+'import/kollector_1.fbx', 
		name : 'коллектор',
		planeMath : 0.5,
	}
	
	arr[5] =
	{
		lotid : 6,
		url : infProject.path+'import/rad_al_secziy_500_.fbx', 
		name : 'радиатор алюминиевый',
		planeMath : 0.5,
		
		//inf.joinPoint[0] = {name: 'size_1_L_', size: '1', joinObj: null};
		//inf.joinPoint[1] = {name: 'size_2_L_', size: '1', joinObj: null};
		//inf.joinPoint[2] = {name: 'size_1_R_', size: '1', joinObj: null};
		//inf.joinPoint[3] = {name: 'size_2_R_', size: '1', joinObj: null};		
	}
	
	arr[6] =
	{
		lotid : 7,
		url : infProject.path+'export/soedin_al_rad_1.fbx', 
		name : 'соединение алюминиевого радиатора',
		planeMath : 0.5,
		stopUI: true,
	}
	
	arr[7] =
	{
		lotid : 8,
		url : infProject.path+'import/kran_sgon_3s4.fbx',
		name : 'шаровой кран',
		planeMath : 0.5,		
	}
	
	arr[8] =
	{
		lotid : 9,
		url : infProject.path+'import/rad1_zagl_1_.fbx', 
		name : 'заглушка радиаторная',
		planeMath : 0.5,		
	}
	
	arr[9] =
	{
		lotid : 10,
		url : infProject.path+'import/rad1_zagl_3s4.fbx', 
		name :'заглушка радиаторная 3/4',
		planeMath : 0.5,		
	}	
	
	
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
}



function loadObjServer(cdm)
{ 
	// cdm - информация, которая пришла из вне
	// inf - статическая инфа из базы
	console.log(cdm);
	
	if(!cdm.lotid) return;
	
	var lotid = cdm.lotid;
	
	var inf = getInfoObj({lotid: lotid});	
	
	var obj = getObjFromBase({lotid: lotid});
	
	if(obj)
	{ 
		inf.obj = obj.clone();
		console.log('---------');
		if(obj) { addObjInScene(inf, cdm); }
	}
	else
	{
	
		var loader = new THREE.FBXLoader();
		loader.load( inf.url, function ( object ) 						
		{ 
			//object.scale.set(0.1, 0.1, 0.1);
			
			var obj = object.children[0];
			
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
	
	if(cdm.rot){ obj.rotation.set(cdm.rot.x, cdm.rot.y, cdm.rot.z); }					
	
	
	if(cdm.id){ obj.userData.id = cdm.id; }
	else { obj.userData.id = countId; countId++; }
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = cdm.lotid;
	obj.userData.obj3D.nameRus = inf.name;  
	obj.material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.5 } );
	obj.material.visible = false;
	//obj.rotation.y += 1;
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
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;

	scene.add( obj );
	 
	updateListTubeUI_1({o: obj, type: 'add'});	// добавляем объект в UI список материалов 
	
	if(cdm.cursor) { clickO.move = obj; } 
	
	renderCamera();
	
	
	if(cdm.lotid == 111223)
	{
		//obj.position.set(0,1,0);
		
		obj.updateMatrixWorld();
		
		var obj1 = obj.children[1];
		var obj2 = obj.children[2];
		
		var pos1 = obj1.getWorldPosition(new THREE.Vector3());
		var q1 = obj1.getWorldQuaternion(new THREE.Quaternion());
		
		var pos2 = obj2.getWorldPosition(new THREE.Vector3());
		var q2 = obj2.getWorldQuaternion(new THREE.Quaternion());		
		
		scene.add( obj1 );
		scene.add( obj2 );
		
		obj1.position.copy(pos1);
		obj1.quaternion.copy(q1);
		
		obj2.position.copy(pos2);
		obj2.quaternion.copy(q2);

		
		console.log(obj1.position)
		obj1.position.z += 1;
		obj2.position.z += 1;
	}
	
	if(1 == 1)
	{
		var arr = [];
		var id = 0;
		
		obj.traverse( function ( child ) 
		{
			if ( child.isMesh ) 
			{ 
				//console.log(child.name);
				
				if(new RegExp( '_est_' ,'i').test( child.name ))
				{
					//console.log(8888888, child.name);
					
					child.visible = false;						
					
					var cube = new THREE.Mesh( createGeometryWD(0.03, 0.03, 0.03), infProject.tools.joint.material.default );
					cube.position.copy(child.position);
					cube.quaternion.copy(child.quaternion);
					cube.visible = false;
					//cube.rotation.y += 1;
					//var axesHelper = new THREE.AxesHelper( 0.2 );
					//cube.add( axesHelper );							
					
					cube.userData.tag = 'joinPoint';
					cube.userData.id = id;  id++;
					cube.userData.centerPoint = { join: null };						 
					cube.userData.centerPoint.nameRus = '22';
					
					obj.add( cube );
					
					arr[arr.length] = cube;
					
				}
			}
		});
		

	}


}





