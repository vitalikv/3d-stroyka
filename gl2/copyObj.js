



// копируем объект или группу
function copyObj() 
{	
	let obj = infProject.tools.pg.obj;	
	if(!obj) return;	
	
	
	let arr = ddGetGroup({obj});

	let group = null;
	if(obj.userData.obj3D) { group = obj.userData.obj3D.group; }		
	if(obj.userData.tag == 'new_tube') { group = obj.userData.group; }
	
	
	let arr2 = [];
	
	for(let i = 0; i < arr.length; i++)
	{ 
		if(arr[i].userData.obj3D) { arr[i].userData.obj3D.group = null; }							
		
		if(arr[i].userData.obj3D) arr2.push(arr[i].clone());	 

		if(arr[i].userData.tag == 'new_tube') arr2.push(arr[i].copyTube());			
		
		if(arr[i].userData.obj3D) { arr[i].userData.obj3D.group = group; }	// восстанавливаем группу					
	}

	 
	hideMenuObjUI_2D();
	
	
	infProject.class.group.crGroup({arr: arr2});
	
	if(arr2[0].userData.obj3D) { arr2[0].clickObj(); }		


	scaleToolsMoveCamera();	
	renderCamera();		
}





