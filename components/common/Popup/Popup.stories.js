import BaseButton from '../BaseButton/BaseButton.vue'
import Popup from './Popup.vue'

export default {
  title: 'Howie/Popup',
  component: Popup,
  argTypes: {
    width: {
      description: 'The popup width.',
    },
    closeBtn: {
      description: 'Show close btn or not.',
    },
    closeOut: {
      description: 'Define click outside will close popup or not.',
    },
    close: {
      description: 'Close events.',
      table: {
        type: {
          summary: 'function',
        },
      },
      action: 'close',
    },
    default: {
      description: 'The content inside popup.',
      table: {
        type: {
          summary: 'slot',
        },
      },
    },
  },
}

const TemplateCustom = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Popup, BaseButton },
  template: `
    <div>
      <base-button label="開啟" @click.native="popup('open')"></base-button>
      <popup v-if="popupOpen === 'open'" v-bind="$props" @close="closeHandle">
        <template>彈窗內容</template>
      </popup>
    </div>
    `,
  data() {
    return {
      popupOpen: 'open',
    }
  },
  mounted() {
    this.popupOpen = ''
  },
  methods: {
    popup(target) {
      this.popupOpen = target
    },
    closeHandle() {
      this.popupOpen = ''
    },
  },
})

const TemplateNotCloseOutside = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Popup, BaseButton },
  template: `
    <div>
      <base-button label="開啟 (點擊外面不會關閉)" @click.native="popup('open')"></base-button>
      <popup v-if="popupOpen === 'open'" v-bind="$props" @close="closeHandle">
        <template>彈窗內容</template>
      </popup>
    </div>
    `,
  data() {
    return {
      popupOpen: 'open',
    }
  },
  mounted() {
    this.popupOpen = ''
  },
  methods: {
    popup(target) {
      this.popupOpen = target
    },
    closeHandle() {
      this.popupOpen = ''
    },
  },
})

export const Custom = TemplateCustom.bind({})
Custom.args = {}

export const NotCloseOutside = TemplateNotCloseOutside.bind({})
NotCloseOutside.args = {
  closeOut: false,
}
