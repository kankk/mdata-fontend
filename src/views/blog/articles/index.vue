<template>
  <div class="articles">
    <list-add-button @click="handleClickShowDialog">添加文章</list-add-button>
    <article-dialog :object="currentArticle" :visible.sync="isArticleDialogShow"
    v-on:add="handleAddArticle" v-on:update="handleUpdateArticle"></article-dialog>
    <el-table :data="articles" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="classificationName" label="分类">
      </el-table-column>
      <el-table-column prop="display" label="是否展示">
        <template slot-scope="scope">
          <el-switch :value="scope.row.display" @change="handleSwitchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="display_stamp" label="展示时间" width="300">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.create_stamp) }}</span>
        </template>
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
      <!-- <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button @click="handleClickShowDialog(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleClickDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ArticleDialog from './article-dialog'
export default {
  name: 'Aricles',
  data () {
    return {
      isArticleDialogShow: false,
      currentArticle: {
        title: '',
        classification: '',
        display: false
      }
    }
  },
  methods: {
    handleClickShowDialog (article) {
      if (article) {

      } else {
        this.currentArticle = {
          title: '',
          classification: '',
          display: false
        }
      }
      this.isArticleDialogShow = true
    },
    async handleAddArticle (article) {
      try {
        await this.addArticle(article)
        this.$message.success('添加文章成功')
      } catch (err) {
        this.$message.error('添加文章失败')
      }
    },
    async handleUpdateArticle (article) {
      console.log(article)
    },
    async handleDeleteArticle (article) {

    },
    handleSwitchChange (obj) {
      const article = Object.assign({}, obj)
      article.display = !article.display
      this.editClassificationDisplayById(article)
    },
    formatTime (str) {
      return this.$moment(str).format('lll')
    },
    ...mapActions([
      'getAllArticles',
      'getAllClassifications',
      'addArticle',
      'editArticle',
      'editClassificationDisplayById',
      'deleteArticle'
    ])
  },
  computed: {
    ...mapGetters([
      'articles',
      'classifications'
    ])
  },
  async created () {
    try {
      await this.getAllArticles()
      await this.getAllClassifications()
    } catch (err) {
      this.$message.error('获取分类列表失败')
    }
  },
  components: {
    ArticleDialog
  }
}
</script>

<style lang="less">

</style>
