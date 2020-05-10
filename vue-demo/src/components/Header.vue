<template>
  <el-menu class="header-wrap" mode="horizontal">
    <el-menu-item index="1">简介</el-menu-item>
    <el-menu-item index="1">TodoList</el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>


<style lang="less" scoped>
.header-wrap {
  background: rgb(64, 158, 255);
  .el-menu-item {
    color: #fff;
  }
  display: flex;
  justify-content: center;
}
</style>