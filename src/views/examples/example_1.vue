<style lang="less" scoped>
</style>

<template>
  <div>
    <h1>example_1</h1>
    <br>
    <h2>该页面将作为Main组件的子页面展示并且在左侧菜单显示</h2>
    <br>
    <a href="#" @click.prevent="handleClick">点击前往example_2页面 >>></a>
  </div>
</template>

<script>
export default {
  name: 'example_1',
  methods: {
    handleClick () {
      this.$router.push({
        name: 'welcome_2'
      })
    }
  },
};
</script>