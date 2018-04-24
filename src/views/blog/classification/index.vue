<template>
  <div class="classification">
    <list-add-button @click="handleClickShowDialog">添加分类</list-add-button>
    <el-table :data="classifications" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="create_stamp" label="创建时间" width="300">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.create_stamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_stamp" label="修改时间" width="300">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.update_stamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button @click="handleClickShowDialog(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleClickDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <classification-dialog :object="currentClassification" :visible.sync="isClassificationDialogShow" v-on:update="handleUpdateClassification"
      v-on:add="handleAddClassification"></classification-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClassificationDialog from './classification-dialog'
export default {
  name: 'Classification',
  data () {
    return {
      isClassificationDialogShow: false,
      currentClassification: {
        name: ''
      }
    }
  },
  methods: {
    handleClickShowDialog (classification) {
      if (classification) {
        this.currentClassification = classification
      } else {
        this.currentClassification = {
          name: ''
        }
      }
      this.isClassificationDialogShow = true
    },
    handleClickDelete (classification) {
      this.$confirm('是否确定删除该分类', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDeleteClassification(classification)
      })
    },
    async handleAddClassification (classification) {
      try {
        await this.addClassification(classification)
        this.$message.success('添加分类成功')
      } catch (err) {
        this.$message.error('添加分类失败')
      }
    },
    async handleUpdateClassification (classification) {
      try {
        await this.editClassification(classification)
        this.$message.success('修改分类成功')
      } catch (err) {
        this.$message.error('修改分类失败')
      }
    },
    async handleDeleteClassification (classification) {
      try {
        await this.deleteClassification(classification.id)
        console.log('success')
        this.$message.success('删除分类成功')
      } catch (err) {
        this.$message.error('删除分类失败')
      }
    },
    formatTime (str) {
      return this.$moment(str).format('lll')
    },
    ...mapActions([
      'getAllClassifications',
      'addClassification',
      'editClassification',
      'deleteClassification'
    ])
  },
  computed: {
    ...mapGetters([
      'classifications'
    ])
  },
  async created () {
    try {
      await this.getAllClassifications()
    } catch (err) {
      this.$message.error('获取分类列表失败')
    }
  },
  components: {
    ClassificationDialog
  }
}
</script>

<style lang="less">

</style>
