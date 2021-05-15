import IconMenu from './IconMenu.vue'

export default {
  title: 'Howie/Icon/Menu',
  component: IconMenu,
  argTypes: {
    size: {
      description: 'The icon width & height.',
      table: {
        type: {
          detail: 'px',
        },
      },
    },
    mainColor: {
      description: 'The symbol color.',
    },
    menuHandle: {
      description: 'Click events to change status.',
      table: {
        type: {
          summary: 'function',
        },
      },
      action: 'menuHandle',
    },
  },
}

const TemplateX = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IconMenu },
  template: '<icon-menu v-bind="$props" @menuHandle="menuHandle" />',
})

export const Menu = TemplateX.bind({})
Menu.args = {
  size: 32,
  mainColor: '#3b82f6',
}
