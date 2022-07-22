



// создаем новую группу
function createGroupObj_1(cdm)
{
	if(!cdm.nameRus) { cdm.nameRus = 'группа'; }
	
	var group = {};
	group.userData = {};
	group.userData.tag = 'group';
	group.userData.groupObj = {};	
	group.userData.groupObj.nameRus = cdm.nameRus;
	group.userData.groupObj.child = [];
	
	infProject.scene.array.group[infProject.scene.array.group.length] = group;
	
	var arr2 = [];
	 
	if(cdm.obj.id)
	{
		for(var i = 0; i < cdm.obj.id.length; i++)
		{
			var obj = null;
			
			obj = findObjFromId( 'obj', cdm.obj.id[i] );
			if(!obj) { obj = findObjFromId( 'tube', cdm.obj.id[i] ); }
				
			if(obj) { arr2[arr2.length] = obj; }
			 
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
		if(!arr2[i]) continue;
		if(arr2[i].userData.obj3D) { arr2[i].userData.obj3D.group = group; }
		if(arr2[i].userData.wf_tube) { arr2[i].userData.wf_tube.group = group; }
		
		group.userData.groupObj.child[group.userData.groupObj.child.length] = arr2[i];
	}	
	
	return group;
}




// пролучить все объекты принадлежащие группе 
function getObjsFromGroup_1({obj})
{
	let arr = [ obj ];
	
	if(obj.userData.obj3D && obj.userData.obj3D.group)
	{
		arr = obj.userData.obj3D.group.userData.groupObj.child;	
	}
	else if(obj.userData.wf_tube && obj.userData.wf_tube.group)
	{
		arr = obj.userData.wf_tube.group.userData.groupObj.child;		
	}

	arr = [...arr];		// копируем массив, чтобы в оригинальный, не попали новые элементы
	
	
	let arr2 = [];
	for(let i = 0; i < arr.length; i++)
	{
		if(arr[i].userData.wf_tube) arr2.push(...arr[i].userData.wf_tube.point);
	}	
	if(arr2.length > 0) arr.push(...arr2);	
	
	
	return arr;	
}


// получаем все объекты, которые будем перемещать или вращать 
function arrObjFromGroup(cdm)
{
	var obj = cdm.obj;
	var arr = [];
	
	if(obj.userData.obj3D) { var obj = cdm.obj; }
	else if(obj.userData.centerPoint) { var obj = cdm.obj.parent; }
	else if(obj.userData.wf_tube) { var obj = cdm.obj; }
	else if(obj.userData.wf_point) { var obj = cdm.obj.userData.wf_point.tube; }
	else if(obj.userData.tag == 'wtGrid') { return [obj]; }
	else { return arr; }

	var arr = getObjsFromGroup_1({obj: obj});	// получаем все объекты группы, если нет группы -> получаем один объект		
	
	return arr;
}



// объединяем объекты в группу
function addObjToGroup(cdm) 
{
	if(!cdm) cdm = {};	
	
		
	if(infProject.list.mergeO.o1.length > 0 && infProject.list.mergeO.o2.length > 0) {}
	else if(cdm.arr) {}
	else { return; }
	
	var arr = (cdm.arr)? cdm.arr: [];
	
	
	for(var i = 0; i < infProject.list.mergeO.o1.length; i++)
	{
		arr[arr.length] = infProject.list.mergeO.o1[i];
	}

	for(var i = 0; i < infProject.list.mergeO.o2.length; i++)
	{
		arr[arr.length] = infProject.list.mergeO.o2[i];
	}		
	
	
	for(var i = 0; i < arr.length; i++)
	{
		detachObjGroup({obj: arr[i]});
	}		
			
	
	// создаем новую группу	
	var group = createGroupObj_1({nameRus: 'новая группа', obj: {o: arr} });	

	switchSelectAddObjGroup({active: false});
	
	
	
	if(arr[0].userData.obj3D)
	{
		clickObject3D( arr[0], {menu_1: true, outline: true} );
	}
	else if(arr[0].userData.wf_tube)
	{
		var toolPos = (infProject.tools.pivot.visible) ? infProject.tools.pivot.position : infProject.tools.gizmo.position;
		clickTubeWF({obj: arr[0], toolPos: toolPos, menu_1: true});
	}	

}



// отделяем объект от группы, если остается в группе один объект, то удаляем группу
function detachObjGroup({obj, active = false})
{
	let group = null;
	
	if(obj.userData.obj3D && obj.userData.obj3D.group) 
	{ 
		group = obj.userData.obj3D.group;
		obj.userData.obj3D.group = null;
	}
	if(obj.userData.wf_tube && obj.userData.wf_tube.group) 
	{ 
		group = obj.userData.wf_tube.group;
		obj.userData.wf_tube.group = null; 
	}
	if(obj.userData.tag == 'new_tube' && obj.userData.group) 
	{ 
		group = obj.userData.group;
		obj.userData.group = null; 
	}

	
	if(!group) return;
	
	deleteValueFromArrya({arr: group.userData.groupObj.child, o: obj});	// удаляем объект из группы
	
	// удаляем группу
	if(group.userData.groupObj.child.length == 1)
	{
		let obj_2 = group.userData.groupObj.child[0];
		
		if(obj_2.userData.obj3D) { obj_2.userData.obj3D.group = null; }
		if(obj_2.userData.wf_tube) { obj_2.userData.wf_tube.group = null; }
		if(obj_2.userData.tag == 'new_tube') { obj_2.userData.group = null; }
		
		deleteValueFromArrya({arr: infProject.scene.array.group, o: group});
	}

	
	if(active)
	{
		if(obj.userData.obj3D)
		{
			clickObject3D( obj, {menu_1: true, outline: true} );
		}
		else if(obj.userData.wf_tube)
		{
			var toolPos = (infProject.tools.pivot.visible) ? infProject.tools.pivot.position : infProject.tools.gizmo.position;
			clickTubeWF({obj: obj, toolPos: toolPos, menu_1: true});
		}		
	}
	
	renderCamera();
}








