<template>
  <i :style="style" class="icon_warning"></i>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'IconWarning',
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
      default: 32,
    },
  },
  computed: {
    style() {
      return {
        '--warningColor': this.mainColor,
        '--warningBorderColor': this.borderColor,
        '--warningBgColor': this.bgColor,
        '--warningSize': `${this.size}px`,
      }
    },
  },
})
</script>

<style scoped>
.icon_warning {
  display: inline-block;
  position: relative;
  width: var(--warningSize);
  height: var(--warningSize);
  border: 2px solid var(--warningBorderColor);
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--warningBgColor);
}
.icon_warning::after,
.icon_warning::before {
  content: '';
  position: absolute;
  box-sizing: border-box;
  border-radius: 3px;
  width: calc(2 / 20 * var(--warningSize));
  background: var(--warningColor);
  left: calc(var(--warningSize) / 2 - 2px - 2 / 20 * var(--warningSize) / 2);
}
.icon_warning::after {
  top: calc(2 / 20 * var(--warningSize));
  height: calc(8 / 20 * var(--warningSize));
}
.icon_warning::before {
  height: calc(2 / 20 * var(--warningSize));
  bottom: calc(2 / 20 * var(--warningSize));
}
</style>
