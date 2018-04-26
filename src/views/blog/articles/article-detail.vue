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
      <div v-html="article.content"></div>
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
        return this.$moment(this.article.display_stamp).format('lll')
      } else {
        return this.$moment().format('ll')
      }
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  async mounted () {
    const result = await blogApi.getArticleById(this.id)
    if (result.result) {
      this.article = result.row
    } else {
      this.$message.error('获取文章失败')
    }
  }
}
</script>

<style lang="less">
.article-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-wrap, &-wrap2 {
    width: 960px;
    background-color: rgba(255, 255 ,255, 0.6);
    margin-bottom: 16px;
  }
  &-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
