<template>
  <el-menu
    default-active="0"
    class="el-menu-vertical-demo"
    :default-openeds="['/router']"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-submenu :key="index" :index="item.id" v-for="(item, index) in menus">
      <!-- 菜单名 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.title }}</span>
      </template>
      <!-- 菜单分组 -->
      <el-menu-item-group :index="item.id" v-for="(item, index) in item.groups" :key="index">
        <template slot="title">{{ item.groupName }}</template>
        <!-- 子菜单 -->
        <el-menu-item
          :index="item.id"
          v-for="(item, index) in item.children"
          :key="index"
        >{{ item.title }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    menus: {
      default() {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      openKeys: [0]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
</style>