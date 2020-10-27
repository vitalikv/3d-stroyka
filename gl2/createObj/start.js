

async function fc_cr_obj(params)
{
	var arr = params.arr;
	var funcName = params.funcName;
	var n = (params.n) ? params.n : 0;	
	var step = (params.step) ? params.step : 0.1;
	
	//console.log(funcName);	
	//return;

	for(var i = 0; i < arr.length; i++)
	{
		var obj = window[funcName](arr[i]);
		
		if(params.startPos)
		{
			var pos = params.startPos.clone();	
			if(params.offsetX) { pos.x += step * n; }
			else { pos.z += step * n; }
			obj.position.copy(pos);			
		}
		
		scene.add( obj );				
		infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;			
		
		var arrO = getAllChildObect({obj: obj});
		for(var i2 = 0; i2 < arrO.length; i2++)
		{
			disposeNode(arrO[i2]);
		}		
		
		// сохраняем в базу
		if(1==2)
		{
			var name = (obj.userData.obj3D) ? obj.userData.obj3D.nameRus : obj.userData.wf_tube.nameRus;
			await saveObjSql_2({name: name, params: {fc: {name: funcName}, cdm: arr[i], cat: params.cat} })
		}
		
		n++;
	}

	return n;
}


// сохраняем в базу
async function saveObjSql_2(cdm)
{
	var lotid = 0;
	var name = cdm.name;
	var type = 'obj';
	var params = cdm.params;
	
	//delete params.cdm.demo;
	//delete params.cdm.offset;
	
	
	var name = (name) ? JSON.stringify( name ) : null;
	var type = (type) ? JSON.stringify( type ) : null;	
	var params = (params) ? JSON.stringify( params ) : null;	
	
	//list_obj_2
	var url = infProject.path+'admin/obj/saveObjSql_2.php';	
	
	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'id='+lotid+'&name='+name+'&type='+type+'&params='+params ,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },				
	});
	var data = await response.json();
	
	console.log(data);
}




async function cr_obj_cat()
{

	if(1==2)
	{
		var arr = [];
		arr[arr.length] = { side: 'v', r1: '1', r2: '1/2', r3: '1', m1: 0.169, m2: 0.035 };	
		
		await fc_cr_obj({funcName: 'st_collector_1', arr: arr, startPos: new THREE.Vector3(-0.6, 1, 3+0.0), cat: 'st_collector_1'});		
	}
	
	return;
	
	
	if(1==1)
	{
		var startPos = new THREE.Vector3(0.5, 1, 3.5);
		
		var arr = [];
		arr[arr.length] = { type: 'horizontal', diameter: 0.016, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		arr[arr.length] = { type: 'horizontal', diameter: 0.020, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		arr[arr.length] = { type: 'horizontal', diameter: 0.025, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		arr[arr.length] = { type: 'horizontal', diameter: 0.026, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		arr[arr.length] = { type: 'horizontal', diameter: 0.030, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		arr[arr.length] = { type: 'horizontal', diameter: 0.032, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		arr[arr.length] = { type: 'horizontal', diameter: 0.040, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		arr[arr.length] = { type: 'horizontal', diameter: 0.050, point: [{pos: new THREE.Vector3(-0.5,0,0)}, {pos: new THREE.Vector3(0.5,0,0)}] };
		
		await fc_cr_obj({funcName: 'createTubeWF_1', arr: arr, startPos: startPos, cat: 'tube_horiz_1'});
		
		var arr = [];
		arr[arr.length] = { type: 'vertical', diameter: 0.016, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.020, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.025, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.026, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.030, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.032, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.040, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.050, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		arr[arr.length] = { type: 'vertical', diameter: 0.050, point: [{pos: new THREE.Vector3(0,-0.5,0)}, {pos: new THREE.Vector3(0,0.5,0)}] };
		
		await fc_cr_obj({funcName: 'createTubeWF_1', arr: arr, startPos: startPos, cat: 'tube_vert_1'});		
	}
	
	

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '1', r2: '1/2', name: 'перех.радиаторный 1/2' };		
		arr[arr.length] = { r1: '1', r2: '3/4', name: 'перех.радиаторный 3/4' };
		arr[arr.length] = { r1: '1', r2: 0, name: 'заглушка радиаторная' };
		arr[arr.length] = { r1: '1', r2: 0, vsd: true, name: 'воздухоотв.радиаторный' };
		
		await fc_cr_obj({funcName: 'al_zagl_radiator_1', arr: arr, startPos: new THREE.Vector3(-4.7, 1, -1), cat: 'al_zagl_radiator_1'});		
	}
	

	if(1==1)
	{
		var n = 0;
		var startPos = new THREE.Vector3(-4.5, 1, -3);

		var arr2 = [0.2, 0.35, 0.5, 0.6, 0.7, 0.8];

		for(var i = 0; i < arr2.length; i++)
		{
			var arr = [];
			arr[arr.length] = { count: 1, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };	
			arr[arr.length] = { count: 2, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 3, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 4, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 5, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 6, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 7, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 8, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 9, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			arr[arr.length] = { count: 10, size: {x: 0.08, y: arr2[i], z: 0.08}, r1: '1' };
			
			n = await fc_cr_obj({funcName: 'al_radiator_1', arr: arr, startPos: startPos, step: 0.35, n: n, cat: 'al_radiator_'+(arr2[i]*1000)+'_1'});			
		}			
	}	
	
	
	
	
	if(1==1)
	{
		var n = 0;
		var startPos = new THREE.Vector3(4.5, 1, -3);
		
		var arr2 = [0.3, 0.4, 0.5, 0.6, 0.9];
		
		for(var i = 0; i < arr2.length; i++)
		{
			var arr = [];
			arr[arr.length] = { size: {x: 0.40, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 0.50, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 0.60, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 0.70, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 0.80, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 0.90, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 1.00, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 1.20, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 1.40, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 1.60, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 1.80, y: arr2[i], z: 0.07}, r1: '1/2' };
			arr[arr.length] = { size: {x: 2.00, y: arr2[i], z: 0.07}, r1: '1/2' };
			
			n = await fc_cr_obj({funcName: 'st_radiator_1', arr: arr, startPos: startPos, step: 0.35, n: n, cat: 'st_radiator_'+(arr2[i]*1000)+'_1'});			
		}		
	}	
	
	
	if(1==1)
	{
		var startPos = new THREE.Vector3(0.5, 1, 3.5);
		
		var arr = [];
		arr[arr.length] = { r1: '1/2', r2: '3/4', m1: 0.055, m2: 0.02 };
		arr[arr.length] = { r1: '3/4', r2: '1', m1: 0.059, m2: 0.022 };
		
		var n = await fc_cr_obj({funcName: 'reg_kran_primoy_1', arr: arr, startPos: startPos, n: n, cat: 'kran_reg_1'});

		var arr = [];
		arr[arr.length] = { r1: '1/2', r2: '3/4', m1: 0.055, m2: 0.02, termoreg: true };
		arr[arr.length] = { r1: '3/4', r2: '1', m1: 0.059, m2: 0.022, termoreg: true };
		
		var n = await fc_cr_obj({funcName: 'reg_kran_primoy_1', arr: arr, startPos: startPos, n: n, cat: 'kran_termoreg_1'});	 	
	}
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { d: 0.245, h1: 0.25, r1: '3/4', name: '6л' };
		arr[arr.length] = { d: 0.245, h1: 0.28, r1: '3/4', name: '8л' };
		arr[arr.length] = { d: 0.245, h1: 0.33, r1: '3/4', name: '10л' };
		arr[arr.length] = { d: 0.285, h1: 0.325, r1: '3/4', name: '12л' };
		arr[arr.length] = { d: 0.285, h1: 0.395, r1: '3/4', name: '18л' };
		arr[arr.length] = { d: 0.325, h1: 0.420, r1: '3/4', name: '24л' };		
		
		await fc_cr_obj({funcName: 'cr_rash_bak_1', arr: arr, startPos: new THREE.Vector3(-1, 1, -1), offsetX: true, step: 0.35, cat: 'rash_bak_1'});		
	}
	

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { size: {x: 0.4, y: 0.73, z: 0.3}, r1: '3/4', type: 'back' };		
		arr[arr.length] = { size: {x: 0.4, y: 0.73, z: 0.3}, r1: '3/4', type: 'bottom' };
		arr[arr.length] = { size: {x: 0.4, y: 0.73, z: 0.3}, r1: '3/4', type: 'top-bottom' };
		arr[arr.length] = { size: {x: 0.4, y: 0.73, z: 0.3}, r1: '3/4', type: 'left-right' };
		
		await fc_cr_obj({funcName: 'cr_kotel_1', arr: arr, startPos: new THREE.Vector3(0.5, 1, 3.5), step: 0.55, cat: 'kotel_2'});		
	}

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { size: {x: 0.18, y: 0.05, z: 0.05}, r1: '1' };		
		
		await fc_cr_obj({funcName: 'gr_bez_1', arr: arr, startPos: new THREE.Vector3(1.5, 1, -1), cat: 'kotel_1'});		
	}	
	

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '3/4', r2: '1/2', m1: 0.040 };
		arr[arr.length] = { r1: '1', r2: '3/4', m1: 0.045 };
		arr[arr.length] = { r1: '1 1/4', r2: '1', m1: 0.052 };
		
		await fc_cr_obj({funcName: 'st_pol_sgon_1', arr: arr, startPos: new THREE.Vector3(-1.2, 1, 0), n: 0, cat: 'st_pol_sgon_1'});		
	}

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.053 };
		arr[arr.length] = { r1: '3/4', m1: 0.065 };
		arr[arr.length] = { r1: '1', m1: 0.077 };
		arr[arr.length] = { r1: '1 1/4', m1: 0.091 };
		arr[arr.length] = { r1: '1 1/2', m1: 0.106 };
		arr[arr.length] = { r1: '2', m1: 0.126 };		
		
		await fc_cr_obj({funcName: 'filtr_kosoy_1', arr: arr, startPos: new THREE.Vector3(-1.0, 1, 0+0.0), cat: 'filtr_kosoy_1'});		
	}	
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.046 };
		arr[arr.length] = { r1: '3/4', m1: 0.053 };
		arr[arr.length] = { r1: '1', m1: 0.069 };
		arr[arr.length] = { r1: '1 1/4', m1: 0.083 };		
		
		await fc_cr_obj({funcName: 'st_krestovina_1', arr: arr, startPos: new THREE.Vector3(-0.8, 1, 0+0.0), cat: 'st_krestovina'});		
	}

	

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { side: 'v', r1: '1/2', r2: '1/2', r3: '1/2', m1: 0.046, m2: 0.023 };
		arr[arr.length] = { side: 'v', r1: '3/4', r2: '3/4', r3: '3/4', m1: 0.058, m2: 0.027 };
		arr[arr.length] = { side: 'v', r1: '1', r2: '1', r3: '1', m1: 0.069, m2: 0.035 };
		arr[arr.length] = { side: 'v', r1: '1 1/4', r2: '1 1/4', r3: '1 1/4', m1: 0.080, m2: 0.040 };
		arr[arr.length] = { side: 'v', r1: '1 1/2', r2: '1 1/2', r3: '1 1/2', m1: 0.092, m2: 0.046 };
		arr[arr.length] = { side: 'v', r1: '2', r2: '2', r3: '2', m1: 0.103, m2: 0.052 };
		
		arr[arr.length] = { side: 'n', r1: '1/2', r2: '1/2', r3: '1/2', m1: 0.06, m2: 0.03 };
		arr[arr.length] = { side: 'n', r1: '3/4', r2: '3/4', r3: '3/4', m1: 0.075, m2: 0.036 };
		arr[arr.length] = { side: 'n', r1: '1', r2: '1', r3: '1', m1: 0.08, m2: 0.04 };
		
		arr[arr.length] = { side: 'v', r1: '3/4', r2: '1/2', r3: '3/4', m1: 0.056, m2: 0.027 };
		arr[arr.length] = { side: 'v', r1: '1', r2: '1/2', r3: '1', m1: 0.056, m2: 0.03 };
		arr[arr.length] = { side: 'v', r1: '1', r2: '3/4', r3: '1', m1: 0.062, m2: 0.03 };
		arr[arr.length] = { side: 'v', r1: '1 1/4', r2: '1/2', r3: '1 1/4', m1: 0.064, m2: 0.036 };
		arr[arr.length] = { side: 'v', r1: '1 1/4', r2: '3/4', r3: '1 1/4', m1: 0.070, m2: 0.036 };
		arr[arr.length] = { side: 'v', r1: '1 1/4', r2: '1', r3: '1 1/4', m1: 0.076, m2: 0.038 };		
		
		await fc_cr_obj({funcName: 'st_troinik_1', arr: arr, startPos: new THREE.Vector3(-0.6, 1, 0+0.0), cat: 'st_troinik'});		
	}

	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { side: 'v', r1: '1/2', m1: 0.023 };
		arr[arr.length] = { side: 'v', r1: '3/4', m1: 0.029 };
		arr[arr.length] = { side: 'v', r1: '1', m1: 0.037 };
		arr[arr.length] = { side: 'v', r1: '1 1/4', m1: 0.046 };
		arr[arr.length] = { side: 'v', r1: '1 1/2', m1: 0.053 };
		arr[arr.length] = { side: 'v', r1: '2', m1: 0.065 };
		arr[arr.length] = { side: 'n', r1: '1/2', m1: 0.027 };
		arr[arr.length] = { side: 'n', r1: '3/4', m1: 0.034 };
		arr[arr.length] = { side: 'n', r1: '1', m1: 0.041 };
		
		var n = await fc_cr_obj({funcName: 'st_ugol_90_1', arr: arr, startPos: new THREE.Vector3(-0.4, 1, 0+0.0), cat: 'st_ugol_90'});

		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.018 };
		arr[arr.length] = { r1: '3/4', m1: 0.022 };
		arr[arr.length] = { r1: '1', m1: 0.028 };
		
		await fc_cr_obj({funcName: 'st_ugol_45_1', arr: arr, startPos: new THREE.Vector3(-0.4, 1, 0+0.0), n: n, cat: 'st_ugol_45'});		
	}


	


	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '1/2', r2: '1/2', m1: 0.022 };
		arr[arr.length] = { r1: '3/4', r2: '3/4', m1: 0.022 };
		arr[arr.length] = { r1: '1', r2: '1', m1: 0.034 };
		arr[arr.length] = { r1: '1 1/4', r2: '1 1/4', m1: 0.035 };
		arr[arr.length] = { r1: '1 1/2', r2: '1 1/2', m1: 0.038 };
		arr[arr.length] = { r1: '2', r2: '2', m1: 0.039 };
		arr[arr.length] = { r1: '3/8', r2: '1/4', m1: 0.021 };
		arr[arr.length] = { r1: '1/2', r2: '1/4', m1: 0.022 };
		arr[arr.length] = { r1: '1/2', r2: '3/8', m1: 0.022 };
		arr[arr.length] = { r1: '3/4', r2: '1/2', m1: 0.026 };
		arr[arr.length] = { r1: '1', r2: '1/2', m1: 0.034 };
		arr[arr.length] = { r1: '1', r2: '3/4', m1: 0.034 };
		arr[arr.length] = { r1: '1 1/4', r2: '1/2', m1: 0.035 };
		arr[arr.length] = { r1: '1 1/4', r2: '3/4', m1: 0.035 };
		arr[arr.length] = { r1: '1 1/4', r2: '1', m1: 0.037 };
		arr[arr.length] = { r1: '1 1/2', r2: '1/2', m1: 0.038 };
		arr[arr.length] = { r1: '1 1/2', r2: '3/4', m1: 0.038 };
		arr[arr.length] = { r1: '1 1/2', r2: '1', m1: 0.04 };
		arr[arr.length] = { r1: '1 1/2', r2: '1 1/4', m1: 0.041 };
		arr[arr.length] = { r1: '2', r2: '1/2', m1: 0.039 };
		arr[arr.length] = { r1: '2', r2: '3/4', m1: 0.041 };
		arr[arr.length] = { r1: '2', r2: '1', m1: 0.041 };
		arr[arr.length] = { r1: '2', r2: '1 1/4', m1: 0.041 };
		arr[arr.length] = { r1: '2', r2: '1 1/2', m1: 0.043 };		
		
		await fc_cr_obj({funcName: 'st_nippel_1', arr: arr, startPos: new THREE.Vector3(-0.2, 1, 0+0.0), n: 0, cat: 'st_nippel'});		
	}	
	
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '1/2', r2: '1/2', m1: 0.030 };
		arr[arr.length] = { r1: '3/4', r2: '3/4', m1: 0.033 };
		arr[arr.length] = { r1: '1', r2: '1', m1: 0.035 };
		arr[arr.length] = { r1: '1 1/4', r2: '1 1/4', m1: 0.047 };
		arr[arr.length] = { r1: '1 1/2', r2: '1 1/2', m1: 0.052 };
		arr[arr.length] = { r1: '2', r2: '2', m1: 0.06 };
		arr[arr.length] = { r1: '1/2', r2: '3/8', m1: 0.028 };	
		arr[arr.length] = { r1: '3/4', r2: '1/2', m1: 0.032 };	
		arr[arr.length] = { r1: '1', r2: '1/2', m1: 0.034 };	
		arr[arr.length] = { r1: '1', r2: '3/4', m1: 0.039 };	
		arr[arr.length] = { r1: '1 1/4', r2: '1/2', m1: 0.041 };	
		arr[arr.length] = { r1: '1 1/4', r2: '3/4', m1: 0.041 };	
		arr[arr.length] = { r1: '1 1/4', r2: '1', m1: 0.042 };	
		arr[arr.length] = { r1: '1 1/2', r2: '1 1/4', m1: 0.043 };	
		arr[arr.length] = { r1: '2', r2: '1', m1: 0.048 };
		arr[arr.length] = { r1: '2', r2: '1 1/4', m1: 0.048 };
		arr[arr.length] = { r1: '2', r2: '1 1/2', m1: 0.048 };		

		await fc_cr_obj({funcName: 'st_mufta_1', arr: arr, startPos: new THREE.Vector3(0.0, 1, 0+0.0), n: 0, cat: 'st_mufta'});
	}
	


	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '20', m1: 0.026 };
		arr[arr.length] = { r1: '25', m1: 0.030 };
		arr[arr.length] = { r1: '32', m1: 0.037 };
		arr[arr.length] = { r1: '40', m1: 0.044 };
		arr[arr.length] = { r1: '50', m1: 0.053 }; 
		arr[arr.length] = { r1: '63', m1: 0.06 };		
	
		var n = await fc_cr_obj({funcName: 'pl_ugol_90_1', arr: arr, startPos: new THREE.Vector3(0.4, 1, 0+0.0), n: 0, cat: 'pl_ugol_90'});
		
		var arr = [];		
		arr[arr.length] = { r1: '20', m1: 0.021 };
		arr[arr.length] = { r1: '25', m1: 0.024 };
		arr[arr.length] = { r1: '32', m1: 0.028 };
		arr[arr.length] = { r1: '40', m1: 0.035 };
		arr[arr.length] = { r1: '50', m1: 0.038 };
		arr[arr.length] = { r1: '63', m1: 0.042 };	
		
		var n = await fc_cr_obj({funcName: 'pl_ugol_45_1', arr: arr, startPos: new THREE.Vector3(0.4, 1, 0+0.0), n: n, cat: 'pl_ugol_45'});		

		var arr = [];
		arr[arr.length] = { side: 'n', r1: '20', r2: '1/2', m1: 0.026 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '3/4', m1: 0.031 };
		arr[arr.length] = { side: 'n', r1: '25', r2: '1/2', m1: 0.030 };
		arr[arr.length] = { side: 'n', r1: '25', r2: '3/4', m1: 0.031 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '3/4', m1: 0.036 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '1', m1: 0.039 };
		
		arr[arr.length] = { side: 'v', r1: '20', r2: '1/2', m1: 0.026 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '3/4', m1: 0.031 };
		arr[arr.length] = { side: 'v', r1: '25', r2: '1/2', m1: 0.030 };
		arr[arr.length] = { side: 'v', r1: '25', r2: '3/4', m1: 0.031 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '3/4', m1: 0.036 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '1', m1: 0.039 };		
		
		var n = await fc_cr_obj({funcName: 'pl_ugol_90_rezba_1', arr: arr, startPos: new THREE.Vector3(0.4, 1, 0+0.0), n: n, cat: 'pl_ugol_90_rezba'});		
	}	
		
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '25', r2: '20', m1: 0.039 };
		arr[arr.length] = { r1: '32', r2: '20', m1: 0.043 };
		arr[arr.length] = { r1: '32', r2: '25', m1: 0.045 };
		arr[arr.length] = { r1: '40', r2: '20', m1: 0.044 };
		arr[arr.length] = { r1: '40', r2: '25', m1: 0.045 };
		arr[arr.length] = { r1: '40', r2: '32', m1: 0.048 };
		arr[arr.length] = { r1: '50', r2: '20', m1: 0.055 };
		arr[arr.length] = { r1: '50', r2: '25', m1: 0.055 };
		arr[arr.length] = { r1: '50', r2: '32', m1: 0.056 };
		arr[arr.length] = { r1: '50', r2: '40', m1: 0.056 };
		arr[arr.length] = { r1: '63', r2: '25', m1: 0.065 };
		arr[arr.length] = { r1: '63', r2: '32', m1: 0.065 };
		arr[arr.length] = { r1: '63', r2: '40', m1: 0.065 };
		arr[arr.length] = { r1: '63', r2: '50', m1: 0.067 };
		arr[arr.length] = { r1: '20', r2: '20', m1: 0.032 };
		arr[arr.length] = { r1: '25', r2: '25', m1: 0.035 };
		arr[arr.length] = { r1: '32', r2: '32', m1: 0.039 };
		arr[arr.length] = { r1: '40', r2: '40', m1: 0.046 };
		arr[arr.length] = { r1: '50', r2: '50', m1: 0.052 };
		arr[arr.length] = { r1: '63', r2: '63', m1: 0.060 };

		var n = await fc_cr_obj({funcName: 'pl_mufta_1', arr: arr, startPos: new THREE.Vector3(0.6, 1, 0+0.0), n: 0, cat: 'pl_mufta'});
		
		var arr = [];
		arr[arr.length] = { side: 'n', r1: '20', r2: '1/2', m1: 0.036 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '3/4', m1: 0.038 };
		arr[arr.length] = { side: 'n', r1: '25', r2: '1/2', m1: 0.039 };
		arr[arr.length] = { side: 'n', r1: '25', r2: '3/4', m1: 0.041 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '3/4', m1: 0.043 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '1', m1: 0.049 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '1/2', m1: 0.036 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '3/4', m1: 0.038 };
		arr[arr.length] = { side: 'v', r1: '25', r2: '1/2', m1: 0.039 };
		arr[arr.length] = { side: 'v', r1: '25', r2: '3/4', m1: 0.041 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '3/4', m1: 0.043 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '1', m1: 0.049 };		

		var n = await fc_cr_obj({funcName: 'pl_perehod_rezba_1', arr: arr, startPos: new THREE.Vector3(0.6, 1, 0+0.0), n: n, cat: 'pl_perehod_rezba'});		
	}
	

	

	if(1==1)
	{	
		var arr = [];
		arr[arr.length] = { r1: '20', m1: 0.055 };
		arr[arr.length] = { r1: '25', m1: 0.064 };
		arr[arr.length] = { r1: '32', m1: 0.08 };
		arr[arr.length] = { r1: '40', m1: 0.095 };
		arr[arr.length] = { r1: '50', m1: 0.11 };
		arr[arr.length] = { r1: '63', m1: 0.125 };			

		var n = await fc_cr_obj({funcName: 'pl_troinik_1', arr: arr, startPos: new THREE.Vector3(0.8, 1, 0+0.0), n: 0, cat: 'pl_troinik'});

		var arr = [];
		arr[arr.length] = { r1: '25', r2: '20', r3: '20', m1: 0.055, m2: 0.015 };
		arr[arr.length] = { r1: '25', r2: '20', r3: '25', m1: 0.055, m2: 0.015 };
		arr[arr.length] = { r1: '32', r2: '20', r3: '20', m1: 0.060, m2: 0.015 };
		arr[arr.length] = { r1: '32', r2: '20', r3: '25', m1: 0.060, m2: 0.015 };
		arr[arr.length] = { r1: '32', r2: '20', r3: '32', m1: 0.060, m2: 0.015 };
		arr[arr.length] = { r1: '32', r2: '25', r3: '20', m1: 0.065, m2: 0.016 };
		arr[arr.length] = { r1: '32', r2: '25', r3: '25', m1: 0.065, m2: 0.016 };
		arr[arr.length] = { r1: '32', r2: '25', r3: '32', m1: 0.065, m2: 0.015 };
		arr[arr.length] = { r1: '40', r2: '20', r3: '40', m1: 0.075, m2: 0.015 };
		arr[arr.length] = { r1: '40', r2: '25', r3: '40', m1: 0.075, m2: 0.016 };
		arr[arr.length] = { r1: '40', r2: '32', r3: '40', m1: 0.075, m2: 0.018 };
		arr[arr.length] = { r1: '50', r2: '20', r3: '50', m1: 0.102, m2: 0.015 };
		arr[arr.length] = { r1: '50', r2: '25', r3: '50', m1: 0.102, m2: 0.016 };
		arr[arr.length] = { r1: '50', r2: '32', r3: '50', m1: 0.102, m2: 0.018 };
		arr[arr.length] = { r1: '50', r2: '40', r3: '50', m1: 0.102, m2: 0.021 };
	
		var n = await fc_cr_obj({funcName: 'pl_troinik_2', arr: arr, startPos: new THREE.Vector3(0.8, 1, 0+0.0), n: n, cat: 'pl_troinik_2'}); 

		var arr = [];
		arr[arr.length] = { side: 'n', r1: '20', r2: '1/2', m1: 0.07 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '3/4', m1: 0.07 };
		arr[arr.length] = { side: 'n', r1: '25', r2: '1/2', m1: 0.075 };
		arr[arr.length] = { side: 'n', r1: '25', r2: '3/4', m1: 0.075 };	
		arr[arr.length] = { side: 'n', r1: '32', r2: '3/4', m1: 0.08 };	
		arr[arr.length] = { side: 'n', r1: '32', r2: '1', m1: 0.08 };	
		arr[arr.length] = { side: 'v', r1: '20', r2: '1/2', m1: 0.07 };	
		arr[arr.length] = { side: 'v', r1: '20', r2: '3/4', m1: 0.07 };	
		arr[arr.length] = { side: 'v', r1: '25', r2: '1/2', m1: 0.075 };	
		arr[arr.length] = { side: 'v', r1: '25', r2: '3/4', m1: 0.075 };	
		arr[arr.length] = { side: 'v', r1: '32', r2: '3/4', m1: 0.08 };	
		arr[arr.length] = { side: 'v', r1: '32', r2: '1', m1: 0.08 };	
		
		var n = await fc_cr_obj({funcName: 'pl_troinik_rezba_1', arr: arr, startPos: new THREE.Vector3(0.8, 1, 0+0.0), n: n, cat: 'pl_troinik_rezba'});				
	}
	
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '20', m1: 0.052 };
		arr[arr.length] = { r1: '25', m1: 0.06 };
		arr[arr.length] = { r1: '32', m1: 0.072 };
		arr[arr.length] = { r1: '40', m1: 0.089 };
		arr[arr.length] = { r1: '50', m1: 0.105 }; 
		
		var n = await fc_cr_obj({funcName: 'pl_krestovina_1', arr: arr, startPos: new THREE.Vector3(1.0, 1, 0+0.0), n: 0, cat: 'pl_krestovina'});	
	}	
	
	
	
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { side: 'n', r1: '16', r2: '1/2', m1: 0.048 };
		arr[arr.length] = { side: 'n', r1: '16', r2: '3/4', m1: 0.049 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '1/2', m1: 0.048 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '3/4', m1: 0.049 };
		arr[arr.length] = { side: 'n', r1: '26', r2: '3/4', m1: 0.050 };
		arr[arr.length] = { side: 'n', r1: '26', r2: '1', m1: 0.052 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '1', m1: 0.052 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '1 1/4', m1: 0.057 };
		arr[arr.length] = { side: 'n', r1: '40', r2: '1', m1: 0.060 };
		arr[arr.length] = { side: 'n', r1: '40', r2: '1 1/4', m1: 0.060 };
		
		arr[arr.length] = { side: 'v', r1: '16', r2: '1/2', m1: 0.048 };
		arr[arr.length] = { side: 'v', r1: '16', r2: '3/4', m1: 0.049 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '1/2', m1: 0.048 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '3/4', m1: 0.049 };
		arr[arr.length] = { side: 'v', r1: '26', r2: '3/4', m1: 0.050 };
		arr[arr.length] = { side: 'v', r1: '26', r2: '1', m1: 0.052 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '1', m1: 0.052 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '1 1/4', m1: 0.057 };
		arr[arr.length] = { side: 'v', r1: '40', r2: '1', m1: 0.060 };
		arr[arr.length] = { side: 'v', r1: '40', r2: '1 1/4', m1: 0.060 };	
		
		var n = await fc_cr_obj({funcName: 'mpl_perehod_rezba_1', arr: arr, startPos: new THREE.Vector3(1.4, 1, 0+0.0), n: 0, cat: 'mpl_perehod_rezba'});		
	}
	

	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '16', r3: '16', m1: 0.060 };
		arr[arr.length] = { r1: '20', r3: '20', m1: 0.060 };
		arr[arr.length] = { r1: '26', r3: '26', m1: 0.062 };
		arr[arr.length] = { r1: '32', r3: '32', m1: 0.063 };
		arr[arr.length] = { r1: '40', r3: '40', m1: 0.079 };
		
		arr[arr.length] = { r1: '20', r3: '16', m1: 0.060 };
		arr[arr.length] = { r1: '26', r3: '16', m1: 0.061 };
		arr[arr.length] = { r1: '26', r3: '20', m1: 0.061 };
		arr[arr.length] = { r1: '32', r3: '16', m1: 0.062 };
		arr[arr.length] = { r1: '32', r3: '20', m1: 0.062 };
		arr[arr.length] = { r1: '32', r3: '26', m1: 0.063 };

		var n = await fc_cr_obj({funcName: 'mpl_perehod_1', arr: arr, startPos: new THREE.Vector3(1.6, 1, 0+0.0), n: 0, cat: 'mpl_perehod'});		
	}	
	

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '16', r2: '20', r3: '16', m1: 0.088, m2: 0.044 };
		arr[arr.length] = { r1: '16', r2: '16', r3: '20', m1: 0.088, m2: 0.044 };
		arr[arr.length] = { r1: '20', r2: '16', r3: '20', m1: 0.088, m2: 0.044 };
		arr[arr.length] = { r1: '16', r2: '20', r3: '20', m1: 0.088, m2: 0.044 };
		arr[arr.length] = { r1: '20', r2: '26', r3: '20', m1: 0.096, m2: 0.049 };
		
		arr[arr.length] = { r1: '26', r2: '16', r3: '26', m1: 0.097, m2: 0.046 };
		arr[arr.length] = { r1: '26', r2: '16', r3: '20', m1: 0.096, m2: 0.047 };
		arr[arr.length] = { r1: '26', r2: '20', r3: '20', m1: 0.097, m2: 0.048 };
		arr[arr.length] = { r1: '26', r2: '26', r3: '20', m1: 0.097, m2: 0.048 };
		arr[arr.length] = { r1: '26', r2: '20', r3: '16', m1: 0.097, m2: 0.048 };
		arr[arr.length] = { r1: '26', r2: '20', r3: '26', m1: 0.097, m2: 0.048 };
		
		arr[arr.length] = { r1: '32', r2: '16', r3: '32', m1: 0.104, m2: 0.051 };
		arr[arr.length] = { r1: '32', r2: '20', r3: '32', m1: 0.104, m2: 0.051 };
		arr[arr.length] = { r1: '32', r2: '26', r3: '26', m1: 0.104, m2: 0.052 };
		arr[arr.length] = { r1: '32', r2: '26', r3: '32', m1: 0.104, m2: 0.052 };		
		
		arr[arr.length] = { r1: '32', r2: '32', r3: '26', m1: 0.104, m2: 0.052 };
		arr[arr.length] = { r1: '32', r2: '32', r3: '20', m1: 0.104, m2: 0.052 };
		arr[arr.length] = { r1: '32', r2: '20', r3: '26', m1: 0.104, m2: 0.051 };
		arr[arr.length] = { r1: '26', r2: '32', r3: '26', m1: 0.104, m2: 0.052 };		

		arr[arr.length] = { r1: '16', r2: '16', r3: '16', m1: 0.083, m2: 0.083/2 };
		arr[arr.length] = { r1: '20', r2: '20', r3: '20', m1: 0.088, m2: 0.088/2 };
		arr[arr.length] = { r1: '26', r2: '26', r3: '26', m1: 0.097, m2: 0.097/2 };
		arr[arr.length] = { r1: '32', r2: '32', r3: '32', m1: 0.112, m2: 0.112/2 };				

		var n = await fc_cr_obj({funcName: 'mpl_troinik_1', arr: arr, startPos: new THREE.Vector3(1.8, 1, 0+0.0), n: 0, cat: 'mpl_troinik_1'});			
	}



	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { side: 'n', r1: '16', r2: '1/2', r3: '16', m1: 0.083, m2: 0.028 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '1/2', r3: '20', m1: 0.088, m2: 0.029 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '3/4', r3: '20', m1: 0.088, m2: 0.032 };
		arr[arr.length] = { side: 'n', r1: '26', r2: '1/2', r3: '26', m1: 0.097, m2: 0.032 };
		arr[arr.length] = { side: 'n', r1: '26', r2: '3/4', r3: '26', m1: 0.097, m2: 0.034 };
		arr[arr.length] = { side: 'n', r1: '26', r2: '1', r3: '26', m1: 0.097, m2: 0.037 };		
		arr[arr.length] = { side: 'n', r1: '32', r2: '3/4', r3: '32', m1: 0.104, m2: 0.035 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '1', r3: '32', m1: 0.104, m2: 0.039 };		

		arr[arr.length] = { side: 'v', r1: '16', r2: '1/2', r3: '16', m1: 0.083, m2: 0.028 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '1/2', r3: '20', m1: 0.088, m2: 0.029 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '3/4', r3: '20', m1: 0.088, m2: 0.032 };
		arr[arr.length] = { side: 'v', r1: '26', r2: '1/2', r3: '26', m1: 0.097, m2: 0.032 };
		arr[arr.length] = { side: 'v', r1: '26', r2: '3/4', r3: '26', m1: 0.097, m2: 0.034 };
		arr[arr.length] = { side: 'v', r1: '26', r2: '1', r3: '26', m1: 0.097, m2: 0.037 };		
		arr[arr.length] = { side: 'v', r1: '32', r2: '3/4', r3: '32', m1: 0.104, m2: 0.035 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '1', r3: '32', m1: 0.104, m2: 0.039 };	
		arr[arr.length] = { side: 'v', r1: '32', r2: '1 1/4', r3: '32', m1: 0.122, m2: 0.046 };
		arr[arr.length] = { side: 'v', r1: '40', r2: '1', r3: '40', m1: 0.124, m2: 0.046 };
		
		var n = await fc_cr_obj({funcName: 'mpl_troinik_rezba_1', arr: arr, startPos: new THREE.Vector3(2.0, 1, 0+0.0), n: 0, cat: 'mpl_troinik_rezba'});		
	}
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '16', m1: 0.042 };
		arr[arr.length] = { r1: '20', m1: 0.044 };
		arr[arr.length] = { r1: '26', m1: 0.049 };
		arr[arr.length] = { r1: '32', m1: 0.052 };
		arr[arr.length] = { r1: '40', m1: 0.063 };
		
		var n = await fc_cr_obj({funcName: 'mpl_ugol_1', arr: arr, startPos: new THREE.Vector3(2.2, 1, 0+0.0), n: 0, cat: 'mpl_ugol'});
		
		var arr = [];
		arr[arr.length] = { side: 'n', r1: '16', r2: '1/2', m1: 0.042, m2: 0.028 };		
		arr[arr.length] = { side: 'n', r1: '16', r2: '3/4', m1: 0.043, m2: 0.030 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '1/2', m1: 0.044, m2: 0.029 };
		arr[arr.length] = { side: 'n', r1: '20', r2: '3/4', m1: 0.044, m2: 0.032 };
		arr[arr.length] = { side: 'n', r1: '26', r2: '3/4', m1: 0.049, m2: 0.034 };
		arr[arr.length] = { side: 'n', r1: '26', r2: '1', m1: 0.049, m2: 0.037 };
		arr[arr.length] = { side: 'n', r1: '32', r2: '1', m1: 0.051, m2: 0.039 };

		arr[arr.length] = { side: 'v', r1: '16', r2: '1/2', m1: 0.042, m2: 0.028 };		
		arr[arr.length] = { side: 'v', r1: '16', r2: '3/4', m1: 0.043, m2: 0.030 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '1/2', m1: 0.044, m2: 0.029 };
		arr[arr.length] = { side: 'v', r1: '20', r2: '3/4', m1: 0.044, m2: 0.032 };
		arr[arr.length] = { side: 'v', r1: '26', r2: '3/4', m1: 0.049, m2: 0.034 };
		arr[arr.length] = { side: 'v', r1: '26', r2: '1', m1: 0.049, m2: 0.037 };
		arr[arr.length] = { side: 'v', r1: '32', r2: '1', m1: 0.051, m2: 0.039 };
		
		var n = await fc_cr_obj({funcName: 'mpl_ugol_rezba_1', arr: arr, startPos: new THREE.Vector3(2.2, 1, 0+0.0), n: n, cat: 'mpl_ugol_rezba'});			
	}

	//------------------

	if(1==1)
	{
		var startPos = new THREE.Vector3(2.9, 1, 0);


		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.063, t1: 0.053 };
		arr[arr.length] = { r1: '3/4', m1: 0.070, t1: 0.053 };
		arr[arr.length] = { r1: '1', m1: 0.076, t1: 0.060 };
		arr[arr.length] = { r1: '1 1/4', m1: 0.085, t1: 0.064 };
		arr[arr.length] = { r1: '1 1/2', m1: 0.096, t1: 0.070 };
		arr[arr.length] = { r1: '2', m1: 0.111, t1: 0.070 };		
		
		var n = await fc_cr_obj({funcName: 'shar_kran_n_1', arr: arr, startPos: startPos, n: 0, cat: 'shar_kran_n_1'});

		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.0475, t1: 0.053 };
		arr[arr.length] = { r1: '3/4', m1: 0.0555, t1: 0.053 };
		arr[arr.length] = { r1: '1', m1: 0.0625, t1: 0.060 };
		arr[arr.length] = { r1: '1 1/4', m1: 0.0775, t1: 0.064 };
		arr[arr.length] = { r1: '1 1/2', m1: 0.087, t1: 0.070 };
		arr[arr.length] = { r1: '2', m1: 0.101, t1: 0.070 };		
		
		var n = await fc_cr_obj({funcName: 'shar_kran_v_1', arr: arr, startPos: startPos, n: n, cat: 'shar_kran_v_1'});



		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.063, t1: 0.053 };
		arr[arr.length] = { r1: '3/4', m1: 0.070, t1: 0.053 };
		arr[arr.length] = { r1: '1', m1: 0.076, t1: 0.060 };
		arr[arr.length] = { r1: '1 1/4', m1: 0.085, t1: 0.064 };
		arr[arr.length] = { r1: '1 1/2', m1: 0.096, t1: 0.070 };
		arr[arr.length] = { r1: '2', m1: 0.111, t1: 0.070 };		
		
		var n = await fc_cr_obj({funcName: 'shar_kran_v_n_1', arr: arr, startPos: startPos, n: n, cat: 'shar_kran_v_n_1'});

		var arr = [];
		arr[arr.length] = { r1: '1/2', r2: '3/4', m1: 0.055, m2: 0.026, t1: 0.053 };
		arr[arr.length] = { r1: '3/4', r2: '1', m1: 0.059, m2: 0.03, t1: 0.053 };
		arr[arr.length] = { r1: '1', r2: '1 1/4', m1: 0.065, m2: 0.037, t1: 0.060 };		
		arr[arr.length] = { r1: '1 1/4', r2: '1 1/2', m1: 0.075, m2: 0.045, t1: 0.060 };
		
		var n = await fc_cr_obj({funcName: 'shar_kran_sgon_1', arr: arr, startPos: startPos, n: n, cat: 'shar_kran_sgon_1'});		
	}
		
	

	
	
	//createTestObj();	
}





function getInfoFcObj()
{
	var obj = clickO.last_obj;
	
	var arrO = getObjsFromGroup_1({obj: obj});
	
	
	var txt = '';
	var n = 1;
	
	var offset = new THREE.Vector3(0.0, 1, 2).sub(arrO[0].position);
	
	if(1==2)
	{
		for(var i = 0; i < arrO.length; i++)
		{
			var fc_name = arrO[i].userData.fc.name;
			var params = JSON.stringify(arrO[i].userData.fc.params);
			params = JSON.parse(params);
			
			//txt += n+'. '+fc_name+' '+params+'\n';
			
			var pos = offset.clone().add(arrO[i].position);
			
			params.pos = {x: pos.x, y: pos.y, z: pos.z};
			params.q = {x: arrO[i].quaternion.x, y: arrO[i].quaternion.y, z: arrO[i].quaternion.z, w: arrO[i].quaternion.w};
			
			params = JSON.stringify(params);
			
			txt += 'fc_cr_obj({ funcName: "'+fc_name+'", arr: ['+params+'] })\n';
			
			n++;
		}		
	}
	else
	{
		for(var i = 0; i < arrO.length; i++)
		{
			if(arrO[i].userData.tag == 'obj') 
			{
				var lotid = arrO[i].userData.obj3D.lotid;
				
				var pos = offset.clone().add(arrO[i].position);
				
				var params = {};
				params.lotid = lotid;
				params.pos = {x: pos.x, y: pos.y, z: pos.z};
				params.q = {x: arrO[i].quaternion.x, y: arrO[i].quaternion.y, z: arrO[i].quaternion.z, w: arrO[i].quaternion.w};				
			}

			if(arrO[i].userData.tag == 'wf_tube')
			{
				var params = {};
				params.point = [];
				
				params.diameter = arrO[i].userData.wf_tube.diameter;
				params.color = arrO[i].material.color;
				
				for ( var i2 = 0; i2 < arrO[i].userData.wf_tube.point.length; i2++ )
				{
					params.point[i2] = {};					
					params.point[i2].pos = offset.clone().add(arrO[i].userData.wf_tube.point[i2].position);
				}
			}
			
			params = JSON.stringify(params);
			txt += `${params},\n`;
		}
		
	}	

	console.log(txt);
}



async function newObjTest_1(cdm)
{

	var arr = [{"lotid":47,"pos":{"x":0,"y":1,"z":2},"q":{"x":0,"y":0,"z":0,"w":1}},
	{"lotid":142,"pos":{"x":-0.08770000000000033,"y":1.25,"z":2},"q":{"x":0,"y":1.2246467991473532e-16,"z":0,"w":1}},
	{"lotid":18,"pos":{"x":-0.04300000000000015,"y":1.25,"z":2},"q":{"x":0,"y":-1,"z":0,"w":6.123233995736766e-17}},
	{"lotid":20,"pos":{"x":-0.04300000000000015,"y":0.75,"z":2},"q":{"x":0,"y":1,"z":0,"w":-6.123233995736767e-17}},
	{"lotid":142,"pos":{"x":0.4977000000000005,"y":0.75,"z":2},"q":{"x":0,"y":-0.9999999999999998,"z":0,"w":1.836970198721029e-16}},
	{"lotid":18,"pos":{"x":0.4530000000000003,"y":0.75,"z":2},"q":{"x":0,"y":-1.224646799147353e-16,"z":0,"w":-0.9999999999999998}},
	{"lotid":21,"pos":{"x":0.4530000000000003,"y":1.25,"z":2},"q":{"x":0,"y":-1.2246467991473532e-16,"z":0,"w":-1}},
	{"lotid":332,"pos":{"x":0.5357000000000007,"y":0.75,"z":2},"q":{"x":0,"y":-1,"z":0,"w":1.8369701987210302e-16}},
	{"lotid":332,"pos":{"x":-0.1257000000000006,"y":1.25,"z":2},"q":{"x":0,"y":1.2246467991473532e-16,"z":0,"w":1}}];
	
	
	var arrO = [];
	
	for(var i = 0; i < arr.length; i++)
	{			
		if(cdm.cameraView) { arr[i].notArray = true; }
		arrO[arrO.length] = await loadObjServer(arr[i]);
	}
	

	var inf = {"point":[{"pos":{"x":2.3400637720154194,"y":0.133882851397884,"z":-3.0917399499678515}},{"pos":{"x":2.450574937475825,"y":0.133882851397884,"z":-3.0917399499678515}},{"pos":{"x":2.472151701510927,"y":0.15310790275905503,"z":-3.0917399499678515}},{"pos":{"x":2.4841326729874345,"y":0.17240056985333765,"z":-3.0917399499678515}},{"pos":{"x":2.4942349677354922,"y":0.6091230504491234,"z":-3.0917399499678515}},{"pos":{"x":2.5227232308610894,"y":0.6292413169113358,"z":-3.0917399499678515}},{"pos":{"x":2.5732247822230025,"y":0.6302942062224188,"z":-3.0921976591959366}}],"diameter":0.016,"color":14632981, pVisible: false}

	var inf = {"point":[{"pos":{"x":0.5524333308010525,"y":0.7500173013061321,"z":2.00014500349682}},{"pos":{"x":0.8119162357689613,"y":0.7500173013061321,"z":2.00014500349682}}],"diameter":0.016,"color":3778747, pVisible: false}	
		
	var tube = crTubeWF(inf);
	var inf = (cdm.cameraView) ? {notArray: true} : {};
	addTubeInScene(tube, inf);
	
	arrO[arrO.length] = tube;
	
	
	var group = createGroupObj_1({nameRus: 'новая группа', obj: {o: arrO} });
	
	
	
	// добавляем в сцену из каталога
	if(cdm.addScene)
	{ 
		var obj = arrO[0];
		clickO.move = obj; 
		
		planeMath.position.y = infProject.tools.heightPl.position.y; 
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld(); 		
		
		// устанавливаем высоту над полом
		clickO.offset.x = -((obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x)/2 + obj.geometry.boundingBox.min.x);
		clickO.offset.y = -((obj.geometry.boundingBox.max.y - obj.geometry.boundingBox.min.y)/2 + obj.geometry.boundingBox.min.y);
		clickO.offset.z = -((obj.geometry.boundingBox.max.z - obj.geometry.boundingBox.min.z)/2 + obj.geometry.boundingBox.min.z);

		var offsetY = clickO.offset.y + obj.geometry.boundingBox.min.y;
		
		for(var i = 0; i < arrO.length; i++)
		{
			arrO[i].position.y -= offsetY;
		}
		
		planeMath.position.y -= offsetY; 
		planeMath.updateMatrixWorld();
	}

	if(cdm.cameraView)
	{
		deActiveSelected();
		deleteObjCameraView();
		
		if(camera != cameraView)
		{
			cameraView.userData.cameraView.lastCam = camera;
		}
		
		camera = cameraView;
		renderPass.camera = cameraView;
		outlinePass.renderCamera = cameraView;
		
		infProject.elem.butt_close_cameraView.style.display = '';
		infProject.elem.butt_camera_2D.style.display = 'none';
		infProject.elem.butt_camera_3D.style.display = 'none';	

		for(var i = 0; i < arrO.length; i++)
		{				
			arrO[i].position.y += 2000;
		}
		
		cameraView.userData.cameraView.arrO = [arrO[0]];
		fitCameraToObject({obj: arrO[0]});				
	}
	
	renderCamera();
}



async function newObjTest_2()
{
	var arr = [];
	
	arr[arr.length] = al_radiator_1({"count":6,"size":{"x":0.08,"y":0.5,"z":0.08},"r1":"1","name":"Ал.радиатор h500 (6шт.)","pos":{"x":0,"y":1,"z":2},"q":{"x":0,"y":0,"z":0,"w":1} });

	arr[arr.length] = reg_kran_primoy_1({ "r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"name":"Кран регулировочный 1/2","pos":{"x":-0.08770000000000033,"y":1.25,"z":2},"q":{"x":0,"y":1.2246467991473532e-16,"z":0,"w":1} });

	arr[arr.length] = al_zagl_radiator_1({ "r1":"1","r2":"1/2","name":"перех.радиаторный 1/2","pos":{"x":-0.04300000000000015,"y":1.25,"z":2},"q":{"x":0,"y":-1,"z":0,"w":6.123233995736766e-17} });

	arr[arr.length] = al_zagl_radiator_1({ "r1":"1","r2":0,"name":"заглушка радиаторная","pos":{"x":-0.04300000000000015,"y":0.75,"z":2},"q":{"x":0,"y":1,"z":0,"w":-6.123233995736767e-17} });

	arr[arr.length] = reg_kran_primoy_1({ "r1":"1/2","r2":"3/4","m1":0.055,"m2":0.02,"name":"Кран регулировочный 1/2","pos":{"x":0.4977000000000005,"y":0.75,"z":2},"q":{"x":0,"y":-0.9999999999999998,"z":0,"w":1.836970198721029e-16} });

	arr[arr.length] = al_zagl_radiator_1({ "r1":"1","r2":"1/2","name":"перех.радиаторный 1/2","pos":{"x":0.4530000000000003,"y":0.75,"z":2},"q":{"x":0,"y":-1.224646799147353e-16,"z":0,"w":-0.9999999999999998} });

	arr[arr.length] = al_zagl_radiator_1({ "r1":"1","r2":0,"vsd":true,"name":"воздухоотв.радиаторный","pos":{"x":0.4530000000000003,"y":1.25,"z":2},"q":{"x":0,"y":-1.2246467991473532e-16,"z":0,"w":-1} });

	arr[arr.length] = mpl_perehod_rezba_1({ "side":"n","r1":"16","r2":"1/2","m1":0.048,"name":"Соединитель 16x1/2(н)","pos":{"x":0.5357000000000007,"y":0.75,"z":2},"q":{"x":0,"y":-1,"z":0,"w":1.8369701987210302e-16} });

	arr[arr.length] = mpl_perehod_rezba_1({ "side":"n","r1":"16","r2":"1/2","m1":0.048,"name":"Соединитель 16x1/2(н)","pos":{"x":-0.1257000000000006,"y":1.25,"z":2},"q":{"x":0,"y":1.2246467991473532e-16,"z":0,"w":1} });

	for(var i = 0; i < arr.length; i++)
	{
		scene.add( arr[i] );				
		infProject.scene.array.obj[infProject.scene.array.obj.length] = arr[i];		
	}
	
	var group = createGroupObj_1({nameRus: 'новая группа', obj: {o: arr} });
	
	{ 
		var obj = arr[0];
		clickO.move = obj; 
		
		planeMath.position.y = infProject.tools.heightPl.position.y; 
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld(); 		
		
		// устанавливаем высоту над полом
		clickO.offset.x = -((obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x)/2 + obj.geometry.boundingBox.min.x);
		clickO.offset.y = -((obj.geometry.boundingBox.max.y - obj.geometry.boundingBox.min.y)/2 + obj.geometry.boundingBox.min.y);
		clickO.offset.z = -((obj.geometry.boundingBox.max.z - obj.geometry.boundingBox.min.z)/2 + obj.geometry.boundingBox.min.z);

		var offsetY = clickO.offset.y + obj.geometry.boundingBox.min.y;
		
		for(var i = 0; i < arr.length; i++)
		{
			arr[i].position.y -= offsetY;
		}
		
		planeMath.position.y -= offsetY; 
		planeMath.updateMatrixWorld();
	}
	
	renderCamera();
}



function testAddElemToContaner()
{
	var json = {id: 1, name: "сборка"};
	
	var str_button = 
	'<div nameId="sh_select_obj3D" style="margin-right: 5px; margin-left: auto; width: 20px; height: 20px;">\
		<img src="'+infProject.path+'/img/look.png" style="display: block; height: 95%; margin: auto; -o-object-fit: contain; object-fit: contain;">\
	</div>';
	
	var html = 
	'<div>\
		<div class="right_panel_1_1_list_item">\
			<div class="flex_1 relative_1">\
				<div class="right_panel_1_1_list_item_text">'+json.name+'</div>\
				'+str_button+'\
			</div>\
		</div>\
	</div>';			
	
	var div = document.createElement('div');
	div.innerHTML = html;
	var elem = div.firstChild;
	
	json.elem = elem;

	// при клике добавляем объект в сцену
	var n = json.id;
	(function(n) 
	{
		elem.onmousedown = function(e){ newObjTest_1({addScene: true}); e.stopPropagation(); };	
	}(n));

	// назначаем событие при клике на лупу UI
	var elem_2 = elem.querySelector('[nameId="sh_select_obj3D"]');
	(function(n) 
	{
		elem_2.onmousedown = function(e)
		{ 
			//activeCameraView({lotid: n});
			newObjTest_1({cameraView: true});
			e.stopPropagation();
		};	
	}(n));			
	
	
	
	var container = document.body.querySelector('[list_ui="catalog"]');
	
	container.append(json.elem);
}

