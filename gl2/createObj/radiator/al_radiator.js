



// алюминиевый радиатор
function al_radiator_1(cdm)
{
	var size = cdm.size;
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	var count = cdm.count;
	

	// доп. расчеты		
	var x_1 = 0.04;
	var x_2 = (size.x - x_1)/2 + 0.001;
	d1.n *= 1.2;
	var h1 = size.y;
	var t1 = 0.003;		// толщина ребер ал.радиатора 
	
	

	var geom = new THREE.Geometry();
	
	
	// вверхняя резьба
	{
		// левая
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: -x_1/2 - x_2/2, y: h1/2, z: 0 };
		var poM2 = crFormSleeve_1(inf);

		// правая
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: x_1/2 + x_2/2, y: h1/2, z: 0 };
		var poM3 = crFormSleeve_1(inf);			
	}	
	
	// вверхняя труба горизонтальная
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: h1/2, z: 0 };
		crFormSleeve_1(inf);													
	}

	// вертикальная труба 
	{
		var inf = { g: geom, dlina: h1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: 0, z: 0 };
		inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
		crFormSleeve_1(inf);					
	}
	
	// нижняя труба горизонтальная
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: 0, y: -h1/2, z: 0 };
		crFormSleeve_1(inf);													
	}

	// нижняя резьба
	{
		// левая
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: -x_1/2 - x_2/2, y: -h1/2, z: 0 };
		var poM1 = crFormSleeve_1(inf);

		// правая
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: d1.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: x_1/2 + x_2/2, y: -h1/2, z: 0 };
		var poM4 = crFormSleeve_1(inf);			
	}		
	
	// центрально ребро сзади
	{
		var p = [];
		p[0] = new THREE.Vector2 ( d1.n/2, -h1/2 );
		p[1] = new THREE.Vector2 ( d1.n/2 + 0.025, -h1/2 );
		p[2] = new THREE.Vector2 ( d1.n/2 + 0.025, h1/2 );
		p[3] = new THREE.Vector2 ( d1.n/2, h1/2 );
		
		var inf = {p: p, w1: t1};
		inf.pos = { x: -t1/2, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI/2, z: 0 };		
	
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);
		
	}
	
	// вверхнее центрально ребро
	{
		var p = [];
		p[0] = new THREE.Vector2 ( d1.n/2 + 0.025, h1/2 );
		
		var resV = cfdr12d2({count: 16, size: d1.n/2});
		
		for ( var i = 0; i < resV.length; i++ )
		{
			p[p.length] = new THREE.Vector2( resV[i].x, resV[i].y + h1/2);
		}

		p[p.length] = new THREE.Vector2 ( -d1.n/2 - 0.025, h1/2 );
		p[p.length] = new THREE.Vector2 ( -d1.n/2 - 0.025, h1/2 + 0.03 );
		p[p.length] = new THREE.Vector2 ( d1.n/2 + 0.010, h1/2 + 0.03 );
		p[p.length] = new THREE.Vector2 ( d1.n/2 + 0.020, h1/2 + 0.02 );
		p[p.length] = new THREE.Vector2 ( d1.n/2 + 0.023, h1/2 + 0.01 );
		p[p.length] = new THREE.Vector2 ( d1.n/2 + 0.025, h1/2 + 0.00 );
		
		var inf = {p: p, w1: t1};
		inf.pos = { x: -t1/2, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI/2, z: 0 };		
	
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}
		
	// центрально ребро спереди
	if(1==1)
	{
		var p = [];
		p[0] = new THREE.Vector2 ( -d1.n/2, -h1/2 );
		p[1] = new THREE.Vector2 ( -d1.n/2 - 0.025, -h1/2 );
		p[2] = new THREE.Vector2 ( -d1.n/2 - 0.025, h1/2 );
		p[3] = new THREE.Vector2 ( -d1.n/2, h1/2 );
		
		var inf = {p: p, w1: t1};
		inf.pos = { x: -t1/2, y: 0, z: 0 };
		inf.rot = { x: 0, y: Math.PI/2, z: 0 };		
	
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}
	
	
	// переднее ребро
	if(1==1)
	{
		var offsetY = 0.025;
		var p = [];
		p[0] = new THREE.Vector2 ( size.x/2, -h1/2 );
		p[1] = new THREE.Vector2 ( size.x/2, h1/2 - offsetY );
		p[2] = new THREE.Vector2 ( -size.x/2, h1/2 - offsetY );
		p[3] = new THREE.Vector2 ( -size.x/2, -h1/2 );
		
		var inf = {p: p, w1: t1};
		inf.pos = { x: 0, y: -offsetY, z: d1.n/2 + 0.025 };	 
	
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}
	
	// 1-ое вверхнее переднее ребро под углом 
	{
		var offsetY = -0.075;
		var p = [];
		p[0] = new THREE.Vector2 ( 0, 0 );
		p[1] = new THREE.Vector2 ( 0.025, 0.05 );
		p[2] = new THREE.Vector2 ( 0.025-t1, 0.05 );
		p[3] = new THREE.Vector2 ( -t1, 0 );
		
		var inf = {p: p, w1: size.x};
		inf.pos = { x: size.x/2, y: h1/2 + offsetY, z: d1.n/2 + t1 };	
		inf.rot = { x: 0, y: -Math.PI/2, z: 0 };
		
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}

	// 1-ое вверхнее переднее ребро под углом 
	{
		var offsetY = -0.05;
		var p = [];
		p[p.length] = new THREE.Vector2 ( 0, 0 );
		p[p.length] = new THREE.Vector2 ( 0.025, 0.05 );
		p[p.length] = new THREE.Vector2 ( 0.025-t1, 0.05 );
		p[p.length] = new THREE.Vector2 ( -t1, 0 );
		
		var inf = {p: p, w1: size.x};
		inf.pos = { x: size.x/2, y: h1/2 + offsetY, z: d1.n/2 + t1 };	
		inf.rot = { x: 0, y: -Math.PI/2, z: 0 };
		
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}

	// вверхнее ребро 
	{
		var offsetY = -0.025;
		var p = [];
		p[p.length] = new THREE.Vector2 ( 0, 0 );
		p[p.length] = new THREE.Vector2 ( 0.025, 0.05 );
		p[p.length] = new THREE.Vector2 ( 0.025, 0.05+0.005 );
		p[p.length] = new THREE.Vector2 ( -d1.n/2 - 0.010, 0.05+0.005 );
		p[p.length] = new THREE.Vector2 ( -d1.n/2 - 0.010, 0.05+0.005-t1 );
		p[p.length] = new THREE.Vector2 ( 0.025-t1, 0.05+0.005-t1 );
		p[p.length] = new THREE.Vector2 ( 0.025-t1, 0.05 );
		p[p.length] = new THREE.Vector2 ( -t1, 0 );
		
		var inf = {p: p, w1: size.x};
		inf.pos = { x: size.x/2, y: h1/2 + offsetY, z: d1.n/2 + t1 };	
		inf.rot = { x: 0, y: -Math.PI/2, z: 0 };
		
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}
		


	// заднее ребро 
	{
		var p = [];
		p[0] = new THREE.Vector2 ( size.x/2, -h1/2 );
		p[1] = new THREE.Vector2 ( size.x/2, h1/2 );
		p[2] = new THREE.Vector2 ( -size.x/2, h1/2 );
		p[3] = new THREE.Vector2 ( -size.x/2, -h1/2 );
		
		var inf = {p: p, w1: t1};
		inf.pos = { x: 0, y: 0, z: -d1.n/2 - 0.025 };	
	
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}	
	
	
	// 1-ое верхнее заднее ребро под углом (ближе к центру) 
	if(1==1)
	{		
		var p = [];
		p[0] = new THREE.Vector2 ( -d1.n/2 - 0.025, h1/2 );
		p[1] = new THREE.Vector2 ( -d1.n/2 - 0.023, h1/2 + 0.01 );
		p[2] = new THREE.Vector2 ( -d1.n/2 - 0.020, h1/2 + 0.02 );
		p[3] = new THREE.Vector2 ( -d1.n/2 - 0.010, h1/2 + 0.03 );
		
		p[4] = new THREE.Vector2 ( -d1.n/2 - 0.010 + t1, h1/2 + 0.03 );
		p[5] = new THREE.Vector2 ( -d1.n/2 - 0.020 + t1, h1/2 + 0.02 );
		p[6] = new THREE.Vector2 ( -d1.n/2 - 0.023 + t1, h1/2 + 0.01 );
		p[7] = new THREE.Vector2 ( -d1.n/2 - 0.025 + t1, h1/2 );
		
		var inf = {p: p, w1: size.x};
		inf.pos = { x: size.x/2, y: 0, z: d1.n/2 + t1 };	
		inf.rot = { x: 0, y: -Math.PI/2, z: 0 };
		
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}	

	// 2-ое верхнее заднее ребро под углом (примыкает к заднему ребру) 
	{		
		var p = [];
		p[0] = new THREE.Vector2 ( -d1.n/2 - 0.025, h1/2 );
		p[1] = new THREE.Vector2 ( -d1.n/2 - 0.023, h1/2 + 0.01 );
		p[2] = new THREE.Vector2 ( -d1.n/2 - 0.020, h1/2 + 0.02 );
		p[3] = new THREE.Vector2 ( -d1.n/2 - 0.010, h1/2 + 0.03 );
		
		p[4] = new THREE.Vector2 ( -d1.n/2 - 0.010 + t1, h1/2 + 0.03 );
		p[5] = new THREE.Vector2 ( -d1.n/2 - 0.020 + t1, h1/2 + 0.02 );
		p[6] = new THREE.Vector2 ( -d1.n/2 - 0.023 + t1, h1/2 + 0.01 );
		p[7] = new THREE.Vector2 ( -d1.n/2 - 0.025 + t1, h1/2 );
		
		var inf = {p: p, w1: size.x};
		inf.pos = { x: size.x/2, y: 0, z: 0 };	
		inf.rot = { x: 0, y: -Math.PI/2, z: 0 };
		
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}		
	
	
	function cfdr12d2(cdm)
	{
		var count = cdm.count;
		var circle = [];
		var g = (Math.PI * 1) / count;
		
		for ( var i = 0; i < count+1; i++ )
		{
			var angle = g * i;
			circle[i] = new THREE.Vector2();
			circle[i].y = Math.sin(angle) * cdm.size;
			circle[i].x = Math.cos(angle) * cdm.size;
		}

		return circle;
	}


	// добавляем секции
	if(count > 1)
	{
		geom.computeBoundingBox();		
		var x = (geom.boundingBox.max.x - geom.boundingBox.min.x);
		
		var arr = [];
		
		for ( var i = 0; i < count-1; i++ )
		{
			var geom2 = geom.clone();
			
			geom2.translate(x * (i+1), 0, 0);
			
			arr[arr.length] = geom2;
			
			poM3.pos.x += x;
			poM4.pos.x += x;
		}

		for ( var i = 0; i < arr.length; i++ )
		{
			geom.merge(arr[i], arr[i].matrix);
		}
		
	}	
	
	
	var mat = [];
	mat[0] = infProject.material.white_1;
	mat[1] = infProject.material.rezba_1;
	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1;
	
	var xk = 0.007;
	poM1.pos.x -= xk;
	poM2.pos.x -= xk;
	poM3.pos.x += xk;
	poM4.pos.x += xk;
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	arrP[arrP.length] = { pos: poM3.pos, rot: new THREE.Vector3(0, 0, 0), name: name1 };	
	arrP[arrP.length] = { pos: poM4.pos, rot: new THREE.Vector3(0, 0, 0), name: name1 };
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}
	
	
	cdm.name = 'Ал.радиатор h'+size.y*1000+ ' ('+count+'шт.)';
	
	assignObjParams(obj, cdm);

	return obj;		
}






 

// заглушки для алюминиевого радиатора
function al_zagl_radiator_1(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'v'});
	
	if(cdm.r2)
	{
		var d2 = sizeRezba({size: cdm.r2, side: 'n'});
	}
	else
	{
		var d2 = {n: 0, v: 0};
	}
	
	var m1 = cdm.m1;
	
	// доп. расчеты 
	var x_1 = 0.008;	
	var x_2 = 0.005;	
	var x_3 = 0.003;
	var s1 = (d2.v) ? d2.v+0.001 : 0;
	
	var geom = new THREE.Geometry();	

	// резьба (н)
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: -(x_3/2+x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);	
	}

	
	// труба центральная часть
	if(1==1)
	{
		var inf = { g: geom, dlina: x_3, diameter_nr: d1.n+0.003, diameter_vn: d2.v };
		inf.pos = { x: 0, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
	// резьба (в)
	if(d2.n)
	{
		var inf = { g: geom, dlina: x_2, diameter_nr: d2.n, diameter_vn: d2.v, ind: [0, 1, 0, 0] };
		inf.pos = { x: (x_3/2+x_2/2), y: 0, z: 0 };
		var poM2 = crFormSleeve_1(inf);	
	}

	// гайка
	{		
		var inf = { g: geom, dlina: x_2, diameter_nr: d1.n, diameter_vn: s1, edge_nr: 6, ind: [2, 0, 0, 0] };
		inf.pos = { x: (x_3/2+x_2/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 		
	}	

	
	// воздухоотводчик
	if(cdm.type == 'vsd')
	{
		var vsd = {};
		vsd.w1 = 0.001;
		vsd.d1 = 0.02;
		vsd.y1 = 0.016;
		vsd.x1 = 0.007;
		vsd.t1 = 0.004;	// толщина бабочки
		
		var inf = { g: geom, dlina: vsd.w1, diameter_nr: vsd.d1, diameter_vn: 0, ind: [3, 3, 3, 3] };
		inf.pos = { x: (x_3/2 + x_2 + vsd.w1/2), y: 0, z: 0 };
		crFormSleeve_1(inf); 
		
		var p = [];
		p[0] = new THREE.Vector2 ( 0, -vsd.y1/2 );
		p[1] = new THREE.Vector2 ( 0, vsd.y1/2 );
		p[2] = new THREE.Vector2 ( vsd.x1, vsd.y1/2 );
		p[3] = new THREE.Vector2 ( vsd.x1/2, 0 );
		p[4] = new THREE.Vector2 ( vsd.x1, -vsd.y1/2 );
		
		var inf = {p: p, w1: vsd.t1};
		inf.pos = { x: x_3/2 + x_2 + vsd.w1, y: 0, z: -vsd.t1/2 };	
	
		var gShape = arr_form_1(inf);
		geom.merge(gShape, gShape.matrix, 0);		
	}
	


	var mat = [];
	mat[0] = infProject.material.white_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.white_1_edge;
	mat[3] = infProject.material.metal_1;
	
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(н)';
	var name2 = cdm.r2+'(в)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };
	if(poM2) { arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: name2 }; }

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	

	if(cdm.type == 'prh') { cdm.name = 'перех.радиаторный' + cdm.r2 };		
	if(cdm.type == 'zgl') { cdm.name = 'заглушка радиаторная' };
	if(cdm.type == 'vsd') { cdm.name = 'воздухоотв.радиаторный' };	
	
	assignObjParams(obj, cdm);

	return obj;
}



