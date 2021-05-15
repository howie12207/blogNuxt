<template>
  <transition name="fade">
    <div v-if="show" :style="style" class="sidebar_mask" @click="closeHandle">
      <div :class="['sidebar_content', location]">
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
  name: 'Sidebar',
  components: { IconX },
  props: {
    closeOut: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '240px',
    },
    closeBtn: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      default: 'left',
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
        '--sidebarWidth': this.width,
      }
    },
  },
  mounted() {
    this.show = true
  },
  methods: {
    closeHandle(e) {
      if (!this.closeOut) return
      if (e.target.className.includes('sidebar_mask')) this.close()
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
.sidebar_mask {
  --xColor: #ef4444;
  --xSize: 1;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 41, 55, 0.7);
  z-index: 101;
  box-sizing: border-box;
}
.sidebar_mask .sidebar_content {
  width: var(--sidebarWidth);
  max-width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  overflow: auto;
  background-color: #f3f4f6;
}

.sidebar_mask .sidebar_content.left {
  left: 0;
  animation: move-left 0.5s;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.sidebar_mask .sidebar_content.right {
  right: 0;
  animation: move-right 0.5s;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.sidebar_mask .sidebar_content.left .icon_x {
  position: absolute;
  z-index: 102;
  top: 4px;
  right: 4px;
}

.sidebar_mask .sidebar_content.right .icon_x {
  position: absolute;
  z-index: 102;
  top: 4px;
  left: 4px;
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
@keyframes move-left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes move-right {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
