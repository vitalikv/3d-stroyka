




function crEventButtonWarmTubeGrid(params)
{
	let container = params.container;
	
	let geomP = geomPoint();	// геометрия точки
	
	let matG = new THREE.MeshLambertMaterial({ color: 0xcccccc, lightMap : lightMap_1 });	// материал плоскости
	let matP = new THREE.MeshLambertMaterial({ color: 0x333333, transparent: true, opacity: 1.0, depthTest: false });	// материал точек
	let matL = new THREE.LineBasicMaterial({ color: 0x00ff00 });	// материал линий сетки
	
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
			
			let obj = crPlane({pos: pos});
			crPoint({plane: obj});
			crGridLine({obj: obj});			
			
			obj.userData.propObj({type: 'upShapeGrid', obj: obj});
			obj.userData.propObj({type: 'setPointVisible', obj: obj, show: false});
			obj.userData.propObj({type: 'addObjButton', obj: obj});	
		
			renderCamera();
		}		
	}
	
	// геометрия точки
	function geomPoint()
	{
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

		
		var geometry = createGeometryCircle(v);

		return geometry;
	}


	// создаем плоскость теплого пола
	function crPlane(params)
	{
		let size = (params.size) ? params.size : new THREE.Vector3(1.5, 0.005, 1.5);
		
		let obj = new THREE.Mesh( createGeometryCube(size.x, 0.005, size.z), matG );
		
		obj.userData.tag = 'wtGrid';
		obj.userData.wtGrid = {};
		obj.userData.wtGrid.active = false;
		obj.userData.wtGrid.nameRus = (params.nameRus) ? params.nameRus : 'сетка теплого пола';
		obj.userData.wtGrid.arrP = [];
		obj.userData.wtGrid.gridL = null;		
		obj.userData.propObj = propPlane;
		
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

		scene.add( obj );
		

		return obj;
	}

	
	// создаем точки теплого пола для изменения размера
	function crPoint(cdm)
	{	
		var plane = cdm.plane;
		
		var arr = [];
		
		for ( var i = 0; i < 4; i++ )
		{
			var obj = new THREE.Mesh( geomP, matP ); 

			obj.userData.tag = 'wtPointGrid';
			obj.userData.plane = plane;
			obj.userData.dir = [];
			obj.userData.propObj = propPoint;
			
			obj.position.set(0, plane.position.y, 0);
			
			scene.add( obj );		
			
			arr[i] = obj;
		}
		
		Object.assign(arr[0].userData, {x: arr[1], z: arr[3], p2: arr[2]});
		Object.assign(arr[1].userData, {x: arr[0], z: arr[2], p2: arr[3]});
		Object.assign(arr[2].userData, {x: arr[3], z: arr[1], p2: arr[0]});
		Object.assign(arr[3].userData, {x: arr[2], z: arr[0], p2: arr[1]});
		
		plane.userData.wtGrid.arrP = arr;
	}

	
	// создаем сетку для пола
	function crGridLine(params)
	{
		let plane = params.obj;
		let size = (params.size) ? params.size : 0.5;	// размер ячейки
		
		let grid = new THREE.Group();		
		grid.userData.size = size;				
		grid.position.y = 0.01;		
		plane.add( grid );
		
		plane.userData.wtGrid.gridL = grid;
	}



	// ф-ция со всеми действиями точки
	function propPoint(params)
	{
		let type = params.type;			
		
		if(type == 'clickObj') { clickObj({obj: params.obj, pos: params.pos}); }		
		
		// кликнули точку, подготавляем к перемещению
		function clickObj(params)
		{	
			let obj = params.obj;
			
			setClickLastObj({obj: obj.userData.plane});
			
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
				let dotZ = obj.userData.dir.z.dot(new THREE.Vector3().subVectors( obj.userData.z.position, pos ));
				let dotX = obj.userData.dir.x.dot(new THREE.Vector3().subVectors( obj.userData.x.position, pos ));		
				
				if(dotX < 1 || dotZ < 1)
				{
					if(dotX < 1) dotX = 1;
					if(dotZ < 1) dotZ = 1;						
					
					let offsetX = new THREE.Vector3().addScaledVector( obj.userData.dir.x, -dotX );						
					let offsetZ = new THREE.Vector3().addScaledVector( obj.userData.dir.z, -dotZ );

					let p2 = obj.userData.p2;
					pos.copy(p2.position.clone().add(offsetX).add(offsetZ));
				}
			}
						
			
			// перемещаем соседние точки
			if(1 == 1)
			{
				obj.updateMatrixWorld();
				let posLoc = obj.worldToLocal( pos.clone() );	
				let posX = obj.localToWorld( new THREE.Vector3(posLoc.x, 0, 0) );
				posX = new THREE.Vector3().subVectors( posX, obj.position );
				
				let posZ = obj.localToWorld( new THREE.Vector3(0, 0, posLoc.z) ); 
				posZ = new THREE.Vector3().subVectors( posZ, obj.position );	

				obj.userData.x.position.add( posX );
				obj.userData.z.position.add( posZ );
			}		
			
			
			
			let pos2 = new THREE.Vector3().subVectors( pos, obj.position );
			obj.position.add( pos2 );

			
			// по положению точек изменяем форму плоскости 
			if(1 == 1)
			{
				let plane = obj.userData.plane;		
				let point = plane.userData.wtGrid.arrP;
				
				plane.updateMatrixWorld();			
				let ps1 = plane.worldToLocal( point[0].position.clone() );
				let ps2 = plane.worldToLocal( point[1].position.clone() );
				let ps3 = plane.worldToLocal( point[2].position.clone() );
				let ps4 = plane.worldToLocal( point[3].position.clone() );
				
				let x = new THREE.Vector3().subVectors( ps3, ps1 ).x;
				let z = new THREE.Vector3().subVectors( ps2, ps1 ).z;
				
				plane.userData.propObj({type: 'updateShapePlane', obj: plane, size: {x: x, z: z}});	
				plane.userData.propObj({type: 'upShapeGrid', obj: plane});
				
				let offset = pos2.clone().divideScalar( 2 );
				
				plane.position.add( offset );
				infProject.tools.pivot.userData.propPivot({type: 'offsetPivot', offset: offset});
			}
		}		
	}
	

	// ф-ция со всеми действиями плоскости
	function propPlane(params)
	{
		let type = params.type;			
		let obj = params.obj;
		
		if(type == 'addObjButton') { addObjButton({obj: params.obj}); }
		if(type == 'clickObj') { clickObj(); }
		if(type == 'moveObj') { moveObj({obj: params.obj, offset: params.offset}); }
		if(type == 'deleteObj') { deleteObj(); }
		if(type == 'updateShapePlane') { updateShapePlane({size: params.size}); }
		if(type == 'setPointPos') { setPointPos(); }
		if(type == 'setPointVisible') { setPointVisible({show: params.show}); }
		if(type == 'upShapeGrid') { upShapeGrid({obj: params.obj}); }
		if(type == 'deActiveObj') { deActiveObj({moment: params.moment, camera: params.camera, rayhit: params.rayhit}); }
		
		
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
		
		// кликнули на плоскость теплого пола
		function clickObj()
		{
			obj.userData.wtGrid.active = true;
			
			setClickLastObj({obj: obj});
			activeObjRightPanelUI_1({obj: obj});
			outlineAddObj(obj);			
			infProject.tools.pg.activeTool({obj});				

			obj.userData.propObj({type: 'setPointPos', obj: obj});
			obj.userData.propObj({type: 'setPointVisible', obj: obj, show: true});
		
			renderCamera();
		}
		
		function moveObj(params)
		{
			let plane = params.obj;
			let offset = params.offset;
			
			plane.position.add(offset);
			
			let point = plane.userData.wtGrid.arrP;
			
			for (let i = 0; i < point.length; i++)
			{
				point[i].position.add(offset);			
			}			
		}
	
		function deleteObj()
		{
			hideMenuObjUI_2D();
			
			deleteValueFromArrya({arr: infProject.scene.array.wtgrid, o: obj});

			// удаляем точки
			obj.userData.wtGrid.arrP.forEach((o, idx) => { disposeNode(o); scene.remove(o); });				
			
			disposeNode(obj);
			scene.remove(obj);		

			renderCamera();
		}	

		// обновляем форму плоскости
		function updateShapePlane(params)
		{
			let size = params.size;
			
			obj.geometry.dispose();
			
			let v = obj.geometry.vertices; 		
			v[0].x = v[1].x = v[6].x = v[7].x = -size.x/2;
			v[3].x = v[2].x = v[5].x = v[4].x = size.x/2;
			//v[0].y = v[3].y = v[4].y = v[7].y = -0.0025;
			//v[1].y = v[2].y = v[5].y = v[6].y = 0.0025;			
			v[0].z = v[1].z = v[2].z = v[3].z = size.z/2;
			v[4].z = v[5].z = v[6].z = v[7].z = -size.z/2;		

			obj.geometry.verticesNeedUpdate = true; 
			obj.geometry.elementsNeedUpdate = true;

			obj.geometry.computeBoundingBox();
			obj.geometry.computeBoundingSphere();
		}	
	
		// устанавливаем точки по краям плоскости 
		function setPointPos()
		{
			let plane = obj;
			
			let arrPos = [];
			
			plane.geometry.computeBoundingBox();
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.min.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.min.z);
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.min.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.max.z);
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.max.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.max.z);
			arrPos[arrPos.length] = new THREE.Vector3(plane.geometry.boundingBox.max.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.min.z);
			
			plane.updateMatrixWorld();
			let point = plane.userData.wtGrid.arrP;
			
			for (let i = 0; i < arrPos.length; i++)
			{
				arrPos[i] = plane.localToWorld( arrPos[i] );
				point[i].position.copy(arrPos[i]);
				point[i].rotation.copy(plane.rotation);				
			}		
			
			for (let i = 0; i < point.length; i++)
			{
				let dirX = new THREE.Vector3().subVectors( point[i].userData.x.position, point[i].position ).normalize(); 
				let dirZ = new THREE.Vector3().subVectors( point[i].userData.z.position, point[i].position ).normalize(); 

				point[i].userData.dir = {x: dirX, z: dirZ};
			}		
		}		

		
		// скрываем/показываем точки
		function setPointVisible(params)
		{
			let show = params.show;
			
			let arrO = obj.userData.wtGrid.arrP;
			
			for ( let i = 0; i < arrO.length; i++ ) { arrO[i].visible = show; }		
		}	
	
	
		// меняем размер сетки в соответсвии с размером плоскости
		function upShapeGrid(params)
		{	
			let plane = params.obj;
			let grid = plane.userData.wtGrid.gridL;
			
			grid.children.forEach((o, idx) => { o.geometry.dispose(); plane.remove(o); });
			grid.children = [];
			
			plane.geometry.computeBoundingBox();		
			let x = plane.geometry.boundingBox.max.x - plane.geometry.boundingBox.min.x;
			let z = plane.geometry.boundingBox.max.z - plane.geometry.boundingBox.min.z;						
			
			let size = grid.userData.size;
			
			let countX = Math.floor(x/size);
			let countZ = Math.floor(z/size);
			
			let ofssetX = (countX * size) / 2;
			let ofssetZ = (countZ * size) / 2;
			
			// длина линии, центр по середине	
			let geomX = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3( -ofssetZ, 0, 0 ), new THREE.Vector3( ofssetZ, 0, 0 )]);
			let geomZ = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3( -ofssetX, 0, 0 ), new THREE.Vector3( ofssetX, 0, 0 )]);

			
			for ( let i = 0; i <= countX; i ++ ) 
			{
				let lineX = new THREE.Line( geomX, matL );
				lineX.position.x = ( i * size ) - ofssetX;
				lineX.rotation.y = 90 * Math.PI / 180;
				//console.log(( i * size ) - (count * size) / 2);
				grid.add( lineX );
			}

			for ( let i = 0; i <= countZ; i ++ ) 
			{
				let lineZ = new THREE.Line( geomZ, matL );
				lineZ.position.z = ( i * size ) - ofssetZ;
				grid.add( lineZ );
			}			
		}	
	
		
		// деактивируем объект
		function deActiveObj(params)
		{
			let moment = params.moment;
			let camera = params.camera;
			let rayhit = params.rayhit;
			
			let check = false;
			
			if(moment == 'down' && camera == cameraTop) { check = true; }
			else if(moment == 'up' && camera == camera3D) { check = true; }
			else if(moment == ''){}
			else { return; }
			
			
			if(check && rayhit)
			{
				let newObj = rayhit.object;
				
				if(newObj.userData.tag == 'pivot') return;
				if(newObj.userData.tag == 'gizmo') return;
				if(newObj.userData.tag == 'wtPointGrid')
				{
					if(newObj.userData.plane == obj) return;
				}
			}
			
			obj.userData.propObj({type: 'setPointVisible', obj: obj, show: false});
			
			infProject.tools.pg.hide();
			activeObjRightPanelUI_1();		// скрываем UI			
			outlineRemoveObj();								
		}
	
	}	
	
}








