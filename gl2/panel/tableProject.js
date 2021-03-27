


getListProject();



async function getListProject() 
{
	
	var url = 'bd/getProject.php';
	var table = 'project';				
	
	var response = await fetch(url, 
	{
		method: 'POST',
		body: 'table='+table+'&select_list=id, user_id, name, date_up',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },				
	});
	var json = await response.json();		

	console.log(json);

	var container = document.body.querySelector('[nameId="projectList"]');
	
	
	for(var i = 0; i < json.length; i++)
	{
		var j = json[i];		
		
		var html = 
		'<div style="display: flex; margin: 10px;">\
			<div style="width: 40px; margin: 0 5px;">'+j.id+'</div>\
			<div style="width: 100px; margin: 0 5px;">'+j.user_id+'</div>\
			<div style="width: 250px; margin: 0 5px;">'+j.name+'</div>\
			<div style="width: 200px; margin: 0 5px;">'+j.date_up+'</div>\
		</div>';
		
		var div = document.createElement('div');
		div.innerHTML = html;
		var elem = div.firstChild;		
			
		container.append(elem);
	}		
	
}











