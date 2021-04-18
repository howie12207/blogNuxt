<template>
  <div class="h-12 flex items-center justify-end">
    <el-dropdown class="mr-4" @command="handleMenu">
      <span v-if="$store.state.user.info" class="cursor-default"
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
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageHeader',
  data() {
    return {}
  },
  methods: {
    handleMenu(target: string) {
      if (target === 'setting') {
        this.$router.push('/backstage/setting')
      } else if (target === 'forestage') {
        this.$router.push('/')
      } else {
        this.logout()
      }
    },
    logout() {
      this.$router.push('/')
      this.$store.commit('user/SET_USER', false)
      this.$store.commit('user/SET_USER_INFO', null)
      ;(this as any).$cookies.remove('access', { path: '*' })
      this.$message.success('已登出')
    },
  },
})
</script>
