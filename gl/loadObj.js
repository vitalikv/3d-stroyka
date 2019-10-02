




function loadObjServer(cdm)
{ 
	// cdm - информация, которая пришла из вне
	// inf - статическая инфа из базы
	console.log(cdm);
	
	if(!cdm.lotid) return;
	
	var lotid = cdm.lotid;
	var inf = {};
	inf.joinPoint = [];
	
	if(lotid == 1)
	{
		inf.url = infProject.path+'import/nasos_z.fbx'; 
		inf.name = 'насос';
		inf.planeMath = 0.5;
	}
	else if(lotid == 2)
	{
		inf.url = infProject.path+'import/kotel_1.fbx'; 
		inf.name = 'котел';
		inf.planeMath = 1.5;
	}
	else if(lotid == 3)
	{
		inf.url = infProject.path+'import/budres_900.fbx'; 
		inf.name = 'радиатор';
		inf.planeMath = 0.8;
	}
	else if(lotid == 4)
	{
		inf.url = infProject.path+'import/bak_1.fbx'; 
		inf.name = 'расширительный бак';
		inf.planeMath = 0.5;
	}	
	else if(lotid == 5)
	{
		inf.url = infProject.path+'import/kollector_1.fbx'; 
		inf.name = 'коллектор';
		inf.planeMath = 0.5;
	}
	else if(lotid == 6)
	{
		inf.url = infProject.path+'export/rad_al_secziy_500_.fbx'; 
		inf.name = 'радиатор алюминиевый';
		inf.planeMath = 0.5;
		
		inf.joinPoint[0] = {name: 'size_1_L_', size: '1', joinObj: null};
		inf.joinPoint[1] = {name: 'size_2_L_', size: '1', joinObj: null};
		inf.joinPoint[2] = {name: 'size_1_R_', size: '1', joinObj: null};
		inf.joinPoint[3] = {name: 'size_2_R_', size: '1', joinObj: null};		
	}
	else if(lotid == 7)
	{
		inf.url = infProject.path+'export/soedin_al_rad_1.fbx'; 
		inf.name = 'соединение алюминиевого радиатора';
		inf.planeMath = 0.5;		
	}

	
	var exist = getArrayObj({lotid: lotid});
	
	if(exist)
	{
		var obj = getArrayObj(cdm);
		inf.obj = obj.clone();
		if(obj) { setParamObj(inf, cdm); }
	}
	else
	{
	
		var loader = new THREE.FBXLoader();
		loader.load( inf.url, function ( object ) 						
		{ 
			//object.scale.set(0.1, 0.1, 0.1);
			
			var obj = object.children[0];
			
			addArrayObj({lotid: lotid, obj: obj});
			
			inf.obj = obj;
			
			setParamObj(inf, cdm);			
		});
	
	}
	
	
}





// ищем был ли до этого объект добавлен в сцену (если был, то береме сохраненную копию)
function getArrayObj(cdm)
{
	var lotid = cdm.lotid;								// объекты в сцене 
	var arrObj = infProject.scene.array.arrObj;		// объекты в памяти	
	
	for(var i = 0; i < arrObj.length; i++)
	{
		if(arrObj[i].lotid == lotid)
		{
			return arrObj[i].obj;
		}

	}
	
	return null;
}



// добавляем новый объект из сцены в массив клонов
function addArrayObj(cdm)
{
	var lotid = cdm.lotid;								// объекты в сцене
	var obj = cdm.obj;
	var arrObj = infProject.scene.array.arrObj;			// объекты в памяти	
	
	for(var i = 0; i < arrObj.length; i++)
	{
		if(arrObj[i].lotid == lotid)
		{  console.log(lotid);
			return null;
		}
	}	
	
	//arrObj[arrObj.length] = {lotid: lotid, obj: obj.clone()}; 
}




function setParamObj(inf, cdm)
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
	
	
	if(cdm.lotid == 3)
	{
		obj.position.set(0,1,0);
		
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
	
	if(cdm.lotid == 6)
	{
		var arr = [];
		
		obj.traverse( function ( child ) 
		{
			if ( child.isMesh ) 
			{ 
				//console.log(child.name);
				
				for(var i = 0; i < inf.joinPoint.length; i++)
				{
					if(child.name == inf.joinPoint[i].name)
					{
						child.userData.joinObj = null;
						child.userData.tag = 'joinPoint';
						child.visible = false;
						
						arr[arr.length] = child;
					}
				}
			}
		});

		if(arr.length > 0) 
		{ 
			obj.userData.joinPoint = {visible: false, arr: arr, active: null}; 
		}
		
		//obj.position.set(0,1,0);
	}
}





