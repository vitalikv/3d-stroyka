

function fc_cr_obj(params)
{
	var arr = params.arr;
	var funcName = params.funcName;
	var startPos = params.startPos;	
	var n = (params.n) ? params.n : 0;
	
	var step = 0.1;

	for(var i = 0; i < arr.length; i++)
	{
		var pos = startPos.clone();
		pos.z += step * n;
		arr[i].offset = pos;
		window[funcName](arr[i]);
		n++;
	}

	return n;
}

function cr_obj_cat()
{

	cr_rash_bak_1({offset: new THREE.Vector3(0, 1, 3)});
	
	return;
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.046 };
		arr[arr.length] = { r1: '3/4', m1: 0.053 };
		arr[arr.length] = { r1: '1', m1: 0.069 };
		arr[arr.length] = { r1: '1 1/4', m1: 0.083 };		
		
		fc_cr_obj({funcName: 'st_krestovina_1', arr: arr, startPos: new THREE.Vector3(-0.8, 1, 0+0.0)});		
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
		
		fc_cr_obj({funcName: 'st_troinik_1', arr: arr, startPos: new THREE.Vector3(-0.6, 1, 0+0.0)});		
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
		
		var n = fc_cr_obj({funcName: 'st_ugol_90_1', arr: arr, startPos: new THREE.Vector3(-0.4, 1, 0+0.0)});

		var arr = [];
		arr[arr.length] = { r1: '1/2', m1: 0.018 };
		arr[arr.length] = { r1: '3/4', m1: 0.022 };
		arr[arr.length] = { r1: '1', m1: 0.028 };
		
		fc_cr_obj({funcName: 'st_ugol_45_1', arr: arr, startPos: new THREE.Vector3(-0.4, 1, 0+0.0), n: n});		
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
		
		fc_cr_obj({funcName: 'st_nippel_1', arr: arr, startPos: new THREE.Vector3(-0.2, 1, 0+0.0), n: 0});		
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

		fc_cr_obj({funcName: 'st_mufta_1', arr: arr, startPos: new THREE.Vector3(0.0, 1, 0+0.0), n: 0});
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
	
		var n = fc_cr_obj({funcName: 'pl_ugol_90_1', arr: arr, startPos: new THREE.Vector3(0.4, 1, 0+0.0), n: 0});
		
		var arr = [];		
		arr[arr.length] = { r1: '20', m1: 0.021 };
		arr[arr.length] = { r1: '25', m1: 0.024 };
		arr[arr.length] = { r1: '32', m1: 0.028 };
		arr[arr.length] = { r1: '40', m1: 0.035 };
		arr[arr.length] = { r1: '50', m1: 0.038 };
		arr[arr.length] = { r1: '63', m1: 0.042 };	
		
		var n = fc_cr_obj({funcName: 'pl_ugol_45_1', arr: arr, startPos: new THREE.Vector3(0.4, 1, 0+0.0), n: n});		

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
		
		var n = fc_cr_obj({funcName: 'pl_ugol_90_rezba_1', arr: arr, startPos: new THREE.Vector3(0.4, 1, 0+0.0), n: n});		
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

		var n = fc_cr_obj({funcName: 'pl_mufta_1', arr: arr, startPos: new THREE.Vector3(0.6, 1, 0+0.0), n: 0});
		
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

		var n = fc_cr_obj({funcName: 'pl_perehod_rezba_1', arr: arr, startPos: new THREE.Vector3(0.6, 1, 0+0.0), n: n});		
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

		var n = fc_cr_obj({funcName: 'pl_troinik_1', arr: arr, startPos: new THREE.Vector3(0.8, 1, 0+0.0), n: 0});

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
	
		var n = fc_cr_obj({funcName: 'pl_troinik_2', arr: arr, startPos: new THREE.Vector3(0.8, 1, 0+0.0), n: n});

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
		
		var n = fc_cr_obj({funcName: 'pl_troinik_rezba_1', arr: arr, startPos: new THREE.Vector3(0.8, 1, 0+0.0), n: n});				
	}
	
	
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '20', m1: 0.052 };
		arr[arr.length] = { r1: '25', m1: 0.06 };
		arr[arr.length] = { r1: '32', m1: 0.072 };
		arr[arr.length] = { r1: '40', m1: 0.089 };
		arr[arr.length] = { r1: '50', m1: 0.105 }; 
		
		var n = fc_cr_obj({funcName: 'pl_krestovina_1', arr: arr, startPos: new THREE.Vector3(1.0, 1, 0+0.0), n: 0});	
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
		
		var n = fc_cr_obj({funcName: 'mpl_perehod_rezba_1', arr: arr, startPos: new THREE.Vector3(1.4, 1, 0+0.0), n: 0});		
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

		var n = fc_cr_obj({funcName: 'mpl_perehod_1', arr: arr, startPos: new THREE.Vector3(1.6, 1, 0+0.0), n: 0});		
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

		var n = fc_cr_obj({funcName: 'mpl_troinik_1', arr: arr, startPos: new THREE.Vector3(1.8, 1, 0+0.0), n: 0});			
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
		
		var n = fc_cr_obj({funcName: 'mpl_troinik_rezba_1', arr: arr, startPos: new THREE.Vector3(2.0, 1, 0+0.0), n: 0});		
	}
	
	if(1==1)
	{
		var arr = [];
		arr[arr.length] = { r1: '16', m1: 0.042 };
		arr[arr.length] = { r1: '20', m1: 0.044 };
		arr[arr.length] = { r1: '26', m1: 0.049 };
		arr[arr.length] = { r1: '32', m1: 0.052 };
		arr[arr.length] = { r1: '40', m1: 0.063 };
		
		var n = fc_cr_obj({funcName: 'mpl_ugol_1', arr: arr, startPos: new THREE.Vector3(2.2, 1, 0+0.0), n: 0});
		
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
		
		var n = fc_cr_obj({funcName: 'mpl_ugol_rezba_1', arr: arr, startPos: new THREE.Vector3(2.2, 1, 0+0.0), n: n});			
	}

	
	
	
	//createTestObj();	
}









