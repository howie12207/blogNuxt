<template>
  <div>
    <div class="h-16 flex items-center justify-end">
      <!-- <div
        :class="['nav_icon', { active: leftBarOpen }]"
        @click="leftBarHandler"
      >
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
      </div> -->
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageHeader',
  data() {
    return {
      leftBarOpen: false,
    }
  },
  methods: {
    leftBarHandler() {
      this.leftBarOpen = !this.leftBarOpen
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
    logout() {
      this.$router.push('/')
      this.$store.commit('user/SET_USER', false)
      this.$store.commit('user/SET_USER_INFO', null)
      ;(this as any).$cookies.remove('access', { path: '/' })
      this.$message.success('已登出')
    },
  },
})
</script>

<style lang="scss" scoped>
.nav_icon {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 16px;
  .line {
    width: 24px;
    border-radius: 4px;
    border: 2px solid #3b82f6;
    background: #3b82f6;
    transition: 0.4s;
    margin-bottom: 4px;
  }
  &.active {
    .line1 {
      transform: translateY(8px) rotate(45deg);
    }
    .line2 {
      opacity: 0;
      transform: translateX(-100%);
    }
    .line3 {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
}
</style>
