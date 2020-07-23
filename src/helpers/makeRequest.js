import axios from 'axios'
import apiRoute from '@/helpers/apiRoute'

const makeRequest = (typeRequest, path, data) => axios[typeRequest](`${apiRoute}${path}`, data)

export {
  makeRequest
}
