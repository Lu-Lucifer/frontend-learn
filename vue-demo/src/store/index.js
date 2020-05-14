import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		sideMenus: [],
		routes: []
	},
	mutations: {
		generateRouter(state) {
			state.count++;
		},
		updateSideMenu(state, routes) {
			if (Array.isArray(routes)) {
				state.routes = [...state.routes, ...routes];
			} else {
				state.routes.push(routes);
			}
		}
	}
});

export default store;
