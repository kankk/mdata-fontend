<template>
  <div class="pictures">
    <div class="pictures-upload">
      <el-upload action="/api/pictures/upload" name="picture"
        list-type="picture-card" :before-upload="handleBeforeUpload" :on-success="handleUploadSuccess"
        :on-error="handleUploadError" :on-remove="handleFileRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <pictures-list :pictures="pictures" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PicturesList from './pictures-list'
export default {
  name: 'Pictures',
  data () {
    return {

    }
  },
  methods: {
    handleBeforeUpload (file, fileList) {
      let isExist = false
      this.pictures.map((value, index) => {
        if (value.filename === file.name) {
          isExist = true
          return false
        }
      })
      if (isExist) {
        this.$message.warning('该图片名称已经存在')
        return false
      } else {
        this.$message.success('开始上传图片')
      }
    },
    handleUploadSuccess (response, file, fileList) {
      response.message && this.$message.success(response.message)
      this.addPicture({
        filename: file.name,
        size: file.size,
        time: this.$moment().format('YYYY-MM-DD hh:mm:ss')
      })
    },
    handleUploadError () {
      this.$message.error('上传图片失败')
    },
    async handleFileRemove (file, fileList) {
      try {
        await this.deletePicture(file)
        this.$message.success('删除图片成功')
      } catch (err) {
        this.$message.error('删除图片失败')
      }
    },
    ...mapActions([
      'getPictures',
      'addPicture',
      'deletePicture'
    ])
  },
  computed: {
    ...mapGetters([
      'pictures'
    ])
  },
  async created () {
    try {
      await this.getPictures()
    } catch (err) {
      this.$message.error('获取图片集合失败')
    }
  },
  components: {
    PicturesList
  }
}
</script>

<style lang="less">
@import '../../styles/layout.less';
.pictures {
  &-upload {
    margin-bottom: @margin-vertical-large;
  }
}
</style>
