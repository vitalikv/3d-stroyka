








function movePivot_2(cdm)
{
	let arrO = cdm.arrO;
	let obj = cdm.obj;
	let pos2 = cdm.pos2;
	
	
	if(obj.userData.tag == 'wf_point')		// точка трубы
	{
		obj.position.add(pos2);	

		updateTubeWF({tube: obj.userData.wf_point.tube});

		showWF_point_UI({point: obj});
	}
	else if(obj.userData.tag == 'wtGrid') 
	{ 
		obj.userData.propObj({type: 'moveObj', obj: obj, offset: pos2}); 
	}
	else 
	{
		moveOffsetArrObj({arrO: arrO, offset: pos2});				
	}	
}


// перемещаем массив объектов на заданное расстояние
function moveOffsetArrObj(cdm)
{
	let arrO = cdm.arrO;
	let offset = cdm.offset;
	
	for(let i = 0; i < arrO.length; i++)
	{
		if(arrO[i].userData.wf_tube)
		{
			let point = arrO[i].userData.wf_tube.point;
			
			for(let i2 = 0; i2 < point.length; i2++){ point[i2].position.add(offset); }
			
			updateTubeWF({tube: arrO[i]});
		}
		else
		{
			arrO[i].position.add(offset);
		}		
	}	
}





// меняем положение объекта через input
function inputChangePos()
{
	let obj = infProject.tools.pivot.userData.pivot.obj;  
	if(!obj) return;

	if(obj.userData.tag == 'obj'){}
	else if(obj.userData.tag == 'joinPoint'){}
	else if(obj.userData.tag == 'wf_tube'){}
	else if(obj.userData.tag == 'wf_point'){}
	else if(obj.userData.tag == 'wtGrid'){}
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
		infProject.tools.pivot.userData.propPivot({type: 'updatePosUI'});
		return;
	}	
	
	let pos1 = obj.position;
	let pivot = infProject.tools.pivot;
	let gizmo = infProject.tools.gizmo;
	
	if(obj.userData.tag == 'obj'){ pos1 = obj.localToWorld( obj.geometry.boundingSphere.center.clone() ); }		// группа или объект	
	else if(obj.userData.tag == 'joinPoint'){ pos1 = obj.getWorldPosition(new THREE.Vector3()); }
	else if(obj.userData.tag == 'wf_tube'){ pos1 = pivot.position; }
	else if(obj.userData.tag == 'wf_point'){ pos1 = obj.position; }
	else { pos1 = obj.position; }
	
	x = x.num;
	y = y.num;
	z = z.num;
		
	let pos2 = new THREE.Vector3(x,y,z).sub(pos1);
	
	pivot.position.add(pos2);
	gizmo.position.add(pos2);
	clippingGizmo360( obj );
	
	let arrO = arrObjFromGroup({obj: obj});
	movePivot_2({obj: obj, arrO: arrO, pos2: pos2});
		

	renderCamera();
}







