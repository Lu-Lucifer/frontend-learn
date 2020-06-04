/**
 * 需要生成的路由结构
 * [{
 *      path:'/home',
 *      component:Home,
 *      name:'home',
 *      redirect:'/user/login',
 *      meta:{
 *          name:'首页',
 *          id:'1'
 *      },
 *      children:[]
 * }]
 * @param {*} arr 后端维护的路由数据，基本具备 router 结构，但需要另外加工（比如，解析动态路由）
 */
function generatorRoutes(arr) {
  return arr.map((router) => {
    return {
      path: router.path,
      component: () => import(/*webpackChunkName: "router-dynamic"*/ `../pages${router.componentName}.vue`),
      meta: router.meta,
      children: generatorRoutes(router.children),
    };
  });
}

module.exports = {
  generatorRoutes,
};
