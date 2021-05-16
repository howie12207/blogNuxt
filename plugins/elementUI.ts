import Vue from 'vue'
import {
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'

export default () => {
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownMenu.name, DropdownMenu)
  Vue.component(DropdownItem.name, DropdownItem)
}
