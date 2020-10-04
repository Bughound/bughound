import Vue from 'vue'
import Vuex from 'vuex'

import { GetterFunctions } from './getters/getters'
import { MutationFunctions } from './mutations/mutations'
import { ActionFunctions } from './actions/actions'

Vue.use(Vuex)

const newStore = () => {
  return {
    settings: {
      cameraActive: false,
      showMenuPanel: false
    },
    user: undefined,
    observations: [],
    notifications: [],
    predictions: []
  }
}

export default new Vuex.Store({
  state: newStore(),
  getters: GetterFunctions,
  mutations: MutationFunctions,
  actions: ActionFunctions
})
