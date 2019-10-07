



// создаем инструмент 
function createJoinP()
{
	var material = new THREE.MeshPhongMaterial({ color: 0xcccccc, transparent: true, opacity: 1.0, depthTest: false }); 
	var obj = new THREE.Mesh( createGeometryWD(0.01, 0.01, 0.01), material ); 	
	obj.userData.tag = 'joint';
	obj.userData.joint = {};
	obj.userData.joint.obj = null;
	obj.userData.joint.obj_2 = null;
	obj.userData.joint.material = {};
	obj.userData.joint.material.active = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 1.0, depthTest: false, lightMap: lightMap_1 });
	obj.userData.joint.material.default = new THREE.MeshLambertMaterial({ color: 0x00ff00, transparent: true, opacity: 1.0, depthTest: false, lightMap: lightMap_1 });
	obj.renderOrder = 1;
	obj.visible = false;
	scene.add( obj );

	return obj;	
}



function clickRayJoinPoint()
{
	var rayhit = null;
	var o = infProject.tools.joint.userData.joint.obj;
	
	if(o)
	{
		var ray = rayIntersect( event, getArrayJointPoint({obj: o}), 'arr' ); 
		if(ray.length > 0) { rayhit = ray[0]; return rayhit; }						
	}
	
	var o = infProject.tools.joint.userData.joint.obj_2;
	
	if(o)
	{
		var ray = rayIntersect( event, getArrayJointPoint({obj: o}), 'arr' ); 
		if(ray.length > 0) { rayhit = ray[0]; return rayhit; }						
	}		
	
	return null;
}


// показываем точки-соединители
function showJoinPoint(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;	
	
	if(obj.userData.joinPoint) { type = 'obj'; }
	else if(obj.userData.groupObj) { type = 'group'; }
	else { return; }
	
	hideJoinPoint({clear: 2});
	
	if(obj.userData.groupObj) { var arr = obj.children; }
	else { var arr = [obj]; }
	
	
	for(var i = 0; i < arr.length; i++)
	{
		var arrO = arr[i].userData.joinPoint.arr;
		
		for(var i2 = 0; i2 < arrO.length; i2++)
		{
			var o = arrO[i2];
			
			o.visible = true;
			o.material = infProject.tools.joint.userData.joint.material.default;
		}
		
		arr[i].userData.joinPoint.active = null;		
	}
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
		
		if(obj.userData.joinPoint) { type = 'obj'; }
		else if(obj.userData.groupObj) { type = 'group'; }		
		else { continue; }
 		
		if(obj.userData.groupObj) { var arr2 = obj.children; }
		else { var arr2 = [obj]; }
	
		for(var n = 0; n < arr2.length; n++)
		{
			var arrO = arr2[n].userData.joinPoint.arr;
			
			for(var i2 = 0; i2 < arrO.length; i2++)
			{
				var o = arrO[i2];
				
				o.visible = false;
				o.material = joint.userData.joint.material.default;			
			}

			arr2[n].userData.joinPoint.active = null;			
		}
		
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
		parent.userData.joinPoint.active.material = infProject.tools.joint.userData.joint.material.default;
		parent.userData.joinPoint.active = null;
	}
	
	
	obj.material = infProject.tools.joint.userData.joint.material.active;
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



// получаем все соединенные объекты в группе
function getArrayJointObj(cdm)
{
	var o = cdm.obj;
	var arr = [];
	
	if(o.parent.userData.groupObj) 
	{		
		for(var i = 0; i < o.parent.children.length; i++)
		{
			if(!o.parent.children[i].userData.tag) continue;
			
			arr[arr.length] = o.parent.children[i];
		}
	}
	else
	{
		arr[0] = o;
	}

	return arr;	
}


// получаем все точки-соединители , даже если это группа объектов
function getArrayJointPoint(cdm)
{
	var o = cdm.obj;
	var arr = [];
	
	if(o.userData.groupObj) 
	{				
		for(var i = 0; i < o.children.length; i++)
		{
			for(var i2 = 0; i2 < o.children[i].userData.joinPoint.arr.length; i2++)
			{
				arr[arr.length] = o.children[i].userData.joinPoint.arr[i2];
			}
		}
	}
	else
	{
		arr = o.userData.joinPoint.arr;
	}

	return arr;	
}


// находим вделеную точку-соединитель
function getActiveJointPoint(cdm)
{
	var o = cdm.obj;
	
	if(o.userData.groupObj) 
	{				
		for(var i = 0; i < o.children.length; i++)
		{
			if(o.children[i].userData.joinPoint.active)
			{
				return o.children[i].userData.joinPoint.active;
			}
		}
	}
	else
	{
		return o.userData.joinPoint.active;
	}

	return null;
}



// соединяем элементы
function joinElement(cdm)
{
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;
	
	var obj = infProject.tools.joint.userData.joint.obj;
	var obj_2 = infProject.tools.joint.userData.joint.obj_2;
	
	if(!obj) return;
	if(!obj_2) return;
	
	var o1 = getActiveJointPoint({obj: obj});  
	var o2 = getActiveJointPoint({obj: obj_2});

	if(!o1) return;
	if(!o2) return;


	var q = o1.getWorldQuaternion(new THREE.Quaternion());
	obj_2.quaternion.copy(q);
	obj_2.updateMatrixWorld();
	
	var pos1 = o1.getWorldPosition(new THREE.Vector3());		
	var pos2 = o2.getWorldPosition(new THREE.Vector3());
	var pos = new THREE.Vector3().subVectors( pos1, pos2 );	
	obj_2.position.add(pos);
	
	
	clickO.rayhit = null;
	
	hidePivotGizmo(obj);
	
	//if(obj.parent )
		
	if(1==1)
	{
		var material = new THREE.MeshPhongMaterial({ color: 0xcccccc, transparent: true, opacity: 1.0, depthTest: false }); 
		var group = new THREE.Mesh( createGeometryWD(0.03, 0.03, 0.03), material );
		group.userData.tag = 'group';
		group.userData.groupObj = true;
		
		var pos = new THREE.Vector3();
		var arr = [obj, obj_2];
		var arr2 = [];
		
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].userData.groupObj)
			{				
				arr[i].updateMatrixWorld();
				
				for(var i2 = arr[i].children.length - 1; i2 > -1; i2--)
				{
					var o = arr[i].children[i2];
					
					var pos1 = o.getWorldPosition(new THREE.Vector3());
					var q1 = o.getWorldQuaternion(new THREE.Quaternion());						
					
					scene.add(o);
					
					o.position.copy(pos1);
					o.quaternion.copy(q1);					
					pos.add( pos1 );
					
					arr2[arr2.length] = o;
				}
				
				disposeNode(arr[i]);
				scene.remove(arr[i]);	
				
			}
			else
			{
				pos.add( arr[i].position );
				
				arr2[arr2.length] = arr[i];
			}			
		}
		
		pos.divideScalar( arr2.length );
		
		group.position.copy(pos);
		group.rotation.copy(obj.rotation);
		
		scene.add( group );
		 
		for(var i = 0; i < arr2.length; i++)
		{
			group.attach(arr2[i]);
		}			
		
		console.log(222, group);		
	}
}









