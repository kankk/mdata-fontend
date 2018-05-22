export default {
  authority: {
    module: '/api/authority/module',
    modules: '/api/authority/modules'
  },
  user: {
    status: '/api/user/status',
    login: '/api/user/login',
    logout: '/api/user/logout',
    register: '/api/user/register',
    list: '/api/user/list',
    password: '/api/user/password'
  },
  pictures: {
    root: '/api/pictures/',
    all: '/api/pictures/all'
  },
  blog: {
    article: '/api/blog/article',
    articleAll: '/api/blog/article/all',
    articleDisplay: '/api/blog/article/display',
    articlePage: '/api/blog/article/page',
    classification: '/api/blog/classification',
    classificationAll: '/api/blog/classification/all'
  },
  trace: {
    count: '/api/trace/count',
    dates: '/api/trace/dates',
    websites: '/api/trace/websites'
  }
}
