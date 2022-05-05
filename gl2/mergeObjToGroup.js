




// вкл/выкл возможность выделение объектов для объединения в группу (merge)
function switchSelectAddObjGroup(cdm)
{
	if(!cdm) cdm = {};
	
	if(cdm.active !== undefined) 
	{
		infProject.list.mergeO.active = cdm.active;
	}
	else
	{
		infProject.list.mergeO.active = !infProject.list.mergeO.active;
	}		
	
	
	var obj = infProject.tools.pg.obj;
	
	if(obj) { outlineAddObj(obj); }
	else { outlineRemoveObj(); }
	
	
	if(infProject.list.mergeO.active)	// вкл
	{
		
		infProject.list.mergeO.o1 = [];	
		if(obj) infProject.list.mergeO.o1 = getObjsFromGroup_1({obj: obj});
		
		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.show({inf: ['jgroup']});	
	}
	else		// выкл
	{
		clearListUI_2({list: infProject.list.mergeO.el});

		activeObjRightPanelUI_1({obj: obj});
		
		infProject.list.mergeO.o1 = [];
		infProject.list.mergeO.o2 = [];
	}

	renderCamera();
}



// выбрать объект/группу для объединения в группу
function selectObjForMergeToGroup(cdm)
{ 
	var obj = cdm.obj;
	
	var arr_1 = getObjsFromGroup_1({obj: obj});
	
	for(var i = 0; i < arr_1.length; i++)
	{
		if(!compareSelectedObjWithCurrent({obj: arr_1[i], arr: infProject.list.mergeO.o2}))
		{
			if(!compareSelectedObjWithCurrent({obj: arr_1[i], arr: infProject.list.mergeO.o1}))
			{
				infProject.list.mergeO.o2[infProject.list.mergeO.o2.length] = arr_1[i];
			}						
		}					
	}
	
	
	var arr = [];
	
	for(var i = 0; i < infProject.list.mergeO.o1.length; i++)
	{
		arr[arr.length] = infProject.list.mergeO.o1[i];
	}
	
	for(var i = 0; i < infProject.list.mergeO.o2.length; i++)
	{
		arr[arr.length] = infProject.list.mergeO.o2[i];
	}				
	
	showListSelectedObjGroupUI();
	
	outlineAddObj(obj, {arrO: arr});
}




// показываем список объектов которые будут объединены в новую группу
function showListSelectedObjGroupUI(cdm) 
{
	if(infProject.list.mergeO.o2.length == 0) return;	
	
	clearListUI_2({list: infProject.list.mergeO.el});	
	
	for(var i = 0; i < infProject.list.mergeO.o2.length; i++)
	{
		var child = infProject.list.mergeO.o2[i];
		
		var name = '';
		
		if(child.userData.obj3D) { name = child.userData.obj3D.nameRus; }
		else if(child.userData.wf_tube) { name = child.userData.wf_tube.nameRus; }

		var html = 
		'<div class="flex_1 right_panel_1_1_list_item">\
			<div class="right_panel_1_1_list_item_text">'+name+'</div>\
		</div>';				
		
		var div = document.createElement('div');
		div.innerHTML = html;
		var elem = div.firstChild;	
		
		var container = infProject.elem.rp_add_group;
		container.append(elem);		
		
		var n = infProject.list.mergeO.el.length;	
		infProject.list.mergeO.el[n] = elem;
		
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

	infProject.list.mergeO.el = [];
}






