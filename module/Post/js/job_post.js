var webview_detail = null; //详情页webview
var titleNView = { //详情页原生导航配置
	backgroundColor: '#323232', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#FFFFFF', //文字颜色
	autoBackButton: true, //自动绘制返回箭头
}

//mui初始化，配置下拉刷新
mui.init({
	pullRefresh: {
		container: '#list',
		down: {
			style: 'circle',
			color: '#323232',
			offset: '0px',
			auto: false,
			callback: pulldownRefresh
		},
		up: {
			auto: true,
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});

var postList = "";
var page = 0;
var pageSize = 7;
var type = 'TJ';
//Ajax获取数据列表
function getPostList(vender) {
	page++;
	var url = basePath + "service/cards";
	var cardPageRequestParam = {
		"page": page,
		"pageSize": pageSize,
		"type": type
	}
	$.ajax({
		url: url,
		type: "post",
		data: JSON.stringify(cardPageRequestParam),
		success: function(result) {
			if(!ajaxResultCheck(result)) return;
			postList = result.data.objects;
			vender();

		}
	});
}

function vender() {
	mui('#list').pullRefresh().endPullupToRefresh((postList.length <= 0));
	if(postList.length <= 0) {
		setTimeout(function() {
			mui('#list').pullRefresh().disablePullupToRefresh();
		}, 1500);

	} else {
		mui('#list').pullRefresh().enablePullupToRefresh();
	}
	news.items = convert(postList).concat(news.items);
}

function pullupRefresh() {
	getPostList(vender);
}

function reloadData() {
	page = 0;
	var table = document.body.querySelector('.mui-table-view');
	$(table).empty();
	pullupRefresh();
}

function pulldownRefresh() {
	setTimeout(function() {
		reloadData();
		mui('#list').pullRefresh().endPulldownToRefresh();
		mui.toast("已是最新信息");
		mui('#list').pullRefresh().enablePullupToRefresh(); //再次下拉刷新时，启动上拉加载
	}, 1500);
}

mui.plusReady(function() {
	webview_detail = mui.preload({
		url: 'job_detail.html',
		id: 'job_detail',
		styles: {
			"render": "always",
			"popGesture": "hide",
			"bounce": "vertical",
			"bounceBackground": "#efeff4",
			"titleNView": titleNView
		}
	});
});

var news = new Vue({
	el: '#news',
	data: {
		banner: {}, //顶部banner数据
		items: [] //列表信息流数据
	}

});

/**
 * 打开新闻详情
 * 
 * @param {Object} item 当前点击的新闻对象
 */
function open_detail(item) {
	//触发子窗口变更新闻详情
	mui.fire(webview_detail, 'get_detail', {
		guid: item.guid,
		userId: item.userId,
		title: item.title,
		type: item.type,
		time: item.time,
		cover: item.cover,
		covers: item.covers,
		description: item.description,
		price: item.price
	});
	//更改详情页原生导航条信息
	titleNView.titleText = item.title;
	webview_detail.setStyle({
		"titleNView": titleNView
	});
	setTimeout(function() {
		webview_detail.show("slide-in-right", 300);
	}, 150);
}

/**
 * 1、将服务端返回数据，转换成前端需要的格式
 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
 * 
 * @param {Array} items 
 */
function convert(items) {
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
	var newItems = [];
	items.forEach(function(item) {
		newItems.push({
			guid: item.id,
			userId: item.userId,
			title: item.title,
			type: postType[item.type].text,
			cover: item.images,
			covers: item.images[0],
			time: item.verifiyDate,
			description: item.description,
			number: item.number,
			minSalary: item.minSalary,
			targetSalary: item.targetSalary
		});
	});
	return newItems;

}

/**
 * 格式化时间的辅助类，将一个时间转换成x小时前、y天前等
 */
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		mui.each(this.UNITS, function(unit, value) {
			if(milliseconds >= value) {
				humanize = Math.floor(milliseconds / value) + unit + '前';
				return false;
			}
			return true;
		});
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if(diff < this.UNITS['天']) {
			return this.humanize(diff);
		}

		var _format = function(number) {
			return(number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};