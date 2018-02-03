mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			callback: pulldownRefresh
		},
		up: {
			auto: true,
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});


var count = 0;

function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		var newCount = cells.length > 0 ? 2 : 5; //首次加载20条，满屏
		for(var i = cells.length, len = i + newCount; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell mui-media';
			li.innerHTML = '<li><a class="mui-navigate-right"><img class="mui-media-object mui-pull-left" src="img/cbd.jpg"><div class="mui-media-body">CBD<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p></div></a></li>';
			table.appendChild(li);
		}
		
	}, 1500);
}

function addData() {
	var table = document.body.querySelector('.mui-table-view');
	var cells = document.body.querySelectorAll('.mui-table-view-cell');
	for(var i = cells.length, len = i + 5; i < len; i++) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media';
		li.innerHTML = '<li><a class="mui-navigate-right"><img class="mui-media-object mui-pull-left" src="img/cbd.jpg"><div class="mui-media-body">CBD<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p></div></a></li>';
		//下拉刷新，新纪录插到最前面；
		table.insertBefore(li, table.firstChild);
	}
}
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		addData();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		mui.toast("为你推荐了5篇文章");
	}, 1500);
}
mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
////获取id
//var id = this.getAttribute("id");
////传值给详情页面，通知加载新数据
//mui.fire(detail,'getDetail',{id:id});
  //打开新闻详情
  mui.openWindow({
    id:'post-details',
    url:'post-details.html'
  });
})
