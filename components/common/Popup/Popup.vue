<template>
  <transition name="fade">
    <div v-if="show" :style="style" class="popup_mask" @click="closeHandle">
      <div :class="['popup_content']">
        <slot :closeEvent="close"></slot>
        <IconX v-if="closeBtn" pointer @click.native="close" />
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import IconX from './IconX'

export default Vue.extend({
  name: 'Popup',
  components: { IconX },
  props: {
    closeOut: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '600px',
    },
    closeBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    style() {
      return {
        '--popupWidth': this.width,
      }
    },
  },
  mounted() {
    this.show = true
  },
  methods: {
    closeHandle(e) {
      if (!this.closeOut) return
      if (e.target.className.includes('popup_mask')) this.close()
    },
    close() {
      this.$emit('close')
    },
  },
})
</script>

<style scoped>
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
}
.popup_mask .popup_content {
  width: var(--popupWidth);
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  padding: 24px;
  min-height: 50px;
  max-height: 90%;
  overflow: auto;
  background-color: #f3f4f6;
  border-radius: 5px;
  animation: move-down 0.5s;
}

.popup_mask .popup_content .icon_x {
  position: absolute;
  z-index: 102;
  top: 8px;
  right: 8px;
}
.fade-enter-active {
  animation: fade 0.3s ease forwards;
}
.fade-leave-active {
  animation: fade 0.3s ease forwards reverse;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes move-down {
  0% {
    top: -100%;
  }
  50% {
    top: 50%;
  }
  60% {
    top: 47%;
  }
  80% {
    top: 50%;
  }
  90% {
    top: 49%;
  }
  100% {
    top: 50%;
  }
}
</style>
