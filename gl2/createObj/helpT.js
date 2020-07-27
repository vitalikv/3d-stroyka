


// создаем вспомогательные Vertex
function createHelperVertex(cdm)
{
	var obj = cdm.obj;

	var positions = obj.geometry.attributes.position.array;
	var count = positions.length / 3;
	
	
	var material = new THREE.MeshLambertMaterial( { color : 0x00ff00, transparent: true, opacity: 1, depthTest: false } );
	
	for (var i = 0; i < count; i++)
	{
		var pos = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);		
		pos.applyMatrix4( obj.matrixWorld );
		
		var cube = new THREE.Mesh( createGeometryCube(0.007, 0.007, 0.007), material );
		scene.add( cube );
		cube.position.copy(pos);
		
		cube.userData.num = [i * 3, i * 3+1, i * 3+2];
		cube.userData.pos = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);

		infProject.tools.helpVertex[infProject.tools.helpVertex.length] = cube;
	}	
			
}





document.body.addEventListener( 'mousedown', onDocumentMouseDown_2, false );

function onDocumentMouseDown_2()
{
	var rayhit = null;
	
	var ray = rayIntersect( event, infProject.tools.helpVertex, 'arr' );
	if(ray.length > 0) { rayhit = ray[0]; console.log('rayhit', rayhit.object.userData); }	
}








