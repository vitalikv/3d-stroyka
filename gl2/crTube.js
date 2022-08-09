


class TubeN extends THREE.Mesh
{

	constructor({id, points, path, diameter, color})
	{
		super();
		
		this.create({id, points, path, diameter, color}); 
	}
	
	create({id, points, path, diameter, color})
	{
		if(!id) { id = countId; countId++; }
		
		this.userData.id = id;			
		this.userData.tag = 'new_tube';
		this.userData.point = [];
		this.userData.nameRus = '';
		this.userData.lengthTube = 0;
		this.userData.diameter = 0.05;	
		this.userData.group = null;	
		
		this.tubeGeometry({points, path, diameter});
		this.tubeMaterial({color});
	
		scene.add( this );
		infProject.scene.array.tube.push( this );
		this.render();	

		this.uiEstimateListObj({type: 'add'});
	}
	
	setPosTube({pos})
	{
		let offset = pos.clone().sub(this.position);
				
		this.position.add(offset);
		
		let arrP = this.getTubePoints();
		arrP.forEach((o) => ( o.offsetPos({offset: offset})) );
	}
	
	// создаем/обновляем Geometry трубы
	tubeGeometry({points = null, path = null, diameter = this.userData.diameter} = {})
	{
		this.position.set(0, 0, 0);
		this.rotation.set(0, 0, 0);
	

		if(path)
		{
			let arr = [];		
			for(let i = 0; i < path.length; i++)
			{
				let pos = new THREE.Vector3(path[i].pos.x, path[i].pos.y, path[i].pos.z);
				let point = new PointTube({pos: pos, tube: this, id: path[i].id});
				arr.push(point);
				point.visible = path[i].visible || false;
			}
			
			this.userData.point.push(...arr);		
		}
		
		if(points)
		{
			for(let i = 0; i < points.length; i++)
			{
				points[i].userData.tube = this;
			}
			
			this.userData.point.push(...points);
		}
		
		
		let arrPT = this.getTubePoints();
		
		let arrPos = [];		
		for(let i = 0; i < arrPT.length; i++) arrPos[i] = arrPT[i].position.clone();
	
		let pipeSpline = new THREE.CatmullRomCurve3(arrPos);
		pipeSpline.curveType = 'catmullrom';
		pipeSpline.tension = 0;
		
		let length = 0;
		for(let i = 0; i < arrPos.length - 1; i++) 
		{ 
			length += arrPos[i].distanceTo(arrPos[i + 1]); 
		}		
		
		let inf = { extrusionSegments: Math.round(length * 50), radiusSegments: 12, closed: false };
		
		let geometry = new THREE.TubeBufferGeometry( pipeSpline, inf.extrusionSegments, diameter/2, inf.radiusSegments, inf.closed );	
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		
		this.userData.nameRus = 'труба '+ diameter*1000;
		this.userData.lengthTube = Math.round(length * 100)/100;
		this.userData.diameter = diameter;
		
		
		this.geometry.dispose();
		this.geometry = geometry;
		
		
		if(path || points){  }
		else 
		{ 
			this.uiEstimateListObj({type: 'update'});
			this.uiInfoListObj({type: 'update'});
		}
	}
	
	tubeMaterial({color})
	{		
		if(!color) color = new THREE.Color(0x0252f2);	 		
		
		let material = new THREE.MeshStandardMaterial({ color: color, wireframe: false, side: THREE.DoubleSide, lightMap: lightMap_1 });	

		this.material.dispose();
		this.material = material;
	}

	
	// добавить точку на трубу
	addPointOnTube({clickPos})
	{
		let result = this.detectPosTube({clickPos});
		
		let arrP = this.getTubePoints();
		let newPoint = new PointTube({pos: result.pos, tube: this});
		
		for(let i = 0; i < arrP.length; i++) { if(arrP[i] == result.p1) { arrP.splice(i+1, 0, newPoint); break; } }

		this.tubeGeometry();

		return newPoint;
	}
	
	
	getTubePoints()
	{
		return this.userData.point;					
	}
	
	// название объекта
	getNameObj({lang = 'ru'} = {lang: 'ru'})
	{		
		let txt = '';
		
		if(lang == 'ru') txt = this.userData.nameRus+' ('+this.userData.lengthTube+'м)';
		
		return txt;
	}

	// кликнули на трубу
	clickTube({clickPos})
	{
		let arrO = this.getGroupTube({tubePoint: true});
		
		outlinePass.selectedObjects = arrO;
		this.showHideTubePoints({visible: true});
		
		let result = this.detectPosTube({clickPos: clickPos});	// определяем в какое место трубы кликнули
		let pos = result.pos;	
		  
		infProject.tools.pg.activeTool({obj: this, pos: pos, arrO: arrO});

		this.ui_menu({type: 'show'});
	}
			
	
	// определяем в какое место трубы кликнули
	detectPosTube({clickPos})
	{		  
		let arrP = this.getTubePoints();
		
		let arr = [];
		
		for ( let i = 0; i < arrP.length - 1; i++ )
		{ 
			let p1 = arrP[i];
			let p2 = arrP[i + 1];
			
			let pos = mathProjectPointOnLine({p: [p1.position, p2.position], rayHit: clickPos});
			
			let dist = clickPos.distanceTo(pos);	
			
			if(checkPointBoundBoxLine(p1.position, p2.position, pos))
			{
				arr[arr.length] = {dist: dist, pos: pos, p1: p1};
			}
		} 

		arr.sort(function (a, b) { return a.dist - b.dist; });	// сортируем по увеличению дистанции 

		return {p1: arr[0].p1, pos: arr[0].pos};
	}


	// определяем место трубы (расстоение от 0 до 1), куда посавить pivot после удалении точки
	getDistPointOnTube()
	{
		let arr = this.getTubePoints();
				
		let dist1 = 0;
		for(let i = 0; i < arr.length - 1; i++) 
		{ 
			if(arr[0] == this) break;			
			dist1 += arr[i].position.distanceTo(arr[i + 1].position); 
			if(arr[i + 1] == this) break;
		}	

		let dist2 = 0;
		for(let i = 0; i < arr.length - 1; i++) 
		{ 
			dist2 += arr[i].position.distanceTo(arr[i + 1].position); 
		}
		
		let ratio = dist1/dist2;
		if(ratio == 0) ratio = 0.1;
		if(ratio == 1) ratio = 0.9;
		
		return ratio;
	}


	// конвертируем расстоение dist от 0 до 1 => position на трубе
	convertDistToPos({dist})
	{
		let arr = this.getTubePoints();	
		let pos = arr[0].position;

		let dist2 = 0;
		for(let i = 0; i < arr.length - 1; i++) 
		{ 
			dist2 += arr[i].position.distanceTo(arr[i + 1].position); 
		}
		
		let dist1 = 0;
		for(let i = 0; i < arr.length - 1; i++) 
		{ 
			dist1 += arr[i].position.distanceTo(arr[i + 1].position); 
			
			if(dist <= dist1/dist2) 
			{
				//let s = dist1 - dist;
				pos = arr[i + 1].position.clone().sub(arr[i].position).divideScalar( 2 ).add(arr[i].position);
				break;
			}
		}				
		
		return pos;
	}
	
	
	// деактивируем трубу, кликнули на другой объект или в пустоту 
	deClickTube({newObj} = {newObj: null})
	{
		outlineRemoveObj();
		this.showHideTubePoints({visible: false});
	

		if(newObj)
		{
			let equal = infProject.ui.rpanel.InfObj.isEqualListChilds({ arr: ddGetGroup({obj: newObj}) });		
			if(!equal) infProject.ui.rpanel.InfObj.list.listChilds.clear(); 				
		}
		else
		{
			infProject.ui.rpanel.InfObj.setGroupObjs();
		}
		
		this.ui_menu({type: 'hide'});
		infProject.tools.pg.hide();	
	}

	// показываем/прячем точки трубы
	showHideTubePoints({visible})
	{
		let arr = this.getTubePoints();
		
		for ( let i = 0; i < arr.length; i++ ) { arr[i].visible = visible; }	
	}


	// меняем цвет трубы input
	changeColorTube({value}) 
	{  			
		this.material.color = new THREE.Color(value); 
		this.material.needsUpdate = true;	
		
		this.uiEstimateListObj({type: 'update'});	// обновляем цвет трубы во вкладке "список"
		
		this.render(); 
	}
	
	
	// получаем группу
	getGroupTube({tubePoint})
	{
		return ddGetGroup({obj: this, tubePoint});
	}
	
	// копировать трубу
	copyTube()
	{
		return copyTubeN({obj: this});
	}

	
	// удаляем трубу
	delete()
	{
		this.deClickTube();
		
		this.uiEstimateListObj({type: 'del'});
		
		infProject.class.group.detachObjGroup({obj: this});
		
		deleteValueFromArrya({arr: infProject.scene.array.tube, o: this});
		
		let points = this.getTubePoints();
		
		for ( let i = points.length - 1; i > -1; i-- )
		{
			points[i].deletePointFromTube();
		}
		
		disposeNode(this);
		scene.remove(this); 

		this.userData.point = [];

		this.render();
	}


	ui_menu({type})
	{
		if(type == 'show') activeObjRightPanelUI_1({obj: this});
		if(type == 'hide') activeObjRightPanelUI_1();
	}
	
	// список сметы/материалов
	uiEstimateListObj({type})
	{ 
		if(type == 'add') infProject.ui.rpanel.EstList.crItem({obj: this}); 
		if(type == 'del') infProject.ui.rpanel.EstList.delItem({obj: this});
		if(type == 'update') infProject.ui.rpanel.EstList.updateItem({obj: this}); 
	}

	// список объектов
	uiInfoListObj({type})
	{ 	
		if(type == 'update') infProject.ui.rpanel.InfObj.list.listChilds.upItemListObj({obj: this})
	}
	
	render()
	{
		renderCamera();
	}	

}


TubeN.prototype.newM = function() 
{
    console.log(333, this);
};


// копировать трубу
function copyTubeN({obj})
{	
	if(obj.userData.tag != 'new_tube') return;
	
	let point = obj.getTubePoints();
	
	let path = [];
	for(let i = 0; i < point.length; i++)
	{
		path[i] = {pos: point[i].position.clone(), visible: point[i].visible};
	}	
	
	let tube = new TubeN({path: path, diameter: obj.userData.diameter, color: obj.material.color});
	
	return tube;
}



// масштаб точек трубы
function setScaleTubePoint(cdm) 
{ 
	if(!cdm) { cdm = {}; }

	var arr = [];
	
	if(cdm.arr) 
	{ 
		arr = cdm.arr; 
	}
	else 
	{
		var obj = clickO.last_obj; 	
		if(!obj) return;
		
		if(obj.userData.tag == 'new_tube') { var tube = obj; }		
		else if(obj.userData.tag == 'new_point') { var tube = obj.userData.tube; }
		else { return; }
		
		arr = tube.userData.point;	
	}
	
	if(arr.length == 0) return;		 
		
	
	if(camera == cameraTop)
	{		
		var scale = 3.5/camera.zoom;	
		
		if(scale > 1.4) { scale = 1.4; }
		else if(scale < 0.5) { scale = 0.5; }
		
		for ( var i = 0; i < arr.length; i++ )
		{ 
			arr[i].scale.set( scale,scale,scale );			
		}	
	}	
	else if(camera == camera3D)
	{
		for ( var i = 0; i < arr.length; i++ )
		{ 
			var scale = camera.position.distanceTo(arr[i].position)/2;	

			if(scale > 1.2) scale = 1.2;
			
			arr[i].scale.set( scale,scale,scale );			
		}							
	}
}		


// input меняем диаметр трубы
function inputWF_tubeDiametr(cdm)
{
	var tube = cdm.line;
	
	if(!tube) return;	
	if(tube.userData.tag != 'wf_tube') return;
	
	var line = tube.userData.wf_tube.line;
	
	var size = checkNumberInput({ value: cdm.size, unit: 0.001, limit: {min: 0.003, max: 0.063}, int: true });
	
	if(!size) 
	{
		showWF_line_UI({tube: tube});	// при выделении трубы, обновляем меню длины трубы UI	
		return;
	}
	
	var size = size.num;
	
	infProject.settings.wf_tube.d = size;	
	
	updateTubeWF({tube: tube, diameter: size});		// обновляем форму трубы	
	
	showWF_line_UI({tube: tube});		// при выделении трубы, обновляем меню длины трубы UI	
}


// попадает ли точка в граница отрезка 3D BoundBox
function checkPointBoundBoxLine(pointA, pointB, pointToCheck) 
{
	if(pointToCheck.x < Math.min(pointA.x, pointB.x) || pointToCheck.x > Math.max(pointA.x, pointB.x)) { return false; }

	if(pointToCheck.y < Math.min(pointA.y, pointB.y) || pointToCheck.y > Math.max(pointA.y, pointB.y)) { return false; }

	if(pointToCheck.z < Math.min(pointA.z, pointB.z) || pointToCheck.z > Math.max(pointA.z, pointB.z)) { return false; } 

	return true;
}



// пускаем луч, определяем кликнули ли на точку, если активирована труба или точка
function clickRayhitPointWF(params)
{  
	let event = params.event;
	let obj = params.obj;
	
	if(!obj) return;
	
	let arrP = null;
	let rayhit = null;	

	if(obj.userData.tag == 'new_tube'){ arrP = obj.getTubePoints(); }
	if(obj.userData.tag == 'new_point'){ arrP = obj.getTubePoints(); }
		
	if(arrP)
	{			
		let ray = rayIntersect( event, arrP, 'arr' );  
		if(ray) { if(ray.length > 0) { rayhit = ray[0]; } }		
	}	

	return rayhit;
}



// создаем трубу из каталога 
function createTubeWF_1(cdm)
{
	let visible = false;
	
	if(cdm.type == 'vertical') visible = (camera == cameraTop) ? true : false;
	
	
	let diameter = (cdm.diameter) ? cdm.diameter : 0.05;
	//let tube = crTubeWF({point: cdm.point, diameter: diameter, pVisible: visible}); 	 		
	let tube = new TubeN({path: cdm.point, diameter: diameter});
	
	return tube;
}


// добавляем новую трубу в сцену
function addTubeInScene(tube, cdm)
{
	if(tube.userData.tag == 'new_tube')
	{
		planeMath.position.y = infProject.tools.heightPl.position.y;  
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld();
		
		setMouseStop(true);
		
		mainDiv_1.onmousemove = (event) => 
		{
			let intersects = rayIntersect(event, planeMath, 'one');
			if (intersects.length == 0) return;		
			
			tube.setPosTube({pos: intersects[0].point});			
			
			renderCamera();
		};

		mainDiv_1.onmousedown = () => 
		{
			mainDiv_1.onmousemove = null;
			mainDiv_1.onmousedown = null;
		
			let intersects = rayIntersect(event, planeMath, 'one');
			if (intersects.length > 0) tube.clickTube({clickPos: intersects[0].point});						
			
			setMouseStop(false);
			
			renderCamera();
		};			

	}
	
	renderCamera();
	
	return tube;
}



