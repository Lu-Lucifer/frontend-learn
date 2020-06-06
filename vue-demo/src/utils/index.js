import * as routesMap from '@/router/routesMap';

/**
 * 构建页面左侧菜单
 *
 * @param {*} menus
 * @param {*} routes
 */
export function buildSideMenus(menus, routes) {
  for (const route of routes) {
    const { id, name, icon } = route.meta;
    const menu = {
      key: id, // 菜单唯一表示
      name, //菜单名称
      path: route.path, // 跳转地址
      icon,
    };
    if (route.children) {
      menu.children = [];
      menu.children = buildSideMenus(menu.children, route.children);
    }
    menus.push(menu);
  }
  return menus;
}

/**
 * 标准化路由
 *
 * @param {*} routes
 */
export function normalizeRoutes(routes) {
  return routes.map((router) => {
    return {
      path: router.path,
      component: _parseComponent(router.componentName),
      meta: router.meta,
      children: Array.isArray(router.children) ? normalizeRoutes(router.children) : [],
    };
  });
}

/**
 * 解析路由
 *
 * 如果 routesMap[componentName] 取不到值，将动态加载打包后对应的组件文件
 * @param {*} componentName
 */
function _parseComponent(componentName) {
  return routesMap[componentName] || (() => import(/*webpackChunkName: "router-dynamic"*/ `../pages${componentName}.vue`));
}
