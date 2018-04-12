<template>
  <div class="home">
    <el-container>
      <navbar></navbar>
      <el-main class="home-main">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    Navbar
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
