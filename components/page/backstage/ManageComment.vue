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
    <transition name="fade">
      <CommonPopup v-if="popupOpen === 'delete'" @close="closePopup">
        <template #content>
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
        </template>
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
    handleCurrentChange(page: number) {
      this.fetchCommentList(page - 1)
      this.updateQuery(page - 1)
    },
    fetchCommentList(page: number | object) {
      // 判斷若是上下頁動作則另外補上query
      if (typeof page === 'object') page = Number(this.$route.query.page) || 0
      const query: any = { ...this.$route.query, page: page || undefined }
      this.$emit('update:page', page)
      this.$emit('fetchCommentList', query)
    },
    updateQuery(page: number) {
      const query: any = { ...this.$route.query, page: page || undefined }
      this.$router.push({ query })
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/3 text-center;
}
</style>
