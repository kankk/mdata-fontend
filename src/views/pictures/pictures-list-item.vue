<template>
  <div class="pictures-list-item" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <div class="pictures-list-item-img-box">
      <img class="pictures-list-item-img" :src="fullPicturePath">
    </div>
    <p>
      {{ picture.filename }}
    </p>
    <p>
      {{ fileSize }}  [{{ picture.time }}]
    </p>
    <div class="pictures-list-item-hover" v-show="hovering">
      <i class="el-icon-share"></i>
      <i class="el-icon-search" @click="handleSearchClick"></i>
      <i class="el-icon-delete" @click="handleDeleteClick"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PicturesListItem',
  props: {
    picture: {
      type: Object,
      default: function () {
        return {
          filename: '',
          size: 0,
          tiem: null
        }
      }
    }
  },
  data () {
    return {
      toLoadImg: false,
      hovering: false
    }
  },
  methods: {
    handleMouseenter () {
      this.hovering = true
    },
    handleMouseleave () {
      this.hovering = false
    },
    handleSearchClick () {
      if (!this.toLoadImg) this.toLoadImg = true
    },
    handleDeleteClick () {
      this.$confirm('此操作将永久删除该文件, 是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await this.deletePicture(this.picture)
          this.$message.success('删除图片成功')
        } catch (err) {
          this.$message.error('删除图片失败')
        }
      }).catch(() => {})
    },
    ...mapActions([
      'deletePicture'
    ])
  },
  computed: {
    fullPicturePath: function () {
      if (this.toLoadImg) {
        return `http://localhost:4000/pictures/${this.picture.filename}`
      } else {
        return ''
      }
    },
    fileSize: function () {
      const size = this.picture.size
      if (size < 1024) {
        return `${size}B`
      } else if (size < Math.pow(1024, 2)) {
        return `${parseInt(size / 1024)}KB`
      } else {
        return `${(size / Math.pow(1024, 2)).toFixed(1)}MB`
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/colors.less';
@import '../../styles/layout.less';
.pictures-list-item {
  position: relative;
  width: 320px;
  // height: 180px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid @color-border;
  margin-bottom: @margin-vertical-medium;

  &-img-box {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  & > p {
    padding: 3px;
    text-align: center;
  }

  &-hover {
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      font-size: 36px;
      &:hover {
        color: #eee;
      }
    }
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
