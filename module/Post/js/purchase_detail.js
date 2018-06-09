mui.init();

function getDefaultData() {
	return {
		cover: [],
		title: '',
		type: '',
		time: '',
		description: '',
		covers: [],
		price: '',
		userName: ''

	}

}

var vm = new Vue({
	el: '.mui-content',
	data: getDefaultData(),
	methods: {
		resetData: function() { //重置数据
			Object.assign(this.$data, getDefaultData());
		}
	}
});

//监听自定义事件，获取详情
document.addEventListener('get_detail', function(event) {
	var guid = event.detail.guid;
	var userId = event.detail.userId;
	if(!guid) {
		return;
	}
	//前页传入的数据，直接渲染，无需等待ajax请求详情后
	vm.cover = event.detail.cover;
	vm.title = event.detail.title;
	vm.type = event.detail.type;
	vm.covers = event.detail.covers;
	vm.time = event.detail.time;
	vm.description = event.detail.description;
	vm.price = event.detail.price;
	var url = basePath + "service/user" + "/" + userId;
	$.ajax({
		url: url,
		type: 'get',
		//data: JSON.stringify(),
		success: function(result) {
			if(!ajaxResultCheck(result)) return;
			var user = result.data;
			vm.userName = user.name;
		}
	});
});

//重写返回逻辑
mui.back = function() {
	plus.webview.currentWebview().hide("auto", 300);
}

//窗口隐藏时，重置页面数据
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	self.addEventListener("hide", function(e) {
		window.scrollTo(0, 0);
		vm.resetData();
	}, false);

})