<template>
  <nav class="w-40 py-10 min-h-screen bg-gray-200">
    <nuxt-link
      v-for="item in menu"
      :key="item.route"
      :to="item.route"
      class="block text-red-700 p-2"
    >
      {{ item.title }}
    </nuxt-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageLeftBar',
  data() {
    return {
      menu: [
        { title: '新增文章', route: '/backstage/createArticle' },
        { title: '管理文章', route: '/backstage/manageArticle' },
        { title: '管理分類', route: '/backstage/manageSort' },
      ],
    }
  },
  methods: {},
})
</script>
