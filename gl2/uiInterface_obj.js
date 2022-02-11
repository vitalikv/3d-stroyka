


// кликнули на obj, wd (показываем нужное меню и заполняем input или скрываем меню)
function activeObjRightPanelUI_1(cdm) 
{	
	var el = document.querySelector('[nameId="wrap_object_1"]');
console.log(7777777, cdm);
	var bl_object_3d = document.querySelector('[nameId="bl_object_3d"]');
	var elButt_1 = document.querySelector('[nameId="pr_list_button_for_obj"]');
	var elButt_2 = document.querySelector('[nameId="pr_list_button_center_point"]');
	var elButt_3 = document.querySelector('[nameId="block_pos"]');
	var elButt_4 = document.querySelector('[nameId="pr_list_button_for_tube_point1"]');
	var elButt_5 = document.querySelector('[nameId="pr_list_button_for_tube_point2"]');		
	var elButt_6 = document.querySelector('[nameId="rp_bl_wf_tube"]');
	
	el.style.display = 'none';
	bl_object_3d.style.display = 'none';
	elButt_1.style.display = 'none';
	elButt_2.style.display = 'none';
	elButt_3.style.display = 'none';
	elButt_4.style.display = 'none';
	elButt_5.style.display = 'none';
	elButt_6.style.display = 'none';		
	
	
	if(!cdm) { cdm = {}; }  
	
	var obj = cdm.obj;
	
	if(!obj) return;
	
	if(obj.userData.tag == 'wf_point')
	{
		elButt_4.style.display = 'block';
		elButt_5.style.display = 'block';
		elButt_3.style.display = 'block';
	}	
	else if(obj.userData.tag == 'wf_tube')
	{	 
		elButt_6.style.display = 'block';
		elButt_1.style.display = 'block';
		elButt_3.style.display = 'block';
	}			
	else if(obj.userData.tag == 'obj')
	{	
		elButt_1.style.display = 'block';
		elButt_3.style.display = 'block';
		
		if( isCheckExsistFunction(window['getInfObjFromBD']) ) { getInfObjFromBD({obj: obj}); }; 		
	}
	else if(obj.userData.tag == 'joinPoint')
	{ 
		elButt_2.style.display = 'block';
		elButt_3.style.display = 'block';
	}
	else
	{
		return;
	}
	
	bl_object_3d.style.display = 'block';
	el.style.display = 'block';
	
}












// кликнули объект в сцене, создаем/показываем список группы (дочерних объектов) (правом меню UI)
function clickObjUI(cdm)
{
	if(!cdm) { cdm = {}; }	
	if(!cdm.obj) return;
	
	var obj = cdm.obj;
	
	var arrO = arrObjFromGroup({obj: obj});		// получаем все объекты группы, если нет группы -> получаем один объект
	
	var flag = true;	// если другая группа или объект, тогда очищаем список и создаем новый
	
	if(infProject.list.rp_ui.arr.length == arrO.length)
	{
		var arrO_2 = infProject.list.rp_ui.arr;
		var num = 0;
		
		for(var i = 0; i < arrO.length; i++)
		{
			for(var i2 = 0; i2 < arrO_2.length; i2++)
			{
				if(arrO[i] == arrO_2[i2].o) { num++; break; }
			}			
		}
		
		if(arrO.length == num) { flag = false; }
	}
	
	
	if(flag)
	{
		// очищаем список объектов UI
		clearItemSelectedObjUI();	
		
		let container = document.body.querySelector('[nameId="rp_obj_group"]');
		
		for(var i = 0; i < arrO.length; i++)
		{
			var num = infProject.list.rp_ui.arr.length;
			infProject.list.rp_ui.arr[num] = { o: arrO[i], el: null, p: [], p_vis: false };
			
			var tag = arrO[i].userData.tag;		
			
			// кнопка центрирование на объекте
			var htmlViewObj = 
			'<div nameId="sh_select_obj3D" style="margin-right: 5px; margin-left: auto; width: 10px; height: 20px;">\
				<div>\
					<svg height="100%" width="100%" viewBox="0 0 100 100">\
						<circle cx="50%" cy="50%" r="40" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
					</svg>\
				</div>\
			</div>';
			
			
			// получаем разъемы объекта или точки трубы
			{
				var arrP = [];
							
				if(tag == 'wf_tube')
				{
					arrP[0] = arrO[i].userData.wf_tube.point[0];
					arrP[1] = arrO[i].userData.wf_tube.point[arrO[i].userData.wf_tube.point.length - 1];				
				}
				else if(tag == 'obj')
				{ 
					arrP = getCenterPointFromObj_1(arrO[i]); 
				}

				var htmlTr = '';
				
				if(arrP.length > 0)
				{
					htmlTr = 
					'<div nameId="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
						<div>\
							<svg height="100%" width="100%" viewBox="0 0 100 100">\
								<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
							</svg>\
						</div>\
					</div>';			
				}				
			}
				

			if(tag == 'wf_tube')
			{
				var htmlTP = '';
				
				var html = 
				'<div class="right_panel_1_1_list_item">\
					<div class="flex_1 relative_1" style="margin: auto;">\
						'+htmlTr+'\
						<div class="right_panel_1_1_list_item_text" nameid="nameItem">'+arrO[i].userData.wf_tube.nameRus+'</div>\
						<div class="right_panel_1_1_list_item_color">\
							<input type="color" style="width: 25px; height: 10px; margin: auto; border: none; cursor: pointer;">\
						</div>\
						<div class="right_panel_1_1_list_item_text" item="value">'+arrO[i].userData.wf_tube.length+'м</div>\
						'+htmlViewObj+'\
					</div>\
					<div nameId="groupItem" style="display: none;">\
					</div>\
				</div>';
			} 
			else if(tag == 'obj')
			{
				var html = 
				'<div class="right_panel_1_1_list_item">\
					<div class="flex_1 relative_1" style="margin: auto;">\
						'+htmlTr+'\
						<div class="right_panel_1_1_list_item_text" nameid="nameItem">'+arrO[i].userData.obj3D.nameRus+'</div>\
						'+htmlViewObj+'\
					</div>\
					<div nameId="groupItem" style="display: none;">\
					</div>\
				</div>';			
			}			

					
			var div = document.createElement('div');
			div.innerHTML = html;
			let elem = div.firstChild;
			
			infProject.list.rp_ui.arr[num].el = elem;
			
			// клик на объект в меню
			container.append(elem);
			(function() 
			{  
				elem.onmousedown = function(e){ clickItemObjNameUI({el: this, clickItem: true}); e.stopPropagation(); };	
			}());			
			
			// замена цвета у трубы
			if(tag == 'wf_tube')
			{
				var obj = arrO[i];
				var colorTube = elem.querySelector('input[type="color"]');
				colorTube.value = '#'+obj.material.color.clone().getHexString();
								
				(function(obj) 
				{  					
					colorTube.onmousedown = function(e){ e.stopPropagation(); };
					colorTube.onchange = function(e){ changeColorTube({ obj: obj, value: this.value }); e.stopPropagation(); };					
				}(obj));							
			}
					
			
			// создаем событие по клику на кнопку центрирование на объекте
			var elem_2 = elem.querySelector('[nameId="sh_select_obj3D"]');
			var obj = arrO[i];
			(function(obj) 
			{
				elem_2.onmousedown = function(e)
				{ 			
					fitCameraToObject({obj: obj, rot: true});
					e.stopPropagation();
				};	
			}(obj));				
			

			
			// разъемы объекта или точки трубы
			if(arrP.length > 0)
			{
				// создаем событие -> показываем/скрываем список разъемов объекта
				let id = arrO[i].userData.id; 
				let el_2 = elem.querySelector('[nameId="shCp_1"]');
				var container_2 = elem.querySelector('[nameid="groupItem"]');

				(function(container_2, id) 
				{
					el_2.onmousedown = function(e){ clickRtekUI_1({elem_2: container_2, id: id}); e.stopPropagation(); };	
				}(container_2, id));


				// создаем html пункты для разъемов и создаем событие по клику на разъем
				for(var i2 = 0; i2 < arrP.length; i2++)
				{				
					//if(!arrCP[i2].userData.centerPoint) continue;
					var nameRus = '';
					
					if(arrP[i2].userData.centerPoint){ nameRus = arrP[i2].userData.centerPoint.nameRus; }
					else if(arrP[i2].userData.wf_point){ nameRus = arrP[i2].userData.wf_point.nameRus; }
					else { continue; }
					
					var html = 
					'<div class="flex_1 right_panel_1_1_list_item relative_1">\
					<div class="right_panel_1_1_list_item_text" nameId="nameItem">'+nameRus+'</div>\
					</div>';				

					var div = document.createElement('div');
					div.innerHTML = html;
					let el_3 = div.firstChild;

					infProject.list.rp_ui.arr[num].p[infProject.list.rp_ui.arr[num].p.length] = { o: arrP[i2], el: el_3 };
					
					container_2.append(el_3);
					el_3.onmousedown = function(e){ clickItemObjNameUI({el: this, clickItem: true}); e.stopPropagation(); };
				}								
			}
		}		
	}
	
	// выделяем в меню
	clickItemObjNameUI({obj: cdm.obj});		
}


// кликнули на треугольник в меню объекты (показываем/скрываем разъемы этого объекта)
function clickRtekUI_1(cdm)
{
	var display = cdm.elem_2.style.display;
	
	var display = (display == 'none') ? 'block' : 'none';
	
	cdm.elem_2.style.display = display;
	
	var parentEl = cdm.elem_2.parentElement;	

	if(display == 'block') 
	{ 
		var flag = false;
		if(clickO.last_obj)
		{
			if(clickO.last_obj.userData.id == cdm.id) { flag = true; }
		}
		
		if(flag) 
		{
			parentEl.style.backgroundColor = infProject.listColor.activeItem_1;
		}
		else
		{
			parentEl.style.backgroundColor = '#ebebeb';
		}		
	}
	else 
	{ 
		var flag = false;
		if(clickO.last_obj)
		{
			if(clickO.last_obj.userData.id == cdm.id) { flag = true; }
		}
		
		if(flag) 
		{
			parentEl.style.backgroundColor = infProject.listColor.activeItem_1;
		}
		else
		{
			parentEl.style.backgroundColor = '#ffffff';
		}
	}	
}







// удаляем список объектов UI
function clearItemSelectedObjUI()
{
	var list = infProject.list.rp_ui.arr;
	
	for(var i = 0; i < list.length; i++)
	{
		list[i].el.remove();
		
		for(var i2 = 0; i2 < list[i].p.length; i2++)
		{
			list[i].p[i2].el.remove();
		}
	}		

	infProject.list.rp_ui = { arr: [] };		
}






// выбираем группу или объект
function clickItemObjNameUI(cdm)
{	
	var item = null;
	var obj = null;
	var list = infProject.list.rp_ui.arr;
	
	console.log(cdm);
	
	// снимаем старые выдиления
	{		
		for(var i = 0; i < list.length; i++)
		{
			list[i].el.style.backgroundColor = '#ffffff';
			
			for(var i2 = 0; i2 < list[i].p.length; i2++)
			{
				list[i].p[i2].el.style.backgroundColor = '#ffffff';
				list[i].p[i2].o.material = infProject.material.pointObj.default;
			}
		}
	}		
	
	if(cdm.button)
	{
		var obj = getObjFromPivotGizmo();
		if(obj) cdm.obj = obj; 
	}	
	
	if(cdm.el)		// кликнули на пункт в меню
	{
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].el == cdm.el){ obj = list[i].o; break; } 
			
			for(var i2 = 0; i2 < list[i].p.length; i2++)
			{
				if(list[i].p[i2].el == cdm.el){ obj = list[i].p[i2].o; break; }
			}			
		}		
		
		item = cdm.el;
	}
	else if(cdm.obj)	// кликнули на объект в сцене
	{ 
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].o == cdm.obj){ item = list[i].el; break; } 
			
			for(var i2 = 0; i2 < list[i].p.length; i2++)
			{
				if(list[i].p[i2].o == cdm.obj){ item = list[i].p[i2].el; break; }
			}			
		}
		
		obj = cdm.obj;
	}
	else if(cdm.item !== undefined)	// присылаем номер пункта, который хотим выделить 
	{
		item = list[cdm.item].el;
		obj = list[cdm.item].o;
	}
	else
	{
		return;
	}


	// кликнули не в сцену на объект, а на пункт в меню (скрываем разъемы старого объекта)
	if(cdm.clickItem)
	{
		hideMenuObjUI_2D();		
	}
	
	  
	// делаем цвет всех объектов группы по default и сварачиваем открытые вложения 
	if(infProject.settings.active.group) 	
	{ 
		for(var i = 0; i < list.length; i++)
		{
			list[i].el.style.backgroundColor = '#ffffff';
			
			var el_1 = list[i].el.querySelector('[nameId="groupItem"]');
			
			if(el_1)
			{
				el_1.style.display = 'none';
			}
		}
	}
	
	if(!item) return;
	if(!obj) return;

	// меняем цвет у выделеной вкладки
	item.style.backgroundColor = infProject.listColor.activeItem_1;
	

	if(obj.userData.obj3D) 
	{ 
		infProject.elem.rp_obj_name.value = obj.userData.obj3D.nameRus;  
	}
	else if(obj.userData.wf_tube) 
	{ 
		infProject.elem.rp_obj_name.value = obj.userData.wf_tube.nameRus;  
	}
	else if(obj.userData.wf_point) 
	{ 
		infProject.elem.rp_obj_name.value = obj.userData.wf_point.nameRus; 

		var parent = obj.userData.wf_point.tube;
		
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].o == parent)
			{ 
				list[i].el.style.backgroundColor = '#ebebeb';
				
				var el_1 = list[i].el.querySelector('[nameId="groupItem"]');
				
				if(el_1)
				{
					el_1.style.display = 'block';
				}
				
				break; 
			} 					
		}		
	}	
	else if(obj.userData.centerPoint)
	{		
		infProject.elem.rp_obj_name.value = obj.userData.centerPoint.nameRus;
		
		var parent = obj.parent;
		
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].o == parent)
			{ 
				list[i].el.style.backgroundColor = '#ebebeb';
				
				var el_1 = list[i].el.querySelector('[nameId="groupItem"]');
				
				if(el_1)
				{
					el_1.style.display = 'block';
				}
				
				break; 
			} 					
		}		
	}
	
	if(!cdm.obj) 
	{
		if(obj.userData.obj3D || obj.userData.centerPoint)
		{
			clickObject3D(obj, {outline: true});
		}
		else if(obj.userData.wf_tube)
		{
			clickTubeWF({obj: obj});
		}
		else if(obj.userData.wf_point)
		{
			clickWFPoint_3D({obj: obj});
		}		
	} 

	showHideJP();
	renderCamera();
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




