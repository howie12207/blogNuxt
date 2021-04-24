<template>
  <LazyPageBackstageMemberList
    ref="memberList"
    class="flex-grow"
    :member-list="memberList"
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
  async asyncData({ store }) {
    const res = await store.dispatch('user/FETCH_MEMBER_LIST')
    return {
      memberList: res,
    }
  },
  data() {
    return {
      memberList: [],
    }
  },
  methods: {
    async fetchMemberList() {
      const res = await this.$store.dispatch('user/FETCH_MEMBER_LIST')
      this.memberList = res
    },
    async deleteMember(id: string) {
      await this.$store.dispatch('user/DELETE_MEMBER', id)
      await this.fetchMemberList()
    },
    async updateMember(params: object) {
      const res = await this.$store.dispatch('user/UPDATE_MEMBER', params)
      if (res) {
        this.$message.success('修改成功')
        ;(this as any).$refs.memberList.closePopup()
      }
      await this.fetchMemberList()
    },
  },
})
</script>
