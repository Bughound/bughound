import { CreateObservation } from '@/request/resources'
import { MutationNames } from '../mutations/mutations'

export default ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    CreateObservation(data).then(response => {
      commit(MutationNames.SetPredictions, response.data.predictions)
      resolve(response)
    }, (error) => {
      reject(error)
    })
  })
}
