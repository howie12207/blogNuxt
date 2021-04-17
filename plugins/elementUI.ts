import Vue from 'vue'
import {
  Input,
  Message,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'

export default () => {
  Vue.component(Input.name, Input)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Pagination.name, Pagination)
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownMenu.name, DropdownMenu)
  Vue.component(DropdownItem.name, DropdownItem)
  Vue.prototype.$message = Message
}
