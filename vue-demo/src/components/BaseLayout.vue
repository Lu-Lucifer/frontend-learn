<template>
  <a-layout>
    <a-layout-header><Header /></a-layout-header>
    <a-layout>
      <a-layout-sider><SideMenu /></a-layout-sider>
      <a-layout-content><router-view></router-view></a-layout-content>
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
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
  components: { Header, SideMenu }
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  background-color: #fff;
}
</style>