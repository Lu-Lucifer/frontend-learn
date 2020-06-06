const dynamicRoutes = [
  {
    path: '/',
    componentName: 'BaseLayout',
    redirect: '/router',
    children: [
      {
        path: '/router',
        componentName: 'RouterLayout',
        redirect: '/router/common',
        meta: {
          id: '1',
          name: '路由',
          icon: 'setting',
        },
        children: [
          {
            path: '/router/common',
            componentName: 'Common',
            meta: {
              id: '1-1',
              name: '普通路由',
            },
          },
          {
            path: '/router/lazy',
            // webpack 会解析如下注释，对应输出 chunk 文件
            componentName: 'Lazy',
            meta: {
              id: '1-2',
              name: '懒加载',
            },
          },
          {
            path: '/router/dynamic1',
            componentName: '/router/Dynamic1',
            meta: {
              id: '1-3',
              name: '动态路由1',
            },
          },
          {
            path: '/router/dynamic2',
            componentName: '/router/Dynamic2',
            meta: {
              id: '1-4',
              name: '动态加载2',
            },
          },
        ],
      },
    ],
  },
];

export default function fetchDynamicRoutes() {
  return new Promise((resolve, reject) => {
    try {
      // 模拟向后端请求获取
      setTimeout(() => {
        console.log('动态路由加载完毕');
        resolve(dynamicRoutes);
      }, 500);
    } catch (err) {
      reject(err);
    }
  });
}
