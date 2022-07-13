



// класс для присоединие разъема к другому разъему
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

		//this.ui_list = new UI_JoinConnector({el: document.querySelector('[nameId="rp_obj_align"]'), classObj: this});		
		
		this.assignEvent();	
	}
	
	assignEvent()
	{
		this.b_open.onmousedown = (event) => { this.start(); event.stopPropagation(); }
		this.b_close.onmousedown = () => { this.end(); activeObjRightPanelUI_1({obj: infProject.tools.pg.obj}); }		
		this.b_action.onmousedown = () => { addObjToGroup(); } 	
		
		this.b_detach.onmousedown = () => { detachObjGroup({obj: clickO.last_obj, active: true}); }			
		
		
		return;
		this.b_open.onmousedown = (event) => { this.start(event); }
		this.b_open2.onmousedown = (event) => { this.start(event); }
		this.b_close.onmousedown = () => { this.end(); activeObjRightPanelUI_1({obj: infProject.tools.pg.obj}); }
		this.b_action.onmousedown = () => { this.connectObj(); }
	}
	
	
	// вкл возможность создавать группу
	start()
	{
		setRayhitStop(true);
		this.b_close.style.borderColor = "#0000ff";

		this.container.onmousedown = (event) => this.clickOnScene({event});	
		
		infProject.ui.rpanel.InfObj.hide();
		infProject.ui.rpanel.InfObj.show({inf: ['jgroup']});		
	}
	
	// выкл возможность присоединить разъем к другому разъему
	end()
	{
		this.clearObj();
		//this.ui_list.clear();
		this.container.onmousedown = null;
		setRayhitStop(false);		
	}
	
	// кликаем в сцену, если попадаем на трубу/объект, то добавляем в список для присоединения в группу
	clickOnScene({event})
	{
		if(event.button != 0) return;
				
		
		let ray = rayIntersect( event, [...infProject.scene.array.tube, ...infProject.scene.array.obj], 'arr' );
		if(ray.length == 0) 
		{			
			//this.ui_list.clear();
			this.clearObj();
			return;
		}
		
		let obj = ray[0].object;
		
		// если кликнули, на главные объект, у которого активирован разъем для присоединения, от ничего не делаем
		if(infProject.tools.pg.arrO.findIndex(o => o == obj) > -1)
		{
			//this.ui_list.clear();
			return;			
		}

		if(this.arr.findIndex(o => o == obj) > -1)
		{
			//this.ui_list.clear();
			return;			
		}
		
		this.activeObj({obj});
		
		//this.ui_list.crListUI({obj: this.selectObj});
	
		
		this.render();
	}
	
		
	
	// активруем объект/трубу которую выбрали
	activeObj({obj})
	{
		let arr = ddGroup({obj, tubePoint: false})	

		this.arr.push(...arr);
		console.log(34343, [...infProject.tools.pg.arrO, ...this.arr]);
		outlinePass.selectedObjects = [...infProject.tools.pg.arrO, ...this.arr];

		this.render();
	}
			
	
	// нажали кнопку присоединить 
	connectObj()
	{
		let o1 = infProject.tools.pg.obj;

		this.render();
	}

	// снимаем выдиления с разъемов и очищаем список
	clearObj()
	{		
		outlinePass.selectedObjects = infProject.tools.pg.arrO;
		this.arr = [];
		
		this.render();
	}

	render()
	{
		renderCamera();
	}
}	










