$(function() {
	$("#regist").bind("click", function() {
		regist();
	});
})

function regist() {
	var phone_verification = /^1[3|4|5|7|8][0-9]{9}$/; //验证手机号码是否合法
	var account = $("#phone").val();
	var password = $("#password").val();
	var verificationCode = $("#verificationCode").val();
	var name = $("#name").val();
	if(!phone_verification.test(account)) {
		mui.toast("手机号码格式有误!");
		return;
	}
	if(!verificationCode) {
		mui.toast("短信验证码有误");
		return;
	}
	if(!password) {
		mui.toast("请输入密码");
		return;
	}
	if(!name) {
		mui.toast("请输入昵称");
		return;
	}
	var url=basePath + "service/user";	
	$.ajax({
		url:url,
		type: 'post',
		data:JSON.stringify({
			user:{
				name: name,
				phone: account,
				password: password	
			},
			verificationCode:verificationCode
		}),
		success: function(result) {
			if(!ajaxResultCheck(result)) return;
			mui.toast('注册成功!即将前往登录页面!');
			console.log("注册成功，去到首页，将自动跳转到登陆");
			plus.webview.getWebviewById("module/Public-Components/login.html").show();
		}
	})
}