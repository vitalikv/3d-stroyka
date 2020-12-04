




class SelectList_1
{
	constructor(selector, cdm)
	{
		this.el = document.querySelector(selector);
		this.selectId = null;
		this.arrList = cdm.arrList;

		this.render();
		this.setup();
		
		if(cdm.selectItem) this.selectItem(cdm.selectItem);		
	}
	
	
	html()
	{
		let arr = (this.arrList) ? this.arrList : [];

		const items = arr.map(item => 
			{
				return `<div nameId="items" class="item">${item.value}</div>`;
			})

		let html = 
		`<div nameId="select_item">
			<div nameId="select_item_text">1111</div>
			
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


		this.el.innerHTML = this.html();

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

			this.el_items[i].addEventListener("mouseover", function(e) 
			{
				e.target.style.background = "#eee";
			});
			this.el_items[i].addEventListener("mouseout", function(e) 
			{
				e.target.style.background = "#ffffff";
			});	

			this.el_items[i].userData = {};
			this.el_items[i].userData.id = this.arrList[i].id;			
		}
	}

	setup()
	{
		this.clickHandler = this.clickHandler.bind(this);
		this.el_input.addEventListener('click', this.clickHandler);
		
		this.clickItems = this.clickItems.bind(this);
		
		for (let i = 0; i < this.el_items.length; i++)
		{
			this.el_items[i].addEventListener('mouseup', this.clickItems);			
		}
	}

	clickHandler(event)
	{
		this.toggle();
	}
	
	clickItems(event)
	{
		let id = event.target.userData.id;
		
		
		this.selectItem(id);
	}

	selectItem(id)
	{
		if(id == undefined) return;
		let result = null;
		
		for (let i = 0; i < this.arrList.length; i++)
		{
			if(this.arrList[i].id == id) { result = this.arrList[i]; break; } 
		}
		
		if(result)
		{
			this.el_text_input.textContent = result.value;
			this.selectId = id;
			this.close();
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
	
	open()
	{
		this.el_input.style.borderBottom = 'none';
		this.el_list.style.display = '';
	}
	
	close()
	{
		this.el_input.style.borderBottom = '1px solid #b3b3b3';
		this.el_list.style.display = 'none';
	}

	destroy()
	{
		this.el.removeEventListener('click', this.clickHandler)
	}
}

var infSelArr = [
	{id: 1, value: 'text 1'},
	{id: 2, value: 'text 2'},
	{id: 3, value: 'text 3'},
	{id: 4, value: 'text 4'},
	{id: 5, value: 'text 5'},
];

var idd = new SelectList_1('[nameId="wrap_slid_5"]', {arrList: infSelArr, selectItem: '3'});
var idd = new SelectList_1('[nameId="wrap_slid_6"]', {arrList: infSelArr, selectItem: '5'});

