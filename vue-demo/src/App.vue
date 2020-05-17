<template>
  <BaseLayout />
</template>

<script>
import BaseLayout from './components/BaseLayout.vue'

export default {
  name: 'App',
  components: {
    // 组件局部注册
    BaseLayout
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  padding: 0 !important;
}
.el-submenu__title {
  text-align: left;
}
.el-menu .el-menu--inline {
  text-align: left;
}
</style>
