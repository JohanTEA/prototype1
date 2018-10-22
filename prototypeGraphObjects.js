/* Prototype - Graphical Objects */

/* All graphical objects have the following functions:
	* this.draw()
		- draws the object graphics
		- is called by Main loop each frame
	* var drawAction()
		- action performed by object each draw/frame (eg. animation)
		- is only called by draw() internally in the object
	* this.clickAction()
		- action performed by object at click
		- is called by event listener when a click occurs
*/

/**
 * Background at x,y with width,height.
 * @constructor
 */
function Background(x, y, width, height) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	var colour = "#50c878"; // smaragdgrön

	this.draw = function(canvasContext) {
		drawAction();
		
		canvasContext.fillStyle = colour;
		canvasContext.fillRect( this.x, this.y, this.width, this.height );
	}

	var drawAction = function () {
		// do nothing
	}

	this.clickAction = function( clickPosX, clickPosY, play ) {
		// do nothing
	}
};

/**
 * Top menu at x,y with width,height.
 * @constructor
 */
function Topmenu(x, y, width, height) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	var colour = "#7fffd4"; // aquamarine

	this.draw = function(canvasContext) {
		drawAction();
		
		canvasContext.fillStyle = colour;
		canvasContext.fillRect( this.x, this.y, this.width, this.height );
	}

	var drawAction = function () {
		// do nothing
	}

	this.clickAction = function( clickPosX, clickPosY, play ) {
		// do nothing
	}
};


/**
 * Mine square at x,y with width,height.
 * mine is true || false
 * @constructor
 */
function Mine(x, y, width, height, mine) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.mine = mine;
	var colour = "#ff00ff"; // purple colour for error indication
	var state = "unknown";
	
	// https://encycolorpedia.se/808080 (grå) https://encycolorpedia.se/cd5c5c (kastanj)- underbar sida med RGB koder för färger
	// info för bildanvändning: https://www.w3schools.com/tags/canvas_fillstyle.asp
	this.draw = function(canvasContext) {
		drawAction();

		canvasContext.fillStyle = colour;
		canvasContext.fillRect( this.x, this.y, this.width, this.height );
	}

	var drawAction = function () {
		switch(state) {
			case "unknown":
				// todo: show that this area is not explored 
				colour = "#808080"; // grey
				break;
			case "noMine":
				// todo: show transparent = background
				// todo: show number for neighbouring mines
				colour = "#ffffff"; // white
				break;
			case "mineBlocked":
				// todo: show that a mine have been disarmed/blocked
				colour = "#cd5c5c"; // kastanj				
				break;
			case "mine":
				// todo: end game animation - do freaky explosion animation for 2 seconds here!
				colour = "#000000"; // black				
				break;
			default: // purple colour for error indication
				colour = "#ff00ff";
				break;
		}
	}

	this.clickAction = function( clickPosX, clickPosY, play ) {
		var endGame = false;
		if ( play == false ) { return endGame; } // if game is paused, do nothing

		if ( posWithinRectangle( clickPosX, clickPosY, this.x, this.x+this.width, this.y, this.y+this.height )) {
			if ( state == "unknown" && !(this.mine) ) { 
				state = "noMine";
			}
			else {
				state = "mine";
				endGame = true;
			}
		}
		return endGame;
	}
	
	var posWithinRectangle = function( xPos, yPos, xRectLeft, xRectRight, yRectTop, yRectBottom ) {
		if ( xPos > xRectLeft && xPos < xRectRight ) {
			if ( yPos > yRectTop && yPos < yRectBottom ) {
				return true;
			}
		}
		else {
			return false;
		}
	}
};

/**
 * FPS overlay at x, y.
 * @constructor
 */
function FpsOverlay(x, y) { // Object Constructor
	this.x = x;
	this.y = y;
	var colour = "#000000"; // svart
	var frameCounter = 0;
	var frameShow = 0;

	this.draw = function(canvasContext) {
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
