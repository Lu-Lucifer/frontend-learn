import axios from './axios';

axios.interceptors.response.use(
	function(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function(error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

function WxSdkTool() {
	this.wx = null;
	this.config = {};
	this.api = {
		getConfig: '/wx/config',
		getShare: '/wx/share'
	};
}
// 初始化微信
WxSdkTool.prototype.onReady = function(cb) {
	let self = this;
	return new Promise((resolve, reject) => {
		this.loadWx().then(data => {
			this.wx = data;
			this.initConfig().then(({ appId, timestamp, nonceStr, signature }) => {
				this.wx.config({
					// debug: true,
					appId,
					timestamp,
					nonceStr,
					signature,
					jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
				});
				this.wx.ready(function() {
					cb && cb();
					resolve(true);
				});
				this.wx.error(function(res) {
					// ready 触发，此处不会打印
					console.log(res.errMsg);
				});
			});
		});
	});
};

// 通过动态 script 标签获取微信 js
WxSdkTool.prototype.loadWx = function() {
	return new Promise((resolve, reject) => {
		if (!window.wx) {
			var wxScriptDom = document.createElement('script');
			var protocol = window.location.protocol;
			wxScriptDom.src = `${protocol}//res.wx.qq.com/open/js/jweixin-1.6.0.js`;
			var popScriptDom = document.getElementsByTagName('script')[0];
			popScriptDom.parentNode.insertBefore(wxScriptDom, popScriptDom);
			const self = this;
			wxScriptDom.onload = function() {
				resolve(window.wx);
			};
		} else {
			resolve(window.wx);
		}
	});
};

// 获取微信 SDK 初始化参数
WxSdkTool.prototype.initConfig = function() {
	return axios.get(this.api.getConfig);
};

// 获取微信分享内容
WxSdkTool.prototype.getShare = function() {
	return axios.get(this.api.getShare);
};

export default WxSdkTool;
// wx.config({
// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
// 	appId: 'wx51b083fec34fedb8', // 必填，公众号的唯一标识
// 	timestamp: '', // 必填，生成签名的时间戳
// 	nonceStr: '', // 必填，生成签名的随机串
// 	signature: '', // 必填，签名
// 	jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
// });

// wx.ready(function() {
// 	// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
// 	wx.updateAppMessageShareData({
// 		title: '', // 分享标题
// 		desc: '', // 分享描述
// 		link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
// 		imgUrl: '', // 分享图标
// 		success: function() {
// 			// 设置成功
// 		}
// 	});
// 	wx.updateTimelineShareData({
// 		title: '', // 分享标题
// 		link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
// 		imgUrl: '', // 分享图标
// 		success: function() {
// 			// 设置成功
// 		}
// 	});
// });
// wx.error(function(res) {
// 	console.log(res);
// 	// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
// });
