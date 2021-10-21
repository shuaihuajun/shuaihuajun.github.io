function MapControler(o){
	this.domElement = document.querySelector(o.domElement);
	this.domWidth = parseInt(this.domElement.style.width.slice(0,-2));
	this.domHeight = parseInt(this.domElement.style.height.slice(0,-2));

	this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('style','position:absolute; top:0; left:0; z-index:0;');
	this.domElement.appendChild(this.canvas);
	this.canvas.width = this.domWidth;
	this.canvas.height = this.domHeight;
	this.canvas.style.width = this.domWidth + 'px';
	this.canvas.style.height = this.domHeight + 'px';
	this.ctx = this.canvas.getContext('2d');

	this.gateCanvas = document.createElement('canvas');
	this.gateCanvas.setAttribute('style','position:absolute; top:0; left:0; z-index:10;');
	this.domElement.appendChild(this.gateCanvas);
	this.gateCanvas.width = this.domWidth;
	this.gateCanvas.height = this.domHeight;
	this.gateCanvas.style.width = this.domWidth + 'px';
	this.gateCanvas.style.height = this.domHeight + 'px';
	this.gateCtx = this.gateCanvas.getContext('2d');

	this.center = o.center || [this.domWidth/2, this.domHeight/2];
	this.circleRadius = o.radius || 220;
	this.distance = this.circleRadius/10;
	this.fontSize = o.fontSize || 16;
	this.gateManager = [];
	this.aniGateStack = [];
	this.mapName = o.mapName || 'map_ya_zhou';
	this.mapAlpha = o.mapAlpha ||1;
	this.ioMagager = {};

}
MapControler.prototype.updateAxis = function(){
	this.ctx.clearRect(0, 0, this.domWidth, this.domHeight);
	// 绘制地图背景
	var mapImg = new Image();
	var that = this;
	mapImg.onload = function(){
		var imgRatio = this.width / this.height;
		if(imgRatio >= 1){
			var imgHeight = that.circleRadius*2;
			var imgWidth = imgHeight * imgRatio;
			that.ctx.save();
			that.ctx.globalAlpha = that.mapAlpha;
			that.ctx.translate(that.center[0] - imgWidth/2, that.center[1] - that.circleRadius);
			that.ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, imgWidth, imgHeight);
			that.ctx.restore();
		}else{
			var imgWidth = that.circleRadius*2;
			var imgHeight = imgWidth / imgRatio;
			that.ctx.save();
			that.ctx.translate(that.center[0] - that.circleRadius, that.center[1] - imgHeight/2);
			that.ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, imgWidth, imgHeight);	
			that.ctx.restore();
		}
		that.drawAxis();
	}
	mapImg.src = './'+this.mapName+'.png';
	// 绘制坐标参考线
	var axisPadding = 30;
	this.drawDashLineCircle = function(radius){
		this.ctx.save();
		this.ctx.translate(this.center[0], this.center[1]);
		this.ctx.beginPath();
		this.ctx.arc(0, 0, radius, 0, Math.PI*2, true);
		this.ctx.closePath();
		this.ctx.setLineDash([4,4]);
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = 'hsla(0, 0%, 100%, 0.3)';
		this.ctx.stroke();
		this.ctx.restore();
	}
	//绘制坐标线
	this.drawLine = function(angle){
		this.ctx.save();
		this.ctx.translate(this.center[0], this.center[1]);
		this.ctx.rotate(Math.PI/180 * angle);
		this.ctx.setLineDash([4,4]);
		this.ctx.beginPath();
		this.ctx.moveTo(-(this.circleRadius + axisPadding), 0);
		this.ctx.lineTo(this.circleRadius + axisPadding, 0);
		this.ctx.closePath();
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = 'hsla(0, 0%, 100%, 0.5)';
		this.ctx.stroke();
		this.ctx.restore();
	};
	//绘制数字
	this.drawNumber = function(angle){
		this.ctx.save();
		this.ctx.translate(this.center[0], this.center[1]);
		this.ctx.rotate(Math.PI/180 * -angle);

		this.ctx.save();
		this.ctx.translate(this.circleRadius + axisPadding, 0);
		this.ctx.rotate(Math.PI/180 * angle);
		this.ctx.font = 'lighter ' + this.fontSize + 'px 微软雅黑';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = 'hsl(0, 0%, 100%)';
		this.ctx.fillText(angle+'°', 4, 0);
		this.ctx.restore();

		this.ctx.restore();
	};
	//绘制坐标轴
	this.drawAxis = function(){
		for(var i=0; i<10; i++){
			this.drawDashLineCircle(this.distance * (i+1) );
		}
		for(var i=0; i<4; i++){
			this.drawLine(45*i);
		}
		for(var i=0; i<8; i++){
			this.drawNumber(i*45);
		}
	};	
};
MapControler.prototype.update = function(){
	for(var i=0; i<this.gateManager.length; i++){
		this.gateManager[i].aniProcess += this.gateManager[i].aniSpeed;

		this.gateManager[i].radius = this.gateManager[i].minRadius + this.gateManager[i].aniProcess * (this.gateManager[i].maxRadius - this.gateManager[i].minRadius);
		this.gateManager[i].alpha = this.gateManager[i].maxAlpha - this.gateManager[i].aniProcess * this.gateManager[i].maxAlpha;
		if(this.gateManager[i].aniProcess >= 1){
			this.gateManager[i].aniProcess = 0;
			this.gateManager[i].radius = this.gateManager[i].minRadius;
		}
	}

	if(this.aniGateStack.length != 0){
		for(var i=0; i<this.aniGateStack.length; i++){

			this.aniGateStack[i].aniProcess += this.aniGateStack[i].aniSpeed;
			if(this.aniGateStack[i].aniProcess >= 1){
				this.aniGateStack[i].gate.angle = this.aniGateStack[i].targetAngle;
				this.aniGateStack[i].gate.length = this.aniGateStack[i].targetLength;
				this.aniGateStack.splice(i,1);
			}else{
				//angle
				if(this.aniGateStack[i].targetAngle > this.aniGateStack[i].originAngle){
					this.aniGateStack[i].gate.angle = this.aniGateStack[i].originAngle + this.aniGateStack[i].aniProcess * Math.abs(this.aniGateStack[i].targetAngle - this.aniGateStack[i].originAngle);
				}else if(this.aniGateStack[i].targetAngle < this.aniGateStack[i].originAngle){
					this.aniGateStack[i].gate.angle = this.aniGateStack[i].originAngle - this.aniGateStack[i].aniProcess * Math.abs(this.aniGateStack[i].targetAngle - this.aniGateStack[i].originAngle);
				}
				//length
				if(this.aniGateStack[i].targetLength > this.aniGateStack[i].originLength){
					this.aniGateStack[i].gate.length = this.aniGateStack[i].originLength + this.aniGateStack[i].aniProcess * Math.abs(this.aniGateStack[i].targetLength - this.aniGateStack[i].originLength);
				}else if(this.aniGateStack[i].targetLength < this.aniGateStack[i].originLength){
					this.aniGateStack[i].gate.length = this.aniGateStack[i].originLength - this.aniGateStack[i].aniProcess * Math.abs(this.aniGateStack[i].targetLength - this.aniGateStack[i].originLength);
				}
			}
		}
	}
};
MapControler.prototype.drawGate = function(gate){

	this.gateCtx.save();
	this.gateCtx.translate(this.center[0], this.center[1]);
	this.gateCtx.rotate(Math.PI/180 * -gate.angle);
	this.gateCtx.translate(gate.length/100 * this.circleRadius, 0);
	this.gateCtx.rotate(Math.PI/180 * gate.angle);

	this.gateCtx.save();
	this.gateCtx.shadowBlur = 14;
	// this.gateCtx.shadowColor = 'hsla(0, 0%, 100%, 1)';
	this.gateCtx.globalAlpha = gate.alpha;
	this.gateCtx.beginPath();
	this.gateCtx.arc(0, 0, gate.radius, 0, Math.PI*2, true);
	this.gateCtx.closePath();
	this.gateCtx.lineWidth = 1;
	this.gateCtx.strokeStyle = 'hsla('+gate.colorH+', 50%, 100%,1)';
	this.gateCtx.stroke();
	this.gateCtx.fillStyle = 'hsla('+gate.colorH+', '+gate.colorS+'%, '+gate.colorL+'%, 0.5)';
	this.gateCtx.fill();
	this.gateCtx.restore();

	this.gateCtx.shadowBlur = 14;
	this.gateCtx.shadowColor = 'hsla(0, 0%, 100%, 1)';
	this.gateCtx.font = 'bold 28px 微软雅黑';
	this.gateCtx.textAlign = 'center';
	this.gateCtx.textBaseline = 'middle';
	this.gateCtx.fillStyle = 'hsl(0, 0%, 100%)';
	this.gateCtx.fillText(gate.id, 0, 0);
	this.gateCtx.restore();
};
MapControler.prototype.addGate = function(o){
	o.aniProcess = Math.random() * 1;
	o.aniSpeed = 0.019;

	o.minRadius = 10;
	o.maxRadius = 30;

	o.maxAlpha = 1;
	o.minAlpha = 0;

	o.colorH = o.colorH || parseInt(Math.random()*360);
	o.colorS = o.colorS || 50;
	o.colorL = o.colorL || 60;

	this.gateManager.push(o);
};
MapControler.prototype.addIo = function(own, output){
	if(!this.ioMagager[own]){
		this.ioMagager[own] = [];
	}
	this.ioMagager[own].push(output);
};
MapControler.prototype.deleteIo = function(own, output){
	for(var i=0; i<this.ioMagager[own].length; i++){
		if(this.ioMagager[own][i] == output){
			this.ioMagager[own].splice(i, 1);
		}
	}
};
MapControler.prototype.set = function(o){
	var _id = o.id || null;
	if(!_id) throw '必须传入赛题id！';

	for(var i=0; i<this.gateManager.length; i++){
		if(this.gateManager[i].id == _id){

			var _originAngle = this.gateManager[i].angle;
			var _originLength = this.gateManager[i].length;
			var _targetAngle = o.angle || this.gateManager[i].angle;
			var _targetLength = o.length || this.gateManager[i].length;
			o.angle == 0 ? _targetAngle = 0 : null;
			o.length == 0 ? _targetLength = 0 : null;

			this.aniGateStack.push({
				gate: this.gateManager[i],
				aniProcess: 0,
				aniSpeed: 0.06,
				originAngle: _originAngle,
				originLength: _originLength,
				targetAngle: _targetAngle,
				targetLength: _targetLength,
			});
		}
	}
};
MapControler.prototype.jToZ = function(id){
	for(var i=0; i<this.gateManager.length; i++){
		if(this.gateManager[i].id == id){
			var _angle = -this.gateManager[i].angle;
			var _length = this.gateManager[i].length;
			var _real_length = _length/100 * this.circleRadius;

			var _y = Math.sin(Math.PI/180 * _angle) * _real_length;
			var _x = Math.cos(Math.PI/180 * _angle) * _real_length;
			return {x: _x, y:_y};
		}
	}
};
MapControler.prototype.drawIO = function(){
	for(i in this.ioMagager){
		var _from_position = this.jToZ(i);
		var _from_x = _from_position.x;
		var _from_y = _from_position.y;
		for(var k=0; k<this.ioMagager[i].length; k++){
			var _to_position = this.jToZ(this.ioMagager[i][k]);
			var _to_x = _to_position.x;
			var _to_y = _to_position.y;

			this.gateCtx.save();
			this.gateCtx.translate(this.center[0], this.center[1]);
			this.gateCtx.beginPath();
			this.gateCtx.moveTo(_from_x, _from_y);
			this.gateCtx.lineTo(_to_x, _to_y);
			this.gateCtx.closePath();
			this.gateCtx.lineWidth = 3;
			var _line_gradient = this.gateCtx.createLinearGradient(_from_x, _from_y, _to_x, _to_y);
			_line_gradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)');
			_line_gradient.addColorStop(0.8, 'hsla(0, 0%, 100%, 1)');
			_line_gradient.addColorStop(1, 'hsla(0, 0%, 100%, 1)');
			this.gateCtx.strokeStyle = _line_gradient;
			this.gateCtx.stroke();
			this.gateCtx.restore();
		}
	}


	

};
MapControler.prototype.render = function(){
	this.update();
	this.gateCtx.clearRect(0, 0, this.domWidth, this.domHeight);

	for(var i=0; i<this.gateManager.length; i++){
		this.drawGate(this.gateManager[i]);
	}

	this.drawIO();
};