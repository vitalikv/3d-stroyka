





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
async function getListProject(cdm)
{ 

	var url = infProject.path+'components/loadListProject.php';			
	
	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'id='+cdm.id,
		headers: 
		{	
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
		},				
	});	

	if(!response.ok) return;
	var json = await response.json();
	
	
	var html_load = '';
	var html_save = '';
	
	for(var i = 0; i < 2; i++)
	{
		if(json[i]) continue;
		
		json[i] = {id: 0, name: 'Пустой проект'}
	}
	
	for(var i = 0; i < json.length; i++)
	{				
		if(json[i].preview) 
		{
			html_save += '<div class="window_main_menu_content_block_1" projectId="'+json[i].id+'" nameId="save_pr_1"><img src="'+json[i].preview+'"></div>';
			html_load += '<div class="window_main_menu_content_block_1" projectId="'+json[i].id+'" nameId="load_pr_1"><img src="'+json[i].preview+'"></div>';
		}
		else
		{
			html_save += '<div class="window_main_menu_content_block_1" projectId="'+json[i].id+'" nameId="save_pr_1">'+json[i].name+'</div>';
			html_load += '<div class="window_main_menu_content_block_1" projectId="'+json[i].id+'" nameId="load_pr_1">'+json[i].name+'</div>';					
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




document.querySelector('[nameId="act_reg_1"]').onmousedown = function(e){ checkRegDataIU(); }

// вход/регистрация пользователя (проверка правильности ввода данных почта/пароль)
async function checkRegDataIU()
{
	var pattern_1 = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
	var pattern_2 = /^[a-z0-9]{4,20}$/i;
	var mail = document.querySelector('[nameId="input_reg_mail"]');
	var pass = document.querySelector('[nameId="input_reg_pass"]');
	
	var inf_block = document.querySelector('[nameId="info_reg_1"]');
	var inf_str_1 = document.querySelector('[nameId="info_reg_1_1"]');
	var inf_str_2 = document.querySelector('[nameId="info_reg_1_2"]');
	
	inf_block.style.display = 'none';
	inf_str_1.style.display = 'none';
	inf_str_2.style.display = 'none';
	
	var flag_1 = false;
	var flag_2 = false;
	
	mail.value = mail.value.trim();	// удаляем пробелы  
	pass.value = pass.value.trim();	// удаляем пробелы 
	
	// проверка почты
	if(mail.value != '')
	{
		if(pattern_1.test(mail.value))
		{
			flag_1 = true;
		}
		else
		{
			inf_str_1.style.display = 'block';
			inf_str_1.innerText = 'Не верно указанна почта';			
		}
	}
	else
	{		
		inf_str_1.style.display = 'block';
		inf_str_1.innerText = 'Укажите e-mail';
	}
	
	
	// проверка пароля
	if(pass.value != '')
	{
		if(pattern_2.test(pass.value))
		{
			flag_2 = true;
		}
		else
		{
			inf_str_2.style.display = 'block';
			inf_str_2.innerHTML = 'Не верно указан пароль<br>(Только цифры и латинские буквы от 4 до 20 знаков)';			
		}
	}		
	else
	{		
		inf_str_2.style.display = 'block';
		inf_str_2.innerText = 'Укажите пароль';
	}
	
	
	// данные введены верно
	if(flag_1 && flag_2)
	{ 
		inf_block.style.display = 'none';
		
		//console.log();
		var type = document.querySelector('[nameId="act_reg_1"]').getAttribute("b_type");
		
		
		$.ajax
		({
			type: "POST",					
			url: infProject.path+'components/regUser.php',
			data: {"type": type, "mail": mail.value, "pass": pass.value},
			dataType: 'json',
			success: function(data)
			{  
				if(type=='reg_1')	// авторизация пользователя
				{
					if(data.success)
					{
						infProject.user.id = data.info.id;
						infProject.user.mail = data.info.mail;
						infProject.user.pass = data.info.pass;

						document.querySelector('[nameId="reg_content_1"]').style.display = 'block';
						document.querySelector('[nameId="reg_content_2"]').style.display = 'none';

						getListProject({id: infProject.user.id});
					}
					else
					{
						if(data.err.desc)
						{
							console.log(data.err.desc);
							inf_str_1.innerHTML = data.err.desc;
							
							inf_block.style.display = 'block';
							inf_str_1.style.display = 'block';
							inf_str_1.style.display = 'block';
							inf_str_2.style.display = 'none';													
						}
					}
				}
				else if(type=='reg_2')	// регистрация нового пользователя
				{
					if(data.success)
					{
						inf_str_1.innerHTML = "на вашу почту отправлено письмо<br>зайдите в вашу почту и подтвердите регистрацию<br>(если письмо не пришло посмотрите в папке спам)";
						//inf_str_1.innerHTML = "Вы успешно зарегистрировались";						
						
						inf_block.style.display = 'block';
						inf_str_1.style.display = 'block';
						inf_str_1.style.display = 'block';
						inf_str_2.style.display = 'none';												
					}
					else
					{						
						if(data.err.desc)
						{
							console.log(data.err.desc);
							inf_str_1.innerHTML = data.err.desc;
							
							inf_block.style.display = 'block';
							inf_str_1.style.display = 'block';
							inf_str_1.style.display = 'block';
							inf_str_2.style.display = 'none';													
						}						
					}
				}				
			}
		});		
	}
	else	// данные введены НЕ верно
	{  
		inf_block.style.display = 'block';
	}
};

	




