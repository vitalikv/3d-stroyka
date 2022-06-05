



class selectBoxDiv
{
	constructor({container}) 
	{
		this.element = document.createElement('div');
		this.element.style.cssText = `border: 1px solid #55aaff; background-color: rgba(75, 160, 255, 0.3); position: fixed;`;
		//this.element.style.pointerEvents = 'none';
		this.element.style.display = 'none';
		
		this.container = container;
		this.container.append( this.element );
		
		this.startPoint = {x: 0, y: 0};
		this.pointTopLeft = {x: 0, y: 0};
		this.pointBottomRight = {x: 0, y: 0};

		this.isDown = false;
		this.isKeyDown = false;
		
		this.initEvent();
	}
	
	
	initEvent() 
	{ 
		this.container.addEventListener( 'pointerdown', this.onPointerDown.bind(this) );
		this.container.addEventListener( 'pointermove', this.onPointerMove.bind(this) );
		this.container.addEventListener( 'pointerup', this.onPointerUp.bind(this) );

		document.addEventListener('keydown', (e) => { if(e.code == 'ControlLeft') { this.isKeyDown = true;} })
		document.addEventListener('keyup', (e) => { if(e.code == 'ControlLeft') { this.isKeyDown = false; this.onPointerUp(); } })				
	}


	onPointerDown( event ) 
	{
		if(!this.isKeyDown) return;
		
		this.isDown = true;
		this.onSelectStart( event );
		setMouseStop(true);
	}	
	
	
	onPointerMove( event ) 
	{
		if(!this.isDown) return;
		
		this.onSelectMove( event );
	}
	
	
	onPointerUp() 
	{
		this.isDown = false;
		this.onSelectOver();
		setMouseStop(false);
	}
	
	onSelectStart( event ) {

		this.element.style.display = '';

		this.element.style.left = event.clientX + 'px';
		this.element.style.top = event.clientY + 'px';
		this.element.style.width = '0px';
		this.element.style.height = '0px';

		this.startPoint.x = event.clientX;
		this.startPoint.y = event.clientY;

	}

	onSelectMove( event ) {

		this.pointBottomRight.x = Math.max( this.startPoint.x, event.clientX );
		this.pointBottomRight.y = Math.max( this.startPoint.y, event.clientY );
		this.pointTopLeft.x = Math.min( this.startPoint.x, event.clientX );
		this.pointTopLeft.y = Math.min( this.startPoint.y, event.clientY );

		this.element.style.left = this.pointTopLeft.x + 'px';
		this.element.style.top = this.pointTopLeft.y + 'px';
		this.element.style.width = ( this.pointBottomRight.x - this.pointTopLeft.x ) + 'px';
		this.element.style.height = ( this.pointBottomRight.y - this.pointTopLeft.y ) + 'px';
	}

	onSelectOver() {

		this.element.style.display = 'none';

	}	
}