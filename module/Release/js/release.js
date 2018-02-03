mui.init();
$(function() {
	TypeSelection();
	ExpireDate()
})
//商品类型选择
function TypeSelection() {
	var typePicker = new mui.PopPicker();
	typePicker.setData([{
		value: '1',
		text: '卖闲置'
	}, {
		value: '2',
		text: '逛社区'
	}, {
		value: '3',
		text: '找兼职'
	}, {
		value: '4',
		text: '找代购'
	}, {
		value: '5',
		text: '租房子'
	}]);
	var showtypePickerButton = document.getElementById('sort');
	showtypePickerButton.addEventListener('tap', function(event) {
		typePicker.show(function(items) {
			$('#sort').val(items[0].text)
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
}

//下架时间选择
function ExpireDate() {
	var btn = document.getElementById('date');
	btn.addEventListener('tap', function() {
		var _self = this;
		if(_self.picker) {
			_self.picker.show(function(rs) {
				$('#date').val(rs.text);
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
				$('#date').val(rs.text);
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