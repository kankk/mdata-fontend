import api from './api'
import { $http } from '../services/$http.service'

export default {
  getAllArticles () {
    return $http(api.blog.articleAll, null, 'GET')
  },
  getArticleById (id) {
    return $http(`${api.blog.article}/${id}`, null, 'GET')
  },
  addArticle (article) {
    return $http(api.blog.article, article, 'POST')
  },
  editArticle (article) {
    return $http(api.blog.article, article, 'PUT')
  },
  deleteArticleById (id) {
    return $http(`${api.blog.article}/${id}`, null, 'DELETE')
  },
  getAllClassifications () {
    return $http(api.blog.classificationAll, null, 'GET')
  },
  addClassification (classification) {
    return $http(api.blog.classification, classification, 'POST')
  },
  editClassification (classification) {
    return $http(api.blog.classification, classification, 'PUT')
  },
  deleteClassificationById (id) {
    return $http(`${api.blog.classification}/${id}`, null, 'DELETE')
  }
}
