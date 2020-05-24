import Vue from 'vue';
import VueRouter from 'vue-router';
import helper from './helper';
import routes from './routes';
import fetchDynamicRoutes from './fetchDynamicRoutes';
import store from '../store';
// import Lazy from '../pages/router/Lazy.vue';

Vue.use(VueRouter);

// 路由定义

const router = new VueRouter({
  routes,
});

// 路由拦截
router.beforeEach((to, from, next) => {
  const _vue = router.app;
  const isAuth = store.state.isAuth;
  store.commit('initMenus');
  if (isAuth) {
    next();
  } else {
    fetchDynamicRoutes()
      .then((dynamicRoutes) => {
        _vue.$store.commit('updateAuth', true);
        const routes = helper.generatorRoutes(dynamicRoutes);
        _vue.$store.commit('updateMenus', routes);
        _vue.$router.addRoutes(routes);
        next();
      })
      .catch((err) => {
        // 异常，去错误页面
        console.log(err);
      });
  }
});

export default router;
