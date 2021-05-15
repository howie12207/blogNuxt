import SwitchBtn from './SwitchBtn.vue'

export default {
  title: 'Howie/SwitchBtn',
  component: SwitchBtn,
  argTypes: {
    leftLabel: {
      description: 'The text of left label.',
    },
    rightLabel: {
      description: 'The text of right label.',
    },
    labelColor: {
      description: 'The text color.',
    },
    activeColor: {
      description: 'The active color.',
    },
    inactiveColor: {
      description: 'The inactive color.',
    },
    width: {
      description: 'The switch width.',
      table: {
        type: {
          detail: 'px',
        },
      },
    },
    height: {
      description: 'The switch height.',
      table: {
        type: {
          detail: 'px',
        },
      },
    },
    value: {
      description: 'The active or inactive status.',
    },
    input: {
      description: 'The value change event',
      table: {
        type: {
          summary: 'function',
        },
      },
      action: 'input',
    },
  },
}

const TemplateCustom = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchBtn },
  template: '<switch-btn v-bind="$props" @input="input" />',
})

export const Custom = TemplateCustom.bind({})
Custom.args = {
  leftLabel: '關',
  rightLabel: '開',
}
