


class TubeN extends THREE.Mesh
{

	constructor({id, path, diameter, color})
	{
		super();
		
		this.create({id, path, diameter, color}); 
	}
	
	create({id, path, diameter, color})
	{
		if(!id) { id = countId; countId++; }
		
		this.userData.id = id;			
		this.userData.tag = 'new_tube';
		this.userData.point = [];
		this.userData.nameRus = '';
		this.userData.lengthTube = 0;
		this.userData.diameter = 0;	
		this.userData.group = [this];	
		
		this.tubeGeometry({path, diameter});
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
	tubeGeometry({path = null, diameter = this.userData.diameter} = {})
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
				point.visible = false;
			}
			
			this.userData.point.push(...arr);		
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
		outlineAddObj(this);
		this.showHideTubePoints({visible: true});
		
		let result = this.detectPosTube({clickPos: clickPos});	// определяем в какое место трубы кликнули
		let pos = result.pos;	
		
		let arrO = [this, ...this.getTubePoints()];
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
			let equal = infProject.ui.rpanel.InfObj.isEqualListChilds({ arr: ddGroup({obj: newObj}) });		
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
	
	
	// удаляем трубу
	delete()
	{
		this.deClickTube();
		
		this.uiEstimateListObj({type: 'del'});
		
		deleteValueFromArrya({arr: infProject.scene.array.tube, o: this});
		
		let points = this.getTubePoints();
		
		for ( let i = points.length - 1; i > -1; i-- )
		{
			points[i].deletePointFromTube();
		}
		
		disposeNode(this);
		scene.remove(this); 

		this.userData.point = [];
		this.userData.group = [];

		this.render();
	}


	ui_menu({type})
	{
		if(type == 'show') activeObjRightPanelUI_1({obj: this});
		if(type == 'hide') activeObjRightPanelUI_1();
	}
	
	// добавляем трубу в список сметы
	uiEstimateListObj({type})
	{
		if(type == 'add') infProject.ui.rpanel.EstList.crItem({obj: this}); 
		if(type == 'del') infProject.ui.rpanel.EstList.delItem({obj: this}); 
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





