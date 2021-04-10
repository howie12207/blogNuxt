<template>
  <div class="container">
    <LazyPageBackstageCreateArticle
      :sort-list="sortList"
      @createArticle="createArticle"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CreateArticle',
  layout: 'backstage',
  async asyncData({ store }) {
    const sortList = await store.dispatch('nodeApi/FETCH_SORTS')
    return {
      sortList,
    }
  },
  methods: {
    async createArticle(params: object) {
      await this.$store.dispatch('nodeApi/CREATE_ARTICLE', params)
      this.$router.push('/backstage/manageArticle')
    },
  },
})
</script>
