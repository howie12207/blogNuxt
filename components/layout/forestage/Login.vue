<template>
  <div class="dark:bg-gray-300" @keyup.enter="submit">
    <div class="flex mb-8">
      <span
        v-for="(item, index) of tabs"
        :key="index"
        :class="[
          'w-1/2',
          'p-2',
          'text-center',
          'inline-block',
          'bg-gray-300',
          'transition-all',
          'hover:opacity-70',
          { 'bg-green-500': tab === index },
          { 'text-white': tab === index },
          'cursor-pointer',
          'dark:bg-gray-600',
          { 'dark:bg-green-900': tab === index },
        ]"
        @click="tabHandler(index)"
        >{{ item }}</span
      >
    </div>
    <section class="py-4 px-8">
      <CommonBaseInput
        ref="accountInput"
        :key="`account${tab}`"
        v-model="account.value"
        label="帳號"
        :is-valid.sync="account.isValid"
        :rules="account.rules"
      />
      <CommonBaseInput
        :key="`password${tab}`"
        v-model="password.value"
        label="密碼"
        type="password"
        :is-valid.sync="password.isValid"
        :rules="password.rules"
        @onKeyup="confirmPasswordHandler"
      />
      <template v-if="tab === 1">
        <CommonBaseInput
          :key="`confirmPassword${tab}`"
          v-model="confirmPassword.value"
          label="確認密碼"
          type="password"
          :is-valid.sync="confirmPassword.isValid"
          :rules="confirmPassword.rules"
          :error-message="confirmPassword.errorMessage"
          @onKeyup="confirmPasswordHandler"
          @onBlur="confirmPasswordHandler"
        />
        <CommonBaseInput
          v-model="email.value"
          label="信箱"
          :is-valid.sync="email.isValid"
          :rules="email.rules"
        />
      </template>
      <div class="flex justify-end">
        <span
          :class="[
            'btn',
            tab === 0 ? 'btn-primary' : 'btn-secondary',
            tab === 0 ? 'hover:btn-primary' : 'hover:btn-secondary',
          ]"
          @click="submit"
          >{{ tab === 0 ? '登入' : '註冊' }}</span
        >
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Login',
  data() {
    return {
      tab: 0,
      tabs: ['登入', '註冊'],
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
      confirmPassword: {
        value: '',
        isValid: false,
        rules: {
          min: 6,
          max: 20,
          limit: 'enAndNumber',
        },
        errorMessage: '',
      },
      email: {
        value: '',
        isValid: false,
        rules: {
          limit: 'mail',
        },
      },
    }
  },
  mounted() {
    this.focusAccount()
  },
  methods: {
    focusAccount() {
      setTimeout(() => {
        ;(this as any).$refs.accountInput?.$el.children[1].children[0].children[0].focus()
      }, 16)
    },
    tabHandler(target: number) {
      if (this.tab === target) return
      this.tab = target
      this.reset()
      this.focusAccount()
    },
    submit() {
      const loginValid = this.account.isValid && this.password.isValid
      const registerValid =
        this.account.isValid &&
        this.password.isValid &&
        this.confirmPassword.isValid &&
        this.email.isValid
      if (
        (this.tab === 0 && !loginValid) ||
        (this.tab === 1 && !registerValid)
      ) {
        this.$message.error('請填寫正確信息')
        return
      }
      if (this.tab === 0) {
        this.$emit('login', {
          account: this.account.value,
          password: this.password.value,
        })
      } else {
        this.$emit('register', {
          account: this.account.value,
          password: this.password.value,
          email: this.email.value,
        })
      }
    },
    reset() {
      this.account.value = ''
      this.account.isValid = false
      this.password.value = ''
      this.password.isValid = false
      this.confirmPassword.value = ''
      this.confirmPassword.isValid = false
      this.email.value = ''
      this.email.isValid = false
    },
    confirmPasswordHandler() {
      if (this.password.value !== this.confirmPassword.value) {
        this.confirmPassword.errorMessage = '密碼不一致'
      } else {
        this.confirmPassword.errorMessage = ''
        this.confirmPassword.isValid = true
      }
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep .base_input {
  .right {
    flex-grow: 1;
  }
}
</style>
