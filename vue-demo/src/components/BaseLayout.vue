<template>
  <a-layout>
    <a-layout-header><Header /></a-layout-header>
    <a-layout>
      <a-layout-sider theme="light"><SideMenu /></a-layout-sider>
      <a-layout-content>
        <RouterLayout />
      </a-layout-content>
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
import SideMenu from "./SideMenu";
import Header from "./Header";
import RouterLayout from "./RouterLayout";
export default {
  name: "BaseLayout",
  data() {
    return {};
  },
  components: { Header, SideMenu, RouterLayout }
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  background-color: #fff;
}
</style>