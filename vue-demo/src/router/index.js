import Vue from 'vue';
import VueRouter from 'vue-router';
import fetchDynamicRoutes from './fetchDynamicRoutes';
import Common from '../pages/router/Common.vue';
// import Lazy from '../pages/router/Lazy.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/router/common', component: Common },
  {
    path: '/router/lazy',
    component: () => import(/*webpackChunkName: "router-lazy"*/ '../pages/router/Lazy.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const _vue = router.app;
  // 动态路由加载（权限验证）
  fetchDynamicRoutes()
    .then((dynamicRoutes) => {
      _vue.$router.addRoutes(
        dynamicRoutes.map((dynamicRoute) => {
          console.log(1);
          _vue.$store.commit('updateSideMenu', dynamicRoute);
          console.log(_vue.$store);
          const newRoute = {
            path: dynamicRoute.path,
            component: () => import(/*webpackChunkName: "router-dynamic"*/ `../pages/router/dynamic/${dynamicRoute.componentName}.vue`),
            // TODO: children 子路由问题
          };
          return newRoute;
        })
      );
      next();
    })
    .catch((err) => {
      // 异常，去错误页面
    });
});
export default router;
