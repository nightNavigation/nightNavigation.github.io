"use strict";
// 严格模式的定义不允许使用未定义的变量

var gl;
var gl2;
var points;

window.onload = function init(){
	var canvas = document.getElementById("triangle-canvas");
	var canvas2 = document.getElementById("triangle2-canvas");
	// WebGLUtils.setupWebGL()函数，用以打包创建WbeGL上下文
	gl = WebGLUtils.setupWebGL(canvas);
	gl2 = WebGLUtils.setupWebGL(canvas2);
	if(!gl || !gl2){
	// 固定格式，判定WebGL是否能够使用
		alert("WebGL isn't available.");
	}
	
	// Three Vertices
	var vertices = [
		-1.0, -1.0,
		 0.0,  1.0,
		 1.0, -1.0,
	];
	
	// Three Colors
	var colors = [
		1.0, 0.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
	];
	
	// Configure WebGL
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl2.viewport(0, 0, canvas.width, canvas.height);
	gl2.clearColor(0.5, 0.5, 0.5, 1.0);
		
	// Load shaders and initialize attribute buffers
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	var Pcolor = initShaders(gl2, "vertex-shader-new", "fragment-shader-new");
	gl2.useProgram(Pcolor);	
	
	//Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
		
	var pbuffer = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, pbuffer);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices), gl2.STATIC_DRAW);	
	
	var vPosition2 = gl2.getAttribLocation(Pcolor, "vPosition");
	gl2.vertexAttribPointer(vPosition2, 2, gl2.FLOAT, false, 0, 0);
	gl2.enableVertexAttribArray(vPosition2);

	var cbuffer = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cbuffer);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(colors), gl2.STATIC_DRAW);	

	var vColor = gl2.getAttribLocation(Pcolor, "vColor");
	gl2.vertexAttribPointer(vColor, 4, gl2.FLOAT, false, 0, 0);
	gl2.enableVertexAttribArray(vColor);
	
	render();
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	gl2.clear(gl2.COLOR_BUFFER_BIT);
	gl2.drawArrays(gl2.TRIANGLES, 0, 3);
}