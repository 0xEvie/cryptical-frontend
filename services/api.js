import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://crypticalnode-deployment.herokuapp.com/'
  })
}
