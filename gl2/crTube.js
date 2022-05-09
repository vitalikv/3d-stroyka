


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
		this.userData.group = [];	
		
		this.tubeGeometry({path, diameter});
		this.tubeMaterial({color});
	
		scene.add( this );
		infProject.scene.array.tube.push( this );
		this.render();		
	}
	
	setPos({pos})
	{
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

	addArrPoint({arr})
	{
		this.userData.point.push(...arr);					
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
	
	
	// кликнули на трубу из UI меню
	clickTubeUI()
	{
		outlineAddObj(this);
		this.showHideTubePoints({visible: true});
		
		let pos = this.convertDistToPos({dist: 0.5});	
		
		let arrO = [this, ...this.getTubePoints()];
		infProject.tools.pg.activeTool({obj: this, pos: pos, arrO: arrO});

		//this.ui_menu({type: 'show'});
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
	
	
	// деактивируем трубу
	deClickTube()
	{
		outlineRemoveObj();
		this.showHideTubePoints({visible: false});
		
		this.ui_menu({type: 'hide'});
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


	ui_menu({type})
	{
		if(type == 'show') this.ui_showMenu();
		if(type == 'hide') this.ui_hideMenu();
	}
	
	ui_showMenu()
	{
		let inf = {};
		inf.txt = {};
		inf.show = [];			
		 
		inf.txt.nameObj = this.userData.nameRus;
		inf.txt.tubeDiameter = this.userData.diameter * 1000;
		
		inf.show.push('listobj');
		inf.show.push('tube');
		inf.show.push('bobj');
		
		infProject.ui.rpanel.InfObj.update({inf: inf.txt});		
		infProject.ui.rpanel.InfObj.show({inf: inf.show});
		this.ui_crListObj();
		
	}
	
	ui_getObjChilds()
	{
		let item = {};
		item.obj = this;
		item.name = this.userData.nameRus;
		item.lengthTube = this.userData.lengthTube;
		item.colorTube = '#' + this.material.color.clone().getHexString();
		item.f = this.clickTubeUI.bind(this);
		
		item.childs = [];	
		
		let arr = [this.userData.point[0], this.userData.point[this.userData.point.length - 1]];
		
		for (let i = 0; i < arr.length; i++)
		{
			item.childs[i] = {};
			item.childs[i].obj = arr[i];
			item.childs[i].name = arr[i].userData.nameRus;
			item.childs[i].f = arr[i].clickPointTubeUI.bind(arr[i]);			
		}
		
		return item;
	}
	
	ui_crListObj()
	{
		let arrO = (this.userData.group.length > 0) ? this.userData.group : [this];
		
		let arr = arrO.map(o => 
		{
			let item = o.ui_getObjChilds();				
			
			return item;
		});
		
		let arr2 = arrO.map(o => 
		{
			let item = o.ui_getObjChilds();				
			
			return item;
		});
		
		arr2[0].name = 'ttww';
		
		infProject.ui.rpanel.InfObj.list.listChilds.crListUI({arr: [...arr, ...arr2, {name: 'test', obj: this}]});
	}
	
	ui_hideMenu()
	{
		infProject.ui.rpanel.InfObj.hide();
	}	
	
	render()
	{
		renderCamera();
	}	

}


