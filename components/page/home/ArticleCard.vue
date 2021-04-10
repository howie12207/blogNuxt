<!-- eslint-disable vue/no-v-html -->
<template>
  <article class="mt-4 mb-12">
    <div class="text-right text-xs mb-2">
      <!-- {{ $timeFormat.formatDate(article.createTime) }} -->
    </div>
    <div class="text-3xl mb-2 text-red-700 font-black">
      {{ article.title }}
    </div>
    <div
      class="content overflow-hidden overflow-ellipsis max-h-40"
      v-html="article.content"
    ></div>
    <nuxt-link
      :to="`/article/${article.id}`"
      class="text-red-400 underline inline-block my-1"
      >閱讀全文..</nuxt-link
    >
    <div class="text-gray-500">
      <span v-for="(item, index) in article.sorts" :key="index" class="mr-2"
        >#{{ item }}</span
      >
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>

<style scoped>
.content {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
