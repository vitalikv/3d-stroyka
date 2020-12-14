


function paramSborkaRad_Odnotrub_Niz_Mp()
{
	var inf =
	{
		countRad: 5,
		heightRad: 0.5,
		side: 'left',
		kran: 'regulator',
		termoreg: true,
		pipe_level: 0
	}
	
	inf.ui = settingSborkaRadiatorMenuUI_1({nameId: 'sborka_rad_4', typeV: 4, inf: inf});
	

	return inf;
}


function crSborkaRad_Odnotrub_Niz_Mp(cdm)
{
	var inf = infProject.list.sborka.radiator.odnotrub.niz.mp;
	
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
	var tube1 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 15688453, diameter: 0.016, mirror: mirror_1});
	var tube2 = getTubeToSborka_1({type: 1, lengthX: 0.2, color: 505069, diameter: 0.016, mirror: mirror_2});	

	
	var arrO = [];
	
	arrO[arrO.length] = rad;
	arrO[arrO.length] = r_zagl;
	arrO[arrO.length] = r_per2;
	arrO[arrO.length] = r_vozd;
	arrO[arrO.length] = r_per1;
	if(reg_kran_1) arrO[arrO.length] = reg_kran_1;
	if(reg_kran_2) arrO[arrO.length] = reg_kran_2;
	arrO[arrO.length] = mpl_pereh_1;
	arrO[arrO.length] = mpl_pereh_2;
	
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
	
	arrO[arrO.length] = tube1;
	arrO[arrO.length] = tube2;
	
	// --- получаем мировые значяения разъемов
	var posJ = {};
	
	posJ.rad = getRazyem({obj: rad});
	
	posJ.r_zagl = getRazyem({obj: r_zagl});	
	posJ.r_per2 = getRazyem({obj: r_per2});		
	posJ.r_vozd = getRazyem({obj: r_vozd});	
	posJ.r_per1 = getRazyem({obj: r_per1});
	
	if(reg_kran_1) posJ.reg_kran_1 = getRazyem({obj: reg_kran_1});	
	if(reg_kran_2) posJ.reg_kran_2 = getRazyem({obj: reg_kran_2});	
	
	posJ.mpl_pereh_1 = getRazyem({obj: mpl_pereh_1});	
	posJ.mpl_pereh_2 = getRazyem({obj: mpl_pereh_2});		

	// --- устанвливаем раъемы
	
	if(inf.side == 'right')
	{
		r_zagl.position.copy( posJ.rad[2].clone().sub(posJ.r_zagl[0]) );
		r_per2.position.copy( posJ.rad[3].clone().sub(posJ.r_per2[0]) );		
		r_vozd.position.copy( posJ.rad[1].clone().sub(posJ.r_vozd[0]) );
		r_per1.position.copy( posJ.rad[0].clone().sub(posJ.r_per1[0]) );			
	}
	else
	{
		r_zagl.position.copy( posJ.rad[1].clone().sub(posJ.r_zagl[0]) );
		r_per2.position.copy( posJ.rad[0].clone().sub(posJ.r_per2[0]) );		
		r_vozd.position.copy( posJ.rad[2].clone().sub(posJ.r_vozd[0]) );
		r_per1.position.copy( posJ.rad[3].clone().sub(posJ.r_per1[0]) );			
	}
	
	
	if(reg_kran_1) 
	{
		reg_kran_1.position.copy( posJ.r_per2[1].clone().sub(posJ.reg_kran_1[1]).add(r_per2.position) );
		mpl_pereh_1.position.copy( posJ.reg_kran_1[0].clone().sub(posJ.mpl_pereh_1[1]).add(reg_kran_1.position) );
	}
	else
	{
		mpl_pereh_1.position.copy( posJ.r_per2[1].clone().sub(posJ.mpl_pereh_1[1]).add(r_per2.position) );
	}
	
	if(reg_kran_2) 
	{
		reg_kran_2.position.copy( posJ.r_per1[1].clone().sub(posJ.reg_kran_2[1]).add(r_per1.position) );
		mpl_pereh_2.position.copy( posJ.reg_kran_2[0].clone().sub(posJ.mpl_pereh_2[1]).add(reg_kran_2.position) );
	}
	else
	{
		mpl_pereh_2.position.copy( posJ.r_per1[1].clone().sub(posJ.mpl_pereh_2[1]).add(r_per1.position) );
	}
	
	
		
	

	// --- устанвливаем трубы	
	setPosTube({tube: tube1, lastP: true, startPos: mpl_pereh_1.position.clone().add(posJ.mpl_pereh_1[0]) });
	setPosTube({tube: tube2, lastP: true, startPos: mpl_pereh_2.position.clone().add(posJ.mpl_pereh_2[0]) });

	addArrObjToArray({arr: arrO});	// добавляем объекты и трубы в массив
	joinSborkaToGroup({arr: arrO});	// объекты объединяем в группу и добавляем в сцену

	return { arr1: arrO, arr2: getArrWithPointTube({arr: arrO}) };
}

