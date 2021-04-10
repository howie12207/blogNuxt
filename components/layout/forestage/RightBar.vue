<template>
  <aside class="w-60 text-sm">
    <div class="about">
      <div class="pl-4 relative title">About me</div>
      <div class="">
        <img src="" alt="" class="img" />
      </div>
      <div class=""></div>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ForestageRightBar',
  data() {
    return {}
  },
  methods: {},
})
</script>

<style scoped>
.title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #7f1d1d;
}
</style>
