import Vue from 'vue';
import VueRouter from 'vue-router';
import Config from './pages/router/Config.vue';
// import Lazy from './pages/router/Lazy.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/router/config' },
  // { path: '/router/lazy', component: () => import(/*webpackChunkName: "router-lazy"*/ './pages/router/Lazy.vue') },
  { path: '/router/config', component: Config },
];

const lazyRoutes = ['Lazy'];

for (let item of lazyRoutes) {
  routes.push({ path: '/router/lazy', component: () => import(/*webpackChunkName: "router-lazy"*/ `./pages/router/${item}.vue`) });
}
const router = new VueRouter({
  routes,
});

export default router;
