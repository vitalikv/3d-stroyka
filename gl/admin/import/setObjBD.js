


$(document).ready(function()
{
	
// загрузка obj --->

$('#load_obj_1').change(readURL_2);

function readURL_2(e) 
{
	if (this.files[0]) 
	{		
		var reader = new FileReader();
		reader.onload = function (e) 
		{						
			loadInputFile({data: e.target.result});
		};				

		reader.readAsArrayBuffer(this.files[0]);  									
	};
};


$('[nameId="butt_main_load_obj"]').mousedown(function () { $('[nameId="window_main_load_obj"]').css({"display":"block"}); });

$('[nameId="button_close_main_load_obj"]').mousedown(function () { $('[nameId="window_main_load_obj"]').css({"display":"none"}); });

$('[nameId="butt_load_obj_2"]').mousedown(function () { loadUrlFile(); });

// <--- загрузка obj


});	



// загрузка fbx объекта с компа
function loadInputFile(cdm)
{
	var loader = new THREE.FBXLoader();
	var obj = loader.parse( cdm.data );		
	setParamObj({obj: obj});			

	$('[nameId="window_main_load_obj"]').css({"display":"none"});
}


// загрузка fbx объекта по url
function loadUrlFile()
{	
	var url = $('[nameId="input_link_obj_1"]').val(); 
	var url = url.trim();
	
	// /import/furn_1.fbx 
	
	var loader = new THREE.FBXLoader();
	loader.load( url, function ( obj ) 						
	{ 			
		setParamObj({obj: obj});
	});			


	$('[nameId="window_main_load_obj"]').css({"display":"none"});
}



// добавляем объект в сцену
function setParamObj(cdm)
{	
	var obj = cdm.obj;
	
	var obj = obj.children[0];		
	obj.position.set(0, 1, 0); 	

	planeMath.position.y = 1; 
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	planeMath.updateMatrixWorld(); 	
 
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	obj.userData.obj3D.nameRus = 'неизвестный объект';
	obj.userData.obj3D.typeGroup = '';
	obj.userData.obj3D.helper = null;
	
	obj.userData.obj3D.ur = {};
	obj.userData.obj3D.ur.pos = new THREE.Vector3();
	obj.userData.obj3D.ur.q = new THREE.Quaternion();	
			

	obj.material.visible = false;		
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;

	scene.add( obj );	
	console.log(obj);
	//clickO.move = obj;
	
	renderCamera();	
}




// получаем габариты объекта и строим box-форму
function getBoundObject(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;
	
	
	obj.updateMatrixWorld();
	obj.geometry.computeBoundingBox();	
	obj.geometry.computeBoundingSphere();

	var bound = obj.geometry.boundingBox;
	
	var material = new THREE.MeshStandardMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 });
	var size = {x: bound.max.x-bound.min.x, y: bound.max.y-bound.min.y, z: bound.max.z-bound.min.z};
	var geometry = createGeometryCube(size.x, size.y, size.z);
	
	var v = geometry.vertices;
	//v[0].y = v[3].y = v[4].y = v[7].y = bound.min.y;
	//v[1].y = v[2].y = v[5].y = v[6].y = bound.max.y;
		
	var box = new THREE.Mesh( geometry, material ); 	
	//box.position.copy(centP);
	scene.add(box);
	
	box.position.copy(obj.position);
	box.rotation.copy(obj.rotation);
	
	box.updateMatrixWorld();
	box.geometry.computeBoundingBox();	
	box.geometry.computeBoundingSphere();	
	
	
	var pos1 = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );
	var pos2 = box.localToWorld( box.geometry.boundingSphere.center.clone() );
	
	console.log(pos2);
	console.log(pos1);
	//box.position.copy(obj.position);
	box.position.add(pos1.clone().sub(pos2));  

	var name = $('[nameId="rp_obj_name"]').val();
	name = name.trim();
	if(name == '') { name = null; }	
	
	var planeMath = 0.5;
	
	saveObjSql({id: 0, name: name, size: size, json: obj, planeMath: planeMath});	
}





// получаем с сервера список проектов принадлежащих пользователю
function saveObjSql(cdm)
{  
	var name = (cdm.name) ? JSON.stringify( cdm.name ) : null;
	var size = (cdm.size) ? JSON.stringify( cdm.size ) : null;
	var planeMath = (cdm.planeMath) ? cdm.planeMath : 0;
	var json = (cdm.json) ? JSON.stringify( cdm.json ) : null;
	
	$.ajax
	({
		type: "POST",					
		url: infProject.path+'admin/import/saveObjSql.php',
		data: { id: cdm.id, name: name, size: size, planeMath: planeMath, json: json },
		dataType: 'json',
		success: function(data)
		{  
			console.log(data);			
		}
	});	
}



function getObjSql(cdm)
{  
	
	$.ajax
	({
		type: "POST",					
		url: infProject.path+'admin/import/getObjSql.php',
		data: { id: cdm.id },
		dataType: 'json',
		success: function(data)
		{  
			console.log(data);			
		}
	});	
}





