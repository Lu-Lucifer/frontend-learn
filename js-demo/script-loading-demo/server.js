const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const app = new Koa();

// 静态资源加载
function lazyLoadScript(path, time = 3000) {
  return new Promise((resolve, reject) => {
    try {
      if (/\/js\/test\d+\.js/.test(path)) {
        console.log(`拦截 ${path}，${time} 秒后返回`);
        setTimeout(() => {
          console.log(`响应 ${path}`);
          resolve(true);
        }, time);
      } else if (/\/img.png/.test(path)) {
        setTimeout(() => {
          resolve(true);
        }, 10 * 1000);
      } else {
        resolve(true);
      }
    } catch (err) {
      reject(err);
    }
  });
}

function setTime(path) {
  if (path == '/js/test1.js') {
    return 3 * 1000;
  } else if (path == '/js/test2.js') {
    return 2000;
  } else {
    return 1000;
  }
}

app.use(async (ctx, next) => {
  // await lazyLoadScript(ctx.path);
  await lazyLoadScript(ctx.path, setTime(ctx.path));
  await static(path.join(__dirname, 'public'))(ctx, next);
});

app.listen(3000);

console.log('server is started', 'http://127.0.0.1:3000');
