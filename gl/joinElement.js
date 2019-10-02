

var typeJoin = false; 
var selectJoinPoint = { first: null, two: null }; 


function createJoinP()
{
	var material = new THREE.MeshPhongMaterial({ color: 0xcccccc, transparent: true, opacity: 1.0, depthTest: false }); 
	var obj = new THREE.Mesh( createGeometryWD(0.01, 0.01, 0.01), material ); 	
	obj.userData.tag = 'joint';
	obj.userData.joint = {};
	obj.userData.joint.obj = null;
	obj.userData.joint.arrJ_1 = [];		// все соединители для 1-ого выбранного объекта
	obj.userData.joint.arrJ_2 = [];
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
	

	infProject.tools.joint.userData.joint.arrJ_1 = [];
	
	for(var i = 0; i < obj.userData.joinPoint.arr.length; i++)
	{
		var o = obj.userData.joinPoint.arr[i];
		
		o.visible = true;
		o.material.color = new THREE.Color(0x00ff00);
		
		infProject.tools.joint.userData.joint.arrJ_1[i] = o;
	}
}



// скрываем у объекта точки-соединители 
function hideJoinPoint(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;	
	if(!obj.userData.joinPoint) return;
	

	for(var i = 0; i < obj.userData.joinPoint.arr.length; i++)
	{
		var o = obj.userData.joinPoint.arr[i];
		
		o.visible = false;
		o.material.color = new THREE.Color(0x00ff00);			
	}
}




// клинули на точку-соединитель
function clickJoinPoint(cdm)
{
	var rayhit = cdm.rayhit;
	var obj = rayhit.object;
	
	typeJoin = false;
	
	if(!selectJoinPoint.first) 
	{ 
		obj.material.color = new THREE.Color(0xff0000);
		
		selectJoinPoint.first = obj;
		typeJoin = true;
	}
	else if(selectJoinPoint.first == obj) 
	{
		obj.material.color = new THREE.Color(0x00ff00);
		
		selectJoinPoint.first = null;
	}
	else
	{
		var parent = selectJoinPoint.first.parent;
		
		if(parent == obj.parent)
		{
			selectJoinPoint.first.material.color = new THREE.Color(0x00ff00);
			
			obj.material.color = new THREE.Color(0xff0000);
			
			selectJoinPoint.first = obj;
			typeJoin = true;
		}
	}
	
	
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



