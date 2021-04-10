<template>
  <div>
    <div class="flex m-4">
      <CommonBaseInput
        ref="sortInput"
        v-model="name.value"
        :is-valid.sync="name.isValid"
        label="分類標題"
      />
      <div
        class="btn btn-secondary hover:btn-secondary self-start mt-1 ml-4"
        :class="{ 'btn-disabled': !name.isValid }"
        @click="createSort"
      >
        新增分類
      </div>
    </div>
    <div class="flex">
      <div class="item font-bold">創建時間</div>
      <div class="item font-bold">標題</div>
      <div class="item font-bold">操作</div>
    </div>
    <div v-for="list in sortList" :key="list.id" class="flex">
      <div class="item">
        {{ $format.toDateTime(list.createTime) }}
      </div>
      <div class="item">{{ list.name }}</div>
      <div class="item">
        <span
          class="btn btn-primary hover:btn-primary"
          @click="deleteHandle(list._id)"
          >刪除</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ManageSortPage',
  props: {
    sortList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      name: {
        value: '',
        isValid: false,
      },
      modifyName: {
        value: '',
        isValid: true,
      },
    }
  },
  methods: {
    createSort() {
      if (!this.name.isValid || !this.name.value) {
        this.$message.error('請填寫標題')
        return
      }
      this.$emit('createSort', {
        name: this.name.value,
        createTime: Date.now(),
      })
      ;(this as any).$refs.sortInput.clear()
    },
    deleteHandle(id: string) {
      this.$emit('deleteSort', id)
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/3 text-center;
}
.name {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis py-2 px-4 w-1/3 text-center;
  ::v-deep .base_input {
    .left {
      .input_label {
        display: none;
      }
    }
    .right {
      .error_message {
        display: none;
      }
    }
  }
}
</style>
