/**
 * 路由组件映射关系
 *
 * 事先定义好基础的组件，并赋值给对应的变量，能根据后端返回的字符串匹配到对应的 component 文件
 *
 * component: routesMap['BaseLayout']
 */
import BaseLayout from '../components/BaseLayout.vue';
import RouterLayout from '../components/RouterLayout.vue';
import Common from '../pages/router/Common.vue';
const Lazy = () => import(/*webpackChunkName: "router-lazy"*/ '../pages/router/Lazy.vue');

export { BaseLayout, RouterLayout, Common, Lazy };
