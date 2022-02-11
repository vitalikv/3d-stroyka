




document.body.querySelector('#load_house_1').addEventListener( 'change', loadModelHouse, false );


function loadModelHouse(e) 
{
	if (this.files[0]) 
	{		
		var reader = new FileReader();
		reader.onload = function (e) 
		{						
			loadInputFile({data: e.target.result});
			
			// загрузка fbx здания с компа
			function loadInputFile(cdm)
			{
				var loader = new THREE.FBXLoader();
				var obj = loader.parse( cdm.data );		
				setParamHouse({obj: obj});			

				var el_4 = document.body.querySelector('[nameId="window_main_load_obj"]');
				el_4.style.display = 'none';
				
				blockKeyCode({block: false});
			}			
		};				

		reader.readAsArrayBuffer(this.files[0]);  									
	};
};




// добавляем объект в сцену
function setParamHouse(cdm)
{	
	var obj = cdm.obj;
	
	var obj = getBoundObject_1({obj: obj});
	
	//var obj = obj.children[0];		
	obj.position.set(0, 1, 0); 	

	planeMath.position.y = 1; 
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	planeMath.updateMatrixWorld(); 	
 
	obj.userData.tag = 'obj';
	obj.userData.obj3D = {};
	obj.userData.obj3D.lotid = 0;
	obj.userData.obj3D.nameRus = 'дом';
	obj.userData.obj3D.typeGroup = '';
	obj.userData.obj3D.helper = null;
	
	obj.userData.obj3D.ur = {};
	obj.userData.obj3D.ur.pos = new THREE.Vector3();
	obj.userData.obj3D.ur.q = new THREE.Quaternion();	
			
	if(1==1)
	{
		var id = 0;
		
		obj.traverse( function ( child ) 
		{
			if ( child.isMesh ) 
			{ 
				var boundingBox = child.geometry.boundingBox;
				console.log(child.name, boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z);
				
				if( child.material )
				{
					console.log(child.material);
					
					child.material.lightMap = lightMap_1;
					child.material.needsUpdate = true;
				}
				
				child.userData.house = {};
				child.userData.house.nameRus = child.name;
				addHouseListUI({obj: child});
				
				if(new RegExp( '_est_' ,'i').test( child.name ))
				{
					//console.log(8888888, child.name, child.rotation.x, child.rotation.y, child.rotation.z);
					
					child.visible = false;						
					
					var material = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 1, depthTest: false, lightMap: lightMap_1 });
					
					var geometry = infProject.geometry.centerPoint;
					
					var cube = new THREE.Mesh( geometry, material );
					cube.position.copy(child.position);
					cube.quaternion.copy(child.quaternion);
					cube.visible = false;
					cube.renderOrder = 1;
					//cube.rotation.y += 1;
					//var axesHelper = new THREE.AxesHelper( 0.2 );
					//child.add( axesHelper );							
					
					cube.userData.tag = 'joinPoint';
					cube.userData.id = id;  id++;
					cube.userData.centerPoint = { join: null };						 
					cube.userData.centerPoint.nameRus = child.name;
					
					obj.add( cube );				
				}
			}
		});		
	}
	
	//obj.material.visible = false;		
	
	infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;

	scene.add( obj );	
	console.log(obj);
	//clickO.move = obj;
	
	
	
	renderCamera();	
}



// добавляем этажи дома в список "план" UI
function addHouseListUI(cdm)
{
	if(!cdm) return;				
	if(!cdm.obj) return;	
	
	var obj = cdm.obj;
	
	var html = 
	'<div class="right_panel_1_1_list_item" uuid="'+obj.uuid+'">\
		<div class="flex_1">\
			<div class="right_panel_1_1_list_item_text" nameId="rp_floor_txt_name">'+obj.userData.house.nameRus+'</div>\
			<div class="image_wrap" nameId="view_show" style="position: relative; width: 20px; height: 20px; right: 5px;">\
				<img src="'+infProject.path+'img/view_show.png">\
			</div>\
			<div class="image_wrap" nameId="view_hide" style="display: none; position: relative; width: 20px; height: 20px; right: 5px;">\
				<img src="'+infProject.path+'img/view_hide.png">\
			</div>\
		</div>\
	</div>';

	var div = document.createElement('div');
	div.innerHTML = html;
	var elem = div.firstChild;		
	
	var container = document.querySelector('[nameId="rp_plane_2"]');
	container.append(elem);	
	
	var el_show = elem.querySelector('[nameId="view_show"]');
	var el_hide = elem.querySelector('[nameId="view_hide"]');
	
	el_show.onmousedown = function(e)
	{ 
		obj.visible = false;
		renderCamera();
		
		el_show.style.display = 'none';
		el_hide.style.display = ''; 
		e.stopPropagation(); 
	};
	
	el_hide.onmousedown = function(e)
	{ 
		obj.visible = true;
		renderCamera();
		
		el_show.style.display = '';
		el_hide.style.display = 'none'; 
		e.stopPropagation(); 
	};	
	
	//elem.onmousedown = function(e){ clickItemFloorUI({el: elem, type: "general"}); e.stopPropagation(); };

	var el_2 = elem.querySelector('[nameId="butt_img_substrate_1"]');		
	//el_2.onmousedown = function(e){ clickItemFloorUI({el: elem, type: "img"}); e.stopPropagation(); };
	
	//clickItemFloorUI({el: elem, type: "general"});
}





