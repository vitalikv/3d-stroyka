


// сохраняем список материалов в txt
class UI_saveEstimateTxt
{
	
	constructor({el})
	{
		this.el = el;
		
		this.assignEvent();	
	}
	
	
	assignEvent()
	{
		this.el.onmousedown =(e)=> { this.saveFile(); e.stopPropagation(); }	
	}


	getList()
	{
		let list = infProject.list.obj_scene_ui;	
		let arr = [];
		
		for(let i = 0; i < list.length; i++)
		{
			let o = list[i].o;
			
			if(o.userData.obj3D)
			{
				checkObjExistList({obj: o, arr: arr});
			}
			else if(o.userData.wf_tube)
			{
				arr[arr.length] = {obj: o, count: 1};
			}				
		}
		
		
		// проверяем есть ли такой же объект в списке, если есть-> то увеличеваем кол-во на +1, если нету-> то добавляем в список
		function checkObjExistList(cdm)
		{
			let obj = cdm.obj;
			let arr = cdm.arr;
			let exist = false;
			
			for(let i = 0; i < arr.length; i++)
			{
				if(!arr[i].obj.userData.obj3D) continue;
				
				if(arr[i].obj.userData.obj3D.lotid == obj.userData.obj3D.lotid)
				{
					arr[i].count += 1;
					exist = true;
					break;
				}
			}
			
			if(!exist)
			{
				arr[arr.length] = { obj: obj, count: 1 };			
			}
		}
		
		
		let txt = '';
		let n = 1;
		
		for(let i = 0; i < arr.length; i++)
		{
			let o = arr[i].obj;
			let count = (arr[i].count < 2) ? '' : ' ['+arr[i].count+']';
			
			if(o.userData.obj3D)
			{
				txt += n+'. '+o.userData.obj3D.nameRus+count+'\n';
				n++;
			}
			else if(o.userData.wf_tube)
			{
				txt += n+'. '+o.userData.wf_tube.nameRus+' ('+o.userData.wf_tube.length+'м)\n';
				n++;
			}				
		}

		return txt;
	}

	saveFile()
	{
		let txt = this.getList();
		
		let data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(txt);	
		
		let link = document.createElement('a');
		document.body.appendChild(link);
		link.href = data;
		link.target = '_blank';
		link.download = 'список объектов.txt';
		link.click();
		document.body.removeChild(link);
	}
}