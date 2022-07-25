



// класс для присоединие объекта к группе
class Obj_JoinGroup
{		
	constructor({container, el_parent})
	{
		this.container = container;

		this.b_open = el_parent.querySelector('[nameId="button_active_add_group"]');
		this.b_close = el_parent.querySelector('[nameId="button_deactive_add_group"]');
		this.b_action = el_parent.querySelector('[nameId="button_add_group"]');
		
		this.b_detach = el_parent.querySelector('[nameId="button_detach_obj_group"]');
		
		this.arr = [];
		this.main = {};
		this.main.obj = null;
		this.main.arrO = [];
		
		this.ui_list = new UI_ListJoinGroup({el: el_parent.querySelector('[nameId="rp_add_group"]')});		
		
		this.assignEvent();	
	}
	
	assignEvent()
	{
		this.b_open.onmousedown = (event) => { this.start(); event.stopPropagation(); }
		this.b_close.onmousedown = () => { this.end(); }		
		this.b_action.onmousedown = () => { this.crGroup(); } 	// addObjToGroup();
		
		// удаляем один выбранный объект из группы (по кнопке)
		this.b_detach.onmousedown = () => { infProject.class.group.detachObjGroup({obj: infProject.tools.pg.obj, active: true}); }			
	}
	
	
	// вкл возможность создавать группу
	start()
	{
		setRayhitStop(true);
		this.b_close.style.borderColor = "#0000ff";

		this.container.onmousedown = (event) => this.clickOnScene({event});	
		
		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.show({inf: ['jgroup']});

		this.main.obj = infProject.tools.pg.obj;
		this.main.arrO = ddGetGroup({obj: this.main.obj, tubePoint: false});

		this.ui_list.crListUI({arrO: this.main.arrO});
	}
	
	// выкл возможность создавать группу
	end()
	{
		activeObjRightPanelUI_1({obj: this.main.obj});
		this.clearObj();
		this.container.onmousedown = null;
		setRayhitStop(false);
	}
	
	// кликаем в сцену
	clickOnScene({event})
	{
		if(event.button != 0) return;
				
		
		let ray = rayIntersect( event, [...infProject.scene.array.tube, ...infProject.scene.array.obj], 'arr' );
		if(ray.length == 0) 
		{			
			this.clearObj();
			return;
		}
		
		let obj = ray[0].object;
		
		// если кликнули на главные объект, от ничего не делаем
		if(this.main.arrO.findIndex(o => o == obj) > -1)
		{
			return;			
		}

		// если кликнули на объект, который уже находится в списке для присоединения
		if(this.arr.findIndex(o => o == obj) > -1)
		{
			this.removeObjFromList({obj});
			return;
		}
		
		this.activeObj({obj});
		
		this.render();
	}
	
	
	// убираем объект из списка для присоединения в группу
	removeObjFromList({obj})
	{
		let arr = ddGetGroup({obj, tubePoint: false});
		
		for(var i = 0; i < arr.length; i++)
		{
			deleteValueFromArrya({arr: this.arr, o: arr[i]});
		}
		
		outlinePass.selectedObjects = [...this.main.arrO, ...this.arr];
		
		this.ui_list.crListUI({arrO: outlinePass.selectedObjects});
		
		this.render();		
	}
		
	
	// добавляем объект/объекты в список для присоединения в группу
	activeObj({obj})
	{
		let arr = ddGetGroup({obj, tubePoint: false})	

		this.arr.push(...arr);
		
		outlinePass.selectedObjects = [...this.main.arrO, ...this.arr];

		this.ui_list.crListUI({arrO: outlinePass.selectedObjects});
		
		this.render();
	}
			
	
	// нажали кнопку сгруппировать, создаем новую группу 
	crGroup()
	{
		if(this.arr.length == 0) return;
		
		let arr = [...this.main.arrO, ...this.arr];
		// удалем группы у объектов, если они есть (чтобы потом можно было создать одну общую)
		this.removeGroup({arr});
		
		infProject.class.group.crGroup({arr});
		
		this.end(); 
	}
	

	
	// удалем объекты из группы и удалем группу (нужно чтобы объеденить эту группу с другими объектами)
	removeGroup({arr})
	{
		for(let i = 0; i < arr.length; i++) 
		{ 
			infProject.class.group.detachObjGroup({obj: arr[i]}); 
		}	
	}

	// снимаем выдиления с разъемов и очищаем список
	clearObj()
	{		
		outlinePass.selectedObjects = infProject.tools.pg.arrO;
		this.arr = [];
		this.main.obj = null;
		this.main.arrO = [];
		
		this.ui_list.clear();
		
		this.render();
	}

	render()
	{
		renderCamera();
	}
}	







// класс для создания списка присоединяемых объектов в группу
class UI_ListJoinGroup
{
	el = null;
		
	constructor({el})
	{
		this.el = el;
		this.arr = [];
	}
	
	crListUI({arrO})
	{
		this.clear();
		
		let arr = [];
		
		for (let i = 0; i < arrO.length; i++)
		{
			let item = {obj: arrO[i], name: ''};
			if(arrO[i].userData.obj3D) arr.push({obj: arrO[i], name: arrO[i].userData.obj3D.nameRus});
			if(arrO[i].userData.wf_tube) arr.push({obj: arrO[i], name: arrO[i].userData.wf_tube.nameRus});
			if(arrO[i].userData.tag == 'new_tube') arr.push({obj: arrO[i], name: arrO[i].userData.nameRus});
		}
		
		this.arr = arr;
		
		for (let i = 0; i < arr.length; i++)
		{			
			let html = this.html(arr[i]);	

			let elem = document.createElement('div');
			elem.innerHTML = html;
			elem = elem.firstChild;

			this.el.append(elem);
			
			this.arrAddElem({id: i, elem: elem});
		}
	}
	
	html({name})
	{
		let str = 
		'<div class="right_panel_1_1_list_item" nameId="obj" style="background: #ebebeb;">\
			<div class="flex_1 relative_1" style="margin: auto;">\
				<div class="right_panel_1_1_list_item_text">'+name+'</div>\
			</div>\
		</div>';

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
	

	// очищаем список
	clear()
	{
		this.arr = [];
		this.el.innerHTML = '';
	}	
}











