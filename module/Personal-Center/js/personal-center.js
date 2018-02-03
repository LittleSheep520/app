mui.plusReady(function() {
	//logoutEventBind();
	//initUserInfo();
	console.log("plusready");
});
window.onload = function(){
	/*logoutEventBind();
	initUserInfo();
	console.log("onload");*/
}
$(function() {
	logoutEventBind();
	initUserInfo();
	console.log("onload");
})
//注销按钮事件绑定
function logoutEventBind() {
	$("#logout").bind("click", function() {
		localStorage.removeItem("sk");
		console.log("已注销");
		plus.webview.getLaunchWebview().reload(true);
	});
}
//展示登陆用户信息
function initUserInfo() {
	var sessionUser = getSessionUser();
	if(null==sessionUser){
		$(".notLoginHide").hide();
	}else{
		$("#account").html(sessionUser.name);
		$(".loginedHide").hide();
	}
}