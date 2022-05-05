


class UI_listObjChilds
{
	el = null;
	list = {};
		
	constructor({nameAttr})
	{
		this.el = document.createElement('div');			
		this.el.innerHTML = this.html();
		this.el = this.el.firstChild;
		
		let container = this.el.querySelector('[nameId="rp_obj_group"]');
		
		this.el_parent = document.querySelector('[nameId="wrap_object"]');
		this.el_parent.append(this.el);	
		
	}
	

	htmlObjName()
	{
		let str =
		`<div class="rp_obj_name">
			<input type="text" nameId="rp_obj_name" value="Название">					
		</div>`;

		return str;	
	}
	

	
	update({inf})
	{
		let list = this.list.upd;
		
		for (let key in inf) 
		{
			if(list[key]) 
			{
				let value = inf[key];
				if(list[key].nodeName == 'DIV') list[key].innerText = value;
				if(list[key].nodeName == 'INPUT') list[key].value = value;
				
				//console.log(value, key, list[key].nodeName);
			}
			
		}		
	}

	show({inf})
	{		
		this.showDivs({inf: inf});
		
		this.el.style.display = '';
	}
	
	showDivs({inf})
	{
		let list = this.list.div;
		
		for (let i = 0; i < inf.length; i++)
		{
			if(list[inf[i]]) 
			{
				list[inf[i]].style.display = '';				
			}				
		}		
	}
	
	hide()
	{
		let list = this.list.div;
		console.log(list);

		for (let key in list) 
		{
			if(list[key]) 
			{
				list[key].style.display = 'none';
			}			
		}
		
		this.el.style.display = 'none';
	}	
}




