




function crEventButtonWarmTubeGrid(params)
{
	let container = params.container;
	
	let material = new THREE.MeshLambertMaterial({ color: 0xcccccc, transparent: true, opacity: 1.0, lightMap : lightMap_1 });

	
	eventClickButton();
	
	
	function eventClickButton()
	{
		let el = document.querySelector('[nameId="gridT"]');	
		el.onmouseup = function(){ promise_1().then(data=> { addObjScene({pos: data.pos}); }) }	


		// нажали на кнопку и ждем, пока курсор окажется в сцене
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

		// создаем объект
		function addObjScene(params)
		{
			let pos = params.pos;
					 
			let obj = new THREE.Mesh( createGeometryWD(1, 0.02, 1), material ); 
			obj.position.copy(pos);
			obj.userData.tag = 'wtGrid';
			obj.userData.wtGrid = {};
			scene.add( obj );

			obj.userData.propObj = propObj;
			obj.userData.propObj({type: 'addObjButton', obj: obj});
			
			renderCamera();
		}		
	}
	
	


	// ф-ция со всеми действиями объекта
	function propObj(params)
	{
		let type = params.type;			
		let obj = params.obj;
		
		if(type == 'addObjButton') { addObjButton({obj: params.obj}); }
		if(type == 'clickObj') { clickObj(); }
		if(type == 'deleteObj') { deleteObj(); }
		
		// добавляем объект в сцену через кнопку, назначаем чтобы двигался за мышкой
		function addObjButton(params)
		{
			let obj = params.obj;
			
			infProject.scene.array.wtgrid.push(obj);
			
			outlineAddObj(obj);
			setMouseStop(true);		

			container.onmousemove = (event) => 
			{
				let intersects = rayIntersect(event, planeMath, 'one');
				if (intersects.length == 0) return;

				obj.position.copy(intersects[0].point);			
				
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
					deleteObj();
				} 
				
				renderCamera();
			};
		}
		
		// кликнули на сетку теплого пола
		function clickObj(params)
		{
			outlineAddObj(obj);			
			setPivotGizmo({obj: obj});	

			renderCamera();
		}
	
		function deleteObj()
		{
			deleteValueFromArrya({arr: infProject.scene.array.wtgrid, o: obj});
			
			disposeNode(obj);
			scene.remove(obj);	// удаляем точку	

			renderCamera();
		}	
	}	
}





