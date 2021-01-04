


function paramSborkaRad_Odnotrub_Bok_Mp()
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
	inf.typePt2 = 'bok';
	inf.typeRad = 'st';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[0], pp: inf.list.pp.t[0]};
	inf.side = 'left';
	inf.kran = 'none';
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
	inf.list.mp.t = [0.020, 0.026];
	inf.list.pp.t = [0.025, 0.032];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016];	// трубы к радиаторам
	inf.list.mp.pipe.b1 = [0.016, 0.020];	// труба байпас
	inf.list.mp.pipe.m2 = [0.020, 0.026];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 332];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [364, 372];	// тройник для байпаса	

	
	inf.typePt = 'od_bay';
	inf.typePt2 = 'bok';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[1], pp: inf.list.pp.t[1]};
	inf.side = 'right';
	inf.kran = 'sharov';
	inf.termoreg = false;
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
	inf.list.mp.t = [0.020, 0.026, 0.032];
	inf.list.pp.t = [0.025, 0.032, 0.040];
	inf.list.mp.pipe = {};
	inf.list.mp.pipe.m1 = [0.016, 0.016, 0.016];	// трубы к радиаторам
	inf.list.mp.pipe.m2 = [0.020, 0.026, 0.032];	// трубы от тройников
	inf.list.mp.obj = {};
	inf.list.mp.obj.pr1 = [332, 332, 332];	// мп перехожник от рад к трубе
	inf.list.mp.obj.tr1 = [365, 368, 374];	// тройник для маг.труб

	
	inf.typePt = 'dv';
	inf.typePt2 = 'bok';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp.t[1], pp: inf.list.pp.t[1]};
	inf.side = 'right';
	inf.kran = 'sharov';
	inf.termoreg = false;
	inf.pipe_level = 0;
	
	inf.ui = {};	
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';
	
	inf.ui.catalog = {name: 'двухтр. сбоку'};

	return inf;
}




async function crSborkaRad_Odnotrub_Bok_Mp(cdm)
{
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
	
	var o = await getObjectsSborkaRad_1(cdm, dp);	
	
	// поворачиваем объекты, как они должны стоять	
	// получаем мировые значяения разъемов
	// устанвливаем раъемы		
	var arrR = (inf.side == 'right') ? [0,1,3,2] : [3,2,0,1];
	setPathRad_1({q1: q, arrR: arrR, result: o});		

	
	// трубы
	var d = baypasTube(cdm);
	
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};
	
	if(inf.typePt == 'od')
	{
		var ti1 = {type: 1, lengthX: 0.2, color: 15688453, diameter: d.mag, mirror: {x: (inf.side == 'right') ? true : false} };
		var ti2 = {type: 1, lengthX: 0.2, color: 505069, diameter: d.mag, mirror: {x: (inf.side == 'right') ? true : false} };	
	}
	
	if(inf.typePt == 'od_bay')
	{	
		var ti1 = {type: 1, lengthX: 0.1, color: 15688453, diameter: d.jr, mirror: mirror_1 };
		var ti2 = {type: 1, lengthX: 0.1, color: 505069, diameter: d.jr, mirror: mirror_1 };
	}
	
	if(inf.typePt == 'dv')
	{
		var ti1 = {type: 1, lengthX: 0.1, color: 15688453, diameter: d.jr, mirror: mirror_1 };
		var ti2 = {type: 1, lengthX: 0.1 + 0.1, color: 505069, diameter: d.jr, mirror: mirror_1 };
	}
	
	o.tube1 = getTubeToSborka_1(ti1);
	o.tube2 = getTubeToSborka_1(ti2);
		
	// из-за терморегулятора, меняется место установки трубы, подгоняем длину трубы, чтобы концы были на одном уровне
	var x1 = o.mpl_pereh_1.userData.jp[0].x - o.mpl_pereh_2.userData.jp[0].x;
	var point = o.tube1.userData.wf_tube.point[0].position.x -= x1;		
	updateTubeWF({tube: o.tube1});	
	
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

		if(tr_rev)
		{
			var p1 = o.troin_2.userData.jp[0].clone();
			var p2 = o.troin_2.userData.jp[2].clone();
			o.troin_2.userData.jp[0] = p2;
			o.troin_2.userData.jp[2] = p1;
			
			var p1 = o.troin_1.userData.jp[0].clone();
			var p2 = o.troin_1.userData.jp[2].clone();
			o.troin_1.userData.jp[0] = p2;
			o.troin_1.userData.jp[2] = p1;			
		}
		
		o.troin_1.position.copy( pos1.clone().sub(o.troin_1.userData.jp[2]) );
		o.troin_2.position.copy( pos2.clone().sub(o.troin_2.userData.jp[2]) );
		
		getRazyem({obj: o.troin_1});
		getRazyem({obj: o.troin_2});	

		if(tr_rev)
		{
			var p1 = o.troin_2.userData.jp[0].clone();
			var p2 = o.troin_2.userData.jp[2].clone();
			o.troin_2.userData.jp[0] = p2;
			o.troin_2.userData.jp[2] = p1;
			
			var p1 = o.troin_1.userData.jp[0].clone();
			var p2 = o.troin_1.userData.jp[2].clone();
			o.troin_1.userData.jp[0] = p2;
			o.troin_1.userData.jp[2] = p1;			
		}		
		
		// труба байпаса
		var point3 = [];
		point3[point3.length] = {pos: o.troin_1.userData.jp[1].clone()};
		point3[point3.length] = {pos: o.troin_2.userData.jp[1].clone()};
		o.tube3 = crTubeWF({point: point3, diameter: d.bay, color: 15688453, pVisible: false});
		setPosTube({tube: o.tube3, startPos: o.troin_1.userData.jp[1] });

		
		// трубы магистральные
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: d.mag, mirror: mirror_2});
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: d.mag, mirror: mirror_2});

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
		var lengthY = Math.abs(o.troin_1.userData.jp[0].y - o.troin_2.userData.jp[2].y) + 0.1; 
		
		o.tube3 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 15688453, diameter: d.mag, mirror: {y: true} });
		o.tube4 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 505069, diameter: d.mag, mirror: {y: false} });	
		o.tube5 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 15688453, diameter: d.mag, mirror: {y: false} });
		o.tube6 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 505069, diameter: d.mag, mirror: {y: true} });

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
















