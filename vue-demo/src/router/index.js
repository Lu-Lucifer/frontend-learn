import Vue from 'vue';
import VueRouter from 'vue-router';
import { normalizeRoutes } from '@/utils';
import routes from './routes';
import fetchDynamicRoutes from './fetchDynamicRoutes';
import store from '../store';

Vue.use(VueRouter);

// 路由定义
const router = new VueRouter({
  routes,
});

// 路由拦截
router.beforeEach((to, from, next) => {
  const _vue = router.app;
  // 获取权限路由
  if (store.getters.permissionList.length === 0) {
    fetchDynamicRoutes()
      .then((dynamicRoutes) => {
        const newRoutes = normalizeRoutes(dynamicRoutes);
        _vue.$router.addRoutes(newRoutes);
        store.commit('SET_PERMISSIONLIST', newRoutes);
        store.commit('SET_SIDE_MENUS', newRoutes[0].children);
        next(to.path);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});

export default router;
