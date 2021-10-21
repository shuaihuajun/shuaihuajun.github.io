(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();let d=document.querySelector("#canvas"),e=d.getContext("webgl");e||alert("不支持WebGL");console.log(e);let m=`
  attribute vec2 a_position;
  uniform vec2 u_resolution;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  }
`,p=`
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
  }
`,v=f(e,e.VERTEX_SHADER,m),h=f(e,e.FRAGMENT_SHADER,p),s=b(e,v,h),u=e.getAttribLocation(s,"a_position"),g=e.getUniformLocation(s,"u_resolution"),S=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,S);let A=[10,20,80,20,10,30,10,30,80,20,80,30];e.bufferData(e.ARRAY_BUFFER,new Float32Array(A),e.STATIC_DRAW);e.viewport(0,0,e.canvas.width,e.canvas.height);e.clearColor(0,0,0,0);e.clear(e.COLOR_BUFFER_BIT);e.useProgram(s);e.uniform2f(g,e.canvas.width,e.canvas.height);e.enableVertexAttribArray(u);var _=2,T=e.FLOAT,L=!1,y=0,l=0;e.vertexAttribPointer(u,_,T,L,y,l);var P=e.TRIANGLES,l=0,R=6;e.drawArrays(P,l,R);function f(r,i,n){let t=r.createShader(i);if(r.shaderSource(t,n),r.compileShader(t),r.getShaderParameter(t,r.COMPILE_STATUS))return t;console.log(r.getShaderInfoLog(t)),r.deleteShader(t)}function b(r,i,n){let t=r.createProgram();if(r.attachShader(t,i),r.attachShader(t,n),r.linkProgram(t),r.getProgramParameter(t,r.LINK_STATUS))return t;console.log(r.getProgramInfoLog(t)),r.deleteProgram(t)}
