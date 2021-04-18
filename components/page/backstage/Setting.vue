<template>
  <div class="p-4 m-4 card">
    <CommonBaseInput
      ref="oldPassword"
      v-model="oldPassword.value"
      label="密碼"
      placeholder="請輸入舊密碼"
      type="password"
      :is-valid.sync="oldPassword.isValid"
      :rules="oldPassword.rules"
    />
    <CommonBaseInput
      ref="newPassword"
      v-model="newPassword.value"
      label="新密碼"
      placeholder="請輸入新密碼"
      type="password"
      :is-valid.sync="newPassword.isValid"
      :rules="newPassword.rules"
      @onKeyup="confirmPasswordHandler"
    />
    <CommonBaseInput
      ref="confirmPassword"
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
    <div>
      <span class="btn btn-primary mx-4" @click="updatePassword">確認修改</span>
      <span class="btn btn-secondary mx-4" @click="cancel">取消</span>
    </div>
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
  computed: {
    isValid(): boolean {
      return (
        this.oldPassword.isValid &&
        this.newPassword.isValid &&
        this.confirmPassword.isValid
      )
    },
  },
  methods: {
    updatePassword() {
      if (!this.isValid) {
        this.$message.error('請填入正確信息')
        return
      }
      const params = {
        account: this.$store.state.user.info.account,
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value,
      }
      this.$emit('updatePassword', params)
    },
    cancel() {
      ;(this as any).$refs.oldPassword.clear()
      ;(this as any).$refs.newPassword.clear()
      ;(this as any).$refs.confirmPassword.clear()
    },
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
