<template>
  <div class="container">
    <LazyPageBackstageModifyArticle
      target="modify"
      :sort-list="sortList"
      :article="article"
      @updateArticle="updateArticle"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ManageArticleId',
  layout: 'backstage',
  async asyncData({ store, params }) {
    const res1 = store.dispatch('sort/FETCH_SORTS')
    const res2 = store.dispatch('article/FETCH_ARTICLE', params.article)
    const [sortList, article] = await Promise.all([res1, res2])
    return {
      sortList,
      article,
    }
  },
  methods: {
    async updateArticle(params: object) {
      await this.$store.dispatch('article/UPDATE_ARTICLE', params)
      this.$router.go(-1)
    },
  },
})
</script>
