<template>
  <LazyPageBackstageManageComment
    class="flex-grow"
    :comment-list="commentList"
    :page.sync="page"
    :size.sync="size"
    :total="total"
    @fetchCommentList="fetchCommentList"
    @deleteComment="deleteComment"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ManageComment',
  layout: 'backstage',
  async asyncData({ store, query }) {
    const res = await store.dispatch('comment/FETCH_COMMENTS', query)
    return {
      commentList: res.content,
      total: res.totalElements,
    }
  },
  data() {
    return {
      commentList: [],
      page: Number(this.$route.query.page) || 0,
      size: Number(this.$route.query.size) || 10,
      total: 0,
    }
  },
  methods: {
    async fetchCommentList(params: object) {
      const res = await this.$store.dispatch('comment/FETCH_COMMENTS', params)
      this.commentList = res.content
      this.total = res.totalElements
    },
    async deleteComment(id: string) {
      const res = await this.$store.dispatch('comment/DELETE_COMMENT', id)
      if (res) {
        this.$message.success('刪除留言成功')
        await this.fetchCommentList(this.$route.query)
      }
    },
  },
})
</script>
