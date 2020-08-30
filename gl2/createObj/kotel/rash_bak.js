




// расширительный бак
function cr_rash_bak_1(cdm)
{	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	

	var geom = new THREE.Geometry();
	
	var g1 = new THREE.CylinderGeometry( 0.1, 0.1, 0.5, 32, 1, true );
	var g2 = new THREE.SphereGeometry( 0.1, 32, 32, 0, -Math.PI );
	g2.rotateX(Math.PI/2);
	
	
	for(var i = 0; i < g2.vertices.length; i++)
	{
		g2.vertices[i].y *= 0.5;
	}
	
	g2.translate(0, 0.5/2, 0);

	var g3 = new THREE.SphereGeometry( 0.1, 32, 32, 0, Math.PI );
	g3.rotateX(Math.PI/2);
	
	for(var i = 0; i < g3.vertices.length; i++)
	{
		g3.vertices[i].y *= 0.5;
	}
	
	g3.translate(0, -0.5/2, 0);	
	
	g3.computeBoundingBox();
	var offsetY_3 = g3.boundingBox.min.y;
	
	geom.merge(g1, g1.matrix, 0);
	geom.merge(g2, g2.matrix, 1);
	geom.merge(g3, g3.matrix, 1);
	
	
	var d2 = sizeRezba({size: '3/4', side: 'v'});
	
	var inf = { g: geom, dlina: 0.1, diameter_nr: d2.n, diameter_vn: d2.v, ind: [2,2,2,2] };
	inf.pos = { x: 0, y: offsetY_3 - 0.1/2, z: 0 };
	inf.rot = { x: 0, y: 0, z: -Math.PI/2 };
	crFormSleeve_1(inf);	
	
	
	var mat = [];
	mat[0] = infProject.material.red_1;
	mat[1] = infProject.material.white_1;
	mat[2] = infProject.material.metal_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	scene.add( obj );
	obj.position.copy(offset);	
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Расш.бак '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}








 


