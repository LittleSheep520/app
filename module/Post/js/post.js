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
mui.plusReady(function() {
	mui.preload({
		id: 'module/Post/post-details.html',
		url: 'post-details.html'
	});
})

$(function() {
	//getPostListAndAddToTable();
});
/**
 * 每批次抓取帖子列表，在页面缓存的每次显示5条显示完毕之后更新为下一批
 */
var postList = "";
var page = 0; /*页码批次*/
var pageSize = 7; /*每批次抓取数量*/
//上拉刷新添加数据
function getPostListAndAddToTable(vender) {
	page++;
	var url = basePath + "service/cards";
	var cardPageRequestParam = {
		"page": page,
		"pageSize": pageSize
	}
	console.log(JSON.stringify(cardPageRequestParam));
	$.ajax({
		url: url,
		type: 'post',
		data: JSON.stringify(cardPageRequestParam),
		success: function(result) {
			if(!ajaxResultCheck(result)) return;
			postList = result.data.objects;
			vender();
		}
	})
};
var count = 0;
//上拉刷新渲染
function vender() {
	//setTimeout(function() {
	mui('#pullrefresh').pullRefresh().endPullupToRefresh((postList.length <= 0)); //参数为true代表没有更多数据了。
	var table = document.body.querySelector('.mui-table-view');
	var postType = {
		TC: {
			type: 'TC',
			text: '卖商品'
		},
		TIB: {
			type: "TIB",
			text: '找代购'
		},
		TJ: {
			type: "TJ",
			text: '找兼职'
		},
		TOD: {
			type: "TOD",
			text: '卖闲置'
		}
	};
	for(var i = 0; i < postList.length; i++) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media';
		li.innerHTML = '<li id=' + postList[i].id + '>' + '<p hidden="hidden">' + postList[i].id + '</p><a class="mui-navigate-right"><img class="mui-media-object mui-pull-left" src='+postList[i].images[0]+'><div class="mui-media-body">' +
		postList[i].title + '<p class="mui-ellipsis"><a style="font-size:100%;opacity:0.3;">[' + postType[postList[i].type].text + ']</a>' +postList[i].description + '</p></div></a></li>';
		table.appendChild(li);
	}
	//}, 1500);
}
//上拉刷新
function pullupRefresh() {
	console.log("pullupRefresh");
	getPostListAndAddToTable(vender);
}
//下拉刷新添加数据（插入新数据）
function _addData() {
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
//下拉从新初始化数据（刷新所有）
function reloadData() {
	page=0;
	var table = document.body.querySelector('.mui-table-view');
	$(table).empty();
	pullupRefresh();
}
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		//addData();
		reloadData();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		//mui.toast("列表刷新");
	}, 1500);
}

var detailPage = null;
mui(".mui-table-view").on('tap', '.mui-table-view-cell', function() {
	var id = this.children[0].getAttribute('id');
	//获得详情页面
	if(!detailPage) {
		//detailPage = plus.webview.getWebviewById('module/Post/post-details.html');
		detailPage = findWebviewById('module/Post/post-details.html');
	}
	//触发详情页面的getPostById事件
	mui.fire(detailPage, 'getPostById', {
		id: id
	});
	detailPage.show();
})