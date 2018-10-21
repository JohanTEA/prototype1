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

/**
 * Background at x,y with width,height.
 * @constructor
 */
function Background(x, y, width, height) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.colour = "#50c878"; // smaragdgrön

	this.draw = function() {
		this.drawAction();
		
		CTX.fillStyle = this.colour;
		CTX.fillRect( this.x, this.y, this.width, this.height );
	}

	this.drawAction = function () {
		// do nothing
	}

	this.clickAction = function( clickPosX, clickPosY ) {
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
	this.colour = "#7fffd4"; // aquamarine

	this.draw = function() {
		this.drawAction();
		
		CTX.fillStyle = this.colour;
		CTX.fillRect( this.x, this.y, this.width, this.height );
	}

	this.drawAction = function () {
		// do nothing
	}

	this.clickAction = function( clickPosX, clickPosY ) {
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
	this.colour = "#808080";
	this.state = "unknown";
	this.mine = mine;
	
	// https://encycolorpedia.se/808080 (grå) https://encycolorpedia.se/cd5c5c (kastanj)- underbar sida med RGB koder för färger
	// info för bildanvändning: https://www.w3schools.com/tags/canvas_fillstyle.asp
	this.draw = function() {
		this.drawAction();

		CTX.fillStyle = this.colour;
		CTX.fillRect( this.x, this.y, this.width, this.height );
	}

	this.drawAction = function () {
		switch(this.state) {
			case "unknown":
				// todo: show that this area is not explored 
				this.colour = "#808080"; // grey
				break;
			case "noMine":
				// todo: show transparent = background
				// todo: show number for neighbouring mines
				this.colour = "#ffffff"; // white
				break;
			case "mineBlocked":
				// todo: show that a mine have been disarmed/blocked
				this.colour = "#cd5c5c"; // kastanj				
				break;
			case "mine":
				// todo: end game animation - do freaky explosion animation for 2 seconds here!
				this.colour = "#000000"; // black				
				break;
			default: // purple colour for error indication
				this.colour = "#ff00ff";
		}
	}

	this.clickAction = function( clickPosX, clickPosY, play ) {
		var endGame = false;
		if ( play == false ) { return endGame; } // if game is paused, do nothing

		if ( this.posWithinRectangle( clickPosX, clickPosY, this.x, this.x+this.width, this.y, this.y+this.height )) {
			if ( this.state == "unknown" && !(this.mine) ) { 
				this.state = "noMine";
			}
			else {
				this.state = "mine";
				endGame = true;
			}
		}
		return endGame;
	}
	
	this.posWithinRectangle = function( xPos, yPos, xRectLeft, xRectRight, yRectTop, yRectBottom ) {
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
	this.colour = "#000000"; // svart
	this.frameCounter = 0;
	this.frameShow = 0;

	this.draw = function() {
		this.drawAction();
		
		CTX.font = "11px Arial";
		CTX.fillStyle = this.colour;
		CTX.fillText( this.frameShow, this.x, this.y );
		CTX.fillText( this.frameCounter, this.x, this.y + 10 );
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
