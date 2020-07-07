



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
	
	clickObject3D( arr[0], {click_obj: true, menu_1: true, outline: true} );

}



// отделяем объект от группы, если остается в группе один объект, то удаляем группу
function detachObjGroup(cdm)
{
	var obj = cdm.obj;			
	if(!obj.userData.obj3D.group) return;

	var group = obj.userData.obj3D.group;
	
	obj.userData.obj3D.group = null;
	
	deleteValueFromArrya({arr : group.userData.groupObj.child, o : obj});	// удаляем объект из группы
	
	// удаляем группу
	if(group.userData.groupObj.child.length == 1)
	{
		var obj_2 = group.userData.groupObj.child[0];
		
		obj_2.userData.obj3D.group = null;
		
		deleteValueFromArrya({arr : infProject.scene.array.group, o : group});
	}
	
	if(cdm.active)
	{
		clickObject3D( obj, {click_obj: true, menu_1: true, outline: true} );
	}
}








