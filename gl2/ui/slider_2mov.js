



class SelSborka_2
{
	constructor(cdm)
	{
		if(!cdm.line) cdm.line = {};
		if(!cdm.handle) cdm.handle = {};
		if(!cdm.step) cdm.step = [{text: ''}, {text: ''}];
			
		let selector = cdm.selector; 
		
		this.el = document.querySelector(selector);
		
		this.pos = 1;
		this.step = cdm.step;
		
		this.line = {};
		this.line.x = (cdm.line.x) ? cdm.line.x : 150;
		this.line.y = (cdm.line.y) ? cdm.line.y : 4;
		
		this.handle = {};
		this.handle.x = (cdm.handle.x) ? cdm.handle.x : 20;
		//this.handle.y = (cdm.handleY) ? cdm.handleY : 20;
		
		if(cdm.vertical) { this.vertical = cdm.vertical; }

		this.render();
		this.setup();
	}
	
	html()
	{
		let step = '';
		
		for (let i = 0; i < this.step.length; i++)
		{
			step += `
			<div nameId="step_text">
				${this.step[i].text}
			</div>			
			<div nameId="step">
			</div>			
			`;
		}
		
		let html = `					
		<div nameId="line_1">			
			${step}
			<div nameId="handle_1"></div>					
		</div>
		`;

		return html;
	}
	
	render()
	{
		if(1==2)
		{
			this.el.style.cssText = `
			position: relative; 
			padding: 20px 0;
			`;			
		}


		this.el.innerHTML = this.html();

		this.el_line = this.el.querySelector('[nameId="line_1"]');			// линейка
		this.el_handle = this.el.querySelector('[nameId="handle_1"]');		// рукоятка

		
		this.el_line.style.cssText = `
		display: block; 
		position: relative; 
		top: 20px;
		left: 70px;
		width: ${this.line.x}px; 
		height: ${this.line.y}px; 
		border: 1px solid #ccc; 
		border-radius: 3px; 
		background-color: #fff;
		transform-origin: 3px 3px 0;
		`;
		
		// поворачиваем линейку
		if(this.vertical)
		{ 
			this.el_line.style.transform = `rotate(90deg)`;
		}		
		
		this.el_handle.style.cssText = `
		display: block; 
		position: absolute; 
		top:0px; 
		left: 0px; 
		width: ${this.handle.x}px; 
		height: ${this.handle.x}px; 		 
		border: solid 1px #b3b3b3; 
		border-radius: 4px; 
		cursor: pointer; 
		background: rgba(255, 255, 255, 0.3); 
		box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;	
		`;
		
		this.el_handle.style.top = (this.line.y/2 - this.handle.x/2 - 1)+'px'; 	// выравниваем по высоте пункты/шаг 
		this.el_handle.style.left = (-this.handle.x/2)+'px';		// выравниваем по длине пункты/шаг		
		
		//transform: translate(-50%, -50%);

		this.el_step = this.el_line.querySelectorAll('[nameId="step"]');	// идикаторы шагов

		for (let i = 0; i < this.el_step.length; i++) 
		{
			let wh = 8;
			
			this.el_step[i].style.cssText = `
			display: block; 
			position: absolute; 
			top:0px; 
			left: 0px; 
			width: ${wh}px; 
			height: ${wh}px;  
			border: solid 1px #b3b3b3; 
			border-radius: 4px; 
			cursor: pointer; 
			background:#fff; 
			`;
			
			
			this.el_step[i].style.top = (this.line.y/2 - wh/2 - 1)+'px'; 	// выравниваем по высоте пункты/шаг 
			this.el_step[i].style.left = (this.line.x/(this.step.length-1) * i - wh/2)+'px';		// выравниваем по длине пункты/шаг

			this.el_step[i].addEventListener("mouseover", function(e) 
			{
				e.target.style.background = "#eee";
				e.stopPropagation();
			});
			this.el_step[i].addEventListener("mouseout", function(e) 
			{
				e.target.style.background = "#ffffff";
				e.stopPropagation();
			});

			this.el_step[i].userData = {};
			this.el_step[i].userData.step = i+1;
		}

		this.el_step_text = this.el_line.querySelectorAll('[nameId="step_text"]');	// идикаторы шагов

		for (let i = 0; i < this.el_step_text.length; i++) 
		{
			this.el_step_text[i].style.cssText = `
			display: block;
			position: absolute;
			top: ${parseInt(this.el_step[i].style.top) + 20}px;
			left: ${this.el_step[i].style.left};
			font-family: arial,sans-serif;
			font-size: 14px;			 
			width: auto; 
			height: auto;  
			background: none;
			transform-origin: 0 0;
			white-space: nowrap;
			`;
			
			
			if(this.step[i].cssT)
			{
				if(this.step[i].cssT.fontSize) 
				{
					this.el_step_text[i].style.fontSize = this.step[i].cssT.fontSize;
					
				}					
			}
			
			if(this.vertical)
			{ 
				this.el_step_text[i].style.transform = `rotate(-90deg)`;
				this.el_step_text[i].style.top = -(parseInt(this.el_step[i].style.top) + 20) +'px';
				this.el_step_text[i].style.left = (parseInt(this.el_step[i].style.left) - 4) +'px';
			}
			else
			{
				this.el_step_text[i].style.left = (parseInt(this.el_step[i].style.left) - this.el_step_text[i].getBoundingClientRect().width/2 + 4) +'px';
			}

			if(this.step[i].cssT)
			{
				if(this.step[i].cssT.top) { this.el_step_text[i].style.top = this.step[i].cssT.top; }
				if(this.step[i].cssT.left) { this.el_step_text[i].style.left = this.step[i].cssT.left; }
			}
			
		}		
	}

	setup()
	{
		this.clickHandler = this.clickHandler.bind(this);
		this.el_handle.addEventListener('mouseup', this.clickHandler);
		
		this.clickStep = this.clickStep.bind(this);
		
		for (let i = 0; i < this.el_step.length; i++)
		{
			this.el_step[i].addEventListener('mouseup', this.clickStep);			
		}
	
	}

	clickHandler(event)
	{
		var inf = { dist: 99999, id: 0 };
		
		for (let i = 0; i < this.el_step.length; i++)
		{			
			if(this.pos == i+1) continue;
			
			var rect = this.el_step[i].getBoundingClientRect();
			
			var dist = Math.abs(event.clientX - (rect.x + rect.width/2));			
			
			if(inf.dist > dist) { inf = { dist: dist, id: i }; }
		}		
		
		this.pos = inf.id + 1;
		
		this.setHandle();
	}
	
	clickStep(event)
	{
		this.pos = event.target.userData.step; 

		this.setHandle();
	}	

	// утсанавливаем рукоятку в нужное место
	setHandle()
	{		
		this.el_handle.style.left = (this.line.x/(this.step.length - 1) * (this.pos - 1) - this.handle.x/2) +'px';
		
		if(this.step[this.pos-1].fc)
		{
			window[this.step[this.pos-1].fc.name](this.step[this.pos-1].fc.params);
		}
	}
}




