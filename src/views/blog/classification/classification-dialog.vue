<template>
  <el-dialog :title="title" :visible="isVisible" width="500px" :before-close="handleClose">
    <el-form ref="classification-form" :model="currentObj" :rules="rules" label-width="60px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="currentObj.name" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('classification-form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ClassificationDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    object: {
      type: Object,
      default: function () {
        return {
          name: ''
        }
      }
    }
  },
  data () {
    return {
      currentObj: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:visible', false)
      this.$refs['classification-form'].resetFields()
      if (typeof done === 'function') {
        done()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.currentObj.id) {
            this.$emit('update', Object.assign({}, this.currentObj))
          } else {
            this.$emit('add', Object.assign({}, this.currentObj))
          }
          this.handleClose()
        } else {
          return false
        }
      })
    }
  },
  computed: {
    title: function () {
      return this.currentObj.id ? '编辑分类' : '新增分类'
    },
    isVisible: function () {
      return this.visible
    }
  },
  watch: {
    object: function (val) {
      if (!val || !val.id) {
        this.currentObj = {
          name: ''
        }
      } else {
        this.currentObj = Object.assign({}, val)
      }
    }
  }
}
</script>

<style lang="less">
.add-article-dialog {
  &-uploadbox {
    .el-upload, .el-upload-dragger {
      width: 100%;
    }
  }
}
</style>
