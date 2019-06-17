




function createGrid(cdm)
{
	var lineGrid = new THREE.Group();
	
	var size = (cdm.size) ? cdm.size : 0.2;
	size = Math.round(size * 100)/100; 
	var count = (cdm.count) ? cdm.count : (10/size);
	
	var geom_line = new THREE.Geometry();
	var count_grid1 = count;
	var count_grid2 = (count_grid1 * size) / 2; 
	geom_line.vertices.push(new THREE.Vector3( - count_grid2, 0, 0 ) );
	geom_line.vertices.push(new THREE.Vector3( count_grid2, 0, 0 ) );
	
	var color = 0xd6d6d6;
	
	if(cdm.color) { color = cdm.color; }
	
	var linesMaterial = new THREE.LineBasicMaterial( { color: color, opacity: 1 } );

	for ( var i = 0; i <= count_grid1; i ++ ) 
	{
		var line = new THREE.Line( geom_line, linesMaterial );
		line.position.z = ( i * size ) - count_grid2;
		line.position.y = -0.01;
		lineGrid.add( line );

		var line = new THREE.Line( geom_line, linesMaterial );
		line.position.x = ( i * size ) - count_grid2;
		line.position.y = -0.01;
		line.rotation.y = 90 * Math.PI / 180;
		lineGrid.add( line );
	}
	
	scene.add( lineGrid );	

	
	lineGrid.userData.mouse = { down: false, move: false, up: false, startPos: new THREE.Vector3() };
	lineGrid.userData.size = size;
	lineGrid.userData.count = cdm.count;
	lineGrid.userData.color = (cdm.uColor) ? cdm.uColor : lineGrid.children[0].material.color.clone();

	
	$('[nameid="size-grid-tube-xy-1"]').val(Math.round(size * 100));	// перводим в см	
	
	
	if(cdm.pos)
	{
		if(cdm.pos.x) lineGrid.position.x = cdm.pos.x;
		if(cdm.pos.y) lineGrid.position.y = cdm.pos.y;
		if(cdm.pos.z) lineGrid.position.z = cdm.pos.z;
	}
	
	return lineGrid;
}


// обновляем размер ячейки
function updateGrid(cdm)
{
	var grid = infProject.scene.grid.obj;
	
	var size = checkNumberInput({ value: cdm.size, unit: 0.01, limit: {min: 0.05, max: 5} });
	
	if(!size) 
	{
		var size = grid.userData.size * 100; // перводим в см
		$('[nameid="size-grid-tube-xy-1"]').val(size);
		
		return;
	}
	
	
	var pos = grid.position.clone();
	var color = grid.children[0].material.color.clone();
	var uColor = grid.userData.color.clone();
	var count = grid.userData.count;
	
	scene.remove( grid );
	
	infProject.scene.grid.obj = createGrid({pos: pos, color: color, size: size, uColor : uColor});
	
	renderCamera();
}



// вкл/выкл режим перемещения grid
function startEndMoveGrid()
{
	var grid = infProject.scene.grid.obj;
	
	if(!infProject.scene.grid.active)
	{
		for(var i = 0; i < grid.children.length; i++)
		{
			grid.children[i].material.color = new THREE.Color(infProject.listColor.active2D);
		}
		
		infProject.scene.grid.active = true;		
	}
	else
	{
		for(var i = 0; i < grid.children.length; i++)
		{
			grid.children[i].material.color = grid.userData.color.clone();
		}

		infProject.scene.grid.active = false;
	}
}



function clickDownGrid(event)
{
	var grid = infProject.scene.grid.obj;
	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	if(intersects.length == 0) return;

	//grid.userData.mouse.startPos = intersects[0].point.clone();
	grid.userData.mouse.offset = new THREE.Vector3().subVectors( intersects[0].point, grid.position );
	grid.userData.mouse.down = true;
}


function moveGrid(event)
{
	var grid = infProject.scene.grid.obj;
	
	if(!grid.userData.mouse.down) return;
	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	if(intersects.length == 0) return;

	grid.position.x = intersects[0].point.x - grid.userData.mouse.offset.x;
	grid.position.z = intersects[0].point.z - grid.userData.mouse.offset.z;

	return true;
}



function clickUpGrid()
{
	var grid = infProject.scene.grid.obj;
	
	grid.userData.mouse.down = false;
}




