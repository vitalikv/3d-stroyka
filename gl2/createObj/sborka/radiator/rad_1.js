
// получаем параметры для списока select сборки радитора
function settingSborkaRadiatorMenuUI_1(cdm)
{
	//var el = document.querySelector('[nameId="'+cdm.nameId+'"]');
	var el = document.createElement('div');
	el.setAttribute('listSborkaRad', '');
	
	var elText = document.createElement('div');
	elText.innerText = 'радиатор';
	elText.style.cssText = `margin-top: 10px; font-family: arial,sans-serif; font-size: 18px; color: #666; text-decoration: none; text-align: center;`;
	el.append(elText);


	

	var arr = [];
	arr[arr.length] = {value: 'al', text: 'алюминиевый радиатор', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, typeRad: 'al'}} }; 
	arr[arr.length] = {value: 'st', text: 'стальной радиатор', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, typeRad: 'st'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.typeRad});	
	idd.el.style.marginTop = '5px';
	
	if(cdm.inf.typeRad == 'al')
	{
		var arr = [];
		arr[arr.length] = {value: 1, text: '1 секция', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 1}} }; 
		arr[arr.length] = {value: 2, text: '2 секции', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 2}} };
		arr[arr.length] = {value: 3, text: '3 секции', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 3}} };
		arr[arr.length] = {value: 4, text: '4 секции', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 4}} }; 
		arr[arr.length] = {value: 5, text: '5 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 5}} };
		arr[arr.length] = {value: 6, text: '6 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 6}} };
		arr[arr.length] = {value: 7, text: '7 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 7}} };
		arr[arr.length] = {value: 8, text: '8 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 8}} };
		arr[arr.length] = {value: 9, text: '9 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 9}} };
		arr[arr.length] = {value: 10, text: '10 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alX: 10}} };
		var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.rad.al.x});


		var arr = [];
		arr[arr.length] = {value: 0.2, text: 'h 200', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alY: 0.2}} }; 
		arr[arr.length] = {value: 0.35, text: 'h 350', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alY: 0.35}} };
		arr[arr.length] = {value: 0.5, text: 'h 500', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alY: 0.5}} };
		arr[arr.length] = {value: 0.6, text: 'h 600', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alY: 0.6}} }; 
		arr[arr.length] = {value: 0.7, text: 'h 700', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alY: 0.7}} };
		arr[arr.length] = {value: 0.8, text: 'h 800', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, alY: 0.8}} };
		var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.rad.al.y});		
	}


	if(cdm.inf.typeRad == 'st')
	{
		var arr = [];
		var arr2 = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.4, 1.6, 1.8, 2];
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: 'длина '+arr2[i]+'м', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, stX: arr2[i]}} };
		}		
		var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.rad.st.x});


		var arr = [];
		var arr2 = [0.3, 0.4, 0.5, 0.6, 0.9];
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: 'h '+(arr2[i]*1000), fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, stY: arr2[i]}} };
		}		
		var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.rad.st.y});		
	}	
	
	
	var elBroder = document.createElement('div');
	elBroder.style.cssText = `border-bottom: 1px solid #ccc;`;
	el.append(elBroder);

	var elText = document.createElement('div');
	elText.innerText = 'трубы';
	elText.style.cssText = `margin-top: 10px; font-family: arial,sans-serif; font-size: 18px; color: #666; text-decoration: none; text-align: center;`;
	el.append(elText);	

	var arr = [];
	arr[arr.length] = {value: 'mp', text: 'металлопластиковые трубы', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, typePipe: 'mp'}} }; 
	arr[arr.length] = {value: 'pp', text: 'полипропиленовые трубы', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, typePipe: 'pp'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.typePipe});
	idd.el.style.marginTop = '5px';
	
	
	if(cdm.inf.typePipe == 'mp')
	{
		var arr = [];
		if(cdm.inf.typePt == 'od'){ var arr2 = [0.016, 0.020]; }
		else { var arr2 = [0.020, 0.026, 0.032]; }
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: (arr2[i]*1000)+ ' (магистральная труба)', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, pipeMp: arr2[i]}} };
		}

		var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.pipe.mp});			
	}
	
	if(cdm.inf.typePipe == 'pp')
	{
		var arr = [];
		if(cdm.inf.typePt == 'od'){ var arr2 = [0.020, 0.025]; }
		else { var arr2 = [0.025, 0.032, 0.040]; }
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: (arr2[i]*1000)+ ' (магистральная труба)', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, pipePp: arr2[i]}} };
		}

		var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.pipe.pp});			
	}	
	
	var arr = [];
	arr[arr.length] = {value: 'left', text: 'подключение слева', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, side: 'left'}} }; 
	arr[arr.length] = {value: 'right', text: 'подключение справа', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, side: 'right'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.side});


	var elBroder = document.createElement('div');
	elBroder.style.cssText = `border-bottom: 1px solid #ccc;`;
	el.append(elBroder);
	
	var elText = document.createElement('div');
	elText.innerText = 'фитинги';
	elText.style.cssText = `margin-top: 10px; font-family: arial,sans-serif; font-size: 18px; color: #666; text-decoration: none; text-align: center;`;
	el.append(elText);	

	
	var arr = [];
	arr[arr.length] = {value: 'none', text: 'без кранов', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, kran: 'none'}} }; 
	arr[arr.length] = {value: 'regulator', text: 'регулировочные краны', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, kran: 'regulator'}} };
	arr[arr.length] = {value: 'sharov', text: 'шаровые краны', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, kran: 'sharov'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.kran});
	idd.el.style.marginTop = '5px';
	
	
	var arr = [];
	arr[arr.length] = {value: false, text: 'без терморегулятора', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, termoreg: false}} }; 
	arr[arr.length] = {value: true, text: 'с терморегулятором', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, termoreg: true}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.termoreg});
			
	
	//el.style.display = '';
	//el.style.display = 'none';			
	
	return { el: el };
}	


// скрываем список select для сборки радитора
function showHideSettingsRadiator_1(cdm)
{
	if(!cdm) cdm = {};	
	
	var el = document.querySelector('[nameId="sborka_rad_1"]');
	el.innerHTML = '';
	

	if(cdm.inf)
	{
		var ui = settingSborkaRadiatorMenuUI_1({inf: cdm.inf});
		el.append(ui.el);		
	}
	
	//console.log(22, document.querySelector('[listSborkaRad]'));
}



// добавляем item сборки радиатора в UI catalog
function addElemItemSborkaRadiator_UI_1(cdm)
{	
	var str_button = 
	'<div nameId="sh_select_obj3D" style="margin-right: 5px; margin-left: auto; width: 20px; height: 20px;">\
		<img src="'+infProject.path+'/img/look.png" style="display: block; height: 95%; margin: auto; -o-object-fit: contain; object-fit: contain;">\
	</div>';
	
	var html = 
	'<div>\
		<div class="right_panel_1_1_list_item">\
			<div class="flex_1 relative_1">\
				<div class="right_panel_1_1_list_item_text">'+cdm.ui.catalog.name+'</div>\
				'+str_button+'\
			</div>\
		</div>\
	</div>';			
	
	var div = document.createElement('div');
	div.innerHTML = html;
	var elem = div.firstChild;
	
	//json.elem = elem;

	// при клике добавляем объект в сцену	
	(function() 
	{
		elem.onmousedown = function(e){ addSborkaRadiatorToScene_1({inf: cdm}); e.stopPropagation(); };	
	}());

	// назначаем событие при клике на лупу UI
	var elem_2 = elem.querySelector('[nameId="sh_select_obj3D"]');
	(function() 
	{
		elem_2.onmousedown = function(e)
		{ 
			activeCameraView({sborka: true, inf: cdm});
			e.stopPropagation();
		};	
	}());			
	
	
	
	var container = document.body.querySelector('[list_ui="catalog"]');
	
	container.append(elem);
}




// получаем объекты для сборки радиатора
function getObjectsSborkaRad_1(cdm)
{
	var inf = cdm.inf;
	
	if(cdm.typePipe) { inf.typePipe = cdm.typePipe; }
	if(cdm.typeRad) { inf.typeRad = cdm.typeRad; }
	if(cdm.stX) { inf.rad.st.x = cdm.stX; }
	if(cdm.stY) { inf.rad.st.y = cdm.stY; }
	if(cdm.alX) { inf.rad.al.x = cdm.alX; }
	if(cdm.alY) { inf.rad.al.y = cdm.alY; }	
	if(cdm.pipePp) { inf.pipe.pp = cdm.pipePp; }
	if(cdm.pipeMp) { inf.pipe.mp = cdm.pipeMp; }
	if(cdm.side) { inf.side = cdm.side; }
	if(cdm.kran) { inf.kran = cdm.kran; }
	if(cdm.termoreg !== undefined) { inf.termoreg = cdm.termoreg; }
	if(cdm.pipe_level !== undefined) { inf.pipe_level = cdm.pipe_level; }	
	
	var o = {};
	
	if(inf.typeRad == 'st')
	{
		o.rad = st_radiator_1({"size":{"x": inf.rad.st.x,"y": inf.rad.st.y,"z":0.07},"r1":"1/2","name":"Ст.радиатор h461.3 (0.6м)"});
		
		//------- заглушки для ал.радиатора
		o.r_vozd = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'vsd' ,"name":"воздухоотв.радиаторный" });	
		o.r_zagl = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'zgl', "name":"заглушка радиаторная" });		
	}
	else
	{
		o.rad = al_radiator_1({"count": inf.rad.al.x,"size":{"x":0.08,"y": inf.rad.al.y,"z":0.08},"r1":"1","name":"Ал.радиатор h500 (6шт.)" });
		
		//------- заглушки для ал.радиатора
		o.r_per1 = al_zagl_radiator_1({ "r1":"1","r2":"1/2", type: 'prh',"name":"перех.радиаторный 1/2" });
		o.r_vozd = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'vsd' ,"name":"воздухоотв.радиаторный" });	
		o.r_per2 = al_zagl_radiator_1({ "r1":"1","r2":"1/2", type: 'prh',"name":"перех.радиаторный 1/2" });
		o.r_zagl = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'zgl', "name":"заглушка радиаторная" });		
	}



	
	//------- регулировочные краны
	if(inf.termoreg)
	{
		o.reg_kran_1 = reg_kran_primoy_1({"r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"termoreg":true,"name":"Клапан с терморегулятором 1/2"});
	}
	
	if(inf.kran == 'regulator')
	{
		if(!o.reg_kran_1) o.reg_kran_1 = reg_kran_primoy_1({ "r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"name":"Кран регулировочный 1/2" });			
		o.reg_kran_2 = reg_kran_primoy_1({ "r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"name":"Кран регулировочный 1/2" });		
	}
	else if(inf.kran == 'sharov')
	{
		if(!o.reg_kran_1) o.reg_kran_1 = shar_kran_sgon_1({"r1":"1/2","r2":"3/4","m1":0.055,"m2":0.026,"t1":0.053,"name":"Шаровой кран с полусгоном 1/2"});	
		o.reg_kran_2 = shar_kran_sgon_1({"r1":"1/2","r2":"3/4","m1":0.055,"m2":0.026,"t1":0.053,"name":"Шаровой кран с полусгоном 1/2"});
	}
	else if(inf.kran == 'none')
	{
		// не создаем краны
	}
	
	
	
	//------- металлопластиковые переходники
	o.mpl_pereh_1 = mpl_perehod_rezba_1({ "side":"n","r1":"16","r2":"1/2","m1":0.048,"name":"Соединитель 16x1/2(н)" });
	o.mpl_pereh_2 = mpl_perehod_rezba_1({ "side":"n","r1":"16","r2":"1/2","m1":0.048,"name":"Соединитель 16x1/2(н)" });
	
	
	if(inf.typePt == 'od_bay')
	{
		if(inf.typePipe == 'pp') {  }
		if(inf.typePipe == 'mp')
		{
			if(inf.pipe.mp == 0.020)
			{
				if(inf.fc == 'crSborkaRad_Odnotrub_Bok_Bay_Mp')
				{
					o.troin_1 = mpl_troinik_1({r1: 16, r2: 16, r3: 20, m1: 0.096,m2: 0.047});
					o.troin_2 = mpl_troinik_1({r1: 16, r2: 16, r3: 20, m1: 0.096,m2: 0.047});				
				}
				else
				{
					o.troin_1 = mpl_troinik_1({r1: 16, r2: 16, r3: 20, m1: 0.096,m2: 0.047});
					o.troin_2 = mpl_troinik_1({r1: 16, r2: 16, r3: 20, m1: 0.096,m2: 0.047});				
				}				
			}
			if(inf.pipe.mp == 0.026)
			{
				if(inf.fc == 'crSborkaRad_Odnotrub_Bok_Bay_Mp')
				{
					o.troin_1 = mpl_troinik_1({r1: 26, r2: 20, r3: 16, m1: 0.096,m2: 0.047});
					o.troin_2 = mpl_troinik_1({r1: 26, r2: 20, r3: 16, m1: 0.096,m2: 0.047});				
				}
				else
				{
					o.troin_1 = mpl_troinik_1({r1: 26, r2: 16, r3: 20, m1: 0.096,m2: 0.047});
					o.troin_2 = mpl_troinik_1({r1: 26, r2: 16, r3: 20, m1: 0.096,m2: 0.047});			
				}				
			}
			if(inf.pipe.mp == 0.032)
			{
				if(inf.fc == 'crSborkaRad_Odnotrub_Bok_Bay_Mp')
				{
					o.troin_1 = mpl_troinik_1({r1: 26, r2: 20, r3: 16, m1: 0.096,m2: 0.047});
					o.troin_2 = mpl_troinik_1({r1: 26, r2: 20, r3: 16, m1: 0.096,m2: 0.047});				
				}
				else
				{
					o.troin_1 = mpl_troinik_1({r1: 32, r2: 20, r3: 26, m1: 0.096,m2: 0.047});
					o.troin_2 = mpl_troinik_1({r1: 32, r2: 20, r3: 26, m1: 0.096,m2: 0.047});			
				}				
			}			
		}
	
	}
	else if(inf.typePt == 'dv')
	{
		o.troin_1 = mpl_troinik_1({"r1":"26","r2":"16","r3":"26","m1":0.096,"m2":0.047,"name":"Тройник 26x16x26"});
		o.troin_2 = mpl_troinik_1({"r1":"26","r2":"16","r3":"26","m1":0.096,"m2":0.047,"name":"Тройник 26x16x26"});		
	}

	return o;
}





// добавляем сборку радиатора в сцену
function addSborkaRadiatorToScene_1(cdm)
{
	var inf = actionFnSborkaRad_1(cdm);	
	if(!inf) return;
	
	var obj = inf.arr1[0];
	clickO.move = obj; 
	clickO.arrO = inf.arr2;
	
	planeMath.position.y = infProject.tools.heightPl.position.y; 
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	planeMath.updateMatrixWorld(); 		
	
	// устанавливаем высоту над полом
	clickO.offset.x = -((obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x)/2 + obj.geometry.boundingBox.min.x);
	clickO.offset.y = -((obj.geometry.boundingBox.max.y - obj.geometry.boundingBox.min.y)/2 + obj.geometry.boundingBox.min.y);
	clickO.offset.z = -((obj.geometry.boundingBox.max.z - obj.geometry.boundingBox.min.z)/2 + obj.geometry.boundingBox.min.z);

	var offsetY = clickO.offset.y + obj.geometry.boundingBox.min.y;
	
	for(var i = 0; i < inf.arr2.length; i++)
	{
		inf.arr2[i].position.y -= offsetY;
	}
	
	planeMath.position.y -= offsetY; 
	planeMath.updateMatrixWorld();

	
	renderCamera();	
}



// находим нужную ф-цию и создаем/обновляем сборку радитора
function actionFnSborkaRad_1(cdm)
{
	var inf = null;
	
	if(cdm.inf) { inf = window[cdm.inf.fc](cdm); }
	
	return inf;
}



function setPathRad_1(cdm)
{
	var rad = cdm.result.rad;
	var r_per1 = cdm.result.r_per1;	//cdm.result.r_per1 = null; 	
	var r_per2 = cdm.result.r_per2; //cdm.result.r_per2 = null;
	var r_vozd = cdm.result.r_vozd;
	var r_zagl = cdm.result.r_zagl;
	var reg_kran_1 = cdm.result.reg_kran_1;
	var reg_kran_2 = cdm.result.reg_kran_2;
	var mpl_pereh_1 = cdm.result.mpl_pereh_1;
	var mpl_pereh_2 = cdm.result.mpl_pereh_2;

	var troin_1 = cdm.result.troin_1;
	var troin_2 = cdm.result.troin_2;
	
	if(cdm.arrO1)
	{
		var arrO = [];		
		
		for(var index in cdm.result) 
		{ 
			var obj = cdm.result[index];
			if(!obj) continue;
			arrO[arrO.length] = obj;
			//console.log(555555, index);
		}
		
		return arrO;
	}
	

	if(cdm.q1)
	{
		var arrO = [];		
		
		for(var index in cdm.q1)  
		{ 
			var obj = cdm.result[index];
			if(!obj) continue;
			
			//console.log(7777, index, cdm.q1[index]); 
			 
			obj.quaternion.copy(cdm.q1[index].q);
		}
	}
	
	
	if(cdm.posJ1)
	{
		var posJ = {};
		for(var index in cdm.result)  
		{ 
			var obj = cdm.result[index];
			if(!obj) continue;
			
			posJ[index] = getRazyem({obj: obj});
		}

		return posJ;
	}
	

	if(cdm.pos0)
	{
		var posJ = cdm.posJ;
		var arrR = cdm.arrR;
		
		r_zagl.position.copy( posJ.rad[arrR[0]].clone().sub(posJ.r_zagl[0]) );		
		r_vozd.position.copy( posJ.rad[arrR[1]].clone().sub(posJ.r_vozd[0]) );
		
		if(r_per1) 
		{ 
			r_per1.position.copy( posJ.rad[arrR[2]].clone().sub(posJ.r_per1[0]) );
			posSubAdd_1({o: r_per1, arr: posJ.r_per1});
		}
		else
		{
			posJ.r_per1 = [];
			posJ.r_per1[1] = posJ.rad[arrR[2]].clone();
		}
		
		if(r_per2) 
		{ 
			r_per2.position.copy( posJ.rad[arrR[3]].clone().sub(posJ.r_per2[0]) );
			posSubAdd_1({o: r_per2, arr: posJ.r_per2});
		}
		else
		{
			posJ.r_per2 = [];
			posJ.r_per2[1] = posJ.rad[arrR[3]].clone();
		}		
	}

	
	if(cdm.pos1)
	{
		var posJ = cdm.posJ;
		
		if(reg_kran_1) 
		{
			reg_kran_1.position.copy( posJ.r_per2[1].clone().sub(posJ.reg_kran_1[1]) );
			posSubAdd_1({o: reg_kran_1, arr: posJ.reg_kran_1});
		}
		else
		{
			posJ.reg_kran_1 = [];
			posJ.reg_kran_1[0] = posJ.r_per2[1].clone();			
		}
		
		if(reg_kran_2) 
		{
			reg_kran_2.position.copy( posJ.r_per1[1].clone().sub(posJ.reg_kran_2[1]) );
			posSubAdd_1({o: reg_kran_2, arr: posJ.reg_kran_2});
		}
		else
		{
			posJ.reg_kran_2 = [];
			posJ.reg_kran_2[0] = posJ.r_per1[1].clone();
		}

		mpl_pereh_1.position.copy( posJ.reg_kran_1[0].clone().sub(posJ.mpl_pereh_1[1]) );
		mpl_pereh_2.position.copy( posJ.reg_kran_2[0].clone().sub(posJ.mpl_pereh_2[1]) );
		
		posSubAdd_1({o: mpl_pereh_1, arr: posJ.mpl_pereh_1});
		posSubAdd_1({o: mpl_pereh_2, arr: posJ.mpl_pereh_2});
	}
	
	
	if(cdm.troin1)
	{
		//mpl_pereh_1.position.copy( posJ.reg_kran_1[0].clone().sub(posJ.mpl_pereh_1[1]) );
		//mpl_pereh_2.position.copy( posJ.reg_kran_2[0].clone().sub(posJ.mpl_pereh_2[1]) );
		
		//posSubAdd_1({o: mpl_pereh_1, arr: posJ.mpl_pereh_1});
		//posSubAdd_1({o: mpl_pereh_2, arr: posJ.mpl_pereh_2});		
	}
	
	function posSubAdd_1(cdm)
	{
		var arr = cdm.arr;
		var o = cdm.o;	
		
		for(var i = 0; i < arr.length; i++)
		{
			arr[i].add(o.position);
		}
	}	

}



function baypasTube(cdm)
{
	var inf = cdm.inf;
	
	var res = {mag: 0.02, bay: 0.02};
	var arrPP = [0.02, 0.025, 0.032, 0.040];
	var arrMP = [0.016, 0.020, 0.026, 0.032];
	
	if(inf.typePipe == 'pp') { res.mag = inf.pipe.pp; var arr = arrPP; }
	if(inf.typePipe == 'mp') { res.mag = inf.pipe.mp; var arr = arrMP; }	

	
	for(var i = 0; i < arr.length; i++)
	{ 
		if(arr[i] == res.mag)
		{
			if(i-1 >= 0) res.bay = arr[i-1];
			break;
		}
	}
	
	
	return res;
}








