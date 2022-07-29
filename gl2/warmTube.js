




function crEventButtonWarmTube(params)
{
	let container = params.container;
	
	eventClickButton();
	
	function eventClickButton()
	{
		let el = document.querySelector('[nameId="warmtube"]');	
		el.onmouseup = function(){ promise_1().then(data=> { addObjScene({pos: data.pos}); }) }	
	

		function promise_1()
		{
			return new Promise((resolve, reject) => 
			{
				document.onmousemove = function(e)
				{ 			
					if(e.target == container) 
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

	function addObjScene({pos})
	{ 
		let obj = new PointTube({pos, visible: true});
		
		obj.userData.propObj = propObj;
		obj.userData.propObj({type: 'addObjButton', obj: obj});
		
		renderCamera();
		
		return obj;
	}		


	function propObj({type, obj}) 
	{		
		if(type == 'addObjButton') { addObjButton({obj}); }
		
		function addObjButton({obj}) 
		{
			outlinePass.selectedObjects = [obj];
			setMouseStop(true);
			

			container.onmousemove = (event) => 
			{
				let intersects = rayIntersect(event, planeMath, 'one');
				if (intersects.length == 0) return;

				obj.position.copy(intersects[0].point);			
				
				if(obj.userData.tube) { obj.userData.tube.tubeGeometry(); }
				
				renderCamera();
			};

			container.onmousedown = (e) => 
			{
				container.onmousemove = null;
				container.onmousedown = null;

				outlineRemoveObj();				
				setMouseStop(false);

				if(e.button == 2) 
				{
					disposeNode(obj);
					scene.remove(obj);
				} 
				else 
				{
					
					
					if(!obj.userData.tube)
					{
						let obj2 = new PointTube({pos: obj.position.clone(), visible: true});		
						let tube = new TubeN({points: [obj, obj2]});
						
						obj2.userData.propObj = propObj;
						obj2.userData.propObj({type: 'addObjButton', obj: obj2});						
					}
					else
					{
						let tube = obj.userData.tube;
						let obj2 = new PointTube({pos: obj.position.clone(), tube, visible: true});
						tube.userData.point.push(obj2);
						tube.tubeGeometry();	
						
						obj2.userData.propObj = propObj;
						obj2.userData.propObj({type: 'addObjButton', obj: obj2});
					}
				}
				
				renderCamera();
			};
		}
	}
	
}








