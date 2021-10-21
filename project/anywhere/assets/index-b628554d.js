import{O as he,B as D,F as q,M as P,S as T,U as A,V as m,W as z,C as ue,a as M,b as x,A as ce,c as I,G as Q,d as fe,e as de,P as me,f as pe,g as Z,D as $,h as J,i as ge,T as L,R as ve,j as we,L as G,k as E,l as xe,m as be,n as Te,o as ye,p as Se,q as Me,r as Ce,E as Pe}from"./three-c9aa29e0.js";import{e as O}from"./TWEEN-c4fd70ef.js";import{c as _e}from"./turf-41c10b3e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const t of i)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerPolicy&&(t.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?t.credentials="include":i.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(i){if(i.ep)return;i.ep=!0;const t=s(i);fetch(i.href,t)}})();const ee={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class _{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Be=new he(-1,1,1,-1,0,1),V=new D;V.setAttribute("position",new q([-1,3,0,-1,-1,0,3,-1,0],3));V.setAttribute("uv",new q([0,2,0,0,2,0],2));class te{constructor(e){this._mesh=new P(V,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Be)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Re extends _{constructor(e,s){super(),this.textureID=s!==void 0?s:"tDiffuse",e instanceof T?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=A.clone(e.uniforms),this.material=new T({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new te(this.material)}render(e,s,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class j extends _{constructor(e,s){super(),this.scene=e,this.camera=s,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,s,a){const i=e.getContext(),t=e.state;t.buffers.color.setMask(!1),t.buffers.depth.setMask(!1),t.buffers.color.setLocked(!0),t.buffers.depth.setLocked(!0);let o,h;this.inverse?(o=0,h=1):(o=1,h=0),t.buffers.stencil.setTest(!0),t.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),t.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),t.buffers.stencil.setClear(h),t.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),t.buffers.color.setLocked(!1),t.buffers.depth.setLocked(!1),t.buffers.stencil.setLocked(!1),t.buffers.stencil.setFunc(i.EQUAL,1,4294967295),t.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),t.buffers.stencil.setLocked(!0)}}class De extends _{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ze{constructor(e,s){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),s===void 0){const a=e.getSize(new m);this._width=a.width,this._height=a.height,s=new z(this._width*this._pixelRatio,this._height*this._pixelRatio),s.texture.name="EffectComposer.rt1"}else this._width=s.width,this._height=s.height;this.renderTarget1=s,this.renderTarget2=s.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Re(ee),this.clock=new ue}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,s){this.passes.splice(s,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const s=this.passes.indexOf(e);s!==-1&&this.passes.splice(s,1)}isLastEnabledPass(e){for(let s=e+1;s<this.passes.length;s++)if(this.passes[s].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const s=this.renderer.getRenderTarget();let a=!1;for(let i=0,t=this.passes.length;i<t;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),o.needsSwap){if(a){const h=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}j!==void 0&&(o instanceof j?a=!0:o instanceof De&&(a=!1))}}this.renderer.setRenderTarget(s)}reset(e){if(e===void 0){const s=this.renderer.getSize(new m);this._pixelRatio=this.renderer.getPixelRatio(),this._width=s.width,this._height=s.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,s){this._width=e,this._height=s;const a=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(a,i),this.renderTarget2.setSize(a,i);for(let t=0;t<this.passes.length;t++)this.passes[t].setSize(a,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Le extends _{constructor(e,s,a,i,t){super(),this.scene=e,this.camera=s,this.overrideMaterial=a,this.clearColor=i,this.clearAlpha=t!==void 0?t:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new M}render(e,s,a){const i=e.autoClear;e.autoClear=!1;let t,o;this.overrideMaterial!==void 0&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),t=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,t),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=o),e.autoClear=i}}const Ue={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new M(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class C extends _{constructor(e,s,a,i){super(),this.strength=s!==void 0?s:1,this.radius=a,this.threshold=i,this.resolution=e!==void 0?new m(e.x,e.y):new m(256,256),this.clearColor=new M(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let t=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new z(t,o),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const c=new z(t,o);c.texture.name="UnrealBloomPass.h"+l,c.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(c);const d=new z(t,o);d.texture.name="UnrealBloomPass.v"+l,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),t=Math.round(t/2),o=Math.round(o/2)}const h=Ue;this.highPassUniforms=A.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new T({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const n=[3,5,7,9,11];t=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(n[l])),this.separableBlurMaterials[l].uniforms.texSize.value=new m(t,o),t=Math.round(t/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=s,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=ee;this.copyUniforms=A.clone(u.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new T({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:ce,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new M,this.oldClearAlpha=1,this.basic=new I,this.fsQuad=new te(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.materialCopy.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,s){let a=Math.round(e/2),i=Math.round(s/2);this.renderTargetBright.setSize(a,i);for(let t=0;t<this.nMips;t++)this.renderTargetsHorizontal[t].setSize(a,i),this.renderTargetsVertical[t].setSize(a,i),this.separableBlurMaterials[t].uniforms.texSize.value=new m(a,i),a=Math.round(a/2),i=Math.round(i/2)}render(e,s,a,i,t){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),t&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let h=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[n].uniforms.direction.value=C.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=C.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this.fsQuad.render(e),h=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,t&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){return new T({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new m(.5,.5)},direction:{value:new m(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new T({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}C.BlurDirectionX=new m(1,0);C.BlurDirectionY=new m(0,1);const se=window.innerWidth,ie=window.innerHeight;let Ee=[114.52646327972413,38.04224420139516];const N=new Q,k=new Q,H=new Q,F={};let v={x:0,y:3,z:0},R=0,p=new fe;p.background=new M("#000000");p.fog=new de("#000000",90,200);let w=new me(75,se/ie,.1,500);w.position.x=v.x;w.position.y=v.y;w.position.z=v.z;let B=new pe({antialias:!0,canvas:document.getElementById("app").appendChild(document.createElement("canvas"))});B.setClearColor(0);B.setSize(se,ie);B.shadowMap.enabled=!0;const W=new ze(B),ke=new Le(p,w);W.addPass(ke);const U=new C(new m(window.innerWidth,window.innerHeight),1.5,.4,.85);U.threshold=0;U.strength=.8;U.radius=.2;W.addPass(U);let ae={value:0};{const r={radius:30,color:"hsl(270, 30%, 20%)",opacity:.8,angle:Math.PI*2,speed:6},e=`
      precision mediump float;
      precision highp int;

      varying vec2 vPosition;

      void main () {
          vPosition = vec2(position.x, position.y);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,s=`
      precision mediump float;
      precision highp int;

      uniform float uTime;
      uniform float u_radius;
      uniform float u_speed;
      uniform float u_opacity;
      uniform float u_width;
      uniform vec3 u_color;

      varying vec2 vPosition;
      #define PI 3.14159265359

      void main () {
          // 计算当前扫描旋转的弧度值总数
          float currentRadius = u_speed * uTime;

          // 计算当前像素点与原点连线和x轴构成的夹角的弧度值
          // atan 接受两个参数（y,x）时 等同于 atan2,返回的是atan(y/x)；
          // 但比后者更稳定，返回值区间[-PI, PI]
          float angle = atan(vPosition.y, vPosition.x) + PI;

          // 计算当前像素低旋转后的弧度值，值固定在[0, PI * 2]之间
          float angleT = mod(currentRadius + angle, PI * 2.0);

          // 计算当前位置距离中心点距离
          float dist = distance(vec2(0.0, 0.0), vPosition);
          
          float tempOpacity = 0.0;

          // 设置雷达扫描圈的效果 (-5.0是给外层圆环和内层圆之间设置一点空白间距)
          if (dist < (u_radius)) {
              tempOpacity = 1.0 - angleT / u_width;
          }

          gl_FragColor = vec4(u_color, u_opacity * tempOpacity);
  }
  `,a=r.radius*2;let i=new Z(a,a),t=new T({transparent:!0,depthWrite:!1,side:$,uniforms:{uTime:ae,u_radius:{value:r.radius},u_speed:{value:r.speed},u_opacity:{value:r.opacity},u_width:{value:r.angle},u_color:{value:new M(r.color)}},vertexShader:e,fragmentShader:s}),o=new P(i,t);o.rotateX(90*Math.PI/180),o.translateX(5),p.add(o)}{const r=new J("hsl(60, 30%, 50%)",.7);r.position.set(20,30,0),r.castShadow=!0,p.add(r)}{const r=new J("hsl(230, 30%, 50%)",.7);r.position.set(-20,30,0),r.castShadow=!0,p.add(r)}{const r=new ge("hsl(180, 40%, 30%)",.5);p.add(r)}const Fe=new L().load("imgs/change.png"),y=[new L().load("imgs/redlight.png"),new L().load("imgs/yellowlight.png"),new L().load("imgs/bluelight.png")];y.forEach(r=>{r.wrapS=r.wrapT=ve,r.repeat.set(5,4)});const S=d3.geoMercator().center(Ee).scale(8e4).translate([0,0]);window.addEventListener("resize",Oe);Ae();const K={pinLandmark(){const{name:r,center:e}=this.dataset,[s,a]=e.split(",");new O.Tween(v).to({x:+s,y:1.2,z:+a},2e3).easing(O.Easing.Quadratic.Out).start()}};document.addEventListener("click",function(r){const e=r.target,{action:s}=e.dataset;K[s]&&K[s].call(e)});async function Ae(){const r=await oe("data/subway.json");document.getElementById("app").classList.remove("loading");let e=new we;e.absarc(0,0,3,0,Math.PI*2,!0);let s=e.getPoints(8).map(a=>({x:a.x,y:0,z:-a.y}));r.features.forEach(a=>{let{properties:i,geometry:t}=a;const{coordinates:o}=t;let h=16776960;switch(i.subway){case 1:h="hsl(0, 79%, 45%)";break;case 2:h="hsl(40, 87%, 47%)";break;case 3:h="hsl(196, 79%, 45%)";break}switch(t.type){case"Point":if(i.subway===0){const[n,f]=S(o),u=new Z(6,6),l=new I({side:$,map:Fe,transparent:!0}),c=new P(u,l);c.translateX(n),c.translateZ(f),c.translateY(2),c.rotateX(90*Math.PI/180),H.add(c)}else{let n;switch(i.subway){case 1:n="hsl(0, 60%, 60%)";break;case 2:n="hsl(30, 60%, 60%)";break;case 3:n="hsl(210, 50%, 60%)";break}const[f,u]=S(t.coordinates);let l=new Se({color:n,transparent:!0}),c=new D(f,0,u);c.setFromPoints(s);let d=new E(c,l);d._type="RaderWave",d.position.set(f,0,u),d._progress=new grender.AlterProgress(0,1,Math.random(),.05)}break;case"LineString":{let n;switch(i.subway){case 1:n="hsl(0, 60%, 40%)";break;case 2:n="hsl(30, 60%, 20%)";break;case 3:n="hsl(210, 50%, 20%)";break}let f=new G({color:n,scale:2.2}),u=new D;const l=new Array;for(let d=0;d<t.coordinates.length;d++){const[g,b]=S(o[d]);l.push(new x(g,0,b))}u.setFromPoints(l);let c=new E(u,f);c.computeLineDistances(),p.add(c)}{const n=new xe,f=new G({color:h,scale:10}),u=new D,l=new Array;for(let d=0;d<o.length;d++){const[g,b]=S(o[d]);d===0&&n.moveTo(g,-b),n.lineTo(g,-b),l.push(new x(g,0,b))}{const d=new be(l,!1,"chordal",1);let g=y[0];switch(i.subway){case 1:g=y[0];break;case 2:g=y[1];break;case 3:g=y[2];break}const b=new Te(d,10,.3,2);let ne=new I({map:g,side:ye,transparent:!0}),le=new P(b,ne);p.add(le)}u.setFromPoints(l),new E(u,f).computeLineDistances()}break}}),Ie(),N.add(H),p.add(N)}function X(r,e){let s=new Ce,a,i;for(let f=0;f<r.length;f++){const[u,l]=S(r[f]);if(f===0){a=u,i=l,s.moveTo(a,i);continue}s.lineTo(u,l)}s.lineTo(a,i);const t=s.toShapes(!0),o=.3+Math.random()*.5,h=new Pe(t,{depth:o,bevelEnabled:!1}),n=new P(h,e);return n.rotation.x=Math.PI*.5,n.translateZ(-o),n}async function Ie(){const r=new Me({color:16777215});(await oe("data/landmark.json")).features.forEach(a=>{const{properties:i,geometry:t}=a,{type:o}=t,{name:h}=i;switch(o){case"MultiPolygon":t.coordinates.forEach(u=>{const l=u[0],c=X(l,r);c.castShadow=!0,k.add(c)});break;case"Polygon":const n=t.coordinates[0],f=X(n,r);f.castShadow=!0,k.add(f);break}h&&(F[h]={name:h,center:S(_e(a).geometry.coordinates)})}),p.add(k);let s="";for(let a in F){const{name:i,center:t}=F[a];s+=`<div data-action="pinLandmark" data-center="${t}" data-name="${i}" data-lng="" class="title">${i}</div>`}document.getElementById("landmarks").innerHTML=s,document.getElementsByClassName("landmarks-wrap")[0].style.display="block"}let Y=0;function re(r){requestAnimationFrame(re),Y+=.01,ae.value=Y;const e=R*Math.PI/180;w.position.x=v.x+Math.cos(e)*2,w.position.y=v.y,w.position.z=v.z+Math.sin(e)*2,w.lookAt(new x(v.x,v.y/2,v.z)),R+=.1,R>360&&(R=0),y.forEach(s=>{s.offset.x-=.01}),H.children.forEach(s=>{s.rotateZ(10*Math.PI/180)}),W.render(),O.update(r)}re();function Oe(){w.aspect=window.innerWidth/window.innerHeight,w.updateProjectionMatrix(),B.setSize(window.innerWidth,window.innerHeight)}function oe(r){return new Promise(e=>{fetch(r).then(s=>s.json()).then(e)})}
