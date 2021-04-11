<template>
  <div class="article p-10">
    <CommonBreadcrumbs class="mb-4" :nav="nav" />
    <div class="flex justify-between text-xs text-gray-400">
      <div>
        建立時間：
        {{ $format.toDateTime(article.createTime) }}
      </div>
      <div>
        最近一次更新時間：
        {{ $format.toDateTime(article.updateTime) }}
      </div>
    </div>
    <div class="text-3xl my-8 text-red-700 font-black">
      {{ article.name }}
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="content" v-html="article.content"></div>
    <div class="mt-12 text-gray-500">
      <span v-for="(item, index) in article.sorts" :key="index" class="mr-2"
        >#{{ item }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ArticlePage',
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    nav() {
      return [
        { title: '首頁', route: '/' },
        { title: (this as any).article?.name, route: '' },
      ]
    },
  },
})
</script>
