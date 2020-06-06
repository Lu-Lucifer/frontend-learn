import Vue from 'vue';
import Vuex from 'vuex';
import { buildSideMenus } from '@/utils';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    permissionList: [],
    sideMenus: [],
  },
  getters: {
    sideMenus(state) {
      return state.sideMenus;
    },
    permissionList(state) {
      return state.permissionList;
    },
  },
  mutations: {
    SET_SIDE_MENUS(state, data) {
      state.sideMenus = buildSideMenus(state.sideMenus, data);
    },
    SET_PERMISSIONLIST(state, data) {
      state.permissionList = data;
    },
  },
});

export default store;
