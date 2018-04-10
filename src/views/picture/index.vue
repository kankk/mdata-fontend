<template>
  <div class="picture">
    <div class="picture-upload">
      <el-upload action="/api/picture/upload"
        list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div class="picture-list">

    </div>
  </div>
</template>

<script>
export default {
  name: 'picture',
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
