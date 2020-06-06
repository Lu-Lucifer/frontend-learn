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
