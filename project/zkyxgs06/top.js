var win_width = window.innerWidth;
var win_height = window.innerHeight;
var win_ratio = window.devicePixelRatio;

var ele_bg = document.getElementById('background');
var c_bg = document.createElement('canvas');
c_bg.width = win_width;
c_bg.height = win_height;
c_bg.style.width = win_width+'px';
c_bg.style.height = win_height+'px';
ele_bg.appendChild(c_bg);
var ctx_bg = c_bg.getContext('2d');

var ele_proc = document.getElementById('groups_processing');
var c_proc = document.createElement('canvas');
c_proc.width = win_width;
c_proc.height = win_height;
c_proc.style.width = win_width+'px';
c_proc.style.height = win_height+'px';
ele_proc.appendChild(c_proc);
var ctx_proc = c_proc.getContext('2d');

var ele_tr = document.getElementById('team_reak');
var c_tr = document.createElement('canvas');
c_tr.width = win_width;
c_tr.height = win_height;
c_tr.style.width = win_width+'px';
c_tr.style.height = win_height+'px';
ele_tr.appendChild(c_tr);
var ctx_tr = c_tr.getContext('2d');

var ele_top_info = document.getElementById('top_info');
var c_top_info = document.createElement('canvas');
c_top_info.width = win_width;
c_top_info.height = win_height;
c_top_info.style.width = win_width+'px';
c_top_info.style.height = win_height+'px';
ele_top_info.appendChild(c_top_info);
var ctx_top_info = c_top_info.getContext('2d');

var ele_congratulation = document.getElementById('congratulation');
var c_congratulation = document.createElement('canvas');
c_congratulation.width = win_width;
c_congratulation.height = win_height;
c_congratulation.style.width = win_width+'px';
c_congratulation.style.height = win_height+'px';
ele_congratulation.appendChild(c_congratulation);
var ctx_congratulation = c_congratulation.getContext('2d');


// 背景-------------------------------------------------
var hexagon_feature = new Hexagon({ stroke:1, r: 30,});
var hexagonGrid = new HexagonGrid({ context: ctx_bg, feature: hexagon_feature });


// 全局排位实时走势-----------------------------------------
var globalTend = new GlobalTend({
    ctx: ctx_proc,
});


// 团队排名前10排行榜-----------------------------------------
var medalRankManager = new MedalRankManager({
    ctx: ctx_tr,
    data: {}
});

// 顶部竞赛排名信息-----------------------------------------
var topGameInfo = new TopGameInfo({
    ctx: ctx_top_info,
    is_end_time_near: false,
});

// 欢庆时刻--------------------------------------------------
var congratulation = new Congratulation({
    ctx: ctx_congratulation
});

(function render(){
    requestAnimationFrame(render);

    // 背景----
    ctx_bg.clearRect(0,0,window.innerWidth,window.innerHeight);
    hexagonGrid.update();

    // 中部全局排名----
    ctx_proc.clearRect(0,0,window.innerWidth,window.innerHeight);
    globalTend.render();

    // 左侧排名----
    ctx_tr.clearRect(0,0,window.innerWidth,window.innerHeight);
    medalRankManager.render();

    // 顶部竞赛排名----
    ctx_top_info.clearRect(0,0,window.innerWidth,window.innerHeight);
    topGameInfo.render();

    // 欢庆时刻--------------------------------------------------
    ctx_congratulation.clearRect(0,0,window.innerWidth,window.innerHeight);
    congratulation.render();

}());
