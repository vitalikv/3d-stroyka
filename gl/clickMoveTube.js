



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
	
	
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );	
	
	var pos2 = new THREE.Vector3().subVectors( pos, tube.position );
	tube.position.add( pos2 );

	var line = tube.userData.wf_tube.line;
	//line.position.add( pos2 );
	
	var point = line.userData.wf_line.point;
	
	for(var i = 0; i < point.length; i++)
	{
		point[i].position.add( pos2 );
	}

		line.geometry.verticesNeedUpdate = true; 
		line.geometry.elementsNeedUpdate = true;	
		
		
		
}






