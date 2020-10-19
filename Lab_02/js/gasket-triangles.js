"use strict";

const {vec3} = glMatrix;
var gl;
var points = [];
var colors = [];
var numTimes = 4;
var isShape = "2d";
var theta = 60;
var twist = false;
var radius = 1.0;
var isRotate = false;

window.onload = function init(){
	var canvas = document.getElementById("triangle-canvas");
	var selNum = document.getElementById("selNum");
	var selShape = document.getElementById("selShape");
	var selSwitch = document.getElementById("selSwitch");
	var oRotate = document.getElementById("rotate");
	var oCancel = document.getElementById("Cancel");
	
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl){
		alert("WebGL isn't available.");
	}
	// Configure WebGL
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);	
	
	if(isShape == "2d" || isShape == "wire"){
		if(isShape == "wire" && isRotate){
			// alert("is linear. and rotate");
			
			// first, initialise the corners of the gasket with three points.
			// R=0.6, Theta = 90, 210, -30
			var vertices = [
				radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0),  0,
				radius * Math.cos(210 * Math.PI / 180.0), radius * Math.sin(210 * Math.PI / 180.0),  0,
				radius * Math.cos(-30 * Math.PI / 180.0), radius * Math.sin(-30 * Math.PI / 180.0),  0
			];
			
		}else{
			// Three Vertices
			var vertices = [
				-1.0, -1.0, 0.0,
				 0.0,  1.0, 0.0, 
				 1.0, -1.0, 0.0
			];
		}

		// var u = vec3.create();
		// vec3.set(u, -1, -1, 0);
		var u = vec3.fromValues(vertices[0], vertices[1], vertices[2]);
		var v = vec3.fromValues(vertices[3], vertices[4], vertices[5]);
		var w = vec3.fromValues(vertices[6], vertices[7], vertices[8]);
		
		divideTriangle2d(u, v, w, numTimes);		
		
		// Load shaders and initialize attribute buffers
		var program = initShaders(gl, "vertex-shader-2d", "fragment-shader-2d");
		gl.useProgram(program);
		
		//Load the data into the GPU
		var bufferId = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
		
		// Associate external shader variables with data buffer
		var vPosition = gl.getAttribLocation(program, "vPosition");
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vPosition);
		
		if(isShape == "wire") renderTriangles();
		else render2d();
	}else{
		var vertices = [
			 0.0000, 0.0000, -1.0000,
			 0.0000, 0.9428,  0.3333,
			-0.8165, -0.4714, 0.3333,
			 0.8165, -0.4714, 0.3333
		];

		var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
		var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
		var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
		var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );

		divideTetra3d(t, u, v, w, numTimes);

		// enable hidden-surface removal
		gl.enable(gl.DEPTH_TEST);

		// load shaders and initialize attribute buffers
		var program = initShaders(gl, "vertex-shader-3d", "fragment-shader-3d");
		gl.useProgram(program);

		// create buffer object, initialize it, and associate it with
		// attribute variables in vertex shader
		var vBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

		var vPosition = gl.getAttribLocation(program, "vPosition");
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vPosition);

		var cBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		var vColor = gl.getAttribLocation(program, "vColor");
		gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vColor);

		render3d();
	}

	// task1
	selNum.onmouseup = function(){
		points = [];
		numTimes = selNum.value;
		init();
	}
	
	// task2 and task3
	selShape.onclick = function(){
		points = [];
		var temp = document.getElementsByName("shape");
		for(var i=0;i<temp.length;i++){
			if(temp[i].checked){
				// alert("checked :" + temp[i].value);
				isShape = temp[i].value;
			} 
		}
		if(isShape != "wire"){
			isRotate = false;
			twist = false;
			document.getElementsByName("switch")[0].checked = true;
		}
		init();
	}
	
	// task4 and task 5
	selSwitch.onclick = function(){
		points = [];
		var temp = document.getElementsByName("switch");
		if(temp[0].checked){
			isRotate = false;
			twist = false;
		}else{
			if(!document.getElementsByName("shape")[2].checked){
				alert("不是线框");
			}else if (temp[1].checked){
				isRotate = true;
				twist = false;
			}else{
				isRotate = true;
				twist = true;
			}
		}
		init();
	}
	
	oRotate.onmouseup = function(){
		points = [];
		theta = oRotate.value;
		init();
	}
	
	oCancel.onclick = function(){
		points = [];
		tetra = 60;
		isShape = "2d";
		isRotate = false;
		numTimes = document.getElementById("selNum").value = 4;
		document.getElementsByName("shape")[0].checked = true;
		document.getElementsByName("switch")[0].checked = true;
		document.getElementById("rotate").value = 60;
		init();
	}
	
}



function triangle2d(a, b, c){
	points.push(a[0], a[1], a[2]);
	if(isShape == "wire") points.push(b[0], b[1], b[2]);
	points.push(b[0], b[1], b[2]);
	if(isShape == "wire") points.push(c[0], c[1], c[2]);
	points.push(c[0], c[1], c[2]);
	if(isShape == "wire") points.push(a[0], a[1], a[2]);
	// var k;
	// for(k = 0; k < 3; k++)
	// 	points.push(a[k]);
	// for(k = 0; k < 3; k++)
	// 	points.push(b[k]);
	// for(k = 0; k < 3; k++)
	// 	points.push(c[k]);	
}

function divideTriangle2d(a, b, c, count){
	if(count == 0){
		if(isRotate) tessellaTriangle(a, b, c);
		else triangle2d(a, b, c);
	}else{
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var ac = vec3.create();
		vec3.lerp(ac, a, c, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		
		--count;

		// three new triangles
		divideTriangle2d(a, ab, ac, count);
		divideTriangle2d(b, bc, ab, count);
		divideTriangle2d(c, ac, bc, count);		
		if(isShape == "wire") divideTriangle2d(ab, ac, bc, count);
	}
}

function render2d(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.drawArrays( gl.TRIANGLES, 0, 3);
	gl.drawArrays( gl.TRIANGLES, 0, points.length/3);
}


function triangle3d(a, b, c, color) {
    // add colors and vertices for one triangle
    var baseColor = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 0.0
    ];

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(a[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(b[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(c[k]);
}

function tetra(a, b, c, d) {
    triangle3d(a, c, b, 0);
    triangle3d(a, c, d, 1);
    triangle3d(a, b, d, 2);
    triangle3d(b, c, d, 3);
}

function divideTetra3d(a, b, c, d, count) {
	// check for end of recursion
	if (count == 0) {
		tetra(a, b, c, d);
	} else {
		var ab = vec3.create();
		glMatrix.vec3.lerp(ab, a, b, 0.5);
		var ac = vec3.create();
		glMatrix.vec3.lerp(ac, a, c, 0.5);
		var ad = vec3.create();
		glMatrix.vec3.lerp(ad, a, d, 0.5);
		var bc = vec3.create();
		glMatrix.vec3.lerp(bc, b, c, 0.5);
		var bd = vec3.create();
		glMatrix.vec3.lerp(bd, b, d, 0.5);
		var cd = vec3.create();
		glMatrix.vec3.lerp(cd, c, d, 0.5);

		--count;

		divideTetra3d(a, ab, ac, ad, count);
		divideTetra3d(ab, b, bc, bd, count);
		divideTetra3d(ac, bc, c, cd, count);
		divideTetra3d(ad, bd, cd, d, count);
	}

}

function render3d() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);
}


function tessellaTriangle( a, b, c ){
	//var k;
	var zerovec3 = vec3.create();
	vec3.zero( zerovec3 );
	var radian = theta * Math.PI / 180.0;

	var a_new = vec3.create();
	var b_new = vec3.create();
	var c_new = vec3.create();

	if( twist == false ){
		vec3.rotateZ( a_new, a, zerovec3, radian );
		vec3.rotateZ( b_new, b, zerovec3, radian );
		vec3.rotateZ( c_new, c, zerovec3, radian );
		
		points.push( a_new[0], a_new[1], a_new[2] );
		points.push( b_new[0], b_new[1], b_new[2] );
		points.push( b_new[0], b_new[1], b_new[2] );
		points.push( c_new[0], c_new[1], c_new[2] );
		points.push( c_new[0], c_new[1], c_new[2] );
		points.push( a_new[0], a_new[1], a_new[2] );
	}else{
		var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
		var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
		var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );

		vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ), 
			a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
		vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
			b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
		vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
			c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);
		
		points.push(a_new[0], a_new[1], a_new[2]);
		points.push(b_new[0], b_new[1], b_new[2]);
		points.push(b_new[0], b_new[1], b_new[2]);
		points.push(c_new[0], c_new[1], c_new[2]);
		points.push(c_new[0], c_new[1], c_new[2]);
		points.push(a_new[0], a_new[1], a_new[2]);

	}
}

function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}