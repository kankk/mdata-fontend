import api from './api'
import { $http } from '../services/$http.service'

export default {
  getAllPictures () {
    return $http(api.pictures.all, null, 'GET')
  },
  deletePictureByFilename (filename) {
    return $http(api.pictures.root + filename, null, 'DELETE')
  }
}
