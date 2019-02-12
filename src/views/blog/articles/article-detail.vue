<template>
  <div class="article-detail">
    <div class="article-detail-wrap">
      <div class="article-detail-title">
        {{ article.title }}
      </div>
      <div class="article-detail-info">
        <span>
          <span v-for="item in tags" :key="item">{{ item }}</span>
        </span>
        <span>{{ formatDisplayStamp }}</span>
      </div>
      <div id="display_article" v-html="article.content"></div>
    </div>
    <div class="article-detail-wrap2">
      <span>{{ article.classificationName }}</span>
    </div>
  </div>
</template>

<script>
import blogApi from '../../../server/blog'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      id: '',
      article: {
        title: '',
        content: '',
        classificationName: '',
        tags: '',
        display_stamp: ''
      }
    }
  },
  methods: {

  },
  computed: {
    tags () {
      if (this.article.tags) {
        return this.article.tags.split(',')
      } else {
        return '无'
      }
    },
    formatDisplayStamp () {
      if (this.article.display_stamp) {
        return this.$day(this.article.display_stamp).format('YYYY-MM-DD hh:mm:ss')
      } else {
        return this.$day().format('YYYY-MM-DD hh:mm:ss')
      }
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  async mounted () {
    const result = await blogApi.getArticleById(this.id)
    if (result.result) {
      this.article = result.data
    } else {
      this.$message.error('获取文章失败')
    }
  }
}
</script>

<style lang="less">
@import './display_article.less';
</style>
