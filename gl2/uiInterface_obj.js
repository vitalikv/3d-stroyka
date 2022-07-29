


// кликнули на obj, wd (показываем нужное меню и заполняем input или скрываем меню)
function activeObjRightPanelUI_1({obj} = {}) 
{	
	//console.trace(3244, obj);
	infProject.ui.rpanel.InfObj.hide();		
	infProject.ui.rpanel.InfObj.list.jobj.end();
	
	if(!obj) return;
	
	let arrO = ddGetGroup({obj: obj, tubePoint: false});
	let equal = infProject.ui.rpanel.InfObj.isEqualListChilds({arr: arrO});
	if(!equal)
	{
		infProject.ui.rpanel.InfObj.setGroupObjs({arr: arrO});			
		let arrItem = newCrListObj({arrO: arrO});	
		infProject.ui.rpanel.InfObj.list.listChilds.crListUI({arr: arrItem});
	}		
	infProject.ui.rpanel.InfObj.list.listChilds.selectObjScene({obj: obj});	
	
				
	if(obj.userData.tag == 'obj')
	{	
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.obj3D.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'bobj']});					
		
		if( isCheckExsistFunction(window['getInfObjFromBD']) ) { getInfObjFromBD({obj: obj}); }; 		
	}
	else if(obj.userData.tag == 'joinPoint')
	{ 
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.centerPoint.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'ptube1']});
	}
	else if(obj.userData.tag == 'new_point')
	{ 
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.nameRus}});		
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'ptube1', 'ptube2']});	
	}
	else if(obj.userData.tag == 'new_tube')
	{ 
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.nameRus, tubeDiameter: obj.userData.diameter * 1000} });		
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'tube', 'bobj']});	
	}	
	else if(obj.userData.tag == 'wtGrid')
	{ 
		
	}	
	
}






// подготавливаем список для создания списка объектов
function newCrListObj({arrO})
{
	let arrItem = [];
	
	for(let i = 0; i < arrO.length; i++)
	{
		let o = arrO[i];
		let item = null;
		
		if(o.userData.obj3D) item = getObj3D({obj: o});
		//else if(o.userData.tag == 'new_point') item = o.userData.tube.ui_getObjChilds();
		else if(o.userData.tag == 'new_tube') item = getObjNewTube({obj: o});

		if(item) arrItem.push(item);
	}

	
	function getObj3D({obj})
	{
		let item = {};
		item.obj = obj;
		item.name = obj.userData.obj3D.nameRus;
		
		item.childs = [];	
		
		let arr = getCenterPointFromObj_1(obj);
		
		for (let i = 0; i < arr.length; i++)
		{
			item.childs[i] = {};
			item.childs[i].obj = arr[i];
			item.childs[i].name = arr[i].userData.centerPoint.nameRus;			
		}
		
		return item;
	}


	function getObjNewTube({obj})
	{
		let item = {};
		item.obj = obj;
		item.name = obj.userData.nameRus;
		item.lengthTube = obj.userData.lengthTube;
		item.colorTube = '#' + obj.material.color.clone().getHexString();
		
		item.childs = [];	
		
		let arr = [obj.userData.point[0], obj.userData.point[obj.userData.point.length - 1]];
		
		for (let i = 0; i < arr.length; i++)
		{
			item.childs[i] = {};
			item.childs[i].obj = arr[i];
			item.childs[i].name = arr[i].userData.nameRus;			
		}
		
		return item;
	}
	
	return arrItem;
}


	












