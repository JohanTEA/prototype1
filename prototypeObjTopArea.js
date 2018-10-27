/* Prototype - Top Area Graphical Objects */

/* All graphical objects must have the following functions:
	* this.draw()
		- draws the object graphics
		- is called by Main loop each frame
	* this.clickAction()
		- action performed by object at click
		- is called by event listener when a click occurs
*/

/**
 * Top menu at x,y with width,height.
 * @constructor
 */
function Topmenu( canvasContext, x, y, width, height ) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var image = new Image(360, 70);
	image.src = 'img/topArea.png';

	this.draw = function() {
		//drawAction();

		canvasContext.drawImage(image, this.x, this.y, this.width, this.height);
	}

	var drawAction = function () {
		// do nothing
	}

	this.clickAction = function( clickPosX, clickPosY, play ) {
		// do nothing
	}
};

