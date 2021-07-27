


// добавляем структурированный каталог Json 
async function addObjInCatalogUI_1(cdm) 
{
	var flag = false;	// true = только объекты без групп
	
	if(flag)
	{		
		var url = infProject.path+'components_2/getListObjSql.php';
		var table = infProject.settings.BD.table.list_obj;				
		
		var response = await fetch(url, 
		{
			method: 'POST',
			body: 'table='+table+'&select_list=id, name',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },				
		});
		var json = await response.json();		
	}
	else
	{
		var url = infProject.path+'t/catalog_2.json';
		
		var response = await fetch(url);
		var json = await response.json();		
	}
	

	var container = document.body.querySelector('[list_ui="catalog"]');
	
	if(flag)
	{
		for(var i = json.length - 1; i > -1; i--)
		{
			json[i] = getItemChilds({json: json[i]});		
			
			container.append(json[i].elem);
		}		
	}
	else
	{
		for(var i = 0; i < json.length; i++)
		{
			json[i] = getItemChilds({json: json[i]});		
			
			container.append(json[i].elem);
		}		
	}
	
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[0].niz);
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[1].niz);
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[2].niz);
	
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[0].verh);	
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[1].verh);
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[2].verh);
	
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[0].bok);
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[1].bok);
	addElemItemSborka_UI_1(infProject.list.sborka.radiator[2].bok);

	addElemItemSborka_UI_1(infProject.list.sborka.zr_nasos[0]);
	
	
	// находим дочерние объекты 
	function getItemChilds(cdm)
	{
		var json = cdm.json;
		
		if(json.id != 'group') 	// это объект, а не группа
		{
			var str_button = 
			'<div nameId="sh_select_obj3D" style="margin-right: 5px; margin-left: auto; width: 20px; height: 20px;">\
				<img src="'+infProject.path+'/img/look.png" style="display: block; height: 95%; margin: auto; -o-object-fit: contain; object-fit: contain;">\
			</div>';
			
			var html = 
			'<div class="right_panel_1_1_list_item">\
				<div class="flex_1 relative_1">\
					<div class="right_panel_1_1_list_item_text">'+json.name.toLowerCase() +'</div>\
					'+str_button+'\
				</div>\
			</div>';			
			
			var div = document.createElement('div');
			div.innerHTML = html;
			var elem = div.firstChild;
			
			json.elem = elem;

			// при клике добавляем объект в сцену
			var n = json.id;
			(function(n) 
			{
				elem.onmousedown = function(e)
				{ 
					clickItemFocusUI_1({el: elem});
					clickInterface({button: 'add_lotid', value: n}); 
					e.stopPropagation(); 
				};	
			}(n));

			// назначаем событие при клике на лупу UI
			var elem_2 = elem.querySelector('[nameId="sh_select_obj3D"]');
			(function(n) 
			{
				elem_2.onmousedown = function(e)
				{ 
					clickItemFocusUI_1({el: elem});
					activeCameraView({lotid: n});
					e.stopPropagation();
				};	
			}(n));			
		}
		else
		{
			var groupItem = '';

			var str_button = 
			'<div nameId="shCp_1" class="shCp_1" style="margin-left: 5px; width: 10px; height: 20px;">\
				<svg height="100%" width="100%" viewBox="0 0 100 100">\
					<polygon points="0,0 100,0 50,100" style="stroke:#000000; stroke-width:4" />\
				</svg>\
			</div>';				
			
			var valueId = '';
			
			if(json.valueId == 'sborka_rad_1') { valueId = 'valueId="sborka_rad_1"'; }
			
			var html = 
			'<div class="right_panel_1_1_list_item" style="top:0px; left:0px;">\
				<div class="flex_1 relative_1" style="margin: auto;">\
					'+str_button+'\
					<div class="right_panel_1_1_list_item_text" nameid="nameItem">'+json.name+'</div>\
				</div>\
				<div nameId="groupItem" '+valueId+' style="display: none;">\
					'+groupItem+'\
				</div>\
			</div>';
			
			var div = document.createElement('div');
			div.innerHTML = html;
			var elem = div.firstChild;
			
			json.elem = elem; 
			
			// назначаем кнопки треугольник событие
			var el_2 = elem.querySelector('[nameId="shCp_1"]');
			var el_3 = elem.querySelector('[nameId="groupItem"]');
			var num = 0;
			(function(num) 
			{
				el_2.onmousedown = function(e){ clickRtekUI_2({elem: this, elem_2: el_3}); e.stopPropagation(); };	
			}(num));			
			
			var container = json.elem.querySelector('[nameid="groupItem"]');
			
			for ( var i = 0; i < json.child.length; i++ )
			{
				json.child[i] = getItemChilds({json: json.child[i]});
				
				container.append(json.child[i].elem);
			}			
		}
		
		return json;
	}	
}



// добавляем item сборки в UI catalog
function addElemItemSborka_UI_1(cdm)
{	
	var str_button = 
	'<div nameId="sh_select_obj3D" style="margin-right: 5px; margin-left: auto; width: 20px; height: 20px;">\
		<img src="'+infProject.path+'/img/look.png" style="display: block; height: 95%; margin: auto; -o-object-fit: contain; object-fit: contain;">\
	</div>';
	
	var html = 
	'<div class="right_panel_1_1_list_item">\
		<div class="flex_1 relative_1">\
			<div class="right_panel_1_1_list_item_text">'+cdm.ui.catalog.name+'</div>\
			'+str_button+'\
		</div>\
	</div>';			
	
	var div = document.createElement('div');
	div.innerHTML = html;
	var elem = div.firstChild;
	
	//json.elem = elem;

	// при клике добавляем объект в сцену	
	(function() 
	{
		elem.onmousedown = function(e)
		{ 
			clickItemFocusUI_1({el: elem});
			clickInterface({button: 'add_group_obj', value: cdm}); 
			e.stopPropagation(); 
		}	  
	}());

	// назначаем событие при клике на лупу UI
	var elem_2 = elem.querySelector('[nameId="sh_select_obj3D"]');
	(function() 
	{
		elem_2.onmousedown = function(e)
		{ 
			clickItemFocusUI_1({el: elem});
			activeCameraView({sborka: true, inf: cdm});
			e.stopPropagation();
		};	
	}());			
	
	
	
	//var container = document.body.querySelector('[list_ui="catalog"]');	
	var container = document.body.querySelector('[valueId="sborka_rad_1"]');
	
	if(cdm.ui.catalog.parent)
	{
		var container = document.body.querySelector(cdm.ui.catalog.parent);
	}
	
	container.append(elem);
}




// кликнули на item catalog, выделфем этот пункт меню
function clickItemFocusUI_1(cdm) 
{
	let elNew = cdm.el;
	let el = infProject.ui.cat_item_active;
	
	if(el) el.style.backgroundColor = '#ffffff';
	
	elNew.style.backgroundColor = infProject.listColor.activeItem_1;
	infProject.ui.cat_item_active = elNew;
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






