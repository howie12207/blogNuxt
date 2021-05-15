<template>
  <i :style="style" class="icon_check"></i>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'IconCheck',
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
      default: 44,
    },
  },
  computed: {
    style() {
      return {
        '--checkColor': this.mainColor,
        '--checkBorderColor': this.borderColor,
        '--checkBgColor': this.bgColor,
        '--checkSize': `${this.size}px`,
        '--checkBorder': `${(2 / 22) * this.size}px`,
        '--checkLeft': `${(4 / 22) * this.size}px`,
        '--checkTop': `-${(1 / 22) * this.size}px`,
        '--checkWidth': `${(6 / 22) * this.size}px`,
        '--checkHeight': `${(10 / 22) * this.size}px`,
      }
    },
  },
})
</script>

<style scoped>
.icon_check {
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: var(--checkSize);
  height: var(--checkSize);
  border: var(--checkBorder) solid var(--checkBorderColor);
  border-radius: 50%;
  background-color: var(--checkBgColor);
}
.icon_check::after {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: var(--checkLeft);
  top: var(--checkTop);
  width: var(--checkWidth);
  height: var(--checkHeight);
  border-width: 0 var(--checkBorder) var(--checkBorder) 0;
  border-style: solid;
  border-color: var(--checkColor);
  transform-origin: bottom left;
  transform: rotate(45deg);
}
</style>
