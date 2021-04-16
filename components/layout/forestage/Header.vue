<template>
  <header
    class="fixed z-10 w-full bg-gray-600 h-14 flex justify-end items-center"
  >
    <div v-if="$store.state.user.login">
      Hi, {{ $store.state.user.info.account }}
      <nuxt-link
        to="/backstage/manageArticle"
        class="btn btn-primary hover:btn-primary mx-4"
        >後台</nuxt-link
      >
      <span class="btn btn-secondary hover:btn-secondary mr-4" @click="logout"
        >登出</span
      >
    </div>
    <div
      v-else
      class="btn btn-primary hover:btn-primary mr-4"
      @click="popup('login')"
    >
      <i class="el-icon-user icon"></i> 登入
    </div>
    <transition name="fade">
      <CommonPopup
        v-if="popupTarget === 'login'"
        width="400px"
        @close="closePopup"
      >
        <template #content>
          <LayoutForestageLogin class="p-12" v-on="$listeners" @login="login" />
        </template> </CommonPopup
    ></transition>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ForestageHeader',
  data() {
    return {
      popupTarget: '',
    }
  },
  methods: {
    popup(target: string) {
      this.popupTarget = target
    },
    closePopup() {
      this.popupTarget = ''
    },
    async login(params: object) {
      const res = await this.$store.dispatch('user/LOGIN', params)
      if (res) {
        this.$router.push('/backstage/manageArticle')
        this.$message.success('登入成功')
      }
    },
    logout() {
      this.$store.commit('user/SET_USER', false)
      this.$store.commit('user/SET_USER_INFO', null)
      this.$message.success('已登出')
    },
  },
})
</script>
