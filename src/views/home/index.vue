<template>
  <div class="home">
    <el-container>
      <navbar></navbar>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
export default {
  name: 'home',
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

</style>
