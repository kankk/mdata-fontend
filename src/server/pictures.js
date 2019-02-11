import api from './api'
import { $get, $delete } from '../services/$http.service'

export default {
  getAllPictures () {
    return $get(api.pictures.all)
  },
  deletePictureByFilename (filename) {
    return $delete(api.pictures.root + filename)
  }
}
