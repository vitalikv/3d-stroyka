


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
	
	inf.fc = 'crSborkaRad_Dvuhtrub_Bok_Mp';
	
	inf.ui.catalog = {name: 'двухтр. сбоку'};

	return inf;
}


function crSborkaRad_Dvuhtrub_Bok_Mp(cdm)
{
	var inf = cdm.inf;
		
	var o = getObjectsSborkaRad_1(cdm);
	
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
	if(inf.side == 'right')
	{
		o.troin_1.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, Math.PI/2)));
		o.troin_2.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI/2)));
	}
	else
	{
		o.troin_1.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI/2)));
		o.troin_2.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, -Math.PI/2)));
	}	
	
	var pos1 = tube1.userData.wf_tube.point[0].position;
	var pos2 = tube2.userData.wf_tube.point[0].position;
	
	posJ.troin_1 = getRazyem({obj: o.troin_1});
	posJ.troin_2 = getRazyem({obj: o.troin_2});
	
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
	

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену
	
	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}






