mui.init();
var swiper = new Swiper('.swiper-container', {
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: true,
	},
	autoplay: true,
	autoplay: {
		disableOnInteraction: false,
	},

});
mui('ul').on('tap','.TOD', function() {
	mui.openWindow({
		id: 'post.html',
		url: '../Post/post.html',
		extras: {
			type: 'TOD' //扩展参数
		},
		styles: {
			titleNView: {
				titleText: "帖子列表",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#000000", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		waiting: {
			title: '努力加载中...',
		}
	});
})
mui('ul').on('tap','.TC', function() {
	mui.openWindow({
		id: 'post.html',
		url: '../Post/post.html',
		extras: {
			type: 'TC' //扩展参数
		},
		styles: {
			titleNView: {
				titleText: "帖子列表",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#000000", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		waiting: {
			title: '努力加载中...',
		}
	});
})
mui('ul').on('tap','.TJ', function() {
	mui.openWindow({
		id: 'post.html',
		url: '../Post/post.html',
		extras: {
			type: 'TJ' //扩展参数
		},
		styles: {
			titleNView: {
				titleText: "帖子列表",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#000000", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		waiting: {
			title: '努力加载中...',
		}
	});
})
mui('ul').on('tap','.TIB', function() {
	mui.openWindow({
		id: 'post.html',
		url: '../Post/post.html',
		extras: {
			type: 'TIB' //扩展参数
		},
		styles: {
			titleNView: {
				titleText: "帖子列表",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#000000", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		waiting: {
			title: '努力加载中...',
		}
	});
})