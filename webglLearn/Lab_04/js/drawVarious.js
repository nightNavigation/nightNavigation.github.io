"use strict";

var canvas;
var gl;

var variousIndex;
var maxNum = 100;

// draw triangle
var triangleIndex = 0;
var Tmove = [];
var TmoveLoc;
var zoom = 0.0;
var zoomLoc;
var programT;
var TvBuffer;
var TcBuffer;
var trianglePoints = [
	0.0, 0.2,
	-0.17, -0.1,
	0.17, -0.1,
];
var triangleColors = [
	0.0, 0.0, 1.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	1.0, 0.0, 0.0, 1.0
];

// draw square
var squareIndex = 0;
var Smove = [];
var SmoveLoc;
var Stheta = 0;
var SthetaLoc;
var programS;
var SvBuffer;
var ScBuffer;
var squarePoints = [
	0.0, 0.2,
	-0.2, 0.0,
	0.2, 0.0,
	0.0, -0.2,
];
var squareColor = [
	1.0, 0.0, 1.0, 1.0,
	1.0, 0.0, 1.0, 1.0,
	1.0, 0.0, 1.0, 1.0,
	1.0, 0.0, 1.0, 1.0
];

var vertexColors = [
	glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 1.0),  // blue
	glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 1.0),  // green
	glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 1.0),  // cyan
	glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),  // red
	glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 1.0),  // magenta
	glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 1.0),  // yellow
	glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 1.0),  // black
	glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 1.0)   // white
];



window.onload = function initWindow(){
	var controls = document.getElementById("controls");
	for(var i=0;i<controls.length;i++){
		if(controls[i].selected){
			console.log(i);
			variousIndex = i;
			break;
		}
	}
	canvas = document.getElementById("various-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
	    alert("WebGL isn't available");
	}
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
	
	gl.enable(gl.DEPTH_TEST);
	
	// built triangle program, buffer
	programT = initShaders(gl, "trv-shader", "f-shader");
	// gl.useProgram(programT);
	


	// built square program, buffer	
	programS = initShaders(gl, "sqv-shader", "f-shader");
	// gl.useProgram(programS);
	
	
	
	document.getElementById("controls").onchange = function(event){
		var id = parseInt(event.target.value);
		switch(id){
		  case 0:
			console.log("0");
			variousIndex = 0;
			break;
		  case 1:
			console.log("1");
			variousIndex = 1;
			break;
		  case 2:
			console.log("2");
			variousIndex = 2;
			break;  
		  case 3:
			console.log("3");
			variousIndex = 3;
			break;
		}
	};
	
	canvas.addEventListener("mousedown", function(event){
		var rect = canvas.getBoundingClientRect();
		var cx = event.clientX - rect.left;
		var cy = event.clientY - rect.top; // offset
		var NCx = 2 * cx / canvas.width - 1;
		var NCy = 2 * (canvas.height - cy) / canvas.height - 1;
		if(variousIndex == 0){
			triangleCreate(NCx, NCy);	
		}else if(variousIndex == 1){
			squareCreate(NCx, NCy);
		}
		//else if(variousIndex == 2){
		// 	cubeCreate(NCx, NCy);
		// }else if(variousIndex == 3){
		// 	circleCreate(NCx, NCy);
		// }
		
		// triangleCreate(NCx, NCy);
		// squareCreate(NCx, NCy);
	});
	
	// document.getElementById("clearButton").onclick = function(){
	// 	initWindow();
	// 	Tmove = [];
	// 	triangleIndex = 0;
	// };
	
	render();

	function triangleCreate(x, y){
		zoomLoc = gl.getUniformLocation(programT, "zoom");
		TmoveLoc = gl.getUniformLocation(programT, "move");
		
		TvBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, TvBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglePoints), gl.STATIC_DRAW);
		
		var TvPosition = gl.getAttribLocation(programT, "vPosition");
		gl.vertexAttribPointer(TvPosition, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(TvPosition);
		
		TcBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, TcBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColors), gl.STATIC_DRAW);
		
		var TvColor = gl.getAttribLocation(programT, "vColor");
		gl.vertexAttribPointer(TvColor, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(TvColor);
		// gl.useProgram(programT);
		// gl.bindBuffer(gl.ARRAY_BUFFER, TvBuffer);
		// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglePoints), gl.STATIC_DRAW);
		// gl.bindBuffer(gl.ARRAY_BUFFER, TcBuffer);
		// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColors), gl.STATIC_DRAW);
		Tmove.push([x, y]);
		triangleIndex++;
	}
	
	function squareCreate(x, y){
		SmoveLoc = gl.getUniformLocation(programS, "move");
		SthetaLoc = gl.getUniformLocation(programS, "theta");
		
		SvBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, SvBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squarePoints), gl.STATIC_DRAW);
		
		var SvPosition = gl.getAttribLocation(programS, "vPosition");
		gl.vertexAttribPointer(SvPosition, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(SvPosition);
		
		ScBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, ScBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareColor), gl.STATIC_DRAW);
		
		var SvColor = gl.getAttribLocation(programS, "vColor");
		gl.vertexAttribPointer(SvColor, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(SvColor);
		// gl.useProgram(programS);
		Smove.push([x, y]);
		squareIndex++;
	}

}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	triangleRender();
	squareRender();
	

	
	
	requestAnimFrame(render);
}

function triangleRender(){
	gl.useProgram(programT);
	gl.bindBuffer(gl.ARRAY_BUFFER, TvBuffer);
	gl.bindBuffer(gl.ARRAY_BUFFER, TcBuffer);
	zoom -= 0.01;
	if(zoom < -0.5) zoom = 0.0;
	gl.uniform2fv(zoomLoc, [zoom, zoom]);
	for(var i=0;i<triangleIndex;i++){
		gl.uniform2fv(TmoveLoc, Tmove[i]);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}	
}

function squareRender(){
	gl.useProgram(programS);
	gl.bindBuffer(gl.ARRAY_BUFFER, SvBuffer);
	gl.bindBuffer(gl.ARRAY_BUFFER, ScBuffer);
	Stheta += 0.1;
	if(Stheta>2 * Math.PI)
		Stheta -= (2 * Math.PI);
	gl.uniform2fv(SthetaLoc, [0.0, Stheta]);
	for(var i=0;i<squareIndex;i++){
		gl.uniform2fv(SmoveLoc, Smove[i]);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
}



