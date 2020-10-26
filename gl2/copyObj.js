


function detectCopyObj()
{
	var obj = clickO.last_obj;
	
	if(!obj) return;
	
	if(obj.userData.tag == 'obj') { copyObj({obj: obj}); }
	if(obj.userData.tag == 'wf_tube') { copyTubeWF({tube: obj}); }
}



// копируем объект или группу
function copyObj(cdm) 
{
	//var obj = getObjFromPivotGizmo();
	
	var obj = cdm.obj;
	
	if(!obj) return;	
	
	
	var arr = getObjsFromGroup_1({obj: obj});

	var flag = obj.userData.obj3D.group;	// группа или одиночный объект		
	
	var arr2 = [];
	
	for(var i = 0; i < arr.length; i++)
	{ 
		if(flag) 
		{
			var gr = arr[i].userData.obj3D.group;
			arr[i].userData.obj3D.group = null;			
		}
		
		var clone = arr2[arr2.length] = arr[i].clone();

		clone.userData.id = countId; countId++;

		infProject.scene.array.obj[infProject.scene.array.obj.length] = clone; 
		scene.add( clone );

		// клонируем материал
		clone.traverse( function ( child ) 
		{
			if ( child.isMesh ) 
			{ 
				if(child.userData.centerPoint)
				{
					child.material = infProject.material.pointObj.default;
				}
			}
		});
		

		updateListObjUI_1({o: clone, type: 'add'});	// добавляем объект в UI список материалов 
		
		if(flag)
		{
			arr[i].userData.obj3D.group = gr;		// восстанавливаем группу
		}		
	}

	// у старого объекта с которого делали копию, прячем centerPoint
	obj.traverse( function ( child ) 
	{
		if ( child.isMesh ) 
		{ 
			if(child.userData.centerPoint)
			{
				child.material = infProject.material.pointObj.default;
				child.visible = false;
			}
		}
	});		
	
	 
	
	hidePivotGizmo(obj);
	
	if(flag)
	{
		addObjToGroup({arr: arr2});
	}
	else
	{
		clickObject3D( arr2[0], {menu_1: true, outline: true} );
	}

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
}

