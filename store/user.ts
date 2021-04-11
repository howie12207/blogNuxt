import { ActionTree, MutationTree } from 'vuex'

const PATH = '/nodeApi/user'

export const state = () => ({
  login: false,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_USER(state, status) {
    state.login = status
  },
}
export const actions: ActionTree<RootState, RootState> = {
  async FETCH_USER_DATA({ commit }) {
    const account = (this as any).$cookies.get('account')
    const password = (this as any).$cookies.get('password')
    if (account && password) {
      const res = await this.$req(`${PATH}/login`, 'post', {
        account,
        password,
      })
      if (res) commit('SET_USER', true)
    }
  },
  async LOGIN({ commit }, params) {
    const res = await this.$req(`${PATH}/login`, 'post', params, true)
    if (res) {
      ;(this as any).$cookies.set('account', params.account, {
        path: '',
        maxAge: 60 * 60 * 24,
      })
      ;(this as any).$cookies.set('password', params.password, {
        path: '',
        maxAge: 60 * 60 * 24,
      })
      commit('SET_USER', true)
    }
    return !!res
  },
}
