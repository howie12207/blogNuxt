<template>
  <div
    :class="[
      custom,
      {
        error:
          blurInput &&
          (!isValid || errorMessage) &&
          Object.keys(rules).length > 0,
      },
      { focus },
      { multi_line: multiLine },
    ]"
  >
    <div v-if="label" class="left">
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
          :class="['input_content', { clear_btn: clearBtn }]"
          @keyup="onKeyup(value)"
          @blur="onBlur(value)"
          @keydown="onKeydown"
          @focus="onFocus"
        />
        <div
          v-if="clearBtn && clearBtnShow"
          class="x_icon"
          @click="clear"
        ></div>
      </div>
      <div
        :class="[
          'error_message',
          'bottom',
          { need_verify: Object.keys(rules).length > 0 },
        ]"
      >
        <div v-if="blurInput && !isValid && !errorMessage" class="error">
          <span v-if="rules.isRequired">請勿空白</span>
          <span v-if="rules.min && rules.max">{{
            '請輸入' + rules.min + ' ~ ' + rules.max + rulesLimit
          }}</span>
          <span v-else-if="rules.only">{{
            '請輸入' + rules.only + rulesLimit
          }}</span>
          <span v-else-if="rules.atLeast">{{
            '請輸入至少' + rules.atLeast + rulesLimit
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
    value: {
      type: String,
      default: '',
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
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
    clearBtn: {
      type: Boolean,
      default: true,
    },
    multiLine: {
      type: Boolean,
      default: false,
    },
    upperCase: {
      type: Boolean,
      default: false,
    },
    custom: {
      type: String,
      default: 'base_input',
    },
  },
  data() {
    return {
      blurInput: false,
      error: null,
      clearBtnShow: false,
      focus: false,
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
      this.focus = false
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
      } else if (this.rules.limit === 'decimal') {
        const keycode = [69, 107, 109, 187, 189]
        if (keycode.includes(e.keyCode)) e.preventDefault()
      }
    },
    onFocus() {
      this.focus = true
    },
    validate(value) {
      let isValid = true
      if (Object.keys(this.rules).length > 0) {
        const typeLimit = this.typeRules(value, this.rules.limit)
        const lengthLimit = this.lengthRules(value)
        isValid = typeLimit && lengthLimit && !this.errorMessage
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
        decimal() {
          return /^(\d+)(\.\d{1,2})?$/.test(value)
        },
      }
      return (
        !type ||
        !Object.prototype.hasOwnProperty.call(METHOD, type) ||
        METHOD[type]()
      )
    },
    lengthRules(value) {
      if (this.rules.isRequired) {
        return value.length > 0
      } else if (this.rules.min && this.rules.max) {
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
      this.$emit('update:isValid', !this.rules?.isRequired)
    },
  },
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.base_input {
  --inputBorderColor: #d1d5db;
  --inputErrorColor: #ef4444;
  --inputFocusColor: #3b82f6;
  --inputFontColor: #6b7280;
  --inputTopHeight: 40px;
  --inputClearSize: 0.6;

  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: var(--inputFontColor);
  margin-bottom: 8px;
}
.base_input.multi_line {
  display: block;
}
.base_input .top {
  height: var(--inputTopHeight);
  line-height: var(--inputTopHeight);
}
.base_input .left {
  min-width: 80px;
  margin-right: 8px;
}
.right {
  flex-grow: 1;
}
.base_input .input_block {
  position: relative;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.base_input .input_block .input_content {
  width: 100%;
  height: 100%;
  padding: 0 32px 0 16px;
  border: 1px solid var(--inputBorderColor);
  border-radius: 4px;
  transition: 0.3s;
  outline: none;
}

.base_input .input_content:focus {
  border: 1px solid var(--inputFocusColor);
}
.base_input.error .input_content {
  border: 1px solid var(--inputErrorColor);
}

.input_block .x_icon {
  position: absolute;
  right: 8px;
  top: 10px;
  transform: scale(var(--inputClearSize));
  width: 22px;
  height: 22px;
  border: 1px solid var(--inputFontColor);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.4s;
  opacity: 0.7;
}
.input_block .x_icon:hover {
  opacity: 1;
}
.input_block .x_icon::after,
.input_block .x_icon::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  width: 12px;
  height: 1px;
  background: var(--inputFontColor);
  transform: rotate(45deg);
  border-radius: 5px;
  top: 9px;
  left: 4px;
}
.input_block .x_icon::after {
  transform: rotate(-45deg);
}

.base_input .error_message.need_verify {
  height: 12px;
  font-size: 12px;
  margin: 8px 0;
  color: var(--inputErrorColor);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 第二套樣式 */
.base_input_2 {
  --inputBorderColor: #d1d5db;
  --inputErrorColor: #ef4444;
  --inputFocusColor: #3b82f6;
  --inputFontColor: #6b7280;
  --inputTopHeight: 40px;
  --inputClearSize: 0.6;

  width: 300px;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: var(--inputFontColor);
  margin-bottom: 8px;
}

.base_input_2 .top {
  padding: 4px 8px;
  height: var(--inputTopHeight);
  line-height: calc(var(--inputTopHeight) - 8px);
  border-left: 1px solid var(--inputBorderColor);
  border-top: 1px solid var(--inputBorderColor);
  border-bottom: 1px solid var(--inputBorderColor);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: 0.3s;
}
.base_input_2 .input_label {
  min-width: 80px;
  position: relative;
}
.base_input_2 .input_label::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 2px;
  height: 24px;
  background-color: #ccc;
}

.base_input_2 .input_block {
  position: relative;
  border-left: none;
  border-right: 1px solid var(--inputBorderColor);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: 0.3s;
}

.base_input_2 .input_block .input_content {
  width: 100%;
  border: none;
  outline: none;
}

.base_input_2 .input_content.clear_btn {
  padding-right: 24px;
  border: none;
  outline: none;
}

.base_input_2.focus .top {
  border-color: var(--inputFocusColor);
}
.base_input_2.error .top {
  border-color: var(--inputErrorColor);
}

.base_input_2 .error_message {
  height: 12px;
  font-size: 12px;
  margin: 4px 0;
  padding: 0 8px;
  color: var(--inputErrorColor);
}
</style>
