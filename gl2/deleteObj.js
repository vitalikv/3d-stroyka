

function detectDeleteObj(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;
	if(!obj.userData.tag) return;
	
	var tag = obj.userData.tag;	
		
	if ( tag == 'wf_point' ) { deletePointWF(obj); }
	else if ( tag == 'obj' || tag == 'wf_tube' ) { deleteObjectPop(obj); }
	else if ( tag == 'wtGrid' ) { obj.userData.propObj({type: 'deleteObj', obj: obj}); }
	else if ( tag == 'new_tube' ) { obj.delete(); }
	else if ( tag == 'new_point' ) { obj.delete(); }
	
	renderCamera();
}




// удаляем точку трубы
function deletePointWF(obj)
{
	//arr_wf.point.pop();	// удаляем последнее значение в массиве
	
	hideMenuObjUI_2D();
		
	var tube = obj.userData.wf_point.tube;
	
	// если у трубы 2 точки, то удаляем трубу
	if(tube.userData.wf_tube.point.length == 2)
	{		
		deleteLineWF(tube);			
	}
	else	// удаляем точку
	{		
		deleteValueFromArrya({arr: tube.userData.wf_tube.point, o: obj});

		var geometry = new THREE.Geometry();
		
		for(var i = 0; i < tube.userData.wf_tube.point.length; i++)
		{
			geometry.vertices[i] = tube.userData.wf_tube.point[i].position;
		}
		
		disposeNode(tube);
		updateTubeWF({tube: tube});
		
		disposeNode(obj);
		scene.remove(obj);	// удаляем точку
	}

}



// удаление объекта
function deleteObjectPop(obj)
{ 
	if(obj.userData.tag == 'obj') {}
	else if(obj.userData.tag == 'wf_tube') {}
	else { return; }
	
	hideMenuObjUI_2D();
	
	var arr = getObjsFromGroup_1({obj: obj});
	
	var group = null;
	if(obj.userData.obj3D) { group = obj.userData.obj3D.group; }
	if(obj.userData.wf_tube) { group = obj.userData.wf_tube.group; }	


console.log('group:', infProject.scene.array.group.length, 'obj:', infProject.scene.array.obj.length, 'tube:', infProject.scene.array.tube.length, renderer.info.memory.geometries, renderer.info.memory.textures);	
	
	if(group && infProject.settings.active.group)
	{
		deleteValueFromArrya({arr: infProject.scene.array.group, o: group});
	}
	else
	{
		arr = [obj];
		
		infProject.class.group.detachObjGroup({obj: obj});		// удаляем объект из группы (если есть группа)
	}
	

	for(var i = 0; i < arr.length; i++)
	{	
		infProject.ui.rpanel.EstList.delItem({obj: arr[i]});	// удаляем объект из списка материалов
		
		if(arr[i].userData.wf_tube)
		{
			var tube = arr[i];
			
			deleteValueFromArrya({arr: infProject.scene.array.tube, o: tube});
			
			for ( var i2 = tube.userData.wf_tube.point.length - 1; i2 > -1; i2-- )
			{
				disposeNode(tube.userData.wf_tube.point[i2]);
				scene.remove(tube.userData.wf_tube.point[i2]);		
			}
			
			disposeNode(tube);
			scene.remove(tube);  			
		}
		else if(arr[i].userData.obj3D)
		{
			deleteValueFromArrya({arr: infProject.scene.array.obj, o: arr[i]});
			
			var arrO = getAllChildObect({obj: arr[i]});
			for(var i2 = 0; i2 < arrO.length; i2++)
			{
				disposeNode(arrO[i2]);
			}
			
			scene.remove(arr[i]);			
		}
	}
	
console.log('group:', infProject.scene.array.group.length, 'obj:', infProject.scene.array.obj.length, 'tube:', infProject.scene.array.tube.length, renderer.info.memory.geometries, renderer.info.memory.textures);

	outlineRemoveObj();
	renderCamera();
}


// удалить трубу
function deleteLineWF(tube)
{	
	infProject.ui.rpanel.EstList.delItem({obj: tube});	// удаляем объект из списка материалов
	deleteValueFromArrya({arr: infProject.scene.array.tube, o: tube});
	
	for ( var i = tube.userData.wf_tube.point.length - 1; i > -1; i-- )
	{
		disposeNode(tube.userData.wf_tube.point[i]);
		scene.remove(tube.userData.wf_tube.point[i]);		
	}
	
	disposeNode(tube);
	scene.remove(tube);  
}





// удаление значения из массива 
function deleteValueFromArrya(cdm)
{
	var arr = cdm.arr;
	var o = cdm.o;
	
	for(var i = arr.length - 1; i > -1; i--) { if(arr[i] == o) { arr.splice(i, 1); break; } }
}






