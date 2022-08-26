



// создаем линейку для подложки
function createToolRulerSubstrate()
{
	var x1 = 0.2;
	var x2 = 0.02;
	var k = 0.04;
	
	var g1 = createGeometryCube(1, 0.01, k);	
	var v = g1.vertices; 
	v[3].x = v[2].x = v[5].x = v[4].x = -x2;
	v[0].x = v[1].x = v[6].x = v[7].x = -x1;
	
	var g2 = createGeometryCube(1, 0.01, k);	
	var v = g2.vertices; 			
	v[3].x = v[2].x = v[5].x = v[4].x = x1;
	v[0].x = v[1].x = v[6].x = v[7].x = x2;

	var g3 = createGeometryCube(k, 0.01, 1);	
	var v = g3.vertices; 	
	v[0].z = v[1].z = v[2].z = v[3].z = -x2;
	v[4].z = v[5].z = v[6].z = v[7].z = -x1;
	
	var g4 = createGeometryCube(k, 0.01, 1);	
	var v = g4.vertices; 		
	v[0].z = v[1].z = v[2].z = v[3].z = x1;
	v[4].z = v[5].z = v[6].z = v[7].z = x2;	

	g1.merge(g2);
	g1.merge(g3);
	g1.merge(g4);
	
	var ruler = [];
	var material = new THREE.MeshPhongMaterial( { color : 0x00ff00, transparent: true, opacity: 0.7, lightMap : lightMap_1 } );
	
	ruler[0] = new THREE.Mesh( g1, material );
	ruler[0].userData.tag = "substrate_tool";
	ruler[0].userData.subtool = {};
	ruler[0].userData.subtool.num = 1;
	ruler[0].userData.subtool.line = null;
	ruler[0].visible = false;
	scene.add( ruler[0] );
	ruler[0].position.y = 0.01;	

	
	ruler[1] = new THREE.Mesh( g1, material );
	ruler[1].userData.tag = "substrate_tool";
	ruler[1].userData.subtool = {};
	ruler[1].userData.subtool.num = 2;
	ruler[1].userData.subtool.line = null;
	ruler[1].visible = false;
	scene.add( ruler[1] );
	ruler[1].position.y = 0.01;
	ruler[1].position.z = 1;	


	
	var line = new THREE.Mesh( createGeometryCube(1, 0.01, k/2), new THREE.MeshPhongMaterial( { color : 0xff0000, lightMap : lightMap_1 } ) );
	line.visible = false;
	scene.add( line );	
	
	ruler[0].userData.subtool.line = line;
	ruler[1].userData.subtool.line = line;
	
	setPosRotLineRulerSubstrate({ruler: ruler});

	return ruler;
}



// меняем размер и положении линии для рулетки
function setPosRotLineRulerSubstrate(cdm)
{
	var ruler = cdm.ruler;
	var line = ruler[0].userData.subtool.line;
	
	
	var v = line.geometry.vertices;
	v[3].x = v[2].x = v[5].x = v[4].x = ruler[0].position.distanceTo( ruler[1].position );
	v[0].x = v[1].x = v[6].x = v[7].x = 0;
	line.geometry.verticesNeedUpdate = true; 
	line.geometry.elementsNeedUpdate = true;
	line.geometry.computeBoundingBox();
	line.geometry.computeBoundingSphere();	
	
	line.position.copy(ruler[0].position);
	line.position.y += 0.005;
	
	var dir = new THREE.Vector3().subVectors( ruler[0].position, ruler[1].position ).normalize();
	var angleDeg = Math.atan2(dir.x, dir.z);
	line.rotation.set(0, angleDeg + Math.PI / 2, 0);	
}


// устанавливаем рулетку по центру выбранного плана 
function setStartPositionRulerSubstrate()
{
	var plane = infProject.scene.substrate.active;
	if(!plane) return;
	
	var ruler = infProject.scene.substrate.ruler;
	ruler[0].position.set(plane.position.x, plane.position.y + 0.01, plane.position.z + 1);
	ruler[1].position.set(plane.position.x, plane.position.y + 0.01, plane.position.z - 1);

	setPosRotLineRulerSubstrate({ruler: ruler});	
}


// создаем подложку
function createSubstrate(cdm)
{
	if(!cdm) { cdm = {}; }
	
	var count = 3;
	if(infProject.user.status){ if(infProject.user.status == 'admin'){ count = 5; } }
	
	if(infProject.scene.substrate.floor.length >= count) return;	
	
	var material = new THREE.MeshPhongMaterial({ color: 0xcccccc, transparent: true, opacity: 1, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1, lightMap : lightMap_1 });
	var obj = new THREE.Mesh( createGeometryCube(5, 0.005, 5), material );
	
	obj.position.y = 0.0;
	obj.rotation.y = 0.0;
	obj.userData.tag = "substrate";
	obj.userData.substrate = { p: [], active: false };
	obj.userData.substrate.nameRus = (cdm.nameRus) ? cdm.nameRus : 'этаж';
	obj.userData.substrate.img = null;
	
	scene.add( obj );	
	
	if(cdm.pos)
	{
		if(cdm.pos.x) obj.position.x = cdm.pos.x;
		if(cdm.pos.y) obj.position.y = cdm.pos.y;
		if(cdm.pos.z) obj.position.z = cdm.pos.z;
	}
	
	if(cdm.q)
	{
		obj.quaternion.set(cdm.q.x, cdm.q.y, cdm.q.z, cdm.q.w);
	}

	if(cdm.opacity)
	{
		obj.material.opacity = cdm.opacity;
	}
		
	var p = createPointSubstrate({plane: obj});
	
	p[0].userData.subpoint = {plane: obj, x: p[1], z: p[3], p2: p[2], dir: new THREE.Vector3(), qt: new THREE.Quaternion()};
	p[1].userData.subpoint = {plane: obj, x: p[0], z: p[2], p2: p[3], dir: new THREE.Vector3(), qt: new THREE.Quaternion()};
	p[2].userData.subpoint = {plane: obj, x: p[3], z: p[1], p2: p[0], dir: new THREE.Vector3(), qt: new THREE.Quaternion()};
	p[3].userData.subpoint = {plane: obj, x: p[2], z: p[0], p2: p[1], dir: new THREE.Vector3(), qt: new THREE.Quaternion()};
	
	obj.userData.substrate.p = p;
	
	var n = infProject.scene.substrate.floor.length;
	infProject.scene.substrate.floor[n] = {plane: obj, point: p};
	
	if(cdm.scale)	// подложка загружается из сохраненного проекта (не меняем размер подложки)
	{
		updateSizeSubstrate({obj: obj, size: {x: cdm.scale.x/2, z: cdm.scale.z/2}});
		obj.material.userData.imgUser = true;
	console.log(555, material.userData);	
		if(cdm.img)		 // с изображением
		{			
			setImgCompSubstrate({obj: obj, image: cdm.img});
		}
		else	// без изображения
		{
			setImgUrlSubstrate({obj: obj, img: 'img/lightMap_1.png', scale: cdm.scale});
		}		
	}
	else	// новая подложка созданная из интрефейса
	{
		setImgUrlSubstrate({obj: obj, img: 'img/lightMap_1.png'});
	}
	
	addPlaneListUI({plane: obj});
}




// создаем точки для подложки для изменения размера
function createPointSubstrate(cdm)
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
	var material = new THREE.MeshLambertMaterial( { color : 0x333333, transparent: true, opacity: 1, lightMap : lightMap_1 } );
	
	
	for ( var i = 0; i < 4; i++ )
	{
		var obj = new THREE.Mesh( geometry, material ); 
		obj.userData.tag = "substrate_point";
		obj.position.set(0, plane.position.y, 0);
		obj.userData.subpoint = {};
		
		//obj.visible = false;	
		scene.add( obj );		
		
		arr[i] = obj;
	}		
	
	return arr;
}



// устанавливаем точки по краям подложки 
function setPositionPointSubstrate(cdm)
{
	var plane = cdm.plane;
	var point = plane.userData.substrate.p;
	
	plane.geometry.computeBoundingBox();
	var pos1 = new THREE.Vector3(plane.geometry.boundingBox.min.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.min.z);
	var pos2 = new THREE.Vector3(plane.geometry.boundingBox.min.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.max.z);
	var pos3 = new THREE.Vector3(plane.geometry.boundingBox.max.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.max.z);
	var pos4 = new THREE.Vector3(plane.geometry.boundingBox.max.x, plane.geometry.boundingBox.min.y, plane.geometry.boundingBox.min.z);
	
	plane.updateMatrixWorld();			
	var pos1 = plane.localToWorld( pos1 );
	var pos2 = plane.localToWorld( pos2 );
	var pos3 = plane.localToWorld( pos3 );
	var pos4 = plane.localToWorld( pos4 );
	
	point[0].position.copy(pos1);
	point[1].position.copy(pos2);
	point[2].position.copy(pos3);
	point[3].position.copy(pos4);
	
	point[0].rotation.copy(plane.rotation);
	point[1].rotation.copy(plane.rotation);
	point[2].rotation.copy(plane.rotation);
	point[3].rotation.copy(plane.rotation);	
	
	
	for (var i = 0; i < point.length; i++)
	{
		var dir = new THREE.Vector3().subVectors( point[i].userData.subpoint.p2.position, point[i].position ).normalize(); 
		var qt = quaternionDirection( dir.clone() );
		
		point[i].userData.subpoint.dir = dir;
		point[i].userData.subpoint.qt = qt;
	}		
}





// прячем/показываем линейки и точки подложки, также активируем или деактивируем подложку 
function showHideSubstrate_1(cdm)
{
	if(!infProject.scene.substrate.active) return;
	 
	var ruler = infProject.scene.substrate.ruler;
	var plane = infProject.scene.substrate.active;
	var point = plane.userData.substrate.p;	


	if(cdm.point !== undefined)
	{
		var visible = cdm.point;
		
		for (var i = 0; i < point.length; i++)
		{
			point[i].visible = visible;
		}		
	}			
	
	if(cdm.ruler !== undefined)
	{
		var visible = cdm.ruler;
		
		ruler[0].visible = visible;
		ruler[1].visible = visible;
		ruler[0].userData.subtool.line.visible = visible;	
	}	
	
	renderCamera();
}


// переименовываем этаж
function renameFloor(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;
	if(obj.userData.tag != "substrate") return;
		
	
	var name = document.querySelector('[nameId="rp_floor_name"]').value;
	
	name = name.trim();
	
	if(name == '') return;
	
	obj.userData.substrate.nameRus = name;
	
	for(var i = 0; i < infProject.tools.plane.o1.length; i++)
	{
		if(infProject.tools.plane.o1[i] == obj)
		{ 
			var el = infProject.tools.plane.el[i]; 

			var el_2 = el.querySelector('[nameId="rp_floor_txt_name"]');
			el_2.innerText = name;
			
			break; 
		} 
	}	
}


// устанавливаем высоту плана
function setPlanePositionY(cdm)
{
	if(!cdm) return;

	var plane = infProject.scene.substrate.active;	
	if(!plane) return;
	
	var value = checkNumberInput({ value: cdm.value, unit: 1 });
	var input_height = document.querySelector('[nameId="rp_height_plane"]');
	
	if(!value) 
	{
		input_height.value = Math.round(plane.position.y*100)/100;		
		return;
	}	
	
	plane.position.y = Math.round(value.num*100)/100;	
	input_height.value = plane.position.y;
	
	var ruler = infProject.scene.substrate.ruler;
	ruler[0].position.y = plane.position.y + 0.01;
	ruler[1].position.y = plane.position.y + 0.01;

	setPosRotLineRulerSubstrate({ruler: ruler});
	setPositionPointSubstrate({plane: plane});
	
	renderCamera();	
}



// загрузка img  с компьютера
function readURL(e) 
{
	if (this.files[0]) 
	{	
		var success = true;
		var err = {size: null, type: null};
		var sizeImg = 500;
		
		if(infProject.user.status) { if(infProject.user.status == 'admin'){ sizeImg = 1000; } }	
		
		if(this.files[0].type == "image/png" || this.files[0].type == "image/jpeg"){}
		else { err.type = 'изображение должно быть формата png или jpeg'; success = false; }
		
		if(bytesToSize(this.files[0].size) < sizeImg){}
		else { err.type = 'изображение должно быть меньше 200кб'; success = false; }

		if(success)
		{			
			var reader = new FileReader();
			reader.onload = function (e) 
			{
				document.querySelector('[nameId="rp_floor_img"]').setAttribute('src', e.target.result);										
				setImgCompSubstrate({image: e.target.result});					
			}				
			reader.readAsDataURL(this.files[0]);  					
		}
		else
		{
			var arrTxt = [];
			
			if(err.size) { arrTxt[arrTxt.length] = err.size; }
			if(err.type) { arrTxt[arrTxt.length] = err.type; }
			
			crElWarning_1({title: 'ошибка', arrTxt: arrTxt});
		}
		
	}
}	

// конвертируем размер из байтов в KB
function bytesToSize(bytes) 
{
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2);
}


// создаем сообщение с предупреждением 
function crElWarning_1(cdm)
{
	var arrTxt = cdm.arrTxt;
	var title = (cdm.title) ? cdm.title : null;
	var txt = '';
	
	if(title)
	{
		title = '<div style="font-size: 18px; font-family: arial,sans-serif; color: #222; text-align: center; padding: 10px 30px;">'+title+'</div>';
	}
	
	for (var i = 0; i < arrTxt.length; i++)
	{
		txt += '<div style="font-size: 14px; font-family: arial,sans-serif; color: #666; text-align: center; padding: 10px 30px;">'+arrTxt[i]+'</div>';
	}
	
	var html = 
	`<div style="position: fixed; left: 0; right: 0; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.5); z-index: 100;">
		<div style="display: flex; align-items: center; justify-content: center; width: 400px; height: 200px; background: #fff; border-radius: 6px; cursor: pointer;">
			<div>
				${title}
				${txt}
			</div>
		</div>
	</div>`;
	
	
	var div = document.createElement('div');
	div.innerHTML = html;
	var elem = div.firstChild;	

	var container = document.querySelector('[nameId="frameG"]');
	container.append(elem);

	elem.onmousedown = function(e){ elem.remove(); e.stopPropagation(); };
}




// устанавливаем текстуру по ссылке
function setImgUrlSubstrate(cdm)
{
	//if(!cdm.img) return;
	
	var obj = cdm.obj;
	var img = cdm.img;
	
	if(cdm.pos)
	{
		obj.position.x = cdm.pos.x;
		obj.position.z = cdm.pos.z;
	}
	
	new THREE.TextureLoader().load(infProject.path+'/'+img, function ( image )  
	{
		var material = obj.material;
		material.color = new THREE.Color( 0xffffff );
		var texture = image;			
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
		
		var ratioImg = texture.image.width/texture.image.height;
		
		if(cdm.scale)
		{
			updateSizeSubstrate({obj: obj, size: {x: cdm.scale.x/2, z: cdm.scale.z/2}});
		}
		else
		{
			updateSizeSubstrate({obj: obj, size: {x: ratioImg * 2.5, z: 2.5}});
		}		
				
		var x = (Math.abs(obj.geometry.boundingBox.max.x) + Math.abs(obj.geometry.boundingBox.min.x));
		//var y = (Math.abs(obj.geometry.boundingBox.max.y) + Math.abs(obj.geometry.boundingBox.min.y));
		var z = (Math.abs(obj.geometry.boundingBox.max.z) + Math.abs(obj.geometry.boundingBox.min.z));		
		
		setPositionPointSubstrate({plane: obj});
		
		upUvs_4( obj );		
		
		texture.repeat.x = 1/x; 
		texture.repeat.y = -1/z;			
		
		texture.offset.x += 0.5;
		texture.offset.y += 0.5;
		
		texture.needsUpdate = true;
		
		material.map = texture; 
		material.lightMap = lightMap_1;
		material.needsUpdate = true; 
		
		renderCamera();
	});			
}


// устанавливаем текстуру, которую загрузили с своего компьютера
function setImgCompSubstrate(cdm)
{
	//if(!cdm.img) return;
	
	var image = new Image();
	image.src = cdm.image;
	
	var obj = (cdm.obj) ? cdm.obj : infProject.scene.substrate.active;	
	if(!obj) return;
	 

	image.onload = function() 
	{
		var material = obj.material;
		var texture = new THREE.Texture();
		texture.image = image;
		
		material.color = new THREE.Color( 0xe3e1de );
					
		texture.wrapS = THREE.MirroredRepeat;
		texture.wrapT = THREE.MirroredRepeat;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();		
			
		
		if(material.userData.imgUser)	// не меняем размер подложки
		{
			var x = (Math.abs(obj.geometry.boundingBox.max.x) + Math.abs(obj.geometry.boundingBox.min.x));
			var z = (Math.abs(obj.geometry.boundingBox.max.z) + Math.abs(obj.geometry.boundingBox.min.z));				
			updateSizeSubstrate({obj: obj, size: {x: x/2, z: z/2}});
		}
		else
		{
			var ratioImg = texture.image.width/texture.image.height;
			updateSizeSubstrate({obj: obj, size: {x: ratioImg * 2.5, z: 2.5}});							
		}
		
		var x = (Math.abs(obj.geometry.boundingBox.max.x) + Math.abs(obj.geometry.boundingBox.min.x));
		var z = (Math.abs(obj.geometry.boundingBox.max.z) + Math.abs(obj.geometry.boundingBox.min.z));	
		
		setPositionPointSubstrate({plane: obj});
		
		upUvs_4( obj );
		
		texture.repeat.x = 1/x; 
		texture.repeat.y = -1/z;			
		
		texture.offset.x += 0.5;
		texture.offset.y += 0.5;		
		
		texture.needsUpdate = true;
		
		material.map = texture; 
		material.lightMap = lightMap_1;
		material.needsUpdate = true; 					
				
		//setTransparencySubstrate({value: 100});
		
		obj.userData.substrate.img = true; 
		
		// получаем размеры img в кб
		if(1==2)
		{
			var base64str = image.src.substr(22);
			var decoded = atob(base64str);	
			console.log(image, bytesToSize(decoded.length));				
		}
		
		renderCamera();
	};
		
}



function upUvs_4( obj )
{
	obj.updateMatrixWorld();
	var geometry = obj.geometry;
	
    geometry.faceVertexUvs[0] = [];
	var faces = geometry.faces;
	
    for (var i = 0; i < faces.length; i++) 
	{		
		var components = ['x', 'y', 'z'].sort(function(a, b) {			
			return Math.abs(faces[i].normal[a]) - Math.abs(faces[i].normal[b]);
		});	


        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];				

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(v1[components[0]], v1[components[1]]),
            new THREE.Vector2(v2[components[0]], v2[components[1]]),
            new THREE.Vector2(v3[components[0]], v3[components[1]])
        ]);
    }

    geometry.uvsNeedUpdate = true;
	geometry.elementsNeedUpdate = true; 
}




// кликнули на линейку, подготавляем к перемещению/перемещение линейки 
function clickToolSubstrate({rayhit}) 
{
	let obj = rayhit.object;
	let posOffset = new THREE.Vector3();
	
	start({obj, rayhit});
	camOrbit.stopMove = true;
	setMouseStop(true);
	
	function start({obj, rayhit})
	{
		posOffset = new THREE.Vector3().subVectors( obj.position, rayhit.point );		
		
		planeMath.position.copy( rayhit.point );  
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld();
		
		setClickLastObj({obj});
	}
	
	
	mainDiv_1.onmousemove = (event) => 
	{
		let intersects = rayIntersect( event, planeMath, 'one' ); 		
		if(intersects.length == 0) return;
		
		let pos = new THREE.Vector3().addVectors( intersects[0].point, posOffset );	
		
		let pos2 = new THREE.Vector3().subVectors( pos, obj.position );
		obj.position.add( pos2 );

		// меняем положение линейки 
		setPosRotLineRulerSubstrate({ruler: infProject.scene.substrate.ruler});

		renderCamera();
	};

	mainDiv_1.onmouseup = () => 
	{
		mainDiv_1.onmousemove = null;
		mainDiv_1.onmouseup = null;				
		
		camOrbit.stopMove = false;
		setMouseStop(false);	
		
		renderCamera();
	};			

}




// кликнули на плоскость, подготавляем к перемещению/перемещение плоскости
function clickSubstrate({rayhit}) 
{
	let obj = rayhit.object;
	let posOffset = new THREE.Vector3();
	
	start({obj, rayhit});
	camOrbit.stopMove = true;
	setMouseStop(true);
	
	function start({obj, rayhit})
	{
		posOffset = new THREE.Vector3().subVectors( obj.position, rayhit.point );		
		
		planeMath.position.copy( rayhit.point );  
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld();
		
		setClickLastObj({obj});
	}
	
	
	mainDiv_1.onmousemove = (event) => 
	{
		let intersects = rayIntersect( event, planeMath, 'one' ); 		
		if(intersects.length == 0) return;
		
		let pos = new THREE.Vector3().addVectors( intersects[0].point, posOffset );	
		
		let pos2 = new THREE.Vector3().subVectors( pos, obj.position );
		obj.position.add( pos2 );

		// перемещаем точки и линейку
		if(1==1)
		{
			for (var i = 0; i < obj.userData.substrate.p.length; i++)
			{
				obj.userData.substrate.p[i].position.add( pos2 );
			}

			infProject.scene.substrate.ruler[0].position.add( pos2 );
			infProject.scene.substrate.ruler[1].position.add( pos2 );
			infProject.scene.substrate.ruler[0].userData.subtool.line.position.add( pos2 );		
		}		

		renderCamera();
	};

	mainDiv_1.onmouseup = () => 
	{
		mainDiv_1.onmousemove = null;
		mainDiv_1.onmouseup = null;				
		
		camOrbit.stopMove = false;
		setMouseStop(false);	
		
		renderCamera();
	};			

}



// кликнули точку, подготавляем к перемещению/перемещение точки
function clickPointSubstrate({rayhit})  
{
	let obj = rayhit.object;
	let posOffset = new THREE.Vector3();
	
	start({obj, rayhit});
	camOrbit.stopMove = true;
	setMouseStop(true);
	
	function start({obj, rayhit})
	{
		posOffset = new THREE.Vector3().subVectors( obj.position, rayhit.point );		
		
		planeMath.position.copy( rayhit.point );  
		planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld();
		
		setClickLastObj({obj});
	}
	
	
	mainDiv_1.onmousemove = (event) => 
	{
		let intersects = rayIntersect( event, planeMath, 'one' ); 		
		if(intersects.length == 0) return;
		
		let pos = new THREE.Vector3().addVectors( intersects[0].point, posOffset );	

		// равномерное перемещение по осям xz
		if(1==1)
		{
			let ps = obj.userData.subpoint.p2.position;
			let dir = obj.userData.subpoint.dir;
			let qt = obj.userData.subpoint.qt;  
			
			let v1 = localTransformPoint( new THREE.Vector3().subVectors( ps, pos ), qt ); 
			if(v1.z < 0.5) { v1.z = 0.5; }   
			v1 = new THREE.Vector3().addScaledVector( dir, -v1.z );
			pos = new THREE.Vector3().addVectors( ps, v1 );		
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

			obj.userData.subpoint.x.position.add( posX );
			obj.userData.subpoint.z.position.add( posZ );
		}		
		
		let pos2 = new THREE.Vector3().subVectors( pos, obj.position );
		obj.position.add( pos2 );

		
		// по положению точек изменяем форму плоскости 
		if(1 == 1)
		{
			let plane = obj.userData.subpoint.plane;		
			let point = plane.userData.substrate.p;
			
			plane.updateMatrixWorld();			
			let ps1 = plane.worldToLocal( point[0].position.clone() );
			let ps2 = plane.worldToLocal( point[1].position.clone() );
			let ps3 = plane.worldToLocal( point[2].position.clone() );
			let ps4 = plane.worldToLocal( point[3].position.clone() );
			
			let x = new THREE.Vector3().subVectors( ps3, ps1 ).x;
			let z = new THREE.Vector3().subVectors( ps2, ps1 ).z;
			
			updateSizeSubstrate({obj: plane, size: {x: x/2, z: z/2}});
			
			plane.position.add( pos2.clone().divideScalar( 2 ) );
		}		

		renderCamera();
	};

	mainDiv_1.onmouseup = () => 
	{
		mainDiv_1.onmousemove = null;
		mainDiv_1.onmouseup = null;				
		
		camOrbit.stopMove = false;
		setMouseStop(false);		
		
		renderCamera();
	};			

}







// обновляем размеры плоскости при ее изменении 
function updateSizeSubstrate(cdm)
{
	var obj = cdm.obj; 
	var size = cdm.size;
	
	obj.geometry.dispose();
	var v = obj.geometry.vertices; 		
	v[0].x = v[1].x = v[6].x = v[7].x = -size.x;
	v[3].x = v[2].x = v[5].x = v[4].x = size.x;

	v[0].y = v[3].y = v[4].y = v[7].y = -0.0025;
	v[1].y = v[2].y = v[5].y = v[6].y = 0.0025;
	
	v[0].z = v[1].z = v[2].z = v[3].z = size.z;
	v[4].z = v[5].z = v[6].z = v[7].z = -size.z;		

	obj.geometry.verticesNeedUpdate = true; 
	obj.geometry.elementsNeedUpdate = true;

	obj.geometry.computeBoundingBox();
	obj.geometry.computeBoundingSphere();
}




// изменяем размер плана в соответствии с его реальным размером
function assignSizeSubstrate()
{
	var input_size = document.querySelector('[nameId="input_size_substrate"]');
	var size = input_size.value;
	var value = checkNumberInput({ value: size, unit: 1, abs: true, limit: {min: 0.01, max: 1000} });
	
	if(!value) 
	{
		input_size.value = 1;
		
		return;
	}	
	
	var plane = infProject.scene.substrate.active;	
	if(!plane) return;
	
	var ruler = infProject.scene.substrate.ruler;	
	var dist = ruler[0].position.distanceTo( ruler[1].position );
	var ratio = value.num/dist;
	
	plane.geometry.computeBoundingBox();	
	var x = (Math.abs(plane.geometry.boundingBox.max.x) + Math.abs(plane.geometry.boundingBox.min.x));
	var z = (Math.abs(plane.geometry.boundingBox.max.z) + Math.abs(plane.geometry.boundingBox.min.z));

	x /= 2;
	z /= 2;
	
	updateSizeSubstrate({obj: plane, size: {x: x*ratio, z: z*ratio}});
		
	// устанавливаем линейку со смещенем в соотвестии с изменившимся размером подложки 
	if(1==1)
	{	
		var v1 = plane.worldToLocal( ruler[0].position.clone() );
		var v2 = plane.worldToLocal( ruler[1].position.clone() );		
		
		var v1 = new THREE.Vector3().addScaledVector( v1, ratio );
		var v2 = new THREE.Vector3().addScaledVector( v2, ratio );
		
		var v1 = plane.localToWorld( v1.clone() ); 
		var v2 = plane.localToWorld( v2.clone() ); 
		
		ruler[0].position.x = v1.x;
		ruler[0].position.z = v1.z; 	
		ruler[1].position.x = v2.x;
		ruler[1].position.z = v2.z;	

		setPosRotLineRulerSubstrate({ruler: ruler});
	}
	
	input_size.value = value.num;
	
	setPositionPointSubstrate({plane: plane});
	
	renderCamera();
}



// вращение плоскости
function setRotateSubstrate(cdm)
{
	if(!cdm) return;

	var plane = infProject.scene.substrate.active;	
	if(!plane) return;
	
	var value = checkNumberInput({ value: cdm.angle, unit: 1 });
	
	var input_rotate = document.querySelector('[nameId="input_rotate_substrate"]');
	 
	if(!value) 
	{
		input_rotate.value = Math.abs(Math.round( THREE.Math.radToDeg(plane.rotation.y) ));		
		return;
	}	
	
	if(cdm.set)
	{
		plane.rotation.y = THREE.Math.degToRad(value.num * -1);
	}
	else
	{
		plane.rotation.y -= THREE.Math.degToRad(value.num);
	}	
	
	input_rotate.value = Math.abs(Math.round( THREE.Math.radToDeg(plane.rotation.y) ));
	
	setPositionPointSubstrate({plane: plane});
	
	renderCamera();
}




// установить прозрачность плана
function setTransparencySubstrate(cdm)
{
	var value = cdm.value;
	
	var plane = infProject.scene.substrate.active;	
	if(!plane) return;
	
	plane.material.opacity = value/100;
	plane.material.needsUpdate = true; 					
	
	document.querySelector('[nameId="input_transparency_substrate"]').value = value;
	
	renderCamera();	
}



// удаляем план
function deleteSubstrate(cdm)
{
	if(!cdm) cdm = {}; 
	//var plane = cdm.plane;
	
	var plane = infProject.scene.substrate.active;	
	if(!plane) return;

	var point = plane.userData.substrate.p;		
	
	showHideSubstrate_1({point: false, ruler: false});
	
	var num = -1;
	for ( var i = 0; i < infProject.scene.substrate.floor.length; i++ )
	{ 
		if(infProject.scene.substrate.floor[i].plane == plane) 
		{
			num = i;
			break;
		}
	}	
	
	removePlaneListUI_2({plane: plane});
	
	deleteValueFromArrya({arr : infProject.scene.substrate.floor, o : infProject.scene.substrate.floor[num]});	
	
	disposeNode(plane);
	scene.remove(plane);
	
	for ( var i = 0; i < point.length; i++ )
	{ 
		disposeNode(point[i]);
		scene.remove(point[i]); 
	}
	
	infProject.scene.substrate.active = null;	// деактивируем активный этаж

	renderCamera();	
}




