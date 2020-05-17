<template>
  <a-menu v-model="current" mode="horizontal">
    <a-menu-item key="mail"> <a-icon type="mail" />Navigation One </a-menu-item>
    <a-menu-item key="app" disabled>
      <a-icon type="appstore" />Navigation Two
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      current: ['mail'],
    };
  },
}
</script>


<style lang="less" scoped>
</style>