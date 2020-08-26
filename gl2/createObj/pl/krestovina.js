




// полипропиленовый угол 90
function pl_krestovina_1(cdm)
{
	var size = sizeTubePP({size: cdm.inch});
	
	var length_1 = cdm.dlina;
	var diameter_nr = size.n;
	var diameter_vn = size.v;
	
	var offset = (cdm.offset) ? cdm.offset : new THREE.Vector3();
	
	// доп. расчеты		
	var x_1 = 0.015;
	var x_2 = length_1 - x_1 * 2;
		

	var geom = new THREE.Geometry();
	
	// труба горизонтальная
	{
		var inf = { g: geom, dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn };
		inf.pos = { x: -(x_2 + x_1)/2, y: 0, z: 0 };
		crFormSleeve_1(inf);					
		
		var inf = { g: geom, dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn };
		crFormSleeve_1(inf);						

		var inf = { g: geom, dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn };
		inf.pos = { x: (x_2 + x_1)/2, y: 0, z: 0 };
		crFormSleeve_1(inf);							
	}		

	// труба 90 градусов
	{	
		var inf = { g: geom, dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn };
		inf.pos = { x: 0, y: -(x_2 + x_1)/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);
		
		var inf = { g: geom, dlina: x_2, diameter_nr: diameter_nr, diameter_vn: diameter_vn };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
		
		var inf = { g: geom, dlina: x_1, diameter_nr: diameter_nr, diameter_vn: diameter_vn }; 
		inf.pos = { x: 0, y: (x_2 + x_1)/2, z: 0 };
		inf.rot = { x: 0, y: 0, z: Math.PI/2 };
		crFormSleeve_1(inf);		
	}		
		
	
	var mat = [];
	mat[0] = infProject.material.white_1;
	
	var group = new THREE.Mesh(geom, mat);		
	var obj = getBoundObject_1({obj: group});
	
	
	var name = cdm.inch;
	
	var arrP = [];
	arrP[arrP.length] = { pos: new THREE.Vector3(-(x_2 + x_1)/2, 0, 0), rot: new THREE.Vector3(0, Math.PI, 0), name: name };
	arrP[arrP.length] = { pos: new THREE.Vector3((x_2 + x_1)/2, 0, 0), rot: new THREE.Vector3(0, 0, 0), name: name };
	arrP[arrP.length] = { pos: new THREE.Vector3(0, -(x_2 + x_1)/2, 0), rot: new THREE.Vector3(0, Math.PI, -Math.PI/2), name: name };
	arrP[arrP.length] = { pos: new THREE.Vector3(0, (x_2 + x_1)/2, 0), rot: new THREE.Vector3(0, Math.PI, Math.PI/2), name: name };
	
	for ( var i = 0; i < arrP.length; i++ )
	{
		arrP[i].obj = obj;
		arrP[i].id = i;
		cr_CenterPoint(arrP[i]);
	}	
	
	scene.add( obj );
	obj.position.copy(offset);	
	
	
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	var name = 'Крестовина '+name;
	obj.userData.obj3D.nameRus = name; 
	obj.material.visible = false;
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;
}








 


