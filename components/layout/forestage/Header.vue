<template>
  <header
    class="fixed z-10 w-full bg-gray-600 h-14 flex justify-end items-center"
  >
    <div class="btn btn-primary hover:btn-primary" @click="popup('login')">
      <i class="el-icon-user icon"></i> 登入
    </div>
    <CommonPopup v-if="popupTarget === 'login'" @close="closePopup">
      <template #content>
        <LayoutForstageLogin v-on="$listeners" />
      </template>
    </CommonPopup>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ForestageHeader',
  data() {
    return {
      popupTarget: '',
    }
  },
  methods: {
    popup(target: string) {
      this.popupTarget = target
      // this.$message.success('123')
    },
    closePopup() {
      this.popupTarget = ''
    },
    register() {},
  },
})
</script>
