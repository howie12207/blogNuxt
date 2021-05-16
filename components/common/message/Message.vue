<template>
  <transition name="message_fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="[
        'base_message',
        `base_message_${type}`,
        showClose ? 'closable' : '',
        customClass,
      ]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <IconCheck
        v-if="type === 'success'"
        class="icon_tips"
        main-color="#fff"
        bg-color="#059669"
        :size="18"
      />
      <IconX
        v-else-if="type === 'error'"
        class="icon_tips"
        main-color="#fff"
        bg-color="#f00"
        :size="18"
      />
      <IconWarning
        v-else-if="type === 'warning'"
        class="icon_tips"
        main-color="#fff"
        bg-color="#B45309"
        :size="18"
      />
      <IconInfo
        v-else-if="type === 'info'"
        class="icon_tips"
        main-color="#fff"
        bg-color="#6B7280"
        :size="18"
      />
      <p class="base_message_content">
        {{ message }}
      </p>
      <IconX
        v-if="showClose"
        class="message_close_btn"
        main-color="#D1D5DB"
        @click.native="close"
      />
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import IconX from './IconX'
import IconCheck from './IconCheck'
import IconWarning from './IconWarning'
import IconInfo from './IconInfo'
export default Vue.extend({
  components: { IconX, IconCheck, IconWarning, IconInfo },
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'success',
      customClass: '',
      onClose: null,
      showClose: true,
      closed: false,
      verticalOffset: 20,
      timer: null,
      center: false,
    }
  },

  computed: {
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      }
    },
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    },
  },
  mounted() {
    this.startTimer()
  },

  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },

    clearTimer() {
      clearTimeout(this.timer)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.base_message {
  min-width: 320px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #d1fae5;
  position: fixed;
  left: 50%;
  top: 24px;
  z-index: 9999;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: #ecfdf5;
  -webkit-transition: opacity 0.3s, top 0.4s, -webkit-transform 0.4s;
  transition: opacity 0.3s, top 0.4s, -webkit-transform 0.4s;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  transition: opacity 0.3s, transform 0.4s, top 0.4s, -webkit-transform 0.4s;
  overflow: hidden;
  padding: 16px 16px 16px 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.base_message_content {
  padding: 0;
  font-size: 14px;
  line-height: 1.2;
}
.base_message_content:focus {
  outline-width: 0;
}
.base_message_success .base_message_content {
  color: #10b981;
}
.base_message_error .base_message_content {
  color: #ef4444;
}
.base_message_warning .base_message_content {
  color: #d97706;
}
.base_message_info .base_message_content {
  color: #6b7280;
}
.base_message.closable .base_message_content {
  padding-right: 16px;
}
.base_message p {
  margin: 0;
}

.base_message_error {
  background-color: #fef0f0;
  border-color: #fee2e2;
}

.base_message_warning {
  background-color: #fef3c7;
  border-color: #fde68a;
}

.base_message_info {
  background-color: #f3f4f6;
  border-color: #e5e7eb;
}

.base_message_icon {
  line-height: 14px;
  margin-right: 8px;
}
.base_message_icon img {
  vertical-align: top;
}

.icon_tips {
  margin-right: 8px;
}

.message_close_btn {
  position: absolute;
  right: 16px;
  cursor: pointer;
}

.message_fade-enter,
.message_fade-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%);
}
</style>
