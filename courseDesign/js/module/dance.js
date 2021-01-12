import * as THREE from 'https://techbrood.com/threejs/build/three.module.js';
import Stats from 'https://techbrood.com/threejs/examples/jsm/libs/stats.module.js';
import { ColladaLoader } from 'https://techbrood.com/threejs/examples/jsm/loaders/ColladaLoader.js';
import { OrbitControls } from 'https://techbrood.com/threejs/examples/jsm/controls/OrbitControls.js';
var container, stats, clock, controls;
var camera, scene, renderer, mixer;
init();
animate();
function init() {
	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 15, 10, - 15 );
	scene = new THREE.Scene();
	clock = new THREE.Clock();
	// collada  导入模型
	var loader = new ColladaLoader();
	loader.load( 'https://techbrood.com/threejs/examples/models/c\
	ollada/stormtrooper/stormtrooper.dae', function ( collada ) {
	// loader.load( './model/stormtrooper.dae', function ( collada ) {
		var animations = collada.animations;  // 导入骨骼动画
		var avatar = collada.scene;
		avatar.traverse( function ( node ) {
			if ( node.isSkinnedMesh ) {
				node.frustumCulled = false;
			}
		} );
		// 控制动画的生成
		mixer = new THREE.AnimationMixer( avatar );
		mixer.clipAction( animations[ 0 ] ).play();
		scene.add( avatar );
	} );
	// 设置网格线
	var gridHelper = new THREE.GridHelper( 10, 20 );
	scene.add( gridHelper );
	
	// 铺设环境光源
	var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
	scene.add( ambientLight );
	// 铺设点光源
	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	scene.add( camera );
	camera.add( pointLight );
	
	// 动画渲染部分
	  // 创建渲染器，同时开启反锯齿
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	  // 设置显示比列
	renderer.setPixelRatio( window.devicePixelRatio );
	  // 设置渲染窗口的大小
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	// 设置轨道控制器，利用鼠标控制相机沿目标物体旋转
	controls = new OrbitControls( camera, renderer.domElement );
	controls.screenSpacePanning = true;
	controls.minDistance = 5;
	controls.maxDistance = 40;
	controls.target.set( 0, 2, 0 );
	controls.update();
	//
	stats = new Stats();
	container.appendChild( stats.dom );
	//
	window.addEventListener( 'resize', onWindowResize, false );
	
	// 调控光源
	changeLight(pointLight);
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}
function render() {
	var delta = clock.getDelta();
	if ( mixer !== undefined ) {
		mixer.update( delta );
	}
	renderer.render( scene, camera );
}
function changeLight(pointLight){
	var lightChange = document.getElementById('lightColor');
	lightChange.onchange = function(){
		camera.remove(pointLight);
		// console.log(this.value);
		pointLight = new THREE.PointLight( this.value, 0.8 );
		camera.add( pointLight );
	}	
}
