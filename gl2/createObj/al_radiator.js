



// меняем размеры алюминиевого радиатора 
function al_radiator_1(cdm)
{
	var obj = cdm.obj;
	
	var o = null;
	var op1 = null;
	var op2 = null;
	var op3 = null;
	
	var chpv = [];
	
	obj.traverse( function ( child ) 
	{
		if ( child.isMesh ) 
		{ 
			if(child.name == 'rad1_sekziy_500') { o = child; }
			
			if(child.userData.centerPoint)
			{ 
				if(child.userData.id == 0){ op1 = child; }
				if(child.userData.id == 2){ op2 = child; }
				if(child.userData.id == 3){ op3 = child; }
			}
			
			if(child.name == 'size_2_L_est_001') { chpv[chpv.length] = child; }
			if(child.name == 'size_2_R_est_') { chpv[chpv.length] = child; }
		}
	});			
	
	var dist = op1.position.distanceTo(op2.position);
	
	console.log('distanceTo', dist);
	var offset = 0.3;
	
	op2.position.y += offset;
	op3.position.y += offset;
	
	chpv[0].position.y += offset;
	chpv[1].position.y += offset;
	
	var positions = o.geometry.attributes["position"].array;
	var ptCout = positions.length / 3;
	
	for (var i = 0; i < ptCout; i++)
	{
		var p = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
		
		if(p.y < 0) { p.y += offset; o.geometry.attributes.position.array[i * 3 + 1] += offset; }			
	}	
	
	o.geometry.attributes.position.needsUpdate = true;
	
	
	//createHelperVertex({obj: o});	// показываем Vertex

	getBoundObject_2({obj: obj});	// обновляем геомтерию box 


	if(cdm.count > 1)
	{
		var x = (obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x)/1;
		
		var arr = [];
		arr[arr.length] = obj;
		
		for ( var i = 0; i < cdm.count+1; i++ )
		{
			var obj2 = obj.clone();
			
			obj2.position.copy(obj.position);
			obj2.position.x += x * (i+1);
			
			scene.add( obj2 );

			infProject.scene.array.obj[infProject.scene.array.obj.length] = obj2;
			
			arr[arr.length] = obj2;
		}
		
		createGroupObj_1({nameRus: 'новая группа', obj: {o: arr} });
	} 
	
}


