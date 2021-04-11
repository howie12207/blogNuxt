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
    <el-pagination
      v-if="total"
      class="text-center mb-8"
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page="Number($route.query.page) + 1 || page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
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
    page: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
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
      this.$emit('update:page', page - 1)
      const query: any = { ...this.$route.query, page: page - 1 }
      this.$emit('fetchArticles', query)
      this.$router.push({ query })
    },
    // handleSizeChange(size: number) {
    // console.log(size, this.page)
    // this.$emit('update:page', 0)
    // const query: any = { ...this.$route.query, size, page: 0 }
    // this.$router.push({ query })
    // this.$emit('update:size', size)
    // this.$emit('fetchArticles', query)
    // },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/4 text-center;
}
</style>
