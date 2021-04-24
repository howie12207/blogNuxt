<!-- eslint-disable vue/no-v-html -->
<template>
  <article
    class="text-xs lg:text-sm shadow-xl bg-red-50 rounded p-4 mt-4 mb-12"
  >
    <div class="text-right text-xs mb-2">
      {{ $format.toDate(article.createTime) }}
    </div>
    <div class="text-xl mb-2 text-red-700 font-black">
      {{ article.name }}
    </div>
    <div
      class="content overflow-hidden overflow-ellipsis max-h-40"
      v-html="article.content"
    ></div>
    <nuxt-link
      :to="`/article/${article._id}`"
      class="block text-red-400 text-right underline my-1 ml-auto w-max"
      >閱讀全文..</nuxt-link
    >
    <div class="text-gray-500 text-xs">
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

<style lang="scss" scoped>
.content {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
