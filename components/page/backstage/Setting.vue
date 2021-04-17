<template>
  <div class="p-8">
    <CommonBaseInput
      v-model="oldPassword.value"
      label="密碼"
      placeholder="請輸入舊密碼"
      type="password"
      :is-valid.sync="oldPassword.isValid"
      :rules="oldPassword.rules"
    />
    <CommonBaseInput
      v-model="newPassword.value"
      label="新密碼"
      placeholder="請輸入新密碼"
      type="password"
      :is-valid.sync="newPassword.isValid"
      :rules="newPassword.rules"
      @onKeyup="confirmPasswordHandler"
    />
    <CommonBaseInput
      v-model="confirmPassword.value"
      label="確認新密碼"
      placeholder="請再次輸入新密碼"
      type="password"
      :is-valid.sync="confirmPassword.isValid"
      :rules="confirmPassword.rules"
      :error-message="confirmPassword.errorMessage"
      @onKeyup="confirmPasswordHandler"
      @onBlur="confirmPasswordHandler"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackstageSettingPage',
  data() {
    return {
      oldPassword: {
        value: '',
        isValid: false,
        rules: { min: 6, max: 20, limit: 'enAndNumber' },
      },
      newPassword: {
        value: '',
        isValid: false,
        rules: { min: 6, max: 20, limit: 'enAndNumber' },
      },
      confirmPassword: {
        value: '',
        isValid: false,
        rules: { min: 6, max: 20, limit: 'enAndNumber' },
        errorMessage: '',
      },
    }
  },
  methods: {
    confirmPasswordHandler() {
      if (this.newPassword.value !== this.confirmPassword.value) {
        this.confirmPassword.errorMessage = '密碼不一致'
      } else {
        this.confirmPassword.errorMessage = ''
        this.confirmPassword.isValid = true
      }
    },
  },
})
</script>
