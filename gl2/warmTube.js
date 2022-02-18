


crEventButtonWarmTube();

function crEventButtonWarmTube()
{
	let el = document.querySelector('[nameId="warmtube"]');
	
	el.onmouseup = function(){ promise_1().then(data=> { addObjScene({pos: data.pos}); }) }	
	
	function addObjScene(params)
	{ 
		let obj = createPointWF({pos: params.pos}); 
		obj.userData.f = new WarmTubeP({ obj: obj });
		obj.userData.f.addEvent();
		console.log(planeMath.position.y);
		renderCamera();
	}

	function promise_1()
	{
		return new Promise((resolve, reject) => 
		{
			document.onmousemove = function(e)
			{ 			
				if(e.target == mainDiv_1) 
				{
					document.onmousemove = null;
					
					planeMath.position.y = infProject.tools.heightPl.position.y;  
					planeMath.rotation.set(-Math.PI/2, 0, 0);
					planeMath.updateMatrixWorld();
		
					let intersects = rayIntersect( event, planeMath, 'one' );
					if(intersects.length == 0) reject();
					
					resolve({pos: intersects[ 0 ].point});
				}
			}
		});
	}	
}




class WarmTubeP 
{
	constructor(params) 
	{
		this.obj = params.obj;

		this.addPointInArr();
	}

	addPointInArr() 
	{
		//point[point.length] = this.obj;
	}

	addEvent() 
	{
		let obj = this.obj;

		startPoint();
		
		function startPoint()
		{
			outlineAddObj(obj);
			setMouseStop(true);
		}
		

		mainDiv_1.onmousemove = (event) => 
		{
			let intersects = rayIntersect(event, planeMath, 'one');

			if (intersects.length == 0) return;

			obj.position.copy(intersects[0].point);			
			
			if(obj.userData.wf_point.tube) { updateTubeWF({tube: obj.userData.wf_point.tube}); }
			
			renderCamera();
		};

		mainDiv_1.onmousedown = (e) => 
		{
			mainDiv_1.onmousemove = null;
			mainDiv_1.onmousedown = null;

			outlineRemoveObj();
			
			setMouseStop(false);

			if (e.button == 2) 
			{
				//this.deleteObj();
				deletePointWF(obj);
				
			} 
			else 
			{
				let pos = obj.position.clone();
				
				let obj2 = createPointWF({pos: pos}); 
				obj2.userData.f = new WarmTubeP({ obj: obj2 });
				obj2.userData.f.addEvent();	
				
				if(!obj.userData.wf_point.tube)
				{
					let tube = crTubeWF({pointObj: [obj, obj2], diameter: 0.2, pVisible: true});
					
					infProject.scene.array.tube[infProject.scene.array.tube.length] = tube;
				}
				else
				{
					//obj2.userData.wf_point.tube = obj.userData.wf_point.tube;
					let tube = obj.userData.wf_point.tube;
					tube.userData.wf_tube.point.push(obj2);
					updateTubeWF({tube: obj.userData.wf_point.tube});
				}
			}
			
			renderCamera();
		};
	}
	
	
	deleteObj()
	{
		
	}
}




