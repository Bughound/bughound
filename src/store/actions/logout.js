import { MutationNames } from '../mutations/mutations'
import setToken from '@/helpers/setToken.js'

export default ({ commit }) => {
  return new Promise((resolve) => {
    commit(MutationNames.SetUser, undefined)
    setToken()
    resolve()
  })
}
