<template>
  <div>
    <div class="m-4 card">
      <div class="flex bg-red-100">
        <div class="item font-bold">帳號</div>
        <div class="item font-bold">信箱</div>
        <div class="item font-bold">角色</div>
        <div class="item font-bold">創建時間</div>
        <div class="item font-bold">操作</div>
      </div>
      <div v-for="list in memberList" :key="list._id" class="flex">
        <div class="item">{{ list.account }}</div>
        <div class="item">{{ list.email }}</div>
        <div class="item">{{ list.roleId === 0 ? '管理員' : '會員' }}</div>
        <div class="item">{{ $format.toDateTime(list.createTime) }}</div>
        <div class="item">
          <span
            class="btn btn-secondary hover:btn-secondary"
            @click="popup('modify', list)"
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
    <transition name="fade">
      <CommonPopup v-if="popupOpen === 'modify'" @close="closePopup">
        <template #content>
          <div class="mt-8 ml-8 mb-7 text-sm text-gray-500">
            <span class="w-20 inline-block">帳號：</span>
            <span>{{ tempData.account }}</span>
          </div>
          <CommonBaseInput
            v-model="email.value"
            class="ml-8"
            label="信箱："
            :is-valid.sync="email.isValid"
            :rules="email.rules"
          />
          <div class="ml-8 mb-7 text-sm text-gray-500">
            <span class="w-20 inline-block">角色：</span>
            <span>{{ tempData.roleId === 0 ? '管理員' : '會員' }}</span>
          </div>
          <CommonBaseInput
            v-model="password.value"
            class="ml-8"
            label="修改密碼："
            :is-valid.sync="password.isValid"
            :rules="password.rules"
            not-required
            type="password"
          />
          <div class="flex justify-evenly mb-4">
            <span class="btn btn-primary" @click="modifyHandle">確認</span>
            <span class="btn btn-secondary" @click="closePopup">取消</span>
          </div>
        </template>
      </CommonPopup>
    </transition>
    <transition name="fade">
      <CommonPopup v-if="popupOpen === 'delete'" @close="closePopup">
        <template #content>
          <div class="text-center m-8">
            確認要刪除會員
            <span class="text-red-500">{{ tempData.account }}</span>
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
  name: 'MemberListPage',
  props: {
    memberList: {
      type: Array,
      default: () => [],
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
      tempData: {} as any,
      email: {
        value: '',
        isValid: true,
        rules: {
          limit: 'mail',
        },
      },
      password: {
        value: '',
        isValid: false,
        rules: {
          min: 6,
          max: 20,
        },
      },
    }
  },
  methods: {
    deleteHandle(id: string) {
      this.$emit('deleteMember', id)
      this.closePopup()
    },
    popup(target: string, member: { email: string }) {
      this.popupOpen = target
      this.tempData = member
      this.email.value = member.email
    },
    closePopup() {
      this.popupOpen = ''
    },
    modifyHandle() {
      if (
        !this.email.isValid ||
        (this.password.value !== '' && !this.password.isValid)
      ) {
        this.$message.error('請填寫正確訊息')
        return
      }
      const params: any = {
        email: this.email.value,
        _id: this.tempData._id,
      }
      if (this.password.value) params.password = this.password.value
      this.$emit('updateMember', params)
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/3 text-center;
}
</style>
