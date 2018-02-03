// 所有页面需引入的公共js，提供一些公共函数，务必在引入jQuery之后引入

// 增强了jQuery的ajax以支持后台的授权认证

// 无需登陆的页面，请在该数组配置
var ignorePath = new Array(
	"login.html",
	"iphon-login.html",
	"register.html",
	"module/Public-Components/login.html",
	"module/Public-Components/iphon-login.html",
	"module/Public-Components/register.html"
);
var basePath="https://iyatou.vip/";
var sessionKey = "sk";

Array.prototype.contains = function(obj) {
	var i = this.length;
	while(i--) {
		if(this[i] === obj) {
			return true;
		}
	}
	return false;
}
String.prototype.format = String.prototype.f = function () {  
    var s = this,  
        i = arguments.length;  
  
    while (i--) {  
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);  
    }  
    return s;  
};
//Todo 测试
var StringUtil={
	format:function(){
			var s = arguments[0],
			i = arguments.length;
		    while (i-->0) {  
        		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);  
    		}  
    		return s; 
	}
}
mui.plusReady(function() {
	if(ignorePath.contains(plus.webview.currentWebview().id)) {
		console.log("免登陆页面：" + plus.webview.currentWebview().id);
	} else {
		if(window.localStorage.getItem(sessionKey) == null) {
			console.log(plus.webview.currentWebview().id+"未找到登陆用户信息，去到登陆页面" + window.localStorage.getItem(sessionKey));
			mui.openWindow({
				url: "/module/Public-Components/login.html",
				id:"module/Public-Components/login.html",
				createNew:true
			})
		} else {
			console.log("自动登陆：" + JSON.parse(window.localStorage.getItem(sessionKey)).name+"token："+window.localStorage.getItem(sessionKey));
		}

	}
});

//获取当前登陆的用户的公共函数
function getSessionUser() {
	return JSON.parse(localStorage.getItem(sessionKey));
}

$.ajaxSetup({
	contentType: "application/json; charset=utf-8",
	//dataType:"JSON",
	headers: {
		token: null == localStorage.getItem(sessionKey) ? "null" : JSON.parse(localStorage.getItem(sessionKey)).token
	},
    /*beforeSend: function (jqXHR, settings) {
        var verificationToken = 'some encrypted string';
        jqXHR.setRequestHeader('Content-Type', 'application/json;charset=utf-8');  
    }*/
});

//禁止返回到上层页面的公共函数，在需要的禁用返回的页面调用mui.back = disableBack;即可
function disableBack() {
	//处理逻辑：2秒内，连续两次按返回键，则退出应用  
	var first = null;
	plus.key.addEventListener('backbutton', function() {
		//首次按键，提示‘再按一次退出应用’  
		if(!first) {
			first = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function() {
				first = null;
			}, 2000);
		} else {
			if(new Date().getTime() - first < 2000) {
				plus.runtime.quit();
			}
		}
	}, false);
}

function ajaxResultCheck(result){
	if(result.result!="success"){
		mui.alert(result.resultCode.resultCode+" "+result.data);
		return false;
	}
	return true;
}
