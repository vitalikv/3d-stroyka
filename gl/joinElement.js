



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
	obj.userData.joint.material.active = new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true, opacity: 1.0, depthTest: false, lightMap: lightMap_1 });
	obj.userData.joint.material.default = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 1.0, depthTest: false, lightMap: lightMap_1 });
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
	
	if(obj.userData.obj3D.joinPoint) { type = 'obj'; }
	else if(obj.userData.groupObj) { type = 'group'; }
	else { return; }
	
	hideJoinPoint({clear: 2});
	
	if(obj.userData.groupObj) { var arr = obj.children; }
	else { var arr = [obj]; }
	
	
	for(var i = 0; i < arr.length; i++)
	{
		var arrO = arr[i].userData.obj3D.joinPoint.arr;
		
		for(var i2 = 0; i2 < arrO.length; i2++)
		{
			var o = arrO[i2];
			
			if(o.userData.joinObj) continue; 	// точка уже соеденина с другой точкой
			
			o.visible = true;
			o.material = infProject.tools.joint.userData.joint.material.default;
		}
		
		arr[i].userData.obj3D.joinPoint.active = null;		
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
		
		if(obj.userData.obj3D.joinPoint) { type = 'obj'; }
		else if(obj.userData.groupObj) { type = 'group'; }		
		else { continue; }
 		
		if(obj.userData.groupObj) { var arr2 = obj.children; }
		else { var arr2 = [obj]; }
	
		for(var n = 0; n < arr2.length; n++)
		{
			var arrO = arr2[n].userData.obj3D.joinPoint.arr;
			
			for(var i2 = 0; i2 < arrO.length; i2++)
			{
				var o = arrO[i2];
				
				o.visible = false;
				o.material = joint.userData.joint.material.default;			
			}

			arr2[n].userData.obj3D.joinPoint.active = null;			
		}
		
	}
	
}




// клинули на точку-соединитель
function clickJoinPoint(cdm)
{
	var rayhit = cdm.rayhit;
	var obj = rayhit.object;
	var parent = obj.parent;
	
	if(parent.userData.obj3D.joinPoint.active)
	{
		parent.userData.obj3D.joinPoint.active.material = infProject.tools.joint.userData.joint.material.default;
		parent.userData.obj3D.joinPoint.active = null;
	}
	
	
	obj.material = infProject.tools.joint.userData.joint.material.active;
	parent.userData.obj3D.joinPoint.active = obj;
	

	
	
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





// получаем все точки-соединители (у группы или отдельного объекта)
function getArrayJointPoint(cdm)
{
	var o = cdm.obj;
	var arr = [];
	
	if(o.userData.obj3D.group) 
	{		
		var group = o.userData.obj3D.group;
		var child = group.userData.groupObj.child;
		
		for(var i = 0; i < child.length; i++)
		{
			if(!child[i].userData.obj3D) continue;
			
			for(var i2 = 0; i2 < child[i].userData.obj3D.joinPoint.arr.length; i2++)
			{
				arr[arr.length] = child[i].userData.obj3D.joinPoint.arr[i2];
			}
		}
	}
	else
	{
		arr = o.userData.obj3D.joinPoint.arr;
	}

	return arr;	
}


// находим вделеную точку-соединитель (у группы или отдельного объекта)
function getActiveJointPoint(cdm)
{
	var o = cdm.obj;
	
	if(o.userData.groupObj) 
	{				
		for(var i = 0; i < o.children.length; i++)
		{
			if(o.children[i].userData.obj3D.joinPoint.active)
			{
				return o.children[i].userData.obj3D.joinPoint.active;
			}
		}
	}
	else
	{
		return o.userData.obj3D.joinPoint.active;
	}

	return null;
}






// соединяем элементы и создаем группу
function joinElement(cdm)
{
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;
	
	var obj = infProject.tools.joint.userData.joint.obj;
	var obj_2 = infProject.tools.joint.userData.joint.obj_2;
	
	if(cdm.obj) { obj = cdm.obj; }
	if(cdm.obj_2) { obj_2 = cdm.obj_2; }
	
	if(!obj) return;
	if(!obj_2) return;
	
	var o1 = getActiveJointPoint({obj: obj});  
	var o2 = getActiveJointPoint({obj: obj_2});

	if(!o1) return;
	if(!o2) return;


	var q = o1.getWorldQuaternion(new THREE.Quaternion());	
	var diff = new THREE.Quaternion().multiplyQuaternions(obj_2.quaternion.clone().inverse(), q);	// разница между Quaternions
		
	var arr_2 = getObjsFromGroup_1( obj_2 );

	// поворачиваем объекты в нужном направлении 
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].quaternion.premultiply(diff);		// diff разницу умнажаем, чтобы получить то же угол
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

		
	if(1==1)
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
		var group = createGroupObj_1({pos: pos, rot: obj.rotation, nameRus: 'новая группа', obj: {o: arr} });	
		
		//formGroupObj({group: group, arrO: arr2});
		//getGroupFreeNearlyJP({obj: group});
		//console.log(222, o1);	
		
	}
}



// получаем не соединенные точки-соединители, которые находятся близко друг к другу -> и соединяем их
function getGroupFreeNearlyJP(cdm)
{
	var arr = getArrayJointPoint({obj: cdm.obj});
	
	var arr2 = [];
	
	cdm.obj.updateMatrixWorld();
	
	// получаем все не соединенные точки из группы
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i].userData.joinObj) continue;
		
		arr2[arr2.length] = {o: arr[i], pos: arr[i].getWorldPosition(new THREE.Vector3())};
		
	}	

	var arr3 = [];
	
	// получаем точки расположенные близко друг к другу
	for(var i = 0; i < arr2.length; i++)
	{
		for(var i2 = 0; i2 < arr2.length; i2++)
		{
			if(arr2[i].o == arr2[i2].o) continue;
			
			if(comparePos(arr2[i].pos, arr2[i2].pos)) 
			{
				arr3[arr3.length] = {o1: arr2[i].o, o2: arr2[i2].o};

				//arr2[i].o.material = infProject.tools.joint.userData.joint.material.active;
				//arr2[i2].o.material = infProject.tools.joint.userData.joint.material.active;
				
				arr2[i].o.userData.joinObj = arr2[i2].o;
				arr2[i2].o.userData.joinObj = arr2[i].o;				
			}
		}
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
	group.userData.groupObj.nameRus = 'группа 2';
	group.userData.groupObj.pos = cdm.pos;
	group.userData.groupObj.rot = cdm.rot;
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

	return group;
}


// создаем группу и добавляем туда объекты (из сохраненного файла)
function createGroupObj_2(cdm)
{	
	var group = createGroupObj_1(cdm);
	
	
	

	//getGroupFreeNearlyJP({obj: group});
	
}






