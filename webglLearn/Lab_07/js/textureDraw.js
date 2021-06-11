"use strict";

const{vec3, vec4, mat3, mat4, vec2, quat} = glMatrix;

var texSize = 64;
var numChecks = 8;
var image1 = new Uint8Array(4 * texSize * texSize);
function makeImage1(){
	for(var i=0;i<texSize;i++){
		for(var j=0;j<texSize;j++){
			var patchx = Math.floor(i/(texSize/numChecks));
			var patchy = Math.floor(j/(texSize/numChecks));
			var c = (patchx%2 !== patchy%2 ? 255 : 0);
			
			image1[4*i*texSize+4*j+0] = c;
			image1[4*i*texSize+4*j+1] = c;
			image1[4*i*texSize+4*j+2] = c;
			image1[4*i*texSize+4*j+3] = 255;
		}
	}	
}

var image2 = new Uint8Array(4 * texSize * texSize);
function makeImage2(){
	for (var i=0;i<texSize;i++){
		for (var j=0;j<texSize;j++){
			var c = 127 + 127 * Math.sin(0.1*i*j);
			image2[4*i*texSize+4*j+0] = c;
			image2[4*i*texSize+4*j+1] = c;
			image2[4*i*texSize+4*j+2] = c;
			image2[4*i*texSize+4*j+3] = 255;
		}
	}
}

function configureTexture(){
	makeImage1();
	makeImage2();
    var texture1 = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture1 );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
	// gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image1 );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image1 );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
	
    var texture2= gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture2 );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
	// gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image2s );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image2 );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
	
	return [texture1, texture2];
}

