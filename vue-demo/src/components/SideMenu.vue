<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-submenu :index="item.id" v-for="(item, index) in menus" :key="index">
      <!-- 菜单名 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.title }}</span>
      </template>
      <!-- 菜单分组 -->
      <el-menu-item-group
        :index="item.id"
        v-for="(item, index) in item.groups"
        :key="index"
      >
        <template slot="title">{{ item.groupName }}</template>
        <!-- 子菜单 -->
        <el-menu-item
          :index="item.id"
          v-for="(item, index) in item.children"
          :key="index"
          >{{ item.title }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    menus: {
      default() {
        return []
      },
      type: Array
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
</style>