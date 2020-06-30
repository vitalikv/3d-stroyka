




// вкл/выкл возможность выделение объектов для объединения в группу (merge)
function switchSelectAddObjGroup(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.tools.merge_obj.active = cdm.active;
	}
	else
	{
		infProject.tools.merge_obj.active = !infProject.tools.merge_obj.active;
	}		
	
	
	var obj = getObjFromPivotGizmo();
	
	if(obj) { outlineAddObj(obj); }
	else { outlineRemoveObj(); }
	
	
	if(infProject.tools.merge_obj.active)	// вкл
	{
		$('[nameId="rp_wrap_add_group"]').show();
		infProject.tools.merge_obj.o1 = [];	

		if(obj)
		{
			infProject.tools.merge_obj.o1 = getObjsFromGroup_1({obj: obj});
		}
		
		$('[nameId="bl_rp_obj_group"]').hide();
		$('[nameId="pr_list_button_for_obj"]').hide();		
	}
	else		// выкл
	{
		clearListUI_2({list: infProject.tools.merge_obj.el});
		$('[nameId="rp_wrap_add_group"]').hide();
		
		$('[nameId="bl_rp_obj_group"]').show();
		$('[nameId="pr_list_button_for_obj"]').show();		
		
		infProject.tools.merge_obj.o1 = [];
		infProject.tools.merge_obj.o2 = [];
	}	
}



// выбрать объект/группу для объединения в группу
function selectObjForMergeToGroup(cdm)
{ 
	var obj = cdm.obj;
	
	var arr_1 = getObjsFromGroup_1({obj: obj});
	
	for(var i = 0; i < arr_1.length; i++)
	{
		if(!compareSelectedObjWithCurrent({obj: arr_1[i], arr: infProject.tools.merge_obj.o2}))
		{
			if(!compareSelectedObjWithCurrent({obj: arr_1[i], arr: infProject.tools.merge_obj.o1}))
			{
				infProject.tools.merge_obj.o2[infProject.tools.merge_obj.o2.length] = arr_1[i];
			}						
		}					
	}
	
	
	var arr = [];
	
	for(var i = 0; i < infProject.tools.merge_obj.o1.length; i++)
	{
		arr[arr.length] = infProject.tools.merge_obj.o1[i];
	}
	
	for(var i = 0; i < infProject.tools.merge_obj.o2.length; i++)
	{
		arr[arr.length] = infProject.tools.merge_obj.o2[i];
	}				
	
	showListSelectedObjGroupUI();
	
	outlineAddObj(obj, {arrO: arr});
}




// показываем список объектов которые будут объединены в новую группу
function showListSelectedObjGroupUI(cdm) 
{
	if(infProject.tools.merge_obj.o2.length == 0) return;	
	
	clearListUI_2({list: infProject.tools.merge_obj.el});	
	
	for(var i = 0; i < infProject.tools.merge_obj.o2.length; i++)
	{
		var child = infProject.tools.merge_obj.o2[i];
		
		if(!child.userData.obj3D) continue;	

		var str = 
		'<div class="flex_1 right_panel_1_1_list_item" uuid="'+child.uuid+'">\
		<div class="right_panel_1_1_list_item_text">'+child.userData.obj3D.nameRus+'</div>\
		</div>';		

		var el = $(str).appendTo('[nameId="rp_add_group"]');
		
		var n = infProject.tools.merge_obj.el.length;	
		infProject.tools.merge_obj.el[n] = el;
		
	}	
}





// очищаем список UI
function clearListUI_2(cdm)
{
	var list = cdm.list;
	
	for(var i = 0; i < list.length; i++)
	{
		list[i].remove();
	}		

	infProject.tools.merge_obj.el = [];
}






