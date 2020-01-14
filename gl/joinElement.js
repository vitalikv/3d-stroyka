



// создаем инструмент 
function createJoinP()
{
	var joint = {};
	joint.p1 = [];
	joint.p2 = [];
	joint.el = [];
	joint.active = false;
	joint.active_1 = null;
	joint.active_2 = null;	
	joint.material = {};
	joint.material.active = new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true, opacity: 1.0, depthTest: false, lightMap: lightMap_1 });
	joint.material.default = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 1.0, depthTest: false, lightMap: lightMap_1 });
	joint.visible = false;
	

	return joint;	
}



function clickRayJoinPoint()
{
	var rayhit = null;
	var arr = infProject.tools.joint.p1;
	
	if(arr.length > 0)
	{
		var ray = rayIntersect( event, arr, 'arr' ); 
		if(ray.length > 0) 
		{ 
			rayhit = ray[0];
			rayhit.tag = 'act_1';
			return rayhit; 
		}


		var arr2 = infProject.tools.joint.p2;
		
		if(arr2)
		{
			var ray = rayIntersect( event, arr2, 'arr' ); 
			if(ray.length > 0) 
			{ 
				rayhit = ray[0];
				rayhit.tag = 'act_2';
				return rayhit; 
			}						
		}				
	}
	
	
	return null;
}



function showHideJP()
{
	var joint = infProject.tools.joint;			

	
	if(joint.visible) 
	{
		hideJoinPoint();
	}
	else 
	{
		if(infProject.settings.active.pg == 'pivot'){ var obj = infProject.tools.pivot.userData.pivot.obj; }	
		if(infProject.settings.active.pg == 'gizmo'){ var obj = infProject.tools.gizmo.userData.gizmo.obj; } 

		if(obj.userData.tag == 'joinPoint') { obj = obj.parent; }
		
		showJoinPoint({obj: obj});			
	}
}



// показываем точки-соединители
function showJoinPoint(cdm)
{
	if(!cdm.obj) return;
	var obj = cdm.obj;
	
	var joint = infProject.tools.joint;
	
	var active = null;	
	if(joint.active_1) { active = joint.active_1; }	
	
	if(infProject.settings.active.group) { hideJoinPoint(); }
	else { hideJoinPoint({clear: 2}); }
	
	var arr = getCenterPointFromObj_1( obj );
	
	for(var i = 0; i < arr.length; i++)
	{		
		//if(arr[i].userData.centerPoint.join) continue; 	// точка уже соеденина с другой точкой
		
		arr[i].visible = true;
		arr[i].material = joint.material.default;	
	}	
	
		
	joint.p1 = arr;
	joint.visible = true; 
	$('[nameId="show_join_point_checked"]').show(); 
	
	if(active) { activeJoinPoint({obj: active}); }
}


// показываем точки-соединители для 2-ого выделенного объекта
function showJoinPoint_2(cdm)
{
	if(!cdm.obj) return;
	var obj = cdm.obj;
	
	var joint = infProject.tools.joint;
	
	var arr = joint.p2;
	
	// скрываем старые точки
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = false;
		arr[i].material = joint.material.default;					
	}	
	
	clearListUI_2({list: infProject.tools.joint.el});
	
	
	var arr = getCenterPointFromObj_1( obj );	// получаем разъемы, если есть
	
	
	// показываем все точки
	for(var i = 0; i < arr.length; i++)
	{		
		//if(arr[i].userData.centerPoint.join) continue; 	// точка уже соеденина с другой точкой		
		arr[i].visible = true;
		arr[i].material = joint.material.default;
		
		createTextUI_1({obj: arr[i], nameId: "rp_obj_align", nameRus: arr[i].userData.centerPoint.nameRus, uuid: arr[i].uuid});
	}	
	
	if(arr.length > 0) 
	{
		clickItemCenterObjUI_2({item: 0}); 
	}	
}



// скрываем у объекта точки-соединители 
function hideJoinPoint(cdm)
{
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;	
	
	var active = null;  
	if(cdm.visible == 'full') {}
	else if(joint.active_1) { active = joint.active_1; }
	
	var arr = joint.p1; 
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = false;
		arr[i].material = joint.material.default;					
	}
	
	var arr = joint.p2;
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = false;
		arr[i].material = joint.material.default;					
	}
	
	joint.p1 = [];
	joint.p2 = [];
	joint.active_1 = null;
	joint.active_2 = null;	
	joint.visible = false;
	$('[nameId="show_join_point_checked"]').hide();
	
	if(active) { activeJoinPoint({obj: active}); }
}


function hideJoinPoint_2(cdm)
{
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;		
	
	var arr = joint.p2;
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = false;
		arr[i].material = joint.material.default;					
	}
	
	joint.p2 = [];
}


 
// активируем точку-соединитель 
function activeJoinPoint(cdm)
{
	var obj = null;
	if(cdm.obj) { obj = cdm.obj; }
	
	if(!obj) return;
	
	var joint = infProject.tools.joint;
	
	if(joint.active_1)	// снимаем старое выделение 
	{
		if(!joint.visible) { joint.active_1.visible = false; }
		joint.active_1.material = infProject.tools.joint.material.default;
		joint.active_1 = null;		
	}
	
	if(!joint.visible) { joint.p1 = [obj]; }
	 
	obj.material = joint.material.active;
	obj.visible = true;
	joint.active_1 = obj;
}





// получаем все точки-соединители (у группы или отдельного объекта)
function getArrayJointPoint(cdm)
{
	var o = cdm.obj;
	var arr = [];
	
	if(cdm.group !== undefined) { infProject.settings.active.group = cdm.group; }
	
	if(o.userData.obj3D.group && infProject.settings.active.group) 	// группа
	{		
		var group = o.userData.obj3D.group;
		var child = group.userData.groupObj.child;
		
		for(var i = 0; i < child.length; i++)
		{
			if(!child[i].userData.obj3D) continue;
			
			var arr_2 = getCenterPointFromObj_1( child[i] );
			
			for(var i2 = 0; i2 < arr_2.length; i2++)
			{
				arr[arr.length] = arr_2[i2];
			}
		}
	}
	else // объект
	{
		arr = getCenterPointFromObj_1( o );
	}

	return arr;	
}





// соединяем (выравниваем) элементы
function joinElement(cdm)
{ 
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;	
	
	var o1 = infProject.tools.joint.active_1;   
	var o2 = infProject.tools.joint.active_2;

	if(!o1) return;
	if(!o2) return;

	var obj_1 = infProject.tools.joint.active_1.parent;
	var obj_2 = infProject.tools.joint.active_2.parent;
		

	var q2 = o2.getWorldQuaternion(new THREE.Quaternion());
	var q1 = o1.getWorldQuaternion(new THREE.Quaternion());
	var q1 = q1.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)));	// разворачиваем на 180 градусов
	var diff_2 = new THREE.Quaternion().multiplyQuaternions(q2, q1.inverse());					// разница между Quaternions
	
	if(obj_2.userData.obj3D.group == obj_1.userData.obj3D.group) 	// второй объект из той же группы
	{
		var arr_2 = [obj_1];  
	}
	else if(obj_1.userData.obj3D.group && infProject.settings.active.group)		// объект имеет группу и выдилен как группа	
	{
		var arr_2 = getObjsFromGroup_1({obj: obj_1});
	}
	else	// объект без группы или объект с группой, но выдилен как отдельный объект
	{
		var arr_2 = [obj_1];
	}
	
	
	// поворачиваем объекты в нужном направлении 
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].quaternion.premultiply(diff_2);		// diff разницу умнажаем, чтобы получить то же угол	
		arr_2[i].updateMatrixWorld();		
	}
	
	var pos1 = o2.getWorldPosition(new THREE.Vector3());		
	var pos2 = o1.getWorldPosition(new THREE.Vector3());
	

	// вращаем position объектов, относительно точки-соединителя
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].position.sub(pos2);
		arr_2[i].position.applyQuaternion(diff_2); 	
		arr_2[i].position.add(pos2);
	}
	
	// после вращения vector, обновляем положение точки-соединителя
	obj_1.updateMatrixWorld();
	var pos2 = o1.getWorldPosition(new THREE.Vector3());
	var pos = new THREE.Vector3().subVectors( pos1, pos2 );
	
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].position.add(pos);		
	}			
	

	
	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }	
	
	obj_1.updateMatrixWorld();
	var pos = o1.getWorldPosition(new THREE.Vector3());
	var q = o1.getWorldQuaternion(new THREE.Quaternion());
	
	
	setScalePivotGizmo();
	tools.position.copy(pos);
	tools.quaternion.copy(q); 	
}












