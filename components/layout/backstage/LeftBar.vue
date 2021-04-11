<template>
  <nav class="w-40 py-10 min-h-screen bg-gray-200">
    <nuxt-link
      v-for="(item, index) in menu"
      :key="index"
      :to="item.route"
      class="block text-red-700 p-2"
      @click.native="menuHandle(item.title)"
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
        { title: '前台', route: '/' },
        { title: '登出', route: '/' },
      ],
    }
  },
  methods: {
    menuHandle(target: string) {
      if (target !== '登出') return
      ;(this as any).$cookies.remove('account')
      ;(this as any).$cookies.remove('password')
      this.$store.commit('user/SET_USER', false)
      this.$message.success('已登出')
    },
  },
})
</script>
