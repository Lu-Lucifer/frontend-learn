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
          icon: 'menu',
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
            componentName: '/router/Dynamic',
            meta: {
              id: '1-3',
              name: '动态路由',
            },
          },
        ],
      },
      {
        path: '/antd',
        componentName: 'RouterLayout',
        redirect: '/antd/form/grid',
        meta: {
          id: '2',
          name: 'AntDesign Vue',
          icon: 'ant-design',
        },
        children: [
          {
            path: '/antd/form/grid',
            componentName: '/antd/form/Grid',
            meta: {
              id: '2-1',
              name: '排列布局',
              group: 'form',
            },
          },
          {
            path: '/antd/form/validator',
            componentName: '/antd/form/Validator',
            meta: {
              id: '2-2',
              name: '动态校验',
              group: 'form',
            },
          },
          {
            path: '/antd/form/dynamicFormItem',
            componentName: '/antd/form/DynamicFormItem',
            meta: {
              id: '2-3',
              name: '动态表单',
              group: 'form',
            },
          },
          {
            path: '/antd/form/upload',
            componentName: '/antd/form/Upload',
            meta: {
              id: '2-4',
              name: '图片上传',
              group: 'form',
            },
          },
          {
            path: '/antd/form/fieldTool',
            componentName: '/antd/form/FieldTool',
            meta: {
              id: '2-5',
              name: '表单字段',
              group: 'form',
            },
          },
          {
            path: '/antd/form/demo',
            componentName: '/antd/form/Demo',
            meta: {
              id: '2-6',
              name: '表单DEMO',
              group: 'form',
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
