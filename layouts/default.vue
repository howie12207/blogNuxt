<template>
  <div class="fore_stage bg-yellow-50 min-h-screen">
    <LayoutForestageHeader />
    <div class="flex m-auto max-w-7xl pt-14">
      <Nuxt class="forestage_bottom" />
      <!-- <LayoutForestageRightBar /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Default',
})
</script>
