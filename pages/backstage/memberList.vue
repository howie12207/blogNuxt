<template>
  <LazyPageBackstageMemberList
    ref="memberList"
    class="flex-grow"
    :member-list="memberList"
    :page.sync="page"
    :size.sync="size"
    :total="total"
    @fetchMemberList="fetchMemberList"
    @updateMember="updateMember"
    @deleteMember="deleteMember"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MemberList',
  layout: 'backstage',
  async asyncData({ store, query }) {
    const res = await store.dispatch('user/FETCH_MEMBER_LIST', query)
    return {
      memberList: res.content,
      total: res.totalElements,
    }
  },
  data() {
    return {
      memberList: [],
      page: Number(this.$route.query.page) || 0,
      size: Number(this.$route.query.size) || 10,
      total: 0,
    }
  },
  methods: {
    async fetchMemberList(params: object) {
      const res = await this.$store.dispatch('user/FETCH_MEMBER_LIST', params)
      this.memberList = res.content
      this.total = res.totalElements
    },
    async deleteMember(id: string) {
      await this.$store.dispatch('user/DELETE_MEMBER', id)
      await this.fetchMemberList(this.$route.query)
    },
    async updateMember(params: object) {
      const res = await this.$store.dispatch('user/UPDATE_MEMBER', params)
      if (res) {
        this.$message.success('修改成功')
        ;(this as any).$refs.memberList.closePopup()
      }
      await this.fetchMemberList(this.$route.query)
    },
  },
})
</script>
