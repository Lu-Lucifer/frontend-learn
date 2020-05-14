# 微信开发

## 配置文件 config/webcatConfig.js

```js
module.exports = {
	appid: '公众号 appid',
	redirect_uri: 'http://授权域名'
};
```

## 授权地址

```
node ./helper/authUrl.js
```

## 微信 JS-SDK 工具方法

前端调用示例

```
npm run dev
```

后端服务，暂时提供 mock 数据

```
npm run serve
```
