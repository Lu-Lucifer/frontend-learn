## 动态路由

即使不是 SSR 服务端渲染，SPA 也可以通过权限的控制，做动态路由展示。

比如当前页面，你无法从约定的 router 结构中找到，因为它通过后端接口返回的路由数据，请求对应的 component 组件文件渲染得到。

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

再结合 webpack 的 **Code Splitting** 机制，使这些动态路由文件懒加载得到：

```js
function generatorRoutes(arr) {
  return arr.map((router) => {
    return {
      path: router.path,
      component: () => import(/*webpackChunkName: "router-dynamic"*/ `../pages${router.componentName}.vue`),
      meta: router.meta,
      children: generatorRoutes(router.children),
    };
  });
}
```

另外，结合 Vuex 和数据持久化方式，减少向后端的多次请求。

### Tips

这样的最佳实践你可以看下 [jeecg](https://github.com/zhangdaiscott/jeecg-boot) ，或许会有不少的收获。
