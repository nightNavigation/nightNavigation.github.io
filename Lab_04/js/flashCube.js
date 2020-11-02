"use strict";

var canvas;
var gl;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];
var move = [0, 0, 0];
var zoom = [0, 0, 0];

var thetaLoc;
var moveLoc;
var zoomLoc;

var rotationQuaternion;
var rotationQuaternionLoc;

var angle = 0.0;
var trackBallAxis = [0, 0, 1];

var trackingMouse = false;
var trackballMove = false;

var lastPos = [0, 0, 0];
var curx, cury;
var startx, starty;

window.onload = function initWindow() {
    canvas = document.getElementById("rt-cb-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

    makeCube();

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	gl.enable(gl.DEPTH_TEST);

	// load shaders and initialize attribute buffer
	var program = initShaders(gl, "rt-vshader", "rt-fshader");
	gl.useProgram(program);
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	
	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	gl.uniform3fv(thetaLoc, theta);	
	moveLoc = gl.getUniformLocation(program, "move");
	gl.uniform3fv(moveLoc, move);
	zoomLoc = gl.getUniformLocation(program, "zoom");
	gl.uniform3fv(zoomLoc, zoom);
	
	// task.a rotate along x/ y/ z axis
	document.getElementById("xButton").onclick = function(){
		axis = xAxis;
	}
	document.getElementById("yButton").onclick = function(){
		axis = yAxis;
	}
	document.getElementById("zButton").onclick = function(){
		axis = zAxis;
	}
	
	// task.b translation along x/ y/ z axis
	var xTR = document.getElementById("xTranslation");
	xTR.onchange = function(){
		move[0] = xTR.value/100;
	}
	var yTR = document.getElementById("yTranslation");
	yTR.onchange = function(){
		move[1] = yTR.value/100;
	}
	var zTR = document.getElementById("zTranslation");
	zTR.onchange = function(){
		move[2] = zTR.value/100;
	}
	
	// task.c zoom along x/ y/ z axis
	var xZoom = document.getElementById("xZoom");
	xZoom.onchange = function(){
		zoom[0] = xZoom.value/100;
	}
	var yZoom = document.getElementById("yZoom");
	yZoom.onchange = function(){
		zoom[1] = yZoom.value/100;
	}
	var zZoom = document.getElementById("zZoom");
	zZoom.onchange = function(){
		zoom[2] = zZoom.value/100;
	}
	
	// task.d change control axis by track ball
	rotationQuaternion = glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 0.0);
	rotationQuaternionLoc = gl.getUniformLocation(program, "r");
	gl.uniform4fv(rotationQuaternionLoc, new Float32Array(rotationQuaternion));
	
	canvas.addEventListener("mousedown", function(event){
		var x = 2*event.clientX/canvas.width-1;
		var y = 2*(canvas.height-event.clientY)/canvas.height-1;
		startMotion(x, y);
	});

	canvas.addEventListener("mouseup", function(event){
		var x = 2*event.clientX/canvas.width-1;
		var y = 2*(canvas.height-event.clientY)/canvas.height-1;
		stopMotion(x, y);
	});

	canvas.addEventListener("mousemove", function(event){
		var x = 2*event.clientX/canvas.width-1;
		var y = 2*(canvas.height-event.clientY)/canvas.height-1;
		moveMotion(x, y);
	});
	
	render();
}

function makeCube(){
	var vertices = [
		glMatrix.vec4.fromValues(-0.5, -0.5,  0.5, 1.0),
		glMatrix.vec4.fromValues(-0.5,  0.5,  0.5, 1.0),
		glMatrix.vec4.fromValues( 0.5,  0.5,  0.5, 1.0),
		glMatrix.vec4.fromValues( 0.5, -0.5,  0.5, 1.0),
		glMatrix.vec4.fromValues(-0.5, -0.5, -0.5, 1.0),
		glMatrix.vec4.fromValues(-0.5,  0.5, -0.5, 1.0),
		glMatrix.vec4.fromValues( 0.5,  0.5, -0.5, 1.0),
		glMatrix.vec4.fromValues( 0.5, -0.5, -0.5, 1.0)
	];
	
	var vertexColors = [
		glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 1.0),  // 黑
		glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 1.0),  // 蓝
		glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 1.0),  // 绿
		glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 1.0),  // 青
		glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),  // 红
		glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 1.0),  // 品红
		glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 1.0),  // 黄
		glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 1.0)   // 白
	];
	
	var faces = [
		1, 0, 3, 1, 3, 2, // 正
		2, 3, 7, 2, 7, 6, // 右
		3, 0, 4, 3, 4, 7, // 底
		6, 5, 1, 6, 1, 2, // 顶
		4, 5, 6, 4, 6, 7, // 背
		5, 4, 0, 5, 0, 1  // 左
	];

	for (var i = 0; i < faces.length; i++) {
		points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);
		colors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
	}	
}

function multq(a, b){
	var s = glMatrix.vec3.fromValues(a[1], a[2], a[3]);
	var t = glMatrix.vec3.fromValues(b[1], b[2], b[3]);
	var u = glMatrix.vec4.create();
	var u1 = a[0] * b[0] - glMatrix.vec3.dot(s, t);
	var u2 = glMatrix.vec3.create();
	glMatrix.vec3.cross(u2, t, s);
	var u3 = glMatrix.vec3.create();
	glMatrix.vec3.scale(u3, t, a[0]);
	var u4 = glMatrix.vec3.create();
	glMatrix.vec3.scale(u4, s, b[0]);
	glMatrix.vec3.add(u3, u3, u4);
	glMatrix.vec3.add(u2, u2, u3);
	glMatrix.vec4.set(u, u1, u2[0], u2[1], u2[2]);
	return u;
}

function trackballView(x, y){
	var d, a;
	var v = [];

	v[0] = x;
	v[1] = y;

	d = v[0]*v[0]+v[1]*v[1];
	if( d < 1.0 ){
		v[2] = Math.sqrt(1.0 - d);
	}else{
		v[2] = 0.0;
		a = 1.0/Math.sqrt(d);
		v[0] *= a;
		v[1] *= a;
	}
	return v;
}

function startMotion(x, y){
	trackingMouse = true;
	startx = x;
	starty = y;
	curx = x;
	cury = y;
	
	lastPos = trackballView(x, y);
	trackballMove = true;
}

function stopMotion( x, y ){
	trackingMouse = false;
	if( startx != x || starty != y ){
	}else{
		angle = 0.0;
		trackballMove = false;
	}
}

function moveMotion(x, y){
	var dx, dy, dz;
	
	var curPos = trackballView(x, y);
	if(trackingMouse){
		dx = curPos[0] - lastPos[0];
		dy = curPos[1] - lastPos[1];
		dz = curPos[2] - lastPos[2];
	
		if(dx||dy||dz){
			angle = -1.0*Math.sqrt(dx*dx + dy*dy + dz*dz);
	
			trackBallAxis[0] = lastPos[1] * curPos[2] - lastPos[2] * curPos[1];
			trackBallAxis[1] = lastPos[2] * curPos[0] - lastPos[0] * curPos[2];
			trackBallAxis[2] = lastPos[0] * curPos[1] - lastPos[1] * curPos[0];
	
			lastPos[0] = curPos[0];
			lastPos[1] = curPos[1];
			lastPos[2] = curPos[2];
		}
	}
	render();
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	theta[axis] += 0.1;
	gl.uniform3fv(thetaLoc, theta);
	gl.uniform3fv(moveLoc, move);
	gl.uniform3fv(zoomLoc, zoom);
	if(trackballMove){
		glMatrix.vec3.normalize(trackBallAxis, trackBallAxis);
		var cosa = Math.cos(angle/2.0);
		var sina = Math.sin(angle/2.0);
		
		var rotation = glMatrix.vec4.fromValues(cosa, sina*trackBallAxis[0], sina*trackBallAxis[1], sina*trackBallAxis[2]);
		rotationQuaternion = multq(rotationQuaternion, rotation);
		gl.uniform4fv(rotationQuaternionLoc, new Float32Array(rotationQuaternion)); 
	}
	gl.drawArrays(gl.TRIANGLES, 0, points.length/3);
	
	requestAnimFrame(render);
}

