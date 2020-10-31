



// создаем Pivot
function createPivot()
{
	var pivot = new THREE.Object3D();
	pivot.userData.pivot = {};
	pivot.userData.pivot.active = { axis: '', startPos: new THREE.Vector3(), dir: new THREE.Vector3(), qt: new THREE.Quaternion() };
	pivot.userData.pivot.obj = null;
	pivot.userData.pivot.arrO = [];		// группа объектов
	pivot.userData.pivot.axs = [];
	
	var param = [];
	param[0] = {axis: 'x', size_1: new THREE.Vector3(0.6, 0.1, 0.1), size_2: new THREE.Vector3(0.6, 0.2, 0.2), rot: new THREE.Vector3(0, 0, 0), color: 'rgb(247, 72, 72)', opacity: 0};
	param[1] = {axis: 'y', size_1: new THREE.Vector3(0.6, 0.1, 0.1), size_2: new THREE.Vector3(0.6, 0.2, 0.2), rot: new THREE.Vector3(0, 0, Math.PI/2), color: 'rgb(17, 255, 0)', opacity: 0};
	param[2] = {axis: 'z', size_1: new THREE.Vector3(0.6, 0.1, 0.1), size_2: new THREE.Vector3(0.6, 0.2, 0.2), rot: new THREE.Vector3(0, Math.PI/2, 0), color: 'rgb(72, 116, 247)', opacity: 0};
	param[3] = {axis: 'xz', size_1: new THREE.Vector3(0.3, 0.001, 0.3), pos: new THREE.Vector3(0.01, 0.0, -0.16), color: 'rgb(194, 194, 194)', opacity: 0.4};
	param[4] = {axis: 'center', size_1: new THREE.Vector3(0.03, 0.03, 0.03), pos: new THREE.Vector3(-0.015, 0.0, 0.0), color: 'rgb(102, 102, 102)', opacity: 1};
	
	
	for ( var i = 0; i < param.length; i++ )
	{
		var geometry = createGeometryPivot(param[i].size_1.x, param[i].size_1.y, param[i].size_1.z);
		
		var obj = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({ color: param[i].color, transparent: true, opacity: param[i].opacity, depthTest: false }) );
		obj.userData.tag = 'pivot';
		obj.userData.axis = param[i].axis;	
		obj.renderOrder = 2;
		
		if(param[i].pos) obj.position.set( param[i].pos.x, param[i].pos.y, param[i].pos.z );
		if(param[i].rot) obj.rotation.set( param[i].rot.x, param[i].rot.y, param[i].rot.z );
		
		pivot.add( obj );
		
		if(param[i].size_2)
		{
			var axis = new THREE.Mesh( createGeometryPivot(0.6, 0.02, 0.02), new THREE.MeshPhongMaterial({ color: param[i].color, depthTest: false, transparent: true, lightMap: lightMap_1 }) );	
			axis.renderOrder = 2;
			//axis.rotation.set( arr[i][1].x, arr[i][1].y, arr[i][1].z );		
			obj.add( axis );					
		}
	}	
		
	var z = createCone({axis: 'z', pos: new THREE.Vector3(0,0,-0.6), rot: new THREE.Vector3(-Math.PI/2,0,0), color: 0x0000ff});
	var x = createCone({axis: 'x', pos: new THREE.Vector3(0.6,0,0), rot: new THREE.Vector3(0,0,-Math.PI/2), color: 0xff0000});
	var y = createCone({axis: 'y', pos: new THREE.Vector3(0,0.6,0), rot: new THREE.Vector3(0,0,0), color: 0x00ff00});
	
	pivot.add( z );
	pivot.add( x );
	pivot.add( y );
	
	pivot.userData.pivot.axs.x = x;
	pivot.userData.pivot.axs.y = y;
	pivot.userData.pivot.axs.z = z;
	
	scene.add( pivot );

	//pivot.rotation.set(0.2, 0.5, 0);
	pivot.visible = false;
	
	return pivot;
}



function createGeometryPivot(x, y, z)
{
	var geometry = new THREE.Geometry();
	y /= 2;
	z /= 2;
	var vertices = [
				new THREE.Vector3(0,-y,z),
				new THREE.Vector3(0,y,z),
				new THREE.Vector3(x,y,z),
				new THREE.Vector3(x,-y,z),
				new THREE.Vector3(x,-y,-z),
				new THREE.Vector3(x,y,-z),
				new THREE.Vector3(0,y,-z),
				new THREE.Vector3(0,-y,-z),
			];	
			
	var faces = [
				new THREE.Face3(0,3,2),
				new THREE.Face3(2,1,0),
				new THREE.Face3(4,7,6),
				new THREE.Face3(6,5,4),				
				new THREE.Face3(0,1,6),
				new THREE.Face3(6,7,0),					
				new THREE.Face3(1,2,5),
				new THREE.Face3(5,6,1),				
				new THREE.Face3(2,3,4),
				new THREE.Face3(4,5,2),				
				new THREE.Face3(3,0,7),
				new THREE.Face3(7,4,3),
			];
	
	var uvs1 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(1,1),
			];
	var uvs2 = [
				new THREE.Vector2(1,1),
				new THREE.Vector2(0,1),
				new THREE.Vector2(0,0),
			];	

			
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.faceVertexUvs[0] = [uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2, uvs1, uvs2];
	geometry.computeFaceNormals();	
	geometry.uvsNeedUpdate = true;		
	
	return geometry;
}


// создаем конусы для Pivot
function createCone(cdm)
{	
	var n = 0;
	var v = [];
	var circle = infProject.geometry.circle;
	
	for ( var i = 0; i < circle.length; i++ )
	{
		v[n] = new THREE.Vector3().addScaledVector( circle[i].clone().normalize(), 0.06 );
		v[n].y = 0;		
		n++;		
		
		v[n] = new THREE.Vector3();
		v[n].y = 0;
		n++;
		
		v[n] = new THREE.Vector3().addScaledVector( circle[i].clone().normalize(), 0.003 );
		v[n].y = 0.25;
		n++;	
		
		v[n] = new THREE.Vector3();
		v[n].y = 0.25;
		n++;		
	}	

	
	var obj = new THREE.Mesh( createGeometryCircle(v), new THREE.MeshPhongMaterial( { color : cdm.color, depthTest: false, transparent: true, lightMap: lightMap_1 } ) ); 
	obj.userData.tag = 'pivot';
	obj.userData.axis = cdm.axis;
	obj.renderOrder = 2;
	obj.position.copy(cdm.pos);
	obj.rotation.set(cdm.rot.x, cdm.rot.y, cdm.rot.z);
	//obj.visible = false;	
	scene.add( obj );
	
	return obj;
}


// кликнули на pivot
function clickPivot( intersect )
{
	var obj = clickO.move = intersect.object;  
	
	var pivot = infProject.tools.pivot;
	
	var pos = pivot.position.clone();
	
	pivot.userData.pivot.active.startPos = pos;
	
	clickO.offset = new THREE.Vector3().subVectors( pos, intersect.point );
	
	var axis = obj.userData.axis;
	pivot.userData.pivot.active.axis = axis;	
	pivot.updateMatrixWorld();	
	
	
	if(axis == 'x')
	{ 
		var axisO = pivot.userData.pivot.axs.x; 	
	}
	else if(axis == 'z')
	{ 
		var axisO = pivot.userData.pivot.axs.z; 	
	}
	else if(axis == 'y')
	{ 
		var axisO = pivot.userData.pivot.axs.y;	
	}	
		
	
	if(axis == 'xz' || axis == 'center')
	{ 
		planeMath.rotation.set( Math.PI/2, 0, 0 ); 
	}		 
	else
	{
		axisO.updateMatrixWorld();
		pivot.userData.pivot.active.dir = new THREE.Vector3().subVectors( pivot.position, axisO.getWorldPosition(new THREE.Vector3()) ).normalize();	
		pivot.userData.pivot.active.qt = quaternionDirection( pivot.userData.pivot.active.dir );	
		
		planeMath.quaternion.copy( pivot.userData.pivot.active.qt ); 
		planeMath.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2, 0, 0)));
	}
	
	planeMath.position.copy( intersect.point );
	
	setClickLastObj({obj: infProject.tools.pivot.userData.pivot.obj});
} 





function movePivot( event )
{	
	var intersects = rayIntersect( event, planeMath, 'one' ); 
	
	if(intersects.length == 0) return;
	
	var pivot = infProject.tools.pivot;
	var obj = pivot.userData.pivot.obj;
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );
	
	if(!clickO.actMove)
	{
		clickO.actMove = true;
		
		if(obj.userData.tag == 'wf_point')
		{
			obj.userData.wf_point.tube.visible = false;	
		}
	}			
	

	if(pivot.userData.pivot.active.axis == 'xz')
	{
		
	}		
	else
	{
		var subV = new THREE.Vector3().subVectors( pos, pivot.userData.pivot.active.startPos );
		var locD = localTransformPoint(subV, pivot.userData.pivot.active.qt);						
		
		var v1 = new THREE.Vector3().addScaledVector( pivot.userData.pivot.active.dir, locD.z );
		pos = new THREE.Vector3().addVectors( pivot.userData.pivot.active.startPos, v1 );			
	}

	
	var pos2 = new THREE.Vector3().subVectors( pos, pivot.position );
	pivot.position.add( pos2 );
	
	var arrO = pivot.userData.pivot.arrO;
	movePivot_2({obj: obj, arrO: arrO, pos2: pos2});
}


function movePivot_2(cdm)
{
	let arrO = cdm.arrO;
	let obj = cdm.obj;
	let pos2 = cdm.pos2;
	
	
	if(obj.userData.tag == 'wf_point')		// точка трубы
	{
		obj.position.add(pos2);	

		updateTubeWF({tube: obj.userData.wf_point.tube});

		showWF_point_UI(obj);
	}
	else 
	{
		for(let i = 0; i < arrO.length; i++)
		{
			arrO[i].position.add( pos2 );
			
			if(!arrO[i].userData.wf_tube) continue;

			let point = arrO[i].userData.wf_tube.point;	
			
			for(let i2 = 0; i2 < point.length; i2++)
			{
				point[i2].position.add( pos2 );
			}			
		}
		
	}	

	upMenuPosObjPop(obj);
}


function clickPivotUp()
{
	if(!clickO.actMove) return;
	
	var obj = infProject.tools.pivot.userData.pivot.obj;	
	if(!obj) return;
		
	if(obj.userData.tag == 'wf_point')
	{
		updateTubeWF({tube: obj.userData.wf_point.tube});
		obj.userData.wf_point.tube.visible = true;		
	}	

	var arrO = infProject.tools.pivot.userData.pivot.arrO;
	if(arrO)
	{
		for(var i = 0; i < arrO.length; i++)
		{
			if(!arrO[i].userData.wf_tube) continue;

			arrO[i].position.set( 0,0,0 );
			updateTubeWF({tube: arrO[i]});			
		}		
	}		

	
	setClickLastObj({obj: obj});
}



// обновляем pos UI
function upMenuPosObjPop(obj) 
{	
	let pos = obj.position;
	
	if(obj.userData.tag == 'obj')		// группа или объект
	{ 
		obj.updateMatrixWorld();
		pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );	
	}	
	else if(obj.userData.tag == 'joinPoint')		// разъем
	{
		obj.parent.updateMatrixWorld();
		pos = obj.getWorldPosition(new THREE.Vector3());
	}
	else if(obj.userData.tag == 'wf_tube')
	{
		pos = infProject.tools.pivot.position;
	}
	else if(obj.userData.tag == 'wf_point')		// точка трубы
	{ 
		pos = obj.position; 
	}	
	else
	{
		pos = new THREE.Vector3();
	}
	
	document.querySelector('[nameId="object_pos_X"]').value = Math.round(pos.x*100)/100;
	document.querySelector('[nameId="object_pos_Y"]').value = Math.round(pos.y*100)/100;
	document.querySelector('[nameId="object_pos_Z"]').value = Math.round(pos.z*100)/100;		
}




// меняем положение объекта через input
function inputChangePos()
{
	let obj = clickO.last_obj;
	if(!obj) return;

	if(obj.userData.tag == 'obj'){}
	else if(obj.userData.tag == 'joinPoint'){}
	else if(obj.userData.tag == 'wf_tube'){}
	else if(obj.userData.tag == 'wf_point'){}
	else { return; }
	
	let x = document.querySelector('[nameId="object_pos_X"]').value;
	let y = document.querySelector('[nameId="object_pos_Y"]').value;
	let z = document.querySelector('[nameId="object_pos_Z"]').value;

	x = checkNumberInput({ value: x, unit: 1 });
	y = checkNumberInput({ value: y, unit: 1 });
	z = checkNumberInput({ value: z, unit: 1 });

	let stop = false;
	
	if(!x) stop = true;
	if(!y) stop = true;
	if(!z) stop = true;
	
	// не числовое значение
	if(stop)
	{		
		upMenuPosObjPop(obj);
		return;
	}	
	
	let pos1 = obj.position;
	let pivot = infProject.tools.pivot;
	let gizmo = infProject.tools.gizmo;
	
	if(obj.userData.tag == 'obj'){ pos1 = obj.localToWorld( obj.geometry.boundingSphere.center.clone() ); }		// группа или объект	
	else if(obj.userData.tag == 'joinPoint'){ pos1 = obj.getWorldPosition(new THREE.Vector3()); }
	else if(obj.userData.tag == 'wf_tube'){ pos1 = pivot.position; }
	else if(obj.userData.tag == 'wf_point'){ pos1 = obj.position; }
	
	x = x.num;
	y = y.num;
	z = z.num;
		
	let pos2 = new THREE.Vector3(x,y,z).sub(pos1);
	
	pivot.position.add(pos2);
	gizmo.position.add(pos2);
	clippingGizmo360( obj );
	
	let arrO = arrObjFromGroup({obj: obj});
	movePivot_2({obj: obj, arrO: arrO, pos2: pos2});
	
	
	for(let i = 0; i < arrO.length; i++)
	{
		if(!arrO[i].userData.wf_tube) continue;

		arrO[i].position.set( 0,0,0 );
		updateTubeWF({tube: arrO[i]});			
	}	

	renderCamera();
}







