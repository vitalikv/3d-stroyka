









function createObject()
{
	var cube = new THREE.Mesh( createGeometryCube(0.5, 0.5, 0.5), new THREE.MeshLambertMaterial( { color : 0x030202, transparent: true, opacity: 1, depthTest: false } ) );
	scene.add( cube ); 	
	cube.userData.tag = 'obj';
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = cube;
	
	return cube;
}


function clickObject( intersect )
{
	var pivot = infProject.tools.pivot;
	
	pivot.visible = true;
	
	pivot.userData.pivot.obj = intersect.object;
	
	pivot.position.copy(intersect.object.position);
}





function deActiveObj(obj)
{
	if(!obj) return;
	if(!obj.userData.tag) return;
	if(obj.userData.tag != 'obj') return;
	
	var pivot = infProject.tools.pivot;
	
	if(clickO.obj)
	{
		if(pivot.userData.pivot.obj == clickO.obj) return;
		
		if(clickO.obj.userData.tag == 'pivot') return;
	}	
	
	pivot.visible = false;
	
	pivot.userData.pivot.obj = null;
	
	clickO.obj = null;
	clickO.last_obj = null;
}





