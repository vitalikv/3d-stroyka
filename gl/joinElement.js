


var selectJoinPoint = { first: null, two: null }; 


function createJoinP()
{
	var material = new THREE.MeshPhongMaterial({ color: 0xcccccc, transparent: true, opacity: 1.0, depthTest: false }); 
	var obj = new THREE.Mesh( createGeometryWD(0.01, 0.01, 0.01), material ); 	
	obj.userData.tag = 'joint';
	obj.userData.joint = {};
	obj.userData.joint.obj = null;
	obj.userData.joint.obj_2 = null;
	obj.userData.joint.link_1 = null;
	obj.userData.joint.link_2 = null;
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
	
	
	for(var i = 0; i < obj.userData.joinPoint.arr.length; i++)
	{
		var o = obj.userData.joinPoint.arr[i];
		
		o.visible = true;
		o.material.color = new THREE.Color(0x00ff00);
	}
}



// скрываем у объекта точки-соединители 
function hideJoinPoint(cdm)
{
	var joint = infProject.tools.joint;
	
	var arr = [joint.userData.joint.obj, joint.userData.joint.obj_2];
	
	
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
	
}



