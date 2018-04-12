<template>
  <div class="pictures-list">
    <pictures-list-item v-for="p in pictures" :key="p.filename" :picture="p"/>
    <div class="pictures-list-item-hide"></div>
    <div class="pictures-list-item-hide"></div>
    <div class="pictures-list-item-hide"></div>
    <div class="pictures-list-item-hide"></div>
    <div class="pictures-list-item-hide"></div>
    <div class="pictures-list-item-hide"></div>
    <div class="pictures-list-item-hide"></div>
  </div>
</template>

<script>
import PicturesListItem from './pictures-list-item'
export default {
  name: 'PicturesList',
  props: {
    pictures: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    PicturesListItem
  }
}
</script>

<style lang="less">
.pictures-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.pictures-list-item-hide {
  width: 320px;
  height: 0px;
}
</style>
