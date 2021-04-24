<template>
  <div
    class="fore_stage pb-4 bg-yellow-50 min-h-screen bg-fixed bg-no-repeat bg-cover"
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
})
</script>

<style lang="scss" scoped>
.fore_stage {
  background-image: url('./img/bg.jpg');
}
</style>
