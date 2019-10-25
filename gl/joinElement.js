



// создаем инструмент 
function createJoinP()
{
	var joint = {};
	joint.p1 = [];
	joint.p2 = [];	
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
	
	var arr = getArrayJointPoint({obj: obj, group: infProject.settings.active.group});	
	
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
	
	if(obj.userData.obj3D.centerP)	// у объекта есть разъем
	{
		var arr = obj.userData.obj3D.centerP.arr;
	}
	else		// у объекта нет разъему
	{
		var arr = null;
	}	
	
	for(var i = 0; i < arr.length; i++)
	{		
		//if(arr[i].userData.centerPoint.join) continue; 	// точка уже соеденина с другой точкой
		
		arr[i].visible = true;
		arr[i].material = joint.material.default;	
	}	
	
		
	joint.p2 = arr;
	
	//$('[nameId="show_join_point_checked"]').show(); 
	
	//if(active) { activeJoinPoint({obj: active}); }
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




function activeJoinPoint_2(cdm)
{
	var obj = null;
	if(cdm.obj) { obj = cdm.obj; } 
	
	if(!obj) return;
	
	var joint = infProject.tools.joint;
	
	if(joint.active_2)	// снимаем старое выделение 
	{
		//if(!joint.visible) { joint.active_2.visible = false; }
		joint.active_2.material = infProject.tools.joint.material.default;
		joint.active_2 = null;		
	}
	
	//if(!joint.visible) { joint.p1 = [obj]; }
	
	obj.material = joint.material.active;
	obj.visible = true;
	joint.active_2 = obj;
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
			
			for(var i2 = 0; i2 < child[i].userData.obj3D.centerP.arr.length; i2++)
			{
				arr[arr.length] = child[i].userData.obj3D.centerP.arr[i2];
			}
		}
	}
	else if(o.userData.obj3D.centerP)	// у объекта есть разъему
	{
		arr = o.userData.obj3D.centerP.arr;
	}
	else		// у объекта нет разъему
	{
		
	}

	return arr;	
}





// соединяем элементы и создаем группу
function joinElement(cdm)
{ 
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;	
	
	var o1 = infProject.tools.joint.active_1;   
	var o2 = infProject.tools.joint.active_2;

	if(!o1) return;
	if(!o2) return;

	var obj = infProject.tools.joint.active_1.parent;
	var obj_2 = infProject.tools.joint.active_2.parent;

	var q = o1.getWorldQuaternion(new THREE.Quaternion());	
	var diff = new THREE.Quaternion().multiplyQuaternions(o2.getWorldQuaternion(new THREE.Quaternion()).inverse(), q);	// разница между Quaternions
	
	
	if(obj.userData.obj3D.group == obj_2.userData.obj3D.group) 
	{
		var arr_2 = [obj_2];  
	}
	else
	{
		var arr_2 = getObjsFromGroup_1( obj_2 );
	}
	
	obj_2.quaternion.multiply(diff);
	obj_2.updateMatrixWorld();
	
	// поворачиваем объекты в нужном направлении 
	for(var i = 0; i < arr_2.length; i++)
	{
		if(arr_2[i] == obj_2) continue;
		
		arr_2[i].quaternion.premultiply(diff);		// diff разницу умнажаем, чтобы получить то же угол
		
		
		//arr_2[i].quaternion.copy(new THREE.Quaternion().multiplyQuaternions(arr_2[i].quaternion, diff));
		arr_2[i].updateMatrixWorld();		
	}
	
	var pos1 = o1.getWorldPosition(new THREE.Vector3());		
	var pos2 = o2.getWorldPosition(new THREE.Vector3());
	

	if(arr_2.length == 1)	// одиночный объект
	{
		var pos = new THREE.Vector3().subVectors( pos1, pos2 );
		
		for(var i = 0; i < arr_2.length; i++)
		{
			arr_2[i].position.add(pos);		
		}	
	}
	else	// группа
	{
		// вращаем position объектов, относительно точки-соединителя
		for(var i = 0; i < arr_2.length; i++)
		{
			arr_2[i].position.sub(pos2);
			arr_2[i].position.applyQuaternion(diff); 	
			arr_2[i].position.add(pos2);
		}
		
		// после вращения vector, обновляем положение точки-соединителя
		obj_2.updateMatrixWorld();
		var pos2 = o2.getWorldPosition(new THREE.Vector3());
		var pos = new THREE.Vector3().subVectors( pos1, pos2 );
		
		for(var i = 0; i < arr_2.length; i++)
		{
			arr_2[i].position.add(pos);		
		}			
	}	
	
	
	clickO.rayhit = null;
	
	hidePivotGizmo(obj);

		
	if(1==2)
	{		
		var arr_1 = getObjsFromGroup_1( obj );
		
		
		
		detachObjsGroup({obj: obj, child: arr_1});
		detachObjsGroup({obj: obj_2, child: arr_2});
		
		// разбиваем группу 
		function detachObjsGroup(cdm)
		{
			var obj = cdm.obj;			
			if(!obj.userData.obj3D.group) return;
				
			var child = (cdm.child) ? cdm.child : getObjsFromGroup_1( obj ); 
			
			var group = obj.userData.obj3D.group;
			var centerObj = obj.userData.obj3D.group.userData.groupObj.centerObj;
			
			for(var i = 0; i < child.length; i++)
			{
				child[i].userData.obj3D.group = null;
			}
			
			// удаляем группу
			deleteValueFromArrya({arr : infProject.scene.array.group, o : group});	
			
			// удаляем центральный куб
			disposeNode(centerObj);
			scene.remove(centerObj);							
		}
		
		var arr = arr_1.concat(arr_2);	// объединяем массивы
		
		// находим общий центр 
		var pos = new THREE.Vector3();
		
		for(var i = 0; i < arr.length; i++)
		{
			arr[i].updateMatrixWorld();
			pos.add( arr[i].localToWorld( arr[i].geometry.boundingSphere.center.clone() ) );	// добавляем позицию центра объекта		
		}
		
		pos.divideScalar( arr.length );
				
		
		// создаем новую группу	
		createGroupObj_1({pos: pos, rot: obj.rotation, nameRus: 'новая группа', obj: {o: arr} });	
		
		//formGroupObj({group: group, arrO: arr2});
	}
}








// создать форму для группы объектов
function formGroupObj(cdm)
{
	var group = cdm.group;
	var arrO = cdm.arrO;
	
	group.updateMatrixWorld();
	var v = [];
	
	for(var i = 0; i < arrO.length; i++)
	{
		var obj = arrO[i];
		
		obj.updateMatrixWorld();
		obj.geometry.computeBoundingBox();	
		
		v[v.length] = group.worldToLocal( obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.min.x, 0, 0) ) );
		v[v.length] = group.worldToLocal( obj.localToWorld( new THREE.Vector3(obj.geometry.boundingBox.max.x, 0, 0) ) );
		v[v.length] = group.worldToLocal( obj.localToWorld( new THREE.Vector3(0, obj.geometry.boundingBox.min.y, 0) ) );
		v[v.length] = group.worldToLocal( obj.localToWorld( new THREE.Vector3(0, obj.geometry.boundingBox.max.y, 0) ) );
		v[v.length] = group.worldToLocal( obj.localToWorld( new THREE.Vector3(0, 0, obj.geometry.boundingBox.min.z) ) );
		v[v.length] = group.worldToLocal( obj.localToWorld( new THREE.Vector3(0, 0, obj.geometry.boundingBox.max.z) ) );
	}
	
	var bound = { min : { x : 999999, y : 999999, z : 999999 }, max : { x : -999999, y : -999999, z : -999999 } };
	
	for(var i = 0; i < v.length; i++)
	{
		if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
		if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
		if(v[i].y < bound.min.y) { bound.min.y = v[i].y; }
		if(v[i].y > bound.max.y) { bound.max.y = v[i].y; }
		if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
		if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
	}
	

	changeSizeGeometryWD({obj: group, size: {x: (bound.max.x-bound.min.x), y: (bound.max.y-bound.min.y), z: (bound.max.z-bound.min.z)}});
	
	// меняем размеры boxPop
	function changeSizeGeometryWD(cdm)
	{	
		var obj = cdm.obj;
		var x = cdm.size.x;
		var y = cdm.size.y;
		var z = cdm.size.z;
		console.log(cdm.size);
		var v = obj.geometry.vertices;
		v[0].x = v[1].x = v[7].x = v[6].x = -x / 2;
		v[3].x = v[2].x = v[4].x = v[5].x = x / 2;
		v[0].y = v[3].y = v[7].y = v[4].y = -y / 2;
		v[1].y = v[2].y = v[5].y = v[6].y = y / 2;	
		v[4].z = v[5].z = v[6].z = v[7].z = -z / 2;
		v[0].z = v[1].z = v[2].z = v[3].z = z / 2;
		
		obj.geometry.verticesNeedUpdate = true;
		obj.geometry.elementsNeedUpdate = true;
		obj.geometry.computeBoundingBox();
		obj.geometry.computeBoundingSphere();
	}	
}


function createGroupObj_1(cdm)
{
	if(!cdm.id) { cdm.id = countId; countId++; }
	if(!cdm.pos) { cdm.pos = new THREE.Vector3(); }
	if(!cdm.rot) { cdm.rot = new THREE.Vector3(); }
	if(!cdm.nameRus) { cdm.nameRus = 'группа'; }
	
	var group = {};
	group.userData = {};
	group.userData.tag = 'group';
	group.userData.id = cdm.id;
	group.userData.groupObj = {};	
	group.userData.groupObj.nameRus = cdm.nameRus;
	group.userData.groupObj.centerObj = null;
	group.userData.groupObj.child = [];
	
	infProject.scene.array.group[infProject.scene.array.group.length] = group;


	var material = new THREE.MeshLambertMaterial( { color : 0xcccccc, transparent: true, opacity: 1, depthTest: false } ); 
	//material.visible = false;	
	var cube = new THREE.Mesh( createGeometryCube(0.03, 0.03, 0.03), material );
	cube.userData.tag = 'group_center'; 
	cube.position.copy(cdm.pos);
	cube.rotation.set(cdm.rot.x, cdm.rot.y, cdm.rot.z);
	scene.add(cube);
	
	group.userData.groupObj.centerObj = cube; 
	group.userData.groupObj.child[0] = cube;

	
	var arr2 = [];
	 
	if(cdm.obj.id)
	{
		for(var i = 0; i < cdm.obj.id.length; i++)
		{
			arr2[arr2.length] = findObjFromId( 'obj', cdm.obj.id[i] ); 
		}			
	}
	else if(cdm.obj.o)
	{
		for(var i = 0; i < cdm.obj.o.length; i++)
		{
			arr2[arr2.length] = cdm.obj.o[i]; 
		}			
	}
	
	  
	// добавляем полученные объекты в новую группу
	for(var i = 0; i < arr2.length; i++)
	{
		arr2[i].userData.obj3D.group = group;
		group.userData.groupObj.child[group.userData.groupObj.child.length] = arr2[i];
	}	
	
	getGroupFreeNearlyJP({obj: arr2[0]});
}



// получаем не соединенные точки-соединители, которые находятся близко друг к другу -> и соединяем их
function getGroupFreeNearlyJP(cdm)
{
	var arr = getArrayJointPoint({obj: cdm.obj});
	
	//cdm.obj.updateMatrixWorld();
	
	var arr2 = [];
	
	// получаем все не соединенные точки из группы
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i].userData.centerPoint.join) continue;
		
		arr2[arr2.length] = {o: arr[i], pos: arr[i].getWorldPosition(new THREE.Vector3())};
		
	}	
	
	// получаем точки расположенные близко друг к другу
	for(var i = 0; i < arr2.length; i++)
	{
		for(var i2 = 0; i2 < arr2.length; i2++)
		{
			if(arr2[i].o == arr2[i2].o) continue;
			
			if(comparePos(arr2[i].pos, arr2[i2].pos)) 
			{				
				arr2[i].o.userData.centerPoint.join = arr2[i2].o;
				arr2[i2].o.userData.centerPoint.join = arr2[i].o;				
			}
		}
	}
}





