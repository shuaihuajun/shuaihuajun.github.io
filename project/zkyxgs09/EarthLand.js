function EarthLand(o){
	var that = this;
	this.lands = [];
	this.scale = 4;
	this.minScale = 3;
	this.maxScale = 20;
	var _w = window.innerWidth;
	var _h = window.innerHeight;
	this.center = [_w/2, _h/2];
	this.onRender = o.onRender;

	this.canvas = document.createElement('canvas');
	var _w = window.innerWidth;
	var _h = window.innerHeight;
	this.canvas.width = _w;
	this.canvas.height = _h;
	this.canvas.style.width = _w + 'px';
	this.canvas.style.height = _h + 'px';
	document.body.appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');

	var isMouseDown = false;
	var mouseDownX;
	var mouseDownY;
	window.addEventListener('mousedown', function(e){
    	isMouseDown = true
    	mouseDownX = e.clientX;
    	mouseDownY = e.clientY;
  	}, false);

	window.addEventListener('mousemove', function(e){
    	if(!isMouseDown) return;
    	var x = e.clientX;
    	var y = e.clientY;
    	var offsetX = x - mouseDownX;
    	var offsetY = y - mouseDownY;

    	that.center[0] = that.center[0] + offsetX;
    	that.center[1] = that.center[1] + offsetY;
    	mouseDownX = e.clientX;
    	mouseDownY = e.clientY;
    	that.render();
  	}, false);

	window.addEventListener('mouseup', function(e){
    	isMouseDown = false;
  	}, false);

	window.addEventListener('mouseout', function(e){
    	isMouseDown = false;
  	}, false);

	window.addEventListener('mousewheel', function(e){
    	that.setScale(e);
  	}, false);

	window.addEventListener('resize',function(){
		that.setSize();
	},false);
}
EarthLand.prototype.addLand = function(obj){
	this.lands.push(obj);
};
EarthLand.prototype.render = function(scale){
	var ctx = this.ctx;
  	var scale = this.scale;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.save();

    ctx.translate(this.center[0], this.center[1]);
    ctx.scale(scale, -scale);

    ctx.lineWidth = Number((1/scale).toFixed(2))*1.4;
    ctx.strokeStyle = 'hsla(0, 0%, 100%, .8)';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    for(var i=0; i<this.lands.length; i++){
		var lineData = this.lands[i].pathData;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(lineData[0][0], lineData[0][1]);
		for(var k=0,l=lineData.length; k<l; k++){
		if(!lineData[k+1])break;
			ctx.lineTo(lineData[k+1][0], lineData[k+1][1]);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = 'hsla(0, 50%, 100%, .4)';
		ctx.fill();
		ctx.restore();
    }
    ctx.restore();
    this.onRender?this.onRender(this.center, this.scale):null;
};
EarthLand.prototype.setSize = function(){
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


EarthLand.prototype.setScale = function(e){
	var ctx = this.ctx;
	if(e.deltaY > 0){
		var _ts = this.scale - 1;
		if(_ts < this.minScale){
			_ts = this.minScale;
		}else{

		}
		this.scale = _ts;
	}else{
		var _ts = this.scale + 1;
		if(_ts > this.maxScale){
			_ts = this.maxScale;
		}
		this.scale = _ts;
	}
	this.render(ctx);
};

