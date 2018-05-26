//我的消息
document.getElementById('myMessage').addEventListener('tap', function() {
	mui.openWindow({
		url: 'myMessage.html',
		id: 'myMessage.html',
		styles: {
			titleNView: {
				titleText: "我的消息",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#FFFFFF", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		show: {
			aniShow: "slide-in-right"
		},
		waiting: {
			title: '努力加载中...',
		}
	})
})
//我的帖子
document.getElementById('myPost').addEventListener('tap', function() {
	mui.openWindow({
		url: 'myPost.html',
		id: 'myPost.html',
		styles: {
			titleNView: {
				titleText: "我的帖子",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#FFFFFF", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		show: {
			aniShow: "slide-in-right"
		},
		waiting: {
			title: '努力加载中...',
		}
	})
})
//我的收藏
document.getElementById('myCollection').addEventListener('tap', function() {
	mui.openWindow({
		url: 'MyCollection.html',
		id: 'MyCollection.html',
		styles: {
			titleNView: {
				titleText: "我的收藏",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#FFFFFF", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		show: {
			aniShow: "slide-in-right"
		},
		waiting: {
			title: '努力加载中...',
		}
	})
})
//个人详情
document.getElementById('personalData').addEventListener('tap', function() {
	mui.openWindow({
		url: 'personalDetails.html',
		id: 'personalDetails.html',
		preload: true,
		styles: {
			titleNView: {
				titleText: "我的信息",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#FFFFFF", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		show: {
			aniShow: "slide-in-right"
		},
		waiting: {
			title: '努力加载中...',
		}
	})
})
//密码修改
document.getElementById('changePassword').addEventListener('tap', function() {
	mui.openWindow({
		url: 'changePassword.html',
		id: 'changePassword.html',
		preload: true,
		styles: {
			titleNView: {
				titleText: "修改密码",
				titleColor: "#FFFFFF",
				titleSize: "17px",
				backgroundColor: "#FF5252",
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#FFFFFF", // 进度条颜色,默认值为"#00FF00"  
					height: "1px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		},
		show: {
			aniShow: "slide-in-right"
		},
		waiting: {
			title: '努力加载中...',
		}
	})
})