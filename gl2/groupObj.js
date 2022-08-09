



// класс отвечающая за группы
class NewGroup
{		
	constructor()
	{		
		this.init();	
	}
	
	init()
	{
		
	}


	// создаем новую группу
	crGroup({arr})
	{
		if(arr.length == 0) return null;
		
		let group = {};
		group.userData = {};
		group.userData.tag = 'group';
		group.userData.groupObj = {};	
		group.userData.groupObj.nameRus = 'группа';
		group.userData.groupObj.child = arr;
		
		infProject.scene.array.group.push(group);		
		
		// добавляем полученные объекты в новую группу
		for(let i = 0; i < arr.length; i++)
		{
			if(!arr[i]) continue;
			if(arr[i].userData.obj3D) { arr[i].userData.obj3D.group = group; }
			if(arr[i].userData.tag == 'new_tube') { arr[i].userData.group = group; }
		}

		return group;
	}
	
	
	// создаем группу из сохраненного файла
	newGroupLoadFile({arrId})
	{
		let arr = [];
		
		for(let i = 0; i < arrId.length; i++)
		{
			let obj = findObjFromId( 'obj', arrId[i] );
			if(!obj) { obj = findObjFromId( 'tube', arrId[i] ); }
			if(!obj) continue;
			
			arr.push(obj);			 
		}

		this.crGroup({arr});
	}
	
	
	// отделяем объект от группы, если остается в группе один объект, то удаляем группу
	detachObjGroup({obj, active = false})
	{
		let group = null;
		
		if(obj.userData.obj3D && obj.userData.obj3D.group) 
		{ 
			group = obj.userData.obj3D.group;
			obj.userData.obj3D.group = null;
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
			if(obj_2.userData.tag == 'new_tube') { obj_2.userData.group = null; }
			
			deleteValueFromArrya({arr: infProject.scene.array.group, o: group});
		}

		
		if(active)
		{
			if(obj.userData.obj3D)
			{
				clickObject3D( obj, {menu_1: true, outline: true} );
			}		
		}
		
		renderCamera();
	}
	
}









// получаем группу , если у объекта есть группа, иначе получаем выбранный объект
// tubePoint=true добавляет в массив точки труб
function ddGetGroup({obj, tubePoint = false})
{	
	if(obj.userData.tag == 'joinPoint') { obj = obj.parent; }
	if(obj.userData.tag == 'new_point') { obj = obj.userData.tube; }

console.log(obj.userData);
	
	let arr = [obj];
	
	let group = null;
	
	if(obj.userData.obj3D && obj.userData.obj3D.group) { group = obj.userData.obj3D.group; }	 
	else if(obj.userData.tag == 'joinPoint' && obj.parent.userData.obj3D.group) { group = obj.parent.userData.obj3D.group; }	 
	else if(obj.userData.tag == 'new_point' && obj.userData.tube.userData.group) { group = obj.userData.tube.userData.group; }  
	else if(obj.userData.tag == 'new_tube' && obj.userData.group) { group = obj.userData.group; } 
	
	if(group)
	{
		//arr = [...group.userData.groupObj.child];	// копируем объекты по отдельности в новый массив
		
		// obj - будет идти первым объектом в массиве
		let arr2 = group.userData.groupObj.child;
		
		for(let i = 0; i < arr2.length; i++)
		{
			if(arr2[i] == arr[0]) continue;
			arr.push(arr2[i]);
		}
	}
 
	if(tubePoint)
	{
		let arr2 = [];
		for(let i = 0; i < arr.length; i++)
		{
			if(arr[i].userData.tag == 'new_tube') arr2.push(...arr[i].userData.point);
		}		
		if(arr2.length > 0) arr = [...arr, ...arr2];
	}	
	
	
	return arr;
}




