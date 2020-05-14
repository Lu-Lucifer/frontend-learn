const webcatConfig = require('../config.js');

let authConfig = {
	baseUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
	appid: webcatConfig.appid,
	redirect_uri: encodeURIComponent(webcatConfig.redirect_uri),
	response_type: 'code',
	scope: 'snsapi_base', //snsapi_userinfo
	state: '123456',
	wechat_redirect: '#wechat_redirect'
};

let authUrl = '';
for (let key in authConfig) {
	const val = `${authConfig[key]}`;
	if (key == 'baseUrl') {
		authUrl = val;
	} else if (key == 'wechat_redirect') {
		authUrl = authUrl.slice(0, authUrl.length - 1) + val;
	} else {
		authUrl = authUrl + `${key}=${val}&`;
	}
}

console.log(authUrl);
