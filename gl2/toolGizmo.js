

function crGizmo(params) 
{
	let container = params.container;
	
	let gizmo = crObj();
	
	let ui = {};
	ui.rot = {};
	ui.rot.x = document.querySelector('[nameId="object_rotate_X"]');
	ui.rot.y = document.querySelector('[nameId="object_rotate_Y"]');
	ui.rot.z = document.querySelector('[nameId="object_rotate_Z"]');
	


	function crObj() 
	{
		let gizmo = new THREE.Group();
		gizmo.userData.startPos = new THREE.Vector3();
		gizmo.userData.dir = new THREE.Vector3();
		gizmo.userData.gizmo = {};
		gizmo.userData.gizmo.obj = null;
		gizmo.userData.gizmo.arrO = [];		// группа объектов			
		gizmo.userData.propGizmo = propGizmo;
		
		
		let arr = [];
		arr[0] = {axis: 'x', rot: new THREE.Vector3(0, 0, 0), color: 'rgb(17, 255, 0)'};
		arr[1] = {axis: 'y', rot: new THREE.Vector3(0, 0, Math.PI/2), color: 'rgb(247, 72, 72)'};
		arr[2] = {axis: 'z', rot: new THREE.Vector3(Math.PI/2, 0, 0), color: 'rgb(72, 116, 247)'};	
		
		let geom1 = crGeom({size: 0.03});
		let geom2 = crGeom({size: 0.01});
		
		for ( let i = 0; i < arr.length; i++ )
		{
			let mat1 = new THREE.MeshStandardMaterial({ color: arr[i].color, depthTest: false, transparent: true, opacity: 1.0 });
			mat1.visible = false;

			let obj = new THREE.Mesh( geom1, mat1 );
			obj.userData.tag = 'gizmo'; 
			obj.userData.axis = arr[i].axis;		
			obj.rotation.set( arr[i].rot.x, arr[i].rot.y, arr[i].rot.z );
			
			let mat2 = new THREE.MeshStandardMaterial({ color: arr[i].color, depthTest: false, transparent: true, clippingPlanes: [new THREE.Plane()], lightMap: lightMap_1 });
			let obj2 = new THREE.Mesh( geom2, mat2 );			
			obj.add( obj2 );			
			
			gizmo.add( obj );
		}
		
		crSphere();
		
		// Sphere
		function crSphere()
		{			
			let geometry = new THREE.SphereGeometry( 0.98*0.5, 32, 32 );
			let material = new THREE.MeshStandardMaterial({color: 0x000000, depthTest: false, transparent: true, opacity: 0.1});
			let sphere = new THREE.Mesh( geometry, material );
			gizmo.add( sphere );			
		}
		
		
		infProject.tools.gizmo = gizmo;
		gizmo.visible = false;
		scene.add( gizmo );

		return gizmo;
	}
	
	
	function crGeom(params)
	{
		let size = params.size;
		
		let count = 68; 
		let circle = [];
		let g = (Math.PI * 2) / count;
		
		for ( let i = 0; i < count; i++ )
		{
			let angle = g * i;
			circle[i] = new THREE.Vector3();
			circle[i].x = Math.sin(angle)*0.5;
			circle[i].z = Math.cos(angle)*0.5;
			//circle[i].y = 0;
		}	

		
		let pipeSpline = new THREE.CatmullRomCurve3(circle);
		pipeSpline.curveType = 'catmullrom';
		pipeSpline.tension = 0;	

		let geometry = new THREE.TubeBufferGeometry( pipeSpline, circle.length, size, 12, true );
		
		return geometry;
	}
	

	// ф-ция со всеми действиями Pivot
	function propGizmo(params)
	{
		let type = params.type;			
		
		if(type == 'clippingGizmo') { clippingGizmo(); }		
		if(type == 'setGizmo') { setGizmo({obj: params.obj, pos: params.pos, qt: params.qt}); }
		if(type == 'updateScale') { updateScale(); }
		if(type == 'hide') { hide(); }
		if(type == 'updateGizmoRotUI') { updateGizmoRotUI(); }
		
		
		
		if(type == 'addEvent') { addEvent({rayhit: params.rayhit}); }		
		if(type == 'offsetPivot') { offsetPivot({offset: params.offset}); }				
		if(type == 'inputPosPivot') { inputPosPivot(); }
		


		// прячем текстуру если она находится за плоскостью 
		function clippingGizmo() 
		{
			if (!gizmo.visible) return;
			
			
			if(camera == cameraTop)
			{
				let plane = new THREE.Plane(new THREE.Vector3(0,1,0), 100);
				gizmo.children[0].children[0].material.clippingPlanes[0].copy(plane);		
			}
			else
			{
				let obj = new THREE.Object3D();
				
				obj.position.copy(gizmo.position);
				
				obj.lookAt(camera3D.position);
				obj.rotateOnAxis(new THREE.Vector3(0,1,0), -Math.PI / 2);
				obj.updateMatrixWorld();
	
				let plane = new THREE.Plane();
				plane.applyMatrix4(obj.matrixWorld);	
				
				gizmo.children[0].children[0].material.clippingPlanes[0].copy(plane);
				gizmo.children[1].children[0].material.clippingPlanes[0].copy(plane);
				gizmo.children[2].children[0].material.clippingPlanes[0].copy(plane);		
			}

		}		

		// установить и показать Pivot
		function setGizmo(params)
		{
			let obj = params.obj;
			let pos = params.pos;
			let qt = params.qt;
			
			gizmo.visible = true;	
			gizmo.userData.gizmo.obj = obj;
			gizmo.userData.gizmo.arrO = arrObjFromGroup({obj: obj});
			gizmo.position.copy(pos);
			gizmo.quaternion.copy(qt);
			
			let visible = (camera == cameraTop) ? false : true;			
			gizmo.children[1].visible = visible;
			gizmo.children[2].visible = visible;			
	
			
			
			gizmo.userData.propGizmo({type: 'updateGizmoRotUI'});
			gizmo.userData.propGizmo({type: 'updateScale'});
			gizmo.userData.propGizmo({type: 'clippingGizmo'});
		}


		function updateScale() 
		{
			if (!gizmo.visible) return;
			
			let scale = 1;
			
			if(camera == cameraTop) { scale = 1 / cameraTop.zoom; }
			if(camera == camera3D) { scale = camera3D.position.distanceTo(gizmo.position) / 6; }			
			
			gizmo.scale.set(scale, scale, scale);
		}
		
		
		function hide() 
		{
			gizmo.visible = false;
			gizmo.userData.gizmo.obj = null;
			gizmo.userData.gizmo.arrO = [];
		}		
		
		
		// обновляем меню позиция
		function updateGizmoRotUI()
		{
			let rot = gizmo.rotation;
			
			ui.rot.x.value = Math.round(THREE.Math.radToDeg(rot.x));
			ui.rot.y.value = Math.round(THREE.Math.radToDeg(rot.y));
			ui.rot.z.value = Math.round(THREE.Math.radToDeg(rot.z));				
		}
		
		
		
		function addEvent(params)
		{
			startPivot(params);
			
			setMouseStop(true);
			
			container.onmousemove = (e) => 
			{
				movePivot({event: e});		
				
				renderCamera();
			};

			container.onmouseup = (e) => 
			{
				container.onmousemove = null;
				container.onmouseup = null;
				
				setMouseStop(false);
				
				let obj = infProject.tools.pivot.userData.pivot.obj;	
				if(!obj) setClickLastObj({obj: obj});	

				
				stopCameraTop();
				stopCamera3D();
				stopCameraView();

				renderCamera();
			};			
		}

		// подготавливаем pivot
		function startPivot(params)
		{
			let rayhit = params.rayhit;
			
			let obj = rayhit.object;  			
			
			let axis = obj.userData.axis;	
			
			pivot.updateMatrixWorld();
			pivot.userData.startPos = rayhit.point.clone();
			pivot.userData.dir = null;				
				
			
			if(axis == 'xz' || axis == 'center')
			{ 
				planeMath.rotation.set( Math.PI/2, 0, 0 ); 
			}		 
			else
			{				
				pivot.userData.dir = new THREE.Vector3().subVectors(pivot.position, obj.getWorldPosition(new THREE.Vector3())).normalize();
				planeMath.quaternion.copy( quaternionDirection( pivot.userData.dir ) ); 
				planeMath.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2, 0, 0)));
			}
			
			
			planeMath.position.copy( rayhit.point );
			
			setClickLastObj({obj: infProject.tools.pivot.userData.pivot.obj});
		} 		
	
	
		// перемещение pivot
		function movePivot(params)
		{
			let event = params.event;
			
			let rayhit = rayIntersect( event, planeMath, 'one' ); 			
			if(rayhit.length == 0) return;
			
			let obj = pivot.userData.pivot.obj;
			let pos = rayhit[0].point;
					
			
			if(pivot.userData.dir)
			{
				let dist = pivot.userData.dir.dot(new THREE.Vector3().subVectors(pos, pivot.userData.startPos));
				pos = pivot.userData.startPos.clone().add(new THREE.Vector3().addScaledVector(pivot.userData.dir, dist));				
			}		

			
			let offset = new THREE.Vector3().subVectors( pos, pivot.userData.startPos );
			
			pivot.userData.propPivot({type: 'offsetPivot', offset: offset});
			
			movePivot_2({obj: obj, arrO: pivot.userData.pivot.arrO, pos2: offset});
		}
		
		
		function offsetPivot(params)
		{
			let offset = params.offset;
			pivot.position.add( offset );
			pivot.userData.startPos.add( offset );
			
			gizmo.userData.propGizmo({type: 'updateGizmoRotUI'});
			pivot.userData.propPivot({type: 'updatePosUI'});
			pivot.userData.propPivot({type: 'updateScale'});
		}			
		
		// прекращаем действия с pivot
		function endPivot(params)
		{
			
		}
		
		


		// меняем положение объекта через input
		function inputPosPivot()
		{
			if (!pivot.visible) return;
			
			
			let x = ui.pos.x.value;
			let y = ui.pos.y.value;
			let z = ui.pos.z.value;

			x = checkNumberInput({ value: x, unit: 1 });
			y = checkNumberInput({ value: y, unit: 1 });
			z = checkNumberInput({ value: z, unit: 1 });
			
			// не числовое значение
			if(!x || !y || !z)
			{		
				gizmo.userData.propGizmo({type: 'updateGizmoRotUI'});
				return;
			}	
			
				
			let offset = new THREE.Vector3(x.num, y.num, z.num).sub(pivot.position);
			
			pivot.userData.propPivot({type: 'offsetPivot', offset: offset});
						
			movePivot_2({obj: pivot.userData.pivot.obj, arrO: pivot.userData.pivot.arrO, pos2: offset});
				

			renderCamera();
		}		



		
		
	}
	
	 

}








