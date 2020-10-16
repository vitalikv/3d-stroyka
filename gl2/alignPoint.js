




// вкл/выкл возможность выделение объектов для присоединения 
function switchAlignPoint_1(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.list.alignP.active = cdm.active;
	}	
	else
	{
		infProject.list.alignP.active = !infProject.list.alignP.active;
	}
	
	// скрываем точки у второго объекта
	clearListObjUI();		
	
	if(infProject.list.alignP.active)	// вкл
	{
		infProject.list.alignP.p1 = clickO.last_obj;
		
		if(infProject.list.alignP.p1.userData.tag == 'joinPoint')
		{
			$('[nameId="rp_wrap_obj_align"]').show();
			$('[nameId="bl_rp_obj_group"]').hide();
			$('[nameId="pr_list_button_for_obj"]').hide();
			$('[nameId="pr_list_button_center_point"]').hide();
		}
		
		if(infProject.list.alignP.p1.userData.tag == 'wf_point')
		{
			$('[nameId="pr_list_button_for_tube_point"]').hide();
			$('[nameId="rp_wrap_align_wf_point"]').show();					
		}
	}		
	else		// выкл
	{
		if(infProject.list.alignP.p1)
		{
			if(infProject.list.alignP.p1.userData.tag == 'joinPoint')
			{
				$('[nameId="rp_wrap_obj_align"]').hide();
				$('[nameId="bl_rp_obj_group"]').show();
				$('[nameId="pr_list_button_for_obj"]').hide();
				$('[nameId="pr_list_button_center_point"]').show();				
			}
			
			if(infProject.list.alignP.p1.userData.tag == 'wf_point')
			{
				$('[nameId="rp_wrap_align_wf_point"]').hide();
				$('[nameId="pr_list_button_for_tube_point"]').show();						
			}			
		}
		
		infProject.list.alignP.p1 = null;		
	}	
}


// очищаем список и возращаем default материал разъемам
function clearListObjUI()
{
	var arr = infProject.list.alignP.arr2;	
	
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
	
	infProject.list.alignP.arr2 = [];	
	infProject.list.alignP.p2 = null;	
}



// кликнули на объект в сцене (труба/объект), когда была нажата кнопка выровнить
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
		arr[0] = obj.userData.wf_tube.point[0]
		arr[1] = obj.userData.wf_tube.point[obj.userData.wf_tube.point.length - 1];
	}
	
	if(obj.userData.tag == 'obj')
	{
		arr = getCenterPointFromObj_1( obj );
	}	
	
	 
	if(infProject.list.alignP.p1.userData.tag == 'wf_point') { var nameId = "rp_list_align_wf_point"; }
	if(infProject.list.alignP.p1.userData.tag == 'joinPoint') { var nameId = "rp_obj_align"; }
	
	
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

		var n = infProject.list.alignP.arr2.length;	
		infProject.list.alignP.arr2[n] = {};
		infProject.list.alignP.arr2[n].el = el;
		infProject.list.alignP.arr2[n].o = arr[i]; 				
		
		el.on('mousedown', function(){ clickItemCenterObjUI_2({el: $(this)}) });		
	}	
	
	
	// масштаб точек
	if(obj.userData.tag == 'wf_tube') { setScaleTubePoint({arr: arr}); }
	else if(obj.userData.tag == 'obj') { setScaleJoinPoint({arr: arr}); }

	// показываем точки
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = true;
	}
	
	if(arr.length > 0) 
	{
		clickItemCenterObjUI_2({item: 0}); 
	}	
}








// выбираем точку к которой хотим присоединиться 
function clickItemCenterObjUI_2(cdm)
{
	var item = null;
	var obj = null;
	
	var joint = infProject.list.alignP;
	
	var arr = infProject.list.alignP.arr2;		
	
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
	item.css('background-color', infProject.listColor.activeItem_1);
	var value = item.attr('uuid');
	
	
	if(obj.userData.tag == 'joinPoint') obj.material = infProject.material.pointObj.active;
	if(obj.userData.tag == 'wf_point')	obj.material = infProject.material.pointTube.active;
		
	infProject.list.alignP.p2 = obj;
	
	setClickLastObj({obj: infProject.list.alignP.p1});

	renderCamera();
}




// нажали кнопку выровнить, определяем дальнейшие действия 
function alignPointToPoint_1()
{
	var joint = infProject.list.alignP;	
	
	var o1 = infProject.list.alignP.p1;   
	var o2 = infProject.list.alignP.p2;

	if(!o1) return;
	if(!o2) return;

	if(o1.userData.tag == 'wf_point'){ alignTubePointToPoint(); }
	else if(o1.userData.tag == 'joinPoint' && o2.userData.tag == 'wf_point'){ alignObjPointToTubePoint(); }
	else if(o1.userData.tag == 'joinPoint' && o2.userData.tag == 'joinPoint'){ alignObjPointToObjPoint(); }

	scaleToolsMoveCamera();	
	renderCamera();	
}


// нажали кнопку подключить, подтягиваем точку трубы к выбранному разъему трубы/объекту
function alignTubePointToPoint()
{
	var o1 = infProject.list.alignP.p1;		// двигаем и присоединяем   
	var o2 = infProject.list.alignP.p2;		// объект не трогаем, остается на месте

	o2.updateMatrixWorld();		
	var pos1 = o2.getWorldPosition(new THREE.Vector3());
	
	o1.position.copy(pos1);	
	
	updateTubeWF({tube: o1.userData.wf_point.tube});	
	o1.userData.wf_point.tube.visible = true;	

	showWF_point_UI( o1 ); 	// обновляем меню длины трубы UI
	
	infProject.tools.pivot.position.copy(o1.position);
}




// нажали кнопку подключить, подтягиваем разъем с объектом/группой к выбранному разъему 
function alignObjPointToTubePoint()
{ 	
	var joint = infProject.list.alignP;	
	
	var o1 = infProject.list.alignP.p1;		// двигаем и присоединяем   
	var o2 = infProject.list.alignP.p2;		// объект не трогаем, остается на месте
	
	
	var obj_1 = getParentObj({obj: o1});
	
	if(obj_1.userData.obj3D.group && infProject.settings.active.group)		// объект имеет группу и выдилин как группа	
	{
		var arr_2 = getObjsFromGroup_1({obj: obj_1});  
	}
	else	// объект без группы или объект с группой, но выдилен как отдельный объект
	{
		var arr_2 = [obj_1];
	}

	var pos1 = o1.getWorldPosition(new THREE.Vector3());		
	var pos2 = o2.getWorldPosition(new THREE.Vector3());

	var pos = new THREE.Vector3().subVectors( pos2, pos1 );
	
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].position.add(pos);		
	}		
	
	obj_1.updateMatrixWorld();
	var pos = o1.getWorldPosition(new THREE.Vector3());
	var q = o1.getWorldQuaternion(new THREE.Quaternion());	
	
	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }	
	
	tools.position.copy(pos);
	tools.quaternion.copy(q);
}


// нажали кнопку выровнить, подтягиваем разъем с объектом/группой к выбранному разъему 
function alignObjPointToObjPoint(cdm)
{ 	
	var joint = infProject.list.alignP;	
	
	var o1 = infProject.list.alignP.p1;		// двигаем и присоединяем   
	var o2 = infProject.list.alignP.p2;		// объект не трогаем, остается на месте

	var obj_1 = getParentObj({obj: o1});	
	var obj_2 = getParentObj({obj: o2});
	

	var q2 = o2.getWorldQuaternion(new THREE.Quaternion());
	var q1 = o1.getWorldQuaternion(new THREE.Quaternion());
	var q1 = q1.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)));	// разворачиваем на 180 градусов
	var diff_2 = new THREE.Quaternion().multiplyQuaternions(q2, q1.inverse());					// разница между Quaternions
	

	if(obj_2.userData.obj3D.group == obj_1.userData.obj3D.group) 	// второй объект из той же группы
	{
		var arr_2 = [obj_1];  
	}
	else if(obj_1.userData.obj3D.group && infProject.settings.active.group)		// объект имеет группу и выдилин как группа	
	{
		var arr_2 = getObjsFromGroup_1({obj: obj_1});  
	}
	else	// объект без группы или объект с группой, но выдилен как отдельный объект
	{
		var arr_2 = [obj_1];
	}
	
	
	// поворачиваем объекты в нужном направлении 
	for(var i = 0; i < arr_2.length; i++)
	{
		arr_2[i].quaternion.premultiply(diff_2);		// diff разницу умнажаем, чтобы получить то же угол	
		arr_2[i].updateMatrixWorld();		
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
	
	
	obj_1.updateMatrixWorld();
	var pos = o1.getWorldPosition(new THREE.Vector3());
	var q = o1.getWorldQuaternion(new THREE.Quaternion());
	
	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }	
	
	tools.position.copy(pos);
	tools.quaternion.copy(q); 
}








