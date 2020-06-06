<template>
  <a-menu
    :open-keys.sync="openKeys"
    mode="inline"
    theme="light"
    :defaultSelectedKeys="defaultSelectedKeys"
    :selectedKeys="selectedKeys"
    @click="handleClick"
    @select="handleSelect"
  >
    <a-sub-menu v-for="item in list" :key="item.key">
      <span slot="title"
        ><a-icon :type="item.icon" /><span>{{ item.name }}</span></span
      >
      <a-menu-item v-for="item in item.children" :key="item.key">
        {{ item.name }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      list: this.$store.getters.sideMenus,
      openKeys: ['1'],
      currentKey: this.$route.meta.id,
      selectedKeys: [this.$route.meta.id],
      defaultSelectedKeys: [this.$route.meta.id]
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    handleClick({ key }) {
      if (key !== this.currentKey) {
        this.currentKey = key
        console.log(this.findRoutePath(key))
        this.$router.push(this.findRoutePath(key))
      }
    },
    handleSelect({ selectedKeys }) {
      this.selectedKeys = selectedKeys;
    },
    titleClick(e) {
      console.log('titleClick', e);
    },
    findRoutePath(key, list = this.list) {
      for (const item of list) {
        if (item.key === key) {
          return item.path
        }
        if (item.children && item.children.length > 0) {
          return this.findRoutePath(key, item.children)
        }
      }
    }
  },
};
</script>

<style lang="less" scoped>
</style>