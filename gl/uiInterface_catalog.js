


// добавляем структурированный каталог Json 
async function addObjInCatalogUI_1(cdm) 
{
	var url = infProject.path+'t/catalog_2.json';
	
	var arr = [];
	
	var response = await fetch(url, { method: 'GET' });
	var json = await response.json();
	
	
	for(var i = 0; i < json.length; i++)
	{
		json[i] = getItemChilds({json: json[i]});		
		
		json[i].elem.appendTo('[list_ui="catalog"]');
	}
	
	console.log(json);
	
	// находим дочерние объекты 
	function getItemChilds(cdm)
	{
		var json = cdm.json;
		
		if(json.id != 'group') 
		{
			json.html = 
			'<div class="right_panel_1_1_list_item" add_lotid="'+json.id+'" style="top:0px; left:0px">\
				<div class="right_panel_1_1_list_item_text">'
				+json.name+
				'</div>\
			</div>';
			
			json.elem = $(json.html);

			var n = json.id;
			(function(n) 
			{
				json.elem.on('mousedown', function(e){ clickInterface({button: 'add_lotid', value: n}); e.stopPropagation(); });	
			}(n));			
		}
		else
		{
			var groupItem = '';

			var str_button = 
			'<div nameId="shCp_1" style="display: block; width: 10px; height: 10px; margin: auto 0;">\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>';
				
			json.html = 
			'<div class="right_panel_1_1_list_item" add_lotid="'+json.id+'" style="top:0px; left:0px;">\
				<div class="flex_1 relative_1" style="margin: auto;">\
					<div class="right_panel_1_1_list_item_text" nameid="nameItem">'+json.name+'</div>\
					'+str_button+'\
				</div>\
				<div nameId="groupItem" style="display: none;">\
					'+groupItem+'\
				</div>\
			</div>';
			
			json.elem = $(json.html); 

			// кликаем по названию объекта
			var n = json.id;
			(function(n) 
			{
				json.elem.on('mousedown', function(e){ clickInterface({button: 'add_lotid', value: n}); e.stopPropagation(); }); 	
			}(n));

			
			// назначаем кнопки треугольник событие
			var el_2 = $(json.elem[0].querySelector('[nameId="shCp_1"]'));
			var el_3 = json.elem[0].querySelector('[nameId="groupItem"]');
			var num = 0;
			(function(num) 
			{
				el_2.on('mousedown', function(e){ clickRtekUI_2({elem: this, elem_2: el_3}); e.stopPropagation(); });	
			}(num));

			
			
			var container = json.elem[0].querySelector('[nameid="groupItem"]');
			
			for ( var i = 0; i < json.child.length; i++ )
			{
				json.child[i] = getItemChilds({json: json.child[i]});
				
				json.child[i].elem.appendTo(container);
			}			
		}
		
		return json;
	}	
}





// кликнули на треугольник в меню  группы объекты (показываем/скрываем разъемы этого объекта)
function clickRtekUI_2(cdm)
{
	console.log(cdm, cdm.elem_2.style.display);
	
	var display = cdm.elem_2.style.display;
	
	var display = (display == 'none') ? 'block' : 'none';
	
	cdm.elem_2.style.display = display;
	
	var parentEl = cdm.elem_2.parentElement;	

	if(display == 'block') { parentEl.style.backgroundColor = '#ebebeb'; }
	else { parentEl.style.backgroundColor = '#ffffff'; }
	
}





if(1==2)
{

// добавляем группы в каталог
function addGroupInCatalogUI_x1()
{	
	var groupItem = [];
	
	groupItem[0] = {nameId: 'catalog_group_item_kran_1', nameRus: 'краны'};
	groupItem[1] = {nameId: 'catalog_group_item_radiator', nameRus: 'радиаторы'};
	groupItem[2] = {nameId: 'catalog_group_item_collector', nameRus: 'коллектора'};
	groupItem[3] = {nameId: 'catalog_group_item_mt_plas', nameRus: 'металлопластик'};
	groupItem[4] = {nameId: 'catalog_group_item_pliprop', nameRus: 'полипропилен'};
	groupItem[5] = {nameId: 'catalog_group_item_metall', nameRus: 'металл'};
	
	for(var i = 0; i < groupItem.length; i++)
	{

		var str_button = 
		'<div nameId="shCp_1" style="width: 40px; height: 20px;">\
			<div style="position: absolute; width: 15px; height: 10px; right: 20px;">\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>\
		</div>';				
		
		
		var str = 
		'<div>\
			<div class="right_panel_1_1_list_item">\
				<div class="flex_1 relative_1">\
					<div class="right_panel_1_1_list_item_text">'+groupItem[i].nameRus+'</div>\
					'+str_button+'\
				</div>\
				<div nameId="'+groupItem[i].nameId+'" style="display: none;"></div>\
			</div>\
		</div>';


		var el = $(str).appendTo('[list_ui="catalog"]');		
		//el.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });
		
		var num = infProject.list.group_catalog_ui.arr.length;
		
		// назначаем кнопки треугольник событие
		var el_2 = $(el[0].querySelector('[nameId="shCp_1"]'));
		var el_3 = el[0].querySelector('[nameId="'+groupItem[i].nameId+'"]');
		(function(num) 
		{
			el_2.on('mousedown', function(e){ clickRtekUI_2({id: num}); e.stopPropagation(); });	
		}(num));


		infProject.list.group_catalog_ui.arr[num] = { el: $(el_3), showlist: false };
	}	
}



function addGroupInCatalogUI_x2()
{	
	var groupItem = [];
	
	groupItem[0] = {parentName: 'catalog_group_item_collector', nameId: 'catalog_group_item_collector_1', nameRus: 'коллектора'};
	groupItem[1] = {parentName: 'catalog_group_item_mt_plas', nameId: 'catalog_group_item_mp_troinik_press_1', nameRus: 'тройники (пресс)'};
	groupItem[2] = {parentName: 'catalog_group_item_mt_plas', nameId: 'catalog_group_item_mp_ugol_press_1', nameRus: 'угол (пресс)'};
	groupItem[3] = {parentName: 'catalog_group_item_radiator', nameId: 'catalog_group_item_radiator_al_1', nameRus: 'алюминиевые'};
	groupItem[4] = {parentName: 'catalog_group_item_radiator', nameId: 'catalog_group_item_radiator_st_1', nameRus: 'стальные'};
	groupItem[5] = {parentName: 'catalog_group_item_kran_1', nameId: 'catalog_group_item_kran_sharov_1', nameRus: 'шаровые'};
	groupItem[6] = {parentName: 'catalog_group_item_kran_1', nameId: 'catalog_group_item_kran_regul_1', nameRus: 'регулеровачные'};
	
	
	for(var i = 0; i < groupItem.length; i++)
	{

		var str_button = 
		'<div nameId="shCp_1" style="width: 40px; height: 20px;">\
			<div style="position: absolute; width: 15px; height: 10px; right: 20px;">\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />\
				</svg>\
			</div>\
		</div>';				
		
		
		var str = 
		'<div>\
			<div class="right_panel_1_1_list_item">\
				<div class="flex_1 relative_1">\
					<div class="right_panel_1_1_list_item_text">'+groupItem[i].nameRus+'</div>\
					'+str_button+'\
				</div>\
				<div nameId="'+groupItem[i].nameId+'" style="display: none;">\
			</div>\
			</div>\
		</div>';



		var el = $(str).appendTo('[nameId="'+groupItem[i].parentName+'"]');		
		//el.on('mousedown', function(){ clickItemObjNameUI({el: $(this)}) });
		
		var num = infProject.list.group_catalog_ui.arr.length;
		
		// назначаем кнопки треугольник событие
		var el_2 = $(el[0].querySelector('[nameId="shCp_1"]'));
		var el_3 = el[0].querySelector('[nameId="'+groupItem[i].nameId+'"]');
		(function(num) 
		{
			el_2.on('mousedown', function(e){ clickRtekUI_2({id: num}); e.stopPropagation(); });	
		}(num));


		infProject.list.group_catalog_ui.arr[num] = { el: $(el_3), showlist: false };
	}	
}



// кликнули на треугольник в меню  группы объекты (показываем/скрываем разъемы этого объекта)
function clickRtekUI_x2(cdm)
{
	var inf = infProject.list.group_catalog_ui.arr[cdm.id];
	
	inf.showlist = !inf.showlist;
	
	var display = (inf.showlist) ? 'block' : 'none';
	
	inf.el.css('display', display);


	var parentEl = $(inf.el[0].parentElement);	
	if(display == 'block') { parentEl.css('background', '#ebebeb'); }
	else { parentEl.css('background', '#ffffff'); }
}



	
}



