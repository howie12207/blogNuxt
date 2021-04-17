<template>
  <div class="popup_mask">
    <div class="popup_content" :style="{ width }">
      <slot name="content" :closePopupEvent="closePopup"></slot>
      <div v-if="closeBtn" class="x_icon" @click="closePopup"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Popup',
  props: {
    width: {
      type: String,
      default: '600px',
    },
    closeBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
  },
})
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.popup_mask {
  --xColor: #ef4444;
  --xSize: 1;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 41, 55, 0.7);
  z-index: 101;
  .popup_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    min-height: 50px;
    max-height: 90%;
    overflow: auto;
    background-color: #f3f4f6;
    border-radius: 5px;
    .x_icon {
      position: absolute;
      z-index: 102;
      top: 8px;
      right: 8px;
      display: inline-block;
      transform: scale(var(--xSize));
      width: 22px;
      height: 22px;
      border: 2px solid var(--xColor);
      border-radius: 50%;
      cursor: pointer;
      transition: 0.3s;
      &::after,
      &::before {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 12px;
        height: 2px;
        background: var(--xColor);
        transform: rotate(45deg);
        border-radius: 5px;
        top: 8px;
        left: 3px;
        transition: 0.3s;
      }
      &::after {
        transform: rotate(-45deg);
      }
      &:hover {
        background-color: var(--xColor);
        &::after,
        &::before {
          background: #fff;
        }
      }
    }
  }
}
@keyframes show {
  0% {
    opacity: 0;
    top: -50%;
  }
  60% {
    top: 50%;
  }
  75% {
    top: 48%;
  }
  80% {
    top: 48%;
  }
  100% {
    top: 50%;
    opacity: 1;
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    top: 50%;
  }

  100% {
    opacity: 0;
    top: -50%;
  }
}
</style>
