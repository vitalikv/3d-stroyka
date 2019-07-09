









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
	var obj = intersect.object;
	
	obj.updateMatrixWorld();
	var pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );
	
	if(infProject.settings.active.pg == 'pivot')
	{
		var pivot = infProject.tools.pivot;	
		pivot.visible = true;	
		pivot.userData.pivot.obj = obj;
		pivot.position.copy(pos);		
	}
	
	if(infProject.settings.active.pg == 'gizmo')
	{
		var gizmo = infProject.tools.gizmo;
					
		gizmo.position.copy( pos );
		gizmo.rotation.copy( obj.rotation );
		gizmo.visible = true;
		gizmo.userData.gizmo.obj = obj;
		
		clippingGizmo360(intersect.object); 		
	}

}





function hidePivotGizmo(obj)
{
	if(!obj) return;
	if(!obj.userData.tag) return;
	if(obj.userData.tag != 'obj') return;
	
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;
	
	if(clickO.obj)
	{
		if(pivot.userData.pivot.obj == clickO.obj) return;		
		if(clickO.obj.userData.tag == 'pivot') return;
		
		if(gizmo.userData.gizmo.obj == clickO.obj) return;		
		if(clickO.obj.userData.tag == 'gizmo') return;		
	}	
	
	pivot.visible = false;
	gizmo.visible = false;
	
	pivot.userData.pivot.obj = null;
	gizmo.userData.gizmo.obj = null;
	
	//clickO.obj = null;
	clickO.last_obj = null;
	console.log('hide', obj);
	$('[nameId="obj_b_menu_1"]').hide();
}



// при выделении объекта, показываем меню
function showObjUI()
{	
	$('[nameId="obj_b_menu_1"]').show();
}





