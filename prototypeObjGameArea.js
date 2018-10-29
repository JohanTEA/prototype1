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
 * Just a green background to later animate grass on
 * @constructor
 */
function BackgroundColour( canvasContext, colour, x, y, width, height ) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.draw = function() {
		// Background colour
		canvasContext.fillStyle = colour;
		canvasContext.fillRect( this.x, this.y, this.width, this.height );
	};

	this.clickAction = function( clickPosX, clickPosY, play ) {
		// do nothing
	};
};

/**
 * Tussock sprite image
 * @constructor
 */
function TussockSpriteImage () { // Object Constructor
	this.image = new Image(200, 50);
	this.image.src = 'img/grasSprites.png';
	this.spritesInRow = [4];
	this.spriteRowFps = [4]; // recomended fps for row
	this.spriteWidth = 50; // all sprites have the same width
	this.spriteHeight = 50; // all sprites have the same height
	this.spriteX = function(spriteNo) { return spriteNo * this.spriteWidth; };
	this.spriteY = function(spriteRow) { return spriteRow * this.spriteHeight; };
	this.fpsForRow = function(spriteRow) { return this.spriteRowFps[spriteRow]; };
	this.nextSprite = function(spriteRow, spriteNo) {
		spriteNo++;
		if ( spriteNo > (this.spritesInRow[spriteRow] - 1) ) { return 0; }
		else { return spriteNo; }
	}; // rotate sprites, 0-1-2-...-0-1-...
};

/**
 * Tussock (gras) Animation
 * Animate spriteImage at x,y with width,height (preferably on the background)
 * @constructor
 */
function Tussock( canvasContext, spriteImage, x, y, width, height ) { // Object Constructor
	var frameCount = 0;
	var spriteNo = 0;
	var spriteRow = 0; // always 0 for this spriteImage

	this.draw = function() {
		// change to next sprite based on recommended fps, assume screen is running at 60 fsp
		frameCount++;
		console.log(spriteNo);
		/* TODO: funkar inte, spriteNo förstörs efter första nextSprite
		if ( frameCount > Math.round(60/spriteImage.fpsForRow(spriteRow)) ) {
			spriteNo = spriteImage.nextSprite(spriteNo);
			frameCount = 0;
		} */

		// draw sprites
		canvasContext.drawImage( spriteImage.image,
			 spriteImage.spriteX(spriteNo), spriteImage.spriteY(spriteRow),
			 spriteImage.spriteWidth, spriteImage.spriteHeight,
			 x, y,
			 width, height );
	};

	this.clickAction = function( clickPosX, clickPosY, play ) {
		// do nothing
	};
};


/**
 * TODO: Mine sprite image
 * @constructor
 */
/*
function MineSpriteImage () {

};
*/

/**
 * Mine at x,y with width,height.
 * mine is true || false
 * @constructor
 */
function Mine( canvasContext, x, y, width, height, mine ) { // Object Constructor
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var state = "unknown"; // start at unknown/un-clicked state
	
	// https://encycolorpedia.se/808080 (grå) https://encycolorpedia.se/cd5c5c (kastanj)- bra sida med RGB koder för färger
	this.draw = function() {
		switch(state) {
			case "unknown":
				// draw a grey square
				// TODO: use image instead of just colour
				canvasContext.fillStyle = "#808080"; // grey
				var rectEdge = 2;
				canvasContext.fillRect( this.x+rectEdge, this.y+rectEdge, this.width-rectEdge*2, this.height-rectEdge*2 );
				break;
			case "noMine":
				// draw nothing, there was no mine
				// TODO: draw number of mines in angränsande 
				break;
			case "mineBlocked":
				// indicate disarmed/blocked area
				// TODO: use image instead of just colour 
				canvasContext.fillStyle = "#cd5c5c"; // kastanj
				var rectEdge = 2;
				canvasContext.fillRect( this.x+rectEdge, this.y+rectEdge, this.width-rectEdge*2, this.height-rectEdge*2 );
				break;
			case "mine":
				// indicate game over
				// todo: end game animation - do freaky explosion animation for 2 seconds here!
				canvasContext.fillStyle = "#000000"; // black
				var rectEdge = 2;
				canvasContext.fillRect( this.x+rectEdge, this.y+rectEdge, this.width-rectEdge*2, this.height-rectEdge*2 );
				break;
			default:
				// draw purple colour for error indication
				canvasContext.fillStyle = "#ff00ff"; // purple
				canvasContext.fillRect( this.x, this.y, this.width, this.height );
				break;
		};
	};

	this.clickAction = function( clickPosX, clickPosY, play ) {
		var endGame = false;
		if ( play == false ) { return endGame; } // if game is paused, do nothing

		if ( posWithinRectangle( clickPosX, clickPosY, this.x, this.x+this.width, this.y, this.y+this.height )) {
			switch(state) {
				case "unknown":
					if ( mine ) { state = "mine";	endGame = true; }
					else { state = "noMine"; }
					break;
				default:
					// do nothing
					break;
			}
		}
		return endGame;
	};
	
	var posWithinRectangle = function( xPos, yPos, xRectLeft, xRectRight, yRectTop, yRectBottom ) {
		if ( xPos > xRectLeft && xPos < xRectRight ) {
			if ( yPos > yRectTop && yPos < yRectBottom ) {
				return true;
			}
		}
		else {
			return false;
		}
	};
};
