



// меняем размеры алюминиевого радиатора 
function al_radiator_1(cdm)
{
	var obj = cdm.obj;
	
	
	var o = null;	// радиатор	
	var op = [];	// зеленые разъемы	
	var chpv = [];	// технические(из модели) разъемы, которые скрываются и к которым крепятся зеленые разъемы 
	
	// op[0] вверхний левый
	// op[1] вверхний правый
	// op[2] нижний левый
	// op[3] нижний правый	

	
	obj.traverse( function ( child ) 
	{
		if ( child.isMesh ) 
		{ 
			if(child.name == 'rad1_sekziy_500') { o = child; }
			
			if(child.userData.centerPoint)
			{ 
				op[op.length] = child;
			}
			
			if(new RegExp( '_est_' ,'i').test( child.name ))
			{
				chpv[chpv.length] = child;
			}
		}
	});


	var y = op[0].position.distanceTo(op[2].position);		// высота между разъемами 
	var y2 = op[1].position.distanceTo(op[3].position);
	
	console.log('distanceTo', y, y2);
	
	var offsetY = 0;
	
	if(cdm.size)
	{
		if(cdm.size.y) { offsetY = cdm.size.y - y; }
	}
	
	

	
	

	// меняем размер секции
	{
		chpv[0].position.y += offsetY;
		chpv[1].position.y += offsetY;
		
		var positions = o.geometry.attributes["position"].array;
		var ptCout = positions.length / 3;
		
		for (var i = 0; i < ptCout; i++)
		{
			var p = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
			
			if(p.y > 0) { positions[i * 3 + 1] += offsetY; }			
		}	
		
		o.geometry.attributes.position.needsUpdate = true;
		
	}
	
	
	
	// добавляем секции
	if(cdm.count > 1)
	{
		var parent = o.parent;
		o.geometry.computeBoundingBox();		
		var x = (o.geometry.boundingBox.max.x - o.geometry.boundingBox.min.x)/1;
		
		for ( var i = 0; i < cdm.count-1; i++ )
		{
			var o2 = o.clone();
			
			o2.position.copy(o.position);
			o2.position.x += x * (i+1);
			
			parent.add( o2 );
		}

		chpv[1].position.x += x * (cdm.count - 1);
		chpv[3].position.x += x * (cdm.count - 1);		
	}	
	
	//createHelperVertex({obj: o});	// показываем Vertex

	getBoundObject_2({obj: obj});	// обновляем геомтерию box 

	
	// устанавливаем разъемы(centerPoint) на свои места	
	var num = 0;
	var parent = o.parent;
	
	obj.traverse( function ( child ) 
	{
		if ( child.isMesh ) 
		{ 
			if(new RegExp( '_est_' ,'i').test( child.name ))
			{
				if(num < op.length)
				{
					
					op[num].position.copy(child.position);
					op[num].quaternion.copy(child.quaternion);

					num++;
				}
			}
		}
	});

	

	var dist = op[0].position.distanceTo(op[2].position);
	var dist2 = op[1].position.distanceTo(op[3].position);
	
	console.log('distanceTo', dist, dist2);	
	console.log('position', obj.geometry.boundingBox);
	

}











