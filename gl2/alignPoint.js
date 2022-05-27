



// присоединие разъема к другому разъему
class JoinConnector
{		
	constructor({container, b_open, b_close, b_action})
	{
		this.container = container;
		this.b_open = b_open;
		this.b_close = b_close;
		this.b_action = b_action;

		this.arr = [];
		this.activePoint = null;
		
		this.assignEvent();	
	}
	
	assignEvent()
	{
		this.b_open.onmousedown = (event) => { this.start(event); }
		this.b_close.onmousedown = () => { this.end(); }
		this.b_action.onmousedown = () => { this.connectObj(); }
	}
	
	
	// вкл возможность присоединить разъем к другому разъему
	start(event)
	{
		event.stopPropagation();
		
		setRayhitStop(true);
		this.b_close.style.borderColor = "#0000ff";

		this.container.onmousedown = (event) => this.clickOnScene({event});	

		
		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.show({inf: ['jpoint']});		
	}
	
	// выкл возможность присоединить разъем к другому разъему
	end()
	{
		this.clearObj();
		this.container.onmousedown = null;
		setRayhitStop(false);
		activeObjRightPanelUI_1({obj: infProject.tools.pg.obj})
	}
	
	// кликаем в сцену, если попадаем на трубу/объект, то показываем разъемы
	clickOnScene({event})
	{
		if(this.arr.length == 0) { this.rayhitObj(); } 
		else { this.rayhitPoint(); }

		
		this.render();
	}
	
	
	// кликаем в сцену, ищем объекты
	rayhitObj()
	{
		this.arr = []; 
		
		let ray = rayIntersect( event, [...infProject.scene.array.tube, ...infProject.scene.array.obj], 'arr' );
		if(ray.length == 0) 
		{
			this.clearObj();
			return;
		}
		
		let obj = ray[0].object;
		
		if(infProject.tools.pg.arrO.findIndex(o => o == obj) > -1)
		{
			this.clearObj();
			return;			
		}
		
		let arr = [];
		
		// получаем разъемы, если есть
		if(obj.userData.tag == 'wf_tube')
		{		
			arr[0] = obj.userData.wf_tube.point[0]
			arr[1] = obj.userData.wf_tube.point[obj.userData.wf_tube.point.length - 1];
		}
		if(obj.userData.tag == 'new_tube')
		{		
			arr[0] = obj.userData.point[0]
			arr[1] = obj.userData.point[obj.userData.point.length - 1];
		}	
		if(obj.userData.tag == 'obj')
		{
			arr = getCenterPointFromObj_1( obj );
		}	
		
		console.log(777777, obj, arr);

		// показываем разъемы
		for(let i = 0; i < arr.length; i++) arr[i].visible = true;

		this.arr = arr;		
	}
	
	
	// кликаем в сцену, ищем разъемы
	rayhitPoint()
	{		
		this.activePoint = infProject.material.pointTube.default;
		this.activePoint = null;	
		
		let ray = rayIntersect( event, this.arr, 'arr' );
		if(ray.length == 0) 
		{
			this.clearObj();
			this.rayhitObj();
			return;
		}
		
		let obj = ray[0].object;
		obj.material = infProject.material.pointTube.active;

		this.activePoint = obj;			
	}	
	
	
	// нажали кнопку присоединить 
	connectObj()
	{
		let o1 = infProject.tools.pg.obj;
		let o2 = this.activePoint;
		
		if(!o1 || !o2) return;
		
		if(o1.userData.tag == 'wf_point' || o1.userData.tag == 'new_point')
		{ 
			//if(joint.type == 'move'){ alignObjPointToTubePoint(); }
			//else { alignTubePointToPoint(); } 
			alignTubePointToPoint({o1, o2});
		}
		else if(o1.userData.tag == 'joinPoint')
		{ 
			if(o2.userData.tag == 'wf_point') alignObjPointToTubePoint({o1, o2}); 
			if(o2.userData.tag == 'joinPoint') alignObjPointToObjPoint({o1, o2});
		}
		

		this.render();
	}

	
	clearObj()
	{		
		for(let i = 0; i < this.arr.length; i++) 
		{
			this.arr[i].visible = false;
			this.arr[i].material = infProject.material.pointObj.default;
		}

		this.arr = [];
		this.activePoint = null;
	}

	render()
	{
		renderCamera();
	}
}	





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
	
	infProject.list.alignP.type = '';
	
	// скрываем точки у второго объекта
	clearListObjUI();		
	
	
	
	if(infProject.list.alignP.active)	// вкл
	{		
		infProject.list.alignP.p1 = clickO.last_obj;
		if(cdm.type) { infProject.list.alignP.type = cdm.type; }
		
		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.show({inf: ['jpoint']});
	}		
	else		// выкл
	{		
		if(infProject.list.alignP.p1) activeObjRightPanelUI_1({obj: infProject.list.alignP.p1});
		
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
function showJoinPoint_2({obj})
{ 
	console.log(999, obj);
	
	// скрываем точки у второго объекта
	clearListObjUI();	
	
	let arr = [];
	
	// получаем разъемы, если есть
	if(obj.userData.tag == 'wf_tube')
	{		
		arr[0] = obj.userData.wf_tube.point[0]
		arr[1] = obj.userData.wf_tube.point[obj.userData.wf_tube.point.length - 1];
	}
	if(obj.userData.tag == 'new_tube')
	{		
		arr[0] = obj.userData.point[0]
		arr[1] = obj.userData.point[obj.userData.point.length - 1];
	}	
	if(obj.userData.tag == 'obj')
	{
		arr = getCenterPointFromObj_1( obj );
	}	
	
	 
	
	let container = document.querySelector('[nameId="rp_obj_align"]');
	
	// добваляем разъемы выделенного объекта в список UI
	for(let i = 0; i < arr.length; i++)
	{
		let nameRus = 'точка';		
		if(obj.userData.tag == 'obj') nameRus = arr[i].userData.centerPoint.nameRus;
		if(obj.userData.tag == 'wf_tube') nameRus = 'точка';
		if(obj.userData.tag == 'new_tube') nameRus = 'точка';
		
		let html = 
		'<div class="flex_1 right_panel_1_1_list_item" uuid="'+arr[i].uuid+'">\
			<div class="right_panel_1_1_list_item_text">'+nameRus+'</div>\
		</div>';					

		
		let div = document.createElement('div');
		div.innerHTML = html;
		let el = div.firstChild;		
		
		container.append(el);

		let n = infProject.list.alignP.arr2.length;	
		infProject.list.alignP.arr2[n] = {};
		infProject.list.alignP.arr2[n].el = el;
		infProject.list.alignP.arr2[n].o = arr[i]; 				
		
		
			
		(function(el) 
		{
			el.onmousedown = function(e){ clickItemCenterObjUI_2({el: el}); e.stopPropagation(); };	
		}(el));
	}	
	
	
	// масштаб точек
	if(obj.userData.tag == 'wf_tube') { setScaleTubePoint({arr: arr}); }
	else if(obj.userData.tag == 'new_tube') {  }
	else if(obj.userData.tag == 'obj') { setScaleJoinPoint({arr: arr}); }

	// показываем точки
	for(let i = 0; i < arr.length; i++) arr[i].visible = true;
	
	if(arr.length > 0) clickItemCenterObjUI_2({item: 0});	
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
		arr[i].el.style.backgroundColor = '#ffffff';
		
		if(arr[i].o.userData.tag == 'joinPoint') arr[i].o.material = infProject.material.pointObj.default;
		if(arr[i].o.userData.tag == 'wf_point') arr[i].o.material = infProject.material.pointTube.default;		
	}
	
	
	if(cdm.el)	// кликнули на пункт в меню
	{
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].el == cdm.el){ obj = arr[i].o; break; } 
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
	item.style.backgroundColor = infProject.listColor.activeItem_1;
	
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

	if(o1.userData.tag == 'wf_point')
	{ 
		if(joint.type == 'move'){ alignObjPointToTubePoint(); }
		else { alignTubePointToPoint(); } 
	}
	else if(o1.userData.tag == 'joinPoint' && o2.userData.tag == 'wf_point'){ alignObjPointToTubePoint(); }
	else if(o1.userData.tag == 'joinPoint' && o2.userData.tag == 'joinPoint'){ alignObjPointToObjPoint(); }

	scaleToolsMoveCamera();	
	renderCamera();	
}


// нажали кнопку подключить, подтягиваем точку трубы к выбранному разъему трубы/объекту
function alignTubePointToPoint({o1, o2})
{
	// o1 двигаем и присоединяем   
	// o2 объект не трогаем, остается на месте
		
	let pos = o2.getWorldPosition(new THREE.Vector3());
			
	
	if(o1.userData.tag == 'new_point')
	{
		o1.movePointTube({pos});
	}
	else if(o1.userData.tag == 'wf_point')
	{
		o1.position.copy(pos);
		updateTubeWF({tube: o1.userData.wf_point.tube});	
		showWF_point_UI({point: o1}); 	// обновляем меню длины трубы UI		
	}
	
	
	infProject.tools.pg.setPosPivotGizmo({pos: o1.position}); 
}




// нажали кнопку подключить, подтягиваем разъем с объектом/группой к выбранному разъему 
// o1 двигаем и присоединяем   
// o2 объект не трогаем, остается на месте
function alignObjPointToTubePoint({o1, o2})
{ 	
	let arrO = ddGroup({obj: o1});

	let pos1 = o1.getWorldPosition(new THREE.Vector3());		
	let pos2 = o2.getWorldPosition(new THREE.Vector3());
	let pos = new THREE.Vector3().subVectors( pos2, pos1 );
	
	for(let i = 0; i < arrO.length; i++)
	{
		if(arrO[i].userData.tag == 'wf_tube')
		{
			let point = arrO[i].userData.wf_tube.point;			
			for(let i2 = 0; i2 < point.length; i2++){ point[i2].position.add(pos); }			
			updateTubeWF({tube: arrO[i]});
		}
		else if(arrO[i].userData.tag == 'new_tube')
		{
			arrO[i].setPosTube({pos: pos});
		}		
		else
		{
			arrO[i].position.add(pos);
		}
	}		
	
	
	infProject.tools.pg.setPosPivotGizmo({pos: o1.getWorldPosition(new THREE.Vector3())}); 
	infProject.tools.pg.setRotPivotGizmo({qt: o1.getWorldQuaternion(new THREE.Quaternion())});
}


// нажали кнопку выровнить, подтягиваем разъем с объектом/группой к выбранному разъему 
// o1 двигаем и присоединяем   
// o2 объект не трогаем, остается на месте
function alignObjPointToObjPoint({o1, o2})
{ 	
	var obj_1 = getParentObj({obj: o1});	
	var obj_2 = getParentObj({obj: o2});
	

	var q2 = o2.getWorldQuaternion(new THREE.Quaternion());
	var q1 = o1.getWorldQuaternion(new THREE.Quaternion());
	var q1 = q1.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)));	// разворачиваем на 180 градусов
	var diff_2 = new THREE.Quaternion().multiplyQuaternions(q2, q1.inverse());					// разница между Quaternions
	
	
	let arr_2 = ddGroup({obj: o1, tubePoint: true});
	
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
		if(arr_2[i].userData.wf_tube)
		{
			var point = arr_2[i].userData.wf_tube.point;
			
			for(var i2 = 0; i2 < point.length; i2++){ point[i2].position.add(pos); }
			
			updateTubeWF({tube: arr_2[i]});
		}
		else
		{
			arr_2[i].position.add(pos);
		}
	}			
	
	
	obj_1.updateMatrixWorld();
	var pos = o1.getWorldPosition(new THREE.Vector3());
	var q = o1.getWorldQuaternion(new THREE.Quaternion());
	
	if(infProject.settings.active.pg == 'pivot'){ var tools = infProject.tools.pivot; }	
	if(infProject.settings.active.pg == 'gizmo'){ var tools = infProject.tools.gizmo; }	
	
	tools.position.copy(pos);
	tools.quaternion.copy(q); 
}








