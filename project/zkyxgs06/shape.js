function NumberShape(o){
    this.position = o&&o.position || [0,0];
    this.number = o&&o.number || 8;
    this.strokeColor = o&&o.strokeColor || 'rgba(255,255,255,0.3)';
    this.fillColor = o&&o.fillColor || 'rgba(255,255,255,0.5)';
    this.fill_end_color = o&&o.fill_end_color || 'rgba(255,255,255,0.0)';
    this.ctx = o&&o.ctx;
    this.width = o&&o.width || 40;
    this.height = this.width * 0.4;
    this.out_width = this.height * 0.53;
    this.lineWidth = o&&o.lineWidth || 2;
    this.show_helper = o&&o.show_helper || false;
    this.margin = o&&o.margin || this.width*0.1;
    this.row_linear_gradient = this.ctx.createLinearGradient(0,0, this.width + this.out_width*2,0);
    this.is_single = true;
    this.number > 9 ? this.is_single = false : null;
    this.double_margin = o&&o.double_margin || 5;

    this.draw_single_row = function(position){
        var position = position || [0,0];
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(position[0], position[1]);
        this.ctx.lineTo(position[0]+this.out_width, position[1]-this.height/2);
        this.ctx.lineTo(position[0]+this.out_width + this.width, position[1]-this.height/2);
        this.ctx.lineTo(position[0]+this.out_width*2 + this.width, position[1]);
        this.ctx.lineTo(position[0]+this.out_width + this.width, position[1]+this.height/2);
        this.ctx.lineTo(position[0]+this.out_width, position[1]+this.height/2);
        this.ctx.closePath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.stroke();
        this.row_linear_gradient = this.ctx.createLinearGradient(0,0, this.width + this.out_width*2,0);
        this.row_linear_gradient.addColorStop(0, this.fillColor);
        this.row_linear_gradient.addColorStop(1, this.fill_end_color);
        this.ctx.fillStyle = this.row_linear_gradient;
        this.ctx.fill();
        this.ctx.restore();
    };

    this.draw_single_col = function(position){
        var position = position || [0,0];
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(position[0], position[1]);
        this.ctx.lineTo(position[0]+this.height/2, position[1]+this.out_width);
        this.ctx.lineTo(position[0]+this.height/2, position[1]+this.out_width + this.width);
        this.ctx.lineTo(position[0], position[1]+this.width + 2*this.out_width);
        this.ctx.lineTo(position[0]-this.height/2, position[1]+this.width + 1*this.out_width);
        this.ctx.lineTo(position[0]-this.height/2, position[1] + 1*this.out_width);
        this.ctx.closePath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeColor;
        this.row_linear_gradient.addColorStop(0, this.fillColor);
        this.row_linear_gradient.addColorStop(1, this.fill_end_color);
        this.ctx.stroke();
        this.ctx.fillStyle = this.row_linear_gradient;
        this.ctx.fill();
        this.ctx.restore();
    };

    this.draw_p = function(p){
        switch(p){
            case 1:
                this.draw_single_row([0,0]);
                break;
            case 2:
                this.row_linear_gradient = this.ctx.createLinearGradient(0,0, 0,this.width + this.out_width*2);
                this.draw_single_col([-this.margin,this.margin]);
                break;
            case 3:
                this.row_linear_gradient = this.ctx.createLinearGradient(0,0, 0,this.width + this.out_width*2);
                this.draw_single_col([this.width + 2*this.out_width + 1*this.margin,  1*this.margin]);
                break;
            case 4:
                this.draw_single_row([0,this.width + 2 * this.out_width + 2*this.margin]);
                break;
            case 5:
                this.row_linear_gradient = this.ctx.createLinearGradient(0,this.width + 2*this.out_width + 3*this.margin, 0,this.width + 2*this.out_width + 3*this.margin + this.width + this.out_width*2);
                this.draw_single_col([-1*this.margin, this.width + 2*this.out_width + 3*this.margin]);
                break;
            case 6:
                this.row_linear_gradient = this.ctx.createLinearGradient(0,this.width + 2*this.out_width + 3*this.margin, 0,this.width + 2*this.out_width + 3*this.margin + this.width + this.out_width*2);
                this.draw_single_col([this.width + 2*this.out_width + 1*this.margin, this.width + 2*this.out_width + 3*this.margin]);
                break;
            case 7:
                this.draw_single_row([0,(this.width + 2 * this.out_width)*2 + 4*this.margin]);
                break;
        }
    };

    this.data = {
        0: [1,2,5,7,6,3],
        1: [3,6],
        2: [1,3,4,5,7],
        3: [1,3,4,6,7],
        4: [2,4,3,6],
        5: [1,2,4,6,7],
        6: [1,2,5,7,6,4],
        7: [1,3,6],
        8: [1,2,3,4,5,6,7],
        9: [3,1,2,4,6,7],
    };

    this.drawSingle = function(){
        for(var i=0; i<this.data[this.number].length; i++){
            this.draw_p(this.data[this.number][i]);
        }
    };

    this.drawDouble = function(){
        var _str = String(this.number);
        var _str_num = _str.length;
        for(var i=0; i<_str_num; i++){
            this.ctx.save();
            this.ctx.translate(i * (this.double_margin + this.width + this.out_width*2 + this.height*2) , 0);
            for(var k=0; k<this.data[_str[i]].length; k++){
                this.draw_p(this.data[_str[i]][k]);
            }
            this.ctx.restore();
        }
    };

}
NumberShape.prototype.render = function(){
    this.ctx.save();
    this.ctx.translate(this.position[0] + this.out_width, this.position[1] + this.height/2);

    if(this.show_helper){
        this.ctx.save();
        this.ctx.globalAlpha = 0.4;
        for(var i=0; i<7; i++){
            this.draw_p(i+1);
        }
        this.ctx.restore();

        this.ctx.save();
        this.ctx.globalAlpha = 0.8;
        this.drawSingle();
        this.ctx.restore();
    }

    if(this.is_single){
        this.drawSingle();
    }else{
        this.drawDouble();
    }

    this.ctx.restore();
}
// -----CreateReqularShape----
function CreateReqularShape(o){
    this.edge_number = o&&o.edge_number;
    this.radius = o&&o.radius;
}
CreateReqularShape.prototype.getPositiones = function(){
    this.angle_step = 360 / this.edge_number;
    var positiones = [];
    for(var i=0; i<this.edge_number; i++){
        var _x = Math.sin( Math.PI/180 * this.angle_step*i ) * this.radius;
        var _y = Math.cos( Math.PI/180 * this.angle_step*i ) * this.radius;
        positiones.push({
            x: _x,
            y: _y,
        });
    }
    return positiones;
};


// -----CreateStarShape----
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


// -----Hexagon-----------------------------
function Hexagon(o){
    this.r = o.r || 70;
    this.h = Math.sqrt(Math.pow(this.r,2) - Math.pow(this.r/2,2));
    this.center = o.center || [0,0];
    this.fillColor = 'rgba(255,255,255,0.08)';
    this.strokeColor = 'rgba(0,0,0,0.5)';
    this.stroke = o.stroke || 1;
    this.alpha = o.alpha || Math.random();
    this.alpha_speed_direction = 1;
    this.speed_arr = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06];
    this.alpha_speed = 0.03;
    this.alpha_alpha_max = 0.95;
    this.alpha_alpha_min = 0;
    this.ctx = o.ctx;

    this.main_color_h = 165;
}
Hexagon.prototype.render = function (){

    this.alpha += this.alpha_speed_direction*this.alpha_speed;
    if(this.alpha > this.alpha_alpha_max){
        this.alpha = this.alpha_alpha_max;
        this.alpha_speed_direction = -this.alpha_speed_direction;
        var index = parseInt(Math.random()*this.speed_arr.length);
        this.alpha_speed = this.speed_arr[index];
    }
    if(this.alpha < this.alpha_alpha_min){
        this.alpha = this.alpha_alpha_min;
        this.alpha_speed_direction = -this.alpha_speed_direction;
        var index = parseInt(Math.random()*this.speed_arr.length);
        this.alpha_speed = this.speed_arr[index];
    }

    var cx = this.center[0];
    var cy = this.center[1];

    this.ctx.save();
    this.ctx.strokeStyle = this.strokeColor;

    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.moveTo(cx-this.r/2, cy-this.h);
    this.ctx.lineTo(cx+this.r/2, cy-this.h);
    this.ctx.lineTo(cx+this.r, cy);
    this.ctx.lineTo(cx+this.r/2, cy+this.h);
    this.ctx.lineTo(cx-this.r/2, cy+this.h);
    this.ctx.lineTo(cx-this.r, cy);
    this.ctx.closePath();
    this.ctx.lineWidth = this.stroke;
    var win_width = window.innerWidth;
    var win_height = window.innerHeight;
    var fillLinearGradient = this.ctx.createLinearGradient(0,0, win_width,0);
    fillLinearGradient.addColorStop(0,'hsla('+this.main_color_h+',50%,50%,0.85)');
    fillLinearGradient.addColorStop(0.1,'hsla('+this.main_color_h+',50%,50%,0)');
    fillLinearGradient.addColorStop(0.9,'hsla('+this.main_color_h+',50%,50%,0)');
    fillLinearGradient.addColorStop(1,'hsla('+this.main_color_h+',50%,50%,0.85)');
    this.ctx.fillStyle = fillLinearGradient;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
}


// -----HexagonGrid--------------------------
function HexagonGrid(o){

    this.hexagons = [];
    this.context = o.context;
    this.feature = o.feature;
    this.margin = 4;

    var win_width = window.innerWidth;
    var win_height = window.innerHeight;
    var feature_2radius = this.feature.r*2;
    var feature_h = this.feature.h;
    var row_num = Math.ceil(win_width/(feature_2radius)) + 3;
    var col_num = Math.ceil(win_height/(feature_h+(this.margin)/2));

    for(var i=0; i<row_num; i++){
        for(var j=0; j<col_num; j++){
            var start_x = 0;
            if(j%2 != 0){
                var start_x = this.feature.r+this.feature.r/2 + this.margin;
            }
            var center_x = start_x+(feature_2radius + this.feature.r + this.margin*2)*i;
            var center_y = (feature_h+this.margin-1)*j;

            var hexagon = new this.feature.constructor({
                r: this.feature.r,
                center: [center_x, center_y],
                stroke: this.feature.stroke,
                ctx: this.context,
            });
            this.hexagons.push(hexagon);
        }
    }
}
HexagonGrid.prototype.update = function(){
    for(var i=0; i<this.hexagons.length; i++){
        this.hexagons[i].render();
    }
}


// ------------曲线图---------------------
function CurveChart(o){
    this.position = o.position || [0,0];
    this.width = o.width || 100;
    this.height = o.height || 100;
    this.strokeColor = o.color || 'rgba(255,255,255,1)';
    this.fillColor = o.color || 'rgba(255,255,255,0.2)';
    this.ctx = o.ctx;
}
CurveChart.prototype.render = function(){
    // 外边框
    this.ctx.save();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.lineWidth = 0.4;
    this.ctx.beginPath();
    this.ctx.rect(this.position[0], this.position[1], this.width, this.height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
};


// -----Team-----------------------------
function Team(o){
    this.r = o.r || 70;
    this.h = Math.sqrt(Math.pow(this.r,2) - Math.pow(this.r/2,2));
    this.center = o.center || [0,0];
    this.fillColor = o.fillColor || 'rgba(255,255,255,1)';
    this.strokeColor = o.strokeColor || 'rgba(255,255,255,1)';
    this.stroke = o.stroke || 1;
    this.ctx = o.ctx;
}
Team.prototype.render = function (){

    var cx = this.center[0];
    var cy = this.center[1];

    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.moveTo(cx-this.r/2, cy-this.h);
    this.ctx.lineTo(cx+this.r/2, cy-this.h);
    this.ctx.lineTo(cx+this.r, cy);
    this.ctx.lineTo(cx+this.r/2, cy+this.h);
    this.ctx.lineTo(cx-this.r/2, cy+this.h);
    this.ctx.lineTo(cx-this.r, cy);
    this.ctx.closePath();
    this.ctx.lineWidth = this.stroke;
    var win_width = window.innerWidth;
    var win_height = window.innerHeight;
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.stroke();
    var fillLinearGradient = this.ctx.createLinearGradient(cx-this.r,0, cx+this.r,0);
    fillLinearGradient.addColorStop(0.1,'rgba(255,255,255,0.2)');
    fillLinearGradient.addColorStop(0.9,'rgba(255,255,255,0)');
    this.ctx.fillStyle = fillLinearGradient;
    this.ctx.fill();
    this.ctx.restore();
}


// 全局走势图------------------------------------------
function GlobalTend(o){
    this.center = o.center || [window.innerWidth/2, window.innerHeight/2];
    this.strokeColor = o.color || 'rgba(255,255,255,0.7)';
    this.radius = o.radius || window.innerHeight/2 - 150;
    this.ctx = o.ctx;
    this.data_teams = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.every_team_radius = 2 * Math.PI * this.radius / this.data_teams.length - 60;
    this.data_problems = [1,1,1,1,1,1,1,1,1,1,1,1,1];


    // 外圈队伍起点----
    this.draw_outside_circle = function(){
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.center[0], this.center[1], this.radius, 0, Math.PI*2, false);
        this.ctx.stroke();
        this.ctx.restore();
    };


    // 中心放射线----
    this.angle_step = 360/this.data_teams.length;
    this.draw_radiation_line = function(){
        this.ctx.save();
        this.ctx.translate(this.center[0], this.center[1]);
        for(var i=0; i<this.data_teams.length; i++){
            var _x = Math.sin(Math.PI/180 * (this.angle_step*i) ) * this.radius;
            var _y = Math.cos(Math.PI/180 * (this.angle_step*i) ) * this.radius;
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            this.ctx.moveTo(0,0);
            this.ctx.lineTo(_x, _y);
            this.ctx.stroke();
        }
        this.ctx.restore();
    };


    // 装载队伍----
    this.teams = [];
    for(var i=0; i<this.data_teams.length; i++){
        var _x = Math.sin(Math.PI/180 * (this.angle_step*i) ) * this.radius;
        var _y = Math.cos(Math.PI/180 * (this.angle_step*i) ) * this.radius;
        this.teams.push(new Team({
            ctx: this.ctx,
            center: [_x, _y],
            r: this.every_team_radius,
            strokeColor: 'rgba(255,255,255,0.5)',
            alpha: 0.98,
        }));
    }


    // 绘制队伍----
    this.draw_teams = function(){
        this.ctx.save();
        this.ctx.translate(this.center[0], this.center[1]);
        for(var i=0; i<this.teams.length; i++){
            this.teams[i].render();
        }
        this.ctx.restore();
    };


    // 绘制队伍之间连线----
    this.draw_teams_lines = function(){
        // 创建半径为20的六边形----
        var createReqularShape = new CreateReqularShape();
        createReqularShape.edge_number = this.data_teams.length;
        createReqularShape.radius = this.radius;
        var _team_axis = createReqularShape.getPositiones();

        this.ctx.save();
        this.ctx.translate(this.center[0], this.center[1]);
        this.ctx.beginPath();
        this.ctx.moveTo(_team_axis[0].x, _team_axis[0].y);
        for(var i=0; i<_team_axis.length-1; i++){
            this.ctx.lineTo(_team_axis[i+1].x, _team_axis[i+1].y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        this.ctx.stroke();
        this.ctx.restore();
    };

}
GlobalTend.prototype.render = function(){

    this.draw_outside_circle();

    this.draw_radiation_line();

    this.draw_teams();

    this.draw_teams_lines();

}


// 团队排名-----
function TeamRank(o){
    var that = this;
    this.ctx = o.ctx;
    this.rank = o.rank;
    this.NOEMAL_HEIGHT = 65;
    this.TOP3_HEIGHT = 73;
    this.NORMAL_MARGIN = 22;
    this.TOP3_MARGIN = 33;
    this.height = this.NOEMAL_HEIGHT; 
    this.position = [0, ( 3 * (this.TOP3_HEIGHT + this.TOP3_MARGIN) ) + (this.rank-4) * (this.height + this.NORMAL_MARGIN) ]; 


    this.star_radius = 6;
    this.star_margin = 7

    if(this.rank == 1){
        this.height = this.TOP3_HEIGHT; 
        this.medal_size = this.height/2;
    }
    if(this.rank == 2){
        this.height = this.TOP3_HEIGHT; 
        this.medal_size = this.height/2;
    }
    if(this.rank == 3){
        this.height = this.TOP3_HEIGHT; 
        this.medal_size = this.height/2;
    }
    if(this.rank == 1 || this.rank == 2 || this.rank == 3){
        this.position = [0, (this.rank-1) * (this.height + this.TOP3_MARGIN) ]; 

        this.star_radius = 9;
        this.star_margin = 7
    }

    this.fontSize = parseInt(this.height*0.28);
    this.fontWeight = 100;

    this.medal_size = this.height;
    this.number_width = this.NOEMAL_HEIGHT * 0.18;
    this.info_position = [this.position[0] + (this.height * 0.295), this.position[1]];
    this.medal_margin = 10;
    this.lineargradient_begin_color = 'rgba(255,255,255,0.3)';
    this.lineargradient_end_color = 'rgba(255,255,255,0)';
    this.stroke_lineargradient_begin_color = 'rgba(255,255,255,1)';
    this.stroke_lineargradient_end_color = 'rgba(255,255,255,0)';
    this.rank_img_isload = false;

    this.rank_img = new Image();
    if(this.rank == 1){
        this.rank_img.src = './images/top_res/gold_rank.png';
        this.rank_img.onload = function(){ that.rank_img_isload = true };

        this.lineargradient_begin_color = 'rgba(255,228,31,0.65)';
        this.lineargradient_end_color = 'rgba(255,228,31,0)';

        this.stroke_lineargradient_begin_color = 'rgba(255,228,31,1)';
        this.stroke_lineargradient_end_color = 'rgba(255,228,31,0)';
    }
    if(this.rank == 2){
        this.rank_img.src = './images/top_res/sliver_rank.png';
        this.rank_img.onload = function(){ that.rank_img_isload = true };

        this.lineargradient_begin_color = 'rgba(33,220,255,0.65)';
        this.lineargradient_end_color = 'rgba(33,220,255,0)';

        this.stroke_lineargradient_begin_color = 'rgba(33,220,255,1)';
        this.stroke_lineargradient_end_color = 'rgba(33,220,255,0)';
    }
    if(this.rank == 3){
        this.rank_img.src = './images/top_res/broze_rank.png';
        this.rank_img.onload = function(){ that.rank_img_isload = true };

        this.lineargradient_begin_color = 'rgba(250,55,9,0.65)';
        this.lineargradient_end_color = 'rgba(250,55,9,0)';

        this.stroke_lineargradient_begin_color = 'rgba(250,55,9,1)';
        this.stroke_lineargradient_end_color = 'rgba(250,55,9,0)';
    }
    if(this.rank == 1 || this.rank == 2 || this.rank == 3){
        this.fontWeight = 900;
        this.info_position = [this.position[0] + this.medal_size * (1.2* (4-this.rank) ) + this.medal_margin, this.position[1]];
    }

    this.lr_out_length = this.height * 0.295;
    this.data_problemes = [1,2,3,4,5,6,5,6];
    this.star_number = this.data_problemes.length;
    this.photo_width = 25;
    this.team_img = new Image();
    this.photo_is_load = false;
    this.team_img.src = o.team_photo_url;
    this.team_img.onload = function(){
        that.photo_is_load = true;
    };
    this.team_name = o.team_name;
    this.width = 20 + this.star_number * (this.star_radius*2 + this.star_margin) + this.photo_width + this.lr_out_length;

    // 绘制外边框----
    this.draw_border = function(){
        this.ctx.save();
        this.ctx.translate(this.lr_out_length,0);
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(this.info_position[0] - this.lr_out_length, this.info_position[1] + this.height/2);
        this.ctx.lineTo(this.info_position[0], this.info_position[1] + this.height);
        this.ctx.lineTo(this.info_position[0] + this.width + this.lr_out_length + 10, this.info_position[1] + this.height);
        this.ctx.lineTo(this.info_position[0] + this.width, this.info_position[1]);
        this.ctx.lineTo(this.info_position[0], this.info_position[1]);
        this.ctx.closePath();
        var fillLinearGradient = this.ctx.createLinearGradient(this.info_position[0],0,this.info_position[0]+this.width,0);
        fillLinearGradient.addColorStop(0, this.lineargradient_begin_color);
        fillLinearGradient.addColorStop(1, this.lineargradient_end_color);
        this.ctx.fillStyle = fillLinearGradient;
        this.ctx.fill();
        var strokeLinearGradient = this.ctx.createLinearGradient(this.info_position[0], this.info_position[1], this.info_position[0]+this.width, this.info_position[1]+this.height*2.8);
        strokeLinearGradient.addColorStop(0, this.stroke_lineargradient_begin_color);
        strokeLinearGradient.addColorStop(1, this.stroke_lineargradient_end_color);
        this.ctx.strokeStyle = strokeLinearGradient;
        this.ctx.stroke();
        this.ctx.restore();
    };

    // 绘制五角星----
    this.draw_star = function(){
        var createStarShape = new CreateStarShape({
            radius: this.star_radius,
        });
        var positions = createStarShape.getPositiones();
        this.ctx.save();
        this.ctx.translate(this.info_position[0] + 2*(this.height*0.55 - 4) + this.fontSize, this.info_position[1] + this.height/2 + this.star_radius*2);

                this.ctx.translate(i*10, 0);
                this.ctx.beginPath();
                this.ctx.moveTo(positions[0].x,positions[0].y);
                for(var i=0; i<positions.length-1; i++){
                    this.ctx.lineTo(positions[i+1].x, positions[i+1].y);
                }
                this.ctx.closePath();
                this.ctx.strokeStyle = 'rgba(255,255,255,0.95)';
                this.ctx.stroke();
                this.ctx.fillStyle = 'rgba(255,255,255,0.99)';
                // this.ctx.fill();

        this.ctx.restore();
    };

    // 绘制全部赛题答题情况----
    this.draw_problemes = function(){
        for(var i=0; i<this.star_number; i++){
            this.ctx.save();
            this.ctx.translate(5 + i*(this.star_radius*2 + this.star_margin), 0);
            this.draw_star();
            this.ctx.restore();
        }
    };


    // 绘制奖牌----
    this.draw_medal = function(){
        if(this.rank != 1 && this.rank != 2 && this.rank != 3){  
            var _position = [this.position[0] + this.width + this.number_width*3.2, this.position[1] + this.height - this.number_width*4.8];
            if(this.rank > 9){
                _position[0] += - this.number_width*1.8;
            }
            var numberShape = new NumberShape({
                width: this.number_width,
                number: this.rank,
                strokeColor: 'rgba(255,255,255,0.8)',
                lineWidth: 1,
                position: _position,
                ctx: this.ctx,
            });
            numberShape.render();
        }

        if(this.rank_img_isload){
            this.ctx.save();
            this.ctx.translate(this.position[0] + this.medal_size*0.9 + ((3-this.rank) * this.medal_size * 1.2), this.position[1] + this.medal_size/2);
            this.ctx.scale(1.6,1.6);
            this.ctx.drawImage(this.rank_img, -this.medal_size/2, -this.medal_size/2, this.medal_size, this.medal_size);
            this.ctx.restore();
        }
    };

    // 绘制团队名称----
    this.draw_team_name = function(){
        this.ctx.save();
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(255,255,255,1)';
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.translate(this.info_position[0] + 2*(this.height*0.55 - 4) + this.fontSize,this.info_position[1] + this.height*0.5);
        this.ctx.font = 'italic '+this.fontWeight+' '+this.fontSize+'px 微软雅黑';
        this.ctx.fillStyle = 'rgba(255,255,255,1)';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(this.team_name, 0, 0);
        this.ctx.restore();
    };

    // 绘制头像----
    this.draw_photo = function(){
        if(this.photo_is_load){
            var reqularShape = new CreateReqularShape({
                edge_number: 6,
                radius: (this.height*0.55 - 4),
            });
            var _positions = reqularShape.getPositiones();

            this.ctx.save();
            this.ctx.translate(this.info_position[0] + this.lr_out_length, this.info_position[1]);

                this.ctx.save();
                this.ctx.translate(this.lr_out_length - this.lr_out_length*0.09, this.height/2);
                this.ctx.rotate(Math.PI/180 * 90);
                this.ctx.beginPath();
                this.ctx.moveTo(_positions[0].x,_positions[0].y);
                for(var i=0; i<_positions.length-1; i++){
                    this.ctx.lineTo(_positions[i+1].x,_positions[i+1].y);
                }
                this.ctx.closePath();
                this.ctx.restore();

            this.ctx.strokeStyle = 'rgba(255,255,255,1)';
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.team_img, -this.lr_out_length, 0, this.height + 10, this.height);
            this.ctx.restore();
        }
    };

}
TeamRank.prototype.render = function(){

    if(this.rank ==1 || this.rank == 2 || this.rank == 3){
        this.draw_medal();

        this.draw_border();
        this.draw_photo();
        this.draw_team_name();
        this.draw_problemes();
    }else{
        this.draw_border();
        this.draw_photo();
        this.draw_team_name();
        this.draw_problemes();

        this.draw_medal();
    }


};

// 团队排名管理----
function MedalRankManager(o){
    this.team_ranks = [];
    this.top_num = o.num || 10;
    this.ctx = o.ctx;
    this.margin_top = o.margin_top || 80;
    this.margin_left = o.margin_left || 0;

    for(var i=0; i<this.top_num; i++){
        this.team_ranks.push(new TeamRank({
            ctx: this.ctx,
            rank: (i+1),
            team_name: 'KCSA-798',
            team_photo_url: './images/nav-page/user.png',
        }));
    }

};
MedalRankManager.prototype.render = function(){
    this.ctx.save();
    this.ctx.translate(this.margin_left, this.margin_top);
    for(var i=0; i<this.team_ranks.length; i++){
        this.team_ranks[i].render();
    }
    this.ctx.restore();
};

//顶部竞赛排名页面信息----
function TopGameInfo(o){
    this.center = [window.innerWidth/2, 10];
    this.ctx = o.ctx;
    this.is_end_time_near = o.is_end_time_near || false;

    this.date_width = 290;
    this.date_height = 55;
    this.wing_width = window.innerWidth * 0.34;

    if(this.is_end_time_near){
        this.date_shadow_color = '0,70%,60%';
    }else{
        this.date_shadow_color = '180,92%,50%';
    }

    this.draw_top_line = function(){
        // 顶部线条
        this.ctx.save();
        this.ctx.shadowBlur = 6;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowColor = 'hsla('+this.date_shadow_color+',1)';
        this.ctx.translate(this.center[0], this.center[1]);
        this.ctx.beginPath();
        this.ctx.moveTo(-this.wing_width - this.date_width/2, 0);
        this.ctx.lineTo(-this.date_width/2, 0);
        this.ctx.lineTo(-this.date_width/2 + this.date_height*0.5, this.date_height);
        this.ctx.lineTo(this.date_width/2 - this.date_height*0.5, this.date_height);
        this.ctx.lineTo(this.date_width/2, 0);
        this.ctx.lineTo(this.wing_width + this.date_width/2, 0);

        this.ctx.lineWidth = 2;
        var _stroke_linear = this.ctx.createLinearGradient(-(this.wing_width + this.date_width/2),0, this.date_width/2 + this.wing_width,0);
        _stroke_linear.addColorStop(0, 'rgba(255,255,255,0)');
        _stroke_linear.addColorStop(0.2, 'rgba(255,255,255,1)');
        _stroke_linear.addColorStop(0.8, 'rgba(255,255,255,1)');
        _stroke_linear.addColorStop(1, 'rgba(255,255,255,0)');
        this.ctx.strokeStyle = _stroke_linear;
        this.ctx.stroke();
        this.ctx.restore();
    };
    this.wings = [
        {
            width: this.wing_width * 0.43,
            height: 13,
            offsetX: 19,
            offsetY: 43,
            offset_ratio: 0.12,
            fill_light_color: 'rgba(255,255,255,0.8)',
            fill_dark_color: 'rgba(255,255,255,1)',
            shadowColor: 'rgba(15,255,255,0.8)',
        },
        {
            width: this.wing_width * 0.61,
            height: 18,
            offsetX: 11,
            offsetY: 29,
            offset_ratio: 0.18,
            fill_light_color: 'rgba(255,255,255,0.8)',
            fill_dark_color: 'rgba(255,255,255,1)',
            shadowColor: 'rgba(15,255,255,0.8)',
        },
        {
            width: this.wing_width * 0.8,
            height: 26,
            offsetX: -2,
            offsetY: 3,
            offset_ratio: 0.24,
            fill_light_color: 'rgba(255,255,255,0.8)',
            fill_dark_color: 'rgba(255,255,255,1)',
            shadowColor: 'rgba(15,255,255,0.8)',
        },
    ];


    this.draw_wing = function(){
        

        for(var i=0; i<this.wings.length; i++){
            // 左翼
            this.ctx.save();
            this.ctx.shadowBlur = 13;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.shadowColor = 'hsla('+this.date_shadow_color+',1)';
            this.ctx.translate(this.center[0] + this.wings[i].offsetX, this.center[1] + this.wings[i].offsetY);

            this.ctx.beginPath();
            this.ctx.moveTo(-this.wings[i].width - this.date_width/2, this.wings[i].height/2);
            this.ctx.lineTo(-this.wings[i].width - this.date_width/2 + 20, this.wings[i].height/2 - this.wings[i].height/2);
            this.ctx.lineTo(-this.date_width/2, this.wings[i].height/2 - this.wings[i].height/2);
            this.ctx.lineTo(-this.date_width/2 + this.date_height*this.wings[i].offset_ratio, this.wings[i].height);
            this.ctx.lineTo(-this.wings[i].width - this.date_width/2 + 20, this.wings[i].height);
            this.ctx.closePath();

            var _fill_linear = this.ctx.createLinearGradient(-(this.wings[i].width + this.date_width/2),0, 0,0);
            _fill_linear.addColorStop(0, this.wings[i].fill_light_color);
            _fill_linear.addColorStop(0.5, this.wings[i].fill_dark_color);
            _fill_linear.addColorStop(1, this.wings[i].fill_dark_color);
            this.ctx.fillStyle = _fill_linear;
            this.ctx.fill();
            this.ctx.restore();

            // 右翼
            this.ctx.save();
            this.ctx.shadowBlur = 13;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.shadowColor = 'hsla('+this.date_shadow_color+',1)';
            this.ctx.translate(this.center[0] - this.wings[i].offsetX, this.center[1] + this.wings[i].offsetY);

            this.ctx.beginPath();
            this.ctx.moveTo(this.wings[i].width + this.date_width/2, this.wings[i].height/2);
            this.ctx.lineTo(this.wings[i].width + this.date_width/2 - 20, this.wings[i].height/2 - this.wings[i].height/2);
            this.ctx.lineTo(this.date_width/2, this.wings[i].height/2 - this.wings[i].height/2);
            this.ctx.lineTo(this.date_width/2 - this.date_height*this.wings[i].offset_ratio, this.wings[i].height);
            this.ctx.lineTo(this.wings[i].width + this.date_width/2 - 20, this.wings[i].height);
            this.ctx.closePath();

            var _fill_linear = this.ctx.createLinearGradient(0,0, (this.wings[i].width + this.date_width/2),0);
            _fill_linear.addColorStop(1, this.wings[i].fill_light_color);
            _fill_linear.addColorStop(0.5, this.wings[i].fill_dark_color);
            _fill_linear.addColorStop(0, this.wings[i].fill_dark_color);
            this.ctx.fillStyle = _fill_linear;
            this.ctx.fill();
            this.ctx.restore();
        }
    };

    this.draw_dot = function(){
        var dot = new CreateReqularShape({
            edge_number:6,
            radius:5,
        });
        var dot_positions = dot.getPositiones();

        this.ctx.save();
        this.ctx.shadowBlur = 13;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowColor = 'hsla('+this.date_shadow_color+',1)';
        this.ctx.beginPath();
        this.ctx.translate(this.center[0] - 39,this.center[1] + this.date_height/2 - 12);
        this.ctx.moveTo(dot_positions[0].x, dot_positions[0].y);
        for(var i=0; i<dot_positions.length-1; i++){
            this.ctx.lineTo(dot_positions[i+1].x, dot_positions[i+1].y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
        this.ctx.fill();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.shadowBlur = 13;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowColor = 'hsla('+this.date_shadow_color+',1)';
        this.ctx.beginPath();
        this.ctx.translate(this.center[0] - 39,this.center[1] + this.date_height/2 + 6);
        this.ctx.moveTo(dot_positions[0].x, dot_positions[0].y);
        for(var i=0; i<dot_positions.length-1; i++){
            this.ctx.lineTo(dot_positions[i+1].x, dot_positions[i+1].y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
        this.ctx.fill();
        this.ctx.restore();
    };

    this.draw_date = function(){
        this.date = new Date();
        this.date_hours = String(this.date.getHours());
        this.date_minutes = String(this.date.getMinutes());
        this.date_seconds = String(this.date.getSeconds());

        this.date_str = ( this.date_hours.charAt(1) ? this.date_hours : '0'+this.date_hours ) + ':' + ( this.date_minutes.charAt(1) ? this.date_minutes : '0'+this.date_minutes ) + ':' + ( this.date_seconds.charAt(1) ? this.date_seconds : '0'+this.date_seconds );

        this.ctx.save();
        this.ctx.translate(0,0);
        this.draw_dot();
        this.draw_dot();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(80,0);
        this.draw_dot();
        this.draw_dot();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowColor = 'hsla('+this.date_shadow_color+',1)';
        this.ctx.translate(-135, 3);
        for(var i=0; i<this.date_str.length; i++){
            if(this.date_str[i] == ':'){
                continue;
            }

            var numberShape = new NumberShape({
                ctx: this.ctx,
                number: this.date_str[i],
                width: 12,
                show_helper: true,
                position: [this.center[0], this.center[1]],
                strokeColor: 'rgba(255,255,255,0.9)',
                fillColor: 'rgba(255,255,255,1)',
                fill_end_color: 'rgba(255,255,255,0.2)',
                lineWidth: 1,
            });
            var _offsetX = 30;
            if(i == 3 || i == 6 ){
                _offsetX += 20;
            }else{
            }
            this.ctx.translate(_offsetX, 0);
            numberShape.render();
        }
        this.ctx.restore();
    };

}
TopGameInfo.prototype.render = function(){

    this.draw_top_line();

    this.draw_wing();

    this.draw_date();

};

//congratulation-----------------------------
function Congratulation(o){
    this.ctx = o.ctx;
    this.center = [window.innerWidth/2, window.innerHeight/2];
    this.Trophy_data = {
        width: 100,
        height: 200,
    };

    this.draw_Trophy = function(){

        // 主体
        this.ctx.save();
        this.ctx.translate(this.center[0], this.center[1] - this.Trophy_data.height*0.5 + this.Trophy_data.height*0.15);
        
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
        this.ctx.beginPath();
        // 左侧
        this.ctx.moveTo(_dot_data[0].x, _dot_data[0].y);
        this.ctx.lineTo(_dot_data[1].x, _dot_data[1].y);
        this.ctx.lineTo(-this.Trophy_data.width*0.66, this.Trophy_data.width/2*0.5);
        this.ctx.bezierCurveTo(-this.Trophy_data.width* 0.67, this.Trophy_data.width/2*0.5, -this.Trophy_data.width/2 - 17,this.Trophy_data.height*0.51, -this.Trophy_data.width*0.08, this.Trophy_data.height*0.6);
        this.ctx.bezierCurveTo(-this.Trophy_data.width*0.08, this.Trophy_data.height*0.6, -this.Trophy_data.width*0.21,this.Trophy_data.height*0.58, -this.Trophy_data.width*0.23,this.Trophy_data.height*0.63);
        this.ctx.bezierCurveTo(-this.Trophy_data.width*0.22,this.Trophy_data.height*0.68, -this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, -this.Trophy_data.width*0.12,this.Trophy_data.height*0.66);
        this.ctx.bezierCurveTo(-this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, -this.Trophy_data.width*0.16,this.Trophy_data.height*0.75, -this.Trophy_data.width*0.4,this.Trophy_data.height*0.75);
        this.ctx.lineTo(-this.Trophy_data.width*0.4,this.Trophy_data.height*0.78);
        this.ctx.lineTo(-this.Trophy_data.width*0.58,this.Trophy_data.height*0.78);
        this.ctx.bezierCurveTo(-this.Trophy_data.width*0.58,this.Trophy_data.height*0.78, -this.Trophy_data.width*0.62,this.Trophy_data.height*0.78, -this.Trophy_data.width*0.62,this.Trophy_data.height*0.82);
        this.ctx.bezierCurveTo(-this.Trophy_data.width*0.62,this.Trophy_data.height*0.82, -this.Trophy_data.width*0.62,this.Trophy_data.height*0.85, -this.Trophy_data.width*0.58,this.Trophy_data.height*0.85);
        this.ctx.lineTo(0, this.Trophy_data.height*0.85);

        // 右侧
        this.ctx.moveTo(0,-this.Trophy_data.height*0.04);
        this.ctx.lineTo(this.Trophy_data.width*0.66, -this.Trophy_data.height*0.04);
        this.ctx.lineTo(this.Trophy_data.width*0.66, this.Trophy_data.width/2*0.5);
        this.ctx.bezierCurveTo(this.Trophy_data.width*0.67, this.Trophy_data.width/2*0.5, this.Trophy_data.width/2 + 17,this.Trophy_data.height*0.51, this.Trophy_data.width*0.08, this.Trophy_data.height*0.6);
        this.ctx.bezierCurveTo(this.Trophy_data.width*0.08, this.Trophy_data.height*0.6, this.Trophy_data.width*0.21,this.Trophy_data.height*0.58, this.Trophy_data.width*0.23,this.Trophy_data.height*0.63);
        this.ctx.bezierCurveTo(this.Trophy_data.width*0.22,this.Trophy_data.height*0.68, this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, this.Trophy_data.width*0.12,this.Trophy_data.height*0.66);
        this.ctx.bezierCurveTo(this.Trophy_data.width*0.12,this.Trophy_data.height*0.66, this.Trophy_data.width*0.16,this.Trophy_data.height*0.75, this.Trophy_data.width*0.4,this.Trophy_data.height*0.75);
        this.ctx.lineTo(this.Trophy_data.width*0.4,this.Trophy_data.height*0.78);
        this.ctx.lineTo(this.Trophy_data.width*0.58,this.Trophy_data.height*0.78);
        this.ctx.bezierCurveTo(this.Trophy_data.width*0.58,this.Trophy_data.height*0.78, this.Trophy_data.width*0.62,this.Trophy_data.height*0.78, this.Trophy_data.width*0.62,this.Trophy_data.height*0.82);
        this.ctx.bezierCurveTo(this.Trophy_data.width*0.62,this.Trophy_data.height*0.82, this.Trophy_data.width*0.62,this.Trophy_data.height*0.85, this.Trophy_data.width*0.58,this.Trophy_data.height*0.85);
        this.ctx.lineTo(0, this.Trophy_data.height*0.85);

        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = 'hsla(0,70%,100%,1)';
        this.ctx.stroke();
        this.ctx.fillStyle = 'hsla(0,100%,100%,0.3)';
        this.ctx.fill();
        this.ctx.restore();

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
        this.ctx.save();
        this.ctx.translate(this.center[0] - this.Trophy_data.width*0.69, this.center[1]-this.Trophy_data.height*0.20);
        this.ctx.beginPath();
        this.ctx.moveTo(_dot_data[0].x, _dot_data[0].y);
        this.ctx.bezierCurveTo(_dot_data[1].c1x,_dot_data[1].c1y, _dot_data[1].c2x,_dot_data[1].c2y, _dot_data[1].x,_dot_data[1].y);
        this.ctx.bezierCurveTo(_dot_data[2].c1x,_dot_data[2].c1y, _dot_data[2].c2x,_dot_data[2].c2y, _dot_data[2].x,_dot_data[2].y);
        this.ctx.bezierCurveTo(_dot_data[3].c1x,_dot_data[3].c1y, _dot_data[3].c2x,_dot_data[3].c2y, _dot_data[3].x,_dot_data[3].y);
        this.ctx.bezierCurveTo(_dot_data[4].c1x,_dot_data[4].c1y, _dot_data[4].c2x,_dot_data[4].c2y, _dot_data[4].x,_dot_data[4].y);
        this.ctx.bezierCurveTo(_dot_data[5].c1x,_dot_data[5].c1y, _dot_data[5].c2x,_dot_data[5].c2y, _dot_data[5].x,_dot_data[5].y);
        this.ctx.bezierCurveTo(_dot_data[6].c1x,_dot_data[6].c1y, _dot_data[6].c2x,_dot_data[6].c2y, _dot_data[6].x,_dot_data[6].y);
        this.ctx.bezierCurveTo(_dot_data[7].c1x,_dot_data[7].c1y, _dot_data[7].c2x,_dot_data[7].c2y, _dot_data[7].x,_dot_data[7].y);
        this.ctx.bezierCurveTo(_dot_data[8].c1x,_dot_data[8].c1y, _dot_data[8].c2x,_dot_data[8].c2y, _dot_data[8].x,_dot_data[8].y);

        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = 'rgba(255,255,255,1)';
        this.ctx.stroke();
        this.ctx.restore();
        // 右侧
        this.ctx.save();
        this.ctx.translate(this.center[0] + this.Trophy_data.width*0.69, this.center[1]-this.Trophy_data.height*0.20);
        this.ctx.beginPath();
        this.ctx.moveTo(-_dot_data[0].x, _dot_data[0].y);
        this.ctx.bezierCurveTo(-_dot_data[1].c1x,_dot_data[1].c1y, -_dot_data[1].c2x,_dot_data[1].c2y, -_dot_data[1].x,_dot_data[1].y);
        this.ctx.bezierCurveTo(-_dot_data[2].c1x,_dot_data[2].c1y, -_dot_data[2].c2x,_dot_data[2].c2y, -_dot_data[2].x,_dot_data[2].y);
        this.ctx.bezierCurveTo(-_dot_data[3].c1x,_dot_data[3].c1y, -_dot_data[3].c2x,_dot_data[3].c2y, -_dot_data[3].x,_dot_data[3].y);
        this.ctx.bezierCurveTo(-_dot_data[4].c1x,_dot_data[4].c1y, -_dot_data[4].c2x,_dot_data[4].c2y, -_dot_data[4].x,_dot_data[4].y);
        this.ctx.bezierCurveTo(-_dot_data[5].c1x,_dot_data[5].c1y, -_dot_data[5].c2x,_dot_data[5].c2y, -_dot_data[5].x,_dot_data[5].y);
        this.ctx.bezierCurveTo(-_dot_data[6].c1x,_dot_data[6].c1y, -_dot_data[6].c2x,_dot_data[6].c2y, -_dot_data[6].x,_dot_data[6].y);
        this.ctx.bezierCurveTo(-_dot_data[7].c1x,_dot_data[7].c1y, -_dot_data[7].c2x,_dot_data[7].c2y, -_dot_data[7].x,_dot_data[7].y);
        this.ctx.bezierCurveTo(-_dot_data[8].c1x,_dot_data[8].c1y, -_dot_data[8].c2x,_dot_data[8].c2y, -_dot_data[8].x,_dot_data[8].y);

        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = 'rgba(255,255,255,1)';
        this.ctx.stroke();
        this.ctx.restore();
    };
}
Congratulation.prototype.render = function(){
    this.draw_Trophy();
};