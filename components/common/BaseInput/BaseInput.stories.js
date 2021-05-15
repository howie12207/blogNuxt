import BaseInput from './BaseInput.vue'

export default {
  title: 'Howie/BaseInput',
  component: BaseInput,
  argTypes: {
    label: {
      description: 'Show label, min-width 80 px.',
    },
    placeholder: {
      description: 'Show placeholder to tips.',
    },
    rules: {
      description: 'Define verify rules.',
      table: {
        type: {
          detail: `1. min with max limit min & max specify value length.
2. atLeast limit at least specify value length.
3. only limit only specify value length.
4. limit within enAndNumber limit only accept english & number.
5. limit within en limit only accept english.
6. limit within number limit only accept number.
7. limit within mail limit only accept mail format.
8. isRequired within true limit the value length cannot be empty.
          `,
        },
      },
    },
    errorMessage: {
      description: 'Define custom error message.',
    },
    disabled: {
      description: 'Define status whether disabled or not.',
    },
    type: {
      description: 'Define type of input.',
    },
    clearBtn: {
      description: 'Define clear btn whether show or not.',
    },
    multiLine: {
      description: 'Define whether using multiple line or not.',
    },
    upperCase: {
      description: 'Define whether convert to upper case or not.',
    },
    custom: {
      description: 'Use different style.',
      control: { type: 'select', options: ['base_input', 'base_input_2'] },
    },
    value: {
      description: 'Use v-model to define value.',
      table: {
        category: 'Not operate manually',
      },
    },
    isValid: {
      description: 'Show verify status.',
      table: {
        category: 'Not operate manually',
      },
    },
    input: {
      description: "The input's input event.",
      action: 'input',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
    onKeyup: {
      description: "The input's keyup event.",
      action: 'keyup',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
    onBlur: {
      description: "The element's blur event.",
      action: 'blur',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
    'update:isValid': {
      description: 'Update verify status.',
      table: {
        category: 'Not operate manually',
      },
    },
  },
}

const TemplateCustom = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-bind="$props" v-model="value" :is-valid.sync="isValid" @input="input" @onKeyup="onKeyup" @onBlur="onBlur" />
   `,
})

const TemplateEmail = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-model="value" :label="label" :placeholder="placeholder" :is-valid.sync="isValid" :rules="rules" />
   `,
})

const TemplateNumber = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-model="value" :label="label" :placeholder="placeholder" :is-valid.sync="isValid" :rules="rules" type="number" />
   `,
})

const TemplateCompare = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
    <div>
      <base-input v-bind="$props" v-model="value" :is-valid.sync="isValid" @onKeyup="compareHandle" @onBlur="compareHandle" />
      <base-input v-bind="$props" :label="label2" :is-valid.sync="confirmPassword.isValid" :rules="rules2" :placeholder="placeholder2" :error-message="confirmPassword.errorMessage" v-model="confirmPassword.value" @onKeyup="compareHandle" @onBlur="compareHandle" />
    </div>
   `,
  data() {
    return {
      confirmPassword: {
        value: '',
        isValid: false,
        errorMessage: '',
      },
    }
  },
  methods: {
    compareHandle() {
      if (this.value === this.confirmPassword.value) {
        this.confirmPassword.errorMessage = ''
        this.confirmPassword.isValid = true
      } else {
        this.confirmPassword.errorMessage = '密碼不一致'
        this.confirmPassword.isValid = false
      }
    },
  },
})

const TemplateUpperCase = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-model="value" :label="label" :is-valid.sync="isValid" upper-case />
   `,
})

const TemplateNotRequired = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-model="value" :label="label" />
   `,
})

const TemplateNoLabel = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-model="value"  />
   `,
})

const TemplateMultiLine = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-model="value" :label="label" multi-line />
   `,
})

const TemplateSecondStyle = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `
      <base-input v-model="value" :label="label" :custom="custom" />
   `,
})

export const Custom = TemplateCustom.bind({})
Custom.args = {
  label: '帳號',
  placeholder: '請輸入帳號',
  rules: {
    min: 6,
    max: 15,
  },
}

export const Email = TemplateEmail.bind({})
Email.args = {
  label: '信箱',
  placeholder: '請輸入信箱',
  rules: {
    limit: 'mail',
  },
}

export const Number = TemplateNumber.bind({})
Number.args = {
  label: '金額',
  placeholder: '請輸入金額',
  rules: {
    limit: 'number',
    isRequired: true,
  },
}

export const Compare = TemplateCompare.bind({})
Compare.args = {
  label: '密碼',
  placeholder: '請輸入密碼',
  rules: {
    min: 6,
    max: 20,
  },
  type: 'password',
  label2: '確認密碼',
  placeholder2: '請再次輸入密碼',
  isValid2: false,
  rules2: {
    min: 6,
    max: 20,
  },
}

export const UpperCase = TemplateUpperCase.bind({})
UpperCase.args = {
  label: '英文名',
}

export const NotRequired = TemplateNotRequired.bind({})
NotRequired.args = {
  label: 'Line',
}

export const NoLabel = TemplateNoLabel.bind({})
NoLabel.args = {}

export const MultiLine = TemplateMultiLine.bind({})
MultiLine.args = {
  label: '帳號',
}

export const SecondStyle = TemplateSecondStyle.bind({})
SecondStyle.args = {
  label: '帳號',
  custom: 'base_input_2',
}
