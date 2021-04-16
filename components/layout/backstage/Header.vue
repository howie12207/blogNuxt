<template>
  <div class="h-12 flex items-center justify-end">
    <span>Hi, {{ $store.state.user.info.account }}</span>
    <nuxt-link to="/" class="btn btn-primary hover:btn-primary mx-4"
      >前台</nuxt-link
    >
    <span class="btn btn-secondary hover:btn-secondary mr-4" @click="logout"
      >登出</span
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageHeader',
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.commit('user/SET_USER', false)
      this.$store.commit('user/SET_USER_INFO', null)
      this.$message.success('已登出')
    },
  },
})
</script>
