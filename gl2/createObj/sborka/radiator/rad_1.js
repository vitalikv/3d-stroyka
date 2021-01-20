
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


function changeParamSbrRad_1(cdm)
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
}

// получаем объекты для сборки радиатора
async function getObjectsSborkaRad_1(cdm, dp)
{
	var inf = cdm.inf;
	
	var o = {};
	
	var vt1 = [];
	if(inf.typeRad == 'st')
	{
		o.rad = st_radiator_1({"size":{"x": inf.rad.st.x,"y": inf.rad.st.y,"z":0.07},"r1":"1/2"});
		
		o.r_vozd = await loadObjServer({lotid: 451, notArray: true});	
		o.r_zagl = await loadObjServer({lotid: 452, notArray: true});		
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
	
	// [0.016, 0.020, 0.026].findIndex(item => item == 0.020);
	var ind = inf.list[inf.typePipe].t.findIndex(item => item == inf.pipe[inf.typePipe]);	// получаем index, трубы которая выбрана  	
	
	
	//------- металлопластиковые переходники	
	if(inf.list[inf.typePipe].obj.pr1)
	{
		var lotid = inf.list[inf.typePipe].obj.pr1[ind];
		if(!Array.isArray(lotid)){ var lotid1 = lotid; var lotid2 = lotid; }
		else { var lotid1 = lotid[0]; var lotid2 = lotid[1]; }
		
		o.mpl_pereh_1 = await loadObjServer({lotid: lotid1, notArray: true});
		o.mpl_pereh_2 = await loadObjServer({lotid: lotid2, notArray: true});		
	}
	
	
	if(inf.list[inf.typePipe].obj.tr1)
	{
		var lotid = inf.list[inf.typePipe].obj.tr1[ind];
		o.troin_1 = await loadObjServer({lotid: lotid, notArray: true});
		o.troin_2 = await loadObjServer({lotid: lotid, notArray: true});	
	}
	
	if(inf.list[inf.typePipe].obj.ug1)
	{
		var lotid = inf.list[inf.typePipe].obj.ug1[ind];
		o.ugol_1 = await loadObjServer({lotid: lotid, notArray: true});
		o.ugol_2 = await loadObjServer({lotid: lotid, notArray: true});	
	}	
	
	// поворачиваем объекты и узнаем world position у разъемов этих объектов
	if(dp.q)
	{
		for(var index in dp.q)  
		{ 
			var obj = o[index];
			if(!obj) continue;		
			obj.quaternion.copy(dp.q[index].q);
		}
				
		for(var index in dp.qP)  
		{ 
			var obj = o[index];
			if(!obj) continue;			
			if(dp.qP[index]){ obj.userData.qP = dp.qP[index]; }			
		}		

		for(var index in o)  
		{ 
			var obj = o[index];
			if(!obj) continue;
			
			getRazyem({obj: obj});
			
			// меняем местами позиции разъемов
			if(obj.userData.qP){ setPathRad_1({changeJ: obj, arr: obj.userData.qP }); }
		}		
	}

	var vt1 = new THREE.Vector3();
	var vt2 = new THREE.Vector3();	
	
	// устанавливаем фитинги
	if(1==1)
	{
		var arrR = dp.rad;
		
		o.r_zagl.position.copy( o.rad.userData.jp[arrR[0]].clone().sub(o.r_zagl.userData.jp[0]) );		
		o.r_vozd.position.copy( o.rad.userData.jp[arrR[1]].clone().sub(o.r_vozd.userData.jp[0]) );
		
		vt1 = o.rad.userData.jp[arrR[2]].clone();
		vt2 = o.rad.userData.jp[arrR[3]].clone();
		
		if(o.r_per1) 
		{ 
			posSubAdd_1({o: o.r_per1, jp: 0, pos: vt1});
			vt1 = o.r_per1.userData.jp[1].clone();
		}		
		if(o.r_per2) 
		{ 
			posSubAdd_1({o: o.r_per2, jp: 0, pos: vt2});
			vt2 = o.r_per2.userData.jp[1].clone();
		}	

		
		if(o.reg_kran_1) 
		{
			posSubAdd_1({o: o.reg_kran_1, jp: 1, pos: vt2});
			vt2 = o.reg_kran_1.userData.jp[0].clone();
		}		
		if(o.reg_kran_2) 
		{
			posSubAdd_1({o: o.reg_kran_2, jp: 1, pos: vt1});
			vt1 = o.reg_kran_2.userData.jp[0].clone();
		}
		
		posSubAdd_1({o: o.mpl_pereh_1, jp: 1, pos: vt2});
		posSubAdd_1({o: o.mpl_pereh_2, jp: 1, pos: vt1});
		
		vt1 = o.mpl_pereh_2.userData.jp[0];
		vt2 = o.mpl_pereh_1.userData.jp[0];		
	}
		

	var ind = inf.list[inf.typePipe].t.findIndex(item => item == inf.pipe[inf.typePipe]); 	
	var m1 = inf.list[inf.typePipe].pipe.m1[ind];
	if(inf.list[inf.typePipe].pipe.b1) var b1 = inf.list[inf.typePipe].pipe.b1[ind];
	if(inf.list[inf.typePipe].pipe.m2) var m2 = inf.list[inf.typePipe].pipe.m2[ind];
	
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};

	
	// создаем трубы
	if(inf.typePipe == 'mp')
	{
		if(inf.typePt2 == 'verh')
		{
			var y1 = o.rad.userData.jp[1].y - o.rad.userData.jp[0].y;
			
			if(inf.typePt == 'od')
			{ 
				var ti1 = {type: 3, color: 15688453, diameter: m1, startY: inf.pipe_level, endY: y1, mirror: mirror_1};
				var ti2 = {type: 1, lengthX: 0.2, color: 505069, diameter: m1, mirror: mirror_2};
			}
			
			if(inf.typePt == 'od_bay')
			{ 
				var ti1 = {type: 2, color: 15688453, diameter: m1, startY: inf.pipe_level, endY: y1, mirror: mirror_1};
				var ti2 = {type: 2, color: 505069, diameter: m1, startY: inf.pipe_level, endY: 0.00, mirror: mirror_2};
			}
			
			if(inf.typePt == 'dv')
			{ 
				var ti1 = {type: 2, color: 15688453, diameter: m1, startY: inf.pipe_level, endY: y1, mirror: mirror_1};
				var ti2 = {type: 2, color: 505069, diameter: m1, startY: inf.pipe_level - 0.05, endY: 0.00, mirror: mirror_2};
			}			
		}
	}
	
	if(inf.typePipe == 'pp' || inf.typePipe == 'mp')
	{
		if(inf.typePt2 == 'niz')
		{
			if(inf.typePt == 'od')
			{ 
				var ti1 = {type: 1, lengthX: 0.2, color: 15688453, diameter: m1, mirror: mirror_1};
				var ti2 = {type: 1, lengthX: 0.2, color: 505069, diameter: m1, mirror: mirror_2};
			}			
			
			if(inf.typePt == 'od_bay')
			{
				var ti1 = {type: 1, lengthY: 0.05, color: 15688453, diameter: m1 };
				var ti2 = {type: 1, lengthY: 0.05, color: 505069, diameter: m1 };							
			}
			
			if(inf.typePt == 'dv')
			{
				var ti1 = {type: 1, lengthY: 0.05, color: 15688453, diameter: m1 };
				var ti2 = {type: 1, lengthY: 0.1, color: 505069, diameter: m1 };							
			}						
		}
		if(inf.typePt2 == 'verh')
		{
			var y1 = o.rad.userData.jp[1].y - o.rad.userData.jp[0].y;
			
			if(inf.typePt == 'od' && inf.typePipe == 'pp')
			{ 
				var ti1 = {type: 1, lengthY: 0.05 + y1, color: 15688453, diameter: m1 };
				var ti2 = {type: 1, lengthY: 0.05, color: 505069, diameter: m1 };
			}
			if(inf.typePt == 'od' && inf.typePipe == 'mp')
			{ 
				var ti1 = {type: 2, color: 15688453, diameter: m1, endY: y1+0.05, mirror: {x: !mirror_1.x, y: true}, convert: true};
				var ti2 = {type: 2, color: 505069, diameter: m1, endY: 0.05, mirror: {x: !mirror_2.x, y: true}, convert: true};
			}			
			
			if(inf.typePt == 'od_bay')
			{
				var ti1 = {type: 1, lengthY: 0.05 + y1, color: 15688453, diameter: m1 };
				var ti2 = {type: 1, lengthY: 0.05, color: 505069, diameter: m1 };							
			}			
			
			if(inf.typePt == 'dv')
			{
				var ti1 = {type: 1, lengthY: 0.05 + y1, color: 15688453, diameter: m1 };
				var ti2 = {type: 1, lengthY: 0.1, color: 505069, diameter: m1 };							
			}			
			
		}		
		else if(inf.typePt2 == 'bok')
		{
			var lengthX_1 = 0.1;
			var lengthX_2 = 0.1;
			
			if(inf.typePt == 'od'){ lengthX_1 = 0.2; lengthX_2 = 0.2; }
			if(inf.typePt == 'dv'){ lengthX_2 = 0.2; }
			
			var x1 = Math.abs(o.mpl_pereh_1.userData.jp[0].x - o.mpl_pereh_2.userData.jp[0].x);	
			
			var ti1 = {type: 1, lengthX: lengthX_1 - x1, color: 15688453, diameter: m1, mirror: mirror_1 };
			var ti2 = {type: 1, lengthX: lengthX_2, color: 505069, diameter: m1, mirror: mirror_1 };
		}			
	}
	
	ti1.startPos = vt2;
	ti2.startPos = vt1;
	ti1.lastP = true;
	ti2.lastP = true;	
	
	o.tube1 = getTubeToSborka_1(ti1);
	o.tube2 = getTubeToSborka_1(ti2);	


	if(inf.typePipe == 'pp' && inf.typePt2 == 'verh' && inf.typePt == 'od')
	{
		if(o.ugol_1) { posSubAdd_1({o: o.ugol_1, jp: 0, pos: o.tube1.userData.wf_tube.point[0].position}); }
		if(o.ugol_2) { posSubAdd_1({o: o.ugol_2, jp: 0, pos: o.tube2.userData.wf_tube.point[0].position}); }
		
		// трубы магистральные
		o.tube3 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m1, mirror: mirror_2, startPos: o.ugol_1.userData.jp[1]});
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m1, mirror: mirror_1, startPos: o.ugol_2.userData.jp[1]});		
	}

	// подключаем тройники к трубе
	var nJp = 1;
	if(inf.typePt == 'od_bay' && inf.typePt2 == 'bok') { nJp = 2; }
	if(o.troin_1) { posSubAdd_1({o: o.troin_1, jp: nJp, pos: o.tube1.userData.wf_tube.point[0].position}); }
	if(o.troin_2) { posSubAdd_1({o: o.troin_2, jp: nJp, pos: o.tube2.userData.wf_tube.point[0].position}); }	
	
	
	if(inf.typePt == 'od_bay')
	{
		// труба байпаса
		var nJp = 2;
		if(inf.typePt2 == 'bok') { nJp = 1; }		
		var p1 = [o.troin_1.userData.jp[nJp].clone(), o.troin_2.userData.jp[nJp].clone()];		
		o.tube3 = getTubeToSborka_1({type: 'point', point: p1, color: 15688453, diameter: b1, startPos: o.troin_1.userData.jp[nJp]});
		
		// трубы магистральные
		var mirror_3 = (inf.typePt2 == 'bok') ? mirror_2 : mirror_1;
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0]});
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_3, startPos: o.troin_2.userData.jp[0]});	
	}
	
	
	if(inf.typePt == 'dv')
	{
		// трубы магистральные
		if(inf.typePt2 == 'niz')
		{	
			var lengthX = Math.abs(o.troin_1.userData.jp[0].x - o.troin_2.userData.jp[2].x) + 0.1;
			
			o.tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: m2, mirror: mirror_1, startPos: o.troin_1.userData.jp[2] });
			o.tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: m2, mirror: mirror_2, startPos: o.troin_2.userData.jp[2] });	
			o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0] });
			o.tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_1, startPos: o.troin_2.userData.jp[0] });			
		}

		if(inf.typePt2 == 'verh')
		{	
			var lengthX = Math.abs(o.troin_1.userData.jp[0].x - o.troin_2.userData.jp[2].x) + 0.1; 
			
			o.tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: m2, mirror: mirror_1, startPos: o.troin_1.userData.jp[2]});	
			o.tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: m2, mirror: mirror_2, startPos: o.troin_2.userData.jp[2]});
			o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0]});
			o.tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_1, startPos: o.troin_2.userData.jp[0]});	
		}

		if(inf.typePt2 == 'bok')
		{	
			var lengthY = Math.abs(o.troin_1.userData.jp[0].y - o.troin_2.userData.jp[2].y) + 0.1; 
			
			o.tube3 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 15688453, diameter: m2, mirror: {y: true}, startPos: o.troin_1.userData.jp[2] });
			o.tube4 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 505069, diameter: m2, mirror: {y: false}, startPos: o.troin_2.userData.jp[2] });	
			o.tube5 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 15688453, diameter: m2, mirror: {y: false}, startPos: o.troin_1.userData.jp[0] });
			o.tube6 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 505069, diameter: m2, mirror: {y: true}, startPos: o.troin_2.userData.jp[0] });	
		}			
	}
		
	
	return o;
}


// подгоняем объект к выбранной позиции (cdm.pos)
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



// добавляем сборку радиатора в сцену
async function addSborkaRadiatorToScene_1(cdm)
{ 
	if(camera == cameraView) return;
 
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
	
	// меняем местами позиции 
	if(cdm.changeJ)
	{
		var o = cdm.changeJ;
		var arr = cdm.arr;
		
		var p1 = o.userData.jp[arr.p1].clone();
		var p2 = o.userData.jp[arr.p2].clone();
		
		o.userData.jp[arr.p1] = p2;
		o.userData.jp[arr.p2] = p1;	

console.log(4444, o.userData.qP);		
	}
		
	
	if(cdm.delete)
	{
		for(var index in cdm.result) 
		{ 
			delete cdm.result[index].userData.jp;
			delete cdm.result[index];
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








