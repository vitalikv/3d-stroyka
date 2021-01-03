

// добавляем объекты и трубы в массив
function addArrObjToArray(cdm)
{
	var arr = cdm.arr;	
	
	for(var i = 0; i < arr.length; i++)
	{
		var exist = false;
		if(arr[i].userData.tag == 'obj')
		{
			for(var i2 = 0; i2 < infProject.scene.array.obj.length; i2++)
			{
				if(infProject.scene.array.obj[i2] == arr[i]) { exist = true; break; }
			}
			if(!exist) { infProject.scene.array.obj[infProject.scene.array.obj.length] = arr[i]; }
		}
		if(arr[i].userData.tag == 'wf_tube')
		{
			infProject.scene.array.tube[infProject.scene.array.tube.length] = arr[i];
		}				
	}	
}




// объекты объединяем в группу и добавляем в сцену
function joinSborkaToGroup(cdm)
{
	var arr = cdm.arr;
	
	var group = createGroupObj_1({nameRus: 'новая группа', obj: {o: arr} });
	
	for(var i = 0; i < arr.length; i++) { scene.add( arr[i] ); }		
}


// создаем массив в которм помимо объектов и труб, есть точки труб
function getArrWithPointTube(cdm)
{
	var arr = cdm.arr;
	var arr2 = [];
	
	for(var i = 0; i < arr.length; i++)
	{	
		arr2[arr2.length] = arr[i];
		
		if(!arr[i].userData.wf_tube) continue;

		var point = arr[i].userData.wf_tube.point;	
		
		for(var i2 = 0; i2 < point.length; i2++)
		{
			arr2[arr2.length] = point[i2];
		}			
	}

	return arr2;
}



// получаем трубу по заданным параметрам
function getTubeToSborka_1(cdm)
{
	var point1 = [];
	
	
	// простая прямая труба
	if(cdm.type == 1)
	{
		if(cdm.lengthX) { var arrP_1 = [new THREE.Vector3(), new THREE.Vector3(cdm.lengthX, 0, 0)]; }
		if(cdm.lengthY) { var arrP_1 = [new THREE.Vector3(), new THREE.Vector3(0, cdm.lengthY, 0)]; }	
	}
	
	// труба в виде формы Г
	if(cdm.type == 2)
	{
		var startY = (cdm.startY) ? cdm.startY : 0.0;
		var endY = (cdm.endY) ? cdm.endY : 0.0;
		var arrP_1 = getPointTubeCurve_1({size: 0.02, count: 2, startY: startY, endY: endY, type: 2});	
	}
	
	// труба в виде формы S
	if(cdm.type == 3)
	{
		var startY = (cdm.startY) ? cdm.startY : 0.0;
		var endY = (cdm.endY) ? cdm.endY : 0.0;
		var arrP_1 = getPointTubeCurve_1({size: 0.02, count: 2, startY: startY, endY: endY, type: 3});	
	}
	
	// зеркалим трубу
	if(cdm.mirror)
	{   
		if(cdm.mirror.x) for(var i = 0; i < arrP_1.length; i++) { arrP_1[i].x *= -1; }
		if(cdm.mirror.y) for(var i = 0; i < arrP_1.length; i++) { arrP_1[i].y *= -1; } 
	}
	
	
	for(var i = 0; i < arrP_1.length; i++) { point1[point1.length] = {pos: arrP_1[i]}; }
	
	
	
	var color = (cdm.color) ? cdm.color : 15688453;
	var diameter = (cdm.diameter) ? cdm.diameter : 0.016;
	
	var tube = crTubeWF({"point": point1, "diameter": diameter, "color": color, pVisible: false});
	
	
	return tube;
}




// получаем форму трубы в виде массива точек
function getPointTubeCurve_1(cdm)
{
	var type = cdm.type;
	var size = cdm.size;
	var count = cdm.count;
	var startY = (cdm.startY) ? cdm.startY : 0;
	

	
	// форма Г
	if(type == 2)
	{
		var endY = (cdm.endY) ? cdm.endY : 0;
		
		var arrP_2 = getCircle({count: count, size: size, r1: Math.PI/2, offsetR: Math.PI, offsetX: size*2, offsetY: 0});
		arrP_2.push(arrP_2[arrP_2.length-1].clone());
		arrP_2[arrP_2.length-1].x += 0.025;	

		arrP_2.unshift(arrP_2[0].clone());
		arrP_2[0].y -= endY - size - startY;

		var arrP = arrP_2;
	}
	
	
	// форма S
	if(type == 3)	
	{
		var endY = (cdm.endY) ? cdm.endY - size*2 : -size*2;
		
		var arrP_1 = getCircle({reverse: true, count: count, size: size, r1: Math.PI/2, offsetR: 0, offsetX: 0, offsetY: startY});
		arrP_1.unshift(arrP_1[0].clone());
		arrP_1[0].x -= 0.025;	
		
		var arrP_2 = getCircle({count: count, size: size, r1: Math.PI/2, offsetR: Math.PI, offsetX: size*2, offsetY: endY});
		arrP_2.push(arrP_2[arrP_2.length-1].clone());
		arrP_2[arrP_2.length-1].x += 0.05;	
		
		var arrP = arrP_1.concat(arrP_2);		
	}	
	
	//getLine({point: arrP});	помощник
	
	
	
	function getCircle(cdm)
	{
		var count = cdm.count;
		var circle = [];
		var g = cdm.r1 / count;
		
		for ( var i = 0; i < count+1; i++ )
		{
			var angle = g * i;
			circle[i] = new THREE.Vector3();
			
			if(cdm.reverse)
			{
				circle[i].y = -Math.cos(angle + cdm.offsetR) * cdm.size;
				circle[i].x = Math.sin(angle + cdm.offsetR) * cdm.size;					
			}
			else
			{
				circle[i].y = -Math.sin(angle + cdm.offsetR) * cdm.size;
				circle[i].x = Math.cos(angle + cdm.offsetR) * cdm.size;					
			}
			
			circle[i].x += cdm.offsetX;
			circle[i].y += cdm.offsetY;
		}			

		return circle;
	}	

	function getLine(cdm)
	{
		var geometry = new THREE.Geometry();
		
		var point = cdm.point;
		
		for(var i = 0; i < point.length; i++)
		{
			geometry.vertices.push(point[i]);
		}		
		
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x0000ff, linewidth: 2 }) );
		scene.add( line );

		line.position.y = 1;		
	}
	
	return arrP;
}




// смещаем трубу в нужное положение
function setPosTube(cdm)
{
	var tube = cdm.tube;
	var startPos = cdm.startPos;
	
	var pointTube = tube.userData.wf_tube.point;
	
	var pos = (cdm.lastP) ? pointTube[pointTube.length-1].position : pointTube[0].position;		// понменять место соединения начало/конец
	
	startPos.sub( pos );
	
	for(var i = 0; i < pointTube.length; i++)
	{
		pointTube[i].position.add(startPos);	
	}	
	
	updateTubeWF({tube: tube});		
}





// получаем разъемы объекта и находим у разъемов мировые position
function getRazyem(cdm)
{
	var obj = cdm.obj;				
	obj.updateMatrixWorld();
	
	var arrNum = (cdm.arrNum) ? cdm.arrNum : [];
	
	var centerPoint = getCenterPointFromObj_1( obj );
	
	var arr = [];
	for(var i = 0; i < centerPoint.length; i++)
	{	
		if(arrNum.length > 0)
		{
			var stop = true;
			for(var i2 = 0; i2 < arrNum.length; i2++)
			{
				if(i == arrNum[i2]) { stop = false; break; }
			}
			
			if(stop){ continue; }
		}
		
		arr[arr.length] = obj.localToWorld( centerPoint[i].position.clone() );
	}	

	return arr;
}








