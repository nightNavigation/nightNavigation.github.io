"use strict";
// 严格模式的定义不允许使用未定义的变量

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById("triangle-canvas");
	// WebGLUtils.setupWebGL()函数，用以打包创建WbeGL上下文
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl){
	// 固定格式，判定WebGL是否能够使用
		alert("WebGL isn't available.");
	}
	
	// Three Vertices
	var vertices = [
		-1.0, -1.0,
		 0.0,  1.0,
		 1.0, -1.0,
	];
	
	// Configure WebGL
	// viewport(x, y ,w, h) 设置视口参数。记左下角为原点(0, 0),前两个参数为视口相对原点的坐标，后两个参数确定视口的大小。
	gl.viewport(0, 0, canvas.width, canvas.height);
	// clearColor() 设置画布背景颜色RGBA，清空并初始化画布背景颜色
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	
	// Load shaders and initialize attribute buffers 加载着色器并初始化属性缓存区 
	// initShaders() 将 两着色器绑定至应用程序对象 gl 
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	// 调用着色程序
	gl.useProgram(program);
	
	//Load the data into the GPU
	// 创建缓冲区对象
	var bufferId = gl.createBuffer();
	// bindBuffer(, ) 将缓冲区绑定于目标对象。
	// 第一个参数为顶点缓冲区对象的类型，第二个参数为要绑定的缓冲对象的名称
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	// bufferData(, , ) 把数据发送到GPU进行缓存
	//第一个参数对应bindBuffer第一个参数，第二个buffer数据，第三个为buffer数据使用方式
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
	// 将缓冲区对象分配给 vPosition; 
	// 参数一：传入数据；参数二，参数三：pointsArray输出的每个元素都包含两个浮点数；
	// 参数四：不需要将数据归一化值(0.0,1.0)；参数五：数组中的值是连续的；参数六：说明缓冲区的起始位置
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	// 连接缓冲区对象和
	gl.enableVertexAttribArray(vPosition);
	
	render();
}

function render(){
	// 清空画布<canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);
	// 参数1、三种取值，不同的三角形绘制方式
	// 参数2、从数组缓存中的哪一位开始绘制，一般从零开始
	// 参数3、顶点的个数
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}