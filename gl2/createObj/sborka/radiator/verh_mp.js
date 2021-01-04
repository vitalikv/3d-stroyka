


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
	var inf = cdm.inf;
	
	var o = await getObjectsSborkaRad_1(cdm);
	
	var o1 = {};
	
	var flag = true;
	if(inf.typePipe == 'mp')
	{
		if(inf.pipe.mp == 0.020 && inf.typePt == 'od_bay'){ flag = false; }
	}
	
	if(inf.side == 'right')
	{		
		o1.r_vozd = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.r_per1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.reg_kran_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.mpl_pereh_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		if(flag) { o1.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }
		else { o1.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }
	}
	else
	{
		o1.r_zagl = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.r_per2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.reg_kran_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.mpl_pereh_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};		
		
		if(flag) { o1.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }
		else { o1.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0)}; }
	}
	
	// поворачиваем объекты, как они должны стоять	
	// получаем мировые значяения разъемов
	// устанвливаем раъемы			
	var arrR = (inf.side == 'right') ? [3,1,0,2] : [0,2,3,1];
	setPathRad_1({q1: o1, arrR: arrR, result: o});	
	
	
	// трубы магистральные
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};

	var d = baypasTube(cdm);
	
	if(inf.typePt == 'od')
	{
		var y1 = o.rad.userData.jp[1].y - o.rad.userData.jp[0].y; 
		
		o.tube1 = getTubeToSborka_1({type: 3, color: 15688453, diameter: d.mag, startY: inf.pipe_level, endY: y1, mirror: mirror_1});
		o.tube2 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 505069, diameter: d.mag, mirror: mirror_2});
		
		setPosTube({tube: o.tube1, lastP: true, startPos: o.mpl_pereh_1.userData.jp[0] });
		setPosTube({tube: o.tube2, lastP: true, startPos: o.mpl_pereh_2.userData.jp[0] });		
	}
	
	if(inf.typePt == 'od_bay')
	{
		var y1 = o.rad.userData.jp[1].y - o.rad.userData.jp[0].y;
		o.tube1 = getTubeToSborka_1({type: 2, color: 15688453, diameter: d.jr, startY: inf.pipe_level, endY: y1, mirror: mirror_1});
		o.tube2 = getTubeToSborka_1({type: 2, color: 505069, diameter: d.jr, startY: inf.pipe_level, endY: 0.00, mirror: mirror_2});		
		
		// --- устанвливаем трубы	
		setPosTube({tube: o.tube1, lastP: true, startPos: o.mpl_pereh_1.userData.jp[0] });
		setPosTube({tube: o.tube2, lastP: true, startPos: o.mpl_pereh_2.userData.jp[0] });
		
		
		// байпас
		var pos1 = o.tube1.userData.wf_tube.point[0].position;
		var pos2 = o.tube2.userData.wf_tube.point[0].position;
		
		o.troin_1.position.copy( pos1.clone().sub(o.troin_1.userData.jp[1]) );
		o.troin_2.position.copy( pos2.clone().sub(o.troin_2.userData.jp[1]) );
		
		getRazyem({obj: o.troin_1});
		getRazyem({obj: o.troin_2});
		
		if(!flag)
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
		var y1 = o.rad.userData.jp[1].y - o.rad.userData.jp[0].y;
		o.tube1 = getTubeToSborka_1({type: 2, color: 15688453, diameter: d.jr, startY: inf.pipe_level, endY: y1, mirror: mirror_1});
		o.tube2 = getTubeToSborka_1({type: 2, color: 505069, diameter: d.jr, startY: inf.pipe_level - 0.05, endY: 0.00, mirror: mirror_2});		

		// --- устанвливаем трубы	
		setPosTube({tube: o.tube1, lastP: true, startPos: o.mpl_pereh_1.userData.jp[0] });
		setPosTube({tube: o.tube2, lastP: true, startPos: o.mpl_pereh_2.userData.jp[0] });
		
		
		// байпас
		var pos1 = o.tube1.userData.wf_tube.point[0].position;
		var pos2 = o.tube2.userData.wf_tube.point[0].position;
		
		o.troin_1.position.copy( pos1.clone().sub(o.troin_1.userData.jp[1]) );
		o.troin_2.position.copy( pos2.clone().sub(o.troin_2.userData.jp[1]) );
		
		getRazyem({obj: o.troin_1});
		getRazyem({obj: o.troin_2});


		
		// трубы магистральные
		var lengthX = Math.abs(o.troin_1.userData.jp[0].x - o.troin_2.userData.jp[2].x) + 0.1; 
		
		o.tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: d.mag, mirror: mirror_1});	
		o.tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: d.mag, mirror: mirror_2});
		o.tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: d.mag, mirror: mirror_2});
		o.tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: d.mag, mirror: mirror_1});

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

