<template>
  <el-aside class="navbar" width="200px">
    <el-menu :default-active="defaultActive" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#409EFF"
    @select="handleMenuSelect">
      <el-menu-item index="overall">
        <i class="el-icon-menu"></i>
        <span slot="title">总览</span>
      </el-menu-item>
      <el-menu-item index="pictures">
        <i class="el-icon-picture"></i>
        <span slot="title">图片</span>
      </el-menu-item>
      <el-menu-item index="blog">
        <i class="el-icon-document"></i>
        <span slot="title">博客</span>
      </el-menu-item>
      <el-menu-item index="setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'navbar',
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
  height: 100vh;

  ul {
    height: 100%;
  }
}
</style>
