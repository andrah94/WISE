import{A as e,E as t,F as n,H as r,I as i,L as a,M as o,N as s,O as c,P as l,R as u,S as d,T as f,V as p,_ as m,a as h,c as g,ct as _,dt as v,i as ee,j as y,k as te,l as ne,n as re,o as ie,r as ae,s as b,st as oe,t as se,u as ce,ut as le}from"./data-Ct8wfGMr.js";var x={name:`contact`,size:24,node:[[`path`,{d:`M16 2v2`,key:`scm5qe`}],[`path`,{d:`M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2`,key:`k82dct`}],[`path`,{d:`M8 2v2`,key:`pbkmx`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}],[`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`,key:`h1oib`}]]};x.node;var ue=i(x),S={name:`share-2`,size:24,node:[[`circle`,{cx:`18`,cy:`5`,r:`3`,key:`gq8acd`}],[`circle`,{cx:`6`,cy:`12`,r:`3`,key:`w7nqdw`}],[`circle`,{cx:`18`,cy:`19`,r:`3`,key:`1xt0gg`}],[`line`,{x1:`8.59`,x2:`15.42`,y1:`13.51`,y2:`17.49`,key:`47mynk`}],[`line`,{x1:`15.41`,x2:`8.59`,y1:`6.51`,y2:`10.49`,key:`1n3mei`}]]};S.node;var de=i(S),fe=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,C=8294400,pe=class{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=ge();uniformCache={};textureUnitMap=new Map;ownerDocument;constructor(e,t,n,r,i=0,a=0,o=2,s=C,c=[]){if(e?.nodeType===1)this.parentElement=e;else throw Error(`Paper Shaders: parent element must be an HTMLElement`);if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector(`style[data-paper-shader]`)){let e=this.ownerDocument.createElement(`style`);e.innerHTML=he,e.setAttribute(`data-paper-shader`,``),this.ownerDocument.head.prepend(e)}let l=this.ownerDocument.createElement(`canvas`);this.canvasElement=l,this.parentElement.prepend(l),this.fragmentShader=t,this.providedUniforms=n,this.mipmaps=c,this.currentFrame=a,this.minPixelRatio=o,this.maxPixelCount=s;let u=l.getContext(`webgl2`,r);if(!u)throw Error(`Paper Shaders: WebGL is not supported in this browser`);this.gl=u,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener(`resize`,this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(i),this.parentElement.setAttribute(`data-paper-shader`,``),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener(`visibilitychange`,this.handleDocumentVisibilityChange)}initProgram=()=>{let e=me(this.gl,fe,this.fragmentShader);e&&(this.program=e)};setupPositionAttribute=()=>{let e=this.gl.getAttribLocation(this.program,`a_position`),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let e={u_time:this.gl.getUniformLocation(this.program,`u_time`),u_pixelRatio:this.gl.getUniformLocation(this.program,`u_pixelRatio`),u_resolution:this.gl.getUniformLocation(this.program,`u_resolution`)};Object.entries(this.providedUniforms).forEach(([t,n])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),n instanceof HTMLImageElement){let n=`${t}AspectRatio`;e[n]=this.gl.getUniformLocation(this.program,n)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;intersectionObserver=null;isInViewport=!0;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let t=e.devicePixelContentBoxSize?.[0];t!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=t.inlineSize,this.parentDevicePixelHeight=t.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};setupIntersectionObserver=()=>{let e=this.ownerDocument.defaultView;e?.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([e])=>{this.isInViewport=e?.isIntersecting??!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let e=0,t=0,n=Math.max(1,window.devicePixelRatio),r=visualViewport?.scale??1;if(this.devicePixelsSupported){let i=Math.max(1,this.minPixelRatio/n);e=this.parentDevicePixelWidth*i*r,t=this.parentDevicePixelHeight*i*r}else{let i=Math.max(n,this.minPixelRatio)*r;if(this.isSafari){let e=_e(this.ownerDocument);i*=Math.max(1,e)}e=Math.round(this.parentWidth)*i,t=Math.round(this.parentHeight)*i}let i=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*t),a=Math.min(1,i),o=Math.round(e*a),s=Math.round(t*a),c=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==s||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=o,this.canvasElement.height=s,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn(`Tried to render before program or gl was initialized`);return}let t=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=t*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&=(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed===0?this.rafId=null:this.requestRender()};requestRender=()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,t)=>{if(!t.complete||t.naturalWidth===0)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let n=this.textures.get(e);n&&this.gl.deleteTexture(n),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);let i=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||i===null){console.error(`Paper Shaders: WebGL error when uploading texture:`,a);return}this.textures.set(e,i);let o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,r);let n=`${e}AspectRatio`,i=this.uniformLocations[n];if(i){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(i,e)}}};areUniformValuesEqual=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)&&e.length===t.length?e.every((e,n)=>this.areUniformValuesEqual(e,t[n])):!1;setUniformValues=e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([e,t])=>{let n=t;if(t instanceof HTMLImageElement&&(n=`${t.src.slice(0,200)}|${t.naturalWidth}x${t.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[e],n))return;this.uniformCache[e]=n;let r=this.uniformLocations[e];if(!r){console.warn(`Uniform location for ${e} not found`);return}if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let n=null,i=null;if(t[0]!==void 0&&Array.isArray(t[0])){let r=t[0].length;if(t.every(e=>e.length===r))n=t.flat(),i=r;else{console.warn(`All child arrays must be the same length for ${e}`);return}}else n=t,i=n.length;switch(i){case 2:this.gl.uniform2fv(r,n);break;case 3:this.gl.uniform3fv(r,n);break;case 4:this.gl.uniform4fv(r,n);break;case 9:this.gl.uniformMatrix3fv(r,!1,n);break;case 16:this.gl.uniformMatrix4fv(r,!1,n);break;default:console.warn(`Unsupported uniform array length: ${i}`)}}else typeof t==`number`?this.gl.uniform1f(r,t):typeof t==`boolean`?this.gl.uniform1i(r,+!!t):console.warn(`Unsupported uniform type for ${e}: ${typeof t}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(e=1)=>{this.speed=e,this.updateCurrentSpeed()};updateCurrentSpeed=()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)};setCurrentSpeed=e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=C)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.updateCurrentSpeed()};dispose=()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&=(this.resizeObserver.disconnect(),null),this.intersectionObserver&&=(this.intersectionObserver.disconnect(),null),visualViewport?.removeEventListener(`resize`,this.handleVisualViewportChange),this.ownerDocument.removeEventListener(`visibilitychange`,this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}};function w(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`An error occurred compiling the shaders: `+e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function me(e,t,n){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),i=r?r.precision:null;i&&i<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,`precision highp float;`),n=n.replace(/precision\s+(lowp|mediump)\s+float/g,`precision highp float`).replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,`$1 highp $3`));let a=w(e,e.VERTEX_SHADER,t),o=w(e,e.FRAGMENT_SHADER,n);if(!a||!o)return null;let s=e.createProgram();return s?(e.attachShader(s,a),e.attachShader(s,o),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.detachShader(s,a),e.detachShader(s,o),e.deleteShader(a),e.deleteShader(o),s):(console.error(`Unable to initialize the shader program: `+e.getProgramInfoLog(s)),e.deleteProgram(s),e.deleteShader(a),e.deleteShader(o),null)):null}var he=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function ge(){let e=navigator.userAgent.toLowerCase();return e.includes(`safari`)&&!e.includes(`chrome`)&&!e.includes(`android`)}function _e(e){let t=visualViewport?.scale??1,n=visualViewport?.width??window.innerWidth,r=window.innerWidth-e.documentElement.clientWidth,i=t*n+r,a=outerWidth/i,o=Math.round(100*a);return o%5==0?o/100:o===33?1/3:o===67?2/3:o===133?4/3:a}var T={fit:`contain`,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},ve={none:0,contain:1,cover:2},ye=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,be=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,xe=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,E={maxColorCount:10},Se=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${E.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${ye}
${be}
${xe}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float mixerGrain = 0.;
  if (u_grainMixer > 0.) {
    mixerGrain = .4 * u_grainMixer * (noise(grainUV, vec2(0.)) - .5);
  }

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${E.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  if (u_grainOverlay > 0.) {
    float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
    grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
    grainOverlay = pow(grainOverlay, 1.3);

    float grainOverlayV = grainOverlay * 2. - 1.;
    vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
    float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
    grainOverlayStrength = pow(grainOverlayStrength, .8);
    color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

    opacity += .5 * grainOverlayStrength;
  }
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;function Ce(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:M;if(typeof e!=`string`)return M;let t,n,r,i=1;if(e.startsWith(`#`))[t,n,r,i]=D(e);else if(e.startsWith(`rgb`)){let a=O(e);if(a===null)return M;[t,n,r,i]=a}else if(e.startsWith(`hsl`)){let a=k(e);if(a===null)return M;[t,n,r,i]=A(a)}else return console.error(`Unsupported color format`,e),M;return[j(t,0,1),j(n,0,1),j(r,0,1),j(i,0,1)]}function D(e){return e=e.replace(/^#/,``),(e.length===3||e.length===4)&&(e=e.split(``).map(e=>e+e).join(``)),e.length===6&&(e+=`ff`),/^[0-9a-f]{8}$/i.test(e)?[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255,parseInt(e.slice(6,8),16)/255]:(console.warn(`Invalid hex color`),M)}function O(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`)/255,parseInt(t[2]??`0`)/255,parseInt(t[3]??`0`)/255,t[4]===void 0?1:parseFloat(t[4])]:null}function k(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`),parseInt(t[2]??`0`),parseInt(t[3]??`0`),t[4]===void 0?1:parseFloat(t[4])]:null}function A(e){let[t,n,r,i]=e,a=t/360,o=n/100,s=r/100,c,l,u;if(n===0)c=l=u=s;else{let e=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),t=s<.5?s*(1+o):s+o-s*o,n=2*s-t;c=e(n,t,a+1/3),l=e(n,t,a),u=e(n,t,a-1/3)}return[c,l,u,i]}var j=(e,t,n)=>Math.min(Math.max(e,t),n),M=[.5,.5,.5,1],N=v(le(),1);function we(e){let t=N.useRef(void 0),n=N.useCallback(t=>{let n=e.map(e=>{if(e!=null){if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}}});return()=>{n.forEach(e=>e?.())}},e);return N.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}function P(e){if(e.naturalWidth<1024&&e.naturalHeight<1024){if(e.naturalWidth<1||e.naturalHeight<1)return;let t=e.naturalWidth/e.naturalHeight;e.width=Math.round(t>1?1024*t:1024),e.height=Math.round(t>1?1024:1024/t)}}var F=oe();async function I(e){let t={},n=[],r=e=>{try{return e.startsWith(`/`)||new URL(e),!0}catch{return!1}},i=e=>{try{return!e.startsWith(`/`)&&new URL(e,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(e).forEach(([e,a])=>{if(typeof a==`string`){let o=a||`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`;if(!r(o)){console.warn(`Uniform "${e}" has invalid URL "${o}". Skipping image loading.`);return}let s=new Promise((n,r)=>{let a=new Image;i(o)&&(a.crossOrigin=`anonymous`),a.onload=()=>{P(a),t[e]=a,n()},a.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${o}`),r()},a.src=o});n.push(s)}else if(a instanceof HTMLImageElement){let r=a.decode().then(()=>{P(a),t[e]=a});n.push(r)}else t[e]=a}),await Promise.all(n),t}var L=(0,N.forwardRef)(function({fragmentShader:e,uniforms:t,webGlContextAttributes:n,speed:r=0,frame:i=0,width:a,height:o,minPixelRatio:s,maxPixelCount:c,mipmaps:l,style:u,...d},f){let[p,m]=(0,N.useState)(!1),h=(0,N.useRef)(null),g=(0,N.useRef)(null),_=(0,N.useRef)(n);(0,N.useEffect)(()=>((async()=>{let n=await I(t);h.current&&!g.current&&(g.current=new pe(h.current,e,n,_.current,r,i,s,c,l),m(!0))})(),()=>{g.current?.dispose(),g.current=null}),[e]),(0,N.useEffect)(()=>{let e=!1;return(async()=>{let n=await I(t);e||g.current?.setUniforms(n)})(),()=>{e=!0}},[t,p]),(0,N.useEffect)(()=>{g.current?.setSpeed(r)},[r,p]),(0,N.useEffect)(()=>{g.current?.setMaxPixelCount(c)},[c,p]),(0,N.useEffect)(()=>{g.current?.setMinPixelRatio(s)},[s,p]),(0,N.useEffect)(()=>{g.current?.setFrame(i)},[i,p]);let v=we([h,f]);return(0,F.jsx)(`div`,{ref:v,style:a!==void 0||o!==void 0?{width:typeof a==`string`&&isNaN(+a)===!1?+a:a,height:typeof o==`string`&&isNaN(+o)===!1?+o:o,...u}:u,...d})});L.displayName=`ShaderMount`;function R(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){if(n===`colors`){let n=Array.isArray(e.colors),r=Array.isArray(t.colors);if(!n||!r){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((e,n)=>e===t.colors?.[n]))return!1;continue}if(Object.is(e[n],t[n])===!1)return!1}return!0}var z={name:`Default`,params:{...T,speed:1,frame:0,colors:[`#e0eaff`,`#241d9a`,`#f75092`,`#9f50d3`],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}};({...T}),{...T},{...T};var Te=(0,N.memo)(function({speed:e=z.params.speed,frame:t=z.params.frame,colors:n=z.params.colors,distortion:r=z.params.distortion,swirl:i=z.params.swirl,grainMixer:a=z.params.grainMixer,grainOverlay:o=z.params.grainOverlay,fit:s=z.params.fit,rotation:c=z.params.rotation,scale:l=z.params.scale,originX:u=z.params.originX,originY:d=z.params.originY,offsetX:f=z.params.offsetX,offsetY:p=z.params.offsetY,worldWidth:m=z.params.worldWidth,worldHeight:h=z.params.worldHeight,...g}){let _={u_colors:n.map(Ce),u_colorsCount:n.length,u_distortion:r,u_swirl:i,u_grainMixer:a,u_grainOverlay:o,u_fit:ve[s],u_rotation:c,u_scale:l,u_offsetX:f,u_offsetY:p,u_originX:u,u_originY:d,u_worldWidth:m,u_worldHeight:h};return(0,F.jsx)(L,{...g,speed:e,frame:t,fragmentShader:Se,uniforms:_})},R),Ee=_(),B=`https://www.wisefinancialpartners.com`,V=`https://imglennwin.com/linktree/`,H={utm_source:`linktree`,utm_medium:`bio`},U=(e=``)=>c(`${B}/`,H)+e,W=[.2,.7,.2,1],G=`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`,K=e=>t(`linktree_click`,{link:e}),q={base:`#1c0e08`,mesh:[`#1c0e08`,`#43200f`,`#7c3514`,`#b85a24`],accent:`#f3ab74`,deep:`#9a3f12`,glow:`240,150,95`,soft:[`#f6d2b0`,`#d98a52`]};function De({theme:e}){let t=u();return(0,F.jsxs)(`div`,{"aria-hidden":!0,className:`pointer-events-none fixed inset-0`,style:{background:e.base},children:[(0,F.jsx)(Te,{className:`absolute inset-0 size-full`,colors:e.mesh,distortion:.9,swirl:.35,speed:t?0:.18,grainOverlay:.12}),(0,F.jsx)(`div`,{className:`absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(var(--glow),.16),transparent_70%)]`})]})}var J=`relative block size-12 shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/15`,Y=({src:e,pos:t=`center`})=>(0,F.jsx)(`span`,{className:y(J,`bg-[linear-gradient(150deg,var(--soft1),var(--soft2))]`),children:(0,F.jsx)(`img`,{src:e,alt:``,loading:`lazy`,className:`size-full object-cover`,style:{objectPosition:t},onError:e=>{e.currentTarget.style.display=`none`}})}),X=({src:e,bg:t=`#fff`,pad:n=`p-2.5`})=>(0,F.jsx)(`span`,{className:y(J,`grid place-items-center`,n),style:{background:t},children:(0,F.jsx)(`img`,{src:e,alt:``,className:`size-full object-contain`})}),Oe=({dot:e})=>(0,F.jsxs)(`span`,{className:`relative size-12 shrink-0`,children:[(0,F.jsx)(`span`,{className:y(J,`block bg-[linear-gradient(160deg,var(--soft1),var(--soft2))]`),children:(0,F.jsx)(`img`,{src:`/img/glenn-cutout.webp`,alt:``,className:`absolute top-[4%] left-1/2 h-[170%] w-auto max-w-none -translate-x-1/2 object-contain object-top`})}),e&&(0,F.jsx)(`span`,{className:`absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-[var(--base)] bg-emerald-400`})]}),ke=({text:e})=>(0,F.jsx)(`span`,{className:y(J,`grid place-items-center bg-[#f4ede0] font-serif text-[15px] font-semibold tracking-tight text-[var(--base)] italic`),children:e});function Z({r:e,i:t}){let r=e.href?.startsWith(`http`),i=y(`group relative flex w-full items-center gap-4 overflow-hidden rounded-[20px] border border-white/12 bg-[rgba(28,14,8,.5)] p-2.5 pr-4 text-left backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-[1px] hover:border-transparent`,G),a=(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`span`,{"aria-hidden":!0,className:`absolute inset-0 origin-left scale-x-0 bg-[#f4ede0] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100`}),(0,F.jsx)(`span`,{className:`relative`,children:e.media}),(0,F.jsxs)(`span`,{className:`relative min-w-0 flex-1`,children:[(0,F.jsx)(`span`,{className:`block text-[15.5px] leading-snug font-medium text-[#f4ede0] transition-colors duration-500 group-hover:text-[var(--base)]`,children:e.title}),e.note&&(0,F.jsx)(`span`,{className:`mt-0.5 block text-[13px] text-[#f4ede0]/75 transition-colors duration-500 group-hover:text-[var(--base)]/75`,children:e.note})]}),(0,F.jsx)(`span`,{className:`relative text-[#f4ede0]/70 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-[var(--base)]`,children:r?(0,F.jsx)(l,{className:`size-[18px]`,strokeWidth:1.6}):(0,F.jsx)(n,{className:`size-[18px]`,strokeWidth:1.6})})]}),o=()=>{K(e.key),e.onClick?.()};return(0,F.jsx)(Q,{i:t,children:e.href?(0,F.jsx)(`a`,{href:e.href,onClick:o,className:i,...r?{target:`_blank`,rel:`noopener`}:{},children:a}):(0,F.jsx)(`button`,{type:`button`,onClick:o,className:i,children:a})})}function Q({i:e,children:t}){return(0,F.jsx)(a.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:`0px 0px -4% 0px`},transition:{duration:.6,delay:Math.min(e,6)*.05,ease:W},children:t})}function $({label:e,children:t}){return(0,F.jsxs)(`section`,{className:`mt-10`,"aria-label":e,children:[(0,F.jsxs)(`div`,{className:`mb-4 flex items-center gap-4`,children:[(0,F.jsx)(`span`,{className:`h-px flex-1 bg-gradient-to-r from-transparent to-white/20`}),(0,F.jsx)(`h2`,{className:`rounded-full bg-[rgba(28,14,8,.5)] px-3.5 py-1.5 font-serif text-[12.5px] tracking-[0.34em] text-[var(--accent)] uppercase backdrop-blur-md`,children:e}),(0,F.jsx)(`span`,{className:`h-px flex-1 bg-gradient-to-l from-transparent to-white/20`})]}),(0,F.jsx)(`div`,{className:`grid gap-3`,children:t})]})}function Ae(){let e=[`BEGIN:VCARD`,`VERSION:3.0`,`N:Windom II;Glenn;;;`,`FN:Glenn Windom II`,`ORG:WISE Financial Partners`,`TITLE:Entrepreneur · Author · Founder of WISE Financial Partners`,`EMAIL;TYPE=INTERNET:${h}`,`URL:${V}`,`X-SOCIALPROFILE;TYPE=instagram:${b}`,`X-SOCIALPROFILE;TYPE=linkedin:${g}`,`END:VCARD`],t=URL.createObjectURL(new Blob([e.join(`\r
`)],{type:`text/vcard`})),n=document.createElement(`a`);n.href=t,n.download=`Glenn-Windom-II.vcf`,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3),K(`save_contact`)}function je({onShare:e}){let t=y(`inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-[rgba(28,14,8,.5)] px-4 text-[13px] font-medium text-[#f4ede0] backdrop-blur-xl transition-colors hover:border-white/40 hover:bg-[rgba(28,14,8,.62)]`,G);return(0,F.jsxs)(`header`,{className:`relative`,children:[(0,F.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,F.jsx)(`span`,{className:`rounded-full bg-[rgba(28,14,8,.5)] px-3.5 py-2 font-serif text-[12.5px] tracking-[0.3em] text-[#f4ede0]/90 uppercase backdrop-blur-md`,children:`Glenn E. Windom II`}),(0,F.jsx)(`button`,{type:`button`,onClick:e,"aria-label":`Share this page`,className:y(`grid size-11 place-items-center rounded-full border border-white/15 bg-[rgba(28,14,8,.5)] text-[#f4ede0] backdrop-blur-xl hover:bg-[rgba(28,14,8,.62)]`,G),children:(0,F.jsx)(de,{className:`size-4`,strokeWidth:1.7})})]}),(0,F.jsxs)(`div`,{className:`relative mx-auto mt-6 h-[min(50svh,400px)] w-full`,children:[(0,F.jsx)(a.div,{"aria-hidden":!0,className:`absolute bottom-[4%] left-1/2 size-[min(78vw,340px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--glow),.5),rgba(var(--glow),.08)_70%,transparent)]`,initial:{opacity:0,scale:.85},animate:{opacity:1,scale:1},transition:{duration:1.4,ease:W}}),(0,F.jsx)(a.img,{src:`/img/glenn-cutout.webp`,alt:`Glenn Windom II`,fetchPriority:`high`,className:`absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]`,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:1.1,delay:.1,ease:W}})]}),(0,F.jsxs)(`div`,{className:`relative isolate -mt-4 text-center`,children:[(0,F.jsx)(`div`,{"aria-hidden":!0,className:`absolute -inset-x-4 -inset-y-6 -z-10 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(28,14,8,.55),transparent)]`}),(0,F.jsxs)(a.h1,{className:`display text-[clamp(2.1rem,9.6vw,3.5rem)] leading-[0.95] text-balance text-[#f4ede0]`,initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.9,delay:.25,ease:W},children:[`Glenn E. Windom `,(0,F.jsx)(`em`,{className:`accent-text italic`,children:`II`})]}),(0,F.jsx)(a.p,{className:`mt-4 text-[12px] font-medium tracking-[0.3em] text-[var(--accent)] uppercase`,initial:{opacity:0},animate:{opacity:1},transition:{duration:.9,delay:.4},children:`Entrepreneur · Author · Founder`}),(0,F.jsxs)(a.blockquote,{className:`mx-auto mt-3 max-w-[22rem] font-serif text-[17.5px] leading-snug text-[#f4ede0]/85 italic`,initial:{opacity:0},animate:{opacity:1},transition:{duration:.9,delay:.5},children:[`“`,(0,F.jsx)(`span`,{className:`text-[var(--accent)] not-italic`,children:`Close the gap.`}),` Connection is the bridge between where you are and where you’re meant to be.”`]}),(0,F.jsxs)(a.div,{className:`mt-6 flex flex-wrap items-center justify-center gap-2`,initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6,ease:W},children:[(0,F.jsxs)(`a`,{href:b,target:`_blank`,rel:`noopener`,onClick:()=>K(`ig_glenn_pill`),className:t,children:[(0,F.jsx)(`img`,{src:`/img/brands/instagram.svg`,alt:``,className:`size-4`}),`Instagram`]}),(0,F.jsxs)(`a`,{href:g,target:`_blank`,rel:`noopener`,onClick:()=>K(`linkedin_pill`),className:t,children:[(0,F.jsx)(`img`,{src:`/img/brands/linkedin.svg`,alt:``,className:`size-4 rounded-[3px] bg-white`}),`LinkedIn`]}),(0,F.jsxs)(`button`,{type:`button`,onClick:Ae,className:t,children:[(0,F.jsx)(ue,{className:`size-4`,strokeWidth:1.7}),`Save contact`]})]})]})]})}function Me(){return(0,F.jsx)(Q,{i:0,children:(0,F.jsxs)(`button`,{type:`button`,onClick:()=>{K(`book_consult`),m(c(ae,{...H,utm_campaign:`booking`}))},className:y(`group relative w-full overflow-hidden rounded-[24px] bg-[#f4ede0] p-5 text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]`,G),children:[(0,F.jsx)(`span`,{"aria-hidden":!0,className:`absolute -top-24 -right-20 size-60 rounded-full bg-[radial-gradient(circle,rgba(var(--glow),.4),transparent_65%)] transition-transform duration-700 group-hover:scale-125`}),(0,F.jsxs)(`span`,{className:`relative flex items-center gap-4`,children:[(0,F.jsx)(Oe,{dot:!0}),(0,F.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,F.jsx)(`span`,{className:`block text-[12px] font-semibold tracking-[0.24em] text-[var(--deep)] uppercase`,children:`Free · 30 minutes`}),(0,F.jsx)(`span`,{className:`mt-0.5 block font-serif text-[1.55rem] leading-tight text-[var(--base)]`,children:`Book a consultation`})]}),(0,F.jsx)(`span`,{className:`grid size-11 shrink-0 place-items-center rounded-full bg-[var(--base)] text-[#f4ede0] transition-transform duration-500 group-hover:-rotate-45`,children:(0,F.jsx)(n,{className:`size-[18px]`})})]}),(0,F.jsx)(`span`,{className:`relative mt-3 block text-[13px] text-[var(--base)]/75`,children:`With WISE Financial Partners · No cost, no obligation`})]})})}function Ne(){let t=(e,t,n)=>(0,F.jsx)(`a`,{href:e,target:`_blank`,rel:`noopener`,onClick:()=>K(t),className:y(`inline-flex h-11 items-center gap-1.5 rounded-full bg-[#f4ede0] px-4 text-[13px] font-semibold text-[var(--base)] transition-transform hover:-translate-y-0.5`,G),children:n});return(0,F.jsx)(Q,{i:0,children:(0,F.jsxs)(`div`,{className:`relative flex items-center gap-5 overflow-hidden rounded-[24px] border border-white/12 bg-[rgba(28,14,8,.5)] p-5 backdrop-blur-xl`,children:[(0,F.jsx)(e,{rotationFactor:12,className:`w-[96px] shrink-0`,children:(0,F.jsx)(`img`,{src:`/img/money-mirror.webp`,alt:`The Money Mirror by Glenn Windom II`,loading:`lazy`,className:`w-full rounded-[4px] shadow-[0_22px_34px_-12px_rgba(0,0,0,.8),0_0_0_1px_rgba(255,255,255,.08)]`})}),(0,F.jsxs)(`div`,{className:`min-w-0`,children:[(0,F.jsx)(`p`,{className:`text-[12px] font-medium tracking-[0.28em] text-[var(--accent)] uppercase`,children:`My book`}),(0,F.jsxs)(`p`,{className:`mt-1.5 font-serif text-[1.6rem] leading-tight text-[#f4ede0]`,children:[`The Money `,(0,F.jsx)(`em`,{className:`italic`,children:`Mirror`})]}),(0,F.jsx)(`p`,{className:`mt-0.5 text-[13px] text-[#f4ede0]/75`,children:`Money isn’t math, it’s mental.`}),(0,F.jsxs)(`div`,{className:`mt-3.5 flex flex-wrap gap-2`,children:[t(se,`book_amazon`,(0,F.jsxs)(F.Fragment,{children:[`Amazon`,(0,F.jsx)(l,{className:`size-3.5`})]})),t(re,`book_apple`,(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`img`,{src:`/img/brands/apple.svg`,alt:``,className:`-mt-0.5 size-3.5`}),`Books`,(0,F.jsx)(l,{className:`size-3.5`})]}))]})]})]})})}function Pe(){let[e,n]=(0,N.useState)(!1),[i,c]=(0,N.useState)(`idle`),[l,u]=(0,N.useState)(``);async function p(e){e.preventDefault();let n=new FormData(e.currentTarget),r=String(n.get(`email`)||``).trim(),i=String(n.get(`name`)||``).trim();if(!ie.test(r)){c(`error`),u(`Please enter a valid email.`);return}c(`sending`);let a=await f(r,i);a.ok&&(d({kind:`newsletter`,email:r,name:i,consent:!0}),t(`newsletter_signup`,{location:`linktree`})),c(a.ok?`done`:`error`),u(a.text)}let m=`w-full min-w-0 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-[15px] text-[#f4ede0] placeholder:text-[#f4ede0]/65 focus:border-[var(--accent)] focus:outline-none`;return(0,F.jsx)(Q,{i:0,children:(0,F.jsxs)(`div`,{className:y(`overflow-hidden rounded-[20px] border bg-[rgba(28,14,8,.5)] backdrop-blur-xl transition-colors duration-300`,e?`border-white/35`:`border-white/12 hover:border-white/30`),children:[(0,F.jsxs)(`button`,{type:`button`,"aria-expanded":e,onClick:()=>{n(!e),e||K(`newsletter_open`)},className:y(`flex w-full items-center gap-4 p-2.5 pr-4 text-left`,G),children:[(0,F.jsx)(X,{src:`/img/mark.png`,bg:`#0d0d0f`,pad:`p-2`}),(0,F.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,F.jsx)(`span`,{className:`block text-[15.5px] font-medium text-[#f4ede0]`,children:`The WISE Report`}),(0,F.jsx)(`span`,{className:`mt-0.5 block text-[13px] text-[#f4ede0]/75`,children:`The monthly playbook for building a legacy.`})]}),(0,F.jsx)(o,{className:y(`size-[18px] text-[#f4ede0]/50 transition-transform duration-300`,e&&`rotate-45 text-[#f4ede0]`),strokeWidth:1.6})]}),(0,F.jsx)(r,{initial:!1,children:e&&(0,F.jsx)(a.div,{initial:{height:0,opacity:0},animate:{height:`auto`,opacity:1},exit:{height:0,opacity:0},transition:{duration:.3,ease:W},children:(0,F.jsxs)(`div`,{className:`px-3 pb-3`,children:[i===`done`?(0,F.jsxs)(`p`,{role:`status`,className:`flex items-center gap-2 px-1 py-2 text-[15px] text-[var(--accent)]`,children:[(0,F.jsx)(s,{className:`size-5`}),l||`You’re on the list.`]}):(0,F.jsxs)(`form`,{onSubmit:p,className:`grid gap-2`,noValidate:!0,children:[(0,F.jsx)(`label`,{className:`sr-only`,htmlFor:`lt-name`,children:`First name`}),(0,F.jsx)(`input`,{id:`lt-name`,name:`name`,autoComplete:`given-name`,placeholder:`First name`,className:m}),(0,F.jsx)(`label`,{className:`sr-only`,htmlFor:`lt-email`,children:`Email`}),(0,F.jsx)(`input`,{id:`lt-email`,name:`email`,type:`email`,required:!0,autoComplete:`email`,placeholder:`you@email.com`,className:m}),(0,F.jsx)(`button`,{type:`submit`,disabled:i===`sending`,className:y(`rounded-2xl bg-[#f4ede0] px-6 py-3 text-[15px] font-semibold text-[var(--base)] transition-opacity hover:opacity-90 disabled:opacity-60`,G),children:i===`sending`?`Subscribing…`:`Subscribe`})]}),i===`error`&&(0,F.jsx)(`p`,{role:`alert`,className:`mt-2 px-1 text-sm text-red-300`,children:l}),(0,F.jsx)(`p`,{className:`mt-2 px-1 text-[12px] text-[#f4ede0]/70`,children:`Unsubscribe anytime. We never sell your information.`})]})})})]})})}function Fe(){let[e,t]=(0,N.useState)(``);(0,N.useEffect)(()=>{if(!e)return;let n=setTimeout(()=>t(``),2400);return()=>clearTimeout(n)},[e]);async function n(){K(`share`);try{if(navigator.share){await navigator.share({title:`Glenn Windom II`,url:V});return}await navigator.clipboard.writeText(V),t(`Link copied`)}catch(e){e?.name!==`AbortError`&&t(`Copy this link: ${V.replace(/^https:\/\/(www\.)?/,``).replace(/\/$/,``)}`)}}return(0,F.jsxs)(p,{reducedMotion:`user`,children:[(0,F.jsxs)(`div`,{style:{"--base":q.base,"--accent":q.accent,"--deep":q.deep,"--glow":q.glow,"--soft1":q.soft[0],"--soft2":q.soft[1]},className:`min-h-svh overflow-x-clip text-[#f4ede0]`,children:[(0,F.jsx)(De,{theme:q}),(0,F.jsxs)(`main`,{className:`relative mx-auto w-full max-w-[520px] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-12`,children:[(0,F.jsx)(je,{onShare:n}),(0,F.jsxs)($,{label:`Work with me`,children:[(0,F.jsx)(Me,{}),(0,F.jsx)(Z,{i:1,r:{key:`career`,title:`Build a career with WISE`,note:`Part-time or full-time · we train you`,media:(0,F.jsx)(Y,{src:te(ce.glennWorking,160,160,`t`),pos:`top`}),onClick:()=>m(c(ee,{...H,utm_campaign:`careers`}))}})]}),(0,F.jsxs)($,{label:`The book`,children:[(0,F.jsx)(Ne,{}),(0,F.jsx)(Z,{i:1,r:{key:`check_in`,title:`Take the Money Mirror Check-In`,note:`Five questions · two minutes`,media:(0,F.jsx)(Y,{src:`/img/money-mirror.webp`,pos:`top`}),href:U(`#check-in`)}})]}),(0,F.jsx)($,{label:`Featured`,children:(0,F.jsx)(Z,{i:0,r:{key:`press_voyage_baltimore`,title:`Exploring Life & Business with Glenn Windom II`,note:`Voyage Baltimore · Interview`,media:(0,F.jsx)(ke,{text:`VB`}),href:`https://voyagebaltimore.com/interview/exploring-life-business-with-glenn-windom-ii-of-wise-financial-partners/`}})}),(0,F.jsxs)($,{label:`Ventures`,children:[(0,F.jsx)(Z,{i:0,r:{key:`website`,title:`WISE Financial Partners`,note:`Wealth · Impact · Strategy · Execution`,media:(0,F.jsx)(X,{src:`/img/mark.png`,bg:`#0d0d0f`,pad:`p-2`}),href:U()}}),(0,F.jsx)(Pe,{})]}),(0,F.jsxs)($,{label:`Stay connected`,children:[(0,F.jsx)(Z,{i:1,r:{key:`ig_glenn`,title:`@imglennwin`,note:`Instagram`,media:(0,F.jsx)(X,{src:`/img/brands/instagram.svg`}),href:b}}),(0,F.jsx)(Z,{i:2,r:{key:`ig_wise`,title:`@wisefinancialpartners`,note:`Instagram`,media:(0,F.jsx)(X,{src:`/img/brands/instagram.svg`}),href:ne}}),(0,F.jsx)(Z,{i:3,r:{key:`linkedin`,title:`Glenn Windom II`,note:`LinkedIn`,media:(0,F.jsx)(X,{src:`/img/brands/linkedin.svg`}),href:g}})]}),(0,F.jsxs)(`footer`,{className:`mt-14 rounded-[24px] bg-[rgba(28,14,8,.5)] px-5 py-8 text-center backdrop-blur-md`,children:[(0,F.jsxs)(`p`,{className:`font-serif text-2xl text-[#f4ede0] italic`,children:[`Glenn E. Windom `,(0,F.jsx)(`span`,{className:`accent-text`,children:`II`})]}),(0,F.jsxs)(`p`,{className:`mt-4 flex justify-center gap-3 text-[12px] text-[#f4ede0]/80`,children:[(0,F.jsx)(`a`,{href:`${B}/disclosures.html`,className:`inline-block min-w-11 px-1 py-[13px] hover:text-[var(--accent)]`,children:`Disclosures`}),(0,F.jsx)(`a`,{href:`${B}/privacy.html`,className:`inline-block min-w-11 px-1 py-[13px] hover:text-[var(--accent)]`,children:`Privacy`}),(0,F.jsx)(`a`,{href:`${B}/terms.html`,className:`inline-block min-w-11 px-1 py-[13px] hover:text-[var(--accent)]`,children:`Terms`})]}),(0,F.jsxs)(`p`,{className:`mt-2 text-[12px] text-[#f4ede0]/65`,children:[`© `,new Date().getFullYear(),` Glenn E. Windom II`]})]})]})]}),(0,F.jsx)(r,{children:e&&(0,F.jsx)(a.div,{role:`status`,className:`fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},children:(0,F.jsxs)(`span`,{className:`inline-flex items-center gap-2 rounded-full bg-[#f4ede0] px-5 py-3 text-sm font-medium text-[var(--base)] shadow-xl`,style:{"--base":q.base},children:[(0,F.jsx)(s,{className:`size-4`}),e]})})})]})}(0,Ee.createRoot)(document.getElementById(`root`)).render((0,F.jsx)(N.StrictMode,{children:(0,F.jsx)(Fe,{})}));