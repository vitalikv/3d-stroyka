


function paramSborkaRad_Odnotrub_Niz_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.mp.t = [0.016, 0.020];	
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.020];	// трубы к радиаторам
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 334];	// мп перехожник от рад к трубе

	inf.list.pp.t = [0.020, 0.025];
	inf.list.pp.pipe = {};
	inf.list.pp.pipe.m1 = [0.020, 0.025];	// трубы к радиаторам
	inf.list.pp.obj = {};
	inf.list.pp.obj.pr1 = [282, 284];	// пп перехожник от рад к трубе
	
	
	inf.typePt = 'od';
	inf.typePt2 = 'niz';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[0], pp: inf.list.pp.t[0]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = true;
	inf.pipe_level = 0;
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Niz_Mp';
	
	inf.ui.catalog = {name: 'нижнее подкл.'};

	return inf;
}

		
		
function paramSborkaRad_Odnotrub_Niz_Bay_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.mp.t = [0.020, 0.026];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016, 0.020];	// трубы к радиаторам
	inf.list.mp.pipe.b1 = [0.016, 0.020, 0.026];	// труба байпас
	inf.list.mp.pipe.m2 = [0.020, 0.026, 0.032];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [409, 409, 334];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [364, 369, 380];	// тройник для байпаса	

	//inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.pp.t = [0.025, 0.032];
	inf.list.pp.pipe = {};
	inf.list.pp.pipe.m1 = [0.020, 0.020, 0.025];	// трубы к радиаторам
	inf.list.pp.pipe.b1 = [0.020, 0.025, 0.032];	// труба байпас
	inf.list.pp.pipe.m2 = [0.025, 0.032, 0.040];	// трубы от тройников
	inf.list.pp.obj = {};
	inf.list.pp.obj.pr1 = [250, 250, 284];	// пп перехожник от рад к трубе	
	inf.list.pp.obj.tr1 = [300, 303, 380];	// тройник для байпаса
	
	//{'rad[0]'->'[1]rp1[0]'->'[0]kran[1]'->'[0]pr1[1]'->'[0]tube1[1]'->'[1]tr1[2]'->'[0]tube2'}
	//{'tr1[2]'->'[1]tube3'}
		
	inf.typePt = 'od_bay';
	inf.typePt2 = 'niz';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[1], pp: inf.list.pp.t[1]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = true;
	inf.pipe_level = -0.05;
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Niz_Mp';
	
	inf.ui.catalog = {name: 'нижнее подкл. с байпасом'};	

	return inf;
}


function paramSborkaRad_Dvuhtrub_Niz_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.mp.t = [0.020, 0.026, 0.032];	
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016, 0.016];	// трубы к радиаторам
	inf.list.mp.pipe.m2 = [0.020, 0.026, 0.032];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [409, 409, 409];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [365, 368, 374];	// тройник для маг.труб	
	
	inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.pp.pipe = {};
	inf.list.pp.pipe.m1 = [0.020, 0.020, 0.020];	// трубы к радиаторам
	inf.list.pp.pipe.m2 = [0.025, 0.032, 0.040];	// трубы от тройников
	inf.list.pp.obj = {};
	inf.list.pp.obj.pr1 = [250, 250, 250];	// пп перехожник от рад к трубе
	inf.list.pp.obj.tr1 = [301, 304, 308];	// тройник для маг.труб		
	
	inf.typePt = 'dv';
	inf.typePt2 = 'niz';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[1], pp: inf.list.pp.t[1]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = true;
	inf.pipe_level = -0.05;
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Niz_Mp';
	
	inf.ui.catalog = {name: 'двухтр. нижнее подкл.'};	

	return inf;
}


async function crSborkaRad_Odnotrub_Niz_Mp(cdm)
{
	changeParamSbrRad_1(cdm);
	
	var inf = cdm.inf;
	
	var dp = {};
	dp.rad = (inf.side == 'right') ? [2,1,0,3] : [1,2,3,0];
	
	
	var q = {};

	var tr_rev = false;
	var pp_rev = false;
	if(inf.typePipe == 'mp')
	{
		if(inf.pipe.mp == 0.020 && inf.typePt == 'od_bay'){ tr_rev = true; }
	}
	
	if(inf.typePt == 'od_bay' || inf.typePt == 'dv') pp_rev = true;
	
	if(inf.side == 'right')
	{		
		q.r_vozd = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.r_per1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		q.mpl_pereh_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		if(pp_rev) 
		{ 
			q.mpl_pereh_1 = {q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, 0))};
			q.mpl_pereh_2 = {q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0))}; 
		}					

		if(tr_rev) { q.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0) }; }
		else { q.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }				
	}
	else
	{
		q.r_zagl = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.r_per2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		q.mpl_pereh_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		if(pp_rev) 
		{ 
			q.mpl_pereh_1 = {q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0))};
			q.mpl_pereh_2 = {q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, 0))}; 
		}		
	
		if(tr_rev) { q.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0) }; }
		else { q.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }				
	}
	
	
	
	dp.q = q;
	dp.rad = (inf.side == 'right') ? [2,1,0,3] : [1,2,3,0];
	
	var qP = {};
	if(tr_rev) 
	{
		qP.troin_1 = {p1: 0, p2: 2};
		qP.troin_2 = {p1: 0, p2: 2};
	}
	
	dp.qP = qP;
	
	var o = await getObjectsSborkaRad_1(cdm, dp);	
	
	var arrO = setPathRad_1({arrO1: true, result: o});

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену

	setPathRad_1({delete: true, result: o});

	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

