<template>
  <el-aside class="navbar" width="201px">
    <el-menu :default-active="defaultActive" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#409EFF"
    @select="handleMenuSelect">
      <el-menu-item index="overall">
        <span slot="title">总览</span>
      </el-menu-item>
      <el-menu-item index="pictures">
        <span slot="title">图片</span>
      </el-menu-item>
      <el-submenu index="blog">
        <template slot="title">
          <span slot="title">博客</span>
        </template>
        <el-menu-item index="blog/articles">
          <span slot="title">文章</span>
        </el-menu-item>
        <el-menu-item index="blog/classification">
          <span slot="title">分类</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="autochess">
        <template slot="title">
          <span slot="title">刀塔自走棋</span>
        </template>
        <el-menu-item index="autochess/hero">
          <span slot="title">英雄</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="setting">
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      isCollapse: false,
      defaultActive: 'overall'
    }
  },
  methods: {
    handleMenuSelect (index) {
      switch (index) {
        case 'overall':
          this.$router.push('/')
          break
        default:
          this.$router.push(`/${index}`)
          break
      }
    }
  },
  created () {
    this.defaultActive = this.$route.name
  }
}
</script>

<style lang="less">
.navbar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;

  ul {
    height: 100%;
  }
}
</style>
