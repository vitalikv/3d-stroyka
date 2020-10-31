

function createPlaneHeight()
{
	var lineGrid = new THREE.Group();
	
	var size = 0.2;
	size = Math.round(size * 100)/100; 
	var count = 15/size;
	
	var color = 0xd6d6d6;		
	
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { color: color, opacity: 1 } );
	
	var ofsset = (count * size) / 2;
	
	// длина линии, центр по середине
	geometry.vertices.push(new THREE.Vector3( -ofsset, 0, 0 ) );	
	geometry.vertices.push(new THREE.Vector3( ofsset, 0, 0 ) );


	for ( var i = 0; i <= count; i ++ ) 
	{
		var line = new THREE.Line( geometry, material );
		line.position.z = ( i * size ) - ofsset;
		lineGrid.add( line );

		var line = new THREE.Line( geometry, material );
		line.position.x = ( i * size ) - ofsset;
		line.rotation.y = 90 * Math.PI / 180;
		lineGrid.add( line );
		
		//console.log(( i * size ) - (count * size) / 2);
	}
	
	scene.add( lineGrid );	

	
	lineGrid.userData.mouse = { down: false, move: false, up: false, startPos: new THREE.Vector3() };
	lineGrid.userData.size = size;
	lineGrid.userData.count = count;
	lineGrid.userData.color = lineGrid.children[0].material.color.clone();
	
	lineGrid.position.y = 0.0;
	lineGrid.userData.tag = 'planeHeight';	
	
	return lineGrid;
}



// просто плоскать, теперь заменил на стеку (не использую)
function createPlaneHeight_2()
{
	var geometry = new THREE.PlaneGeometry( 50, 50 );
	var material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.5, side: THREE.DoubleSide } );
	//material.visible = false; 
	var plane = new THREE.Mesh( geometry, material );
	plane.rotation.set(-Math.PI/2, 0, 0);
	plane.position.y = 0.5;
	plane.userData.tag = 'planeHeight';
	plane.visible = false; 
	scene.add( plane );	
	
	return plane;
}




// через input устанавливаем высоту для высоты плоскости
function setPlaneHeightPositionY(cdm)
{
	if(!cdm) cdm = {};

	var plane = infProject.tools.heightPl;	
	
	if(cdm.value !== undefined)
	{
		var value = checkNumberInput({ value: cdm.value, unit: 1, limit: {min: -15, max: 15} });
		
		if(!value)
		{
			$('[nameId="rp_planeHeight_posY"]').val( Math.round(plane.position.y*100)/100 );
			
			return;			
		}
	}
	else
	{
		$('[nameId="rp_planeHeight_posY"]').val( Math.round(plane.position.y*100)/100 );
		
		return;
	}	
	
	plane.position.y = Math.round(value.num*100)/100;	

	$('[nameId="rp_planeHeight_posY"]').val( plane.position.y );	
	
	renderCamera();		
}





// показываем/прячем плоскать высоты
function showHidePlaneHeight(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.tools.heightPl.visible = cdm.active;
	}	
	else
	{
		infProject.tools.heightPl.visible = !infProject.tools.heightPl.visible;
	}
			
	renderCamera();
	//if(infProject.list.alignP.active)	// вкл	
}



