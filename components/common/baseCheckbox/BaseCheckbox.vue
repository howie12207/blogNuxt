<template>
  <div class="base_checkbox">
    <span
      v-for="(checkbox, index) of options"
      :key="index"
      class="checkbox_item"
    >
      <input
        :id="index"
        ref="checkboxInput"
        :value="checkbox.value"
        type="checkbox"
        class="checkbox_input"
        @input="checkHandle"
      />
      <label class="checkbox_label" :for="index">{{ checkbox.label }}</label>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseCheckbox',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true,
    },
    options: {
      type: Array,
      default: () => [{ label: '', value: '' }],
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.checkboxInput.forEach((item) => {
        if (this.value.includes(item.defaultValue)) {
          item.checked = true
        }
      })
    })
  },
  methods: {
    checkHandle(e) {
      const value = e.target.defaultValue
      const id = this.value.findIndex((item) => {
        return item === value
      })
      const syncValue =
        id < 0
          ? this.value.concat([value])
          : this.value.slice(0, id).concat(this.value.slice(id + 1))
      this.$emit('input', syncValue)
    },
  },
})
</script>

<style scoped>
.checkbox_input,
.checkbox_label {
  cursor: pointer;
}
.checkbox_item:not(:last-child) {
  margin-right: 16px;
}
</style>
