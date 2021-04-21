<template>
  <header
    class="fixed z-10 w-full bg-gray-600 bg-opacity-90 h-14 flex justify-end items-center"
  >
    <el-dropdown
      v-if="$store.state.user.login"
      class="mr-4"
      @command="handleMenu"
    >
      <span class="text-gray-200 cursor-default"
        >Hi, {{ $store.state.user.info.account }}</span
      >
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-if="isAdmin"
          icon="el-icon-s-data"
          command="backstage"
          >後台</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-switch-button" command="logout"
          >登出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <template v-else>
      <span
        class="btn btn-primary hover:btn-primary mr-4"
        @click="popup('login')"
      >
        <i class="el-icon-user icon"></i> 登入 / 註冊
      </span>
    </template>

    <transition name="fade">
      <CommonPopup v-if="popupTarget" width="400px" @close="closePopup">
        <template #content>
          <LayoutForestageLogin
            v-if="popupTarget === 'login'"
            class="p-12"
            @login="login"
            @register="register"
          />
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
  computed: {
    isAdmin(): Boolean {
      return this.$store.state.user?.info.roleId === 0
    },
  },
  methods: {
    handleMenu(target: string) {
      if (target === 'backstage') {
        this.$router.push('/backstage/manageArticle')
      } else {
        this.logout()
      }
    },
    async login(params: object) {
      const res = await this.$store.dispatch('user/LOGIN', params)
      if (res) {
        this.closePopup()
        this.$message.success('登入成功')
      }
    },
    async register(params: object) {
      const res = await this.$store.dispatch('user/REGISTER', params)
      if (res) {
        this.closePopup()
        this.$message.success('註冊成功')
      }
    },
    logout() {
      this.$store.commit('user/SET_USER', false)
      this.$store.commit('user/SET_USER_INFO', null)
      ;(this as any).$cookies.remove('access', { path: '*' })
      this.$message.success('已登出')
    },
    popup(target: string) {
      this.popupTarget = target
    },
    closePopup() {
      this.popupTarget = ''
    },
  },
})
</script>
