





// пускаем луч, определяем кликнули ли на точку, если активирована труба или точка
function clickRayhitPointWF(params)
{  
	let event = params.event;
	let obj = params.obj;
	
	if(!obj) return;
	
	let arrP = null;
	let rayhit = null;
	
	
	if(obj.userData.tag == 'wf_tube'){ arrP = obj.userData.wf_tube.point; }	
	if(obj.userData.tag == 'wf_point'){ arrP = obj.userData.wf_point.tube.userData.wf_tube.point; }

	if(obj.userData.tag == 'new_tube'){ arrP = obj.getTubePoints(); }
	if(obj.userData.tag == 'new_point'){ arrP = obj.getTubePoints(); }
		
	if(arrP)
	{			
		let ray = rayIntersect( event, arrP, 'arr' );  
		if(ray) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}	

	return rayhit;
}





// кликнули на точку, распределяем что делать
function clickFirstWFPoint(cdm)
{
	var obj = cdm.obj;
	var rayhit = cdm.rayhit;
	
	clickWFPoint_3D({ray: rayhit, menu_1: true});
}



// кликнули на точку
function clickWFPoint_3D(cdm)
{
	var obj = null;

	if(cdm.ray) { obj = cdm.ray.object; }
	if(cdm.obj) { obj = cdm.obj; } 

	if(!obj) return;
	
	outlineAddObj(obj);
	
	setPivotGizmo({obj: obj});
	
	
	activeObjRightPanelUI_1({obj: obj});

	
	setClickLastObj({obj: obj});
}










// обновляем форму трубы
function updateTubeWF(cdm)
{
	var tube = cdm.tube;
	tube.position.set(0, 0, 0);
	tube.rotation.set(0, 0, 0);
	
	var point = (cdm.point) ? cdm.point : tube.userData.wf_tube.point;	
	var diameter = (cdm.diameter) ? cdm.diameter : tube.userData.wf_tube.diameter;
	
	var inf = tubeGeometry({point: point, diameter: diameter});
	
	tube.geometry.dispose();
	tube.geometry = inf.geometry;

	
	if(cdm.color)
	{
		
	}	
	
	tube.userData.wf_tube.point = point;
	tube.userData.wf_tube.nameRus = 'труба '+ diameter*1000;
	tube.userData.wf_tube.length = Math.round(inf.length * 100)/100;
	tube.userData.wf_tube.diameter = diameter;
	
	for(var i = 0; i < point.length; i++) { point[i].userData.wf_point.tube = tube; }

	infProject.ui.rpanel.EstList.updateItem({obj: tube});	// обновляем длину трубы во вкладке "список"
	
	renderCamera();
	
	return tube;
}





























