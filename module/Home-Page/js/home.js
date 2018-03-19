mui.init();
//控制图片轮播周期
var gallery = mui('.mui-slider');
gallery.slider({
	interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
});
mui('ul').on('tap', 'ul li a', function() {
	mui.openWindow({
		id: 'post.html',
		url: '../Post/post.html',
		styles: {
			titleNView: {
				titleText: "帖子列表",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#DC143C",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#FFFFFF", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		show: {
			aniShow: "zoom-fade-out"
		},
		waiting: {
			title: '努力加载中...',
		}
	});
})