import Api from './api.js'

export default {
  authenticated () {
    return Api().get('/auth')
  }
}
