import * as routesMap from '@/router/routesMap';

/**
 * 构建页面左侧菜单
 *
 * @param {*} menus
 * @param {*} routes
 */
export function buildSideMenus(menus, routes) {
  let groups = [];
  for (const route of routes) {
    const { id, name, icon, group } = route.meta;
    let menu = {
      key: id, // 菜单唯一表示
      name, //菜单名称
      path: route.path, // 跳转地址
      icon,
      group,
    };
    if (route.children) {
      const children = buildSideMenus([], route.children);
      const groups = buildGroups(children);
      if (groups && groups.length > 0) {
        menu.groups = groups;
      } else {
        menu.children = children;
      }
    }
    menus.push(menu);
  }
  return menus;
}
function buildGroups(list) {
  let groups = [];
  for (let item of list) {
    const group = item.group;
    if (group) {
      const groupIndex = _getIndexOfGroup(groups, group);
      if (groupIndex !== -1) {
        groups[groupIndex].children.push(item);
      } else {
        groups.push({ group, children: [item] });
      }
    }
  }
  return groups;
}

function _getIndexOfGroup(list, group) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.group === group) {
      return i;
    }
  }
  return -1;
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
