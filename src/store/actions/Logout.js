import { MutationNames } from '../mutations/mutations'
import setToken from '@/helpers/setToken.js'

export default ({ commit }, value) => {
  commit(MutationNames.SetUser, undefined)
  setToken('')
}
