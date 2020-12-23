


function paramSborkaRad_Odnotrub_Bok_Mp()
{
	var inf =
	{
		countRad: 3,
		heightRad: 0.6,
		side: 'left',
		kran: 'none',
		termoreg: true,
		pipe_level: 0
	}
	
	inf.ui = settingSborkaRadiatorMenuUI_1({inf: inf});
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Mp';

	inf.ui.catalog = {name: 'подкл. сбоку'};

	return inf;
}


function crSborkaRad_Odnotrub_Bok_Mp(cdm)
{
	var inf = infProject.list.sborka.radiator.odnotrub.bok.mp;
	
	if(cdm.countRad) { inf.countRad = cdm.countRad; }
	if(cdm.heightRad) { inf.heightRad = cdm.heightRad; }
	if(cdm.side) { inf.side = cdm.side; }
	if(cdm.kran) { inf.kran = cdm.kran; }
	if(cdm.termoreg !== undefined) { inf.termoreg = cdm.termoreg; }
	if(cdm.pipe_level !== undefined) { inf.pipe_level = cdm.pipe_level; }
	
	
	var o = getObjectsSborkaRad_1({countRad: inf.countRad, heightRad: inf.heightRad, termoreg: inf.termoreg, kran: inf.kran});
	
	var arrO = setPathRad_1({arrO1: true, result: o});
	

	
	if(inf.side == 'right')
	{
		o.r_vozd.quaternion.set(0, -1, 0, 0);
		o.r_zagl.quaternion.set(0, -1, 0, 0);
		
		if(o.reg_kran_1) o.reg_kran_1.quaternion.set(0, -1, 0, 0);
		if(o.reg_kran_2) o.reg_kran_2.quaternion.set(0, -1, 0, 0);
		
		o.mpl_pereh_1.quaternion.set(0, -1, 0, 0);
		o.mpl_pereh_2.quaternion.set(0, -1, 0, 0);
	}
	else
	{
		if(o.r_per1) o.r_per1.quaternion.set(0, -1, 0, 0);
		if(o.r_per2) o.r_per2.quaternion.set(0, -1, 0, 0);	
	}

	
	// --- получаем мировые значяения разъемов
	var posJ = setPathRad_1({posJ1: true, result: o});		

	// --- устанвливаем раъемы	
	var arrR = (inf.side == 'right') ? [0,1,3,2] : [3,2,0,1];
	setPathRad_1({pos0: true, posJ: posJ, arrR: arrR, result: o});		

	
	setPathRad_1({pos1: true, posJ: posJ, result: o});
	

	//------- трубы
	var tube1 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 15688453, diameter: 0.016, mirror: {x: (inf.side == 'right') ? true : false} });
	var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 505069, diameter: 0.016, mirror: {x: (inf.side == 'right') ? true : false} });
	arrO[arrO.length] = tube1;
	arrO[arrO.length] = tube2;	
	
	// из-за терморегулятора, меняется место установки трубы, подгоняем длину трубы, чтобы концы были на одном уровне
	var x1 = posJ.mpl_pereh_1[0].x - posJ.mpl_pereh_2[0].x;
	var point = tube1.userData.wf_tube.point[0].position.x -= x1;		
	updateTubeWF({tube: tube1});	

	// --- устанвливаем трубы	
	setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
	setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену
	
	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

