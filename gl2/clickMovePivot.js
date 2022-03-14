








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







