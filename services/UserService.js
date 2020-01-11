import Api from '../services/api.js'

export default {
  login (credentials) {
    return Api().post('/login', credentials,
      { headers: {'Content-type': 'application/json'} })
  },
  logout () {
    return Api().get('/logout')
  },
  register (credentials) {
    return Api().post('/register', credentials,
      { headers: {'Content-type': 'application/json'} })
  }
}
