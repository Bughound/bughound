import axios from 'axios'
import apiRoute from '@/helpers/apiRoute'

const Axios = axios.create({
  baseURL: `${apiRoute}`
})

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authtoken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const makeRequest = (typeRequest, path, data, options = {}) => Axios[typeRequest](path, data, options)

export {
  makeRequest
}
