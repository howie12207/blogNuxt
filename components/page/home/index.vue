<template>
  <div class="min-h-screen">
    <div class="flex">
      <div class="w-4/5 lg:w-3/5 m-auto">
        <PageHomeArticleCard
          v-for="card in articles"
          :key="card._id"
          :article="card"
        />
        <CommonPagination
          :total="total"
          bg
          :page.sync="page"
          :size.sync="size"
          :layout="['total', 'size', 'pager']"
          @changePage="changePage"
          @changeSize="changeSize"
        />
      </div>
      <div class="w-60 hidden lg:block">
        <PageHomeRightBar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    window.addEventListener('popstate', this.fetchArticles)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.fetchArticles)
  },
  methods: {
    fetchArticles(params: any) {
      const query: any = {
        ...this.$route.query,
        ...params,
      }
      this.$emit('update:page', Number(query.page) || 0)
      this.$emit('update:size', Number(query.size) || 10)
      this.$emit('fetchArticles', query)
    },
    updateQuery(params: object) {
      const query = { ...this.$route.query, ...params }
      this.$router.push({ query })
    },
    changePage(page: number) {
      this.fetchArticles({ page, size: this.size })
      this.updateQuery({ page, size: this.size })
    },
    changeSize(size: number) {
      this.fetchArticles({ size, page: 0 })
      this.updateQuery({ size, page: 0 })
    },
  },
})
</script>
