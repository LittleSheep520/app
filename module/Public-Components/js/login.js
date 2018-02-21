//尝试自动登陆
if(localStorage.getItem(sessionKey) != null) {
	/*mui.openWindow({
		url: "/h5app/index.html",
	})*/
	console.log("在localStorage中找到用户，自动登陆并跳转" + JSON.parse(localStorage.getItem(sessionKey)).name);
}
$(function() {
	$("#login").bind("click", function() {
		login();
	});
})

function login() {
	var myreg=/^1[3|4|5|7|8][0-9]{9}$/;  
	var account = $("#account").val();
	var password = $("#password").val();
	var verificationCode=$("#verificationCode").val();
	if(!myreg.test(account)) {
		mui.toast("请输入有效手机号码!");
		return;
	}
	if((!password)&&(!verificationCode)) {
		mui.toast("请填入密码,或短信验证码");
		return;
	}
	console.log(password);
	console.log(verificationCode);
	var url = basePath + "service/login";
	$.ajax({
		url: url,
		type: 'post',
		data: JSON.stringify(verificationCode?{
			user:{
				phone: account
			},
			verificationCode:verificationCode
		}:{
			user:{
				phone: account,
				password:password
			}
		}),
		success: function(result) {
			if(!ajaxResultCheck(result)) return;
			plus.storage.setItem(sessionKey, JSON.stringify(result.data));
			console.log(result.data);
			var storageSessionUser=JSON.parse(plus.storage.getItem(sessionKey));
			console.log("登陆成功，去到首页，" + storageSessionUser.name);
			
			var list=plus.webview.all();
			var log="";
			for(key in list){
				console.log(JSON.stringify(list[key].id))
				log+=JSON.stringify(list[key].id);
			}
			//mui.alert(log);
		
			plus.webview.currentWebview().close(); 
			/*if(plus.webview.getWebviewById("HBuilder")==null){
				mui.alert("fuckMUI NULL");
			}else{
				plus.webview.getWebviewById("HBuilder").show();
			}*/
			//window.localStorage.getItem(sessionKey)不定时获取不到localStorage，无法执行下面语句，且下次无法自动登陆
			//应该是写localStorage.setItem存在bug 证实是因为用户信息加载时机问题
			//mui.toast("欢迎回来, "+JSON.parse(plus.storage.getItem(sessionKey)).name);
			
			console.log("登陆成功，欢迎回来，" + storageSessionUser.name);
			//plus.webview.getWebviewById("HBuilder").show();
			//plus.webview.getWebviewById("module/Personal-Center/personal-center.html").reload(true);
			/*var userCenterPage=findWebviewById("module/Personal-Center/personal-center.html");
			mui.fire(userCenterPage, 'getUserById', {
				id: storageSessionUser.id
			});*/
		}
	})
	/*var sessionUserFake = {
		"email": "4564@qq.com",
		"id": 0,
		"joinDate": "",
		"name": account,
		"phone": "",
		"sex": "",
		"token": "sessionUserFake"
	};

	window.localStorage.setItem(sessionKey, JSON.stringify(sessionUserFake));
	console.log("接口未通，假定登陆成功，去到首页，" + JSON.parse(window.localStorage.getItem(sessionKey)).name);
	mui.openWindow({
		url: "/index.html",
		createNew: true
	})*/
}