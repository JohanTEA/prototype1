/* Prototype - Main */

/* Log config */
var logLevelInfo = true; // aktivera eller inaktivera info-loggning till console
	
/* Global variables */
// only use these in the main loop
var C = document.getElementById("prototypeCanvas");
var CTX = C.getContext("2d");
var GRAPHOBJECTS = [];
var PLAY = true;
var ENDGAME = false;


/* Logging */
function logInfo(logtext) {
	if (logLevelInfo) { console.log( "[Info] " + logtext ); }
}


/* Listen for click on canvas */
C.addEventListener( "click", function canvasClicked(event) {
	var clickPos = {
		x: event.pageX - C.offsetLeft,
		y: event.pageY - C.offsetTop };
	logInfo("canvasClicked, X = " + clickPos.x + ", Y = " + clickPos.y );

	// call clickAction() of all graphical objects
	var arrayLength = GRAPHOBJECTS.length;
	for ( var i = 0; i < arrayLength; i++ ) {
   		if ( GRAPHOBJECTS[i].clickAction( clickPos.x, clickPos.y, PLAY )) { // clickAction returns true or false, if true then end game
			ENDGAME = true;
			PLAY = false; // stop game interaction for end-game animation
		   }
	}
}, false);


/* Main loop */
function mainLoop() {
	requestAnimationFrame( mainLoop );

	// clear canvas and draw all graphical objects
	CTX.clearRect( 0, 0, C.width, C.height );
	var arrayLength = GRAPHOBJECTS.length;
	for (var i = 0; i < arrayLength; i++) {
   		GRAPHOBJECTS[i].draw();
	}
}

/* Main */
console.log("[Application started] Prototype, by JohanTEA");

// Create graphical objects
// Graphical objects are drawn in order, with last object on top layer

/* Basic layout (360*480)
---------------
|Name     |R|I|  R=restart, I=info+config
---------------
|X|X|X|X|X|X|X|
|X|X|X|X|X|X|X|
|X|X|X|X|X|X|X|
|X|X|X|X|X|X|X|
|X|X|X|X|X|X|X|
|X|X|X|X|X|X|X|
|X|X|X|X|X|X|X|
|X|X|X|X|X|X|X|
---------------
*/

// Background
GRAPHOBJECTS.push( new Background( 0, 0, C.width, C.height ));

// Game name (top row)
GRAPHOBJECTS.push( new Topmenu( 5, 5, 350, 70 )); 
// Restart button (icon w. transparent background)
//GRAPHOBJECTS.push( new RestartBtn( 50*5, 5, 50, 70 )); 
// Info and config button (icon w. transparent background)
//GRAPHOBJECTS.push( new InfoBtn( 50*6, 5, 50, 70 )); 


// Mines
var mineWidth = 50;
var mineHeight = 50;
var minePerRow = 7;
var mineRowOffset = 5; // edge offset to center mines, pixels.
var minePerColumn = 8;
var mineColumnOffset = 75; // edge offset to center mines, pixels.
for ( var mineRow = 0; mineRow < minePerRow; mineRow++ ) {
	for ( var mineColumn = 0; mineColumn < minePerColumn; mineColumn++ ) {
   		GRAPHOBJECTS.push(
			new Mine(
				(mineRow*mineWidth)+mineRowOffset,
				(mineColumn*mineHeight)+mineColumnOffset,
				mineWidth,
				mineHeight,
				Math.round(Math.random()) )); // generate random mines, 1 or 0
	}
}

// Overlay
GRAPHOBJECTS.push( new FpsOverlay( 300, 460 ));
logInfo( "GRAPHOBJECTS length = " + GRAPHOBJECTS.length );

mainLoop();
