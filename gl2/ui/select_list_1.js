




class SelectList_1
{
	constructor(el_parent, cdm)
	{
		this.el_parent = el_parent;
		this.el = null;
		this.selectId = null;
		this.arrList = cdm.arrList;
		this.fc = cdm.fc;
		this.inf = cdm.inf;
		
		this.render();
		this.setup();
		
		if(cdm.selectItem !== undefined) this.selectItem(cdm.selectItem);		
	}
	
	
	html()
	{
		let arr = (this.arrList) ? this.arrList : [];

		const items = arr.map(item => 
			{
				return `<div nameId="items" class="item">${item.text}</div>`;
			})

		let html = 
		`<div nameId="select_item">
			<div nameId="select_item_text">------</div>
			
			<div style="width: 10px; height: auto;">
				<svg height="100%" width="100%" viewBox="0 0 100 100">
					<polygon points="0,0 100,0 50,100" style="fill:#ffffff;stroke:#000000;stroke-width:4" />
				</svg>
			</div>	
		</div>
		
		<div nameId="list">
			${items.join('')}	
		</div>
		`;

		return html;		
	}
	
	render()
	{
		this.el = document.createElement('div');			
		this.el.innerHTML = this.html();
		
		this.el_parent.append(this.el);
		
		this.el.style.cssText = `
		display: block;
		position: relative; 
		//left: 50%; 
		//top: 50%; 
		//width: 600px; 
		//height: 400px; 
		//transform: translate(-50%, -100%); 
		margin: 20px;
		//border: 1px solid #b3b3b3; 
		`;
		
		

		this.el_input = this.el.querySelector('[nameId="select_item"]');
		this.el_text_input = this.el_input.querySelector('[nameId="select_item_text"]');
		this.el_list = this.el.querySelector('[nameId="list"]');

		
		this.el_input.style.cssText = `
		display: flex; 
		justify-content: space-between;
		align-items: center; 
		height: 26px; 
		padding: 0 1rem; 
		font-family: arial,sans-serif; 
		font-size: 13px; 
		color: #666; 
		background: #fff;
		border: 1px solid #b3b3b3; 
		border-radius: 3px;	
		cursor: pointer;
		`;

		this.el_list.style.cssText = `
		display: none;
		position: absolute; 
		left: 0; 
		right: 0; 
		top: 26px; 
		max-height: 200px; 
		border: 1px solid #b3b3b3; 
		border-radius: 3px; 
		overflow-y: auto; 
		box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;	
		background: #fff;
		z-index: 1;
		`;
		
		this.el_items = this.el_list.querySelectorAll('[nameId="items"]');

		for (let i = 0; i < this.el_items.length; i++) 
		{
			this.el_items[i].style.cssText = `

			display: flex;
			justify-content: space-between;	
			height: 26px;		
			padding: 0 1rem;
			font-family: arial,sans-serif; 
			font-size: 13px;
			align-items: center;			
			color: #666; 
			border-bottom: 1px solid #b3b3b3;
			cursor: pointer;
			transition: 0.15s background ease-in;
			`;


			this.el_items[i].userData = {};
			this.el_items[i].userData.value = this.arrList[i].value;
		}
	}

	// при создании списка назначаем события для каждого item
	setup()
	{
		let clickHandler = this.clickHandler.bind(this);
		this.el_input.onmousedown = function(e){ clickHandler(e); }
		
		let clickItems = this.clickItems.bind(this);
		
		for (let i = 0; i < this.el_items.length; i++)
		{		
			this.el_items[i].onmousedown = function(e){ clickItems(e); }			
		}
	}

	clickHandler(event)
	{
		this.toggle();
	}
	
	clickItems(event)
	{
		let value = event.target.userData.value;
		
		
		this.selectItem(value, true);
	}

	selectItem(value, fc)
	{
		if(value == undefined) return;
		let result = null;
		let n = 0;
		
		for (let i = 0; i < this.arrList.length; i++)
		{
			if(this.arrList[i].value == value) { result = this.arrList[i]; n = i; break; } 
		}
		
		for (let i = 0; i < this.el_items.length; i++)
		{
			this.el_items[i].style.background = "#ffffff";			
		}		
		
		if(result)
		{
			let flag = (this.selectId == n) ? true : false;
			this.el_text_input.textContent = result.text;
			this.selectId = n;

			this.el_items[n].style.background = 'rgb(235, 235, 235)';
			
			this.close();
			
			if(!flag)
			{
				if(fc) this.activeFc();
			}			
		}	
	}	

	get isOpen()
	{
		return (this.el_list.style.display == '') ? true : false;
	}

	toggle()
	{
		this.isOpen ? this.close() : this.open();
	}
	
	// открываем список
	open()
	{
		//this.el_input.style.borderBottom = 'none';
		this.el_list.style.display = '';
		
		this.close_2 = this.close_2.bind(this);
		document.addEventListener('click', this.close_2);	// если кликнем куда-то не в список, то закрываем список	
	}
	
	// закрываем список
	close()
	{
		//this.el_input.style.borderBottom = '1px solid #b3b3b3';
		this.el_list.style.display = 'none';
		
		document.removeEventListener('click', this.close_2);
	}
	
	// кликнули куда-то в другое место (закрываем список)
	close_2(event) 
	{
		if (!this.el.contains(event.target)) { this.close(); }
	}	
	
	// выполняем ф-цию, если выбрали новый item
	activeFc()
	{		
		if(this.arrList[this.selectId].fc && 1==2)
		{
			window[this.arrList[this.selectId].fc.name](this.arrList[this.selectId].fc.params);
		}
		
		if(this.fc == 'aCamView')
		{
			let params = {};
			params = this.arrList[this.selectId].ps;
			params.sborka = true;
			params.inf = this.inf;
			
			infProject.class.camView.enable(params);
		}		
	}	
}




