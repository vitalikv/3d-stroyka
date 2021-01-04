


function paramSborkaRad_Odnotrub_Niz_Mp()
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

	winf = {arch: {}};
	winf.arch.rad = [];
	winf.arch.rad[0] = {zg: 0};
	winf.arch.rad[1] = {rp1: 0};
	winf.arch.rad[2] = {rp2: 0};
	winf.arch.rad[3] = {vd: 0};
	
	console.log(5555, JSON.stringify(winf), winf);
	for(var index in winf.arch.rad)  
	{ 
		//var obj = winf.arch.rad[index];
		//if(!obj) continue;
	}
		
		
function paramSborkaRad_Odnotrub_Niz_Bay_Mp()
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
	inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016, 0.016];	// трубы к радиаторам
	inf.list.mp.pipe.m2 = [0.020, 0.026, 0.032];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 332, 332];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [365, 368, 374];	// тройник для маг.труб	
	
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
	var inf = cdm.inf;
	
	var dp = {};
	dp.rad = (inf.side == 'right') ? [2,1,0,3] : [1,2,3,0];
	
	
	var q = {};
	
	if(inf.side == 'right')
	{		
		q.r_vozd = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.r_per1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.mpl_pereh_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		q.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
	}
	else
	{
		q.r_zagl = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.r_per2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.reg_kran_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		q.mpl_pereh_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		q.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
	}
	
	dp.q = q;
	
	var o = await getObjectsSborkaRad_1(cdm, dp);
	
	// поворачиваем объекты, как они должны стоять	
	// получаем мировые значяения разъемов
	// устанвливаем раъемы		
	var arrR = (inf.side == 'right') ? [2,1,0,3] : [1,2,3,0];
	setPathRad_1({q1: q, arrR: arrR, result: o});	
	
	

	// трубы магистральные
	var d = baypasTube(cdm);
	
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};

	if(inf.typePt == 'od')
	{ 
		var ti1 = {type: 1, lengthX: 0.2, color: 15688453, diameter: d.mag, mirror: mirror_1};
		var ti2 = {type: 1, lengthX: 0.2, color: 505069, diameter: d.mag, mirror: mirror_2};
	}
	
	if(inf.typePt == 'od_bay')
	{ 
		var ti1 = {type: 2, color: 15688453, diameter: d.jr, startY: inf.pipe_level, endY: 0.00, mirror: mirror_1};
		var ti2 = {type: 2, color: 505069, diameter: d.jr, startY: inf.pipe_level, endY: 0.00, mirror: mirror_2};
	}
	
	if(inf.typePt == 'dv')
	{ 
		var ti1 = {type: 2, color: 15688453, diameter: d.jr, startY: inf.pipe_level, endY: 0.00, mirror: mirror_1 };
		var ti2 = {type: 2, color: 505069, diameter: d.jr, startY: inf.pipe_level - 0.05, endY: 0.00, mirror: mirror_2 };
	}	
	
	o.tube1 = getTubeToSborka_1(ti1);
	o.tube2 = getTubeToSborka_1(ti2);	
	
	setPosTube({tube: o.tube1, lastP: true, startPos: o.mpl_pereh_1.userData.jp[0] });
	setPosTube({tube: o.tube2, lastP: true, startPos: o.mpl_pereh_2.userData.jp[0] });
	
	
	if(inf.typePt == 'od')
	{
	}
	
	if(inf.typePt == 'od_bay')
	{
		// байпас	
		var pos1 = o.tube1.userData.wf_tube.point[0].position;
		var pos2 = o.tube2.userData.wf_tube.point[0].position;
		
		o.troin_1.position.copy( pos1.clone().sub(o.troin_1.userData.jp[1]) );
		o.troin_2.position.copy( pos2.clone().sub(o.troin_2.userData.jp[1]) );
		
		getRazyem({obj: o.troin_1});
		getRazyem({obj: o.troin_2});
		
		
		
		// труба байпаса
		var point3 = [];
		point3[point3.length] = {pos: o.troin_1.userData.jp[2].clone()};
		point3[point3.length] = {pos: o.troin_2.userData.jp[2].clone()};		
		o.tube3 = crTubeWF({point: point3, diameter: d.bay, color: 15688453, pVisible: false});
		setPosTube({tube: o.tube3, startPos: o.troin_1.userData.jp[2] });
			
		
		// трубы магистральные
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: d.mag, mirror: mirror_2});
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: d.mag, mirror: mirror_1});

		setPosTube({tube: o.tube4, startPos: o.troin_1.userData.jp[0] });
		setPosTube({tube: o.tube5, startPos: o.troin_2.userData.jp[0] });		
	}
	
	
	if(inf.typePt == 'dv')
	{	
		// байпас
		var pos1 = o.tube1.userData.wf_tube.point[0].position;
		var pos2 = o.tube2.userData.wf_tube.point[0].position;
		
		o.troin_1.position.copy( pos1.clone().sub(o.troin_1.userData.jp[1]) );
		o.troin_2.position.copy( pos2.clone().sub(o.troin_2.userData.jp[1]) );
		
		getRazyem({obj: o.troin_1});
		getRazyem({obj: o.troin_2});

		
		// трубы магистральные
		var lengthX = Math.abs(o.troin_1.userData.jp[0].x - o.troin_2.userData.jp[2].x) + 0.1;
		
		o.tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: d.mag, mirror: mirror_1 });
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: d.mag, mirror: mirror_2 });	
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: d.mag, mirror: mirror_2 });
		o.tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: d.mag, mirror: mirror_1 });

		setPosTube({tube: o.tube3, startPos: o.troin_1.userData.jp[2] });	
		setPosTube({tube: o.tube4, startPos: o.troin_2.userData.jp[2] });
		setPosTube({tube: o.tube5, startPos: o.troin_1.userData.jp[0] });
		setPosTube({tube: o.tube6, startPos: o.troin_2.userData.jp[0] });			
	}
	
	var arrO = setPathRad_1({arrO1: true, result: o});

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену


	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

