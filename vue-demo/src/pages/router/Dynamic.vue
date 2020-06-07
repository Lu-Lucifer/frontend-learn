<template>
  <div class="markdown-body" v-html="doc"></div>
</template>

<script>
export default {
  data() {
    return {
      doc: require('./doc/Dynamic.md')
    }
  },
  created() { }
};
</script>

<style>
</style>