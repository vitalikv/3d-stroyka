


function paramSborkaRad_Odnotrub_Niz_Bay_Mp()
{
	var inf =
	{
		countRad: 5,
		heightRad: 0.5,
		side: 'left',
		kran: 'regulator',
		termoreg: true,
		pipe_level: -0.05
	}
	
	inf.ui = settingSborkaRadiatorMenuUI_1({inf: inf});
	
	inf.fc = 'crSborkaRad_Odnotrub_Niz_Bay_Mp';
	
	inf.ui.catalog = {name: 'нижнее подкл. с байпасом'};	

	return inf;
}


function crSborkaRad_Odnotrub_Niz_Bay_Mp(cdm)
{
	var inf = infProject.list.sborka.radiator.odnotrub.niz_bay.mp;
	
	if(cdm.countRad) { inf.countRad = cdm.countRad; }
	if(cdm.heightRad) { inf.heightRad = cdm.heightRad; }
	if(cdm.side) { inf.side = cdm.side; }
	if(cdm.kran) { inf.kran = cdm.kran; }
	if(cdm.termoreg !== undefined) { inf.termoreg = cdm.termoreg; }
	if(cdm.pipe_level !== undefined) { inf.pipe_level = cdm.pipe_level; }
	
		
	
	
	var result = getObjectsSborkaRad_1({countRad: inf.countRad, heightRad: inf.heightRad, termoreg: inf.termoreg, kran: inf.kran});
	
	var rad = result.rad;
	var r_per1 = result.r_per1;
	var r_per2 = result.r_per2;
	var r_vozd = result.r_vozd;
	var r_zagl = result.r_zagl;
	var reg_kran_1 = result.reg_kran_1;
	var reg_kran_2 = result.reg_kran_2;
	var mpl_pereh_1 = result.mpl_pereh_1;
	var mpl_pereh_2 = result.mpl_pereh_2;
	
	//------- трубы
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};	
	var tube1 = getTubeToSborka_1({type: 2, color: 15688453, diameter: 0.016, startY: inf.pipe_level, endY: 0.00, mirror: mirror_1});
	var tube2 = getTubeToSborka_1({type: 2, color: 505069, diameter: 0.016, startY: inf.pipe_level, endY: 0.00, mirror: mirror_2});	
	

	
	var arrO = setPathRad_1({arrO1: true, result: result});
	arrO[arrO.length] = tube1;
	arrO[arrO.length] = tube2;
	
	if(inf.side == 'right')
	{
		r_vozd.quaternion.set(0, -1, 0, 0);
		r_per1.quaternion.set(0, -1, 0, 0);
		
		if(reg_kran_1) reg_kran_1.quaternion.set(0, -1, 0, 0);
		mpl_pereh_1.quaternion.set(0, -1, 0, 0);		
	}
	else
	{
		r_zagl.quaternion.set(0, -1, 0, 0);
		r_per2.quaternion.set(0, -1, 0, 0);
		
		if(reg_kran_2) reg_kran_2.quaternion.set(0, -1, 0, 0);
		mpl_pereh_2.quaternion.set(0, -1, 0, 0);		
	}

	
	// --- получаем мировые значяения разъемов
	var posJ = setPathRad_1({posJ1: true, result: result});			

	// --- устанвливаем раъемы

	var arrR = (inf.side == 'right') ? [2,1,0,3] : [1,2,3,0];
	setPathRad_1({pos0: true, posJ: posJ, arrR: arrR, result: result});	
	

	setPathRad_1({pos1: true, posJ: posJ, result: result});


	// --- устанвливаем трубы	
	setPosTube({tube: tube1, lastP: true, startPos: mpl_pereh_1.position.clone().add(posJ.mpl_pereh_1[0]) });
	setPosTube({tube: tube2, lastP: true, startPos: mpl_pereh_2.position.clone().add(posJ.mpl_pereh_2[0]) });
	
	
	// байпас
	var troin_1 = mpl_troinik_1({"r1":"26","r2":"16","r3":"20","m1":0.096,"m2":0.047,"name":"Тройник 26x16x20"});
	var troin_2 = mpl_troinik_1({"r1":"26","r2":"16","r3":"20","m1":0.096,"m2":0.047,"name":"Тройник 26x16x20"});
	
	if(inf.side == 'right')
	{
		troin_1.quaternion.set(0, -1, 0, 0);
	}
	else
	{
		troin_2.quaternion.set(0, -1, 0, 0);
	}
	
	
	var pos1 = tube1.userData.wf_tube.point[0].position;
	var pos2 = tube2.userData.wf_tube.point[0].position;
	
	posJ.troin_1 = getRazyem({obj: troin_1});
	posJ.troin_2 = getRazyem({obj: troin_2});
	
	troin_1.position.copy( pos1.clone().sub(posJ.troin_1[1]) );
	troin_2.position.copy( pos2.clone().sub(posJ.troin_2[1]) );
	
	posJ.troin_1 = getRazyem({obj: troin_1});
	posJ.troin_2 = getRazyem({obj: troin_2});
	
	var point3 = [];
	point3[point3.length] = {pos: posJ.troin_1[2].clone()};
	point3[point3.length] = {pos: posJ.troin_2[2].clone()};		
	var tube3 = crTubeWF({"point": point3, "diameter":0.02, "color":15688453, pVisible: false});
	setPosTube({tube: tube3, startPos: posJ.troin_1[2] });
	
	
	arrO[arrO.length] = troin_1;
	arrO[arrO.length] = troin_2;
	arrO[arrO.length] = tube3;
	
	// трубы от тройников
	var tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: 0.026, mirror: mirror_2});
	var tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: 0.026, mirror: mirror_1});

	setPosTube({tube: tube4, startPos: posJ.troin_1[0] });
	setPosTube({tube: tube5, startPos: posJ.troin_2[0] });
	
	arrO[arrO.length] = tube4;
	arrO[arrO.length] = tube5;	
	

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену

	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

