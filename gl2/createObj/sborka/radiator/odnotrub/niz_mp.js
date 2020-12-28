


function paramSborkaRad_Odnotrub_Niz_Mp()
{
	var inf =
	{
		typePt: 'od',		
		typeRad: 'al',
		typePipe: 'mp',
		rad: {al: {x: 7, y: 0.5}, st: {x: 0.8, y: 0.5}},
		pipe: {mp: 0.016, pp: 0.020},
		side: 'left',
		kran: 'regulator',
		termoreg: true,
		pipe_level: 0
	}
	
	inf.ui = {};
	
	inf.fc = 'crSborkaRad_Odnotrub_Niz_Mp';
	
	inf.ui.catalog = {name: 'нижнее подкл.'};

	return inf;
}


function crSborkaRad_Odnotrub_Niz_Mp(cdm)
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
	
	
		
	
	// трубы магистральные
	var mirror_1 = {x: (inf.side == 'right') ? true : false};
	var mirror_2 = {x: (inf.side == 'right') ? false : true};

	var diameter = 0.016;
	if(inf.typePipe == 'pp') { diameter = inf.pipe.pp; }
	if(inf.typePipe == 'mp') { diameter = inf.pipe.mp; }
	
	var tube1 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 15688453, diameter: diameter, mirror: mirror_1});
	var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 505069, diameter: diameter, mirror: mirror_2});	

	setPosTube({tube: tube1, lastP: true, startPos: posJ.mpl_pereh_1[0] });
	setPosTube({tube: tube2, lastP: true, startPos: posJ.mpl_pereh_2[0] });
	
	arrO[arrO.length] = tube1;
	arrO[arrO.length] = tube2;	

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену

	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

