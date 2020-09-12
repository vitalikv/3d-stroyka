

async function fc_cr_obj(params)
{
	var arr = params.arr;
	var funcName = params.funcName;
	var startPos = params.startPos;	
	var n = (params.n) ? params.n : 0;	
	var step = (params.step) ? params.step : 0.1;

	for(var i = 0; i < arr.length; i++)
	{
		var pos = startPos.clone();
		
		if(params.offsetX) { pos.x += step * n; }
		else { pos.z += step * n; }
		
		arr[i].offset = pos;
		arr[i].demo = true;
		var obj = window[funcName](arr[i]);
		
		var arrO = getAllChildObect({obj: obj});
		for(var i2 = 0; i2 < arrO.length; i2++)
		{
			disposeNode(arrO[i2]);
		}		
		
		//await saveObjSql_2({name: obj.userData.obj3D.nameRus, params: {fc: {name: funcName}, cdm: arr[i], cat: params.cat} })
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
	
	delete params.cdm.demo;
	delete params.cdm.offset;
	
	
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
	
	cr_kotel_1({ size: {x: 0.4, y: 0.73, z: 0.3}, r1: '3/4', demo: true, offset: new THREE.Vector3(0.5, 1, 3.5) }) 

	

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '1', r2: '1/2', name: 'перех.радиаторный 1/2' };		
		arr[arr.length] = { r1: '1', r2: '3/4', name: 'перех.радиаторный 3/4' };
		arr[arr.length] = { r1: '1', r2: 0, name: 'заглушка радиаторная' };
		arr[arr.length] = { r1: '1', r2: 0, vsd: true, name: 'воздухоотв.радиаторный' };
		
		await fc_cr_obj({funcName: 'al_zagl_radiator_1', arr: arr, startPos: new THREE.Vector3(-3.7, 1, -2), cat: 'al_zagl_radiator_1'});		
	}
	

	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { count: 1, size: {x: 0.08, y: 0.5, z: 0.08}, r1: '1' };	
		arr[arr.length] = { count: 2, size: {x: 0.08, y: 0.5, z: 0.08}, r1: '1' };
		arr[arr.length] = { count: 3, size: {x: 0.08, y: 0.5, z: 0.08}, r1: '1' };
		arr[arr.length] = { count: 4, size: {x: 0.08, y: 0.5, z: 0.08}, r1: '1' };
		arr[arr.length] = { count: 5, size: {x: 0.08, y: 0.5, z: 0.08}, r1: '1' };
		arr[arr.length] = { count: 6, size: {x: 0.08, y: 0.25, z: 0.08}, r1: '1' };
		
		await fc_cr_obj({funcName: 'al_radiator_1', arr: arr, startPos: new THREE.Vector3(-3.5, 1, -3), step: 0.35, cat: 'al_radiator_1'});		
	}	
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { size: {x: 0.90, y: 0.5, z: 0.07}, r1: '1/2' };
		arr[arr.length] = { size: {x: 1.00, y: 0.5, z: 0.07}, r1: '1/2' };
		arr[arr.length] = { size: {x: 1.20, y: 0.5, z: 0.07}, r1: '1/2' };
		arr[arr.length] = { size: {x: 1.40, y: 0.5, z: 0.07}, r1: '1/2' };
		arr[arr.length] = { size: {x: 1.60, y: 0.5, z: 0.07}, r1: '1/2' };
		arr[arr.length] = { size: {x: 1.80, y: 0.5, z: 0.07}, r1: '1/2' };		
		
		await fc_cr_obj({funcName: 'st_radiator_1', arr: arr, startPos: new THREE.Vector3(-1, 1, -3), step: 0.35, cat: 'st_radiator_1'});		
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
		
		await fc_cr_obj({funcName: 'cr_rash_bak_1', arr: arr, startPos: new THREE.Vector3(-1, 1, -1), offsetX: true, step: 0.35, cat: 'kotel_1'});		
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
		
		await fc_cr_obj({funcName: 'st_sgon_1', arr: arr, startPos: new THREE.Vector3(-1.2, 1, 0), n: 0, cat: 'st_sgon_1'});		
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

//return;	

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









