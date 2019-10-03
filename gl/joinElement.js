


var selectJoinPoint = { first: null, two: null }; 


// создаем инструмент 
function createJoinP()
{
	var material = new THREE.MeshPhongMaterial({ color: 0xcccccc, transparent: true, opacity: 1.0, depthTest: false }); 
	var obj = new THREE.Mesh( createGeometryWD(0.01, 0.01, 0.01), material ); 	
	obj.userData.tag = 'joint';
	obj.userData.joint = {};
	obj.userData.joint.obj = null;
	obj.userData.joint.obj_2 = null;
	obj.renderOrder = 1;
	obj.visible = false;
	scene.add( obj );

	return obj;	
}



// показываем точки-соединители
function showJoinPoint(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;	
	if(!obj.userData.joinPoint) return;
	
	var joint = infProject.tools.joint;
	
	console.log(3334, joint.userData.joint.obj, obj)
	
	if(joint.userData.joint.obj_2 == obj) return;
	
	// объект не равен ни 1, ни 2 
	if(joint.userData.joint.obj)
	{
		if(joint.userData.joint.obj.userData.joinPoint.active)
		{
			hideJoinPoint({clear: 2});
		}		
	}
	
	for(var i = 0; i < obj.userData.joinPoint.arr.length; i++)
	{
		var o = obj.userData.joinPoint.arr[i];
		
		o.visible = true;
		o.material.color = new THREE.Color(0x00ff00);
	}
	
	obj.userData.joinPoint.active = null;
}



// скрываем у объекта точки-соединители 
function hideJoinPoint(cdm)
{
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;	
	
	var arr = [joint.userData.joint.obj, joint.userData.joint.obj_2];
	
	if(cdm.clear) arr = [joint.userData.joint.obj_2];
	
	
	for(var i = 0; i < arr.length; i++)
	{
		var obj = arr[i];
		
		if(!obj) continue;	
		if(!obj.userData.joinPoint) continue;		

		for(var i2 = 0; i2 < obj.userData.joinPoint.arr.length; i2++)
		{
			var o = obj.userData.joinPoint.arr[i2];
			
			o.visible = false;
			o.material.color = new THREE.Color(0x00ff00);			
		}

		obj.userData.joinPoint.active = null;
	}
	
}




// клинули на точку-соединитель
function clickJoinPoint(cdm)
{
	var rayhit = cdm.rayhit;
	var obj = rayhit.object;
	var parent = obj.parent;
	
	
	if(parent.userData.joinPoint.active)
	{
		parent.userData.joinPoint.active.material.color = new THREE.Color(0x00ff00);
		parent.userData.joinPoint.active = null;
	}
	
	
	obj.material.color = new THREE.Color(0xff0000);
	parent.userData.joinPoint.active = obj;
	

	
	
}


// при выделении точки-соединителя, показываем меню 
function showHideJoinObjUI(cdm)
{
	if(cdm.visible)
	{
		$('[nameId="join_obj_b_menu_1"]').show();
	}
	else
	{
		$('[nameId="join_obj_b_menu_1"]').hide();
	}	
}



function joinElement(cdm)
{
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;
	
	var obj = infProject.tools.joint.userData.joint.obj;
	var obj_2 = infProject.tools.joint.userData.joint.obj_2;
	
	if(!obj) return;
	if(!obj_2) return;
	
	var o1 = obj.userData.joinPoint.active;
	var o2 = obj_2.userData.joinPoint.active;

	if(!o1) return;
	if(!o2) return;


	var pos1 = o1.getWorldPosition(new THREE.Vector3());		
	var pos2 = o2.getWorldPosition(new THREE.Vector3());
	
	var pos = new THREE.Vector3().subVectors( pos1, pos2 );
	
	obj_2.position.add(pos);
}



