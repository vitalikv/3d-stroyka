
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
	arr[arr.length] = {value: 'al', text: 'алюминиевый радиатор', ps: {typeRad: 'al'} }; 
	arr[arr.length] = {value: 'st', text: 'стальной радиатор', ps: {typeRad: 'st'} };
	var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.typeRad, inf: cdm.inf});	
	idd.el.style.marginTop = '5px';
	
	if(cdm.inf.typeRad == 'al')
	{
		var arr = [];
		arr[arr.length] = {value: 1, text: '1 секция', ps: {alCount: 1} }; 
		arr[arr.length] = {value: 2, text: '2 секции', ps: {alCount: 2} };
		arr[arr.length] = {value: 3, text: '3 секции', ps: {alCount: 3} };
		arr[arr.length] = {value: 4, text: '4 секции', ps: {alCount: 4} }; 
		arr[arr.length] = {value: 5, text: '5 секций', ps: {alCount: 5} };
		arr[arr.length] = {value: 6, text: '6 секций', ps: {alCount: 6} };
		arr[arr.length] = {value: 7, text: '7 секций', ps: {alCount: 7} };
		arr[arr.length] = {value: 8, text: '8 секций', ps: {alCount: 8} };
		arr[arr.length] = {value: 9, text: '9 секций', ps: {alCount: 9} };
		arr[arr.length] = {value: 10, text: '10 секций', ps: {alCount: 10} };
		var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.rad.al.count, inf: cdm.inf});


		var arr = [];
		arr[arr.length] = {value: 0.2, text: 'h 200', ps: {alY: 0.2} }; 
		arr[arr.length] = {value: 0.35, text: 'h 350', ps: {alY: 0.35} };
		arr[arr.length] = {value: 0.5, text: 'h 500', ps: {alY: 0.5} };
		arr[arr.length] = {value: 0.6, text: 'h 600', ps: {alY: 0.6} }; 
		arr[arr.length] = {value: 0.7, text: 'h 700', ps: {alY: 0.7} };
		arr[arr.length] = {value: 0.8, text: 'h 800', ps: {alY: 0.8} };
		var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.rad.al.y, inf: cdm.inf});		
	}


	if(cdm.inf.typeRad == 'st')
	{
		var arr = [];
		var arr2 = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.4, 1.6, 1.8, 2];
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: 'длина '+arr2[i]+'м', ps: {stX: arr2[i]} };
		}		
		var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.rad.st.x, inf: cdm.inf});


		var arr = [];
		var arr2 = [0.3, 0.4, 0.5, 0.6, 0.9];
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: 'h '+(arr2[i]*1000), ps: {stY: arr2[i]} };
		}		
		var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.rad.st.y, inf: cdm.inf});		
	}	
	
	
	var elBroder = document.createElement('div');
	elBroder.style.cssText = `border-bottom: 1px solid #ccc;`;
	el.append(elBroder);

	var elText = document.createElement('div');
	elText.innerText = 'трубы';
	elText.style.cssText = `margin-top: 10px; font-family: arial,sans-serif; font-size: 18px; color: #666; text-decoration: none; text-align: center;`;
	el.append(elText);	

	var arr = [];
	arr[arr.length] = {value: 'mp', text: 'металлопластиковые трубы', ps: {typePipe: 'mp'} }; 
	arr[arr.length] = {value: 'pp', text: 'полипропиленовые трубы', ps: {typePipe: 'pp'} };
	var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.typePipe, inf: cdm.inf});
	idd.el.style.marginTop = '5px';
	
	
	if(cdm.inf.typePipe == 'mp')
	{
		var arr = [];
		var arr2 = cdm.inf.list.mp.t;
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: (arr2[i]*1000)+ ' (магистральная труба)', ps: {pipeMp: arr2[i]} };
		}

		var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.pipe.mp, inf: cdm.inf});			
	}
	
	if(cdm.inf.typePipe == 'pp')
	{
		var arr = [];
		var arr2 = cdm.inf.list.pp.t;
		
		for(var i = 0; i < arr2.length; i++)
		{
			arr[arr.length] = {value: arr2[i], text: (arr2[i]*1000)+ ' (магистральная труба)', ps: {pipePp: arr2[i]} };
		}

		var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.pipe.pp, inf: cdm.inf});			
	}	
	
	var arr = [];
	arr[arr.length] = {value: 'left', text: 'подключение слева', ps: {side: 'left'} }; 
	arr[arr.length] = {value: 'right', text: 'подключение справа', ps: {side: 'right'} };
	var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.side, inf: cdm.inf});


	var elBroder = document.createElement('div');
	elBroder.style.cssText = `border-bottom: 1px solid #ccc;`;
	el.append(elBroder);
	
	var elText = document.createElement('div');
	elText.innerText = 'фитинги';
	elText.style.cssText = `margin-top: 10px; font-family: arial,sans-serif; font-size: 18px; color: #666; text-decoration: none; text-align: center;`;
	el.append(elText);	

	
	var arr = [];
	arr[arr.length] = {value: 'none', text: 'без кранов', ps: {kran: 'none'} }; 
	arr[arr.length] = {value: 'regulator', text: 'регулировочные краны', ps: {kran: 'regulator'} };
	arr[arr.length] = {value: 'sharov', text: 'шаровые краны', ps: {kran: 'sharov'} };
	var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.kran, inf: cdm.inf});
	idd.el.style.marginTop = '5px';
	
	
	var arr = [];
	arr[arr.length] = {value: false, text: 'без терморегулятора', ps: {termoreg: false} }; 
	arr[arr.length] = {value: true, text: 'с терморегулятором', ps: {termoreg: true} };
	var idd = new SelectList_1(el, {arrList: arr, fc: 'aCamView', selectItem: cdm.inf.termoreg, inf: cdm.inf});
			
	
	//el.style.display = '';
	//el.style.display = 'none';			
	
	return { el: el };
}	







function changeParamSbrRad_1(cdm)
{
	var inf = cdm.inf;
	
	if(cdm.typePipe) { inf.typePipe = cdm.typePipe; }
	if(cdm.typeRad) { inf.typeRad = cdm.typeRad; }
	if(cdm.stX) { inf.rad.st.x = cdm.stX; }
	if(cdm.stY) { inf.rad.st.y = cdm.stY; }
	if(cdm.alCount) { inf.rad.al.count = cdm.alCount; }
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
	
	var notArray = (cdm.addScene) ? false : true;
	
	var vt1 = [];
	
	var radLotId = getRadLotId(inf);
	
	if(radLotId)
	{
		o.rad = await loadObjServer({lotid: radLotId, pos: pos0, notArray: notArray});
	}
	else
	{
		return o;
	}
	
	//return o;
	var pos0 = new THREE.Vector3();
	
	if(inf.typeRad == 'st')
	{		
		o.r_vozd = await loadObjServer({lotid: 451, pos: pos0, notArray: notArray});	
		o.r_zagl = await loadObjServer({lotid: 452, pos: pos0, notArray: notArray});		
	}
	else
	{
		o.r_per1 = await loadObjServer({lotid: 18, pos: pos0, notArray: notArray});
		o.r_vozd = await loadObjServer({lotid: 21, pos: pos0, notArray: notArray});	
		o.r_per2 = await loadObjServer({lotid: 18, pos: pos0, notArray: notArray});
		o.r_zagl = await loadObjServer({lotid: 20, pos: pos0, notArray: notArray});				
	}



	function getRadLotId(inf)
	{
		
		var lotId = null;
		
		if(inf.typeRad == 'st')
		{
			var x = inf.rad.st.x;
			var y = inf.rad.st.y;	
			var arr = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.4, 1.6, 1.8, 2];
			
			if(y == 0.3){ for(var i = 0; i < arr.length; i++){ if(arr[i] == x) { lotId = 82 + i; break; } } }
			if(y == 0.4){ for(var i = 0; i < arr.length; i++){ if(arr[i] == x) { lotId = 94 + i; break; } } }
			if(y == 0.5){ for(var i = 0; i < arr.length; i++){ if(arr[i] == x) { lotId = 106 + i; break; } } }
			if(y == 0.6){ for(var i = 0; i < arr.length; i++){ if(arr[i] == x) { lotId = 118 + i; break; } } }
			if(y == 0.9){ for(var i = 0; i < arr.length; i++){ if(arr[i] == x) { lotId = 130 + i; break; } } }		
		}
		else if(inf.typeRad == 'al')
		{
			var count = inf.rad.al.count;
			var y = inf.rad.al.y;
			
			if(y == 0.2){ for(var i = 0; i < 10; i++){ if(i+1 == count) { lotId = 22 + i; break; } } }
			if(y == 0.35){ for(var i = 0; i < 10; i++){ if(i+1 == count) { lotId = 32 + i; break; } } }
			if(y == 0.5){ for(var i = 0; i < 10; i++){ if(i+1 == count) { lotId = 42 + i; break; } } }
			if(y == 0.6){ for(var i = 0; i < 10; i++){ if(i+1 == count) { lotId = 52 + i; break; } } }
			if(y == 0.7){ for(var i = 0; i < 10; i++){ if(i+1 == count) { lotId = 62 + i; break; } } }
			if(y == 0.8){ for(var i = 0; i < 10; i++){ if(i+1 == count) { lotId = 72 + i; break; } } }
		}
		
		return lotId;
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
	
	if(kran1[0]) o.reg_kran_1 = await loadObjServer({lotid: kran1[0], pos: pos0, notArray: notArray});
	if(kran1[1]) o.reg_kran_2 = await loadObjServer({lotid: kran1[1], pos: pos0, notArray: notArray});
	
	// [0.016, 0.020, 0.026].findIndex(item => item == 0.020);
	var ind = inf.list[inf.typePipe].t.findIndex(item => item == inf.pipe[inf.typePipe]);	// получаем index, трубы которая выбрана  	
	
	
	//------- металлопластиковые переходники	
	if(inf.list[inf.typePipe].obj.pr1)
	{
		var lotid = inf.list[inf.typePipe].obj.pr1[ind];
		if(!Array.isArray(lotid)){ var lotid1 = lotid; var lotid2 = lotid; }
		else { var lotid1 = lotid[0]; var lotid2 = lotid[1]; }
		
		o.mpl_pereh_1 = await loadObjServer({lotid: lotid1, pos: pos0, notArray: notArray});
		o.mpl_pereh_2 = await loadObjServer({lotid: lotid2, pos: pos0, notArray: notArray});		
	}
	
	
	if(inf.list[inf.typePipe].obj.tr1)
	{
		var lotid = inf.list[inf.typePipe].obj.tr1[ind];
		o.troin_1 = await loadObjServer({lotid: lotid, pos: pos0, notArray: notArray});
		o.troin_2 = await loadObjServer({lotid: lotid, pos: pos0, notArray: notArray});	
	}
	
	if(inf.list[inf.typePipe].obj.ug1)
	{
		var lotid = inf.list[inf.typePipe].obj.ug1[ind];
		o.ugol_1 = await loadObjServer({lotid: lotid, pos: pos0, notArray: notArray});
		o.ugol_2 = await loadObjServer({lotid: lotid, pos: pos0, notArray: notArray});	
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
	ti1.notArray = notArray;
	ti2.notArray = notArray;
	
	o.tube1 = getTubeToSborka_1(ti1);
	o.tube2 = getTubeToSborka_1(ti2);	


	if(inf.typePipe == 'pp' && inf.typePt2 == 'verh' && inf.typePt == 'od')
	{
		if(o.ugol_1) { posSubAdd_1({o: o.ugol_1, jp: 0, pos: o.tube1.userData.wf_tube.point[0].position}); }
		if(o.ugol_2) { posSubAdd_1({o: o.ugol_2, jp: 0, pos: o.tube2.userData.wf_tube.point[0].position}); }
		
		// трубы магистральные
		o.tube3 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m1, mirror: mirror_2, startPos: o.ugol_1.userData.jp[1], notArray: notArray});
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m1, mirror: mirror_1, startPos: o.ugol_2.userData.jp[1], notArray: notArray});		
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
		o.tube3 = getTubeToSborka_1({type: 'point', point: p1, color: 15688453, diameter: b1, startPos: o.troin_1.userData.jp[nJp], notArray: notArray});
		
		// трубы магистральные
		var mirror_3 = (inf.typePt2 == 'bok') ? mirror_2 : mirror_1;
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0], notArray: notArray});
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_3, startPos: o.troin_2.userData.jp[0], notArray: notArray});	
	}
	
	
	if(inf.typePt == 'dv')
	{
		// трубы магистральные
		if(inf.typePt2 == 'niz')
		{	
			var lengthX = Math.abs(o.troin_1.userData.jp[0].x - o.troin_2.userData.jp[2].x) + 0.1;
			
			o.tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: m2, mirror: mirror_1, startPos: o.troin_1.userData.jp[2], notArray: notArray });
			o.tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: m2, mirror: mirror_2, startPos: o.troin_2.userData.jp[2], notArray: notArray });	
			o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0], notArray: notArray });
			o.tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_1, startPos: o.troin_2.userData.jp[0], notArray: notArray });			
		}

		if(inf.typePt2 == 'verh')
		{	
			var lengthX = Math.abs(o.troin_1.userData.jp[0].x - o.troin_2.userData.jp[2].x) + 0.1; 
			
			o.tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: m2, mirror: mirror_1, startPos: o.troin_1.userData.jp[2], notArray: notArray});	
			o.tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: m2, mirror: mirror_2, startPos: o.troin_2.userData.jp[2], notArray: notArray});
			o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0], notArray: notArray});
			o.tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_1, startPos: o.troin_2.userData.jp[0], notArray: notArray});	
		}

		if(inf.typePt2 == 'bok')
		{	
			var lengthY = Math.abs(o.troin_1.userData.jp[0].y - o.troin_2.userData.jp[2].y) + 0.1; 
			
			o.tube3 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 15688453, diameter: m2, mirror: {y: true}, startPos: o.troin_1.userData.jp[2], notArray: notArray });
			o.tube4 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 505069, diameter: m2, mirror: {y: false}, startPos: o.troin_2.userData.jp[2], notArray: notArray });	
			o.tube5 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 15688453, diameter: m2, mirror: {y: false}, startPos: o.troin_1.userData.jp[0], notArray: notArray });
			o.tube6 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 505069, diameter: m2, mirror: {y: true}, startPos: o.troin_2.userData.jp[0], notArray: notArray });	
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








