/* Prototype - Main */

/* Log config */
var logLevelInfo = true; // aktivera eller inaktivera info-loggning till console
	
/* Global variables */
var c = document.getElementById("prototypeCanvas");
var ctx = c.getContext("2d");


/* Logging */
function logInfo(logtext) {
	if (logLevelInfo) { console.log( "[Info] " + logtext ); }
}


/* Listen for click on canvas */
c.addEventListener( "click", function canvasClicked(event) {
	var clickPos = {
		x: event.pageX - c.offsetLeft,
		y: event.pageY - c.offsetTop };
	if (logLevelInfo) { console.log("[Info] canvasClicked, X = ", clickPos.x, ", Y = ", clickPos.y ); }

	// call clickAction function of all graphical objects
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
console.log("[Application started] Prototype, by Thavox");

var graphObjects = [];
// graphical objects are drawn in order, last on top
graphObjects.push( new Rectangle( 100, 100, 50, 50 ));
graphObjects.push( new FpsOverlay( 300, 460 ));
logInfo( "graphObjects length = " + graphObjects.length );

mainLoop();
