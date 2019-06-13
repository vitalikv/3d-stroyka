

$('[data-action="top_panel_1"]').mousemove(function (e) { e.stopPropagation(); });
		
$('[data-action="top_panel_1"]').mousedown(function () { return clickInterface(); });
$('[data-action="left_panel_1"]').mousedown(function () { return clickInterface(); });


$('[data-action="2D"]').on('mousedown', function(e) { return clickInterface({button:'2D'}); }); 	
$('[data-action="3D"]').mousedown(function () { return clickInterface({button:'3D'}); }); 	
$('[data-action="wall"]').mousedown(function () { return clickInterface({button:'point_1'}); });
$('[data-action="create_tube_1"]').mousedown(function () { return clickInterface({button:'create_tube_1'}); }); 
$('[data-action="create_wd_1"]').mousedown(function () { return clickInterface({button:'create_wd_1'}); });
$('[data-action="create_wd_2"]').mousedown(function () { return clickInterface({button:'create_wd_2'}); });
$('[data-action="create_wd_3"]').mousedown(function () { return clickInterface({button:'create_wd_3'}); });
$('[data-action="screenshot"]').mousedown(function () { saveAsImage(); return false; }); 				



$('[link_form]').mousedown(function () 
{ 
	createForm({form : 'shape'+$(this).attr("link_form")}); 
	$('[data-action="modal"]').css({"display":"none"}); 
}); 


 
$("input").mousedown(function (e) { editText($(this)); e.stopPropagation(); }); 
$("input").mousemove(function (e) { return false; });


$('[data-action="deleteObj"]').mousedown(function () { detectDeleteObj(); return false; });
$('[data-action="addPointCenterWall"]').mousedown(function () { addPointCenterWall(); return false; });


$('input').on('focus', function () {  });
$('input').on('focus keyup change', function () 
{ 
	infProject.activeInput = $(this).data('action');
	if($(this).data('action') == undefined) { infProject.activeInput = $(this).data('input');  }
});
$('input').blur(function () { infProject.activeInput = ''; });	


$('[data-action="estimate"]').mousedown(function () 
{ 
	createEstimateJson();
	$('.modal').css({"display":"block"});
	$('[modal_body="estimate"]').css({"display":"block"}); 
	$('[modal_body="form"]').css({"display":"none"});
	$('[modal_title="estimate"]').css({"display":"block"});
	$('[modal_title="form"]').css({"display":"none"});			
}); 

$('[data-action="form_1"]').mousedown(function () 
{ 
	console.log('form_1');
	getFormWallR_1();
	checkClickUINameID('form_1');
	infProject.scene.block.key.scroll = true;
	clickInterface();
	$('.modal').css({"display":"block"});
	$('[modal_body="estimate"]').css({"display":"none"});
	$('[modal_body="form"]').css({"display":"block"});
	$('[modal_title="estimate"]').css({"display":"none"});
	$('[modal_title="form"]').css({"display":"block"});
});


$('[data-action="modal_window"]').mousedown(function () { return false; });		


$('[data-action="modal"]').mousedown(function () 
{	
	infProject.scene.block.key.scroll = false;
	checkChangeFormWallR();			
	clickInterface(); 
	$('[data-action="modal"]').css({"display":"none"}); 
})
;			
$('[data-action="modal_window_close"]').mousedown(function () 
{  
	infProject.scene.block.key.scroll = false;
	checkChangeFormWallR();
	$('[data-action="modal"]').css({"display":"none"}); 
});
  
  
function editText(input) 
{
	infProject.activeDiv = input;
	infProject.activeInput = input.data('action');  
	
	if(input.data('action') == undefined) { infProject.activeInput = input.data('input'); }
	console.log(infProject.activeInput);
	
	checkClickUINameID(infProject.activeInput);
}	


function checkClickUINameID(name)
{
	if(name == 'wall_1' || name == 'wall_plaster_width_1' || name == 'form_1'){ hideMenuObjUI_Wall(clickO.last_obj); }
}




