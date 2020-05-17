import Common from '../pages/router/Common.vue';
// import Lazy from '../pages/router/Lazy.vue';

const routes = [
	{ path: '/router/common', component: Common },
	{
		path: '/router/lazy',
		component: () =>
			import(/*webpackChunkName: "router-lazy"*/ '../pages/router/Lazy.vue')
	}
];

export default routes;
