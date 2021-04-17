<template>
  <LazyPageBackstageManageArticle
    class="flex-grow overflow-hidden"
    :articles="articles"
    :page.sync="page"
    :total="total"
    @deleteArticle="deleteArticle"
    @fetchArticles="fetchArticles"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ManageArticle',
  layout: 'backstage',
  async asyncData({ store, query }) {
    const res = await store.dispatch('article/FETCH_ARTICLES', query)
    return {
      articles: res.content,
      total: res.totalElements,
    }
  },
  data() {
    return {
      articles: [],
      page: 0,
      // size: 10,
      total: 0,
      // pageOption: {
      //   page: 1,
      //   size: 10,
      //   total: 0,
      // },
    }
  },
  methods: {
    async fetchArticles(params: object) {
      const res = await this.$store.dispatch('article/FETCH_ARTICLES', params)
      this.articles = res.content
      this.total = res.totalElements
      window.scrollTo(0, 0)
    },
    async deleteArticle(id: string) {
      await this.$store.dispatch('article/DELETE_ARTICLE', id)
      await this.fetchArticles(this.$route.query)
    },
  },
})
</script>
