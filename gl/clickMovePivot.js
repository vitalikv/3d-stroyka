
var param_pivot = { click : false, obj : null, axis : '', posS : 0, dir : '', qt : '' };

var arrP_4 = [];
var arrP_5 = [];




function createPivot()
{
	var pivot = new THREE.Object3D();
	pivot.userData.active = { axis: '', startPos: new THREE.Vector3(), dir: new THREE.Vector3(), qt: new THREE.Quaternion() };
	
	var param = [];
	param[0] = {axis: 'x', size_1: new THREE.Vector3(1, 0.1, 0.1), size_2: new THREE.Vector3(1, 0.2, 0.2), rot: new THREE.Vector3(0, 0, 0), color: 'rgb(247, 72, 72)', opacity: 0};
	param[1] = {axis: 'y', size_1: new THREE.Vector3(1, 0.1, 0.1), size_2: new THREE.Vector3(1, 0.2, 0.2), rot: new THREE.Vector3(0, 0, Math.PI/2), color: 'rgb(17, 255, 0)', opacity: 0};
	param[2] = {axis: 'z', size_1: new THREE.Vector3(1, 0.1, 0.1), size_2: new THREE.Vector3(1, 0.2, 0.2), rot: new THREE.Vector3(0, Math.PI/2, 0), color: 'rgb(72, 116, 247)', opacity: 0};
	param[3] = {axis: 'xz', size_1: new THREE.Vector3(0.3, 0.001, 0.3), pos: new THREE.Vector3(0.01, 0.0, -0.16), color: 'rgb(194, 194, 194)', opacity: 0.4};
	param[4] = {axis: 'center', size_1: new THREE.Vector3(0.03, 0.03, 0.03), pos: new THREE.Vector3(-0.015, 0.0, 0.0), color: 'rgb(102, 102, 102)', opacity: 1};
	
	
	for ( var i = 0; i < param.length; i++ )
	{
		var geometry = createGeometryPivot(param[i].size_1.x, param[i].size_1.y, param[i].size_1.z);
		
		var obj = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({ color: param[i].color, transparent: true, opacity: param[i].opacity, depthTest: false, lightMap : lightMap_1 }) );
		obj.userData.tag = 'pivot';
		obj.userData.axis = param[i].axis;	
		obj.renderOrder = 2;
		
		if(param[i].pos) obj.position.set( param[i].pos.x, param[i].pos.y, param[i].pos.z );
		if(param[i].rot) obj.rotation.set( param[i].rot.x, param[i].rot.y, param[i].rot.z );
		
		pivot.add( obj );
		
		if(param[i].size_2)
		{
			var axis = new THREE.Mesh( createGeometryPivot(1, 0.02, 0.02), new THREE.MeshLambertMaterial({ color: param[i].color, depthTest: false, lightMap : lightMap_1 }) );	
			axis.renderOrder = 2;
			//axis.rotation.set( arr[i][1].x, arr[i][1].y, arr[i][1].z );		
			obj.add( axis );					
		}
	}	
		
	
	scene.add( pivot );

	//pivot.rotation.set(0.2, 0.5, 0);
	pivot.visible = true;
	
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






// кликнули на pivot
function clickPivot( intersect )
{
	var obj = clickO.move = intersect.object;  
	
	var pivot = infProject.tools.pivot;
	
	var pos = pivot.position.clone();
	
	pivot.userData.active.startPos = pos;
	
	clickO.offset = new THREE.Vector3().subVectors( pos, intersect.point );
	
	var axis = obj.userData.axis;
	pivot.userData.active.axis = axis;	
		
	console.log(pivot);
	if(axis == 'x')
	{ 
		planeMath.rotation.set( Math.PI/2, 0, 0 );
		var dir = new THREE.Vector3();
		var dir = pivot.getWorldDirection(dir); 		
		pivot.userData.active.dir = new THREE.Vector3(-dir.z, 0, dir.x).normalize();	
		pivot.userData.active.qt = quaternionDirection( pivot.userData.active.dir ); 
	}
	else if(axis == 'z')
	{ 
		planeMath.rotation.set( Math.PI/2, 0, 0 ); 
		var dir = new THREE.Vector3();
		pivot.userData.active.dir = pivot.getWorldDirection(dir); 
		pivot.userData.active.qt = quaternionDirection( pivot.userData.active.dir ); 
	}
	else if(axis == 'y')
	{ 
		planeMath.rotation.set( 0, 0, 0 ); 
		pivot.userData.active.dir = dir_y.clone(); 
		pivot.userData.active.qt = qt_plus_y.clone();

		var mx = new THREE.Matrix4().compose(pivot.position, obj.quaternion, new THREE.Vector3(1,1,1));
				
	}	
	else if(axis == 'xz' || axis == 'center')
	{ 
		planeMath.rotation.set( Math.PI/2, 0, 0 ); 
	}		 
	
	var posL = camera.getWorldDirection().projectOnVector(new THREE.Vector3(1,0,0));
	console.log(posL);
	scene.add(new THREE.ArrowHelper( new THREE.Vector3(-0.7,0.7,-0.7), intersect.point, 1, 0xff0000 ));
	
	var dir = new THREE.Vector3().subVectors( intersect.point, camera.position ).normalize();
	
	//planeMath.quaternion.copy( pivot.quaternion.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI/2, 0, 0))).multiply( obj.quaternion ) );
	planeMath.quaternion.copy( pivot.quaternion.clone().multiply( obj.quaternion ).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI/2, 0, 0))) );
	
	planeMath.quaternion.copy( new THREE.Quaternion().setFromUnitVectors(planeMath.getWorldDirection(), new THREE.Vector3(-0.7,0.7,-0.7)) );
	
	planeMath.position.copy( intersect.point );
} 

var dgfdf = 0;
var sadasd = false;
function loopRTYY()
{
	if(!sadasd) return;
	
	//planeMath.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0.01, 0, 0)));
	
	var cos = Math.cos(dgfdf);
	var sin = Math.sin(dgfdf);
	console.log(cos, sin);
	dgfdf += 0.01;
	planeMath.quaternion.multiply( new THREE.Quaternion().setFromUnitVectors(planeMath.getWorldDirection(), new THREE.Vector3(cos,0,sin)) );
	
	renderCamera()
}



function movePivot( event )
{	
	var intersects = rayIntersect( event, planeMath, 'one' ); 
	
	if(intersects.length == 0) return;
	
	var pivot = infProject.tools.pivot;
	var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );

	if(pivot.userData.active.axis == 'xz')
	{
		var pos2 = new THREE.Vector3().subVectors( pos, pivot.position );
		pivot.position.add( pos2 );	
		//gizmo.position.add( pos2 );
		//param_pivot.obj.position.add( pos2 );
		return;			
	}		
	
	
	var subV = new THREE.Vector3().subVectors( pos, pivot.userData.active.startPos );
	var locD = localTransformPoint(subV, pivot.userData.active.qt);						
	
	var v1 = new THREE.Vector3().addScaledVector( pivot.userData.active.dir, locD.z );
	pos = new THREE.Vector3().addVectors( pivot.userData.active.startPos, v1 );	
	 
	
	
	var pos2 = new THREE.Vector3().subVectors( pos, pivot.position );
	pivot.position.add( pos2 );
	//gizmo.position.add( pos2 );
	//param_pivot.obj.position.add( pos2 );

}


