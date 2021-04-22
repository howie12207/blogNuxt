<template>
  <div class="p-4 m-4 card">
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
    <div class="flex my-4">
      <div
        :class="[
          'btn',
          'btn-primary',
          'hover:btn-primary',
          'mr-4',
          { 'btn-primary-active': contentTab === 'html' },
        ]"
        @click="changeTab('html')"
      >
        HTML
      </div>
      <div
        :class="[
          'btn',
          'btn-secondary',
          'hover:btn-secondary',
          ,
          { 'btn-secondary-active': contentTab === 'editor' },
        ]"
        @click="changeTab('editor')"
      >
        文本編輯
      </div>
    </div>
    <el-input
      v-if="contentTab === 'html'"
      v-model="content"
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
    />
    <quill-editor
      v-else
      v-model="content"
      :options="editorOption"
    ></quill-editor>
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
      contentTab: 'html',
      editorOption: {
        bounds: 'app',
        placeholder: '',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['clean'],
              ['image'],
            ],
          },
        },
      },
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
    changeTab(target: string) {
      this.contentTab = target
    },
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
