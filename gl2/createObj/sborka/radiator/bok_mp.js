


function paramSborkaRad_Odnotrub_Bok_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.nameFc = 'sborkaRadiator';
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
	inf.typePt2 = 'bok';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {count: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[0], pp: inf.list.pp.t[0]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = true;
	inf.pipe_level = 0;
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';

	inf.ui.catalog = {name: 'подкл. сбоку'};

	return inf;
}


function paramSborkaRad_Odnotrub_Bok_Bay_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.nameFc = 'sborkaRadiator';
	inf.list.mp.t = [0.020, 0.026];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016];	// трубы к радиаторам
	inf.list.mp.pipe.b1 = [0.016, 0.020];	// труба байпас
	inf.list.mp.pipe.m2 = [0.020, 0.026];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 332];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [364, 372];	// тройник для байпаса	

	//inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.pp.t = [0.025, 0.032];
	inf.list.pp.pipe = {};
	inf.list.pp.pipe.m1 = [0.020, 0.020, 0.025];	// трубы к радиаторам
	inf.list.pp.pipe.b1 = [0.020, 0.025, 0.032];	// труба байпас
	inf.list.pp.pipe.m2 = [0.025, 0.032, 0.040];	// трубы от тройников
	inf.list.pp.obj = {};
	inf.list.pp.obj.pr1 = [282, 282, 284];	// пп перехожник от рад к трубе	
	inf.list.pp.obj.tr1 = [300, 305, 380];	// тройник для байпаса
	
	inf.typePt = 'od_bay';
	inf.typePt2 = 'bok';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {count: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[0], pp: inf.list.pp.t[0]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = true;
	inf.pipe_level = 0;
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';
	
	inf.ui.catalog = {name: 'подкл. сбоку с байпасом'};

	return inf;
}


function paramSborkaRad_Dvuhtrub_Bok_Mp()
{
	var inf = {};
	
	inf.list = {mp: {}, pp: {}};
	inf.list.nameFc = 'sborkaRadiator';
	inf.list.mp.t = [0.020, 0.026, 0.032];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016, 0.016];	// трубы к радиаторам
	inf.list.mp.pipe.m2 = [0.020, 0.026, 0.032];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 332, 332];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [365, 368, 374];	// тройник для маг.труб

	inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.pp.pipe = {};
	inf.list.pp.pipe.m1 = [0.020, 0.020, 0.020];	// трубы к радиаторам
	inf.list.pp.pipe.m2 = [0.025, 0.032, 0.040];	// трубы от тройников
	inf.list.pp.obj = {};
	inf.list.pp.obj.pr1 = [282, 282, 282];	// мп перехожник от рад к трубе
	inf.list.pp.obj.tr1 = [301, 304, 308];	// тройник для маг.труб	
	
	inf.typePt = 'dv';
	inf.typePt2 = 'bok';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {count: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[0], pp: inf.list.pp.t[0]};
	inf.side = 'left';
	inf.kran = 'regulator';
	inf.termoreg = true;
	inf.pipe_level = 0;
	
	inf.ui = {};	
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';
	
	inf.ui.catalog = {name: 'двухтр. сбоку'};

	return inf;
}




async function crSborkaRad_Odnotrub_Bok_Mp(cdm)
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
		q.r_zagl = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.mpl_pereh_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.mpl_pereh_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};

		if(tr_rev)
		{
			q.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0)) };
			q.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, Math.PI)) };			
		}		
		else if(inf.typePt == 'od_bay')
		{
			q.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, 0)) };
			q.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, Math.PI)) };				
		}		
		else
		{
			q.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, Math.PI/2)) };
			q.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI/2)) };					
		}
	}
	else
	{
		q.r_per1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.r_per2 = {q: new THREE.Quaternion(0, -1, 0, 0)};

		if(tr_rev)
		{
			q.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, 0)) };
			q.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, Math.PI)) };				
		}		
		else if(inf.typePt == 'od_bay')
		{
			q.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0)) };
			q.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, Math.PI)) };			
		}
		else
		{
			q.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI/2)) };
			q.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, -Math.PI/2)) };					
		}
	}
	

	dp.q = q;
	dp.rad = (inf.side == 'right') ? [0,1,3,2] : [3,2,0,1];		

	var qP = {};
	if(tr_rev) 
	{
		qP.troin_1 = {p1: 0, p2: 2};
		qP.troin_2 = {p1: 0, p2: 2};
	}
	
	dp.qP = qP;	
	
	var o = await getObjectsSborkaRad_1(cdm, dp);
	
	var arrO = setPathRad_1({arrO1: true, result: o});

	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену
	
	setPathRad_1({delete: true, result: o});
	
	return { arr1: arrO };
}
















