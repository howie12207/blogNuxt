<template>
  <i :style="style" class="icon_info"></i>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'IconInfo',
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
        '--infoColor': this.mainColor,
        '--infoBorderColor': this.borderColor,
        '--infoBgColor': this.bgColor,
        '--infoSize': `${this.size}px`,
      }
    },
  },
})
</script>

<style scoped>
.icon_info {
  display: inline-block;
  position: relative;
  width: var(--infoSize);
  height: var(--infoSize);
  border: 2px solid var(--infoBorderColor);
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--infoBgColor);
}
.icon_info::after,
.icon_info::before {
  content: '';
  position: absolute;
  box-sizing: border-box;
  border-radius: 3px;
  width: calc(2 / 20 * var(--infoSize));
  background: var(--infoColor);
  left: calc(var(--infoSize) / 2 - 2px - 2 / 20 * var(--infoSize) / 2);
}
.icon_info::after {
  bottom: calc(2 / 20 * var(--infoSize));
  height: calc(8 / 20 * var(--infoSize));
}
.icon_info::before {
  height: calc(2 / 20 * var(--infoSize));
  top: calc(2 / 20 * var(--infoSize));
}
</style>
