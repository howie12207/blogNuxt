import { ActionTree } from 'vuex'

const PATH = '/nodeApi/comment'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async CREATE_COMMENT(_, params) {
    const res = await this.$req(`${PATH}`, 'post', params, true)
    return !!res
  },
  async FETCH_COMMENTS(_, params) {
    const res = await this.$req(`${PATH}`, 'get', params)
    return res || []
  },
  async FETCH_COMMENT(_, params) {
    const res = await this.$req(`${PATH}/${params.articleId}`, 'get', params)
    return res || []
  },
  async DELETE_COMMENT(_, params) {
    const res = await this.$req(`${PATH}/${params}`, 'delete')
    return !!res
  },
}
