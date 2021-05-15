<template>
  <div
    :class="[
      { dark: $store.state.darkMode },
      'fore_stage',
      'pb-4',
      'min-h-screen',
      'bg-fixed',
      'bg-no-repeat',
      'bg-cover',
      'overflow-hidden',
    ]"
  >
    <div class="h-14">
      <LayoutForestageHeader />
    </div>
    <Nuxt class="m-auto" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Default',
  mounted() {
    this.$store.commit('SET_DARK_MODE')
  },
})
</script>

<style lang="scss" scoped>
.fore_stage {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.dark.fore_stage {
  background-image: linear-gradient(
    94.3deg,
    rgba(26, 33, 64, 1) 10.9%,
    rgba(81, 84, 115, 1) 87.1%
  );
}
</style>
