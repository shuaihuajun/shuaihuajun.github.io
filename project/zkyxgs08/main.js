function BrokenLine(o){
	this.ctx = o.ctx;
	this.points = o.points;
	this.lightBgStyle = o.lightBgStyle || 'hsla(0, 0%, 100%, 0.2)';
	this.lightWidth = o.lightWidth || 2;
	this.lightColorH = o.lightColorH || 0;
	this.lightColorS = o.lightColorS || 0;
	this.lightColorL = o.lightColorL || 100;
	this.step_length = o.step_length || 310;
	this.start_point_offset = 0;
	this.point_speed = 5;
	this.startSlopeIndex = 0;
	this.end_point_offset = - this.step_length;
	this.endSlopeIndex = 0;
	this.loop = true;
	this.parsedPoint = [];
	for(var i=0; i<this.points.length; i++){
		if(this.points[i+1]){
			this.parsedPoint.push({
				from: {
					x: this.points[i][0],
					y: this.points[i][1],
				},
				to: {
					x: this.points[i+1][0],
					y: this.points[i+1][1],
				},
				length: parseFloat( Math.sqrt( Math.pow((this.points[i+1][1] - this.points[i][1]),2) + Math.pow((this.points[i+1][0] - this.points[i][0]),2) ) ),
				slope: parseFloat( Math.atan2( (this.points[i+1][1] - this.points[i][1]), (this.points[i+1][0] - this.points[i][0])) ),
				angle: parseFloat( (180 / Math.PI) * Math.atan2( (this.points[i+1][1] - this.points[i][1]), (this.points[i+1][0] - this.points[i][0]))),
			});
		}
	}
}
BrokenLine.prototype.drawBg = function(){

	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.moveTo(this.points[0][0], this.points[0][1]);
	for(var i=0; i<this.parsedPoint.length; i++){
		this.ctx.lineTo(this.points[i+1][0], this.points[i+1][1]);	
	}
	this.ctx.lineWidth = 1;
	this.ctx.lineJoin = 'round';
	this.ctx.lineCap = 'round';
	this.ctx.strokeStyle = this.lightBgStyle;
	this.ctx.stroke();
	this.ctx.restore();

	this.ctx.save();
	this.ctx.strokeStyle = this.lightBgStyle;
	this.ctx.beginPath();
	this.ctx.arc(this.points[0][0], this.points[0][1], 2, 0, Math.PI*2, true);
	this.ctx.stroke();
	this.ctx.beginPath();
	this.ctx.arc(this.points[this.points.length-1][0], this.points[this.points.length-1][1], 2, 0, Math.PI*2, true);
	this.ctx.stroke();
	this.ctx.restore();
};
BrokenLine.prototype.updateLine = function(){
	this.start_point_offset += this.point_speed;
	this.sP = {
		x: this.parsedPoint[this.startSlopeIndex].from.x + parseInt(this.start_point_offset * Math.cos(this.parsedPoint[this.startSlopeIndex].slope) ) ,
		y: this.parsedPoint[this.startSlopeIndex].from.y + parseInt(this.start_point_offset * Math.sin(this.parsedPoint[this.startSlopeIndex].slope) ),
	};
	var _start_go_more;
	if(this.parsedPoint[this.startSlopeIndex+1]){
		_start_go_more = 0;
	}else{
		_start_go_more = this.step_length;
	}
	if(this.start_point_offset >= (this.parsedPoint[this.startSlopeIndex].length + _start_go_more)){
		this.startSlopeIndex ++;
		this.start_point_offset = 0;
		if(this.startSlopeIndex >= this.parsedPoint.length){
			this.startSlopeIndex = 0;
			this.start_point_offset = 0;
		}
	}
	this.end_point_offset += this.point_speed;
	this.eP = {
		x: this.parsedPoint[this.endSlopeIndex].from.x + parseInt(this.end_point_offset * Math.cos(this.parsedPoint[this.endSlopeIndex].slope) ) ,
		y: this.parsedPoint[this.endSlopeIndex].from.y + parseInt(this.end_point_offset * Math.sin(this.parsedPoint[this.endSlopeIndex].slope) ),
	};
	if(this.end_point_offset >= (this.parsedPoint[this.endSlopeIndex].length)){
		this.endSlopeIndex ++;
		this.end_point_offset = 0;
		if(this.endSlopeIndex >= this.parsedPoint.length){
			this.endSlopeIndex = 0;
			this.end_point_offset = - this.step_length;
		}
	}
};
BrokenLine.prototype.drawLine = function(line){
	this.updateLine();
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.moveTo(this.points[0][0], this.points[0][1]);
	for(var i=0; i<this.parsedPoint.length; i++){
		console.log();
		this.ctx.lineTo(this.points[i+1][0], this.points[i+1][1]);
	}
	this.ctx.lineWidth = this.lightWidth;
	this.ctx.lineJoin = 'round';
	this.ctx.lineCap = 'round';
	var _linear_gradient = this.ctx.createLinearGradient(this.eP.x, this.eP.y, this.sP.x, this.sP.y);
	_linear_gradient.addColorStop(0, 'hsla('+ this.lightColorH +', '+ this.lightColorS +'%, '+ this.lightColorL +'%, 0)');
	_linear_gradient.addColorStop(0.95, 'hsla('+ this.lightColorH +', '+ this.lightColorS +'%, '+ this.lightColorL +'%, 1)');
	_linear_gradient.addColorStop(1, 'hsla('+ this.lightColorH +', '+ this.lightColorS +'%, '+ this.lightColorL +'%, 0)');
	this.ctx.strokeStyle = _linear_gradient;
	this.ctx.stroke();
	this.ctx.restore();
};
BrokenLine.prototype.draw = function(){
	this.drawBg();
	this.drawLine();
};