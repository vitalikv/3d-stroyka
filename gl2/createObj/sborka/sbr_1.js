

// добавляем объекты и трубы в массив
function addArrObjToArray(cdm)
{
	var arr = cdm.arr;	
	
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i].userData.tag == 'obj')
		{
			infProject.scene.array.obj[infProject.scene.array.obj.length] = arr[i];
		}
		if(arr[i].userData.tag == 'wf_tube')
		{
			infProject.scene.array.tube[infProject.scene.array.tube.length] = arr[i];
		}				
	}	
}




// объекты объединяем в группу и добавляем в сцену
function joinSborkaToGroup(cdm)
{
	var arr = cdm.arr;
	
	var group = createGroupObj_1({nameRus: 'новая группа', obj: {o: arr} });
	
	for(var i = 0; i < arr.length; i++) { scene.add( arr[i] ); }		
}


// создаем массив в которм помимо объектов и труб, есть точки труб
function getArrWithPointTube(cdm)
{
	var arr = cdm.arr;
	var arr2 = [];
	
	for(var i = 0; i < arr.length; i++)
	{	
		arr2[arr2.length] = arr[i];
		
		if(!arr[i].userData.wf_tube) continue;

		var point = arr[i].userData.wf_tube.point;	
		
		for(var i2 = 0; i2 < point.length; i2++)
		{
			arr2[arr2.length] = point[i2];
		}			
	}

	return arr2;
}














