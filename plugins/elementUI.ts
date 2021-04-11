import Vue from 'vue'
import { Input, Message, Checkbox, CheckboxGroup, Pagination } from 'element-ui'

export default () => {
  Vue.component(Input.name, Input)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Pagination.name, Pagination)
  Vue.prototype.$message = Message
}
