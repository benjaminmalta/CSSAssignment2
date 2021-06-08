
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const initialState = () => {
  return { user: null, error: null, isAdmin: null }
}

export default new Vuex.Store({

  state: initialState,
  mutations: mutations,
  actions: actions,
  getters: getters
})
