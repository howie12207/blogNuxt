<template>
  <div class="container">
    <PageArticle :article="article" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ArticleId',
  layout: 'forestage',
  async asyncData({ store, params }) {
    const article = await store.dispatch(
      'article/FETCH_ARTICLE',
      params.article
    )
    return {
      article,
    }
  },
})
</script>
