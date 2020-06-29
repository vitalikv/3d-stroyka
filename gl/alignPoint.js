




// вкл/выкл возможность выделение объектов для присоединения 
function switchAlignPoint_1(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.tools.joint.active = cdm.active;
	}	
	else
	{
		infProject.tools.joint.active = !infProject.tools.joint.active;
	}
	
	// скрываем точки у второго объекта
	clearListObjUI();		
	
	if(infProject.tools.joint.active)	// вкл
	{
		infProject.tools.joint.p1 = clickO.last_obj;
		
		if(infProject.tools.joint.p1.userData.tag == 'joinPoint')
		{
			$('[nameId="rp_wrap_obj_align"]').show();
			$('[nameId="bl_rp_obj_group"]').hide();
			$('[nameId="pr_list_button_for_obj"]').hide();			
		}
		
		if(infProject.tools.joint.p1.userData.tag == 'wf_point')
		{
			$('[nameId="pr_list_button_for_tube_point"]').hide();
			$('[nameId="rp_wrap_align_wf_point"]').show();					
		}
	}		
	else		// выкл
	{
		if(infProject.tools.joint.p1)
		{
			if(infProject.tools.joint.p1.userData.tag == 'joinPoint')
			{
				$('[nameId="rp_wrap_obj_align"]').hide();
				$('[nameId="bl_rp_obj_group"]').show();
				$('[nameId="pr_list_button_for_obj"]').show();			
			}
			
			if(infProject.tools.joint.p1.userData.tag == 'wf_point')
			{
				$('[nameId="rp_wrap_align_wf_point"]').hide();
				$('[nameId="pr_list_button_for_tube_point"]').show();						
			}			
		}
		
		infProject.tools.joint.p1 = null;		
	}	
}


// очищаем список и возращаем default материал разъемам
function clearListObjUI()
{
	var arr = infProject.tools.joint.arr2;	
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].el.remove();
		arr[i].o.visible = false;
		
		if(arr[i].o.userData.tag == 'joinPoint')
		{
			arr[i].o.material = infProject.material.pointObj.default;	 	
		}
		
		if(arr[i].o.userData.tag == 'wf_point')
		{
			arr[i].o.material = infProject.material.pointTube.default;	 	
		}		
	}	
	
	infProject.tools.joint.arr2 = [];	
	infProject.tools.joint.p2 = null;	
}



// кликнули на объект в сцене, когда была нажата кнопка выровнить у точки трубы
// показываем точки-соединители для 2-ого выделенного объекта
function showJoinPoint_2(cdm)
{ 
	if(!cdm.obj) return;
	var obj = cdm.obj;
	
	//if(obj.userData.tag == 'wf_tube'){}
	//else if(compareSelectedObjWithCurrent({obj: obj, arr: outlinePass.selectedObjects})) return;	// кликаем на этот же объект (ничего не делаем)
	
	// скрываем точки у второго объекта
	clearListObjUI();	
	
	var arr = [];
	
	// получаем разъемы, если есть
	if(obj.userData.tag == 'wf_tube')
	{
		var line = obj.userData.wf_tube.line;		
		arr[0] = line.userData.wf_line.point[0]
		arr[1] = line.userData.wf_line.point[line.userData.wf_line.point.length - 1];
	}
	
	if(obj.userData.tag == 'obj')
	{
		arr = getCenterPointFromObj_1( obj );
	}	
	
	
	if(infProject.tools.joint.p1.userData.tag == 'wf_point') { var nameId = "rp_list_align_wf_point"; }
	if(infProject.tools.joint.p1.userData.tag == 'joinPoint') { var nameId = "rp_obj_align"; }
	
	
	// добваляем разъемы выделенного объекта в список UI
	for(var i = 0; i < arr.length; i++)
	{					
		if(obj.userData.tag == 'obj') var nameRus = arr[i].userData.centerPoint.nameRus;
		if(obj.userData.tag == 'wf_tube') var nameRus = 'точка';
		
		var str = 
		'<div class="flex_1 right_panel_1_1_list_item" uuid="'+arr[i].uuid+'">\
		<div class="right_panel_1_1_list_item_text">'+nameRus+'</div>\
		</div>';		
			

		var el = $(str).appendTo('[nameId="'+nameId+'"]');

		var n = infProject.tools.joint.arr2.length;	
		infProject.tools.joint.arr2[n] = {};
		infProject.tools.joint.arr2[n].el = el;
		infProject.tools.joint.arr2[n].o = arr[i]; 		
		
		arr[i].visible = true;
		el.on('mousedown', function(){ clickItemCenterObjUI_2({el: $(this)}) });		
	}	
	
	
	if(arr.length > 0) 
	{
		clickItemCenterObjUI_2({item: 0}); 
	}	
}








// выбираем центр для объекта к которому хотим присоединиться 
function clickItemCenterObjUI_2(cdm)
{
	var item = null;
	var obj = null;
	
	var joint = infProject.tools.joint;
	
	var arr = infProject.tools.joint.arr2;		
	
	if(arr.length == 0) return;	// у объекта нет разъемов
	
	
	// снимаем старые выдиления в UI 
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].el.css('background-color', '#ffffff');
		
		if(arr[i].o.userData.tag == 'joinPoint') arr[i].o.material = infProject.material.pointObj.default;
		if(arr[i].o.userData.tag == 'wf_point') arr[i].o.material = infProject.material.pointTube.default;		
	}
	
	
	if(cdm.el)	// кликнули на пункт в меню
	{
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].el[0] == cdm.el[0]){ obj = arr[i].o; break; } 
		}

		item = cdm.el;
	}
	else if(cdm.obj)	// кликнули на объект в сцене
	{
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].o == cdm.obj){ item = arr[i].el; break; } 
		}

		obj = cdm.obj;
	}
	else if(cdm.item !== undefined)	// присылаем номер пункта, который хотим выделить 
	{
		item = arr[cdm.item].el;
		obj = arr[cdm.item].o;
	}
	else
	{
		return;
	}
	
	
	// выделяем новый пункт на который кликнули UI
	item.css('background-color', '#00ff00');
	var value = item.attr('uuid');
	
	
	if(obj.userData.tag == 'joinPoint') obj.material = infProject.material.pointObj.active;
	if(obj.userData.tag == 'wf_point')	obj.material = infProject.material.pointTube.active;
		
	infProject.tools.joint.p2 = obj;
	
	setClickLastObj({obj: infProject.tools.joint.p1});
}





// нажали кнопку выровнить, подтягиваем точку трубы к выбранному разъему
function joinTubePointTopoint()
{
	var o1 = infProject.tools.joint.p1;   
	var o2 = infProject.tools.joint.p2;

	if(!o1) return;
	if(!o2) return;

	o2.updateMatrixWorld();		
	var pos1 = o2.getWorldPosition(new THREE.Vector3());
	
	o1.position.copy(pos1);
	
	infProject.tools.pivot.position.copy(o1.position);
	setScalePivotGizmo();
	
	var line = o1.userData.wf_point.line.o;
	
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;
	

	{
		geometryTubeWF({line : line});
		line.userData.wf_line.tube.visible = true;
	}	

	showWF_point_UI( o1 ); 	// обновляем меню длины трубы UI

	renderCamera();
}




// соединяем (выравниваем) элементы
function joinElement(cdm)
{ 
	if(!cdm) cdm = {};
	
	var joint = infProject.tools.joint;	
	
	var o1 = infProject.tools.joint.p1;   
	var o2 = infProject.tools.joint.p2;

	if(!o1) return;
	if(!o2) return;

	var obj_1 = infProject.tools.joint.p1.parent;
	var obj_2 = infProject.tools.joint.p2.parent;
	
	if(o2.userData.tag == 'wf_point') obj_2 = o2;
		

	var q2 = o2.getWorldQuaternion(new THREE.Quaternion());
	var q1 = o1.getWorldQuaternion(new THREE.Quaternion());
	var q1 = q1.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)));	// разворачиваем на 180 градусов
	var diff_2 = new THREE.Quaternion().multiplyQuaternions(q2, q1.inverse());					// разница между Quaternions
	
	if(obj_2.userData.tag == 'wf_point')
	{
		var arr_2 = [obj_1];
	}
	else if(obj_2.userData.obj3D.group == obj_1.userData.obj3D.group) 	// второй объект из той же группы
	{
		var arr_2 = [obj_1];  
	}
	else if(obj_1.userData.obj3D.group && infProject.settings.active.group)		// объект имеет группу и выдилен как группа	
	{
		var arr_2 = getObjsFromGroup_1({obj: obj_1});
	}
	else	// объект без группы или объект с группой, но выдилен как отдельный объект
	{
		var arr_2 = [obj_1];
	}
	
	
	if(obj_2.userData.tag == 'wf_point')
	{
		
	}
	else
	{
		// поворачиваем объекты в нужном направлении 
		for(var i = 0; i < arr_2.length; i++)
		{
			arr_2[i].quaternion.premultiply(diff_2);		// diff разницу умнажаем, чтобы получить то же угол	
			arr_2[i].updateMatrixWorld();		
		}
		
	}
	
	var pos1 = o2.getWorldPosition(new THREE.Vector3());		
	var pos2 = o1.getWorldPosition(new THREE.Vector3());
	

	// вращаем position объектов, относительно точки-соединителя
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].position.sub(pos2);
		arr_2[i].position.applyQuaternion(diff_2); 	
		arr_2[i].position.add(pos2);
	}
	
	// после вращения vector, обновляем положение точки-соединителя
	obj_1.updateMatrixWorld();
	var pos2 = o1.getWorldPosition(new THREE.Vector3());
	var pos = new THREE.Vector3().subVectors( pos1, pos2 );
	
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].position.add(pos);		
	}			
	

	
	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }	
	
	obj_1.updateMatrixWorld();
	var pos = o1.getWorldPosition(new THREE.Vector3());
	var q = o1.getWorldQuaternion(new THREE.Quaternion());
	
	
	setScalePivotGizmo();
	tools.position.copy(pos);
	tools.quaternion.copy(q); 	
}








