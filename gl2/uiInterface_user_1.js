





infProject.elem.mainMenu = {};

infProject.elem.mainMenu.g = document.querySelector('[nameId="background_main_menu"]');
infProject.elem.mainMenu.close = document.querySelector('[nameId="button_close_main_menu"]');
infProject.elem.mainMenu.wind = document.querySelector('[nameId="window_main_menu"]');

// блокируем все что находится за фоном меню
infProject.elem.mainMenu.g.addEventListener('mousedown', function(e) { infProject.elem.mainMenu.g.style.display = 'none'; e.stopPropagation(); });
infProject.elem.mainMenu.g.addEventListener('wheel', function(e) { e.stopPropagation(); });
infProject.elem.mainMenu.g.addEventListener('DOMMouseScroll', function(e) { e.stopPropagation(); });
infProject.elem.mainMenu.g.addEventListener('mousewheel', function(e) { e.stopPropagation(); });


infProject.elem.mainMenu.close.onmousedown = function(e){ infProject.elem.mainMenu.g.style.display = 'none'; }
infProject.elem.mainMenu.wind.onmousedown = function(e){ e.stopPropagation(); }


// открываем меню 
infProject.elem.mainMenu.m1 = document.querySelector('[nameId="butt_main_menu"]');
infProject.elem.mainMenu.m1.onmousedown = function(e){ infProject.elem.mainMenu.g.style.display = 'block'; } 


// кнопки разделов
infProject.elem.mainMenu.m2 = document.querySelector('[nameId="reset_scene_1"]');
infProject.elem.mainMenu.m3 = document.querySelector('[nameId="button_main_menu_reg_1"]');
infProject.elem.mainMenu.m4 = document.querySelector('[nameId="button_load_1"]');
infProject.elem.mainMenu.m5 = document.querySelector('[nameId="button_save_1"]');
infProject.elem.mainMenu.m6 = document.querySelector('[nameId="button_help"]');
infProject.elem.mainMenu.m7 = document.querySelector('[nameId="button_contact"]');

// контейнеры разделов
infProject.elem.mainMenu.b3 = document.querySelector('[wwm_1="button_main_menu_reg_1"]');
infProject.elem.mainMenu.b4 = document.querySelector('[wwm_1="button_load_1"]');
infProject.elem.mainMenu.b5 = document.querySelector('[wwm_1="button_save_1"]');
infProject.elem.mainMenu.b6 = document.querySelector('[wwm_1="button_help"]');
infProject.elem.mainMenu.b7 = document.querySelector('[wwm_1="button_contact"]');


// переключаем кнопки разделов
infProject.elem.mainMenu.m2.onmousedown = function(e){ resetScene(); infProject.elem.mainMenu.g.style.display = 'none'; }
infProject.elem.mainMenu.m3.onmousedown = function(e){ changeMainMenuUI({el: this}); } 
infProject.elem.mainMenu.m4.onmousedown = function(e){ changeMainMenuUI({el: this}); } 
infProject.elem.mainMenu.m5.onmousedown = function(e){ changeMainMenuUI({el: this}); } 
infProject.elem.mainMenu.m6.onmousedown = function(e){ changeMainMenuUI({el: this}); } 
infProject.elem.mainMenu.m7.onmousedown = function(e){ changeMainMenuUI({el: this}); } 
	



// переключаем разделы
function changeMainMenuUI(cdm)
{
	var q = [];
	
	q[q.length] = infProject.elem.mainMenu.m3;
	q[q.length] = infProject.elem.mainMenu.m4;
	q[q.length] = infProject.elem.mainMenu.m5;
	q[q.length] = infProject.elem.mainMenu.m6;
	q[q.length] = infProject.elem.mainMenu.m7;
	
	var b = [];
	
	b[b.length] = infProject.elem.mainMenu.b3;
	b[b.length] = infProject.elem.mainMenu.b4;
	b[b.length] = infProject.elem.mainMenu.b5;
	b[b.length] = infProject.elem.mainMenu.b6;
	b[b.length] = infProject.elem.mainMenu.b7;
	
	
	for ( var i = 0; i < q.length; i++ )
	{
		if(q[i] == cdm.el) { b[i].style.display = 'block'; continue; }  		
	
		b[i].style.display = 'none';	
	}	
}



document.querySelector('[nameId="button_check_reg_1"]').onmousedown = function(e){ changeMainMenuRegistMenuUI({el: this}); }
document.querySelector('[nameId="button_check_reg_2"]').onmousedown = function(e){ changeMainMenuRegistMenuUI({el: this}); }	


// переключаем в главном меню в форме регистрация кнопки: вход/регистрация
function changeMainMenuRegistMenuUI(cdm)
{
	var inf_block = document.querySelector('[nameId="info_reg_1"]');
	var inf_str_1 = document.querySelector('[nameId="info_reg_1_1"]');
	var inf_str_2 = document.querySelector('[nameId="info_reg_1_2"]');
	
	inf_block.style.display = 'none';
	inf_str_1.style.display = 'none';
	inf_str_2.style.display = 'none';		

	var el = document.querySelector('[nameId="act_reg_1"]');
	
	if(cdm.el.attributes.nameId.value == "button_check_reg_1") 
	{
		el.innerText = 'Войти';
		el.setAttribute("b_type", "reg_1"); 
	}
	if(cdm.el.attributes.nameId.value == "button_check_reg_2") 
	{
		el.innerText = 'Зарегистрироваться';
		el.setAttribute("b_type", "reg_2");
	}	
}



// получаем с сервера список проектов принадлежащих пользователю
function getListProject(cdm)
{  
	$.ajax
	({
		type: "POST",					
		url: infProject.path+'components/loadListProject.php',
		data: {"id": cdm.id },
		dataType: 'json',
		success: function(data)
		{  
			var html_load = '';
			var html_save = '';
			
			for(var i = 0; i < 2; i++)
			{
				if(data[i]) continue;
				
				data[i] = {id: 0, name: 'Пустой проект'}
			}
			
			for(var i = 0; i < data.length; i++)
			{				
				if(data[i].preview) 
				{
					html_save += '<div class="window_main_menu_content_block_1" projectId="'+data[i].id+'" nameId="save_pr_1"><img src="'+data[i].preview+'"></div>';
					html_load += '<div class="window_main_menu_content_block_1" projectId="'+data[i].id+'" nameId="load_pr_1"><img src="'+data[i].preview+'"></div>';
				}
				else
				{
					html_save += '<div class="window_main_menu_content_block_1" projectId="'+data[i].id+'" nameId="save_pr_1">'+data[i].name+'</div>';
					html_load += '<div class="window_main_menu_content_block_1" projectId="'+data[i].id+'" nameId="load_pr_1">'+data[i].name+'</div>';					
				}
			}

			var b_load = document.querySelector('[nameId="wm_list_load"]');
			var b_save = document.querySelector('[nameId="wm_list_save"]');
			
			b_load.innerHTML = html_load;
			b_save.innerHTML = html_save;

			var arrLoadEl = b_load.querySelectorAll('[nameId="load_pr_1"]');
			var arrSaveEl = b_save.querySelectorAll('[nameId="save_pr_1"]');
		
			arrLoadEl.forEach(function(el) 
			{
				el.addEventListener('mousedown', function(e) { clickButtonLoadProjectUI(this); });
			});	

			arrSaveEl.forEach(function(el) 
			{
				el.addEventListener('mousedown', function(e) { clickButtonSaveProjectUI(this); });
			});				
			
			//b_load.querySelector('[nameId="load_pr_1"]').onmousedown = function(e){ clickButtonLoadProjectUI(this); }
			//b_save.querySelector('[nameId="save_pr_1"]').onmousedown = function(e){ clickButtonSaveProjectUI(this); }
		}
	});	
}



// кликнули на кнопку сохранить проекта
function clickButtonSaveProjectUI(el)
{
	saveFile({id: el.attributes.projectid.value, upUI: true}); 
	
	infProject.elem.mainMenu.g.style.display = 'none';
}



// кликнули на кнопку загрузки проекта
function clickButtonLoadProjectUI(el)
{
	loadFile({id: el.getAttribute("projectId")}); 
	
	infProject.elem.mainMenu.g.style.display = 'none';
}


