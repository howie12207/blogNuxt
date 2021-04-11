<template>
  <div class="min-h-screen w-3/5 m-auto">
    <PageHomeArticleCard
      v-for="card in articles"
      :key="card._id"
      :article="card"
    />
    <el-pagination
      v-if="total"
      class="text-center mb-8"
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page="Number($route.query.page) + 1 || page"
      @current-change="handleCurrentChange"
    />
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
  methods: {
    handleCurrentChange(page: number) {
      this.$emit('update:page', page - 1)
      const query: any = { ...this.$route.query, page: page - 1 }
      this.$emit('fetchArticles', query)
      this.$router.push({ query })
    },
  },
})
</script>
