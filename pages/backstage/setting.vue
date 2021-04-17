<template>
  <PageBackstageSetting ref="setting" @updatePassword="updatePassword" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Backstage',
  layout: 'backstage',
  methods: {
    async updatePassword(params: object) {
      const res = await this.$store.dispatch('user/UPDATE_PASSWORD', params)
      if (res) {
        this.$message.success('修改成功')
        ;(this as any).$refs.setting.cancel()
      }
    },
  },
})
</script>
