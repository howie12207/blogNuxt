<template>
  <div>
    <CommonBaseInput
      v-model="mail.value"
      label="電子信箱"
      :is-valid.sync="mail.isValid"
      :rules="mail.rules"
    />
    <CommonBaseInput
      v-model="password.value"
      label="密碼"
      type="password"
      :is-valid.sync="password.isValid"
      :rules="password.rules"
    />
    <div class="flex justify-evenly">
      <div class="btn btn-primary hover:btn-primary" @click="login">登入</div>
      <div class="btn btn-secondary hover:btn-secondary" @click="register">
        註冊
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Login',
  data() {
    return {
      mail: {
        value: '',
        isValid: false,
        rules: {
          limit: 'mail',
        },
      },
      password: {
        value: '',
        isValid: false,
        rules: {
          min: 6,
          max: 20,
          limit: 'enAndNumber',
        },
      },
    }
  },
  created() {
    if (process.client) {
      // this.$message.success('123');
    }
  },
  methods: {
    login() {
      if (!this.mail.isValid || !this.password.isValid) {
        // this.$message.error('請填寫正確信息')
        return
      }
      this.$emit('login', {
        mail: this.mail.value,
        password: this.password.value,
      })
    },
    register() {
      this.$emit('register')
    },
  },
})
</script>
