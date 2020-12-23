


function paramSborkaRad_Odnotrub_Bok_Bay_Mp()
{
	var inf =
	{
		countRad: 3,
		heightRad: 0.6,
		side: 'right',
		kran: 'sharov',
		termoreg: false,
		pipe_level: 0
	}
	
	inf.ui = settingSborkaRadiatorMenuUI_1({inf: inf});
	
	inf.fc = 'crSborkaRad_Odnotrub_Bok_Bay_Mp';
	
	inf.ui.catalog = {name: 'подкл. сбоку с байпасом'};

	return inf;
}


function crSborkaRad_Odnotrub_Bok_Bay_Mp(cdm)
{
	var inf = infProject.list.sborka.radiator.odnotrub.bok_bay.mp;
	
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
		if(o.r_vozd) o.r_vozd.quaternion.set(0, -1, 0, 0);
		if(o.r_zagl) o.r_zagl.quaternion.set(0, -1, 0, 0);
		
		if(o.reg_kran_1) o.reg_kran_1.quaternion.set(0, -1, 0, 0);
		if(o.reg_kran_2) o.reg_kran_2.quaternion.set(0, -1, 0, 0);
		
		if(o.mpl_pereh_1) o.mpl_pereh_1.quaternion.set(0, -1, 0, 0);
		if(o.mpl_pereh_2) o.mpl_pereh_2.quaternion.set(0, -1, 0, 0);
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
	var troin_1 = mpl_troinik_1({"r1":"26","r2":"20","r3":"16","m1":0.096,"m2":0.047});
	var troin_2 = mpl_troinik_1({"r1":"26","r2":"20","r3":"16","m1":0.096,"m2":0.047});	
	
	if(inf.side == 'right')
	{
		troin_1.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, 0)));
		troin_2.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, Math.PI)));
	}
	else
	{
		troin_1.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0)));
		troin_2.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, Math.PI)));
	}	
	
	var pos1 = tube1.userData.wf_tube.point[0].position;
	var pos2 = tube2.userData.wf_tube.point[0].position;
	
	posJ.troin_1 = getRazyem({obj: troin_1});
	posJ.troin_2 = getRazyem({obj: troin_2});
	
	troin_1.position.copy( pos1.clone().sub(posJ.troin_1[2]) );
	troin_2.position.copy( pos2.clone().sub(posJ.troin_2[2]) );
	
	posJ.troin_1 = getRazyem({obj: troin_1});
	posJ.troin_2 = getRazyem({obj: troin_2});
	
	var point3 = [];
	point3[point3.length] = {pos: posJ.troin_1[1].clone()};
	point3[point3.length] = {pos: posJ.troin_2[1].clone()};
	var tube3 = crTubeWF({"point": point3, "diameter":0.02, "color":15688453, pVisible: false});
	setPosTube({tube: tube3, startPos: posJ.troin_1[1] });


	arrO[arrO.length] = troin_1;
	arrO[arrO.length] = troin_2;
	arrO[arrO.length] = tube3;	
	
	// трубы от тройников
	var tube4 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 15688453, diameter: 0.026, mirror: mirror_2});
	var tube5 = getTubeToSborka_1({type: 1, lengthX: 0.1, color: 505069, diameter: 0.026, mirror: mirror_2});

	setPosTube({tube: tube4, startPos: posJ.troin_1[0] });
	setPosTube({tube: tube5, startPos: posJ.troin_2[0] });
	
	arrO[arrO.length] = tube4;
	arrO[arrO.length] = tube5;
	

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену
	
	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

