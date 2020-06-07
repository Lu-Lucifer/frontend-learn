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
      <a-menu-item-group v-for="item in item.groups" :key="item.key">
        <template slot="title"
          ><span>{{ item.group }}</span>
        </template>
        <a-menu-item v-for="item in item.children" :key="item.key">
          {{ item.name }}
        </a-menu-item>
      </a-menu-item-group>
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
      openKeys: [this.$route.meta.id.split('-')[0]],
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
        const path = this.findRoutePath(key, this.list);
        this.$router.push(path)
      }
    },
    handleSelect({ selectedKeys }) {
      this.selectedKeys = selectedKeys;
    },
    titleClick(e) {
      console.log('titleClick', e);
    },
    findRoutePath(key, list) {
      for (const item of list) {
        if (item.key === key) {
          return item.path
        }
      }
      for (const item of list) {
        const _mergeGroup = function _mergeGroup(list) {
          const children = []
          for (const group of list) {
            for (const menu of group.children) {
              children.push(menu)
            }
          }
          return children
        }
        const children = item.groups ? _mergeGroup(item.groups) : item.children
        const path = this.findRoutePath(key, children || [])
        if (path) {
          return path;
        }

      }
    }
  },
};
</script>

<style lang="less" scoped>
</style>