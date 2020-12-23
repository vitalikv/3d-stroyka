


function paramSborkaRad_Odnotrub_Verh_Mp()
{
	var inf =
	{
		countRad: 7,
		heightRad: 0.35,
		side: 'right',
		kran: 'sharov',
		termoreg: false,
		pipe_level: 0
	}
	
	inf.ui = settingSborkaRadiatorMenuUI_1({inf: inf});
	
	inf.fc = 'crSborkaRad_Odnotrub_Verh_Mp';
	
	inf.ui.catalog = {name: 'верхнее подкл.'};

	return inf;
}


function crSborkaRad_Odnotrub_Verh_Mp(cdm)
{
	var inf = infProject.list.sborka.radiator.odnotrub.verh.mp;
	
	if(cdm.countRad) { inf.countRad = cdm.countRad; }
	if(cdm.heightRad) { inf.heightRad = cdm.heightRad; }
	if(cdm.side) { inf.side = cdm.side; }
	if(cdm.kran) { inf.kran = cdm.kran; }
	if(cdm.termoreg !== undefined) { inf.termoreg = cdm.termoreg; }
	if(cdm.pipe_level !== undefined) { inf.pipe_level = cdm.pipe_level; }
	
		
	
	
	var o = getObjectsSborkaRad_1({typeRad: 'st', countRad: inf.countRad, heightRad: inf.heightRad, termoreg: inf.termoreg, kran: inf.kran});
	
	var arrO = setPathRad_1({arrO1: true, result: o});
	
	
	if(inf.side == 'right')
	{
		o.r_vozd.quaternion.set(0, -1, 0, 0);
		if(o.r_per1) o.r_per1.quaternion.set(0, -1, 0, 0);
		
		if(o.reg_kran_1) o.reg_kran_1.quaternion.set(0, -1, 0, 0);
		o.mpl_pereh_1.quaternion.set(0, -1, 0, 0);		
	}
	else
	{
		o.r_zagl.quaternion.set(0, -1, 0, 0);
		if(o.r_per2) o.r_per2.quaternion.set(0, -1, 0, 0);
		
		if(o.reg_kran_2) o.reg_kran_2.quaternion.set(0, -1, 0, 0);
		o.mpl_pereh_2.quaternion.set(0, -1, 0, 0);		
	}
	

	
	// --- получаем мировые значяения разъемов
	var posJ = setPathRad_1({posJ1: true, result: o});
	
	

	// --- устанвливаем раъемы	
		
	var arrR = (inf.side == 'right') ? [3,1,0,2] : [0,2,3,1];
	setPathRad_1({pos0: true, posJ: posJ, arrR: arrR, result: o});	
	
	setPathRad_1({pos1: true, posJ: posJ, result: o});
	
	
		
	
	//------- трубы
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};
	var y1 = posJ.rad[1].y - posJ.rad[0].y;  
	var tube1 = getTubeToSborka_1({type: 3, color: 15688453, diameter: 0.016, startY: inf.pipe_level, endY: y1, mirror: mirror_1});
	var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 505069, diameter: 0.016, mirror: mirror_2});
	arrO[arrO.length] = tube1;
	arrO[arrO.length] = tube2;	
	
	// --- устанвливаем трубы	
	setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
	setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });
	
	
	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену


	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

