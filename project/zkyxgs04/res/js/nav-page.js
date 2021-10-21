var navigateNavPageMenu = document.getElementById('navigate_nav_page_menu');
var navPageWrap = document.getElementById('nav_page_wrap');
navigateNavPageMenu.addEventListener('click', function(){
	navPageWrap.style.display = 'block';
	setTimeout(function(){
		showNavPage({
			'position':'jswh'
		});
		navPageWrap.style.transition = 'opacity .6s';
		navPageWrap.style.opacity = '1';
		navigateNavPageMenu.style.display = 'none';
	},10);
}, false);

navPageWrap.style.display = 'block';
setTimeout(function(){
	showNavPage({
		'position':'bsjr'
	});
	navPageWrap.style.transition = 'opacity .6s';
	navPageWrap.style.opacity = '1';
	navigateNavPageMenu.style.display = 'none';
},10);

var showNavPage = function(o){
	d3.json('./res/js/nav-page-info.json',function(root){
		// 声明变量
		var navPageClose = document.getElementById('nav_page_close');
		var navigateNavPageMenu = document.getElementById('navigate_nav_page_menu');
		var navPageWrap = document.getElementById('nav_page_wrap');
		var nav_page_show_position = document.getElementById('nav_page_show_position');
		// 初始化当前位置
		var _positionSimple = o.position;
		var _positionStr = '';
		var _topIndex = 0;
		var _downIndex = 0;
		for(var i = 0; i<root.length; i++){
			_topIndex = i;
			root[_topIndex].list.forEach(function(obj){
				if(obj.simpleName == _positionSimple){
					_positionStr = root[i].name + ' 》' + obj.name;
				}
			});
		}
		nav_page_show_position.innerHTML = _positionStr;
		// 初始化背景图像
		var _screenWidth = window.screen.width;
		var _screenHeight = window.screen.height;
		navPageWrap.style.backgroundSize = 'auto '+_screenHeight+'px';
		// 显示nav-page
		navPageWrap.style.opacity = '0';
		setTimeout(function(){
			navPageWrap.style.transition = 'opacity .6s';
			navPageWrap.style.opacity = '1';
		},100);
		// ------------------------------------------------------
		navPageClose.addEventListener('click', function(){
			navPageWrap.style.transition = 'opacity .6s';
			navPageWrap.style.opacity = '0';
			setTimeout(function(){
				navPageWrap.style.display = 'none';
				navigateNavPageMenu.style.opacity = 0;
				navigateNavPageMenu.style.display = 'block';
				setTimeout(function(){
					navigateNavPageMenu.style.transition = 'opacity .3s';
					navigateNavPageMenu.style.opacity = 1;
				},10);
			},600);
		}, false);

		var SVGEarthCircle = d3.select(navPageWrap).append('svg')
		.style({
			'position': 'absolute',
			'left': '50%',
			'top': '50%',
			'margin-left': '-450px',
			'margin-top': '-450px',
			'width': '900px',
			'height': '900px'

		});
		// 外部圆环
		var earthCircleOuter = SVGEarthCircle.append('g')
			.attr('id','earth_circle_outer')
			.html('<circle style="animation: earthCircleOuter 6s infinite; fill:none;stroke:#4ef2f2;stroke-linecap:round;stroke-miterlimit:10;stroke-width:6px;stroke-dasharray:190.58 67.04;" xmlns="http://www.w3.org/2000/svg" cx="450" cy="450" r="408"/>');
		// 内部圆环
		var earthCircleInner = SVGEarthCircle.append('g')
			.attr('id','earth_circle_inner')
			.html('<circle style="animation: earthCircleInner 4s infinite linear; fill:none;stroke:#4ef2f2;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;stroke-dasharray:12.01 12.01;" xmlns="http://www.w3.org/2000/svg" cx="450" cy="450" r="382"/>');
	// -------------------------------------------
		// 跳转按钮添加事件
		d3.selectAll('.nav-btn-event-listener')
		.select('path')
		.on('mouseover',function(){
			var _state = d3.select(this).attr('data-state');
			if(!_state || _state == 'off'){
				var _name = d3.select(this).attr('data-mate');
				d3.select('#'+_name+'_light_icon')
				.attr('class','light active');
			}
		},false)
		.on('mouseout',function(){
			var _state = d3.select(this).attr('data-state');
			if(!_state || _state == 'off'){
				var _name = d3.select(this).attr('data-mate');
				d3.select('#'+_name+'_light_icon')
				.attr('class','light');
			}
		})
		.on('click',function(){
			
		},false);
	// ------------------------------------------
		// 底部按钮添加事件
		d3.selectAll('.nav-menu')
		.on('mouseover',function(){
			d3.select(this).style({
				'animation':'shakeAnimation .1s infinite forwards'
			})
			var _name = d3.select(this).attr('data-mate');
			d3.select('#'+_name+'_button_group').selectAll('.light')
			.attr('class','light active');
		},false)
		.on('mouseout',function(){
			d3.select(this).style({
				'animation':'none'
			})
			var _name = d3.select(this).attr('data-mate');
			d3.select('#'+_name+'_button_group').selectAll('.light')
			.each(function(){
				var _state = d3.select(this).attr('data-state');
				if(_state == 'off'){
					d3.select(this).attr('class','light');
				}
			})
		},false);
	});
}