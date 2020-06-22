



// перемещение по 2D плоскости 
function moveFullTube( event )
{	
	var intersects = rayIntersect( event, planeMath, 'one' ); 
	
	if(intersects.length == 0) return;
	
	var tube = clickO.move;
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
	}	
	
	var line = tube.userData.wf_tube.line;
	var point = line.userData.wf_line.point;

	
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );
	var posCenter = new THREE.Vector3().subVectors( point[1].position, point[0].position ).divideScalar( 2 ).add(point[0].position);
	var pos2 = new THREE.Vector3().subVectors( pos, posCenter );

	
	for(var i = 0; i < point.length; i++)
	{
		point[i].position.add( pos2 );
	}

	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;	
		
		
	geometryTubeWF({line : line});	
}






