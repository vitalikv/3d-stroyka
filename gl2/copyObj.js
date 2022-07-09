



// копируем объект или группу
function copyObj() 
{	
	var obj = clickO.last_obj;
	
	if(!obj) return;	
	
	
	var arr = getObjsFromGroup_1({obj: obj});

	var group = null;
	if(obj.userData.obj3D) { var group = obj.userData.obj3D.group; }
	if(obj.userData.wf_tube) { var group = obj.userData.wf_tube.group; }		

	
	
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
		
		
		// восстанавливаем группу
		if(arr[i].userData.obj3D) { arr[i].userData.obj3D.group = group; }					
	}


	var toolPos = (infProject.tools.pivot.visible) ? infProject.tools.pivot.position : infProject.tools.gizmo.position;
	 
	hideMenuObjUI_2D();
	
	createGroupObj_1({nameRus: 'новая группа', obj: {o: arr2} });
	
	if(arr2[0].userData.obj3D) { clickObject3D( arr2[0], {menu_1: true, outline: true} ); }
	else if(arr2[0].userData.wf_tube) { clickTubeWF({obj: arr2[0], toolPos: toolPos, menu_1: true}); }		


	scaleToolsMoveCamera();	
	renderCamera();		
}




// копировать трубу
function copyTubeWF(cdm)
{
	var tube = cdm.tube;
	
	if(!tube) return;	
	if(tube.userData.tag != 'wf_tube') return;
	
	var point = tube.userData.wf_tube.point;
	
	var p = [];
	for(var i = 0; i < point.length; i++)
	{
		p[i] = {pos: point[i].position.clone(), visible: false};
	}	
	
	var tube = crTubeWF({point: p, diameter: tube.userData.wf_tube.diameter, color: tube.material.color.clone(), pVisible: false});
	
	addTubeInScene(tube, {});
	
	return tube;
}

