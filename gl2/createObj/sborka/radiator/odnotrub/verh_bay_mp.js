


function paramSborkaRad_Odnotrub_Verh_Bay_Mp()
{
	var inf =
	{
		countRad: 7,
		heightRad: 0.35,
		side: 'left',
		kran: 'regulator',
		termoreg: false,
		pipe_level: -0.1
	}
	
	inf.ui = settingSborkaRadiatorMenuUI_1({nameId: 'sborka_rad_2', typeV: 2, inf: inf});
	

	return inf;
}


function crSborkaRad_Odnotrub_Verh_Bay_Mp(cdm)
{
	var inf = infProject.list.sborka.radiator.odnotrub.verh_bay.mp;
	
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
	
	var point1 = [];
	var point2 = [];
	
	
	if(inf.pipe_level)
	{ 
		var arrP_1 = getPointTubeCurve_1({size: 0.02, count: 2, startY: inf.pipe_level, endY: inf.heightRad, type: 2});
		var arrP_2 = getPointTubeCurve_1({size: 0.02, count: 2, startY: inf.pipe_level, endY: 0.00, type: 2}); 					
	}
	else
	{
		var arrP_1 = getPointTubeCurve_1({size: 0.02, count: 2, startY: -0.2, endY: inf.heightRad, type: 2});
		var arrP_2 = getPointTubeCurve_1({size: 0.02, count: 2, startY: -0.2, endY: 0.00, type: 2});			
	}	

	
	for(var i = 0; i < arrP_1.length; i++)
	{
		point1[point1.length] = {pos: arrP_1[i]};
	}

	for(var i = 0; i < arrP_2.length; i++)
	{
		arrP_2[i].x *= -1;
		point2[point2.length] = {pos: arrP_2[i]};
	}	
	
	
	if(inf.side == 'right')
	{
		for(var i = 0; i < point1.length; i++) { point1[i].pos.x *= -1; }		
		for(var i = 0; i < point2.length; i++) { point2[i].pos.x *= -1; }	
	}
	
	
	
	var tube1 = crTubeWF({"point": point1, "diameter":0.016, "color":15688453, pVisible: false});
	var tube2 = crTubeWF({"point": point2, "diameter":0.016, "color":505069, pVisible: false});
	
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
		r_zagl.position.copy( posJ.rad[3].clone().sub(posJ.r_zagl[0]) );
		r_per2.position.copy( posJ.rad[2].clone().sub(posJ.r_per2[0]) );
		r_vozd.position.copy( posJ.rad[1].clone().sub(posJ.r_vozd[0]) );
		r_per1.position.copy( posJ.rad[0].clone().sub(posJ.r_per1[0]) );		
	}	
	else
	{
		r_zagl.position.copy( posJ.rad[0].clone().sub(posJ.r_zagl[0]) );
		r_per2.position.copy( posJ.rad[1].clone().sub(posJ.r_per2[0]) );
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
	point3[point3.length] = {pos: posJ.troin_2[0].clone()};
	
	//point3[point3.length] = {pos: pos1};
	//point3[point3.length] = {pos: pos2};
	
	
	var tube3 = crTubeWF({"point": point3, "diameter":0.02, "color":15688453, pVisible: false});
	setPosTube({tube: tube3, startPos: posJ.troin_1[2] });
	
	console.log(2222, posJ.troin_1[2].x, posJ.troin_2[0].x);
	
	
	arrO[arrO.length] = troin_1;
	arrO[arrO.length] = troin_2;
	arrO[arrO.length] = tube3;	


	return arrO;
}

