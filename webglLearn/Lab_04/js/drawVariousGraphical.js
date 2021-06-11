"use strict";

var canvas;
var gl;

var maxNumTriangles = 500;
var maxNumVertices = 3 * maxNumTriangles;
var variousIndex = 0;
var pointIndex = 0;
var triangleIndex = 0;
var squareIndex = 0;
var circleIndex = 0;
var sideN = 6;

var Zoom = 0.0;
var theta = 0.0;

var zoomLoc;
var moveLoc;
var thetaLoc;
var move = [];
var shape = [];

var trianglePoints = [
	0.0, 0.2, 0.0,
	-0.17, -0.1, 0.0,
	0.17, -0.1, 0.0
];
var squarePoints = [
	0.0, 0.2, 0.0,
	-0.2, 0.0, 0.0,
	0.2, 0.0, 0.0,
	0.0, -0.2, 0.0
];
var circlePoints = [
	0.0, 0.0, 0.0
];

var vertexColors = [
	glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 1.0),  // black
	glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 1.0),  // blue
	glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 1.0),  // green
	glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 1.0),  // cyan
	glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),  // red
	glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 1.0),  // magenta
	glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 1.0),  // yellow
	glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 1.0)   // white
];


window.onload = function initWindow(){
	canvas = document.getElementById("various-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
	    alert("WebGL isn't available");
	}
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
	
	gl.enable(gl.DEPTH_TEST);

	// load shaders and initialize attribute buffer
	var program = initShaders(gl, "v-shader", "f-shader");
	gl.useProgram(program);
	
	zoomLoc = gl.getUniformLocation(program, "zoom");
	moveLoc = gl.getUniformLocation(program, "move");
	thetaLoc = gl.getUniformLocation(program, "theta");
	
	var vBuffer = gl.createBuffer(); //position
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );

	var cBuffer = gl.createBuffer(); // color
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	
	document.getElementById("controls").onchange = function(event){
		var id = parseInt(event.target.value);
		switch(id){
		  case 0:
			// console.log("0");
			variousIndex = 0;
			break;
		  case 1:
			// console.log("1");
			variousIndex = 1;
			break;
		  case 2:
			// console.log("2");
			variousIndex = 2;
			break;  
		  case 3:
			// console.log("3");
			variousIndex = 3;
			break;
		}
	};
	
	document.getElementById("sideSel").onchange = function(event){
		sideN = document.getElementById("sideSel").value * 3;
		console.log(sideN);
	}
	
	canvas.addEventListener("mousedown", function(event){
		var rect = canvas.getBoundingClientRect();
		var cx = event.clientX - rect.left;
		var cy = event.clientY - rect.top; // offset
		var NCx = 2 * cx / canvas.width - 1;
		var NCy = 2 * (canvas.height - cy) / canvas.height - 1;
		var t, c;
		if(variousIndex == 0){
			triangleCreate(NCx, NCy);	
		}else if(variousIndex == 1){
			squareCreate(NCx, NCy);
		}else if(variousIndex == 2){
			cubeCreate(NCx, NCy);
		}else if(variousIndex == 3){
			circleCreate(NCx, NCy);
		}
	});
	
	document.getElementById("clearButton").onclick = function(){
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.deleteBuffer(vBuffer);
		gl.deleteBuffer(cBuffer);
		// triangleIndex = 0;
		// squareIndex = 0;
		// pointIndex = 0;
		// move = [];
		// shape = [];
	};
	
	render();
	
	function triangleCreate(x, y){
		move.push(x, y);
		shape.push(0);
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		for(var i=0;i<3;i++){
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(glMatrix.vec4.fromValues(trianglePoints[i*3], trianglePoints[i*3+1], trianglePoints[i*3+2], 1.0)))
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		for(var i=0;i<3;i++){
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(vertexColors[triangleIndex%8]));
		}
		triangleIndex++;
		pointIndex += 3;
	};
	
	function squareCreate(x, y){
		move.push(x, y);
		shape.push(1);
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		for(var i=0;i<4;i++){
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(glMatrix.vec4.fromValues(squarePoints[i*3], squarePoints[i*3+1], squarePoints[i*3+2], 1.0)))
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		for(var i=0;i<4;i++){
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(vertexColors[squareIndex%8]));
		}
		squareIndex++;
		pointIndex += 4;
	};
	
	function cubeCreate(x, y){
		move.push(x, y);
		shape.push(2);
		var vertices = [
			glMatrix.vec4.fromValues(-0.2, -0.2, 0.2, 1.0),
			glMatrix.vec4.fromValues(-0.2, 0.2, 0.2, 1.0),
			glMatrix.vec4.fromValues(0.2, 0.2, 0.2, 1.0),
			glMatrix.vec4.fromValues(0.2, -0.2, 0.2, 1.0),
			glMatrix.vec4.fromValues(-0.2, -0.2, -0.2, 1.0),
			glMatrix.vec4.fromValues(-0.2, 0.2, -0.2, 1.0),
			glMatrix.vec4.fromValues(0.2, 0.2, -0.2, 1.0),
			glMatrix.vec4.fromValues(0.2, -0.2, -0.2, 1.0),
		];
		
		var faces = [
			1, 0, 3, 1, 3, 2, //正
			2, 3, 7, 2, 7, 6, //右
			3, 0, 4, 3, 4, 7, //底
			6, 5, 1, 6, 1, 2, //顶
			4, 5, 6, 4, 6, 7, //背
			5, 4, 0, 5, 0, 1  //左
		];
		
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		for (var i=0;i<faces.length;i++) {
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(glMatrix.vec4.fromValues(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2], 1.0)));
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		for(var i=0;i<faces.length;i++){
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(vertexColors[Math.floor(i / 6)]));
		}
		pointIndex += faces.length;
	};
	
	function circleCreate(x, y){
		circlePoints = [];
		move.push(x, y);
		shape.push(3);
		var alpha = 2 * Math.PI / sideN;
		var rand = Math.floor(Math.random()*10) % 8;
		for(var j=0;j<=circleIndex;j++){
			circlePoints.push(0.0, 0.0, 0.0);
			for(var i=0;i<=sideN;i++){
				circlePoints.push(0.2 * Math.cos(Math.PI-alpha*i), 0.2 * Math.sin(Math.PI-alpha*i), 0.0);
			}
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		for(var i=0;i<circlePoints.length/3;i++){
			// console.log(circlePoints[i*3], circlePoints[i*3+1], circlePoints[i*3+2]);
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(glMatrix.vec4.fromValues(circlePoints[i*3], circlePoints[i*3+1], circlePoints[i*3+2], 1.0)));
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		for(var i=0;i<circlePoints.length/3;i++){
			gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (pointIndex + i), new Float32Array(vertexColors[rand]));
		}
		pointIndex += 40;
	};
	
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	var index = 0;
	for(var i=0;i<shape.length;i++){
		gl.uniform2fv(moveLoc, [move[i*2], move[i*2+1]]);	
		// console.log("i: ", i, "shape: ", shape[i], "move: ", [move[i*2], move[i*2+1]]);
		if(shape[i] == 0){
			zoomTriangle(index);	
			index += 3;
		}else if(shape[i] == 1){
			rotateSquare(index);
			index += 4;
		}else if(shape[i] == 2){
			rotateCube(index);
			index += 36;
		}else if(shape[i] == 3){
			randerCircle(index);
			index += 40;
		}
		console.log("pointIndex:",pointIndex, "index: ",index);
	}

	requestAnimFrame(render);
}

function zoomTriangle(index){
	Zoom -= 0.01;
	if(Zoom < -0.5) Zoom = 0.0;
	gl.uniform2fv(zoomLoc, [Zoom, Zoom]);
	gl.uniform2fv(thetaLoc, [0.0, 0.0]);
	// console.log("triangle", index, index+3, move);
	gl.drawArrays(gl.TRIANGLES, index, 3);
	sleep(50);
}

function rotateSquare(index){
	theta += 0.1;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	gl.uniform2fv(zoomLoc, [0.0, 0.0]);
	gl.uniform2fv(thetaLoc, [0.0, theta]);
	// console.log(index, "square");
	// gl.uniform2fv(moveLoc, [move[i*2], move[i*2+1]]);
	gl.drawArrays(gl.TRIANGLE_STRIP, index, 4);
	sleep(50);
}

function rotateCube(index){
	theta += 0.1;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	gl.uniform2fv(zoomLoc, [0.0, 0.0]);
	gl.uniform2fv(thetaLoc, [theta, theta]);
	// console.log(index, "cube");
	// gl.uniform2fv(moveLoc, [move[i*2], move[i*2+1]]);
	gl.drawArrays(gl.TRIANGLES, index, 36);
	sleep(50);
}

function randerCircle(index){
	gl.uniform2fv(zoomLoc, [0.0, 0.0]);
	gl.uniform2fv(thetaLoc, [0.0, 0.0]);	
	gl.drawArrays(gl.TRIANGLE_FAN, index, sideN+2);
	sleep(50);
}

function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
		return;
	}
}



