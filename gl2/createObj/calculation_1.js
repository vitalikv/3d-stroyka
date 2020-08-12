





// получаем номера точек (attributes.position.array) min/max 
// чтобы знать какие точки брать, чтобы поменять длину/высоту/ширину объекта
function getNumberVertexMinMax(cdm)
{
	var obj = cdm.obj;
	
	var positions = obj.geometry.attributes.position.array;
	var count = positions.length / 3;
	
	var boundArr = { min: {x:[], y:[], z:[]}, max: {x:[], y:[], z:[]} };
	
	for (var i = 0; i < count; i++)
	{			
		if(positions[i * 3] < 0) { boundArr.min.x[boundArr.min.x.length] = i * 3; }
		else { boundArr.max.x[boundArr.max.x.length] = i * 3; }
		
		if(positions[i * 3+1] < 0) { boundArr.min.y[boundArr.min.y.length] = i * 3+1; }
		else { boundArr.max.y[boundArr.max.y.length] = i * 3+1; }	

		if(positions[i * 3+2] < 0) { boundArr.min.z[boundArr.min.z.length] = i * 3+2; }
		else { boundArr.max.z[boundArr.max.z.length] = i * 3+2; }				
	}	
	
	return boundArr;
}


// изменение размера объекта
function offsetSizeVertexObj(cdm)
{
	var obj = cdm.obj;
	var boundArr = cdm.boundArr;
	
	var positions = obj.geometry.attributes.position.array;
	
	
	if(cdm.offsetX)
	{
		var offsetX = cdm.offsetX;
		
		for (var i = 0; i < boundArr.min.x.length; i++)
		{			
			positions[boundArr.min.x[i]] -= offsetX/2;
		}
		for (var i = 0; i < boundArr.max.x.length; i++)
		{			
			positions[boundArr.max.x[i]] += offsetX/2;
		}		
	}


	if(cdm.offsetY)
	{
		var offsetY = cdm.offsetY;
		
		for (var i = 0; i < boundArr.max.y.length; i++)
		{			
			positions[boundArr.max.y[i]] += offsetY;
		}					
	}
	
	
	if(cdm.offsetZ)
	{
		var offsetZ = cdm.offsetZ;
		
		for (var i = 0; i < boundArr.min.z.length; i++)
		{			
			positions[boundArr.min.z[i]] -= offsetZ/2;
		}
		for (var i = 0; i < boundArr.max.z.length; i++)
		{			
			positions[boundArr.max.z[i]] += offsetZ/2;
		}					
	}	
	
	obj.geometry.attributes.position.needsUpdate = true;
	
}




// получаем габариты объекта и строим box-форму
function getBoundObject_1(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;
	
	var arr = [];
	
	obj.updateMatrixWorld(true);
	
	obj.traverse(function(child) 
	{
		if (child instanceof THREE.Mesh)
		{
			if(child.geometry) { arr[arr.length] = child; }
		}
	});	

	//scene.updateMatrixWorld();
	
	var v = [];
	
	for ( var i = 0; i < arr.length; i++ )
	{		
		arr[i].geometry.computeBoundingBox();	
		arr[i].geometry.computeBoundingSphere();

		var bound = arr[i].geometry.boundingBox;
		
		//console.log(111111, arr[i], bound);

		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );

		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );		
	}
	
	var bound = { min : { x : 999999, y : 999999, z : 999999 }, max : { x : -999999, y : -999999, z : -999999 } };
	
	for(var i = 0; i < v.length; i++)
	{
		if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
		if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
		if(v[i].y < bound.min.y) { bound.min.y = v[i].y; }
		if(v[i].y > bound.max.y) { bound.max.y = v[i].y; }			
		if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
		if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
	}

	var x = (bound.max.x - bound.min.x);
	var y = (bound.max.y - bound.min.y);
	var z = (bound.max.z - bound.min.z);	
	 

	var geometry = createGeometryCube(x, y, z);	
	
	var v = geometry.vertices;
	v[0].x = v[1].x = v[6].x = v[7].x = bound.min.x;
	v[3].x = v[2].x = v[5].x = v[4].x = bound.max.x;

	v[0].y = v[3].y = v[4].y = v[7].y = bound.min.y;
	v[1].y = v[2].y = v[5].y = v[6].y = bound.max.y;
	
	v[0].z = v[1].z = v[2].z = v[3].z = bound.max.z;
	v[4].z = v[5].z = v[6].z = v[7].z = bound.min.z;		
		
	geometry = new THREE.BufferGeometry().fromGeometry(geometry);	 
	var box = new THREE.Mesh( geometry, infProject.material.box_1 ); 	
	//box.position.copy(centP);	
	
	obj.position.set(0, 0, 0);
	obj.rotation.set(0, 0, 0);
	
	//box.position.copy(obj.position);
	//box.rotation.copy(obj.rotation);
	
	box.updateMatrixWorld();
	box.geometry.computeBoundingBox();	
	box.geometry.computeBoundingSphere();	
	
	box.add(obj);
	
	return box;	
}




		

// обновляем geometry box-формы
function getBoundObject_2(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;
	
	var inf = {pos: obj.position.clone(), rot: obj.rotation.clone()};
	
	obj.position.set(0, 0, 0);
	obj.rotation.set(0, 0, 0);

	var arr = [];
	
	obj.updateMatrixWorld(true);
	
	obj.traverse(function(child) 
	{
		if (child instanceof THREE.Mesh)
		{			 
			if(child.geometry) 
			{ 
				if(child == obj) {}
				else if(child.userData.centerPoint) {}
				else { arr[arr.length] = child; }
			}
		}
	});	

	obj.updateMatrixWorld();
	
	var v = [];
	
	for ( var i = 0; i < arr.length; i++ )
	{
		arr[i].geometry.computeBoundingBox();	
		arr[i].geometry.computeBoundingSphere();

		var bound = arr[i].geometry.boundingBox;				

		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );

		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );		
	}
	
	var bound = { min : { x : 999999, y : 999999, z : 999999 }, max : { x : -999999, y : -999999, z : -999999 } };
	
	for(var i = 0; i < v.length; i++)
	{
		if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
		if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
		if(v[i].y < bound.min.y) { bound.min.y = v[i].y; }
		if(v[i].y > bound.max.y) { bound.max.y = v[i].y; }			
		if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
		if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
	}

	var x = (bound.max.x - bound.min.x);
	var y = (bound.max.y - bound.min.y);
	var z = (bound.max.z - bound.min.z);

	
	
	//var material = new THREE.MeshStandardMaterial({ color: 0xcccccc, transparent: true, opacity: 0.7, depthTest: false });
	var geometry = createGeometryCube(x, y, z);	
	
	var v = geometry.vertices;
	v[0].x = v[1].x = v[6].x = v[7].x = bound.min.x;
	v[3].x = v[2].x = v[5].x = v[4].x = bound.max.x;

	v[0].y = v[3].y = v[4].y = v[7].y = bound.min.y;
	v[1].y = v[2].y = v[5].y = v[6].y = bound.max.y;
	
	v[0].z = v[1].z = v[2].z = v[3].z = bound.max.z;
	v[4].z = v[5].z = v[6].z = v[7].z = bound.min.z;		
		
	geometry = new THREE.BufferGeometry().fromGeometry(geometry);	 
	
	geometry.computeBoundingBox();	
	geometry.computeBoundingSphere();	
	
	obj.position.copy(inf.pos);
	obj.rotation.copy(inf.rot);
	
	
	obj.geometry.dispose();
	obj.geometry = geometry;
	obj.updateMatrixWorld();
}

