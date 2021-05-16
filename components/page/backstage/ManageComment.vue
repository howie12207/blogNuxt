<template>
  <div>
    <div class="m-4 card">
      <div class="flex bg-red-100">
        <div class="item font-bold">創建時間</div>
        <div class="item font-bold">文章標題</div>
        <div class="item font-bold">留言內容</div>
        <div class="item font-bold">操作</div>
      </div>
      <div v-for="(list, index) in commentList" :key="index" class="flex">
        <div class="item">
          {{ $format.toDateTime(list.createTime) }}
        </div>
        <div class="item">{{ list.articleId }}</div>
        <div class="item">{{ list.content }}</div>
        <div class="item">
          <span
            class="btn btn-primary hover:btn-primary"
            @click="popup('delete', list)"
            >刪除</span
          >
        </div>
      </div>
    </div>
    <CommonPagination
      :total="total"
      bg
      :page.sync="page"
      :size.sync="size"
      :layout="['total', 'size', 'pager']"
      @changePage="changePage"
      @changeSize="changeSize"
    />
    <transition name="fade">
      <CommonPopup v-if="popupOpen === 'delete'" @close="closePopup">
        <div class="text-center m-8">
          確認要刪除留言
          <span class="text-red-500">{{ tempData.content }}</span>
        </div>
        <div class="flex justify-evenly my-4">
          <span class="btn btn-primary" @click="deleteHandle(tempData._id)"
            >確認</span
          >
          <span class="btn btn-secondary" @click="closePopup">取消</span>
        </div>
      </CommonPopup>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ManageCommentPage',
  props: {
    commentList: {
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
      popupOpen: '',
      tempData: {},
    }
  },
  mounted() {
    window.addEventListener('popstate', this.fetchCommentList)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.fetchCommentList)
  },
  methods: {
    fetchCommentList(params: any) {
      const query: any = {
        ...this.$route.query,
        ...params,
      }
      this.$emit('update:page', Number(query.page) || 0)
      this.$emit('update:size', Number(query.size) || 10)
      this.$emit('fetchCommentList', query)
    },
    updateQuery(params: object) {
      const query = { ...this.$route.query, ...params }
      this.$router.push({ query })
    },
    changePage(page: number) {
      this.fetchCommentList({ page, size: this.size })
      this.updateQuery({ page, size: this.size })
    },
    changeSize(size: number) {
      this.fetchCommentList({ size, page: 0 })
      this.updateQuery({ size, page: 0 })
    },
    deleteHandle(id: string) {
      this.$emit('deleteComment', id)
      this.closePopup()
    },
    popup(target: string, comment: object) {
      this.popupOpen = target
      this.tempData = comment
    },
    closePopup() {
      this.popupOpen = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/3 text-center;
}
</style>
