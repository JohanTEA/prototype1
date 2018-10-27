/* Prototype - Game Area Graphical Objects */

/* All graphical objects have the following functions:
	* this.draw()
		- draws the object graphics
		- is called by Main loop each frame
	* this.clickAction()
		- action performed by object at click
		- is called by event listener when a click occurs
*/

/**
 * Background at x,y with width,height.
 * Have a green background and animate grass on it
 * @constructor
 */
function Background( canvasContext, x, y, width, height ) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var backgroundColour = "#50c878"; // light green

	var spriteImage = new Image(200, 50);
	spriteImage.src = 'img/grasSprites.png';
	var frameCount = 0;
	var spriteImageData = {
		spritesInImage : 4, // fixed value
		spriteFps : 4, // fixed value, recomended fps
		spriteWidth : 50, // fixed value
		spriteHeight : 50, // fixed value
		sprite : 0, // moves for each sprite
		spriteX : function() { return this.sprite * this.spriteWidth; }, // moves for each sprite
		spriteY : 0, // fixed value, always 0
		nextSprite : function() {
			this.sprite++;
			if ( this.sprite > this.spritesInImage - 1 ) { this.sprite = 0; }
		}, // rotate sprites, 0-1-2-...-0-1-...
	}
	

	this.draw = function() {
		drawAction();

		// Background colour
		canvasContext.fillStyle = backgroundColour;
		canvasContext.fillRect( this.x, this.y, this.width, this.height );

		// Sprites
		canvasContext.drawImage( spriteImage,
			 spriteImageData.spriteX(), spriteImageData.spriteY,
			 spriteImageData.spriteWidth, spriteImageData.spriteHeight,
			 this.x, this.y,
			 this.width, this.height );
	}

	drawAction = function () {
		// change to next sprite based on recommended fps, assume screen is running at 60 fsp
		frameCount++;
		if ( frameCount > Math.round(60/spriteImageData.spriteFps) ) {
			spriteImageData.nextSprite();
			frameCount = 0;
		}
		
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
function Mine( canvasContext, x, y, width, height, mine ) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.mine = mine;

	var colour = "#ff00ff"; // purple colour for error indication
	var state = "unknown";
	
	// https://encycolorpedia.se/808080 (grå) https://encycolorpedia.se/cd5c5c (kastanj)- underbar sida med RGB koder för färger
	// info för bildanvändning: https://www.w3schools.com/tags/canvas_fillstyle.asp
	this.draw = function() {
		drawAction();

		canvasContext.fillStyle = colour;
		var rectEdge = 2;
		canvasContext.fillRect( this.x+rectEdge, this.y+rectEdge, this.width-rectEdge*2, this.height-rectEdge*2 );
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
