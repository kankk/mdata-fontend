<template>
  <el-button class="list-add-button" :size="size" @click="handleClick">
    <slot>
      添加
    </slot>
  </el-button>
</template>

<script>
export default {
  name: 'ListAddButton',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    click: {
      type: Function
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
.list-add-button {
  color: rgba(0,0,0,.65);
  width: 100% !important;
  border: 1px dashed #d9d9d9;
  letter-spacing: 5px;
}
</style>
