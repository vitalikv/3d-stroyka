




// стальной коллектор
function st_collector_1(cdm)  
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});			// коллектор левый разъем
	var d2 = sizeRezba({size: cdm.r2, side: cdm.side}); 	// верхний
	var d3 = sizeRezba({size: cdm.r1, side: 'n'});			// коллектор правый разъем 
	
	var dc = d1;
	if(dc.n < d2.n) dc = d2;
	if(dc.n < d3.n) dc = d3;
	
	
	var m1 = cdm.m1;
	var m2 = cdm.m2;		
	
	// доп. расчеты		
	var w1 = 0.015;
	var w2 = 0.015;
	var w22 = d1.n / 10;
	var kf = 0.0001;
	
	var s1 = (m1/2 - w1);
	var s2 = (m2 - w2);	

	
	if(cdm.side == 'v')
	{
		var posOff_2 = s2 + w2 - w22/2;
		var matRezba_2 = [0, 1, 0, 0];
		var txt_2 = '(в)';
	}
	else
	{
		var posOff_2 = s2 + w22/2;
		var matRezba_2 = [1, 0, 0, 0];
		var txt_2 = '(н)';
	}		
		
	
	
		
	// труба горизонтальная 
	function crTubeGorz(cdm)
	{	
		var geom = new THREE.Geometry();
		
		// (левая часть)	
		{		 
			var inf = { g: geom, dlina: w1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };	// резьба
			inf.pos = { x: -(s1 + w1/2), y: 0, z: 0 };
			var poM1 = crFormSleeve_1(inf);					
			
			var w21 = 0.236 * d1.n;	// толщина гайки
			var inf = { g: geom, dlina: w1, diameter_nr: d1.n + w21, diameter_vn: d1.v + kf, edge_nr: 6 };	// гайка/кольцо
			inf.pos = { x: -(s1 + w1/2), y: 0, z: 0 };
			crFormSleeve_1(inf);
			
			var inf = { g: geom, dlina: s1, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d1.n, d_v2: d1.v };
			inf.pos = { x: -s1/2, y: 0, z: 0 };
			crFormSleeve_1(inf);		
		}	
				
		// (правая часть)
		{
			var inf = { g: geom, dlina: s1, diameter_nr: dc.n, diameter_vn: dc.v };
			inf.pos = { x: s1/2, y: 0, z: 0 };
			inf.rot = { x: 0, y: Math.PI, z: 0 };
			crFormSleeve_1(inf);		
			
			var dl = 0.0033;	// длина гайки
			var inf = { g: geom, dlina: dl, diameter_nr: dc.n + w22, diameter_vn: d3.v + kf };	// гайка/кольцо
			inf.pos = { x: s1 + dl/2, y: 0, z: 0 };
			crFormSleeve_1(inf);		
			
			var inf = { g: geom, dlina: w1, diameter_nr: d3.n, diameter_vn: d3.v, ind: [1, 0, 0, 0] };	// резьба 
			inf.pos = { x: (s1 + w1/2), y: 0, z: 0 };
			var poM3 = crFormSleeve_1(inf);			
		}	

		return {geom: geom, pm: [poM1, poM3]};
	}	
	
	// вертикальная труба
	function crTubeVert()
	{		
		var geom = new THREE.Geometry();
		
		var inf = { g: geom, dlina: s2, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d2.n, d_v2: d2.v };
		inf.pos = { x: 0, y: s2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);

		var inf = { g: geom, dlina: w22, diameter_nr: d2.n + w22, diameter_vn: d2.v + kf };	// гайка/кольцо
		inf.pos = { x: 0, y: posOff_2, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: w2, diameter_nr: d2.n, diameter_vn: d2.v, ind: matRezba_2 };	// резьба 
		inf.pos = { x: 0, y: (s2 + w2/2), z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		var pos = crFormSleeve_1(inf);	
		
		return {geom: geom, pm: pos};
	}	
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	
	
	var group = [];
	
	var tubeGorz = crTubeGorz();
	var tubeVert = crTubeVert();
	
	
	
	var objCopy = new THREE.Mesh(tubeGorz.geom, mat);
	var poM1 = tubeGorz.pm[0];
	var poM3 = tubeGorz.pm[1];
	group[group.length] = objCopy;
	
	
	// вертикальные трубы
	var arrO = [];
	var arrpoM2 = [];
	
	for ( var i = 0; i < cdm.count; i++ )
	{		
		var objCopy = new THREE.Mesh(tubeVert.geom, mat);
		objCopy.position.x += 0.036 * i;
		arrpoM2[i] = { pos: tubeVert.pm.pos.clone() };
		arrpoM2[i].pos.x = objCopy.position.x;
		arrO[arrO.length] = objCopy;
	}	
	var o = getBoundObject_1({obj: arrO});
	group[group.length] = o;

	// смещаем вертикальные трубы, чтобы встали по центру
	o.position.x -= o.geometry.boundingSphere.center.x;
	for ( var i = 0; i < cdm.count; i++ )
	{
		arrpoM2[i].pos.x -= o.geometry.boundingSphere.center.x;
	}
	
	
	var obj = getBoundObject_1({obj: group});
	
	
	var name1 = cdm.r1+'(в)';
	var name2 = cdm.r2+txt_2;
	var name3 = cdm.r1+'(н)';	
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	
	for ( var i = 0; i < arrpoM2.length; i++ )
	{
		arrP[arrP.length] = { pos: arrpoM2[i].pos, rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name2 };
	}	
	
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, 0, 0), name: name3 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	
	
	
	cdm.name = 'коллектор '+cdm.r1+'x'+name2+' ['+cdm.count+' вых.]';
	
	assignObjParams(obj, cdm);

	return obj;
}



 
 
 
// стальной коллектор
function st_collector_2(cdm)  
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});			// коллектор левый разъем
	var d2 = sizeRezba({size: cdm.r2, side: 'n'}); 			// верхний
	var d3 = sizeRezba({size: cdm.r1, side: 'n'});			// коллектор правый разъем 
	
	var dc = d1;
	if(dc.n < d2.n) dc = d2;
	if(dc.n < d3.n) dc = d3;
	
	
	var m1 = cdm.m1;
	var m2 = cdm.m2;		
	
	// доп. расчеты		
	var w1 = 0.015;
	var w2 = 0.015;
	var w22 = d1.n / 10;
	var kf = 0.0001;
	
	var s1 = (m1/2 - w1);
	var s2 = (m2 - w2);	

	var t1 = 0.01;
	
	var posOff_2 = s2 + w22/2;
	var txt_2 = '(н)';
	
		
	
	
		
	// труба горизонтальная 
	function crTubeGorz(cdm)
	{	
		var geom = new THREE.Geometry();
		
		// (левая часть)	
		{		 
			var inf = { g: geom, dlina: w1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };	// резьба
			inf.pos = { x: -(s1 + w1/2), y: 0, z: 0 };
			var poM1 = crFormSleeve_1(inf);					
			
			var w21 = 0.236 * d1.n;	// толщина гайки
			var inf = { g: geom, dlina: w1, diameter_nr: d1.n + w21, diameter_vn: d1.v + kf, edge_nr: 6 };	// гайка/кольцо
			inf.pos = { x: -(s1 + w1/2), y: 0, z: 0 };
			crFormSleeve_1(inf);
			
			var inf = { g: geom, dlina: s1, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d1.n, d_v2: d1.v };
			inf.pos = { x: -s1/2, y: 0, z: 0 };
			crFormSleeve_1(inf);		
		}	
				
		// (правая часть)
		{
			var inf = { g: geom, dlina: s1, diameter_nr: dc.n, diameter_vn: dc.v };
			inf.pos = { x: s1/2, y: 0, z: 0 };
			inf.rot = { x: 0, y: Math.PI, z: 0 };
			crFormSleeve_1(inf);		
			
			var dl = 0.0033;	// длина гайки
			var inf = { g: geom, dlina: dl, diameter_nr: dc.n + w22, diameter_vn: d3.v + kf };	// гайка/кольцо
			inf.pos = { x: s1 + dl/2, y: 0, z: 0 };
			crFormSleeve_1(inf);		
			
			var inf = { g: geom, dlina: w1, diameter_nr: d3.n, diameter_vn: d3.v, ind: [1, 0, 0, 0] };	// резьба 
			inf.pos = { x: (s1 + w1/2), y: 0, z: 0 };
			var poM3 = crFormSleeve_1(inf);			
		}	

		return {geom: geom, pm: [poM1, poM3]};
	}	
	
	// вертикальная труба
	function crTubeVert()
	{		
		var geom = new THREE.Geometry();
		
		var inf = { g: geom, dlina: s2, diameter_nr: dc.n, diameter_vn: dc.v, d_n2: d2.n, d_v2: d2.v };
		inf.pos = { x: 0, y: s2/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);

		//var inf = { g: geom, dlina: w22, diameter_nr: d2.n + w22, diameter_vn: d2.v + kf };	// гайка/кольцо
		//inf.pos = { x: 0, y: posOff_2, z: 0 };
		//inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		//crFormSleeve_1(inf);
		
		
		var inf = { g: geom, dlina: t1, diameter_nr: d2.n, diameter_vn: d2.v };	// гайка/кольцо
		inf.pos = { x: 0, y: s2 + t1/2, z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		crFormSleeve_1(inf);		
		
		var inf = { g: geom, dlina: w2, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1, 0, 0, 0] };	// резьба 
		inf.pos = { x: 0, y: (s2 + t1 + w2/2), z: 0 };
		inf.rot = { x: 0, y: Math.PI, z: Math.PI/2 };
		var pos = crFormSleeve_1(inf);	
		
		return {geom: geom, pm: pos};
	}

	// кран (прямоугольник + цилиндр)
	function crKran(cdm)
	{
		var geom = new THREE.Geometry();
		
		var f1 = 0.005;
		
		var g1 = new THREE.BoxGeometry( cdm.x, cdm.y, cdm.z ); 
		for(var i = 0; i < g1.faces.length; i++){ g1.faces[i].materialIndex = 1; }
		//g1.rotateX(Math.PI/2);	
		g1.translate(0, cdm.y/2, f1);
		geom.merge(g1, g1.matrix, 0);

		var d1 = 0.02;
		var d2 = 0.01;
		var d3 = d2 - 0.0027;
		
		var inf = { g: geom, dlina: cdm.z, diameter_nr: d1, diameter_vn: d3, d_n2: d1 - 0.01, d_v2: d3, ind: [1, 1, 1, 1] };
		inf.pos = { x: 0, y: 0, z: f1 };
		inf.rot = { x: 0, y: Math.PI/2, z: 0 };
		crFormSleeve_1(inf);	
		
		var inf = { g: geom, dlina: cdm.z + 0.012, diameter_nr: d2 - 0.003, diameter_vn: 0.0001 };
		inf.pos = { x: 0, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI/2, z: 0 };
		crFormSleeve_1(inf);		
		
		return {geom: geom};
	}		
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	
	
	var group = [];
	
	var tubeGorz = crTubeGorz();
	var tubeVert = crTubeVert();
	

	
	var objCopy = new THREE.Mesh(tubeGorz.geom, mat);
	var poM1 = tubeGorz.pm[0];
	var poM3 = tubeGorz.pm[1];
	group[group.length] = objCopy;
	
	
	// вертикальные трубы
	var arrO = [];
	var arrpoM2 = [];
	
	for ( var i = 0; i < cdm.count; i++ )
	{		
		var objCopy = new THREE.Mesh(tubeVert.geom, mat);
		objCopy.position.x += 0.036 * i;
		arrpoM2[i] = { pos: tubeVert.pm.pos.clone() };
		arrpoM2[i].pos.x = objCopy.position.x;
		arrO[arrO.length] = objCopy;
	}	
	var o = getBoundObject_1({obj: arrO});
	group[group.length] = o;

	// смещаем вертикальные трубы и arrpoM2 (для разъемов), чтобы встали по центру
	o.position.x -= o.geometry.boundingSphere.center.x;
	for ( var i = 0; i < cdm.count; i++ )
	{
		arrpoM2[i].pos.x -= o.geometry.boundingSphere.center.x;
	}
		
	
	// создаем и смещаем краны
	var params = {x: 0.003, y: 0.02, z: 0.015};
	var kran = crKran(params);
	for ( var i = 0; i < cdm.count; i++ )
	{		
		var objCopy = new THREE.Mesh(kran.geom, [infProject.material.metal_1, cdm.color]);
		objCopy.position.x += 0.036 * i - o.geometry.boundingSphere.center.x;
		objCopy.position.z += params.z/2 + d2.n/2;
		objCopy.position.y += w2;
		group[group.length] = objCopy;
	}		
	
	
	
	
	
	var obj = getBoundObject_1({obj: group});
	
	//console.log(222, (obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x));
	
	var name1 = cdm.r1+'(в)';
	var name2 = cdm.r2+txt_2;
	var name3 = cdm.r1+'(н)';	
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	
	for ( var i = 0; i < arrpoM2.length; i++ )
	{
		arrP[arrP.length] = { pos: arrpoM2[i].pos, rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name2 };
	}	
	
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, 0, 0), name: name3 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	
	
	
	cdm.name = 'коллектор с кранами '+cdm.r1+'x'+name2+' ['+cdm.count+' вых.]';
	
	assignObjParams(obj, cdm);

	return obj;
}





