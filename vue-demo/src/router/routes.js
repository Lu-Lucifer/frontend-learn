import { BaseLayout, RouterLayout, Common, Lazy } from './routesMap';
const routes = [
  {
    path: '/',
    component: BaseLayout,
    redirect: '/router',
    children: [
      {
        path: '/router',
        component: RouterLayout,
        redirect: '/router/common',
        meta: {
          id: '1',
          name: '路由',
          icon: 'setting',
        },
        children: [
          {
            path: '/router/common',
            component: Common,
            meta: {
              id: '1-1',
              name: '普通路由',
            },
          },
          {
            path: '/router/lazy',
            // webpack 会解析如下注释，对应输出 chunk 文件
            component: Lazy,
            meta: {
              id: '1-2',
              name: '懒加载',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
