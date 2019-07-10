









function createObject()
{
	var cube = new THREE.Mesh( createGeometryCube(0.5, 0.5, 0.5), new THREE.MeshLambertMaterial( { color : 0xcccccc } ) );
	scene.add( cube ); 	
	cube.userData.tag = 'obj';
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = cube;
	
	return cube;
}


function clickObject( obj, intersect )
{
	
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
		
		clippingGizmo360(obj); 		
	}

}



// удаление объекта
function deleteObjectPop(obj)
{
	clickO = resetPop.clickO();
	
	hidePivotGizmo(obj);
	
	deleteValueFromArrya({arr : infProject.scene.array.obj, o : obj});
	
	scene.remove( obj );	
}



// скрываем Pivot/Gizmo
function hidePivotGizmo(obj)
{
	if(!obj) return;
	if(!obj.userData.tag) return;
	if(obj.userData.tag != 'obj') return;
	
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;
	
	if(clickO.rayhit)
	{
		if(pivot.userData.pivot.obj == clickO.rayhit.object) return;		
		if(clickO.rayhit.object.userData.tag == 'pivot') return;
		
		if(gizmo.userData.gizmo.obj == clickO.rayhit.object) return;		
		if(clickO.rayhit.object.userData.tag == 'gizmo') return;		
	}	
	
	pivot.visible = false;
	gizmo.visible = false;
	
	pivot.userData.pivot.obj = null;
	gizmo.userData.gizmo.obj = null;
	
	//clickO.obj = null;
	clickO.last_obj = null;
	
	$('[nameId="obj_b_menu_1"]').hide();
}



// при выделении объекта, показываем меню 
function showObjUI()
{	
	$('[nameId="obj_b_menu_1"]').show();
}



// переключаем Pivot/Gizmo
function switchPivotGizmo(cdm)
{
	var obj = null;
	var pivot = infProject.tools.pivot;
	var gizmo = infProject.tools.gizmo;	
	
	if(infProject.settings.active.pg == 'pivot'){ obj = pivot.userData.pivot.obj; pivot.visible = false; }	
	if(infProject.settings.active.pg == 'gizmo'){ obj = gizmo.userData.gizmo.obj; gizmo.visible = false; }
	
	if(!obj) return;
	
	infProject.settings.active.pg = cdm.mode;		
	
	clickObject( obj, null );
}




