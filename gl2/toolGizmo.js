

function crGizmo(params) 
{
	let container = params.container;
	
	let gizmo = crObj();
	eventButton();
	
	let ui = {};
	
	ui.rot = {};
	ui.rot.x = document.querySelector('[nameId="object_rotate_X"]');
	ui.rot.y = document.querySelector('[nameId="object_rotate_Y"]');
	ui.rot.z = document.querySelector('[nameId="object_rotate_Z"]');
	
	ui.pos = {};
	ui.pos.x = document.querySelector('[nameId="object_pos_X"]');
	ui.pos.y = document.querySelector('[nameId="object_pos_Y"]');
	ui.pos.z = document.querySelector('[nameId="object_pos_Z"]');
	
	
	function eventButton()
	{
		document.querySelector('[nameId="obj_rotate_X_90"]').onmousedown = function(e){ setRotationGizmo({axis: 'x', angle: 90}); e.stopPropagation(); };
		document.querySelector('[nameId="obj_rotate_X_90m"]').onmousedown = function(e){ setRotationGizmo({axis: 'x', angle: -90}); e.stopPropagation(); };
		document.querySelector('[nameId="obj_rotate_Y_90"]').onmousedown = function(e){ setRotationGizmo({axis: 'y', angle: 90}); e.stopPropagation(); };
		document.querySelector('[nameId="obj_rotate_Y_90m"]').onmousedown = function(e){ setRotationGizmo({axis: 'y', angle: -90}); e.stopPropagation(); };
		document.querySelector('[nameId="obj_rotate_Z_90"]').onmousedown = function(e){ setRotationGizmo({axis: 'z', angle: 90}); e.stopPropagation(); };
		document.querySelector('[nameId="obj_rotate_Z_90m"]').onmousedown = function(e){ setRotationGizmo({axis: 'z', angle: -90}); e.stopPropagation(); };

		document.querySelector('[nameId="obj_rotate_reset"]').onmousedown = function(e){ gizmo.userData.propGizmo({type: 'resetRot'}); e.stopPropagation(); };		
	}

	function crObj() 
	{
		let gizmo = new THREE.Group();
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
		if(type == 'addEvent') { addEvent({rayhit: params.rayhit}); }
		if(type == 'rotObjs') { rotObjs({pos: params.pos, arrO: params.arrO, q_Old: params.q_Old, rotY_Old: params.rotY_Old}); }
		if(type == 'updateScale') { updateScale(); }
		if(type == 'hide') { hide(); }
		if(type == 'inputRotGizmo') { inputRotGizmo(); }
		if(type == 'resetRot') { resetRot(); }
		if(type == 'updateGizmoRotUI') { updateGizmoRotUI(); }
		if(type == 'updateGizmoPosUI') { updateGizmoPosUI(); }	
		
		


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
			gizmo.userData.propGizmo({type: 'updateGizmoPosUI'});
			gizmo.userData.propGizmo({type: 'updateScale'});
			gizmo.userData.propGizmo({type: 'clippingGizmo'});
		}


		function addEvent(params)
		{
			startGizmo(params);
			
			setMouseStop(true);
			
			container.onmousemove = (e) => 
			{
				moveGizmo({event: e});		
				
				renderCamera();
			};

			container.onmouseup = (e) => 
			{
				container.onmousemove = null;
				container.onmouseup = null;
				
				setMouseStop(false);
				
				//let obj = infProject.tools.pivot.userData.pivot.obj;	
				//if(!obj) setClickLastObj({obj: obj});	

				
				stopCameraTop();
				stopCamera3D();
				stopCameraView();

				renderCamera();
			};			
		}


		// подготавливаем gizmo
		function startGizmo(params)
		{
			let rayhit = params.rayhit;
			
			let obj = rayhit.object;  									
			
			planeMath.quaternion.copy( obj.getWorldQuaternion(new THREE.Quaternion()) );
			planeMath.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2, 0, 0)));			
			planeMath.position.copy( gizmo.position );
			
			planeMath.updateMatrixWorld();			
			let dir = planeMath.worldToLocal(rayhit.point.clone());
			gizmo.userData.rotY = Math.atan2(dir.x, dir.y);			
			gizmo.userData.dir = new THREE.Vector3().subVectors(planeMath.localToWorld( new THREE.Vector3( 0, 0, -1 ) ), planeMath.position).normalize();
			
			setClickLastObj({obj: gizmo.userData.gizmo.obj});
		} 


		// вращение gizmo
		function moveGizmo(params)
		{
			let event = params.event;
			
			let rayhit = rayIntersect( event, planeMath, 'one' ); 			
			if(rayhit.length == 0) return;
			
			let q_Old = gizmo.quaternion.clone();
			let rotY_Old = gizmo.userData.rotY;
			
			let dir = planeMath.worldToLocal(rayhit[0].point.clone());
			let rotY = Math.atan2(dir.x, dir.y);	
			
			//gizmo.rotateOnWorldAxis(gizmo.userData.dir, rotY - gizmo.userData.rotY);
			let q = new THREE.Quaternion().setFromAxisAngle(gizmo.userData.dir, rotY - gizmo.userData.rotY);
			gizmo.quaternion.copy(q.clone().multiply(gizmo.quaternion));
			gizmo.userData.rotY = rotY;
			
			gizmo.userData.propGizmo({type: 'updateGizmoRotUI'});							
			gizmo.userData.propGizmo({type: 'rotObjs', pos: gizmo.position, arrO: gizmo.userData.gizmo.arrO, rotY_Old: rotY_Old});	
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
			


		// вращаем объекты
		function rotObjs(params)
		{
			let pos = params.pos;
			let arrO = params.arrO;
			let rotY_Old = params.rotY_Old;
			let q_Old = params.q_Old;
			
			
			if(rotY_Old)		// вращение по оси
			{
				let dir = gizmo.userData.dir;
				let rotY = gizmo.userData.rotY;
				
				for (let i = 0; i < arrO.length; i++)
				{
					arrO[i].position.sub(pos);
					arrO[i].position.applyAxisAngle(dir, rotY - rotY_Old);
					arrO[i].position.add(pos);

					arrO[i].rotateOnWorldAxis(dir, rotY - rotY_Old);				
				}
			}
			else if(q_Old) 		// вращение по quaternion
			{
				let q_Offset = gizmo.quaternion.clone().multiply(q_Old.clone().inverse());
				
				for (let i = 0; i < arrO.length; i++)
				{
					arrO[i].position.sub(pos);
					arrO[i].position.applyQuaternion(q_Offset);
					arrO[i].position.add(pos);

					arrO[i].quaternion.copy(q_Offset.clone().multiply(arrO[i].quaternion));		// q_Offset разницу умнажаем, чтобы получить то же угол	
					//arrO[i].updateMatrixWorld();					
				}			
			}	
		}		
		
		// прекращаем действия с gizmo
		function endGizmo(params)
		{
			
		}
		
		


		// меняем положение объекта через input
		function inputRotGizmo()
		{
			//if (!gizmo.visible) return;
			
			
			let x = ui.rot.x.value;
			let y = ui.rot.y.value;
			let z = ui.rot.z.value;

			x = checkNumberInput({ value: x, unit: 1 });
			y = checkNumberInput({ value: y, unit: 1 });
			z = checkNumberInput({ value: z, unit: 1 });
			
			// не числовое значение
			if(!x || !y || !z)
			{		
				gizmo.userData.propGizmo({type: 'updateGizmoRotUI'});
				return;
			}	
			
			x = THREE.Math.degToRad(x.num);
			y = THREE.Math.degToRad(y.num);
			z = THREE.Math.degToRad(z.num);				
			
			let q_Old = gizmo.quaternion.clone();
			
			let rot = new THREE.Euler().set(x, y, z);
			let q = new THREE.Quaternion().setFromEuler(rot)
			gizmo.quaternion.copy(q);
			
			gizmo.userData.propGizmo({type: 'updateGizmoRotUI'});
			gizmo.userData.propGizmo({type: 'rotObjs', pos: gizmo.position, arrO: gizmo.userData.gizmo.arrO, q_Old: q_Old});

			renderCamera();
		}		

		
		// сбрасываем rotation
		function resetRot()
		{
			ui.rot.x.value = 0;
			ui.rot.y.value = 0;
			ui.rot.z.value = 0;
			
			gizmo.userData.propGizmo({type: 'inputRotGizmo'});
		}

		// обновляем меню поворота
		function updateGizmoRotUI()
		{
			let rot = gizmo.rotation;
			
			ui.rot.x.value = Math.round(THREE.Math.radToDeg(rot.x));
			ui.rot.y.value = Math.round(THREE.Math.radToDeg(rot.y));
			ui.rot.z.value = Math.round(THREE.Math.radToDeg(rot.z));				
		}

		// обновляем меню позиция
		function updateGizmoPosUI()
		{
			let pos = gizmo.position;
			
			ui.pos.x.value = Math.round(pos.x * 100) / 100;
			ui.pos.y.value = Math.round(pos.y * 100) / 100;
			ui.pos.z.value = Math.round(pos.z * 100) / 100;				
		}		
		
	}

}








