


function loadObjServer(cdm)
{ 
	console.log(cdm);
	
	if(!cdm.lotid) return;
	
	var lotid = cdm.lotid;

	if(lotid == 1)
	{
		inf = {obj: infProject.path+'import/nasos_z.fbx'}
		inf.planeMath = 0.5;
	}
	
	
	var loader = new THREE.FBXLoader();
	loader.load( infProject.path+'import/nasos_z.fbx', function ( object ) 						
	{ 
		//object.scale.set(0.1, 0.1, 0.1);
		
		var obj = object.children[0];
		
		if(cdm.pos){ obj.position.copy(cdm.pos); }
		else if(inf.planeMath)
		{ 
			obj.position.y = inf.planeMath;
			planeMath.position.y = inf.planeMath; 
			planeMath.updateMatrixWorld(); 
		}
		
		if(cdm.rot){ obj.rotation.copy(cdm.rot); }					
		
		
		if(cdm.id){ obj.userData.id = cdm.id; }
		else { obj.userData.id = countId; countId++; }
		
		obj.userData.tag = 'obj';
		obj.userData.obj3D = {};
		obj.userData.obj3D.lotid = lotid;
		obj.material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.0 } );
		
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
	});
	
}











