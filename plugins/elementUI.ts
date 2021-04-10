import Vue from 'vue'
import { Input, Message, Checkbox, CheckboxGroup } from 'element-ui'

export default () => {
  Vue.component(Input.name, Input)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.prototype.$message = Message
}
