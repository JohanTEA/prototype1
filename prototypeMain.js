/* Prototype - Main */

/* Log config */
var logLevelInfo = true; // aktivera eller inaktivera info-loggning till console
	
/* Global variables */
var c = document.getElementById("prototypeCanvas");
var ctx = c.getContext("2d");
var graphObjects = [];


/* Logging */
function logInfo(logtext) {
	if (logLevelInfo) { console.log( "[Info] " + logtext ); }
}


/* Listen for click on canvas */
c.addEventListener( "click", function canvasClicked(event) {
	var clickPos = {
		x: event.pageX - c.offsetLeft,
		y: event.pageY - c.offsetTop };
	logInfo("canvasClicked, X = " + clickPos.x + ", Y = " + clickPos.y );

	// call clickAction() of all graphical objects
	var arrayLength = graphObjects.length;
	for ( var i = 0; i < arrayLength; i++ ) {
   		graphObjects[i].clickAction( clickPos.x, clickPos.y );
	}
}, false);


/* Main loop */
function mainLoop() {
	requestAnimationFrame( mainLoop );

	// clear canvas and draw all graphical objects
	ctx.clearRect( 0, 0, c.width, c.height );
	var arrayLength = graphObjects.length;
	for (var i = 0; i < arrayLength; i++) {
   		graphObjects[i].draw();
	}
}

/* Main */
console.log("[Application started] Prototype, by JohanTEA");

// Create graphical objects
// Graphical objects are later drawn in order, with last object on top layer
var rectWidth = 50;
var rectHeight = 50;
var rectPerRow = 7;
var rectRowOffset = 5; // edge offset to center rectangles, pixels. TODO: förbättra så detta baseras på c.width, så rutorna centreras
var rectPerColumn = 9;
var rectColumnOffset = 13; // edge offset to center rectangles, pixels. TODO: förbättra så detta baseras på c.width, så rutorna centreras
for ( var rectRow = 0; rectRow < rectPerRow; rectRow++ ) {
	for ( var rectColumn = 0; rectColumn < rectPerColumn; rectColumn++ ) {
   		graphObjects.push(
			new Rectangle(
				(rectRow*rectWidth)+rectRowOffset,
				(rectColumn*rectHeight)+rectColumnOffset,
				rectWidth,
				rectHeight ));
	}
}
graphObjects.push( new FpsOverlay( 300, 460 ));
logInfo( "graphObjects length = " + graphObjects.length );

mainLoop();
