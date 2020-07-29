


// добавляем структурированный каталог Json 
async function addObjInCatalogUI_1(cdm) 
{
	var flag = false;	// true = только объекты без групп
	
	if(flag)
	{		
		var url = infProject.path+'components_2/getListObjSql.php';
	}
	else
	{
		var url = infProject.path+'t/catalog_2.json';
	}
	
	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'select_list=id, name' ,
		headers: 
		{
			'Content-Type': 'application/x-www-form-urlencoded'
		},		
		
	});
	var json = await response.json();
	
	
	if(flag)
	{
		for(var i = json.length - 1; i > -1; i--)
		{
			json[i] = getItemChilds({json: json[i]});		
			
			json[i].elem.appendTo('[list_ui="catalog"]');
		}		
	}
	else
	{
		for(var i = 0; i < json.length; i++)
		{
			json[i] = getItemChilds({json: json[i]});		
			
			json[i].elem.appendTo('[list_ui="catalog"]');
		}		
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
			if(1==2)
			{
				var n = json.id;
				(function(n) 
				{
					json.elem.on('mousedown', function(e){ clickInterface({button: 'add_lotid', value: n}); e.stopPropagation(); }); 	
				}(n));				
			}
			
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
			
	}


	
}



