<template>
  <div>
    <div class="flex">
      <div class="item font-bold">創建時間</div>
      <div class="item font-bold">標題</div>
      <div class="item font-bold">內容</div>
      <div class="item font-bold">操作</div>
    </div>
    <div v-for="list in articles" :key="list._id" class="flex">
      <div class="item">{{ $format.toDateTime(list.createTime) }}</div>
      <div class="item">{{ list.name }}</div>
      <div class="item">{{ list.content }}</div>
      <div class="item">
        <span
          class="btn btn-secondary hover:btn-secondary"
          @click="updateHandle(list._id)"
          >編輯</span
        >
        <span
          class="btn btn-primary hover:btn-primary"
          @click="deleteHandle(list._id)"
          >刪除</span
        >
      </div>
    </div>
    <!-- <el-pagination
      v-if="pageOption.total"
      class="text-center mb-8"
      background
      layout="prev, pager, next"
      :total="pageOption.total"
      :page-size="pageOption.size"
      :current-page="pageOption.page"
      @current-change="handleCurrentChange"
    >
    </el-pagination> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ManageArticlePage',
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    // pageOption: {
    //   type: Object,
    //   default: () => ({
    //     page: 1,
    //     size: 0,
    //     total: 0,
    //   }),
    // },
  },
  data() {
    return {}
  },
  methods: {
    updateHandle(id: string) {
      this.$router.push(`/backstage/manageArticle/${id}`)
    },
    deleteHandle(id: string) {
      this.$emit('deleteArticle', id)
    },
    handleCurrentChange(page: number) {
      this.$emit('handleCurrentChange', page)
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/4 text-center;
}
</style>
