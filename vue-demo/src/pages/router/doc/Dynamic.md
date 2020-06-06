## 动态路由

即使不是 SSR 服务端渲染，SPA 也可以通过权限的控制，以动态路由的方式实现。

比如当前页面，你无法从以往约定的 router 结构中找到，路由结构将通过后端接口解析生成。

**怎么做呢？**

每次路由跳转时，通过 beforeEach 路由拦截，请求后端获取当前 user 的路由权限，并加入到 vue 的 router 结构中，形成新的路由体系：

```js
// 路由拦截
router.beforeEach((to, from, next) => {
  const _vue = router.app;
  fetchDynamicRoutes()
    .then((dynamicRoutes) => {
      // 组装新路由
      const routes = helper.generatorRoutes(dynamicRoutes);
      _vue.$router.addRoutes(routes);
      next();
    })
    .catch((err) => {});
});
```

配合 webpack 的 **Code Splitting** 机制，使这些动态路由文件懒加载得到：

```js
export function normalizeRoutes(routes) {
  return routes.map((router) => {
    return {
      path: router.path,
      component: _parseComponent(router.componentName),
      meta: router.meta,
      children: Array.isArray(router.children) ? normalizeRoutes(router.children) : [],
    };
  });
}

function _parseComponent(componentName) {
  return routesMap[componentName] || (() => import(/*webpackChunkName: "router-dynamic"*/ `../pages${componentName}.vue`));
}
```

另外，搭配 Vuex 和数据持久化方式，能使得整个权限流程更为“丝滑”。

### Tips

这样的最佳实践你可以看下 [jeecg](https://github.com/zhangdaiscott/jeecg-boot) ，或许会有不少的收获。
