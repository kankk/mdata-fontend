<template>
  <div class="pictures">
    <div class="pictures-upload">
      <el-upload action="/api/pictures/upload" name="pictures"
        list-type="pictures-card">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div class="pictures-list">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Pictures',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less">

</style>
