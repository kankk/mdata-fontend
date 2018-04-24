<template>
  <div>
    <el-dialog :title="title" :visible="isVisible" width="500px" :before-close="handleClose">
      <el-form ref="article-form" :model="ariclesObj" :rules="rules" label-width="60px">
        <el-form-item v-if="ariclesObj.id" label="标题" prop="title">
          <el-input v-model="ariclesObj.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="classification">
          <el-select v-model="ariclesObj.classification" placeholder="请选择文章分配" size="mini" style="width: 100%;">
            <el-option v-for="c in classifications" :key="c.id" :label="c.name" :value="c.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示" prop="diaplay">
          <el-switch
            v-model="ariclesObj.display">
          </el-switch>
        </el-form-item>
      </el-form>
      <el-upload ref="article-upload" class="article-dialog-uploadbox" drag action="/api/blog/article/upload" name="article" :limit="1"
      :before-upload="handleFileBeforeUpload" :on-success="handleFileSuccess" :on-remove="handleFileRemove" :on-exceed="handleFileExceed">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><br>只能上传md文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('article-form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AddAricleDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    object: {
      type: Object,
      default: function () {
        return {
          title: '',
          classification: '',
          display: false
        }
      }
    }
  },
  data () {
    return {
      ariclesObj: {
        title: '',
        classification: '',
        display: false
      },
      uploadFile: null,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        classification: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:visible', false)
      // 初始化表单
      this.uploadFile = null
      this.$refs['article-form'].resetFields()
      this.$refs['article-upload'].clearFiles()
      if (typeof done === 'function') {
        done()
      }
    },
    handleFileBeforeUpload () {
      this.uploadFile = null
    },
    handleFileSuccess (response, file, fileList) {
      this.uploadFile = file
    },
    handleFileRemove (file, fileList) {
      this.uploadFile = null
    },
    handleFileExceed () {
      this.$message.warning('只允许上传一个.md文件')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else if (!this.uploadFile && !this.ariclesObj.id) {
          this.$message.warning('请上传md文件')
          return false
        } else {
          if (this.ariclesObj.id) {
            const updateObject = Object.assign({}, this.ariclesObj)
            if (this.uploadFile && this.uploadFile.name) {
              Object.assign(updateObject, {
                path: this.uploadFile.name
              })
            }
            this.$emit('update', updateObject)
          } else {
            this.$emit('add', Object.assign({}, this.ariclesObj, {
              path: this.uploadFile.name
            }))
          }
          this.handleClose()
        }
      })
    }
  },
  computed: {
    title: function () {
      return this.ariclesObj.id ? '编辑文章' : '新增文章'
    },
    isVisible: function () {
      return this.visible
    },
    ...mapGetters([
      'classifications'
    ])
  },
  watch: {
    object: function (val) {
      if (!val || !val.id) {
        this.ariclesObj = {
          title: '',
          classification: '',
          display: false
        }
      } else {
        this.ariclesObj = Object.assign({}, val)
      }
    }
  }
}
</script>

<style lang="less">
.article-dialog {
  &-uploadbox {
    .el-upload, .el-upload-dragger {
      width: 100%;
    }
  }
}
</style>
