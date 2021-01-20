


// стальной Ниппель Н-Н
function st_zagl_nr(cdm)   
{	
	var d1 = sizeRezba({size: cdm.r1, side: 'n'});
	
	var m1 = cdm.m1;
	
	// доп. расчеты 
	var x_1 = 0.015 * d1.n*20;

	if(x_1 < 0.008) { x_1 = 0.008; }	
	if(x_1 > 0.012) { x_1 = 0.012; }
	
	var x_3L = m1/2 - x_1;	
	var x_4 = d1.n/7;	
	var d_nr = d1.n + d1.n/4; 
	
	
	var geom = new THREE.Geometry();	
		
	
	// труба левая часть
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: d1.n, diameter_vn: d1.v, ind: [1, 0, 0, 0] };
		inf.pos = { x: -(x_3L + x_1/2), y: 0, z: 0 };
		var poM1 = crFormSleeve_1(inf);

		var inf = { g: geom, dlina: x_3L, diameter_nr: d1.n, diameter_vn: d1.v };
		inf.pos = { x: -x_3L/2, y: 0, z: 0 };
		crFormSleeve_1(inf);		
	}
	
	// центр
	{
		var inf = { g: geom, dlina: x_4, diameter_nr: d_nr, diameter_vn: 0, edge_nr: 6 };
		crFormSleeve_1(inf);		
	}				
	

	var mat = [];
	mat[0] = infProject.material.metal_1;
	mat[1] = infProject.material.rezba_1;
	mat[2] = infProject.material.metal_1_edge;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	var name1 = cdm.r1+'(н)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: name1 };

	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}			

	
	cdm.name = 'Заглушка '+name1;
	
	assignObjParams(obj, cdm);

	return obj;
}






