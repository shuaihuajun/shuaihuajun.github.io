function Universal(o){
	var that = this;

	this.createTime = new Date();
	this.layers = [];
	this.planets = [];
	this.emitClickPlanet = o.emitClickPlanet;
	this.emitMoveOnPlanet = o.emitMoveOnPlanet;
	this.planetIndex = 0;
	this.needShowTips = false;
	this.lineDashOffset = 0;


	this.wrapEle = document.createElement('div');
	this.wrapEle.setAttribute('id','universal_'+this.createTime.getTime());
	this.layers.push(this.wrapEle);
	document.body.appendChild(this.wrapEle);

	this.canvas_bg = document.createElement('canvas');
	this.canvas_bg.setAttribute('id','canvas-bg-'+this.createTime.getTime());
	this.wrapEle.appendChild(this.canvas_bg);
	this.layers.push(this.canvas_bg);

	this.canvas_planet = document.createElement('canvas');
	this.canvas_planet.setAttribute('id','canvas-planet-'+this.createTime.getTime());
	this.wrapEle.appendChild(this.canvas_planet);
	this.canvas_planet.dataset.offsetX = 0;
	this.canvas_planet.dataset.offsetY = 0;
	this.canvas_planet.dataset.scale = 1;
	this.canvas_planet.dataset.scaleMax = 7;
	this.canvas_planet.dataset.scaleMin = 1;
	this.canvas_planet.dataset.wheelX = window.innerWidth/2;
	this.canvas_planet.dataset.wheelY = window.innerHeight/2;
	this.layers.push(this.canvas_planet);

	this.canvas_tips = document.createElement('canvas');
	this.canvas_tips.setAttribute('id','canvas-tips-'+this.createTime.getTime());
	this.wrapEle.appendChild(this.canvas_tips);
	this.layers.push(this.canvas_tips);

	that.resetCanvasSize();
	window.addEventListener('resize',function(){
		that.resetCanvasSize();
	},false);

	var mouseDown = false;
	var justClick = true;
	var lastX, lastY;
	this.wrapEle.addEventListener('mousedown',function(e){
		mouseDown = true;
		lastX = e.clientX;
		lastY = e.clientY;
	},false);

	this.wrapEle.addEventListener('mousemove',function(e){

		var canvas = that.canvas_planet;
		var ctx = canvas.getContext('2d');
		var _x = e.clientX;
		var _y = e.clientY;
		var _whitchs = [];
		for(var i=0,l=that.planets.length; i<l; i++){
			ctx.save();
			ctx.translate(window.innerWidth/2, window.innerHeight/2);
			var offsetX = canvas.dataset.offsetX;
			var offsetY = canvas.dataset.offsetY;
			var scale = canvas.dataset.scale;
			ctx.scale(scale, scale);
			ctx.translate(offsetX, offsetY);
			that.planets[i].drawEmitEventArea(ctx);
			ctx.restore();

			if(ctx.isPointInPath(_x, _y)){
				_whitchs.push(that.planets[i]);
			}
		}
		if(_whitchs.length != 0){
			var _i = 0;
			var _max = _whitchs[0].zIndex;
			for(var i=0,l=_whitchs.length; i<l; i++){
				if(_whitchs[i].zIndex > _max){
					_i = i;
					_max = _whitchs[i].zIndex;
				}
			}
			var planet = _whitchs[_i];
			for(var i=0,l=that.planets.length; i<l; i++){
				if(that.planets[i] === planet){
					that.planets[i].isMouseIn = true;
					that.needShowTips = true;
					continue;
				}
				that.planets[i].isMouseIn = false;
			}
			if(that.emitMoveOnPlanet){
				that.emitMoveOnPlanet(planet, e.clientX, e.clientY);
			}
			that.drawPlanetsCanvas();
			that.drawTips(planet, e.clientX, e.clientY);
		}else{
			var _haveMouseIn = false;
			for(var i=0,l=that.planets.length; i<l; i++){
				if(that.planets[i].isMouseIn){
					_haveMouseIn = true;
					that.planets[i].isMouseIn = false;
				}
			}
			// if(_haveMouseIn){
				that.drawPlanetsCanvas();
			// }
			that.needShowTips = false;
			that.drawTips();
		}



		if(!mouseDown) return;
		justClick = false;
		var nx = e.clientX;
		var ny = e.clientY;
		var ox = nx - lastX;
		var oy = ny - lastY;

		var canvas = that.canvas_planet;
		canvas.dataset.offsetX = parseInt(canvas.dataset.offsetX) + ox;
		canvas.dataset.offsetY = parseInt(canvas.dataset.offsetY) + oy;

		that.drawPlanetsCanvas();

		lastX = e.clientX;
		lastY = e.clientY;
	},false);

	this.wrapEle.addEventListener('mouseup',function(e){
		mouseDown = false;
		if(!justClick){
			justClick = true;
			return;
		}
		var canvas = that.canvas_planet;
		var ctx = canvas.getContext('2d');
		var _x = e.clientX;
		var _y = e.clientY;
		var _whitchs = [];
		for(var i=0,l=that.planets.length; i<l; i++){
			ctx.save();
			ctx.translate(window.innerWidth/2, window.innerHeight/2);
			var offsetX = canvas.dataset.offsetX;
			var offsetY = canvas.dataset.offsetY;
			var scale = canvas.dataset.scale;
			ctx.scale(scale, scale);
			ctx.translate(offsetX, offsetY);
			that.planets[i].drawEmitEventArea(ctx);
			ctx.restore();

			if(ctx.isPointInPath(_x, _y)){
				_whitchs.push(that.planets[i]);
			}
		}
		if(_whitchs.length == 0) return;
		var _i = 0;
		var _max = _whitchs[0].zIndex;
		for(var i=0,l=_whitchs.length; i<l; i++){
			if(_whitchs[i].zIndex > _max){
				_i = i;
				_max = _whitchs[i].zIndex;
			}
		}
		if(that.emitClickPlanet){
			var planet = _whitchs[_i];
			that.emitClickPlanet(_whitchs,planet);
			// that.needShowTips = false;
			// that.drawTips();
		}
	},false);

	window.addEventListener('mouseout',function(){
		mouseDown = false;
	},false);

	window.addEventListener('mousewheel',function(e){
		var canvas = that.canvas_planet;
		var _max = Number(canvas.dataset.scaleMax);
		var _min = Number(canvas.dataset.scaleMin);
		var _scale = canvas.dataset.scale;
		if(e.deltaY > 0){
			if(_scale > _min){
				_scale = Number((Number(_scale)-.1).toFixed(1));
				canvas.dataset.scale = _scale;
				that.drawPlanetsCanvas();
			}
			return;
		}else{
			if(_scale < _max){
				_scale = Number((Number(_scale)+.1).toFixed(1));
				canvas.dataset.scale = _scale;
				that.drawPlanetsCanvas();
			}
			return;
		}
	},false);
}
Universal.prototype.addPlanet = function(o){
	var planet = new Planet();
	var _x = o&&o.x;
	var _y = o&&o.y;
	var _size = 10;
	planet.center = [_x, _y];
	planet.size = _size || o.size;
	planet.uid = o.uid;
	planet.name = o.name;
	planet.type = o.type;
	planet.keywords = o.keywords;
	planet.score = o.score;
	planet.output = o.output;
	planet.zIndex = this.planetIndex;
	planet.color = o&&o.color || 'hsla(0, 0%, 100%, 1)';
	this.planets.push(planet);
	this.planetNumber = this.planets.length;

	this.planetIndex++;
};
Universal.prototype.resetCanvasSize = function(){
	var _w = window.innerWidth;
	var _h = window.innerHeight;
	for(var i=0,l=this.layers.length; i<l; i++){
		this.layers[i].width = _w;
		this.layers[i].height = _h;
		this.layers[i].style.cssText = 'position:absolute; z-index:'+i+'; top:0; left:0; width:'+_w+'px; height:'+_h+'px';
	}
	this.render();
};
Universal.prototype.drawTips = function(planet, x, y){
	var canvas = this.canvas_tips;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	if(!this.needShowTips){
		return;
	}
	console.log(x, y);

	ctx.save();

	var paddingTop = 15;
	var paddingBottom = 30;
	var paddingLeft = 20;
	var paddingRight = 10;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	var boundWidth = 460;
	var boundHeight = paddingTop + paddingBottom;
	// console.log(planet);
	var textes = [
		{	
			dx: 0,
			dy: paddingTop,
			fontSize:18,
			fontWeight: 600,
			text: planet.name,
		},
		{
			dx: 80,
			dy: 40,
			fontSize:16,
			fontWeight: 500,
			text: '类型 : ' + planet.type,
		},
		{
			dx: 80,
			dy: 30,
			fontSize:16,
			fontWeight: 500,
			text: '关键词 : ' + planet.keywords,
		}
	];
	for(var i=0,l=textes.length; i<l; i++){
		boundHeight += textes[i].dy;
	}


	var cursorX = 5;
	var cursorY = boundHeight/2
	ctx.translate(x+40, y - boundHeight/2);

	// ctx.save();
	ctx.shadowBlur = 12;
	ctx.shadowColor = 'hsla(0, 0%, 100%, .3)';
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3;
	ctx.beginPath();
	// ctx.rect(0, 0, boundWidth, boundHeight);
	ctx.moveTo(0, 0);
	ctx.lineTo(boundWidth, 0);
	ctx.lineTo(boundWidth, boundHeight);
	ctx.lineTo(0, boundHeight);
	ctx.lineTo(0, cursorY + 6);
	ctx.lineTo(-cursorX, cursorY);
	ctx.lineTo(0, cursorY - 6);
	ctx.lineTo(0, 0);
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'hsla(0, 0%, 100%, 1)';
	ctx.stroke();
	ctx.fillStyle = 'hsla(0, 0%, 0%, .1)';
	ctx.fill();
	// ctx.restore();



	ctx.save();
	var _scoreRdius = 32;
	ctx.translate(paddingLeft + _scoreRdius, _scoreRdius + textes[0].dy + paddingTop + textes[0].fontSize + 2);
	ctx.beginPath();
	ctx.arc(0, 0, 32, 0, Math.PI*2, true);
	// ctx.lineWidth = 2;
	ctx.stroke();
	ctx.fillStyle = 'hsla(0, 0%, 100%, .1)';
	ctx.fill();
	ctx.fillStyle = 'hsla(0, 0%, 100%, 1)';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = 'normal 700 27px "微软雅黑"';
	ctx.fillText(planet.score, 0, 0);	
	ctx.restore();

	ctx.translate(paddingLeft, 0);

	
	ctx.fillStyle = 'hsla(0, 0%, 100%, 1)';
	for(var i=0,l=textes.length; i<l; i++){
		ctx.translate(0, textes[i].dy);
		ctx.save();
		ctx.translate(textes[i].dx, 0);
		ctx.font = 'normal '+textes[i].fontWeight+' '+textes[i].fontSize+'px "微软雅黑"';
		ctx.fillText(textes[i].text, 0, 0);	
		ctx.restore();
	}

	ctx.restore();

};
Universal.prototype.drawBgCanvas = function(){
	var ctx = this.canvas_bg.getContext('2d');
	ctx.save();
	ctx.fillStyle = 'hsla(0, 50%, 50%, 1)';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.restore();
	// console.log('bg canvas render!');
};
Universal.prototype.getCenterFromUid = function(uid){
	for(var i=0,l=this.planets.length; i<l; i++){
		if(this.planets[i].uid == uid){
			return this.planets[i];
		}
	}
};
Universal.prototype.drawPlanetsCanvas = function(){
	var canvas = this.canvas_planet;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.save();
	ctx.translate(window.innerWidth/2, window.innerHeight/2);

	var offsetX = canvas.dataset.offsetX;
	var offsetY = canvas.dataset.offsetY;
	var scale = canvas.dataset.scale;

	ctx.scale(scale, scale);
	ctx.translate(offsetX, offsetY);

	this.lineDashOffset --;
	for(var i=0,l=this.planetNumber; i<l; i++){
		if(this.planets[i].output != 0 && !this.planets[i].output){
			continue;
		}
		ctx.save();

		var _fromCenter = this.planets[i].center;
		var toCenter = this.getCenterFromUid(this.planets[i].output).center;
		var _fx = _fromCenter[0];
		var _fy = _fromCenter[1];
		var _tx = toCenter[0];
		var _ty = toCenter[1];

		ctx.beginPath();
		ctx.moveTo(_fx, _fy);
		ctx.lineTo(_tx, _ty);
		ctx.setLineDash([10, 16]);
		ctx.lineDashOffset = this.lineDashOffset;
		ctx.lineCap = 'round';
		ctx.lineWidth = 4;
		ctx.scale(1/scale, 1/scale);
		var linearGradient = ctx.createLinearGradient(_fx, _fy, _tx, _ty);
		linearGradient.addColorStop(0, 'hsla(0, 0%, 100%, .1)');
		linearGradient.addColorStop(1, 'hsla(0, 0%, 100%, 1)');
		ctx.strokeStyle = linearGradient;
		ctx.stroke();

		ctx.restore();
	}

	for(var i=0,l=this.planetNumber; i<l; i++){
		this.planets[i].scale = scale;
		this.planets[i].render(ctx);
	}



	ctx.restore();


	// console.log('planet canvas render!');
};
Universal.prototype.render = function(){
	// bg
	this.drawBgCanvas();

	//planet
	this.drawPlanetsCanvas();

	// tips
	this.drawTips();
};



function Planet(){
	this.center = [0,0];
	this.size = 5;
	this.color = 'hsla(0, 0%, 100%, 1)';
	this.scale = 1;
	this.zIndex = 0;
	this.isMouseIn = false;
	this.boundSize = 50;
	this.moonAngle = Math.round(Math.random() * 360);
	this.moonRadius = 5;
	this.outerCricleSize = this.boundSize - 10;
}
Planet.prototype.drawEmitEventArea = function(ctx){
	var _x = this.center[0];
	var _y = this.center[1];
	ctx.save();
	ctx.translate(_x, _y);
	ctx.scale(1/this.scale, 1/this.scale);
	ctx.beginPath();
	ctx.arc(0, 0, this.boundSize, 0, Math.PI*2, true);
	ctx.restore();
}
Planet.prototype.render = function(ctx){
	var _x = this.center[0];
	var _y = this.center[1];

	this.drawEmitEventArea(ctx);

	ctx.save();

	ctx.translate(_x, _y);
	ctx.scale(1/this.scale, 1/this.scale);
	
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.arc(0, 0, this.outerCricleSize, 0, Math.PI*2, false);
	ctx.strokeStyle = this.color;
	ctx.fillStyle = 'hsla(0, 0%, 100%, .1)';
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(0, 0, this.size, 0, Math.PI*2, false);
	ctx.fillStyle = this.color;
	ctx.fill();

	



	this.moonAngle++;
	ctx.save();
	var _x = Math.cos(Math.PI/180 * this.moonAngle) * this.outerCricleSize;
	var _y = Math.sin(Math.PI/180 * this.moonAngle) * this.outerCricleSize;
	ctx.translate(_x, _y);
	ctx.beginPath();
	ctx.arc(0, 0, this.moonRadius, 0, Math.PI*2, true);
	ctx.fillStyle = 'hsla(0, 100%, 100%, 1)';
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = 'hsla(0, 0%, 100%, 1)';
	ctx.textBaseline = 'middle';
	ctx.font = 'normal 500 16px "微软雅黑"';
	if(!this.isMouseIn){
		ctx.fillText(this.name, 10, 0);
	}
	ctx.fill();
	ctx.restore();






	ctx.restore();
}