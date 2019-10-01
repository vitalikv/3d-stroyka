


// нажимаем на кнопку соединить (нижнее меню), показываем/скрываем у объекта точки стыковки 
function showHideJoinPoint(cdm)
{
	var obj = clickO.obj;
	
	if(!obj) return;
	
	//infProject.tools.pivot.visible = false;
	//infProject.tools.gizmo.visible = false;	
	
	
	if(obj.userData.joinPoint)
	{
		// точки-соединители скрыты, значит нужно показать их
		if(!obj.userData.joinPoint.visible)
		{
			for(var i = 0; i < obj.userData.joinPoint.arr.length; i++)
			{
				var o = obj.userData.joinPoint.arr[i];
				
				o.visible = true;
				o.material.color = new THREE.Color(0x00ff00);
				
				infProject.scene.array.joinPoint[infProject.scene.array.joinPoint.length] = o;				
			}

			obj.userData.joinPoint.visible = true;
		}
		else	// скрываем точки-соединители
		{
			for(var i = 0; i < obj.userData.joinPoint.arr.length; i++)
			{
				var o = obj.userData.joinPoint.arr[i];
				
				o.visible = false;
				
				deleteValueFromArrya({arr : infProject.scene.array.joinPoint, o : o});				
			}

			obj.userData.joinPoint.visible = false;
		}
	}

}



// клинули на точку-соединитель
function clickJoinPoint(cdm)
{
	var rayhit = cdm.rayhit;
	var obj = rayhit.object;
	
	
	obj.material.color = new THREE.Color(0xff0000);
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



