import Vue from 'vue';
import store from './store';
import router from './router';

import App from './App.vue';
// ui 组件库 element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 全局注册
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	created() {
		// 获取动态路由
		// 添加到路由列表中

		this.$store.commit('updateSideMenu', this.$router.options.routes);
		// 动态路由
		const dynamicRoutes = [
			{
				path: '/router/dynamic',
				componentName: 'Dynamic'
			},
			{
				path: '/router/dynamic2',
				componentName: 'Dynamic2'
			}
		];
		this.$router.addRoutes(
			dynamicRoutes.map(dynamicRoute => {
				const newRoute = {
					path: dynamicRoute.path,
					component: () =>
						import(
							/*webpackChunkName: "router-dynamic"*/ `./pages/router/dynamic/${dynamicRoute.componentName}.vue`
						)
				};
				this.$store.commit('updateSideMenu', newRoute);
				return newRoute;
			})
		);
		console.log(this.$store.state.routes);
	},
	render: h => h(App)
}).$mount('#app');
