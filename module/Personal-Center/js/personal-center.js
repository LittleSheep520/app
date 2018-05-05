mui.plusReady(function() {
	//页面被展示时加载用户信息
	var self = plus.webview.currentWebview();
	self.addEventListener('show', function() {
		initUserInfo();
		logoutEventBind();
	});
});
$(function() {
	$("#changeInfo").bind("click", function() {
		changeUserInfo();
	});
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
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds() // 毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
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
					mui.alert("系统不存在用户" + id);
				} else {
					$("#account").html(user.name);
					$(".notLoginHide").show();
					$(".loginedHide").hide();
					$('#name').val(user.name);
					$('#sex').val(user.sex);
					$('#phone').val(user.phone);
					$('#email').val(user.email);
					$('#account').val(user.phone);
				}
			}
		});

	}
}
//修改用户信息
function changeUserInfo() {
	var sessionUser = getSessionUser();
	var id = sessionUser.id;
	var name = $('#name').val();
	var sex = $('#sex').val();
	var email = $('#email').val();
	var url = basePath + "service/user/changeInfo";
	$.ajax({
		type: "post",
		url: url,
		data: JSON.stringify({
			id: id,
			name: name,
			sex: sex,
			email: email
		}),
		success: function(result) {
			if(!ajaxResultCheck(result)) return;
			mui.toast("更新成功");
			location.reload();
			initUserInfo();
		}
	});
}

/*window.addEventListener('getUserById', function(event) {
	var id = event.detail.id;

});*/