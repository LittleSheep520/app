//添加newId自定义事件监听
var currentPostId="no";
window.addEventListener('getPostById',function(event){
	console.log("event");
  //获得事件参数
  var id = event.detail.id;
  //根据id向服务器请求新闻详情
  currentPostId=id;
  $(".mui-title").text(currentPostId);
  console.log(currentPostId);
});
/*mui.back=function(){
	mui.plus.currentWebview.close()
}*/
//Test git
