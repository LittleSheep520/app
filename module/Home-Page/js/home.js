mui.init({
	swipeBack: true //启用右滑关闭功能
});
//控制图片轮播周期
var gallery = mui('.mui-slider');
gallery.slider({
	interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
});
mui.plusReady(function() {
	var page = mui.preload({
		url: '../Post/post.html',
		id: 'post.html', //默认使用当前页面的url作为id
		styles: {}, //窗口参数
		extras: {} //自定义扩展参数
	});
})

mui('ul').on('tap', 'ul li a', function() {
	mui.openWindow({
		id: 'post.html',
		url: '../Post/post.html'
	});
})