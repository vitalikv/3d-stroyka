


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
	clickPointTube()
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
		let dist = this.getDistPointOnTube();		
		this.deletePointFromTube(); 
		
		if(tube.getTubePoints().length >= 2) 
		{ 
			tube.tubeGeometry();
			let pos = this.convertDistToPos({dist: dist, tube: tube});  
			tube.clickTube({clickPos: pos});
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
	

	// конвертируем расстоение от 0 до 1 => position на трубе
	convertDistToPos(params)
	{
		let dist = params.dist;		
		let tube = params.tube;
		
		let arr = tube.getTubePoints();	
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
	

	render()
	{
		renderCamera();
	}
}




