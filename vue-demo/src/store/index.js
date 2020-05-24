import Vue from 'vue';
import Vuex from 'vuex';
// import { sideMenus } from '../config/baseInfo';
import routes from '../router/routes';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    menus: [],
    routes: routes || [],
    isAuth: false,
  },
  getters: {
    isNewRoutes: (state) => (routes) => {
      return routes === state.routes;
    },
  },
  mutations: {
    initMenus(state, data) {
      state.menus = [
        {
          type: '1',
          title: '路由',
          children: [],
        },
        {
          type: '2',
          title: '我的',
          children: [],
        },
      ];
      for (let router of state.routes) {
        const type = router.meta.id.split('-')[0];
        for (let item of state.menus) {
          if (item.type == type) {
            item.children.push(router);
            break;
          }
        }
      }
      console.log(state.menus);
    },
    updateAuth(state, data) {
      state.isAuth = data;
    },
    updateMenus(state, data) {
      for (let router of data) {
        const type = router.meta.id.split('-')[0];
        for (let item of state.menus) {
          if (item.type == type) {
            item.children.push(router);
            break;
          }
        }
      }
      const routes = [...state.routes, ...data];
      console.log(routes);
    },
  },
});

export default store;
