import { GetUser } from '@/request/resources.js'
import { MutationNames } from '@/store/mutations/mutations.js'

export default ({ commit }) => {
  return new Promise((resolve, reject) => {
    GetUser().then(response => {
      commit(MutationNames.SetUser, response.data)
      resolve(response)
    }, (error) => {
      reject(error)
    })
  })
}
