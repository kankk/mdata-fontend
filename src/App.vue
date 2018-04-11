<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import './styles/reset.css';
  @import './styles/global.less';
  @import './styles/common.less';
  @import './styles/layout.less';
  @import './styles/colors.less';
  @import './styles/font.less';
  @import './styles/transition.less';
</style>
