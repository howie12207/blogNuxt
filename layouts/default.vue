<template>
  <div class="fore_stage">
    <LayoutForestageHeader @login="login" @register="register" />
    <div class="flex m-auto max-w-7xl pt-14">
      <Nuxt class="forestage_bottom" />
      <LayoutForestageRightBar />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    login() {
      //   try {
      //     await this.$store.dispatch('login', params)
      //     this.$router.push('/backstage')
      //   } catch (err) {
      //     this.$message.error(err.message)
      //   }
    },
    register() {},
  },
})
</script>
