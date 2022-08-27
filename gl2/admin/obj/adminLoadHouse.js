




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


var houseObj = null;

// добавляем объект в сцену
function setParamHouse(cdm)
{	
	var obj = cdm.obj;
	
	var obj = getBoundObject_1({obj: obj});
	
	//var obj = obj.children[0];		
	obj.position.set(0, 0, 0); 	

	planeMath.position.y = 1; 
	planeMath.rotation.set(0, 0, 0);
	planeMath.updateMatrixWorld(); 	
 
	if(1==2)
	{
		obj.userData.tag = 'obj';	
		obj.userData.obj3D = {};
		obj.userData.obj3D.lotid = 0;
		obj.userData.obj3D.nameRus = 'дом';
		obj.userData.obj3D.typeGroup = '';
		obj.userData.obj3D.helper = null;
		
		obj.userData.obj3D.ur = {};
		obj.userData.obj3D.ur.pos = new THREE.Vector3();
		obj.userData.obj3D.ur.q = new THREE.Quaternion();
		
		infProject.scene.array.obj[infProject.scene.array.obj.length] = obj;		
	}	
			
	
	if(1==1)
	{
		var list = [];
		list[0] = {alias: '_m1_', name: 'стены 1 этажа', arr:[]};
		list[1] = {alias: '_m2_', name: 'пол 2 этажа', arr:[]};
		list[2] = {alias: '_m3_', name: 'стены 2 этажа', arr:[]};
		list[3] = {alias: '_m4_', name: 'стены 2 этажа', arr:[]};
		list[4] = {alias: '_m5_', name: 'крыша', arr:[]};
		
		var boundingBox = obj.geometry.boundingBox;
		console.log('size', boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z);
			
		obj.traverse( function ( child ) 
		{				
			if ( child.isMesh ) 
			{ 
				if( child.material )
				{
					var materialArray = [];
					if (child.material instanceof Array) { materialArray = child.material; }
					else { materialArray = [child.material]; }

					materialArray.forEach(function (mtrl, idx) 
					{
						mtrl.lightMap = lightMap_1;
						mtrl.lightMap.needsUpdate = true;
						mtrl.needsUpdate = true;
					});					
					console.log(child.name);
				}
				
				
				// находим объекты с алиасами этажей и добавляем в свой массив 
				for(var i = 0; i < list.length; i++)
				{
					if(new RegExp( list[i].alias ,'i').test( child.name ))
					{
						child.userData.level = i;
						child.userData.nameRus = list[i].name;
						list[i].arr.push(child);
					}
				}				
			}
		});	

		// отобржаем название и кол-во этажей в UI
		list.forEach(function (item, idx) 
		{
			addHouseListUI_2({name: item.name, arr: item.arr});
		});			
	}
	
	//obj.material.visible = false;

	
	houseObj = obj;
	
	scene.add( obj );	
	console.log(obj);	

	
	camOrbit.render();	
}


function saveHouseFBX() 
{
	var obj = houseObj;
	var pos = obj.position.clone();
	var rot = obj.rotation.clone();
	
	obj.position.set(0, 0, 0);
	obj.rotation.set(0, 0, 0);
	obj.updateMatrixWorld();
	
	//delete obj.userData.obj3D;	
	
	camOrbit.render();
	
	let data = JSON.stringify(obj);

	let csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data);

	let link = document.createElement('a');
	document.body.appendChild(link);
	link.href = csvData;
	link.target = '_blank';
	link.download = 'file.json';
	link.click();
	document.body.removeChild(link);
}





