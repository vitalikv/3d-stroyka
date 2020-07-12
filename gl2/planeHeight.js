




function createPlaneHeight()
{
	var geometry = new THREE.PlaneGeometry( 50, 50 );
	//var geometry = new THREE.PlaneGeometry( 10, 10 );
	var material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.5, side: THREE.DoubleSide } );
	//material.visible = false; 
	var plane = new THREE.Mesh( geometry, material );
	plane.rotation.set(-Math.PI/2, 0, 0);
	plane.position.y = 0;
	plane.userData.tag = 'planeHeight';
	plane.visible = false; 
	scene.add( plane );	
	
	return plane;
}



function setPlaneHeightPositionY(cdm)
{
	if(!cdm) cdm = {};

	var plane = infProject.tools.heightPl;	
	
	if(cdm.value !== undefined)
	{
		var value = checkNumberInput({ value: cdm.value, unit: 1 });
		
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
			
	
	//if(infProject.list.alignP.active)	// вкл	
}



