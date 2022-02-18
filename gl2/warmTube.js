




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

		function addObjScene(params)
		{ 
			let pos = params.pos;
			
			let obj = createPointWF({pos: pos}); 
			obj.userData.propObj = propObj;
			obj.userData.propObj({type: 'addObjButton', obj: obj});
			
			renderCamera();
		}		
	}


	function propObj(params) 
	{
		let type = params.type;			
		let obj = params.obj;
		
		if(type == 'addObjButton') { addObjButton({obj: params.obj}); }
		
		function addObjButton() 
		{
			outlineAddObj(obj);
			setMouseStop(true);
			

			container.onmousemove = (event) => 
			{
				let intersects = rayIntersect(event, planeMath, 'one');
				if (intersects.length == 0) return;

				obj.position.copy(intersects[0].point);			
				
				if(obj.userData.wf_point.tube) { updateTubeWF({tube: obj.userData.wf_point.tube}); }
				
				renderCamera();
			};

			container.onmousedown = (e) => 
			{
				container.onmousemove = null;
				container.onmousedown = null;

				outlineRemoveObj();				
				setMouseStop(false);

				if (e.button == 2) 
				{
					deletePointWF(obj);
				} 
				else 
				{
					let pos = obj.position.clone();
					
					let obj2 = createPointWF({pos: pos}); 
					obj2.userData.propObj = propObj;
					obj2.userData.propObj({type: 'addObjButton', obj: obj2});					
					
					if(!obj.userData.wf_point.tube)
					{
						let tube = crTubeWF({pointObj: [obj, obj2], diameter: 0.2, pVisible: true});
						
						infProject.scene.array.tube.push(tube);
					}
					else
					{
						let tube = obj.userData.wf_point.tube;
						tube.userData.wf_tube.point.push(obj2);
						updateTubeWF({tube: obj.userData.wf_point.tube});
					}
				}
				
				renderCamera();
			};
		}
	}
	
}








