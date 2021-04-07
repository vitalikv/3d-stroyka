




// расширительный бак
function cr_zr_nasos_1(cdm)
{		
	var d1 = sizeRezba({size: cdm.r1, side: 'n'});
	
	
	var z1 = 0.075;
	var z2 = 0.0015;
	var z3 = 0.03;
	
	var geom = new THREE.Geometry();
	
	// цилиндр насоса (красный)
	var inf = { g: geom, dlina: z1, diameter_nr: 0.085, diameter_vn: 0.00001 };
	inf.pos = { x: 0, y: 0, z: 0 };
	inf.rot = { x: 0, y: Math.PI/2, z: 0 };
	crFormSleeve_1(inf);	
	
	// цилиндр насоса (черный)
	var inf = { g: geom, dlina: z2, diameter_nr: 0.077, diameter_vn: 0.00001, ind: [1, 1, 1, 1] };
	inf.pos = { x: 0, y: 0, z: (z1 + z2)/2 };
	inf.rot = { x: 0, y: Math.PI/2, z: 0 };
	crFormSleeve_1(inf);		

	// задняя часть box	(красная)
	var arrP = [[0.5, -0.35], [0.5, 0.35], [0.35, 0.5], [-0.35, 0.5], [-0.5, 0.35], [-0.5, -0.35], [-0.35, -0.5], [0.35, -0.5]];
	var gShape = crForm({arrP: arrP, scale: 0.091, z: z3, pos: { x: 0, y: 0, z: -z1/2 - z3 + 0.005 }});
	geom.merge(gShape, gShape.matrix, 0);
	
	// верхняя часть box (черная)
	var arrP = [[0.4, -0.05], [0.4, 0.05], [0.35, 0.1], [-0.35, 0.1], [-0.4, 0.05], [-0.4, -0.05], [-0.15, -0.1], [0.15, -0.1]];
	var gShape = crForm({arrP: arrP, scale: 0.091, z: z1, pos: { x: 0, y: z1/2 + 0.01, z: -z1/2 - 0.001 }});
	geom.merge(gShape, gShape.matrix, 1);	
	
	// труба 
	var inf = { g: geom, dlina: 0.18, diameter_nr: 0.025, diameter_vn: 0.02 };	// резьба
	inf.pos = { x: 0, y: 0, z: -z1/2 - z3 + 0.005 };
	crFormSleeve_1(inf);

	// разъем 1
	var inf = { g: geom, dlina: 0.01, diameter_nr: d1.n, diameter_vn: 0.02, ind: [3, 0, 0, 0] };	// резьба
	inf.pos = { x: -0.18/2, y: 0, z: -z1/2 - z3 + 0.005 };
	var poM1 = crFormSleeve_1(inf);	
	
	// разъем 2
	var inf = { g: geom, dlina: 0.01, diameter_nr: d1.n, diameter_vn: 0.02, ind: [3, 0, 0, 0] };	// резьба
	inf.pos = { x: 0.18/2, y: 0, z: -z1/2 - z3 + 0.005 };
	var poM2 = crFormSleeve_1(inf);	

	
	// создаем фигуру
	function crForm(cdm)
	{
		var arrP = cdm.arrP;
		var scale = cdm.scale;
		var z = cdm.z;
		var pos = cdm.pos;
		
		var p = [];		
		
		for ( var i = 0; i < arrP.length; i++ ) 
		{  
			p[i] = new THREE.Vector2 ( arrP[i][0] * scale, arrP[i][1] * scale );
		}				
		
		var shape = new THREE.Shape( p );
		var gShape = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: z } );	
		gShape.translate(pos.x, pos.y, pos.z);

		for(var i = 0; i < gShape.faces.length; i++){ gShape.faces[i].materialIndex = 0; }

		return gShape;
	}	

	
	var mat = [];
	mat[0] = infProject.material.red_1;
	mat[1] = infProject.material.black_1; 
	mat[2] = infProject.material.metal_1;
	mat[3] = infProject.material.rezba_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	
	
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, 0), name: cdm.r1+'(н)' };
	arrP[arrP.length] = { pos: poM2.pos, rot: new THREE.Vector3(0, 0, 0), name: cdm.r1+'(н)' };
	
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	
	
	//obj.geometry.computeBoundingBox();
	//console.log(66666, obj.geometry.boundingBox.max.y - obj.geometry.boundingBox.min.y);
	
	
	cdm.name = 'цирк. насос '+cdm.r1;
	
	assignObjParams(obj, cdm);

	return obj;
}








 


