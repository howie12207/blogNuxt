<template>
  <div
    ref="base_select"
    :style="style"
    :class="['base_select', { open }]"
    @blur="blurHandle"
  >
    <div class="select_header" @click="openHandle">
      {{ `${syncValue} 條 / 頁` || placeholder }}
      <IconChevron direction="bottom" :size="12" />
    </div>
    <div ref="base_select_options" class="options">
      <div
        v-for="(option, i) of optionsFilter"
        :key="i"
        :class="['option', { selected: option.value === syncValue }]"
        @click="selectHandle(option)"
      >
        {{ option.label }}條 / 頁
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import IconChevron from './IconChevron'

export default Vue.extend({
  name: 'BaseSelect',
  components: { IconChevron },
  props: {
    value: {
      type: Number,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    bgColor: {
      type: String,
      default: '#fff',
    },
    textColor: {
      type: String,
      default: 'rgb(75, 85, 99)',
    },
    mainColor: {
      type: String,
      default: 'rgb(59, 130, 246)',
    },
    hoverColor: {
      type: String,
      default: 'rgb(239, 246, 255)',
    },
    width: {
      type: String,
      default: '100%',
    },
    placeholder: {
      type: String,
      default: '請選擇',
    },
  },
  data() {
    return {
      open: false,
      selectedLabel: '',
    }
  },
  computed: {
    optionsFilter() {
      if (
        this.options.every((item) => {
          return typeof item === 'object'
        })
      )
        return this.option
      return this.options.map((item) => {
        return { label: item, value: item }
      })
    },
    syncValue: {
      get() {
        return this.value
      },
      set(option) {
        this.$emit('input', Number(option))
      },
    },
    style() {
      return {
        '--selectWidth': this.width,
        '--selectBgColor': this.bgColor,
        '--selectTextColor': this.textColor,
        '--selectMainColor': this.mainColor,
        '--selectHoverColor': this.hoverColor,
      }
    },
  },
  methods: {
    blurHandle() {
      this.open = false
    },
    openHandle() {
      const totalHeight = document.body.offsetHeight
      const selectOffsetTop = this.$refs.base_select.offsetTop
      const optionsHeight = this.$refs.base_select_options.offsetHeight
      if (selectOffsetTop + optionsHeight + 40 > totalHeight)
        this.$refs.base_select_options.style.top = `-${optionsHeight}px`
      this.open = !this.open
    },
    selectHandle(option) {
      this.syncValue = option.value
      this.selectedLabel = option.label
      this.open = false
    },
  },
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.base_select {
  position: relative;
  height: 28px;
  line-height: 28px;
  width: var(--selectWidth);
  font-size: 12px;
}

.base_select .select_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--selectBgColor);
  border-radius: 4px;
  border: 1px solid #858586;
  color: var(--selectTextColor);
  padding: 0 8px;
  cursor: pointer;
  user-select: none;
}

.base_select.open .select_header {
  border: 1px solid var(--selectMainColor);
  border-radius: 4px;
}

.base_select .select_header .icon_chevron {
  transition: 0.3s;
}
.base_select.open .select_header .icon_chevron {
  transform: rotate(-180deg);
}

.base_select .options {
  opacity: 0;
  visibility: hidden;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--selectMainColor);
  position: absolute;
  z-index: 5;
  background-color: var(--selectBgColor);
  left: 0;
  right: 0;
}

.base_select.open .options {
  opacity: 1;
  visibility: visible;
}

.base_select .options .option {
  color: var(--selectTextColor);
  padding: 0 8px;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
}

.base_select .options .option.selected {
  color: var(--selectMainColor);
  font-weight: 600;
}

.base_select .options .option:hover {
  background-color: var(--selectHoverColor);
}
</style>
