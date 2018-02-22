mui.plusReady(function() {
	//页面被展示时加载用户信息
	var self = plus.webview.currentWebview();
	self.addEventListener('show', function() {
		initUserInfo();
		logoutEventBind();
	});
});
$(function() {
	//页面加载完成时加载用户信息，用于自动登陆时候，可提前加载，非必要
	mui.plusReady(function() {
		logoutEventBind();
		initUserInfo();
		console.log("onload");
	});
})
//注销按钮事件绑定
function logoutEventBind() {
	$("#logout").bind("click", function() {
		plus.storage.removeItem("sk");
		console.log("已注销");
		plus.webview.getLaunchWebview().reload(true);
	});
}
//获取用户信息
function initUserInfo() {
	var sessionUser = getSessionUser();
	if(null == sessionUser) {
		$(".notLoginHide").hide();
		$(".loginedHide").show();
	} else {
		//此为存于localstorage的登陆用户id可以用于请求其他数据
		console.log("USER_ID:" + sessionUser.id);
		var url = basePath + "service/user" + "/" + sessionUser.id;
		$.ajax({
			url: url,
			type: 'get',
			//data: JSON.stringify(),
			success: function(result) {
				if(!ajaxResultCheck(result)) return;
				var user = result.data;
				console.log(JSON.stringify(user));
				if(null == user) {
					mui.alert("系统不存在用户"+id);
				} else {
					$("#account").html(sessionUser.name);
					$(".notLoginHide").show();
					$(".loginedHide").hide();
				}
			}
		});
	
	}
}

/*window.addEventListener('getUserById', function(event) {
	var id = event.detail.id;

});*/