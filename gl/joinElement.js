

var typeJoin = false; 
var selectJoinPoint = { first: null, two: null };


// нажимаем на кнопку соединить (нижнее меню), показываем/скрываем у объекта точки стыковки 
function showHideJoinPoint(cdm)
{
	var obj = clickO.obj;
	
	if(!obj) return;
	
	//infProject.tools.pivot.visible = false;
	//infProject.tools.gizmo.visible = false;	
	
	
	if(obj.userData.joinPoint)
	{
		var flag = obj.userData.joinPoint.arr[0].visible;
		
		for(var i = 0; i < infProject.scene.array.joinPoint.length; i++)
		{
			infProject.scene.array.joinPoint[i].visible = false;				
		}
		
		infProject.scene.array.joinPoint = [];
		
		selectJoinPoint = { first: null, two: null };

		if(!flag)
		{
			for(var i = 0; i < obj.userData.joinPoint.arr.length; i++)
			{
				var o = obj.userData.joinPoint.arr[i];
				
				o.visible = true;
				o.material.color = new THREE.Color(0x00ff00);
				
				infProject.scene.array.joinPoint[infProject.scene.array.joinPoint.length] = o;				
			}
			
		}


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



