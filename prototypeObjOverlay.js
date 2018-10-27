/* Prototype - Overlay Graphical Objects */

/* All graphical objects must have the following functions:
	* this.draw()
		- draws the object graphics
		- is called by Main loop each frame
	* this.clickAction()
		- action performed by object at click
		- is called by event listener when a click occurs
*/


/**
 * FPS overlay at x, y.
 * @constructor
 */
function FpsOverlay( canvasContext, x, y ) { // Object Constructor
	this.x = x;
	this.y = y;

	var colour = "#000000"; // svart
	var frameCounter = 0;
	var frameShow = 0;

	this.draw = function() {
		drawAction();
		
		canvasContext.font = "11px Arial";
		canvasContext.fillStyle = colour;
		canvasContext.fillText( frameShow, this.x, this.y );
		canvasContext.fillText( frameCounter, this.x, this.y + 10 );
	}

	var drawAction = function () {
		// update text each 6 frame => 1/100ms @60fps
		// check frameShow first so it shows 1-10 instead of 0-9
		if ( frameShow % 10 == 0 ) { frameShow = 0; }
		frameCounter++;
		if ( frameCounter % 6 == 0 ) { frameShow++; }
	}

	this.clickAction = function( clickPosX, clickPosY, play ) {
		// do nothing at click
	}
};
