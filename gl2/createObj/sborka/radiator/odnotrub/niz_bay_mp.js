


function paramSborkaRad_Odnotrub_Niz_Bay_Mp()
{
	var inf =
	{
		typePt: 'od_bay',		
		typeRad: 'al',
		typePipe: 'mp',
		rad: {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}},
		pipe: {mp: 0.026, pp: 0.032},
		side: 'left',
		kran: 'regulator',
		termoreg: true,
		pipe_level: -0.05
	}
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Niz_Bay_Mp';
	
	inf.ui.catalog = {name: 'нижнее подкл. с байпасом'};	

	return inf;
}


function crSborkaRad_Odnotrub_Niz_Bay_Mp(cdm)
{
	var inf = cdm.inf;
		
	var o = getObjectsSborkaRad_1(cdm);

	var arrO = setPathRad_1({arrO1: true, result: o});
	

	
	if(inf.side == 'right')
	{
		if(o.r_vozd) o.r_vozd.quaternion.set(0, -1, 0, 0);
		if(o.r_per1) o.r_per1.quaternion.set(0, -1, 0, 0);
		
		if(o.reg_kran_1) o.reg_kran_1.quaternion.set(0, -1, 0, 0);
		if(o.mpl_pereh_1) o.mpl_pereh_1.quaternion.set(0, -1, 0, 0);		
	}
	else
	{
		if(o.r_zagl) o.r_zagl.quaternion.set(0, -1, 0, 0);
		if(o.r_per2) o.r_per2.quaternion.set(0, -1, 0, 0);
		
		if(o.reg_kran_2) o.reg_kran_2.quaternion.set(0, -1, 0, 0);
		if(o.mpl_pereh_2) o.mpl_pereh_2.quaternion.set(0, -1, 0, 0);		
	}

	
	// --- получаем мировые значяения разъемов
	var posJ = setPathRad_1({posJ1: true, result: o});			

	// --- устанвливаем раъемы

	var arrR = (inf.side == 'right') ? [2,1,0,3] : [1,2,3,0];
	setPathRad_1({pos0: true, posJ: posJ, arrR: arrR, result: o});	
	

	setPathRad_1({pos1: true, posJ: posJ, result: o});


	//------- трубы
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};	
	var tube1 = getTubeToSborka_1({type: 2, color: 15688453, diameter: 0.016, startY: inf.pipe_level, endY: 0.00, mirror: mirror_1});
	var tube2 = getTubeToSborka_1({type: 2, color: 505069, diameter: 0.016, startY: inf.pipe_level, endY: 0.00, mirror: mirror_2});	
	arrO[arrO.length] = tube1;
	arrO[arrO.length] = tube2;
	
	// --- устанвливаем трубы	
	setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
	setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });
	
	
	// байпас	
	console.log(3333, cdm);
	 
	if(inf.side == 'right')
	{
		o.troin_1.quaternion.set(0, -1, 0, 0);
	}
	else
	{
		o.troin_2.quaternion.set(0, -1, 0, 0);
	}
	
	
	var pos1 = tube1.userData.wf_tube.point[0].position;
	var pos2 = tube2.userData.wf_tube.point[0].position;
	
	posJ.troin_1 = getRazyem({obj: o.troin_1});
	posJ.troin_2 = getRazyem({obj: o.troin_2});
	
	o.troin_1.position.copy( pos1.clone().sub(posJ.troin_1[1]) );
	o.troin_2.position.copy( pos2.clone().sub(posJ.troin_2[1]) );
	
	posJ.troin_1 = getRazyem({obj: o.troin_1});
	posJ.troin_2 = getRazyem({obj: o.troin_2});
	
	
	
	// труба байпаса
	var d = baypasTube(cdm);
	
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
	

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену

	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

