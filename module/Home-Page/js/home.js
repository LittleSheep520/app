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
mui('ul').on('tap', '.TOD', function() {
	mui.openWindow({
		id: 'discarded_post',
		url: '../Post/discarded_post.html',
		styles: {
			titleNView: {
				titleText: "二手闲置",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#323232",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "FF0000", // 进度条颜色,默认值为"#00FF00"  
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
mui('ul').on('tap', '.TC', function() {
	mui.openWindow({
		id: 'commodity_post',
		url: '../Post/commodity_post.html',
		styles: {
			titleNView: {
				titleText: "优惠商品",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#323232",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "FF0000", // 进度条颜色,默认值为"#00FF00"  
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
mui('ul').on('tap', '.TJ', function() {
	mui.openWindow({
		id: 'job_post',
		url: '../Post/job_post.html',
		styles: {
			titleNView: {
				titleText: "工作招聘",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#323232",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "FF0000", // 进度条颜色,默认值为"#00FF00"  
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
mui('ul').on('tap', '.TIB', function() {
	mui.openWindow({
		id: 'purchase_post',
		url: '../Post/purchase_post.html',
		
		styles: {
			titleNView: {
				titleText: "全球代购",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#323232",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "FF0000", // 进度条颜色,默认值为"#00FF00"  
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