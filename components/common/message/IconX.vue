<template>
  <div :style="style" :class="['icon_x', { pointer }]"></div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'IconX',
  props: {
    mainColor: {
      type: String,
      default: 'currentColor',
    },
    borderColor: {
      type: String,
      default: 'transparent',
    },
    bgColor: {
      type: String,
      default: 'transparent',
    },
    size: {
      type: Number,
      default: 24,
    },
    pointer: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    style() {
      return {
        '--xColor': this.mainColor,
        '--xBorderColor': this.borderColor,
        '--xBgColor': this.bgColor,
        '--xSize': `${this.size}px`,
      }
    },
  },
})
</script>

<style scoped>
.icon_x {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: var(--xSize);
  height: var(--xSize);
  border: 2px solid var(--xBorderColor);
  border-radius: 50%;
  background-color: var(--xBgColor);
}
.icon_x::after,
.icon_x::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  width: calc(var(--xSize) - 10px);
  height: 2px;
  background: var(--xColor);
  transform: rotate(45deg);
  border-radius: 5px;
  top: calc(var(--xSize) / 2 - 3px);
  left: 3px;
}
.icon_x::after {
  transform: rotate(-45deg);
}
.icon_x.pointer {
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.7;
}
.icon_x.pointer:hover {
  opacity: 1;
}
</style>
