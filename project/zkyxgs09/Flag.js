function Flag(o){
	var that = this;
	this.angle = -o.angle;
	this.length = o.length;
	this.color = o.color;
	this.imgUrl = o.imgUrl;

	this.isPhotoLoaded = false;
	this.photo = new Image();
	this.photo.addEventListener('load',function(){
		that.isPhotoLoaded = true;
	},false);
	this.photo.src = this.imgUrl;
	this.photoSize = 40;

	this.y = Math.sin(Math.PI/180 * this.angle) * this.length;
	this.x = Math.cos(Math.PI/180 * this.angle) * this.length;
	
	this.opacity = Math.round(Math.random()*1);
	this.opacitySpeed = 0.02;
	this.opacityMaxValue = 1;
	this.opacityMinValue = 0;

	this.scaleSpeed = .5 + Math.random() * .5;
	this.scaleMaxValue = this.photoSize + 15;
	this.scaleMinValue = this.photoSize;
	this.scale = this.scaleMinValue + Math.floor(Math.random() * (this.scaleMaxValue - this.scaleMinValue));
}
Flag.prototype.update = function(ctx, scale){
	this.opacity += this.opacitySpeed;
	if(this.opacity > this.opacityMaxValue){
		this.opacity = this.opacityMaxValue;
		this.opacitySpeed = -this.opacitySpeed;
	}
	if(this.opacity < this.opacityMinValue){
		this.opacity = this.opacityMinValue;
		this.opacitySpeed = 0.02 + Math.random() * 0.02;
	}

	this.scale += this.scaleSpeed;
	if(this.scale > this.scaleMaxValue){
		this.scaleSpeed = -this.scaleSpeed;
	}
	if(this.scale < this.scaleMinValue){
		this.scaleSpeed = .5 + Math.random() * .5;
	}
}
Flag.prototype.draw = function(ctx, scale){
	this.update();
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.translate(this.x, this.y);
	ctx.scale(1/scale, 1/scale);

	ctx.globalAlpha = this.opacity;
	ctx.beginPath();
	ctx.arc(0, 0, this.scale, 0, Math.PI*2, true);
	ctx.fill();

	if(this.isPhotoLoaded){
		ctx.save();
		ctx.globalAlpha = 1;

		ctx.beginPath();
		ctx.arc(0, 0, this.photoSize, 0, Math.PI*2, true);
		ctx.clip();

		ctx.drawImage(this.photo, -this.photoSize, -this.photoSize, this.photoSize*2, this.photoSize*2);
		ctx.restore();
	}

	ctx.restore();
}







function FlagManager(o){
	var that = this;
	this.flags = [];
	this.center = o.center;
	this.scale = o.scale;

	this.canvas = document.createElement('canvas');
	var _w = window.innerWidth;
	var _h = window.innerHeight;
	this.canvas.width = _w;
	this.canvas.height = _h;
	this.canvas.style.width = _w + 'px';
	this.canvas.style.height = _h + 'px';
	document.body.appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');
	this.onClickFlag = o.onClickFlag;

	window.addEventListener('resize',function(){
		that.setSize();
	},false);

	window.addEventListener('click',function(e){
		var ctx = that.ctx;
		var x = e.clientX;
		var y = e.clientY;

		var whitchFlag;
		
		for(var i=0; i<that.flags.length; i++){
			ctx.save();
			ctx.translate(that.center[0], that.center[1]);
			ctx.scale(that.scale, that.scale);
			ctx.translate(that.flags[i].x, that.flags[i].y);
			ctx.scale(1/that.scale, 1/that.scale);
			ctx.beginPath();
			ctx.arc(0, 0, that.flags[i].scale, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.restore();
			if(ctx.isPointInPath(x, y)){
				whitchFlag = that.flags[i];
				break;
			}
		}
		if(whitchFlag && that.onClickFlag){
			that.onClickFlag(whitchFlag);
		}
	},false);

	this.animateIndex;

	function renderAnimate(){
		that.animateIndex = requestAnimationFrame(renderAnimate, that.canvas);
		that.render();
	}
	renderAnimate();
}
FlagManager.prototype.addFlag = function(flag){
	this.flags.push(flag);
};
FlagManager.prototype.setSize = function(){
	var ctx = this.ctx;
	var _w = window.innerWidth;
	var _h = window.innerHeight;
	this.center = [_w/2, _h/2];
    ctx.canvas.width = _w;
    ctx.canvas.height = _h;
    ctx.canvas.style.width = _w + 'px';
    ctx.canvas.style.height = _h + 'px';
	this.render(ctx);
};
FlagManager.prototype.render = function(center, scale){
	if(center && scale){
		this.center = center;
		this.scale = scale;
	}
	var ctx = this.ctx;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	for(var i=0; i<this.flags.length; i++){
		ctx.save();
		ctx.translate(this.center[0], this.center[1]);
		ctx.scale(this.scale, this.scale);
		this.flags[i].draw(this.ctx, this.scale);
		ctx.restore();
	}
};