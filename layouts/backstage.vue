<template>
  <div class="flex">
    <LayoutBackstageLeftBar class="flex-shrink-0" />
    <Nuxt />
    <transition name="fade">
      <CommonPageLoading v-if="$store.state.pageLoading" />
    </transition>
  </div>
</template>
