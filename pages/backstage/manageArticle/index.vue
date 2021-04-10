<template>
  <LazyPageBackstageManageArticle
    class="flex-grow overflow-hidden"
    :articles="articles"
    @deleteArticle="deleteArticle"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ManageArticle',
  layout: 'backstage',
  async asyncData({ store }) {
    const res = await store.dispatch('nodeApi/FETCH_ARTICLES')
    return {
      articles: res,
    }
  },
  data() {
    return {
      articles: [],
      // pageOption: {
      //   page: 1,
      //   size: 10,
      //   total: 0,
      // },
    }
  },
  computed: {
    // articles(): any {
    //   const start = (this.pageOption.page - 1) * this.pageOption.size
    //   const end = this.pageOption.page * this.pageOption.size
    //   return this.totalArticles.slice(start, end)
    // },
  },
  // watch: {
  //   $route() {
  //     this.setCurrentPage()
  //   },
  // },
  methods: {
    async fetchArticles() {
      const res = await this.$store.dispatch('nodeApi/FETCH_ARTICLES')
      this.articles = res
    },
    async deleteArticle(id: string) {
      // await console.log(id)
      await this.$store.dispatch('nodeApi/DELETE_ARTICLE', id)
      await this.fetchArticles()
    },
    // handleCurrentChange(page: number) {
    //   this.pageOption.page = page
    //   if (page === 1) {
    //     this.$router.push({ query: {} as any })
    //   } else {
    //     this.$router.push({ query: { page } as any })
    //   }
    // },
    // setCurrentPage() {
    //   this.pageOption.page = this.$route.query?.page
    //     ? Number(this.$route.query.page)
    //     : 1
    // },
  },
})
</script>
