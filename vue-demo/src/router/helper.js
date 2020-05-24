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
 * @param {*} routesData
 */
function generatorRoutes(arr) {
  return arr.map((router) => {
    return {
      path: router.path,
      component: () => import(/*webpackChunkName: "router-dynamic"*/ `../pages/dynamic/${router.componentName}.vue`),
      meta: router.meta,
      children: generatorRoutes(router.children),
    };
  });
}

module.exports = {
  generatorRoutes,
};
