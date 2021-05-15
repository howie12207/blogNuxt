<template>
  <div :class="[{ dark: $store.state.darkMode }, 'backstage', 'flex']">
    <LayoutBackstageLeftBar
      class="hidden lg:block border-r flex-shrink-0 dark:border-gray-400"
    />
    <div class="flex-1 w-1/2 min-h-screen">
      <LayoutBackstageHeader class="border-b dark:border-gray-400" />
      <Nuxt />
    </div>
    <transition name="fade">
      <CommonPageLoading v-if="$store.state.pageLoading" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageLayout',
  mounted() {
    this.$store.commit('SET_DARK_MODE')
  },
})
</script>

<style scoped>
.backstage {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.dark.backstage {
  background-image: linear-gradient(
    94.3deg,
    rgba(26, 33, 64, 1) 10.9%,
    rgba(81, 84, 115, 1) 87.1%
  );
}
.main_container {
  min-height: 100vh;
}
</style>
