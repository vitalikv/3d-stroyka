



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
			
			if(o.userData.joinObj) continue; 	// точка уже соеденина с другой точкой
			
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



// получаем все соединенные объекты у группы (если это объект без группы, то отправляем только его)
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


// получаем все точки-соединители (у группы или отдельного объекта)
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


// находим вделеную точку-соединитель (у группы или отдельного объекта)
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
		// создаем новую группу
		var material = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 }); 
		var group = new THREE.Mesh( createGeometryWD(0.03, 0.03, 0.03), material );
		group.userData.tag = 'group';
		group.userData.id = countId; countId++;
		group.userData.groupObj = {};	
		group.userData.groupObj.nameRus = 'группа 1';
		
		infProject.scene.array.group[infProject.scene.array.group.length] = group;
		
		var pos = new THREE.Vector3();
		var arr = [obj, obj_2];
		var arr2 = [];
		
		// получаем все объекты для добавления в группу
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].userData.groupObj)
			{				
				arr[i].updateMatrixWorld();
				
				// если объект состоит из группы объекто, то сначала вытаскиваем эти объекты и удалем группу
				for(var i2 = arr[i].children.length - 1; i2 > -1; i2--)
				{
					var o = arr[i].children[i2];
					
					var pos1 = o.getWorldPosition(new THREE.Vector3());
					var q1 = o.getWorldQuaternion(new THREE.Quaternion());						
					
					scene.add(o);
					
					o.position.copy(pos1);
					o.quaternion.copy(q1);

					o.updateMatrixWorld();
					pos.add( o.localToWorld( o.geometry.boundingSphere.center.clone() ) );	// добавляем позицию центра объекта
					
					arr2[arr2.length] = o;
				}
				
				
				// удаляем группу
				deleteValueFromArrya({arr : infProject.scene.array.group, o : arr[i]});
				disposeNode(arr[i]);
				scene.remove(arr[i]);	
				
			}
			else	// у объекта нет группу, он оодин, сразу добавляем в массив
			{
				arr[i].updateMatrixWorld();
				pos.add( arr[i].localToWorld( arr[i].geometry.boundingSphere.center.clone() ) );	// добавляем позицию центра объекта
				
				arr2[arr2.length] = arr[i];
			}			
		}
		
		pos.divideScalar( arr2.length );
		
		group.position.copy(pos);
		group.rotation.copy(obj.rotation);		
		scene.add( group );
		
	
		formGroupObj({group: group, arrO: arr2});
		
		 
		// добавляем полученные объекты в новую группу
		for(var i = 0; i < arr2.length; i++)
		{
			group.attach(arr2[i]);
		}			
		
		o1.userData.joinObj = o2;
		o2.userData.joinObj = o1;
		
		
		getGroupFreeNearlyJP({obj: group});
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

}


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



// создаем группу и добавляем туда объекты (из сохраненного файла)
function createGroupObj_2(cdm)
{
	//var material = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 }); 
	//material.visible = false;
	//var group = new THREE.Group();
	//var group = new THREE.Mesh( createGeometryWD(0.03, 0.03, 0.03), material );
	
	var group = {};
	group.userData = {};
	group.userData.tag = 'group';
	group.userData.id = cdm.id;
	group.userData.groupObj = {};	
	group.userData.groupObj.nameRus = 'группа 2';
	group.userData.groupObj.pos = cdm.pos;
	group.userData.groupObj.rot = cdm.rot;
	group.userData.groupObj.child = [];
	
	infProject.scene.array.group[infProject.scene.array.group.length] = group;
	
	
	var arr2 = [];
	for(var i2 = 0; i2 < cdm.obj.length; i2++)
	{
		arr2[arr2.length] = findObjFromId( 'obj', cdm.obj[i2].id );
	}	
	
	
	//formGroupObj({group: group, arrO: arr2});
	

var cube = new THREE.Mesh( createGeometryCube(0.03, 0.03, 0.03), new THREE.MeshLambertMaterial( { color : 0x00ff00, transparent: true, opacity: 1, depthTest: false } ) );
scene.add( cube );


	
	  
	// добавляем полученные объекты в новую группу
	for(var i = 0; i < arr2.length; i++)
	{
		arr2[i].userData.obj3D.group = group;
		group.userData.groupObj.child[i] = arr2[i];
		
		//arr2[i].rotation.y += 0.5; 
		
		if(1==1)
		{
			arr2[i].userData = {}; 
			
			var o = arr2[i].clone();
			var q = o.quaternion.clone();
			var p1 = o.position.clone().sub(cdm.pos);
			//o.position.set(0,0,0);
			
			//o.rotation.set(0,0,0);
			scene.add(o);
			
	
			var axis = new THREE.Vector3(0,0,1); 
			var theta = Math.PI/4;
			

			o.position.sub(cdm.pos);
			//o.position.y = 1;
			
var cube = new THREE.Mesh( createGeometryCube(0.03, 0.03, 0.03), new THREE.MeshLambertMaterial( { color : 0x030202, transparent: true, opacity: 1, depthTest: false } ) );
cube.position.copy(o.position);
scene.add( cube );				


			o.updateMatrixWorld();
			var v1 = o.localToWorld(axis.clone());
			var v2 = o.localToWorld( o.geometry.boundingSphere.center.clone() );
			var vX = new THREE.Vector3().subVectors(v1, v2).normalize();
			scene.add(new THREE.ArrowHelper( vX, v2, 0.2, 0xff0000 ));
			
			var axis2 = vX;
			
			o.position.applyAxisAngle(axis2, theta); // rotate the POSITION						
			o.rotateOnAxis(axis, theta);
			o.position.add(cdm.pos);
		}
	}	

	//getGroupFreeNearlyJP({obj: group});
	
}

function applyRotVec(point, rot) 
{
	var radX = rot.x;
	var radY = rot.y;
	var radZ = rot.z;
	var sinX = Math.sin(radX);
	var cosX = Math.cos(radX);
	var sinY = Math.sin(radY);
	var cosY = Math.cos(radY);
	var sinZ = Math.sin(radZ);
	var cosZ = Math.cos(radZ);

	var xAxis = new THREE.Vector3(
		cosY * cosZ,
		cosX * sinZ + sinX * sinY * cosZ,
		sinX * sinZ - cosX * sinY * cosZ
	);
	var yAxis = new THREE.Vector3(
		-cosY * sinZ,
		cosX * cosZ - sinX * sinY * sinZ,
		sinX * cosZ + cosX * sinY * sinZ
	);
	var zAxis = new THREE.Vector3(
		sinY,
		-sinX * cosY,
		cosX * cosY
	);
	
	var v1 = new THREE.Vector3().addScaledVector(xAxis, point.x);
	var v2 = new THREE.Vector3().addScaledVector(yAxis, point.y);
	var v3 = new THREE.Vector3().addScaledVector(zAxis, point.z);

	return v1.add(v2).add(v3);
}




