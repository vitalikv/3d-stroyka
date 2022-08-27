










//loadHouse({id: 1});


async function loadHouse(cdm)
{
	//var response = await fetch(infProject.path+'components_2/getObjSql.php?id='+lotid, { method: 'GET' });
	
	var lotid = cdm.id;
	var pos = cdm.pos;	
	var rot = cdm.rot;
	
	var url = infProject.path+'components_2/getObjSql.php';

	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'id='+lotid+'&select_list=id, model&table=house', 
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },				
	});
	var json = await response.json();
	if(json.error) return null;
	
	
	var obj = new THREE.ObjectLoader().parse( json.model );
	
	obj.userData.house = {};
	obj.userData.house.lotId = lotid;

	if(pos) obj.position.set(0, 0, 0);
	if(rot) obj.rotation.set(0, 0, 0);
	obj.updateMatrixWorld();
	
	scene.add( obj );
	
	infProject.scene.array.house.push(obj);
	
	
	//console.log(cdm, json.model);
	
	if(1==1)
	{
		var groupLevel = [];
		
		obj.geometry.computeBoundingBox();
		var boundingBox = obj.geometry.boundingBox;
		console.log('size', boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z);
			
		obj.traverse( function ( child ) 
		{				
			if ( child.isMesh ) 
			{ 
				//console.log(child.name);
				
				var materialArray = [];
				if (child.material instanceof Array) { materialArray = child.material; }
				else { materialArray = [child.material]; }

				materialArray.forEach(function (mtrl, idx) 
				{
					if(mtrl.map && mtrl.map.image)
					{
						mtrl.map.image.onload = function(e){ camOrbit.render(); }
					}
					
				});	
				
				if(child.userData.nameRus)
				{
					let n = child.userData.level;
					
					if(!groupLevel[n]) { groupLevel[n] = {name: child.userData.nameRus, arr: []}; }
					
					groupLevel[n].arr.push(child);
				}				
			}
		});

		// отобржаем название и кол-во этажей в UI
		groupLevel.forEach(function (item, idx) 
		{
			if(item.arr.length > 0)
			{
				addHouseListUI_2({name: item.name, arr: item.arr});
			}			
		});			
	}	
	
	camOrbit.render();
}	


// добавляем этажи дома в список "план" UI
function addHouseListUI_2(cdm)
{
	if(!cdm) return;				
	if(!cdm.arr) return;	
	
	var name = cdm.name;
	var arr = cdm.arr;
	
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].visible = false;
	}
	
	
	var html = 
	'<div class="right_panel_1_1_list_item">\
		<div class="flex_1">\
			<div class="right_panel_1_1_list_item_text" nameId="rp_floor_txt_name">'+name+'</div>\
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
		for(var i = 0; i < arr.length; i++)
		{
			arr[i].visible = false;
		}
		
		camOrbit.render();
		
		el_show.style.display = 'none';
		el_hide.style.display = ''; 
		e.stopPropagation(); 
	};
	
	el_hide.onmousedown = function(e)
	{ 
		for(var i = 0; i < arr.length; i++)
		{
			arr[i].visible = true;
		}
		
		camOrbit.render();
		
		el_show.style.display = '';
		el_hide.style.display = 'none'; 
		e.stopPropagation(); 
	};	
	
}



