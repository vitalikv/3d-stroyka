


// кликнули на obj, wd (показываем нужное меню и заполняем input или скрываем меню)
function activeObjRightPanelUI_1({obj} = {}) 
{	
	
	infProject.ui.rpanel.InfObj.hide();		
	
	
	if(!obj) return;
	
	let arrO = ddGroup({obj: obj});
	let equal = infProject.ui.rpanel.InfObj.isEqualListChilds({arr: arrO});
	if(!equal)
	{
		infProject.ui.rpanel.InfObj.setGroupObjs({arr: arrO});			
		newCrListObj({obj: obj});			
	}		
	infProject.ui.rpanel.InfObj.list.listChilds.selectObjScene({obj: obj});	
	
	
	if(obj.userData.tag == 'wf_point')
	{
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.wf_point.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'ptube1', 'ptube2']});
	}	
	else if(obj.userData.tag == 'wf_tube')
	{
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.wf_tube.nameRus, tubeDiameter: obj.userData.wf_tube.length} });		
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'bobj', 'tube']});
	}			
	else if(obj.userData.tag == 'obj')
	{	
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.obj3D.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'bobj']});					
		
		if( isCheckExsistFunction(window['getInfObjFromBD']) ) { getInfObjFromBD({obj: obj}); }; 		
	}
	else if(obj.userData.tag == 'joinPoint')
	{ 
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.centerPoint.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'bjpoint']});
	}
	else if(obj.userData.tag == 'new_point')
	{ 
		obj.ui_menu({type: 'show'});
	}
	else if(obj.userData.tag == 'new_tube')
	{ 
		obj.ui_menu({type: 'show'});
	}	
	else if(obj.userData.tag == 'wtGrid')
	{ 
		
	}	
	
}




// получаем группу , если у объекта есть группа, иначе получаем выбранный объект
function ddGroup({obj})
{
	let arr = [];
	
	if(obj.userData.obj3D)
	{
		arr = (obj.userData.obj3D.group) ? obj.userData.obj3D.group.userData.groupObj.child : [obj];
	}		
	else if(obj.userData.wf_tube) 
	{
		arr = (obj.userData.wf_tube.group) ? obj.userData.wf_tube.group.userData.groupObj.child : [obj];
	}
	else if(obj.userData.tag == 'joinPoint') 
	{
		var obj3D = obj.parent;
		arr = (obj3D.userData.obj3D.group) ? obj3D.userData.obj3D.group.userData.groupObj.child : [obj3D];
	}	
	else if(obj.userData.tag == 'wf_point') 
	{
		let tube = obj.userData.wf_point.tube;
		arr = (tube.userData.wf_tube.group) ? tube.userData.wf_tube.group.userData.groupObj.child : [tube];
	}
	else if(obj.userData.tag == 'new_point') 
	{
		arr = obj.userData.tube.userData.group;
	}
	else if(obj.userData.tag == 'new_tube') 
	{
		arr = obj.userData.group;
	}
	
	return arr;
}


// подготавливаем список для создания списка объектов
function newCrListObj({obj})
{
	let arrO = ddGroup({obj});
	
	let arrItem = arrO.map(o => 
	{
		let item = {};	

		if(o.userData.obj3D) item = getObj3D({obj: o});
		else if(o.userData.wf_tube) item = getObjTube({obj: o});
		else if(o.userData.tag == 'new_point') item = o.userData.tube.ui_getObjChilds();
		else if(o.userData.tag == 'new_tube') item = o.ui_getObjChilds();		
		
		return item;
	});	
	
	
	infProject.ui.rpanel.InfObj.list.listChilds.crListUI({arr: arrItem});
	
	function getObj3D({obj})
	{
		let item = {};
		item.obj = obj;
		item.name = obj.userData.obj3D.nameRus;
		item.f = clickItemListRpInfUI.bind(obj);
		
		item.childs = [];	
		
		let arr = getCenterPointFromObj_1(obj);
		
		for (let i = 0; i < arr.length; i++)
		{
			item.childs[i] = {};
			item.childs[i].obj = arr[i];
			item.childs[i].name = arr[i].userData.centerPoint.nameRus;
			item.childs[i].f = clickItemListRpInfUI.bind(arr[i]);			
		}
		
		return item;
	}

	function getObjTube({obj})
	{
		let item = {};
		item.obj = obj;
		item.name = obj.userData.wf_tube.nameRus;
		item.lengthTube = obj.userData.wf_tube.length;
		item.colorTube = '#' + obj.material.color.clone().getHexString();		
		item.f = clickItemListRpInfUI.bind(obj);
		
		item.childs = [];	
		
		let arr = [];
		arr[0] = obj.userData.wf_tube.point[0];
		arr[1] = obj.userData.wf_tube.point[obj.userData.wf_tube.point.length - 1];	
					
		for (let i = 0; i < arr.length; i++)
		{
			item.childs[i] = {};
			item.childs[i].obj = arr[i];
			item.childs[i].name = arr[i].userData.wf_point.nameRus;
			item.childs[i].f = clickItemListRpInfUI.bind(arr[i]);			
		}
		
		return item;
	}	
}


// кликнули на пункт из UI меню
function clickItemListRpInfUI()
{
	let obj = this;
	
	if(obj.userData.obj3D) { obj3D({obj}); }
	else if(obj.userData.centerPoint) { objCenterPoint({obj}); }
	else if(obj.userData.wf_tube) { tube({obj}); }
	else if(obj.userData.wf_point) { tubePoint({obj}); }


	function obj3D({obj})
	{
		
		showHideJP({obj});		
		
		let arrO = getObjsFromGroup_1({obj: obj});
		
		outlinePass.selectedObjects = arrO;	
		
		
		obj.updateMatrixWorld();
		let pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );			
		
		infProject.tools.pg.activeTool({obj: obj, pos: pos, arrO: arrO});

		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.obj3D.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'bobj']});	
	}
	

	function objCenterPoint({obj})
	{
		activeJoinPoint({obj: obj});
		showHideJP({obj: obj.parent});		
		
		let arrO = getObjsFromGroup_1({obj: obj.parent});
		
		outlinePass.selectedObjects = arrO;	
		
		
		let pos = obj.getWorldPosition(new THREE.Vector3());  
				
		
		infProject.tools.pg.activeTool({obj: obj, pos: pos, arrO: arrO});

		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.centerPoint.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'bjpoint']});	
	}	
	
	
	function tube({obj})
	{
		showHideTubePoint({tube: obj, visible: true});
		
		let arrO = [obj, ...obj.userData.wf_tube.point];
		
		outlinePass.selectedObjects = arrO;	
		
		
		let pos = new THREE.Vector3();
		
		if(1==1)
		{
			let p = obj.userData.wf_tube.point;
			let n = (p.length % 2);	// четное/нечетное, 2=false 3=true
			pos = p[0].position;
			
			if(n)
			{
				n = (p.length - 1)/2;				
				pos = p[n].position;
			}
			else
			{
				n = (p.length - p.length/2) - 1;				
				let pos1 = p[n].position;
				let pos2 = p[n+1].position;
				pos = new THREE.Vector3().subVectors( pos2, pos1 ).divideScalar( 2 ).add(pos1);
			}			

			
			obj.updateMatrixWorld();						
			pos = obj.worldToLocal( pos.clone() );			
		}
				
		
		infProject.tools.pg.activeTool({obj: obj, pos: pos, arrO: arrO});

		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.wf_tube.nameRus, tubeDiameter: obj.userData.wf_tube.length} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'bobj', 'tube']});			
	}
	

	function tubePoint({obj})
	{
		let tube = obj.userData.wf_point.tube;
		
		showHideTubePoint({tube: tube, visible: true});		
		
		let arrO = [tube, ...tube.userData.wf_tube.point];
		
		outlinePass.selectedObjects = arrO;				
		
		infProject.tools.pg.activeTool({obj: obj, pos: obj.position, arrO: arrO});

		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.update({inf: {nameObj: obj.userData.wf_point.nameRus} });
		infProject.ui.rpanel.InfObj.show({inf: ['listobj', 'ptube1', 'ptube2']});		
	}	
}	

	
		









// переименовываем название во вкладке "объект"
function upItemObjNameUI(cdm)
{
	var obj = cdm.obj;
	
	var arr1 = infProject.list.rp_ui.arr;
	var arr2 = [];
	
	for(var i = 0; i < arr1.length; i++)
	{
		arr2[arr2.length] = {o: arr1[i].o, el: arr1[i].el};
		
		for(var i2 = 0; i2 < arr1[i].p.length; i2++)
		{
			arr2[arr2.length] = {o: arr1[i].p[i2].o, el: arr1[i].p[i2].el};
		}
	}
	
	
	for(var i = 0; i < arr2.length; i++)
	{
		if(arr2[i].o == obj)
		{
			var nameItem = arr2[i].el.querySelector('[nameId="nameItem"]');
			nameItem.innerText = obj.userData.obj3D.nameRus;  
			break;
		}
	}		
}




