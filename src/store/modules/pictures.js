import moment from 'moment'
import picturesApi from '../../server/pictures'
import {
  PICTURES_INIT,
  PICTURES_ADD,
  PICTURES_DELETE
} from '../mutation-types'

const state = {
  isInit: false,
  pictures: []
}

const getters = {
  pictures: state => state.pictures
}

const actions = {
  getPictures ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!state.isInit) {
          const tempArr = await picturesApi.getAllPictures()
          tempArr.map((value, index) => {
            value.isLoaded = false
            value.time = moment(value.time).format('YYYY-MM-DD hh:mm:ss')
          })
          commit(PICTURES_INIT, tempArr)
        }
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  addPicture ({ commit }, picture) {
    commit(PICTURES_ADD, picture)
  },
  deletePicture ({ commit }, picture) {
    return new Promise(async (resolve, reject) => {
      try {
        await picturesApi.deletePictureByFilename(picture.name || picture.filename)
        commit(PICTURES_DELETE, picture)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

const mutations = {
  [PICTURES_INIT] (state, pictures) {
    state.pictures = pictures
    state.isInit = true
  },
  [PICTURES_ADD] (state, picture) {
    state.pictures.push(picture)
  },
  [PICTURES_DELETE] (state, picture) {
    for (let i = 0, len = state.pictures.length; i < len; i++) {
      if (state.pictures[i].filename === (picture.name || picture.filename)) {
        state.pictures.splice(i, 1)
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
