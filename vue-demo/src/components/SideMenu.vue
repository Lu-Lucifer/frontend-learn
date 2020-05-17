<template>
  <a-menu
    style="width: 256px"
    :open-keys.sync="openKeys"
    mode="inline"
    @click="handleClick"
  >
    <a-sub-menu v-for="item in list" :key="item.router">
      <span slot="title"
        ><a-icon type="setting" /><span>{{ item.title }}</span></span
      >
      <a-menu-item v-for="item in item.children" :key="item.key">
        {{ item.title }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      list: this.$store.state.sideMenus,
      openKeys: ['router'],
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    handleClick(e) {
      console.log('click', e);
    },
    titleClick(e) {
      console.log('titleClick', e);
    },
  },
};
</script>

<style lang="less" scoped>
</style>