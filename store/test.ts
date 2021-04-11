import { ActionTree, MutationTree } from 'vuex'

const PATH = '/nodeApi'

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
  async TEST1() {
    const res = await this.$req(`${PATH}/test1`, 'get', {})
    return res || false
  },
}
