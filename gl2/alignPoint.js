



// присоединие разъема к другому разъему
class Obj_JoinConnector
{		
	constructor({container, b_open, b_open2, b_close, b_action})
	{
		this.container = container;
		this.b_open = b_open;
		this.b_open2 = b_open2;
		this.b_close = b_close;
		this.b_action = b_action;

		this.moveTube = false;
		this.arr = [];
		this.activeObj = null;
		this.activePoint = null;
		
		this.ui_list = new UI_JoinConnector({el: document.querySelector('[nameId="rp_obj_align"]')});		
		
		this.assignEvent();	
	}
	
	assignEvent()
	{
		this.b_open.onmousedown = (event) => { this.start(event); this.moveTube = false; }
		this.b_open2.onmousedown = (event) => { this.start(event); this.moveTube = true; }
		this.b_close.onmousedown = () => { this.end(); activeObjRightPanelUI_1({obj: infProject.tools.pg.obj}); }
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
	}
	
	// кликаем в сцену, если попадаем на трубу/объект, то показываем разъемы
	clickOnScene({event})
	{
		if(event.button != 0) return;
		
		if(this.arr.length == 0) { this.rayhitObj(); } 
		else { this.rayhitPoint(); }

		if(this.activeObj)
		{
			let arrItem = newCrListObj({arrO: [this.activeObj]});	
			this.ui_list.crListUI({arr: arrItem});
			if(this.activePoint) this.ui_list.selectObjScene({obj: this.activePoint});
		}
		
		this.render();
	}
	
	
	// кликаем в сцену, ищем объекты
	rayhitObj()
	{
		this.activeObj = null;
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

		// показываем разъемы
		for(let i = 0; i < arr.length; i++) arr[i].visible = true;

		this.activeObj = obj;
		this.arr = arr;		
	}
	
	
	// кликаем в сцену, ищем разъемы
	rayhitPoint()
	{		
		if(this.activePoint) 
		{
			this.activePoint.material = infProject.material.pointTube.default;
			this.activePoint = null;
		}		
		
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
			if(this.moveTube){ alignObjPointToObjPoint({o1, o2, qt: false}); }
			else { alignTubePointToPoint({o1, o2}); } 			
		}
		else if(o1.userData.tag == 'joinPoint')
		{ 
			if(o2.userData.tag == 'wf_point') alignObjPointToObjPoint({o1, o2, qt: false}); 
			if(o2.userData.tag == 'joinPoint') alignObjPointToObjPoint({o1, o2, qt: true});
		}
		

		this.render();
	}

	// снимаем выдиления с разъемов и очищаем список
	clearObj()
	{		
		for(let i = 0; i < this.arr.length; i++) 
		{
			this.arr[i].visible = false;
			this.arr[i].material = infProject.material.pointObj.default;
		}

		this.arr = [];
		this.activeObj = null;
		this.activePoint = null;
		
		this.ui_list.clear();
		
		this.render();
	}

	render()
	{
		renderCamera();
	}
}	



class UI_JoinConnector
{
	el = null;
		
	constructor({el})
	{
		this.el = el;
		this.activeItem = null;
		this.arr = [];
	}
	
	crListUI({arr})
	{
		this.clear();
		
		this.arr = arr;
		
		for (let i = 0; i < arr.length; i++)
		{			
			let html = this.html(arr[i]);	

			let elem = document.createElement('div');
			elem.innerHTML = html;
			elem = elem.firstChild;

			this.el.append(elem);
			
			this.arrAddElem({id: i, elem: elem});
			
			this.initEvents({id: i, elem: elem});
		}
	}
	
	html({name, childs = []})
	{
		let str = 
		'<div class="right_panel_1_1_list_item" nameId="obj" style="background: #ebebeb;">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				'+this.htmlTr({childs: childs})+'\
				<div class="right_panel_1_1_list_item_text">'+name+'</div>\
			</div>\
			'+this.htmСhilds({childs})+'\
		</div>';

		return str;
	}


	// треугольник, кликнув на него показываем/скрываем разъемы этого объекта
	htmlTr({childs})
	{		
		let str = '';
		
		if(childs.length > 0)
		{
			str = 
			'<div nameId="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
				<div>\
					<svg height="100%" width="100%" viewBox="0 0 100 100">\
						<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
					</svg>\
				</div>\
			</div>';				
		}
		
		return str;
	}
		


	// разъемы объекта
	htmСhilds({childs})
	{	
		if(childs.length == 0) return '';

		let items = '';
		
		for (let i = 0; i < childs.length; i++)
		{
			items += 
			'<div class="flex_1 right_panel_1_1_list_item relative_1" nameId="item">\
				<div class="right_panel_1_1_list_item_text">'+childs[i].name+'</div>\
			</div>';			
		}
					
		let str = '<div nameId="groupItem">'+items+'</div>';			
		
		return str;
	}
	
	
	// добавляем в массив elem
	arrAddElem({id, elem})
	{
		this.arr[id].elem = elem;				
		
		let arrEl = elem.querySelectorAll('[nameId="item"]');
		
		for (let i = 0; i < arrEl.length; i++)
		{
			this.arr[id].childs[i].elem = arrEl[i];
		}
	}
	
	initEvents({elem, id})
	{
		this.clickItem({elem: elem, id: id});
		this.visibleChilds({elem: elem});
	}
	
	
	// создаем событие -> кликнули на пункт объекта/разъема
	clickItem({elem, id})
	{
		let item = this.arr[id];
		
		let arr = [{elem: item.elem, callF: item.f}];
		
		if(item.childs)
		{
			for (let i = 0; i < item.childs.length; i++)
			{
				arr.push({elem: item.childs[i].elem, callF: item.childs[i].f});
			};					
		}
	
		for (let i = 0; i < arr.length; i++)
		{
			arr[i].elem.onmousedown = (e) => 
			{
				this.selectItem({elem: arr[i].elem, callF: arr[i].callF});
				e.stopPropagation(); 
			}
		};		
	}
	
	// создаем событие -> показываем/скрываем список разъемов объекта
	visibleChilds({elem})
	{
		let button = elem.querySelector('[nameId="shCp_1"]');
		if(!button) return;
		
		let div = elem.querySelector('[nameId="groupItem"]');

		button.onmousedown = (e) => 
		{ 
			div.style.display = (div.style.display == 'none') ? '' : 'none';
			
			let color = '#ffffff';
			
			if(elem == this.activeItem) color = infProject.listColor.activeItem_1;
			else if(div.style.display == 'none') color = '#ffffff';
			else if(div.style.display == '') color = '#ebebeb';
			
			elem.style.backgroundColor = color;
			
			e.stopPropagation(); 
		};		
	}
	
	
	// кликнули на пункт 
	selectItem({elem, callF = null})
	{
		//if(callF) callF();
		
		this.setResetColorItems();
		this.activeItem = elem;
		elem.style.backgroundColor = infProject.listColor.activeItem_1;
	}
	
	
	// кликнули на объект в сцене
	selectObjScene({obj})
	{
		let arr1 = this.arr;
		let arr2 = [];
		
		for (let i = 0; i < arr1.length; i++)
		{
			arr2.push({obj: arr1[i].obj, elem: arr1[i].elem, parent: null});
			
			if(arr1[i].childs)
			{
				for (let i2 = 0; i2 < arr1[i].childs.length; i2++)
				{
					arr2.push({obj: arr1[i].childs[i2].obj, elem: arr1[i].childs[i2].elem, parent: arr1[i].elem});
				}				
			}
		}			
		
		let item = {el: null, parent: null};
		
		for (let i = 0; i < arr2.length; i++)
		{
			if(arr2[i].obj !== obj) continue;
			
			item.el = arr2[i].elem;
			item.parent = arr2[i].parent;
			
			break;
		};

		if(!item.el) return;
		
		this.setResetColorItems();
		this.activeItem = item.el;
		item.el.style.backgroundColor = infProject.listColor.activeItem_1;
		
		
		if(item.parent)
		{
			item.parent.style.backgroundColor = '#ebebeb';			
			let div = item.parent.querySelector('[nameId="groupItem"]');
			div.style.display = '';
		}
	}	
	
	// сбросить выделение со всех пунктов
	setResetColorItems()
	{
		let objEl = this.el.querySelectorAll('[nameId="obj"]');
	
		for (let i = 0; i < objEl.length; i++)
		{
			let color = '#ffffff';
			let div = objEl[i].querySelector('[nameId="groupItem"]');
			
			if(div) color = (div.style.display == 'none') ? '#ffffff' : '#ebebeb';
			
			objEl[i].style.backgroundColor = color;
		};

		let childEl = this.el.querySelectorAll('[nameId="item"]');
	
		for (let i = 0; i < childEl.length; i++)
		{			
			childEl[i].style.backgroundColor = '#ffffff';
		};		
	}
	
	// очищаем список
	clear()
	{
		this.activeItem = null;
		this.arr = [];
		this.el.innerHTML = '';
	}	
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







// нажали кнопку выровнить, подтягиваем разъем с объектом/группой к выбранному разъему 
// o1 двигаем и присоединяем   
// o2 объект не трогаем, остается на месте
function alignObjPointToObjPoint({o1, o2, qt})
{ 	
	let arr_2 = ddGroup({obj: o1, tubePoint: true});
	
	if(qt)
	{
		if(o1.userData.tag == 'joinPoint') o1.parent.updateMatrixWorld();
		if(o2.userData.tag == 'joinPoint') o2.parent.updateMatrixWorld();	
		let q1 = o1.getWorldQuaternion(new THREE.Quaternion());
		let q2 = o2.getWorldQuaternion(new THREE.Quaternion());
		
		let q_New = q1.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)));	// разворачиваем на 180 градусов
		let q_Offset = new THREE.Quaternion().multiplyQuaternions(q2, q_New.inverse());							// разница между Quaternions


		// перемещаем и вращаем объекты, относительно точки-соединителя
		for(let i = 0; i < arr_2.length; i++)
		{
			//arr_2[i].position.sub(pos2);
			arr_2[i].position.applyQuaternion(q_Offset); 	
			//arr_2[i].position.add(pos2);
			
			arr_2[i].quaternion.premultiply(q_Offset);		// diff разницу умнажаем, чтобы получить то же угол	
			arr_2[i].updateMatrixWorld();				
		}		
	}
	
	// после вращения vector, обновляем положение точки-соединителя
	if(o1.userData.tag == 'joinPoint') o1.parent.updateMatrixWorld();
	if(o2.userData.tag == 'joinPoint') o2.parent.updateMatrixWorld();
	let pos1 = o1.getWorldPosition(new THREE.Vector3());		
	let pos2 = o2.getWorldPosition(new THREE.Vector3());
	let pos = new THREE.Vector3().subVectors( pos2, pos1 );
	
	
	for(let i = 0; i < arr_2.length; i++)
	{
		arr_2[i].position.add(pos);
	}			
	
	
	if(o1.userData.tag == 'joinPoint') o1.parent.updateMatrixWorld();
	infProject.tools.pg.setPosPivotGizmo({pos: o1.getWorldPosition(new THREE.Vector3())}); 
	infProject.tools.pg.setRotPivotGizmo({qt: o1.getWorldQuaternion(new THREE.Quaternion())});
}








