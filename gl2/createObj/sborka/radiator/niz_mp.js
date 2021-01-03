


function paramSborkaRad_Odnotrub_Niz_Mp()
{
	var inf = {};
	
	inf.list = {};
	inf.list.mp = [0.016, 0.020];
	inf.list.pp = [0.020, 0.025];
	
	inf.typePt = 'od';
	inf.typePt2 = 'niz';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp[0], pp: inf.list.pp[0]};
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
	
	inf.list = {};
	inf.list.mp = [0.020, 0.026, 0.032];
	inf.list.pp = [0.025, 0.032, 0.040];
	
	inf.typePt = 'od_bay';
	inf.typePt2 = 'niz';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp[1], pp: inf.list.pp[1]};
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
	
	inf.list = {};
	inf.list.mp = [0.020, 0.026, 0.032];
	inf.list.pp = [0.025, 0.032, 0.040];
	
	inf.typePt = 'dv';
	inf.typePt2 = 'niz';
	inf.typeRad = 'al';
	inf.typePipe = 'mp';
	inf.rad = {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}};
	inf.pipe = {mp: inf.list.mp[1], pp: inf.list.pp[1]};
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
		
	var o = await getObjectsSborkaRad_1(cdm);
	
	var arrO = setPathRad_1({arrO1: true, result: o});
	
	
	var o1 = {};
	
	if(inf.side == 'right')
	{		
		o1.r_vozd = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.r_per1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.reg_kran_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.mpl_pereh_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		o1.troin_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
	}
	else
	{
		o1.r_zagl = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.r_per2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.reg_kran_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.mpl_pereh_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		o1.troin_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
	}
	
	setPathRad_1({q1: o1, result: o});	// поворачиваем объекты, как они должны стоять	
	
	
	// --- получаем мировые значяения разъемов
	var posJ = setPathRad_1({posJ1: true, result: o});			

	// --- устанвливаем раъемы

	var arrR = (inf.side == 'right') ? [2,1,0,3] : [1,2,3,0];
	setPathRad_1({pos0: true, posJ: posJ, arrR: arrR, result: o});	
	

	setPathRad_1({pos1: true, posJ: posJ, result: o});
	
	

	// трубы магистральные
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};

	var d = baypasTube(cdm);
	
	if(inf.typePt == 'od')
	{
		var tube1 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 15688453, diameter: d.mag, mirror: mirror_1});
		var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 505069, diameter: d.mag, mirror: mirror_2});	
		arrO[arrO.length] = tube1;
		arrO[arrO.length] = tube2;
		
		setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
		setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });
	}
	
	if(inf.typePt == 'od_bay')
	{
		var tube1 = getTubeToSborka_1({type: 2, color: 15688453, diameter: d.jr, startY: inf.pipe_level, endY: 0.00, mirror: mirror_1});
		var tube2 = getTubeToSborka_1({type: 2, color: 505069, diameter: d.jr, startY: inf.pipe_level, endY: 0.00, mirror: mirror_2});	
		arrO[arrO.length] = tube1;
		arrO[arrO.length] = tube2;
		
		// --- устанвливаем трубы	
		setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
		setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });
		
		
		// байпас	
		var pos1 = tube1.userData.wf_tube.point[0].position;
		var pos2 = tube2.userData.wf_tube.point[0].position;
		
		o.troin_1.position.copy( pos1.clone().sub(posJ.troin_1[1]) );
		o.troin_2.position.copy( pos2.clone().sub(posJ.troin_2[1]) );
		
		posJ.troin_1 = getRazyem({obj: o.troin_1});
		posJ.troin_2 = getRazyem({obj: o.troin_2});
		
		
		
		// труба байпаса
		var point3 = [];
		point3[point3.length] = {pos: posJ.troin_1[2].clone()};
		point3[point3.length] = {pos: posJ.troin_2[2].clone()};		
		var tube3 = crTubeWF({point: point3, diameter: d.bay, color: 15688453, pVisible: false});
		setPosTube({tube: tube3, startPos: posJ.troin_1[2] });
			
		
		// трубы магистральные
		var tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: d.mag, mirror: mirror_2});
		var tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: d.mag, mirror: mirror_1});

		setPosTube({tube: tube4, startPos: posJ.troin_1[0] });
		setPosTube({tube: tube5, startPos: posJ.troin_2[0] });

		arrO[arrO.length] = tube3;	
		arrO[arrO.length] = tube4;
		arrO[arrO.length] = tube5;			
	}
	
	
	if(inf.typePt == 'dv')
	{	
		var tube1 = getTubeToSborka_1({type: 2, color: 15688453, diameter: d.jr, startY: inf.pipe_level, endY: 0.00, mirror: mirror_1 });
		var tube2 = getTubeToSborka_1({type: 2, color: 505069, diameter: d.jr, startY: inf.pipe_level - 0.05, endY: 0.00, mirror: mirror_2 });	
		arrO[arrO.length] = tube1;
		arrO[arrO.length] = tube2;
		
		// --- устанвливаем трубы	
		setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
		setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });
		
		
		// байпас
		var pos1 = tube1.userData.wf_tube.point[0].position;
		var pos2 = tube2.userData.wf_tube.point[0].position;
		
		o.troin_1.position.copy( pos1.clone().sub(posJ.troin_1[1]) );
		o.troin_2.position.copy( pos2.clone().sub(posJ.troin_2[1]) );
		
		posJ.troin_1 = getRazyem({obj: o.troin_1});
		posJ.troin_2 = getRazyem({obj: o.troin_2});
			 

		
		// трубы магистральные
		var lengthX = Math.abs(posJ.troin_1[0].x - posJ.troin_2[2].x) + 0.1;
		
		var tube3 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 15688453, diameter: d.mag, mirror: mirror_1 });
		var tube4 = getTubeToSborka_1({type: 1, lengthX: lengthX, color: 505069, diameter: d.mag, mirror: mirror_2 });	
		var tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: d.mag, mirror: mirror_2 });
		var tube6 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: d.mag, mirror: mirror_1 });

		setPosTube({tube: tube3, startPos: posJ.troin_1[2] });	
		setPosTube({tube: tube4, startPos: posJ.troin_2[2] });
		setPosTube({tube: tube5, startPos: posJ.troin_1[0] });
		setPosTube({tube: tube6, startPos: posJ.troin_2[0] });


		arrO[arrO.length] = tube3;
		arrO[arrO.length] = tube4;	
		arrO[arrO.length] = tube5;
		arrO[arrO.length] = tube6;			
	}

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену

	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

