import { CreateZone } from '@/request/resources'
import { MutationNames } from '../mutations/mutations'

export default ({ commit }, zone) => {
  return new Promise((resolve, reject) => {
    CreateZone(zone).then(response => {
      commit(MutationNames.AddZone, response.data)
      resolve(response.data)
    }, (error) => {
      reject(error)
    })
  })
}
