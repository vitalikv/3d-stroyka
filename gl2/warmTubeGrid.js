




function crEventButtonWarmTubeGrid(params)
{
	let container = params.container;
	
	let matG = new THREE.MeshLambertMaterial({ color: 0xcccccc, lightMap : lightMap_1 });
	let matP = new THREE.MeshLambertMaterial({ color: 0x333333, lightMap : lightMap_1 });
	
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
			
			let obj = crFird({pos: pos});
			obj.userData.propObj = propObj;
			obj.userData.propObj({type: 'addObjButton', obj: obj});
			
			renderCamera();
		}		
	}
	

	// создаем сетку/плоскость теплого пола
	function crFird(params)
	{
		let obj = new THREE.Mesh( createGeometryCube(2, 0.005, 2), matG );
		
		obj.userData.tag = 'wtGrid';
		obj.userData.wtGrid = {};
		obj.userData.wtGrid.active = false;
		obj.userData.wtGrid.nameRus = (params.nameRus) ? params.nameRus : 'сетка теплого пола';
		obj.userData.wtGrid.point = {};
		obj.userData.wtGrid.point.arrO = [];
		obj.userData.wtGrid.point.f = null;
		
		scene.add( obj );	
		
		if(params.pos)
		{
			if(params.pos.x) obj.position.x = params.pos.x;
			if(params.pos.y) obj.position.y = params.pos.y;
			if(params.pos.z) obj.position.z = params.pos.z;
		}
		
		if(params.q)
		{
			obj.quaternion.set(params.q.x, params.q.y, params.q.z, params.q.w);
		}

	
		let p = crPoint({plane: obj});
		
		obj.userData.wtGrid.point.arrO = p;
		obj.userData.wtGrid.point.f = {};
		obj.userData.wtGrid.point.f.setPointPos = setPointPos;
		obj.userData.wtGrid.point.f.setPointVisible = setPointVisible;
		
		obj.userData.wtGrid.point.f.setPointPos({obj: obj});
		obj.userData.wtGrid.point.f.setPointVisible({obj: obj, show: false});
		
		// создаем точки теплого пола для изменения размера
		function crPoint(cdm)
		{	
			var plane = cdm.plane;
			
			function createCircleSpline_1()
			{
				var count = 48;
				var circle = [];
				var g = (Math.PI * 2) / count;
				
				for ( var i = 0; i < count; i++ )
				{
					var angle = g * i;
					circle[i] = new THREE.Vector3();
					circle[i].x = Math.sin(angle);
					circle[i].z = Math.cos(angle);
					//circle[i].y = 0;
				}

				return circle;
			}
			
			var circle = createCircleSpline_1();
			
			var n = 0;
			var v = [];
			for ( var i = 0; i < circle.length; i++ )
			{
				v[n] = new THREE.Vector3().addScaledVector( circle[i].clone().normalize(), 0.1 );
				v[n].y = 0;		
				n++;		
				
				v[n] = new THREE.Vector3();
				v[n].y = 0;
				n++;
				
				v[n] = v[n - 2].clone();
				v[n].y = 0.01;
				n++;	
				
				v[n] = new THREE.Vector3();
				v[n].y = 0.01;
				n++;		
			}	

			var arr = [];
			var geometry = createGeometryCircle(v);
			
			
			for ( var i = 0; i < 4; i++ )
			{
				var obj = new THREE.Mesh( geometry, matP ); 

				obj.userData.tag = 'wtPointGrid';
				obj.userData.wtPointGrid = {};	
				obj.userData.wtPointGrid.plane = plane;
				obj.userData.wtPointGrid.dir = [];
				obj.userData.wtPointGrid.f = {};
				obj.userData.wtPointGrid.f.clickObj = clickObj;
				
				obj.position.set(0, plane.position.y, 0);
				
				scene.add( obj );		
				
				arr[i] = obj;
			}
			
			Object.assign(arr[0].userData.wtPointGrid, {x: arr[1], z: arr[3], p2: arr[2]});
			Object.assign(arr[1].userData.wtPointGrid, {x: arr[0], z: arr[2], p2: arr[3]});
			Object.assign(arr[2].userData.wtPointGrid, {x: arr[3], z: arr[1], p2: arr[0]});
			Object.assign(arr[3].userData.wtPointGrid, {x: arr[2], z: arr[0], p2: arr[1]});

console.log(arr[0].userData.wtPointGrid);			

			// кликнули точку, подготавляем к перемещению
			function clickObj(params)
			{	
				let obj = params.obj;
				let pos = params.pos; 				
				let offset = new THREE.Vector3().subVectors( obj.position, pos );

				planeMath.position.copy( pos );  
				planeMath.rotation.set( Math.PI/2, 0, 0 );
				
				setMouseStop(true);
				
				container.onmousemove = (event) => 
				{
					movePoint({obj: obj, event: event, offset: offset});		
					
					renderCamera();
				};

				container.onmouseup = (e) => 
				{
					container.onmousemove = null;
					container.onmouseup = null;
					
					setMouseStop(false);
					
					resetClickLastObj();
					stopCameraTop();
					stopCamera3D();
					stopCameraView();
	
					renderCamera();
				};				
			}			


			// перемещение точки
			function movePoint(params) 
			{
				var obj = params.obj;
				var offset = params.offset;
				var event = params.event;
				
				var intersects = rayIntersect( event, planeMath, 'one' ); 				
				if(intersects.length == 0) return;				
				
				var pos = new THREE.Vector3().addVectors( intersects[ 0 ].point, offset );	
				
				
				
				// ограничение по осям xz
				if(1==1)
				{						
					let dotZ = obj.userData.wtPointGrid.dir.z.dot(new THREE.Vector3().subVectors( obj.userData.wtPointGrid.z.position, pos ));
					let dotX = obj.userData.wtPointGrid.dir.x.dot(new THREE.Vector3().subVectors( obj.userData.wtPointGrid.x.position, pos ));		
					
					if(dotX < 1 || dotZ < 1)
					{
						if(dotX < 1) dotX = 1;
						if(dotZ < 1) dotZ = 1;						
						
						let offsetX = new THREE.Vector3().addScaledVector( obj.userData.wtPointGrid.dir.x, -dotX );						
						let offsetZ = new THREE.Vector3().addScaledVector( obj.userData.wtPointGrid.dir.z, -dotZ );

						let p2 = obj.userData.wtPointGrid.p2;
						pos.copy(p2.position.clone().add(offsetX).add(offsetZ));
					}
				}
							
				
				// перемещаем соседние точки
				if(1 == 1)
				{
					obj.updateMatrixWorld();
					var posLoc = obj.worldToLocal( pos.clone() );	
					var posX = obj.localToWorld( new THREE.Vector3(posLoc.x, 0, 0) );
					var posX = new THREE.Vector3().subVectors( posX, obj.position );
					
					var posZ = obj.localToWorld( new THREE.Vector3(0, 0, posLoc.z) ); 
					var posZ = new THREE.Vector3().subVectors( posZ, obj.position );	

					obj.userData.wtPointGrid.x.position.add( posX );
					obj.userData.wtPointGrid.z.position.add( posZ );
				}		
				
				
				
				var pos2 = new THREE.Vector3().subVectors( pos, obj.position );
				obj.position.add( pos2 );

				
				// по положению точек изменяем форму плоскости 
				if(1 == 1)
				{
					var plane = obj.userData.wtPointGrid.plane;		
					var point = plane.userData.wtGrid.point.arrO;
					
					plane.updateMatrixWorld();			
					var ps1 = plane.worldToLocal( point[0].position.clone() );
					var ps2 = plane.worldToLocal( point[1].position.clone() );
					var ps3 = plane.worldToLocal( point[2].position.clone() );
					var ps4 = plane.worldToLocal( point[3].position.clone() );
					
					var x = new THREE.Vector3().subVectors( ps3, ps1 ).x;
					var z = new THREE.Vector3().subVectors( ps2, ps1 ).z;
					
					updateSizeSubstrate({obj: plane, size: {x: x/2, z: z/2}});
					
					plane.position.add( pos2.clone().divideScalar( 2 ) );
				}
			}

			
			return arr;
		}
		

		
		// устанавливаем точки по краям подложки 
		function setPointPos(cdm)
		{
			let plane = cdm.obj;
			
			let arrPos = [];
			
			plane.geometry.computeBoundingBox();
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.min.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.min.z);
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.min.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.max.z);
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.max.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.max.z);
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.max.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.min.z);
			
			plane.updateMatrixWorld();
			let point = plane.userData.wtGrid.point.arrO;
			
			for (let i = 0; i < arrPos.length; i++)
			{
				arrPos[i] = plane.localToWorld( arrPos[i] );
				point[i].position.copy(arrPos[i]);
				point[i].rotation.copy(plane.rotation);				
			}		
			
			for (let i = 0; i < point.length; i++)
			{
				let dirX = new THREE.Vector3().subVectors( point[i].userData.wtPointGrid.x.position, point[i].position ).normalize(); 
				let dirZ = new THREE.Vector3().subVectors( point[i].userData.wtPointGrid.z.position, point[i].position ).normalize(); 

				point[i].userData.wtPointGrid.dir = {x: dirX, z: dirZ};
			}		
		}		
		
		function setPointVisible(params)
		{
			let obj = params.obj;
			let show = params.show;
			
			let arrO = obj.userData.wtGrid.point.arrO;
			
			for ( let i = 0; i < arrO.length; i++ ) { arrO[i].visible = show; }		
		}
		
		return obj;
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
			
			hideMenuObjUI_2D();
			
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
		function clickObj()
		{
			obj.userData.wtGrid.active = true;
			
			setClickLastObj({obj: obj});
			activeObjRightPanelUI_1({obj: obj});
			outlineAddObj(obj);			
			setPivotGizmo({obj: obj});				

			obj.userData.wtGrid.point.f.setPointPos({obj: obj});
			obj.userData.wtGrid.point.f.setPointVisible({obj: obj, show: true});
		
			renderCamera();
		}
	
		function deleteObj()
		{
			hideMenuObjUI_2D();
			
			deleteValueFromArrya({arr: infProject.scene.array.wtgrid, o: obj});
			
			disposeNode(obj);
			scene.remove(obj);	// удаляем точку	

			renderCamera();
		}	
	}	
}








