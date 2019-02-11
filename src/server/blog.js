import api from './api'
import { $get, $post, $delete, $put } from '../services/$http.service'

export default {
  getAllArticles () {
    return $get(api.blog.articleAll)
  },
  getArticleById (id) {
    return $get(`${api.blog.article}/${id}`)
  },
  addArticle (article) {
    return $post(api.blog.article, article)
  },
  editArticle (article) {
    return $put(api.blog.article, article)
  },
  deleteArticleById (id) {
    return $delete(`${api.blog.article}/${id}`)
  },
  getAllClassifications () {
    return $get(api.blog.classificationAll)
  },
  addClassification (classification) {
    return $post(api.blog.classification, classification)
  },
  editClassification (classification) {
    return $put(api.blog.classification, classification)
  },
  deleteClassificationById (id) {
    return $delete(`${api.blog.classification}/${id}`)
  }
}
