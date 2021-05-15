import BaseButton from '../BaseButton/BaseButton.vue'
import Message from './message.js'

export default {
  title: 'Howie/Message',
  component: Message,
  parameters: {
    docs: {
      description: {
        component: `import message.js globally.
        <table>
          <tbody>
            <tr>
              <td>@params</td>
              <td>{string}</td>
              <td>type</td>
              <td>The message type.</td>
              <td>success, error, warning, info</td>
            </tr>
            <tr>
              <td>@params</td>
              <td>{string}</td>
              <td>message</td>
              <td>The message content.</td>
              <td></td>
            </tr>
            <tr>
              <td>@params</td>
              <td>{number}</td>
              <td>duration</td>
              <td>The message showing time.</td>
              <td>seconds</td>
            </tr>
            <tr>
              <td>@params</td>
              <td>{boolean}</td>
              <td>showClose</td>
              <td>Show close btn or not.</td>
              <td></td>
            </tr>
          </tbody></table>`,
      },
    },
  },
}

const TemplateCustom = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: `
  <div>
    <BaseButton label="成功" @click.native="openSuccess" />
    <BaseButton label="失敗" main-color="#EF4444" @click.native="openError" />
    <BaseButton label="警告" main-color="#F59E0B" @click.native="openWarning" />
    <BaseButton label="資訊" main-color="#6B7280" @click.native="openInfo" />
  </div>
  `,
  methods: {
    openSuccess() {
      Message({ message: '成功!!!' })
    },
    openError() {
      Message({ type: 'error', message: '失敗!!!' })
    },
    openWarning() {
      Message({ type: 'warning', message: '警告!!!' })
    },
    openInfo() {
      Message({ type: 'info', message: '資訊!!!' })
    },
  },
})
const TemplateNoCloseBtn = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: `
  <div>
    <BaseButton label="成功" @click.native="openSuccess" />
    <BaseButton label="失敗" main-color="#EF4444" @click.native="openError" />
    <BaseButton label="警告" main-color="#F59E0B" @click.native="openWarning" />
    <BaseButton label="資訊" main-color="#6B7280" @click.native="openInfo" />
  </div>
  `,
  methods: {
    openSuccess() {
      Message({ message: '成功!!!', showClose: false })
    },
    openError() {
      Message({ type: 'error', message: '失敗!!!', showClose: false })
    },
    openWarning() {
      Message({ type: 'warning', message: '警告!!!', showClose: false })
    },
    openInfo() {
      Message({ type: 'info', message: '資訊!!!', showClose: false })
    },
  },
})

export const Custom = TemplateCustom.bind({})
Custom.args = {}

export const NoCloseBtn = TemplateNoCloseBtn.bind({})
NoCloseBtn.args = {}
