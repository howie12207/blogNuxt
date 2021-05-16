<template>
  <nav class="w-40 pb-10 px-4 min-h-screen z-10 box-border">
    <img class="w-12 mx-auto mb-2" src="../img/logo.png" alt="logo" />
    <nuxt-link
      v-for="(item, index) in menu"
      :key="index"
      :to="item.route"
      class="block text-gray-700 p-2 rounded hover:bg-gray-200 active:bg-gray-200 dark:hover:bg-gray-500 dark:text-gray-200"
      @click.native="routeTo(item.route)"
    >
      <i :class="[item.icon, 'text-blue-400']"></i>
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
        {
          title: '新增文章',
          route: '/backstage/createArticle',
          icon: 'el-icon-edit',
        },
        {
          title: '管理文章',
          route: '/backstage/manageArticle',
          icon: 'el-icon-tickets',
        },
        {
          title: '管理留言',
          route: '/backstage/manageComment',
          icon: 'el-icon-edit-outline',
        },
        {
          title: '管理分類',
          route: '/backstage/manageSort',
          icon: 'el-icon-s-grid',
        },
        {
          title: '會員列表',
          route: '/backstage/memberList',
          icon: 'el-icon-s-custom',
        },
      ],
    }
  },
  methods: {
    routeTo(route: string) {
      this.$emit('routeTo', route)
    },
  },
})
</script>

<style lang="scss" scoped>
.nuxt-link-active {
  background-color: rgba(229, 231, 235, 1);
  color: #3b82f6;
}
</style>
