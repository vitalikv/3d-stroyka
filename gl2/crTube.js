


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
		this.userData.wf_tube = {};
		this.userData.wf_tube.point = [];
		this.userData.wf_tube.nameRus = '';
		this.userData.wf_tube.length = 0;
		this.userData.wf_tube.diameter = 0;	
		
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
		
		let arrP = this.getArrPoint();
		arrP.forEach((o) => ( o.offsetPos({offset: offset})) );
	}
	
	// создаем Geometry трубы
	tubeGeometry(params = {})
	{
		let point = params.point;
		let diameter = params.diameter;		
		
		if(!point) 
		{
			let point1 = new PointTube({pos: new THREE.Vector3(-0.5, 0, 0), tube: this}); 
			let point2 = new PointTube({pos: new THREE.Vector3(0.5, 0, 0), tube: this}); 			
			
			point = [point1, point2];
		}			
		if(!diameter) diameter = 0.05;
		
		
		let arrPos = [];		
		for(let i = 0; i < point.length; i++) arrPos[i] = point[i].position.clone();
	
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


		this.addArrPoint({arr: point});
		
		this.userData.wf_tube.nameRus = 'труба '+ diameter*1000;
		this.userData.wf_tube.length = Math.round(length * 100)/100;
		this.userData.wf_tube.diameter = diameter;
		
		
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
		
		this.userData.wf_tube.point.push(...arr);					
	}
	
	getArrPoint()
	{
		return this.userData.wf_tube.point;					
	}

	setPivotGizmo(params)
	{
		let result = detectPosTubeWF({ray: params.rayhit});	// определяем в какое место трубы кликнули
		let pos = result.pos;	
		
		infProject.tools.pg.pos = pos;
		infProject.tools.pg.activeTool({obj: this});	
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
		this.userData.tag = 'wf_point';
		this.userData.wf_point = {};
		this.userData.wf_point.nameRus = 'точка';
		this.userData.wf_point.tube = params.tube ? params.tube : null;
		
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

	render()
	{
		renderCamera();
	}
}




