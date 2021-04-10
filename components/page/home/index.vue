<template>
  <div class="min-h-screen w-3/5 m-auto">
    123
    <!-- <ArticleCard /> -->
    <!-- <ArticleCard v-for="card in articles" :key="card.id" :article="card" /> -->
    <!-- <el-pagination
      v-if="pageOption.total"
      class="text-center mb-8"
      background
      layout="prev, pager, next"
      :total="pageOption.total"
      :page-size="pageOption.size"
      :current-page="pageOption.page"
      @current-change="handleCurrentChange"
    >
    </el-pagination> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',
  props: {
    // articles: {
    //   type: Array,
    //   default: () => [],
    // },
    // pageOption: {
    //   type: Object,
    //   default: () => ({
    //     page: 1,
    //     size: 0,
    //     total: 0,
    //   }),
    // },
  },
  methods: {
    // handleCurrentChange(page: number) {
    //   this.$emit('handleCurrentChange', page)
    // },
  },
})
</script>
