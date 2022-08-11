



// перемещение объекта после того как загрузили из каталога 
function moveObjFromCatalog( event )
{	
	let intersects = rayIntersect( event, planeMath, 'one' ); 	
	if(intersects.length == 0) return;
	
	let obj = clickO.move;		
	
	if(clickO.arrO.length == 0) clickO.arrO = [obj];
	if(!clickO.actMove) clickO.actMove = true;	
	
	
	let pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, clickO.offset );		
	let offset = new THREE.Vector3().subVectors( pos, obj.position ); 

	let arrO = clickO.arrO; 

	infProject.tools.pivot.userData.propPivot({type: 'moveObjs', obj, arrO, offset});
}










// получаем все разъемы объекта
function getCenterPointFromObj_1( obj )
{
	let arr = [];
	
	if(obj.userData.centerPoint) obj = obj.parent;
	
	if(obj.userData.obj3D)
	{
		for(let i = 0; i < obj.children.length; i++)
		{
			let child = obj.children[i];
			if(!child.userData.centerPoint) continue;
			
			arr.push(child);
		}
	}
	
	return arr; 
}	
	






function renameObject(cdm)
{
	var obj = cdm.obj;
	var name = cdm.name;
	
	if(!obj) return;
	
	name = name.trim();
	
	if(obj.userData.obj3D) 
	{ 
		obj.userData.obj3D.nameRus = name;
		
		console.log('obj3D.nameRus');
	}
	else if(obj.userData.centerPoint)
	{		
		obj.userData.centerPoint.nameRus = name;

		console.log('centerPoint.nameRus');
	}
	else
	{
		return;
	}
	
	
	upItemObjNameUI({obj: obj});	// переименовываем название во вкладке "объект"	

	infProject.ui.rpanel.EstList.updateItem({obj});	// переименовываем название во вкладке "список"
	
	// переименовываем название во вкладке "объект"
	function upItemObjNameUI(cdm)
	{
		var obj = cdm.obj;
		
		var arr1 = infProject.list.rp_ui.arr;
		var arr2 = [];
		
		for(var i = 0; i < arr1.length; i++)
		{
			arr2[arr2.length] = {o: arr1[i].o, el: arr1[i].el};
			
			for(var i2 = 0; i2 < arr1[i].p.length; i2++)
			{
				arr2[arr2.length] = {o: arr1[i].p[i2].o, el: arr1[i].p[i2].el};
			}
		}
		
		
		for(var i = 0; i < arr2.length; i++)
		{
			if(arr2[i].o == obj)
			{
				var nameItem = arr2[i].el.querySelector('[nameId="nameItem"]');
				nameItem.innerText = obj.userData.obj3D.nameRus;  
				break;
			}
		}		
	}	
}




// кликнули на другой объект, деактивируем объект
function deClickObj({obj, moment})  
{	
	if(moment == 'down' && camera == cameraTop) deClickObj_1();
	else if(moment == 'up' && camera == camera3D) deClickObj_1();
	else if(moment == '') deClickObj_1();	
	
	
	
	function deClickObj_1()
	{ 
		// скрываем разъемы
		if(obj.userData.tag == 'obj' || obj.userData.tag == 'joinPoint')
		{		
			var arr = getCenterPointFromObj_1( obj );					
			
			for ( var i = 0; i < arr.length; i++ )
			{ 
				arr[i].material = infProject.material.pointObj.default;
				arr[i].visible = false;
			}		
		}	
		
		infProject.tools.pg.hide();
		activeObjRightPanelUI_1();		// скрываем UI
		
		outlineRemoveObj();					
	}
}





