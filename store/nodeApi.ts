import { ActionTree } from 'vuex'

const PATH = 'nodeApi'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async TEST() {
    const res = await this.$req(`${PATH}/test`, 'get', {}, true)
    return res || false
  },

  async CREATE_ARTICLE(_, params) {
    const res = await this.$req(`${PATH}/create/article`, 'post', params, true)
    return !!res
  },
  async FETCH_ARTICLES() {
    const res = await this.$req(`${PATH}/fetch/articles`, 'get', {})
    return res || []
  },
  async FETCH_ARTICLE(_, params) {
    const res = await this.$req(`${PATH}/fetch/article`, 'get', params, true)
    return res || {}
  },
  async DELETE_ARTICLE(_, params) {
    const res = await this.$req(
      `${PATH}/delete/article/${params}`,
      'delete',
      {},
      true
    )
    return !!res
  },

  async UPDATE_ARTICLE(_, params) {
    const res = await this.$req(`${PATH}/update/article`, 'put', params, true)
    return !!res
  },
  async FETCH_SORTS() {
    const res = await this.$req(`${PATH}/fetch/sort`, 'get', {})
    return res || []
  },
  async CREATE_SORT(_, params) {
    const res = await this.$req(`${PATH}/create/sort`, 'post', params, true)
    return !!res
  },
  async DELETE_SORT(_, params) {
    const res = await this.$req(
      `${PATH}/delete/sort/${params}`,
      'delete',
      {},
      true
    )
    return !!res
  },
}
