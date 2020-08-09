import { GetUser } from '@/request/resources.js'
import { MutationNames } from '@/store/mutations/mutations.js'

export default ({ commit }) => {
  GetUser().then(response => {
    commit(MutationNames.SetUser, response.data)
  })
}
