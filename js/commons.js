// 所有页面需引入的公共js，提供一些公共函数，务必在引入jQuery之后引入

// 增强了jQuery的ajax以支持后台的授权认证

// 无需登陆的页面，请在该数组配置
var ignorePath = new Array(
	"login.html",
	"iphon-login.html",
	"register.html",
	"forget-password.html",
	"module/Public-Components/login.html",
	"module/Public-Components/iphon-login.html",
	"module/Public-Components/register.html",
	"module/Public-Components/forget-password.html"
);
var basePath = "https://iyatou.vip/";
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
String.prototype.format = String.prototype.f = function() {
	var s = this,
		i = arguments.length;

	while(i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};
//Todo 测试
var StringUtil = {
	format: function() {
		var s = arguments[0],
			i = arguments.length;
		while(i-- > 0) {
			s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
		}
		return s;
	}
}
mui.plusReady(function() {
	if(ignorePath.contains(plus.webview.currentWebview().id)) {
		console.log("免登陆页面：" + plus.webview.currentWebview().id);
	} else {
		//调试
		//console.log("调试所有页面免登陆" + plus.webview.currentWebview().id);
		//return;
		if(plus.storage.getItem(sessionKey) == null) {
			if("forget-password.html" == plus.webview.currentWebview().id) {
				return;
			}
			console.log(plus.webview.currentWebview().id + "未找到登陆用户信息，去到登陆页面" + plus.storage.getItem(sessionKey));
			if(plus.webview.getWebviewById("module/Public-Components/login.html") == null) {
				mui.openWindow({
					url: "/module/Public-Components/login.html",
					id: "module/Public-Components/login.html",
					createNew: true
				})
			} else {
				plus.webview.getWebviewById("module/Public-Components/login.html").show();
			}

		} else {
			console.log("自动登陆：" + JSON.parse(plus.storage.getItem(sessionKey)).name + "token：" + plus.storage.getItem(sessionKey));
		}

	}
	var self = plus.webview.currentWebview();
	self.addEventListener('show', function() {
		$.ajaxSetup({
			contentType: "application/json; charset=utf-8",
			//dataType:"JSON",
			headers: {
				token: null == plus.storage.getItem(sessionKey) ? "null" : getSessionUser().token
			},
			/*beforeSend: function (jqXHR, settings) {
			    var verificationToken = 'some encrypted string';
			    jqXHR.setRequestHeader('Content-Type', 'application/json;charset=utf-8');  
			}*/
		});
	});
	$.ajaxSetup({
		contentType: "application/json; charset=utf-8",
		//dataType:"JSON",
		headers: {
			token: null == plus.storage.getItem(sessionKey) ? "null" : getSessionUser().token
		},
		/*beforeSend: function (jqXHR, settings) {
		    var verificationToken = 'some encrypted string';
		    jqXHR.setRequestHeader('Content-Type', 'application/json;charset=utf-8');  
		}*/
	});
});

//获取当前登陆的用户的公共函数
function getSessionUser() {
	var user = JSON.parse(plus.storage.getItem(sessionKey));
	//var user = JSON.parse(localStorage.getItem(sessionKey));
	//调试
	/*var user = {
		"id": "61df7b55-ef78-47c6-8059-feb7fea29f75",
		"token": "ffO7G7nZGmEoSvojOHJWBA==",
		"name": "xiaofeiyang",
		"password": "ZBISHLstwsueRgz+5wRr4g==",
		"email": "xiaofeiyang@love.com",
		"phone": "18524479929",
		"sex": null,
		"joinDate": 1515831816000
	}*/
	return user;
}

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

function ajaxResultCheck(result) {
	if(result.result != "success") {
		mui.toast(result.resultCode.resultCode + " " + result.data);
		return false;
	}
	return true;
}
//mui getViewById找不到缓存的webview，所以增加该方法
function findWebviewById(id) {
	var log = "";
	var list = plus.webview.all();
	for(key in list) {
		console.log(JSON.stringify(list[key].id));
		if(list[key] && list[key].id && list[key].id.indexOf(id) > -1) {
			console.log(list[key].id);
			return list[key];
		}
	}
	console.log("没找到所需页面" + id);
}
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