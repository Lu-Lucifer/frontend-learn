import 'ant-design-vue/dist/antd.css';
import './style/github-markdown.css';
import './style/antd.css';
import Vue from 'vue';
import store from './store';
import router from './router';

import App from './App.vue';
// ui 组件库 element-ui
import Antd from 'ant-design-vue';

// 全局注册
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  created() {},
  render: (h) => h(App),
}).$mount('#app');
