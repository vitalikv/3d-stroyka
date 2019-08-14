


function loadObjServer(cdm)
{ console.log(cdm);
	if(!cdm.lotid) return;
	
	var lotid = cdm.lotid;

	if(lotid == 1)
	{
		inf = {obj: '/gl/export/nasos.obj', material: '/gl/export/nasos.mtl'}
	}
	
	new THREE.MTLLoader().load
	( 
		inf.material,
		
		function ( materials ) 
		{
			materials.preload();
			
			new THREE.OBJLoader().setMaterials( materials ).load						
			( 
				inf.obj, 
				function ( object ) 
				{		
					
					//object.scale.set(0.1, 0.1, 0.1);
					
					var obj = object.children[0];
					
					if(cdm.pos){ obj.position.copy(cdm.pos); }
					if(cdm.rot){ obj.rotation.copy(cdm.rot); }					
					
					obj.material.lightMap = lightMap_1;
					
					obj.userData.tag = 'obj';
					
					if(cdm.id){ obj.userData.id = cdm.id; }
					else { obj.userData.id = countId; countId++; }
					
					infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
	
					scene.add( obj );
				} 
			);
		}
	);	
}