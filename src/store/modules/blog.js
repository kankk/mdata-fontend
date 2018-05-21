import blogApi from '../../server/blog'
import {
  BLOG_ARTICLES_INIT,
  BLOG_ARTICLES_ADD,
  BLOG_ARTICLES_EDIT,
  BLOG_ARTICLES_DELETE,
  BLOG_CLASSIFICATION_INIT,
  BLOG_CLASSIFICATION_ADD,
  BLOG_CLASSIFICATION_EDIT,
  BLOG_CLASSIFICATION_DELETE
} from '../mutation-types'

const state = {
  isArticlesInit: false,
  isClassificationInit: false,
  articles: [],
  classifications: []
}

const getters = {
  articles: state => state.articles,
  classifications: state => state.classifications
}

const actions = {
  // 获取所有Articles
  getAllArticles ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!state.isArticlesInit) {
          const result = await blogApi.getAllArticles()
          commit(BLOG_ARTICLES_INIT, result.data)
        }
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  // 增加Article
  addArticle ({ commit }, article) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await blogApi.addArticle(article)
        resolve()
        commit(BLOG_ARTICLES_ADD, result)
      } catch (err) {
        reject(err)
      }
    })
  },
  // 修改Article
  editArticle ({ commit }, article) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await blogApi.editArticle(article)
        resolve()
        commit(BLOG_ARTICLES_EDIT, result)
      } catch (err) {
        reject(err)
      }
    })
  },
  // 修改Classification的display
  editClassificationDisplayById ({ commit }, article) {
    return new Promise(async (resolve, reject) => {
      try {
        commit(BLOG_ARTICLES_EDIT, {
          id: article.id,
          display: article.display
        })
        const result = await blogApi.editArticle({
          id: article.id,
          display: article.display ? 1 : 0
        })
        resolve()
        commit(BLOG_ARTICLES_EDIT, result)
      } catch (err) {
        reject(err)
      }
    })
  },
  // 删除Article
  deleteArticle ({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await blogApi.deleteArticleById(id)
        resolve()
        commit(BLOG_ARTICLES_DELETE, id)
      } catch (err) {
        reject(err)
      }
    })
  },
  // 获取所有Classifications
  getAllClassifications ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!state.isClassificationInit) {
          const result = await blogApi.getAllClassifications()
          commit(BLOG_CLASSIFICATION_INIT, result.data)
        }
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  // 增加Classification
  addClassification ({ commit }, classification) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await blogApi.addClassification(classification)
        resolve()
        commit(BLOG_CLASSIFICATION_ADD, result)
      } catch (err) {
        reject(err)
      }
    })
  },
  // 修改Classification
  editClassification ({ commit }, classification) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await blogApi.editClassification(classification)
        resolve()
        commit(BLOG_CLASSIFICATION_EDIT, result)
      } catch (err) {
        reject(err)
      }
    })
  },
  // 删除Classification
  deleteClassification ({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await blogApi.deleteClassificationById(id)
        resolve()
        commit(BLOG_CLASSIFICATION_DELETE, id)
      } catch (err) {
        reject(err)
      }
    })
  }
}

const mutations = {
  [BLOG_ARTICLES_INIT] (state, articles) {
    state.articles = articles
    state.isArticlesInit = true
  },
  [BLOG_ARTICLES_ADD] (state, article) {
    state.articles.unshift(article)
  },
  [BLOG_ARTICLES_EDIT] (state, article) {
    for (const c of state.articles) {
      if (c.id === article.id) {
        Object.assign(c, article)
        break
      }
    }
  },
  [BLOG_ARTICLES_DELETE] (state, id) {
    for (let i = 0, len = state.articles.length; i < len; i++) {
      if (state.articles[i].id === id) {
        state.articles.splice(i, 1)
        break
      }
    }
  },
  [BLOG_CLASSIFICATION_INIT] (state, classifications) {
    state.classifications = classifications
    state.isClassificationInit = true
  },
  [BLOG_CLASSIFICATION_ADD] (state, classification) {
    state.classifications.push(classification)
  },
  [BLOG_CLASSIFICATION_EDIT] (state, classification) {
    for (const c of state.classifications) {
      if (c.id === classification.id) {
        Object.assign(c, classification)
        break
      }
    }
  },
  [BLOG_CLASSIFICATION_DELETE] (state, id) {
    for (let i = 0, len = state.classifications.length; i < len; i++) {
      if (state.classifications[i].id === id) {
        state.classifications.splice(i, 1)
        break
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
