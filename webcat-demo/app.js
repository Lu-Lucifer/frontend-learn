const Koa = require('koa');
const KoaRouter = require('koa-router');
const router = new KoaRouter();
const app = new Koa();

router.get('/wx/config', async (ctx, next) => {
	ctx.body = {
		appId: '123456', // 必填，公众号的唯一标识
		timestamp: '123456', // 必填，生成签名的时间戳
		nonceStr: '123456', // 必填，生成签名的随机串
		signature: 'abcdefg' // 必填，签名
	};
});

router.get('/wx/share', async (ctx, next) => {
	ctx.body = {
		title: '分享标题', // 分享标题
		desc: '分享描述', // 分享描述
		link: '分享链接', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: '分享图标' // 分享图标
	};
});

app.use(router.routes());

app.listen(4000);
