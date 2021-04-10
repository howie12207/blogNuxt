<template>
  <div :class="['base_input', { multi_line: multiLine }]">
    <div class="left">
      <div class="input_label top">{{ label }}</div>
      <div class="left_bottom bottom"></div>
    </div>
    <div class="right">
      <div :class="['input_block', 'top']">
        <input
          v-model="syncValue"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :upper-case="upperCase"
          :class="[
            'input_content',
            {
              error: blurInput && (!isValid || errorMessage),
            },
            { clear_btn: clearBtn },
          ]"
          @keyup="onKeyup(value)"
          @blur="onBlur(value)"
          @keydown="onKeydown"
        />
        <div
          v-if="clearBtn && clearBtnShow"
          class="x_icon"
          @click="clear"
        ></div>
      </div>
      <div class="error_message bottom">
        <div v-if="blurInput && !isValid && !errorMessage" class="error">
          <span v-if="rules.min && rules.max">{{
            '請輸入' + rules.min + ' ~ ' + rules.max + rulesLimit
          }}</span>
          <span v-else-if="rules.only">{{
            '請輸入' + rules.only + '個數字'
          }}</span>
          <span v-else-if="rules.atLeast">{{
            '請輸入至少' + rules.atLeast + '個字元'
          }}</span>
          <span v-else-if="rules.limit === 'mail'">電子信箱格式錯誤</span>
        </div>
        <div v-else-if="errorMessage && blurInput" class="error">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    upperCase: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    errorMessage: {
      type: String,
      default: '',
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    notRequired: {
      type: Boolean,
      default: false,
    },
    clearBtn: {
      type: Boolean,
      default: true,
    },
    multiLine: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      blurInput: false,
      error: null,
      clearBtnShow: false,
    }
  },
  computed: {
    syncValue: {
      get() {
        return this.value
      },
      set(value) {
        if (this.upperCase) {
          this.$emit('input', value.toUpperCase())
        } else {
          this.$emit('input', value)
        }
      },
    },
    rulesLimit() {
      return this.rules.limit === 'enAndNumber'
        ? '位英文或數字'
        : this.rules.limit === 'number'
        ? '位數字'
        : this.rules.limit === 'en'
        ? '位英文'
        : '個字元'
    },
  },
  methods: {
    onBlur(value) {
      if (!this.blurInput) this.blurInput = true
      this.validate(value)
      this.$emit('onBlur', value)
    },
    onKeyup(value) {
      this.clearBtnShow = value.length > 0
      this.$emit('onKeyup', value)
      this.$nextTick(() => this.validate(value))
    },
    onKeydown(e) {
      if (this.rules.limit === 'number') {
        const keycode = [69, 107, 109, 110, 187, 189, 190]
        if (keycode.includes(e.keyCode)) e.preventDefault()
      }
    },
    validate(value) {
      let isValid = true
      if (Object.keys(this.rules).length > 0 && value) {
        const typeLimit = this.typeRules(value, this.rules.limit)
        const lengthLimit = this.lengthRules(value)
        isValid = typeLimit && lengthLimit && !this.errorMessage
      }
      if (!value) {
        isValid = false
        if (this.notRequired) isValid = true
      }
      this.$emit('update:isValid', isValid)
    },
    typeRules(value, type) {
      const METHOD = {
        enAndNumber() {
          return /^[a-zA-Z0-9]*$/.test(value)
        },
        en() {
          return /^[a-zA-Z]*$/.test(value)
        },
        number() {
          return !/[^0-9]/.test(value)
        },
        mail() {
          return /\S+@\S+\.\S+/.test(value)
        },
      }
      return (
        !type ||
        !Object.prototype.hasOwnProperty.call(METHOD, type) ||
        METHOD[type]()
      )
    },
    lengthRules(value) {
      if (this.rules.min && this.rules.max) {
        return value.length >= this.rules.min && value.length <= this.rules.max
      } else if (this.rules.only) {
        return value.length === this.rules.only
      } else if (this.rules.atLeast) {
        return value.length >= this.rules.atLeast
      }
      return true
    },
    clear() {
      this.syncValue = ''
      this.blurInput = false
      this.clearBtnShow = false
      this.$emit('update:isValid', this.notRequired)
    },
  },
})
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.base_input {
  --borderColor: #d1d5db;
  --errorColor: #ef4444;
  --focusColor: #3b82f6;
  --fontColor: #6b7280;
  --clearSize: 0.6;

  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: var(--fontColor);

  &.multi_line {
    display: block;
  }

  .top {
    height: 40px;
    line-height: 40px;
  }

  .input_label {
    min-width: 80px;
  }

  .input_block {
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    .input_content {
      width: 100%;
      height: 100%;
      padding: 0 32px 0 16px;
      border: 1px solid var(--borderColor);
      border-radius: 4px;
      transition: 0.3s;
      outline: none;

      &:focus {
        border: 1px solid var(--focusColor);
      }

      &.error {
        border: 1px solid var(--errorColor);
      }
    }

    .x_icon {
      position: absolute;
      right: 8px;
      top: 10px;
      transform: scale(var(--clearSize));
      width: 22px;
      height: 22px;
      border: 1px solid var(--fontColor);
      border-radius: 50%;
      cursor: pointer;
      transition: 0.4s;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }

      &::after,
      &::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        width: 12px;
        height: 1px;
        background: var(--fontColor);
        transform: rotate(45deg);
        border-radius: 5px;
        top: 9px;
        left: 4px;
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  .error_message {
    height: 12px;
    font-size: 12px;
    margin: 8px 0;
    color: var(--errorColor);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
