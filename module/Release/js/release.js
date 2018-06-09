mui.init();
$(function() {
	$(".various-type").hide();
	TypeSelection();
	ExpireDate()
	sendPostBtnBind();
})
var currentType = "";

function sendPostBtnBind() {
	$("#sendPostBtn").bind("click", function() {
		var loginedUser = getSessionUser();
		var post;
		if("" == currentType) {
			mui.toast("请先选择帖子分类")
			return;
		}
		if("TC" == currentType) {
			post = {
				//"admirationCount": 0,
				//"deleteFlag": "string",
				"description": $("." + currentType + " .description").val(),
				"endDate": new Date(Date.parse($("." + currentType + " .endDate").val())),
				//"id": "string",
				"images": [

				],
				//"insertDate": "2018-02-03T06:38:39.702Z",
				"kind": currentType,
				//"level": 0,
				"number": $("." + currentType + " .number").val(),
				"price": $("." + currentType + " .price").val(),
				//"rebate": 0,
				//"requestMethod": "string",
				//"species": "string",
				//"startDate": "2018-02-03T06:38:39.702Z",
				"title": $("." + currentType + " .title").val(),
				"type": currentType,
				"userId": loginedUser.id,
				//"verifiyDate": "2018-02-03T06:38:39.702Z",
				//"verifyFlag": "string"
			}
		}
		if("TIB" == currentType) {
			post = {
				//"admirationCount": 0,
				//"deleteFlag": "string",
				"description": $("." + currentType + " .description").val(),
				"endDate": new Date(Date.parse($("." + currentType + " .endDate").val())),
				//"id": "string",
				"images": [

				],
				//"insertDate": "2018-02-03T06:38:39.717Z",
				"kind": currentType,
				//"level": 0,
				"number": $("." + currentType + " .number").val(),
				"price": $("." + currentType + " .price").val(),
				//"rebate": 0,
				//"requestMethod": "string",
				//"species": "string",
				//"startDate": "2018-02-03T06:38:39.717Z",
				"title": $("." + currentType + " .title").val(),
				"type": currentType,
				"userId": loginedUser.id,
				//"verifiyDate": "2018-02-03T06:38:39.717Z",
				//"verifyFlag": "string"
			}
		}
		if("TJ" == currentType) {
			post = {
				//"admirationCount": 0,
				//"deleteFlag": "string",
				"description": $("." + currentType + " .description").val(),
				"endDate": new Date(Date.parse($("." + currentType + " .endDate").val())),
				//"id": "string",
				"images": [

				],
				//"insertDate": "2018-02-03T06:38:39.733Z",
				"kind": currentType,
				"minSalary": $("." + currentType + " .minSalary").val(),
				"number": $("." + currentType + " .number").val(),
				//"startDate": "2018-02-03T06:38:39.733Z",
				"targetSalary": $("." + currentType + " .targetSalary").val(),
				"title": $("." + currentType + " .title").val(),
				"type": currentType,
				"userId": loginedUser.id,
				//"verifiyDate": "2018-02-03T06:38:39.733Z",
				//"verifyFlag": "string"
			}
		}
		if("TOD" == currentType) {
			post = {
				//"admirationCount": 0,
				//"deleteFlag": "string",
				"description": $("." + currentType + " .description").val(),
				"endDate": new Date(Date.parse($("." + currentType + " .endDate").val())),
				//"id": "string",
				"images": [

				],
				//"insertDate": "2018-02-03T06:38:39.702Z",
				"kind": currentType,
				//"level": 0,
				"number": $("." + currentType + " .number").val(),
				"price": $("." + currentType + " .price").val(),
				//"rebate": 0,
				//"requestMethod": "string",
				//"species": "string",
				//"startDate": "2018-02-03T06:38:39.702Z",
				"title": $("." + currentType + " .title").val(),
				"type": currentType,
				"userId": loginedUser.id,
				//"verifiyDate": "2018-02-03T06:38:39.702Z",
				//"verifyFlag": "string"
			}
		}
		//处理图片

		var imgElements = $("#image-list .image-item");
		var max_size = 300;
		for(var i = 0; i < imgElements.length; i++) {
			console.log(imgElements[i].dataUrl);
			post.images.push(imgElements[i].dataUrl);
		}

		console.log(JSON.stringify(post));
		if(!post.title || post.title.length < 10) {
			mui.toast("亲，请填写长度10-40个字符的标题");
			return;
		}
		if(post.title.length > 40) {
			mui.toast("亲，标题太长啦，更多内容请填写在详细描述中");
			return;
		}
		if(!post.description || post.description.length < 10) {
			mui.toast("亲，请给点详细描述吧，最少10个字符");
			return;
		}
		if(!post.images || post.images.length < 1) {
			mui.toast("亲，无图无真相哦，请至少给一个图片吧");
			return;
		}
		if(imgElements[i]>max_size*1024){
			mui.toast('图片过大');
			return;
		}
		$.ajax({
			type: 'post',
			url: basePath + "service/cards/add/" + currentType,
			data: JSON.stringify(post),
			success: function(result) {
				if(!ajaxResultCheck(result)) return;
				location.reload();
				mui.toast("发布成功,可前往查看帖子");
				
				
			}
		});
	});
}

//商品类型选择
function TypeSelection() {
	var typePicker = new mui.PopPicker();
	typePicker.setData([{
		type: 'TC',
		value: '1',
		text: '卖商品'
	}, {
		type: "TIB",
		value: '2',
		text: '找代购'
	}, {
		type: "TJ",
		value: '3',
		text: '找兼职'
	}, {
		type: "TOD",
		value: '4',
		text: '卖闲置'
	}]);
	var showtypePickerButton = document.getElementById('sort');
	showtypePickerButton.addEventListener('tap', function(event) {
		typePicker.show(function(items) {
			$('#sort').val(items[0].text);
			currentType = items[0].type;
			$(".various-type").hide();
			$("." + currentType).show();
		});
	}, false);
}

//时间选择
function ExpireDate() {
	var btns = document.getElementsByClassName('date');
	for(var i = 0; i < btns.length; i++) {

		btns[i].addEventListener('tap', function() {
			var _self = this;
			if(_self.picker) {
				_self.picker.show(function(rs) {
					$(_self).val(rs.text);
					_self.picker.dispose();
					_self.picker = null;
				});
			} else {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');

				_self.picker = new mui.DtPicker(options);
				_self.picker.show(function(rs) {
					/*
					 * rs.value 拼合后的 value
					 * rs.text 拼合后的 text
					 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
					 * rs.m 月，用法同年
					 * rs.d 日，用法同年
					 * rs.h 时，用法同年
					 * rs.i 分（minutes 的第二个字母），用法同年
					 */
					$(_self).val(rs.text + ":00");
					/* 
					 * 返回 false 可以阻止选择框的关闭
					 * return false;
					 */
					/*
					 * 释放组件资源，释放后将将不能再操作组件
					 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
					 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
					 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
					 */
					_self.picker.dispose();
					_self.picker = null;
				});
			}

		}, false);
	}
}