<template>
  <div class="flex">
    <LayoutBackstageLeftBar class="flex-shrink-0" />
    <Nuxt />
    <transition name="fade">
      <CommonPageLoading v-if="$store.state.pageLoading" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageLayout',
})
</script>
