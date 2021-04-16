<template>
  <div class="flex">
    <LayoutBackstageLeftBar class="bg-gray-100 border-r flex-shrink-0" />
    <div class="flex-1 w-1/2">
      <LayoutBackstageHeader class="bg-gray-100 border-b" />
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
})
</script>
