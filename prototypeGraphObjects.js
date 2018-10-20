/* Prototype - Graphical Objects */

/* All graphical objects have the following functions:
	* draw()
		- draws the object graphics
		- is called by Main loop each frame
	* drawAction()
		- action performed by object each draw/frame (eg. animation)
		- is only called by draw() internally in the object
	* clickAction()
		- action performed by object at click (eg. game event)
		- is called by event listener when a click occurs
*/

function Rectangle(x, y, width, height) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.colour = "#000000";

	// info för bildanvändning: https://www.w3schools.com/tags/canvas_fillstyle.asp
	this.draw = function() {
		this.drawAction();
		
		ctx.fillStyle = this.colour;
		ctx.fillRect( this.x, this.y, this.width, this.height );
	}

	this.drawAction = function () {
		// do nothing
	}

	this.clickAction = function( clickPosX, clickPosY ) {
		// check if click is within rectangle area
		if ( clickPosX > this.x && clickPosX < (this.x + this.height) ) {
			if ( clickPosY > this.y && clickPosY < (this.y + this.width) ) {
				
				// switch colour
				if (this.colour == "#000000") { this.colour = "#FF0000"; }
				else { this.colour = "#000000"; }
				
			}
		}
	}
};

function FpsOverlay(x, y) { // Object Constructor
	this.x = x;
	this.y = y;
	this.colour = "#000000";
	this.frameCounter = 0;
	this.frameShow = 0;

	this.draw = function() {
		this.drawAction();
		
		ctx.font = "11px Arial";
		ctx.fillStyle = this.colour;
		ctx.fillText( this.frameShow, this.x, this.y );
		ctx.fillText( this.frameCounter, this.x, this.y + 10 );
	}

	this.drawAction = function () {
		// update text each 6 frame => 1/100ms @60fps
		// check frameShow first so it shows 1-10 instead of 0-9
		if ( this.frameShow % 10 == 0 ) { this.frameShow = 0; }
		this.frameCounter++;
		if ( this.frameCounter % 6 == 0 ) { this.frameShow++; }
	}

	this.clickAction = function( clickPosX, clickPosY ) {
		// do nothing at click
	}
};
