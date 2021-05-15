<template>
  <div>
    <div class="h-16 flex items-center justify-end">
      <CommonIconMenu
        v-show="windowWidth <= 1008"
        v-model="leftbarOpen"
        main-color="#3b82f6"
        class="mr-auto ml-4"
      />
      <CommonSwitchBtn
        v-model="darkMode"
        left-label="深色"
        class="mr-8 dark:text-red-100"
        :width="56"
        :height="24"
        @input="changeMode"
      />
      <el-dropdown class="mr-4" @command="handleMenu">
        <span
          v-if="$store.state.user.info"
          class="cursor-default dark:text-red-100"
          >Hi, {{ $store.state.user.info.account }}</span
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-setting" command="setting"
            >設定</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-s-home" command="forestage"
            >前台</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" command="logout"
            >登出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <CommonSidebar v-if="leftbarOpen" width="180px" @close="closeMenu">
      <LayoutBackstageLeftBar class="leftbar" @routeTo="closeMenu" />
    </CommonSidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageHeader',
  data() {
    return {
      leftbarOpen: false,
      darkMode: this.$store.state.darkMode,
      windowWidth: 0,
    }
  },
  mounted() {
    this.windowWidth = document.body.offsetWidth
    addEventListener('resize', this.resize)
  },

  beforeDestroy() {
    removeEventListener('resize', this.resize)
  },
  methods: {
    leftbarHandle(status: boolean) {
      this.leftbarOpen = status
    },
    handleMenu(target: string) {
      if (target === 'setting') {
        this.$router.push('/backstage/setting')
      } else if (target === 'forestage') {
        this.$router.push('/')
      } else {
        this.logout()
      }
    },
    changeMode(darkMode: boolean) {
      localStorage.setItem('darkMode', String(darkMode))
      this.$store.commit('SET_DARK_MODE')
    },
    logout() {
      this.$router.push('/')
      this.$store.commit('user/SET_USER', false)
      this.$store.commit('user/SET_USER_INFO', null)
      ;(this as any).$cookies.remove('access', { path: '/' })
      this.$message.success('已登出')
    },
    resize() {
      this.windowWidth = document.body.offsetWidth
    },
    closeMenu() {
      this.leftbarOpen = false
    },
  },
})
</script>

<style scoped>
::v-deep .sidebar_mask .sidebar_content {
  background-color: #666 !important;
}
.leftbar {
  min-height: fit-content;
}
</style>
