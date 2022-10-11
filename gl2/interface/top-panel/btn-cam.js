



class UIbtnCam
{
	constructor({container, enable})
	{
		this.elem = null;
		
		this.btn2D = null;
		this.btn3D = null;
		this.btnView = null;
		
		this.init({container});
		this.initEvent();
		
		if(enable) this.activeCamera(enable);
	}
	
	
	init({container})
	{		
		let div = document.createElement('div');
		div.innerHTML = this.html();
		this.elem = div.children[0];	
		
		container.prepend(this.elem);	  // or append
		
		this.btn2D = this.elem.querySelector('[nameId="butt_camera_2D"]');
		this.btn3D = this.elem.querySelector('[nameId="butt_camera_3D"]');
		this.btnView = this.elem.querySelector('[nameId="butt_close_cameraView"]');			
	}
	
	html()
	{
		let html =
		`<div style="position: absolute; top: 15px; right: 20px;">
		
			<div class="button1-wrap-1" nameId="butt_camera_2D" style="display: none;">
				<div class="button1 button_gradient_1" style="width: 39px;"> 
					2D
				</div>	
			</div>		
			<div class="button1-wrap-1" nameId="butt_camera_3D" style="display: none;">
				<div class="button1 button_gradient_1" style="width: 39px;"> 
					3D
				</div>	
			</div>	
			<div class="button1-wrap-1" nameId="butt_close_cameraView" style="display: none;">
				<div class="button1 button_gradient_1" style="width: 39px;">
					<div style="transform: rotate(-45deg); font-family: arial,sans-serif; font-size: 40px; text-align: center; text-decoration: none; line-height: 0.5em; color: #666; cursor: pointer;">
						+
					</div>
				</div>	
			</div>
			
		</div>`;		
					
		return html;
	}
	
	
	initEvent()
	{
		this.btn2D.onmousedown = (e) => { this.activeCamera('2D'); }
		this.btn3D.onmousedown = (e) => { this.activeCamera('3D'); }
		this.btnView.onmousedown = (e) => { this.closeCamView(); }
	}

	activeCamera(type)
	{
		deActiveSelected();
		changeRightMenuUI_1({current: true});
		clickO = resetPop.clickO();
		
		this.btn2D.style.display = 'none';
		this.btn3D.style.display = 'none';
		
		(type === '2D') ? this.btn3D.style.display = '' : this.btn2D.style.display = '';
		
		console.log(this.elem, this.btn2D.style.display, this.btn3D.style.display);
		
		camOrbit.setActiveCam({cam: type});
	}

	activeCamView()
	{
		this.btnView.style.display = '';
		this.btn2D.style.display = 'none';
		this.btn3D.style.display = 'none';
	}
	
	closeCamView()
	{
		this.btnView.style.display = 'none';
		
		(camOrbit.activeCam.userData.isCam2D) ? this.activeCamera('2D') : this.activeCamera('3D');
		
		infProject.class.camView.disable();
	}
}






