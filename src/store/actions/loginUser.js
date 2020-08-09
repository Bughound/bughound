import { LoginUser } from '@/request/resources.js'
import { MutationNames } from '../mutations/mutations.js'
import setToken from '@/helpers/setToken.js'

export default ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    LoginUser(data).then(response => {
      commit(MutationNames.SetUser, response.data)
      setToken(response.data.jwt)
      resolve(data)
    }, (error) => {
      reject(error)
    })
  })
}
