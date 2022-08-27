

function detectDeleteObj(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;
	if(!obj.userData.tag) return;
	
	var tag = obj.userData.tag;	
		
	if ( tag == 'obj') { deleteObjectPop(obj); }
	else if ( tag == 'wtGrid' ) { obj.userData.propObj({type: 'deleteObj', obj: obj}); }
	else if ( tag == 'new_tube' ) { deleteObjectPop(obj); }
	else if ( tag == 'new_point' ) { obj.delete(); }
	
	//camOrbit.render();
}








// удаление объекта
function deleteObjectPop(obj)
{ 
	if(obj.userData.tag == 'obj') {}
	else if(obj.userData.tag == 'new_tube') {}
	else { return; }
	
	hideMenuObjUI_2D();
	
	var arr = ddGetGroup({obj});;
	

console.log('oldState', 'group:', infProject.scene.array.group.length, 'obj:', infProject.scene.array.obj.length, 'tube:', infProject.scene.array.tube.length, renderer.info.memory.geometries, renderer.info.memory.textures);	
	
	
	

	for(var i = 0; i < arr.length; i++)
	{		
		if(arr[i].userData.obj3D)
		{
			infProject.class.group.detachObjGroup({obj: arr[i]});		// удаляем объект из группы (если есть группа)
			infProject.ui.rpanel.EstList.delItem({obj: arr[i]});	// удаляем объект из списка материалов
			
			deleteValueFromArrya({arr: infProject.scene.array.obj, o: arr[i]});
			
			var arrO = getAllChildObect({obj: arr[i]});
			for(var i2 = 0; i2 < arrO.length; i2++)
			{
				disposeNode(arrO[i2]);
			}
			
			scene.remove(arr[i]);			
		}
		else if(arr[i].userData.tag == 'new_tube')
		{
			//infProject.ui.rpanel.EstList.delItem({obj: arr[i]}); 
			arr[i].delete();
		}
	}
	
console.log('newState', 'group:', infProject.scene.array.group.length, 'obj:', infProject.scene.array.obj.length, 'tube:', infProject.scene.array.tube.length, renderer.info.memory.geometries, renderer.info.memory.textures);

	outlineRemoveObj();
	camOrbit.render();
}








// удаление значения из массива 
function deleteValueFromArrya(cdm)
{
	var arr = cdm.arr;
	var o = cdm.o;
	
	for(var i = arr.length - 1; i > -1; i--) { if(arr[i] == o) { arr.splice(i, 1); break; } }
}






