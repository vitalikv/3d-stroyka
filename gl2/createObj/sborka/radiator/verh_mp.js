


function paramSborkaRad_Odnotrub_Verh_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.mp.t = [0.016, 0.020];
	inf.list.pp.t = [0.020, 0.025];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.020];	// трубы к радиаторам
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 334];	// мп перехожник от рад к трубе

	
	inf.typePt = 'od';
	inf.typePt2 = 'verh';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[0], pp: inf.list.pp.t[0]};
	inf.side = 'right';
	inf.kran = 'sharov';
	inf.termoreg = false;
	inf.pipe_level = 0;

	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Verh_Mp';
	
	inf.ui.catalog = {name: 'верхнее подкл.'};

	return inf;
}


function paramSborkaRad_Odnotrub_Verh_Bay_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.mp.t = [0.020, 0.026, 0.032];
	inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016, 0.020];	// трубы к радиаторам
	inf.list.mp.pipe.b1 = [0.016, 0.020, 0.026];	// труба байпас
	inf.list.mp.pipe.m2 = [0.020, 0.026, 0.032];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 332, 334];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [364, 369, 380];	// тройник для байпаса	
	
	inf.typePt = 'od_bay';
	inf.typePt2 = 'verh';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[1], pp: inf.list.pp.t[1]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = false;
	inf.pipe_level = -0.05;
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Verh_Mp';
	
	inf.ui.catalog = {name: 'верхнее подкл. с байпасом'};	

	return inf;
}


function paramSborkaRad_Dvuhtrub_Verh_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.mp.t = [0.020, 0.026, 0.032];
	inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016, 0.016];	// трубы к радиаторам
	inf.list.mp.pipe.m2 = [0.020, 0.026, 0.032];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 332, 332];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [365, 368, 374];	// тройник для маг.труб
	
	inf.typePt = 'dv';
	inf.typePt2 = 'verh';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[1], pp: inf.list.pp.t[1]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = false;
	inf.pipe_level = -0.05;
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Verh_Mp';
	
	inf.ui.catalog = {name: 'двухтр. верхнее подкл.'};	

	return inf;
}


async function crSborkaRad_Odnotrub_Verh_Mp(cdm)
{
	changeParamSbrRad_1(cdm);
	
	var inf = cdm.inf;
	
	
	var dp = {};
	var q = {};
	
	var tr_rev = false;
	if(inf.typePipe == 'mp')
	{
		if(inf.pipe.mp == 0.020 && inf.typePt == 'od_bay'){ tr_rev = true; }
	}
	
	if(inf.side == 'right')
	{		
		q.r_vozd = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.r_per1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.mpl_pereh_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		if(tr_rev) { q.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }
		else { q.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }	
	}
	else
	{
		q.r_zagl = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.r_per2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.mpl_pereh_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};		
		
		if(tr_rev) { q.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }
		else { q.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }	
	}
	
	dp.q = q;
	dp.rad = (inf.side == 'right') ? [3,1,0,2] : [0,2,3,1];
	
	var o = await getObjectsSborkaRad_1(cdm, dp);
	
	
	// трубы 
	var ind = inf.list[inf.typePipe].t.findIndex(item => item == inf.pipe[inf.typePipe]); 	
	var m1 = inf.list[inf.typePipe].pipe.m1[ind];
	if(inf.list[inf.typePipe].pipe.b1) var b1 = inf.list[inf.typePipe].pipe.b1[ind];
	if(inf.list[inf.typePipe].pipe.m2) var m2 = inf.list[inf.typePipe].pipe.m2[ind];
	
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};

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

	ti1.startPos = o.mpl_pereh_1.userData.jp[0];
	ti2.startPos = o.mpl_pereh_2.userData.jp[0];
	ti1.lastP = true;
	ti2.lastP = true;	

	o.tube1 = getTubeToSborka_1(ti1);
	o.tube2 = getTubeToSborka_1(ti2);		
	
	
	if(inf.typePt == 'od_bay' || inf.typePt == 'dv')
	{
		if(tr_rev)
		{
			setPathRad_1({changeJ: o.troin_2, arr: {p1: 0, p2: 2} });
			setPathRad_1({changeJ: o.troin_1, arr: {p1: 0, p2: 2} });			
		}
		
		// подключаем тройники к трубе	
		posSubAdd_1({o: o.troin_1, jp: 1, pos: o.tube1.userData.wf_tube.point[0].position});
		posSubAdd_1({o: o.troin_2, jp: 1, pos: o.tube2.userData.wf_tube.point[0].position});		
	}
	
	if(inf.typePt == 'od_bay')
	{	
		// труба байпаса
		var p1 = [o.troin_1.userData.jp[2].clone(), o.troin_2.userData.jp[2].clone()];		
		o.tube3 = getTubeToSborka_1({type: 'point', point: p1, color: 15688453, diameter: b1, startPos: o.troin_1.userData.jp[2]});
		
		// трубы магистральные
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0]});
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_1, startPos: o.troin_2.userData.jp[0]});		
	}
	
	if(inf.typePt == 'dv')
	{
		// трубы магистральные
		var lengthX = Math.abs(o.troin_1.userData.jp[0].x - o.troin_2.userData.jp[2].x) + 0.1; 
		
		o.tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: m2, mirror: mirror_1, startPos: o.troin_1.userData.jp[2]});	
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: m2, mirror: mirror_2, startPos: o.troin_2.userData.jp[2]});
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: m2, mirror: mirror_2, startPos: o.troin_1.userData.jp[0]});
		o.tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: m2, mirror: mirror_1, startPos: o.troin_2.userData.jp[0]});			
	}
	

	var arrO = setPathRad_1({arrO1: true, result: o});
	
	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену

	setPathRad_1({delete: true, result: o});

	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

