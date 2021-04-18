<template>
  <LazyPageBackstageCreateArticle
    :sort-list="sortList"
    @createArticle="createArticle"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CreateArticle',
  layout: 'backstage',
  async asyncData({ store }) {
    const sortList = await store.dispatch('sort/FETCH_SORTS')
    return {
      sortList,
    }
  },
  methods: {
    async createArticle(params: object) {
      await this.$store.dispatch('article/CREATE_ARTICLE', params)
      this.$router.push('/backstage/manageArticle')
    },
  },
})
</script>
