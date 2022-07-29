



// копируем объект или группу
function copyObj() 
{	
	var obj = clickO.last_obj;
	
	if(!obj) return;	
	
	
	var arr = ddGetGroup({obj});

	var group = null;
	if(obj.userData.obj3D) { group = obj.userData.obj3D.group; }
	if(obj.userData.wf_tube) { group = obj.userData.wf_tube.group; }		
	if(obj.userData.tag == 'new_tube') { group = obj.userData.group; }
	
	
	var arr2 = [];
	
	for(var i = 0; i < arr.length; i++)
	{ 
		if(arr[i].userData.obj3D) { arr[i].userData.obj3D.group = null; }					
		
		
		if(arr[i].userData.obj3D) 
		{ 
			var clone = arr[i].clone();
			arr2[arr2.length] = clone;
			clone.userData.id = countId; countId++;
			scene.add( clone );
	
			infProject.scene.array.obj[infProject.scene.array.obj.length] = clone; 
			
			infProject.ui.rpanel.EstList.crItem({obj: clone});	// добавляем в список материалов
		}
		
		if(arr[i].userData.wf_tube) 
		{ 
			arr2[arr2.length] = copyTubeWF({tube: arr[i]}); 
		}		 

		if(arr[i].userData.tag == 'new_tube') 
		{ 
			arr2[arr2.length] = arr[i].copyTube(); 
		}		
		
		// восстанавливаем группу
		if(arr[i].userData.obj3D) { arr[i].userData.obj3D.group = group; }					
	}


	var toolPos = (infProject.tools.pivot.visible) ? infProject.tools.pivot.position : infProject.tools.gizmo.position;
	 
	hideMenuObjUI_2D();
	
	
	infProject.class.group.crGroup({arr: arr2});
	
	if(arr2[0].userData.obj3D) { clickObject3D( arr2[0], {menu_1: true, outline: true} ); }		


	scaleToolsMoveCamera();	
	renderCamera();		
}





