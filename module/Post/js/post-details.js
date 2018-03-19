//添加Id自定义事件监听
var currentPostId = "no";
window.addEventListener('getPostById', function(event) {
	console.log("event");
	//获得事件参数
	var id = event.detail.id;
	//根据id向服务器请求详情
	currentPostId = id;
	//$(".mui-title").text(currentPostId);
	console.log("POST_ID:" + currentPostId);
	$("#card-content").hide();
	$("#loading").show();
	getPost(currentPostId);
});

function getPost(id) {
	var url = basePath + "service/cards" + "/" + id;
	$.ajax({
		url: url,
		type: 'get',
		//data: JSON.stringify(),
		success: function(result) {
			if(!ajaxResultCheck(result)) return;
			var post = result.data;
			console.log(JSON.stringify(post));
			//标题及其他
			$(".mui-title").text(postType[post.type].text);
			$("#title").text(post.title);
			$("#extra").text(post.insertDate);
			$("#description").text(post.description);
			$("#price").text(post.price);
			$("#number").text(post.number);
			//图片
			var imgList = $("#image-list");
			var imgIndicators = $("#images-indicator");
			console.log("图片列表长度："+post.images.length);
			$(imgList).empty();
			$(imgIndicators).empty();
			//支持循环
			if(post.images.length >= 2) {
				var imageItemDiv = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src=' + post.images[post.images.length - 1] + ' /></a></div>';
				$(imgList).append(imageItemDiv);
			}
			//插入图片列表
			for(var i = 0; i < post.images.length; i++) {
				var imageItemDiv = '<div class="mui-slider-item "><a href="#"><img src=' + post.images[i] + ' /></a></div>';
				var imageItemIndicator = '<div class="mui-indicator ' + (i == 0 ? "mui-active" : "") + '"></div>';
				$(imgList).append(imageItemDiv);
				$(imgIndicators).append(imageItemIndicator);
			}
			//支持循环
			if(post.images.length >= 2) {
				var imageItemDiv = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src=' + post.images[0] + ' /></a></div>';
				$(imgList).append(imageItemDiv);
			}
			//控制图片轮播周期
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
			});
			$("#card-content").show();
			$("#loading").hide();
		}
	})
}
/*mui.back=function(){
	mui.plus.currentWebview.close()
}*/

//Test git
