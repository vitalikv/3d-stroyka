




// расширительный бак
function cr_rash_bak_1(cdm)
{	
	var d = cdm.d; 	// диаметр
	var h1 = cdm.h1;
	var name = cdm.name;
	var d2 = sizeRezba({size: cdm.r1, side: 'n'});
	
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты 
	var radius = d/2;
	var h2 = h1 - radius;
	var h3 = 0.01;
	var h4 = 0.015;
	
	var geom = new THREE.Geometry();
	
	var g1 = new THREE.CylinderGeometry( radius, radius, h2, 32, 1, true );
	var g2 = new THREE.SphereGeometry( radius, 32, 32, 0, Math.PI );
	g2.rotateX(Math.PI/2);
	g2.rotateZ(Math.PI);
	for(var i = 0; i < g2.vertices.length; i++){ g2.vertices[i].y *= 0.5; }		// уменьшаем (сжимаем) 	
	g2.translate(0, h2/2, 0);
	

	var g3 = new THREE.SphereGeometry( radius, 32, 32, 0, Math.PI );
	g3.rotateX(Math.PI/2);	
	for(var i = 0; i < g3.vertices.length; i++){ g3.vertices[i].y *= 0.5; }	
	g3.translate(0, -h2/2, 0);	 
	
	
	g3.computeBoundingBox();
	var offsetY_3 = g3.boundingBox.min.y;
	
	geom.merge(g1, g1.matrix, 0);
	geom.merge(g2, g2.matrix, 0);
	geom.merge(g3, g3.matrix, 0);
	
	
	
		
	var inf = { g: geom, dlina: h3, diameter_nr: d2.n, diameter_vn: d2.v, ind: [2,2,2,2] };
	inf.pos = { x: 0, y: (offsetY_3 + 0.005) - h3/2, z: 0 };
	inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
	crFormSleeve_1(inf);	
	
	var inf = { g: geom, dlina: h4, diameter_nr: d2.n, diameter_vn: d2.v, ind: [1,1,1,1] };
	inf.pos = { x: 0, y: (offsetY_3 + 0.005 - h3) - h4/2, z: 0 }; 
	inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
	var poM1 = crFormSleeve_1(inf);

	
	var mat = [];
	mat[0] = infProject.material.red_1;
	mat[1] = infProject.material.rezba_1; 
	mat[2] = infProject.material.metal_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	
	var name2 = cdm.r1+'(н)';
	
	var arrP = [];
	arrP[arrP.length] = { pos: poM1.pos, rot: new THREE.Vector3(0, Math.PI, -Math.PI/2), name: name2 };
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	
	
	//obj.geometry.computeBoundingBox();
	//console.log(66666, obj.geometry.boundingBox.max.y - obj.geometry.boundingBox.min.y);
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Расш.бак '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	if(cdm.demo)
	{
		scene.add( obj );
		obj.position.copy(offset);		
		infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;		
	}

	return obj;
}








 


