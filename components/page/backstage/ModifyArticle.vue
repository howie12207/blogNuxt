<template>
  <div class="p-4">
    <CommonBaseInput
      v-model="name.value"
      label="標題"
      :is-valid.sync="name.isValid"
    />
    <div class="text-sm text-gray-500">分類</div>
    <el-checkbox-group v-model="checkList" class="my-4">
      <el-checkbox
        v-for="(item, index) in sortList"
        :key="index"
        :label="item.name"
      ></el-checkbox>
    </el-checkbox-group>
    <div class="text-sm text-gray-500">內容</div>
    <el-input
      v-model="content"
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
    />
    <div class="btn btn-primary hover:btn-primary w-20 my-4" @click="submit">
      送出
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ModifyArticle',
  props: {
    target: {
      type: String,
      default: '',
    },
    article: {
      type: Object,
      default: () => ({}),
    },
    sortList: {
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
      content: '',
      checkList: [],
    }
  },
  mounted() {
    if (this.target) {
      this.name.value = this.article.name
      this.name.isValid = true
      this.content = this.article.content
      this.checkList = this.article.sorts ? this.article.sorts : []
    }
  },
  methods: {
    submit() {
      if (!this.name.isValid) {
        this.$message.error('請填寫標題')
        return
      } else if (!this.content) {
        this.$message.error('請填寫內容')
        return
      }
      const now = Date.now()
      const params: any = {
        name: this.name.value,
        content: this.content,
        createTime: this.target ? this.article.createTime : now,
        updateTime: now,
        sorts: this.checkList,
      }
      if (!this.target) {
        this.$emit('createArticle', params)
      } else {
        params._id = this.$route.params.article
        this.$emit('updateArticle', params)
      }
    },
  },
})
</script>
