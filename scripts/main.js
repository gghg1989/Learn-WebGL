var canvas = document.getElementById('canvas');
initGL(canvas);

function initGL(canvas) {
	// Context names try list
	var ctxNames = ["webgl", "experimental-webgl", "webkit3d", "moz-webgl"];
	// Try to obtain WebGL context
	for (var i = ctxNames.length - 1; i >= 0; i--) {
		try {
			gl = canvas.getContext(ctxNames[i]);
		}
		catch(e) {}
		// If found context, exit loop
		if(gl) {
			break;
		}
	}
	// If cannot find any WebGL context, print alert
	if (gl == null) {
		alert("Could not initialise WebGL");
		return null;
	}
	// Set viewport size by canvas size
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;

}