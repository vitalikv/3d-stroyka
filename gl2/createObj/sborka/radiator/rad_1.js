
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
		var arr2 = cdm.inf.list.mp.t;
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: (arr2[i]*1000)+ ' (магистральная труба)', fc: {name: 'activeCameraView', params: {sborka: true, inf: cdm.inf, pipeMp: arr2[i]}} };
		}

		var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.pipe.mp});			
	}
	
	if(cdm.inf.typePipe == 'pp')
	{
		var arr = [];
		var arr2 = cdm.inf.list.pp.t;
		
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
async function getObjectsSborkaRad_1(cdm, dp)
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
	
	var vt1 = [];
	if(inf.typeRad == 'st')
	{
		o.rad = st_radiator_1({"size":{"x": inf.rad.st.x,"y": inf.rad.st.y,"z":0.07},"r1":"1/2"});
		
		o.r_vozd = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'vsd' ,"name":"воздухоотв.радиаторный" });	
		o.r_zagl = al_zagl_radiator_1({ "r1":"1","r2":0, type: 'zgl', "name":"заглушка радиаторная" });		
	}
	else
	{
		o.rad = al_radiator_1({"count": inf.rad.al.x,"size":{"x":0.08,"y": inf.rad.al.y,"z":0.08},"r1":"1" });	

		o.r_per1 = await loadObjServer({lotid: 18, notArray: true});
		o.r_vozd = await loadObjServer({lotid: 21, notArray: true});	
		o.r_per2 = await loadObjServer({lotid: 18, notArray: true});
		o.r_zagl = await loadObjServer({lotid: 20, notArray: true});				
	}

	
	//------- регулировочные краны
	var kran1 = [null, null];
	if(inf.termoreg)
	{
		kran1[0] = 144;
	}
	
	if(inf.kran == 'regulator')
	{
		if(!kran1[0]) kran1[0] = 142;
		kran1[1] = 142;	
	}
	else if(inf.kran == 'sharov')
	{
		if(!kran1[0]) kran1[0] = 441;
		kran1[1] = 441;	
	}
	
	if(kran1[0]) o.reg_kran_1 = await loadObjServer({lotid: kran1[0], notArray: true});
	if(kran1[1]) o.reg_kran_2 = await loadObjServer({lotid: kran1[1], notArray: true});
	
	var ind = inf.list[inf.typePipe].t.findIndex(item => item == inf.pipe[inf.typePipe]); 	
	
	
	//------- металлопластиковые переходники	
	if(inf.list[inf.typePipe].obj.pr1)
	{
		var lotid = inf.list[inf.typePipe].obj.pr1[ind];
		o.mpl_pereh_1 = await loadObjServer({lotid: lotid, notArray: true});
		o.mpl_pereh_2 = await loadObjServer({lotid: lotid, notArray: true});		
	}
	
	
	if(inf.list[inf.typePipe].obj.tr1)
	{
		var lotid = inf.list[inf.typePipe].obj.tr1[ind];
		o.troin_1 = await loadObjServer({lotid: lotid, notArray: true});
		o.troin_2 = await loadObjServer({lotid: lotid, notArray: true});	
	}
	
	// поворачиваем объекты и узнаем world position у разъемов этих объектов
	if(dp.q)
	{
		for(var index in dp.q)  
		{ 
			var obj = o[index];
			if(!obj) continue;
			console.log(index, dp.q[index].q); 
			obj.quaternion.copy(dp.q[index].q);
		}

		for(var index in o)  
		{ 
			var obj = o[index];
			if(!obj) continue;
			
			getRazyem({obj: obj});
		}		
	}
	
	return o;
}





// добавляем сборку радиатора в сцену
async function addSborkaRadiatorToScene_1(cdm)
{
	var inf = await actionFnSborkaRad_1(cdm);	
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
async function actionFnSborkaRad_1(cdm)
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
		var arrR = cdm.arrR;
		
		r_zagl.position.copy( rad.userData.jp[arrR[0]].clone().sub(r_zagl.userData.jp[0]) );		
		r_vozd.position.copy( rad.userData.jp[arrR[1]].clone().sub(r_vozd.userData.jp[0]) );
		
		var vt1 = rad.userData.jp[arrR[2]].clone();
		var vt2 = rad.userData.jp[arrR[3]].clone();
		
		if(r_per1) 
		{ 
			posSubAdd_1({o: r_per1, jp: 0, pos: rad.userData.jp[arrR[2]]});
			vt1 = r_per1.userData.jp[1].clone();
		}
		
		if(r_per2) 
		{ 
			posSubAdd_1({o: r_per2, jp: 0, pos: rad.userData.jp[arrR[3]]});
			vt2 = r_per2.userData.jp[1].clone();
		}	

		
		if(reg_kran_1) 
		{
			posSubAdd_1({o: reg_kran_1, jp: 1, pos: vt2});
			vt2 = reg_kran_1.userData.jp[0].clone();
		}
		
		if(reg_kran_2) 
		{
			posSubAdd_1({o: reg_kran_2, jp: 1, pos: vt1});
			vt1 = reg_kran_2.userData.jp[0].clone();
		}
		
		posSubAdd_1({o: mpl_pereh_1, jp: 1, pos: vt2});
		posSubAdd_1({o: mpl_pereh_2, jp: 1, pos: vt1});
	}
	

	
	function posSubAdd_1(cdm)
	{
		var o = cdm.o;	
		var jp = o.userData.jp[cdm.jp];
		var pos = cdm.pos;
		
		o.position.copy( pos.clone().sub(jp) );
		
		for(var i = 0; i < o.userData.jp.length; i++)
		{
			o.userData.jp[i].add(o.position);
		}
	}	

}



function baypasTube(cdm)
{
	var inf = cdm.inf;
	
	var res = {mag: 0.02, bay: 0.02, jr: 0.02};	
	res.mag = inf.pipe[inf.typePipe];
	
	var arrMP = [];
	var arrPP = [];

	if(inf.typePt == 'od')
	{
		arrMP[arrMP.length] = {mag: 0.016};		
		arrMP[arrMP.length] = {mag: 0.02};		
		
		arrPP[arrPP.length] = {mag: 0.02};
		arrPP[arrPP.length] = {mag: 0.025};			
	}
	
	if(inf.typePt == 'od_bay')
	{		
		arrMP[arrMP.length] = {mag: 0.02, bay: 0.016, jr: 0.016};
		arrMP[arrMP.length] = {mag: 0.026, bay: 0.02, jr: 0.016};
		arrMP[arrMP.length] = {mag: 0.032, bay: 0.026, jr: 0.02};
		
		arrPP[arrPP.length] = {mag: 0.025, bay: 0.02, jr: 0.02};
		arrPP[arrPP.length] = {mag: 0.032, bay: 0.025, jr: 0.02};
		arrPP[arrPP.length] = {mag: 0.04, bay: 0.032, jr: 0.025};			
	}

	if(inf.typePt == 'dv')
	{
		arrMP[arrMP.length] = {mag: 0.02, jr: 0.016};
		arrMP[arrMP.length] = {mag: 0.026, jr: 0.016};
		arrMP[arrMP.length] = {mag: 0.032, jr: 0.016};
		
		arrPP[arrPP.length] = {mag: 0.025, jr: 0.02};
		arrPP[arrPP.length] = {mag: 0.032, jr: 0.02};
		arrPP[arrPP.length] = {mag: 0.04, jr: 0.02};			
	}
	
	
	if(inf.typePt == 'od_bay' || inf.typePt == 'dv')
	{
		if(inf.typePipe == 'pp') { var arr = arrPP; }
		if(inf.typePipe == 'mp') {  var arr = arrMP; }	
		
		
		for(var i = 0; i < arr.length; i++)
		{ 
			if(arr[i].mag == res.mag)
			{
				res.bay = arr[i].bay;
				res.jr = arr[i].jr;
				break;
			}
		}		
	}
	
	
	return res;
}








