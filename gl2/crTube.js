


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
		this.userData.length = 0;
		this.userData.diameter = 0;	
		this.userData.group = [];	
		
		this.tubeGeometry({path, diameter});
		this.tubeMaterial({color});
	
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
	tubeGeometry({path = null, diameter = this.userData.diameter})
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
	
	tubeMaterial({color})
	{		
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
		let clickPos = params.clickPos;
		
		outlineAddObj(this);
		this.showHideTubePoints({visible: true});
		
		let result = this.detectPosTube({clickPos: clickPos});	// определяем в какое место трубы кликнули
		let pos = result.pos;	
		
		let arrO = [this, ...this.getTubePoints()];
		infProject.tools.pg.activeTool({obj: this, pos: pos, arrO: arrO});

		console.log(222, this);
	}
	
	
	// определяем в какое место трубы кликнули
	detectPosTube(params)
	{
		let clickPos = params.clickPos;			  
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


