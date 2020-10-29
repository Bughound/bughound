import { GetZones } from '@/request/resources.js'
import { MutationNames } from '@/store/mutations/mutations.js'

export default ({ commit }) => {
  return new Promise((resolve, reject) => {
    GetZones({ params: { _sort: 'id:DESC' } }).then(response => {
      commit(MutationNames.SetZones, response.data)
      resolve(response)
    }, (error) => {
      reject(error)
    })
  })
}
