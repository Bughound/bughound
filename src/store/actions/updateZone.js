import { UpdateZone } from '@/request/resources'
import { MutationNames } from '../mutations/mutations'

export default ({ commit }, { id, zone }) => {
  return new Promise((resolve, reject) => {
    UpdateZone(id, zone).then(response => {
      commit(MutationNames.AddZone, response.data)
      resolve(response.data)
    }, (error) => {
      reject(error)
    })
  })
}
