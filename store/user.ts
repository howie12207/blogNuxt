import { ActionTree, MutationTree } from 'vuex'

const PATH = '/nodeApi/user'

export const state = () => ({
  login: false,
  info: null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_USER(state, status) {
    state.login = status
  },
  SET_USER_INFO(state, info) {
    state.info = info
  },
}
export const actions: ActionTree<RootState, RootState> = {
  async FETCH_USER_DATA({ commit }) {
    if (!(this as any).$cookies.get('access')) return
    const res = await this.$req(`${PATH}/info`, 'get')
    if (res) {
      commit('SET_USER', true)
      commit('SET_USER_INFO', res)
    } else {
      ;(this as any).$cookies.remove('access')
    }
  },
  async LOGIN({ dispatch }, params) {
    const res = await this.$req(`${PATH}/login`, 'post', params, true)
    if (res) {
      ;(this as any).$cookies.set('access', res.token, {
        path: '',
        maxAge: 60 * 60 * 24,
      })
      dispatch('FETCH_USER_DATA')
    }
    return !!res
  },
  async REGISTER({ dispatch }, params) {
    const res = await this.$req(`${PATH}/register`, 'post', params, true)
    if (res) {
      await dispatch('LOGIN', params)
      return !!res
    }
  },
  async UPDATE_PASSWORD(_, params) {
    const res = await this.$req(`${PATH}/password`, 'put', params)
    if (res) {
      return !!res
    }
  },
}
