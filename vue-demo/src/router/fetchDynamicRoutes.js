const dynamicRoutes = [
  {
    path: '/router/dynamic1',
    componentName: '/router/Dynamic1',
    name: 'dynamic1',
    meta: {
      id: '1-3',
      name: '动态路由1',
    },
    children: [],
  },
  {
    path: '/router/dynamic2',
    componentName: '/router/Dynamic2',
    name: 'dynamic2',
    meta: {
      id: '1-4',
      name: '动态加载2',
    },
    children: [],
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
