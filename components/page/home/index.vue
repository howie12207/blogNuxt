<template>
  <div class="min-h-screen">
    <div class="flex">
      <div class="w-4/5 lg:w-3/5 m-auto">
        <PageHomeArticleCard
          v-for="card in articles"
          :key="card._id"
          :article="card"
        />
        <el-pagination
          v-if="total"
          small
          class="text-center mb-8"
          background
          layout="prev,pager,next"
          :total="total"
          :current-page="Number($route.query.page) + 1 || page"
          @current-change="handleCurrentChange"
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
    handleCurrentChange(page: number) {
      this.fetchArticles(page - 1)
      this.updateQuery(page - 1)
    },
    fetchArticles(page: number | object) {
      // 判斷若是上下頁動作則另外補上query
      if (typeof page === 'object') page = Number(this.$route.query.page) || 0
      const query: any = { ...this.$route.query, page: page || undefined }
      this.$emit('update:page', page)
      this.$emit('fetchArticles', query)
    },
    updateQuery(page: number) {
      const query: any = { ...this.$route.query, page: page || undefined }
      this.$router.push({ query })
    },
  },
})
</script>
