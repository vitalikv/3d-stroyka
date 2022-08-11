

// класс разъем для объекта
class PointObj extends THREE.Mesh
{
	constructor({geometry, material})
	{
		super(geometry, material);
	}
	
	initObj({id, name})
	{
		console.log(99999)
		this.userData.tag = 'joinPoint';
		this.userData.id = id;  
		this.userData.centerPoint = { join: null };						 
		this.userData.centerPoint.nameRus = name;	

		this.visible = false;
		this.renderOrder = 1;			
	}
	
	clone() 
	{
		let obj = new this.constructor(this).copy( this, false );
		
		return obj;
	}

	
	render()
	{
		renderCamera();
	}	
}




