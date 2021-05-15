import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  pageLoading: false,
  darkMode: false,

  meta: {},
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_PAGE_LOADING(state, status) {
    state.pageLoading = status
  },
  SET_DARK_MODE(state) {
    if (process.client) {
      state.darkMode = localStorage.getItem('darkMode') === 'true'
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit(store: any) {
    await store.dispatch('user/FETCH_USER_DATA')
  },
}
