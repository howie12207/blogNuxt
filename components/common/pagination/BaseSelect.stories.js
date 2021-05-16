import BaseSelect from './BaseSelect.vue'

export default {
  title: 'Howie/BaseSelect',
  component: BaseSelect,
  argTypes: {
    options: {
      description: 'Provide options to select.',
      table: {
        type: {
          detail: 'label & value are required.',
        },
      },
    },
    placeholder: {
      description: 'Show placeholder to tips.',
    },
    width: {
      description: "The section's width.",
    },
    mainColor: {
      description: "The section's border color.",
    },
    bgColor: {
      description: "The section's background color.",
    },
    textColor: {
      description: "The section's text color.",
    },
    hoverColor: {
      description: "The option's hover color.",
    },
    value: {
      description: 'Use v-model to define value.',
      table: {
        category: 'Not operate manually',
      },
    },
    input: {
      description: "The select's input event.",
      action: 'input',
    },
  },
}

const TemplateCustom = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseSelect },
  template: `
      <base-select v-bind="$props" v-model="selected" @input="input" />
   `,
  data() {
    return {
      selected: '',
    }
  },
})

export const Custom = TemplateCustom.bind({})
Custom.args = {
  options: [
    { label: '蘋果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '西瓜', value: 'watermelon' },
    { label: '鳳梨', value: 'pineapple' },
  ],
}
