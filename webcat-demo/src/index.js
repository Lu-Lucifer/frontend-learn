import WxSdkTool from './wxSdkTool';

const wxInstance = new WxSdkTool();

wxInstance
	.onReady(() => {
		// 获取分享内容
		wxInstance
			.getShare()
			.then(({ title, desc, link, imgUrl }) => {
				// 初始化分享组件
				wxInstance.wx.updateAppMessageShareData({
					title,
					desc,
					link,
					imgUrl,
					success: function() {
						// 设置成功
					}
				});
				wxInstance.wx.updateTimelineShareData({
					title,
					link,
					imgUrl,
					success: function() {
						// 设置成功
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
	})
	.then(data => {
		console.log('微信加载成功');
	})
	.catch(err => {
		console.log('微信加载错误', err.message);
	});
