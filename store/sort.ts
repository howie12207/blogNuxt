import { ActionTree } from 'vuex'

const PATH = '/nodeApi/sort'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async FETCH_SORTS() {
    const res = await this.$req(`${PATH}`, 'get', {})
    return res || []
  },
  async CREATE_SORT(_, params) {
    const res = await this.$req(`${PATH}`, 'post', params, true)
    return !!res
  },
  async DELETE_SORT(_, params) {
    const res = await this.$req(`${PATH}/${params}`, 'delete', {}, true)
    return !!res
  },
}
