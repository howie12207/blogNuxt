<template>
  <div class="container">
    <PageArticle
      ref="article"
      :article="article"
      :comments="comments"
      @createComment="createComment"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ArticleId',
  layout: 'forestage',
  async asyncData({ store, params }) {
    const res1 = store.dispatch('article/FETCH_ARTICLE', params.article)
    const res2 = store.dispatch('comment/FETCH_COMMENT', {
      articleId: params.article,
    })
    const [article, comments] = await Promise.all([res1, res2])
    return {
      article,
      comments: comments.content,
      total: comments.totalElements,
    }
  },
  data() {
    return {
      comments: [],
      total: 0,
    }
  },
  methods: {
    async createComment(params: object) {
      const res = await this.$store.dispatch('comment/CREATE_COMMENT', params)
      if (res) {
        this.$message.success('留言新增成功')
        this.fetchComment()
        ;(this as any).$refs.article.clear()
      }
    },
    async fetchComment() {
      const res = await this.$store.dispatch('comment/FETCH_COMMENT', {
        articleId: this.$route.params.article,
      })
      this.comments = res.content
      this.total = res.totalElements
    },
  },
})
</script>
