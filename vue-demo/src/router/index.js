import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './config';

Vue.use(VueRouter);

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	// ...
	console.log(Vue.prototype);
	next();
});
export default router;
