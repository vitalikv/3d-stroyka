


class MyTube extends THREE.Mesh
{

	constructor(params)
	{
		super();
		
		this.create(params);
	}
	
	create(params)
	{
		let id = 0;
		if(params.id) { id = params.id; }
		else { id = countId; countId++; }
		
		this.userData.id = id;			
		this.userData.tag = 'new_tube';
		this.userData.point = [];
		this.userData.nameRus = '';
		this.userData.length = 0;
		this.userData.diameter = 0;	
		this.userData.group = [];	
		
		this.tubeGeometry(params);
		this.tubeMaterial(params);
	
		scene.add( this );
		infProject.scene.array.tube.push( this );
		this.render();		
	}
	
	setPos(params)
	{
		let pos = params.pos;
		
		let offset = pos.clone().sub(this.position);
				
		this.position.add(offset);
		
		let arrP = this.getTubePoints();
		arrP.forEach((o) => ( o.offsetPos({offset: offset})) );
	}
	
	// создаем/обновляем Geometry трубы
	tubeGeometry(params = {})
	{
		let pathPos = params.pathPos;
		let diameter = (params.diameter) ? params.diameter : this.userData.diameter;	

		this.position.set(0, 0, 0);
		this.rotation.set(0, 0, 0);
	

		if(pathPos)
		{
			let arr = [];		
			for(let i = 0; i < pathPos.length; i++)
			{
				let p = new PointTube({pos: pathPos[i], tube: this});
				arr.push(p);
			}
			
			this.addArrPoint({arr: arr});			
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
		this.userData.length = Math.round(length * 100)/100;
		this.userData.diameter = diameter;
		
		
		this.geometry.dispose();
		this.geometry = geometry;
	}
	
	tubeMaterial(params = {})
	{
		let color = params.color;	
		
		if(!color) color = new THREE.Color(0x0252f2);			
		
		let material = new THREE.MeshStandardMaterial({ color: color, wireframe: false, side: THREE.DoubleSide, lightMap: lightMap_1 });	

		this.material.dispose();
		this.material = material;
	}

	addArrPoint(params)
	{
		let arr = params.arr;
		
		this.userData.point.push(...arr);					
	}
	
	getTubePoints()
	{
		return this.userData.point;					
	}
	
	// название объекта
	getNameObj(params = {lang: 'ru'})
	{
		let lang = params.lang;
		
		let txt = '';
		
		if(lang == 'ru') txt = this.userData.nameRus+' ('+this.userData.length+'м)';
		
		return txt;
	}

	// кликнули на трубу
	clickTube(params)
	{
		outlineAddObj(this);
		this.showHideTubePoints({visible: true});
		
		let result = this.detectPosTube({clickPos: params.rayhit.point, arrP: this.getTubePoints()});	// определяем в какое место трубы кликнули
		let pos = result.pos;	
		
		let arrO = [this, ...this.getTubePoints()];
		infProject.tools.pg.activeTool({obj: this, pos: pos, arrO: arrO});			
	}
	
	
	// определяем в какое место трубы кликнули
	detectPosTube(params)
	{
		let clickPos = params.clickPos;			  
		let arrP = params.arrP;
		
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
	
	
	// деактивируем трубу
	deClickTube()
	{
		outlineRemoveObj();
		this.showHideTubePoints({visible: false});
		
		infProject.tools.pg.hide();	
	}

	// показываем/прячем точки трубы
	showHideTubePoints(params)
	{
		let visible = params.visible;
		let arr = this.getTubePoints();
		
		for ( let i = 0; i < arr.length; i++ ) { arr[i].visible = visible; }	
	}
	
	
	// удаляем трубу
	delete()
	{
		this.deClickTube();
		
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

	render()
	{
		renderCamera();
	}	

}


class PointTube extends THREE.Mesh
{
	constructor(params = {})
	{
		super(infProject.geometry.wf_point, infProject.material.pointTube.default);

		this.create(params);
		
		 		
	}
	
	create(params)
	{
		let id = 0;
		if(params.id) { id = params.id; }
		else { id = countId; countId++; }
		
		this.userData.id = id;	
		this.userData.tag = 'new_point';
		this.userData.nameRus = 'точка';
		this.userData.tube = params.tube ? params.tube : null;
		
		if(params.visible != undefined) this.visible = params.visible;
	
		this.setPos(params);
		
		scene.add( this );
		this.render();		
	}

	setPos(params)
	{
		let pos = params.pos;		
		if(!pos) return;
		
		this.position.copy(pos);
	}
	
	offsetPos(params)
	{
		let offset = params.offset;		
		if(!offset) return;
		
		this.position.add(offset);
	}

	// название объекта
	getNameObj(params = {lang: 'ru'})
	{
		let lang = params.lang;
		
		let txt = '';
		
		if(lang == 'ru') txt = this.userData.nameRus;
		
		return txt;
	}

	// получаем все точки трубы
	getTubePoints()
	{
		let arr = [this];
		
		if(this.userData.tube) arr = this.userData.tube.getTubePoints();
		
		return arr;					
	}


	// кликнули на точку
	clickPointTube(params)
	{
		let tube = this.userData.tube;
		tube.showHideTubePoints({visible: true});
		
		let arrO = [tube, ...this.getTubePoints()];
		
		outlineAddObj(this, {arrO: arrO});	
		
		infProject.tools.pg.activeTool({obj: this, pos: this.position, arrO: arrO});			
	}
	
	
	// перемещение точки
	movePointTube(params)
	{
		let offset = params.offset;
		
		this.offsetPos({offset: offset});
		
		let tube = this.userData.tube;
		
		tube.tubeGeometry();			
	}	


	// деактивируем трубу
	deClickPointTube()
	{
		outlineRemoveObj();
		let tube = this.userData.tube;
		tube.showHideTubePoints({visible: false});
		
		infProject.tools.pg.hide();	
	}


	// удаляем точку
	delete()
	{
		this.deClickPointTube();
		
		let tube = this.userData.tube;
		
		this.deletePointFromTube(); 
		
		if(tube.getTubePoints().length >= 2) 
		{ 
			tube.tubeGeometry(); 
		}
		else 
		{ 
			tube.delete(); 
		}

		this.render();
	}
	
	
	// удаляем точку из трубы
	deletePointFromTube()
	{
		let tube = this.userData.tube;
		deleteValueFromArrya({arr: tube.userData.point, o: this});
		this.userData.tube = null;

		disposeNode(this);
		scene.remove(this); 
	}	

	render()
	{
		renderCamera();
	}
}




