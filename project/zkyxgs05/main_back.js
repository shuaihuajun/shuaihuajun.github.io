function Rank(o){
	this.x = o.x;
	this.y = o.y;
	this.height = 80;
	this.borderLineWidth = 2;
	this.rankNumber = o.rankNumber;
	switch(this.rankNumber){
		case 1:
			this.colorH = 5;
			break;
		case 2:
			this.colorH = 52;
			break;
		case 3:
			this.colorH = 151;
			break;
		default:
			this.colorH = 184;
			break;
	}
	this.rankNumberSize = o.rankNumberSize || 33;
	this.name = o.name;
	this.nameSize = o.nameSize || 24;
	this.starNumber = o.starNumber;
	this.starMarginLeft = 120;

	this.photoImage = new Image();
	this.photoIsLoad = false;
	this.photoImage.onload = function(){
		this.photoIsLoad = true;
	};
	this.photoImage.src = o.photoSrc;
	this.NameWidth = 120;
	this.starMargin = 14;
	this.starRadius = 8;
	this.starWidth = 50 + (this.starRadius + this.starMargin) * this.starNumber;
	console.log(this.starNumber);

	this.starHeight = 54;
	this.leftBrokenRatio = 0.6;

	var _more = this.height/2 * this.leftBrokenRatio;
	var _innerPading = 2;
	var _ratio = 0.55;
	this.width = this.height*_ratio + _more + this.starWidth + this.starMarginLeft;

	this.bestRank = this.rankNumber;

	this.starManager = [];
	for(var i=0; i<this.starNumber; i++){
		this.starManager.push({
			isFinshed: false,
		});
	}

	this.fireMarginBottom = 3;

	this.dotMaxDistance = 40;
	this.dotManager = [];
	for(var i=0; i<20; i++){
		this.dotManager.push({
			x: Math.random() * this.width,
			y: -this.fireMarginBottom,
			distance: parseInt(this.dotMaxDistance + Math.random()*20),
			alpha: Math.random(),
			speed_y: 0.2 + Math.random()*0.4,
			speed_x: 0,
			radius: 2 + Math.random() * 2.6,
		});
	}

	this.polyMaxDistance = 20;
	this.polyManager = [];
	for(var i=0; i<10; i++){
		this.polyManager.push({
			x: Math.random() * this.width,
			y: -this.fireMarginBottom,
			distance: parseInt(this.polyMaxDistance + Math.random()*20),
			alpha: Math.random(),
			speed_y: 0.2 + Math.random()*0.4,
			speed_x: 0,
			radius: 0.6 + Math.random() * 1.6,
			scale: Math.random() * 2,
			rotation: Math.random() * 360,
		});
	}
}
Rank.prototype.updateFire = function(){
	for(var i=0; i<this.dotManager.length; i++){
		this.dotManager[i].y -= this.dotManager[i].speed_y;
		this.dotManager[i].x += this.dotManager[i].speed_x;
		this.dotManager[i].alpha = 1 - Math.abs(this.dotManager[i].y) / Math.abs(this.dotManager[i].distance);
		if(this.dotManager[i].y <= -this.dotManager[i].distance){
			this.dotManager[i].y = -this.fireMarginBottom;
			this.dotManager[i].radius = 2 + Math.random() * 2.6;
			this.dotManager[i].speed_x = -0.2 + Math.random()*0.4;
			this.dotManager[i].x = Math.random() * this.width;
			this.dotManager[i].rotation = Math.random() * 360;

			this.dotManager[i].distance = (1-(Math.abs(this.width/2 - this.dotManager[i].x) / this.width)) * parseInt(this.dotMaxDistance + Math.random()*20);

		}
	}

	for(var i=0; i<this.polyManager.length; i++){
		this.polyManager[i].y -= this.polyManager[i].speed_y;
		this.polyManager[i].x += this.polyManager[i].speed_x;
		this.polyManager[i].alpha = 1 - Math.abs(this.polyManager[i].y) / Math.abs(this.polyManager[i].distance);
		this.polyManager[i].rotation += 1;
		if(this.polyManager[i].y <= -this.polyManager[i].distance){
			this.polyManager[i].y = -this.fireMarginBottom;
			this.polyManager[i].radius = 0.6 + Math.random() * 1.6;
			this.polyManager[i].speed_x = -0.2 + Math.random()*0.4;
			this.polyManager[i].x = Math.random() * this.width;

			this.polyManager[i].distance = (1-(Math.abs(this.width/2 - this.polyManager[i].x) / this.width)) * parseInt(this.dotMaxDistance + Math.random()*20);

		}
	}
};
Rank.prototype.setRank = function(rank, _paddingTop, _paddingLeft, _height){
	this.rankNumber = rank;
	switch(this.rankNumber){
		case 1:
			this.colorH = 5;
			break;
		case 2:
			this.colorH = 52;
			break;
		case 3:
			this.colorH = 151;
			break;
		default:
			this.colorH = 184;
			break;
	}

	this.x = _paddingLeft;
	this.y = _paddingTop + (this.rankNumber-1)*_height;
};
Rank.prototype.updatePosition = function(ctx){

}
Rank.prototype.draw = function(ctx){
	this.updateFire();

	// draw-line
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.beginPath();
	ctx.moveTo(0, -this.fireMarginBottom);
	ctx.lineTo(this.width, -this.fireMarginBottom);
	ctx.closePath();
	ctx.lineWidth = 0.8;
	var _linear_gradient = ctx.createLinearGradient(0, 0, this.width, 0);
	_linear_gradient.addColorStop(0, 'hsla('+this.colorH+', 100%, 50%, 0)');
	_linear_gradient.addColorStop(0.5, 'hsla('+this.colorH+', 100%, 50%, 1)');
	_linear_gradient.addColorStop(1, 'hsla('+this.colorH+', 100%, 50%, 0)');
	ctx.strokeStyle = _linear_gradient;
	ctx.stroke();
	ctx.restore();

	//draw-light
	ctx.save();
	ctx.translate(this.x + this.width/2, this.y);
	ctx.beginPath();
	ctx.rect(-this.width/2, -50 - this.fireMarginBottom, this.width, 50);
	ctx.closePath();
	ctx.clip();

	ctx.scale(1, 0.12);
	ctx.beginPath();
	ctx.arc(0, 0, this.width/2, 0, Math.PI*2, true);
	ctx.closePath();
	var _radial_gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.width/2);
	_radial_gradient.addColorStop(0, 'hsla('+this.colorH+', 100%, 50%, 1)');
	_radial_gradient.addColorStop(1, 'hsla('+this.colorH+', 100%, 20%, 0)');
	ctx.fillStyle = _radial_gradient;
	ctx.fill();
	ctx.restore();

	// draw-dot
	for(var i=0; i<this.dotManager.length; i++){
		ctx.save();
		ctx.globalAlpha = this.dotManager[i].alpha;
		ctx.shadowBlur = 12;
		ctx.shadowColor = 'hsla('+this.colorH+', 100%, 50%, 1)';
		ctx.translate(this.x + this.dotManager[i].x, this.y + this.dotManager[i].y);
		ctx.beginPath();
		ctx.arc(0, 0, this.dotManager[i].radius, 0, Math.PI*2, true);
		ctx.closePath();
		var _radial_gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.dotManager[i].radius);
		_radial_gradient.addColorStop(0, 'hsla('+this.colorH+', 100%, 50%, 1)');
		_radial_gradient.addColorStop(1, 'hsla('+this.colorH+', 100%, 20%, 0)');
		ctx.fillStyle = _radial_gradient;
		ctx.fill();
		ctx.restore();
	}

	// draw-poly
	for(var i=0; i<this.polyManager.length; i++){
		ctx.save();
		ctx.globalAlpha = this.polyManager[i].alpha;
		ctx.shadowBlur = 12;
		ctx.shadowColor = 'hsla('+this.colorH+', 100%, 50%, 1)';
		ctx.translate(this.x + this.polyManager[i].x, this.y + this.polyManager[i].y);
		ctx.scale(this.polyManager[i].scale, this.polyManager[i].scale);
		ctx.rotate(this.polyManager[i].rotation * Math.PI/180);
		ctx.beginPath();
		ctx.moveTo(-2, 2);
		ctx.lineTo(2,-2);
		ctx.lineTo(2,5);
		ctx.closePath();
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.fillStyle = 'hsla('+this.colorH+', 100%, 50%, 0.5)';
		ctx.strokeStyle = 'hsla('+this.colorH+', 100%, 50%, 1)';
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}


	// -----------------------------
	var _more = this.height/2 * this.leftBrokenRatio;
	var _innerPading = 2;
	var _ratio = 0.55;

	// draw-xuan
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.scale(1, 1);
	ctx.beginPath();
	ctx.rect(0, 0, this.width, 30);
	ctx.closePath();
	ctx.clip();
	ctx.beginPath();
	ctx.arc(this.width/2, 0, this.width/2, 0, Math.PI*2, true);
	ctx.closePath();
	var _radial_gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, this.width/2);
	_radial_gradient.addColorStop(0, 'hsla('+this.colorH+', 100%, 50%, 1)');
	_radial_gradient.addColorStop(1, 'hsla('+this.colorH+', 100%, 50%, 0)');
	ctx.fillStyle = _radial_gradient;
	ctx.fill();
	ctx.restore();

	// draw-border
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(this.width ,0);
	ctx.lineTo(this.width - this.starHeight*0.8, this.starHeight);
	ctx.lineTo(this.height*_ratio + _more*2 + this.NameWidth, this.starHeight);
	ctx.lineTo(this.height*_ratio + _more + this.NameWidth, this.height);
	ctx.lineTo(0, this.height);
	ctx.lineTo(-this.height/2 * this.leftBrokenRatio, this.height/2);
	ctx.lineTo(0, 0);
	ctx.lineWidth = this.borderLineWidth;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'hsla('+this.colorH+', 100%, 50%, 1)';
	var _linear_gradient = ctx.createLinearGradient(0, this.height, this.width, 0);
	_linear_gradient.addColorStop(0, 'hsla('+this.colorH+', 100%, 50%, 0)');
	_linear_gradient.addColorStop(1, 'hsla('+this.colorH+', 100%, 20%, .9)');
	ctx.fillStyle = _linear_gradient;
	ctx.fill();
	ctx.shadowBlur = 12;
	ctx.shadowColor = 'hsla('+this.colorH+', 100%, 50%, 0.8)';
	ctx.stroke();
	ctx.restore();

	// draw-photo
	if(this.photoImage){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.moveTo(_innerPading*0.6, _innerPading);
		ctx.lineTo(this.height*_ratio - _innerPading, _innerPading);
		ctx.lineTo(this.height*_ratio + _more - _innerPading, this.height/2);
		ctx.lineTo(this.height*_ratio - _innerPading, this.height - _innerPading);
		ctx.lineTo(_innerPading*0.6, this.height - _innerPading);
		ctx.lineTo(-_more + _innerPading, this.height/2);
		ctx.lineTo(_innerPading*0.6, _innerPading);
		ctx.clip();

		ctx.drawImage(this.photoImage,
			0, 0, this.photoImage.width, this.photoImage.height,
			-_more, -_more/2, this.height*_ratio+2*_more, this.height+_more);

		ctx.restore();
	}

	// draw-number
	ctx.save();
	ctx.shadowBlur = 12;
	ctx.shadowColor = 'hsla('+this.colorH+', 100%, 50%, 0.8)';
	ctx.translate(this.x, this.y);
	var _mor_str = '';
	switch(this.rankNumber){
		case 1:
			_mor_str = 'st';
			break;
		case 2:
			_mor_str = 'nd';
			break;
		case 3:
			_mor_str = 'rd';
			break;
		default:
			_mor_str = 'th';
			break;
	}
	ctx.fillStyle = 'hsl('+this.colorH+', 100%, 50%)';
	ctx.font = 'italic 900 '+this.rankNumberSize+'px 微软雅黑';
	ctx.textAlign = 'right';
	ctx.fillText(this.rankNumber, this.height*_ratio + _more/2 + (this.NameWidth/2), this.height/2*0.98);

	ctx.font = 'italic 900 15px 微软雅黑';
	ctx.textAlign = 'left';
	ctx.fillText(_mor_str, this.height*_ratio + _more/2 + (this.NameWidth/2), this.height/2*0.98);
	ctx.restore();

	//draw-name
	ctx.save();
	ctx.shadowBlur = 12;
	ctx.shadowColor = 'hsla('+this.colorH+', 100%, 50%, 0.8)';
	ctx.fillStyle = 'hsl('+this.colorH+', 100%, 50%)';
	ctx.translate(this.x, this.y);
	ctx.font = 'italic 900 '+this.nameSize+'px 微软雅黑';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom';
	this.NameWidth = ctx.measureText(this.name).width;
	ctx.fillText(this.name, this.height*_ratio + _more*0.7 + this.NameWidth/2, this.height);
	ctx.restore();

	//draw-star
	ctx.save();
	ctx.translate(this.x + this.starRadius + this.height*_ratio + _more + this.starMarginLeft + 10, this.y+this.starHeight/2);
	for(var k=0; k<this.starManager.length; k++){
		ctx.save();
		ctx.translate(k * (this.starRadius + this.starMargin), 0);
		var _star = new CreateStarShape({
			radius: this.starRadius,
		});
		var _position = _star.getPositiones();
		ctx.beginPath();
		ctx.moveTo(_position[0].x, _position[0].y);
		for(var i=0; i <_position.length-1; i++){
			ctx.lineTo(_position[i+1].x, _position[i+1].y);
		}
		ctx.closePath();
		if(this.starManager[k].isFinshed){
			ctx.shadowBlur = 4;
			ctx.shadowColor = 'hsla('+this.colorH+', 100%, 50%, 0.8)';
			var _linear_gradient = ctx.createLinearGradient(0, 0, this.starRadius*0.7, this.starRadius*0.7);
			_linear_gradient.addColorStop(0, 'hsla('+this.colorH+', 100%, 50%, 0.5)');
			_linear_gradient.addColorStop(1, 'hsla('+this.colorH+', 100%, 50%, 1)');
			ctx.fillStyle = _linear_gradient;
			ctx.fill();
		}
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'hsla('+this.colorH+', 100%, 50%, 1)';
		ctx.stroke();
		ctx.restore();
	}
	ctx.restore();

	//draw-best
	ctx.save();
	ctx.translate(this.x + this.width - this.starHeight*0.8, this.y + this.starHeight + 2);
	ctx.font = 'italic bold 14px 微软雅黑';
	ctx.textAlign = 'right';
	ctx.textBaseline = 'top';
	ctx.fillStyle = 'hsla('+this.colorH+', 100%, 50%, 1)';
	ctx.fillText('第 '+this.bestRank+' 名 < 历史最高名次', 0, 0);
	ctx.restore();
}





function CreateStarShape(o){
    this.edge_number = o&&o.edge_number || 5;
    this.max_radius = o&&o.radius || 19;
    this.min_radius = this.max_radius * 0.56;
}
CreateStarShape.prototype.getPositiones = function(){
    var _step = this.edge_number*2;
    var _length = 0;
    var positions = [];
    this.angle_step = 360 / _step;
    for(var i=0; i<_step; i++){
        if(i%2 == 0){
            _length = this.max_radius;
        }else{
            _length = this.min_radius;
        }
        var _x = Math.sin( Math.PI/180 * (this.angle_step*i - 110) ) * _length;
        var _y = Math.cos( Math.PI/180 * (this.angle_step*i - 110) ) * _length;
        positions.push({
            x: _x,
            y: _y,
        });
    }
    return positions;

};
