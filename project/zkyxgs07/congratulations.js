function Congratulate(o){
	this.x = o.x || 0;
	this.y = o.y || 0;
	this.teamName = o.teamName || 'ASK-798';
	this.teamRank = o.teamRank || 3;
	this.teamRankHistory = o.teamRankHistory || 1;
	this.teamScore = o.teamScore | '0000';

	// 奖杯
    this.Trophy_data = {
        width: 100,
        height: 200,
    };
    this.center = [this.x - this.Trophy_data.width*2, this.y];

	this.timer;

	this.eleManager = [
		{
			shape: 'circle_fill',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'circle_border',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'circle_fill',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'circle_border',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'star_fill',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'star_fill',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'star_stroke',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'star_stroke',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'star_fill',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		},
		{
			shape: 'wave',
			x: 0,
			y: 0,
			speed_x: -4 + Math.random()*4,
			speed_y: -15 + Math.random()*5,
			gravity_a: 0.4,
			size: Math.random()*10,
			rotation: Math.random() * 360,
		}
	];
}
Congratulate.prototype.draw_Trophy = function(ctx){
    // 主体
    ctx.save();
    ctx.translate(this.center[0], this.center[1] - this.Trophy_data.height*0.5 + this.Trophy_data.height*0.15);
    
    var _dot_data = [
        {x:0, y:-this.Trophy_data.height*0.04},
        {x:-this.Trophy_data.width * 0.66,      y:-this.Trophy_data.height*0.04},
        {c1x:-22,   c1y:14,     c2x:0,      c2y:14,       x:0,        y:0},
        {c1x:0,     c1y:0,      c2x:3,      c2y:-22,      x:-20,      y:-22},
        {c1x:-20,   c1y:-22,    c2x:-40,    c2y:-22,      x:-40,      y:0},
        {c1x:-39,   c1y:0,      c2x:-45,    c2y:22,       x:15,       y:55},
        {c1x:15,    c1y:55,     c2x:20,     c2y:60,       x:20,       y:67},
        {c1x:20,    c1y:76,     c2x:6,      c2y:79,       x:4,        y:67},
        {c1x:7,     c1y:60,     c2x:12,     c2y:63,       x:12,       y:63}
    ];
    // 左侧
    ctx.beginPath();
    ctx.moveTo(_dot_data[0].x, _dot_data[0].y);
    ctx.lineTo(_dot_data[1].x, _dot_data[1].y);
    ctx.lineTo(-this.Trophy_data.width*0.66, this.Trophy_data.width/2*0.5);
    ctx.bezierCurveTo(-this.Trophy_data.width* 0.67, this.Trophy_data.width/2*0.5, -this.Trophy_data.width/2 - 17,this.Trophy_data.height*0.51, -this.Trophy_data.width*0.08, this.Trophy_data.height*0.6);
    ctx.bezierCurveTo(-this.Trophy_data.width*0.08, this.Trophy_data.height*0.6, -this.Trophy_data.width*0.21,this.Trophy_data.height*0.58, -this.Trophy_data.width*0.23,this.Trophy_data.height*0.63);
    ctx.bezierCurveTo(-this.Trophy_data.width*0.22,this.Trophy_data.height*0.68, -this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, -this.Trophy_data.width*0.12,this.Trophy_data.height*0.66);
    ctx.bezierCurveTo(-this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, -this.Trophy_data.width*0.16,this.Trophy_data.height*0.75, -this.Trophy_data.width*0.4,this.Trophy_data.height*0.75);
    ctx.lineTo(-this.Trophy_data.width*0.4,this.Trophy_data.height*0.78);
    ctx.lineTo(-this.Trophy_data.width*0.58,this.Trophy_data.height*0.78);
    ctx.bezierCurveTo(-this.Trophy_data.width*0.58,this.Trophy_data.height*0.78, -this.Trophy_data.width*0.62,this.Trophy_data.height*0.78, -this.Trophy_data.width*0.62,this.Trophy_data.height*0.82);
    ctx.bezierCurveTo(-this.Trophy_data.width*0.62,this.Trophy_data.height*0.82, -this.Trophy_data.width*0.62,this.Trophy_data.height*0.85, -this.Trophy_data.width*0.58,this.Trophy_data.height*0.85);
    ctx.lineTo(0, this.Trophy_data.height*0.85);
    ctx.closePath();

    var _left_fill_style = ctx.createLinearGradient(0, -this.Trophy_data.height*0.1, 0, this.Trophy_data.height/2);
    _left_fill_style.addColorStop(0, 'hsla(56, 100%, 50%, 1)');
    _left_fill_style.addColorStop(1, 'hsla(36, 100%, 50%, 1)');
    ctx.strokeStyle = _left_fill_style;
    ctx.stroke();
    ctx.fillStyle = _left_fill_style;
    ctx.fill();

    // 右侧
    ctx.beginPath();
    ctx.moveTo(0,-this.Trophy_data.height*0.043);
    ctx.lineTo(this.Trophy_data.width*0.66, -this.Trophy_data.height*0.043);
    ctx.lineTo(this.Trophy_data.width*0.66, this.Trophy_data.width/2*0.5);
    ctx.bezierCurveTo(this.Trophy_data.width*0.67, this.Trophy_data.width/2*0.5, this.Trophy_data.width/2 + 17,this.Trophy_data.height*0.51, this.Trophy_data.width*0.08, this.Trophy_data.height*0.6);
    ctx.bezierCurveTo(this.Trophy_data.width*0.08, this.Trophy_data.height*0.6, this.Trophy_data.width*0.21,this.Trophy_data.height*0.58, this.Trophy_data.width*0.23,this.Trophy_data.height*0.63);
    ctx.bezierCurveTo(this.Trophy_data.width*0.22,this.Trophy_data.height*0.68, this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, this.Trophy_data.width*0.12,this.Trophy_data.height*0.66);
    ctx.bezierCurveTo(this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, this.Trophy_data.width*0.16,this.Trophy_data.height*0.75, this.Trophy_data.width*0.4,this.Trophy_data.height*0.75);
    ctx.lineTo(this.Trophy_data.width*0.4,this.Trophy_data.height*0.78);
    ctx.lineTo(this.Trophy_data.width*0.58,this.Trophy_data.height*0.78);
    ctx.bezierCurveTo(this.Trophy_data.width*0.58,this.Trophy_data.height*0.78, this.Trophy_data.width*0.62,this.Trophy_data.height*0.78, this.Trophy_data.width*0.62,this.Trophy_data.height*0.82);
    ctx.bezierCurveTo(this.Trophy_data.width*0.62,this.Trophy_data.height*0.82, this.Trophy_data.width*0.62,this.Trophy_data.height*0.85, this.Trophy_data.width*0.58,this.Trophy_data.height*0.853);
    ctx.lineTo(0, this.Trophy_data.height*0.853);
    ctx.closePath();

    var _right_fill_style = ctx.createLinearGradient(0, -this.Trophy_data.height/2, 0, this.Trophy_data.height/2);
    _right_fill_style.addColorStop(0, 'hsla(56, 100%, 50%, 1)');
    _right_fill_style.addColorStop(1, 'hsla(47, 100%, 50%, 1)');
    ctx.fillStyle = _right_fill_style;
    ctx.fill();
    ctx.restore();

    // 耳环
    // 左侧
    var _dot_data = [
        {x:-10, y:-5},
        {c1x:-10,   c1y:-10,    c2x:-24,    c2y:-14,      x:-24,      y:0},
        {c1x:-22,   c1y:14,     c2x:0,      c2y:14,       x:0,        y:0},
        {c1x:0,     c1y:0,      c2x:3,      c2y:-22,      x:-20,      y:-22},
        {c1x:-20,   c1y:-22,    c2x:-40,    c2y:-22,      x:-40,      y:0},
        {c1x:-39,   c1y:0,      c2x:-45,    c2y:22,       x:15,       y:55},
        {c1x:15,    c1y:55,     c2x:20,     c2y:60,       x:20,       y:67},
        {c1x:20,    c1y:76,     c2x:6,      c2y:79,       x:4,        y:67},
        {c1x:7,     c1y:60,     c2x:12,     c2y:63,       x:12,       y:63}
    ];
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.center[0] - this.Trophy_data.width*0.69, this.center[1]-this.Trophy_data.height*0.20);
    ctx.beginPath();
    ctx.moveTo(_dot_data[0].x, _dot_data[0].y);
    ctx.bezierCurveTo(_dot_data[1].c1x,_dot_data[1].c1y, _dot_data[1].c2x,_dot_data[1].c2y, _dot_data[1].x,_dot_data[1].y);
    ctx.bezierCurveTo(_dot_data[2].c1x,_dot_data[2].c1y, _dot_data[2].c2x,_dot_data[2].c2y, _dot_data[2].x,_dot_data[2].y);
    ctx.bezierCurveTo(_dot_data[3].c1x,_dot_data[3].c1y, _dot_data[3].c2x,_dot_data[3].c2y, _dot_data[3].x,_dot_data[3].y);
    ctx.bezierCurveTo(_dot_data[4].c1x,_dot_data[4].c1y, _dot_data[4].c2x,_dot_data[4].c2y, _dot_data[4].x,_dot_data[4].y);
    ctx.bezierCurveTo(_dot_data[5].c1x,_dot_data[5].c1y, _dot_data[5].c2x,_dot_data[5].c2y, _dot_data[5].x,_dot_data[5].y);
    ctx.bezierCurveTo(_dot_data[6].c1x,_dot_data[6].c1y, _dot_data[6].c2x,_dot_data[6].c2y, _dot_data[6].x,_dot_data[6].y);
    ctx.bezierCurveTo(_dot_data[7].c1x,_dot_data[7].c1y, _dot_data[7].c2x,_dot_data[7].c2y, _dot_data[7].x,_dot_data[7].y);
    ctx.bezierCurveTo(_dot_data[8].c1x,_dot_data[8].c1y, _dot_data[8].c2x,_dot_data[8].c2y, _dot_data[8].x,_dot_data[8].y);

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    var _fill_style = ctx.createLinearGradient(0, -this.Trophy_data.height*0.1, 0, this.Trophy_data.height/2);
    _fill_style.addColorStop(0, 'hsla(56, 100%, 50%, 1)');
    _fill_style.addColorStop(1, 'hsla(36, 100%, 50%, 1)');
    ctx.strokeStyle = _fill_style;
    ctx.stroke();
    ctx.restore();
    // 右侧
    ctx.save();
    ctx.translate(this.center[0] + this.Trophy_data.width*0.69, this.center[1]-this.Trophy_data.height*0.20);
    ctx.beginPath();
    ctx.moveTo(-_dot_data[0].x, _dot_data[0].y);
    ctx.bezierCurveTo(-_dot_data[1].c1x,_dot_data[1].c1y, -_dot_data[1].c2x,_dot_data[1].c2y, -_dot_data[1].x,_dot_data[1].y);
    ctx.bezierCurveTo(-_dot_data[2].c1x,_dot_data[2].c1y, -_dot_data[2].c2x,_dot_data[2].c2y, -_dot_data[2].x,_dot_data[2].y);
    ctx.bezierCurveTo(-_dot_data[3].c1x,_dot_data[3].c1y, -_dot_data[3].c2x,_dot_data[3].c2y, -_dot_data[3].x,_dot_data[3].y);
    ctx.bezierCurveTo(-_dot_data[4].c1x,_dot_data[4].c1y, -_dot_data[4].c2x,_dot_data[4].c2y, -_dot_data[4].x,_dot_data[4].y);
    ctx.bezierCurveTo(-_dot_data[5].c1x,_dot_data[5].c1y, -_dot_data[5].c2x,_dot_data[5].c2y, -_dot_data[5].x,_dot_data[5].y);
    ctx.bezierCurveTo(-_dot_data[6].c1x,_dot_data[6].c1y, -_dot_data[6].c2x,_dot_data[6].c2y, -_dot_data[6].x,_dot_data[6].y);
    ctx.bezierCurveTo(-_dot_data[7].c1x,_dot_data[7].c1y, -_dot_data[7].c2x,_dot_data[7].c2y, -_dot_data[7].x,_dot_data[7].y);
    ctx.bezierCurveTo(-_dot_data[8].c1x,_dot_data[8].c1y, -_dot_data[8].c2x,_dot_data[8].c2y, -_dot_data[8].x,_dot_data[8].y);

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = _fill_style;
    ctx.stroke();
    ctx.restore();
};

Congratulate.prototype.drawTeamRank = function(ctx){

}
Congratulate.prototype.drawShape = function(shape){
	switch(shape){
		case 'circle_fill':
			ctx.beginPath();
			ctx.arc(0, 0, 6, 0, Math.PI*2, true);
			ctx.fillStyle = 'hsla(60, 100%, 50%, 1)';
			ctx.fill();
			break;
		case 'circle_border':
			ctx.beginPath();
			ctx.arc(0, 0, 6, 0, Math.PI*2, true);
			ctx.strokeStyle = 'hsla(60, 100%, 50%, 1)';
			ctx.stroke();
			break;
		case 'star_fill':
		    var _length = 0;
		    var _positions = [];
		    var _angle_step = 360 / 10;
		    for(var i=0; i<10; i++){
		        if(i%2 == 0){
		            _length = 13;
		        }else{
		            _length = 8;
		        }
		        var _x = Math.sin( Math.PI/180 * (_angle_step*i - 110) ) * _length;
		        var _y = Math.cos( Math.PI/180 * (_angle_step*i - 110) ) * _length;
		        _positions.push({
		            x: _x,
		            y: _y,
		        });
		    }

			ctx.beginPath();
			ctx.moveTo(_positions[0].x, _positions[0].y);
		    for(var i=0; i<_positions.length-1; i++){
		    	ctx.lineTo(_positions[i+1].x, _positions[i+1].y);
		    }
		    ctx.closePath();
			ctx.lineWidth = 3;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.fillStyle = 'hsla(60, 100%, 50%, 1)';
			ctx.fill();
			break;
		case 'star_stroke':
		    var _length = 0;
		    var _positions = [];
		    var _angle_step = 360 / 10;
		    for(var i=0; i<10; i++){
		        if(i%2 == 0){
		            _length = 13;
		        }else{
		            _length = 8;
		        }
		        var _x = Math.sin( Math.PI/180 * (_angle_step*i - 110) ) * _length;
		        var _y = Math.cos( Math.PI/180 * (_angle_step*i - 110) ) * _length;
		        _positions.push({
		            x: _x,
		            y: _y,
		        });
		    }

			ctx.beginPath();
			ctx.moveTo(_positions[0].x, _positions[0].y);
		    for(var i=0; i<_positions.length-1; i++){
		    	ctx.lineTo(_positions[i+1].x, _positions[i+1].y);
		    }
		    ctx.closePath();
			ctx.lineWidth = 3;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.strokeStyle = 'hsla(60, 100%, 50%, 1)';
			ctx.stroke();
			break;

	}
};
Congratulate.prototype.updateEle = function(){
	for(var i=0; i<this.eleManager.length; i++){
		this.eleManager[i].x += this.eleManager[i].speed_x;
		this.eleManager[i].speed_y += this.eleManager[i].gravity_a;
		this.eleManager[i].y += this.eleManager[i].speed_y;
		this.eleManager[i].rotation += this.eleManager[i].speed_x;
		if(this.eleManager[i].y >= 1.3*this.Trophy_data.height){
			this.eleManager[i].x = -this.Trophy_data.width/2 + Math.random()*this.Trophy_data.width;
			this.eleManager[i].y = Math.random() * this.Trophy_data.height*0.2;
			this.eleManager[i].speed_x = -4 + Math.random()*8;
			this.eleManager[i].speed_y = -15 + Math.random()*4;
			this.eleManager[i].size = Math.random()*10;
			this.eleManager[i].rotation += Math.random()*360;
		}
	}
};
Congratulate.prototype.drawEle = function(ctx){
	this.updateEle();
	ctx.save();
	ctx.translate(this.center[0], this.center[1] - this.Trophy_data.height/2);
	for(var i=0; i<this.eleManager.length; i++){
		ctx.save();
		ctx.translate(this.eleManager[i].x, this.eleManager[i].y);
		ctx.rotate(this.eleManager[i].rotation * Math.PI/180);
		this.drawShape(this.eleManager[i].shape);
		ctx.restore();
	}
	ctx.restore();
};

Congratulate.prototype.drawBg = function(ctx){
	var bg_width = 450;
	// layer_bottom
	ctx.save();
	ctx.shadowColor = 'hsla(60, 100%, 50%, 1)';
	ctx.translate(this.center[0], this.y - this.Trophy_data.height*0.39);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(bg_width + 40, 0);
	ctx.lineTo(bg_width+80 + 40, this.Trophy_data.height*0.9);
	ctx.lineTo(0, this.Trophy_data.height*0.89);
	ctx.closePath();
	var _bottom_linearGradient = ctx.createLinearGradient(0, 0, 480, 0);
	_bottom_linearGradient.addColorStop(0, 'hsla(47, 100%, 50%, 0.2)');
	_bottom_linearGradient.addColorStop(1, 'hsla(56, 100%, 50%, 0.6)');
	ctx.fillStyle = _bottom_linearGradient;
	ctx.fill();
	ctx.restore();

	// layer_middle
	ctx.save();
	ctx.translate(this.center[0], this.y - this.Trophy_data.height*0.39);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(bg_width + 20, 0);
	ctx.lineTo(bg_width + 80 + 20, this.Trophy_data.height*0.9);
	ctx.lineTo(0, this.Trophy_data.height*0.89);
	ctx.closePath();
	var _bottom_linearGradient = ctx.createLinearGradient(0, 0, 480, 0);
	_bottom_linearGradient.addColorStop(0, 'hsla(47, 100%, 50%, 0)');
	_bottom_linearGradient.addColorStop(1, 'hsla(56, 100%, 50%, 0.5)');
	ctx.fillStyle = _bottom_linearGradient;
	ctx.fill();
	ctx.restore();

	// layer_top
	ctx.save();
	ctx.translate(this.center[0], this.y - this.Trophy_data.height*0.39);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(bg_width, 0);
	ctx.lineTo(bg_width + 80, this.Trophy_data.height*0.9);
	ctx.lineTo(0, this.Trophy_data.height*0.89);
	ctx.closePath();
	var _bottom_linearGradient = ctx.createLinearGradient(0, 0, 480, 0);
	_bottom_linearGradient.addColorStop(0, 'hsla(47, 100%, 50%, 0)');
	_bottom_linearGradient.addColorStop(1, 'hsla(56, 100%, 50%, 0.4)');
	ctx.fillStyle = _bottom_linearGradient;
	ctx.fill();
	ctx.restore();
};

Congratulate.prototype.drawText = function(){
	// 队伍名称
	ctx.save();
	ctx.shadowBlur = 0;
	ctx.shadowColor = 'hsla(28, 100%, 50%, 1)';
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3;
	ctx.translate(this.center[0] + this.Trophy_data.width*1.3, this.center[1] - this.Trophy_data.height*0.38);
	ctx.font = 'italic 900 43px 微软雅黑';
	ctx.textBaseline = 'top';
	ctx.fillStyle = 'hsla(60, 100%, 50%, 1)';
	ctx.fillText(this.teamName, 0, 0);
	ctx.restore();

	// 当前排名
	ctx.save();
	ctx.shadowBlur = 0;
	ctx.shadowColor = 'hsla(28, 100%, 50%, 1)';
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3;
	ctx.translate(this.center[0]-this.Trophy_data.width*0.1, this.center[1] - this.Trophy_data.height*0.15);
	ctx.font = 'italic 900 70px 微软雅黑';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'hsla(60, 100%, 50%, 1)';
	ctx.fillText(this.teamRank, 0, 0);
	ctx.restore();

	// 最新排名&历史最高
	ctx.save();
	ctx.shadowBlur = 0;
	ctx.shadowColor = 'hsla(28, 100%, 50%, 1)';
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.translate(this.center[0] + this.Trophy_data.width*1.24, this.center[1] + this.Trophy_data.height*0.05);
	ctx.font = 'italic 900 22px 微软雅黑';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'left';
	ctx.fillStyle = 'hsla(60, 100%, 50%, 1)';
	ctx.fillText('最 新 排 名      ' + this.teamRank, 0, 0);

	ctx.save();
	ctx.translate(117, -9);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(5, 0);
	ctx.lineTo(12, 10);
	ctx.lineTo(5, 20);
	ctx.lineTo(0, 20);
	ctx.lineTo(6, 10);
	ctx.closePath();
	ctx.fill();

	ctx.translate(10, 0);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(5, 0);
	ctx.lineTo(12, 10);
	ctx.lineTo(5, 20);
	ctx.lineTo(0, 20);
	ctx.lineTo(6, 10);
	ctx.closePath();
	ctx.fill();
	ctx.restore();


	ctx.translate(18, 30);
	ctx.fillText('历 史 最 高      ' + this.teamRankHistory, 0, 0);

	ctx.save();
	ctx.translate(119, -9);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(5, 0);
	ctx.lineTo(12, 10);
	ctx.lineTo(5, 20);
	ctx.lineTo(0, 20);
	ctx.lineTo(6, 10);
	ctx.closePath();
	ctx.fill();
	ctx.translate(10, 0);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(5, 0);
	ctx.lineTo(12, 10);
	ctx.lineTo(5, 20);
	ctx.lineTo(0, 20);
	ctx.lineTo(6, 10);
	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.translate(18, 30);
	ctx.fillText('团 队 总 分      ' + this.teamScore, 0, 0);

	ctx.save();
	ctx.translate(119, -9);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(5, 0);
	ctx.lineTo(12, 10);
	ctx.lineTo(5, 20);
	ctx.lineTo(0, 20);
	ctx.lineTo(6, 10);
	ctx.closePath();
	ctx.fill();
	ctx.translate(10, 0);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(5, 0);
	ctx.lineTo(12, 10);
	ctx.lineTo(5, 20);
	ctx.lineTo(0, 20);
	ctx.lineTo(6, 10);
	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.restore();

};

Congratulate.prototype.draw = function(ctx){

	this.drawBg(ctx);
    this.drawEle(ctx);
    this.draw_Trophy(ctx);
    this.drawTeamRank(ctx);
    this.drawText(ctx);
    
}

Congratulate.prototype.bingo = function(ctx){

	this.draw(ctx);
}