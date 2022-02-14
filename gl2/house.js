










loadHouse();


async function loadHouse()
{
	//var response = await fetch(infProject.path+'components_2/getObjSql.php?id='+lotid, { method: 'GET' });
	
	var url = infProject.path+'components_2/getListObjSql.php';
	var lotid = 1;
	
	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'id='+lotid+'&select_list=id, model&table=house', 
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },				
	});
	var json = await response.json();

	
	var obj = new THREE.ObjectLoader().parse( json[0].model );
	scene.add( obj );
	
	console.log(obj);
	
	if(1==1)
	{
		var list = [];
		list[0] = {alias: '_level1_', name: 'этаж 1', arr:[]};
		list[1] = {alias: '_pol2_', name: 'пол 2 этажа', arr:[]};
		list[2] = {alias: '_level2_', name: 'этаж 2', arr:[]};
		list[3] = {alias: '_roof1_', name: 'крыша', arr:[]};
		
		obj.geometry.computeBoundingBox();
		var boundingBox = obj.geometry.boundingBox;
		console.log('size', boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z);
			
		obj.traverse( function ( child ) 
		{				
			if ( child.isMesh ) 
			{ 
				console.log(child.name);
				
				var materialArray = [];
				if (child.material instanceof Array) { materialArray = child.material; }
				else { materialArray = [child.material]; }

				materialArray.forEach(function (mtrl, idx) 
				{
					if(mtrl.map && mtrl.map.image)
					{
						mtrl.map.image.onload = function(e){ renderCamera(); }
					}
					
				});	
				
				// находим объекты с алиасами этажей и добавляем в свой массив 
				for(var i = 0; i < list.length; i++)
				{
					if(new RegExp( list[i].alias ,'i').test( child.name ))
					{
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
	
	renderCamera();
}	


// добавляем этажи дома в список "план" UI
function addHouseListUI_2(cdm)
{
	if(!cdm) return;				
	if(!cdm.arr) return;	
	
	var name = cdm.name;
	var arr = cdm.arr;
	
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
		
		renderCamera();
		
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
		
		renderCamera();
		
		el_show.style.display = '';
		el_hide.style.display = 'none'; 
		e.stopPropagation(); 
	};	
	
}



