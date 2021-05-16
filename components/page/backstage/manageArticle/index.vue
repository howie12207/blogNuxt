<template>
  <div>
    <div class="m-4 card overflow-x-auto">
      <div class="flex bg-red-100">
        <div class="hidden lg:block item font-bold">創建時間</div>
        <div class="item font-bold">標題</div>
        <div class="hidden lg:block item font-bold">內容</div>
        <div class="item font-bold">操作</div>
      </div>
      <div v-for="list in articles" :key="list._id" class="flex">
        <div class="hidden lg:block item">
          {{ $format.toDateTime(list.createTime) }}
        </div>
        <div class="item">{{ list.name }}</div>
        <div class="hidden lg:block item">{{ list.content }}</div>
        <div class="item">
          <span
            class="btn btn-secondary hover:btn-secondary"
            @click="updateHandle(list._id)"
            >編輯</span
          >
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
        <template #content>
          <div class="text-center m-8">
            確認要刪除文章 <span class="text-red-500">{{ tempData.name }}</span>
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
  },
  data() {
    return {
      popupOpen: '',
      tempData: {},
    }
  },
  mounted() {
    window.addEventListener('popstate', this.fetchArticles)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.fetchArticles)
  },
  methods: {
    fetchArticles(params: any) {
      const query: any = {
        ...this.$route.query,
        ...params,
      }
      this.$emit('update:page', Number(query.page) || 0)
      this.$emit('update:size', Number(query.size) || 10)
      this.$emit('fetchArticles', query)
    },
    updateQuery(params: object) {
      const query = { ...this.$route.query, ...params }
      this.$router.push({ query })
    },
    changePage(page: number) {
      this.fetchArticles({ page, size: this.size })
      this.updateQuery({ page, size: this.size })
    },
    changeSize(size: number) {
      this.fetchArticles({ size, page: 0 })
      this.updateQuery({ size, page: 0 })
    },
    updateHandle(id: string) {
      this.$router.push(`/backstage/manageArticle/${id}`)
    },
    deleteHandle(id: string) {
      this.$emit('deleteArticle', id)
      this.closePopup()
    },
    popup(target: string, article: object) {
      this.popupOpen = target
      this.tempData = article
    },
    closePopup() {
      this.popupOpen = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/2 lg:w-1/4 text-center;
}
</style>
