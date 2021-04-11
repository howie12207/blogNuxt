<template>
  <div @keyup.enter="login">
    <CommonBaseInput
      ref="accountInput"
      v-model="account.value"
      label="帳號"
      :is-valid.sync="account.isValid"
      :rules="account.rules"
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
      <!-- <div class="btn btn-secondary hover:btn-secondary" @click="register">
        註冊
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Login',
  data() {
    return {
      account: {
        value: '',
        isValid: false,
        rules: {
          min: 6,
          max: 20,
          limit: 'enAndNumber',
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
  mounted() {
    setTimeout(() => {
      ;(this as any).$refs.accountInput?.$el.children[1].children[0].children[0].focus()
    }, 16)
  },
  methods: {
    login() {
      if (!this.account.isValid || !this.password.isValid) {
        this.$message.error('請填寫正確信息')
        return
      }
      this.$emit('login', {
        account: this.account.value,
        password: this.password.value,
      })
    },
  },
})
</script>
