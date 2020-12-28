


function paramSborkaRad_Odnotrub_Bok_Mp()
{
	var inf =
	{
		typePt: 'od',
		typeRad: 'st',
		typePipe: 'mp',
		rad: {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}},
		pipe: {mp: 0.016, pp: 0.020},
		side: 'left',
		kran: 'none',
		termoreg: true,
		pipe_level: 0
	}
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';

	inf.ui.catalog = {name: 'подкл. сбоку'};

	return inf;
}


function paramSborkaRad_Odnotrub_Bok_Bay_Mp()
{
	var inf =
	{
		typePt: 'od_bay',
		typeRad: 'al',
		typePipe: 'mp',
		rad: {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}},
		pipe: {mp: 0.026, pp: 0.032},
		side: 'right',
		kran: 'sharov',
		termoreg: false,
		pipe_level: 0
	}
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';
	
	inf.ui.catalog = {name: 'подкл. сбоку с байпасом'};

	return inf;
}


function paramSborkaRad_Dvuhtrub_Bok_Mp()
{
	var inf =
	{
		typePt: 'dv',
		typeRad: 'al',
		typePipe: 'mp',
		rad: {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}},
		pipe: {mp: 0.026, pp: 0.032},
		side: 'right',
		kran: 'sharov',
		termoreg: false,
		pipe_level: 0
	}
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';
	
	inf.ui.catalog = {name: 'двухтр. сбоку'};

	return inf;
}




function crSborkaRad_Odnotrub_Bok_Mp(cdm)
{
	var inf = cdm.inf;
		
	var o = getObjectsSborkaRad_1(cdm);
	
	var arrO = setPathRad_1({arrO1: true, result: o});
		
	
	var o1 = {};
	
	if(inf.side == 'right')
	{		
		o1.r_vozd = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.r_zagl = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.reg_kran_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.reg_kran_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.mpl_pereh_1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.mpl_pereh_2 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		
		if(inf.typePt == 'od_bay')
		{
			o1.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, 0)) };
			o1.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, Math.PI)) };				
		}
		else
		{
			o1.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, Math.PI/2)) };
			o1.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI/2)) };					
		}
	}
	else
	{
		o1.r_per1 = {q: new THREE.Quaternion(0, -1, 0, 0)};
		o1.r_per2 = {q: new THREE.Quaternion(0, -1, 0, 0)};

		if(inf.typePt == 'od_bay')
		{
			o1.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0)) };
			o1.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, Math.PI)) };			
		}
		else
		{
			o1.troin_1 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI/2)) };
			o1.troin_2 = { q: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, -Math.PI/2)) };					
		}
	}
	
	setPathRad_1({q1: o1, result: o});	// поворачиваем объекты, как они должны стоять 	

	
	// --- получаем мировые значяения разъемов
	var posJ = setPathRad_1({posJ1: true, result: o});		

	// --- устанвливаем раъемы	
	var arrR = (inf.side == 'right') ? [0,1,3,2] : [3,2,0,1];
	setPathRad_1({pos0: true, posJ: posJ, arrR: arrR, result: o});		

	
	setPathRad_1({pos1: true, posJ: posJ, result: o});
	

	if(inf.typePt == 'od')
	{
		// трубы магистральные
		var diameter = 0.016;
		if(inf.typePipe == 'pp') { diameter = inf.pipe.pp; }
		if(inf.typePipe == 'mp') { diameter = inf.pipe.mp; }
		
		var tube1 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 15688453, diameter: diameter, mirror: {x: (inf.side == 'right') ? true : false} });
		var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 505069, diameter: diameter, mirror: {x: (inf.side == 'right') ? true : false} });
		
		// из-за терморегулятора, меняется место установки трубы, подгоняем длину трубы, чтобы концы были на одном уровне
		var x1 = posJ.mpl_pereh_1[0].x - posJ.mpl_pereh_2[0].x;
		var point = tube1.userData.wf_tube.point[0].position.x -= x1;		
		updateTubeWF({tube: tube1});	
		
		setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
		setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });
		
		arrO[arrO.length] = tube1;
		arrO[arrO.length] = tube2;			
	}
	
	if(inf.typePt == 'od_bay')
	{
		//------- трубы
		var mirror_1 = {x: (inf.side == 'right') ? true : false};
		var mirror_2 = {x: (inf.side == 'right') ? false : true};	
		var tube1 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: 0.016, mirror: mirror_1 });
		var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: 0.016, mirror: mirror_1 });
		arrO[arrO.length] = tube1;
		arrO[arrO.length] = tube2;
		
		// из-за терморегулятора, меняется место установки трубы, подгоняем длину трубы, чтобы концы были на одном уровне
		var x1 = posJ.mpl_pereh_1[0].x - posJ.mpl_pereh_2[0].x;
		var point = tube1.userData.wf_tube.point[0].position.x -= x1;		
		updateTubeWF({tube: tube1});	

		// --- устанвливаем трубы	
		setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
		setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });

		
		// байпас
		var pos1 = tube1.userData.wf_tube.point[0].position;
		var pos2 = tube2.userData.wf_tube.point[0].position;
		
		o.troin_1.position.copy( pos1.clone().sub(posJ.troin_1[2]) );
		o.troin_2.position.copy( pos2.clone().sub(posJ.troin_2[2]) );
		
		posJ.troin_1 = getRazyem({obj: o.troin_1});
		posJ.troin_2 = getRazyem({obj: o.troin_2});		
		
		// труба байпаса
		var d = baypasTube(cdm);
		
		var point3 = [];
		point3[point3.length] = {pos: posJ.troin_1[1].clone()};
		point3[point3.length] = {pos: posJ.troin_2[1].clone()};
		var tube3 = crTubeWF({point: point3, diameter: d.bay, color: 15688453, pVisible: false});
		setPosTube({tube: tube3, startPos: posJ.troin_1[1] });

		
		// трубы магистральные
		var tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: d.mag, mirror: mirror_2});
		var tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: d.mag, mirror: mirror_2});

		setPosTube({tube: tube4, startPos: posJ.troin_1[0] });
		setPosTube({tube: tube5, startPos: posJ.troin_2[0] });

		arrO[arrO.length] = tube3;		
		arrO[arrO.length] = tube4;
		arrO[arrO.length] = tube5;		
	}
	
	if(inf.typePt == 'dv')
	{
		//------- трубы
		var tube1 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: 0.016, mirror: {x: (inf.side == 'right') ? true : false} });
		var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.1 + 0.1, color: 505069, diameter: 0.016, mirror: {x: (inf.side == 'right') ? true : false} });
		arrO[arrO.length] = tube1;
		arrO[arrO.length] = tube2;
		
		// из-за терморегулятора, меняется место установки трубы, подгоняем длину трубы, чтобы концы были на одном уровне
		var x1 = posJ.mpl_pereh_1[0].x - posJ.mpl_pereh_2[0].x;
		var point = tube1.userData.wf_tube.point[0].position.x -= x1;		
		updateTubeWF({tube: tube1});	

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
		var diameter = 0.02;
		if(inf.typePipe == 'pp') { diameter = inf.pipe.pp; }
		if(inf.typePipe == 'mp') { diameter = inf.pipe.mp; }

		var lengthY = Math.abs(posJ.troin_1[0].y - posJ.troin_2[2].y) + 0.1; 
		
		var tube3 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 15688453, diameter: diameter, mirror: {y: true} });
		var tube4 = getTubeToSborka_1({type: 1, lengthY: lengthY, color: 505069, diameter: diameter, mirror: {y: false} });	
		var tube5 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 15688453, diameter: diameter, mirror: {y: false} });
		var tube6 = getTubeToSborka_1({type: 1, lengthY: 0.1, color: 505069, diameter: diameter, mirror: {y: true} });

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

