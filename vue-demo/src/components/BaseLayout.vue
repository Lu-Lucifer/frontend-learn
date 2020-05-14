<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideMenu :menus="sideMenus" />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "./SideMenu";
import Header from "./Header";
// TODO: 转到 vuex bootstrap 方式来加载
import { sideMenus } from "../config/baseInfo";
export default {
  name: "BaseLayout",
  data() {
    return { sideMenus };
  },
  components: { SideMenu, Header }
};
</script>

<style lang="less" scoped>
.el-container {
  min-height: 500px;
  .el-aside {
    background-color: #fff;
    color: #333;
  }

  .el-main {
    background-color: #f2f2f2;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>