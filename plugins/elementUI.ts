import Vue from 'vue'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

export default () => {
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownMenu.name, DropdownMenu)
  Vue.component(DropdownItem.name, DropdownItem)
}
