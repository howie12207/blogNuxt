<template>
  <div :style="style" :class="['pagination', { background: bg }]">
    <span v-if="layout.includes('total')" class="total">共 {{ total }} 條</span>
    <BaseSelect
      v-if="layout.includes('size')"
      v-model="selectSize"
      :options="sizeOptions"
      class="select_size"
      width="120px"
    ></BaseSelect>
    <ul v-if="layout.includes('pager')" class="pager" @click="onPagerClick">
      <li
        :class="['prev_btn', { disabled: disabledPrev }]"
        @click="prevNextHandler(-1)"
      >
        <span class="prev_btn icon_chevron"></span>
      </li>
      <li
        v-if="pageCount > 0"
        :class="{ active: currentPage === 1, disabled }"
        class="number"
      >
        1
      </li>
      <li v-if="showPrevMore" class="more quickprev" :class="[{ disabled }]">
        <span class="more more_icon"></span>
      </li>
      <li
        v-for="pager in pagers"
        :key="pager"
        :class="{ active: currentPage === pager, disabled }"
        class="number"
      >
        {{ pager }}
      </li>
      <li v-if="showNextMore" class="more quicknext" :class="[{ disabled }]">
        <span class="more more_icon"></span>
      </li>
      <li
        v-if="pageCount > 1"
        :class="{ active: currentPage === pageCount, disabled }"
        class="number"
      >
        {{ pageCount }}
      </li>
      <li
        :class="['next_btn', { disabled: disabledNext }]"
        @click="prevNextHandler(1)"
      >
        <span class="next_btn icon_chevron right"></span>
      </li>
    </ul>
    <span v-if="layout.includes('jumper')" class="jumper"
      >前往<input
        v-model.lazy.number="inputPage"
        class="input"
        type="number"
        min="1"
      />頁</span
    >
  </div>
</template>
<script>
import Vue from 'vue'
import BaseSelect from './BaseSelect'

export default Vue.extend({
  name: 'Pagination',
  components: { BaseSelect },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    sizeOptions: {
      type: Array,
      default: () => [10, 30, 50, 100],
    },
    layout: {
      type: Array,
      default: () => ['pager'],
    },
    mainColor: {
      type: String,
      default: '#10b981',
    },
    bg: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 10,
    },
    start: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showPrevMore: false,
      showNextMore: false,
      pagerCount: 5,
    }
  },
  computed: {
    currentPage() {
      return this.page - this.start + 1
    },
    selectSize: {
      get() {
        return this.size
      },
      set(value) {
        this.$emit('changeSize', Number(value))
      },
    },
    // 共幾頁
    pageCount() {
      return Math.ceil(this.total / this.selectSize)
    },
    // 要顯示哪幾頁
    pagers() {
      const pagerCount = this.pagerCount
      const halfPagerCount = (pagerCount - 1) / 2
      const currentPage = Number(this.currentPage)
      const pageCount = Number(this.pageCount)
      let showPrevMore = false
      let showNextMore = false
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }
      const array = []
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }
      this.moreHandle('showPrevMore', showPrevMore)
      this.moreHandle('showNextMore', showNextMore)
      return array
    },
    disabledPrev() {
      return this.currentPage === 1
    },
    disabledNext() {
      return this.currentPage === this.pageCount
    },
    // 輸入jumper
    inputPage: {
      get() {
        return this.currentPage
      },
      set(value) {
        if (
          Number(value) > 0 &&
          value !== this.currentPage &&
          value <= this.pageCount
        ) {
          this.$emit('changePage', value + this.start - 1)
        }
      },
    },
    style() {
      return `
                --mainColor: ${this.mainColor};
            `
    },
  },
  methods: {
    // 點頁數
    onPagerClick(event) {
      const target = event.target
      if (
        target.tagName === 'UL' ||
        this.disabled ||
        target.className.includes('prev_btn') ||
        target.className.includes('next_btn')
      ) {
        return
      }
      let newPage = Number(event.target.textContent)
      const pageCount = this.pageCount
      const currentPage = this.currentPage
      const pagerCountOffset = this.pagerCount - 2
      if (target.className.includes('more')) {
        if (
          target.className.includes('quickprev') ||
          target.parentNode.className.includes('quickprev')
        ) {
          newPage = currentPage - pagerCountOffset
        } else if (
          target.className.includes('quicknext') ||
          target.parentNode.className.includes('quicknext')
        ) {
          newPage = currentPage + pagerCountOffset
        }
      }
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }
        if (newPage > pageCount) {
          newPage = pageCount
        }
      }
      if (newPage !== currentPage) {
        this.$emit('changePage', newPage + this.start - 1)
      }
    },
    // 點上下頁
    prevNextHandler(direction) {
      if (direction > 0 && this.currentPage < this.pageCount) {
        this.$emit('changePage', this.page + 1)
      } else if (direction < 0 && this.currentPage !== 1) {
        this.$emit('changePage', this.page - 1)
      }
    },
    moreHandle(target, status) {
      this[target] = status
    },
  },
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.pagination {
  display: flex;
  justify-content: center;
}

.pagination .total {
  line-height: 28px;
  margin-right: 16px;
  font-size: 14px;
}

.pagination .pager {
  display: flex;
  align-items: center;
  list-style: none;
  user-select: none;
  vertical-align: top;
  font-size: 0;
  padding: 0;
  margin: 0;
}

.pagination .pager .number.active {
  color: var(--mainColor);
  cursor: default;
}

.pagination .pager .more_icon {
  --moreSize: 4px;
  --moreMargin: 8px;
  --morePosition: -6px;

  min-width: initial;
  padding: 0;
  display: inline-block;
  position: relative;
  top: -2px;
  margin: 0 var(--moreMargin);
}
.pagination .pager .more_icon,
.pagination .pager .more_icon::after,
.pagination .pager .more_icon::before {
  box-sizing: border-box;
  width: var(--moreSize);
  height: var(--moreSize);
  background: var(--mainColor);
  border-radius: 50%;
}
.pagination .pager .more_icon::after,
.pagination .pager .more_icon::before {
  content: '';
  position: absolute;
  top: 0;
}
.pagination .pager .more_icon::after {
  left: var(--morePosition);
}
.pagination .pager .more_icon::before {
  right: var(--morePosition);
}

.pagination .pager .prev_btn,
.pagination .pager .next_btn {
  position: relative;
}

.pagination .pager .icon_chevron {
  --chevronSize: 22px;
  --chevronColor: var(--mainColor);
  --chevronBorderColor: transparent;
  --chevronBgColor: transparent;
  --chevronLineWidth: 2px;

  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--chevronSize);
  height: var(--chevronSize);
  border: 1px solid var(--chevronBorderColor);
  border-radius: 50%;
  background-color: var(--chevronBgColor);
}
.pagination .pager .icon_chevron::after {
  content: '';
  position: absolute;
  border: solid var(--chevronColor);
  border-width: 0 var(--chevronLineWidth) var(--chevronLineWidth) 0;
  border-bottom-right-radius: 2px;
  padding: calc(calc(var(--chevronSize) - var(--chevronLineWidth)) / 5);
  top: 50%;
  left: 50%;
  transform: translate(-25%, -50%) rotate(135deg);
}
.pagination .pager .icon_chevron.right::after {
  transform: translate(-75%, -50%) rotate(-45deg);
}
.pagination .pager .disabled .icon_chevron::after {
  border-color: #ccc;
}

.pagination .pager .disabled {
  cursor: not-allowed;
}

.pagination .pager li {
  display: inline-block;
  text-align: center;
  margin: 0 4px;
  padding: 0 4px;
  font-size: 14px;
  font-weight: 600;
  min-width: 32px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  transition: 0.4s;
}
.pagination .pager li:hover {
  opacity: 0.7;
}

.pagination.background .pager li {
  border-radius: 3px;
  background-color: #e5e7eb;
}
.pagination.background .pager li.active {
  background-color: var(--mainColor);
  color: #fff;
}

.pagination .jumper {
  font-size: 14px;
  margin: 0 16px;
  line-height: 28px;
}
.pagination .jumper .input {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin: 0 8px;
  height: 28px;
  width: 40px;
  outline: none;
  text-align: center;
  padding: 0 8px;
}
.pagination .jumper .input::-webkit-outer-spin-button,
.pagination .jumper .input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
@media screen and (max-width: 1024px) {
  .pagination {
    flex-wrap: wrap;
  }
  .pagination .total,
  .pagination .select_size,
  .pagination .jumper {
    display: none;
  }

  .pagination .pager .icon_chevron {
    --chevronSize: 12px;
  }

  .pagination .pager li {
    font-size: 12px;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
