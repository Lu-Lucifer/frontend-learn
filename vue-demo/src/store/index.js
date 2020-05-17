import Vue from 'vue';
import Vuex from 'vuex';
import { sideMenus } from '../config/baseInfo';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    sideMenus: sideMenus || [],
    routes: [],
  },
  mutations: {
    generateRouter(state) {
      state.count++;
    },
    updateSideMenu(state, router) {
      for (let i = 0; i < state.sideMenus.length; i++) {
        let item = state.sideMenus[i];
        let key = item.key;
        // 简单判断下
        if (router.key.indexOf(key) !== -1) {
          item.children.push(router);
          break;
        }
      }
    },
  },
});

export default store;
