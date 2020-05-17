const dynamicRoutes = [
  { key: 'router-dynamic1', path: '/router/dynamic', componentName: 'Dynamic', title: '动态加载1' },
  { key: 'router-dynamic2', path: '/router/dynamic2', componentName: 'Dynamic2', title: '动态加载2' },
];

export default function fetchDynamicRoutes() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        console.log('动态路由加载完毕');
        resolve(dynamicRoutes);
      }, 500);
    } catch (err) {
      reject(err);
    }
  });
}
