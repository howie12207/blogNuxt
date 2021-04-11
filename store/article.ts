import { ActionTree } from 'vuex'

const PATH = '/nodeApi/article'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async CREATE_ARTICLE(_, params) {
    const res = await this.$req(`${PATH}`, 'post', params, true)
    return !!res
  },
  async FETCH_ARTICLES(_, params) {
    const res = await this.$req(`${PATH}`, 'get', params)
    return res || {}
  },
  async FETCH_ARTICLE(_, params) {
    const res = await this.$req(`${PATH}/${params}`, 'get', {}, true)
    return res || {}
  },
  async UPDATE_ARTICLE(_, params) {
    const res = await this.$req(`${PATH}/${params._id}`, 'put', params, true)
    return !!res
  },
  async DELETE_ARTICLE(_, params) {
    const res = await this.$req(`${PATH}/${params}`, 'delete', {}, true)
    return !!res
  },
}
