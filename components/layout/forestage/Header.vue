<template>
  <header
    class="fixed z-10 w-full bg-gray-600 h-14 flex justify-end items-center"
  >
    <div class="btn btn-primary hover:btn-primary mr-4" @click="loginHandle">
      <i class="el-icon-user icon"></i> 後台
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
    loginHandle() {
      if (this.$store.state.user.login) {
        this.$router.push('/backstage/manageArticle')
        return
      }
      this.popup('login')
    },
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
  },
})
</script>
