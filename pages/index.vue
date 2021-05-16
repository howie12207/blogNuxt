<template>
  <LazyPageHome
    :articles="articles"
    :total="total"
    :page.sync="page"
    :size.sync="size"
    @fetchArticles="fetchArticles"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
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
      total: 0,
      page: Number(this.$route.query.page) || 0,
      size: Number(this.$route.query.size) || 10,
    }
  },
  methods: {
    async fetchArticles(params: object) {
      const res = await this.$store.dispatch('article/FETCH_ARTICLES', params)
      this.articles = res.content
      this.total = res.totalElements
      window.scrollTo(0, 0)
    },
  },
})
</script>
