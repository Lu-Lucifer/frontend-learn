<template>
  <a-menu :open-keys.sync="openKeys" mode="inline" @click="handleClick">
    <a-sub-menu v-for="item in list" :key="item.type">
      <span slot="title"
        ><a-icon type="setting" /><span>{{ item.title }}</span></span
      >
      <a-menu-item v-for="item in item.children" :key="item.path">
        {{ item.meta.name }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      list: this.$store.state.menus,
      openKeys: ['1'],
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    handleClick(e) {
      this.$router.push(e.key)
    },
    titleClick(e) {
      console.log('titleClick', e);
    },
  },
};
</script>

<style lang="less" scoped>
</style>