"use strict";

var canvas2;
var gl2;

var vertices2 = [
	0.25, 0.0, 0.0,
	0.0, -0.05, 0.0,
	0.0, 0.2, 0.0,
	-0.05, 0.2, 0.0,
	-0.05, -0.2, 0.0,
	0.0, -0.2, 0.0,
	-0.7, -0.2, 0.0,
	-0.4, -0.2, 0.0,
	-0.4, -0.5, 0.0,
	0.3, -0.2, 0.0,
	0.3, -0.5, 0.0,
	0.6, -0.2, 0.0
];

var delay = 200;

function init(){
	canvas2 = document.getElementById("boat-canvas");
	gl2 = WebGLUtils.setupWebGL(canvas2);
	if(!gl2){
		alert("WebGL isn't available.");
	}
	
	gl2.viewport(0, 0, canvas2.width, canvas2.height);
	gl2.clearColor(0.06, 0.0, 0.2, 1.0);
	
	var program = initShaders(gl2, "vertex-shader", "fragment-shader");
	gl2.useProgram(program);
	
	var bufferBoatId = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, bufferBoatId);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices2), gl2.STATIC_DRAW);
	
	var vPosition2 = gl2.getAttribLocation(program, "vPosition");
	gl2.vertexAttribPointer(vPosition2, 3, gl2.FLOAT, false, 0, 0);
	gl2.enableVertexAttribArray(vPosition2);
	
	boatSail();
}

function boatSail(){
	gl2.clear(gl2.COLOR_BUFFER_BIT);
	
	if(vertices2[18]>1){
		for(var i=0;i<12;i++){
			vertices2[i*3] -= 2;
		}
	}
	for(var i=0;i<12;i++){
		vertices2[i*3] += 0.01;
	}
	
	gl2.drawArrays(gl2.TRIANGLES, 0, 3);
	gl2.drawArrays(gl2.TRIANGLE_FAN, 2, 4);
	gl2.drawArrays(gl2.TRIANGLE_STRIP,6, 6);
	
	setTimeout(function (){ requestAnimFrame(init); }, 1);
	
}
