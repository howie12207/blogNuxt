<template>
  <nav class="breadcrumbs">
    <i class="el-icon-s-home"></i>
    <nuxt-link
      v-for="(item, index) in nav"
      :key="index"
      class="link"
      :to="item.route"
      >{{ item.title }}</nuxt-link
    >
  </nav>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Breadcrumbs',
  props: {
    nav: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  .link {
    color: #ef4444;
    transition: 0.4s;
    font-weight: 600;
    & + .link {
      position: relative;
      margin-left: 24px;
      &::before {
        content: '-';
        position: relative;
        left: -12px;
      }
    }
    &:not(:last-child):hover {
      color: #b91c1c;
    }
    &:last-child:hover {
      cursor: initial;
    }
  }
}
</style>
