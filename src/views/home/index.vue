<template>
  <div class="home">
    <el-container>
      <nav-bar></nav-bar>
      <el-main class="home-main">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavBar from '../../components/nav_bar'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="less">
.home {
  &-main {
    margin-left: 200px;
  }
}
</style>
