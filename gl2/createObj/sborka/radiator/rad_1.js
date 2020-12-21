
// получаем параметры для списока select сборки радитора
function settingSborkaRadiatorMenuUI_1(cdm)
{
	//var el = document.querySelector('[nameId="'+cdm.nameId+'"]');
	var el = document.createElement('div');
	
	var arr = [];
	arr[arr.length] = {value: 'left', text: 'подключение слева', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, side: 'left'}} }; 
	arr[arr.length] = {value: 'right', text: 'подключение справа', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, side: 'right'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.side});


	var arr = [];
	arr[arr.length] = {value: 'none', text: 'без кранов', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, kran: 'none'}} }; 
	arr[arr.length] = {value: 'regulator', text: 'регулировочные краны', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, kran: 'regulator'}} };
	arr[arr.length] = {value: 'sharov', text: 'шаровые краны', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, kran: 'sharov'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.kran});


	var arr = [];
	arr[arr.length] = {value: 1, text: '1 секция', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 1}} }; 
	arr[arr.length] = {value: 2, text: '2 секции', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 2}} };
	arr[arr.length] = {value: 3, text: '3 секции', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 3}} };
	arr[arr.length] = {value: 4, text: '4 секции', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 4}} }; 
	arr[arr.length] = {value: 5, text: '5 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 5}} };
	arr[arr.length] = {value: 6, text: '6 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 6}} };
	arr[arr.length] = {value: 7, text: '7 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 7}} };
	arr[arr.length] = {value: 8, text: '8 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 8}} };
	arr[arr.length] = {value: 9, text: '9 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 9}} };
	arr[arr.length] = {value: 10, text: '10 секций', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, countRad: 10}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.countRad});


	var arr = [];
	arr[arr.length] = {value: 0.2, text: 'h 200', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, heightRad: 0.2}} }; 
	arr[arr.length] = {value: 0.35, text: 'h 350', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, heightRad: 0.35}} };
	arr[arr.length] = {value: 0.5, text: 'h 500', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, heightRad: 0.5}} };
	arr[arr.length] = {value: 0.6, text: 'h 600', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, heightRad: 0.6}} }; 
	arr[arr.length] = {value: 0.7, text: 'h 700', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, heightRad: 0.7}} };
	arr[arr.length] = {value: 0.8, text: 'h 800', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, heightRad: 0.8}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.heightRad});

	
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
		el.append(cdm.inf.ui.el);		
	}
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
	var rad = al_radiator_1({"count": cdm.countRad,"size":{"x":0.08,"y":cdm.heightRad,"z":0.08},"r1":"1","name":"Ал.радиатор h500 (6шт.)" });

	//var rad = st_radiator_1({"size":{"x":0.6,"y":0.5,"z":0.07},"r1":"1/2","name":"Ст.радиатор h461.3 (0.6м)"});


	//------- заглушки для ал.радиатора
	var r_per1 = al_zagl_radiator_1({ "r1":"1","r2":"1/2", type: 'prh',"name":"перех.радиаторный 1/2" });
	var r_vozd = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'vsd' ,"name":"воздухоотв.радиаторный" });	
	var r_per2 = al_zagl_radiator_1({ "r1":"1","r2":"1/2", type: 'prh',"name":"перех.радиаторный 1/2" });
	var r_zagl = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'zgl', "name":"заглушка радиаторная" });

	
	//------- регулировочные краны
	console.log(777, cdm.termoreg);
	if(cdm.termoreg)
	{
		var reg_kran_1 = reg_kran_primoy_1({"r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"termoreg":true,"name":"Клапан с терморегулятором 1/2"});
	}
	
	if(cdm.kran == 'regulator')
	{
		if(!reg_kran_1) reg_kran_1 = reg_kran_primoy_1({ "r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"name":"Кран регулировочный 1/2" });			
		var reg_kran_2 = reg_kran_primoy_1({ "r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"name":"Кран регулировочный 1/2" });		
	}
	else if(cdm.kran == 'sharov')
	{
		if(!reg_kran_1) reg_kran_1 = shar_kran_sgon_1({"r1":"1/2","r2":"3/4","m1":0.055,"m2":0.026,"t1":0.053,"name":"Шаровой кран с полусгоном 1/2"});			
		var reg_kran_2 = shar_kran_sgon_1({"r1":"1/2","r2":"3/4","m1":0.055,"m2":0.026,"t1":0.053,"name":"Шаровой кран с полусгоном 1/2"});
	}
	else if(cdm.kran == 'none')
	{
		// не создаем краны
	}
	
	
	
	//------- металлопластиковые переходники
	var mpl_pereh_1 = mpl_perehod_rezba_1({ "side":"n","r1":"16","r2":"1/2","m1":0.048,"name":"Соединитель 16x1/2(н)" });
	var mpl_pereh_2 = mpl_perehod_rezba_1({ "side":"n","r1":"16","r2":"1/2","m1":0.048,"name":"Соединитель 16x1/2(н)" });


	return {rad: rad, r_per1: r_per1, r_vozd: r_vozd, r_per2: r_per2, r_zagl: r_zagl, reg_kran_1: reg_kran_1, reg_kran_2: reg_kran_2, mpl_pereh_1: mpl_pereh_1, mpl_pereh_2: mpl_pereh_2};
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

	
	if(cdm.arrO1)
	{
		var arrO = [];
		
		arrO[arrO.length] = rad;	
		if(r_per1) arrO[arrO.length] = r_per1;
		if(r_per2) arrO[arrO.length] = r_per2;
		arrO[arrO.length] = r_zagl;
		arrO[arrO.length] = r_vozd;	
		if(reg_kran_1) arrO[arrO.length] = reg_kran_1;
		if(reg_kran_2) arrO[arrO.length] = reg_kran_2;
		arrO[arrO.length] = mpl_pereh_1;
		arrO[arrO.length] = mpl_pereh_2;

		return arrO;
	}
	


	
	if(cdm.posJ1)
	{
		var posJ = {};
		posJ.rad = getRazyem({obj: rad});
		
		posJ.r_zagl = getRazyem({obj: r_zagl});				
		posJ.r_vozd = getRazyem({obj: r_vozd});	
		if(r_per1) posJ.r_per1 = getRazyem({obj: r_per1});
		if(r_per2) posJ.r_per2 = getRazyem({obj: r_per2});
		
		if(reg_kran_1) posJ.reg_kran_1 = getRazyem({obj: reg_kran_1});	
		if(reg_kran_2) posJ.reg_kran_2 = getRazyem({obj: reg_kran_2});	
		
		posJ.mpl_pereh_1 = getRazyem({obj: mpl_pereh_1});	
		posJ.mpl_pereh_2 = getRazyem({obj: mpl_pereh_2});

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
			posJ.r_per1[1].add(r_per1.position);
		}
		else
		{
			posJ.r_per1 = [];
			posJ.r_per1[1] = posJ.rad[arrR[2]].clone();
		}
		
		if(r_per2) 
		{ 
			r_per2.position.copy( posJ.rad[arrR[3]].clone().sub(posJ.r_per2[0]) );
			posJ.r_per2[1].add(r_per2.position);
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
			mpl_pereh_1.position.copy( posJ.reg_kran_1[0].clone().sub(posJ.mpl_pereh_1[1]).add(reg_kran_1.position) );
		}
		else
		{
			mpl_pereh_1.position.copy( posJ.r_per2[1].clone().sub(posJ.mpl_pereh_1[1]) );
		}
		
		if(reg_kran_2) 
		{
			reg_kran_2.position.copy( posJ.r_per1[1].clone().sub(posJ.reg_kran_2[1]) );
			mpl_pereh_2.position.copy( posJ.reg_kran_2[0].clone().sub(posJ.mpl_pereh_2[1]).add(reg_kran_2.position) );
		}
		else
		{
			mpl_pereh_2.position.copy( posJ.r_per1[1].clone().sub(posJ.mpl_pereh_2[1]) );
		}			
	}
	
	

}










